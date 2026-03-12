// Centre Gabonais de l'Innovation (CGI) — Centralized Mock Data
// Filiale SPIN, tutelle MENUDI — 4 Pôles: Acculturation, Certification, FabLab, MediaLab

// ═══════════════════════════════════════════
//  TYPES
// ═══════════════════════════════════════════

export interface CGIPole {
  id: string;
  name: string;
  description: string;
  color: string;
  stats: Record<string, string | number>;
  href: string;
}

export interface CGIEvenement {
  id: string;
  title: string;
  type: 'formation' | 'certification' | 'caravane' | 'hackathon' | 'sada' | 'conference';
  date: string;
  location: string;
  places: number;
  inscriptions: number;
  statut: 'inscriptions_ouvertes' | 'complet' | 'en_cours' | 'terminé';
  pole: string;
}

export interface CGISite {
  id: string;
  name: string;
  province: string;
  lat: number;
  lng: number;
  type: 'siege' | 'fablab' | 'antenne';
  poles: string[];
  partenaire?: string;
}

export interface CGICaravane {
  province: string;
  ville: string;
  date: string;
  statut: 'planifiée' | 'en_cours' | 'terminée';
}

export interface CGIPartenariat {
  nom: string;
  type: 'multilateral' | 'ppp' | 'bilateral';
  programme: string;
  depuis: number;
}

export interface CGIFormation {
  id: string;
  titre: string;
  niveau: 'Débutant' | 'Intermédiaire' | 'Avancé';
  duree: string;
  public: string;
  inscrits: number;
  certifies: number;
  tauxReussite: string;
  prochaineCession: string;
  statut: 'actif' | 'en_cours' | 'planifié' | 'terminé';
  metiers: string[];
}

export interface CGICertification {
  id: string;
  titre: string;
  organisme: string;
  duree: string;
  prerequis: string;
  candidats: number;
  certifies: number;
  tauxReussite: string;
  prochaineSessions: string;
  reconnaissanceInternationale: boolean;
  badge: string;
}

export interface CGIClubTech {
  id: string;
  nom: string;
  ville: string;
  enseignant: string;
  membres: number;
  projets: number;
}

export interface CGIProjetFabLab {
  id: string;
  titre: string;
  porteur: string;
  site: 'CGI Libreville' | 'FabLab Moanda';
  statut: 'ideation' | 'en_cours' | 'prototype_fonctionnel' | 'production' | 'déployé';
  technologies: string[];
  dateDebut: string;
  dateFin: string;
  description: string;
  lienKIMBA: string | null;
  impact: string;
}

export interface CGIEquipement {
  site: string;
  equipement: string;
  quantite: number;
  statut: 'opérationnel' | 'maintenance' | 'hors_service';
}

export interface CGIProductionMediaLab {
  id: string;
  titre: string;
  type: 'video' | 'podcast' | 'design' | 'evenement';
  format: string;
  episodes: number;
  statut: 'actif' | 'en_production' | 'terminé';
  public: string;
  plateforme: string;
  description: string;
}

export interface CGIModuleSADA {
  id: string;
  titre: string;
  public: string;
  duree: string;
  langue: string;
  prochaine: string;
  inscrits: number;
  places: number;
  format: string;
}

// ═══════════════════════════════════════════
//  AGGREGATE STATS
// ═══════════════════════════════════════════

export const CGI_STATS_HERO = {
  certifies2026: 1247,
  startupsAccompagnees: 38,
  projetsFabLab: 64,
  formationsIA: 480,
  personnesFormees: 3420,
  tauxInsertionPro: 78,
  provincesAtteintes: 7,
  partenairesInternationaux: 12,
};

// ═══════════════════════════════════════════
//  POLES
// ═══════════════════════════════════════════

