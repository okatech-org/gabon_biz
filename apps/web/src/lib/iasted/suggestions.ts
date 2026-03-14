/**
 * iAsted — Contextual suggestions per page
 * Quick-reply chips shown above the chat input, based on current pathname.
 */

export interface Suggestion {
  label: string;
  message: string;
}

const PAGE_SUGGESTIONS: Record<string, Suggestion[]> = {
  '/': [
    { label: "C'est quoi GABON BIZ ?", message: "Qu'est-ce que la plateforme GABON BIZ et quels services propose-t-elle ?" },
    { label: 'Créer mon entreprise', message: 'Comment créer une entreprise au Gabon via le Guichet Unique Entrepreneur ?' },
    { label: 'Marchés publics', message: 'Comment accéder aux marchés publics numériques ?' },
    { label: 'Explorer les services', message: 'Quels sont les principaux services disponibles sur GABON BIZ ?' },
  ],
  '/services/guichet-entrepreneur': [
    { label: 'Créer une SARL', message: 'Quelles sont les étapes pour créer une SARL au Gabon ?' },
    { label: 'Documents requis', message: 'Quels documents sont nécessaires pour immatriculer une entreprise ?' },
    { label: 'Combien ça coûte ?', message: "Quel est le coût total d'immatriculation d'une entreprise au Gabon ?" },
    { label: 'Délai moyen', message: "Quel est le délai moyen pour obtenir son immatriculation ?" },
  ],
  '/services/marches-publics': [
    { label: 'Marchés en cours', message: 'Quels sont les marchés publics actuellement ouverts ?' },
    { label: 'Comment soumissionner', message: 'Comment soumettre une offre sur un marché public ?' },
    { label: 'Critères éligibilité', message: "Quels sont les critères d'éligibilité pour répondre à un appel d'offres ?" },
    { label: 'Suivi soumissions', message: 'Comment suivre le statut de mes soumissions ?' },
  ],
  '/services/incubateur': [
    { label: 'Programmes disponibles', message: "Quels sont les programmes d'incubation SING disponibles ?" },
    { label: 'Comment postuler', message: 'Comment postuler à un programme SING ?' },
    { label: 'Financement', message: 'Quelles options de financement sont disponibles pour les startups ?' },
    { label: 'Mentoring', message: 'Comment fonctionne le programme de mentorat ?' },
  ],
  '/services/innovation-hub': [
    { label: 'Catalogue solutions', message: 'Comment accéder au catalogue de solutions technologiques ?' },
    { label: 'Soumettre une innovation', message: 'Comment soumettre une solution innovante au Hub KIMBA ?' },
    { label: 'Matching IA', message: "Comment fonctionne le matching intelligent entre problèmes et solutions ?" },
    { label: 'Défis innovation', message: "Comment participer aux défis d'innovation ?" },
  ],
  '/services/investir': [
    { label: 'Opportunités', message: "Quelles sont les opportunités d'investissement au Gabon ?" },
    { label: 'Cadre juridique', message: "Quel est le cadre juridique pour les investisseurs étrangers ?" },
    { label: 'Due diligence', message: 'Comment fonctionne le processus de due diligence ?' },
    { label: 'Secteurs porteurs', message: 'Quels sont les secteurs les plus porteurs au Gabon ?' },
  ],
  '/services/cgi': [
    { label: 'Formations', message: 'Quelles formations sont proposées par le CGI ?' },
    { label: 'FabLab', message: "Comment accéder à l'espace de prototypage FabLab ?" },
    { label: 'MediaLab', message: 'Comment utiliser le studio de production MediaLab ?' },
    { label: 'Certifications SADA', message: 'Comment obtenir une certification Smart Africa ?' },
  ],
  '/annuaire': [
    { label: 'Chercher entreprise', message: "Comment trouver une entreprise dans l'annuaire ?" },
    { label: 'Vérifier RCCM', message: "Comment vérifier l'authenticité d'une entreprise ?" },
    { label: 'Inscrire mon entreprise', message: "Comment inscrire mon entreprise dans l'annuaire ?" },
  ],
  '/investir-numerique': [
    { label: 'Vision numérique', message: 'Quelle est la stratégie numérique du Gabon ?' },
    { label: 'Indicateurs clés', message: 'Quels sont les indicateurs économiques numériques du Gabon ?' },
  ],
  '/dashboard': [
    { label: 'Mon tableau de bord', message: 'Que puis-je faire depuis mon tableau de bord ?' },
    { label: 'Mon profil', message: 'Comment mettre à jour mes informations de profil ?' },
    { label: 'Mes notifications', message: "Comment gérer mes notifications ?" },
  ],
  '/demo': [
    { label: 'Changer de profil', message: 'Comment changer de profil dans la démonstration ?' },
    { label: 'Fonctionnalités', message: 'Quelles fonctionnalités puis-je tester en mode démo ?' },
  ],
};

/**
 * Returns contextual suggestions based on pathname.
 * Falls back to homepage suggestions if no match.
 */
export function getSuggestions(pathname: string): Suggestion[] {
  // Exact match first
  if (PAGE_SUGGESTIONS[pathname]) return PAGE_SUGGESTIONS[pathname];

  // Prefix match (e.g. /dashboard/incubateur/mentoring → /dashboard)
  const segments = pathname.split('/').filter(Boolean);
  while (segments.length > 0) {
    const prefix = '/' + segments.join('/');
    if (PAGE_SUGGESTIONS[prefix]) return PAGE_SUGGESTIONS[prefix];
    segments.pop();
  }

  // Default: homepage suggestions
  return PAGE_SUGGESTIONS['/'];
}
