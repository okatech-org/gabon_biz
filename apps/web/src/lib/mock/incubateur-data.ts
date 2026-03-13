import type {
  Programme,
  Pilier,
  SuccessStory,
  ProgrammeReel,
  SecteurNormalise,
} from './incubateur-types';

// Re-export all types
export * from './incubateur-types';

// ═══════════════════════════════════════════════════════════════════════════
// SECTEUR MAPPING (55 bruts → 18 normalisés)
// ═══════════════════════════════════════════════════════════════════════════

export const SECTEUR_MAPPING: Record<string, SecteurNormalise> = {
  'E-SANTE': 'SANTE', 'ESANTE': 'SANTE', 'SANTE': 'SANTE',
  'TRANSPORT': 'TRANSPORT', 'LOGISTIQUE': 'TRANSPORT',
  'AGRICULTURE': 'AGRICULTURE', 'AGRICOLE': 'AGRICULTURE', 'AGROALIMENTAIRE': 'AGRICULTURE',
  'ALIMENTATION': 'AGRICULTURE', 'AVICULTURE': 'AGRICULTURE', 'PECHE': 'AGRICULTURE',
  'E-COMMERCE': 'COMMERCE', 'E COMMERCE': 'COMMERCE',
  'EDTECH': 'EDTECH',
  'FINTECH': 'FINTECH', 'E-FINANCE': 'FINTECH', 'FINANCE': 'FINTECH',
  'FISCALITE': 'FINTECH', 'ASSURANCE': 'FINTECH',
  'COMMUNICATION': 'COMMUNICATION', 'MARKETING': 'COMMUNICATION',
  'EVENEMENTIEL': 'EVENEMENTIEL',
  'ENVIRONNEMENT': 'ENVIRONNEMENT', 'E-ENVIRONNEMENT': 'ENVIRONNEMENT', 'ENERGIE': 'ENVIRONNEMENT',
  'INFORMATIQUE': 'TECH_IT', 'IT': 'TECH_IT', 'NTIC': 'TECH_IT',
  'CYBERSECURITE': 'TECH_IT', 'CYBER SECURITE': 'TECH_IT', 'IA': 'TECH_IT',
  'TOURISME': 'TOURISME', 'E-TOURISME': 'TOURISME', 'E-DATING': 'TOURISME',
  'E-GOV': 'GOUVERNANCE', 'ADMINISTRATION': 'GOUVERNANCE', 'JURIDIQUE': 'GOUVERNANCE',
  'INDUSTRIE': 'INDUSTRIE', 'E-INDUSTRIE': 'INDUSTRIE', 'BTP': 'INDUSTRIE',
  'ART': 'ART_CULTURE', 'ART & CULTURE': 'ART_CULTURE', 'DIVERTISSEMENT': 'ART_CULTURE',
  'MODE': 'ART_CULTURE', 'COSMETIQUE': 'ART_CULTURE', 'PARFUMERIE': 'ART_CULTURE', 'COUTURE': 'ART_CULTURE',
  'IMMOBILIER': 'IMMOBILIER', 'MOBILIER': 'IMMOBILIER',
  'RESTAURATION': 'RESTAURATION',
  'SECURITE': 'SECURITE',
  'CONSEIL': 'CONSEIL', 'PLACEMENT DE PERSONNEL': 'CONSEIL', 'SPORT': 'CONSEIL', 'ARTISANAT': 'CONSEIL',
};

