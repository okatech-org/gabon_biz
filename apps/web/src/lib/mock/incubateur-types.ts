// ═══════════════════════════════════════════════════════════════════════════
// TYPES — SING Réels (218 startups, 17 programmes, 18 secteurs)
// Source: "Fichier startups SING - MEN.pdf" (SING SA / MENUDI)
// ═══════════════════════════════════════════════════════════════════════════

// === SECTEURS NORMALISÉS (55 bruts → 18) ===

export type SecteurNormalise =
  | 'SANTE'
  | 'TRANSPORT'
  | 'AGRICULTURE'
  | 'COMMERCE'
  | 'EDTECH'
  | 'FINTECH'
  | 'COMMUNICATION'
  | 'EVENEMENTIEL'
  | 'ENVIRONNEMENT'
  | 'TECH_IT'
  | 'TOURISME'
  | 'GOUVERNANCE'
  | 'INDUSTRIE'
  | 'ART_CULTURE'
  | 'IMMOBILIER'
  | 'RESTAURATION'
  | 'SECURITE'
  | 'CONSEIL';

// === PROGRAMMES RÉELS ===

export type ProgrammeId =
  | 'techclinic'
  | 'cohorte-innovation-4-fef'
  | 'cohorte-innovation-4'
  | 'agrifutur'
  | 'welp'
  | 'entreprendre-feminin'
  | 'e-startup-challenge'
  | 'moov-startup-challenge'
  | 'entrepreneur-impact'
  | 'e-sante'
  | 'pantheres'
  | 'mentorat-1000'
  | 'hackathon-sport'
  | 'prodece'
  | 'hackathon-airtel'
  | 'pepiniere-pme'
  | 'smartgog';

// === MATURITÉ / TIER ===

export type MaturiteLevel = 'I' | 'M'; // I = Immature, M = Mature
export type StartupTier = 'TOP' | 'ACTIVE' | 'INACTIVE';

// === STARTUP SING (données réelles) ===

export interface StartupSING {
  id: string;
  num: number;
  nom: string;
  programmeId: ProgrammeId;
  programmeRaw: string;
  secteurRaw: string;
  secteur: SecteurNormalise;
  siteWeb: string | null;
  actif: boolean;
  dateDemarrage: string | null;
  formalisation: boolean;
  maturite: MaturiteLevel;
  emplois: number;
  tier: StartupTier;
  score: number;
}

// === PROGRAMME RÉEL ===

export interface ProgrammeReel {
  id: ProgrammeId;
  name: string;
  rawName: string;
  pilier: 'Pivot 4.0' | 'SING Capital' | 'SING Conseil' | 'SING Logiciels' | 'Partenaire';
  totalStartups: number;
  startupsActives: number;
  startupsMatures: number;
  startupsFormalisees: number;
  totalEmplois: number;
  color: string;
  icon: string;
  description: string;
}

// === TYPES LEGACY (utilisés par pages dashboard non-modifiées) ===

export type ProgrammeStatus = 'OPEN' | 'COMING_SOON' | 'IN_PROGRESS' | 'COMPLETED';
export type StartupStage = 'PRE_SEED' | 'SEED' | 'SERIES_A' | 'GROWTH';
export type StartupStatus = 'ACTIVE' | 'INACTIVE' | 'LEGACY';
export type CohorteStatus = 'OPEN' | 'IN_PROGRESS' | 'COMPLETED';
export type EventType = 'HACKATHON' | 'CONFERENCE' | 'DEMO_DAY' | 'WORKSHOP' | 'DEMO';
export type MilestoneStatus = 'COMPLETED' | 'IN_PROGRESS' | 'LOCKED';

export interface Programme {
  id: string;
  name: string;
  pilier: string;
  color: string;
  iconName: string;
  duration: string;
  cost: string;
  places: { total: number | null; remaining: number | null };
  status: ProgrammeStatus;
  nextDate: string;
  description: string;
  eligibility: string[];
  phases: { name: string; weeks: string; iconName: string }[];
  alumni: string[];
  successRate: string | null;
  tags: string[];
  fundingRange?: { min: number; max: number; currency: string };
  impactStats?: Record<string, string | number>;
}

export interface StartupProfile {
  id: string;
  name: string;
  sector: string;
  tagline: string;
  description: string;
  founders: { name: string; role: string }[];
  stage: StartupStage;
  fundingRaised: string;
  employees: number | null;
  programme: string;
  year: number;
  metrics: Record<string, string>;
  tags: string[];
  status: StartupStatus;
  featured?: boolean;
  website: string | null;
}

export interface Mentor {
  id: string;
  name: string;
  title: string;
  expertise: string[];
  sectors: string[];
  experience: string;
  mentees: number;
  rating: number;
  availability: string;
  bio: string;
  languages: string[];
}

export interface Cohorte {
  id: string;
  name: string;
  programme: string;
  status: CohorteStatus;
  startDate: string;
  endDate: string;
  places: { total: number; filled: number };
  startups: string[];
  mentors: number;
  sponsors: string[];
  results?: Record<string, string | number>;
}

export interface Evenement {
  id: string;
  name: string;
  type: EventType;
  date: string;
  endDate?: string;
  location: string;
  description: string;
  capacity: number;
  registered: number;
  price: string;
  tags: string[];
  registrationOpen: boolean;
  prize?: string;
  speakers?: number;
}

export interface Pilier {
  id: string;
  name: string;
  subtitle: string;
  iconName: string;
  color: string;
  description: string;
  stats: { label: string; value: string }[];
  programmes: string[];
}

export interface SuccessStory {
  startup: string;
  quote: string;
  metrics: { label: string; value: string; iconName: string }[];
  programme: string;
  year: number;
  gradient: string;
}

export interface Milestone {
  id: number;
  title: string;
  week: string;
  status: MilestoneStatus;
  completedDate?: string;
  deliverables: string[];
}