export const CGI_POLES: CGIPole[] = [
  {
    id: 'acculturation',
    name: "Centre d'Acculturation Digitale",
    description: "Formation citoyenne, programme INITIA (IA), caravanes provinciales",
    color: '#F59E0B',
    stats: { formesTotal: 3420, formationsActives: 12, provincesAtteintes: '7/9' },
    href: '/dashboard/cgi/formations',
  },
  {
    id: 'certification',
    name: 'Centre de Certification',
    description: "Certifications ITU, SADA, partenariats internationaux",
    color: '#3B82F6',
    stats: { certifiesActifs: 1247, programmesSADA: 4, partenaires: 12 },
    href: '/dashboard/cgi/formations',
  },
  {
    id: 'fablab',
    name: 'FabLab',
    description: "Prototypage, impression 3D, robotique — Libreville & Moanda",
    color: '#10B981',
    stats: { projetsActifs: 64, prototypesLivres: 23, equipements: 47 },
    href: '/dashboard/cgi/fablab',
  },
  {
    id: 'medialab',
    name: 'MediaLab',
    description: "Production audiovisuelle, design, contenus éducatifs numériques",
    color: '#8B5CF6',
    stats: { productionsActives: 18, contenusPublies: 156, clientsInstitutionnels: 8 },
    href: '/dashboard/cgi/medialab',
  },
];

// ═══════════════════════════════════════════
//  ÉVÉNEMENTS
// ═══════════════════════════════════════════

export const CGI_EVENEMENTS: CGIEvenement[] = [
  {
    id: 'evt-1',
    title: 'Cohorte INITIA #4 — Intelligence Artificielle',
    type: 'formation',
    date: '2026-04-15',
    location: 'CGI Libreville',
    places: 120,
    inscriptions: 89,
    statut: 'inscriptions_ouvertes',
    pole: 'acculturation',
  },
  {
    id: 'evt-2',
    title: 'Certification Cybersécurité ITU — Niveau Avancé',
    type: 'certification',
    date: '2026-04-22',
    location: 'CGI Libreville',
    places: 40,
    inscriptions: 40,
    statut: 'complet',
    pole: 'certification',
  },
  {
    id: 'evt-3',
    title: 'Caravane Numérique — Province du Moyen-Ogooué',
    type: 'caravane',
    date: '2026-05-10',
    location: 'Lambaréné',
    places: 200,
    inscriptions: 67,
    statut: 'inscriptions_ouvertes',
    pole: 'acculturation',
  },
  {
    id: 'evt-4',
    title: 'Hackathon FabLab — Solutions GreenTech',
    type: 'hackathon',
    date: '2026-05-24',
    location: 'FabLab Moanda',
    places: 50,
    inscriptions: 42,
    statut: 'inscriptions_ouvertes',
    pole: 'fablab',
  },
  {
    id: 'evt-5',
    title: 'SADA Workshop — Data Governance for Public Sector',
    type: 'sada',
    date: '2026-06-02',
    location: 'CGI Libreville + En ligne',
    places: 60,
    inscriptions: 28,
    statut: 'inscriptions_ouvertes',
    pole: 'certification',
  },
];

// ═══════════════════════════════════════════
//  SITES & CARAVANES
// ═══════════════════════════════════════════

export const CGI_SITES: CGISite[] = [
  { id: 'libreville', name: 'CGI Libreville (Siège)', province: 'Estuaire', lat: 0.4162, lng: 9.4673, type: 'siege', poles: ['acculturation', 'certification', 'medialab'] },
  { id: 'moanda', name: 'FabLab Moanda', province: 'Haut-Ogooué', lat: -1.5664, lng: 13.1983, type: 'fablab', poles: ['fablab'], partenaire: 'Eramet Comilog' },
  { id: 'port-gentil', name: 'Espace Formation IA', province: 'Ogooué-Maritime', lat: -0.7193, lng: 8.7815, type: 'antenne', poles: ['acculturation'], partenaire: 'USA' },
];