export const SECTEUR_CONFIG: Record<SecteurNormalise, { label: string; icon: string; color: string }> = {
  SANTE:          { label: "Santé & E-Santé",        icon: "Heart",           color: "#EF4444" },
  TRANSPORT:      { label: "Transport & Logistique",  icon: "Truck",           color: "#3B82F6" },
  AGRICULTURE:    { label: "Agriculture & Agro",      icon: "Leaf",            color: "#22C55E" },
  COMMERCE:       { label: "E-Commerce",              icon: "ShoppingCart",    color: "#F59E0B" },
  EDTECH:         { label: "EdTech & Formation",      icon: "GraduationCap",   color: "#8B5CF6" },
  FINTECH:        { label: "FinTech & Finance",       icon: "Banknote",        color: "#14B8A6" },
  COMMUNICATION:  { label: "Communication & Média",   icon: "Megaphone",       color: "#EC4899" },
  EVENEMENTIEL:   { label: "Événementiel",            icon: "Calendar",        color: "#F97316" },
  ENVIRONNEMENT:  { label: "Environnement & Énergie", icon: "TreePine",        color: "#059669" },
  TECH_IT:        { label: "Tech & Cybersécurité",    icon: "Shield",          color: "#6366F1" },
  TOURISME:       { label: "Tourisme & Loisirs",      icon: "MapPin",          color: "#0EA5E9" },
  GOUVERNANCE:    { label: "GovTech & Admin",         icon: "Landmark",        color: "#64748B" },
  INDUSTRIE:      { label: "Industrie & BTP",         icon: "Factory",         color: "#78716C" },
  ART_CULTURE:    { label: "Art, Culture & Mode",     icon: "Palette",         color: "#D946EF" },
  IMMOBILIER:     { label: "Immobilier",              icon: "Building",        color: "#0D9488" },
  RESTAURATION:   { label: "Restauration",            icon: "UtensilsCrossed", color: "#DC2626" },
  SECURITE:       { label: "Sécurité",                icon: "Lock",            color: "#1E293B" },
  CONSEIL:        { label: "Conseil & Services",      icon: "Briefcase",       color: "#9333EA" },
};

// ═══════════════════════════════════════════════════════════════════════════
// HERO STATS RÉELLES
// ═══════════════════════════════════════════════════════════════════════════

export const HERO_STATS_REELLES = {
  startupsIncubees: { value: 218, display: "218", label: "Startups incubées" },
  startupsActives: { value: 113, display: "113", label: "Startups actives" },
  emploisCrees: { value: 492, display: "492", label: "Emplois créés" },
  programmes: { value: 21, display: "21", label: "Programmes" },
  tauxActivite: { value: 51.8, display: "51,8%", label: "Taux d'activité" },
  tauxMaturite: { value: 33.0, display: "33%", label: "Taux de maturité" },
  tauxFormalisation: { value: 32.6, display: "32,6%", label: "Taux de formalisation" },
};

// ═══════════════════════════════════════════════════════════════════════════
// PROGRAMMES RÉELS SING (17)
// ═══════════════════════════════════════════════════════════════════════════

