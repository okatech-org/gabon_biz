// GABON BIZ — Investir dans l'Économie Numérique : Données centralisées
// Sources : BAD 2025, ARCEP Q3 2025, UNCDF 2023, Banque Mondiale, AVCA

// ═══════════════════════════════════════════
//  TYPES
// ═══════════════════════════════════════════

export interface MacroIndicator {
  indicateur: string;
  y2022: number | null;
  y2023: number | null;
  y2024: number | null;
  y2025: number | null;
  y2026: number | null;
}

export interface StartupRef {
  nom: string;
  description: string;
}

export interface VerticaleInvestissement {
  id: string;
  titre: string;
  icon: string; // lucide icon name
  color: string;
  opportunite: string;
  marche: { taille: string; penetration: string; croissance: string };
  startupsExistantes: StartupRef[];
  risques: string;
  strategieEntree: string;
}

export interface DealPipeline {
  id: string;
  startup: string;
  secteur: string;
  stade: 'Pre-Seed' | 'Seed' | 'Post-Seed' | 'Série A' | 'Croissance';
  montantRecherche: string;
  valorisation: string;
  metriques: string;
  statut: 'ouvert' | 'en_discussion' | 'terme_sheet' | 'cloture';
}

export interface RisqueInvestisseur {
  risque: string;
  severite: 'faible' | 'moyenne' | 'haute';
  description: string;
  attenuation: string;
}

export interface OperateurTelecom {
  nom: string;
  partMarche: number;
  type: string;
}

export interface PartenaireInvestissement {
  partenaire: string;
  programme: string;
  montant: string;
  impact: string;
  type: string;
}

export interface AvantageJuridique {
  icon: string;
  titre: string;
  description: string;
  lien: string | null;
}

export interface DueDiligenceSection {
  titre: string;
  items: { label: string; value: string }[];
}

export interface GaugeData {
  label: string;
  value: number;
  max: number;
  color: string;
  interpretation: string;
}

// ═══════════════════════════════════════════
//  HERO
// ═══════════════════════════════════════════

export const HERO_INVESTIR = {
  headline: "L'Économie Numérique du Gabon : Investissez dans le Hub Digital de l'Afrique Centrale",
  subheadline: "Infrastructure déployée. Marché sous-pénétré. Premier deal VC historique bouclé. Le Gabon est prêt pour sa révolution numérique.",
  heroStats: [
    { value: '$72,4M', label: 'Programme Gabon Digital (Banque Mondiale)', icon: 'Building2' },
    { value: '94%', label: 'Couverture réseau 4G', icon: 'Signal' },
    { value: '135%', label: 'Pénétration mobile (SIM actives)', icon: 'Smartphone' },
    { value: '1,2%', label: 'Inflation maîtrisée (2024)', icon: 'TrendingDown' },
  ],
};

// ═══════════════════════════════════════════
//  PARADOXE NUMÉRIQUE
// ═══════════════════════════════════════════

export const PARADOXE_NUMERIQUE = {
  title: "Le Paradoxe Numérique : L'Opportunité de la Décennie",
  description: "L'infrastructure matérielle a devancé l'adoption des services. 67% de la population connectée reste à activer financièrement. C'est un océan bleu pour les FinTech, le e-Commerce et la HealthTech.",
  gauges: [
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
  ] as GaugeData[],
  callout: "41,41% des Gabonais empruntent auprès de leur famille. Seulement 5,48% utilisent des institutions financières formelles. Ce vide attend vos solutions.",
};

// ═══════════════════════════════════════════
//  INDICATEURS MACROÉCONOMIQUES
// ═══════════════════════════════════════════