export const CGI_CARAVANES: CGICaravane[] = [
  { province: 'Moyen-Ogooué', ville: 'Lambaréné', date: '2026-05', statut: 'planifiée' },
  { province: 'Ngounié', ville: 'Mouila', date: '2026-07', statut: 'planifiée' },
  { province: 'Nyanga', ville: 'Tchibanga', date: '2026-09', statut: 'planifiée' },
  { province: 'Woleu-Ntem', ville: 'Oyem', date: '2026-11', statut: 'planifiée' },
];

// ═══════════════════════════════════════════
//  PARTENARIATS INTERNATIONAUX
// ═══════════════════════════════════════════

export const CGI_PARTENARIATS: CGIPartenariat[] = [
  { nom: 'Smart Africa', type: 'multilateral', programme: 'SADA', depuis: 2026 },
  { nom: "Union Internationale des Télécommunications", type: 'multilateral', programme: "Certification Excellence", depuis: 2024 },
  { nom: 'UNESCO', type: 'multilateral', programme: 'Gouvernance Éthique IA', depuis: 2025 },
  { nom: 'Eramet Comilog', type: 'ppp', programme: 'FabLab Moanda', depuis: 2024 },
  { nom: 'GIZ / BMZ (Allemagne)', type: 'bilateral', programme: 'SADA Financement', depuis: 2026 },
  { nom: 'Banque Mondiale', type: 'multilateral', programme: 'WARDIP-SOP1', depuis: 2026 },
  { nom: 'États-Unis', type: 'bilateral', programme: 'Formation IA Enseignants', depuis: 2025 },
];

// ═══════════════════════════════════════════
//  FORMATIONS ACCULTURATION
// ═══════════════════════════════════════════

export const CGI_FORMATIONS: CGIFormation[] = [
  {
    id: 'form-1',
    titre: 'INITIA — Intelligence Artificielle Appliquée',
    niveau: 'Intermédiaire',
    duree: '12 semaines',
    public: 'Jeunes 18-35 ans',
    inscrits: 480,
    certifies: 412,
    tauxReussite: '86%',
    prochaineCession: '2026-04-15',
    statut: 'en_cours',
    metiers: ['Marketing Digital IA', 'Cybersécurité Télécom', 'Data Science'],
  },
  {
    id: 'form-2',
    titre: 'Alphabétisation Numérique — Module Citoyen',
    niveau: 'Débutant',
    duree: '4 semaines',
    public: 'Tout public',
    inscrits: 850,
    certifies: 780,
    tauxReussite: '92%',
    prochaineCession: 'Continu',
    statut: 'actif',
    metiers: ['Bureautique', 'Internet responsable', 'E-services publics'],
  },
  {
    id: 'form-3',
    titre: 'Robotique & Programmation Junior',
    niveau: 'Débutant',
    duree: '8 semaines',
    public: 'Collégiens/Lycéens',
    inscrits: 120,
    certifies: 98,
    tauxReussite: '82%',
    prochaineCession: '2026-06-01',
    statut: 'planifié',
    metiers: ['Robotique', 'Programmation Python', 'IoT'],
  },
  {
    id: 'form-4',
    titre: 'Caravane Numérique — Formation Mobile',
    niveau: 'Débutant',
    duree: '1 semaine (par étape)',
    public: 'Communautés rurales',
    inscrits: 620,
    certifies: 480,
    tauxReussite: '77%',
    prochaineCession: '2026-05-10 (Lambaréné)',
    statut: 'actif',
    metiers: ['Inclusion numérique', 'Mobile Money', 'E-santé'],
  },
  {
    id: 'form-5',
    titre: 'Transformation Digitale — Fonction Publique',
    niveau: 'Avancé',
    duree: '6 semaines',
    public: 'Fonctionnaires & Cadres dirigeants',
    inscrits: 200,
    certifies: 165,
    tauxReussite: '83%',
    prochaineCession: '2026-07-01',
    statut: 'planifié',
    metiers: ['IA Gabon (coaching)', 'GovTech', 'Data-driven governance'],
  },
];

