// ====================================================================
// GABON BIZ — Annuaire des Entreprises — Data Layer
// Types, sectors, 30 mock enterprises, ecosystem stats, helpers
// ====================================================================

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

// ── ENTERPRISES (30) ───────────────────────────────────────────────

export const ENTERPRISES: AnnuaireEnterprise[] = [
  // ═══ ÉCOSYSTÈME NUMÉRIQUE (12) ═══
  {
    id: 'ent-001', rccm: 'GA-LIB-2024-B-00142', nif: 'NIF-GA-2024-00142',
    name: 'Mbadinga Technologies SARL', legalForm: 'SARL',
    sector: { id: 'sec-01', name: "Technologies de l'Information", slug: 'technologies', icon: '💻' },
    status: 'ACTIVE',
    address: { street: 'Boulevard Triomphal Omar Bongo, Immeuble Rénovation', city: 'Libreville', province: 'Estuaire', country: 'Gabon' },
    description: 'Société de développement logiciel spécialisée dans les solutions de paiement mobile et les applications gouvernementales. Partenaire technique du MENUDI pour la dématérialisation des services publics.',
    employeeCount: 15, yearFounded: 2024,
    phone: '+241 077 12 34 56', email: 'contact@mbadinga-tech.ga', website: 'https://mbadinga-tech.ga',
    isDigitalEcosystem: true, digitalCategory: 'FinTech',
    startupProfile: {
      pitch: 'Nous digitalisons les paiements au Gabon avec GabonPay, la première solution de paiement mobile interopérable.',
      teamSize: 15, fundingStage: 'SEED', isIncubated: true, cohortName: 'Cohorte Accélération 2026',
      solutions: [{ name: 'GabonPay', category: 'FinTech', rating: 4.5 }, { name: 'GovConnect API', category: 'GovTech', rating: 4.2 }],
      seekingFunding: true, fundingTarget: 500000000,
    },
    tags: ['paiement mobile', 'API', 'e-gouvernement', 'mobile money', 'FinTech'],
    publicStats: { tenderParticipations: 5, tendersWon: 2, innovationHubSolutions: 2, averageRating: 4.5 },
    createdAt: '2024-03-15', updatedAt: '2026-03-01',
  },
  {
    id: 'ent-002', rccm: 'GA-LIB-2025-B-00087', nif: 'NIF-GA-2025-00087',
    name: 'TechPay Solutions SAS', legalForm: 'SAS',
    sector: { id: 'sec-01', name: "Technologies de l'Information", slug: 'technologies', icon: '💻' },
    status: 'ACTIVE',
    address: { street: 'Quartier Glass, Rue des Innovateurs', city: 'Libreville', province: 'Estuaire', country: 'Gabon' },
    description: "Startup FinTech fondée par Sara Mboumba. Plateforme de prêts entre particuliers et solution de scoring crédit basée sur l'IA pour les populations non bancarisées.",
    employeeCount: 8, yearFounded: 2025,
    phone: '+241 066 98 76 54', email: 'hello@techpay.ga', website: 'https://techpay.ga',
    isDigitalEcosystem: true, digitalCategory: 'FinTech',
    startupProfile: {
      pitch: "Nous démocratisons l'accès au crédit au Gabon grâce à un scoring IA basé sur les données mobiles.",
      teamSize: 8, fundingStage: 'SEED', isIncubated: true, cohortName: 'Cohorte Accélération 2026',
      solutions: [{ name: 'GabonLend', category: 'FinTech', rating: 4.3 }, { name: 'CreditScore AI', category: 'IA & Data', rating: 4.0 }],
      seekingFunding: true, fundingTarget: 150000000,
    },
    tags: ['crédit', 'scoring IA', 'inclusion financière', 'prêt P2P', 'FinTech'],
    publicStats: { tenderParticipations: 0, tendersWon: 0, innovationHubSolutions: 2, averageRating: 4.3 },
    createdAt: '2025-01-20', updatedAt: '2026-02-15',
  },
  {
    id: 'ent-003', rccm: 'GA-LIB-2023-B-00315', nif: 'NIF-GA-2023-00315',
    name: 'Ogooué AgriTech SA', legalForm: 'SA',
    sector: { id: 'sec-02', name: 'Agriculture & Agroalimentaire', slug: 'agriculture', icon: '🌾' },
    status: 'ACTIVE',
    address: { street: 'Zone Industrielle OPRAG', city: 'Port-Gentil', province: 'Ogooué-Maritime', country: 'Gabon' },
    description: "Plateforme de traçabilité agricole utilisant la blockchain pour certifier l'origine et la qualité des produits gabonais (cacao, café, palmier à huile). Connecte les producteurs ruraux aux marchés internationaux.",
    employeeCount: 22, yearFounded: 2023,
    phone: '+241 074 55 66 77', email: 'info@ogooue-agritech.ga', website: 'https://ogooue-agritech.ga',
    isDigitalEcosystem: true, digitalCategory: 'AgriTech',
    startupProfile: {
      pitch: "La blockchain au service de l'agriculture gabonaise. Traçabilité, certification, accès aux marchés internationaux.",
      teamSize: 22, fundingStage: 'SERIES_A', isIncubated: false,
      solutions: [{ name: 'AgroTrack', category: 'AgriTech', rating: 4.2 }, { name: 'FarmConnect', category: 'AgriTech', rating: 3.8 }],
      seekingFunding: false,
    },
    tags: ['blockchain', 'traçabilité', 'agriculture', 'certification', 'AgriTech'],
    publicStats: { tenderParticipations: 3, tendersWon: 1, innovationHubSolutions: 2, averageRating: 4.2 },
    createdAt: '2023-06-10', updatedAt: '2026-01-20',
  },
  {
    id: 'ent-004', rccm: 'GA-LIB-2024-B-00201', nif: 'NIF-GA-2024-00201',
    name: 'Digital School GA EI', legalForm: 'EI',
    sector: { id: 'sec-07', name: 'Éducation & Formation', slug: 'education', icon: '🎓' },
    status: 'ACTIVE',
    address: { street: 'Avenue Léon Mba, face lycée national', city: 'Libreville', province: 'Estuaire', country: 'Gabon' },
    description: "Plateforme e-learning interactive offrant des cours adaptés au programme scolaire gabonais, du primaire au baccalauréat. Contenus en français avec support audio pour les zones à faible connectivité.",
    employeeCount: 6, yearFounded: 2024,
    email: 'learn@digitalschool.ga', website: 'https://digitalschool.ga',
    isDigitalEcosystem: true, digitalCategory: 'EdTech',
    startupProfile: {
      pitch: "L'école gabonaise dans la poche. Cours interactifs, quiz, suivi de progression — même hors connexion.",
      teamSize: 6, fundingStage: 'PRE_SEED', isIncubated: true, cohortName: 'GabonTech Bootcamp',
      solutions: [{ name: 'EduConnect GA', category: 'EdTech', rating: 4.8 }],
      seekingFunding: true, fundingTarget: 75000000,
    },
    tags: ['e-learning', 'éducation', 'mobile-first', 'offline', 'EdTech'],
    publicStats: { innovationHubSolutions: 1, averageRating: 4.8 },
    createdAt: '2024-09-01', updatedAt: '2026-02-28',
  },
  {
    id: 'ent-005', rccm: 'GA-LIB-2025-B-00044', nif: 'NIF-GA-2025-00044',
    name: 'MedGabon AI SARL', legalForm: 'SARL',
    sector: { id: 'sec-06', name: 'Santé & Pharmacie', slug: 'sante', icon: '🏥' },
    status: 'ACTIVE',
    address: { street: "Boulevard de l'Indépendance", city: 'Libreville', province: 'Estuaire', country: 'Gabon' },
    description: "Chatbot médical intelligent en langues locales (fang, punu, nzébi) et français. Aide au pré-diagnostic, orientation vers les structures de santé, rappels de vaccination.",
    employeeCount: 5, yearFounded: 2025,
    email: 'contact@medgabon.ai',
    isDigitalEcosystem: true, digitalCategory: 'HealthTech',
    startupProfile: {
      pitch: 'Un médecin dans votre téléphone. HealthBot parle votre langue et vous oriente vers le bon soin.',
      teamSize: 5, fundingStage: 'PRE_SEED', isIncubated: true, cohortName: 'GabonTech Bootcamp',
      solutions: [{ name: 'HealthBot GA', category: 'HealthTech', rating: 3.9 }],
      seekingFunding: true, fundingTarget: 100000000,
    },
    tags: ['IA', 'santé', 'chatbot', 'langues locales', 'HealthTech'],
    publicStats: { innovationHubSolutions: 1, averageRating: 3.9 },
    createdAt: '2025-02-14', updatedAt: '2026-03-05',
  },
  {
    id: 'ent-006', rccm: 'GA-FCV-2024-B-00028', nif: 'NIF-GA-2024-00028',
    name: 'CarbonGabon SAS', legalForm: 'SAS',
    sector: { id: 'sec-08', name: 'Énergie & Environnement', slug: 'energie', icon: '⚡' },
    status: 'ACTIVE',
    address: { street: 'Campus Université Masuku', city: 'Franceville', province: 'Haut-Ogooué', country: 'Gabon' },
    description: "Plateforme de certification et commerce de crédits carbone issus des forêts gabonaises (85% de couverture forestière). Utilise l'imagerie satellite et l'IA pour le monitoring.",
    employeeCount: 12, yearFounded: 2024,
    email: 'info@carbongabon.ga', website: 'https://carbongabon.ga',
    isDigitalEcosystem: true, digitalCategory: 'GreenTech',
    startupProfile: {
      pitch: 'Monétiser la forêt gabonaise sans couper un seul arbre. Crédits carbone certifiés par satellite.',
      teamSize: 12, fundingStage: 'SEED', isIncubated: false,
      solutions: [{ name: 'ForestWatch', category: 'GreenTech', rating: 4.6 }, { name: 'CarbonMarket GA', category: 'GreenTech', rating: 4.1 }],
      seekingFunding: true, fundingTarget: 300000000,
    },
    tags: ['crédits carbone', 'satellite', 'forêt', 'IA', 'GreenTech'],
    publicStats: { tenderParticipations: 2, tendersWon: 1, innovationHubSolutions: 2, averageRating: 4.6 },
    createdAt: '2024-05-22', updatedAt: '2026-02-10',
  },
  {
    id: 'ent-007', rccm: 'GA-LIB-2022-B-00489', nif: 'NIF-GA-2022-00489',
    name: 'CybaGabon SA', legalForm: 'SA',
    sector: { id: 'sec-01', name: "Technologies de l'Information", slug: 'technologies', icon: '💻' },
    status: 'ACTIVE',
    address: { street: 'Zone Spéciale Économique de Nkok', city: 'Nkok', province: 'Estuaire', country: 'Gabon' },
    description: "Leader gabonais de la cybersécurité. Audit, SOC managé, formation et consulting en sécurité informatique pour les administrations et entreprises. Partenaire ANINF.",
    employeeCount: 35, yearFounded: 2022,
    phone: '+241 011 98 76 54', email: 'security@cybagabon.ga', website: 'https://cybagabon.ga',
    isDigitalEcosystem: true, digitalCategory: 'Cybersécurité',
    startupProfile: {
      pitch: 'Protéger le Gabon numérique. SOC national, audit de sécurité, formation aux bonnes pratiques.',
      teamSize: 35, fundingStage: 'SERIES_A', isIncubated: false,
      solutions: [{ name: 'SOC-as-a-Service', category: 'Cybersécurité', rating: 4.7 }],
      seekingFunding: false,
    },
    tags: ['cybersécurité', 'SOC', 'audit', 'ANINF', 'pentest'],
    publicStats: { tenderParticipations: 8, tendersWon: 4, innovationHubSolutions: 1, averageRating: 4.7 },
    createdAt: '2022-11-08', updatedAt: '2026-03-08',
  },
  {
    id: 'ent-008', rccm: 'GA-LIB-2025-B-00112', nif: 'NIF-GA-2025-00112',
    name: 'LogiTrack Gabon SARL', legalForm: 'SARL',
    sector: { id: 'sec-04', name: 'Transport & Logistique', slug: 'transport', icon: '🚛' },
    status: 'ACTIVE',
    address: { street: 'Port Môle, Zone portuaire', city: 'Libreville', province: 'Estuaire', country: 'Gabon' },
    description: "Plateforme digitale de gestion logistique : suivi GPS des livraisons, optimisation d'itinéraires, marketplace de transport de marchandises entre Libreville, Port-Gentil et Franceville.",
    employeeCount: 10, yearFounded: 2025,
    email: 'ops@logitrack.ga',
    isDigitalEcosystem: true, digitalCategory: 'LogisTech',
    startupProfile: {
      pitch: 'Le Uber du fret gabonais. Connectez expéditeurs et transporteurs en 3 clics.',
      teamSize: 10, fundingStage: 'PRE_SEED', isIncubated: true, cohortName: 'Cohorte Accélération 2026',
      solutions: [{ name: 'LogiTrack', category: 'LogisTech', rating: 4.0 }],
      seekingFunding: true, fundingTarget: 200000000,
    },
    tags: ['logistique', 'GPS', 'transport', 'marketplace', 'LogisTech'],
    publicStats: { innovationHubSolutions: 1, averageRating: 4.0 },
    createdAt: '2025-04-01', updatedAt: '2026-03-01',
  },
  {
    id: 'ent-009', rccm: 'GA-LIB-2023-B-00267', nif: 'NIF-GA-2023-00267',
    name: 'GabonCloud SA', legalForm: 'SA',
    sector: { id: 'sec-01', name: "Technologies de l'Information", slug: 'technologies', icon: '💻' },
    status: 'ACTIVE',
    address: { street: 'Data Center de Nkok', city: 'Nkok', province: 'Estuaire', country: 'Gabon' },
    description: "Hébergement cloud souverain gabonais. Conformité Ordonnance 0006/PR/2025. Services IaaS, PaaS et SaaS pour les administrations et entreprises locales.",
    employeeCount: 28, yearFounded: 2023,
    phone: '+241 011 44 55 66', email: 'sales@gaboncloud.ga', website: 'https://gaboncloud.ga',
    isDigitalEcosystem: true, digitalCategory: 'Cloud & Infra',
    startupProfile: {
      pitch: 'Le cloud souverain du Gabon. Vos données restent au Gabon, conformes à la réglementation.',
      teamSize: 28, fundingStage: 'SERIES_A', isIncubated: false,
      solutions: [{ name: 'GabonCloud IaaS', category: 'Cloud & Infra', rating: 4.4 }, { name: 'GabonCloud SaaS', category: 'Cloud & Infra', rating: 4.1 }],
      seekingFunding: false,
    },
    tags: ['cloud', 'souveraineté', 'hébergement', 'data center', 'IaaS'],
    publicStats: { tenderParticipations: 6, tendersWon: 3, innovationHubSolutions: 2, averageRating: 4.4 },
    createdAt: '2023-08-15', updatedAt: '2026-02-20',
  },
  {
    id: 'ent-010', rccm: 'GA-LIB-2024-B-00333', nif: 'NIF-GA-2024-00333',
    name: 'AssurDigital GA SARL', legalForm: 'SARL',
    sector: { id: 'sec-12', name: 'Services Financiers', slug: 'finance', icon: '🏦' },
    status: 'ACTIVE',
    address: { street: 'Centre-ville, Avenue du Colonel Parant', city: 'Libreville', province: 'Estuaire', country: 'Gabon' },
    description: "Première assurance 100% digitale du Gabon. Souscription en ligne, gestion des sinistres par chatbot, micro-assurance pour les travailleurs informels.",
    employeeCount: 11, yearFounded: 2024,
    email: 'souscrire@assurdigital.ga',
    isDigitalEcosystem: true, digitalCategory: 'InsurTech',
    startupProfile: {
      pitch: "L'assurance accessible à tous les Gabonais. Souscrivez depuis votre téléphone en 2 minutes.",
      teamSize: 11, fundingStage: 'SEED', isIncubated: false,
      solutions: [{ name: 'AssurExpress', category: 'InsurTech', rating: 4.1 }],
      seekingFunding: true, fundingTarget: 250000000,
    },
    tags: ['assurance', 'digital', 'micro-assurance', 'chatbot', 'InsurTech'],
    publicStats: { innovationHubSolutions: 1, averageRating: 4.1 },
    createdAt: '2024-07-01', updatedAt: '2026-01-15',
  },
  {
    id: 'ent-011', rccm: 'GA-OYE-2025-B-00015', nif: 'NIF-GA-2025-00015',
    name: 'DataGabon Analytics EI', legalForm: 'EI',
    sector: { id: 'sec-01', name: "Technologies de l'Information", slug: 'technologies', icon: '💻' },
    status: 'ACTIVE',
    address: { street: 'Quartier administratif', city: 'Oyem', province: 'Woleu-Ntem', country: 'Gabon' },
    description: "Cabinet de conseil en data science et intelligence artificielle. Analyse prédictive, tableaux de bord, formation aux outils data pour les entreprises et administrations.",
    employeeCount: 4, yearFounded: 2025,
    email: 'data@datagabon.ga',
    isDigitalEcosystem: true, digitalCategory: 'IA & Data',
    startupProfile: {
      pitch: 'Transformer les données gabonaises en décisions éclairées. IA accessible, locale, pertinente.',
      teamSize: 4, fundingStage: 'PRE_SEED', isIncubated: true, cohortName: 'Cohorte Accélération 2026',
      solutions: [{ name: 'DataDash', category: 'IA & Data', rating: 4.3 }],
      seekingFunding: true, fundingTarget: 50000000,
    },
    tags: ['data science', 'IA', 'analytics', 'dashboards', 'formation'],
    publicStats: { innovationHubSolutions: 1, averageRating: 4.3 },
    createdAt: '2025-06-01', updatedAt: '2026-03-10',
  },
  {
    id: 'ent-012', rccm: 'GA-LIB-2024-B-00178', nif: 'NIF-GA-2024-00178',
    name: 'EcoShop Gabon SAS', legalForm: 'SAS',
    sector: { id: 'sec-10', name: 'Commerce & Distribution', slug: 'commerce', icon: '🛒' },
    status: 'ACTIVE',
    address: { street: 'Marché Mont-Bouët', city: 'Libreville', province: 'Estuaire', country: 'Gabon' },
    description: "Marketplace e-commerce gabonaise. Connecte les commerçants locaux (Mont-Bouët, Nkembo, Oloumi) aux consommateurs urbains avec livraison le jour même à Libreville.",
    employeeCount: 18, yearFounded: 2024,
    email: 'shop@ecoshop.ga', website: 'https://ecoshop.ga',
    isDigitalEcosystem: true, digitalCategory: 'E-commerce',
    startupProfile: {
      pitch: 'Le marché gabonais sur votre écran. Produits locaux livrés chez vous en 2 heures.',
      teamSize: 18, fundingStage: 'SEED', isIncubated: false,
      solutions: [{ name: 'EcoShop Marketplace', category: 'E-commerce', rating: 4.0 }],
      seekingFunding: true, fundingTarget: 400000000,
    },
    tags: ['e-commerce', 'marketplace', 'livraison', 'commerce local'],
    publicStats: { innovationHubSolutions: 1, averageRating: 4.0 },
    createdAt: '2024-11-15', updatedAt: '2026-02-25',
  },

  // ═══ ENTREPRISES CLASSIQUES (18) ═══
  {
    id: 'ent-013', rccm: 'GA-LIB-2020-B-00891', nif: 'NIF-GA-2020-00891',
    name: 'Ogooué Logistics SA', legalForm: 'SA',
    sector: { id: 'sec-04', name: 'Transport & Logistique', slug: 'transport', icon: '🚛' },
    status: 'ACTIVE',
    address: { street: "Zone portuaire d'Owendo", city: 'Libreville', province: 'Estuaire', country: 'Gabon' },
    description: "Transport multimodal (terrestre, fluvial) et logistique d'approvisionnement pour les sites miniers et pétroliers du Gabon.",
    employeeCount: 145, yearFounded: 2020,
    phone: '+241 011 22 33 44', email: 'info@ogooue-logistics.ga',
    isDigitalEcosystem: false, tags: ['transport', 'logistique', 'multimodal', 'minier'],
    publicStats: { tenderParticipations: 12, tendersWon: 5 },
    createdAt: '2020-03-10', updatedAt: '2026-01-30',
  },
  {
    id: 'ent-014', rccm: 'GA-PGE-2019-B-00234', nif: 'NIF-GA-2019-00234',
    name: 'Gabon Bois Export SARL', legalForm: 'SARL',
    sector: { id: 'sec-05', name: 'Bois & Forêt', slug: 'bois', icon: '🌳' },
    status: 'ACTIVE',
    address: { street: 'Zone industrielle SNBG', city: 'Port-Gentil', province: 'Ogooué-Maritime', country: 'Gabon' },
    description: "Exploitation forestière certifiée FSC. Sciage, séchage et export de bois transformé (okoumé, ozigo, padouk) vers l'Europe et l'Asie.",
    employeeCount: 85, yearFounded: 2019,
    isDigitalEcosystem: false, tags: ['bois', 'export', 'FSC', 'okoumé', 'transformation'],
    publicStats: { tenderParticipations: 4, tendersWon: 2 },
    createdAt: '2019-07-22', updatedAt: '2025-12-15',
  },
  {
    id: 'ent-015', rccm: 'GA-LIB-2021-B-00567', nif: 'NIF-GA-2021-00567',
    name: 'Pharmacie Centrale de Libreville SA', legalForm: 'SA',
    sector: { id: 'sec-06', name: 'Santé & Pharmacie', slug: 'sante', icon: '🏥' },
    status: 'ACTIVE',
    address: { street: 'Boulevard Bessieux', city: 'Libreville', province: 'Estuaire', country: 'Gabon' },
    description: "Grossiste-répartiteur pharmaceutique. Distribution de médicaments et matériel médical sur l'ensemble du territoire gabonais.",
    employeeCount: 62, yearFounded: 2021,
    isDigitalEcosystem: false, tags: ['pharmacie', 'distribution', 'médicaments', 'grossiste'],
    publicStats: { tenderParticipations: 9, tendersWon: 3 },
    createdAt: '2021-01-15', updatedAt: '2026-02-01',
  },
  {
    id: 'ent-016', rccm: 'GA-LIB-2018-B-01234', nif: 'NIF-GA-2018-01234',
    name: 'BTP Gabon Constructions SA', legalForm: 'SA',
    sector: { id: 'sec-09', name: 'BTP & Immobilier', slug: 'btp', icon: '🏗️' },
    status: 'ACTIVE',
    address: { street: 'PK12, Route nationale 1', city: 'Libreville', province: 'Estuaire', country: 'Gabon' },
    description: 'Construction de bâtiments publics, routes et infrastructures. Plus de 50 chantiers réalisés dont le stade de Franceville et des logements sociaux.',
    employeeCount: 320, yearFounded: 2018,
    isDigitalEcosystem: false, tags: ['BTP', 'construction', 'routes', 'bâtiments'],
    publicStats: { tenderParticipations: 22, tendersWon: 9 },
    createdAt: '2018-05-10', updatedAt: '2026-03-01',
  },
  {
    id: 'ent-017', rccm: 'GA-LBV-2022-B-00444', nif: 'NIF-GA-2022-00444',
    name: 'Tropik Lodge SARL', legalForm: 'SARL',
    sector: { id: 'sec-11', name: 'Tourisme & Hôtellerie', slug: 'tourisme', icon: '🏨' },
    status: 'ACTIVE',
    address: { street: 'Pointe Denis', city: 'Libreville', province: 'Estuaire', country: 'Gabon' },
    description: 'Écolodge de luxe à la Pointe Denis. Observation de baleines, tortues marines et randonnées en forêt. Tourisme responsable et communautaire.',
    employeeCount: 25, yearFounded: 2022,
    website: 'https://tropiklodge.ga',
    isDigitalEcosystem: false, tags: ['écotourisme', 'lodge', 'baleines', 'Pointe Denis'],
    publicStats: {},
    createdAt: '2022-04-01', updatedAt: '2026-01-10',
  },
  {
    id: 'ent-018', rccm: 'GA-MOA-2023-B-00056', nif: 'NIF-GA-2023-00056',
    name: 'Cacao de Woleu EI', legalForm: 'EI',
    sector: { id: 'sec-02', name: 'Agriculture & Agroalimentaire', slug: 'agriculture', icon: '🌾' },
    status: 'ACTIVE',
    address: { street: 'Route de Bitam', city: 'Oyem', province: 'Woleu-Ntem', country: 'Gabon' },
    description: 'Coopérative de producteurs de cacao bio du Woleu-Ntem. Fermentation, séchage et commercialisation de fèves de cacao premium.',
    employeeCount: 8, yearFounded: 2023,
    isDigitalEcosystem: false, tags: ['cacao', 'bio', 'coopérative', 'Woleu-Ntem'],
    publicStats: {},
    createdAt: '2023-02-15', updatedAt: '2025-11-30',
  },
  {
    id: 'ent-019', rccm: 'GA-LIB-2017-B-00789', nif: 'NIF-GA-2017-00789',
    name: 'COMILOG Services SARL', legalForm: 'SARL',
    sector: { id: 'sec-03', name: 'Mines & Hydrocarbures', slug: 'mines', icon: '⛏️' },
    status: 'ACTIVE',
    address: { street: 'Plateau des mines', city: 'Moanda', province: 'Haut-Ogooué', country: 'Gabon' },
    description: "Services d'appui aux opérations minières. Maintenance d'équipements lourds, gestion de bases-vie et transport minier.",
    employeeCount: 180, yearFounded: 2017,
    isDigitalEcosystem: false, tags: ['mines', 'manganèse', 'maintenance', 'Moanda'],
    publicStats: { tenderParticipations: 15, tendersWon: 7 },
    createdAt: '2017-09-01', updatedAt: '2026-02-15',
  },
  {
    id: 'ent-020', rccm: 'GA-LBV-2024-B-00555', nif: 'NIF-GA-2024-00555',
    name: 'SolarGabon EI', legalForm: 'EI',
    sector: { id: 'sec-08', name: 'Énergie & Environnement', slug: 'energie', icon: '⚡' },
    status: 'ACTIVE',
    address: { street: 'Quartier Nzeng-Ayong', city: 'Libreville', province: 'Estuaire', country: 'Gabon' },
    description: 'Installation de panneaux solaires pour particuliers et entreprises. Kits solaires pour les zones rurales non électrifiées du Gabon.',
    employeeCount: 7, yearFounded: 2024,
    isDigitalEcosystem: false, tags: ['solaire', 'énergie renouvelable', 'rural', 'électrification'],
    publicStats: { tenderParticipations: 3, tendersWon: 1 },
    createdAt: '2024-01-20', updatedAt: '2026-01-05',
  },
  {
    id: 'ent-021', rccm: 'GA-LIB-2015-B-02345', nif: 'NIF-GA-2015-02345',
    name: 'Import-Export Ntoutoume SA', legalForm: 'SA',
    sector: { id: 'sec-10', name: 'Commerce & Distribution', slug: 'commerce', icon: '🛒' },
    status: 'ACTIVE',
    address: { street: "Zone franche d'Owendo", city: 'Libreville', province: 'Estuaire', country: 'Gabon' },
    description: "Import de produits alimentaires, matériaux de construction et équipements industriels. Export de bois et produits agricoles.",
    employeeCount: 55, yearFounded: 2015,
    isDigitalEcosystem: false, tags: ['import-export', 'alimentaire', 'matériaux', 'zone franche'],
    publicStats: { tenderParticipations: 8, tendersWon: 3 },
    createdAt: '2015-06-12', updatedAt: '2026-02-28',
  },
  {
    id: 'ent-022', rccm: 'GA-LBV-2023-B-00188', nif: 'NIF-GA-2023-00188',
    name: 'Cabinet Mba & Associés SARL', legalForm: 'SARL',
    sector: { id: 'sec-12', name: 'Services Financiers', slug: 'finance', icon: '🏦' },
    status: 'ACTIVE',
    address: { street: 'Immeuble CK2, Bord de mer', city: 'Libreville', province: 'Estuaire', country: 'Gabon' },
    description: "Cabinet d'expertise comptable, d'audit et de conseil fiscal. Accompagnement des PME gabonaises et des investisseurs étrangers.",
    employeeCount: 12, yearFounded: 2023,
    isDigitalEcosystem: false, tags: ['comptabilité', 'audit', 'fiscal', 'PME', 'conseil'],
    publicStats: {},
    createdAt: '2023-03-01', updatedAt: '2026-01-20',
  },
  {
    id: 'ent-023', rccm: 'GA-LBV-2021-B-00777', nif: 'NIF-GA-2021-00777',
    name: 'Complexe Scolaire Lumière SA', legalForm: 'SA',
    sector: { id: 'sec-07', name: 'Éducation & Formation', slug: 'education', icon: '🎓' },
    status: 'ACTIVE',
    address: { street: "Quartier Akébé, Route d'Ambowe", city: 'Libreville', province: 'Estuaire', country: 'Gabon' },
    description: "Établissement scolaire privé de la maternelle au lycée. Programme gabonais + préparation aux examens internationaux (Cambridge, DELF).",
    employeeCount: 42, yearFounded: 2021,
    isDigitalEcosystem: false, tags: ['école', 'privé', 'Cambridge', 'DELF', 'éducation'],
    publicStats: {},
    createdAt: '2021-09-01', updatedAt: '2025-09-15',
  },
  {
    id: 'ent-024', rccm: 'GA-LBV-2020-B-00333', nif: 'NIF-GA-2020-00333',
    name: 'Clinique Sainte-Marie SARL', legalForm: 'SARL',
    sector: { id: 'sec-06', name: 'Santé & Pharmacie', slug: 'sante', icon: '🏥' },
    status: 'ACTIVE',
    address: { street: 'Quartier Louis', city: 'Libreville', province: 'Estuaire', country: 'Gabon' },
    description: "Clinique privée pluridisciplinaire : médecine générale, pédiatrie, maternité, laboratoire d'analyses et imagerie médicale.",
    employeeCount: 38, yearFounded: 2020,
    isDigitalEcosystem: false, tags: ['clinique', 'santé', 'maternité', 'laboratoire'],
    publicStats: {},
    createdAt: '2020-02-14', updatedAt: '2026-01-10',
  },
  // Entreprise fermée (test du filtre statut)
  {
    id: 'ent-025', rccm: 'GA-LIB-2019-B-00111', nif: 'NIF-GA-2019-00111',
    name: 'Gabon Digital Express EI', legalForm: 'EI',
    sector: { id: 'sec-01', name: "Technologies de l'Information", slug: 'technologies', icon: '💻' },
    status: 'CLOSED',
    address: { street: 'Ancien Centre Culturel', city: 'Libreville', province: 'Estuaire', country: 'Gabon' },
    description: "Ancienne société de services informatiques. Cessation d'activité en 2024.",
    employeeCount: 0, yearFounded: 2019,
    isDigitalEcosystem: true, digitalCategory: 'GovTech',
    tags: ['fermé', 'cessation'],
    publicStats: {},
    createdAt: '2019-05-01', updatedAt: '2024-12-31',
  },
  // Provinces extérieures
  {
    id: 'ent-026', rccm: 'GA-LAM-2022-B-00023', nif: 'NIF-GA-2022-00023',
    name: 'Palmeraie de la Ngounié SARL', legalForm: 'SARL',
    sector: { id: 'sec-02', name: 'Agriculture & Agroalimentaire', slug: 'agriculture', icon: '🌾' },
    status: 'ACTIVE',
    address: { street: 'Route de Fougamou', city: 'Mouila', province: 'Ngounié', country: 'Gabon' },
    description: "Exploitation de palmeraies et production d'huile de palme artisanale. Circuit court producteur-consommateur.",
    employeeCount: 35, yearFounded: 2022,
    isDigitalEcosystem: false, tags: ['palmier', 'huile de palme', 'Ngounié', 'artisanal'],
    publicStats: {},
    createdAt: '2022-06-01', updatedAt: '2025-12-20',
  },
  {
    id: 'ent-027', rccm: 'GA-TCH-2023-B-00009', nif: 'NIF-GA-2023-00009',
    name: 'Pêcheries de Mayumba EI', legalForm: 'EI',
    sector: { id: 'sec-02', name: 'Agriculture & Agroalimentaire', slug: 'agriculture', icon: '🌾' },
    status: 'ACTIVE',
    address: { street: 'Port de pêche', city: 'Mayumba', province: 'Nyanga', country: 'Gabon' },
    description: 'Pêche artisanale durable, transformation et commercialisation de poisson fumé et séché. Approvisionnement des marchés de Libreville.',
    employeeCount: 15, yearFounded: 2023,
    isDigitalEcosystem: false, tags: ['pêche', 'Mayumba', 'poisson', 'artisanal', 'durable'],
    publicStats: {},
    createdAt: '2023-04-15', updatedAt: '2026-01-05',
  },
  {
    id: 'ent-028', rccm: 'GA-MKU-2024-B-00005', nif: 'NIF-GA-2024-00005',
    name: 'Ivindo Eco-Tours SARL', legalForm: 'SARL',
    sector: { id: 'sec-11', name: 'Tourisme & Hôtellerie', slug: 'tourisme', icon: '🏨' },
    status: 'ACTIVE',
    address: { street: "Entrée Parc National de l'Ivindo", city: 'Makokou', province: 'Ogooué-Ivindo', country: 'Gabon' },
    description: "Circuits écotouristiques autour des chutes de Kongou et du parc de l'Ivindo. Hébergement en campement, observation de la faune.",
    employeeCount: 9, yearFounded: 2024,
    isDigitalEcosystem: false, tags: ['écotourisme', 'Kongou', 'Ivindo', 'parc national'],
    publicStats: {},
    createdAt: '2024-03-01', updatedAt: '2025-11-15',
  },
  {
    id: 'ent-029', rccm: 'GA-KDN-2021-B-00018', nif: 'NIF-GA-2021-00018',
    name: 'Société Minière de Mitzic SA', legalForm: 'SA',
    sector: { id: 'sec-03', name: 'Mines & Hydrocarbures', slug: 'mines', icon: '⛏️' },
    status: 'ACTIVE',
    address: { street: "Zone d'exploitation aurifère", city: 'Mitzic', province: 'Woleu-Ntem', country: 'Gabon' },
    description: "Exploitation aurifère semi-artisanale encadrée. Production de 50 kg d'or par an. Programme de réhabilitation environnementale.",
    employeeCount: 95, yearFounded: 2021,
    isDigitalEcosystem: false, tags: ['or', 'mines', 'Mitzic', 'réhabilitation'],
    publicStats: { tenderParticipations: 2, tendersWon: 1 },
    createdAt: '2021-08-10', updatedAt: '2026-02-05',
  },
  {
    id: 'ent-030', rccm: 'GA-LIB-2016-B-03456', nif: 'NIF-GA-2016-03456',
    name: 'Gabon Énergie Solaire SA', legalForm: 'SA',
    sector: { id: 'sec-08', name: 'Énergie & Environnement', slug: 'energie', icon: '⚡' },
    status: 'ACTIVE',
    address: { street: 'ZES de Nkok, Lot 45', city: 'Nkok', province: 'Estuaire', country: 'Gabon' },
    description: "Producteur indépendant d'énergie solaire. Fermes solaires dans le Haut-Ogooué et le Woleu-Ntem. Vente d'électricité à la SEEG.",
    employeeCount: 40, yearFounded: 2016,
    isDigitalEcosystem: false, tags: ['solaire', 'énergie', 'SEEG', 'ferme solaire', 'IPP'],
    publicStats: { tenderParticipations: 5, tendersWon: 2 },
    createdAt: '2016-11-01', updatedAt: '2026-03-01',
  },
];

