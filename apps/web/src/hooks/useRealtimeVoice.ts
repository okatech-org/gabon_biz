'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import type { VoiceState, UseRealtimeVoiceReturn } from '@/types/iasted';
import {
  floatTo16BitPCM,
  base64EncodeAudio,
  base64DecodeToInt16,
  int16ToFloat32,
  resampleAudio,
  createCaptureWorkletURL,
} from '@/lib/iasted/audio-utils';
import { isNoisyTranscription } from '@/lib/iasted/noise-filter';

// ─── OpenAI Realtime API — Voice Hook ────────────────────────────
// Single WebSocket to gpt-realtime-1.5 for native speech-to-speech.
// Replaces the old Whisper → GPT-4.1 → TTS pipeline.

const REALTIME_URL = 'wss://api.openai.com/v1/realtime?model=gpt-realtime-1.5';
const TARGET_SAMPLE_RATE = 24000; // OpenAI expects 24kHz PCM16
const RECONNECT_MAX_ATTEMPTS = 3;
const RECONNECT_BASE_DELAY_MS = 2000;

interface UseRealtimeVoiceOptions {
  /** Called when a finalized transcript is produced */
  onTranscript: (text: string) => void;
  /** Called when the AI responds (full text) */
  onResponse: (text: string) => void;
  /** Whether voice TTS output is enabled */
  voiceEnabled: boolean;
  /** Try to match and execute a local command. Returns true if handled. */
  tryLocalCommand?: (transcript: string) => boolean;
  /** Called when GPT returns a function call (e.g. navigate, search) */
  onFunctionCall?: (name: string, args: Record<string, string>) => void;
}

