// GABON BIZ — KIMBA 2.0 Innovation Hub — Mock Data
// Types, solutions, défis, startups, constantes et utilitaires

// ─── TYPES ───────────────────────────────────────────────────────────

export type SolutionCategorie =
  | 'FinTech' | 'HealthTech' | 'AgriTech' | 'EdTech'
  | 'LogisTech' | 'GovTech' | 'GreenTech' | 'AssurTech'
  | 'e-Commerce' | 'Cybersécurité';

export type PricingModel = 'FREE' | 'FREEMIUM' | 'PAID' | 'CUSTOM';
export type Maturite = 'MVP' | 'Beta' | 'Production' | 'Scale-up';
export type DefiStatut = 'ouvert' | 'en_evaluation' | 'cloture' | 'attribue';

export interface Solution {
  id: string;
  nom: string;
  startup: { id: string; nom: string; logo: string | null };
  categorie: SolutionCategorie;
  sousCategorie: string;
  description: string;
  descriptionCourte: string;
  fonctionnalites: string[];
  technologies: string[];
  pricingModel: PricingModel;
  prixIndicatif: string;
  maturite: Maturite;
  rating: number;
  ratingsCount: number;
  deploiements: number;
  datePublication: string;
  badges: string[];
  screenshots: string[];
  contactEmail: string;
  demoDisponible: boolean;
}

export interface Defi {
  id: string;
  titre: string;
  emetteur: string;
  categorie: string;
  budget: string;
  deadline: string;
  soumissions: number;
  statut: DefiStatut;
  description: string;
  tags: string[];
  recompense: string;
}

export interface Startup {
  id: string;
  nom: string;
  fondateur: string;
  anneeCreation: number;
  secteur: string;
  description: string;
  solutions: string[];
  equipe: number;
  localisation: string;
  stade: Maturite;
  badges: string[];
  metriques: Record<string, string>;
  social: { linkedin: string; twitter: string; website: string };
}

export interface MatchingResult {
  solutionId: string;
  score: number;
  raison: string;
}

// ─── CONSTANTES ──────────────────────────────────────────────────────

export const PRICING_CONFIG: Record<PricingModel, { label: string; color: string; bg: string }> = {
  FREE: { label: 'Gratuit', color: '#059669', bg: 'rgba(5,150,105,0.1)' },
  FREEMIUM: { label: 'Freemium', color: '#3b82f6', bg: 'rgba(59,130,246,0.1)' },
  PAID: { label: 'Payant', color: '#d97706', bg: 'rgba(217,119,6,0.1)' },
  CUSTOM: { label: 'Sur mesure', color: '#8b5cf6', bg: 'rgba(139,92,246,0.1)' },
};

export const MATURITE_CONFIG: Record<Maturite, { label: string; color: string }> = {
  MVP: { label: 'MVP', color: '#ef4444' },
  Beta: { label: 'Beta', color: '#f59e0b' },
  Production: { label: 'Production', color: '#10b981' },
  'Scale-up': { label: 'Scale-up', color: '#6366f1' },
};

export const CATEGORIES_CONFIG: { label: string; value: SolutionCategorie; color: string }[] = [
  { label: 'FinTech', value: 'FinTech', color: '#10B981' },
  { label: 'HealthTech', value: 'HealthTech', color: '#EF4444' },
  { label: 'AgriTech', value: 'AgriTech', color: '#22C55E' },
  { label: 'EdTech', value: 'EdTech', color: '#F59E0B' },
  { label: 'LogisTech', value: 'LogisTech', color: '#3B82F6' },
  { label: 'GovTech', value: 'GovTech', color: '#6366F1' },
  { label: 'GreenTech', value: 'GreenTech', color: '#059669' },
  { label: 'AssurTech', value: 'AssurTech', color: '#8B5CF6' },
  { label: 'e-Commerce', value: 'e-Commerce', color: '#EC4899' },
  { label: 'Cybersécurité', value: 'Cybersécurité', color: '#DC2626' },
];

export const SEARCH_EXAMPLES = [
  'Solution de paiement mobile pour mes employés',
  'Application de gestion des stocks alimentaires',
  'Plateforme e-learning pour formation interne',
  'Chatbot service client en langues locales',
  'Gestion de flotte véhicules avec GPS',
];

// ─── SOLUTIONS (20) ─────────────────────────────────────────────────