export const MACRO_INDICATORS: MacroIndicator[] = [
  { indicateur: 'Taux de croissance du PIB (%)', y2022: 3.0, y2023: 2.4, y2024: 3.1, y2025: 2.3, y2026: 2.1 },
  { indicateur: 'Croissance PIB réel par habitant (%)', y2022: 0.7, y2023: 0.2, y2024: 0.9, y2025: 0.1, y2026: -0.1 },
  { indicateur: "Taux d'inflation (%)", y2022: 4.3, y2023: 3.6, y2024: 1.2, y2025: 1.7, y2026: 2.3 },
  { indicateur: 'Solde budgétaire (dons compris, % PIB)', y2022: -0.8, y2023: 1.8, y2024: -3.0, y2025: -3.8, y2026: -4.0 },
  { indicateur: 'Solde du compte courant (% PIB)', y2022: 9.8, y2023: 6.8, y2024: 5.7, y2025: 2.0, y2026: null },
];

export const MACRO_KEY_FACTS = [
  { icon: 'DollarSign', fact: "PIB par habitant PPA : $16 470 — 5ème économie la plus riche d'Afrique" },
  { icon: 'Users', fact: "90% de taux d'urbanisation — idéal pour le dernier kilomètre et les services B2C" },
  { icon: 'Shield', fact: "Monnaie FCFA arrimée à l'Euro — zéro risque de change pour les investisseurs européens" },
  { icon: 'Globe', fact: "Membre CEMAC — accès à un marché régional de 60 millions d'habitants" },
];

// ═══════════════════════════════════════════
//  6 VERTICALES DE CROISSANCE
// ═══════════════════════════════════════════

