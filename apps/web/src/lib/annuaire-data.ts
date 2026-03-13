// ====================================================================
// GABON BIZ — Annuaire des Entreprises — Data Layer
// Données réelles + Bridge SING startups
// ====================================================================

import { ALL_STARTUPS_SING } from './mock/incubateur-startups';
import { SECTEUR_CONFIG, PROGRAMMES_REELS } from './mock/incubateur-data';
import type { StartupSING } from './mock/incubateur-types';
import { GENERATED_ENTERPRISES } from './annuaire-generated-companies';
import { BATCH2_ENTERPRISES } from './annuaire-generated-batch2';
import { BATCH3_ENTERPRISES } from './annuaire-generated-batch3';
import { BATCH4_ENTERPRISES } from './annuaire-generated-batch4';
import { BATCH5_ENTERPRISES } from './annuaire-generated-batch5';

// ── TYPES ──────────────────────────────────────────────────────────

export interface AnnuaireEnterprise {
  id: string;
  rccm: string;
  nif: string;
  name: string;
  legalForm: 'EI' | 'SARL' | 'SA' | 'SAS' | 'SNC' | 'SCS';
  sector: { id: string; name: string; slug: string; icon: string };
  status: 'ACTIVE' | 'SUSPENDED' | 'CLOSED' | 'INACTIVE';
  address: { street: string; city: string; province: string; country: string };
  description: string;
  employeeCount: number;
  yearFounded: number;
  phone?: string;
  email?: string;
  website?: string;
  isDigitalEcosystem: boolean;
  isSingStartup?: boolean;
  digitalCategory?: string;
  startupProfile?: {
    pitch: string;
    teamSize: number;
    fundingStage: string;
    isIncubated: boolean;
    cohortName?: string;
    solutions: { name: string; category: string; rating: number }[];
    seekingFunding: boolean;
    fundingTarget?: number;
  };
  tags: string[];
  publicStats: {
    tenderParticipations?: number;
    tendersWon?: number;
    innovationHubSolutions?: number;
    averageRating?: number;
  };
  createdAt: string;
  updatedAt: string;
}

export type DigitalCategory =
  | 'FinTech' | 'AgriTech' | 'EdTech' | 'HealthTech' | 'GreenTech'
  | 'LogisTech' | 'GovTech' | 'MediaTech' | 'InsurTech' | 'PropTech'
  | 'LegalTech' | 'Cybersécurité' | 'IA & Data' | 'Cloud & Infra' | 'E-commerce';

export interface AnnuaireSector {
  id: string;
  name: string;
  slug: string;
  icon: string;
  color: string;
  enterpriseCount: number;
  description: string;
}

// ── SECTORS ────────────────────────────────────────────────────────

export const SECTORS: AnnuaireSector[] = [
  { id: 'sec-01', name: "Technologies de l'Information", slug: 'technologies', icon: '💻', color: '#8b5cf6', enterpriseCount: 85, description: 'Développement logiciel, services IT, télécommunications, startups tech' },
  { id: 'sec-02', name: 'Agriculture & Agroalimentaire', slug: 'agriculture', icon: '🌾', color: '#22c55e', enterpriseCount: 120, description: 'Production agricole, transformation, commercialisation, agritech' },
  { id: 'sec-03', name: 'Mines & Hydrocarbures', slug: 'mines', icon: '⛏️', color: '#f59e0b', enterpriseCount: 45, description: 'Extraction minière, pétrole, gaz, services associés' },
  { id: 'sec-04', name: 'Transport & Logistique', slug: 'transport', icon: '🚛', color: '#3b82f6', enterpriseCount: 65, description: 'Transport terrestre, maritime, aérien, entreposage' },
  { id: 'sec-05', name: 'Bois & Forêt', slug: 'bois', icon: '🌳', color: '#059669', enterpriseCount: 95, description: 'Exploitation forestière, sciage, menuiserie, certification' },
  { id: 'sec-06', name: 'Santé & Pharmacie', slug: 'sante', icon: '🏥', color: '#ef4444', enterpriseCount: 38, description: 'Cliniques, pharmacies, matériel médical, santé numérique' },
  { id: 'sec-07', name: 'Éducation & Formation', slug: 'education', icon: '🎓', color: '#ec4899', enterpriseCount: 52, description: 'Écoles privées, centres de formation, edtech' },
  { id: 'sec-08', name: 'Énergie & Environnement', slug: 'energie', icon: '⚡', color: '#14b8a6', enterpriseCount: 28, description: 'Énergies renouvelables, gestion des déchets, crédits carbone' },
  { id: 'sec-09', name: 'BTP & Immobilier', slug: 'btp', icon: '🏗️', color: '#78716c', enterpriseCount: 72, description: 'Construction, travaux publics, promotion immobilière' },
  { id: 'sec-10', name: 'Commerce & Distribution', slug: 'commerce', icon: '🛒', color: '#a855f7', enterpriseCount: 110, description: 'Import-export, grande distribution, commerce de détail' },
  { id: 'sec-11', name: 'Tourisme & Hôtellerie', slug: 'tourisme', icon: '🏨', color: '#0ea5e9', enterpriseCount: 35, description: 'Hôtels, agences de voyage, écotourisme, restauration' },
  { id: 'sec-12', name: 'Services Financiers', slug: 'finance', icon: '🏦', color: '#0d9488', enterpriseCount: 22, description: 'Banques, assurances, microfinance, mobile money' },
];

// ── PROVINCES ──────────────────────────────────────────────────────

export const PROVINCES = [
  'Estuaire', 'Haut-Ogooué', 'Moyen-Ogooué', 'Ngounié', 'Nyanga',
  'Ogooué-Ivindo', 'Ogooué-Lolo', 'Ogooué-Maritime', 'Woleu-Ntem',
];

export const LEGAL_FORMS = ['EI', 'SARL', 'SA', 'SAS', 'SNC', 'SCS'] as const;

// ══════════════════════════════════════════════════════════════════════════
// ENTREPRISES RÉELLES DU GABON (30)
// ══════════════════════════════════════════════════════════════════════════