// ═══════════════════════════════════════════
//  CERTIFICATIONS INTERNATIONALES
// ═══════════════════════════════════════════

export const CGI_CERTIFICATIONS: CGICertification[] = [
  {
    id: 'cert-1',
    titre: 'Certification Cybersécurité — UIT Niveau 1',
    organisme: "Union Internationale des Télécommunications",
    duree: '80 heures',
    prerequis: 'Bac+2 Informatique ou équivalent',
    candidats: 120,
    certifies: 94,
    tauxReussite: '78%',
    prochaineSessions: '2026-04-22',
    reconnaissanceInternationale: true,
    badge: 'itu-cybersec-1',
  },
  {
    id: 'cert-2',
    titre: 'SADA — Digital Policy & Regulation',
    organisme: 'Smart Africa Digital Academy',
    duree: '40 heures (hybride)',
    prerequis: 'Cadres secteur public',
    candidats: 60,
    certifies: 45,
    tauxReussite: '75%',
    prochaineSessions: '2026-06-02',
    reconnaissanceInternationale: true,
    badge: 'sada-policy',
  },
  {
    id: 'cert-3',
    titre: 'SADA — AI for Public Sector Leaders',
    organisme: 'Smart Africa Digital Academy',
    duree: '60 heures (hybride)',
    prerequis: 'Décideurs & législateurs',
    candidats: 40,
    certifies: 28,
    tauxReussite: '70%',
    prochaineSessions: '2026-09-15',
    reconnaissanceInternationale: true,
    badge: 'sada-ai-leaders',
  },
  {
    id: 'cert-4',
    titre: 'Data Science Appliquée — ITU Academy',
    organisme: "Union Internationale des Télécommunications",
    duree: '120 heures',
    prerequis: 'Bac+3 STEM ou expérience Data',
    candidats: 80,
    certifies: 56,
    tauxReussite: '70%',
    prochaineSessions: '2026-05-20',
    reconnaissanceInternationale: true,
    badge: 'itu-datascience',
  },
];

// ═══════════════════════════════════════════
//  CLUBS TECHNOLOGIQUES
// ═══════════════════════════════════════════

export const CGI_CLUBS_TECH: CGIClubTech[] = [
  { id: 'club-1', nom: 'Club IA — Lycée National Léon Mba', ville: 'Libreville', enseignant: 'M. Ndong', membres: 28, projets: 3 },
  { id: 'club-2', nom: 'Club Robotique — Collège Bessieux', ville: 'Libreville', enseignant: 'Mme. Bouanga', membres: 22, projets: 2 },
  { id: 'club-3', nom: 'Club Code — Lycée Paul Indjendjet Gondjout', ville: 'Port-Gentil', enseignant: 'M. Obame', membres: 35, projets: 4 },
  { id: 'club-4', nom: 'Club Data — Université Omar Bongo', ville: 'Libreville', enseignant: 'Dr. Moussavou', membres: 45, projets: 6 },
  { id: 'club-5', nom: 'Club FabLab Junior — Lycée Technique', ville: 'Moanda', enseignant: 'Mme. Nzé', membres: 20, projets: 3 },
];

// ═══════════════════════════════════════════
//  PROJETS FABLAB
// ═══════════════════════════════════════════