export const PROGRAMMES_REELS: ProgrammeReel[] = [
  {
    id: 'techclinic', name: "TechClinic BOOST & WIN", rawName: "TECHCLINIC",
    pilier: "Pivot 4.0", totalStartups: 106, startupsActives: 54, startupsMatures: 33,
    startupsFormalisees: 29, totalEmplois: 180, color: "#3B82F6", icon: "Stethoscope",
    description: "Programme phare de diagnostic et accélération. Diagnostic technique 360°, restructuration business model, connexion réseau Digital Africa. 106 startups accompagnées depuis sa création.",
  },
  {
    id: 'cohorte-innovation-4-fef', name: "Cohorte Innovation 4.0 — Édition FEF", rawName: "COHORTE INNOVATION 4.0 EDITION FEF",
    pilier: "Pivot 4.0", totalStartups: 34, startupsActives: 26, startupsMatures: 20,
    startupsFormalisees: 21, totalEmplois: 107, color: "#EC4899", icon: "Rocket",
    description: "Édition spéciale du programme phare soutenue par le Fonds Équipe France (FEF). 3 mois d'incubation intensive avec coworking, mentoring, pitch day investisseurs.",
  },
  {
    id: 'cohorte-innovation-4', name: "Cohorte Innovation 4.0", rawName: "COHORTE INNOVATION 4.0",
    pilier: "Pivot 4.0", totalStartups: 11, startupsActives: 7, startupsMatures: 5,
    startupsFormalisees: 6, totalEmplois: 37, color: "#ec4899", icon: "Rocket",
    description: "Programme phare d'incubation intensive. 3 mois d'accompagnement gratuit : espace de coworking, mentoring hebdomadaire, accès au réseau SING et pitch day final devant investisseurs.",
  },
  {
    id: 'agrifutur', name: "AGRI'FUTUR", rawName: "AGRI'FUTUR",
    pilier: "Partenaire", totalStartups: 10, startupsActives: 10, startupsMatures: 8,
    startupsFormalisees: 5, totalEmplois: 33, color: "#22C55E", icon: "Sprout",
    description: "Programme dédié à l'innovation agricole et agroalimentaire. Accompagnement des startups AgriTech du Gabon vers la structuration et la mise à l'échelle.",
  },
  {
    id: 'welp', name: "WELP", rawName: "WELP",
    pilier: "Pivot 4.0", totalStartups: 9, startupsActives: 9, startupsMatures: 4,
    startupsFormalisees: 9, totalEmplois: 42, color: "#F97316", icon: "Handshake",
    description: "Programme d'accompagnement à l'entrepreneuriat et au leadership. Soutien aux porteurs de projets dans la formalisation et le développement de leur activité.",
  },
  {
    id: 'entreprendre-feminin', name: "Entreprendre au Féminin", rawName: "ENTREPRENDRE AU FEMININ",
    pilier: "Pivot 4.0", totalStartups: 8, startupsActives: 5, startupsMatures: 3,
    startupsFormalisees: 4, totalEmplois: 17, color: "#D946EF", icon: "Heart",
    description: "Programme dédié à l'entrepreneuriat féminin numérique au Gabon. Mentoring spécialisé, réseau d'entrepreneures, accès à des financements dédiés.",
  },
  {
    id: 'e-startup-challenge', name: "E-Startup Challenge", rawName: "E-STARTUP CHALLENGE",
    pilier: "Pivot 4.0", totalStartups: 8, startupsActives: 7, startupsMatures: 6,
    startupsFormalisees: 5, totalEmplois: 34, color: "#14B8A6", icon: "Trophy",
    description: "Compétition nationale de startups numériques. Les lauréats bénéficient d'un accompagnement personnalisé et de connexions avec l'écosystème tech.",
  },
  {
    id: 'moov-startup-challenge', name: "Moov Startup Challenge", rawName: "MOOV STARTUP CHALLENGE",
    pilier: "Partenaire", totalStartups: 7, startupsActives: 2, startupsMatures: 2,
    startupsFormalisees: 2, totalEmplois: 14, color: "#6366F1", icon: "Smartphone",
    description: "Challenge startup en partenariat avec Moov Africa. Accompagnement des projets tech mobiles et télécoms.",
  },
  {
    id: 'entrepreneur-impact', name: "Entrepreneur d'Impact", rawName: "ENTREPRENEUR D'IMPACT",
    pilier: "Pivot 4.0", totalStartups: 5, startupsActives: 5, startupsMatures: 5,
    startupsFormalisees: 5, totalEmplois: 51, color: "#059669", icon: "Target",
    description: "Programme sélectif pour les entrepreneurs à fort impact socioéconomique. Accompagnement intensif vers le scaling et l'attraction d'investisseurs.",
  },
  {
    id: 'e-sante', name: "E-Santé", rawName: "E-Santé",
    pilier: "Pivot 4.0", totalStartups: 3, startupsActives: 1, startupsMatures: 1,
    startupsFormalisees: 1, totalEmplois: 3, color: "#EF4444", icon: "HeartPulse",
    description: "Programme vertical dédié aux innovations en santé numérique au Gabon. Télémédecine, gestion hospitalière, pharmacie en ligne.",
  },
  {
    id: 'pantheres', name: "Panthères", rawName: "PANTHERES",
    pilier: "Pivot 4.0", totalStartups: 2, startupsActives: 2, startupsMatures: 2,
    startupsFormalisees: 2, totalEmplois: 10, color: "#1E293B", icon: "Zap",
    description: "Programme d'élite pour les startups à fort potentiel de croissance internationale. Accompagnement premium et connexion directe avec les investisseurs.",
  },
  {
    id: 'mentorat-1000', name: "Mentorat Challenge 1000 Entrepreneurs", rawName: "MENTORAT CHALLENGE 1000 ENTREPRENEURS",
    pilier: "Partenaire", totalStartups: 2, startupsActives: 2, startupsMatures: 2,
    startupsFormalisees: 2, totalEmplois: 14, color: "#F59E0B", icon: "Users",
    description: "Programme de mentorat massif visant à accompagner 1000 entrepreneurs gabonais dans leur parcours de création d'entreprise.",
  },
  {
    id: 'hackathon-sport', name: "Hackathon Sport & Numérique", rawName: "HACKATHON SPORT & NUMERIQUE",
    pilier: "Partenaire", totalStartups: 2, startupsActives: 2, startupsMatures: 0,
    startupsFormalisees: 0, totalEmplois: 6, color: "#0EA5E9", icon: "Dumbbell",
    description: "Hackathon dédié à l'innovation dans le sport gabonais. Solutions numériques pour la gestion sportive, le e-sport et la promotion du sport.",
  },
  {
    id: 'prodece', name: "PRODECE", rawName: "PRODECE",
    pilier: "Partenaire", totalStartups: 2, startupsActives: 1, startupsMatures: 1,
    startupsFormalisees: 1, totalEmplois: 6, color: "#78716C", icon: "Briefcase",
    description: "Programme de développement de compétences entrepreneuriales. Accompagnement des porteurs de projets vers la structuration économique.",
  },
  {
    id: 'hackathon-airtel', name: "Hackathon Airtel", rawName: "HACKATHON AIRTEL",
    pilier: "Partenaire", totalStartups: 2, startupsActives: 1, startupsMatures: 1,
    startupsFormalisees: 0, totalEmplois: 4, color: "#DC2626", icon: "Wifi",
    description: "Challenge en partenariat avec Airtel Gabon. Innovation dans les services mobiles, la connectivité et les solutions de paiement.",
  },
  {
    id: 'pepiniere-pme', name: "Pépinière PME", rawName: "PEPINIERE PME",
    pilier: "SING Conseil", totalStartups: 2, startupsActives: 2, startupsMatures: 2,
    startupsFormalisees: 2, totalEmplois: 24, color: "#9333EA", icon: "TreePine",
    description: "Pépinière d'entreprises pour les PME en phase de croissance. Hébergement, accompagnement et mise en réseau.",
  },
  {
    id: 'smartgog', name: "SmartGOG", rawName: "SMARTGOG",
    pilier: "Pivot 4.0", totalStartups: 1, startupsActives: 0, startupsMatures: 0,
    startupsFormalisees: 0, totalEmplois: 0, color: "#64748B", icon: "Building2",
    description: "Programme de digitalisation des services gouvernementaux. Solutions SmartCity et e-gouvernance pour le Gabon.",
  },
];