export const REAL_ENTERPRISES: AnnuaireEnterprise[] = [
  // ═══ SERVICES FINANCIERS ═══
  {
    id: 'bgfi-bank', rccm: 'GA-LIB-1971-B-00001', nif: 'NIF-GA-1971-00001',
    name: 'BGFI Bank Group', legalForm: 'SA',
    sector: { id: 'sec-12', name: 'Services Financiers', slug: 'finance', icon: '🏦' },
    status: 'ACTIVE',
    address: { street: "Boulevard de l'Indépendance", city: 'Libreville', province: 'Estuaire', country: 'Gabon' },
    description: "Premier groupe bancaire d'Afrique centrale. Près de 50% de parts du marché bancaire gabonais. Services bancaires, bourse (BGFIBOURSE), immobilier et banque digitale (BGFIMobile, BGFIOnline).",
    employeeCount: 1200, yearFounded: 1971,
    phone: '+241 011 76 26 13', email: 'info@bgfi.com', website: 'https://bgfi.com',
    isDigitalEcosystem: false, tags: ['banque', 'finance', 'bourse', 'mobile banking', 'CEMAC'],
    publicStats: { tenderParticipations: 25, tendersWon: 12 },
    createdAt: '1971-01-01', updatedAt: '2026-03-01',
  },
  {
    id: 'afg-bank', rccm: 'GA-LIB-1973-B-00012', nif: 'NIF-GA-1973-00012',
    name: 'AFG Bank Gabon (ex-BICIG)', legalForm: 'SA',
    sector: { id: 'sec-12', name: 'Services Financiers', slug: 'finance', icon: '🏦' },
    status: 'ACTIVE',
    address: { street: 'Avenue du Colonel Parant', city: 'Libreville', province: 'Estuaire', country: 'Gabon' },
    description: "Anciennement BICIG, rebaptisée AFG Bank Gabon en décembre 2024 suite au rachat par Atlantic Financial Group. Banque universelle proposant services aux particuliers, professionnels et entreprises.",
    employeeCount: 450, yearFounded: 1973,
    email: 'contact@afgbankgabon.com', website: 'https://afgbankgabon.com',
    isDigitalEcosystem: false, tags: ['banque', 'finance', 'crédit', 'épargne', 'Atlantic Financial Group'],
    publicStats: { tenderParticipations: 12, tendersWon: 5 },
    createdAt: '1973-06-01', updatedAt: '2026-02-15',
  },
  {
    id: 'ecobank-gabon', rccm: 'GA-LIB-1999-B-00234', nif: 'NIF-GA-1999-00234',
    name: 'Ecobank Gabon', legalForm: 'SA',
    sector: { id: 'sec-12', name: 'Services Financiers', slug: 'finance', icon: '🏦' },
    status: 'ACTIVE',
    address: { street: 'Boulevard de la Mer', city: 'Libreville', province: 'Estuaire', country: 'Gabon' },
    description: "Filiale du groupe panafricain Ecobank Transnational. Services bancaires complets : trade finance, trésorerie, EcobankPay, Rapidtransfer — solutions de paiement transfrontalier.",
    employeeCount: 280, yearFounded: 1999,
    email: 'eaborel@ecobank.com', website: 'https://ecobank.com/ga',
    isDigitalEcosystem: false, tags: ['banque', 'panafricain', 'mobile banking', 'trade finance', 'EcobankPay'],
    publicStats: { tenderParticipations: 8, tendersWon: 3 },
    createdAt: '1999-03-01', updatedAt: '2026-01-20',
  },
  {
    id: 'orabank-gabon', rccm: 'GA-LIB-2009-B-00456', nif: 'NIF-GA-2009-00456',
    name: 'Orabank Gabon', legalForm: 'SA',
    sector: { id: 'sec-12', name: 'Services Financiers', slug: 'finance', icon: '🏦' },
    status: 'ACTIVE',
    address: { street: 'Boulevard Triomphal Omar Bongo', city: 'Libreville', province: 'Estuaire', country: 'Gabon' },
    description: "Banque commerciale du groupe Oragroup, présente dans 12 pays d'Afrique. Services aux particuliers, PME et grandes entreprises. Solutions digitales et microfinance.",
    employeeCount: 180, yearFounded: 2009,
    email: 'info@orabank.ga', website: 'https://orabank.net',
    isDigitalEcosystem: false, tags: ['banque', 'PME', 'microfinance', 'Oragroup'],
    publicStats: {},
    createdAt: '2009-05-01', updatedAt: '2026-02-01',
  },
  // ═══ MINES & HYDROCARBURES ═══
  {
    id: 'comilog', rccm: 'GA-MOA-1962-B-00001', nif: 'NIF-GA-1962-00001',
    name: "COMILOG (Cie Minière de l'Ogooué)", legalForm: 'SA',
    sector: { id: 'sec-03', name: 'Mines & Hydrocarbures', slug: 'mines', icon: '⛏️' },
    status: 'ACTIVE',
    address: { street: 'Plateau des Mines', city: 'Moanda', province: 'Haut-Ogooué', country: 'Gabon' },
    description: "Filiale du groupe français Eramet. Leader mondial du manganèse. Exploite le gisement de Moanda (25% des réserves mondiales). 2ème producteur mondial de manganèse haute teneur.",
    employeeCount: 3200, yearFounded: 1962,
    phone: '+241 066 61 22 00', email: 'info@comilog.com', website: 'https://eramet.com',
    isDigitalEcosystem: false, tags: ['manganèse', 'mines', 'Eramet', 'Moanda', 'export'],
    publicStats: { tenderParticipations: 35, tendersWon: 18 },
    createdAt: '1962-04-01', updatedAt: '2026-03-01',
  },
  {
    id: 'totalenergies-gabon', rccm: 'GA-PGE-1949-B-00001', nif: 'NIF-GA-1949-00001',
    name: 'TotalEnergies EP Gabon', legalForm: 'SA',
    sector: { id: 'sec-03', name: 'Mines & Hydrocarbures', slug: 'mines', icon: '⛏️' },
    status: 'ACTIVE',
    address: { street: 'Boulevard du Bord de Mer', city: 'Port-Gentil', province: 'Ogooué-Maritime', country: 'Gabon' },
    description: "Opérateur pétrolier historique au Gabon. Exploration et production de pétrole et gaz naturel. Opère dans les bassins offshore et onshore gabonais depuis plus de 70 ans.",
    employeeCount: 1500, yearFounded: 1949,
    website: 'https://totalenergies.ga',
    isDigitalEcosystem: false, tags: ['pétrole', 'gaz', 'offshore', 'exploration', 'hydrocarbures'],
    publicStats: { tenderParticipations: 40, tendersWon: 22 },
    createdAt: '1949-01-01', updatedAt: '2026-03-01',
  },
  {
    id: 'perenco-gabon', rccm: 'GA-PGE-1992-B-00089', nif: 'NIF-GA-1992-00089',
    name: 'Perenco Gabon SA', legalForm: 'SA',
    sector: { id: 'sec-03', name: 'Mines & Hydrocarbures', slug: 'mines', icon: '⛏️' },
    status: 'ACTIVE',
    address: { street: 'Zone portuaire', city: 'Port-Gentil', province: 'Ogooué-Maritime', country: 'Gabon' },
    description: "Société d'exploration et production pétrolière et gazière. Opère plusieurs champs pétroliers au Gabon. Parmi les plus importants producteurs indépendants du pays.",
    employeeCount: 800, yearFounded: 1992,
    isDigitalEcosystem: false, tags: ['pétrole', 'production', 'offshore', 'indépendant'],
    publicStats: { tenderParticipations: 15, tendersWon: 8 },
    createdAt: '1992-06-01', updatedAt: '2026-02-15',
  },
  {
    id: 'assala-energy', rccm: 'GA-PGE-2017-B-00234', nif: 'NIF-GA-2017-00234',
    name: 'Assala Energy', legalForm: 'SA',
    sector: { id: 'sec-03', name: 'Mines & Hydrocarbures', slug: 'mines', icon: '⛏️' },
    status: 'ACTIVE',
    address: { street: 'Centre-ville', city: 'Port-Gentil', province: 'Ogooué-Maritime', country: 'Gabon' },
    description: "Producteur pétrolier indépendant, issu du rachat des actifs onshore de Shell au Gabon. Opère le champ de Rabi-Kounga et plusieurs autres concessions.",
    employeeCount: 600, yearFounded: 2017,
    website: 'https://assalaenergy.com',
    isDigitalEcosystem: false, tags: ['pétrole', 'onshore', 'Rabi-Kounga', 'indépendant'],
    publicStats: { tenderParticipations: 10, tendersWon: 5 },
    createdAt: '2017-03-01', updatedAt: '2026-01-30',
  },
  {
    id: 'sogara', rccm: 'GA-PGE-1967-B-00005', nif: 'NIF-GA-1967-00005',
    name: 'SOGARA (Sté Gabonaise de Raffinage)', legalForm: 'SA',
    sector: { id: 'sec-03', name: 'Mines & Hydrocarbures', slug: 'mines', icon: '⛏️' },
    status: 'ACTIVE',
    address: { street: 'Zone industrielle', city: 'Port-Gentil', province: 'Ogooué-Maritime', country: 'Gabon' },
    description: "Unique raffinerie du Gabon. Traitement du brut gabonais pour le marché intérieur et l'export. Production de carburants, lubrifiants et bitumes.",
    employeeCount: 450, yearFounded: 1967,
    isDigitalEcosystem: false, tags: ['raffinage', 'pétrole', 'carburant', 'bitume'],
    publicStats: { tenderParticipations: 8, tendersWon: 4 },
    createdAt: '1967-09-01', updatedAt: '2026-03-01',
  },
  // ═══ TÉLÉCOMS & TECH ═══
  {
    id: 'gabon-telecom', rccm: 'GA-LIB-1999-B-00045', nif: 'NIF-GA-1999-00045',
    name: 'Moov Africa Gabon Telecom', legalForm: 'SA',
    sector: { id: 'sec-01', name: "Technologies de l'Information", slug: 'technologies', icon: '💻' },
    status: 'ACTIVE',
    address: { street: 'Boulevard Léon Mba', city: 'Libreville', province: 'Estuaire', country: 'Gabon' },
    description: "Opérateur historique des télécommunications. Filiale de Maroc Telecom (51%). Téléphonie fixe et mobile (Libertis/Moov), Internet haut débit, gestion du domaine .ga.",
    employeeCount: 950, yearFounded: 1999,
    phone: '+241 011 79 00 00', website: 'https://moov-africa.ga',
    isDigitalEcosystem: true, digitalCategory: 'Cloud & Infra',
    tags: ['télécoms', 'mobile', 'Internet', 'Maroc Telecom', 'opérateur'],
    publicStats: { tenderParticipations: 20, tendersWon: 10 },
    createdAt: '1999-01-01', updatedAt: '2026-03-01',
  },
  {
    id: 'airtel-gabon', rccm: 'GA-LIB-2000-B-00167', nif: 'NIF-GA-2000-00167',
    name: 'Airtel Gabon SA', legalForm: 'SA',
    sector: { id: 'sec-01', name: "Technologies de l'Information", slug: 'technologies', icon: '💻' },
    status: 'ACTIVE',
    address: { street: 'Rue Pecqueur, Centre-ville', city: 'Libreville', province: 'Estuaire', country: 'Gabon' },
    description: "Opérateur mobile et Internet. Réseau 3G/4G couvrant les principales villes. Services Airtel Money, data mobile, solutions entreprises.",
    employeeCount: 500, yearFounded: 2000,
    phone: '+241 074 00 00 00', website: 'https://airtel.ga',
    isDigitalEcosystem: true, digitalCategory: 'Cloud & Infra',
    tags: ['mobile', '4G', 'Airtel Money', 'data', 'opérateur'],
    publicStats: { tenderParticipations: 15, tendersWon: 7 },
    createdAt: '2000-07-01', updatedAt: '2026-02-28',
  },
  {
    id: 'sing-sa', rccm: 'GA-LIB-2018-B-00501', nif: 'NIF-GA-2018-00501',
    name: 'SING SA (Incubateur Numérique)', legalForm: 'SA',
    sector: { id: 'sec-01', name: "Technologies de l'Information", slug: 'technologies', icon: '💻' },
    status: 'ACTIVE',
    address: { street: 'Quartier Glass', city: 'Libreville', province: 'Estuaire', country: 'Gabon' },
    description: "Société d'Incubation Numérique du Gabon. Gère Pivot 4.0, premier incubateur entièrement numérique d'Afrique centrale. 250+ startups accompagnées, 500+ emplois créés, 2300+ personnes formées.",
    employeeCount: 35, yearFounded: 2018,
    website: 'https://sing.ga',
    isDigitalEcosystem: true, digitalCategory: 'EdTech',
    tags: ['incubateur', 'startups', 'Pivot 4.0', 'Digital Africa', 'MENUDI'],
    publicStats: { innovationHubSolutions: 17, averageRating: 4.8 },
    createdAt: '2018-01-01', updatedAt: '2026-03-10',
  },
  // ═══ INDUSTRIE & DISTRIBUTION ═══
  {
    id: 'sobraga', rccm: 'GA-LIB-1966-B-00003', nif: 'NIF-GA-1966-00003',
    name: 'SOBRAGA (Groupe Castel)', legalForm: 'SA',
    sector: { id: 'sec-10', name: 'Commerce & Distribution', slug: 'commerce', icon: '🛒' },
    status: 'ACTIVE',
    address: { street: 'Zone industrielle', city: 'Owendo', province: 'Estuaire', country: 'Gabon' },
    description: "Plus grande brasserie du Gabon, filiale du groupe Castel. Production et distribution de bières (Régab, Castel), sodas et eaux minérales. Fondée en 1966.",
    employeeCount: 800, yearFounded: 1966,
    isDigitalEcosystem: false, tags: ['boissons', 'brasserie', 'Régab', 'Castel', 'industrie'],
    publicStats: { tenderParticipations: 5, tendersWon: 3 },
    createdAt: '1966-01-01', updatedAt: '2026-02-20',
  },
  {
    id: 'gciae', rccm: 'GA-LIB-1985-B-00078', nif: 'NIF-GA-1985-00078',
    name: 'La Gabonaise de Chimie (GCIAE)', legalForm: 'SA',
    sector: { id: 'sec-10', name: 'Commerce & Distribution', slug: 'commerce', icon: '🛒' },
    status: 'ACTIVE',
    address: { street: "Zone industrielle d'Oloumi", city: 'Libreville', province: 'Estuaire', country: 'Gabon' },
    description: "Leader gabonais de la distribution de produits chimiques et industriels. Approvisionnement des secteurs minier, pétrolier et industriel.",
    employeeCount: 120, yearFounded: 1985,
    isDigitalEcosystem: false, tags: ['chimie', 'distribution', 'industrie', 'produits chimiques'],
    publicStats: { tenderParticipations: 10, tendersWon: 4 },
    createdAt: '1985-03-01', updatedAt: '2026-01-15',
  },
  {
    id: 'gsez-arise', rccm: 'GA-LIB-2010-B-00345', nif: 'NIF-GA-2010-00345',
    name: 'GSEZ / ARISE (Zone Économique Spéciale)', legalForm: 'SA',
    sector: { id: 'sec-10', name: 'Commerce & Distribution', slug: 'commerce', icon: '🛒' },
    status: 'ACTIVE',
    address: { street: 'Zone Économique Spéciale', city: 'Nkok', province: 'Estuaire', country: 'Gabon' },
    description: "Gestionnaire de la Zone Économique Spéciale de Nkok. Plateforme logistique et industrielle intégrée. Plus de 150 entreprises installées, transformation du bois, port sec.",
    employeeCount: 350, yearFounded: 2010,
    website: 'https://arise.ga',
    isDigitalEcosystem: false, tags: ['zone franche', 'industrie', 'logistique', 'Nkok', 'transformation'],
    publicStats: { tenderParticipations: 18, tendersWon: 9 },
    createdAt: '2010-06-01', updatedAt: '2026-03-05',
  },
  // ═══ BTP & IMMOBILIER ═══
  {
    id: 'cimaf-gabon', rccm: 'GA-LIB-2015-B-00123', nif: 'NIF-GA-2015-00123',
    name: "Cimaf Gabon (Ciments de l'Afrique)", legalForm: 'SA',
    sector: { id: 'sec-09', name: 'BTP & Immobilier', slug: 'btp', icon: '🏗️' },
    status: 'ACTIVE',
    address: { street: "Zone industrielle d'Owendo", city: 'Owendo', province: 'Estuaire', country: 'Gabon' },
    description: "Cimenterie de broyage d'une capacité de 1,85 million de tonnes/an. Fournit du ciment haute performance pour les projets d'infrastructure majeurs du Gabon.",
    employeeCount: 200, yearFounded: 2015,
    website: 'https://cimentsafrique.com',
    isDigitalEcosystem: false, tags: ['ciment', 'construction', 'infrastructure', 'broyage'],
    publicStats: { tenderParticipations: 22, tendersWon: 12 },
    createdAt: '2015-01-01', updatedAt: '2026-02-10',
  },
  {
    id: 'colas-gabon', rccm: 'GA-LIB-1980-B-00056', nif: 'NIF-GA-1980-00056',
    name: 'Colas Gabon', legalForm: 'SA',
    sector: { id: 'sec-09', name: 'BTP & Immobilier', slug: 'btp', icon: '🏗️' },
    status: 'ACTIVE',
    address: { street: 'PK8, Route nationale 1', city: 'Libreville', province: 'Estuaire', country: 'Gabon' },
    description: "Filiale du groupe Colas (Bouygues). Génie civil, routes et ponts, transport. Réhabilitation de la RN1 (Transgabonaise) avec techniques innovantes de recyclage in-situ.",
    employeeCount: 650, yearFounded: 1980,
    isDigitalEcosystem: false, tags: ['routes', 'génie civil', 'Bouygues', 'Transgabonaise', 'BTP'],
    publicStats: { tenderParticipations: 30, tendersWon: 15 },
    createdAt: '1980-01-01', updatedAt: '2026-03-01',
  },
  {
    id: 'sogea-satom-gabon', rccm: 'GA-LIB-1975-B-00034', nif: 'NIF-GA-1975-00034',
    name: 'Sogea Satom Gabon (VINCI)', legalForm: 'SAS',
    sector: { id: 'sec-09', name: 'BTP & Immobilier', slug: 'btp', icon: '🏗️' },
    status: 'ACTIVE',
    address: { street: 'Boulevard Triomphal', city: 'Libreville', province: 'Estuaire', country: 'Gabon' },
    description: "Filiale de VINCI Construction. Terrassement, voiries, génie civil, hydraulique et bâtiment. Réhabilitation de routes nationales et constructions d'infrastructure publique.",
    employeeCount: 500, yearFounded: 1975,
    website: 'https://sogea-satom.com',
    isDigitalEcosystem: false, tags: ['BTP', 'VINCI', 'routes', 'hydraulique', 'bâtiment'],
    publicStats: { tenderParticipations: 28, tendersWon: 13 },
    createdAt: '1975-06-01', updatedAt: '2026-02-28',
  },
  {
    id: 'razel-bec-gabon', rccm: 'GA-LIB-2005-B-00234', nif: 'NIF-GA-2005-00234',
    name: 'Razel-Bec Gabon (Fayat)', legalForm: 'SAS',
    sector: { id: 'sec-09', name: 'BTP & Immobilier', slug: 'btp', icon: '🏗️' },
    status: 'ACTIVE',
    address: { street: 'Quartier Batterie IV', city: 'Libreville', province: 'Estuaire', country: 'Gabon' },
    description: "Filiale du groupe Fayat. Travaux publics et hydraulique. Projet majeur d'adduction d'eau potable à Libreville (+15% de volume). Spécialisée infrastructures hydrauliques.",
    employeeCount: 300, yearFounded: 2005,
    website: 'https://fayat.com',
    isDigitalEcosystem: false, tags: ['travaux publics', 'eau potable', 'Fayat', 'hydraulique'],
    publicStats: { tenderParticipations: 12, tendersWon: 6 },
    createdAt: '2005-03-01', updatedAt: '2026-01-20',
  },
  // ═══ ÉNERGIE ═══
  {
    id: 'seeg', rccm: 'GA-LIB-1950-B-00002', nif: 'NIF-GA-1950-00002',
    name: "SEEG (Sté d'Énergie et d'Eau)", legalForm: 'SA',
    sector: { id: 'sec-08', name: 'Énergie & Environnement', slug: 'energie', icon: '⚡' },
    status: 'ACTIVE',
    address: { street: 'Boulevard Léon Mba', city: 'Libreville', province: 'Estuaire', country: 'Gabon' },
    description: "Service public de production, transport et distribution d'électricité et d'eau potable sur l'ensemble du territoire. Re-nationalisée en 2019 (ex-concession Veolia).",
    employeeCount: 2500, yearFounded: 1950,
    phone: '+241 011 76 31 35', website: 'https://seeg-gabon.com',
    isDigitalEcosystem: false, tags: ['électricité', 'eau', 'service public', 'énergie'],
    publicStats: { tenderParticipations: 45, tendersWon: 22 },
    createdAt: '1950-01-01', updatedAt: '2026-03-01',
  },
  // ═══ AGRICULTURE ═══
  {
    id: 'olam-palm', rccm: 'GA-LIB-1999-B-00189', nif: 'NIF-GA-1999-00189',
    name: 'Olam Palm Gabon', legalForm: 'SA',
    sector: { id: 'sec-02', name: 'Agriculture & Agroalimentaire', slug: 'agriculture', icon: '🌾' },
    status: 'ACTIVE',
    address: { street: 'Immeuble Arambo, bord de mer', city: 'Libreville', province: 'Estuaire', country: 'Gabon' },
    description: "JV 60/40 avec l'État gabonais. Plus grand producteur d'huile de palme certifiée RSPO en Afrique. 4 plantations de palmiers à huile, premier employeur privé du Gabon.",
    employeeCount: 8000, yearFounded: 1999,
    website: 'https://olamgroup.com',
    isDigitalEcosystem: false, tags: ['huile de palme', 'RSPO', 'plantation', 'agro-industrie', 'Olam'],
    publicStats: { tenderParticipations: 10, tendersWon: 5 },
    createdAt: '1999-01-01', updatedAt: '2026-03-01',
  },
  {
    id: 'siat-gabon', rccm: 'GA-LIB-2004-B-00167', nif: 'NIF-GA-2004-00167',
    name: 'SIAT Gabon', legalForm: 'SA',
    sector: { id: 'sec-02', name: 'Agriculture & Agroalimentaire', slug: 'agriculture', icon: '🌾' },
    status: 'ACTIVE',
    address: { street: 'Zone industrielle de Lambaréné', city: 'Lambaréné', province: 'Moyen-Ogooué', country: 'Gabon' },
    description: "Filiale du groupe belge SIAT. Production de caoutchouc naturel et huile de palme. Plantations dans le Moyen-Ogooué et le Woleu-Ntem.",
    employeeCount: 4500, yearFounded: 2004,
    isDigitalEcosystem: false, tags: ['caoutchouc', 'huile de palme', 'plantation', 'SIAT', 'agro-industrie'],
    publicStats: {},
    createdAt: '2004-01-01', updatedAt: '2025-12-15',
  },
  // ═══ TRANSPORT & LOGISTIQUE ═══
  {
    id: 'setrag', rccm: 'GA-LIB-2005-B-00089', nif: 'NIF-GA-2005-00089',
    name: 'SETRAG (Transgabonais)', legalForm: 'SA',
    sector: { id: 'sec-04', name: 'Transport & Logistique', slug: 'transport', icon: '🚛' },
    status: 'ACTIVE',
    address: { street: "Gare d'Owendo", city: 'Libreville', province: 'Estuaire', country: 'Gabon' },
    description: "Exploitant du chemin de fer Transgabonais (669 km Libreville–Franceville). Transport de manganèse, bois et voyageurs. Lien vital entre la côte et l'intérieur du pays.",
    employeeCount: 1200, yearFounded: 2005,
    website: 'https://setrag.ga',
    isDigitalEcosystem: false, tags: ['chemin de fer', 'Transgabonais', 'fret', 'manganèse', 'transport'],
    publicStats: { tenderParticipations: 15, tendersWon: 8 },
    createdAt: '2005-01-01', updatedAt: '2026-03-01',
  },
  {
    id: 'afrijet', rccm: 'GA-LIB-2005-B-00112', nif: 'NIF-GA-2005-00112',
    name: 'Afrijet Business Service', legalForm: 'SA',
    sector: { id: 'sec-04', name: 'Transport & Logistique', slug: 'transport', icon: '🚛' },
    status: 'ACTIVE',
    address: { street: 'Aéroport International Léon Mba', city: 'Libreville', province: 'Estuaire', country: 'Gabon' },
    description: "Compagnie aérienne gabonaise. Vols régionaux vers Port-Gentil, Franceville, São Tomé, Douala. Transport VIP et charter pour le secteur pétrolier.",
    employeeCount: 250, yearFounded: 2005,
    website: 'https://afrijet.com',
    isDigitalEcosystem: false, tags: ['aviation', 'transport aérien', 'charter', 'régional'],
    publicStats: {},
    createdAt: '2005-07-01', updatedAt: '2026-02-15',
  },
  {
    id: 'agl-gabon', rccm: 'GA-LIB-2008-B-00234', nif: 'NIF-GA-2008-00234',
    name: 'AGL Gabon (Africa Global Logistics)', legalForm: 'SA',
    sector: { id: 'sec-04', name: 'Transport & Logistique', slug: 'transport', icon: '🚛' },
    status: 'ACTIVE',
    address: { street: "Port d'Owendo", city: 'Owendo', province: 'Estuaire', country: 'Gabon' },
    description: "Leader du transport et de la logistique portuaire en Afrique (ex-Bolloré Transport & Logistics). Gestion du port d'Owendo, manutention, transit et logistique intégrée.",
    employeeCount: 700, yearFounded: 2008,
    isDigitalEcosystem: false, tags: ['port', 'logistique', 'manutention', 'transit', 'Owendo'],
    publicStats: { tenderParticipations: 20, tendersWon: 10 },
    createdAt: '2008-01-01', updatedAt: '2026-03-01',
  },
  // ═══ BOIS & FORÊT ═══
  {
    id: 'rougier-gabon', rccm: 'GA-LIB-1955-B-00008', nif: 'NIF-GA-1955-00008',
    name: 'Rougier Gabon', legalForm: 'SA',
    sector: { id: 'sec-05', name: 'Bois & Forêt', slug: 'bois', icon: '🌳' },
    status: 'ACTIVE',
    address: { street: "Zone industrielle d'Owendo", city: 'Libreville', province: 'Estuaire', country: 'Gabon' },
    description: "Exploitation forestière certifiée et transformation du bois. Sciage, déroulage d'okoumé, export de bois transformé vers l'Europe et l'Asie.",
    employeeCount: 400, yearFounded: 1955,
    isDigitalEcosystem: false, tags: ['bois', 'okoumé', 'forestier', 'sciage', 'export'],
    publicStats: { tenderParticipations: 8, tendersWon: 3 },
    createdAt: '1955-01-01', updatedAt: '2025-12-01',
  },
  {
    id: 'precious-woods', rccm: 'GA-LIB-2001-B-00156', nif: 'NIF-GA-2001-00156',
    name: 'Precious Woods Gabon (CEB)', legalForm: 'SA',
    sector: { id: 'sec-05', name: 'Bois & Forêt', slug: 'bois', icon: '🌳' },
    status: 'ACTIVE',
    address: { street: 'Concession de Lastoursville', city: 'Lastoursville', province: 'Ogooué-Lolo', country: 'Gabon' },
    description: "Exploitation forestière durable certifiée FSC. 600 000 hectares de concessions. Transformation locale du bois (sciage, séchage). Engagé dans la certification environnementale.",
    employeeCount: 550, yearFounded: 2001,
    isDigitalEcosystem: false, tags: ['bois', 'FSC', 'durable', 'Lastoursville', 'certification'],
    publicStats: {},
    createdAt: '2001-04-01', updatedAt: '2026-01-10',
  },
  // ═══ TOURISME & HÔTELLERIE ═══
  {
    id: 'radisson-okoume', rccm: 'GA-LIB-1998-B-00078', nif: 'NIF-GA-1998-00078',
    name: 'Radisson Blu Okoumé Palace', legalForm: 'SA',
    sector: { id: 'sec-11', name: 'Tourisme & Hôtellerie', slug: 'tourisme', icon: '🏨' },
    status: 'ACTIVE',
    address: { street: 'Boulevard de la Mer', city: 'Libreville', province: 'Estuaire', country: 'Gabon' },
    description: "Hôtel 5 étoiles de référence à Libreville. 268 chambres, centre de conférence, restaurants, piscine. Accueil des sommets internationaux et événements d'affaires.",
    employeeCount: 220, yearFounded: 1998,
    website: 'https://radissonhotels.com',
    isDigitalEcosystem: false, tags: ['hôtel', '5 étoiles', 'conférence', 'luxe', 'Radisson'],
    publicStats: {},
    createdAt: '1998-01-01', updatedAt: '2026-02-01',
  },
  // ═══ SANTÉ ═══
  {
    id: 'pharmacie-conseil', rccm: 'GA-LIB-2010-B-00234', nif: 'NIF-GA-2010-00234',
    name: 'Pharmacie Conseil du Gabon', legalForm: 'SARL',
    sector: { id: 'sec-06', name: 'Santé & Pharmacie', slug: 'sante', icon: '🏥' },
    status: 'ACTIVE',
    address: { street: 'Avenue Bouët, Centre-ville', city: 'Libreville', province: 'Estuaire', country: 'Gabon' },
    description: "Réseau de pharmacies leaders au Gabon. Distribution de médicaments, parapharmacie, matériel médical. Conseil pharmaceutique et partenariats avec les cliniques locales.",
    employeeCount: 65, yearFounded: 2010,
    isDigitalEcosystem: false, tags: ['pharmacie', 'santé', 'médicaments', 'distribution'],
    publicStats: {},
    createdAt: '2010-09-01', updatedAt: '2026-01-15',
  },
  // ═══ ÉDUCATION ═══
  {
    id: 'igad', rccm: 'GA-LIB-1972-B-00015', nif: 'NIF-GA-1972-00015',
    name: "IGAD (Institut Gabonais d'Appui au Développement)", legalForm: 'SA',
    sector: { id: 'sec-07', name: 'Éducation & Formation', slug: 'education', icon: '🎓' },
    status: 'ACTIVE',
    address: { street: 'Boulevard Triomphal Omar Bongo', city: 'Libreville', province: 'Estuaire', country: 'Gabon' },
    description: "Institution de formation professionnelle et d'appui aux entreprises gabonaises. Programmes de certification, conseil en management, développement des compétences.",
    employeeCount: 80, yearFounded: 1972,
    isDigitalEcosystem: false, tags: ['formation', 'développement', 'conseil', 'certification', 'RH'],
    publicStats: {},
    createdAt: '1972-01-01', updatedAt: '2026-02-01',
  },
];