export const SOLUTIONS_KIMBA: Solution[] = [
  {
    id: 'sol-1', nom: 'CaPay Salaires',
    startup: { id: 'st-capay', nom: 'CaPay', logo: null },
    categorie: 'FinTech', sousCategorie: 'Paiements B2B',
    description: 'Centralisation et paiement numérique des salaires via mobile money. Solution optimisée pour les entreprises avec employés dans les provinces reculées.',
    descriptionCourte: 'Paiement de salaires via mobile money',
    fonctionnalites: ['Paiement multi-opérateurs (Airtel/Moov)', 'Dashboard employeur', 'Historique & rapports', 'Conformité fiscale (Digitax)', 'SMS de confirmation'],
    technologies: ['React Native', 'Node.js', 'API Airtel Money', 'API Moov Money'],
    pricingModel: 'PAID', prixIndicatif: 'À partir de 50 000 FCFA/mois',
    maturite: 'Production', rating: 4.6, ratingsCount: 24, deploiements: 15,
    datePublication: '2025-06-15', badges: ['Vérifié KIMBA', 'Alumni SING'],
    screenshots: [], contactEmail: 'contact@capay.ga', demoDisponible: true,
  },
  {
    id: 'sol-2', nom: 'POZI Fleet Manager',
    startup: { id: 'st-pozi', nom: 'POZI', logo: null },
    categorie: 'LogisTech', sousCategorie: 'Gestion de flotte',
    description: 'Solution de télématique et gestion de flotte automobile par intelligence artificielle. Suivi GPS temps réel, maintenance prédictive, arrêt véhicule à distance.',
    descriptionCourte: 'Gestion de flotte automobile par IA',
    fonctionnalites: ['GPS temps réel', 'Maintenance prédictive IA', 'Alertes incidents', 'Arrêt véhicule à distance', 'Rapports de performance', 'API ouverte'],
    technologies: ['IoT', 'Machine Learning', 'GPS RTK', 'React', 'Python'],
    pricingModel: 'PAID', prixIndicatif: 'Sur devis (par véhicule/mois)',
    maturite: 'Scale-up', rating: 4.7, ratingsCount: 18, deploiements: 30,
    datePublication: '2025-03-10', badges: ['Vérifié KIMBA', 'Deal VC (€650K)'],
    screenshots: [], contactEmail: 'contact@pozi.app', demoDisponible: true,
  },
  {
    id: 'sol-3', nom: 'GATAX Fiscalité',
    startup: { id: 'st-gatax', nom: 'GATAX', logo: null },
    categorie: 'FinTech', sousCategorie: 'Fiscalité',
    description: 'Application de gestion fiscale simplifiant la déclaration d\'impôts avec conformité Digitax.',
    descriptionCourte: 'Gestion fiscale et aide à la déclaration',
    fonctionnalites: ['Simulation d\'impôts', 'Guide de déclaration', 'Alertes deadlines', 'Export PDF', 'Conformité Digitax/DGI'],
    technologies: ['Flutter', 'Firebase', 'API DGI'],
    pricingModel: 'FREEMIUM', prixIndicatif: 'Gratuit (basique) / 25 000 FCFA/mois (pro)',
    maturite: 'Production', rating: 4.3, ratingsCount: 31, deploiements: 45,
    datePublication: '2025-01-20', badges: ['Vérifié KIMBA', 'Alumni SING'],
    screenshots: [], contactEmail: 'info@gatax.ga', demoDisponible: true,
  },
  {
    id: 'sol-4', nom: 'Orema Smart Meter',
    startup: { id: 'st-orema', nom: 'Orema Technology', logo: null },
    categorie: 'GreenTech', sousCategorie: 'Énergie / IoT',
    description: 'Application mobile de gestion à distance des compteurs d\'électricité prépayés (système Edan). Surveillance consommation, recharge instantanée.',
    descriptionCourte: 'Gestion à distance des compteurs Edan',
    fonctionnalites: ['Consultation solde à distance', 'Recharge instantanée', 'Alertes seuil', 'Historique consommation', 'Multi-compteurs'],
    technologies: ['React Native', 'IoT', 'API Edan', 'Node.js'],
    pricingModel: 'FREE', prixIndicatif: 'Gratuit',
    maturite: 'Production', rating: 4.5, ratingsCount: 42, deploiements: 1200,
    datePublication: '2025-04-01', badges: ['Vérifié KIMBA', 'Lauréat Moov Africa', 'Projet CGI'],
    screenshots: [], contactEmail: 'contact@orema-tech.ga', demoDisponible: false,
  },
  {
    id: 'sol-5', nom: "DUK' OBIERI e-Pharma",
    startup: { id: 'st-duk', nom: "DUK' OBIERI", logo: null },
    categorie: 'HealthTech', sousCategorie: 'Pharmacie numérique',
    description: 'Numérisation des feuilles de soins CNAMGS. Fractionnement des achats de médicaments dans plusieurs pharmacies.',
    descriptionCourte: 'Ordonnance numérique multi-pharmacies CNAMGS',
    fonctionnalites: ['Scan ordonnance', 'Fractionnement achats', 'Multi-pharmacies', 'Suivi traitement', 'Intégration CNAMGS'],
    technologies: ['React Native', 'OCR', 'API CNAMGS', 'PostgreSQL'],
    pricingModel: 'FREE', prixIndicatif: 'Gratuit (financé CNAMGS)',
    maturite: 'Beta', rating: 4.1, ratingsCount: 8, deploiements: 12,
    datePublication: '2025-09-01', badges: ['Vérifié KIMBA'],
    screenshots: [], contactEmail: 'contact@dukobieri.ga', demoDisponible: true,
  },
  {
    id: 'sol-6', nom: 'USHANN DMPG',
    startup: { id: 'st-ushann', nom: 'USHANN LABS', logo: null },
    categorie: 'HealthTech', sousCategorie: 'Dossier médical',
    description: 'Dossier Médical Partagé Gabonais (DMPG). Centralisation des historiques cliniques pour éviter les erreurs médicales.',
    descriptionCourte: 'Dossier médical partagé national',
    fonctionnalites: ['Historique clinique centralisé', 'Interopérabilité hôpitaux', 'QR code patient', 'Alertes interactions', 'Export médecin'],
    technologies: ['FHIR HL7', 'React', 'PostgreSQL', 'Docker'],
    pricingModel: 'CUSTOM', prixIndicatif: 'Sur devis (intégration hospitalière)',
    maturite: 'Beta', rating: 4.0, ratingsCount: 5, deploiements: 3,
    datePublication: '2025-11-01', badges: ['Vérifié KIMBA', 'Projet CGI'],
    screenshots: [], contactEmail: 'labs@ushann.ga', demoDisponible: true,
  },
  {
    id: 'sol-7', nom: 'WAGUI Agri',
    startup: { id: 'st-wagui', nom: 'WAGUI', logo: null },
    categorie: 'AgriTech', sousCategorie: 'Agriculture de précision',
    description: 'Application agricole offline-first. Conseils agronomiques ciblés, micro-finance pour location de matériel.',
    descriptionCourte: 'App agricole offline + micro-finance rurale',
    fonctionnalites: ['Mode offline complet', 'Conseils agronomiques par culture', 'Location matériel mutualisé', 'Micro-prêts', 'Marketplace intrants'],
    technologies: ['React Native', 'SQLite (offline)', 'Sync différée', 'USSD fallback'],
    pricingModel: 'FREEMIUM', prixIndicatif: 'Gratuit (conseils) / Commission sur transactions',
    maturite: 'Production', rating: 4.4, ratingsCount: 15, deploiements: 80,
    datePublication: '2025-07-15', badges: ['Vérifié KIMBA', 'Innovation Offline-First'],
    screenshots: [], contactEmail: 'contact@wagui.ga', demoDisponible: false,
  },
  {
    id: 'sol-8', nom: 'ShopEasy Marketplace',
    startup: { id: 'st-shopeasy', nom: 'ShopEasy Gabon', logo: null },
    categorie: 'e-Commerce', sousCategorie: 'Marketplace B2C',
    description: 'Leader du e-commerce gabonais avec 45% de parts de marché. Marketplace B2C avec livraison à domicile.',
    descriptionCourte: 'Marketplace e-commerce — leader Gabon (45% PDM)',
    fonctionnalites: ['Marketplace multi-vendeurs', 'Paiement mobile (Airtel/Moov)', 'Livraison J+1 Libreville', 'Points relais', 'Programme fidélité'],
    technologies: ['Next.js', 'Stripe Africa', 'React Native', 'PostgreSQL'],
    pricingModel: 'FREEMIUM', prixIndicatif: 'Commission vendeur 8-15%',
    maturite: 'Scale-up', rating: 4.3, ratingsCount: 156, deploiements: 1,
    datePublication: '2025-02-01', badges: ['Vérifié KIMBA', 'Leader e-Commerce'],
    screenshots: [], contactEmail: 'pro@shopeasy.ga', demoDisponible: true,
  },
  {
    id: 'sol-9', nom: 'PERFORMIX Santé',
    startup: { id: 'st-performix', nom: 'PERFORMIX INNO', logo: null },
    categorie: 'HealthTech', sousCategorie: 'e-Santé grand public',
    description: 'Application mobile de e-santé : achats en ligne en pharmacie, prise de rendez-vous hospitaliers.',
    descriptionCourte: 'Pharmacie en ligne + RDV hospitaliers',
    fonctionnalites: ['Commande pharmacie en ligne', 'Prise de RDV', 'Rappels traitement', 'Localisation pharmacies', 'Historique achats'],
    technologies: ['Flutter', 'Firebase', 'Google Maps API'],
    pricingModel: 'FREE', prixIndicatif: 'Gratuit',
    maturite: 'Production', rating: 4.0, ratingsCount: 22, deploiements: 35,
    datePublication: '2025-05-20', badges: ['Vérifié KIMBA'],
    screenshots: [], contactEmail: 'contact@performix.ga', demoDisponible: true,
  },
  {
    id: 'sol-10', nom: 'WEBCARS Mobilité',
    startup: { id: 'st-webcars', nom: 'WEBCARS', logo: null },
    categorie: 'LogisTech', sousCategorie: 'Mobilité partagée',
    description: 'Plateforme de covoiturage urbain et interurbain avec géolocalisation et paiement mobile.',
    descriptionCourte: 'Covoiturage et mobilité partagée',
    fonctionnalites: ['Matching passager-conducteur', 'GPS temps réel', 'Paiement mobile', 'Notation mutuelle', 'Trajets interurbains'],
    technologies: ['React Native', 'Node.js', 'Socket.io', 'Google Maps'],
    pricingModel: 'FREEMIUM', prixIndicatif: 'Commission 15% par trajet',
    maturite: 'Production', rating: 3.8, ratingsCount: 45, deploiements: 1,
    datePublication: '2025-08-10', badges: ['Vérifié KIMBA'],
    screenshots: [], contactEmail: 'contact@webcars.ga', demoDisponible: false,
  },
  {
    id: 'sol-11', nom: 'ATACE HANDI Learning',
    startup: { id: 'st-atace', nom: 'ATACE HANDI', logo: null },
    categorie: 'EdTech', sousCategorie: 'Formation inclusive',
    description: 'Plateforme e-learning avec contenus en vidéo, langue des signes et sous-titrage pour l\'inclusion.',
    descriptionCourte: 'E-learning inclusif (langue des signes)',
    fonctionnalites: ['Vidéo + langue des signes', 'Sous-titrage automatique', 'Parcours adaptatifs', 'Certifications', 'Mode accessibilité avancé'],
    technologies: ['Next.js', 'IA sous-titrage', 'HLS vidéo', 'PostgreSQL'],
    pricingModel: 'FREE', prixIndicatif: 'Gratuit (financé ONG)',
    maturite: 'Production', rating: 4.7, ratingsCount: 12, deploiements: 8,
    datePublication: '2025-04-15', badges: ['Vérifié KIMBA', 'Impact Social'],
    screenshots: [], contactEmail: 'contact@atacehandi.ga', demoDisponible: true,
  },
  {
    id: 'sol-12', nom: 'PANAFRICOM Formation Pro',
    startup: { id: 'st-panafricom', nom: 'PANAFRICOM', logo: null },
    categorie: 'EdTech', sousCategorie: 'Formation B2B',
    description: 'Plateforme e-education B2B dédiée aux formations d\'entreprise avec certifications.',
    descriptionCourte: 'Formation professionnelle continue B2B',
    fonctionnalites: ['Catalogue formations', 'Gestion événements', 'Certifications', 'Suivi progression', 'Reporting RH'],
    technologies: ['Laravel', 'Vue.js', 'MySQL', 'WebRTC'],
    pricingModel: 'PAID', prixIndicatif: 'À partir de 150 000 FCFA/mois',
    maturite: 'Production', rating: 4.2, ratingsCount: 9, deploiements: 6,
    datePublication: '2025-06-01', badges: ['Vérifié KIMBA', 'Projet CGI'],
    screenshots: [], contactEmail: 'contact@panafricom.ga', demoDisponible: true,
  },
  {
    id: 'sol-13', nom: 'Mon Assurance Digital',
    startup: { id: 'st-monassurance', nom: 'Mon Assurance', logo: null },
    categorie: 'AssurTech', sousCategorie: 'Assurance en ligne',
    description: 'Plateforme de souscription et gestion d\'assurances 100% en ligne.',
    descriptionCourte: 'Assurance en ligne — souscription & gestion',
    fonctionnalites: ['Comparateur d\'offres', 'Souscription en ligne', 'Gestion sinistres', 'Paiement mobile', 'Attestations PDF'],
    technologies: ['React', 'Node.js', 'API assureurs', 'PDF génération'],
    pricingModel: 'FREE', prixIndicatif: 'Gratuit (commission assureur)',
    maturite: 'Production', rating: 4.1, ratingsCount: 17, deploiements: 3,
    datePublication: '2025-05-01', badges: ['Vérifié KIMBA', 'Alumni SING'],
    screenshots: [], contactEmail: 'contact@monassurance.ga', demoDisponible: true,
  },
  {
    id: 'sol-14', nom: 'H14 MedBracelet',
    startup: { id: 'st-h14', nom: 'H14', logo: null },
    categorie: 'HealthTech', sousCategorie: 'IoT médical',
    description: 'Bracelets médicaux NFC pour l\'identification rapide des patients en milieu hospitalier.',
    descriptionCourte: 'Bracelet IoT d\'identification patient',
    fonctionnalites: ['NFC patient ID', 'Infos critiques', 'Scan smartphone', 'Dashboard hôpital', 'API intégration DMP'],
    technologies: ['NFC', 'React Native', 'Node.js', 'PostgreSQL'],
    pricingModel: 'PAID', prixIndicatif: '2 500 FCFA/bracelet + 100 000 FCFA/mois',
    maturite: 'Beta', rating: 3.9, ratingsCount: 4, deploiements: 2,
    datePublication: '2025-10-01', badges: ['Vérifié KIMBA'],
    screenshots: [], contactEmail: 'contact@h14.ga', demoDisponible: true,
  },
  {
    id: 'sol-15', nom: 'Transportify Logistique',
    startup: { id: 'st-transportify', nom: 'Transportify Gabon', logo: null },
    categorie: 'LogisTech', sousCategorie: 'Livraison dernier kilomètre',
    description: 'Solution de logistique du dernier kilomètre pour le e-commerce. Réseau de livreurs indépendants.',
    descriptionCourte: 'Livraison dernier kilomètre e-commerce',
    fonctionnalites: ['Réseau livreurs', 'Suivi GPS temps réel', 'Preuve de livraison', 'API e-commerce', 'Tarification dynamique'],
    technologies: ['React Native', 'Node.js', 'Socket.io', 'Maps API'],
    pricingModel: 'PAID', prixIndicatif: 'À partir de 2 000 FCFA/livraison',
    maturite: 'Production', rating: 4.0, ratingsCount: 28, deploiements: 1,
    datePublication: '2025-03-01', badges: ['Vérifié KIMBA'],
    screenshots: [], contactEmail: 'pro@transportify.ga', demoDisponible: false,
  },
  {
    id: 'sol-16', nom: 'MedCare Télémédecine',
    startup: { id: 'st-medcare', nom: 'MedCare Gabon', logo: null },
    categorie: 'HealthTech', sousCategorie: 'Télémédecine',
    description: 'Plateforme de téléconsultation médicale avec visioconférence et prescription électronique.',
    descriptionCourte: 'Téléconsultation médicale en ligne',
    fonctionnalites: ['Visio médecin-patient', 'Prescription électronique', 'Prise de RDV', 'Historique consultations', 'Paiement mobile'],
    technologies: ['WebRTC', 'React', 'Node.js', 'PostgreSQL'],
    pricingModel: 'PAID', prixIndicatif: '5 000 FCFA/consultation',
    maturite: 'Production', rating: 4.2, ratingsCount: 19, deploiements: 5,
    datePublication: '2025-04-01', badges: ['Vérifié KIMBA'],
    screenshots: [], contactEmail: 'contact@medcare.ga', demoDisponible: true,
  },
  {
    id: 'sol-17', nom: 'AgriTrack Traçabilité',
    startup: { id: 'st-agritrack', nom: 'AgriTech Gabon', logo: null },
    categorie: 'AgriTech', sousCategorie: 'Traçabilité alimentaire',
    description: 'Solution de traçabilité des produits agricoles de la ferme au consommateur via QR code.',
    descriptionCourte: 'Traçabilité agricole ferme-à-table',
    fonctionnalites: ['QR code par produit', 'Historique parcours', 'Profil producteur', 'Certification bio', 'API distributeurs'],
    technologies: ['Blockchain (Hyperledger)', 'React Native', 'QR code', 'Node.js'],
    pricingModel: 'FREEMIUM', prixIndicatif: 'Gratuit (producteurs) / 75 000 FCFA/mois (distributeurs)',
    maturite: 'Beta', rating: 4.2, ratingsCount: 8, deploiements: 4,
    datePublication: '2025-08-01', badges: ['Vérifié KIMBA'],
    screenshots: [], contactEmail: 'contact@agritech-gabon.ga', demoDisponible: true,
  },
  {
    id: 'sol-18', nom: 'SolTech Energy Manager',
    startup: { id: 'st-soltech', nom: 'SolTech Gabon', logo: null },
    categorie: 'GreenTech', sousCategorie: 'Énergie solaire',
    description: 'Solution de monitoring d\'installations solaires pour PME et résidences.',
    descriptionCourte: 'Monitoring installations solaires',
    fonctionnalites: ['Dashboard production/consommation', 'Alertes maintenance', 'ROI temps réel', 'Prédiction météo', 'Multi-sites'],
    technologies: ['IoT (Inverter API)', 'React', 'InfluxDB', 'Grafana'],
    pricingModel: 'PAID', prixIndicatif: '50 000 FCFA/mois par installation',
    maturite: 'Production', rating: 4.4, ratingsCount: 7, deploiements: 12,
    datePublication: '2025-07-01', badges: ['Vérifié KIMBA', 'GreenTech Impact'],
    screenshots: [], contactEmail: 'contact@soltech.ga', demoDisponible: true,
  },
  {
    id: 'sol-19', nom: 'eGouv Borne Rurale',
    startup: { id: 'st-cgi-govtech', nom: 'CGI — Équipe GovTech', logo: null },
    categorie: 'GovTech', sousCategorie: 'Services publics',
    description: 'Borne autonome basse consommation pour accéder aux e-services publics dans les mairies rurales.',
    descriptionCourte: 'Borne e-services publics pour mairies rurales',
    fonctionnalites: ['Accès eTax, eVisa, eDeclaration', 'Écran tactile', '4G/WiFi autonome', 'Boîtier imprimé 3D', 'Mode basse consommation'],
    technologies: ['Raspberry Pi', 'Kiosk Linux', '4G LTE', 'Impression 3D'],
    pricingModel: 'CUSTOM', prixIndicatif: 'Sur devis (déploiement institutionnel)',
    maturite: 'Production', rating: 4.6, ratingsCount: 3, deploiements: 5,
    datePublication: '2026-01-15', badges: ['Vérifié KIMBA', 'Projet CGI', 'FabLab'],
    screenshots: [], contactEmail: 'govtech@cgi.ga', demoDisponible: false,
  },
  {
    id: 'sol-20', nom: 'Alissa IA Assistant',
    startup: { id: 'st-alissa', nom: 'Alissa IA', logo: null },
    categorie: 'GovTech', sousCategorie: 'Intelligence Artificielle',
    description: 'Solutions d\'intelligence artificielle accessibles et adaptées aux réalités africaines.',
    descriptionCourte: 'IA accessible adaptée aux réalités africaines',
    fonctionnalites: ['Chatbot multilingue', 'Analyse documentaire IA', 'Automatisation processus', 'API REST', 'Dashboard analytics'],
    technologies: ['Python', 'LLM fine-tuned', 'FastAPI', 'React'],
    pricingModel: 'PAID', prixIndicatif: 'À partir de 200 000 FCFA/mois',
    maturite: 'Production', rating: 4.5, ratingsCount: 6, deploiements: 4,
    datePublication: '2026-02-01', badges: ['Vérifié KIMBA', 'Osiane 2026'],
    screenshots: [], contactEmail: 'contact@alissa-ia.ga', demoDisponible: true,
  },
];

