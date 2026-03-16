// Marchés Publics Numériques — Mock Data for public service page
// Tenders, sectors, alerts

export interface MarchePublic {
  id: string;
  reference: string;
  titre: string;
  autoriteContractante: string;
  secteur: string;
  budgetMin: number;
  budgetMax: number;
  dateLimite: string;
  datePublication: string;
  statut: 'ouvert' | 'cloture' | 'attribue' | 'annule';
  soumissions: number;
  description: string;
  lieu: string;
}

export interface SecteurMarche {
  id: string;
  nom: string;
  icon: string;
  marchesActifs: number;
  color: string;
}

export interface AlerteMarche {
  id: string;
  type: 'secteur' | 'budget' | 'autorite';
  label: string;
  actif: boolean;
  description: string;
}

export interface SoumissionStatus {
  id: string;
  reference: string;
  marcheRef: string;
  marcheTitre: string;
  dateSoumission: string;
  statut: 'soumis' | 'en_evaluation' | 'retenu' | 'non_retenu';
  montant: string;
}

// ═══════════════════════════════════════════
//  APPELS D'OFFRES
// ═══════════════════════════════════════════

export const MARCHES_PUBLICS: MarchePublic[] = [
  {
    id: 'mp-1',
    reference: 'DGMP-2026-AO-001',
    titre: 'Développement du SI de gestion des marchés publics',
    autoriteContractante: 'MENUDI',
    secteur: 'Technologies',
    budgetMin: 500_000_000,
    budgetMax: 1_200_000_000,
    dateLimite: '2026-06-30',
    datePublication: '2026-03-01',
    statut: 'ouvert',
    soumissions: 5,
    description:
      "Développement et déploiement d'une plateforme intégrée pour la gestion dématérialisée des marchés publics au Gabon.",
    lieu: 'Libreville',
  },
  {
    id: 'mp-2',
    reference: 'DGMP-2026-AO-002',
    titre: 'Réhabilitation du réseau fibre optique de Libreville',
    autoriteContractante: 'ANINF',
    secteur: 'Télécommunications',
    budgetMin: 2_000_000_000,
    budgetMax: 3_500_000_000,
    dateLimite: '2026-07-15',
    datePublication: '2026-02-15',
    statut: 'ouvert',
    soumissions: 12,
    description:
      'Réhabilitation et extension du réseau fibre optique métropolitain de Libreville, incluant la connexion de 50 bâtiments administratifs.',
    lieu: 'Libreville',
  },
  {
    id: 'mp-3',
    reference: 'DGMP-2026-AO-003',
    titre: "Fourniture d'équipements informatiques pour les écoles",
    autoriteContractante: 'MEN',
    secteur: 'Éducation',
    budgetMin: 150_000_000,
    budgetMax: 300_000_000,
    dateLimite: '2026-05-20',
    datePublication: '2026-01-20',
    statut: 'cloture',
    soumissions: 8,
    description:
      'Acquisition et installation de 500 ordinateurs, 50 serveurs et équipements réseau dans 25 établissements scolaires.',
    lieu: 'National',
  },
  {
    id: 'mp-4',
    reference: 'DGMP-2026-AO-004',
    titre: 'Plateforme e-santé nationale',
    autoriteContractante: 'Min. Santé',
    secteur: 'Santé',
    budgetMin: 800_000_000,
    budgetMax: 1_500_000_000,
    dateLimite: '2026-08-01',
    datePublication: '2026-03-10',
    statut: 'ouvert',
    soumissions: 0,
    description:
      "Conception et déploiement d'une plateforme nationale de télémédecine et gestion des dossiers patients électroniques.",
    lieu: 'National',
  },
  {
    id: 'mp-5',
    reference: 'DGMP-2026-AO-005',
    titre: "Audit sécurité des systèmes d'information publics",
    autoriteContractante: 'ANINF',
    secteur: 'Technologies',
    budgetMin: 100_000_000,
    budgetMax: 250_000_000,
    dateLimite: '2026-09-15',
    datePublication: '2026-03-05',
    statut: 'ouvert',
    soumissions: 3,
    description:
      "Audit de sécurité complet de 15 systèmes d'information gouvernementaux, incluant tests de pénétration et recommandations.",
    lieu: 'Libreville',
  },
  {
    id: 'mp-6',
    reference: 'DGMP-2026-AO-006',
    titre: 'Construction du Data Center National — Phase 2',
    autoriteContractante: 'ANINF',
    secteur: 'Infrastructure',
    budgetMin: 5_000_000_000,
    budgetMax: 8_000_000_000,
    dateLimite: '2026-10-01',
    datePublication: '2026-03-12',
    statut: 'ouvert',
    soumissions: 1,
    description:
      'Extension du Data Center National avec ajout de 200 racks, système de refroidissement et alimentation redondante.',
    lieu: 'Libreville',
  },
];