// ══════════════════════════════════════════════════════════════════════════
// BRIDGE SING → ANNUAIRE : Conversion des 218 startups SING
// ══════════════════════════════════════════════════════════════════════════

const SECTEUR_TO_ANNUAIRE_SECTOR: Record<string, { id: string; name: string; slug: string; icon: string }> = {
  SANTE:         { id: 'sec-06', name: 'Santé & Pharmacie', slug: 'sante', icon: '🏥' },
  RESTAURATION:  { id: 'sec-11', name: 'Tourisme & Hôtellerie', slug: 'tourisme', icon: '🏨' },
  AGRICULTURE:   { id: 'sec-02', name: 'Agriculture & Agroalimentaire', slug: 'agriculture', icon: '🌾' },
  SECURITE:      { id: 'sec-01', name: "Technologies de l'Information", slug: 'technologies', icon: '💻' },
  COMMUNICATION: { id: 'sec-01', name: "Technologies de l'Information", slug: 'technologies', icon: '💻' },
  TRANSPORT:     { id: 'sec-04', name: 'Transport & Logistique', slug: 'transport', icon: '🚛' },
  EVENEMENTIEL:  { id: 'sec-11', name: 'Tourisme & Hôtellerie', slug: 'tourisme', icon: '🏨' },
  FINTECH:       { id: 'sec-12', name: 'Services Financiers', slug: 'finance', icon: '🏦' },
  INDUSTRIE:     { id: 'sec-09', name: 'BTP & Immobilier', slug: 'btp', icon: '🏗️' },
  ART_CULTURE:   { id: 'sec-11', name: 'Tourisme & Hôtellerie', slug: 'tourisme', icon: '🏨' },
  ENVIRONNEMENT: { id: 'sec-08', name: 'Énergie & Environnement', slug: 'energie', icon: '⚡' },
  CONSEIL:       { id: 'sec-01', name: "Technologies de l'Information", slug: 'technologies', icon: '💻' },
  IMMOBILIER:    { id: 'sec-09', name: 'BTP & Immobilier', slug: 'btp', icon: '🏗️' },
  ECOMMERCE:     { id: 'sec-10', name: 'Commerce & Distribution', slug: 'commerce', icon: '🛒' },
  EDTECH:        { id: 'sec-07', name: 'Éducation & Formation', slug: 'education', icon: '🎓' },
  TECH:          { id: 'sec-01', name: "Technologies de l'Information", slug: 'technologies', icon: '💻' },
  TOURISME:      { id: 'sec-11', name: 'Tourisme & Hôtellerie', slug: 'tourisme', icon: '🏨' },
  MODE:          { id: 'sec-10', name: 'Commerce & Distribution', slug: 'commerce', icon: '🛒' },
  ENERGIE:       { id: 'sec-08', name: 'Énergie & Environnement', slug: 'energie', icon: '⚡' },
};

