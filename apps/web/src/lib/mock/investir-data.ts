import {
  Wallet,
  ShoppingCart,
  HeartPulse,
  Sprout,
  GraduationCap,
  Building,
  FileCheck,
  Shield,
  Percent,
  Landmark,
  Handshake,
  Users,
  Search,
  MessageSquare,
  FileSearch,
  FileText,
  Award,
  Rocket,
  DollarSign,
  Globe,
  Coins,
  Building2,
  Signal,
  Smartphone,
  TrendingDown,
  Radio,
  TrendingUp,
  Lightbulb,
  Banknote,
  BarChart3,
  Calculator,
  ExternalLink,
  ArrowDown,
  Bell,
  Server,
} from 'lucide-react';

// ─────────────────────── TYPES ───────────────────────

export type Severite = 'faible' | 'moyen' | 'haute';
export type DealStatut = 'ouvert' | 'en_discussion' | 'terme_sheet' | 'cloture';
export type DealStade = 'Pre-Seed' | 'Seed' | 'Post-Seed' | 'Série A' | 'Croissance';
export type VeilleImpact = 'positif' | 'neutre' | 'negatif';
export type DeploymentStatus = 'completed' | 'in_progress' | 'planned';

export interface GaugeData {
  label: string;
  value: number;
  max: number;
  color: string;
  interpretation: string;
}
export interface MacroIndicator {
  indicateur: string;
  y2022: number | null;
  y2023: number | null;
  y2024: number | null;
  y2025: number | null;
  y2026: number | null;
}
export interface VerticaleInvestissement {
  id: string;
  titre: string;
  icon: typeof Wallet;
  color: string;
  attractiveness: number;
  opportunite: string;
  marche: { taille: string; penetration: string; croissance: string };
  startupsExistantes: { nom: string; description: string }[];
  risques: string;
  strategieEntree: string;
}
export interface DealPipeline {
  id: string;
  startup: string;
  secteur: string;
  stade: DealStade;
  montantRecherche: string;
  valorisation: string;
  metriques: string;
  statut: DealStatut;
}
export interface RisqueInvestisseur {
  risque: string;
  severite: Severite;
  description: string;
  attenuation: string;
}
export interface VeilleItem {
  date: string;
  title: string;
  source: string;
  category: string;
  impact: VeilleImpact;
  summary: string;
}

export const SEVERITE_CONFIG: Record<Severite, { label: string; color: string }> = {
  faible: { label: 'Faible', color: '#10B981' },
  moyen: { label: 'Moyen', color: '#F59E0B' },
  haute: { label: 'Haute', color: '#EF4444' },
};

// ─────────────────────── 1. HERO ───────────────────────

export const HERO_INVESTIR = {
  badge: { icon: '🇬🇦', text: "Portail National de l'Investissement Numérique" },
  title: [
    { text: 'Investissez dans le Hub Digital', gradient: 'from-emerald-400 to-teal-200' },
    { text: "de l'Afrique Centrale.", gradient: 'from-teal-300 to-emerald-200' },
  ],
  subtitle:
    'Infrastructure déployée (94% 4G). Marché sous-pénétré (67% inactivé). Premier deal VC historique bouclé (POZI €650K). Le Gabon est prêt pour sa révolution numérique.',
  primaryCTA: { label: 'Explorer les opportunités', href: '#verticales', icon: ArrowDown },
  secondaryCTA: { label: 'Dashboard investisseur', href: '/dashboard/investir', icon: BarChart3 },
  tertiaryCTA: { label: 'Simuler mon ROI', href: '#simulateur', icon: Calculator },
  stats: [
    { value: '$72,4M', label: 'Programme Gabon Digital (Banque Mondiale)', icon: Building2 },
    { value: '94%', label: 'Couverture réseau 4G', icon: Signal },
    { value: '135%', label: 'Pénétration mobile', icon: Smartphone },
    { value: '1,2%', label: 'Inflation maîtrisée (2024)', icon: TrendingDown },
  ],
  partners: [
    'Banque Mondiale',
    'Smart Africa',
    'Huawei',
    'ANPI-Gabon',
    'SING SA',
    'Okoumé Capital',
    'Digital Africa',
  ],
  anchorNav: [
    { label: 'Opportunité', href: '#paradoxe' },
    { label: 'Macro', href: '#macro' },
    { label: 'Verticales', href: '#verticales' },
    { label: 'Success Story', href: '#pozi' },
    { label: 'Simulateur', href: '#simulateur' },
    { label: 'Parcours', href: '#parcours' },
    { label: 'Cadre légal', href: '#juridique' },
    { label: 'Risques', href: '#risques' },
  ],
};

// ─────────────────────── 2. PARADOXE ───────────────────────

export const PARADOXE_GAUGES: GaugeData[] = [
  {
    label: 'Pénétration mobile',
    value: 135.4,
    max: 150,
    color: '#10B981',
    interpretation: "L'infrastructure est entre les mains des utilisateurs",
  },
  {
    label: 'Couverture 4G',
    value: 94,
    max: 100,
    color: '#3B82F6',
    interpretation: 'Capacité à déployer des apps riches en données',
  },
  {
    label: 'Comptes électroniques actifs',
    value: 33,
    max: 100,
    color: '#F59E0B',
    interpretation: '67% du marché reste à activer et monétiser',
  },
  {
    label: 'Crédit via mobile money',
    value: 7.36,
    max: 100,
    color: '#EF4444',
    interpretation: 'Océan bleu pour le micro-crédit et la néo-banque',
  },
];

