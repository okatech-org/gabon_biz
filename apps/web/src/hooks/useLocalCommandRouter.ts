'use client';

import { useCallback } from 'react';
import { useRouter } from 'next/navigation';
import { useTheme } from '@/lib/theme-provider';
import { useI18n } from '@/lib/i18n/i18nContext';
import { matchCommand, SILENT_ACTIONS } from '@/lib/iasted/commands';
import type { CommandMatch } from '@/types/iasted';
import type { Lang } from '@/lib/i18n/translations';

interface LocalCommandActions {
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

  const executeCommand = useCallback((match: CommandMatch) => {
    console.log(`[iAsted] [local] Executing: ${match.action}`, match.params, `(confidence: ${match.confidence})`);

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
      case 'closeChat':
        actions.closeChat();
        break;
      case 'clearMessages':
        actions.clearMessages();
        break;

      // ── Disconnect (with farewell) ──
      case 'disconnectVoice': {
        // Speak a brief goodbye before disconnecting
        if (typeof window !== 'undefined' && window.speechSynthesis) {
          const farewell = new SpeechSynthesisUtterance('À bientôt !');
          farewell.lang = 'fr-FR';
          farewell.rate = 0.95;
          farewell.pitch = 0.9;
          farewell.onend = () => actions.disconnectVoice();
          window.speechSynthesis.cancel();
          window.speechSynthesis.speak(farewell);
        } else {
          actions.disconnectVoice();
        }
        break;
      }
    }
  }, [router, setTheme, toggleTheme, setLang, actions]);

  /**
   * Try to match and execute a local command.
   * @returns true if a command was matched and executed, false otherwise
   */
  const tryLocalCommand = useCallback((transcript: string): boolean => {
    const match = matchCommand(transcript);
    if (!match) return false;

    executeCommand(match);

    // Return whether this was a silent action (no vocal feedback needed)
    return SILENT_ACTIONS.includes(match.action);
  }, [executeCommand]);

  return { tryLocalCommand };
}