// ─── DÉFIS (5) ───────────────────────────────────────────────────────

export const DEFIS_KIMBA: Defi[] = [
  {
    id: 'defi-1', titre: 'Digitalisation des paiements fournisseurs',
    emetteur: "CNAMGS (Caisse Nationale d'Assurance Maladie)",
    categorie: 'FinTech', budget: '10-25M FCFA', deadline: '2026-05-30', soumissions: 7, statut: 'ouvert',
    description: 'Recherche une solution de paiement numérique B2B pour automatiser le règlement des fournisseurs médicaux agréés.',
    tags: ['API Paiement', 'B2B', 'Santé', 'Mobile Money'],
    recompense: 'Contrat pilote 12 mois + accompagnement SING',
  },
  {
    id: 'defi-2', titre: 'Traçabilité de la chaîne du bois',
    emetteur: 'Ministère des Eaux & Forêts',
    categorie: 'GreenTech', budget: '15-40M FCFA', deadline: '2026-06-15', soumissions: 4, statut: 'ouvert',
    description: 'Solution de traçabilité blockchain/IoT pour suivre le bois de la coupe à l\'exportation, conformité FLEGT.',
    tags: ['Blockchain', 'IoT', 'Foresterie', 'Conformité'],
    recompense: 'Marché public + déploiement national',
  },
  {
    id: 'defi-3', titre: 'Chatbot citoyen multilingue pour les e-services',
    emetteur: 'ANINF / Programme Gabon Digital',
    categorie: 'GovTech', budget: '5-15M FCFA', deadline: '2026-07-01', soumissions: 12, statut: 'ouvert',
    description: 'Chatbot IA accessible en français et en langues locales (Fang, Punu, Nzebi) pour guider les citoyens vers les e-services publics.',
    tags: ['IA', 'NLP', 'Langues locales', 'Chatbot'],
    recompense: 'Intégration portail national + financement Banque Mondiale',
  },
  {
    id: 'defi-4', titre: 'Plateforme de gestion de flotte pour transporteurs',
    emetteur: 'Fédération des Transporteurs du Gabon',
    categorie: 'LogisTech', budget: '8-20M FCFA', deadline: '2026-05-15', soumissions: 5, statut: 'ouvert',
    description: 'Solution SaaS de suivi GPS, maintenance prédictive et optimisation d\'itinéraires pour PME du transport interurbain.',
    tags: ['GPS', 'SaaS', 'IA Prédictive', 'Transport'],
    recompense: 'Contrat cadre fédération + 200 véhicules pilotes',
  },
  {
    id: 'defi-5', titre: 'Application de micro-assurance agricole',
    emetteur: "IGAD (Institut Gabonais d'Appui au Développement)",
    categorie: 'AgriTech / AssurTech', budget: '5-12M FCFA', deadline: '2026-08-01', soumissions: 3, statut: 'ouvert',
    description: 'Application mobile de micro-assurance récolte basée sur des données météo satellites pour les petits exploitants.',
    tags: ['Assurance', 'Satellite', 'Agriculture', 'Mobile'],
    recompense: 'Pilote 500 agriculteurs + cofinancement FONAP',
  },
];