export const PARADOXE_META = {
  badge: '📊 Data Storytelling',
  title: "Le Paradoxe Numérique : L'Opportunité de la Décennie",
  description:
    "L'infrastructure matérielle a devancé l'adoption des services. 67% de la population connectée reste à activer financièrement. C'est un océan bleu pour les FinTech, le e-Commerce et la HealthTech.",
  callout: {
    stat: '41,41% des Gabonais empruntent auprès de leur famille. Seulement 5,48% utilisent des institutions financières formelles.',
    conclusion: 'Ce vide attend vos solutions.',
  },
  gap: {
    title: 'Le Gap = Votre Marché',
    left: { value: '135%', label: 'Pénétration mobile', color: '#10B981' },
    right: { value: '33%', label: 'Comptes actifs', color: '#F59E0B' },
    gapValue: { value: '102pts', label: "d'écart = marché inexploité", color: '#EF4444' },
  },
};

// ─────────────────────── 3. MACRO ───────────────────────

export const MACRO_TABLE: MacroIndicator[] = [
  {
    indicateur: 'Taux de croissance du PIB (%)',
    y2022: 3.0,
    y2023: 2.4,
    y2024: 3.1,
    y2025: 2.3,
    y2026: 2.1,
  },
  {
    indicateur: 'Croissance PIB réel par habitant (%)',
    y2022: 0.7,
    y2023: 0.2,
    y2024: 0.9,
    y2025: 0.1,
    y2026: -0.1,
  },
  {
    indicateur: "Taux d'inflation (%)",
    y2022: 4.3,
    y2023: 3.6,
    y2024: 1.2,
    y2025: 1.7,
    y2026: 2.3,
  },
  {
    indicateur: 'Solde budgétaire (dons compris, % PIB)',
    y2022: -0.8,
    y2023: 1.8,
    y2024: -3.0,
    y2025: -3.8,
    y2026: -4.0,
  },
  {
    indicateur: 'Solde du compte courant (% PIB)',
    y2022: 9.8,
    y2023: 6.8,
    y2024: 5.7,
    y2025: 2.0,
    y2026: null,
  },
];

export const MACRO_SOURCE =
  'Banque Africaine de Développement, Rapport Pays 2025 ; UNCDF Diagnostic Gabon 2023';

export const KEY_FACTS = [
  {
    icon: DollarSign,
    fact: "PIB par habitant PPA : $16 470 — 5ème économie la plus riche d'Afrique",
  },
  {
    icon: Building2,
    fact: "90% de taux d'urbanisation — idéal pour le dernier kilomètre et les services B2C",
  },
  {
    icon: Coins,
    fact: "Monnaie FCFA arrimée à l'Euro — zéro risque de change pour les investisseurs européens",
  },
  { icon: Globe, fact: "Membre CEMAC — accès à un marché régional de 60 millions d'habitants" },
];

export const MACRO_CHARTS = {
  gdpGrowth: {
    title: 'Croissance du PIB (%)',
    data: [
      { y: '2022', v: 3.0 },
      { y: '2023', v: 2.4 },
      { y: '2024', v: 3.1 },
      { y: '2025(p)', v: 2.3 },
      { y: '2026(p)', v: 2.1 },
    ],
  },
  inflation: {
    title: "Taux d'inflation (%)",
    data: [
      { y: '2022', v: 4.3 },
      { y: '2023', v: 3.6 },
      { y: '2024', v: 1.2 },
      { y: '2025(p)', v: 1.7 },
      { y: '2026(p)', v: 2.3 },
    ],
  },
};

// ─────────────────────── 4. VERTICALES ───────────────────────

