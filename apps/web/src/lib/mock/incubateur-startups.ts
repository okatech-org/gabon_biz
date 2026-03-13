import type { StartupSING, Mentor, Cohorte, Evenement, Milestone, ProgrammeId, SecteurNormalise } from './incubateur-types';

// ══════════════════════════════════════════════════════════════════════════
// PARTIE 1 : TOP STARTUPS (58) — Actives + Matures + Formalisées
// ══════════════════════════════════════════════════════════════════════════

export const TOP_STARTUPS_SING: StartupSING[] = [
  { id: "transmed", num: 50, nom: "TRANSMED", programmeId: "techclinic", programmeRaw: "TECHCLINIC", secteurRaw: "E-SANTE", secteur: "SANTE", siteWeb: null, actif: true, dateDemarrage: "2020", formalisation: true, maturite: "M", emplois: 45, tier: "TOP", score: 99.5 },
  { id: "yoboresto", num: 163, nom: "YOBORESTO", programmeId: "entrepreneur-impact", programmeRaw: "ENTREPRENEUR D'IMPACT", secteurRaw: "RESTAURATION", secteur: "RESTAURATION", siteWeb: "http://yoboresto.com", actif: true, dateDemarrage: "2018", formalisation: true, maturite: "M", emplois: 30, tier: "TOP", score: 98.0 },
  { id: "koundou-construction", num: 217, nom: "KOUNDOU CONSTRUCTION", programmeId: "pepiniere-pme", programmeRaw: "PEPINIERE PME", secteurRaw: "AGRICULTURE", secteur: "AGRICULTURE", siteWeb: null, actif: true, dateDemarrage: "2010", formalisation: true, maturite: "M", emplois: 18, tier: "TOP", score: 96.8 },
  { id: "identity", num: 26, nom: "IDENTITY", programmeId: "cohorte-innovation-4", programmeRaw: "COHORTE INNOVATION 4.1", secteurRaw: "SECURITE", secteur: "SECURITE", siteWeb: null, actif: true, dateDemarrage: "2021", formalisation: true, maturite: "M", emplois: 12, tier: "TOP", score: 96.2 },
  { id: "ogasso", num: 51, nom: "OGASSO", programmeId: "techclinic", programmeRaw: "TECHCLINIC", secteurRaw: "RESTAURATION", secteur: "RESTAURATION", siteWeb: null, actif: true, dateDemarrage: "2021", formalisation: true, maturite: "M", emplois: 12, tier: "TOP", score: 96.2 },
  { id: "majestic-gabon", num: 11, nom: "MAJESTIC GABON", programmeId: "mentorat-1000", programmeRaw: "MENTORAT CHALLENGE 1000 ENTREPRENEURS", secteurRaw: "COMMUNICATION", secteur: "COMMUNICATION", siteWeb: "https://majesticgabon.com", actif: true, dateDemarrage: "2018", formalisation: true, maturite: "M", emplois: 11, tier: "TOP", score: 96.1 },
  { id: "yams", num: 76, nom: "YAM'S", programmeId: "techclinic", programmeRaw: "TECHCLINIC", secteurRaw: "LOGISTIQUE", secteur: "TRANSPORT", siteWeb: "https://yamslogistics.com", actif: true, dateDemarrage: "2022", formalisation: true, maturite: "M", emplois: 11, tier: "TOP", score: 96.1 },
  { id: "shelva-agency", num: 213, nom: "SHELVA AGENCY", programmeId: "welp", programmeRaw: "WELP", secteurRaw: "EVENEMENTIEL", secteur: "EVENEMENTIEL", siteWeb: null, actif: true, dateDemarrage: "2023", formalisation: true, maturite: "M", emplois: 11, tier: "TOP", score: 96.1 },
  { id: "ca-pay", num: 15, nom: "CA PAY", programmeId: "cohorte-innovation-4", programmeRaw: "COHORTE INNOVATION 4.0", secteurRaw: "E-FINANCE", secteur: "FINTECH", siteWeb: "https://capay.pro", actif: true, dateDemarrage: "2020", formalisation: true, maturite: "M", emplois: 10, tier: "TOP", score: 96.0 },
  { id: "clinique-pasteur", num: 149, nom: "CLINIQUE PASTEUR", programmeId: "e-startup-challenge", programmeRaw: "E-STARTUP CHALLENGE", secteurRaw: "E-SANTE", secteur: "SANTE", siteWeb: null, actif: true, dateDemarrage: "2020", formalisation: true, maturite: "M", emplois: 10, tier: "TOP", score: 96.0 },
  { id: "omilab-gabon", num: 208, nom: "OMILAB GABON", programmeId: "welp", programmeRaw: "WELP", secteurRaw: "INDUSTRIE", secteur: "INDUSTRIE", siteWeb: null, actif: true, dateDemarrage: "2018", formalisation: true, maturite: "M", emplois: 10, tier: "TOP", score: 96.0 },
  { id: "gstore-music", num: 8, nom: "GSTORE MUSIC", programmeId: "moov-startup-challenge", programmeRaw: "MOOV STARTUP CHALLENGE", secteurRaw: "DIVERTISSEMENT", secteur: "ART_CULTURE", siteWeb: "https://gstoremusic.com/", actif: true, dateDemarrage: "2017", formalisation: true, maturite: "M", emplois: 9, tier: "TOP", score: 95.9 },
  { id: "aba-boucherie-en-ligne", num: 58, nom: "ABA BOUCHERIE EN LIGNE", programmeId: "techclinic", programmeRaw: "TECHCLINIC", secteurRaw: "ALIMENTATION", secteur: "AGRICULTURE", siteWeb: null, actif: true, dateDemarrage: null, formalisation: true, maturite: "M", emplois: 8, tier: "TOP", score: 95.8 },
  { id: "siiag", num: 77, nom: "SIIAG", programmeId: "techclinic", programmeRaw: "TECHCLINIC", secteurRaw: "CONSEIL", secteur: "CONSEIL", siteWeb: null, actif: true, dateDemarrage: "2024", formalisation: true, maturite: "M", emplois: 8, tier: "TOP", score: 95.8 },
  { id: "web-services", num: 150, nom: "WEB SERVICES", programmeId: "e-startup-challenge", programmeRaw: "E-STARTUP CHALLENGE", secteurRaw: "E-SANTE", secteur: "SANTE", siteWeb: "webservices-ng.com", actif: true, dateDemarrage: "2021", formalisation: true, maturite: "M", emplois: 8, tier: "TOP", score: 95.8 },
  { id: "cabalou", num: 159, nom: "CABALOU", programmeId: "entrepreneur-impact", programmeRaw: "ENTREPRENEUR D'IMPACT", secteurRaw: "IMMOBILIER", secteur: "IMMOBILIER", siteWeb: "https://cabalou.net", actif: true, dateDemarrage: "2021", formalisation: true, maturite: "M", emplois: 7, tier: "TOP", score: 95.7 },
  { id: "rgedd", num: 44, nom: "RGEDD", programmeId: "techclinic", programmeRaw: "TECHCLINIC", secteurRaw: "ENVIRONNEMENT", secteur: "ENVIRONNEMENT", siteWeb: "https://ongrgedd.com", actif: true, dateDemarrage: "2018", formalisation: true, maturite: "M", emplois: 6, tier: "TOP", score: 95.6 },
  { id: "transit-plus", num: 92, nom: "TRANSIT PLUS", programmeId: "techclinic", programmeRaw: "TECHCLINIC", secteurRaw: "TRANSPORT", secteur: "TRANSPORT", siteWeb: null, actif: true, dateDemarrage: "2020", formalisation: true, maturite: "M", emplois: 6, tier: "TOP", score: 95.6 },
  { id: "brendi-baby-food", num: 160, nom: "BRENDI BABY FOOD", programmeId: "entrepreneur-impact", programmeRaw: "ENTREPRENEUR D'IMPACT", secteurRaw: "AGROALIMENTAIRE", secteur: "AGRICULTURE", siteWeb: null, actif: true, dateDemarrage: "2023", formalisation: true, maturite: "M", emplois: 6, tier: "TOP", score: 95.6 },
  { id: "pms-suarl-vinguele", num: 193, nom: "PMS SUARL (VINGUELE)", programmeId: "cohorte-innovation-4-fef", programmeRaw: "COHORTE INNOVATION 4.0 EDITION FEF", secteurRaw: "EVENEMENTIEL", secteur: "EVENEMENTIEL", siteWeb: "https://vinguele.com", actif: true, dateDemarrage: "2022", formalisation: true, maturite: "M", emplois: 6, tier: "TOP", score: 95.6 },
  { id: "signature-by-ml", num: 211, nom: "SIGNATURE BY ML", programmeId: "welp", programmeRaw: "WELP", secteurRaw: "EVENEMENTIEL", secteur: "EVENEMENTIEL", siteWeb: null, actif: true, dateDemarrage: "2025", formalisation: true, maturite: "M", emplois: 6, tier: "TOP", score: 95.6 },
  { id: "tyto-agricole", num: 218, nom: "TYTO - AGRICOLE", programmeId: "pepiniere-pme", programmeRaw: "PEPINIERE PME", secteurRaw: "BTP", secteur: "INDUSTRIE", siteWeb: null, actif: true, dateDemarrage: "2014", formalisation: true, maturite: "M", emplois: 6, tier: "TOP", score: 95.6 },
  { id: "e-pharma", num: 9, nom: "E-PHARMA", programmeId: "pantheres", programmeRaw: "PANTHERES", secteurRaw: "E-SANTE", secteur: "SANTE", siteWeb: "https://epharma.ga", actif: true, dateDemarrage: "2022", formalisation: true, maturite: "M", emplois: 5, tier: "TOP", score: 95.5 },
  { id: "ekena", num: 10, nom: "EKENA", programmeId: "pantheres", programmeRaw: "PANTHERES", secteurRaw: "E-TOURISME", secteur: "TOURISME", siteWeb: "https://ekena.ga/", actif: true, dateDemarrage: "2021", formalisation: true, maturite: "M", emplois: 5, tier: "TOP", score: 95.5 },
  { id: "archiveo", num: 71, nom: "ARCHIVEO", programmeId: "techclinic", programmeRaw: "TECHCLINIC", secteurRaw: "ADMINISTRATION", secteur: "GOUVERNANCE", siteWeb: null, actif: true, dateDemarrage: "2020", formalisation: true, maturite: "M", emplois: 5, tier: "TOP", score: 95.5 },
  { id: "ds-trust", num: 102, nom: "DS-TRUST", programmeId: "techclinic", programmeRaw: "TECHCLINIC", secteurRaw: "CYBERSECURITE", secteur: "TECH_IT", siteWeb: null, actif: true, dateDemarrage: "2022", formalisation: true, maturite: "M", emplois: 5, tier: "TOP", score: 95.5 },
  { id: "nyangui-creation", num: 139, nom: "NYANGUI CREATION", programmeId: "prodece", programmeRaw: "PRODECE", secteurRaw: "MODE", secteur: "ART_CULTURE", siteWeb: null, actif: true, dateDemarrage: null, formalisation: true, maturite: "M", emplois: 5, tier: "TOP", score: 95.5 },
  { id: "pidakoo", num: 155, nom: "PIDAKOO", programmeId: "e-startup-challenge", programmeRaw: "E-STARTUP CHALLENGE", secteurRaw: "E-COMMERCE", secteur: "COMMERCE", siteWeb: null, actif: true, dateDemarrage: "2017", formalisation: true, maturite: "M", emplois: 5, tier: "TOP", score: 95.5 },
  { id: "agrivert", num: 161, nom: "AGRIVERT", programmeId: "entrepreneur-impact", programmeRaw: "ENTREPRENEUR D'IMPACT", secteurRaw: "AVICULTURE", secteur: "AGRICULTURE", siteWeb: null, actif: true, dateDemarrage: "2015", formalisation: true, maturite: "M", emplois: 5, tier: "TOP", score: 95.5 },
  { id: "spg", num: 170, nom: "SPG", programmeId: "cohorte-innovation-4-fef", programmeRaw: "COHORTE INNOVATION 4.0 EDITION FEF", secteurRaw: "PECHE", secteur: "AGRICULTURE", siteWeb: null, actif: true, dateDemarrage: "2020", formalisation: true, maturite: "M", emplois: 5, tier: "TOP", score: 95.5 },
  { id: "la1gabonaise-by-digifilms-entreprise", num: 195, nom: "LA1GABONAISE BY DIGIFILMS ENTREPRISE", programmeId: "cohorte-innovation-4-fef", programmeRaw: "COHORTE INNOVATION 4.0 EDITION FEF", secteurRaw: "COMMUNICATION", secteur: "COMMUNICATION", siteWeb: "https://la1gabonaise.com", actif: true, dateDemarrage: "2023", formalisation: true, maturite: "M", emplois: 5, tier: "TOP", score: 95.5 },
  { id: "la-ferme-demir", num: 199, nom: "LA FERME D'EMIR", programmeId: "agrifutur", programmeRaw: "AGRI'FUTUR", secteurRaw: "AGRICULTURE", secteur: "AGRICULTURE", siteWeb: null, actif: true, dateDemarrage: null, formalisation: true, maturite: "M", emplois: 5, tier: "TOP", score: 95.5 },
  { id: "le-potager-mengue", num: 207, nom: "LE POTAGER MENGUE", programmeId: "agrifutur", programmeRaw: "AGRI'FUTUR", secteurRaw: "AGRICULTURE", secteur: "AGRICULTURE", siteWeb: null, actif: true, dateDemarrage: null, formalisation: true, maturite: "M", emplois: 5, tier: "TOP", score: 95.5 },
  { id: "gnima-funeral-services", num: 210, nom: "GNIMA FUNERAL SERVICES", programmeId: "welp", programmeRaw: "WELP", secteurRaw: "EVENEMENTIEL", secteur: "EVENEMENTIEL", siteWeb: null, actif: true, dateDemarrage: "2023", formalisation: true, maturite: "M", emplois: 5, tier: "TOP", score: 95.5 },
  { id: "abc-group-od-partners", num: 22, nom: "ABC GROUP - OD PARTNERS", programmeId: "cohorte-innovation-4", programmeRaw: "COHORTE INNOVATION 4.0", secteurRaw: "FISCALITE", secteur: "FINTECH", siteWeb: null, actif: true, dateDemarrage: "2013", formalisation: true, maturite: "M", emplois: 4, tier: "TOP", score: 95.4 },
  { id: "artiaf", num: 33, nom: "ARTIAF", programmeId: "techclinic", programmeRaw: "TECHCLINIC", secteurRaw: "ARTISANAT", secteur: "CONSEIL", siteWeb: "https://www.artiaf.com", actif: true, dateDemarrage: "2017", formalisation: true, maturite: "M", emplois: 4, tier: "TOP", score: 95.4 },
  { id: "eagle-ai", num: 60, nom: "EAGLE AI", programmeId: "techclinic", programmeRaw: "TECHCLINIC", secteurRaw: "E-ENVIRONNEMENT", secteur: "ENVIRONNEMENT", siteWeb: null, actif: true, dateDemarrage: null, formalisation: true, maturite: "M", emplois: 4, tier: "TOP", score: 95.4 },
  { id: "sakura-la-reine-des-saveurs", num: 142, nom: "SAKURA LA REINE DES SAVEURS", programmeId: "entreprendre-feminin", programmeRaw: "ENTREPRENDRE AU FEMININ", secteurRaw: "AGROALIMENTAIRE", secteur: "AGRICULTURE", siteWeb: null, actif: true, dateDemarrage: "2019", formalisation: true, maturite: "M", emplois: 4, tier: "TOP", score: 95.4 },
  { id: "the-trackers", num: 154, nom: "THE TRACKERS", programmeId: "e-startup-challenge", programmeRaw: "E-STARTUP CHALLENGE", secteurRaw: "E-INDUSTRIE", secteur: "INDUSTRIE", siteWeb: null, actif: true, dateDemarrage: "2018", formalisation: true, maturite: "M", emplois: 4, tier: "TOP", score: 95.4 },
  { id: "recyclage-et-collecte", num: 12, nom: "RECYCLAGE ET COLLECTE", programmeId: "mentorat-1000", programmeRaw: "MENTORAT CHALLENGE 1000 ENTREPRENEURS", secteurRaw: "ENVIRONNEMENT", secteur: "ENVIRONNEMENT", siteWeb: null, actif: true, dateDemarrage: "2016", formalisation: true, maturite: "M", emplois: 3, tier: "TOP", score: 95.3 },
  { id: "tama-basket", num: 23, nom: "TAMA BASKET", programmeId: "hackathon-sport", programmeRaw: "HACKATHON SPORT & NUMERIQUE", secteurRaw: "SPORT", secteur: "CONSEIL", siteWeb: null, actif: true, dateDemarrage: null, formalisation: true, maturite: "M", emplois: 3, tier: "TOP", score: 95.3 },
  { id: "elite-foot-culture", num: 24, nom: "ELITE FOOT CULTURE", programmeId: "hackathon-sport", programmeRaw: "HACKATHON SPORT & NUMERIQUE", secteurRaw: "SPORT", secteur: "CONSEIL", siteWeb: null, actif: true, dateDemarrage: null, formalisation: true, maturite: "M", emplois: 3, tier: "TOP", score: 95.3 },
  { id: "kanopee", num: 34, nom: "KANOPEE", programmeId: "techclinic", programmeRaw: "TECHCLINIC", secteurRaw: "AGRICULTURE", secteur: "AGRICULTURE", siteWeb: null, actif: true, dateDemarrage: null, formalisation: true, maturite: "M", emplois: 3, tier: "TOP", score: 95.3 },
  { id: "sikul", num: 62, nom: "SIKUL", programmeId: "techclinic", programmeRaw: "TECHCLINIC", secteurRaw: "EDTECH", secteur: "EDTECH", siteWeb: "sikul-edu.com", actif: true, dateDemarrage: "2020", formalisation: true, maturite: "M", emplois: 3, tier: "TOP", score: 95.3 },
  { id: "eecc", num: 68, nom: "EECC", programmeId: "techclinic", programmeRaw: "TECHCLINIC", secteurRaw: "ART & CULTURE", secteur: "ART_CULTURE", siteWeb: null, actif: true, dateDemarrage: "2023", formalisation: true, maturite: "M", emplois: 3, tier: "TOP", score: 95.3 },
  { id: "biblionell", num: 70, nom: "BIBLIO'NELL", programmeId: "techclinic", programmeRaw: "TECHCLINIC", secteurRaw: "EDTECH", secteur: "EDTECH", siteWeb: null, actif: true, dateDemarrage: "2023", formalisation: true, maturite: "M", emplois: 3, tier: "TOP", score: 95.3 },
  { id: "melarane-service", num: 84, nom: "MELARANE SERVICE", programmeId: "techclinic", programmeRaw: "TECHCLINIC", secteurRaw: "TRANSPORT", secteur: "TRANSPORT", siteWeb: null, actif: true, dateDemarrage: "2023", formalisation: true, maturite: "M", emplois: 3, tier: "TOP", score: 95.3 },
  { id: "omega-cherubin", num: 107, nom: "OMEGA CHERUBIN", programmeId: "techclinic", programmeRaw: "TECHCLINIC", secteurRaw: "SANTE", secteur: "SANTE", siteWeb: null, actif: true, dateDemarrage: null, formalisation: true, maturite: "M", emplois: 3, tier: "TOP", score: 95.3 },
  { id: "o2vie", num: 144, nom: "O2VIE", programmeId: "entreprendre-feminin", programmeRaw: "ENTREPRENDRE AU FEMININ", secteurRaw: "AGROALIMENTAIRE", secteur: "AGRICULTURE", siteWeb: null, actif: true, dateDemarrage: "2018", formalisation: true, maturite: "M", emplois: 3, tier: "TOP", score: 95.3 },
  { id: "jetronic", num: 151, nom: "JETRONIC", programmeId: "e-startup-challenge", programmeRaw: "E-STARTUP CHALLENGE", secteurRaw: "NTIC", secteur: "TECH_IT", siteWeb: null, actif: true, dateDemarrage: null, formalisation: true, maturite: "M", emplois: 3, tier: "TOP", score: 95.3 },
  { id: "toule-market", num: 192, nom: "TOULE MARKET", programmeId: "cohorte-innovation-4-fef", programmeRaw: "COHORTE INNOVATION 4.0 EDITION FEF", secteurRaw: "E-COMMERCE", secteur: "COMMERCE", siteWeb: null, actif: true, dateDemarrage: null, formalisation: true, maturite: "M", emplois: 3, tier: "TOP", score: 95.3 },
  { id: "green-leaves-gabon", num: 64, nom: "GREEN LEAVES GABON", programmeId: "techclinic", programmeRaw: "TECHCLINIC", secteurRaw: "ENVIRONNEMENT", secteur: "ENVIRONNEMENT", siteWeb: null, actif: true, dateDemarrage: "2023", formalisation: true, maturite: "M", emplois: 2, tier: "TOP", score: 95.2 },
  { id: "relief-services", num: 153, nom: "RELIEF SERVICES", programmeId: "e-startup-challenge", programmeRaw: "E-STARTUP CHALLENGE", secteurRaw: "E-SANTE", secteur: "SANTE", siteWeb: "https://reliefservices.net", actif: true, dateDemarrage: "2022", formalisation: true, maturite: "M", emplois: 2, tier: "TOP", score: 95.2 },
  { id: "la-delicieuse", num: 168, nom: "LA DELICIEUSE", programmeId: "cohorte-innovation-4-fef", programmeRaw: "COHORTE INNOVATION 4.0 EDITION FEF", secteurRaw: "AGROALIMENTAIRE", secteur: "AGRICULTURE", siteWeb: null, actif: true, dateDemarrage: "2023", formalisation: true, maturite: "M", emplois: 2, tier: "TOP", score: 95.2 },
  { id: "craie-gab", num: 194, nom: "CRAIE GAB", programmeId: "cohorte-innovation-4-fef", programmeRaw: "COHORTE INNOVATION 4.0 EDITION FEF", secteurRaw: "INDUSTRIE", secteur: "INDUSTRIE", siteWeb: null, actif: true, dateDemarrage: "2023", formalisation: true, maturite: "M", emplois: 2, tier: "TOP", score: 95.2 },
  { id: "jaed-services", num: 216, nom: "JAED SERVICES", programmeId: "welp", programmeRaw: "WELP", secteurRaw: "INDUSTRIE", secteur: "INDUSTRIE", siteWeb: null, actif: true, dateDemarrage: "2023", formalisation: true, maturite: "M", emplois: 2, tier: "TOP", score: 95.2 },
  { id: "pozi", num: 45, nom: "POZI", programmeId: "techclinic", programmeRaw: "TECHCLINIC", secteurRaw: "TRANSPORT", secteur: "TRANSPORT", siteWeb: "https://www.pozi.app", actif: true, dateDemarrage: "2020", formalisation: true, maturite: "M", emplois: 0, tier: "TOP", score: 95.0 },
  { id: "gsl", num: 78, nom: "GSL", programmeId: "techclinic", programmeRaw: "TECHCLINIC", secteurRaw: "LOGISTIQUE", secteur: "TRANSPORT", siteWeb: null, actif: true, dateDemarrage: null, formalisation: true, maturite: "M", emplois: 0, tier: "TOP", score: 95.0 },
];