// ─── STARTUPS VEDETTES (5) ──────────────────────────────────────────

export const STARTUPS_VEDETTES: Startup[] = [
  {
    id: 'st-pozi', nom: 'POZI', fondateur: 'Loïc Kapitho & Thomas Leluc', anneeCreation: 2020,
    secteur: 'LogisTech / IA', description: 'Télématique et gestion de flotte automobile par intelligence artificielle',
    solutions: ['sol-2'], equipe: 12, localisation: 'Libreville', stade: 'Scale-up',
    badges: ['Vérifié KIMBA', 'Deal VC (€650K)'],
    metriques: { vehicules: '2 500+', clients: 'Transport + Multinationales', levee: '€650K (Seed)' },
    social: { linkedin: '#', twitter: '#', website: 'https://pozi.app' },
  },
  {
    id: 'st-capay', nom: 'CaPay', fondateur: 'Ariane Akeret', anneeCreation: 2018,
    secteur: 'FinTech / Paiements', description: 'Centralisation et paiement numérique des salaires via mobile money',
    solutions: ['sol-1'], equipe: 8, localisation: 'Libreville', stade: 'Production',
    badges: ['Vérifié KIMBA', 'Alumni SING'],
    metriques: { utilisateurs: '5 000+', provinces: '7/9 couvertes', partenaires: '3 opérateurs' },
    social: { linkedin: '#', twitter: '#', website: 'https://capay.ga' },
  },
  {
    id: 'st-orema', nom: 'Orema Technology', fondateur: 'Équipe Orema', anneeCreation: 2022,
    secteur: 'GreenTech / EnergyTech', description: 'Application mobile de gestion à distance des compteurs d\'électricité prépayés Edan',
    solutions: ['sol-4'], equipe: 6, localisation: 'Libreville', stade: 'Production',
    badges: ['Vérifié KIMBA', 'Lauréat Moov Africa', 'Projet CGI'],
    metriques: { compteurs: '1 200+', users: '3 000+', prix: '1er prix Moov Africa Challenge' },
    social: { linkedin: '#', twitter: '#', website: 'https://orema-tech.ga' },
  },
  {
    id: 'st-shopeasy', nom: 'ShopEasy Gabon', fondateur: 'Équipe ShopEasy', anneeCreation: 2021,
    secteur: 'e-Commerce', description: 'Leader du commerce électronique gabonais — 45% de parts de marché',
    solutions: ['sol-8'], equipe: 25, localisation: 'Libreville', stade: 'Scale-up',
    badges: ['Vérifié KIMBA', 'Leader e-Commerce'],
    metriques: { revenue: '$4,2M (2025)', pdm: '45%', croissance: '+68% en 2 ans' },
    social: { linkedin: '#', twitter: '#', website: 'https://shopeasy.ga' },
  },
  {
    id: 'st-ushann', nom: 'USHANN LABS', fondateur: 'Équipe USHANN', anneeCreation: 2023,
    secteur: 'HealthTech', description: 'Dossier Médical Partagé Gabonais (DMPG)',
    solutions: ['sol-6'], equipe: 4, localisation: 'Libreville', stade: 'Beta',
    badges: ['Vérifié KIMBA', 'Projet CGI'],
    metriques: { hopitaux: '3 pilotes', patients: 'En développement', partenaire: 'Ministère Santé' },
    social: { linkedin: '#', twitter: '#', website: 'https://ushann.ga' },
  },
];