// ═══════════════════════════════════════════════════════════════════════════
// STATS PAR PROGRAMME
// ═══════════════════════════════════════════════════════════════════════════

export const STATS_PAR_PROGRAMME: Record<string, { total: number; actifs: number; matures: number; formalises: number; emplois: number; top: number }> = {
  'techclinic':               { total: 106, actifs: 54, matures: 33, formalises: 29, emplois: 180, top: 25 },
  'cohorte-innovation-4-fef': { total: 34,  actifs: 26, matures: 20, formalises: 21, emplois: 107, top: 16 },
  'cohorte-innovation-4':     { total: 15,  actifs: 9,  matures: 7,  formalises: 8,  emplois: 41,  top: 6  },
  'agrifutur':                { total: 10,  actifs: 10, matures: 8,  formalises: 5,  emplois: 33,  top: 2  },
  'welp':                     { total: 9,   actifs: 9,  matures: 4,  formalises: 9,  emplois: 42,  top: 4  },
  'entreprendre-feminin':     { total: 8,   actifs: 5,  matures: 3,  formalises: 4,  emplois: 17,  top: 2  },
  'e-startup-challenge':      { total: 8,   actifs: 7,  matures: 6,  formalises: 5,  emplois: 34,  top: 5  },
  'moov-startup-challenge':   { total: 7,   actifs: 2,  matures: 2,  formalises: 2,  emplois: 14,  top: 1  },
  'entrepreneur-impact':      { total: 5,   actifs: 5,  matures: 5,  formalises: 5,  emplois: 51,  top: 5  },
  'e-sante':                  { total: 3,   actifs: 1,  matures: 1,  formalises: 1,  emplois: 3,   top: 0  },
  'pantheres':                { total: 2,   actifs: 2,  matures: 2,  formalises: 2,  emplois: 10,  top: 2  },
  'mentorat-1000':            { total: 2,   actifs: 2,  matures: 2,  formalises: 2,  emplois: 14,  top: 2  },
  'hackathon-sport':          { total: 2,   actifs: 2,  matures: 0,  formalises: 0,  emplois: 6,   top: 0  },
  'prodece':                  { total: 2,   actifs: 1,  matures: 1,  formalises: 1,  emplois: 6,   top: 1  },
  'hackathon-airtel':         { total: 2,   actifs: 1,  matures: 1,  formalises: 0,  emplois: 4,   top: 0  },
  'pepiniere-pme':            { total: 2,   actifs: 2,  matures: 2,  formalises: 2,  emplois: 24,  top: 2  },
  'smartgog':                 { total: 1,   actifs: 0,  matures: 0,  formalises: 0,  emplois: 0,   top: 0  },
};

