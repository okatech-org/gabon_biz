// ─── Smart Follow-Up Engine ──────────────────────────────────────
// Generates contextual follow-up suggestions based on conversation content.

export interface FollowUp {
  label: string;
  message: string;
  emoji: string;
}

interface FollowUpRule {
  keywords: string[];
  followUps: FollowUp[];
}

const FOLLOW_UP_RULES: FollowUpRule[] = [
  // Business creation
  {
    keywords: ['créer', 'entreprise', 'sarl', 'sas', 'ei', 'immatriculer'],
    followUps: [
      {
        emoji: '📄',
        label: 'Documents requis',
        message: 'Quels documents sont nécessaires pour créer mon entreprise ?',
      },
      {
        emoji: '💰',
        label: 'Calculer le coût',
        message: "Combien coûte la création d'une SARL au Gabon ?",
      },
      {
        emoji: '⚖️',
        label: 'Comparer les formes',
        message: 'Quelle est la différence entre SARL, SAS et EI ?',
      },
    ],
  },
  // Marchés publics
  {
    keywords: ['marché', 'marchés', 'appel', 'offre', 'soumission', 'dgmp'],
    followUps: [
      {
        emoji: '📋',
        label: 'Marchés en cours',
        message: 'Quels marchés publics sont actuellement ouverts ?',
      },
      {
        emoji: '✅',
        label: 'Critères éligibilité',
        message: "Quels sont les critères pour répondre à un appel d'offres ?",
      },
      {
        emoji: '🔔',
        label: 'Deadlines proches',
        message: 'Quels marchés publics ont des deadlines cette semaine ?',
      },
    ],
  },
  // SING / Incubateur
  {
    keywords: ['sing', 'incubateur', 'incubation', 'startup', 'cohorte', 'programme'],
    followUps: [
      {
        emoji: '📝',
        label: 'Postuler maintenant',
        message: 'Comment postuler à un programme SING ?',
      },
      {
        emoji: '💵',
        label: 'Financement',
        message: 'Quelles options de financement SING Capital sont disponibles ?',
      },
      {
        emoji: '🏅',
        label: 'Éligibilité',
        message: 'Suis-je éligible au programme Innovation 4.0 ?',
      },
    ],
  },
  // Investissement
  {
    keywords: ['investir', 'investissement', 'roi', 'verticale', 'fintech', 'rendement'],
    followUps: [
      {
        emoji: '📊',
        label: 'Simuler un ROI',
        message: 'Simule un retour sur investissement en FinTech',
      },
      {
        emoji: '🏆',
        label: 'Success stories',
        message: "Quelles sont les success stories d'investissement au Gabon ?",
      },
      {
        emoji: '📈',
        label: 'Indicateurs macro',
        message: 'Quels sont les indicateurs macroéconomiques du Gabon ?',
      },
    ],
  },
  // CGI / Formation
  {
    keywords: ['formation', 'cgi', 'sada', 'certif', 'fablab', 'medialab'],
    followUps: [
      {
        emoji: '🎓',
        label: 'Formations disponibles',
        message: 'Quelles formations sont proposées par le CGI ?',
      },
      { emoji: '🏭', label: 'Accéder au FabLab', message: 'Comment utiliser le FabLab du CGI ?' },
      {
        emoji: '📜',
        label: 'Certification SADA',
        message: 'Comment obtenir une certification Smart Africa ?',
      },
    ],
  },
  // KIMBA / Innovation
  {
    keywords: ['kimba', 'innovation', 'solution', 'matching', 'numérique'],
    followUps: [
      {
        emoji: '🔍',
        label: 'Trouver une solution',
        message: 'Trouve-moi une solution FinTech mature',
      },
      {
        emoji: '🤝',
        label: 'Matching IA',
        message: 'Comment fonctionne le matching intelligent ?',
      },
      {
        emoji: '🏅',
        label: 'Startups vedettes',
        message: 'Quelles sont les startups vedettes de KIMBA ?',
      },
    ],
  },
  // Annuaire / Vérification
  {
    keywords: ['annuaire', 'vérifier', 'rccm', 'nif', 'entreprise existe'],
    followUps: [
      {
        emoji: '🔍',
        label: 'Vérifier un RCCM',
        message: 'Comment vérifier si une entreprise existe au Gabon ?',
      },
      {
        emoji: '📂',
        label: 'Chercher une entreprise',
        message: "Cherche l'entreprise POZI dans l'annuaire",
      },
      {
        emoji: '➕',
        label: 'Inscrire la mienne',
        message: "Comment inscrire mon entreprise dans l'annuaire ?",
      },
    ],
  },
  // Navigation
  {
    keywords: ['page', 'aller', 'naviguer', 'emmène', 'montre'],
    followUps: [
      { emoji: '🏠', label: 'Accueil', message: "Emmène-moi à la page d'accueil" },
      { emoji: '📊', label: 'Mon tableau de bord', message: 'Emmène-moi sur mon tableau de bord' },
      {
        emoji: '🗺️',
        label: 'Tous les services',
        message: 'Quels sont tous les services disponibles ?',
      },
    ],
  },
];

/**
 * Analyze the last AI response and generate relevant follow-up suggestions.
 * Returns max 3 follow-ups based on keyword matching.
 */
export function generateFollowUps(lastResponse: string): FollowUp[] {
  if (!lastResponse || lastResponse.length < 20) return [];

  const lowerResponse = lastResponse.toLowerCase();
  let bestMatch: FollowUpRule | null = null;
  let bestScore = 0;

  for (const rule of FOLLOW_UP_RULES) {
    const score = rule.keywords.filter((kw) => lowerResponse.includes(kw)).length;
    if (score > bestScore) {
      bestScore = score;
      bestMatch = rule;
    }
  }

  if (bestMatch && bestScore > 0) {
    return bestMatch.followUps.slice(0, 3);
  }

  return [];
}