const DEFAULT_SECTOR = { id: 'sec-01', name: "Technologies de l'Information", slug: 'technologies', icon: '💻' };

function singToAnnuaire(s: StartupSING): AnnuaireEnterprise {
  const sectorMap = SECTEUR_TO_ANNUAIRE_SECTOR[s.secteur] || DEFAULT_SECTOR;
  const year = s.dateDemarrage ? parseInt(s.dateDemarrage, 10) : 2022;
  const numStr = String(s.num).padStart(3, '0');
  const progName = PROGRAMMES_REELS.find(p => p.id === s.programmeId)?.name || s.programmeRaw;
  const sectLabel = SECTEUR_CONFIG[s.secteur]?.label || s.secteurRaw;

  return {
    id: `sing-${s.id}`,
    rccm: `GA-LIB-${year || 2022}-B-S${numStr}`,
    nif: `NIF-GA-${year || 2022}-S${numStr}`,
    name: s.nom,
    legalForm: s.formalisation ? 'SARL' : 'EI',
    sector: sectorMap,
    status: s.actif ? 'ACTIVE' : 'INACTIVE',
    address: { street: 'Incubateur SING, Quartier Glass', city: 'Libreville', province: 'Estuaire', country: 'Gabon' },
    description: `Startup incubée par la SING (${progName}). Secteur : ${sectLabel}. ${s.emplois} emplois créés.${s.maturite === 'M' ? ' Startup mature.' : ''}${s.formalisation ? ' Entreprise formalisée.' : ''}`,
    employeeCount: s.emplois,
    yearFounded: year || 2022,
    website: s.siteWeb || undefined,
    isDigitalEcosystem: true,
    isSingStartup: true,
    tags: [
      sectLabel,
      'SING',
      'startup',
      s.tier === 'TOP' ? 'top performer' : s.actif ? 'actif' : 'inactif',
      ...(s.maturite === 'M' ? ['mature'] : []),
    ],
    publicStats: {
      ...(s.maturite === 'M' ? { averageRating: Math.min(5, 4.0 + (s.score || 0) / 100) } : {}),
    },
    createdAt: `${year || 2022}-01-01`,
    updatedAt: '2026-03-10',
  };
}