// ═══════════════════════════════════════════════════════════════════════════
// STATS PAR SECTEUR NORMALISÉ
// ═══════════════════════════════════════════════════════════════════════════

export const STATS_PAR_SECTEUR: Record<SecteurNormalise, { total: number; actifs: number; emplois: number }> = {
  AGRICULTURE:    { total: 31, actifs: 20, emplois: 83 },
  TRANSPORT:      { total: 27, actifs: 13, emplois: 53 },
  SANTE:          { total: 19, actifs: 9,  emplois: 83 },
  FINTECH:        { total: 14, actifs: 3,  emplois: 14 },
  COMMERCE:       { total: 13, actifs: 4,  emplois: 11 },
  EVENEMENTIEL:   { total: 12, actifs: 9,  emplois: 36 },
  COMMUNICATION:  { total: 12, actifs: 7,  emplois: 24 },
  ART_CULTURE:    { total: 12, actifs: 5,  emplois: 14 },
  TECH_IT:        { total: 12, actifs: 7,  emplois: 12 },
  EDTECH:         { total: 11, actifs: 6,  emplois: 16 },
  ENVIRONNEMENT:  { total: 10, actifs: 5,  emplois: 17 },
  INDUSTRIE:      { total: 10, actifs: 6,  emplois: 20 },
  CONSEIL:        { total: 7,  actifs: 5,  emplois: 15 },
  TOURISME:       { total: 7,  actifs: 4,  emplois: 13 },
  GOUVERNANCE:    { total: 6,  actifs: 1,  emplois: 5 },
  IMMOBILIER:     { total: 5,  actifs: 3,  emplois: 9 },
  RESTAURATION:   { total: 4,  actifs: 3,  emplois: 34 },
  SECURITE:       { total: 2,  actifs: 1,  emplois: 12 },
};

// ═══════════════════════════════════════════════════════════════════════════
// PILIERS SING (4) — stats mises à jour
// ═══════════════════════════════════════════════════════════════════════════
export const PILIERS_SING: Pilier[] = [
  {
    id: 'pivot40', name: 'Pivot 4.0', subtitle: 'Incubation & Accélération',
    iconName: 'Rocket', color: '#ec4899',
    description: "Le cœur de l'incubation : accompagnement de l'idéation au scale-up avec 17 programmes spécialisés.",
    stats: [
      { label: 'Startups incubées', value: '218' },
      { label: "Taux d'activité", value: '51,8%' },
      { label: 'Taux de formalisation', value: '32,6%' },
    ],
    programmes: ['TechClinic BOOST & WIN', 'Cohorte Innovation 4.0', 'WELP', 'Entreprendre au Féminin', 'Panthères', 'E-Startup Challenge'],
  },
  {
    id: 'sing-capital', name: 'SING Capital', subtitle: 'Financement & Investissement',
    iconName: 'Banknote', color: '#10B981',
    description: "Le bras financier : fonds d'amorçage en partenariat avec Okoumé Capital et PNUD.",
    stats: [
      { label: 'Emplois créés', value: '492' },
      { label: 'Startups financées', value: '71' },
      { label: 'Programmes', value: '21' },
    ],
    programmes: ['Prêts participatifs', 'Prise de participation', 'Avances remboursables'],
  },
  {
    id: 'sing-conseil', name: 'SING Conseil', subtitle: 'Conseil & Transformation',
    iconName: 'Lightbulb', color: '#F59E0B',
    description: "L'expertise stratégique : conseil en transformation numérique pour entreprises et administrations.",
    stats: [
      { label: 'Missions réalisées', value: '150+' },
      { label: 'Professionnels certifiés', value: '2 300+' },
      { label: 'Satisfaction', value: '85,35%' },
    ],
    programmes: ['Pépinière PME', 'Audit numérique', 'Formation managériale'],
  },
  {
    id: 'sing-logiciels', name: 'SING Logiciels', subtitle: 'Digital Factory',
    iconName: 'Code', color: '#3B82F6',
    description: "L'usine logicielle souveraine : production d'infrastructures numériques pour l'État et les entreprises.",
    stats: [
      { label: 'Produits développés', value: '30+' },
      { label: 'Emplois directs', value: '500+' },
      { label: 'Projets souverains', value: '5' },
    ],
    programmes: ['La Numérithèque', 'GABON ID CONNECT', 'Musée.GA', 'Bornes eGouv CGI'],
  },
];