// ══════════════════════════════════════════════════════════════════════════
// PARTIE 2 : STARTUPS ACTIVES NON-TOP (55)
// ══════════════════════════════════════════════════════════════════════════

export const ACTIVE_STARTUPS_SING: StartupSING[] = [
  { id: "wagui", num: 20, nom: "WAGUI", programmeId: "cohorte-innovation-4", programmeRaw: "COHORTE INNOVATION 4.0", secteurRaw: "AGRICOLE", secteur: "AGRICULTURE", siteWeb: "https://wagui.app/", actif: true, dateDemarrage: "2020", formalisation: false, maturite: "I", emplois: 3, tier: "ACTIVE", score: 50.3 },
  { id: "eli-winshamar", num: 47, nom: "ELI WINSHAMAR", programmeId: "techclinic", programmeRaw: "TECHCLINIC", secteurRaw: "ALIMENTATION", secteur: "AGRICULTURE", siteWeb: null, actif: true, dateDemarrage: null, formalisation: false, maturite: "I", emplois: 0, tier: "ACTIVE", score: 50.0 },
  { id: "impact-de-don", num: 48, nom: "IMPACT DE DON", programmeId: "techclinic", programmeRaw: "TECHCLINIC", secteurRaw: "SANTE", secteur: "SANTE", siteWeb: null, actif: true, dateDemarrage: null, formalisation: false, maturite: "I", emplois: 0, tier: "ACTIVE", score: 50.0 },
  { id: "ifdc", num: 49, nom: "IFDC", programmeId: "techclinic", programmeRaw: "TECHCLINIC", secteurRaw: "FINANCE", secteur: "FINTECH", siteWeb: null, actif: true, dateDemarrage: "2023", formalisation: false, maturite: "M", emplois: 2, tier: "ACTIVE", score: 80.2 },
  { id: "mika", num: 52, nom: "MIKA", programmeId: "techclinic", programmeRaw: "TECHCLINIC", secteurRaw: "AGROALIMENTAIRE", secteur: "AGRICULTURE", siteWeb: null, actif: true, dateDemarrage: "2023", formalisation: false, maturite: "M", emplois: 3, tier: "ACTIVE", score: 80.3 },
  { id: "levi-express", num: 56, nom: "LEVI EXPRESS", programmeId: "techclinic", programmeRaw: "TECHCLINIC", secteurRaw: "TRANSPORT", secteur: "TRANSPORT", siteWeb: null, actif: true, dateDemarrage: "2023", formalisation: false, maturite: "M", emplois: 4, tier: "ACTIVE", score: 80.4 },
  { id: "ana-services", num: 57, nom: "ANA SERVICES", programmeId: "techclinic", programmeRaw: "TECHCLINIC", secteurRaw: "EVENEMENTIEL", secteur: "EVENEMENTIEL", siteWeb: null, actif: true, dateDemarrage: "2017", formalisation: false, maturite: "I", emplois: 0, tier: "ACTIVE", score: 50.0 },
  { id: "saumon-3", num: 61, nom: "SAUMON 3", programmeId: "techclinic", programmeRaw: "TECHCLINIC", secteurRaw: "RESTAURATION", secteur: "RESTAURATION", siteWeb: null, actif: true, dateDemarrage: "2025", formalisation: false, maturite: "I", emplois: 4, tier: "ACTIVE", score: 50.4 },
  { id: "conix", num: 65, nom: "CONIX", programmeId: "techclinic", programmeRaw: "TECHCLINIC", secteurRaw: "TRANSPORT", secteur: "TRANSPORT", siteWeb: null, actif: true, dateDemarrage: "2023", formalisation: false, maturite: "M", emplois: 3, tier: "ACTIVE", score: 80.3 },
  { id: "le-fumoir-de-charles-cyndie", num: 66, nom: "LE FUMOIR DE CHARLES-CYNDIE", programmeId: "techclinic", programmeRaw: "TECHCLINIC", secteurRaw: "AGROALIMENTAIRE", secteur: "AGRICULTURE", siteWeb: null, actif: true, dateDemarrage: "2020", formalisation: false, maturite: "M", emplois: 6, tier: "ACTIVE", score: 80.6 },
  { id: "les-delices-du-village", num: 72, nom: "LES DELICES DU VILLAGE", programmeId: "techclinic", programmeRaw: "TECHCLINIC", secteurRaw: "AGROALIMENTAIRE", secteur: "AGRICULTURE", siteWeb: null, actif: true, dateDemarrage: null, formalisation: false, maturite: "M", emplois: 4, tier: "ACTIVE", score: 80.4 },
  { id: "scoops-cooperative-aliance", num: 74, nom: "SCOOPS COOPERATIVE ALIANCE", programmeId: "techclinic", programmeRaw: "TECHCLINIC", secteurRaw: "AGRICOLE", secteur: "AGRICULTURE", siteWeb: null, actif: true, dateDemarrage: null, formalisation: false, maturite: "I", emplois: 0, tier: "ACTIVE", score: 50.0 },
  { id: "kazipro-80", num: 80, nom: "KAZI'PRO", programmeId: "techclinic", programmeRaw: "TECHCLINIC", secteurRaw: "PLACEMENT DE PERSONNEL", secteur: "CONSEIL", siteWeb: null, actif: true, dateDemarrage: null, formalisation: false, maturite: "I", emplois: 0, tier: "ACTIVE", score: 50.0 },
  { id: "afros-meet", num: 82, nom: "AFRO'S MEET", programmeId: "techclinic", programmeRaw: "TECHCLINIC", secteurRaw: "E-DATING", secteur: "TOURISME", siteWeb: "https://www.afrosmeet.com", actif: true, dateDemarrage: "2024", formalisation: true, maturite: "I", emplois: 4, tier: "ACTIVE", score: 65.4 },
  { id: "otiten", num: 83, nom: "OTITEN", programmeId: "techclinic", programmeRaw: "TECHCLINIC", secteurRaw: "INFORMATIQUE", secteur: "TECH_IT", siteWeb: null, actif: true, dateDemarrage: null, formalisation: false, maturite: "I", emplois: 0, tier: "ACTIVE", score: 50.0 },
  { id: "epicerie-theodora", num: 85, nom: "EPICERIE THEODORA", programmeId: "techclinic", programmeRaw: "TECHCLINIC", secteurRaw: "AGROALIMENTAIRE", secteur: "AGRICULTURE", siteWeb: null, actif: true, dateDemarrage: null, formalisation: false, maturite: "I", emplois: 0, tier: "ACTIVE", score: 50.0 },
  { id: "modernisation-de-la-luze", num: 86, nom: "MODERNISATION DE LA LUZE", programmeId: "techclinic", programmeRaw: "TECHCLINIC", secteurRaw: "SPORT", secteur: "CONSEIL", siteWeb: null, actif: true, dateDemarrage: null, formalisation: false, maturite: "I", emplois: 0, tier: "ACTIVE", score: 50.0 },
  { id: "tabara", num: 87, nom: "TABARA", programmeId: "techclinic", programmeRaw: "TECHCLINIC", secteurRaw: "MODE", secteur: "ART_CULTURE", siteWeb: null, actif: true, dateDemarrage: "2024", formalisation: false, maturite: "I", emplois: 2, tier: "ACTIVE", score: 50.2 },
  { id: "afrorise", num: 88, nom: "AFRORISE", programmeId: "techclinic", programmeRaw: "TECHCLINIC", secteurRaw: "CONSEIL", secteur: "CONSEIL", siteWeb: null, actif: true, dateDemarrage: null, formalisation: false, maturite: "I", emplois: 0, tier: "ACTIVE", score: 50.0 },
  { id: "calendar-challenge", num: 89, nom: "CALENDAR CHALLENGE", programmeId: "techclinic", programmeRaw: "TECHCLINIC", secteurRaw: "CONSEIL", secteur: "CONSEIL", siteWeb: null, actif: true, dateDemarrage: "2024", formalisation: false, maturite: "I", emplois: 1, tier: "ACTIVE", score: 50.1 },
  { id: "techies", num: 90, nom: "TECHIES", programmeId: "techclinic", programmeRaw: "TECHCLINIC", secteurRaw: "COMMUNICATION", secteur: "COMMUNICATION", siteWeb: "https://techies.ga", actif: true, dateDemarrage: "2024", formalisation: false, maturite: "I", emplois: 1, tier: "ACTIVE", score: 50.1 },
  { id: "med-logiciels-services", num: 91, nom: "MED LOGICIELS & SERVICES", programmeId: "techclinic", programmeRaw: "TECHCLINIC", secteurRaw: "INDUSTRIE", secteur: "INDUSTRIE", siteWeb: null, actif: true, dateDemarrage: null, formalisation: false, maturite: "M", emplois: 1, tier: "ACTIVE", score: 80.1 },
  { id: "etudhomme", num: 93, nom: "ETUD'HOMME", programmeId: "techclinic", programmeRaw: "TECHCLINIC", secteurRaw: "EDTECH", secteur: "EDTECH", siteWeb: null, actif: true, dateDemarrage: "2025", formalisation: true, maturite: "I", emplois: 2, tier: "ACTIVE", score: 65.2 },
  { id: "trouve-ici-com", num: 94, nom: "TROUVE ICI.COM", programmeId: "techclinic", programmeRaw: "TECHCLINIC", secteurRaw: "CONSEIL", secteur: "CONSEIL", siteWeb: null, actif: true, dateDemarrage: null, formalisation: false, maturite: "I", emplois: 1, tier: "ACTIVE", score: 50.1 },
  { id: "ntchire-assurance", num: 95, nom: "NTCHIRE ASSURANCE", programmeId: "techclinic", programmeRaw: "TECHCLINIC", secteurRaw: "ASSURANCE", secteur: "FINTECH", siteWeb: null, actif: true, dateDemarrage: "2025", formalisation: false, maturite: "I", emplois: 1, tier: "ACTIVE", score: 50.1 },
  { id: "bikere", num: 96, nom: "BIKERE", programmeId: "techclinic", programmeRaw: "TECHCLINIC", secteurRaw: "INDUSTRIE", secteur: "INDUSTRIE", siteWeb: null, actif: true, dateDemarrage: null, formalisation: true, maturite: "I", emplois: 0, tier: "ACTIVE", score: 65.0 },
  { id: "m-m-consulting-114", num: 114, nom: "M&M CONSULTING", programmeId: "techclinic", programmeRaw: "TECHCLINIC", secteurRaw: "CONSEIL", secteur: "CONSEIL", siteWeb: null, actif: true, dateDemarrage: null, formalisation: false, maturite: "I", emplois: 0, tier: "ACTIVE", score: 50.0 },
  { id: "lifecare-technologie-122", num: 122, nom: "LIFECARE TECHNOLOGIE", programmeId: "techclinic", programmeRaw: "TECHCLINIC", secteurRaw: "ESANTE", secteur: "SANTE", siteWeb: null, actif: true, dateDemarrage: null, formalisation: false, maturite: "I", emplois: 0, tier: "ACTIVE", score: 50.0 },
  { id: "cosmechic", num: 125, nom: "COSMECHIC", programmeId: "techclinic", programmeRaw: "TECHCLINIC", secteurRaw: "COSMETIQUE", secteur: "ART_CULTURE", siteWeb: null, actif: true, dateDemarrage: null, formalisation: false, maturite: "I", emplois: 3, tier: "ACTIVE", score: 50.3 },
  { id: "cyber-zone-129", num: 129, nom: "CYBER ZONE", programmeId: "techclinic", programmeRaw: "TECHCLINIC", secteurRaw: "CYBER SECURITE", secteur: "TECH_IT", siteWeb: null, actif: true, dateDemarrage: null, formalisation: false, maturite: "I", emplois: 0, tier: "ACTIVE", score: 50.0 },
  { id: "socaf", num: 135, nom: "SOCAF", programmeId: "techclinic", programmeRaw: "TECHCLINIC", secteurRaw: "AGRICULTURE", secteur: "AGRICULTURE", siteWeb: null, actif: true, dateDemarrage: null, formalisation: false, maturite: "I", emplois: 0, tier: "ACTIVE", score: 50.0 },
  { id: "la-gabonaise-commerciale", num: 141, nom: "LA GABONAISE COMMERCIALE", programmeId: "entreprendre-feminin", programmeRaw: "ENTREPRENDRE AU FEMININ", secteurRaw: "MARKETING", secteur: "COMMUNICATION", siteWeb: null, actif: true, dateDemarrage: null, formalisation: false, maturite: "I", emplois: 2, tier: "ACTIVE", score: 50.2 },
  { id: "accro-dactu", num: 143, nom: "ACCRO D'ACTU", programmeId: "entreprendre-feminin", programmeRaw: "ENTREPRENDRE AU FEMININ", secteurRaw: "COMMUNICATION", secteur: "COMMUNICATION", siteWeb: null, actif: true, dateDemarrage: null, formalisation: false, maturite: "I", emplois: 2, tier: "ACTIVE", score: 50.2 },
  { id: "brainwave-gabon", num: 164, nom: "BRAINWAVE GABON", programmeId: "cohorte-innovation-4-fef", programmeRaw: "COHORTE INNOVATION 4.0 EDITION FEF", secteurRaw: "COMMUNICATION", secteur: "COMMUNICATION", siteWeb: null, actif: true, dateDemarrage: "2024", formalisation: false, maturite: "I", emplois: 2, tier: "ACTIVE", score: 50.2 },
  { id: "alissa-ia", num: 165, nom: "ALISSA IA", programmeId: "cohorte-innovation-4-fef", programmeRaw: "COHORTE INNOVATION 4.0 EDITION FEF", secteurRaw: "IA", secteur: "TECH_IT", siteWeb: null, actif: true, dateDemarrage: "2024", formalisation: false, maturite: "I", emplois: 2, tier: "ACTIVE", score: 50.2 },
  { id: "ronda-tour", num: 167, nom: "RONDA TOUR", programmeId: "cohorte-innovation-4-fef", programmeRaw: "COHORTE INNOVATION 4.0 EDITION FEF", secteurRaw: "TOURISME", secteur: "TOURISME", siteWeb: null, actif: true, dateDemarrage: "2022", formalisation: false, maturite: "I", emplois: 5, tier: "ACTIVE", score: 50.5 },
  { id: "casselle-241", num: 169, nom: "CASSELLE 241", programmeId: "cohorte-innovation-4-fef", programmeRaw: "COHORTE INNOVATION 4.0 EDITION FEF", secteurRaw: "COMMUNICATION", secteur: "COMMUNICATION", siteWeb: null, actif: true, dateDemarrage: "2024", formalisation: false, maturite: "I", emplois: 2, tier: "ACTIVE", score: 50.2 },
  { id: "ecochar", num: 171, nom: "ECOCHAR", programmeId: "cohorte-innovation-4-fef", programmeRaw: "COHORTE INNOVATION 4.0 EDITION FEF", secteurRaw: "INDUSTRIE", secteur: "INDUSTRIE", siteWeb: null, actif: true, dateDemarrage: "2022", formalisation: true, maturite: "I", emplois: 3, tier: "ACTIVE", score: 65.3 },
  { id: "dreane-immo", num: 173, nom: "DREANE IMMO", programmeId: "cohorte-innovation-4-fef", programmeRaw: "COHORTE INNOVATION 4.0 EDITION FEF", secteurRaw: "IMMOBILIER", secteur: "IMMOBILIER", siteWeb: null, actif: true, dateDemarrage: "2024", formalisation: true, maturite: "I", emplois: 2, tier: "ACTIVE", score: 65.2 },
  { id: "artiz", num: 174, nom: "ART'IZ", programmeId: "cohorte-innovation-4-fef", programmeRaw: "COHORTE INNOVATION 4.0 EDITION FEF", secteurRaw: "ART", secteur: "ART_CULTURE", siteWeb: null, actif: true, dateDemarrage: "2024", formalisation: true, maturite: "I", emplois: 4, tier: "ACTIVE", score: 65.4 },
  { id: "tchaye-fish", num: 187, nom: "TCHAYE FISH", programmeId: "cohorte-innovation-4-fef", programmeRaw: "COHORTE INNOVATION 4.0 EDITION FEF", secteurRaw: "E-COMMERCE", secteur: "COMMERCE", siteWeb: null, actif: true, dateDemarrage: "2020", formalisation: true, maturite: "I", emplois: 3, tier: "ACTIVE", score: 65.3 },
  { id: "electro-reactiv", num: 188, nom: "ELECTRO REACTIV", programmeId: "cohorte-innovation-4-fef", programmeRaw: "COHORTE INNOVATION 4.0 EDITION FEF", secteurRaw: "INFORMATIQUE", secteur: "TECH_IT", siteWeb: null, actif: true, dateDemarrage: "2024", formalisation: true, maturite: "I", emplois: 4, tier: "ACTIVE", score: 65.4 },
  { id: "ascol-academia", num: 191, nom: "ASCOL ACADEMIA", programmeId: "cohorte-innovation-4-fef", programmeRaw: "COHORTE INNOVATION 4.0 EDITION FEF", secteurRaw: "EDTECH", secteur: "EDTECH", siteWeb: null, actif: true, dateDemarrage: null, formalisation: false, maturite: "I", emplois: 5, tier: "ACTIVE", score: 50.5 },
  { id: "noungui-agri", num: 198, nom: "NOUNGUI AGRI", programmeId: "agrifutur", programmeRaw: "AGRI'FUTUR", secteurRaw: "AGRICULTURE", secteur: "AGRICULTURE", siteWeb: null, actif: true, dateDemarrage: "2025", formalisation: false, maturite: "I", emplois: 2, tier: "ACTIVE", score: 50.2 },
  { id: "la-seve-haute", num: 200, nom: "LA SEVE HAUTE", programmeId: "agrifutur", programmeRaw: "AGRI'FUTUR", secteurRaw: "AGRICULTURE", secteur: "AGRICULTURE", siteWeb: null, actif: true, dateDemarrage: null, formalisation: false, maturite: "I", emplois: 2, tier: "ACTIVE", score: 50.2 },
  { id: "agrodurable", num: 201, nom: "AGRODURABLE", programmeId: "agrifutur", programmeRaw: "AGRI'FUTUR", secteurRaw: "AGRICULTURE", secteur: "AGRICULTURE", siteWeb: null, actif: true, dateDemarrage: null, formalisation: false, maturite: "I", emplois: 2, tier: "ACTIVE", score: 50.2 },
  { id: "scoops-agrin-group", num: 202, nom: "SCOOPS AGRIN GROUP", programmeId: "agrifutur", programmeRaw: "AGRI'FUTUR", secteurRaw: "AGRICULTURE", secteur: "AGRICULTURE", siteWeb: null, actif: true, dateDemarrage: null, formalisation: false, maturite: "I", emplois: 2, tier: "ACTIVE", score: 50.2 },
  { id: "agriserra", num: 203, nom: "AGRISERRA", programmeId: "agrifutur", programmeRaw: "AGRI'FUTUR", secteurRaw: "AGRICULTURE", secteur: "AGRICULTURE", siteWeb: null, actif: true, dateDemarrage: null, formalisation: false, maturite: "M", emplois: 2, tier: "ACTIVE", score: 80.2 },
  { id: "aea", num: 204, nom: "AEA", programmeId: "agrifutur", programmeRaw: "AGRI'FUTUR", secteurRaw: "AGRICULTURE", secteur: "AGRICULTURE", siteWeb: null, actif: true, dateDemarrage: null, formalisation: false, maturite: "I", emplois: 3, tier: "ACTIVE", score: 50.3 },
  { id: "pembe", num: 205, nom: "PEMBE", programmeId: "agrifutur", programmeRaw: "AGRI'FUTUR", secteurRaw: "AGRICULTURE", secteur: "AGRICULTURE", siteWeb: null, actif: true, dateDemarrage: null, formalisation: false, maturite: "I", emplois: 3, tier: "ACTIVE", score: 50.3 },
  { id: "bilanga", num: 206, nom: "BILANGA", programmeId: "agrifutur", programmeRaw: "AGRI'FUTUR", secteurRaw: "AGRICULTURE", secteur: "AGRICULTURE", siteWeb: null, actif: true, dateDemarrage: null, formalisation: false, maturite: "I", emplois: 2, tier: "ACTIVE", score: 50.2 },
  { id: "otaku-party", num: 209, nom: "OTAKU PARTY", programmeId: "welp", programmeRaw: "WELP", secteurRaw: "DIVERTISSEMENT", secteur: "ART_CULTURE", siteWeb: null, actif: true, dateDemarrage: "2023", formalisation: false, maturite: "I", emplois: 2, tier: "ACTIVE", score: 50.2 },
  { id: "petit-village-bilot", num: 212, nom: "PETIT VILLAGE BILOT", programmeId: "welp", programmeRaw: "WELP", secteurRaw: "EVENEMENTIEL", secteur: "EVENEMENTIEL", siteWeb: null, actif: true, dateDemarrage: "2024", formalisation: false, maturite: "I", emplois: 2, tier: "ACTIVE", score: 50.2 },
  { id: "smell-parmfums-emotion", num: 214, nom: "SMELL PARMFUMS EMOTION", programmeId: "welp", programmeRaw: "WELP", secteurRaw: "PARFUMERIE", secteur: "ART_CULTURE", siteWeb: null, actif: true, dateDemarrage: "2024", formalisation: true, maturite: "I", emplois: 2, tier: "ACTIVE", score: 65.2 },
  { id: "dernier-hommage", num: 215, nom: "DERNIER HOMMAGE", programmeId: "welp", programmeRaw: "WELP", secteurRaw: "EVENEMENTIEL", secteur: "EVENEMENTIEL", siteWeb: null, actif: true, dateDemarrage: "2024", formalisation: true, maturite: "I", emplois: 2, tier: "ACTIVE", score: 65.2 },
];

