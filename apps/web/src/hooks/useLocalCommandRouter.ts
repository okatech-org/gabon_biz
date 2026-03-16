'use client';

import { useCallback } from 'react';
import { useRouter } from 'next/navigation';
import { useTheme } from '@/lib/theme-provider';
import { useI18n } from '@/lib/i18n/i18nContext';
import { matchCommand, SILENT_ACTIONS } from '@/lib/iasted/commands';
import type { CommandMatch } from '@/types/iasted';
import type { Lang } from '@/lib/i18n/translations';

interface LocalCommandActions {
  openChat: () => void;
  closeChat: () => void;
  clearMessages: () => void;
  disconnectVoice: () => void;
  setVoiceEnabled: (enabled: boolean) => void;
}

/**
 * Hook that matches voice transcripts against 60+ local commands
 * and executes them directly (zero cost, no AI call needed).
 *
 * Returns `tryLocalCommand` which returns true if a local command was matched and executed.
 */
export function useLocalCommandRouter(actions: LocalCommandActions) {
  const router = useRouter();
  const { setTheme, toggleTheme } = useTheme();
  const { setLang } = useI18n();

  const executeCommand = useCallback(
    (match: CommandMatch) => {
      console.log(
        `[iAsted] [local] Executing: ${match.action}`,
        match.params,
        `(confidence: ${match.confidence})`,
      );

      switch (match.action) {
        // ── Navigation ──
        case 'navigate': {
          const path = match.params.path || '/';
          const section = match.params.section || '';
          router.push(path + section);
          break;
        }

        // ── Theme ──
        case 'setTheme':
          setTheme(match.params.theme as 'light' | 'dark');
          break;
        case 'toggleTheme':
          toggleTheme();
          break;

        // ── Language ──
        case 'setLocale':
          setLang(match.params.lang as Lang);
          break;

        // ── Voice ──
        case 'muteVoice':
          actions.setVoiceEnabled(false);
          break;
        case 'unmuteVoice':
          actions.setVoiceEnabled(true);
          break;
        case 'changeVoice':
          // Voice change handled at the component level
          break;

        // ── Chat ──
        case 'openChat':
          actions.openChat();
          break;
        case 'closeChat':
          actions.closeChat();
          break;
        case 'clearMessages':
          actions.clearMessages();
          break;

        // ── Disconnect (with farewell via OpenAI TTS for voice consistency) ──
        case 'disconnectVoice': {
          // Speak goodbye via OpenAI TTS API (same 'echo' voice as all other speech)
          fetch('/api/voice/tts', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ text: 'À bientôt !', voice: 'echo' }),
          })
            .then((res) => (res.ok ? res.blob() : null))
            .then((blob) => {
              if (blob) {
                const audio = new Audio(URL.createObjectURL(blob));
                audio.onended = () => actions.disconnectVoice();
                audio.onerror = () => actions.disconnectVoice();
                audio.play().catch(() => actions.disconnectVoice());
              } else {
                actions.disconnectVoice();
              }
            })
            .catch(() => actions.disconnectVoice());
          break;
        }
      }
    },
    [router, setTheme, toggleTheme, setLang, actions],
  );

  /**
   * Try to match and execute a local command.
   * @returns true if a command was matched and executed, false otherwise
   */
  const tryLocalCommand = useCallback(
    (transcript: string): boolean => {
      const match = matchCommand(transcript);
      if (!match) return false;

      executeCommand(match);

      // Always return true when a command was matched — prevents sending to GPT
      return true;
    },
    [executeCommand],
  );

  return { tryLocalCommand };
}