// ═══════════════════════════════════════════════════════════════════════════
// SUCCESS STORIES (4) — mises à jour avec données réelles
// ═══════════════════════════════════════════════════════════════════════════
export const SUCCESS_STORIES: SuccessStory[] = [
  {
    startup: 'TRANSMED', quote: 'Startup N°1 de l\'écosystème SING avec 45 emplois directs créés — la santé numérique au service du Gabon.',
    metrics: [
      { label: 'Emplois créés', value: '45', iconName: 'Users' },
      { label: 'Programme', value: 'TechClinic', iconName: 'Stethoscope' },
      { label: 'Secteur', value: 'E-Santé', iconName: 'Heart' },
    ],
    programme: 'TechClinic BOOST & WIN', year: 2020, gradient: 'from-emerald-500 to-teal-600',
  },
  {
    startup: 'YOBORESTO', quote: '30 emplois et une plateforme de restauration qui révolutionne la foodtech gabonaise.',
    metrics: [
      { label: 'Emplois créés', value: '30', iconName: 'Users' },
      { label: 'Site web', value: 'yoboresto.com', iconName: 'Globe' },
      { label: 'Secteur', value: 'Restauration', iconName: 'UtensilsCrossed' },
    ],
    programme: "Entrepreneur d'Impact", year: 2018, gradient: 'from-amber-500 to-orange-600',
  },
  {
    startup: 'Gstore Music', quote: 'Le Spotify gabonais — une success story made in SING.',
    metrics: [
      { label: 'Emplois créés', value: '9', iconName: 'Users' },
      { label: 'Site web', value: 'gstoremusic.com', iconName: 'Globe' },
      { label: 'Secteur', value: 'Art & Culture', iconName: 'Music' },
    ],
    programme: 'Moov Startup Challenge', year: 2017, gradient: 'from-indigo-500 to-violet-600',
  },
  {
    startup: 'POZI', quote: 'La super-app transport de référence au Gabon, passée par le TechClinic.',
    metrics: [
      { label: 'Programme', value: 'TechClinic', iconName: 'Stethoscope' },
      { label: 'Site web', value: 'pozi.app', iconName: 'Globe' },
      { label: 'Secteur', value: 'Transport', iconName: 'Truck' },
    ],
    programme: 'TechClinic BOOST & WIN', year: 2020, gradient: 'from-blue-500 to-cyan-600',
  },
];

// ═══════════════════════════════════════════════════════════════════════════
// IMPACT METRICS — données réelles
// ═══════════════════════════════════════════════════════════════════════════
export const IMPACT_METRICS = [
  { value: 218, suffix: '', label: 'Startups incubées', iconName: 'Building2', color: '#ec4899' },
  { value: 51.8, suffix: '%', label: "Taux d'activité", iconName: 'TrendingUp', color: '#10B981' },
  { value: 492, suffix: '', label: 'Emplois directs créés', iconName: 'Users', color: '#3B82F6' },
  { value: 21, suffix: '', label: 'Programmes', iconName: 'Layers', color: '#F59E0B' },
  { value: 113, suffix: '', label: 'Startups actives', iconName: 'Zap', color: '#8B5CF6' },
  { value: 33, suffix: '%', label: 'Taux de maturité', iconName: 'Award', color: '#6366F1' },
  { value: 32.6, suffix: '%', label: 'Startups formalisées', iconName: 'FileCheck', color: '#14B8A6' },
  { value: 58, suffix: '', label: 'Top startups (A+M+F)', iconName: 'Star', color: '#EF4444' },
  { value: 18, suffix: '', label: 'Secteurs couverts', iconName: 'Grid3X3', color: '#A855F7' },
  { value: 19, suffix: '', label: 'Startups avec site web', iconName: 'Globe', color: '#EC4899' },
];