export const VERTICALES: VerticaleInvestissement[] = [
  {
    id: 'fintech',
    titre: 'FinTech & Inclusion Financière',
    icon: 'Wallet',
    color: '#10B981',
    opportunite: "Combler le fossé entre 135% de pénétration mobile et 33% de comptes actifs. Micro-crédit, néo-banque, scoring IA, mobile money avancé.",
    marche: {
      taille: '2 903 milliards FCFA de transactions en monnaie électronique (2022, +89% vs 2018)',
      penetration: "Crédit mobile money : 7,36% seulement vs 15,85% en Ouganda",
      croissance: 'Mobile money +89% en 4 ans',
    },
    startupsExistantes: [
      { nom: 'CaPay', description: 'Centralisation et paiement numérique des salaires, solution provinces' },
      { nom: 'GATAX', description: "Application de gestion fiscale et aide à la déclaration d'impôts" },
      { nom: 'Airtel Money', description: 'Leader mobile money — 20 000 points, 1M+ clients actifs' },
    ],
    risques: 'Réglementation mobile money en évolution ; concurrence opérateurs télécoms',
    strategieEntree: 'Partenariat avec opérateurs existants (Airtel/Moov) ou B2B pour PME non bancarisées',
  },
  {
    id: 'ecommerce',
    titre: 'e-Commerce & Logistique',
    icon: 'ShoppingCart',
    color: '#8B5CF6',
    opportunite: "90% d'urbanisation + paiement numérique en expansion = conditions parfaites pour le e-commerce et la livraison du dernier kilomètre.",
    marche: {
      taille: 'ShopEasy Gabon : de $2,5M (2023) à $4,2M (2025) de revenus — croissance 68%',
      penetration: 'ShopEasy capte ~45% du marché e-commerce gabonais',
      croissance: 'Marché en structuration rapide',
    },
    startupsExistantes: [
      { nom: 'ShopEasy Gabon', description: 'Leader e-commerce — 45% de parts de marché' },
      { nom: 'Transportify Gabon', description: 'Logistique du dernier kilomètre' },
      { nom: 'WEBCARS', description: 'Mobilité partagée et covoiturage' },
      { nom: 'POZI', description: 'Télématique & gestion de flotte IA — 1er deal VC du Gabon (€650K Seed)' },
    ],
    risques: "Infrastructure logistique limitée hors Libreville ; coûts derniers kilomètres élevés",
    strategieEntree: 'Modèle marketplace mobile-first avec agents terrain',
  },
  {
    id: 'healthtech',
    titre: 'Santé Numérique (HealthTech)',
    icon: 'HeartPulse',
    color: '#EF4444',
    opportunite: "Système de santé en cours de digitalisation (Banque Mondiale finance le projet e-santé). Besoin massif de dossier médical partagé, e-pharmacie, télémédecine.",
    marche: {
      taille: 'Décaissements Banque Mondiale spécifiques pour e-santé et digital Gabon',
      penetration: "Digitalisation santé encore embryonnaire — premier entrant très avantagé",
      croissance: 'Accélération post-Covid structurelle',
    },
    startupsExistantes: [
      { nom: 'MedCare Gabon', description: 'Avant-garde de la numérisation des parcours de soins' },
      { nom: "DUK' OBIERI", description: 'Numérisation feuilles de soins CNAMGS, fractionnement achats pharmacie' },
      { nom: 'USHANN LABS', description: 'Dossier Médical Partagé Gabonais (DMPG)' },
      { nom: 'PERFORMIX INNO', description: 'E-santé grand public : achats pharmacie en ligne, rendez-vous hospitaliers' },
      { nom: 'H14', description: 'Bracelets médicaux IoT pour identification patients en milieu hospitalier' },
    ],
    risques: "Réglementation données santé en construction ; interopérabilité systèmes CNAMGS",
    strategieEntree: 'B2G via programme Gabon Digital + B2B avec cliniques privées de Libreville',
  },
  {
    id: 'agritech',
    titre: 'AgriTech & Sécurité Alimentaire',
    icon: 'Sprout',
    color: '#22C55E',
    opportunite: "Forte dépendance aux importations alimentaires. Le gouvernement pousse la relance agricole. L'AgriTech est une nécessité de sécurité nationale.",
    marche: {
      taille: 'Importations alimentaires massives — substitution = marché captif',
      penetration: 'Très faible digitalisation de la chaîne agricole',
      croissance: 'Priorité gouvernementale déclarée',
    },
    startupsExistantes: [
      { nom: 'AgriTech Gabon', description: 'Pionnier des solutions technologiques agricoles' },
      { nom: 'WAGUI', description: 'App agricole offline + micro-finance + location matériel mutualisé' },
    ],
    risques: "Infrastructure rurale limitée ; faible bande passante hors villes",
    strategieEntree: 'Solutions offline-first (modèle WAGUI) ; partenariats avec coopératives et IGAD',
  },
  {
    id: 'edtech',
    titre: 'Technologies Éducatives (EdTech)',
    icon: 'GraduationCap',
    color: '#F59E0B',
    opportunite: "Déficit structurel de compétences tech. École 241, CGI et programme DigiEmpower créent la demande. Formation B2B et B2C en plein essor.",
    marche: {
      taille: 'Programme DigiEmpower : 1 000+ jeunes à former (Cisco/Cybastion)',
      penetration: 'École 241 : 40 diplômés par promo (Promo 7 certifiée)',
      croissance: "Demande croissante portée par la digitalisation de l'État",
    },
    startupsExistantes: [
      { nom: 'ATACE HANDI', description: 'Formation en ligne inclusive — contenus en langue des signes' },
      { nom: 'PANAFRICOM', description: 'E-education B2B : événements professionnels et formations entreprise' },
      { nom: 'École 241 (ONG Ogooué Labs)', description: 'Bootcamps intensifs dev web, UX/UI, marketing digital' },
    ],
    risques: "Monétisation B2C difficile ; dépendance aux financements internationaux (OIF, etc.)",
    strategieEntree: 'B2B formation continue entreprises + certifications professionnelles',
  },
  {
    id: 'govtech-infra',
    titre: 'GovTech & Infrastructure Numérique',
    icon: 'Building2',
    color: '#6366F1',
    opportunite: "Programme Gabon Digital ($72,4M) = commande publique massive. 13 projets concrets. Data Centers, NIP biométrique, plateforme Digitax ($1B FCFA collecté en 2024).",
    marche: {
      taille: '44 milliards FCFA (Banque Mondiale) — contrats B2G ouverts',
      penetration: 'Digitax : 630 milliards FCFA collectés par le Trésor en 2024',
      croissance: '13 projets gouvernementaux en cours de déploiement',
    },
    startupsExistantes: [
      { nom: 'ST Digital', description: 'Data Center écologique en construction à Nkok (ZIS)' },
      { nom: 'Cybastion (USA)', description: 'Infrastructures critiques Data Centers + programme DigiEmpower' },
      { nom: 'Huawei (MoU)', description: 'Partenariat stratégique développement écosystème CEMAC' },
    ],
    risques: "Marchés publics : délais de paiement ; complexité administrative ; concurrence intégrateurs étrangers",
    strategieEntree: 'Joint-ventures avec acteurs locaux ; enregistrement ANPI + certification DGMP',
  },
];