/** All 218 SING startups converted to annuaire format */
export const SING_ENTERPRISES: AnnuaireEnterprise[] = ALL_STARTUPS_SING.map((s) => singToAnnuaire(s));

// ══════════════════════════════════════════════════════════════════════════
// COMBINED ENTERPRISES — Real + SING bridge
// ══════════════════════════════════════════════════════════════════════════

export const ENTERPRISES: AnnuaireEnterprise[] = [
  ...REAL_ENTERPRISES,
  ...GENERATED_ENTERPRISES,
  ...BATCH2_ENTERPRISES,
  ...BATCH3_ENTERPRISES,
  ...BATCH4_ENTERPRISES,
  ...BATCH5_ENTERPRISES,
  ...SING_ENTERPRISES,
];

// ── ECOSYSTEM STATS ────────────────────────────────────────────────

export const DIGITAL_ECOSYSTEM_STATS = {
  totalStartups: SING_ENTERPRISES.length,
  totalEmployees: SING_ENTERPRISES.reduce((sum, e) => sum + e.employeeCount, 0),
  totalSolutions: 17,
  averageRating: 4.2,
  totalFundingTarget: 520_000_000,
  seekingFunding: 0,
  incubated: SING_ENTERPRISES.length,
  categories: [
    { name: 'Santé & E-Santé', count: 19, color: '#ef4444' },
    { name: 'Agriculture & Agro', count: 31, color: '#22c55e' },
    { name: 'FinTech & Finance', count: 14, color: '#0d9488' },
    { name: 'Transport & Logistique', count: 27, color: '#3b82f6' },
    { name: 'E-Commerce', count: 13, color: '#a855f7' },
    { name: 'Événementiel', count: 12, color: '#ec4899' },
    { name: 'Communication & Média', count: 12, color: '#f59e0b' },
    { name: 'Tech & Cybersécurité', count: 12, color: '#8b5cf6' },
    { name: 'EdTech & Formation', count: 11, color: '#ec4899' },
    { name: 'Environnement & Énergie', count: 10, color: '#14b8a6' },
    { name: 'Industrie & BTP', count: 10, color: '#78716c' },
  ],
  provinces: [
    { name: 'Estuaire', count: ENTERPRISES.length },
  ],
};

