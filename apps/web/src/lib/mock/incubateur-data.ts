import type {
  Programme,
  StartupProfile,
  Mentor,
  Cohorte,
  Evenement,
  Pilier,
  SuccessStory,
  Milestone,
} from './incubateur-types';

// Re-export all types
export * from './incubateur-types';

// ═══════════════════════════════════
// PROGRAMMES SING (7)
// ═══════════════════════════════════
export const PROGRAMMES_SING: Programme[] = [
  {
    id: 'cohorte-innovation',
    name: 'Cohorte Innovation 4.0',
    pilier: 'Pivot 4.0',
    color: '#ec4899',
    iconName: 'Rocket',
    duration: '3 mois',
    cost: 'Gratuit',
    places: { total: 20, remaining: 7 },
    status: 'OPEN',
    nextDate: 'Avril 2026',
    description:
      "Programme phare d'incubation intensive. 3 mois d'accompagnement gratuit avec espace de coworking, mentoring hebdomadaire, accès au réseau SING et pitch day final devant investisseurs.",
    eligibility: [
      'Porteur de projet tech',
      'Prototype fonctionnel (MVP)',
      'Équipe de 2+ personnes',
      'Projet à impact au Gabon',
    ],
    phases: [
      { name: 'Idéation & Design Thinking', weeks: 'S1-S2', iconName: 'Lightbulb' },
      { name: 'Développement MVP', weeks: 'S3-S6', iconName: 'Code' },
      { name: 'Growth & Traction', weeks: 'S7-S10', iconName: 'TrendingUp' },
      { name: 'Pitch Day Investisseurs', weeks: 'S11-S12', iconName: 'Presentation' },
    ],
    alumni: ['CaPay', 'POZI', 'Orema', 'Ekena.ga'],
    successRate: '76%',
    tags: ['Incubation', 'Gratuit', '3 mois'],
  },
  {
    id: 'visa-startup',
    name: 'VISA Startup Gabon',
    pilier: 'Pivot 4.0',
    color: '#F59E0B',
    iconName: 'Award',
    duration: 'En continu',
    cost: 'Gratuit',
    places: { total: null, remaining: null },
    status: 'OPEN',
    nextDate: 'Permanent',
    description:
      "Label officiel délivré par le MENUDI en partenariat avec la SING. Le VISA certifie la qualité et la viabilité d'une startup gabonaise.",
    eligibility: [
      'Startup enregistrée au Gabon',
      "12+ mois d'activité",
      "Chiffre d'affaires démontrable",
      'Solution tech innovante',
    ],
    phases: [
      { name: 'Dossier de candidature', weeks: 'S1', iconName: 'FileText' },
      { name: 'Audit technique Deloitte', weeks: 'S2-S3', iconName: 'Search' },
      { name: 'Comité de labellisation', weeks: 'S4', iconName: 'Users' },
      { name: 'Délivrance VISA', weeks: 'S5', iconName: 'Award' },
    ],
    alumni: ['GATAX', 'Ultimate CRM', 'Gstore Music'],
    successRate: '58%',
    tags: ['Label', 'Certification', 'Marchés publics'],
  },
  {
    id: 'techclinic-boost',
    name: 'TechClinic BOOST & WIN',
    pilier: 'Pivot 4.0',
    color: '#3B82F6',
    iconName: 'Stethoscope',
    duration: '6 semaines',
    cost: 'Gratuit',
    places: { total: 15, remaining: 3 },
    status: 'OPEN',
    nextDate: 'Mai 2026',
    description:
      "Programme d'accélération intensif co-financé par Digital Africa et le Fonds FUZÉ. Diagnostic technique, restructuration business model, connexion réseau Digital Africa.",
    eligibility: [
      'Startup en phase de traction',
      'Produit lancé',
      'Besoin de structuration technique',
      'Ambition panafricaine',
    ],
    phases: [
      { name: 'Diagnostic 360°', weeks: 'S1-S2', iconName: 'Scan' },
      { name: 'Sprint Technique', weeks: 'S3-S4', iconName: 'Wrench' },
      { name: 'Business Model Canvas', weeks: 'S5', iconName: 'LayoutGrid' },
      { name: 'Demo Day Digital Africa', weeks: 'S6', iconName: 'Globe' },
    ],
    alumni: ['Panafricom', 'Mon Assurance', "DUK' OBIERI"],
    successRate: '82%',
    tags: ['Accélération', 'Digital Africa', 'International'],
  },
  {
    id: 'welp',
    name: 'WELP — Women Empowerment',
    pilier: 'Pivot 4.0',
    color: '#A855F7',
    iconName: 'Heart',
    duration: '4 mois',
    cost: 'Gratuit',
    places: { total: 12, remaining: 5 },
    status: 'COMING_SOON',
    nextDate: 'Juin 2026',
    description:
      "Programme d'incubation dédié aux femmes entrepreneures du numérique. Accompagnement renforcé avec mentorat féminin et accès privilégié au financement.",
    eligibility: [
      'Femme porteuse de projet tech',
      'Idée ou prototype',
      'Basée au Gabon',
      'Engagement 4 mois',
    ],
    phases: [
      { name: 'Bootcamp Leadership', weeks: 'S1-S2', iconName: 'Crown' },
      { name: 'Incubation Technique', weeks: 'S3-S10', iconName: 'Code' },
      { name: 'Mentorat Premium', weeks: 'S11-S14', iconName: 'HeartHandshake' },
      { name: 'Pitch & Financement', weeks: 'S15-S16', iconName: 'Banknote' },
    ],
    alumni: ['USHANN', 'ShopEasy'],
    successRate: '71%',
    tags: ['Femmes', 'Leadership', '4 mois'],
  },
  {
    id: 'smartgov',
    name: "SmartGov — Startups d'État",
    pilier: 'Pivot 4.0',
    color: '#6366F1',
    iconName: 'Building',
    duration: '8 semaines',
    cost: "Financé par l'État",
    places: { total: 10, remaining: 0 },
    status: 'IN_PROGRESS',
    nextDate: 'Prochaine édition : Sept 2026',
    description:
      "Programme de co-création de solutions numériques avec l'administration publique. Concept 'Startup d'État' : équipes agiles dans les ministères.",
    eligibility: [
      'Startup ou équipe tech',
      'Expertise GovTech',
      "Capacité d'intégration institutionnelle",
      'Solution scalable',
    ],
    phases: [
      { name: 'MeetUp & Idéation', weeks: 'S1', iconName: 'MessageSquare' },
      { name: 'Hackathon 48h', weeks: 'S2', iconName: 'Timer' },
      { name: 'Incubation Sprint', weeks: 'S3-S6', iconName: 'Zap' },
      { name: 'Déploiement Pilote', weeks: 'S7-S8', iconName: 'Server' },
    ],
    alumni: ['Allo Mairie', 'eGouv Borne CGI', 'E-vaccin'],
    successRate: '90%',
    tags: ['GovTech', 'État', 'Administration'],
  },
  {
    id: 'hackathons',
    name: 'Hackathons SING',
    pilier: 'Pivot 4.0',
    color: '#EF4444',
    iconName: 'Trophy',
    duration: '48-72h',
    cost: 'Gratuit + Prix',
    places: { total: 200, remaining: 85 },
    status: 'COMING_SOON',
    nextDate: 'Gabon Tech Week — Juillet 2026',
    description:
      "Marathons d'innovation ouverts à tous. 48 à 72h pour prototyper une solution tech répondant à un défi national. Prix : financement d'amorçage.",
    eligibility: [
      'Ouvert à tous',
      'Développeurs, designers, entrepreneurs',
      'Équipes de 3-5 personnes',
      "Passion pour l'innovation",
    ],
    phases: [
      { name: 'Inscription & Team Building', weeks: 'J-30', iconName: 'Users' },
      { name: 'Kickoff & Briefing Défis', weeks: 'J1', iconName: 'Flag' },
      { name: '48-72h de Sprint', weeks: 'J1-J3', iconName: 'Code' },
      { name: 'Pitch & Jury Final', weeks: 'J3', iconName: 'Award' },
    ],
    alumni: [],
    successRate: null,
    tags: ['Hackathon', '48h', 'Prix', 'Ouvert'],
    impactStats: {
      totalParticipants: 1736,
      womenRate: '29%',
      prototypes: '80+',
      avgPrize: '1 000 000 FCFA',
    },
  },
  {
    id: 'sing-capital',
    name: "SING Capital — Fonds d'Amorçage",
    pilier: 'SING Capital',
    color: '#10B981',
    iconName: 'Banknote',
    duration: 'Variable',
    cost: 'Investissement',
    places: { total: null, remaining: null },
    status: 'OPEN',
    nextDate: 'Candidatures permanentes',
    description:
      "Bras financier de la SING en partenariat avec Okoumé Capital et le PNUD. Financement d'amorçage de 500K à 15M FCFA.",
    eligibility: [
      'Startup incubée SING (ou alumni)',
      'Traction démontrée',
      'Besoin documenté',
      'Business plan solide',
    ],
    phases: [
      { name: 'Dossier de financement', weeks: 'S1-S2', iconName: 'FileText' },
      { name: 'Due diligence', weeks: 'S3-S5', iconName: 'Search' },
      { name: "Comité d'investissement", weeks: 'S6', iconName: 'Users' },
      { name: 'Closing & Suivi', weeks: 'S7+', iconName: 'Handshake' },
    ],
    alumni: ['Gstore Music (180M FCFA)', 'CaPay', 'POZI'],
    successRate: null,
    tags: ['Financement', 'Amorçage', 'Okoumé Capital'],
    fundingRange: { min: 500000, max: 15000000, currency: 'FCFA' },
  },
];