export const VERTICALES: VerticaleInvestissement[] = [
  {
    id: 'fintech',
    titre: 'FinTech & Mobile Money',
    icon: Wallet,
    color: '#10B981',
    attractiveness: 92,
    opportunite:
      '135% de pénétration mobile mais seulement 33% de comptes électroniques actifs et 7,36% de crédit mobile.',
    marche: {
      taille: "2M d'adultes non bancarisés",
      penetration: '33%',
      croissance: '+89% en 4 ans (mobile money)',
    },
    startupsExistantes: [
      { nom: 'CaPay', description: 'Paiement mobile B2B2C' },
      { nom: 'GATAX', description: 'Gestion fiscale intelligente' },
      { nom: 'POZI', description: 'Super-app financière' },
      { nom: 'PERFORMIX', description: 'Analytics financier PME' },
    ],
    risques: 'Réglementation COBAC en évolution. Concurrence Airtel Money / Moov Money installée.',
    strategieEntree:
      'Partenariat avec opérateurs existants (Airtel/Moov) ou B2B pour PME non bancarisées',
  },
  {
    id: 'ecommerce',
    titre: 'e-Commerce & Logistique',
    icon: ShoppingCart,
    color: '#8B5CF6',
    attractiveness: 85,
    opportunite:
      "90% d'urbanisation + classe moyenne en expansion = conditions parfaites pour le e-commerce et la livraison du dernier kilomètre.",
    marche: {
      taille: 'Importations alimentaires massives — substitution',
      penetration: '< 5%',
      croissance: 'Priorité gouvernementale déclarée',
    },
    startupsExistantes: [
      { nom: 'ShopEasy Gabon', description: 'Supermarché en ligne' },
      { nom: 'Transportify Gabon', description: 'Gestion de flotte' },
      { nom: 'WEBCARS', description: 'Marketplace automobile' },
      { nom: "DUK' OBIERI", description: 'Livraison express' },
      { nom: 'Ekena.ga', description: 'Marketplace Made in Gabon' },
    ],
    risques: 'Logistique intérieure complexe (régions enclavées). Faible culture achat en ligne.',
    strategieEntree: 'Modèle marketplace mobile-first avec agents terrain',
  },
  {
    id: 'healthtech',
    titre: 'HealthTech & e-Santé',
    icon: HeartPulse,
    color: '#EF4444',
    attractiveness: 78,
    opportunite:
      'Banque Mondiale finance le projet e-santé. Besoin massif de dossier médical partagé, e-pharmacie, télémédecine.',
    marche: {
      taille: 'Programme Gabon Digital inclut numérisation santé',
      penetration: '< 2%',
      croissance: 'Demande institutionnelle forte',
    },
    startupsExistantes: [
      { nom: 'MedCare Gabon', description: 'Gestion de pharmacies' },
      { nom: 'Orema', description: 'Télémédecine' },
      { nom: 'E-vaccin', description: 'Carnet vaccination numérique' },
      { nom: 'USHANN LABS', description: 'Digital health adjacent' },
    ],
    risques: 'Marché B2G dépendant de la commande publique. Réglementation sanitaire stricte.',
    strategieEntree: 'B2G via programme Gabon Digital + B2B avec cliniques privées de Libreville',
  },
  {
    id: 'agritech',
    titre: 'AgriTech & Sécurité Alimentaire',
    icon: Sprout,
    color: '#22C55E',
    attractiveness: 72,
    opportunite:
      "Forte dépendance aux importations alimentaires. Le gouvernement pousse la relance agricole. L'AgriTech est une nécessité de sécurité nationale.",
    marche: {
      taille: 'Importations massives — substitution = marché gouvernemental déclaré',
      penetration: '< 1%',
      croissance: 'Priorité gouvernementale déclarée',
    },
    startupsExistantes: [
      { nom: 'AgriTrack', description: 'Traçabilité chaîne agricole IoT' },
      { nom: 'SolTech', description: 'Énergie solaire connectée' },
    ],
    risques: 'Faible connectivité intérieure. Filières agricoles peu structurées.',
    strategieEntree: 'Solutions mobile-first offline-capable. Partenariats avec coopératives.',
  },
  {
    id: 'edtech',
    titre: 'Technologies Éducatives (EdTech)',
    icon: GraduationCap,
    color: '#F59E0B',
    attractiveness: 65,
    opportunite:
      'Déficit structurel de compétences tech. École 241, CGI et programme DigiEmpower créent la demande.',
    marche: {
      taille: 'Programme DigiEmpower : 1 000+ jeunes à former (Cybastion)',
      penetration: '< 3%',
      croissance: "Demande croissante portée par la digitalisation de l'État",
    },
    startupsExistantes: [
      { nom: 'ATACE HANDI', description: 'Tech inclusive handicap' },
      { nom: 'PANAFRICOM', description: 'Hub logistique (formation)' },
      { nom: 'Alissa IA', description: 'Assistant pédagogique IA' },
      { nom: 'Musée.GA', description: 'VR éducatif patrimoine' },
    ],
    risques: "Marché B2C limité par le pouvoir d'achat. Dépendance aux subventions publiques.",
    strategieEntree: 'Formation B2B corporate prioritaire, puis B2C freemium mobile',
  },
  {
    id: 'govtech',
    titre: 'GovTech & Infrastructure Numérique',
    icon: Building,
    color: '#6366F1',
    attractiveness: 88,
    opportunite:
      'Programme Gabon Digital ($72,4M) = commande publique massive. 13 projets gouvernementaux en cours.',
    marche: {
      taille: '44 milliards FCFA (Banque Mondiale) — contrats B2G',
      penetration: '13 projets en cours',
      croissance: 'Budget numérique 2026 : +156%',
    },
    startupsExistantes: [
      { nom: 'GABON ID CONNECT', description: 'Identité numérique souveraine' },
      { nom: 'eGouv Borne CGI', description: 'Bornes services publics' },
      { nom: 'Allo Mairie', description: "Startup d'État citoyenne" },
      { nom: 'La Numérithèque', description: 'Suite logicielle pro' },
    ],
    risques: 'Cycles de décision publique longs. Concurrence grands groupes internationaux.',
    strategieEntree:
      "Joint-venture avec acteur local (SING Logiciels) + appels d'offres ANINF/MENUDI",
  },
];