// ═══════════════════════════════════════════
//  CASE STUDY POZI
// ═══════════════════════════════════════════

export const CASE_STUDY_POZI = {
  titre: 'Cas d\'École : POZI — Le Premier Deal VC du Gabon',
  timeline: [
    { year: '2020', event: 'Fondation par Loïc Kapitho & Thomas Leluc à Libreville' },
    { year: '2022-2024', event: 'Croissance organique — 2 500 véhicules connectés' },
    { year: 'Oct 2025', event: 'Seed Round : €650K (Saviu Ventures lead, Emsy Capital co-invest)' },
    { year: '2026+', event: "Expansion Côte d'Ivoire — objectif 35 000 véhicules / 10 marchés d'ici 2030" },
  ],
  metriques: {
    vehiculesConnectes: '2 500+',
    montantLeve: '€650 000',
    leadInvestor: 'Saviu Ventures',
    coInvestor: 'Emsy Capital',
    conseilJuridique: 'Chazai Wamba',
    secteur: 'Télématique / LogisTech / IA',
    clientele: 'Opérateurs transport + multinationales',
    ambition2030: "35 000 véhicules, 10 marchés africains",
  },
  significance: "Première levée VC étrangère au Gabon. Validation du modèle B2B sur un marché sous-pénétré. Signal d'appel pour tout le continent VC.",
};

// ═══════════════════════════════════════════
//  CADRE JURIDIQUE
// ═══════════════════════════════════════════

export const CADRE_JURIDIQUE = {
  titre: "Un Cadre Juridique Favorable à l'Investissement",
  subtitle: "Code des Investissements, ANPI, ZIS de Nkok — les garanties pour vos capitaux",
  avantages: [
    {
      icon: 'FileCheck',
      titre: "Création d'entreprise simplifiée",
      description: "Guichet Numérique de l'Investissement (GNI) — 100% en ligne. RCCM + bancarisation automatique. Frais : 85 000 FCFA (nationaux) / 135 000 FCFA (étrangers).",
      lien: 'https://www.gni-anpigabon.com/',
    },
    {
      icon: 'Shield',
      titre: 'Protection des investissements',
      description: "Code des Investissements (1998, mis à jour) : mêmes droits que les entreprises nationales. Protection explicite contre l'expropriation et la nationalisation.",
      lien: null,
    },
    {
      icon: 'Percent',
      titre: 'Exonérations fiscales',
      description: "Exemption de l'impôt sur les sociétés pendant les 3 premiers exercices. Suspension TVA sur investissements en zones spéciales.",
      lien: null,
    },
    {
      icon: 'Landmark',
      titre: "Zone d'Investissement Spécial (ZIS) de Nkok",
      description: 'Zone franche avec avantages douaniers et fiscaux. Accueille déjà des entreprises tech (ST Digital — Data Center écologique).',
      lien: null,
    },
    {
      icon: 'Handshake',
      titre: 'Co-financement FONAP',
      description: "Fonds National d'Appui aux PME : prêts bonifiés, garanties bancaires, cofinancement projets. Montages hybrides public-privé possibles.",
      lien: null,
    },
    {
      icon: 'Users',
      titre: 'Capital humain en formation',
      description: "École 241, CGI (UIT/SADA), programme DigiEmpower (Cisco) — pipeline de développeurs, data scientists et experts cyber formés aux standards internationaux.",
      lien: null,
    },
  ] as AvantageJuridique[],
};