export const CGI_PROJETS_FABLAB: CGIProjetFabLab[] = [
  {
    id: 'fab-1',
    titre: 'Station Météo IoT — Agriculture de Précision',
    porteur: 'Équipe AgriSmart (Cohorte FabLab #2)',
    site: 'FabLab Moanda',
    statut: 'prototype_fonctionnel',
    technologies: ['Arduino', 'LoRa', 'Impression 3D'],
    dateDebut: '2025-11-01',
    dateFin: '2026-03-15',
    description: "Station météo connectée à bas coût pour le suivi des cultures vivrières dans le Haut-Ogooué",
    lienKIMBA: 'kimba-sol-047',
    impact: 'Déployée dans 3 exploitations pilotes',
  },
  {
    id: 'fab-2',
    titre: 'Prothèse Main 3D — Projet Solidaire',
    porteur: 'Dr. Ella Mintsa (Biomédicale)',
    site: 'CGI Libreville',
    statut: 'en_cours',
    technologies: ['Impression 3D', 'CAO SolidWorks', 'Silicone médical'],
    dateDebut: '2026-01-10',
    dateFin: '2026-06-30',
    description: "Prothèse de main imprimée en 3D adaptée aux conditions tropicales, à coût réduit",
    lienKIMBA: null,
    impact: '2 prototypes en test clinique au CHU Libreville',
  },
  {
    id: 'fab-3',
    titre: 'Drone Cartographe — Surveillance Forestière',
    porteur: 'Startup GreenWatch (SING Cohorte #3)',
    site: 'FabLab Moanda',
    statut: 'ideation',
    technologies: ['Drone DIY', 'Caméra multispectrale', 'GPS RTK'],
    dateDebut: '2026-03-01',
    dateFin: '2026-09-30',
    description: "Drone assemblé localement pour la surveillance de la déforestation dans les concessions forestières",
    lienKIMBA: 'kimba-sol-089',
    impact: 'Partenariat Ministère des Eaux & Forêts en discussion',
  },
  {
    id: 'fab-4',
    titre: "Boîtier eGouv — Borne d'accès e-services",
    porteur: 'Équipe GovTech CGI',
    site: 'CGI Libreville',
    statut: 'prototype_fonctionnel',
    technologies: ['Raspberry Pi', 'Écran tactile', '4G/WiFi', 'Impression 3D (boîtier)'],
    dateDebut: '2025-09-01',
    dateFin: '2026-02-28',
    description: "Borne autonome basse consommation déployable dans les mairies rurales pour accéder aux e-services",
    lienKIMBA: 'kimba-sol-055',
    impact: '5 bornes pilotes déployées (Lambaréné, Mouila, Oyem)',
  },
  {
    id: 'fab-5',
    titre: 'Kit Pédagogique Robotique — Éducation Nationale',
    porteur: 'Équipe EdTech CGI',
    site: 'CGI Libreville',
    statut: 'production',
    technologies: ['Arduino Nano', 'Servomoteurs', 'Impression 3D', 'Kit mécanique'],
    dateDebut: '2025-06-01',
    dateFin: '2026-01-31',
    description: "Kit de robotique à bas coût (< 15 000 FCFA) pour les clubs technologiques des lycées",
    lienKIMBA: null,
    impact: '200 kits produits, distribués dans 10 établissements',
  },
];

// ═══════════════════════════════════════════
//  ÉQUIPEMENTS FABLAB
// ═══════════════════════════════════════════

export const CGI_EQUIPEMENTS: CGIEquipement[] = [
  { site: 'CGI Libreville', equipement: 'Imprimante 3D Prusa MK4', quantite: 4, statut: 'opérationnel' },
  { site: 'CGI Libreville', equipement: 'Découpe Laser CO2 60W', quantite: 1, statut: 'opérationnel' },
  { site: 'CGI Libreville', equipement: 'Fraiseuse CNC 3 axes', quantite: 1, statut: 'maintenance' },
  { site: 'CGI Libreville', equipement: 'Kits Arduino/Raspberry Pi', quantite: 50, statut: 'opérationnel' },
  { site: 'FabLab Moanda', equipement: 'Imprimante 3D Creality Ender 3', quantite: 6, statut: 'opérationnel' },
  { site: 'FabLab Moanda', equipement: 'Découpe Laser 40W', quantite: 1, statut: 'opérationnel' },
  { site: 'FabLab Moanda', equipement: 'Station de soudure électronique', quantite: 10, statut: 'opérationnel' },
  { site: 'FabLab Moanda', equipement: 'Kits Robotique Éducation', quantite: 30, statut: 'opérationnel' },
];