// ─── TÉMOIGNAGES ─────────────────────────────────────────────────────

export const TEMOIGNAGES_KIMBA = [
  { nom: 'Hervé Essono', role: 'Directeur Supermarché Prix Import, Oyem', quote: "Grâce à KIMBA, j'ai trouvé une solution de gestion de stocks développée à Libreville. En 3 mois, mes pertes ont baissé de 40%.", avatar: 'HE', rating: 5, solutionUtilisee: 'StockTrack GA' },
  { nom: 'Sara Mboumba', role: 'CEO TechPay Solutions, Libreville', quote: "En tant que startup, KIMBA nous a donné une visibilité que nous n'aurions jamais eue. Trois entreprises nous ont contactés en un mois.", avatar: 'SM', rating: 5, solutionUtilisee: null },
  { nom: 'Patrick Obame', role: 'DSI, Ministère de la Santé', quote: "Le matching IA nous a recommandé USHANN LABS pour notre projet de dossier médical partagé. La pertinence était impressionnante.", avatar: 'PO', rating: 4, solutionUtilisee: 'USHANN LABS DMPG' },
  { nom: 'Ariane Akeret', role: 'Fondatrice CaPay, Alumni SING', quote: "KIMBA a changé la donne pour nous. Avant, on démarchait les entreprises une par une. Maintenant, elles viennent à nous via la plateforme.", avatar: 'AA', rating: 5, solutionUtilisee: null },
  { nom: 'Jean-Paul Ndong', role: 'Managing Partner, Ndong Capital Partners', quote: "En tant qu'investisseur, le catalogue KIMBA est devenu mon outil de sourcing principal.", avatar: 'JN', rating: 5, solutionUtilisee: null },
  { nom: 'Marie Bouanga', role: 'DRH, Comilog (Eramet), Moanda', quote: "Nous cherchions une solution de paie mobile pour nos sites miniers reculés. KIMBA nous a mis en relation avec CaPay en 48h.", avatar: 'MB', rating: 4, solutionUtilisee: 'CaPay' },
];