// ══════════════════════════════════════════════════════════════════════════
// PARTIE 3 : STARTUPS INACTIVES (105)
// ══════════════════════════════════════════════════════════════════════════

export const INACTIVE_STARTUPS_SING: StartupSING[] = [
  { id: "sytaps", num: 1, nom: "SYTAPS", programmeId: "smartgog", programmeRaw: "SMARTGOG", secteurRaw: "E-GOV", secteur: "GOUVERNANCE", siteWeb: null, actif: false, dateDemarrage: null, formalisation: false, maturite: "I", emplois: 0, tier: "INACTIVE", score: 0.0 },
  { id: "suuhma", num: 2, nom: "SUUHMA", programmeId: "moov-startup-challenge", programmeRaw: "MOOV STARTUP CHALLENGE", secteurRaw: "E-COMMERCE", secteur: "COMMERCE", siteWeb: null, actif: false, dateDemarrage: null, formalisation: false, maturite: "I", emplois: 0, tier: "INACTIVE", score: 0.0 },
  { id: "oneline-census", num: 3, nom: "ONELINE CENSUS", programmeId: "moov-startup-challenge", programmeRaw: "MOOV STARTUP CHALLENGE", secteurRaw: "E-GOV", secteur: "GOUVERNANCE", siteWeb: null, actif: false, dateDemarrage: null, formalisation: false, maturite: "I", emplois: 0, tier: "INACTIVE", score: 0.0 },
  { id: "nenga", num: 4, nom: "NENGA", programmeId: "moov-startup-challenge", programmeRaw: "MOOV STARTUP CHALLENGE", secteurRaw: "EDTECH", secteur: "EDTECH", siteWeb: null, actif: false, dateDemarrage: null, formalisation: false, maturite: "I", emplois: 0, tier: "INACTIVE", score: 0.0 },
  { id: "visiteur-booking", num: 5, nom: "VISITEUR BOOKING", programmeId: "moov-startup-challenge", programmeRaw: "MOOV STARTUP CHALLENGE", secteurRaw: "TOURISME", secteur: "TOURISME", siteWeb: null, actif: false, dateDemarrage: "2017", formalisation: true, maturite: "I", emplois: 0, tier: "INACTIVE", score: 15.0 },
  { id: "allo-mairie", num: 6, nom: "ALLO MAIRIE", programmeId: "moov-startup-challenge", programmeRaw: "MOOV STARTUP CHALLENGE", secteurRaw: "E-GOV", secteur: "GOUVERNANCE", siteWeb: null, actif: false, dateDemarrage: null, formalisation: false, maturite: "M", emplois: 0, tier: "INACTIVE", score: 30.0 },
  { id: "auxilium", num: 7, nom: "AUXILIUM", programmeId: "moov-startup-challenge", programmeRaw: "MOOV STARTUP CHALLENGE", secteurRaw: "E-SANTE", secteur: "SANTE", siteWeb: null, actif: false, dateDemarrage: null, formalisation: false, maturite: "I", emplois: 0, tier: "INACTIVE", score: 0.0 },
  { id: "orema", num: 13, nom: "OREMA", programmeId: "cohorte-innovation-4", programmeRaw: "COHORTE INNOVATION 4.0", secteurRaw: "ENERGIE", secteur: "ENVIRONNEMENT", siteWeb: null, actif: false, dateDemarrage: null, formalisation: false, maturite: "I", emplois: 0, tier: "INACTIVE", score: 0.0 },
  { id: "ultimate-crm", num: 14, nom: "ULTIMATE CRM", programmeId: "cohorte-innovation-4", programmeRaw: "COHORTE INNOVATION 4.0", secteurRaw: "MARKETING", secteur: "COMMUNICATION", siteWeb: null, actif: false, dateDemarrage: null, formalisation: false, maturite: "M", emplois: 0, tier: "INACTIVE", score: 30.0 },
  { id: "performix-inno", num: 16, nom: "PERFORMIX INNO", programmeId: "cohorte-innovation-4", programmeRaw: "COHORTE INNOVATION 4.0", secteurRaw: "E-COMMERCE", secteur: "COMMERCE", siteWeb: null, actif: false, dateDemarrage: null, formalisation: false, maturite: "I", emplois: 0, tier: "INACTIVE", score: 0.0 },
  { id: "mon-assurance", num: 17, nom: "MON ASSURANCE", programmeId: "cohorte-innovation-4", programmeRaw: "COHORTE INNOVATION 4.0", secteurRaw: "ASSURANCE", secteur: "FINTECH", siteWeb: null, actif: false, dateDemarrage: null, formalisation: false, maturite: "I", emplois: 0, tier: "INACTIVE", score: 0.0 },
  { id: "panafricom", num: 18, nom: "PANAFRICOM", programmeId: "cohorte-innovation-4", programmeRaw: "COHORTE INNOVATION 4.0", secteurRaw: "EDTECH", secteur: "EDTECH", siteWeb: null, actif: false, dateDemarrage: null, formalisation: false, maturite: "I", emplois: 0, tier: "INACTIVE", score: 0.0 },
  { id: "atace-handi", num: 19, nom: "ATACE HANDI", programmeId: "cohorte-innovation-4", programmeRaw: "COHORTE INNOVATION 4.0", secteurRaw: "EDTECH", secteur: "EDTECH", siteWeb: null, actif: false, dateDemarrage: null, formalisation: false, maturite: "M", emplois: 0, tier: "INACTIVE", score: 30.0 },
  { id: "e-medical", num: 21, nom: "E-MEDICAL", programmeId: "cohorte-innovation-4", programmeRaw: "COHORTE INNOVATION 4.0", secteurRaw: "E-SANTE", secteur: "SANTE", siteWeb: null, actif: false, dateDemarrage: null, formalisation: false, maturite: "I", emplois: 0, tier: "INACTIVE", score: 0.0 },
  { id: "notarium", num: 25, nom: "NOTARIUM", programmeId: "cohorte-innovation-4", programmeRaw: "COHORTE INNOVATION 4.0", secteurRaw: "JURIDIQUE", secteur: "GOUVERNANCE", siteWeb: null, actif: false, dateDemarrage: null, formalisation: false, maturite: "I", emplois: 0, tier: "INACTIVE", score: 0.0 },
  { id: "gatax", num: 27, nom: "GATAX", programmeId: "cohorte-innovation-4", programmeRaw: "COHORTE INNOVATION 4.2", secteurRaw: "FISCALITE", secteur: "FINTECH", siteWeb: null, actif: false, dateDemarrage: null, formalisation: false, maturite: "I", emplois: 0, tier: "INACTIVE", score: 0.0 },
  { id: "mariage-glorieux", num: 28, nom: "MARIAGE GLORIEUX", programmeId: "cohorte-innovation-4", programmeRaw: "COHORTE INNOVATION 4.3", secteurRaw: "EVENEMENTIEL", secteur: "EVENEMENTIEL", siteWeb: null, actif: false, dateDemarrage: null, formalisation: false, maturite: "I", emplois: 0, tier: "INACTIVE", score: 0.0 },
  { id: "webcars", num: 29, nom: "WEBCARS", programmeId: "cohorte-innovation-4", programmeRaw: "COHORTE INNOVATION 4.4", secteurRaw: "TRANSPORT", secteur: "TRANSPORT", siteWeb: null, actif: false, dateDemarrage: null, formalisation: false, maturite: "I", emplois: 0, tier: "INACTIVE", score: 0.0 },
  { id: "ushannlabs", num: 30, nom: "USHANNLABS", programmeId: "e-sante", programmeRaw: "E-Sant\u00e9", secteurRaw: "SPORT", secteur: "CONSEIL", siteWeb: null, actif: false, dateDemarrage: null, formalisation: false, maturite: "I", emplois: 0, tier: "INACTIVE", score: 0.0 },
  { id: "duk-obieri", num: 31, nom: "DUK' OBIERI", programmeId: "e-sante", programmeRaw: "E-Sant\u00e9", secteurRaw: "E-SANTE", secteur: "SANTE", siteWeb: null, actif: false, dateDemarrage: null, formalisation: false, maturite: "I", emplois: 0, tier: "INACTIVE", score: 0.0 },
  { id: "h14", num: 32, nom: "H14", programmeId: "e-sante", programmeRaw: "E-Sant\u00e9", secteurRaw: "E-SANTE", secteur: "SANTE", siteWeb: null, actif: false, dateDemarrage: null, formalisation: false, maturite: "I", emplois: 0, tier: "INACTIVE", score: 0.0 },
  { id: "librevy", num: 35, nom: "LIBREVY", programmeId: "techclinic", programmeRaw: "TECHCLINIC", secteurRaw: "E-COMMERCE", secteur: "COMMERCE", siteWeb: null, actif: false, dateDemarrage: null, formalisation: false, maturite: "I", emplois: 0, tier: "INACTIVE", score: 0.0 },
  { id: "waris-com", num: 36, nom: "WARIS COM", programmeId: "techclinic", programmeRaw: "TECHCLINIC", secteurRaw: "EVENEMENTIEL", secteur: "EVENEMENTIEL", siteWeb: null, actif: false, dateDemarrage: null, formalisation: false, maturite: "I", emplois: 0, tier: "INACTIVE", score: 0.0 },
  { id: "universkool", num: 37, nom: "UNIVERSKOOL", programmeId: "techclinic", programmeRaw: "TECHCLINIC", secteurRaw: "EDTECH", secteur: "EDTECH", siteWeb: null, actif: false, dateDemarrage: null, formalisation: false, maturite: "I", emplois: 0, tier: "INACTIVE", score: 0.0 },
  { id: "flow", num: 38, nom: "FLOW", programmeId: "techclinic", programmeRaw: "TECHCLINIC", secteurRaw: "ART", secteur: "ART_CULTURE", siteWeb: null, actif: false, dateDemarrage: null, formalisation: false, maturite: "I", emplois: 0, tier: "INACTIVE", score: 0.0 },
  { id: "m-m-consulting-39", num: 39, nom: "M&M CONSULTING", programmeId: "techclinic", programmeRaw: "TECHCLINIC", secteurRaw: "IT", secteur: "TECH_IT", siteWeb: null, actif: false, dateDemarrage: null, formalisation: false, maturite: "I", emplois: 0, tier: "INACTIVE", score: 0.0 },
  { id: "la-vie-en-rose-by-sysy", num: 40, nom: "LA VIE EN ROSE BY SYSY", programmeId: "techclinic", programmeRaw: "TECHCLINIC", secteurRaw: "MODE", secteur: "ART_CULTURE", siteWeb: null, actif: false, dateDemarrage: null, formalisation: false, maturite: "I", emplois: 0, tier: "INACTIVE", score: 0.0 },
  { id: "exclis", num: 41, nom: "EXCLIS", programmeId: "techclinic", programmeRaw: "TECHCLINIC", secteurRaw: "CONSEIL", secteur: "CONSEIL", siteWeb: null, actif: false, dateDemarrage: null, formalisation: false, maturite: "I", emplois: 0, tier: "INACTIVE", score: 0.0 },
  { id: "bel-environnement", num: 42, nom: "BEL ENVIRONNEMENT", programmeId: "techclinic", programmeRaw: "TECHCLINIC", secteurRaw: "ENVIRONNEMENT", secteur: "ENVIRONNEMENT", siteWeb: null, actif: false, dateDemarrage: "2019", formalisation: true, maturite: "I", emplois: 3, tier: "INACTIVE", score: 15.3 },
  { id: "lifecare-technologie-43", num: 43, nom: "LIFECARE TECHNOLOGIE", programmeId: "techclinic", programmeRaw: "TECHCLINIC", secteurRaw: "ESANTE", secteur: "SANTE", siteWeb: null, actif: false, dateDemarrage: null, formalisation: false, maturite: "I", emplois: 0, tier: "INACTIVE", score: 0.0 },
  { id: "green-cafe", num: 46, nom: "GREEN CAFE", programmeId: "techclinic", programmeRaw: "TECHCLINIC", secteurRaw: "RESTAURATION", secteur: "RESTAURATION", siteWeb: null, actif: false, dateDemarrage: null, formalisation: false, maturite: "I", emplois: 0, tier: "INACTIVE", score: 0.0 },
  { id: "obone-transport", num: 53, nom: "OBONE TRANSPORT", programmeId: "techclinic", programmeRaw: "TECHCLINIC", secteurRaw: "TRANSPORT", secteur: "TRANSPORT", siteWeb: null, actif: false, dateDemarrage: null, formalisation: false, maturite: "I", emplois: 0, tier: "INACTIVE", score: 0.0 },
  { id: "aurelios", num: 54, nom: "AURELIOS", programmeId: "techclinic", programmeRaw: "TECHCLINIC", secteurRaw: "TRANSPORT", secteur: "TRANSPORT", siteWeb: null, actif: false, dateDemarrage: null, formalisation: false, maturite: "I", emplois: 0, tier: "INACTIVE", score: 0.0 },
  { id: "la-tete-vitesse", num: 55, nom: "LA TETE VITESSE", programmeId: "techclinic", programmeRaw: "TECHCLINIC", secteurRaw: "TRANSPORT", secteur: "TRANSPORT", siteWeb: null, actif: false, dateDemarrage: null, formalisation: false, maturite: "I", emplois: 0, tier: "INACTIVE", score: 0.0 },
  { id: "ejeton", num: 59, nom: "EJETON", programmeId: "techclinic", programmeRaw: "TECHCLINIC", secteurRaw: "FINTECH", secteur: "FINTECH", siteWeb: null, actif: false, dateDemarrage: null, formalisation: false, maturite: "I", emplois: 0, tier: "INACTIVE", score: 0.0 },
  { id: "cyber-zone-63", num: 63, nom: "CYBER ZONE", programmeId: "techclinic", programmeRaw: "TECHCLINIC", secteurRaw: "CYBER SECURITE", secteur: "TECH_IT", siteWeb: null, actif: false, dateDemarrage: null, formalisation: false, maturite: "I", emplois: 0, tier: "INACTIVE", score: 0.0 },
  { id: "credo-sage", num: 67, nom: "CREDO SAGE", programmeId: "techclinic", programmeRaw: "TECHCLINIC", secteurRaw: "FINTECH", secteur: "FINTECH", siteWeb: null, actif: false, dateDemarrage: null, formalisation: false, maturite: "I", emplois: 0, tier: "INACTIVE", score: 0.0 },
  { id: "crypto-afrique-futur", num: 69, nom: "CRYPTO AFRIQUE FUTUR", programmeId: "techclinic", programmeRaw: "TECHCLINIC", secteurRaw: "FINTECH", secteur: "FINTECH", siteWeb: null, actif: false, dateDemarrage: null, formalisation: false, maturite: "I", emplois: 0, tier: "INACTIVE", score: 0.0 },
  { id: "dorema-73", num: 73, nom: "DOREMA", programmeId: "techclinic", programmeRaw: "TECHCLINIC", secteurRaw: "E-COMMERCE", secteur: "COMMERCE", siteWeb: null, actif: false, dateDemarrage: null, formalisation: false, maturite: "I", emplois: 0, tier: "INACTIVE", score: 0.0 },
  { id: "campus-afrique", num: 75, nom: "CAMPUS AFRIQUE", programmeId: "techclinic", programmeRaw: "TECHCLINIC", secteurRaw: "EDTECH", secteur: "EDTECH", siteWeb: null, actif: false, dateDemarrage: null, formalisation: false, maturite: "I", emplois: 0, tier: "INACTIVE", score: 0.0 },
  { id: "hika-event", num: 79, nom: "HIKA EVENT", programmeId: "techclinic", programmeRaw: "TECHCLINIC", secteurRaw: "EVENEMENTIEL", secteur: "EVENEMENTIEL", siteWeb: null, actif: false, dateDemarrage: null, formalisation: false, maturite: "M", emplois: 0, tier: "INACTIVE", score: 30.0 },
  { id: "benoit-et-fils", num: 81, nom: "BENOIT ET FILS", programmeId: "techclinic", programmeRaw: "TECHCLINIC", secteurRaw: "BTP", secteur: "INDUSTRIE", siteWeb: null, actif: false, dateDemarrage: null, formalisation: false, maturite: "I", emplois: 0, tier: "INACTIVE", score: 0.0 },
  { id: "iaag", num: 97, nom: "IAAG", programmeId: "techclinic", programmeRaw: "TECHCLINIC", secteurRaw: "AGRICOLE", secteur: "AGRICULTURE", siteWeb: null, actif: false, dateDemarrage: null, formalisation: false, maturite: "I", emplois: 0, tier: "INACTIVE", score: 0.0 },
  { id: "epaviste", num: 98, nom: "EPAVISTE", programmeId: "techclinic", programmeRaw: "TECHCLINIC", secteurRaw: "INDUSTRIE", secteur: "INDUSTRIE", siteWeb: null, actif: false, dateDemarrage: null, formalisation: false, maturite: "I", emplois: 0, tier: "INACTIVE", score: 0.0 },
  { id: "glacer-gabon", num: 99, nom: "GLACER GABON", programmeId: "techclinic", programmeRaw: "TECHCLINIC", secteurRaw: "EVENEMENTIEL", secteur: "EVENEMENTIEL", siteWeb: null, actif: false, dateDemarrage: null, formalisation: false, maturite: "I", emplois: 0, tier: "INACTIVE", score: 0.0 },
  { id: "world-like-home", num: 100, nom: "WORLD LIKE HOME", programmeId: "techclinic", programmeRaw: "TECHCLINIC", secteurRaw: "EDTECH", secteur: "EDTECH", siteWeb: null, actif: false, dateDemarrage: null, formalisation: false, maturite: "I", emplois: 0, tier: "INACTIVE", score: 0.0 },
  { id: "koumbaya", num: 101, nom: "KOUMBAYA", programmeId: "techclinic", programmeRaw: "TECHCLINIC", secteurRaw: "E COMMERCE", secteur: "COMMERCE", siteWeb: null, actif: false, dateDemarrage: null, formalisation: false, maturite: "I", emplois: 0, tier: "INACTIVE", score: 0.0 },
  { id: "sumba", num: 103, nom: "SUMBA", programmeId: "techclinic", programmeRaw: "TECHCLINIC", secteurRaw: "E-FINANCE", secteur: "FINTECH", siteWeb: null, actif: false, dateDemarrage: null, formalisation: false, maturite: "I", emplois: 0, tier: "INACTIVE", score: 0.0 },
  { id: "d-code", num: 104, nom: "D-CODE", programmeId: "techclinic", programmeRaw: "TECHCLINIC", secteurRaw: "EDTECH", secteur: "EDTECH", siteWeb: null, actif: false, dateDemarrage: null, formalisation: false, maturite: "I", emplois: 0, tier: "INACTIVE", score: 0.0 },
  { id: "savanah", num: 105, nom: "SAVANAH", programmeId: "techclinic", programmeRaw: "TECHCLINIC", secteurRaw: "DIVERTISSEMENT", secteur: "ART_CULTURE", siteWeb: null, actif: false, dateDemarrage: null, formalisation: false, maturite: "I", emplois: 0, tier: "INACTIVE", score: 0.0 },
  { id: "okita-market", num: 106, nom: "OKITA MARKET", programmeId: "techclinic", programmeRaw: "TECHCLINIC", secteurRaw: "E-COMMERCE", secteur: "COMMERCE", siteWeb: null, actif: false, dateDemarrage: null, formalisation: false, maturite: "I", emplois: 0, tier: "INACTIVE", score: 0.0 },
  { id: "gimemo", num: 108, nom: "GIMEMO", programmeId: "techclinic", programmeRaw: "TECHCLINIC", secteurRaw: "E-FINANCE", secteur: "FINTECH", siteWeb: null, actif: false, dateDemarrage: null, formalisation: false, maturite: "I", emplois: 0, tier: "INACTIVE", score: 0.0 },
  { id: "generation-8-1", num: 109, nom: "GENERATION 8.1", programmeId: "techclinic", programmeRaw: "TECHCLINIC", secteurRaw: "ADMINISTRATION", secteur: "GOUVERNANCE", siteWeb: null, actif: false, dateDemarrage: null, formalisation: false, maturite: "I", emplois: 0, tier: "INACTIVE", score: 0.0 },
  { id: "rachel-voyage", num: 110, nom: "RACHEL VOYAGE", programmeId: "techclinic", programmeRaw: "TECHCLINIC", secteurRaw: "TOURISME", secteur: "TOURISME", siteWeb: null, actif: false, dateDemarrage: null, formalisation: false, maturite: "I", emplois: 0, tier: "INACTIVE", score: 0.0 },
  { id: "la-depeche", num: 111, nom: "LA DEPECHE", programmeId: "techclinic", programmeRaw: "TECHCLINIC", secteurRaw: "COMMUNICATION", secteur: "COMMUNICATION", siteWeb: null, actif: false, dateDemarrage: null, formalisation: false, maturite: "I", emplois: 0, tier: "INACTIVE", score: 0.0 },
  { id: "sikolo", num: 112, nom: "SIKOLO", programmeId: "techclinic", programmeRaw: "TECHCLINIC", secteurRaw: "DIVERTISSEMENT", secteur: "ART_CULTURE", siteWeb: null, actif: false, dateDemarrage: null, formalisation: false, maturite: "I", emplois: 0, tier: "INACTIVE", score: 0.0 },
  { id: "anniv-ecole", num: 113, nom: "ANNIV-ECOLE", programmeId: "techclinic", programmeRaw: "TECHCLINIC", secteurRaw: "EVENEMENTIEL", secteur: "EVENEMENTIEL", siteWeb: null, actif: false, dateDemarrage: null, formalisation: false, maturite: "I", emplois: 0, tier: "INACTIVE", score: 0.0 },
  { id: "capital-assurance", num: 115, nom: "CAPITAL ASSURANCE", programmeId: "techclinic", programmeRaw: "TECHCLINIC", secteurRaw: "ASSURANCE", secteur: "FINTECH", siteWeb: null, actif: false, dateDemarrage: null, formalisation: false, maturite: "I", emplois: 0, tier: "INACTIVE", score: 0.0 },
  { id: "bonne-offre", num: 116, nom: "BONNE OFFRE", programmeId: "techclinic", programmeRaw: "TECHCLINIC", secteurRaw: "COMMUNICATION", secteur: "COMMUNICATION", siteWeb: null, actif: false, dateDemarrage: null, formalisation: false, maturite: "I", emplois: 0, tier: "INACTIVE", score: 0.0 },
  { id: "smarloc", num: 117, nom: "SMARLOC", programmeId: "techclinic", programmeRaw: "TECHCLINIC", secteurRaw: "COMMUNICATION", secteur: "COMMUNICATION", siteWeb: null, actif: false, dateDemarrage: null, formalisation: false, maturite: "I", emplois: 0, tier: "INACTIVE", score: 0.0 },
  { id: "harmoney", num: 118, nom: "HARMONEY", programmeId: "techclinic", programmeRaw: "TECHCLINIC", secteurRaw: "FINANCE", secteur: "FINTECH", siteWeb: null, actif: false, dateDemarrage: null, formalisation: false, maturite: "I", emplois: 0, tier: "INACTIVE", score: 0.0 },
  { id: "mbolo-gabon", num: 119, nom: "MBOLO GABON", programmeId: "techclinic", programmeRaw: "TECHCLINIC", secteurRaw: "TOURISME", secteur: "TOURISME", siteWeb: null, actif: false, dateDemarrage: null, formalisation: false, maturite: "I", emplois: 0, tier: "INACTIVE", score: 0.0 },
  { id: "afrobooking-app", num: 120, nom: "AFROBOOKING APP", programmeId: "techclinic", programmeRaw: "TECHCLINIC", secteurRaw: "TRANSPORT", secteur: "TRANSPORT", siteWeb: null, actif: false, dateDemarrage: null, formalisation: false, maturite: "I", emplois: 0, tier: "INACTIVE", score: 0.0 },
  { id: "killa-oshambe", num: 121, nom: "KILLA-OSHAMBE", programmeId: "techclinic", programmeRaw: "TECHCLINIC", secteurRaw: "TRANSPORT", secteur: "TRANSPORT", siteWeb: null, actif: false, dateDemarrage: null, formalisation: false, maturite: "I", emplois: 0, tier: "INACTIVE", score: 0.0 },
  { id: "vielite", num: 123, nom: "VIELITE", programmeId: "techclinic", programmeRaw: "TECHCLINIC", secteurRaw: "COMMUNICATION", secteur: "COMMUNICATION", siteWeb: null, actif: false, dateDemarrage: null, formalisation: false, maturite: "I", emplois: 0, tier: "INACTIVE", score: 0.0 },
  { id: "mon-e-transfert", num: 124, nom: "MON E-TRANSFERT", programmeId: "techclinic", programmeRaw: "TECHCLINIC", secteurRaw: "FINANCE", secteur: "FINTECH", siteWeb: null, actif: false, dateDemarrage: null, formalisation: false, maturite: "I", emplois: 0, tier: "INACTIVE", score: 0.0 },
  { id: "asse-wu-ntuk", num: 126, nom: "ASSE WU NTUK", programmeId: "techclinic", programmeRaw: "TECHCLINIC", secteurRaw: "ENVIRONNEMENT", secteur: "ENVIRONNEMENT", siteWeb: null, actif: false, dateDemarrage: null, formalisation: false, maturite: "I", emplois: 0, tier: "INACTIVE", score: 0.0 },
  { id: "transcolis", num: 127, nom: "TRANSCOLIS", programmeId: "techclinic", programmeRaw: "TECHCLINIC", secteurRaw: "TRANSPORT", secteur: "TRANSPORT", siteWeb: null, actif: false, dateDemarrage: null, formalisation: false, maturite: "I", emplois: 0, tier: "INACTIVE", score: 0.0 },
  { id: "any-app", num: 128, nom: "ANY APP", programmeId: "techclinic", programmeRaw: "TECHCLINIC", secteurRaw: "E-COMMERCE", secteur: "COMMERCE", siteWeb: null, actif: false, dateDemarrage: null, formalisation: false, maturite: "I", emplois: 0, tier: "INACTIVE", score: 0.0 },
  { id: "zaeyn", num: 130, nom: "ZAEYN", programmeId: "techclinic", programmeRaw: "TECHCLINIC", secteurRaw: "IMMOBILIER", secteur: "IMMOBILIER", siteWeb: null, actif: false, dateDemarrage: null, formalisation: false, maturite: "I", emplois: 0, tier: "INACTIVE", score: 0.0 },
  { id: "dorema-131", num: 131, nom: "DOREMA", programmeId: "techclinic", programmeRaw: "TECHCLINIC", secteurRaw: "E-COMMERCE", secteur: "COMMERCE", siteWeb: null, actif: false, dateDemarrage: null, formalisation: false, maturite: "I", emplois: 0, tier: "INACTIVE", score: 0.0 },
  { id: "micropay", num: 132, nom: "MICROPAY", programmeId: "techclinic", programmeRaw: "TECHCLINIC", secteurRaw: "FISCALITE", secteur: "FINTECH", siteWeb: null, actif: false, dateDemarrage: null, formalisation: false, maturite: "I", emplois: 0, tier: "INACTIVE", score: 0.0 },
  { id: "kazipro-133", num: 133, nom: "KAZI'PRO", programmeId: "techclinic", programmeRaw: "TECHCLINIC", secteurRaw: "PLACEMENT DE PERSONNEL", secteur: "CONSEIL", siteWeb: null, actif: false, dateDemarrage: null, formalisation: false, maturite: "I", emplois: 0, tier: "INACTIVE", score: 0.0 },
  { id: "lama-bla", num: 134, nom: "LAMA B'LA", programmeId: "techclinic", programmeRaw: "TECHCLINIC", secteurRaw: "AGROALIMENTAIRE", secteur: "AGRICULTURE", siteWeb: null, actif: false, dateDemarrage: null, formalisation: false, maturite: "I", emplois: 0, tier: "INACTIVE", score: 0.0 },
  { id: "pop-up-skin-care", num: 136, nom: "POP UP SKIN CARE", programmeId: "techclinic", programmeRaw: "TECHCLINIC", secteurRaw: "COSMETIQUE", secteur: "ART_CULTURE", siteWeb: null, actif: false, dateDemarrage: null, formalisation: false, maturite: "I", emplois: 0, tier: "INACTIVE", score: 0.0 },
  { id: "kenny-couture", num: 137, nom: "KENNY COUTURE", programmeId: "techclinic", programmeRaw: "TECHCLINIC", secteurRaw: "COUTURE", secteur: "ART_CULTURE", siteWeb: null, actif: false, dateDemarrage: null, formalisation: false, maturite: "I", emplois: 0, tier: "INACTIVE", score: 0.0 },
  { id: "tsoli", num: 138, nom: "TSOLI", programmeId: "techclinic", programmeRaw: "TECHCLINIC", secteurRaw: "E-COMMERCE", secteur: "COMMERCE", siteWeb: null, actif: false, dateDemarrage: null, formalisation: false, maturite: "I", emplois: 0, tier: "INACTIVE", score: 0.0 },
  { id: "les-petits-pots-de-julie", num: 140, nom: "LES PETITS POTS DE JULIE", programmeId: "prodece", programmeRaw: "PRODECE", secteurRaw: "ARTISANAT", secteur: "CONSEIL", siteWeb: null, actif: false, dateDemarrage: null, formalisation: false, maturite: "I", emplois: 0, tier: "INACTIVE", score: 0.0 },
  { id: "sina", num: 145, nom: "SINA", programmeId: "entreprendre-feminin", programmeRaw: "ENTREPRENDRE AU FEMININ", secteurRaw: "CONSEIL", secteur: "CONSEIL", siteWeb: null, actif: false, dateDemarrage: null, formalisation: false, maturite: "I", emplois: 0, tier: "INACTIVE", score: 0.0 },
  { id: "mon-logement-virtuelle", num: 146, nom: "MON LOGEMENT VIRTUELLE", programmeId: "entreprendre-feminin", programmeRaw: "ENTREPRENDRE AU FEMININ", secteurRaw: "IMMOBILIER", secteur: "IMMOBILIER", siteWeb: null, actif: false, dateDemarrage: null, formalisation: false, maturite: "I", emplois: 0, tier: "INACTIVE", score: 0.0 },
  { id: "kowa", num: 147, nom: "KOWA", programmeId: "entreprendre-feminin", programmeRaw: "ENTREPRENDRE AU FEMININ", secteurRaw: "CONSEIL", secteur: "CONSEIL", siteWeb: null, actif: false, dateDemarrage: null, formalisation: false, maturite: "I", emplois: 0, tier: "INACTIVE", score: 0.0 },
  { id: "clinique-juridique", num: 148, nom: "CLINIQUE JURIDIQUE", programmeId: "entreprendre-feminin", programmeRaw: "ENTREPRENDRE AU FEMININ", secteurRaw: "JURIDIQUE", secteur: "GOUVERNANCE", siteWeb: null, actif: false, dateDemarrage: null, formalisation: false, maturite: "M", emplois: 0, tier: "INACTIVE", score: 30.0 },
  { id: "bjtech", num: 152, nom: "BJTECH", programmeId: "e-startup-challenge", programmeRaw: "E-STARTUP CHALLENGE", secteurRaw: "E-SANTE", secteur: "SANTE", siteWeb: null, actif: false, dateDemarrage: null, formalisation: false, maturite: "I", emplois: 0, tier: "INACTIVE", score: 0.0 },
  { id: "les-winners", num: 156, nom: "LES WINNERS", programmeId: "e-startup-challenge", programmeRaw: "E-STARTUP CHALLENGE", secteurRaw: "E-SANTE", secteur: "SANTE", siteWeb: null, actif: false, dateDemarrage: null, formalisation: false, maturite: "I", emplois: 0, tier: "INACTIVE", score: 0.0 },
  { id: "sante-gab", num: 157, nom: "SANTE GAB", programmeId: "hackathon-airtel", programmeRaw: "HACKATHON AIRTEL", secteurRaw: "E-SANTE", secteur: "SANTE", siteWeb: null, actif: false, dateDemarrage: null, formalisation: false, maturite: "I", emplois: 0, tier: "INACTIVE", score: 0.0 },
  { id: "samu-express", num: 158, nom: "SAMU EXPRESS", programmeId: "hackathon-airtel", programmeRaw: "HACKATHON AIRTEL", secteurRaw: "E-SANTE", secteur: "SANTE", siteWeb: null, actif: false, dateDemarrage: null, formalisation: false, maturite: "I", emplois: 0, tier: "INACTIVE", score: 0.0 },
  { id: "african-trotteur", num: 162, nom: "AFRICAN TROTTEUR", programmeId: "entrepreneur-impact", programmeRaw: "ENTREPRENEUR D'IMPACT", secteurRaw: "TOURISME", secteur: "TOURISME", siteWeb: null, actif: false, dateDemarrage: "2020", formalisation: true, maturite: "M", emplois: 0, tier: "INACTIVE", score: 45.0 },
  { id: "studio-okoume", num: 166, nom: "STUDIO OKOUME", programmeId: "cohorte-innovation-4-fef", programmeRaw: "COHORTE INNOVATION 4.0 EDITION FEF", secteurRaw: "MOBILIER", secteur: "IMMOBILIER", siteWeb: null, actif: false, dateDemarrage: null, formalisation: false, maturite: "I", emplois: 0, tier: "INACTIVE", score: 0.0 },
  { id: "harmonie-home", num: 172, nom: "HARMONIE HOME", programmeId: "cohorte-innovation-4-fef", programmeRaw: "COHORTE INNOVATION 4.0 EDITION FEF", secteurRaw: "MOBILIER", secteur: "IMMOBILIER", siteWeb: null, actif: false, dateDemarrage: null, formalisation: false, maturite: "I", emplois: 0, tier: "INACTIVE", score: 0.0 },
  { id: "ening", num: 175, nom: "ENING", programmeId: "cohorte-innovation-4-fef", programmeRaw: "COHORTE INNOVATION 4.0 EDITION FEF", secteurRaw: "ENERGIE", secteur: "ENVIRONNEMENT", siteWeb: null, actif: false, dateDemarrage: null, formalisation: false, maturite: "I", emplois: 0, tier: "INACTIVE", score: 0.0 },
  { id: "pwarevey", num: 176, nom: "PWAREVEY", programmeId: "cohorte-innovation-4-fef", programmeRaw: "COHORTE INNOVATION 4.0 EDITION FEF", secteurRaw: "FINTECH", secteur: "FINTECH", siteWeb: null, actif: false, dateDemarrage: null, formalisation: false, maturite: "I", emplois: 0, tier: "INACTIVE", score: 0.0 },
  { id: "import-your-cassava", num: 177, nom: "IMPORT YOUR CASSAVA", programmeId: "cohorte-innovation-4-fef", programmeRaw: "COHORTE INNOVATION 4.0 EDITION FEF", secteurRaw: "AGROALIMENTAIRE", secteur: "AGRICULTURE", siteWeb: null, actif: false, dateDemarrage: null, formalisation: false, maturite: "I", emplois: 0, tier: "INACTIVE", score: 0.0 },
  { id: "audiopharm", num: 178, nom: "AUDIOPHARM", programmeId: "cohorte-innovation-4-fef", programmeRaw: "COHORTE INNOVATION 4.0 EDITION FEF", secteurRaw: "E-SANTE", secteur: "SANTE", siteWeb: null, actif: false, dateDemarrage: null, formalisation: false, maturite: "I", emplois: 0, tier: "INACTIVE", score: 0.0 },
  { id: "lumina-auto", num: 179, nom: "LUMINA AUTO", programmeId: "cohorte-innovation-4-fef", programmeRaw: "COHORTE INNOVATION 4.0 EDITION FEF", secteurRaw: "TRANSPORT", secteur: "TRANSPORT", siteWeb: null, actif: false, dateDemarrage: null, formalisation: false, maturite: "I", emplois: 0, tier: "INACTIVE", score: 0.0 },
  { id: "allo-mecano", num: 180, nom: "ALLO MECANO", programmeId: "cohorte-innovation-4-fef", programmeRaw: "COHORTE INNOVATION 4.0 EDITION FEF", secteurRaw: "TRANSPORT", secteur: "TRANSPORT", siteWeb: null, actif: false, dateDemarrage: null, formalisation: false, maturite: "I", emplois: 0, tier: "INACTIVE", score: 0.0 },
  { id: "teuch", num: 181, nom: "TEUCH", programmeId: "cohorte-innovation-4-fef", programmeRaw: "COHORTE INNOVATION 4.0 EDITION FEF", secteurRaw: "TRANSPORT", secteur: "TRANSPORT", siteWeb: null, actif: false, dateDemarrage: null, formalisation: false, maturite: "I", emplois: 0, tier: "INACTIVE", score: 0.0 },
  { id: "prix-clair", num: 182, nom: "PRIX CLAIR", programmeId: "cohorte-innovation-4-fef", programmeRaw: "COHORTE INNOVATION 4.0 EDITION FEF", secteurRaw: "E-COMMERCE", secteur: "COMMERCE", siteWeb: null, actif: false, dateDemarrage: null, formalisation: false, maturite: "I", emplois: 0, tier: "INACTIVE", score: 0.0 },
  { id: "send-wise", num: 183, nom: "SEND WISE", programmeId: "cohorte-innovation-4-fef", programmeRaw: "COHORTE INNOVATION 4.0 EDITION FEF", secteurRaw: "FINTECH", secteur: "FINTECH", siteWeb: null, actif: false, dateDemarrage: null, formalisation: false, maturite: "I", emplois: 0, tier: "INACTIVE", score: 0.0 },
  { id: "bookaide", num: 184, nom: "BOOKAIDE", programmeId: "cohorte-innovation-4-fef", programmeRaw: "COHORTE INNOVATION 4.0 EDITION FEF", secteurRaw: "E-SANTE", secteur: "SANTE", siteWeb: null, actif: false, dateDemarrage: null, formalisation: false, maturite: "I", emplois: 0, tier: "INACTIVE", score: 0.0 },
  { id: "buro-241", num: 185, nom: "BURO 241", programmeId: "cohorte-innovation-4-fef", programmeRaw: "COHORTE INNOVATION 4.0 EDITION FEF", secteurRaw: "E-GOV", secteur: "GOUVERNANCE", siteWeb: null, actif: false, dateDemarrage: null, formalisation: false, maturite: "I", emplois: 0, tier: "INACTIVE", score: 0.0 },
  { id: "waste-app", num: 186, nom: "WASTE APP", programmeId: "cohorte-innovation-4-fef", programmeRaw: "COHORTE INNOVATION 4.0 EDITION FEF", secteurRaw: "ENVIRONNEMENT", secteur: "ENVIRONNEMENT", siteWeb: null, actif: false, dateDemarrage: null, formalisation: false, maturite: "I", emplois: 0, tier: "INACTIVE", score: 0.0 },
  { id: "tag", num: 189, nom: "TAG", programmeId: "cohorte-innovation-4-fef", programmeRaw: "COHORTE INNOVATION 4.0 EDITION FEF", secteurRaw: "SECURITE", secteur: "SECURITE", siteWeb: null, actif: false, dateDemarrage: null, formalisation: false, maturite: "I", emplois: 0, tier: "INACTIVE", score: 0.0 },
  { id: "biss-car", num: 190, nom: "BISS CAR", programmeId: "cohorte-innovation-4-fef", programmeRaw: "COHORTE INNOVATION 4.0 EDITION FEF", secteurRaw: "TRANSPORT", secteur: "TRANSPORT", siteWeb: null, actif: false, dateDemarrage: null, formalisation: false, maturite: "I", emplois: 0, tier: "INACTIVE", score: 0.0 },
  { id: "oranga-sante", num: 196, nom: "ORANGA SANTE", programmeId: "cohorte-innovation-4-fef", programmeRaw: "COHORTE INNOVATION 4.0 EDITION FEF", secteurRaw: "E-SANTE", secteur: "SANTE", siteWeb: null, actif: false, dateDemarrage: null, formalisation: false, maturite: "I", emplois: 0, tier: "INACTIVE", score: 0.0 },
  { id: "wise-up-energie", num: 197, nom: "WISE-UP ENERGIE", programmeId: "cohorte-innovation-4-fef", programmeRaw: "COHORTE INNOVATION 4.0 EDITION FEF", secteurRaw: "ENERGIE", secteur: "ENVIRONNEMENT", siteWeb: null, actif: false, dateDemarrage: null, formalisation: false, maturite: "I", emplois: 0, tier: "INACTIVE", score: 0.0 },
];