// ═══════════════════════════════════════════════════════════════════════════
// HERO CONFIG — données réelles
// ═══════════════════════════════════════════════════════════════════════════
export const HERO_SING = {
  badge: 'Incubateur National du Numérique',
  title: 'SING 2.0',
  titleAccent: "L'incubateur qui transforme vos idées en entreprises tech",
  subtitle:
    "De l'idéation au scaling : 21 programmes d'incubation, 218 startups accompagnées, 492 emplois créés. Candidatez maintenant.",
  gradient: 'from-pink-600 via-rose-500 to-fuchsia-600',
  stats: [
    { value: '218', label: 'Startups incubées', iconName: 'Building2' },
    { value: '51,8%', label: "Taux d'activité", iconName: 'TrendingUp' },
    { value: '21', label: 'Programmes', iconName: 'Layers' },
    { value: '492', label: 'Emplois créés', iconName: 'Users' },
  ],
  partners: [
    'MENUDI', 'Okoumé Capital', 'Digital Africa', 'PNUD', 'AFD', 'Banque Mondiale', 'Deloitte', 'OIF',
  ],
};

// ═══════════════════════════════════════════════════════════════════════════
// PORTFOLIO FILTERS — 18 secteurs normalisés
// ═══════════════════════════════════════════════════════════════════════════
export const PORTFOLIO_FILTERS = [
  { label: 'Tous', value: 'all', count: 218 },
  ...Object.entries(STATS_PAR_SECTEUR)
    .sort((a, b) => b[1].total - a[1].total)
    .map(([key, stats]) => ({
      label: SECTEUR_CONFIG[key as SecteurNormalise].label,
      value: key,
      count: stats.total,
    })),
];

// ═══════════════════════════════════════════════════════════════════════════
// MINILAB (inchangé)
// ═══════════════════════════════════════════════════════════════════════════
export const MINILAB_SECTION = {
  title: 'Clubs Numériques Minilab',
  subtitle: 'Démocratiser la tech dès le lycée : VR, coding et patrimoine culturel',
  badge: 'Nouveau 2025',
  establishments: [
    { name: 'Lycée National Léon Mba', city: 'Libreville', status: 'Opérationnel' },
    { name: "Lycée d'Application Nelson Mandela", city: 'Libreville', status: 'Opérationnel' },
    { name: 'Caravane Minilab Intérieur', city: 'Régions', status: 'En déploiement' },
  ],
  features: [
    { iconName: 'Headset', name: 'Réalité Virtuelle', desc: 'Visites immersives du patrimoine gabonais' },
    { iconName: 'Code', name: 'Programmation', desc: 'Initiation au coding avec projets concrets' },
    { iconName: 'Palette', name: 'Environnements Virtuels', desc: "Conception d'espaces 3D interactifs" },
    { iconName: 'Globe', name: 'Patrimoine Numérique', desc: 'Valorisation du patrimoine national' },
  ],
  impact: { eleves: '500+', lycees: '2 (+ caravane)', projetsVR: '15+' },
};

// ═══════════════════════════════════════════════════════════════════════════
// GABON DIGITAL (inchangé)
// ═══════════════════════════════════════════════════════════════════════════
export const GABON_DIGITAL_SECTION = {
  title: 'Au cœur du mégaprojet Gabon Digital',
  subtitle: 'La SING, fer de lance de la transformation numérique nationale',
  badge: 'Vision 2030',
  keyFigures: [
    { value: '41 Mds', suffix: 'FCFA', label: 'Financement Banque Mondiale', iconName: 'Globe' },
    { value: '82 Mds', suffix: 'FCFA', label: 'Budget numérique 2026 (+156%)', iconName: 'TrendingUp' },
    { value: '300', label: 'Services publics à numériser', iconName: 'Server' },
    { value: '20 000', label: 'Emplois TIC visés (PNDT)', iconName: 'Users' },
  ],
  pillars: [
    "Plateforme d'e-gouvernance interopérable",
    'Data Center souverain ultramoderne',
    'Réhabilitation du RAG',
    'SIGFIP — Gestion Finances Publiques',
    'MADIGIPAIE — Paiements électroniques publics',
    'FUP — Fichier Unique de Participation',
  ],
  singRole:
    'La SING forme le capital humain, développe les solutions souveraines et incube les prestataires locaux qui absorberont ces investissements massifs.',
};

