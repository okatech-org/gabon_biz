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
  /** Gemini SSE sendToAI — kept as fallback */
  sendToAI: (text: string) => Promise<string>;
  /** Whether voice TTS output is enabled */
  voiceEnabled: boolean;
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
  const speakWithBrowserRef = useRef<(text: string) => Promise<void>>(() => Promise.resolve());

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

  // ─── Browser TTS Fallback ───────────────────────────────────
  const speakWithBrowser = useCallback((text: string): Promise<void> => {
    return new Promise((resolve) => {
      if (typeof window === 'undefined' || !window.speechSynthesis) {
        resolve();
        return;
      }
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = 'fr-FR';
      utterance.rate = 0.95;
      utterance.pitch = 0.9;
      utterance.volume = 1.0;
      utterance.onend = () => resolve();
      utterance.onerror = () => resolve();
      window.speechSynthesis.speak(utterance);
    });
  }, []);

  // Keep the ref in sync
  speakWithBrowserRef.current = speakWithBrowser;

  // ─── OpenAI TTS — speak via API ─────────────────────────────
  const speakWithOpenAI = useCallback(async (text: string): Promise<void> => {
    try {
      const response = await fetch('/api/voice/tts', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ text, voice: 'onyx' }), // onyx = deep masculine
      });

      if (!response.ok || !response.body) {
        console.warn('[iAsted] [TTS] OpenAI TTS failed, falling back to browser');
        return speakWithBrowserRef.current(text);
      }

      // Play the audio stream
      const audioBlob = await response.blob();
      const audioUrl = URL.createObjectURL(audioBlob);
      const audio = new Audio(audioUrl);
      currentAudioRef.current = audio;

      return new Promise<void>((resolve) => {
        audio.onended = () => {
          URL.revokeObjectURL(audioUrl);
          currentAudioRef.current = null;
          resolve();
        };
        audio.onerror = () => {
          URL.revokeObjectURL(audioUrl);
          currentAudioRef.current = null;
          resolve();
        };
        audio.play().catch(() => {
          URL.revokeObjectURL(audioUrl);
          currentAudioRef.current = null;
          speakWithBrowserRef.current(text).then(resolve);
        });
      });
    } catch (err) {
      console.error('[iAsted] [TTS] Error:', err);
      return speakWithBrowserRef.current(text);
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
    if (typeof window !== 'undefined' && window.speechSynthesis) {
      window.speechSynthesis.cancel();
    }
  }, []);

  // ─── Idle Timer ──────────────────────────────────────────────
  const resetIdleTimer = useCallback(() => {
    if (idleTimerRef.current) clearTimeout(idleTimerRef.current);
    idleTimerRef.current = setTimeout(() => {
      console.log('[iAsted] [state] Auto-disconnect (idle 2min)');
      disconnect();
    }, IASTED_CONFIG.AUTO_DISCONNECT_IDLE_MS);
  // eslint-disable-next-line
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

  // ─── GPT-4o Voice Chat ──────────────────────────────────────
  const sendToGPT = useCallback(async (text: string): Promise<string> => {
    try {
      const response = await fetch('/api/voice/chat', {
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

      // eslint-disable-next-line no-constant-condition
      while (true) {
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
      console.error('[iAsted] [GPT-4o] Error:', err);
      return '';
    }
  }, []);

  // ─── Handle Finalized Audio ─────────────────────────────────
  const handleAudioChunk = useCallback(async (audioBlob: Blob) => {
    if (audioBlob.size < 1000) {
      // Too small, likely just noise
      console.log('[iAsted] [audio] Chunk too small, skipping');
      startRecording(); // Resume recording
      return;
    }

    resetIdleTimer();
    setVoiceState('thinking');
    setTranscript('Transcription...');

    // 1. Transcribe with Whisper
    const text = await transcribeWithWhisper(audioBlob);

    if (!text.trim() || isNoisyTranscription(text)) {
      console.log('[iAsted] [transcript] Empty or noisy:', text);
      setTranscript('');
      setVoiceState('listening');
      startRecording();
      return;
    }

    console.log('[iAsted] [Whisper]', text);
    setTranscript(text);
    options.onTranscript(text);

    // 2. Send to GPT-4o
    const response = await sendToGPT(text);

    if (response) {
      options.onResponse(response);

      // 3. Speak with OpenAI TTS
      if (options.voiceEnabled) {
        setVoiceState('speaking');
        const ttsText = stripMarkdownForTTS(response);
        const shortened = ttsText.length > 500 ? ttsText.slice(0, 500) + '...' : ttsText;
        await speak(shortened);
      }
    }

    // 4. Resume listening
    setVoiceState('listening');
    setTranscript('');
    if (shouldListenRef.current) {
      startRecording();
    }
  // eslint-disable-next-line
  }, [options.voiceEnabled, resetIdleTimer, transcribeWithWhisper, sendToGPT, speak]);

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

  // ─── Connect ─────────────────────────────────────────────────
  const connect = useCallback(async () => {
    console.log('[iAsted] [state] Connecting voice (OpenAI pipeline)...');
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

      console.log('[iAsted] [state] Voice connected — listening (Whisper + GPT-4o)');
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