// ══════════════════════════════════════════════════════════════════════════
// AGRÉGATION COMPLÈTE
// ══════════════════════════════════════════════════════════════════════════

export const ALL_STARTUPS_SING: StartupSING[] = [
  ...TOP_STARTUPS_SING,
  ...ACTIVE_STARTUPS_SING,
  ...INACTIVE_STARTUPS_SING,
].sort((a, b) => b.score - a.score);

// Legacy alias for backward compatibility
export const STARTUPS_PORTFOLIO = ALL_STARTUPS_SING;

// Helpers
export const getStartupsByProgramme = (programmeId: ProgrammeId): StartupSING[] =>
  ALL_STARTUPS_SING.filter(s => s.programmeId === programmeId);

export const getStartupsBySecteur = (secteur: SecteurNormalise): StartupSING[] =>
  ALL_STARTUPS_SING.filter(s => s.secteur === secteur);

export const STARTUPS_AVEC_SITE = ALL_STARTUPS_SING.filter(s => s.siteWeb !== null);

// ═══════════════════════════════════
// ANALYTICS CHARTS — données réelles
// ═══════════════════════════════════
export const ANALYTICS_CHARTS = {
  evolution: [
    { year: '2017', startups: 8 },
    { year: '2018', startups: 25 },
    { year: '2019', startups: 50 },
    { year: '2020', startups: 85 },
    { year: '2021', startups: 120 },
    { year: '2022', startups: 155 },
    { year: '2023', startups: 190 },
    { year: '2024', startups: 210 },
    { year: '2025', startups: 218 },
  ],
  sectors: [
    { name: 'Agriculture', value: 14.2, color: '#22C55E' },
    { name: 'Transport', value: 12.4, color: '#3B82F6' },
    { name: 'Santé', value: 8.7, color: '#EF4444' },
    { name: 'FinTech', value: 6.4, color: '#14B8A6' },
    { name: 'Commerce', value: 6.0, color: '#F59E0B' },
    { name: 'Événementiel', value: 5.5, color: '#F97316' },
    { name: 'Communication', value: 5.5, color: '#EC4899' },
    { name: 'Art & Culture', value: 5.5, color: '#D946EF' },
    { name: 'Tech/IT', value: 5.5, color: '#6366F1' },
    { name: 'EdTech', value: 5.0, color: '#8B5CF6' },
    { name: 'Autres', value: 25.3, color: '#9CA3AF' },
  ],
  funding: [
    { year: '2019', amount: 15 },
    { year: '2020', amount: 35 },
    { year: '2021', amount: 55 },
    { year: '2022', amount: 80 },
    { year: '2023', amount: 110 },
    { year: '2024', amount: 95 },
    { year: '2025', amount: 70 },
    { year: '2026', amount: 49 },
  ],
  benchmark: [
    { country: 'Gabon (SING)', score: 76, flag: '��🇦' },
    { country: 'Cameroun', score: 45, flag: '🇨🇲' },
    { country: 'Congo-Brazza', score: 35, flag: '🇨🇬' },
    { country: 'RD Congo', score: 30, flag: '🇨🇩' },
    { country: 'Tchad', score: 15, flag: '🇹🇩' },
  ],
};