// ─── FAQ ─────────────────────────────────────────────────────────────

export const FAQ_KIMBA = [
  { q: "Qu'est-ce que KIMBA ?", a: "KIMBA (« avancer, innover » en Nzebi) est la plateforme nationale d'open innovation du Gabon, opérée par le MENUDI en partenariat avec la SING, la SPIN, l'ANINF et la FEG." },
  { q: 'Comment fonctionne le matching IA ?', a: "Décrivez votre besoin en langage naturel. L'algorithme analyse les mots-clés, le secteur et le budget pour vous proposer un top 5 classé par score de compatibilité (0-100%)." },
  { q: "L'inscription est-elle gratuite ?", a: "Oui. L'inscription et la consultation du catalogue sont 100% gratuites. Les fonctionnalités avancées sont accessibles après inscription via GABON ID." },
  { q: 'Qui peut publier une solution sur KIMBA ?', a: "Toute startup ou entreprise tech enregistrée au RCCM au Gabon. Les startups incubées par la SING bénéficient d'un processus accéléré." },
  { q: "Comment lancer un défi d'innovation ?", a: "Les grandes entreprises et institutions publiques peuvent soumettre un défi via le dashboard. Le défi est publié avec un budget, une deadline et des critères." },
  { q: 'KIMBA est-il réservé aux entreprises gabonaises ?', a: "Le catalogue met en avant les solutions développées au Gabon. Cependant, les entreprises étrangères présentes au Gabon peuvent aussi participer." },
  { q: 'Quel est le lien entre KIMBA, SING et le CGI ?', a: "Le CGI forme les innovateurs. La SING les incube. KIMBA leur donne un marché. C'est un pipeline complet : formation → incubation → marché." },
  { q: 'Comment sont vérifiées les solutions ?', a: "Chaque solution publiée est soumise à une validation par l'équipe KIMBA. Les avis utilisateurs et le badge 'Vérifié KIMBA' renforcent la confiance." },
];