// ═══════════════════════════════════
// PILIERS SING (4)
// ═══════════════════════════════════
export const PILIERS_SING: Pilier[] = [
  {
    id: 'pivot40',
    name: 'Pivot 4.0',
    subtitle: 'Incubation & Accélération',
    iconName: 'Rocket',
    color: '#ec4899',
    description:
      "Le cœur de l'incubation : accompagnement de l'idéation au scale-up avec 7 programmes spécialisés.",
    stats: [
      { label: 'Startups incubées', value: '280+' },
      { label: 'Taux de survie', value: '76%' },
      { label: 'Taux de formalisation', value: '58%' },
    ],
    programmes: [
      'Cohorte Innovation 4.0',
      'VISA Startup',
      'TechClinic BOOST & WIN',
      'WELP',
      'SmartGov',
      'Hackathons',
    ],
  },
  {
    id: 'sing-capital',
    name: 'SING Capital',
    subtitle: 'Financement & Investissement',
    iconName: 'Banknote',
    color: '#10B981',
    description:
      "Le bras financier : fonds d'amorçage de 500K à 15M FCFA en partenariat avec Okoumé Capital et PNUD.",
    stats: [
      { label: 'Fonds levés', value: '509M FCFA' },
      { label: 'Startups financées', value: '40+' },
      { label: 'Ticket moyen', value: '8M FCFA' },
    ],
    programmes: ['Prêts participatifs', 'Prise de participation', 'Avances remboursables'],
  },
  {
    id: 'sing-conseil',
    name: 'SING Conseil',
    subtitle: 'Conseil & Transformation',
    iconName: 'Lightbulb',
    color: '#F59E0B',
    description:
      "L'expertise stratégique : conseil en transformation numérique pour entreprises et administrations.",
    stats: [
      { label: 'Missions réalisées', value: '150+' },
      { label: 'Professionnels certifiés', value: '2 300+' },
      { label: 'Satisfaction', value: '85.35%' },
    ],
    programmes: ['Audit numérique', 'Formation managériale', 'Conduite du changement'],
  },
  {
    id: 'sing-logiciels',
    name: 'SING Logiciels',
    subtitle: 'Digital Factory',
    iconName: 'Code',
    color: '#3B82F6',
    description:
      "L'usine logicielle souveraine : production d'infrastructures numériques pour l'État et les entreprises.",
    stats: [
      { label: 'Produits développés', value: '30+' },
      { label: 'Emplois directs', value: '500+' },
      { label: 'Projets souverains', value: '5' },
    ],
    programmes: ['La Numérithèque', 'GABON ID CONNECT', 'Musée.GA', 'Bornes eGouv CGI'],
  },
];