// ═══════════════════════════════════════════
//  PARTENARIATS INTERNATIONAUX
// ═══════════════════════════════════════════

export const PARTENARIATS: PartenaireInvestissement[] = [
  {
    partenaire: 'Banque Mondiale',
    programme: 'Gabon Digital',
    montant: '$72,4M (44 Mds FCFA)',
    impact: 'Modernisation de 13 services publics numériques',
    type: 'Financement structurant',
  },
  {
    partenaire: 'Smart Africa',
    programme: 'SADA (Digital Academy)',
    montant: '$20M (global)',
    impact: '5 000+ participants formés sur le continent',
    type: 'Renforcement des capacités',
  },
  {
    partenaire: 'Huawei Technologies (CEMAC)',
    programme: 'MoU Souveraineté Numérique',
    montant: 'Non divulgué',
    impact: 'Développement écosystème local et infrastructure',
    type: 'Transfert technologique',
  },
  {
    partenaire: 'Cybastion + Cisco (USA)',
    programme: 'DigiEmpower + Data Centers',
    montant: 'Non divulgué',
    impact: '1 000+ jeunes formés + infra critique',
    type: 'Infrastructure + capital humain',
  },
  {
    partenaire: 'Émirats Arabes Unis',
    programme: 'Finance numérique & banque souveraine',
    montant: 'Phase exploratoire',
    impact: 'Plateformes boursières, transferts internationaux, banque numérique',
    type: 'Investissement direct',
  },
  {
    partenaire: 'Eramet Comilog',
    programme: 'FabLab Moanda (PPP)',
    montant: 'Non divulgué',
    impact: 'Prototypage industriel et formation décentralisée',
    type: 'PPP / RSE',
  },
  {
    partenaire: 'GIZ / BMZ (Allemagne)',
    programme: 'Smart Africa Scale-up',
    montant: '€5M',
    impact: "Financement d'amorçage SADA",
    type: 'Coopération bilatérale',
  },
];

// ═══════════════════════════════════════════
//  MARCHÉ TÉLÉCOM (ARCEP Q3 2025)
// ═══════════════════════════════════════════

export const MARCHE_TELECOM = {
  titre: 'Un Marché Télécom Structuré et Lucratif',
  parcTotal: 2355534,
  repartition: { mobile: 94.53, fixe: 5.47 },
  chiffreAffairesQ3_2025: '32,80 milliards FCFA (+5,98% vs Q2)',
  source: 'ARCEP Gabon — Observatoire des Marchés, 3ème trimestre 2025',
};

export const OPERATEURS_TELECOM: OperateurTelecom[] = [
  { nom: 'Moov Africa Gabon Telecom Mobile', partMarche: 53.14, type: 'Mobile 3G/4G' },
  { nom: 'Airtel Gabon', partMarche: 41.38, type: 'Mobile 3G/4G' },
  { nom: 'Moov Africa Gabon Telecom Fixe', partMarche: 2.95, type: 'Fixe (Fibre/ADSL)' },
  { nom: 'GVA (Group Vivendi Africa)', partMarche: 2.51, type: 'Fixe (Fibre FTTH)' },
  { nom: 'GBM', partMarche: 0.003, type: 'Fixe' },
];

// ═══════════════════════════════════════════
//  RISQUES & ATTÉNUATION
// ═══════════════════════════════════════════

