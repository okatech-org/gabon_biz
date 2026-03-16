import type { LocalCommand, CommandMatch } from '@/types/iasted';

// ─── 60+ Local Commands for GABON BIZ ────────────────────────────

export const GABON_BIZ_COMMANDS: LocalCommand[] = [
  // ═══ NAVIGATION ═══════════════════════════════════════════════

  // Accueil
  {
    patterns: [/^(va?\s+[àa]\s+l'?|ouvre?\s+l'?|page\s+d'?)accueil$/i, /^accueil$/i],
    keywords: [['accueil'], ['page', 'accueil']],
    action: 'navigate',
    params: { path: '/' },
    silent: true,
    confidence: 0.8,
  },

  // Guichet Entrepreneur
  {
    patterns: [
      /guichet\s+(unique\s+)?(de\s+l'?)?entrepreneur/i,
      /créer?\s+(mon|une|ma)\s+entreprise/i,
    ],
    keywords: [
      ['guichet', 'entrepreneur'],
      ['créer', 'entreprise'],
      ['création', 'entreprise'],
    ],
    action: 'navigate',
    params: { path: '/services/guichet-entrepreneur' },
    silent: true,
    confidence: 0.8,
  },

  // Marchés Publics
  {
    patterns: [/march[ée]s?\s+publics?/i, /appels?\s+d'?\s*offres?/i],
    keywords: [['marchés', 'publics'], ['marchés'], ['appels', 'offres'], ['soumission']],
    action: 'navigate',
    params: { path: '/services/marches-publics' },
    silent: true,
    confidence: 0.8,
  },

  // Innovation Hub KIMBA
  {
    patterns: [/innovation\s*hub/i, /kimba/i, /solutions?\s+num[ée]riques?/i],
    keywords: [['innovation'], ['kimba'], ['solutions', 'numériques']],
    action: 'navigate',
    params: { path: '/services/innovation-hub' },
    silent: true,
    confidence: 0.8,
  },

  // Incubateur SING
  {
    patterns: [/incubateur/i, /\bsing\b/i, /startups?\s+(gabonaise|sing)/i],
    keywords: [['incubateur'], ['sing'], ['programmes', 'incubation']],
    action: 'navigate',
    params: { path: '/services/incubateur' },
    silent: true,
    confidence: 0.8,
  },

  // Investir
  {
    patterns: [/investir\s+au\s+gabon/i, /portail\s+investisseur/i, /investissement/i],
    keywords: [['investir'], ['investissement'], ['investisseur']],
    action: 'navigate',
    params: { path: '/services/investir' },
    silent: true,
    confidence: 0.7,
  },

  // CGI
  {
    patterns: [/centre\s+gabonais\s+(de\s+l'?)?innovation/i, /\bcgi\b/i, /formation\s+cgi/i],
    keywords: [['cgi'], ['formation', 'cgi'], ['centre', 'innovation']],
    action: 'navigate',
    params: { path: '/services/cgi' },
    silent: true,
    confidence: 0.8,
  },

  // Annuaire
  {
    patterns: [/annuaire/i, /r[ée]pertoire\s+(des?\s+)?entreprises/i],
    keywords: [['annuaire'], ['répertoire', 'entreprises']],
    action: 'navigate',
    params: { path: '/annuaire' },
    silent: true,
    confidence: 0.8,
  },

  // Dashboard
  {
    patterns: [/tableau\s+de\s+bord/i, /dashboard/i, /mon\s+espace/i],
    keywords: [['tableau', 'bord'], ['dashboard'], ['espace']],
    action: 'navigate',
    params: { path: '/dashboard' },
    silent: true,
    confidence: 0.7,
  },

  // Demo
  {
    patterns: [/d[ée]mo/i, /comptes?\s+de\s+d[ée]mo/i, /tester?\s+la\s+plateforme/i],
    keywords: [['démo'], ['demo'], ['tester', 'plateforme']],
    action: 'navigate',
    params: { path: '/demo' },
    silent: true,
    confidence: 0.8,
  },

  // Investir Numérique
  {
    patterns: [/[ée]conomie\s+num[ée]rique/i, /investir\s+dans\s+le\s+num[ée]rique/i],
    keywords: [
      ['économie', 'numérique'],
      ['investir', 'numérique'],
    ],
    action: 'navigate',
    params: { path: '/investir-numerique' },
    silent: true,
    confidence: 0.8,
  },

  // Dashboard sub-pages
  {
    patterns: [/dashboard\s+march[ée]s/i, /mes?\s+soumissions?/i],
    keywords: [['dashboard', 'marchés'], ['soumissions']],
    action: 'navigate',
    params: { path: '/dashboard/marches' },
    silent: true,
    confidence: 0.8,
  },

  {
    patterns: [/dashboard\s+incubateur/i, /mon\s+parcours\s+(d'?)?incubation/i],
    keywords: [
      ['dashboard', 'incubateur'],
      ['parcours', 'incubation'],
    ],
    action: 'navigate',
    params: { path: '/dashboard/incubateur' },
    silent: true,
    confidence: 0.8,
  },

  {
    patterns: [/candidater/i, /candidature\s+sing/i],
    keywords: [['candidater'], ['candidature']],
    action: 'navigate',
    params: { path: '/dashboard/incubateur/candidature' },
    silent: true,
    confidence: 0.7,
  },

  {
    patterns: [/simulateur\s+roi/i, /simuler\s+(un\s+)?investissement/i],
    keywords: [
      ['simulateur', 'roi'],
      ['simuler', 'investissement'],
    ],
    action: 'navigate',
    params: { path: '/dashboard/investir/simulateur' },
    silent: true,
    confidence: 0.8,
  },

  {
    patterns: [/observatoire/i, /indicateurs/i],
    keywords: [['observatoire'], ['indicateurs']],
    action: 'navigate',
    params: { path: '/dashboard/observatoire' },
    silent: true,
    confidence: 0.7,
  },

  // ── More dashboard sub-pages ──

  {
    patterns: [/mes?\s+soumissions?/i, /suivi\s+(des?\s+)?soumissions?/i],
    keywords: [['soumissions']],
    action: 'navigate',
    params: { path: '/dashboard/soumissions' },
    silent: true,
    confidence: 0.8,
  },

  {
    patterns: [/autorit[ée]\s+contractante/i, /publier\s+(un\s+)?march[ée]/i],
    keywords: [
      ['autorité', 'contractante'],
      ['publier', 'marché'],
    ],
    action: 'navigate',
    params: { path: '/dashboard/marches/autorite' },
    silent: true,
    confidence: 0.8,
  },

  {
    patterns: [/mentoring/i, /mentorat/i, /mes?\s+mentors?/i],
    keywords: [['mentoring'], ['mentorat'], ['mentor']],
    action: 'navigate',
    params: { path: '/dashboard/incubateur/mentoring' },
    silent: true,
    confidence: 0.8,
  },

  {
    patterns: [/financement\s+sing/i, /sing\s+capital/i, /lever?\s+des?\s+fonds/i],
    keywords: [['financement'], ['capital'], ['lever', 'fonds']],
    action: 'navigate',
    params: { path: '/dashboard/incubateur/financement' },
    silent: true,
    confidence: 0.8,
  },

  {
    patterns: [/mon\s+parcours/i, /parcours\s+incubation/i],
    keywords: [['parcours']],
    action: 'navigate',
    params: { path: '/dashboard/incubateur/mon-parcours' },
    silent: true,
    confidence: 0.8,
  },

  {
    patterns: [/programmes?\s+sing/i, /programmes?\s+incubation/i],
    keywords: [['programmes']],
    action: 'navigate',
    params: { path: '/dashboard/incubateur/programmes' },
    silent: true,
    confidence: 0.7,
  },

  {
    patterns: [/portfolio\s+startups?/i, /toutes?\s+les?\s+startups?/i],
    keywords: [['portfolio', 'startups'], ['portfolio']],
    action: 'navigate',
    params: { path: '/dashboard/incubateur/startups' },
    silent: true,
    confidence: 0.8,
  },

  {
    patterns: [/cohortes?/i],
    keywords: [['cohortes'], ['cohorte']],
    action: 'navigate',
    params: { path: '/dashboard/incubateur/cohortes' },
    silent: true,
    confidence: 0.8,
  },

  {
    patterns: [/communaut[ée]/i, /r[ée]seau\s+startups?/i],
    keywords: [['communauté'], ['réseau']],
    action: 'navigate',
    params: { path: '/dashboard/incubateur/communaute' },
    silent: true,
    confidence: 0.7,
  },

  {
    patterns: [/[ée]v[ée]nements?\s+(sing|incubateur)/i, /hackathons?/i, /pitch\s+day/i],
    keywords: [['événements'], ['hackathon'], ['pitch']],
    action: 'navigate',
    params: { path: '/dashboard/incubateur/evenements' },
    silent: true,
    confidence: 0.8,
  },

  {
    patterns: [/matching\s+(ia|intelligence)/i, /trouver?\s+(une?\s+)?solution/i],
    keywords: [['matching'], ['trouver', 'solution']],
    action: 'navigate',
    params: { path: '/dashboard/innovation/matching' },
    silent: true,
    confidence: 0.8,
  },

  {
    patterns: [/d[ée]fis?\s+(d'?)?innovation/i, /challenges?/i],
    keywords: [['défis'], ['challenges'], ['challenge']],
    action: 'navigate',
    params: { path: '/dashboard/innovation/defis' },
    silent: true,
    confidence: 0.8,
  },

  {
    patterns: [/comparer?\s+(des?\s+)?solutions?/i],
    keywords: [['comparer', 'solutions']],
    action: 'navigate',
    params: { path: '/dashboard/innovation/comparer' },
    silent: true,
    confidence: 0.8,
  },

  {
    patterns: [/opportunit[ée]s?\s+(d'?)?investissement/i, /deal\s+flow/i],
    keywords: [['opportunités'], ['deal']],
    action: 'navigate',
    params: { path: '/dashboard/investir/opportunites' },
    silent: true,
    confidence: 0.8,
  },

  {
    patterns: [/due\s+diligence/i, /audit\s+startup/i],
    keywords: [['diligence'], ['audit']],
    action: 'navigate',
    params: { path: '/dashboard/investir/due-diligence' },
    silent: true,
    confidence: 0.8,
  },

  {
    patterns: [/macro[ée]conomie/i, /indicateurs?\s+macro/i, /pib\s+gabon/i],
    keywords: [['macro'], ['macroéconomie'], ['pib']],
    action: 'navigate',
    params: { path: '/dashboard/investir/macro' },
    silent: true,
    confidence: 0.8,
  },

  {
    patterns: [/veille\s+(sectorielle|technologique)/i, /actualit[ée]s?\s+secteur/i],
    keywords: [['veille']],
    action: 'navigate',
    params: { path: '/dashboard/investir/veille' },
    silent: true,
    confidence: 0.8,
  },

  {
    patterns: [/formations?\s+cgi/i, /catalogue\s+formations?/i],
    keywords: [['formations', 'cgi'], ['formations']],
    action: 'navigate',
    params: { path: '/dashboard/cgi/formations' },
    silent: true,
    confidence: 0.8,
  },

  {
    patterns: [/sada/i, /certifications?\s+(smart\s+africa|sada|internationale)/i],
    keywords: [['sada'], ['certifications']],
    action: 'navigate',
    params: { path: '/dashboard/cgi/sada' },
    silent: true,
    confidence: 0.8,
  },

  {
    patterns: [/fablab/i, /prototypage/i],
    keywords: [['fablab'], ['prototypage']],
    action: 'navigate',
    params: { path: '/dashboard/cgi/fablab' },
    silent: true,
    confidence: 0.8,
  },

  {
    patterns: [/medialab/i, /production\s+audio/i],
    keywords: [['medialab']],
    action: 'navigate',
    params: { path: '/dashboard/cgi/medialab' },
    silent: true,
    confidence: 0.8,
  },

  {
    patterns: [/admin(istration)?/i, /gestion\s+plateforme/i],
    keywords: [['admin'], ['administration']],
    action: 'navigate',
    params: { path: '/dashboard/admin' },
    silent: true,
    confidence: 0.7,
  },

  {
    patterns: [/ma\s+fiche\s+(entreprise)?/i, /profil\s+entreprise/i],
    keywords: [
      ['fiche', 'entreprise'],
      ['profil', 'entreprise'],
    ],
    action: 'navigate',
    params: { path: '/dashboard/annuaire/ma-fiche' },
    silent: true,
    confidence: 0.8,
  },

  {
    patterns: [/favoris/i, /entreprises?\s+sauvegard[ée]es?/i],
    keywords: [['favoris']],
    action: 'navigate',
    params: { path: '/dashboard/annuaire/favoris' },
    silent: true,
    confidence: 0.8,
  },

  {
    patterns: [/fili[èe]res?/i, /secteurs?\s+[ée]conomiques?/i],
    keywords: [['filières'], ['secteurs']],
    action: 'navigate',
    params: { path: '/dashboard/filieres' },
    silent: true,
    confidence: 0.7,
  },

  {
    patterns: [/connexion/i, /se?\s+connecter/i, /login/i],
    keywords: [['connexion'], ['connecter'], ['login']],
    action: 'navigate',
    params: { path: '/login' },
    silent: true,
    confidence: 0.8,
  },

  {
    patterns: [/v[ée]rifier?\s+(une?\s+)?entreprise/i, /v[ée]rification\s+rccm/i],
    keywords: [['vérifier', 'entreprise'], ['vérification']],
    action: 'navigate',
    params: { path: '/annuaire/verifier' },
    silent: true,
    confidence: 0.8,
  },

  // ═══ INVESTMENT VERTICALS ═════════════════════════════════════

  {
    patterns: [/fintech/i, /verticale\s+fintech/i],
    keywords: [['fintech']],
    action: 'navigate',
    params: { path: '/investir-numerique', section: '#fintech' },
    silent: true,
    confidence: 0.9,
  },

  {
    patterns: [/e[-\s]?sant[ée]/i, /healthtech/i],
    keywords: [['santé'], ['healthtech']],
    action: 'navigate',
    params: { path: '/investir-numerique', section: '#e-sante' },
    silent: true,
    confidence: 0.9,
  },

  {
    patterns: [/edtech/i, /verticale\s+[ée]ducation/i],
    keywords: [['edtech'], ['éducation']],
    action: 'navigate',
    params: { path: '/investir-numerique', section: '#edtech' },
    silent: true,
    confidence: 0.9,
  },

  {
    patterns: [/agritech/i, /verticale\s+agriculture/i],
    keywords: [['agritech'], ['agriculture']],
    action: 'navigate',
    params: { path: '/investir-numerique', section: '#agritech' },
    silent: true,
    confidence: 0.9,
  },

  {
    patterns: [/e[-\s]?commerce/i],
    keywords: [['commerce'], ['ecommerce']],
    action: 'navigate',
    params: { path: '/investir-numerique', section: '#e-commerce' },
    silent: true,
    confidence: 0.9,
  },

  {
    patterns: [/govtech/i, /verticale\s+gouvernement/i],
    keywords: [['govtech'], ['gouvernement']],
    action: 'navigate',
    params: { path: '/investir-numerique', section: '#govtech' },
    silent: true,
    confidence: 0.9,
  },

  // ═══ THEME ════════════════════════════════════════════════════

  {
    patterns: [/mode\s+sombre/i, /th[èe]me\s+(sombre|noir)/i],
    keywords: [
      ['mode', 'sombre'],
      ['thème', 'sombre'],
      ['thème', 'noir'],
    ],
    action: 'setTheme',
    params: { theme: 'dark' },
    silent: true,
    confidence: 0.9,
  },

  {
    patterns: [/mode\s+clair/i, /th[èe]me\s+clair/i],
    keywords: [
      ['mode', 'clair'],
      ['thème', 'clair'],
    ],
    action: 'setTheme',
    params: { theme: 'light' },
    silent: true,
    confidence: 0.9,
  },

  {
    patterns: [/change\s+(le\s+)?th[èe]me/i],
    keywords: [['change', 'thème']],
    action: 'toggleTheme',
    params: {},
    silent: true,
    confidence: 0.9,
  },

  // ═══ LANGUAGE ═════════════════════════════════════════════════

  {
    patterns: [/en\s+anglais/i, /switch\s+to\s+english/i],
    keywords: [['anglais'], ['english']],
    action: 'setLocale',
    params: { lang: 'en' },
    silent: true,
    confidence: 0.9,
  },

  {
    patterns: [/en\s+fran[çc]ais/i],
    keywords: [['français']],
    action: 'setLocale',
    params: { lang: 'fr' },
    silent: true,
    confidence: 0.9,
  },

  {
    patterns: [/en\s+espagnol/i],
    keywords: [['espagnol']],
    action: 'setLocale',
    params: { lang: 'es' },
    silent: true,
    confidence: 0.9,
  },

  {
    patterns: [/en\s+arabe/i],
    keywords: [['arabe']],
    action: 'setLocale',
    params: { lang: 'ar' },
    silent: true,
    confidence: 0.9,
  },

  {
    patterns: [/en\s+chinois/i],
    keywords: [['chinois']],
    action: 'setLocale',
    params: { lang: 'zh' },
    silent: true,
    confidence: 0.9,
  },

  {
    patterns: [/en\s+russe/i],
    keywords: [['russe']],
    action: 'setLocale',
    params: { lang: 'ru' },
    silent: true,
    confidence: 0.9,
  },

  {
    patterns: [/en\s+japonais/i],
    keywords: [['japonais']],
    action: 'setLocale',
    params: { lang: 'ja' },
    silent: true,
    confidence: 0.9,
  },

  // ═══ VOICE CONTROL ════════════════════════════════════════════

  {
    patterns: [/voix\s+f[ée]minine/i],
    keywords: [['voix', 'féminine']],
    action: 'changeVoice',
    params: { gender: 'female' },
    silent: true,
    confidence: 0.9,
  },

  {
    patterns: [/voix\s+masculine/i],
    keywords: [['voix', 'masculine']],
    action: 'changeVoice',
    params: { gender: 'male' },
    silent: true,
    confidence: 0.9,
  },

  {
    patterns: [/change\s+(de\s+)?voix/i],
    keywords: [['change', 'voix']],
    action: 'changeVoice',
    params: {},
    silent: true,
    confidence: 0.9,
  },

  {
    patterns: [/coupe\s+le\s+son/i, /silence/i, /mute/i],
    keywords: [['coupe', 'son'], ['silence'], ['mute']],
    action: 'muteVoice',
    params: {},
    silent: true,
    confidence: 0.9,
  },

  {
    patterns: [/active\s+le\s+son/i, /unmute/i],
    keywords: [['active', 'son'], ['unmute']],
    action: 'unmuteVoice',
    params: {},
    silent: true,
    confidence: 0.9,
  },

  // ═══ CHAT CONTROL ═════════════════════════════════════════════

  {
    patterns: [
      /ouvre?\s+(le\s+)?chat/i,
      /ouvre?\s+(la\s+)?fen[êe]tre/i,
      /ouvre?\s+iasted/i,
      /affiche?\s+(le\s+)?chat/i,
    ],
    keywords: [
      ['ouvre', 'chat'],
      ['ouvre', 'fenêtre'],
      ['affiche', 'chat'],
      ['ouvre', 'iasted'],
    ],
    action: 'openChat',
    params: {},
    silent: true,
    confidence: 0.9,
  },

  {
    patterns: [/ferme\s+(le\s+)?chat/i, /ferme\s+(la\s+)?fen[êe]tre/i],
    keywords: [
      ['ferme', 'chat'],
      ['ferme', 'fenêtre'],
    ],
    action: 'closeChat',
    params: {},
    silent: true,
    confidence: 0.9,
  },

  {
    patterns: [
      /efface\s+(la\s+)?conversation/i,
      /nouvelle\s+conversation/i,
      /supprime\s+(la\s+)?conversation/i,
      /vide\s+(le\s+)?chat/i,
    ],
    keywords: [
      ['efface', 'conversation'],
      ['nouvelle', 'conversation'],
      ['supprime', 'conversation'],
      ['vide', 'chat'],
    ],
    action: 'clearMessages',
    params: {},
    silent: true,
    confidence: 0.9,
  },

  // ═══ STOP / DISCONNECT / END OF CONVERSATION ═══════════════════

  {
    patterns: [
      /^stop$/i,
      /^arr[êe]te$/i,
      /^au\s+revoir$/i,
      /merci\s+c'?est\s+tout/i,
      /c'?est\s+(bon|tout)/i,
      /^merci$/i,
      /^ok\s+merci/i,
      /^merci\s+beaucoup$/i,
      /^bonne?\s+(journ[ée]e|soir[ée]e|nuit)/i,
      /^[àa]\s+(plus|bient[ôo]t|la\s+prochaine)/i,
      /^salut$/i,
      /^bye$/i,
      /^ciao$/i,
      /j'?ai\s+(plus|pas)\s+(besoin|de\s+question)/i,
      /^fin$/i,
      /^non\s+merci$/i,
      /^rien\s+d'?autre$/i,
      /^c'?est\s+parfait$/i,
      /^parfait\s+merci/i,
    ],
    keywords: [
      ['stop'],
      ['arrête'],
      ['revoir'],
      ['merci', 'tout'],
      ['bonne', 'journée'],
      ['plus', 'besoin'],
      ['bientôt'],
      ['merci'],
      ['fin'],
    ],
    action: 'disconnectVoice',
    params: {},
    silent: false,
    confidence: 0.9,
  },
];

// ─── Matching Engine ─────────────────────────────────────────────

/**
 * Try to match a transcript against the local command catalog.
 * Returns the best match with confidence, or null if no match above threshold.
 */
export function matchCommand(transcript: string, threshold: number = 0.6): CommandMatch | null {
  const text = transcript.toLowerCase().trim();
  let bestMatch: CommandMatch | null = null;
  let bestConfidence = 0;

  for (const cmd of GABON_BIZ_COMMANDS) {
    // Level 1: Exact regex match (confidence = 1.0)
    for (const pattern of cmd.patterns) {
      if (pattern.test(text)) {
        const confidence = 1.0;
        if (confidence > bestConfidence) {
          bestConfidence = confidence;
          bestMatch = {
            action: cmd.action,
            params: cmd.params || {},
            confidence,
            silent: cmd.silent,
          };
        }
      }
    }

    // Level 2: All keywords in a group present (confidence = cmd.confidence)
    for (const group of cmd.keywords) {
      const allPresent = group.every((kw) => text.includes(kw.toLowerCase()));
      if (allPresent) {
        const confidence = cmd.confidence;
        if (confidence > bestConfidence) {
          bestConfidence = confidence;
          bestMatch = {
            action: cmd.action,
            params: cmd.params || {},
            confidence,
            silent: cmd.silent,
          };
        }
      }
    }
  }

  if (bestMatch && bestConfidence >= threshold) {
    return bestMatch;
  }
  return null;
}

/** Actions that execute silently (no vocal confirmation) */
export const SILENT_ACTIONS = [
  'navigate',
  'setTheme',
  'toggleTheme',
  'closeChat',
  'openChat',
  'clearMessages',
  'setLocale',
  'muteVoice',
  'unmuteVoice',
  'changeVoice',
];