// ── HELPER FUNCTIONS ───────────────────────────────────────────────

export function getEnterpriseByRccm(rccm: string): AnnuaireEnterprise | undefined {
  return ENTERPRISES.find((e) => e.rccm === rccm);
}

export function getEnterpriseById(id: string): AnnuaireEnterprise | undefined {
  return ENTERPRISES.find((e) => e.id === id);
}

export function getEnterpriseByNif(nif: string): AnnuaireEnterprise | undefined {
  return ENTERPRISES.find((e) => e.nif === nif);
}

export function getDigitalEcosystemEnterprises(): AnnuaireEnterprise[] {
  return ENTERPRISES.filter((e) => e.isDigitalEcosystem && e.status !== 'CLOSED');
}

export function getEnterprisesBySector(sectorSlug: string): AnnuaireEnterprise[] {
  return ENTERPRISES.filter((e) => e.sector.slug === sectorSlug);
}

export function getEnterprisesByProvince(province: string): AnnuaireEnterprise[] {
  return ENTERPRISES.filter((e) => e.address.province === province);
}

export interface SearchFilters {
  query?: string;
  sector?: string;
  province?: string;
  legalForm?: string;
  status?: string;
  digitalOnly?: boolean;
  singOnly?: boolean;
  sortBy?: 'name' | 'date' | 'employees' | 'relevance';
}