export const RISQUES: RisqueInvestisseur[] = [
  {
    risque: 'Infrastructure énergétique (délestages)',
    severite: 'moyenne',
    description: "Le réseau électrique connaît des épisodes de coupures affectant la productivité des services numériques.",
    attenuation: "Budgétiser des systèmes d'alimentation de secours. Opportunité : micro-réseaux solaires (GreenTech) pour les PME.",
  },
  {
    risque: 'Prédominance mobile (94,53%)',
    severite: 'faible',
    description: "Faible pénétration du très haut débit fixe — les solutions doivent être mobile-first.",
    attenuation: 'Concevoir en mobile-first strict. Intégrer des capacités offline avec synchronisation différée (modèle WAGUI).',
  },
  {
    risque: 'Transparence marchés publics (B2G)',
    severite: 'moyenne',
    description: "Processus de passation des marchés en cours de réforme. Historique de lacunes signalées par le FMI.",
    attenuation: "S'appuyer sur le GNI de l'ANPI et les projets audités Banque Mondiale (normes fiduciaires internationales).",
  },
  {
    risque: 'Missing middle du financement (VC Série A)',
    severite: 'haute',
    description: "Chaîne de financement lacunaire entre le seed (SING) et les gros tickets PE. Faible concurrence VC locale.",
    attenuation: "Opportunité : valorisations d'entrée raisonnables par rapport au Kenya/Nigeria. Montages hybrides avec FONAP. Le deal POZI a brisé le plafond de verre.",
  },
  {
    risque: 'Fuite des cerveaux',
    severite: 'moyenne',
    description: "Les talents formés aux standards internationaux (UIT, Cisco) sont attirés par les marchés étrangers.",
    attenuation: 'Politique de rétention gouvernementale en cours. Remote-first possible (fuseau horaire UTC+1 compatible Europe).',
  },
];

// ═══════════════════════════════════════════
//  DEAL FLOW
// ═══════════════════════════════════════════

export const DEAL_FLOW: DealPipeline[] = [
  {
    id: 'deal-1',
    startup: 'POZI',
    secteur: 'LogisTech / IA',
    stade: 'Post-Seed',
    montantRecherche: '€2-3M (Série A)',
    valorisation: 'Confidentiel',
    metriques: '2 500+ véhicules, clients B2B nationaux + multinationaux',
    statut: 'en_discussion',
  },
  {
    id: 'deal-2',
    startup: 'ShopEasy Gabon',
    secteur: 'e-Commerce',
    stade: 'Croissance',
    montantRecherche: '€1,5M',
    valorisation: '~$10M',
    metriques: '45% PDM e-commerce, revenus $4,2M (2025)',
    statut: 'ouvert',
  },
  {
    id: 'deal-3',
    startup: 'CaPay',
    secteur: 'FinTech / Paiements',
    stade: 'Seed',
    montantRecherche: '€500K',
    valorisation: 'Confidentiel',
    metriques: 'Plateforme salaires B2B, provinces couvertes',
    statut: 'ouvert',
  },
  {
    id: 'deal-4',
    startup: 'USHANN LABS',
    secteur: 'HealthTech',
    stade: 'Pre-Seed',
    montantRecherche: '€300K',
    valorisation: 'Confidentiel',
    metriques: 'DMPG en développement, LOI Ministère Santé',
    statut: 'ouvert',
  },
  {
    id: 'deal-5',
    startup: 'WAGUI',
    secteur: 'AgriTech',
    stade: 'Seed',
    montantRecherche: '€400K',
    valorisation: 'Confidentiel',
    metriques: 'App offline-first, micro-finance agricole',
    statut: 'ouvert',
  },
  {
    id: 'deal-6',
    startup: 'Orema Technology',
    secteur: 'GreenTech / EnergyTech',
    stade: 'Seed',
    montantRecherche: '€350K',
    valorisation: 'Confidentiel',
    metriques: 'App gestion compteurs Edan, solution énergie prépayée',
    statut: 'ouvert',
  },
];