// ─────────────────────── 5. POZI ───────────────────────

export const CASE_STUDY_POZI = {
  badge: '🏆 Success Story',
  title: "Cas d'École : POZI — Le Premier Deal VC du Gabon",
  timeline: [
    { year: '2020', event: 'Création de POZI — application de gestion de flotte et logistique IA' },
    {
      year: '2022-2024',
      event: 'Incubation SING, 2 500+ véhicules connectés, clients B2B nationaux et multinationaux',
    },
    {
      year: 'Oct 2025',
      event: 'Seed round €650K — Saviu Ventures (lead) + Emsy Capital (co-invest)',
    },
    {
      year: '2026+',
      event: "Expansion Côte d'Ivoire — objectif 35 000 véhicules / 10 marchés en 2030",
    },
  ],
  metriques: {
    vehicules: '2 500+',
    montant: '€650K Seed',
    leadInvestor: 'Saviu Ventures (Pays-Bas)',
    coInvestor: 'Emsy Capital',
    conseilJuridique: 'BFA — Business & Finance Advising',
    secteur: 'LogisTech / IA',
    ambition2030: '35 000 véhicules — 10 marchés africains',
  },
  significance: "Première levée VC étrangère au Gabon. La preuve que l'écosystème est prêt.",
  vcContext: {
    title: 'Capital-Risque Africain — Contexte',
    stats: [
      { label: 'Funding Africa 2024', value: '$2,2 Mds', source: 'Partech' },
      { label: 'Big Four (NG, KE, ZA, EG)', value: '83%', source: 'Concentration du VC' },
      { label: '1er deal VC au Gabon', value: 'Oct 2025', source: 'POZI / Saviu Ventures' },
    ],
    narrative:
      '83% du VC africain va à 4 pays. POZI prouve que le Gabon peut attirer du capital international.',
  },
};

// ─────────────────────── 6. SIMULATEUR ROI ───────────────────────

export const ROI_VERTICALES_OPTIONS = [
  { value: 'fintech', label: 'FinTech', multiplier: 1.35 },
  { value: 'ecommerce', label: 'e-Commerce', multiplier: 1.2 },
  { value: 'healthtech', label: 'HealthTech', multiplier: 1.15 },
  { value: 'agritech', label: 'AgriTech', multiplier: 1.1 },
  { value: 'edtech', label: 'EdTech', multiplier: 1.08 },
  { value: 'govtech', label: 'GovTech', multiplier: 1.25 },
];

export const ROI_HORIZONS = [
  { value: 3, label: '3 ans', multiplier: 1.0 },
  { value: 5, label: '5 ans', multiplier: 1.8 },
  { value: 7, label: '7 ans', multiplier: 2.5 },
];

export const ROI_INSTRUMENTS = [
  { value: 'equity', label: 'Prise de participation (Equity)', riskFactor: 1.5 },
  { value: 'debt', label: 'Prêt convertible', riskFactor: 1.2 },
  { value: 'jv', label: 'Joint-Venture avec acteur local', riskFactor: 1.0 },
  { value: 'fund', label: 'Via fonds (Okoumé Capital / Saviu)', riskFactor: 0.8 },
];

export const ROI_ENTRY_MODES = [
  { value: 'greenfield', label: 'Greenfield (création)', costFactor: 1.3 },
  { value: 'acquisition', label: 'Acquisition startup existante', costFactor: 1.0 },
  { value: 'partnership', label: 'Partenariat stratégique', costFactor: 0.7 },
];

export const ROI_DISCLAIMER =
  '⚠️ Ces estimations sont indicatives et basées sur des moyennes sectorielles africaines. Elles ne constituent pas un conseil en investissement. Consultez un conseiller financier qualifié.';

// ─────────────────────── 7. PARCOURS INVESTISSEUR ───────────────────────

export const PARCOURS_STEPS = [
  {
    number: 1,
    title: 'Exploration & Analyse',
    description:
      'Explorez les verticales, consultez les données macro et identifiez votre opportunité via le Dashboard Investisseur GABON BIZ.',
    icon: Search,
    tools: ['Dashboard macro', 'Radar secteurs', 'Simulateur ROI'],
    duration: '1-2 semaines',
  },
  {
    number: 2,
    title: 'Prise de Contact',
    description:
      "Contactez l'ANPI-Gabon (Guichet Numérique GNI) ou la SING SA pour être orienté vers les acteurs de votre verticale.",
    icon: MessageSquare,
    tools: ['GNI en ligne', 'Formulaire SING', 'GABON BIZ Contact'],
    duration: '1 semaine',
  },
  {
    number: 3,
    title: 'Due Diligence Pays',
    description: "Utilisez la fiche de due diligence GABON BIZ pour votre comité d'investissement.",
    icon: FileSearch,
    tools: ['Due diligence GABON BIZ', 'Rapport PDF (bientôt)'],
    duration: '2-4 semaines',
  },
  {
    number: 4,
    title: "Déclaration d'Intention",
    description:
      "Soumettez votre dossier d'investissement via le GNI pour une étude de préfaisabilité. 100% en ligne.",
    icon: FileText,
    tools: ['GNI — gfranchise.ga', 'Création entreprise en ligne'],
    duration: '1-2 semaines',
  },
  {
    number: 5,
    title: 'Agréments & Installation',
    description: 'Obtenez rapidement vos agréments investisseurs via le circuit court ANPI.',
    icon: Award,
    tools: ['ANPI Circuit court', 'ZIS de Nkok'],
    duration: '2-6 semaines',
  },
  {
    number: 6,
    title: 'Déploiement & Suivi',
    description:
      "Lancez votre activité avec l'appui de l'écosystème SING, CGI et les partenaires internationaux.",
    icon: Rocket,
    tools: ['SING incubation', 'CGI formations', 'Aftercare ANPI'],
    duration: 'En continu',
  },
];

