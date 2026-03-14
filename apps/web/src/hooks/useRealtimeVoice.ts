'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import type { VoiceState, UseRealtimeVoiceReturn } from '@/types/iasted';
import { isNoisyTranscription } from '@/lib/iasted/noise-filter';
import {
  stripMarkdownForTTS,
  IASTED_CONFIG,
} from '@/lib/iasted/voice-config';

// ─── Main Hook ──────────────────────────────────────────────────

interface UseRealtimeVoiceOptions {
  /** Called when a finalized transcript is produced */
  onTranscript: (text: string) => void;
  /** Called when the AI responds (full text) */
  onResponse: (text: string) => void;
  /** Whether voice TTS output is enabled */
  voiceEnabled: boolean;
  /** Try to match and execute a local command. Returns true if handled. */
  tryLocalCommand?: (transcript: string) => boolean;
  /** Called when Gemini returns a function call (e.g. navigate, search) */
  onFunctionCall?: (name: string, args: Record<string, string>) => void;
}

export function useRealtimeVoice(options: UseRealtimeVoiceOptions): UseRealtimeVoiceReturn {
  const [voiceState, setVoiceState] = useState<VoiceState>('idle');
  const [transcript, setTranscript] = useState('');
  const [audioLevel, setAudioLevel] = useState(0);

  const streamRef = useRef<MediaStream | null>(null);
  const audioContextRef = useRef<AudioContext | null>(null);
  const analyserRef = useRef<AnalyserNode | null>(null);
  const frameRef = useRef<number>(0);
  const idleTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const shouldListenRef = useRef(false);
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const audioChunksRef = useRef<Blob[]>([]);
  const silenceTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const currentAudioRef = useRef<HTMLAudioElement | null>(null);
  const historyRef = useRef<{ role: string; content: string }[]>([]);
  const disconnectRef = useRef<() => void>(() => {});
  const startRecordingRef = useRef<() => void>(() => {});
  const onFunctionCallRef = useRef(options.onFunctionCall);

  // ─── Audio Level Analysis ────────────────────────────────────
  const startAudioAnalysis = useCallback((stream: MediaStream) => {
    const audioContext = new AudioContext();
    const analyser = audioContext.createAnalyser();
    const source = audioContext.createMediaStreamSource(stream);
    source.connect(analyser);
    analyser.fftSize = 256;

    audioContextRef.current = audioContext;
    analyserRef.current = analyser;

    const dataArray = new Uint8Array(analyser.frequencyBinCount);
    const analyze = () => {
      analyser.getByteFrequencyData(dataArray);
      const avg = dataArray.reduce((sum, val) => sum + val, 0) / dataArray.length;
      setAudioLevel(avg / 255);
      frameRef.current = requestAnimationFrame(analyze);
    };
    analyze();
  }, []);

  const stopAudioAnalysis = useCallback(() => {
    cancelAnimationFrame(frameRef.current);
    audioContextRef.current?.close();
    audioContextRef.current = null;
    analyserRef.current = null;
    setAudioLevel(0);
  }, []);

  // ─── OpenAI TTS — speak via API ─────────────────────────────
  // Mobile: reuse a pre-warmed <audio> element (unlocked on user gesture in IAstedChatbot)
  const speakWithOpenAI = useCallback(async (text: string): Promise<void> => {
    try {
      const response = await fetch('/api/voice/tts', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ text, voice: 'echo' }),
      });

      if (!response.ok || !response.body) {
        console.warn('[iAsted] [TTS] OpenAI TTS failed, staying silent');
        return;
      }

      // Play the audio stream — reuse existing element or create new
      const audioBlob = await response.blob();
      const audioUrl = URL.createObjectURL(audioBlob);

      // Reuse the pre-warmed audio element if it exists
      if (!currentAudioRef.current) {
        currentAudioRef.current = new Audio();
        currentAudioRef.current.setAttribute('playsinline', 'true');
      }
      const audio = currentAudioRef.current;
      audio.src = audioUrl;
      audio.volume = 1.0;

      return new Promise<void>((resolve) => {
        audio.onended = () => {
          URL.revokeObjectURL(audioUrl);
          resolve();
        };
        audio.onerror = () => {
          URL.revokeObjectURL(audioUrl);
          resolve();
        };
        audio.play().catch(() => {
          URL.revokeObjectURL(audioUrl);
          console.warn('[iAsted] [TTS] Auto-play blocked, staying silent');
          resolve();
        });
      });
    } catch (err) {
      console.error('[iAsted] [TTS] Error:', err);
      // No browser fallback — consistent voice identity
    }
  }, []);

  // ─── Speak function (uses OpenAI TTS if voice enabled) ──────
  const speak = useCallback(async (text: string) => {
    if (!options.voiceEnabled) return;
    return speakWithOpenAI(text);
  }, [options.voiceEnabled, speakWithOpenAI]);

  // ─── Stop speaking ──────────────────────────────────────────
  const stopSpeaking = useCallback(() => {
    if (currentAudioRef.current) {
      currentAudioRef.current.pause();
      currentAudioRef.current = null;
    }
  }, []);

  // ─── Idle Timer ──────────────────────────────────────────────
  const resetIdleTimer = useCallback(() => {
    if (idleTimerRef.current) clearTimeout(idleTimerRef.current);
    idleTimerRef.current = setTimeout(() => {
      console.log('[iAsted] [state] Auto-disconnect (idle 2min)');
      disconnectRef.current();
    }, IASTED_CONFIG.AUTO_DISCONNECT_IDLE_MS);
  }, []);

  // ─── Disconnect ──────────────────────────────────────────────
  const disconnect = useCallback(() => {
    console.log('[iAsted] [state] Disconnecting voice');
    shouldListenRef.current = false;

    // Stop MediaRecorder
    if (mediaRecorderRef.current && mediaRecorderRef.current.state !== 'inactive') {
      mediaRecorderRef.current.stop();
    }
    mediaRecorderRef.current = null;
    audioChunksRef.current = [];

    // Stop silence timer
    if (silenceTimerRef.current) clearTimeout(silenceTimerRef.current);

    // Stop mic stream
    streamRef.current?.getTracks().forEach(t => t.stop());
    streamRef.current = null;

    // Stop audio analysis
    stopAudioAnalysis();

    // Stop speaking
    stopSpeaking();

    // Clear idle timer
    if (idleTimerRef.current) clearTimeout(idleTimerRef.current);

    // Clear history
    historyRef.current = [];

    setVoiceState('idle');
    setTranscript('');
    setAudioLevel(0);
  }, [stopAudioAnalysis, stopSpeaking]);

  // Keep disconnectRef in sync
  useEffect(() => { disconnectRef.current = disconnect; }, [disconnect]);
  // Keep onFunctionCallRef in sync
  useEffect(() => { onFunctionCallRef.current = options.onFunctionCall; }, [options.onFunctionCall]);

  // ─── Whisper Transcription ───────────────────────────────────
  const transcribeWithWhisper = useCallback(async (audioBlob: Blob): Promise<string> => {
    try {
      const formData = new FormData();
      formData.append('audio', audioBlob, 'audio.webm');

      const response = await fetch('/api/voice/transcribe', {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        console.error('[iAsted] [Whisper] Transcription failed:', response.status);
        return '';
      }

      const result = await response.json();
      return result.text || '';
    } catch (err) {
      console.error('[iAsted] [Whisper] Error:', err);
      return '';
    }
  }, []);

  // ─── Gemini Voice Chat (single brain) ─────────────────
  const sendToGemini = useCallback(async (text: string): Promise<string> => {
    try {
      const response = await fetch('/api/chat/stream', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message: text,
          history: historyRef.current.slice(-10),
        }),
      });

      if (!response.ok || !response.body) return '';

      const reader = response.body.getReader();
      const decoder = new TextDecoder();
      let buffer = '';
      let fullText = '';

      // Stream reading loop
      for (;;) {
        const { done, value } = await reader.read();
        if (done) break;
        buffer += decoder.decode(value, { stream: true });
        const lines = buffer.split('\n');
        buffer = lines.pop() || '';
        for (const line of lines) {
          if (!line.startsWith('data: ')) continue;
          const data = line.slice(6).trim();
          if (data === '[DONE]') continue;
          try {
            const parsed = JSON.parse(data);
            if (parsed.text) fullText += parsed.text;
            // Forward function calls via ref
            if (parsed.functionCall && onFunctionCallRef.current) {
              onFunctionCallRef.current(parsed.functionCall.name, parsed.functionCall.args || {});
            }
          } catch { /* skip */ }
        }
      }

      // Update conversation history
      historyRef.current.push({ role: 'user', content: text });
      historyRef.current.push({ role: 'model', content: fullText });
      // Keep history manageable
      if (historyRef.current.length > 20) {
        historyRef.current = historyRef.current.slice(-10);
      }

      return fullText;
    } catch (err) {
      console.error('[iAsted] [Gemini Voice] Error:', err);
      return '';
    }
  }, []);

  // ─── Handle Finalized Audio ─────────────────────────────────
  const consecutiveFailsRef = useRef(0);

  const handleAudioChunk = useCallback(async (audioBlob: Blob) => {
    if (audioBlob.size < 1000) {
      console.log('[iAsted] [audio] Chunk too small, skipping');
      startRecordingRef.current();
      return;
    }

    resetIdleTimer();
    setVoiceState('thinking');
    setTranscript('Transcription...');

    try {
      // 1. Transcribe with Whisper
      const text = await transcribeWithWhisper(audioBlob);

      if (!text.trim() || isNoisyTranscription(text)) {
        console.log('[iAsted] [transcript] Empty or noisy:', text);
        setTranscript('');
        setVoiceState('listening');
        startRecordingRef.current();
        return;
      }

      // Reset fail counter on successful transcription
      consecutiveFailsRef.current = 0;

      console.log('[iAsted] [Whisper]', text);
      setTranscript(text);
      options.onTranscript(text);

      // 2. Try local command first (zero-cost, no API call)
      if (options.tryLocalCommand?.(text)) {
        console.log('[iAsted] [local] Command handled locally, skipping Gemini');
        setVoiceState('listening');
        setTranscript('');
        if (shouldListenRef.current) startRecordingRef.current();
        return;
      }

      // 3. Send to Gemini
      const response = await sendToGemini(text);

      if (response) {
        options.onResponse(response);

        // 3. Speak with OpenAI TTS
        if (options.voiceEnabled) {
          setVoiceState('speaking');
          const ttsText = stripMarkdownForTTS(response);
          const shortened = ttsText.length > 500 ? ttsText.slice(0, 500) + '...' : ttsText;
          await speak(shortened);
        }
      } else {
        // Gemini returned empty → vocal error feedback
        console.warn('[iAsted] [Gemini] Empty response');
        if (options.voiceEnabled) {
          setVoiceState('speaking');
          await speak("Désolé, je suis momentanément indisponible. Réessaie ou utilise le chat textuel.");
        }
      }
    } catch (err) {
      // Track consecutive failures (rate limiting, network errors)
      consecutiveFailsRef.current++;
      if (consecutiveFailsRef.current >= 3) {
        console.error('[iAsted] [pipeline] Too many consecutive failures, disconnecting');
        disconnectRef.current();
        return;
      }

      // Vocal error feedback for any failure in the pipeline
      console.error('[iAsted] [pipeline] Error:', err);
      if (options.voiceEnabled) {
        setVoiceState('speaking');
        await speak("Je ne t'ai pas bien entendu, peux-tu répéter ?");
      }
    }

    // 4. Resume listening
    setVoiceState('listening');
    setTranscript('');
    if (shouldListenRef.current) {
      startRecordingRef.current();
    }
  }, [options, resetIdleTimer, transcribeWithWhisper, sendToGemini, speak]);

  // ─── Voice Activity Detection (silence-based) ───────────────
  const detectSilence = useCallback(() => {
    if (!analyserRef.current) return;
    const dataArray = new Uint8Array(analyserRef.current.frequencyBinCount);
    analyserRef.current.getByteFrequencyData(dataArray);
    const avg = dataArray.reduce((sum, val) => sum + val, 0) / dataArray.length;

    // If audio level drops below threshold for 1.5s, stop recording
    if (avg < 10) {
      if (!silenceTimerRef.current) {
        silenceTimerRef.current = setTimeout(() => {
          console.log('[iAsted] [VAD] Silence detected — processing');
          if (mediaRecorderRef.current && mediaRecorderRef.current.state === 'recording') {
            mediaRecorderRef.current.stop();
          }
        }, 1500);
      }
    } else {
      if (silenceTimerRef.current) {
        clearTimeout(silenceTimerRef.current);
        silenceTimerRef.current = null;
      }
    }
  }, []);

  // ─── Start MediaRecorder ────────────────────────────────────
  const startRecording = useCallback(() => {
    if (!streamRef.current || !shouldListenRef.current) return;

    audioChunksRef.current = [];
    const mimeType = MediaRecorder.isTypeSupported('audio/webm;codecs=opus')
      ? 'audio/webm;codecs=opus'
      : MediaRecorder.isTypeSupported('audio/webm')
        ? 'audio/webm'
        : 'audio/mp4';

    const recorder = new MediaRecorder(streamRef.current, { mimeType });

    recorder.ondataavailable = (event) => {
      if (event.data.size > 0) {
        audioChunksRef.current.push(event.data);
      }
    };

    recorder.onstop = () => {
      if (silenceTimerRef.current) {
        clearTimeout(silenceTimerRef.current);
        silenceTimerRef.current = null;
      }
      const audioBlob = new Blob(audioChunksRef.current, { type: mimeType });
      audioChunksRef.current = [];
      handleAudioChunk(audioBlob);
    };

    recorder.start(250); // Collect data every 250ms for responsiveness
    mediaRecorderRef.current = recorder;

    // Start silence detection polling
    const vadInterval = setInterval(() => {
      if (mediaRecorderRef.current?.state === 'recording') {
        detectSilence();
      } else {
        clearInterval(vadInterval);
      }
    }, 200);

    console.log('[iAsted] [MediaRecorder] Started recording');
  }, [handleAudioChunk, detectSilence]);

  // Keep startRecordingRef in sync
  useEffect(() => { startRecordingRef.current = startRecording; }, [startRecording]);

  // ─── Connect ─────────────────────────────────────────────────
  const connect = useCallback(async () => {
    console.log('[iAsted] [state] Connecting voice (Whisper + Gemini pipeline)...');
    setVoiceState('connecting');

    try {
      // Request mic permission
      const stream = await navigator.mediaDevices.getUserMedia({
        audio: {
          echoCancellation: true,
          noiseSuppression: true,
          autoGainControl: true,
          sampleRate: 16000,
        },
      });
      streamRef.current = stream;

      // Start audio level analysis
      startAudioAnalysis(stream);

      // Start recording
      shouldListenRef.current = true;
      startRecording();

      // Set listening state
      setVoiceState('listening');

      // Start idle timer
      resetIdleTimer();

      console.log('[iAsted] [state] Voice connected — listening (Whisper + Gemini)');
    } catch (err) {
      console.error('[iAsted] [error] Mic access denied:', err);
      setVoiceState('idle');
    }
  }, [startAudioAnalysis, startRecording, resetIdleTimer]);

  // ─── Cleanup on unmount ──────────────────────────────────────
  useEffect(() => {
    return () => {
      shouldListenRef.current = false;
      if (mediaRecorderRef.current && mediaRecorderRef.current.state !== 'inactive') {
        mediaRecorderRef.current.stop();
      }
      streamRef.current?.getTracks().forEach(t => t.stop());
      stopAudioAnalysis();
      stopSpeaking();
      if (idleTimerRef.current) clearTimeout(idleTimerRef.current);
      if (silenceTimerRef.current) clearTimeout(silenceTimerRef.current);
    };
  }, [stopAudioAnalysis, stopSpeaking]);

  return {
    voiceState,
    audioLevel,
    transcript,
    isConnected: voiceState !== 'idle',
    connect,
    disconnect,
  };
}
