// GABON BIZ — Système de Profils Progressifs
// Chaque citoyen commence avec le profil PUBLIC et peut activer des profils métier

// ============================================================
// Types
// ============================================================

export type ProfileType =
  | 'PUBLIC'        // Niveau 0 — Automatique à la connexion IDENTITE.GA
  | 'ENTREPRENEUR'  // Niveau 1 — Self-service + vérification RCCM
  | 'STARTUP'       // Niveau 2 — Candidature + validation incubateur
  | 'INVESTOR'      // Niveau 2 — Dossier + validation MENUDI
  | 'ADMIN'         // Niveau 3 — Attribution par super-admin uniquement
  | 'SYSADMIN';     // Niveau 3 — Attribution par super-admin uniquement

export type ProfileStatus =
  | 'active'        // Profil actif et utilisable
  | 'pending'       // Demande en cours de validation
  | 'rejected'      // Demande refusée (peut re-candidater)
  | 'suspended';    // Profil suspendu par un admin

export type ActivationLevel = 0 | 1 | 2 | 3;

export interface UserProfile {
  type: ProfileType;
  status: ProfileStatus;
  activatedAt?: string;      // ISO date
  requestedAt?: string;      // ISO date
  rejectedAt?: string;       // ISO date
  rejectionReason?: string;
  verifiedBy?: string;       // NIP de l'admin qui a validé
  metadata?: Record<string, string>; // RCCM, secteur, etc.
}

export interface UserProfileState {
  nip: string;
  activeProfile: ProfileType;  // Profil actuellement sélectionné
  profiles: UserProfile[];     // Tous les profils du citoyen
  isFirstLogin: boolean;
  onboardingCompleted: boolean;
}

// ============================================================
// Configuration des profils
// ============================================================

export interface ProfileDefinition {
  type: ProfileType;
  level: ActivationLevel;
  label: string;
  shortLabel: string;
  description: string;
  icon: string;
  color: string;       // Couleur principale
  bgColor: string;     // Couleur de fond clair
  borderColor: string;
  requirements: string[];
  accessibleModules: string[];
  canSelfActivate: boolean;    // true = pas besoin d'admin
  requiresVerification: boolean;
}