// ═══════════════════════════════════
// MENTORS (5) — inchangé
// ═══════════════════════════════════
export const MENTORS: Mentor[] = [
  { id: 'mentor-1', name: 'Dr. Franck-Éric Oyane Ndong', title: "DG du Centre Gabonais de l'Innovation", expertise: ['Innovation publique', 'GovTech', 'Transformation digitale'], sectors: ['govtech', 'edtech'], experience: '15+ ans', mentees: 12, rating: 4.9, availability: 'Lundi & Mercredi 14h-16h', bio: 'Directeur Général du CGI, expert en innovation publique.', languages: ['Français', 'Anglais'] },
  { id: 'mentor-2', name: 'Marie-Claire Obame', title: 'Managing Partner, Okoumé Capital', expertise: ['Venture Capital', 'Levée de fonds', 'Due diligence'], sectors: ['fintech', 'insurtech'], experience: '12+ ans', mentees: 8, rating: 4.8, availability: 'Mardi & Jeudi 10h-12h', bio: 'Investisseuse spécialiste du financement des startups tech en Afrique centrale.', languages: ['Français', 'Anglais'] },
  { id: 'mentor-3', name: 'Jean-Baptiste Mboumba', title: 'CTO, SING Logiciels', expertise: ['Architecture logicielle', 'Cloud', 'DevOps', 'IA'], sectors: ['fintech', 'healthtech', 'govtech'], experience: '10+ ans', mentees: 15, rating: 4.7, availability: 'Lundi à Vendredi 16h-18h', bio: 'Architecte des solutions souveraines : GABON ID CONNECT, Numérithèque.', languages: ['Français'] },
  { id: 'mentor-4', name: 'Aïcha Nzang', title: 'Directrice, Pôle Femmes & Innovation', expertise: ['Leadership féminin', 'Impact social', 'Business dev'], sectors: ['ecommerce', 'edtech', 'healthtech'], experience: '8+ ans', mentees: 20, rating: 4.9, availability: 'Mercredi & Vendredi 9h-11h', bio: "Pilote du programme WELP, championne de l'entrepreneuriat féminin numérique.", languages: ['Français', 'Fang'] },
  { id: 'mentor-5', name: 'Pierre Ntoutoume', title: 'Serial Entrepreneur & Business Angel', expertise: ['Scale-up', 'Growth hacking', 'International'], sectors: ['ecommerce', 'mobilite', 'fintech'], experience: '20+ ans', mentees: 10, rating: 4.6, availability: 'Jeudi 14h-17h', bio: 'Fondateur de 3 startups tech, investisseur dans 12 startups gabonaises.', languages: ['Français', 'Anglais', 'Espagnol'] },
];