// ═══════════════════════════════════
// SUCCESS STORIES (4)
// ═══════════════════════════════════
export const SUCCESS_STORIES: SuccessStory[] = [
  {
    startup: 'Gstore Music',
    quote:
      'Grâce à la SING, nous avons levé 180 millions de FCFA et connecté 5 000 artistes gabonais au monde entier.',
    metrics: [
      { label: 'Levée de fonds', value: '180M FCFA', iconName: 'Banknote' },
      { label: 'Artistes connectés', value: '5 000+', iconName: 'Music' },
      { label: 'Utilisateurs', value: '100 000+', iconName: 'Users' },
    ],
    programme: 'Cohorte Innovation 4.0',
    year: 2019,
    gradient: 'from-amber-500 to-orange-600',
  },
  {
    startup: 'Allo Mairie',
    quote: 'Lauréat SmartGov, nous révolutionnons la relation citoyen-mairie au Gabon.',
    metrics: [
      { label: 'Signalements traités', value: '2 500+', iconName: 'MessageSquare' },
      { label: 'Communes connectées', value: '3', iconName: 'Building' },
      { label: 'Satisfaction', value: '92%', iconName: 'Star' },
    ],
    programme: 'SmartGov',
    year: 2024,
    gradient: 'from-indigo-500 to-violet-600',
  },
  {
    startup: 'POZI',
    quote:
      "De l'incubation à la rentabilité : POZI est devenu la super-app financière de référence au Gabon.",
    metrics: [
      { label: 'Levée de fonds', value: '45M FCFA', iconName: 'Banknote' },
      { label: 'Transactions/mois', value: '5M+', iconName: 'TrendingUp' },
      { label: 'Utilisateurs', value: '25 000+', iconName: 'Users' },
    ],
    programme: 'Cohorte Innovation 4.0',
    year: 2020,
    gradient: 'from-emerald-500 to-teal-600',
  },
  {
    startup: 'GABON ID CONNECT',
    quote:
      "Infrastructure d'identité numérique souveraine : 500K citoyens connectés à 25+ services publics.",
    metrics: [
      { label: 'Citoyens', value: '500K+', iconName: 'Users' },
      { label: 'Services connectés', value: '25+', iconName: 'Link' },
      { label: 'Auth/mois', value: '2M+', iconName: 'Shield' },
    ],
    programme: 'SING Logiciels',
    year: 2022,
    gradient: 'from-blue-500 to-cyan-600',
  },
];