export const PROFILE_DEFINITIONS: Record<ProfileType, ProfileDefinition> = {
  PUBLIC: {
    type: 'PUBLIC',
    level: 0,
    label: 'Citoyen',
    shortLabel: 'Citoyen',
    description: 'Accès en consultation à l\'écosystème économique gabonais. Annuaire des entreprises, observatoire, marchés publics en lecture.',
    icon: '👤',
    color: '#6B7280',
    bgColor: '#F3F4F6',
    borderColor: '#D1D5DB',
    requirements: ['Connexion via IDENTITE.GA'],
    accessibleModules: ['annuaire', 'observatoire', 'filieres', 'marches-consultation'],
    canSelfActivate: true,
    requiresVerification: false,
  },
  ENTREPRENEUR: {
    type: 'ENTREPRENEUR',
    level: 1,
    label: 'Entrepreneur',
    shortLabel: 'Entrepreneur',
    description: 'Créez et gérez votre entreprise. Accès au guichet unique, soumission aux marchés publics, programmes d\'accompagnement.',
    icon: '🏢',
    color: '#E67E22',
    bgColor: '#FFF7ED',
    borderColor: '#FDBA74',
    requirements: [
      'Numéro RCCM valide ou création en cours',
      'Informations de l\'entreprise (nom, secteur, ville)',
    ],
    accessibleModules: [
      'annuaire', 'observatoire', 'filieres', 'marches-consultation',
      'guichet-unique', 'mes-entreprises', 'soumissions', 'marches-publics',
      'programmes', 'notifications',
    ],
    canSelfActivate: true,
    requiresVerification: true,
  },
  STARTUP: {
    type: 'STARTUP',
    level: 2,
    label: 'Startup / Fondateur',
    shortLabel: 'Startup',
    description: 'Portez votre projet innovant. Accès à l\'incubateur, innovation hub, matching investisseurs, cohortes d\'accompagnement.',
    icon: '🚀',
    color: '#8B5CF6',
    bgColor: '#F5F3FF',
    borderColor: '#C4B5FD',
    requirements: [
      'Description du projet innovant',
      'Secteur d\'activité et stade de développement',
      'Validation par l\'équipe Innovation Hub / Incubateur',
    ],
    accessibleModules: [
      'annuaire', 'observatoire', 'filieres', 'marches-consultation',
      'innovation-hub', 'incubateur', 'cohortes', 'matching-ia',
      'defis', 'analytics-startup', 'investir-recherche',
    ],
    canSelfActivate: false,
    requiresVerification: true,
  },
  INVESTOR: {
    type: 'INVESTOR',
    level: 2,
    label: 'Investisseur',
    shortLabel: 'Investisseur',
    description: 'Investissez dans l\'écosystème gabonais. Deal flow, matching startups, simulateur ROI, opportunités de co-investissement.',
    icon: '💰',
    color: '#2563EB',
    bgColor: '#EFF6FF',
    borderColor: '#93C5FD',
    requirements: [
      'Structure d\'investissement (fonds, BA, family office)',
      'Thèse d\'investissement et secteurs cibles',
      'Validation par l\'équipe MENUDI',
    ],
    accessibleModules: [
      'annuaire', 'observatoire', 'filieres', 'marches-consultation',
      'investir', 'deal-flow', 'matching-ia', 'roi-simulator',
      'analytics-investisseur', 'startups-portfolio',
    ],
    canSelfActivate: false,
    requiresVerification: true,
  },
  ADMIN: {
    type: 'ADMIN',
    level: 3,
    label: 'Administrateur MENUDI',
    shortLabel: 'Admin',
    description: 'Gestion de la plateforme GABON BIZ. Validation des profils, gestion des entreprises, paramétrage système.',
    icon: '🛡️',
    color: '#059669',
    bgColor: '#ECFDF5',
    borderColor: '#6EE7B7',
    requirements: ['Attribution par le super-administrateur uniquement'],
    accessibleModules: ['*'], // Accès total
    canSelfActivate: false,
    requiresVerification: true,
  },
  SYSADMIN: {
    type: 'SYSADMIN',
    level: 3,
    label: 'Administrateur Système',
    shortLabel: 'SysAdmin',
    description: 'Administration technique de la plateforme. Logs, monitoring, configuration, gestion des accès.',
    icon: '⚙️',
    color: '#DC2626',
    bgColor: '#FEF2F2',
    borderColor: '#FCA5A5',
    requirements: ['Attribution par le super-administrateur uniquement'],
    accessibleModules: ['*'],
    canSelfActivate: false,
    requiresVerification: true,
  },
};

// ============================================================
// Profils que les utilisateurs peuvent demander eux-mêmes
// ============================================================

export const REQUESTABLE_PROFILES: ProfileType[] = ['ENTREPRENEUR', 'STARTUP', 'INVESTOR'];

// Profils auto-activés (pas besoin de validation)
export const SELF_ACTIVATED_PROFILES: ProfileType[] = ['PUBLIC', 'ENTREPRENEUR'];

// Profils réservés aux admins
export const ADMIN_ONLY_PROFILES: ProfileType[] = ['ADMIN', 'SYSADMIN'];

// ============================================================
// Helpers
// ============================================================

/** Vérifie si un utilisateur possède un profil actif donné */
export function hasActiveProfile(state: UserProfileState, type: ProfileType): boolean {
  return state.profiles.some((p) => p.type === type && p.status === 'active');
}

/** Vérifie si un utilisateur a une demande en attente pour un profil */
export function hasPendingRequest(state: UserProfileState, type: ProfileType): boolean {
  return state.profiles.some((p) => p.type === type && p.status === 'pending');
}

/** Retourne le profil actif courant avec sa définition */
export function getActiveProfileDef(state: UserProfileState): ProfileDefinition {
  return PROFILE_DEFINITIONS[state.activeProfile] || PROFILE_DEFINITIONS.PUBLIC;
}