// ─────────────────────── 8. CADRE JURIDIQUE ───────────────────────

export const CADRE_JURIDIQUE = [
  {
    icon: FileCheck,
    titre: "Création d'entreprise simplifiée",
    description:
      "100% en ligne via le Guichet Numérique de l'Investissement (GNI). SARL en 3 jours.",
    lien: { label: 'Accéder au GNI', href: 'https://gfranchise.ga', external: true },
  },
  {
    icon: Shield,
    titre: 'Protection des investissements',
    description:
      "Code des Investissements de 1998 : liberté d'entreprendre, libre transfert des capitaux, protection contre l'expropriation.",
    lien: null,
  },
  {
    icon: Percent,
    titre: 'Exonérations fiscales attractives',
    description:
      "3 ans d'exonération IS. Suspension TVA importation équipements. Amortissements accélérés.",
    lien: null,
  },
  {
    icon: Landmark,
    titre: 'ZIS de Nkok — Zone Économique Spéciale',
    description:
      'Zone franche industrielle et logistique avec avantages douaniers et fiscaux uniques.',
    lien: null,
  },
  {
    icon: Handshake,
    titre: 'Co-financement FONAP',
    description: 'Prêts bonifiés, co-financement de projets innovants, accompagnement technique.',
    lien: null,
  },
  {
    icon: Users,
    titre: 'Capital humain en formation',
    description:
      'SING (2 300+ certifiés), CGI/SADA, DigiEmpower (Cybastion + Cisco). Pipeline tech en croissance.',
    lien: null,
  },
];

// ─────────────────────── 9. ÉCOSYSTÈME SUPPORT ───────────────────────

export const ECOSYSTEME_SUPPORT = [
  {
    name: 'ANPI-Gabon',
    role: 'Guichet Numérique — création entreprise 100% en ligne',
    icon: Landmark,
    color: '#14B8A6',
    link: 'https://gfranchise.ga',
    description: "Point d'entrée unique pour tous les investisseurs.",
  },
  {
    name: 'SING SA',
    role: '1er incubateur 100% numérique CEMAC — 280+ startups',
    icon: Rocket,
    color: '#ec4899',
    link: '/services/incubateur',
    description: "Programmes d'incubation, SING Capital, Digital Factory.",
  },
  {
    name: 'CGI / SADA',
    role: "Centre d'Innovation — formations UIT internationales",
    icon: Lightbulb,
    color: '#F59E0B',
    link: '/services/cgi',
    description: 'Académie SADA, FabLab, MediaLab.',
  },
  {
    name: 'FONAP',
    role: 'Prêts bonifiés et co-financement projets innovants',
    icon: Banknote,
    color: '#10B981',
    link: null,
    description: 'Instruments financiers adaptés aux startups.',
  },
  {
    name: 'ARCEP',
    role: 'Régulateur télécom — données marché actualisées',
    icon: Radio,
    color: '#6366F1',
    link: null,
    description: 'Autorité de Régulation des Communications.',
  },
  {
    name: 'Okoumé Capital',
    role: "Fonds d'investissement — VC local",
    icon: TrendingUp,
    color: '#8B5CF6',
    link: null,
    description: 'Premier fonds VC gabonais. Partenaire PNUD/YouthConnekt.',
  },
];

// ─────────────────────── 10. PARTENARIATS ───────────────────────

export const PARTENARIATS = [
  {
    partenaire: 'Banque Mondiale',
    programme: 'Gabon Digital',
    montant: '$72,4M',
    impact: '13 projets e-gov, Data Center souverain',
    type: 'Financement multilatéral',
  },
  {
    partenaire: 'Smart Africa',
    programme: 'Adhésion initiative',
    montant: '—',
    impact: 'Cadre de gouvernance numérique panafricain',
    type: 'Coopération institutionnelle',
  },
  {
    partenaire: 'Huawei',
    programme: 'ICT Academy + Infra 5G',
    montant: 'Non divulgué',
    impact: 'Formation 1 000 ingénieurs, pilote 5G',
    type: 'PPP technologique',
  },
  {
    partenaire: 'Cybastion + Cisco',
    programme: 'DigiEmpower',
    montant: 'Non divulgué',
    impact: 'Centre cybersécurité, formation 1 000 jeunes',
    type: 'Formation & Cybersécurité',
  },
  {
    partenaire: 'Émirats Arabes Unis',
    programme: 'Accord numérique bilatéral',
    montant: 'Non divulgué',
    impact: 'Transfert technologique, investissements croisés',
    type: 'Diplomatie numérique',
  },
  {
    partenaire: 'Eramet / Comilog',
    programme: 'Innovation industrielle',
    montant: 'Non divulgué',
    impact: 'Diversification numérique secteur minier',
    type: 'Innovation corporate',
  },
  {
    partenaire: 'GIZ / BMZ (Allemagne)',
    programme: 'Coopération technique',
    montant: 'Non divulgué',
    impact: 'Renforcement capacités institutionnelles',
    type: 'Coopération bilatérale',
  },
];

