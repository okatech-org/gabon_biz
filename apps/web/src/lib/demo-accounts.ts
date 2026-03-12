// GABON BIZ — Demo Accounts Configuration
// 10 pre-configured demo profiles for platform exploration

export interface DemoAccount {
  id: string;
  user: {
    nip: string;
    fullName: string;
    name: string;
    email: string;
    phone?: string;
    profileType: 'ENTREPRENEUR' | 'STARTUP' | 'INVESTOR' | 'ADMIN' | 'PUBLIC' | 'INSTITUTION';
    roles: string[];
    organization?: string;
    title?: string;
    location?: string;
    locale?: string;
    isDemo: true;
  };
  label: string;
  description: string;
  icon: string;
  accentColor: string;
  accessibleModules: string[];
  scenarioDescription: string;
}

export const DEMO_ACCOUNTS: DemoAccount[] = [
  // 1 — ENTREPRENEUR
  {
    id: 'demo-entrepreneur',
    user: {
      nip: 'GA-DEMO-ENT-001',
      fullName: 'Ange Moussavou',
      name: 'Ange M.',
      email: 'ange.moussavou@demo.gabonbiz.ga',
      phone: '+241 077 12 34 56',
      profileType: 'ENTREPRENEUR',
      roles: [],
      organization: 'Mbadinga Technologies SARL',
      title: 'Directeur Général',
      location: 'Libreville',
      isDemo: true,
    },
    label: 'Entrepreneur',
    description: "Créateur et gérant d'entreprise. Accède au guichet unique, aux marchés publics et à la soumission d'offres.",
    icon: '🏢',
    accentColor: '#009e49',
    accessibleModules: ['/dashboard', '/dashboard/entreprises', '/dashboard/marches', '/dashboard/soumissions', '/dashboard/filieres', '/dashboard/annuaire'],
    scenarioDescription: "Ange est fondateur de Mbadinga Technologies, une SARL spécialisée dans les solutions digitales à Libreville. Il a 3 entreprises enregistrées, 2 soumissions actives aux marchés publics.",
  },
  // 2 — STARTUP
  {
    id: 'demo-startup',
    user: {
      nip: 'GA-DEMO-STA-001',
      fullName: 'Sara Mboumba',
      name: 'Sara M.',
      email: 'sara.mboumba@demo.gabonbiz.ga',
      phone: '+241 066 98 76 54',
      profileType: 'STARTUP',
      roles: [],
      organization: 'TechPay Solutions',
      title: 'CEO & Co-fondatrice',
      location: 'Libreville',
      isDemo: true,
    },
    label: 'Startup / Fondateur',
    description: "Fondatrice de startup tech. Publie des solutions sur l'Innovation Hub, participe à l'incubateur et cherche des financements.",
    icon: '🚀',
    accentColor: '#8b5cf6',
    accessibleModules: ['/dashboard', '/dashboard/entreprises', '/dashboard/innovation', '/dashboard/incubateur', '/dashboard/investir', '/dashboard/annuaire'],
    scenarioDescription: "Sara a fondé TechPay Solutions, une startup FinTech incubée dans la cohorte SING 2.0. Elle a publié 2 solutions sur l'Innovation Hub et recherche un financement Seed de 150M FCFA.",
  },
  // 3 — INVESTISSEUR VC
  {
    id: 'demo-investisseur',
    user: {
      nip: 'GA-DEMO-INV-001',
      fullName: 'Jean-Paul Ndong',
      name: 'J.P. Ndong',
      email: 'jp.ndong@demo.gabonbiz.ga',
      phone: '+241 066 33 22 11',
      profileType: 'INVESTOR',
      roles: ['INVESTOR'],
      organization: 'Ndong Capital Partners',
      title: 'Managing Partner — Fonds VC Afrique Centrale',
      location: 'Libreville & Paris',
      isDemo: true,
    },
    label: 'Investisseur VC',
    description: "Managing Partner d'un fonds VC spécialisé Afrique Centrale. Explore le deal flow, analyse les métriques macro et suit les startups à fort potentiel.",
    icon: '💰',
    accentColor: '#14b8a6',
    accessibleModules: [
      '/dashboard', '/dashboard/innovation', '/dashboard/incubateur',
      '/dashboard/investir', '/dashboard/investir/opportunites',
      '/dashboard/investir/macro', '/dashboard/investir/due-diligence',
      '/dashboard/observatoire', '/dashboard/filieres', '/dashboard/annuaire',
    ],
    scenarioDescription: "Jean-Paul dirige Ndong Capital Partners, un fonds VC de €5M dédié à l'Afrique centrale. Il a investi dans 3 startups au Cameroun et cherche activement des deals au Gabon depuis la réussite du tour POZI/Saviu. Il utilise GABON BIZ pour identifier les startups, analyser les données macro et préparer ses comités d'investissement.",
  },
  // 4 — AGENT DGMP
  {
    id: 'demo-dgmp',
    user: {
      nip: 'GA-DEMO-DGM-001',
      fullName: 'Patrick Obame',
      name: 'Patrick O.',
      email: 'patrick.obame@dgmp.gouv.ga',
      phone: '+241 011 76 54 32',
      profileType: 'PUBLIC',
      roles: ['DGMP'],
      organization: 'Direction Générale des Marchés Publics',
      title: 'Chef de Service Dématérialisation',
      location: 'Libreville',
      isDemo: true,
    },
    label: 'Agent DGMP',
    description: "Agent des Marchés Publics. Publie les appels d'offres, évalue les soumissions, attribue les marchés.",
    icon: '📋',
    accentColor: '#3b82f6',
    accessibleModules: ['/dashboard', '/dashboard/marches', '/dashboard/soumissions', '/dashboard/filieres', '/dashboard/annuaire'],
    scenarioDescription: "Patrick est responsable de la dématérialisation des marchés publics à la DGMP. Il a 4 marchés en cours de publication et 25 soumissions à évaluer.",
  },
  // 5 — MENTOR
  {
    id: 'demo-mentor',
    user: {
      nip: 'GA-DEMO-MEN-001',
      fullName: 'Dr. Christelle Nguema',
      name: 'Dr. Nguema',
      email: 'christelle.nguema@demo.gabonbiz.ga',
      phone: '+241 077 22 11 00',
      profileType: 'PUBLIC',
      roles: ['MENTOR'],
      organization: 'École Polytechnique de Masuku',
      title: 'Professeure & Mentore SING 2.0',
      location: 'Franceville',
      isDemo: true,
    },
    label: 'Mentor / Expert',
    description: "Mentore dans le programme d'incubation. Accompagne les startups, organise des sessions de mentorat et évalue les candidatures.",
    icon: '🎓',
    accentColor: '#ec4899',
    accessibleModules: ['/dashboard', '/dashboard/incubateur', '/dashboard/innovation', '/dashboard/observatoire', '/dashboard/annuaire'],
    scenarioDescription: "Dr. Nguema est professeure en entrepreneuriat et mentore certifiée du programme SING 2.0. Elle accompagne 3 startups dans la cohorte actuelle.",
  },
  // 6 — ADMIN MENUDI
  {
    id: 'demo-admin',
    user: {
      nip: 'GA-DEMO-ADM-001',
      fullName: 'Marie-Claire Ndong',
      name: 'Marie-Claire N.',
      email: 'mc.ndong@menudi.gouv.ga',
      phone: '+241 011 44 55 66',
      profileType: 'ADMIN',
      roles: ['ADMIN'],
      organization: "Ministère de l'Économie Numérique (MENUDI)",
      title: 'Directrice de la Digitalisation',
      location: 'Libreville',
      isDemo: true,
    },
    label: 'Administrateur MENUDI',
    description: "Administratrice de la plateforme. Accès total : gestion des entreprises, marchés, cohortes, indicateurs et configuration système.",
    icon: '🛡️',
    accentColor: '#ef4444',
    accessibleModules: [
      '/dashboard', '/dashboard/entreprises', '/dashboard/marches', '/dashboard/soumissions',
      '/dashboard/innovation', '/dashboard/incubateur', '/dashboard/investir',
      '/dashboard/observatoire', '/dashboard/filieres', '/dashboard/cgi',
    ],
    scenarioDescription: "Marie-Claire supervise l'ensemble de la plateforme GABON BIZ. Accès super-admin à tous les modules et statistiques globales.",
  },
  // 7 — ANALYSTE OBSERVATOIRE
  {
    id: 'demo-analyste',
    user: {
      nip: 'GA-DEMO-ANA-001',
      fullName: 'Hervé Essono',
      name: 'Hervé E.',
      email: 'herve.essono@demo.gabonbiz.ga',
      phone: '+241 066 33 22 11',
      profileType: 'PUBLIC',
      roles: ['OBSERVATOIRE'],
      organization: 'ANINF - Observatoire du Numérique',
      title: 'Analyste Données Numériques',
      location: 'Libreville',
      isDemo: true,
    },
    label: 'Analyste Observatoire',
    description: "Analyste de données économiques numériques. Consulte et met à jour les indicateurs, génère des rapports et gère l'API Open Data.",
    icon: '📊',
    accentColor: '#f59e0b',
    accessibleModules: ['/dashboard', '/dashboard/observatoire', '/dashboard/filieres', '/dashboard/investir', '/dashboard/annuaire'],
    scenarioDescription: "Hervé travaille à l'ANINF et alimente l'Observatoire de l'Économie Numérique. Il suit 42 indicateurs clés et génère des rapports trimestriels.",
  },
  // 8 — CITOYEN
  {
    id: 'demo-citoyen',
    user: {
      nip: 'GA-DEMO-CIT-001',
      fullName: 'Fatima Nzé',
      name: 'Fatima N.',
      email: 'fatima.nze@demo.gabonbiz.ga',
      phone: '+241 074 11 22 33',
      profileType: 'PUBLIC',
      roles: [],
      organization: '',
      title: 'Citoyenne',
      location: 'Port-Gentil',
      isDemo: true,
    },
    label: 'Citoyen / Public',
    description: "Simple citoyen qui consulte l'annuaire des entreprises, les marchés publics ouverts et les statistiques nationales.",
    icon: '👤',
    accentColor: '#6b7280',
    accessibleModules: ['/dashboard', '/dashboard/entreprises', '/dashboard/marches', '/dashboard/observatoire', '/dashboard/filieres', '/dashboard/annuaire'],
    scenarioDescription: "Fatima est une citoyenne de Port-Gentil qui utilise GABON BIZ pour vérifier l'existence légale d'entreprises et consulter les marchés publics ouverts.",
  },
  // 9 — PARTENAIRE INTERNATIONAL (DFI)
  {
    id: 'demo-partenaire',
    user: {
      nip: 'GA-DEMO-PTR-001',
      fullName: 'Li Wei',
      name: 'Li W.',
      email: 'li.wei@worldbank.org',
      phone: '+1 202 555 0147',
      profileType: 'INVESTOR',
      roles: ['PARTNER_INTL'],
      organization: 'Banque Mondiale - Bureau Gabon',
      title: "Chargé d'Investissement Afrique Centrale",
      location: 'Washington D.C. / Libreville',
      locale: 'en',
      isDemo: true,
    },
    label: 'Partenaire International',
    description: "Représentant d'un bailleur de fonds international. Accède aux données pays, au deal flow et aux rapports de l'observatoire.",
    icon: '🌍',
    accentColor: '#0ea5e9',
    accessibleModules: [
      '/dashboard', '/dashboard/investir', '/dashboard/investir/opportunites',
      '/dashboard/investir/macro', '/dashboard/investir/due-diligence',
      '/dashboard/observatoire', '/dashboard/filieres', '/dashboard/innovation', '/dashboard/annuaire',
    ],
    scenarioDescription: "Li Wei représente un DFI asiatique explorant le marché gabonais suite aux visites de la délégation émiratie et du MoU Huawei-CEMAC. Il suit les programmes Gabon Digital et SADA pour identifier des co-investissements en infrastructure et GovTech.",
  },
  // 10 — AUTORITÉ CONTRACTANTE
  {
    id: 'demo-autorite',
    user: {
      nip: 'GA-DEMO-AUT-001',
      fullName: 'Jean-Sylvain Mba',
      name: 'Jean-Sylvain M.',
      email: 'js.mba@aninf.ga',
      phone: '+241 011 77 88 99',
      profileType: 'PUBLIC',
      roles: ['AUTORITE_CONTRACTANTE'],
      organization: 'ANINF',
      title: 'Directeur des Marchés et Contrats',
      location: 'Libreville',
      isDemo: true,
    },
    label: 'Autorité Contractante',
    description: "Entité publique émettrice de marchés. Crée et publie des appels d'offres, reçoit et évalue les soumissions.",
    icon: '🏛️',
    accentColor: '#7c3aed',
    accessibleModules: ['/dashboard', '/dashboard/marches', '/dashboard/soumissions', '/dashboard/annuaire'],
    scenarioDescription: "Jean-Sylvain est directeur des marchés à l'ANINF. Il rédige et publie des appels d'offres pour les projets d'infrastructure numérique.",
  },
  // 11 — ADMIN SYSTÈME
  {
    id: 'demo-sysadmin',
    user: {
      nip: 'GA-DEMO-SYS-001',
      fullName: 'Rodrigue Mba Ondo',
      name: 'Rodrigue M.',
      email: 'rodrigue.mba@infra.gabonbiz.ga',
      phone: '+241 011 99 88 77',
      profileType: 'ADMIN',
      roles: ['SYSADMIN'],
      organization: 'GABON BIZ — Équipe Technique',
      title: 'Administrateur Système & DevOps',
      location: 'Libreville',
      isDemo: true,
    },
    label: 'Admin Système',
    description: "Responsable de la maintenance et de l'administration technique. Accès complet à tous les modules, logs, configuration et supervision de l'infrastructure.",
    icon: '⚙️',
    accentColor: '#334155',
    accessibleModules: [
      '/dashboard', '/dashboard/entreprises', '/dashboard/marches', '/dashboard/soumissions',
      '/dashboard/innovation', '/dashboard/incubateur', '/dashboard/investir',
      '/dashboard/observatoire', '/dashboard/filieres', '/dashboard/admin', '/dashboard/cgi',
    ],
    scenarioDescription: "Rodrigue est l'administrateur système de GABON BIZ. Il supervise l'infrastructure, gère les deployments, monitore la performance et assure la maintenance applicative. Accès root à l'ensemble du système.",
  },
  // 12 — DIRECTEUR CGI
  {
    id: 'demo-cgi',
    user: {
      nip: 'GA-DEMO-CGI-001',
      fullName: 'Dr. Franck-Éric Oyane Ndong',
      name: 'Dr. Oyane N.',
      email: 'fe.oyane@cgi.ga',
      phone: '+241 011 88 77 66',
      profileType: 'INSTITUTION',
      roles: ['CGI_DIRECTEUR'],
      organization: "Centre Gabonais de l'Innovation (CGI)",
      title: 'Directeur Général',
      location: 'Libreville',
      isDemo: true,
    },
    label: 'Directeur CGI',
    description: "Directeur du Centre Gabonais de l'Innovation. Pilote les 4 pôles (Acculturation, Certification, FabLab, MediaLab), gère le programme SADA et les partenariats internationaux.",
    icon: '🏛️',
    accentColor: '#F59E0B',
    accessibleModules: [
      '/dashboard', '/dashboard/cgi', '/dashboard/innovation', '/dashboard/incubateur',
      '/dashboard/observatoire', '/dashboard/filieres', '/dashboard/annuaire',
    ],
    scenarioDescription: "Dr. Franck-Éric Oyane Ndong dirige le CGI depuis son inauguration en 2024. Il supervise 3 420 personnes formées, 64 projets FabLab, le programme SADA et les partenariats avec l'UIT, Smart Africa et l'UNESCO.",
  },
];

// Helper: find a demo account by ID
export function getDemoAccountById(id: string): DemoAccount | undefined {
  return DEMO_ACCOUNTS.find((a) => a.id === id);
}

// Helper: find a demo account by NIP
export function getDemoAccountByNip(nip: string): DemoAccount | undefined {
  return DEMO_ACCOUNTS.find((a) => a.user.nip === nip);
}