// ═══════════════════════════════════
// COHORTES (5) — inchangé
// ═══════════════════════════════════
export const COHORTES_HISTORIQUE: Cohorte[] = [
  { id: 'cohorte-mars-2026', name: 'Cohorte Accélération Mars 2026', programme: 'Cohorte Innovation 4.0', status: 'IN_PROGRESS', startDate: '2026-01-15', endDate: '2026-04-15', places: { total: 15, filled: 12 }, startups: ['MonProjet (vous)', 'TechVert', 'PayLocal', 'EduGabon', 'HealthConnect', 'AgriSmart', 'LogiExpress', 'UrbanTech', 'FoodDelivery', 'CleanEnergy', 'DataGov', 'MediaTech'], mentors: 5, sponsors: ['SING', 'Digital Africa'] },
  { id: 'cohorte-sept-2025', name: 'Cohorte Innovation Septembre 2025', programme: 'Cohorte Innovation 4.0', status: 'COMPLETED', startDate: '2025-09-01', endDate: '2025-12-01', places: { total: 20, filled: 20 }, startups: ['CA PAY', 'POZI', 'TRANSMED', 'EKENA', 'ARCHIVEO', 'WAGUI'], mentors: 8, sponsors: ['SING', 'Okoumé Capital', 'PNUD'], results: { survivalRate: '80%', fundingRaised: '120M FCFA', jobsCreated: 65 } },
  { id: 'techclinic-2024', name: 'TechClinic BOOST & WIN 2024', programme: 'TechClinic BOOST & WIN', status: 'COMPLETED', startDate: '2024-03-01', endDate: '2024-04-15', places: { total: 15, filled: 15 }, startups: ['DS-TRUST', 'EAGLE AI', 'SIKUL', 'GREEN LEAVES GABON', 'TRANSIT PLUS'], mentors: 7, sponsors: ['Digital Africa', 'Fonds FUZÉ', 'Fonds Équipe France'], results: { survivalRate: '82%', connections: '500+ réseau Digital Africa' } },
  { id: 'fef-2024', name: 'Cohorte Innovation 4.0 — Édition FEF', programme: 'Cohorte Innovation 4.0 — Édition FEF', status: 'COMPLETED', startDate: '2024-06-01', endDate: '2024-09-01', places: { total: 34, filled: 34 }, startups: ['TOULE MARKET', 'PMS SUARL (VINGUELE)', 'CRAIE GAB', 'LA1GABONAISE', 'SPG', 'LA DELICIEUSE'], mentors: 10, sponsors: ['Fonds Équipe France', 'SING', 'AFD'], results: { survivalRate: '76%', startupsActives: 26, emploisCrees: 107 } },
  { id: 'agrifutur-2024', name: "AGRI'FUTUR 2024", programme: "AGRI'FUTUR", status: 'COMPLETED', startDate: '2024-09-01', endDate: '2024-12-01', places: { total: 10, filled: 10 }, startups: ['LA FERME D\'EMIR', 'LE POTAGER MENGUE', 'NOUNGUI AGRI', 'AGRODURABLE', 'AGRISERRA'], mentors: 5, sponsors: ['Partenaires AgriTech', 'SING'], results: { survivalRate: '100%', tauxActivite: '100%', emploisCrees: 33 } },
];

