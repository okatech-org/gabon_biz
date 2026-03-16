// ─── Client-side GPT Function Call Executor ───────────────────
// Executes function calls returned by GPT via the SSE stream.
// Each function maps to a user-facing action (navigation, UI control, etc.)

import type { AppRouterInstance } from 'next/dist/shared/lib/app-router-context.shared-runtime';

export interface FunctionCallResult {
  /** Text to display to the user (if any) */
  displayText?: string;
  /** Whether the function was successfully executed */
  executed: boolean;
  /** Structured data returned by the function (for LLM context) */
  data?: Record<string, unknown>;
}

/**
 * Execute a GPT function call on the client side.
 * @param name - Function name from IASTED_TOOLS
 * @param args - Arguments returned by GPT
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
    openChat?: () => void;
    closeChat?: () => void;
    clearMessages?: () => void;
    disconnectVoice?: () => void;
  },
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
          console.log('[iAsted] [functionCall] Calling setTheme("dark")');
          uiActions.setTheme?.('dark');
          return { executed: true, displayText: '🌙 Thème sombre activé' };
        case 'set_theme_light':
          console.log('[iAsted] [functionCall] Calling setTheme("light")');
          uiActions.setTheme?.('light');
          return { executed: true, displayText: '☀️ Thème clair activé' };
        case 'toggle_theme':
          console.log('[iAsted] [functionCall] Calling toggleTheme()');
          uiActions.toggleTheme?.();
          return { executed: true, displayText: '🔄 Thème basculé' };
        case 'set_locale': {
          const locale = args.value || 'fr';
          console.log(`[iAsted] [functionCall] Calling setLang("${locale}")`);
          uiActions.setLang?.(locale);
          const langNames: Record<string, string> = {
            fr: 'Français',
            en: 'English',
            es: 'Español',
            ar: 'العربية',
            zh: '中文',
            ru: 'Русский',
            ja: '日本語',
          };
          return {
            executed: true,
            displayText: `🌐 Langue de l'interface → ${langNames[locale] || locale}`,
          };
        }
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

    // ═══ New Agent Tools (Data-Returning) ══════════════════════════

    case 'verify_enterprise': {
      const query = args.query || '';
      router.push(`/annuaire/verifier?q=${encodeURIComponent(query)}`);
      return {
        executed: true,
        displayText: `🔍 Vérification de l'entreprise : "${query}"\n\n📋 Redirection vers le module de vérification RCCM/NIF...`,
        data: {
          action: 'verify_enterprise',
          query,
          tip: "Le résultat de la vérification s'affiche sur la page. Tu peux aussi chercher par nom, RCCM ou NIF.",
        },
      };
    }

    case 'compare_business_types': {
      const types = (args.types || 'EI,SARL,SAS,SA').split(',').map((t) => t.trim());
      const comparisonData: Record<
        string,
        {
          capital: string;
          cost: string;
          associes: string;
          responsabilite: string;
          avantages: string[];
          inconvenients: string[];
        }
      > = {
        EI: {
          capital: 'Pas de minimum',
          cost: '~50 000 XAF',
          associes: '1 (entrepreneur)',
          responsabilite: 'Illimitée (patrimoine personnel)',
          avantages: ['Simple et rapide', 'Coût minimal', 'Pas de capital requis'],
          inconvenients: [
            'Responsabilité illimitée',
            'Difficile de lever des fonds',
            'Image moins professionnelle',
          ],
        },
        SARL: {
          capital: '100 000 XAF minimum',
          cost: '~150 000 XAF',
          associes: '2 à 100',
          responsabilite: 'Limitée aux apports',
          avantages: ['Responsabilité limitée', 'Flexible', 'Adaptée aux PME'],
          inconvenients: [
            'Au moins 2 associés',
            'Cession de parts encadrée',
            'Formalisme plus lourd',
          ],
        },
        SAS: {
          capital: 'Libre (1 XAF minimum)',
          cost: '~200 000 XAF',
          associes: '1+ (SASU possible)',
          responsabilite: 'Limitée aux apports',
          avantages: ['Grande liberté statutaire', 'Idéal pour startups', 'Attractif pour VC'],
          inconvenients: ['Rédaction des statuts complexe', 'Pas de cotation en bourse'],
        },
        SA: {
          capital: '10 000 000 XAF minimum',
          cost: '~300 000 XAF',
          associes: '1+ (SA unipersonnelle possible)',
          responsabilite: 'Limitée aux apports',
          avantages: ['Cotation possible', 'Crédibilité maximale', 'Levée de fonds facile'],
          inconvenients: [
            'Capital élevé',
            'Gouvernance lourde',
            'Commissaire aux comptes obligatoire',
          ],
        },
      };
      const result = types
        .filter((t) => comparisonData[t])
        .map((t) => ({
          type: t,
          ...comparisonData[t],
        }));
      return {
        executed: true,
        displayText: `⚖️ Comparaison des formes juridiques : ${types.join(' vs ')}`,
        data: { comparison: result },
      };
    }

    case 'get_marche_details': {
      const marcheId = args.marche_id || '';
      const sector = args.sector || '';
      const params = new URLSearchParams();
      if (marcheId) params.set('q', marcheId);
      if (sector) params.set('sector', sector);
      router.push(`/services/marches-publics?${params.toString()}`);
      return {
        executed: true,
        displayText: `📋 Recherche de marché public${marcheId ? ` : "${marcheId}"` : ''}${sector ? ` (secteur: ${sector})` : ''}`,
        data: {
          action: 'get_marche_details',
          tip: "Les détails du marché s'affichent sur la page. Tu peux consulter le budget, les deadlines et les critères.",
        },
      };
    }

    case 'check_eligibility': {
      const program = args.program || 'innovation_4_0';
      const stage = args.stage || 'idee';
      const teamSize = parseInt(args.team_size || '1');
      const eligibilityRules: Record<
        string,
        { minStage: string[]; minTeam: number; name: string; deadline: string; places: string }
      > = {
        innovation_4_0: {
          minStage: ['mvp', 'traction', 'scaling'],
          minTeam: 2,
          name: 'Cohorte Innovation 4.0',
          deadline: 'Avril 2026',
          places: '7 places',
        },
        visa_startup: {
          minStage: ['prototype', 'mvp', 'traction', 'scaling'],
          minTeam: 1,
          name: 'VISA Startup',
          deadline: 'Permanent',
          places: 'Illimité',
        },
        techclinic: {
          minStage: ['idee', 'prototype', 'mvp'],
          minTeam: 1,
          name: 'TechClinic',
          deadline: 'Mai 2026',
          places: '3 places',
        },
        welp: {
          minStage: ['idee', 'prototype', 'mvp', 'traction'],
          minTeam: 1,
          name: 'WELP (femmes)',
          deadline: 'Juin 2026',
          places: '5 places',
        },
        smartgov: {
          minStage: ['mvp', 'traction', 'scaling'],
          minTeam: 2,
          name: 'SmartGov',
          deadline: 'Sept 2026',
          places: '5 places',
        },
        hackathon: {
          minStage: ['idee', 'prototype', 'mvp', 'traction', 'scaling'],
          minTeam: 1,
          name: 'Hackathon',
          deadline: 'Variable',
          places: '30+ places',
        },
        sing_capital: {
          minStage: ['traction', 'scaling'],
          minTeam: 3,
          name: 'SING Capital',
          deadline: 'Permanent',
          places: '500K-15M FCFA',
        },
      };
      const rule = eligibilityRules[program] || eligibilityRules.innovation_4_0;
      const stageOk = rule.minStage.includes(stage);
      const teamOk = teamSize >= rule.minTeam;
      const eligible = stageOk && teamOk;
      return {
        executed: true,
        displayText: eligible
          ? `✅ Tu es **éligible** au programme **${rule.name}** !\n📅 Deadline : ${rule.deadline}\n🎯 Places : ${rule.places}`
          : `⚠️ Tu n'es **pas encore éligible** au programme **${rule.name}**.\n${!stageOk ? `📈 Stade requis : ${rule.minStage.join(', ')} (tu es à "${stage}")` : ''}${!teamOk ? `\n👥 Équipe minimum : ${rule.minTeam} personnes (tu as ${teamSize})` : ''}`,
        data: {
          eligible,
          program: rule.name,
          stageOk,
          teamOk,
          deadline: rule.deadline,
          places: rule.places,
        },
      };
    }

    case 'calculate_creation_cost': {
      const type = args.business_type || 'SARL';
      const capital = parseInt(args.capital || '0');
      const includeNotary = args.include_notary !== 'non';
      const baseCosts: Record<
        string,
        { registration: number; stamp: number; publication: number }
      > = {
        EI: { registration: 25_000, stamp: 5_000, publication: 15_000 },
        SARL: { registration: 50_000, stamp: 10_000, publication: 30_000 },
        SAS: { registration: 75_000, stamp: 10_000, publication: 35_000 },
        SA: { registration: 100_000, stamp: 15_000, publication: 50_000 },
        GIE: { registration: 30_000, stamp: 5_000, publication: 20_000 },
        SCI: { registration: 40_000, stamp: 10_000, publication: 25_000 },
      };
      const costs = baseCosts[type] || baseCosts.SARL;
      const notaryFee = includeNotary ? Math.max(50_000, capital * 0.01) : 0;
      const total =
        costs.registration + costs.stamp + costs.publication + notaryFee + (capital || 0);
      const breakdown = {
        frais_dossier: costs.registration,
        timbres: costs.stamp,
        publication_journal: costs.publication,
        notaire: notaryFee,
        capital_social: capital,
        total,
      };
      return {
        executed: true,
        displayText:
          `💰 **Estimation coût création ${type}**\n\n` +
          `📄 Frais de dossier : ${costs.registration.toLocaleString('fr-FR')} XAF\n` +
          `📋 Timbres : ${costs.stamp.toLocaleString('fr-FR')} XAF\n` +
          `📰 Publication : ${costs.publication.toLocaleString('fr-FR')} XAF\n` +
          (includeNotary ? `⚖️ Notaire : ${notaryFee.toLocaleString('fr-FR')} XAF\n` : '') +
          (capital > 0 ? `🏦 Capital social : ${capital.toLocaleString('fr-FR')} XAF\n` : '') +
          `\n**Total estimé : ${total.toLocaleString('fr-FR')} XAF**`,
        data: breakdown,
      };
    }

    case 'get_deadline_alerts': {
      const category = args.category || 'all';
      // Static deadline data (would connect to Convex in production)
      const allDeadlines = [
        {
          type: 'sing',
          label: '🚀 Cohorte Innovation 4.0',
          deadline: '2026-04-15',
          places: '7 places',
          urgent: true,
        },
        {
          type: 'sing',
          label: '🧪 TechClinic',
          deadline: '2026-05-01',
          places: '3 places',
          urgent: false,
        },
        {
          type: 'sing',
          label: '👩‍💻 WELP Femmes',
          deadline: '2026-06-15',
          places: '5 places',
          urgent: false,
        },
        {
          type: 'marches',
          label: '📋 Digitalisation services publics (BTP)',
          deadline: '2026-04-01',
          places: '45M XAF',
          urgent: true,
        },
        {
          type: 'marches',
          label: '📋 Fourniture équipements IT',
          deadline: '2026-04-10',
          places: '12M XAF',
          urgent: true,
        },
        {
          type: 'marches',
          label: '📋 Maintenance réseaux ARCEP',
          deadline: '2026-05-20',
          places: '8M XAF',
          urgent: false,
        },
        {
          type: 'cgi',
          label: '🎓 Formation IA — Programme INITIA',
          deadline: '2026-04-20',
          places: '30 places',
          urgent: false,
        },
        {
          type: 'cgi',
          label: '📜 Certification SADA Q2',
          deadline: '2026-06-01',
          places: '20 places',
          urgent: false,
        },
      ];
      const filtered =
        category === 'all' ? allDeadlines : allDeadlines.filter((d) => d.type === category);
      const sorted = filtered.sort(
        (a, b) => new Date(a.deadline).getTime() - new Date(b.deadline).getTime(),
      );
      return {
        executed: true,
        displayText:
          `🔔 **Prochaines deadlines${category !== 'all' ? ` (${category})` : ''}** :\n\n` +
          sorted
            .map((d) => {
              const daysLeft = Math.ceil(
                (new Date(d.deadline).getTime() - Date.now()) / 86_400_000,
              );
              const urgency = daysLeft <= 7 ? '🔴' : daysLeft <= 14 ? '🟡' : '🟢';
              return `${urgency} **${d.label}**\n   📅 ${d.deadline} (${daysLeft > 0 ? `J-${daysLeft}` : 'Passé'}) — ${d.places}`;
            })
            .join('\n\n'),
        data: { deadlines: sorted },
      };
    }

    case 'summarize_page': {
      // Page summaries based on known routes
      const currentPath = typeof window !== 'undefined' ? window.location.pathname : '/';
      const pageSummaries: Record<string, string> = {
        '/': "Tu es sur la **page d'accueil** de GABON BIZ. Tu peux accéder à 8 services : Guichet Entrepreneur, Marchés Publics, Innovation Hub KIMBA, Incubateur SING, Portail Investisseur, CGI, Annuaire et Observatoire.",
        '/services/guichet-entrepreneur':
          "C'est le **Guichet Unique de l'Entrepreneur**. Tu peux créer ton entreprise 100% en ligne en 48h. Formes disponibles : EI (50K XAF), SARL (150K XAF), SA (300K XAF), SAS (200K XAF).",
        '/services/marches-publics':
          'La page des **Marchés Publics Numériques (DGMP)**. 500+ marchés/an pour 45 milliards XAF. Tu peux chercher, filtrer par secteur et activer les alertes J-7.',
        '/services/incubateur':
          "L'**Incubateur SING 2.0** — 1er incubateur 100% numérique de la CEMAC. 280+ startups, 76% taux de survie, 7 programmes d'incubation.",
        '/services/innovation-hub':
          "Le **Hub KIMBA 2.0** — plateforme d'open innovation. 100+ solutions, 38+ startups, matching IA pour trouver la solution idéale.",
        '/services/investir':
          'Le **Portail Investisseur**. PIB/hab $16 470, FCFA arrimé Euro, 3 ans IS exonéré. 6 verticales notées de 65 à 92/100.',
        '/services/cgi':
          "Le **Centre Gabonais de l'Innovation**. 4 pôles : Acculturation, Certifications SADA, FabLab, MediaLab. 3 420+ formés.",
        '/annuaire':
          "L'**Annuaire des Entreprises**. Cherche par nom, RCCM, NIF, secteur ou ville. Vérifie l'existence d'une entreprise.",
        '/dashboard':
          'Ton **Tableau de Bord** personnel. Tu retrouves tes entreprises, soumissions, programmes et notifications.',
      };
      // Try exact match, then prefix match
      let summary = pageSummaries[currentPath];
      if (!summary) {
        const prefix = Object.keys(pageSummaries).find(
          (p) => currentPath.startsWith(p) && p !== '/',
        );
        summary = prefix ? pageSummaries[prefix] : pageSummaries['/'];
      }
      return {
        executed: true,
        displayText: summary,
        data: { page: currentPath, summary },
      };
    }

    case 'convert_currency': {
      const amount = parseFloat(args.amount || '0');
      const from = (args.from || 'XAF').toUpperCase();
      const to = (args.to || 'EUR').toUpperCase();
      // Fixed exchange rates (relative to 1 XAF)
      const toXAF: Record<string, number> = {
        XAF: 1,
        EUR: 655.957, // 1 EUR = 655.957 XAF (fixed parity FCFA/EUR)
        USD: 615.0, // ~615 XAF
        GBP: 780.0, // ~780 XAF
        AED: 167.5, // ~167.5 XAF
        CNY: 84.5, // ~84.5 XAF
        RUB: 6.7, // ~6.7 XAF
        JPY: 4.1, // ~4.1 XAF
      };
      const currencyNames: Record<string, string> = {
        XAF: 'Franc CFA (XAF)',
        EUR: 'Euro (EUR)',
        USD: 'Dollar US (USD)',
        GBP: 'Livre Sterling (GBP)',
        AED: 'Dirham EAU (AED)',
        CNY: 'Yuan Chinois (CNY)',
        RUB: 'Rouble Russe (RUB)',
        JPY: 'Yen Japonais (JPY)',
      };
      const rateFrom = toXAF[from] || 1;
      const rateTo = toXAF[to] || 1;
      const inXAF = amount * rateFrom;
      const converted = inXAF / rateTo;
      const rate = rateFrom / rateTo;
      return {
        executed: true,
        displayText:
          `💱 **Conversion** : ${amount.toLocaleString('fr-FR')} ${from} = **${converted.toLocaleString('fr-FR', { maximumFractionDigits: 2 })} ${to}**\n\n` +
          `📊 Taux : 1 ${currencyNames[from] || from} = ${rate.toLocaleString('fr-FR', { maximumFractionDigits: 4 })} ${to}\n` +
          `💡 _Taux indicatif — le XAF est arrimé à l'Euro (1 EUR = 655,957 XAF)_`,
        data: { amount, from, to, converted, rate, inXAF },
      };
    }

    case 'open_chat': {
      uiActions.openChat?.();
      return { executed: true, displayText: '💬 Fenêtre de chat ouverte' };
    }

    case 'close_chat': {
      uiActions.closeChat?.();
      return { executed: true, displayText: '✅ Fenêtre de chat fermée' };
    }

    case 'clear_conversation': {
      uiActions.clearMessages?.();
      return { executed: true, displayText: '🗑️ Conversation effacée' };
    }

    default:
      console.warn(`[iAsted] [functionCall] Unknown function: ${name}`);
      return { executed: false };
  }
}