export function useRealtimeVoice(options: UseRealtimeVoiceOptions): UseRealtimeVoiceReturn {
  const [voiceState, setVoiceState] = useState<VoiceState>('idle');
  const [transcript, setTranscript] = useState('');
  const [audioLevel, setAudioLevel] = useState(0);
  const [isConnected, setIsConnected] = useState(false);

  // Refs for WebSocket + audio pipeline
  const wsRef = useRef<WebSocket | null>(null);
  const streamRef = useRef<MediaStream | null>(null);
  const audioContextRef = useRef<AudioContext | null>(null);
  const playbackContextRef = useRef<AudioContext | null>(null);
  const workletNodeRef = useRef<AudioWorkletNode | null>(null);
  const analyserRef = useRef<AnalyserNode | null>(null);
  const frameRef = useRef<number>(0);
  const shouldConnectRef = useRef(false);
  const connectingRef = useRef(false);
  const reconnectAttemptRef = useRef(0);

  // Accumulated response text for onResponse callback
  const responseTextRef = useRef('');
  // Track pending function calls
  const pendingFnCallRef = useRef<{ name: string; arguments: string; call_id: string } | null>(
    null,
  );

  // Audio playback queue
  const playbackQueueRef = useRef<Float32Array[]>([]);
  const isPlayingRef = useRef(false);
  const currentSourceRef = useRef<AudioBufferSourceNode | null>(null);

  // Keep latest options in ref for callbacks
  const optionsRef = useRef(options);
  optionsRef.current = options;

  // ─── Audio level monitoring ────────────────────────────────────
  const updateAudioLevel = useCallback(() => {
    if (!analyserRef.current) return;
    const data = new Uint8Array(analyserRef.current.frequencyBinCount);
    analyserRef.current.getByteFrequencyData(data);
    const avg = data.reduce((sum, v) => sum + v, 0) / data.length;
    setAudioLevel(Math.min(1, avg / 128));
    frameRef.current = requestAnimationFrame(updateAudioLevel);
  }, []);

  // ─── Audio playback (PCM16 queue) ──────────────────────────────
  const playNextChunk = useCallback(() => {
    if (!playbackContextRef.current || playbackQueueRef.current.length === 0) {
      isPlayingRef.current = false;
      currentSourceRef.current = null;
      return;
    }
    isPlayingRef.current = true;
    const chunk = playbackQueueRef.current.shift()!;
    const buffer = playbackContextRef.current.createBuffer(1, chunk.length, TARGET_SAMPLE_RATE);
    buffer.getChannelData(0).set(chunk);
    const source = playbackContextRef.current.createBufferSource();
    source.buffer = buffer;
    source.connect(playbackContextRef.current.destination);
    source.onended = () => {
      if (currentSourceRef.current === source) currentSourceRef.current = null;
      playNextChunk();
    };
    currentSourceRef.current = source;
    source.start();
  }, []);

  const enqueuePlayback = useCallback(
    (float32Data: Float32Array) => {
      playbackQueueRef.current.push(float32Data);
      if (!isPlayingRef.current) {
        playNextChunk();
      }
    },
    [playNextChunk],
  );

  // ─── Handle Realtime API events ────────────────────────────────
  const handleRealtimeEvent = useCallback(
    (event: Record<string, unknown>) => {
      const type = event.type as string;

      switch (type) {
        // Session confirmed — new session means old call_ids are invalid
        case 'session.created':
          pendingFnCallRef.current = null;
          console.log(`[iAsted] [Realtime] ${type}`);
          break;
        case 'session.updated':
          console.log(`[iAsted] [Realtime] ${type}`);
          break;

        // User started speaking (server VAD detected speech)
        case 'input_audio_buffer.speech_started':
          setVoiceState('listening');
          // Instant barge-in: stop current playback immediately
          if (currentSourceRef.current) {
            try {
              currentSourceRef.current.stop();
            } catch {
              /* already stopped */
            }
            currentSourceRef.current = null;
          }
          playbackQueueRef.current = [];
          isPlayingRef.current = false;
          break;

        // User stopped speaking
        case 'input_audio_buffer.speech_stopped':
          setVoiceState('thinking');
          break;

        // Input audio transcription (what the user said)
        case 'conversation.item.input_audio_transcription.completed': {
          const userTranscript = ((event.transcript as string) || '').trim();
          if (userTranscript && !isNoisyTranscription(userTranscript)) {
            console.log('[iAsted] [Realtime] User said:', userTranscript);
            setTranscript(userTranscript);
            optionsRef.current.onTranscript(userTranscript);

            // Try local command — if matched, CANCEL the Realtime model's response
            if (optionsRef.current.tryLocalCommand?.(userTranscript)) {
              console.log('[iAsted] [Realtime] Local command handled — cancelling AI response');

              // 1. Cancel any in-flight Realtime model response
              if (wsRef.current?.readyState === WebSocket.OPEN) {
                wsRef.current.send(JSON.stringify({ type: 'response.cancel' }));
              }

              // 2. Stop current audio playback immediately
              if (currentSourceRef.current) {
                try {
                  currentSourceRef.current.stop();
                } catch {
                  /* already stopped */
                }
                currentSourceRef.current = null;
              }
              playbackQueueRef.current = [];
              isPlayingRef.current = false;

              // 3. Reset state to listening
              setVoiceState('listening');
            }
          } else if (userTranscript) {
            console.log('[iAsted] [Realtime] Filtered noisy transcript:', userTranscript);
          }
          break;
        }

        // AI is generating a response
        case 'response.created':
          setVoiceState('speaking');
          responseTextRef.current = '';
          break;

        // Audio chunk from AI
        case 'response.audio.delta': {
          if (optionsRef.current.voiceEnabled && event.delta) {
            const int16 = base64DecodeToInt16(event.delta as string);
            const float32 = int16ToFloat32(int16);
            enqueuePlayback(float32);
          }
          break;
        }

        // AI response text transcript (delta)
        case 'response.audio_transcript.delta': {
          const delta = event.delta as string;
          if (delta) {
            responseTextRef.current += delta;
          }
          break;
        }

        // AI response text transcript complete
        case 'response.audio_transcript.done': {
          const fullTranscript = (event.transcript as string) || responseTextRef.current;
          if (fullTranscript) {
            console.log('[iAsted] [Realtime] AI said:', fullTranscript.slice(0, 100));
            optionsRef.current.onResponse(fullTranscript);
          }
          break;
        }

        // Function call — accumulate arguments
        case 'response.function_call_arguments.delta': {
          if (!pendingFnCallRef.current) {
            pendingFnCallRef.current = {
              name: (event.name as string) || '',
              arguments: '',
              call_id: (event.call_id as string) || '',
            };
          }
          pendingFnCallRef.current.arguments += (event.delta as string) || '';
          break;
        }

        // Function call complete — execute it
        case 'response.function_call_arguments.done': {
          const fnCall = pendingFnCallRef.current;
          if (fnCall) {
            const fnName = fnCall.name || (event.name as string) || '';
            const fnArgsStr = (event.arguments as string) || fnCall.arguments;
            console.log('[iAsted] [Realtime] Function call:', fnName, fnArgsStr);

            try {
              const args = JSON.parse(fnArgsStr || '{}');
              optionsRef.current.onFunctionCall?.(fnName, args);

              // Send enriched function call output back to the model
              if (wsRef.current?.readyState === WebSocket.OPEN && fnCall.call_id) {
                const outputDetail = {
                  success: true,
                  action: fnName,
                  result:
                    fnName === 'navigate_to'
                      ? `Navigation effectuée vers ${args.path || '/'}${args.section || ''}`
                      : fnName === 'search_ecosystem'
                        ? `Recherche lancée pour "${args.query || ''}"`
                        : fnName === 'control_ui'
                          ? `Action UI exécutée : ${args.action || ''}`
                          : `Fonction ${fnName} exécutée avec succès`,
                };
                wsRef.current.send(
                  JSON.stringify({
                    type: 'conversation.item.create',
                    item: {
                      type: 'function_call_output',
                      call_id: fnCall.call_id,
                      output: JSON.stringify(outputDetail),
                    },
                  }),
                );
                // Trigger a new response after function call
                wsRef.current.send(
                  JSON.stringify({
                    type: 'response.create',
                  }),
                );
              }
            } catch (e) {
              console.error('[iAsted] [Realtime] Function call parse error:', e);
            }
            pendingFnCallRef.current = null;
          }
          break;
        }

        // Response complete — return to listening
        case 'response.done':
          setVoiceState('listening');
          break;

        // Error handling
        case 'error': {
          const errorMsg = (event.error as Record<string, string>)?.message || 'Unknown error';
          // Stale tool-call IDs after reconnect are benign — downgrade to warn
          if (errorMsg.includes('not found in conversation')) {
            console.warn('[iAsted] [Realtime] Ignored stale tool-call error:', errorMsg);
          } else {
            console.error('[iAsted] [Realtime] Error:', errorMsg);
          }
          break;
        }

        default:
          // Ignore other events (rate_limits.updated, etc.)
          break;
      }
    },
    [enqueuePlayback],
  );

  // ─── Connect to OpenAI Realtime API ────────────────────────────
  const connect = useCallback(async () => {
    if (wsRef.current?.readyState === WebSocket.OPEN) return;
    if (connectingRef.current) return; // prevent parallel connect attempts
    connectingRef.current = true;

    console.log('[iAsted] [Realtime] Connecting...');
    setVoiceState('connecting');
    shouldConnectRef.current = true;

    try {
      // 1. Get ephemeral token from our server
      const tokenRes = await fetch('/api/voice/realtime', { method: 'POST' });
      if (!tokenRes.ok) {
        const err = await tokenRes.json().catch(() => ({}));
        throw new Error((err as Record<string, string>).error || `HTTP ${tokenRes.status}`);
      }
      const { client_secret } = await tokenRes.json();
      const ephemeralKey = client_secret?.value;
      if (!ephemeralKey) throw new Error('No ephemeral key received');

      // 2. Request microphone access
      const stream = await navigator.mediaDevices.getUserMedia({
        audio: {
          echoCancellation: true,
          noiseSuppression: true,
          autoGainControl: true,
          sampleRate: TARGET_SAMPLE_RATE,
        },
      });
      streamRef.current = stream;

      // 3. Set up AudioContext for mic capture
      const audioCtx = new AudioContext({ sampleRate: TARGET_SAMPLE_RATE });
      audioContextRef.current = audioCtx;

      // Set up analyser for audio level visualization
      const analyser = audioCtx.createAnalyser();
      analyser.fftSize = 256;
      analyserRef.current = analyser;

      const source = audioCtx.createMediaStreamSource(stream);
      source.connect(analyser);

      // 4. Set up playback context
      playbackContextRef.current = new AudioContext({ sampleRate: TARGET_SAMPLE_RATE });

      // 5. Open WebSocket to OpenAI Realtime API
      const ws = new WebSocket(REALTIME_URL, [
        'realtime',
        `openai-insecure-api-key.${ephemeralKey}`,
        'openai-beta.realtime-v1',
      ]);

      ws.onopen = async () => {
        console.log('[iAsted] [Realtime] WebSocket connected');
        setIsConnected(true);

        // 6. Set up AudioWorklet for mic streaming
        try {
          const workletURL = createCaptureWorkletURL();
          await audioCtx.audioWorklet.addModule(workletURL);
          URL.revokeObjectURL(workletURL);

          const workletNode = new AudioWorkletNode(audioCtx, 'capture-processor');
          workletNodeRef.current = workletNode;
          source.connect(workletNode);
          workletNode.connect(audioCtx.destination); // needed to keep processing

          // Stream mic audio to WebSocket
          workletNode.port.onmessage = (e: MessageEvent) => {
            if (ws.readyState !== WebSocket.OPEN) return;
            const inputData = e.data as Float32Array;

            // Resample if AudioContext gave us a different rate
            const resampled =
              audioCtx.sampleRate !== TARGET_SAMPLE_RATE
                ? resampleAudio(inputData, audioCtx.sampleRate, TARGET_SAMPLE_RATE)
                : inputData;

            const pcm16 = floatTo16BitPCM(resampled);
            const base64 = base64EncodeAudio(pcm16);

            ws.send(
              JSON.stringify({
                type: 'input_audio_buffer.append',
                audio: base64,
              }),
            );
          };
        } catch (workletError) {
          console.error(
            '[iAsted] [Realtime] AudioWorklet failed, using ScriptProcessor fallback:',
            workletError,
          );

          // Fallback: ScriptProcessorNode (deprecated but widely supported)
          const scriptNode = audioCtx.createScriptProcessor(4096, 1, 1);
          source.connect(scriptNode);
          scriptNode.connect(audioCtx.destination);

          scriptNode.onaudioprocess = (e) => {
            if (ws.readyState !== WebSocket.OPEN) return;
            const inputData = e.inputBuffer.getChannelData(0);
            const resampled =
              audioCtx.sampleRate !== TARGET_SAMPLE_RATE
                ? resampleAudio(inputData, audioCtx.sampleRate, TARGET_SAMPLE_RATE)
                : inputData;
            const pcm16 = floatTo16BitPCM(resampled);
            const base64 = base64EncodeAudio(pcm16);
            ws.send(
              JSON.stringify({
                type: 'input_audio_buffer.append',
                audio: base64,
              }),
            );
          };
        }

        setVoiceState('listening');
        updateAudioLevel();
        console.log('[iAsted] [Realtime] Voice connected — listening (gpt-realtime-1.5)');
      };

      ws.onmessage = (event) => {
        try {
          const data = JSON.parse(event.data as string);
          handleRealtimeEvent(data);
        } catch {
          // ignore non-JSON messages
        }
      };

      ws.onerror = (err) => {
        console.error('[iAsted] [Realtime] WebSocket error:', err);
      };

      ws.onclose = (event) => {
        console.log('[iAsted] [Realtime] WebSocket closed:', event.code, event.reason);
        setIsConnected(false);
        setVoiceState('idle');
        setAudioLevel(0);

        // Auto-reconnect on unexpected close (not user-initiated)
        if (
          shouldConnectRef.current &&
          event.code !== 1000 &&
          reconnectAttemptRef.current < RECONNECT_MAX_ATTEMPTS
        ) {
          reconnectAttemptRef.current++;
          const delay = RECONNECT_BASE_DELAY_MS * Math.pow(2, reconnectAttemptRef.current - 1);
          console.log(
            `[iAsted] [Realtime] Reconnecting in ${delay}ms (attempt ${reconnectAttemptRef.current}/${RECONNECT_MAX_ATTEMPTS})`,
          );
          setTimeout(() => {
            connectingRef.current = false; // Reset to allow reconnect
            connect();
          }, delay);
        }
      };

      wsRef.current = ws;
      reconnectAttemptRef.current = 0; // Reset on successful connection setup
    } catch (err) {
      console.error('[iAsted] [Realtime] Connection failed:', err);
      setVoiceState('idle');
      shouldConnectRef.current = false;
    } finally {
      connectingRef.current = false;
    }
  }, [handleRealtimeEvent, updateAudioLevel]);

  // ─── Disconnect ────────────────────────────────────────────────
  const disconnect = useCallback(() => {
    console.log('[iAsted] [Realtime] Disconnecting...');
    shouldConnectRef.current = false;
    connectingRef.current = false;

    // Stop audio level animation
    if (frameRef.current) {
      cancelAnimationFrame(frameRef.current);
      frameRef.current = 0;
    }

    // Disconnect AudioWorklet
    if (workletNodeRef.current) {
      workletNodeRef.current.disconnect();
      workletNodeRef.current = null;
    }

    // Close WebSocket
    if (wsRef.current) {
      wsRef.current.close();
      wsRef.current = null;
    }

    // Stop mic stream
    if (streamRef.current) {
      streamRef.current.getTracks().forEach((t) => t.stop());
      streamRef.current = null;
    }

    // Close audio contexts
    if (audioContextRef.current?.state !== 'closed') {
      audioContextRef.current?.close().catch(() => {});
      audioContextRef.current = null;
    }
    if (playbackContextRef.current?.state !== 'closed') {
      playbackContextRef.current?.close().catch(() => {});
      playbackContextRef.current = null;
    }

    // Clear playback queue
    playbackQueueRef.current = [];
    isPlayingRef.current = false;
    pendingFnCallRef.current = null;

    setVoiceState('idle');
    setAudioLevel(0);
    setTranscript('');
    setIsConnected(false);
    reconnectAttemptRef.current = 0;
  }, []);

  // ─── Cleanup on unmount ────────────────────────────────────────
  useEffect(() => {
    return () => {
      disconnect();
    };
  }, [disconnect]);

  return {
    voiceState,
    audioLevel,
    transcript,
    isConnected,
    connect,
    disconnect,
  };
}
