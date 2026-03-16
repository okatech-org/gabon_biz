'use client';

import { useCallback } from 'react';
import { useRouter } from 'next/navigation';
import { useTheme } from '@/lib/theme-provider';
import { useI18n } from '@/lib/i18n/i18nContext';
import { matchCommand } from '@/lib/iasted/commands';
import type { CommandMatch } from '@/types/iasted';
import type { Lang } from '@/lib/i18n/translations';

interface LocalCommandActions {
  openChat: () => void;
  closeChat: () => void;
  clearMessages: () => void;
  disconnectVoice: () => void;
  setVoiceEnabled: (enabled: boolean) => void;
}

/** Map of language codes to display names for vocal confirmation */
const LANG_NAMES: Record<string, string> = {
  fr: 'français',
  en: 'anglais',
  es: 'espagnol',
  ar: 'arabe',
  zh: 'chinois',
  ru: 'russe',
  ja: 'japonais',
};

/** Result of executing a local command */
export interface LocalCommandResult {
  /** Whether a command was matched and executed */
  matched: boolean;
  /** Confirmation message for vocal/visual feedback */
  confirmationText?: string;
  /** Whether this command is silent (no vocal feedback expected) */
  silent?: boolean;
}

/**
 * Hook that matches voice transcripts against 60+ local commands
 * and executes them directly (zero cost, no AI call needed).
 *
 * Returns `tryLocalCommand` which returns a result object with match status and confirmation text.
 */
export function useLocalCommandRouter(actions: LocalCommandActions) {
  const router = useRouter();
  const { setTheme, toggleTheme } = useTheme();
  const { setLang } = useI18n();

  const executeCommand = useCallback(
    (match: CommandMatch): LocalCommandResult => {
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
          return { matched: true, confirmationText: undefined, silent: true };
        }

        // ── Theme ──
        case 'setTheme': {
          const theme = match.params.theme as 'light' | 'dark';
          setTheme(theme);
          const label = theme === 'dark' ? 'sombre' : 'clair';
          console.log(`[iAsted] [local] Theme set to: ${theme}`);
          return {
            matched: true,
            confirmationText: `Le mode ${label} est activé.`,
            silent: match.silent,
          };
        }
        case 'toggleTheme': {
          toggleTheme();
          console.log('[iAsted] [local] Theme toggled');
          return {
            matched: true,
            confirmationText: 'Le thème a été changé.',
            silent: match.silent,
          };
        }

        // ── Language ──
        case 'setLocale': {
          const lang = match.params.lang as Lang;
          setLang(lang);
          const langName = LANG_NAMES[lang] || lang;
          console.log(`[iAsted] [local] Locale set to: ${lang}`);
          return {
            matched: true,
            confirmationText: `L'interface est maintenant en ${langName}.`,
            silent: match.silent,
          };
        }

        // ── Voice ──
        case 'muteVoice':
          actions.setVoiceEnabled(false);
          return {
            matched: true,
            confirmationText: 'La voix est coupée.',
            silent: false,
          };
        case 'unmuteVoice':
          actions.setVoiceEnabled(true);
          return {
            matched: true,
            confirmationText: 'La voix est activée.',
            silent: false,
          };
        case 'changeVoice':
          // Voice change handled at the component level
          return { matched: true, confirmationText: undefined, silent: true };

        // ── Chat ──
        case 'openChat':
          actions.openChat();
          return { matched: true, confirmationText: undefined, silent: true };
        case 'closeChat':
          actions.closeChat();
          return { matched: true, confirmationText: undefined, silent: true };
        case 'clearMessages':
          actions.clearMessages();
          return {
            matched: true,
            confirmationText: 'La conversation a été effacée.',
            silent: false,
          };

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
          return { matched: true, confirmationText: undefined, silent: true };
        }

        default:
          return { matched: false };
      }
    },
    [router, setTheme, toggleTheme, setLang, actions],
  );

  /**
   * Try to match and execute a local command.
   * @returns LocalCommandResult with match status and optional confirmation text
   */
  const tryLocalCommand = useCallback(
    (transcript: string): LocalCommandResult => {
      const match = matchCommand(transcript);
      if (!match) return { matched: false };

      return executeCommand(match);
    },
    [executeCommand],
  );

  return { tryLocalCommand };
}