// ─────────────────────── 11. MARCHÉ TÉLÉCOM ───────────────────────

export const MARCHE_TELECOM = {
  stats: {
    parcTotal: 2355534,
    repartition: { mobile: '94,53%', fixe: '5,47%' },
    chiffreAffaires: '32,8 milliards FCFA',
    source: 'ARCEP Gabon — Observatoire Télécom Q3 2025',
  },
  operateurs: [
    { nom: 'Gabon Télécom (Moov)', partMarche: 53.14, type: 'Mobile + Fixe', color: '#10B981' },
    { nom: 'Airtel Gabon', partMarche: 42.81, type: 'Mobile', color: '#EF4444' },
    { nom: 'AXIONE', partMarche: 2.18, type: 'Fixe', color: '#3B82F6' },
    { nom: 'Gabon Télécom Mobile', partMarche: 1.58, type: 'Mobile', color: '#F59E0B' },
    { nom: 'Airtel Broadband', partMarche: 0.29, type: 'Fixe', color: '#8B5CF6' },
  ],
};

// ─────────────────────── 12. RISQUES ───────────────────────

export const RISQUES: RisqueInvestisseur[] = [
  {
    risque: 'Taille du marché domestique',
    severite: 'moyen',
    description: "2,4 millions d'habitants — marché petit en volume absolu.",
    attenuation:
      'Cibler la CEMAC (60M habitants) via le Gabon comme hub. PIB/hab PPA ($16 470) compense la taille.',
  },
  {
    risque: 'Cadre réglementaire en évolution',
    severite: 'moyen',
    description: 'Startup Act en préparation. Réglementation fintech (COBAC/BEAC) évolue.',
    attenuation:
      'Code des Investissements de 1998 protège. Smart Africa harmonise. ANPI accompagne.',
  },
  {
    risque: 'Infrastructure intérieure',
    severite: 'faible',
    description:
      'Fibre et 4G couvrent 94%, mais routes intérieures restent un défi pour la logistique.',
    attenuation: 'Modèle digital-first (livraison urbaine). Programme RAG renforce le backbone.',
  },
  {
    risque: 'Dépendance aux hydrocarbures',
    severite: 'moyen',
    description: '60% des revenus État du pétrole. Chute des cours impacte budgets publics.',
    attenuation:
      'Gabon Digital ($72,4M) financé par bailleurs multilatéraux, pas budget pétrolier.',
  },
  {
    risque: 'Capital humain limité',
    severite: 'haute',
    description: 'Vivier développeurs/ingénieurs restreint comparé Nigeria/Kenya.',
    attenuation:
      'SING (2 300+), CGI/SADA, Huawei (1 000), DigiEmpower. Pipeline en forte croissance.',
  },
];

// ─────────────────────── 13. GABON DIGITAL 2030 ───────────────────────

export const GABON_DIGITAL_VISION = {
  badge: '🔮 Vision 2030',
  title: 'Gabon Digital : La Transformation en Cours',
  subtitle: "Le plus grand programme de transformation numérique d'Afrique centrale",
  keyFigures: [
    { value: '41 Mds', suffix: 'FCFA', label: 'Financement Banque Mondiale', icon: Globe },
    { value: '82 Mds', suffix: 'FCFA', label: 'Budget numérique 2026 (+156%)', icon: TrendingUp },
    { value: '300', label: 'Services publics à numériser', icon: Server },
    { value: '20 000', label: 'Emplois TIC visés (PNDT)', icon: Users },
  ],
  projects: [
    'Plateforme e-gouvernance interopérable',
    'Data Center souverain ultramoderne',
    'Réhabilitation du RAG',
    'SIGFIP — Gestion Finances Publiques',
    'MADIGIPAIE — Paiements publics',
    'FUP — Fichier Unique de Participation',
    'NIP biométrique — Identité nationale numérique',
    'Digitax — Fiscalité digitale ($1B FCFA)',
  ],
  deploymentTimeline: [
    {
      year: '2024',
      milestone: "Lancement Gabon Digital, 1ers appels d'offres",
      status: 'completed' as DeploymentStatus,
    },
    {
      year: '2025',
      milestone: 'POZI 1er VC deal, Minilab VR dans les lycées',
      status: 'completed' as DeploymentStatus,
    },
    {
      year: '2026',
      milestone: 'Data Center opérationnel, 100 services numérisés',
      status: 'in_progress' as DeploymentStatus,
    },
    {
      year: '2027',
      milestone: 'Interopérabilité e-gov complète, NIP biométrique',
      status: 'planned' as DeploymentStatus,
    },
    {
      year: '2028',
      milestone: '200 services numérisés, pilote 5G commercial',
      status: 'planned' as DeploymentStatus,
    },
    {
      year: '2030',
      milestone: '300 services, 20 000 emplois TIC, hub digital CEMAC',
      status: 'planned' as DeploymentStatus,
    },
  ],
  narrative:
    'La SING forme le capital humain, développe les solutions souveraines et incube les prestataires locaux. Pour un investisseur, cela signifie un État devenu premier client tech avec des budgets sécurisés par des bailleurs internationaux.',
};