export function searchEnterprises(filters: SearchFilters): AnnuaireEnterprise[] {
  let results = [...ENTERPRISES];

  if (filters.query) {
    const q = filters.query.toLowerCase();
    results = results.filter((e) =>
      e.name.toLowerCase().includes(q) ||
      e.rccm.toLowerCase().includes(q) ||
      e.nif.toLowerCase().includes(q) ||
      e.address.city.toLowerCase().includes(q) ||
      e.description.toLowerCase().includes(q) ||
      e.tags.some((t) => t.toLowerCase().includes(q))
    );
  }

  if (filters.sector) {
    results = results.filter((e) => e.sector.slug === filters.sector);
  }

  if (filters.province) {
    results = results.filter((e) => e.address.province === filters.province);
  }

  if (filters.legalForm) {
    results = results.filter((e) => e.legalForm === filters.legalForm);
  }

  if (filters.status) {
    results = results.filter((e) => e.status === filters.status);
  }

  if (filters.digitalOnly) {
    results = results.filter((e) => e.isDigitalEcosystem);
  }

  if (filters.singOnly) {
    results = results.filter((e) => e.isSingStartup);
  }

  switch (filters.sortBy) {
    case 'name':
      results.sort((a, b) => a.name.localeCompare(b.name));
      break;
    case 'date':
      results.sort((a, b) => b.updatedAt.localeCompare(a.updatedAt));
      break;
    case 'employees':
      results.sort((a, b) => b.employeeCount - a.employeeCount);
      break;
    default:
      results.sort((a, b) => b.updatedAt.localeCompare(a.updatedAt));
  }

  return results;
}

/** Verify RCCM or NIF — returns match or null */
export function verifyEnterprise(input: string): AnnuaireEnterprise | null {
  const trimmed = input.trim();
  return getEnterpriseByRccm(trimmed) || getEnterpriseByNif(trimmed) || null;
}

/** Format monetary amounts in XAF */
export function formatXAF(amount: number): string {
  if (amount >= 1_000_000_000) return `${(amount / 1_000_000_000).toFixed(1)} Mds XAF`;
  if (amount >= 1_000_000) return `${(amount / 1_000_000).toFixed(0)} M XAF`;
  return `${amount.toLocaleString('fr-FR')} XAF`;
}

/** Get unique provinces from enterprises */
export function getActiveProvinces(): string[] {
  return [...new Set(ENTERPRISES.map((e) => e.address.province))].sort();
}