// ═══════════════════════════════════════════
//  SECTEURS
// ═══════════════════════════════════════════

export const SECTEURS_MARCHES: SecteurMarche[] = [
  { id: 'tech', nom: 'Technologies', icon: '💻', marchesActifs: 3, color: '#3b82f6' },
  { id: 'telecom', nom: 'Télécommunications', icon: '📡', marchesActifs: 1, color: '#8b5cf6' },
  { id: 'edu', nom: 'Éducation', icon: '📚', marchesActifs: 1, color: '#f59e0b' },
  { id: 'sante', nom: 'Santé', icon: '🏥', marchesActifs: 1, color: '#10b981' },
  { id: 'infra', nom: 'Infrastructure', icon: '🏗️', marchesActifs: 1, color: '#ef4444' },
  { id: 'env', nom: 'Environnement', icon: '🌿', marchesActifs: 0, color: '#22c55e' },
];

// ═══════════════════════════════════════════
//  ALERTES
// ═══════════════════════════════════════════

export const ALERTES_DEFAULT: AlerteMarche[] = [
  {
    id: 'al-1',
    type: 'secteur',
    label: 'Technologies',
    actif: true,
    description: 'Nouveaux marchés dans le secteur Technologies',
  },
  {
    id: 'al-2',
    type: 'secteur',
    label: 'Télécommunications',
    actif: false,
    description: 'Nouveaux marchés en Télécommunications',
  },
  {
    id: 'al-3',
    type: 'budget',
    label: 'Budget > 500M FCFA',
    actif: true,
    description: 'Marchés avec budget supérieur à 500 millions FCFA',
  },
  {
    id: 'al-4',
    type: 'autorite',
    label: 'ANINF',
    actif: true,
    description: "Marchés publiés par l'ANINF",
  },
  {
    id: 'al-5',
    type: 'autorite',
    label: 'MENUDI',
    actif: false,
    description: 'Marchés publiés par le MENUDI',
  },
];

// ═══════════════════════════════════════════
//  MES SOUMISSIONS (pour entrepreneurs)
// ═══════════════════════════════════════════

export const MES_SOUMISSIONS: SoumissionStatus[] = [
  {
    id: 'sub-1',
    reference: 'SOUM-2026-00042',
    marcheRef: 'DGMP-2026-AO-001',
    marcheTitre: 'Développement du SI marchés publics',
    dateSoumission: '2026-03-10',
    statut: 'en_evaluation',
    montant: '780 M FCFA',
  },
  {
    id: 'sub-2',
    reference: 'SOUM-2026-00043',
    marcheRef: 'DGMP-2026-AO-005',
    marcheTitre: 'Audit sécurité SI publics',
    dateSoumission: '2026-03-12',
    statut: 'soumis',
    montant: '180 M FCFA',
  },
];

// ═══════════════════════════════════════════
//  STATS
// ═══════════════════════════════════════════

export const MARCHES_STATS = {
  marchesOuverts: 4,
  budgetTotal: '14.5 Mds FCFA',
  soumissionsRecevoir: 21,
  marchesAttribues: 1,
};

// ═══════════════════════════════════════════
//  HELPERS
// ═══════════════════════════════════════════

export function formatBudgetCFA(amount: number): string {
  if (amount >= 1_000_000_000) return `${(amount / 1_000_000_000).toFixed(1)} Mds FCFA`;
  if (amount >= 1_000_000) return `${(amount / 1_000_000).toFixed(0)} M FCFA`;
  return `${amount.toLocaleString()} FCFA`;
}