// ─────────────────────── 14. FAQ ───────────────────────

export const FAQ_INVESTIR = [
  {
    q: "Pourquoi investir dans l'économie numérique gabonaise ?",
    a: "Le Gabon combine une infrastructure télécom mature (94% 4G, 135% pénétration mobile) avec un marché massivement sous-pénétré (33% comptes actifs). Le programme Gabon Digital ($72,4M) crée une commande publique massive. Le premier deal VC étranger (POZI, €650K, oct. 2025) prouve que le marché est 'prenable'. Le PIB/hab PPA de $16 470 (5ème Afrique) garantit un pouvoir d'achat réel.",
  },
  {
    q: 'Comment créer une entreprise au Gabon ?',
    a: "100% en ligne via le Guichet Numérique de l'Investissement (GNI) de l'ANPI-Gabon. Une SARL peut être créée en 3 jours. Formes disponibles : EI, SARL, SA, SAS, SNC, SCS.",
  },
  {
    q: 'Quels avantages fiscaux pour les investisseurs ?',
    a: "3 ans d'exonération IS, suspension TVA importation équipements, amortissements accélérés, avantages supplémentaires en ZIS de Nkok. FONAP offre des prêts bonifiés.",
  },
  {
    q: 'Quel est le ticket minimum pour investir ?',
    a: 'Pas de minimum légal. Le Deal Flow GABON BIZ présente des opportunités de €300K (pre-seed) à €3M+ (Série A). SING Capital opère des tickets de 500K à 15M FCFA.',
  },
  {
    q: 'Le FCFA est-il un risque de change ?',
    a: "Non pour les investisseurs européens. Le FCFA est arrimé à l'Euro à taux fixe (1€ = 655,957 FCFA) garanti par le Trésor français. Zéro risque de change.",
  },
  {
    q: 'Comment la SING accompagne-t-elle les investisseurs ?',
    a: 'Deal flow de 280+ startups, programme SING Capital pour le co-investissement, Digital Factory (SING Logiciels), réseau de mentors et partenaires.',
  },
  {
    q: 'Existe-t-il un Startup Act au Gabon ?',
    a: 'En préparation (projet de loi en discussion). Le VISA Startup délivré par le MENUDI via la SING certifie les startups et facilite leur accès aux marchés publics.',
  },
  {
    q: 'Comment accéder au Dashboard Investisseur ?',
    a: "Cliquez sur 'Dashboard investisseur' ou utilisez la page Démo pour accéder instantanément avec le compte Investisseur pré-configuré.",
  },
];

// ─────────────────────── 15. CTA FINAL ───────────────────────

export const CTA_FINAL = {
  title: "Prêt à investir dans la prochaine licorne d'Afrique Centrale ?",
  subtitle:
    'Accédez au dashboard investisseur complet : deal flow, simulateur ROI, données macro et due diligence pays.',
  actions: [
    { label: 'Dashboard Investisseur (Démo)', href: '/demo', variant: 'primary', icon: BarChart3 },
    {
      label: "Contacter l'ANPI",
      href: 'https://gfranchise.ga',
      variant: 'outline',
      external: true,
      icon: ExternalLink,
    },
    {
      label: 'Contacter la SING',
      href: 'https://www.sing.ga',
      variant: 'outline',
      external: true,
      icon: ExternalLink,
    },
  ],
};

// ─────────────────────── DEAL FLOW (Dashboard) ───────────────────────

export const DEAL_FLOW: DealPipeline[] = [
  {
    id: 'deal-1',
    startup: 'CaPay',
    secteur: 'FinTech',
    stade: 'Seed',
    montantRecherche: '€500K',
    valorisation: '€2M',
    metriques: '10K users, +200%/an',
    statut: 'ouvert',
  },
  {
    id: 'deal-2',
    startup: 'Orema',
    secteur: 'HealthTech',
    stade: 'Pre-Seed',
    montantRecherche: '€300K',
    valorisation: '€1M',
    metriques: '500 consultations/mois',
    statut: 'ouvert',
  },
  {
    id: 'deal-3',
    startup: 'ShopEasy Gabon',
    secteur: 'e-Commerce',
    stade: 'Seed',
    montantRecherche: '€750K',
    valorisation: '€3M',
    metriques: '2K commandes/mois, panier moyen 45K FCFA',
    statut: 'en_discussion',
  },
  {
    id: 'deal-4',
    startup: 'GATAX',
    secteur: 'FinTech',
    stade: 'Post-Seed',
    montantRecherche: '€1M',
    valorisation: '€4M',
    metriques: '150 entreprises clientes, MRR 5M FCFA',
    statut: 'terme_sheet',
  },
  {
    id: 'deal-5',
    startup: 'AgriTrack',
    secteur: 'AgriTech',
    stade: 'Pre-Seed',
    montantRecherche: '€200K',
    valorisation: '€800K',
    metriques: '50 exploitations pilotes',
    statut: 'ouvert',
  },
  {
    id: 'deal-6',
    startup: 'La Numérithèque',
    secteur: 'GovTech',
    stade: 'Série A',
    montantRecherche: '€2M',
    valorisation: '€8M',
    metriques: '3 contrats gouvernementaux, CA 120M FCFA',
    statut: 'en_discussion',
  },
];