// ═══════════════════════════════════════════
//  PRODUCTIONS MEDIALAB
// ═══════════════════════════════════════════

export const CGI_PRODUCTIONS_MEDIALAB: CGIProductionMediaLab[] = [
  {
    id: 'media-1',
    titre: 'Série "Le Numérique pour Tous"',
    type: 'video',
    format: 'Capsules vidéo éducatives (2-5 min)',
    episodes: 24,
    statut: 'en_production',
    public: 'Grand public',
    plateforme: 'YouTube + TV nationale',
    description: "Série de capsules vulgarisant les e-services gouvernementaux (eTax, eVisa, CNAMGS en ligne)",
  },
  {
    id: 'media-2',
    titre: 'Podcast "Innover au Gabon"',
    type: 'podcast',
    format: 'Épisodes 30 min',
    episodes: 18,
    statut: 'actif',
    public: 'Entrepreneurs & startups',
    plateforme: 'Spotify, Apple Podcasts, site CGI',
    description: "Interviews de fondateurs de startups gabonaises, mentors et investisseurs de l'écosystème",
  },
  {
    id: 'media-3',
    titre: 'Identité Visuelle — Startups SING',
    type: 'design',
    format: 'Branding complet (logo, charte, templates)',
    episodes: 12,
    statut: 'actif',
    public: 'Startups incubées SING',
    plateforme: 'Livraison directe',
    description: "Création d'identités visuelles professionnelles pour les startups de chaque cohorte d'incubation",
  },
  {
    id: 'media-4',
    titre: 'Couverture Événementielle MENUDI',
    type: 'evenement',
    format: 'Reportages et directs',
    episodes: 35,
    statut: 'actif',
    public: 'Institutionnel',
    plateforme: 'Réseaux sociaux MENUDI + archives',
    description: "Captation et montage vidéo des événements ministériels, signatures de protocoles, inaugurations",
  },
];

// ═══════════════════════════════════════════
//  PROGRAMME SADA
// ═══════════════════════════════════════════

export const CGI_PROGRAMME_SADA = {
  titre: 'Smart Africa Digital Academy (SADA)',
  description: "Programme panafricain de renforcement des compétences numériques déployé au Gabon via le CGI",
  dateSignature: '2026-03-02',
  lieuSignature: 'Mobile World Congress, Barcelone',
  signataires: {
    gabon: "M. Mark-Alexandre Doumba, Ministre de l'Économie Numérique",
    smartAfrica: 'M. Lacina Koné, Directeur Général Smart Africa',
  },
  financements: [
    { source: 'Banque Mondiale', montant: '$20M', programme: 'WARDIP-SOP1' },
    { source: 'GIZ / BMZ (Allemagne)', montant: '€5M', programme: "Financement d'amorçage SADA" },
  ],
  objectifs: [
    "Former les décideurs politiques et législateurs gabonais à la politique numérique",
    "Renforcer les compétences du secteur privé face à la mondialisation numérique",
    "Combler le déficit de compétences technologiques chez la jeunesse",
    "Harmoniser la législation numérique gabonaise avec le continent africain",
  ],
  impactReseau: {
    paysMembres: ['Ghana', 'Rwanda', 'Djibouti', 'Gabon'],
    participantsFormes: 5000,
    thematiques: ['Intelligence Artificielle', 'Cybersécurité', 'Data Centers', 'Cloud Computing', 'Digital Policy'],
  },
};