// ═══════════════════════════════════
// IMPACT METRICS
// ═══════════════════════════════════
export const IMPACT_METRICS = [
  {
    value: 280,
    suffix: '+',
    label: 'Startups incubées depuis 2018',
    iconName: 'Building2',
    color: '#ec4899',
  },
  {
    value: 76,
    suffix: '%',
    label: 'Taux de survie (vs 30% Afrique)',
    iconName: 'TrendingUp',
    color: '#10B981',
  },
  {
    value: 509,
    suffix: 'M FCFA',
    label: 'Fonds levés par les startups',
    iconName: 'Banknote',
    color: '#F59E0B',
  },
  { value: 500, suffix: '+', label: 'Emplois directs créés', iconName: 'Users', color: '#3B82F6' },
  {
    value: 2300,
    suffix: '+',
    label: 'Professionnels certifiés',
    iconName: 'GraduationCap',
    color: '#8B5CF6',
  },
  {
    value: 58,
    suffix: '%',
    label: 'Startups formalisées (RCCM)',
    iconName: 'FileCheck',
    color: '#6366F1',
  },
  { value: 85.35, suffix: '%', label: 'Taux de satisfaction', iconName: 'Star', color: '#EF4444' },
  {
    value: 1736,
    suffix: '',
    label: 'Participants hackathons',
    iconName: 'Trophy',
    color: '#14B8A6',
  },
  {
    value: 29,
    suffix: '%',
    label: 'Part des femmes entrepreneures',
    iconName: 'Heart',
    color: '#A855F7',
  },
  {
    value: 80,
    suffix: '+',
    label: 'Prototypes développés',
    iconName: 'Lightbulb',
    color: '#EC4899',
  },
];