// ─── STATS ÉCOSYSTÈME ────────────────────────────────────────────────

export const ECOSYSTEME_STATS = [
  { value: 100, suffix: '+', label: 'Solutions publiées', color: '#8B5CF6' },
  { value: 38, suffix: '', label: 'Startups actives', color: '#10B981' },
  { value: 15, suffix: '', label: 'Défis ouverts', color: '#F59E0B' },
  { value: 2903, suffix: ' Mds', label: 'FCFA transactions mobile money', color: '#3B82F6' },
  { value: 650, prefix: '€', suffix: 'K', label: 'Levée VC cumulée (2025)', color: '#14B8A6' },
  { value: 4.2, suffix: '/5', label: 'Note moyenne des solutions', color: '#F59E0B' },
];

// ─── ANALYTICS ───────────────────────────────────────────────────────

export const ANALYTICS_REPARTITION = [
  { name: 'FinTech', value: 18, color: '#10B981' },
  { name: 'HealthTech', value: 12, color: '#EF4444' },
  { name: 'EdTech', value: 14, color: '#F59E0B' },
  { name: 'LogisTech', value: 9, color: '#3B82F6' },
  { name: 'GovTech', value: 11, color: '#6366F1' },
  { name: 'AgriTech', value: 8, color: '#22C55E' },
  { name: 'GreenTech', value: 7, color: '#059669' },
  { name: 'e-Commerce', value: 10, color: '#EC4899' },
  { name: 'AssurTech', value: 5, color: '#8B5CF6' },
  { name: 'Cybersécurité', value: 6, color: '#DC2626' },
];

