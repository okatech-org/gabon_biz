// Guichet Unique Entrepreneur — Mock Data
// Business registration, document tracking, appointments

export interface GuichetDossier {
  id: string;
  reference: string;
  type: 'creation' | 'modification' | 'radiation' | 'renouvellement';
  entreprise: string;
  formeJuridique: string;
  statut: 'brouillon' | 'soumis' | 'en_traitement' | 'validé' | 'rejeté';
  dateSoumission: string;
  dateEstimee: string;
  etapeCourante: string;
  progression: number;
}

export interface GuichetDocument {
  id: string;
  nom: string;
  type: 'requis' | 'genere';
  format: string;
  statut: 'a_fournir' | 'fourni' | 'en_verification' | 'validé' | 'rejeté';
  description: string;
}

export interface GuichetRendezVous {
  id: string;
  date: string;
  heure: string;
  service: string;
  agent: string;
  motif: string;
  statut: 'disponible' | 'confirmé' | 'passé' | 'annulé';
}

export interface GuichetFrais {
  label: string;
  montant: string;
  obligatoire: boolean;
}

// ═══════════════════════════════════════════
//  DOSSIERS EN COURS
// ═══════════════════════════════════════════

export const GUICHET_DOSSIERS: GuichetDossier[] = [
  {
    id: 'dos-1',
    reference: 'GUE-2026-CRE-00147',
    type: 'creation',
    entreprise: 'Mbadinga Technologies SARL',
    formeJuridique: 'SARL',
    statut: 'validé',
    dateSoumission: '2026-01-15',
    dateEstimee: '2026-01-25',
    etapeCourante: 'Immatriculation terminée',
    progression: 100,
  },
  {
    id: 'dos-2',
    reference: 'GUE-2026-CRE-00289',
    type: 'creation',
    entreprise: 'Ogooué Logistics SA',
    formeJuridique: 'SA',
    statut: 'en_traitement',
    dateSoumission: '2026-02-01',
    dateEstimee: '2026-03-25',
    etapeCourante: 'Vérification des statuts',
    progression: 65,
  },
  {
    id: 'dos-3',
    reference: 'GUE-2026-CRE-00341',
    type: 'creation',
    entreprise: 'EcoGabon EI',
    formeJuridique: 'EI',
    statut: 'soumis',
    dateSoumission: '2026-03-01',
    dateEstimee: '2026-04-01',
    etapeCourante: 'En attente de traitement',
    progression: 20,
  },
];

// ═══════════════════════════════════════════
//  DOCUMENTS REQUIS
// ═══════════════════════════════════════════

export const GUICHET_DOCUMENTS: GuichetDocument[] = [
  {
    id: 'doc-1',
    nom: 'Formulaire de déclaration',
    type: 'requis',
    format: 'PDF',
    statut: 'validé',
    description: 'Formulaire M0 rempli et signé',
  },
  {
    id: 'doc-2',
    nom: 'Statuts de la société',
    type: 'requis',
    format: 'PDF',
    statut: 'validé',
    description: 'Statuts certifiés conformes, signés par les associés',
  },
  {
    id: 'doc-3',
    nom: "Pièce d'identité du gérant",
    type: 'requis',
    format: 'PDF/JPG',
    statut: 'validé',
    description: 'CNI ou passeport en cours de validité',
  },
  {
    id: 'doc-4',
    nom: 'Justificatif de domiciliation',
    type: 'requis',
    format: 'PDF',
    statut: 'en_verification',
    description: 'Contrat de bail ou attestation de domiciliation',
  },
  {
    id: 'doc-5',
    nom: 'Certificat de conformité',
    type: 'genere',
    format: 'PDF',
    statut: 'a_fournir',
    description: 'Généré après validation du dossier',
  },
  {
    id: 'doc-6',
    nom: 'Extrait RCCM',
    type: 'genere',
    format: 'PDF',
    statut: 'a_fournir',
    description: 'Généré automatiquement après immatriculation',
  },
];

// ═══════════════════════════════════════════
//  RENDEZ-VOUS
// ═══════════════════════════════════════════

export const GUICHET_RENDEZ_VOUS: GuichetRendezVous[] = [
  {
    id: 'rdv-1',
    date: '2026-03-18',
    heure: '09:00',
    service: 'Immatriculation',
    agent: 'Mme Nzé',
    motif: 'Dépôt de dossier',
    statut: 'confirmé',
  },
  {
    id: 'rdv-2',
    date: '2026-03-20',
    heure: '10:30',
    service: 'Fiscalité',
    agent: 'M. Obame',
    motif: 'Obtention NIF',
    statut: 'disponible',
  },
  {
    id: 'rdv-3',
    date: '2026-03-22',
    heure: '14:00',
    service: 'Immatriculation',
    agent: 'Mme Bouanga',
    motif: 'Retrait RCCM',
    statut: 'disponible',
  },
  {
    id: 'rdv-4',
    date: '2026-03-25',
    heure: '08:30',
    service: 'Modification',
    agent: 'M. Essono',
    motif: 'Changement de gérant',
    statut: 'disponible',
  },
  {
    id: 'rdv-5',
    date: '2026-03-27',
    heure: '11:00',
    service: 'Fiscalité',
    agent: 'Mme Moussavou',
    motif: 'Attestation fiscale',
    statut: 'disponible',
  },
];

// ═══════════════════════════════════════════
//  FRAIS
// ═══════════════════════════════════════════

export const GUICHET_FRAIS: GuichetFrais[] = [
  { label: "Frais d'immatriculation RCCM", montant: '25 000 FCFA', obligatoire: true },
  { label: 'Timbres fiscaux', montant: '10 000 FCFA', obligatoire: true },
  { label: 'Frais de publication au JO', montant: '40 000 FCFA', obligatoire: true },
  { label: 'Légalisation des statuts', montant: '15 000 FCFA', obligatoire: true },
  { label: 'Domiciliation (option)', montant: '50 000 FCFA', obligatoire: false },
];

// ═══════════════════════════════════════════
//  STATS
// ═══════════════════════════════════════════

export const GUICHET_STATS = {
  entreprisesCreees2026: 1247,
  delaiMoyen: '72h',
  tauxAcceptation: '94%',
  dossiersEnCours: 89,
};

// ═══════════════════════════════════════════
//  WIZARD STEPS
// ═══════════════════════════════════════════

export const GUICHET_WIZARD_STEPS = [
  { id: 1, label: 'Forme juridique', description: 'Choisissez le type de société' },
  { id: 2, label: 'Informations', description: "Renseignez les détails de l'entreprise" },
  { id: 3, label: 'Documents', description: 'Joignez les pièces requises' },
  { id: 4, label: 'Paiement', description: 'Réglez les frais de création' },
  { id: 5, label: 'Confirmation', description: 'Validez et soumettez' },
];

export const FORMES_JURIDIQUES = [
  {
    id: 'ei',
    label: 'Entreprise Individuelle (EI)',
    description: 'Pas de capital minimum requis',
    delai: '48h',
    cout: '25 000 FCFA',
  },
  {
    id: 'sarl',
    label: 'SARL',
    description: 'Capital minimum : 100 000 FCFA',
    delai: '72h',
    cout: '75 000 FCFA',
  },
  {
    id: 'sa',
    label: 'Société Anonyme (SA)',
    description: 'Capital minimum : 10 000 000 FCFA',
    delai: '5 jours',
    cout: '150 000 FCFA',
  },
  {
    id: 'sas',
    label: 'SAS',
    description: 'Capital libre, statuts flexibles',
    delai: '72h',
    cout: '90 000 FCFA',
  },
];
