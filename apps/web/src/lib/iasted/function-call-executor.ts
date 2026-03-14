// ─── Client-side Gemini Function Call Executor ───────────────────
// Executes function calls returned by Gemini via the SSE stream.
// Each function maps to a user-facing action (navigation, UI control, etc.)

import type { AppRouterInstance } from 'next/dist/shared/lib/app-router-context.shared-runtime';

export interface FunctionCallResult {
  /** Text to display to the user (if any) */
  displayText?: string;
  /** Whether the function was successfully executed */
  executed: boolean;
}

/**
 * Execute a Gemini function call on the client side.
 * @param name - Function name from IASTED_TOOLS
 * @param args - Arguments returned by Gemini
 * @param router - Next.js router for navigation
 * @param uiActions - UI action callbacks
 */
export function executeFunctionCall(
  name: string,
  args: Record<string, string>,
  router: AppRouterInstance,
  uiActions: {
    setTheme?: (theme: 'light' | 'dark') => void;
    toggleTheme?: () => void;
    setLang?: (lang: string) => void;
    closeChat?: () => void;
    clearMessages?: () => void;
    disconnectVoice?: () => void;
  }
): FunctionCallResult {
  console.log(`[iAsted] [functionCall] ${name}`, args);

  switch (name) {
    case 'navigate_to': {
      const path = args.path || '/';
      const section = args.section || '';
      router.push(path + section);
      return { executed: true, displayText: `🧭 Navigation vers ${path}${section}` };
    }

    case 'search_ecosystem': {
      const query = args.query || '';
      router.push(`/annuaire?q=${encodeURIComponent(query)}`);
      return { executed: true, displayText: `🔍 Recherche dans l'annuaire : "${query}"` };
    }

    case 'search_marches_publics': {
      const params = new URLSearchParams();
      if (args.sector) params.set('sector', args.sector);
      if (args.status) params.set('status', args.status);
      router.push(`/dashboard/marches?${params.toString()}`);
      return { executed: true, displayText: `📋 Recherche de marchés publics` };
    }

    case 'start_business_creation': {
      const type = args.business_type || 'SARL';
      router.push(`/services/guichet-entrepreneur?type=${type}`);
      return { executed: true, displayText: `🏢 Démarrage création d'entreprise (${type})` };
    }

    case 'get_sing_programs': {
      router.push('/services/incubateur');
      return { executed: true, displayText: `🚀 Programmes SING SA` };
    }

    case 'search_solutions_kimba': {
      const query = args.query || '';
      router.push(`/dashboard/innovation?q=${encodeURIComponent(query)}`);
      return { executed: true, displayText: `💡 Recherche KIMBA : "${query}"` };
    }

    case 'simulate_roi': {
      const vertical = args.vertical || 'fintech';
      router.push(`/dashboard/investir/simulateur?vertical=${vertical}`);
      return { executed: true, displayText: `📊 Simulateur ROI — ${vertical}` };
    }

    case 'get_indicators': {
      router.push('/dashboard/observatoire');
      return { executed: true, displayText: `📈 Observatoire de l'Économie Numérique` };
    }

    case 'control_ui': {
      const action = args.action;
      switch (action) {
        case 'set_theme_dark':
          uiActions.setTheme?.('dark');
          return { executed: true, displayText: '🌙 Thème sombre activé' };
        case 'set_theme_light':
          uiActions.setTheme?.('light');
          return { executed: true, displayText: '☀️ Thème clair activé' };
        case 'toggle_theme':
          uiActions.toggleTheme?.();
          return { executed: true, displayText: '🔄 Thème basculé' };
        case 'set_locale':
          uiActions.setLang?.(args.value || 'fr');
          return { executed: true, displayText: `🌐 Langue → ${args.value || 'fr'}` };
        case 'close_chat':
          uiActions.closeChat?.();
          return { executed: true };
        case 'clear_chat':
          uiActions.clearMessages?.();
          return { executed: true, displayText: '🗑️ Conversation effacée' };
        default:
          return { executed: false };
      }
    }

    case 'stop_conversation': {
      uiActions.disconnectVoice?.();
      return { executed: true, displayText: '👋 Conversation terminée' };
    }

    default:
      console.warn(`[iAsted] [functionCall] Unknown function: ${name}`);
      return { executed: false };
  }
}