// ═══════════════════════════════════
// EVENEMENTS (5) — inchangé
// ═══════════════════════════════════
export const EVENEMENTS: Evenement[] = [
  { id: 'gabon-tech-week-2026', name: 'Gabon Tech & Innovation Week 2026', type: 'CONFERENCE', date: '2026-07-15', endDate: '2026-07-19', location: 'Libreville, Centre de Conférences', description: 'Semaine nationale de la tech : conférences, hackathon, demo day, networking.', speakers: 30, capacity: 1500, registered: 850, price: 'Gratuit', tags: ['Conférence', 'Hackathon', 'Demo Day'], registrationOpen: true },
  { id: 'hackathon-govtech-2026', name: 'Hackathon GovTech — SmartGov Edition 2', type: 'HACKATHON', date: '2026-09-10', endDate: '2026-09-12', location: 'SING, Libreville', description: "48h pour prototyper la prochaine Startup d'État.", capacity: 200, registered: 45, price: 'Gratuit', prize: '5 000 000 FCFA', tags: ['Hackathon', '48h', 'GovTech'], registrationOpen: true },
  { id: 'demo-day-cohorte-2026', name: 'Demo Day — Cohorte Mars 2026', type: 'DEMO_DAY', date: '2026-04-15', location: 'SING, Libreville', description: "15 startups pitchent devant jury d'investisseurs.", capacity: 100, registered: 78, price: 'Sur invitation', tags: ['Pitch', 'Investisseurs'], registrationOpen: false },
  { id: 'welp-bootcamp-2026', name: 'WELP Bootcamp Leadership Féminin', type: 'WORKSHOP', date: '2026-06-01', endDate: '2026-06-05', location: 'SING, Libreville', description: '5 jours de formation intensive pour les femmes entrepreneures.', capacity: 30, registered: 12, price: 'Gratuit', tags: ['Femmes', 'Leadership'], registrationOpen: true },
  { id: 'minilab-demo-2026', name: 'Minilab Demo — Portes Ouvertes', type: 'DEMO', date: '2026-05-20', location: 'Lycée National Léon Mba', description: 'Démonstration des projets VR et coding réalisés par les lycéens.', capacity: 200, registered: 30, price: 'Gratuit', tags: ['Minilab', 'VR', 'Éducation'], registrationOpen: true },
];