export const CGI_MODULES_SADA: CGIModuleSADA[] = [
  {
    id: 'sada-1',
    titre: 'Digital Policy & Regulation',
    public: 'Législateurs, régulateurs, directeurs agences',
    duree: '40 heures (5 jours intensifs)',
    langue: 'Français/Anglais',
    prochaine: '2026-06-02',
    inscrits: 28,
    places: 60,
    format: 'Hybride (présentiel CGI + e-learning SADA)',
  },
  {
    id: 'sada-2',
    titre: 'AI for Public Sector Leaders',
    public: 'Secrétaires généraux, DG, cadres A',
    duree: '60 heures (3 semaines)',
    langue: 'Français',
    prochaine: '2026-09-15',
    inscrits: 15,
    places: 40,
    format: 'Hybride',
  },
  {
    id: 'sada-3',
    titre: 'Cybersecurity Governance',
    public: 'RSSI, DSI, auditeurs IT',
    duree: '80 heures (4 semaines)',
    langue: 'Français/Anglais',
    prochaine: '2026-10-01',
    inscrits: 22,
    places: 35,
    format: 'Présentiel CGI',
  },
  {
    id: 'sada-4',
    titre: 'Data-Driven Governance Workshop',
    public: 'Directeurs de programmes, analystes',
    duree: '24 heures (3 jours)',
    langue: 'Français',
    prochaine: '2026-11-20',
    inscrits: 10,
    places: 50,
    format: 'Présentiel CGI',
  },
];

// ═══════════════════════════════════════════
//  SERVICE PAGE DATA (public /services/cgi)
// ═══════════════════════════════════════════

export const CGI_SERVICE_FEATURES = [
  {
    title: 'Acculturation Digitale',
    description: "Des formations gratuites pour tous — jeunes, femmes, fonctionnaires, communautés rurales. Le programme INITIA forme 480 jeunes aux métiers de l'IA.",
    highlights: ['Programme INITIA (IA)', 'Caravanes provinciales', 'Clubs technologiques scolaires', 'Formation fonction publique'],
  },
  {
    title: 'Certification Internationale',
    description: "Des certifications reconnues mondialement délivrées en partenariat avec l'UIT et Smart Africa. Le CGI est l'entité nationale SADA.",
    highlights: ['Certifications UIT', 'SADA – Smart Africa', 'Cybersécurité', 'Data Science'],
  },
  {
    title: 'FabLab — Prototypage & Fabrication',
    description: "Deux laboratoires de fabrication numérique (Libreville et Moanda) équipés d'imprimantes 3D, de découpe laser et d'outils de robotique.",
    highlights: ['Impression 3D', 'Découpe laser', 'Robotique', 'FabLab Moanda (PPP Eramet Comilog)'],
  },
  {
    title: 'MediaLab — Production Numérique',
    description: "Un studio de production audiovisuelle et de design graphique au service de l'écosystème : contenus éducatifs, identités visuelles pour les startups.",
    highlights: ['Capsules vidéo éducatives', 'Podcast entrepreneurial', 'Branding startups', 'Communication institutionnelle'],
  },
];

export const CGI_SERVICE_TIMELINE = [
  { year: '2024', title: 'Inauguration du CGI', description: "Ouverture officielle du Centre Gabonais de l'Innovation à Libreville" },
  { year: '2024', title: 'Reconnaissance UIT', description: "Désigné Centre d'accélération régionale d'excellence" },
  { year: '2024', title: 'FabLab Moanda', description: "Ouverture du FabLab décentralisé en PPP avec Eramet Comilog" },
  { year: '2025', title: 'Programme INITIA', description: "Lancement de la formation massive IA : 480 jeunes formés" },
  { year: '2025', title: 'UNESCO — Gouvernance IA', description: "Le Gabon, pionnier en Afrique centrale sur la gouvernance éthique de l'IA" },
  { year: '2025', title: 'Partenariat USA', description: "Formation de 100 enseignants gabonais à l'intégration de l'IA" },
  { year: '2026', title: 'SADA au Gabon', description: "Signature du protocole Smart Africa au MWC Barcelone" },
  { year: '2026', title: 'Caravanes 9 Provinces', description: "Objectif : atteindre les 9 provinces avec les formations mobiles" },
];

