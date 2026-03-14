'use client';

import { Bot, ExternalLink, Loader2, Send, User, Volume2, VolumeX, X } from 'lucide-react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { useCallback, useEffect, useRef, useState } from 'react';
import ReactMarkdown from 'react-markdown';
import { useRealtimeVoice } from '@/hooks/useRealtimeVoice';
import { useLocalCommandRouter } from '@/hooks/useLocalCommandRouter';
import { VoiceMicButton } from '@/components/iasted/VoiceMicButton';
import { getSuggestions } from '@/lib/iasted/suggestions';
import { executeFunctionCall } from '@/lib/iasted/function-call-executor';
import { useTheme } from '@/lib/theme-provider';
import { useI18n } from '@/lib/i18n/i18nContext';
import {
  getTimeGreeting,
  getVocalGreeting,
  stripMarkdownForTTS,
  SESSION_GREETING_KEY,
  getTimePeriod,
} from '@/lib/iasted/voice-config';

interface ChatMessage {
  role: 'user' | 'model';
  content: string;
  isStreaming?: boolean;
}

function getWelcomeMessage(): string {
  return `${getTimeGreeting()} ! 👋 Je suis **iAsted**, ton assistant IA sur **GABON BIZ**.

Je connais tous les services de la plateforme :
- 🏢 **Créer ton entreprise** en ligne
- 📋 Trouver des **marchés publics**
- 🚀 Candidater à l'**Incubateur SING**
- 💰 Explorer les **opportunités d'investissement**
- 🎓 Découvrir les **formations du CGI**
- 🔍 Trouver des **solutions numériques** (KIMBA)

Dis-moi ce dont tu as besoin !`;
}

// ─── TTS Helpers (OpenAI TTS with browser fallback) ───
// Mobile fix: reuse a single pre-warmed <audio> element to bypass iOS/Android auto-play restrictions
let sharedAudioEl: HTMLAudioElement | null = null;
let audioUnlocked = false;

/**
 * Must be called INSIDE a user gesture (click/touchend) to unlock
 * audio playback on iOS and Android.
 */
function unlockAudio() {
  if (audioUnlocked) return;
  try {
    // Create a persistent audio element — reused for all TTS
    if (!sharedAudioEl) {
      sharedAudioEl = new Audio();
      sharedAudioEl.setAttribute('playsinline', 'true');
    }
    // Play silent data URI to unlock (tiny valid MP3)
    sharedAudioEl.src = 'data:audio/mp3;base64,SUQzBAAAAAAAI1RTU0UAAAAPAAADTGF2ZjU4Ljc2LjEwMAAAAAAAAAAAAAAA//tQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAWGluZwAAAA8AAAACAAABhgC7u7u7u7u7u7u7u7u7u7u7u7u7u7u7u7u7u7u7u7u7u7u7u7u7u7u7u7u7u7u7u7u7u7u7//////////////////////////////////////////////////////////////////8AAAAATGF2YzU4LjEzAAAAAAAAAAAAAAAAJAAAAAAAAAAAAYYoRwRHAAAAAAD/+1DEAAAGAAGn9AAAIUAMK/8wAACKqqKiqioAAAAA0CEfePfhhOE7/ir/+Lv1cJx8Tzv/xd+j7/8XBgGPiYOAgEP/5cPu//////lxMTExcBAIBD///5c//KCYmJi4CAQ/////8uJi4CAAAAATEE//tQxBAADmBnV/z0ACIMDO3/nosePxExBTEFNRTMuMTAwVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVV';
    sharedAudioEl.volume = 0.01;
    const p = sharedAudioEl.play();
    if (p) p.then(() => { sharedAudioEl!.pause(); audioUnlocked = true; }).catch(() => {});

    // Also unlock Web Audio API context (for level analysis)
    if (typeof AudioContext !== 'undefined') {
      const ctx = new AudioContext();
      if (ctx.state === 'suspended') ctx.resume().catch(() => {});
      ctx.close().catch(() => {});
    }

    // SpeechSynthesis no longer used — no need to poke it


    audioUnlocked = true;
    console.log('[iAsted] [audio] Mobile audio unlocked');
  } catch {
    console.warn('[iAsted] [audio] Failed to unlock audio');
  }
}