export const DEAL_FLOW_STATS = [
  { label: "Startups actives dans l'écosystème", value: '100+', source: 'Plateforme KIMBA' },
  { label: 'Startups incubées SING', value: '38', source: 'SING SA' },
  { label: 'Levée VC cumulée (2025)', value: '€650K', source: 'POZI / Saviu Ventures' },
  { label: 'Programme Gabon Digital', value: '44 Mds FCFA', source: 'Banque Mondiale' },
];

// ═══════════════════════════════════════════
//  DUE DILIGENCE
// ═══════════════════════════════════════════

export const DUE_DILIGENCE: DueDiligenceSection[] = [
  {
    titre: 'Environnement Politique & Institutionnel',
    items: [
      { label: 'Régime', value: 'République — Période de transition (CTRI)' },
      { label: 'Tutelle Économie Numérique', value: 'MENUDI — Min. Mark-Alexandre Doumba' },
      { label: 'Agence de promotion', value: "ANPI-Gabon (Guichet Numérique de l'Investissement)" },
      { label: 'Infrastructure numérique', value: 'ANINF (Agence Nationale Infrastructures Numériques)' },
    ],
  },
  {
    titre: "Cadre Juridique de l'Investissement",
    items: [
      { label: 'Code des Investissements', value: 'Loi 1998 (mise à jour) — Égalité de traitement' },
      { label: 'Protection', value: "Anti-expropriation explicite + compensation préalable" },
      { label: 'Structures juridiques', value: 'SARL, SA, SAS, SNC, SCS — libre choix' },
      { label: 'Startup Act', value: "En cours d'élaboration — avantages existants via ZIS et FONAP" },
    ],
  },
  {
    titre: 'Fiscalité & Incitations',
    items: [
      { label: 'IS Exonération', value: '3 premiers exercices' },
      { label: 'TVA Suspension', value: 'Sur investissements en zones spéciales' },
      { label: 'ZIS de Nkok', value: 'Avantages douaniers + fiscaux + énergie stable' },
      { label: 'FONAP', value: 'Prêts bonifiés + garanties bancaires + cofinancement' },
      { label: 'Note FMI', value: 'Nouvelles exonérations discrétionnaires suspendues (rigueur budgétaire)' },
    ],
  },
  {
    titre: "Création d'Entreprise",
    items: [
      { label: 'Plateforme', value: 'GNI (gni-anpigabon.com) — 100% dématérialisé' },
      { label: 'Coût nationaux', value: '85 000 FCFA' },
      { label: 'Coût étrangers', value: '135 000 FCFA' },
      { label: 'Inclus', value: 'RCCM + bancarisation automatique' },
    ],
  },
  {
    titre: 'Écosystème de Support',
    items: [
      { label: 'Incubateur principal', value: 'SING SA (1er incubateur 100% numérique CEMAC)' },
      { label: 'Innovation Hub', value: 'KIMBA 2.0 (100+ startups enregistrées)' },
      { label: 'Formation', value: 'CGI (UIT/SADA), École 241, DigiEmpower (Cisco)' },
      { label: 'Événements', value: 'Osiane (Brazzaville), Educatech (Paris), MWC (Barcelone)' },
    ],
  },
];

// ═══════════════════════════════════════════
//  CTA FINAL
// ═══════════════════════════════════════════

export const CTA_FINAL = {
  titre: "Prêt à investir dans la prochaine licorne d'Afrique Centrale ?",
  description: "Accédez au dashboard investisseur de GABON BIZ pour explorer le deal flow, les données macroéconomiques et les startups à fort potentiel.",
  actions: [
    { label: 'Accéder au Dashboard Investisseur (Démo)', href: '/demo', variant: 'primary' as const },
    { label: "Contacter l'ANPI", href: 'https://investingabon.ga/', variant: 'outline' as const, external: true },
    { label: 'Contacter la SING (Incubateur)', href: 'https://www.sing.ga/', variant: 'outline' as const, external: true },
  ],
};