export const CGI_SERVICE_STATS = [
  { value: '3 420+', label: 'Personnes formées au numérique' },
  { value: '1 247', label: 'Certifiés internationaux (UIT/SADA)' },
  { value: '64', label: 'Projets FabLab actifs ou livrés' },
  { value: '480', label: "Jeunes formés à l'IA (INITIA)" },
  { value: '78%', label: "Taux d'insertion professionnelle" },
  { value: '7/9', label: 'Provinces atteintes par les caravanes' },
  { value: '100', label: 'Enseignants formés (partenariat USA)' },
  { value: '12', label: 'Partenaires internationaux actifs' },
];

export const CGI_SERVICE_FAQ = [
  {
    question: "Comment s'inscrire à une formation du CGI ?",
    answer: "Les inscriptions sont ouvertes sur le site cgi.ga et via la plateforme GABON BIZ. Les formations d'acculturation sont gratuites. Les certifications internationales (UIT, SADA) peuvent avoir des frais d'examen couverts par des bourses publiques.",
  },
  {
    question: "Qu'est-ce que la SADA ?",
    answer: "La Smart Africa Digital Academy est l'initiative continentale phare de renforcement des compétences numériques. Financée par la Banque Mondiale et le BMZ allemand, elle a formé plus de 5 000 participants en Afrique. Le CGI est l'entité nationale d'implémentation pour le Gabon.",
  },
  {
    question: 'Qui peut accéder au FabLab ?',
    answer: "Le FabLab est ouvert aux porteurs de projets, startups, étudiants et chercheurs. Un formulaire de candidature est disponible en ligne. Les startups incubées par SING bénéficient d'un accès prioritaire.",
  },
  {
    question: 'Le CGI intervient-il en dehors de Libreville ?',
    answer: "Oui. Le FabLab de Moanda (Haut-Ogooué) est opérationnel en partenariat avec Eramet Comilog. Un espace de formation IA existe à Port-Gentil. Les caravanes numériques parcourent les 9 provinces.",
  },
  {
    question: 'Quel est le lien entre le CGI, KIMBA et SING ?',
    answer: "Le CGI forme les talents et protège les innovations. Les innovateurs publient leurs solutions sur KIMBA. Les startups les plus prometteuses sont incubées par SING. Le CGI nourrit tout le pipeline de l'écosystème numérique gabonais.",
  },
  {
    question: 'Les certifications sont-elles reconnues internationalement ?',
    answer: "Oui. Les certifications sont délivrées en partenariat avec l'UIT et Smart Africa. Elles sont reconnues dans les 55 pays membres de l'Union Africaine et au-delà.",
  },
];

export const CGI_SERVICE_TESTIMONIALS = [
  {
    name: 'Éric Mbeng Nkoghe',
    role: 'Développeur Full-Stack, certifié UIT 2025',
    quote: "La certification cybersécurité du CGI m'a ouvert les portes de Ecobank Digital. Sans cette formation gratuite, je n'aurais jamais pu me certifier au standard international.",
    avatar: 'EM',
  },
  {
    name: 'Laetitia Koumba Nzé',
    role: 'Fondatrice AgriConnect, FabLab Moanda Alumni',
    quote: "Au FabLab de Moanda, j'ai pu prototyper mon capteur d'humidité du sol en 3 semaines. Aujourd'hui, 15 exploitants agricoles l'utilisent dans le Haut-Ogooué.",
    avatar: 'LK',
  },
  {
    name: 'Jean-Michel Obiang',
    role: 'Directeur adjoint, ANINF',
    quote: "Le programme SADA a transformé notre approche de la politique numérique. Nos équipes de régulation sont maintenant alignées sur les standards continentaux Smart Africa.",
    avatar: 'JO',
  },
];