// ═══════════════════════════════════
// FAQ (8)
// ═══════════════════════════════════
export const FAQ_SING = [
  {
    q: "Comment candidater à un programme d'incubation SING ?",
    a: "Cliquez sur 'Candidater maintenant' en haut de page. Remplissez le formulaire en 5 étapes. Vous recevrez une réponse sous 15 jours ouvrés.",
  },
  {
    q: "L'incubation est-elle gratuite ?",
    a: 'Oui, la Cohorte Innovation 4.0, VISA Startup, TechClinic BOOST & WIN, WELP et SmartGov sont 100% gratuits.',
  },
  {
    q: 'Quels sont les critères de sélection ?',
    a: "Caractère innovant, viabilité économique, qualité de l'équipe (2+ personnes), impact au Gabon, et engagement. Jury : ANINF, AFD, Deloitte.",
  },
  {
    q: "Qu'est-ce que SING Capital ?",
    a: 'Le bras financier de la SING en partenariat avec Okoumé Capital et le PNUD. Financements de 500K à 15M FCFA.',
  },
  {
    q: "Qu'est-ce que le programme SmartGov ?",
    a: 'Programme qui intègre des équipes tech agiles dans les ministères pour numériser les services publics. Lauréat : Allo Mairie.',
  },
  {
    q: "Qu'est-ce que le label VISA Startup ?",
    a: "Certification officielle délivrée par le MENUDI via la SING, facilitant l'accès aux marchés publics et financements.",
  },
  {
    q: 'Que sont les Clubs Numériques Minilab ?',
    a: "Laboratoires d'apprentissage dans les lycées gabonais : réalité virtuelle, coding et conception d'environnements 3D.",
  },
  {
    q: 'Comment la SING contribue-t-elle à Gabon Digital ?',
    a: 'La SING développe les solutions souveraines, forme le capital humain (2 300+ certifiés) et incube les prestataires locaux.',
  },
];

// ═══════════════════════════════════
// HERO CONFIG
// ═══════════════════════════════════
export const HERO_SING = {
  badge: 'Incubateur National du Numérique',
  title: 'SING 2.0',
  titleAccent: "L'incubateur qui transforme vos idées en entreprises tech",
  subtitle:
    "De l'idéation au scaling : 7 programmes d'incubation, 250+ startups accompagnées, 509M FCFA levés. Candidatez maintenant.",
  gradient: 'from-pink-600 via-rose-500 to-fuchsia-600',
  stats: [
    { value: '280+', label: 'Startups incubées', iconName: 'Building2' },
    { value: '76%', label: 'Taux de survie', iconName: 'TrendingUp' },
    { value: '509M', suffix: 'FCFA', label: 'Fonds levés', iconName: 'Banknote' },
    { value: '500+', label: 'Emplois créés', iconName: 'Users' },
  ],
  partners: [
    'MENUDI',
    'Okoumé Capital',
    'Digital Africa',
    'PNUD',
    'AFD',
    'Banque Mondiale',
    'Deloitte',
    'OIF',
  ],
};