export const ANALYTICS_EVOLUTION = [
  { mois: 'Jan 2025', solutions: 12 },
  { mois: 'Mar 2025', solutions: 28 },
  { mois: 'Mai 2025', solutions: 45 },
  { mois: 'Jul 2025', solutions: 62 },
  { mois: 'Sep 2025', solutions: 78 },
  { mois: 'Nov 2025', solutions: 89 },
  { mois: 'Jan 2026', solutions: 95 },
  { mois: 'Mar 2026', solutions: 103 },
];

// ─── UTILITY FUNCTIONS ──────────────────────────────────────────────

export function getSolutionById(id: string): Solution | undefined {
  return SOLUTIONS_KIMBA.find(s => s.id === id);
}

export function getStartupById(id: string): Startup | undefined {
  return STARTUPS_VEDETTES.find(s => s.id === id);
}

export function getDefiById(id: string): Defi | undefined {
  return DEFIS_KIMBA.find(d => d.id === id);
}

export function getSolutionsByStartup(startupId: string): Solution[] {
  return SOLUTIONS_KIMBA.filter(s => s.startup.id === startupId);
}

export function filterSolutions(opts: {
  search?: string;
  categorie?: SolutionCategorie | 'all';
  pricing?: PricingModel | 'all';
  maturite?: Maturite | 'all';
  minRating?: number;
  badge?: string;
}): Solution[] {
  let results = [...SOLUTIONS_KIMBA];
  if (opts.search) {
    const q = opts.search.toLowerCase();
    results = results.filter(s =>
      s.nom.toLowerCase().includes(q) ||
      s.description.toLowerCase().includes(q) ||
      s.startup.nom.toLowerCase().includes(q) ||
      s.technologies.some(t => t.toLowerCase().includes(q)) ||
      s.categorie.toLowerCase().includes(q)
    );
  }
  if (opts.categorie && opts.categorie !== 'all') {
    results = results.filter(s => s.categorie === opts.categorie);
  }
  if (opts.pricing && opts.pricing !== 'all') {
    results = results.filter(s => s.pricingModel === opts.pricing);
  }
  if (opts.maturite && opts.maturite !== 'all') {
    results = results.filter(s => s.maturite === opts.maturite);
  }
  if (opts.minRating) {
    results = results.filter(s => s.rating >= opts.minRating!);
  }
  if (opts.badge) {
    results = results.filter(s => s.badges.includes(opts.badge!));
  }
  return results;
}

export function simulateMatching(query: string, categorie?: string): MatchingResult[] {
  const q = query.toLowerCase();
  const scored = SOLUTIONS_KIMBA.map(sol => {
    let score = 30 + Math.random() * 20; // base
    if (sol.nom.toLowerCase().includes(q) || sol.description.toLowerCase().includes(q)) score += 30;
    if (sol.technologies.some(t => t.toLowerCase().includes(q))) score += 15;
    if (categorie && sol.categorie.toLowerCase().includes(categorie.toLowerCase())) score += 20;
    if (sol.maturite === 'Production' || sol.maturite === 'Scale-up') score += 5;
    if (sol.rating >= 4.5) score += 5;
    score = Math.min(Math.round(score), 99);
    return { solutionId: sol.id, score, raison: sol.descriptionCourte };
  });
  return scored.sort((a, b) => b.score - a.score).slice(0, 5);
}

export function getDaysUntilDeadline(deadline: string): number {
  const now = new Date();
  const dl = new Date(deadline);
  return Math.max(0, Math.ceil((dl.getTime() - now.getTime()) / (1000 * 60 * 60 * 24)));
}

export function getCategoryCounts(): Record<string, number> {
  const counts: Record<string, number> = {};
  for (const sol of SOLUTIONS_KIMBA) {
    counts[sol.categorie] = (counts[sol.categorie] || 0) + 1;
  }
  return counts;
}