// ── ECOSYSTEM STATS ────────────────────────────────────────────────

export const DIGITAL_ECOSYSTEM_STATS = {
  totalStartups: 12,
  totalEmployees: 174,
  totalSolutions: 18,
  averageRating: 4.25,
  totalFundingTarget: 2_025_000_000,
  seekingFunding: 8,
  incubated: 5,
  categories: [
    { name: 'FinTech', count: 2, color: '#009e49' },
    { name: 'AgriTech', count: 1, color: '#22c55e' },
    { name: 'EdTech', count: 1, color: '#ec4899' },
    { name: 'HealthTech', count: 1, color: '#ef4444' },
    { name: 'GreenTech', count: 1, color: '#14b8a6' },
    { name: 'Cybersécurité', count: 1, color: '#6366f1' },
    { name: 'LogisTech', count: 1, color: '#3b82f6' },
    { name: 'Cloud & Infra', count: 1, color: '#0ea5e9' },
    { name: 'InsurTech', count: 1, color: '#8b5cf6' },
    { name: 'IA & Data', count: 1, color: '#f59e0b' },
    { name: 'E-commerce', count: 1, color: '#a855f7' },
  ],
  provinces: [
    { name: 'Estuaire', count: 8 },
    { name: 'Ogooué-Maritime', count: 1 },
    { name: 'Haut-Ogooué', count: 1 },
    { name: 'Woleu-Ntem', count: 1 },
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