// ═══════════════════════════════════
// MON PARCOURS (milestones demo) — inchangé
// ═══════════════════════════════════
export const MON_PARCOURS_MILESTONES: Milestone[] = [
  { id: 1, title: 'Onboarding & Design Thinking', week: 'S1-S2', status: 'COMPLETED', completedDate: '2026-01-28', deliverables: ['Lean Canvas', 'Persona Map', 'Value Proposition'] },
  { id: 2, title: 'Validation Problème/Solution', week: 'S3-S4', status: 'COMPLETED', completedDate: '2026-02-11', deliverables: ['50 interviews clients', 'Problem-Solution Fit', 'Hypothèses validées'] },
  { id: 3, title: 'Développement MVP', week: 'S5-S6', status: 'COMPLETED', completedDate: '2026-02-25', deliverables: ['MVP fonctionnel', 'Tests utilisateurs', 'Itérations V2'] },
  { id: 4, title: 'Growth & Traction', week: 'S7-S10', status: 'IN_PROGRESS', deliverables: ['100 premiers utilisateurs', 'Métriques de traction', 'Business model finalisé', "Stratégie d'acquisition"] },
  { id: 5, title: 'Préparation Pitch', week: 'S11', status: 'LOCKED', deliverables: ['Pitch deck', 'Financial model', 'Répétitions pitch'] },
  { id: 6, title: 'Pitch Day Investisseurs', week: 'S12', status: 'LOCKED', deliverables: ['Pitch 10 min', 'Q&A jury', 'Mise en relation investisseurs'] },
];

// ═══════════════════════════════════
// FINANCEMENT — inchangé
// ═══════════════════════════════════
export const FINANCEMENT_SOURCES = [
  { name: 'SING Capital', type: "Fonds d'amorçage", range: '500K — 15M FCFA', instruments: ['Prêt participatif', 'Prise de participation', 'Avance remboursable'], partners: ['Okoumé Capital', 'PNUD'], status: 'ACTIVE' as const },
  { name: 'Fonds FUZÉ (Digital Africa)', type: 'Accélération', range: '5M — 30M FCFA', instruments: ['Subvention', 'Prêt convertible'], partners: ['Digital Africa', 'AFD'], status: 'ACTIVE' as const },
  { name: 'Fonds SmartGov', type: 'Innovation publique', range: '1M — 5M FCFA', instruments: ["Subvention d'amorçage", 'Marché public pilote'], partners: ['État gabonais', 'ANINF'], status: 'ACTIVE' as const },
];

export const FINANCEMENT_PIPELINE = {
  columns: [
    { id: 'identification', label: 'Identifié', items: [{ funder: 'Fonds FUZÉ', amount: '15M FCFA', type: 'Subvention', date: '2026-02-01' }] },
    { id: 'preparation', label: 'En préparation', items: [{ funder: 'SING Capital', amount: '5M FCFA', type: 'Prêt participatif', date: '2026-02-15' }] },
    { id: 'submitted', label: 'Soumis', items: [{ funder: 'SING Capital', amount: '5M FCFA', type: 'Prêt participatif', date: '2026-03-01' }] },
    { id: 'due-diligence', label: 'Due Diligence', items: [] },
    { id: 'approved', label: 'Approuvé', items: [] },
    { id: 'disbursed', label: 'Décaissé', items: [] },
  ],
  globalStats: { totalRaised: '492 emplois créés', startupsFinanced: 71, averageTicket: 'N/A', successRate: '51,8%' },
};

// ═══════════════════════════════════
// COMMUNAUTE — mise à jour
// ═══════════════════════════════════
export const COMMUNAUTE = {
  stats: { totalAlumni: 218, activeMembers: 113, mentors: 15, channels: 8 },
  channels: [
    { name: '#general', members: 218, lastMessage: 'Il y a 5 min', description: 'Discussions générales' },
    { name: '#agriculture', members: 31, lastMessage: 'Il y a 1h', description: 'Communauté AgriTech' },
    { name: '#transport', members: 27, lastMessage: 'Il y a 3h', description: 'Transport & Logistique' },
    { name: '#funding', members: 60, lastMessage: 'Il y a 30 min', description: 'Opportunités de financement' },
    { name: '#jobs', members: 100, lastMessage: 'Il y a 2h', description: "Offres d'emploi tech" },
    { name: '#events', members: 120, lastMessage: 'Il y a 1h', description: 'Événements et networking' },
    { name: '#women-in-tech', members: 40, lastMessage: 'Il y a 4h', description: 'Réseau Entreprendre au Féminin' },
    { name: '#mentoring', members: 35, lastMessage: 'Il y a 6h', description: 'Demandes de mentorat' },
  ],
  alumniSpotlight: {
    startup: 'TRANSMED',
    founder: 'Fondateur TRANSMED',
    achievement: 'Startup N°1 SING — 45 emplois créés en E-Santé',
    programme: 'TechClinic BOOST & WIN',
    quote: 'La SING nous a donné les outils, le réseau et la confiance pour viser grand.',
  },
};