export const DEAL_STATUS_CONFIG: Record<DealStatut, { label: string; color: string }> = {
  ouvert: { label: 'Ouvert', color: '#10B981' },
  en_discussion: { label: 'En discussion', color: '#F59E0B' },
  terme_sheet: { label: 'Term Sheet', color: '#3B82F6' },
  cloture: { label: 'Clôturé', color: '#6B7280' },
};

// ─────────────────────── VEILLE SECTORIELLE (Dashboard) ───────────────────────

export const VEILLE_NEWS: VeilleItem[] = [
  {
    date: '2026-03-10',
    title: 'Budget numérique 2026 : +156% à 82 Mds FCFA',
    source: 'MENUDI',
    category: 'Politique',
    impact: 'positif',
    summary: 'Le gouvernement triple presque le budget numérique.',
  },
  {
    date: '2026-03-05',
    title: 'Gabon Tech & Innovation Week annoncé pour juillet 2026',
    source: 'SING SA',
    category: 'Événement',
    impact: 'neutre',
    summary: '1 500 participants attendus. Hackathon, Demo Day et networking.',
  },
  {
    date: '2026-02-28',
    title: 'Clubs Numériques Minilab : VR dans les lycées gabonais',
    source: 'SING / Institut Français',
    category: 'Éducation',
    impact: 'positif',
    summary: 'Initiative pionnière de démocratisation tech dans le secondaire.',
  },
  {
    date: '2026-02-15',
    title: "POZI annonce son expansion en Côte d'Ivoire",
    source: 'POZI / Saviu Ventures',
    category: 'Deal Flow',
    impact: 'positif',
    summary: "Première startup gabonaise à lever du VC et à s'internationaliser.",
  },
  {
    date: '2026-01-20',
    title: 'Startup Act Gabon : projet de loi en discussion',
    source: 'Assemblée Nationale',
    category: 'Réglementation',
    impact: 'positif',
    summary: 'Statut fiscal avantageux pour les startups certifiées VISA.',
  },
];

export const VEILLE_TREND_INDICATORS = [
  { label: 'Sentiment investisseur', value: 'Positif ↑', color: '#10B981', trend: 'up' as const },
  {
    label: 'Activité Deal Flow',
    value: '6 deals ouverts',
    color: '#3B82F6',
    trend: 'stable' as const,
  },
  {
    label: 'Cadre réglementaire',
    value: 'En amélioration',
    color: '#F59E0B',
    trend: 'up' as const,
  },
  { label: 'Infrastructure', value: 'Mature', color: '#10B981', trend: 'stable' as const },
];

export const VEILLE_ALERT_SECTORS = [
  'FinTech',
  'GovTech',
  'HealthTech',
  'e-Commerce',
  'AgriTech',
  'EdTech',
];
export const VEILLE_ALERT_TYPES = [
  'Deal Flow',
  'Réglementation',
  'Politique',
  'Événement',
  'Partenariat',
];

// ─────────────────────── DASHBOARD HUB ───────────────────────

export const INVESTIR_HUB_STATS = [
  { label: 'Startups actives', value: '100+', icon: Building2 },
  { label: 'Startups incubées SING', value: '38', icon: Rocket },
  { label: 'Levée VC cumulée', value: '€650K', icon: TrendingUp },
  { label: 'Programme Gabon Digital', value: '44 Mds FCFA', icon: Globe },
];

export const INVESTIR_HUB_MODULES = [
  {
    title: 'Opportunités Sectorielles',
    icon: Rocket,
    href: '/dashboard/investir/opportunites',
    color: '#10B981',
    badge: '6 verticales',
  },
  {
    title: 'Dashboard Macroéconomique',
    icon: BarChart3,
    href: '/dashboard/investir/macro',
    color: '#3B82F6',
    badge: 'BAD 2025',
  },
  {
    title: 'Due Diligence Pays',
    icon: FileSearch,
    href: '/dashboard/investir/due-diligence',
    color: '#8B5CF6',
    badge: 'Export PDF',
  },
  {
    title: 'Simulateur ROI',
    icon: Calculator,
    href: '/dashboard/investir/simulateur',
    color: '#F59E0B',
    badge: 'NOUVEAU',
  },
  {
    title: 'Veille & Alertes',
    icon: Bell,
    href: '/dashboard/investir/veille',
    color: '#EF4444',
    badge: 'NOUVEAU',
  },
];