/** Retourne tous les profils actifs d'un utilisateur */
export function getActiveProfiles(state: UserProfileState): ProfileDefinition[] {
  return state.profiles
    .filter((p) => p.status === 'active')
    .map((p) => PROFILE_DEFINITIONS[p.type])
    .filter(Boolean);
}

/** Retourne les profils demandables (non encore actifs ou en attente) */
export function getAvailableProfiles(state: UserProfileState): ProfileDefinition[] {
  return REQUESTABLE_PROFILES
    .filter((type) => {
      const existing = state.profiles.find((p) => p.type === type);
      return !existing || existing.status === 'rejected';
    })
    .map((type) => PROFILE_DEFINITIONS[type]);
}

// ============================================================
// Dashboard navigation paths per profile
// Used to filter sidebar nav items based on active profile
// ============================================================

export const PROFILE_DASHBOARD_PATHS: Record<ProfileType, string[]> = {
  PUBLIC: [
    '/dashboard',
    '/dashboard/entreprises',
    '/dashboard/marches',
    '/dashboard/observatoire',
    '/dashboard/filieres',
    '/dashboard/annuaire',
    '/dashboard/profils',
  ],
  ENTREPRENEUR: [
    '/dashboard',
    '/dashboard/entreprises',
    '/dashboard/marches',
    '/dashboard/soumissions',
    '/dashboard/filieres',
    '/dashboard/annuaire',
    '/dashboard/profils',
  ],
  STARTUP: [
    '/dashboard',
    '/dashboard/entreprises',
    '/dashboard/innovation',
    '/dashboard/innovation/defis',
    '/dashboard/innovation/startups',
    '/dashboard/innovation/matching',
    '/dashboard/innovation/comparer',
    '/dashboard/innovation/analytics',
    '/dashboard/incubateur',
    '/dashboard/investir',
    '/dashboard/annuaire',
    '/dashboard/profils',
  ],
  INVESTOR: [
    '/dashboard',
    '/dashboard/innovation',
    '/dashboard/incubateur',
    '/dashboard/investir',
    '/dashboard/investir/opportunites',
    '/dashboard/investir/macro',
    '/dashboard/investir/due-diligence',
    '/dashboard/investir/simulateur',
    '/dashboard/investir/veille',
    '/dashboard/observatoire',
    '/dashboard/filieres',
    '/dashboard/annuaire',
    '/dashboard/profils',
  ],
  ADMIN: [
    '/dashboard',
    '/dashboard/entreprises',
    '/dashboard/marches',
    '/dashboard/soumissions',
    '/dashboard/innovation',
    '/dashboard/incubateur',
    '/dashboard/investir',
    '/dashboard/observatoire',
    '/dashboard/filieres',
    '/dashboard/cgi',
    '/dashboard/annuaire',
    '/dashboard/admin',
    '/dashboard/profils',
  ],
  SYSADMIN: [
    '/dashboard',
    '/dashboard/entreprises',
    '/dashboard/marches',
    '/dashboard/soumissions',
    '/dashboard/innovation',
    '/dashboard/incubateur',
    '/dashboard/investir',
    '/dashboard/observatoire',
    '/dashboard/filieres',
    '/dashboard/cgi',
    '/dashboard/annuaire',
    '/dashboard/admin',
    '/dashboard/profils',
  ],
};

/** Returns dashboard nav paths for a given profile type */
export function getDashboardPathsForProfile(type: ProfileType): string[] {
  return PROFILE_DASHBOARD_PATHS[type] || PROFILE_DASHBOARD_PATHS.PUBLIC;
}

/** Crée un état de profil par défaut pour un nouvel utilisateur */
export function createDefaultProfileState(nip: string): UserProfileState {
  return {
    nip,
    activeProfile: 'PUBLIC',
    profiles: [
      {
        type: 'PUBLIC',
        status: 'active',
        activatedAt: new Date().toISOString(),
      },
    ],
    isFirstLogin: true,
    onboardingCompleted: false,
  };
}