async function speak(text: string, onEnd?: () => void) {
  try {
    // OpenAI TTS (echo = neutral francophone masculine voice)
    // NO browser fallback — consistent voice or silence
    const response = await fetch('/api/voice/tts', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ text, voice: 'echo' }),
    });

    if (response.ok) {
      const audioBlob = await response.blob();
      const audioUrl = URL.createObjectURL(audioBlob);

      // Reuse the pre-warmed audio element on mobile, or create new
      const audio = sharedAudioEl || new Audio();
      audio.src = audioUrl;
      audio.volume = 1.0;

      audio.onended = () => {
        URL.revokeObjectURL(audioUrl);
        onEnd?.();
      };
      audio.onerror = () => {
        URL.revokeObjectURL(audioUrl);
        onEnd?.();
      };

      try {
        await audio.play();
      } catch {
        // Auto-play blocked — silent rather than different voice
        URL.revokeObjectURL(audioUrl);
        console.warn('[iAsted] [TTS] Auto-play blocked, staying silent');
        onEnd?.();
      }
      return;
    }
  } catch (err) {
    console.warn('[iAsted] [TTS] OpenAI TTS failed, staying silent:', err);
  }

  // No browser fallback — consistent voice identity
  onEnd?.();
}

function stopSpeaking() {
  if (sharedAudioEl) {
    sharedAudioEl.pause();
    sharedAudioEl.src = '';
  }
}

// Fix 4: Suggestions now unified via getSuggestions() from suggestions.ts
// (removed duplicate CONTEXTUAL_QUESTIONS — see suggestions.ts)

