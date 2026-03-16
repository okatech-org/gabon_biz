// ─── Guided Onboarding Wizard ────────────────────────────────────
// Interactive 5-step flow for first-time users.

const ONBOARDING_KEY = 'iasted_onboarding_complete';

export interface OnboardingStep {
  id: number;
  question: string;
  options: { label: string; value: string; emoji: string }[];
}

export const ONBOARDING_STEPS: OnboardingStep[] = [
  {
    id: 1,
    question:
      'Bienvenue sur GABON BIZ ! 👋 Je suis **iAsted**, ton assistant IA. Dis-moi, tu es plutôt… ?',
    options: [
      { label: 'Entrepreneur', value: 'entrepreneur', emoji: '🏢' },
      { label: 'Investisseur', value: 'investisseur', emoji: '💰' },
      { label: 'Startup / Fondateur', value: 'startup', emoji: '🚀' },
      { label: 'Étudiant / Chercheur', value: 'etudiant', emoji: '🎓' },
      { label: 'Agent public', value: 'agent', emoji: '🏛️' },
      { label: 'Curieux', value: 'curieux', emoji: '👀' },
    ],
  },
  {
    id: 2,
    question: "Parfait ! Et aujourd'hui, tu cherches à… ?",
    options: [
      { label: 'Créer une entreprise', value: 'creer', emoji: '📝' },
      { label: 'Trouver des marchés publics', value: 'marches', emoji: '📋' },
      { label: 'Rejoindre un incubateur', value: 'incubateur', emoji: '🧪' },
      { label: 'Investir au Gabon', value: 'investir', emoji: '📈' },
      { label: 'Me former', value: 'formation', emoji: '🎓' },
      { label: 'Explorer la plateforme', value: 'explorer', emoji: '🗺️' },
    ],
  },
];

/**
 * Generate a personalized welcome message after onboarding.
 */
export function getOnboardingResult(
  role: string,
  goal: string,
): { message: string; suggestedPath: string; suggestedLabel: string } {
  const routes: Record<string, { path: string; label: string; tip: string }> = {
    creer: {
      path: '/services/guichet-entrepreneur',
      label: '🏢 Aller au Guichet Entrepreneur',
      tip: 'Créer ton entreprise en 48h max, 100% en ligne ! EI à 50 000 XAF, SARL à 150 000 XAF.',
    },
    marches: {
      path: '/services/marches-publics',
      label: '📋 Voir les marchés publics',
      tip: '500+ marchés par an, 45 milliards XAF de volume. Active les alertes J-7 pour ne rien rater !',
    },
    incubateur: {
      path: '/services/incubateur',
      label: '🚀 Découvrir la SING',
      tip: "La SING c'est le 1er incubateur 100% numérique de la CEMAC. 7 programmes disponibles !",
    },
    investir: {
      path: '/services/investir',
      label: '📈 Explorer les opportunités',
      tip: "PIB/hab $16 470, FCFA arrimé à l'Euro, 3 ans d'exonération. Le Gabon c'est l'océan bleu !",
    },
    formation: {
      path: '/services/cgi',
      label: '🎓 Formations du CGI',
      tip: '3 420+ personnes formées, certifications Smart Africa. FabLab et MediaLab inclus !',
    },
    explorer: {
      path: '/',
      label: '🗺️ Explorer GABON BIZ',
      tip: 'GABON BIZ regroupe 8 services numériques. Je te fais faire le tour ?',
    },
  };

  const route = routes[goal] || routes.explorer;

  const roleLabels: Record<string, string> = {
    entrepreneur: "En tant qu'entrepreneur",
    investisseur: "En tant qu'investisseur",
    startup: 'En tant que fondateur de startup',
    etudiant: "En tant qu'étudiant",
    agent: "En tant qu'agent public",
    curieux: 'En tant que curieux',
  };

  const rolePrefix = roleLabels[role] || '';

  return {
    message: `${rolePrefix}, voilà ce que je te recommande :\n\n💡 **${route.tip}**\n\nJe peux t'aider à naviguer, rechercher des informations, comparer des options, calculer des coûts, et bien plus. Demande-moi n'importe quoi ! 🤖`,
    suggestedPath: route.path,
    suggestedLabel: route.label,
  };
}

/** Check if onboarding has been completed */
export function isOnboardingComplete(): boolean {
  try {
    return localStorage.getItem(ONBOARDING_KEY) === 'true';
  } catch {
    return false;
  }
}

/** Mark onboarding as complete */
export function markOnboardingComplete(): void {
  try {
    localStorage.setItem(ONBOARDING_KEY, 'true');
  } catch {
    // ignore
  }
}

/** Reset onboarding to allow re-triggering */
export function resetOnboarding(): void {
  try {
    localStorage.removeItem(ONBOARDING_KEY);
  } catch {
    // ignore
  }
}