// ═══════════════════════════════════
// MINILAB
// ═══════════════════════════════════
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
    {
      iconName: 'Headset',
      name: 'Réalité Virtuelle',
      desc: 'Visites immersives du patrimoine gabonais',
    },
    { iconName: 'Code', name: 'Programmation', desc: 'Initiation au coding avec projets concrets' },
    {
      iconName: 'Palette',
      name: 'Environnements Virtuels',
      desc: "Conception d'espaces 3D interactifs",
    },
    {
      iconName: 'Globe',
      name: 'Patrimoine Numérique',
      desc: 'Valorisation du patrimoine national',
    },
  ],
  impact: { eleves: '500+', lycees: '2 (+ caravane)', projetsVR: '15+' },
};

// ═══════════════════════════════════
// GABON DIGITAL
// ═══════════════════════════════════
export const GABON_DIGITAL_SECTION = {
  title: 'Au cœur du mégaprojet Gabon Digital',
  subtitle: 'La SING, fer de lance de la transformation numérique nationale',
  badge: 'Vision 2030',
  keyFigures: [
    { value: '41 Mds', suffix: 'FCFA', label: 'Financement Banque Mondiale', iconName: 'Globe' },
    {
      value: '82 Mds',
      suffix: 'FCFA',
      label: 'Budget numérique 2026 (+156%)',
      iconName: 'TrendingUp',
    },
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

// ═══════════════════════════════════
// SING 300 STRATEGY
// ═══════════════════════════════════
export const SING_300_SECTION = {
  title: 'Stratégie SING 300',
  subtitle: "La feuille de route pour transformer le Gabon en usine technologique de l'Afrique",
  axes: [
    {
      number: 1,
      title: "Maîtriser les risques d'exploitation",
      description: 'Résolution des passifs historiques, conformité financière et juridique.',
      iconName: 'Shield',
      progress: 75,
    },
    {
      number: 2,
      title: 'Renforcer les capacités de production',
      description: "Extension des espaces d'incubation, recrutement d'experts techniques.",
      iconName: 'Building2',
      progress: 60,
    },
    {
      number: 3,
      title: "Développer l'offre à valeur ajoutée",
      description: 'Industrialisation du conseil stratégique et du développement logiciel.',
      iconName: 'Zap',
      progress: 45,
    },
    {
      number: 4,
      title: "Élargir l'empreinte internationale",
      description: 'Exportation des solutions gabonaises. Présence : Casablanca, Montréal, Québec.',
      iconName: 'Globe',
      progress: 50,
    },
  ],
};

// ═══════════════════════════════════
// CTA FINAL
// ═══════════════════════════════════
export const CTA_FINAL = {
  title: 'Prêt à transformer votre idée en startup tech ?',
  subtitle:
    "Rejoignez les 280+ entrepreneurs qui ont choisi la SING pour bâtir l'avenir numérique du Gabon.",
  gradient: 'from-pink-600 via-rose-500 to-fuchsia-600',
};

// ═══════════════════════════════════
// PORTFOLIO FILTERS
// ═══════════════════════════════════
export const PORTFOLIO_FILTERS = [
  { label: 'Tous', value: 'all', count: 28 },
  { label: 'FinTech', value: 'fintech', count: 6 },
  { label: 'GovTech', value: 'govtech', count: 4 },
  { label: 'HealthTech', value: 'healthtech', count: 3 },
  { label: 'e-Commerce', value: 'ecommerce', count: 4 },
  { label: 'AgriTech', value: 'agritech', count: 2 },
  { label: 'MusicTech', value: 'musictech', count: 2 },
  { label: 'InsurTech', value: 'insurtech', count: 2 },
  { label: 'Mobilité', value: 'mobilite', count: 3 },
  { label: 'EdTech', value: 'edtech', count: 2 },
];

// Stage config
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