export function IAstedChatbot() {
  const pathname = usePathname();
  const router = useRouter();
  const { setTheme, toggleTheme } = useTheme();
  const { setLang } = useI18n();
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [hasInteracted, setHasInteracted] = useState(false);
  const [voiceEnabled, setVoiceEnabled] = useState(true);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const abortControllerRef = useRef<AbortController | null>(null);
  const hasGreetedRef = useRef(false);
  const [voiceOnly, setVoiceOnly] = useState(false); // Autonomous voice mode (no chat window)
  const longPressTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const pressStartRef = useRef<number>(0);

  // ─── Draggable FAB state ───
  const fabRef = useRef<HTMLButtonElement>(null);
  const [fabPos, setFabPos] = useState<{ x: number; y: number } | null>(null);
  const isDraggingRef = useRef(false);
  const dragStartRef = useRef<{ px: number; py: number; sx: number; sy: number } | null>(null);
  const hasDraggedRef = useRef(false);

  // ─── Local Command Router (declared first, used by voice hook via ref) ───
  const { tryLocalCommand } = useLocalCommandRouter({
    closeChat: () => { setIsOpen(false); setVoiceOnly(false); stopSpeaking(); },
    clearMessages: () => { setMessages([]); setHasInteracted(false); },
    disconnectVoice: () => { setVoiceOnly(false); },
    setVoiceEnabled,
  });

  const tryLocalCommandRef = useRef(tryLocalCommand);
  useEffect(() => { tryLocalCommandRef.current = tryLocalCommand; }, [tryLocalCommand]);

  // ─── Realtime Voice Hook ───
  const voice = useRealtimeVoice({
    voiceEnabled,
    onTranscript: (text) => {
      // In voice-only mode: don't add to chat messages
      if (!voiceOnly) {
        setHasInteracted(true);
        setMessages(prev => [...prev, { role: 'user', content: `🎙️ ${text}` }]);
      }
    },
    onResponse: (text) => {
      // In voice-only mode: don't add to chat messages
      if (!voiceOnly) {
        setMessages(prev => [...prev, { role: 'model', content: text }]);
      }
    },
    tryLocalCommand: (text) => tryLocalCommandRef.current(text),
    onFunctionCall: (name, args) => {
      const result = executeFunctionCall(name, args, router, {
        setTheme, toggleTheme,
        setLang: (l) => setLang(l as 'fr' | 'en' | 'es' | 'ar' | 'zh' | 'ru' | 'ja'),
        closeChat: () => setIsOpen(false),
        clearMessages: () => setMessages([]),
        disconnectVoice: () => voice.disconnect(),
      });
      if (result.displayText && !voiceOnly) {
        setMessages(prev => [...prev, { role: 'model', content: result.displayText! }]);
      }
    },
  });


  const scrollToBottom = useCallback(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, []);

  useEffect(() => {
    scrollToBottom();
  }, [messages, scrollToBottom]);

  useEffect(() => {
    if (isOpen && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isOpen]);

  const sendMessage = async (text?: string) => {
    const messageText = text || input.trim();
    if (!messageText || isLoading) return;

    // Cancel any previous streaming request
    if (abortControllerRef.current) {
      abortControllerRef.current.abort();
    }

    setHasInteracted(true);
    const userMessage: ChatMessage = { role: 'user', content: messageText };
    setMessages((prev) => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);

    // Add an empty streaming message placeholder
    const streamingMessage: ChatMessage = { role: 'model', content: '', isStreaming: true };
    setMessages((prev) => [...prev, streamingMessage]);

    const abortController = new AbortController();
    abortControllerRef.current = abortController;

    try {
      const history = messages.map((m) => ({
        role: m.role,
        content: m.content,
      }));

      const response = await fetch('/api/chat/stream', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: messageText, history, page: pathname }),
        signal: abortController.signal,
      });

      if (!response.ok || !response.body) {
        throw new Error('Stream failed');
      }

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
            if (parsed.text) {
              fullText += parsed.text;
              // Update the streaming message with accumulated text
              setMessages((prev) => {
                const updated = [...prev];
                const lastIdx = updated.length - 1;
                if (lastIdx >= 0 && updated[lastIdx].role === 'model') {
                  updated[lastIdx] = { role: 'model', content: fullText, isStreaming: true };
                }
                return updated;
              });
            }
            // Handle Gemini function calls
            if (parsed.functionCall) {
              const result = executeFunctionCall(
                parsed.functionCall.name,
                parsed.functionCall.args || {},
                router,
                { setTheme, toggleTheme, setLang: (l) => setLang(l as 'fr' | 'en' | 'es' | 'ar' | 'zh' | 'ru' | 'ja'), closeChat: () => setIsOpen(false), clearMessages: () => setMessages([]), disconnectVoice: () => voice.disconnect() }
              );
              if (result.displayText) {
                fullText += (fullText ? '\n\n' : '') + result.displayText;
                setMessages((prev) => {
                  const updated = [...prev];
                  const lastIdx = updated.length - 1;
                  if (lastIdx >= 0 && updated[lastIdx].role === 'model') {
                    updated[lastIdx] = { role: 'model', content: fullText, isStreaming: true };
                  }
                  return updated;
                });
              }
            }
          } catch {
            // Skip malformed chunks
          }
        }
      }

      // Finalize: mark as no longer streaming + speak if voice enabled
      const finalText = fullText || "Désolé, je n'ai pas pu répondre.";
      setMessages((prev) => {
        const updated = [...prev];
        const lastIdx = updated.length - 1;
        if (lastIdx >= 0 && updated[lastIdx].role === 'model') {
          updated[lastIdx] = { role: 'model', content: finalText, isStreaming: false };
        }
        return updated;
      });

      // Read the response aloud
      if (voiceEnabled && finalText) {
        const ttsText = stripMarkdownForTTS(finalText);
        setIsSpeaking(true);
        speak(ttsText, () => setIsSpeaking(false));
      }
    } catch (err) {
      if ((err as Error).name === 'AbortError') return; // Cancelled, ignore
      setMessages((prev) => {
        const updated = [...prev];
        const lastIdx = updated.length - 1;
        if (lastIdx >= 0 && updated[lastIdx].role === 'model') {
          updated[lastIdx] = { role: 'model', content: "Oups, une erreur s'est produite. Réessaie ! 🔄", isStreaming: false };
        }
        return updated;
      });
    } finally {
      setIsLoading(false);
      abortControllerRef.current = null;
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  // ─── Fix 2: Session greeting — generate ONCE, reuse everywhere ───
  const getSessionGreeting = useCallback((): string => {
    const lastGreeting = sessionStorage.getItem(SESSION_GREETING_KEY);
    if (lastGreeting) {
      try {
        const { timestamp, period, text } = JSON.parse(lastGreeting);
        const elapsed = Date.now() - timestamp;
        if (elapsed < 30 * 60 * 1000 && period === getTimePeriod()) {
          // Same session period — short acknowledgment
          return "Je t'écoute.";
        }
        // Different period but same session — reuse stored text if available
        if (text && elapsed < 2 * 60 * 60 * 1000) return text;
      } catch { /* ignore */ }
    }
    // First greeting of session — generate and store
    const text = getVocalGreeting();
    sessionStorage.setItem(SESSION_GREETING_KEY, JSON.stringify({
      timestamp: Date.now(),
      period: getTimePeriod(),
      text,
    }));
    return text;
  }, []);

  // ─── VOICE-ONLY MODE: tap = speak greeting + listen (no chat window) ───
  const startVoiceOnly = async () => {
    setVoiceOnly(true);
    const greetingText = getSessionGreeting();
    await speak(greetingText);
    voice.connect();
  };

  // ─── CHAT MODE: long-press = open chat window (text mode) ───
  const openChat = async () => {
    setIsOpen(true);
    setVoiceOnly(false);
    if (!hasGreetedRef.current && voiceEnabled) {
      hasGreetedRef.current = true;
      setTimeout(async () => {
        setIsSpeaking(true);
        await speak(getSessionGreeting());
        setIsSpeaking(false);
      }, 300);
    }
  };

  const closeChat = () => {
    setIsOpen(false);
    setVoiceOnly(false);
    stopSpeaking();
    setIsSpeaking(false);
    voice.disconnect();
  };

  // Stop voice-only mode when voice disconnects externally
  useEffect(() => {
    if (voiceOnly && voice.voiceState === 'idle') {
      setVoiceOnly(false);
    }
  }, [voiceOnly, voice.voiceState]);

  // ─── Listen for 'iasted:open' custom event (from Portail IA button) ───
  useEffect(() => {
    const handleOpen = () => openChat();
    window.addEventListener('iasted:open', handleOpen);
    return () => window.removeEventListener('iasted:open', handleOpen);
  }, []);

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const markdownComponents: any = {
    a: ({ href, children }: { href?: string; children?: React.ReactNode }) => {
      const isInternal = href && (href.startsWith('/') || href.startsWith('#'));
      if (isInternal) {
        return (
          <Link
            href={href}
            className="text-emerald-600 dark:text-emerald-400 hover:underline font-medium inline-flex items-center gap-1"
          >
            {children}
          </Link>
        );
      }
      return (
        <a
          href={href}
          className="text-emerald-600 dark:text-emerald-400 hover:underline font-medium inline-flex items-center gap-1"
          target="_blank"
          rel="noopener noreferrer"
        >
          {children}
          <ExternalLink className="w-3 h-3" />
        </a>
      );
    },
    p: ({ children }: { children?: React.ReactNode }) => (
      <p className="mb-2 last:mb-0 text-gray-800 dark:text-gray-100">{children}</p>
    ),
    strong: ({ children }: { children?: React.ReactNode }) => (
      <strong className="font-bold text-gray-900 dark:text-white">{children}</strong>
    ),
    ul: ({ children }: { children?: React.ReactNode }) => (
      <ul className="list-disc list-inside space-y-1 my-2">{children}</ul>
    ),
    ol: ({ children }: { children?: React.ReactNode }) => (
      <ol className="list-decimal list-inside space-y-1 my-2">{children}</ol>
    ),
    li: ({ children }: { children?: React.ReactNode }) => (
      <li className="text-sm">{children}</li>
    ),
    h2: ({ children }: { children?: React.ReactNode }) => (
      <h2 className="text-base font-bold mt-3 mb-1">{children}</h2>
    ),
    h3: ({ children }: { children?: React.ReactNode }) => (
      <h3 className="text-sm font-bold mt-2 mb-1">{children}</h3>
    ),
  };

  return (
    <>
      {/* ═══════════════════════════════════════════ */}
      {/* FENÊTRE DE CHAT                            */}
      {/* ═══════════════════════════════════════════ */}
      {isOpen && (
        <div
          className="fixed z-50 flex flex-col overflow-hidden chatbot-window inset-0 rounded-none sm:inset-auto sm:bottom-24 sm:right-6 sm:w-[420px] sm:max-h-[75vh] sm:rounded-2xl border border-gray-200/50 dark:border-white/10 bg-white/80 dark:bg-slate-900/80 backdrop-blur-2xl"
          style={{
            boxShadow:
              '0 8px 40px rgba(0,0,0,0.15), 0 0 60px rgba(16,185,129,0.06)',
          }}
        >
          {/* ── Header ── */}
          <div className="flex items-center justify-between px-5 py-4 shrink-0"
            style={{
              background: 'linear-gradient(135deg, #059669 0%, #10b981 100%)',
              color: 'white',
            }}
          >
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center backdrop-blur-sm">
                <Bot className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-bold text-sm">iAsted 🤖</h3>
                <p className="text-xs opacity-80">
                  {voice.voiceState === 'listening' ? (
                    <span className="flex items-center gap-1">
                      <span className="w-1.5 h-1.5 bg-emerald-300 rounded-full animate-pulse" />
                      à l&apos;écoute…
                    </span>
                  ) : voice.voiceState === 'thinking' ? (
                    <span className="flex items-center gap-1">
                      <span className="w-1.5 h-1.5 bg-blue-300 rounded-full animate-pulse" />
                      réfléchit…
                    </span>
                  ) : voice.voiceState === 'speaking' ? (
                    <span className="flex items-center gap-1">
                      <span className="w-1.5 h-1.5 bg-emerald-300 rounded-full animate-pulse" />
                      parle…
                    </span>
                  ) : isLoading ? (
                    <span className="flex items-center gap-1">
                      <span className="w-1.5 h-1.5 bg-white rounded-full animate-pulse" />
                      en train d&apos;écrire…
                    </span>
                  ) : (
                    'Assistant IA — GABON BIZ'
                  )}
                </p>
              </div>
            </div>
            <div className="flex items-center gap-1">
              {/* Voice toggle (TTS) */}
              <button
                type="button"
                onClick={() => {
                  setVoiceEnabled(!voiceEnabled);
                  if (isSpeaking) { stopSpeaking(); setIsSpeaking(false); }
                }}
                className={`p-2 rounded-full transition-colors ${voiceEnabled ? 'bg-white/20 hover:bg-white/30' : 'hover:bg-white/20 opacity-60'}`}
                aria-label={voiceEnabled ? 'Désactiver la voix' : 'Activer la voix'}
                title={voiceEnabled ? 'Voix activée' : 'Voix désactivée'}
              >
                {voiceEnabled ? <Volume2 className="w-4 h-4" /> : <VolumeX className="w-4 h-4" />}
              </button>

              {/* Mic button — 5 visual states */}
              <VoiceMicButton
                voiceState={voice.voiceState}
                audioLevel={voice.audioLevel}
                onConnect={voice.connect}
                onDisconnect={voice.disconnect}
              />

              {/* Close */}
              <button
                type="button"
                onClick={closeChat}
                className="p-2 rounded-full hover:bg-white/20 transition-colors"
                aria-label="Fermer le chat"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* ── Voice transcript bar ── */}
          {voice.voiceState !== 'idle' && voice.transcript && (
            <div className="px-4 py-2 bg-emerald-50 dark:bg-emerald-900/20 border-b border-emerald-200/50 dark:border-emerald-800/30 text-xs text-emerald-700 dark:text-emerald-400 flex items-center gap-2">
              <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-pulse shrink-0" />
              <span className="truncate italic">&ldquo;{voice.transcript}&rdquo;</span>
            </div>
          )}

          {/* ── Zone des messages ── */}
          <div className="flex-1 overflow-y-auto px-4 py-4 space-y-4">
            {/* Message de bienvenue */}
            <div className="flex gap-3">
              <div className="w-8 h-8 rounded-full bg-emerald-500/10 flex items-center justify-center shrink-0 mt-1">
                <Bot className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
              </div>
              <div className="bg-gray-100/80 dark:bg-white/10 border border-gray-200/50 dark:border-white/10 px-4 py-3 rounded-2xl rounded-tl-md max-w-[85%] text-sm leading-relaxed text-gray-800 dark:text-gray-100 chatbot-message">
                <ReactMarkdown components={markdownComponents}>
                  {getWelcomeMessage()}
                </ReactMarkdown>
              </div>
            </div>

            {/* Messages du chat */}
            {messages.map((msg, idx) => (
              <div
                key={idx}
                className={`flex gap-3 ${msg.role === 'user' ? 'flex-row-reverse' : ''}`}
              >
                <div
                  className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 mt-1 ${
                    msg.role === 'user'
                      ? 'bg-emerald-600 text-white'
                      : 'bg-emerald-500/10'
                  }`}
                >
                  {msg.role === 'user' ? (
                    <User className="w-4 h-4" />
                  ) : (
                    <Bot className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
                  )}
                </div>
                <div
                  className={`px-4 py-3 rounded-2xl max-w-[85%] text-sm leading-relaxed chatbot-message ${
                    msg.role === 'user'
                      ? 'bg-emerald-600 text-white rounded-tr-md'
                      : 'bg-gray-100/80 dark:bg-white/10 border border-gray-200/50 dark:border-white/10 text-gray-800 dark:text-gray-100 rounded-tl-md'
                  }`}
                >
                  {msg.role === 'model' ? (
                    <>
                      <ReactMarkdown components={markdownComponents}>
                        {msg.content}
                      </ReactMarkdown>
                      {msg.isStreaming && (
                        <span className="inline-block w-0.5 h-4 bg-emerald-500 animate-pulse ml-0.5 align-text-bottom" />
                      )}
                    </>
                  ) : (
                    msg.content
                  )}
                </div>
              </div>
            ))}

            {/* Indicateur de chargement initial (avant le premier chunk) */}
            {isLoading && messages.length > 0 && messages[messages.length - 1].role === 'model' && messages[messages.length - 1].content === '' && (
              <div className="flex gap-3">
                <div className="w-8 h-8 rounded-full bg-emerald-500/10 flex items-center justify-center shrink-0 mt-1">
                  <Bot className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
                </div>
                <div className="bg-gray-100/80 dark:bg-white/10 border border-gray-200/50 dark:border-white/10 px-4 py-3 rounded-2xl rounded-tl-md">
                  <div className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400">
                    <Loader2 className="w-4 h-4 animate-spin" />
                    <span>iAsted réfléchit…</span>
                  </div>
                </div>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          {/* ── Zone de saisie ── */}
          <div className="border-t border-gray-200/50 dark:border-white/10 px-4 py-3 shrink-0 safe-area-bottom">
            {/* Suggestion chips (only when no messages yet) */}
            {messages.length === 0 && (
              <div className="flex flex-wrap gap-1.5 mb-3">
                {getSuggestions(pathname).map((s, i) => (
                  <button
                    key={i}
                    type="button"
                    onClick={() => { setInput(s.message); setTimeout(() => sendMessage(s.message), 50); }}
                    className="text-xs px-3 py-1.5 rounded-full bg-emerald-50 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-300 border border-emerald-200/50 dark:border-emerald-700/30 hover:bg-emerald-100 dark:hover:bg-emerald-800/40 transition-all cursor-pointer"
                  >
                    {s.label}
                  </button>
                ))}
              </div>
            )}
            <div className="flex items-center gap-2">
              <input
                ref={inputRef}
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="Pose ta question…"
                className="flex-1 bg-gray-100/60 dark:bg-white/10 border border-gray-200/50 dark:border-white/15 rounded-xl px-4 py-2.5 text-sm text-gray-900 dark:text-white placeholder:text-gray-400 dark:placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-emerald-500/30 focus:border-emerald-500/40 transition-all"
                disabled={isLoading}
              />
              <button
                type="button"
                onClick={() => sendMessage()}
                disabled={isLoading || !input.trim()}
                className="p-2.5 rounded-xl bg-emerald-600 text-white hover:bg-emerald-700 disabled:opacity-40 disabled:cursor-not-allowed transition-all"
                aria-label="Envoyer"
              >
                <Send className="w-4 h-4" />
              </button>
            </div>
            <p className="text-[10px] text-gray-400 dark:text-gray-500 mt-2 text-center">
              Propulsé par Gemini — GABON BIZ
            </p>
          </div>
        </div>
      )}

      {/* ═══════════════════════════════════════════ */}
      {/* BOUTON FLOTTANT (FAB) — DRAGGABLE          */}
      {/* Tap = voix autonome, Appui long = chat     */}
      {/* ═══════════════════════════════════════════ */}
      {!isOpen && (
        <button
          ref={fabRef}
          type="button"
          onPointerDown={(e) => {
            // ★ Unlock audio playback on mobile (must be in user gesture)
            unlockAudio();
            (e.target as HTMLElement).setPointerCapture(e.pointerId);
            const rect = fabRef.current?.getBoundingClientRect();
            if (!rect) return;
            dragStartRef.current = {
              px: e.clientX, py: e.clientY,
              sx: rect.left, sy: rect.top,
            };
            hasDraggedRef.current = false;
            isDraggingRef.current = false;
            pressStartRef.current = Date.now();

            // Long-press detection: vibrate at 400ms to signal chat mode
            longPressTimerRef.current = setTimeout(() => {
              if (!hasDraggedRef.current) {
                // Haptic feedback if available (not on iOS Safari)
                try { navigator?.vibrate?.(30); } catch { /* unsupported */ }
              }
            }, 400);
          }}
          onPointerMove={(e) => {
            if (!dragStartRef.current) return;
            const dx = e.clientX - dragStartRef.current.px;
            const dy = e.clientY - dragStartRef.current.py;
            if (!isDraggingRef.current && Math.abs(dx) + Math.abs(dy) < 5) return;
            isDraggingRef.current = true;
            hasDraggedRef.current = true;
            if (longPressTimerRef.current) { clearTimeout(longPressTimerRef.current); longPressTimerRef.current = null; }
            e.preventDefault();
            const fabSize = fabRef.current?.offsetWidth || 84;
            const newX = Math.max(0, Math.min(window.innerWidth - fabSize, dragStartRef.current.sx + dx));
            const newY = Math.max(0, Math.min(window.innerHeight - fabSize, dragStartRef.current.sy + dy));
            setFabPos({ x: newX, y: newY });
          }}
          onPointerUp={(e) => {
            (e.target as HTMLElement).releasePointerCapture(e.pointerId);
            isDraggingRef.current = false;
            dragStartRef.current = null;
            if (longPressTimerRef.current) { clearTimeout(longPressTimerRef.current); longPressTimerRef.current = null; }
            if (hasDraggedRef.current) return; // Was a drag, not a click

            // If in voice-only mode, clicking stops voice
            if (voiceOnly) {
              setVoiceOnly(false);
              voice.disconnect();
              stopSpeaking();
              return;
            }

            // Long-press (>400ms) = chat, Short tap (<400ms) = voice
            const pressDuration = Date.now() - pressStartRef.current;
            if (pressDuration > 400) {
              openChat(); // Long press → open chat
            } else {
              startVoiceOnly(); // Short tap → voice only
            }
          }}
          className="fixed z-50 flex items-center justify-center text-white touch-none select-none"
          style={{
            width: 84,
            height: 84,
            borderRadius: '50%',
            ...(fabPos
              ? { left: fabPos.x, top: fabPos.y }
              : { bottom: 24, right: 16 }),
            background: voiceOnly
              ? voice.voiceState === 'listening'
                ? 'linear-gradient(135deg, #10b981 0%, #34d399 100%)'
                : voice.voiceState === 'thinking'
                  ? 'linear-gradient(135deg, #3b82f6 0%, #60a5fa 100%)'
                  : voice.voiceState === 'speaking'
                    ? 'linear-gradient(135deg, #10b981 0%, #06b6d4 100%)'
                    : 'linear-gradient(135deg, #f59e0b 0%, #fbbf24 100%)'
              : 'linear-gradient(135deg, #E74C3C 0%, #FF6B9D 35%, #EAB308 100%)',
            boxShadow: voiceOnly
              ? voice.voiceState === 'listening'
                ? `0 0 ${20 + voice.audioLevel * 40}px rgba(16, 185, 129, ${0.4 + voice.audioLevel * 0.4}), 0 0 60px rgba(16, 185, 129, 0.15)`
                : voice.voiceState === 'thinking'
                  ? '0 0 30px rgba(59, 130, 246, 0.5), 0 0 60px rgba(59, 130, 246, 0.15)'
                  : voice.voiceState === 'speaking'
                    ? '0 0 30px rgba(16, 185, 129, 0.5), 0 0 60px rgba(6, 182, 212, 0.15)'
                    : '0 6px 30px rgba(245, 158, 11, 0.4)'
              : '0 6px 30px rgba(231, 76, 60, 0.4), 0 0 50px rgba(234, 179, 8, 0.2)',
            transition: isDraggingRef.current ? 'none' : 'background 0.4s ease, box-shadow 0.3s ease',
            cursor: 'grab',
            // Heartbeat animation — distinct names per state force browser to restart animation
            animation: voiceOnly
              ? voice.voiceState === 'listening'
                ? 'iasted-hb-listen 1200ms ease-in-out infinite'   // ~50 BPM
                : voice.voiceState === 'thinking'
                  ? 'iasted-hb-think 800ms ease-in-out infinite'   // ~75 BPM
                  : voice.voiceState === 'speaking'
                    ? 'iasted-hb-speak 545ms ease-in-out infinite'  // ~110 BPM
                    : 'iasted-hb-idle 1500ms ease-in-out infinite'  // ~40 BPM
              : 'iasted-hb-idle 1500ms ease-in-out infinite',
          }}
          aria-label={voiceOnly ? 'iAsted écoute — cliquer pour arrêter' : 'Tap = parler, Appui long = chat'}
        >
          {voiceOnly ? (
            voice.voiceState === 'listening' ? (
              /* 🎙️ Écoute — barres STATIQUES réactives au niveau audio réel */
              <span className="pointer-events-none flex items-center justify-center gap-[3px]">
                {[0,1,2,3,4].map(i => {
                  // Each bar reacts to audioLevel with slight per-bar variation
                  const barLevel = Math.min(1, voice.audioLevel * (0.7 + i * 0.15));
                  const minH = 4;
                  const maxH = 18;
                  const h = minH + barLevel * (maxH - minH);
                  return (
                    <span
                      key={i}
                      className="bg-white rounded-full"
                      style={{
                        width: 3,
                        height: h,
                        opacity: 0.5 + barLevel * 0.5,
                        transition: 'height 150ms ease-out, opacity 150ms ease-out',
                      }}
                    />
                  );
                })}
              </span>
            ) : voice.voiceState === 'thinking' ? (
              /* 🤔 Réfléchit — spinner */
              <span className="pointer-events-none animate-spin">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                  <circle cx="12" cy="12" r="10" stroke="white" strokeWidth="2" strokeDasharray="31.4" strokeDashoffset="10" strokeLinecap="round" />
                </svg>
              </span>
            ) : voice.voiceState === 'speaking' ? (
              /* 🗣️ Parle — barres ANIMÉES rapides, plus larges/hautes = énergie visible */
              <span className="pointer-events-none flex items-center justify-center gap-[3px]">
                {[0,1,2,3,4].map(i => (
                  <span
                    key={i}
                    className="bg-white rounded-full"
                    style={{
                      width: 3.5,
                      animation: `iasted-speak-bar ${0.25 + i * 0.075}s ease-in-out infinite alternate`,
                      animationDelay: `${i * 0.06}s`,
                    }}
                  />
                ))}
              </span>
            ) : (
              <span className="font-extrabold text-sm text-white tracking-wide pointer-events-none">
                ...
              </span>
            )
          ) : (
            <span className="font-extrabold text-sm text-white tracking-wide pointer-events-none">
              iAsted
            </span>
          )}
        </button>
      )}

      {/* CSS Animations for voice FAB — distinct keyframes per state */}
      <style>{`
        @keyframes iasted-hb-idle {
          0%   { transform: scale(1); }
          14%  { transform: scale(1.04); }
          28%  { transform: scale(0.98); }
          42%  { transform: scale(1.02); }
          70%  { transform: scale(1); }
          100% { transform: scale(1); }
        }
        @keyframes iasted-hb-listen {
          0%   { transform: scale(1); }
          14%  { transform: scale(1.06); }
          28%  { transform: scale(0.96); }
          42%  { transform: scale(1.04); }
          56%  { transform: scale(0.98); }
          70%  { transform: scale(1.02); }
          100% { transform: scale(1); }
        }
        @keyframes iasted-hb-think {
          0%   { transform: scale(1) rotate(0deg); }
          25%  { transform: scale(1.08) rotate(1deg); }
          50%  { transform: scale(0.95) rotate(-1deg); }
          75%  { transform: scale(1.06) rotate(0.5deg); }
          100% { transform: scale(1) rotate(0deg); }
        }
        @keyframes iasted-hb-speak {
          0%   { transform: scale(1); }
          10%  { transform: scale(1.12); }
          20%  { transform: scale(0.94); }
          35%  { transform: scale(1.10); }
          50%  { transform: scale(0.96); }
          65%  { transform: scale(1.06); }
          80%  { transform: scale(0.98); }
          100% { transform: scale(1); }
        }
        @keyframes iasted-speak-bar {
          0%   { height: 4px; opacity: 0.6; }
          100% { height: 22px; opacity: 1; }
        }
      `}</style>
    </>
  );
}