// ═══════════════════════════════════════════════════════════════════════════
// SING 300 STRATEGY (inchangé)
// ═══════════════════════════════════════════════════════════════════════════
export const SING_300_SECTION = {
  title: 'Stratégie SING 300',
  subtitle: "La feuille de route pour transformer le Gabon en usine technologique de l'Afrique",
  axes: [
    { number: 1, title: "Maîtriser les risques d'exploitation", description: 'Résolution des passifs historiques, conformité financière et juridique.', iconName: 'Shield', progress: 75 },
    { number: 2, title: 'Renforcer les capacités de production', description: "Extension des espaces d'incubation, recrutement d'experts techniques.", iconName: 'Building2', progress: 60 },
    { number: 3, title: "Développer l'offre à valeur ajoutée", description: 'Industrialisation du conseil stratégique et du développement logiciel.', iconName: 'Zap', progress: 45 },
    { number: 4, title: "Élargir l'empreinte internationale", description: 'Exportation des solutions gabonaises. Présence : Casablanca, Montréal, Québec.', iconName: 'Globe', progress: 50 },
  ],
};

// ═══════════════════════════════════════════════════════════════════════════
// CTA FINAL — données réelles
// ═══════════════════════════════════════════════════════════════════════════
export const CTA_FINAL = {
  title: 'Prêt à transformer votre idée en startup tech ?',
  subtitle: "Rejoignez les 218 entrepreneurs qui ont choisi la SING pour bâtir l'avenir numérique du Gabon.",
  gradient: 'from-pink-600 via-rose-500 to-fuchsia-600',
};

// ═══════════════════════════════════════════════════════════════════════════
// STATUS / STAGE CONFIG (inchangé — utilisé par legacy components)
// ═══════════════════════════════════════════════════════════════════════════
export const STAGE_CONFIG: Record<string, { label: string; color: string }> = {
  PRE_SEED: { label: 'Pré-amorçage', color: '#9CA3AF' },
  SEED: { label: 'Amorçage', color: '#F59E0B' },
  SERIES_A: { label: 'Série A', color: '#10B981' },
  GROWTH: { label: 'Croissance', color: '#3B82F6' },
};

export const STATUS_CONFIG: Record<string, { label: string; color: string }> = {
  OPEN: { label: 'Ouvert', color: '#10B981' },
  COMING_SOON: { label: 'À venir', color: '#F59E0B' },
  IN_PROGRESS: { label: 'En cours', color: '#3B82F6' },
  COMPLETED: { label: 'Terminé', color: '#9CA3AF' },
};

// ═══════════════════════════════════════════════════════════════════════════
// FAQ (inchangé)
// ═══════════════════════════════════════════════════════════════════════════
export const FAQ_SING = [
  { q: "Comment candidater à un programme d'incubation SING ?", a: "Cliquez sur 'Candidater maintenant' en haut de page. Remplissez le formulaire en 5 étapes. Vous recevrez une réponse sous 15 jours ouvrés." },
  { q: "L'incubation est-elle gratuite ?", a: 'Oui, la plupart des programmes SING sont 100% gratuits : Cohorte Innovation 4.0, TechClinic, WELP, Entreprendre au Féminin, etc.' },
  { q: 'Quels sont les critères de sélection ?', a: "Caractère innovant, viabilité économique, qualité de l'équipe, impact au Gabon, et engagement." },
  { q: 'Combien de startups la SING a-t-elle accompagnées ?', a: '218 startups ont été accompagnées par la SING à travers 21 programmes. 113 sont encore actives (51,8%), et 492 emplois directs ont été créés.' },
  { q: "Qu'est-ce que le programme TechClinic ?", a: 'Programme phare de diagnostic et accélération. 106 startups accompagnées, diagnostic technique 360°, restructuration business model.' },
  { q: "Qu'est-ce que la Cohorte Innovation 4.0 ?", a: "Programme d'incubation intensive de 3 mois. L'édition FEF (Fonds Équipe France) a accompagné 34 startups." },
  { q: 'Que sont les Clubs Numériques Minilab ?', a: "Laboratoires d'apprentissage dans les lycées gabonais : réalité virtuelle, coding et conception d'environnements 3D." },
  { q: 'Comment la SING contribue-t-elle à Gabon Digital ?', a: 'La SING développe les solutions souveraines, forme le capital humain (2 300+ certifiés) et incube les prestataires locaux.' },
];

// Legacy alias for backward compatibility
export const PROGRAMMES_SING: Programme[] = [];
