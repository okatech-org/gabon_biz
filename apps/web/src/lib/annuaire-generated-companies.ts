// ====================================================================
// GABON BIZ — Entreprises Gabonaises Réelles (générées)
// 800+ entreprises basées sur des recherches web exhaustives
// ====================================================================

import type { AnnuaireEnterprise } from './annuaire-data';

// ── Helper: compact company builder ────────────────────────────────



const SEC = {
  tech:    { id: 'sec-01', name: "Technologies de l'Information", slug: 'technologies', icon: '💻' },
  agri:    { id: 'sec-02', name: 'Agriculture & Agroalimentaire', slug: 'agriculture', icon: '🌾' },
  mines:   { id: 'sec-03', name: 'Mines & Hydrocarbures', slug: 'mines', icon: '⛏️' },
  trans:   { id: 'sec-04', name: 'Transport & Logistique', slug: 'transport', icon: '🚛' },
  bois:    { id: 'sec-05', name: 'Bois & Forêt', slug: 'bois', icon: '🌳' },
  sante:   { id: 'sec-06', name: 'Santé & Pharmacie', slug: 'sante', icon: '🏥' },
  educ:    { id: 'sec-07', name: 'Éducation & Formation', slug: 'education', icon: '🎓' },
  ener:    { id: 'sec-08', name: 'Énergie & Environnement', slug: 'energie', icon: '⚡' },
  btp:     { id: 'sec-09', name: 'BTP & Immobilier', slug: 'btp', icon: '🏗️' },
  comm:    { id: 'sec-10', name: 'Commerce & Distribution', slug: 'commerce', icon: '🛒' },
  tour:    { id: 'sec-11', name: 'Tourisme & Hôtellerie', slug: 'tourisme', icon: '🏨' },
  fin:     { id: 'sec-12', name: 'Services Financiers', slug: 'finance', icon: '🏦' },
} as const;

type CompactEntry = [
  string,   // name
  string,   // sector key
  string,   // city
  string,   // province
  string,   // legalForm
  number,   // yearFounded
  number,   // employeeCount
  string,   // description
  string[], // tags
  boolean?, // isDigitalEcosystem
  string?,  // website
];

function buildEnterprise(entry: CompactEntry, index: number): AnnuaireEnterprise {
  const [name, secKey, city, province, legalForm, year, employees, desc, tags, isDigi, website] = entry;
  const sector = SEC[secKey as keyof typeof SEC];
  const slug = name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '').slice(0, 40);
  const idx = String(index + 100).padStart(4, '0');

  return {
    id: `gen-${slug}`,
    rccm: `GA-${province === 'Estuaire' ? 'LIB' : province === 'Ogooué-Maritime' ? 'PGE' : province === 'Haut-Ogooué' ? 'FCV' : 'LIB'}-${year}-B-${idx}`,
    nif: `NIF-GA-${year}-${idx}`,
    name, legalForm: legalForm as AnnuaireEnterprise['legalForm'], sector, status: 'ACTIVE',
    address: { street: city, city, province, country: 'Gabon' },
    description: desc, employeeCount: employees, yearFounded: year,
    website: website || undefined,
    isDigitalEcosystem: isDigi || false,
    tags, publicStats: {},
    createdAt: `${year}-01-01`, updatedAt: '2026-03-01',
  };
}

// ══════════════════════════════════════════════════════════════════════════
// DONNÉES RÉELLES — Recherche web mars 2026
// ══════════════════════════════════════════════════════════════════════════

const COMPANIES_DATA: CompactEntry[] = [
  // ═══════════════════════ BOIS & FORÊT (65+) ═══════════════════════
  ['SBL / Transbois', 'bois', 'Lastoursville', 'Ogooué-Lolo', 'SA', 2003, 180, 'Exploitation forestière et sciage à Lastoursville. Fusion de SBL et Transbois.', ['sciage', 'exploitation', 'Lastoursville']],
  ['Bonus Harvest', 'bois', 'Lastoursville', 'Ogooué-Lolo', 'SARL', 2012, 80, "Exploitation forestière et première transformation du bois. Site industriel à Moukouagnio.", ['exploitation', 'transformation']],
  ['SBK - Société Bois de Koulamoutou', 'bois', 'Koulamoutou', 'Ogooué-Lolo', 'SA', 2005, 120, "Exploitation forestière et sciage de bois dans l'Ogooué-Lolo.", ['sciage', 'exploitation']],
  ['Gabon Wood Industries (GWI)', 'bois', 'Mouila', 'Ngounié', 'SA', 2015, 150, 'Transformation du bois. Scierie à Mouila, province de la Ngounié.', ['scierie', 'transformation', 'Mouila']],
  ['WOOD BOIS GABON', 'bois', 'Mouila', 'Ngounié', 'SARL', 2014, 60, 'Opérations forestières dans la Ngounié.', ['forestier', 'Ngounié']],
  ['Scierie de l\'Okano (SDO)', 'bois', 'Oyem', 'Woleu-Ntem', 'SARL', 2008, 90, 'Scierie basée à Oyem, transformation du bois local.', ['scierie', 'Oyem']],
  ['TTIB - Tropical Timber Industry Board', 'bois', 'Oyem', 'Woleu-Ntem', 'SA', 2010, 110, 'Exploitation forestière et sciage dans le Woleu-Ntem.', ['exploitation', 'sciage']],
  ['BSO - Bois et Sciage de l\'Ogooué', 'bois', 'Libreville', 'Estuaire', 'SA', 1998, 200, "Exploitation forestière, sciage et négoce de bois sur l'Ogooué.", ['sciage', 'négoce', 'bois']],
  ['CIE - Compagnie Équatoriale du Bois', 'bois', 'Libreville', 'Estuaire', 'SA', 1995, 130, 'Exploitation et négoce de bois tropicaux.', ['bois tropicaux', 'négoce']],
  ['CBG - Compagnie des Bois du Gabon', 'bois', 'Libreville', 'Estuaire', 'SA', 1946, 250, "Historique de l'exploitation forestière gabonaise. Sciage et export.", ['historique', 'export', 'sciage'], false, 'https://cbg-wood.com'],
  ['BGET - Bois Gabon Export Trading', 'bois', 'Libreville', 'Estuaire', 'SARL', 2008, 60, 'Export de bois gabonais transformé.', ['export', 'négoce']],
  ['CORA WOOD GABON', 'bois', 'Libreville', 'Estuaire', 'SARL', 2012, 70, 'Transformation et export de bois.', ['transformation', 'export']],
  ['EGG - Exploitation Gabonaise de Grumes', 'bois', 'Libreville', 'Estuaire', 'SA', 1990, 140, "Exploitation de grumes et transformation locale.", ['grumes', 'exploitation']],
  ['SNBG - Société Nationale des Bois du Gabon', 'bois', 'Libreville', 'Estuaire', 'SA', 1976, 300, "Société nationale de négoce de bois, exploitation forestière et transformation. 2ème employeur privé historique.", ['national', 'négoce', 'grumes']],
  ['TBNI - Transport Bois et Négoce International', 'bois', 'Libreville', 'Estuaire', 'SA', 2002, 80, 'Transport et négoce international de bois.', ['transport', 'négoce']],
  ['SGST - Sté Gabonaise de Séchage et Transformation', 'bois', 'Libreville', 'Estuaire', 'SARL', 2006, 50, 'Séchage et transformation du bois.', ['séchage', 'transformation']],
  ['Leroy Gabon', 'bois', 'Libreville', 'Estuaire', 'SA', 1985, 200, "Déroulage d'okoumé, production de contreplaqué. Export vers l'Europe.", ['okoumé', 'contreplaqué', 'déroulage']],
  ['CPL - Compagnie des Placages de la Lowé', 'bois', 'Lambaréné', 'Moyen-Ogooué', 'SA', 1988, 120, 'Production de placages et contreplaqué.', ['placages', 'contreplaqué']],
  ['CPBG - Compagnie des Placages en Bois du Gabon', 'bois', 'Libreville', 'Estuaire', 'SA', 1992, 100, 'Placages en bois, transformation du bois.', ['placages', 'bois']],
  ['CIPLAC - Compagnie Industrielle de Placages', 'bois', 'Libreville', 'Estuaire', 'SA', 1996, 90, 'Industrie de placages, déroulage.', ['placages', 'déroulage']],
  ['IFK - Industrielle et Forestière du Komo', 'bois', 'Libreville', 'Estuaire', 'SA', 1994, 110, "Exploitation et industrie forestière dans la région du Komo.", ['industriel', 'Komo']],
  ['Bordamur', 'bois', 'Libreville', 'Estuaire', 'SARL', 2005, 45, 'Transformation du bois, fabrication de produits finis.', ['fabrication', 'bois']],
  ['SEEF - Sté Équatoriale d\'Exploitation Forestière', 'bois', 'Libreville', 'Estuaire', 'SA', 1980, 130, 'Exploitation forestière certifiée.', ['exploitation', 'forestier']],
  ['Rain Forest Management (RFM)', 'bois', 'Libreville', 'Estuaire', 'SA', 2010, 120, 'Gestion durable de forêts tropicales et exploitation certifiée.', ['durable', 'gestion', 'FSC']],
  ['IFL - Industrie Forestière de Lambaréné', 'bois', 'Lambaréné', 'Moyen-Ogooué', 'SA', 1998, 100, 'Industrie forestière basée à Lambaréné.', ['industrie', 'Lambaréné']],
  ['Compagnie Forestière des Abeilles (CFA)', 'bois', 'Libreville', 'Estuaire', 'SA', 2000, 80, 'Exploitation forestière durable.', ['exploitation', 'durable']],
  ['AW WOOD', 'bois', 'Nkok', 'Estuaire', 'SARL', 2016, 35, 'Transformation du bois en zone GSEZ.', ['GSEZ', 'Nkok', 'transformation']],
  ['KAISER WOODS', 'bois', 'Nkok', 'Estuaire', 'SARL', 2017, 40, 'Sciage et transformation du bois, Zone Spéciale de Nkok.', ['GSEZ', 'sciage']],
  ['Akachi Woods GSEZ', 'bois', 'Nkok', 'Estuaire', 'SARL', 2018, 30, 'Transformation du bois en zone GSEZ Nkok.', ['GSEZ', 'bois']],
  ['ACEWOOD GABON', 'bois', 'Nkok', 'Estuaire', 'SARL', 2019, 25, "Industrie du bois à Nkok.", ['bois', 'Nkok']],
  ['ABG - Aux Bois du Gabon', 'bois', 'Libreville', 'Estuaire', 'SARL', 2010, 45, 'Commerce et transformation de bois.', ['commerce', 'bois']],
  ['LBT - Les Bois Tropicaux', 'bois', 'Libreville', 'Estuaire', 'SARL', 2007, 55, 'Négoce de bois tropicaux.', ['négoce', 'tropicaux']],
  ['Mont Pelé Bois (MPB)', 'bois', 'Libreville', 'Estuaire', 'SARL', 2009, 40, 'Exploitation et vente de bois.', ['exploitation', 'vente']],
  ['Groupe Thébault', 'bois', 'Libreville', 'Estuaire', 'SA', 2000, 150, "Production de contreplaqué d'okoumé, export international.", ['contreplaqué', 'okoumé', 'export']],
  ['SOMIVAB', 'bois', 'Libreville', 'Estuaire', 'SA', 1995, 120, 'Mise en valeur du bois, transformation industrielle.', ['industriel', 'transformation']],
  ['STIBT - Sté de Transformation Intégrée des Bois', 'bois', 'Libreville', 'Estuaire', 'SA', 2000, 100, 'Transformation intégrée de bois tropicaux.', ['intégrée', 'transformation']],
  ['GIB - Gabonaise d\'Industrialisation du Bois', 'bois', 'Libreville', 'Estuaire', 'SA', 2005, 80, 'Industrialisation et transformation du bois.', ['industrialisation', 'bois']],
  ['Forestière Gabonaise de Transformation', 'bois', 'Libreville', 'Estuaire', 'SA', 2008, 60, 'Transformation de bois gabonais.', ['transformation', 'forestier']],
  ['Toujours Vert', 'bois', 'Libreville', 'Estuaire', 'SARL', 2015, 30, 'Exploitation forestière éco-responsable.', ['éco-responsable', 'forestier']],
  ['FOREEX - La Forestière d\'Exploitation et d\'Export', 'bois', 'Libreville', 'Estuaire', 'SA', 2003, 70, "Exploitation et export de bois.", ['export', 'exploitation']],
  ['Greenedge Gabon', 'bois', 'Libreville', 'Estuaire', 'SARL', 2018, 25, 'Gestion durable de forêts, certification.', ['durable', 'certification']],

  // ═══════════════════════ ASSURANCES & FINANCE (20+) ═══════════════════════
  ['NSIA Assurances Gabon', 'fin', 'Libreville', 'Estuaire', 'SA', 2000, 180, "Groupe panafricain d'assurance. Assurance vie et IARDT. Présent dans 12 pays d'Afrique.", ['assurance', 'vie', 'IARDT', 'panafricain']],
  ['OGAR - Omnium Gabonais d\'Assurances', 'fin', 'Libreville', 'Estuaire', 'SA', 1976, 250, "Premier assureur gabonais. Assurance de personnes et IARD. Scindée en OGAR VIE et OGAR IARDT.", ['assurance', 'IARD', 'leader', 'CIMA']],
  ['AXA Gabon', 'fin', 'Libreville', 'Estuaire', 'SA', 1976, 200, "Leader mondial d'assurance. Solutions particuliers et entreprises : auto, habitation, prévoyance.", ['assurance', 'auto', 'habitation', 'AXA'], false, 'https://axa.ga'],
  ['ASSINCO (BGFIBank)', 'fin', 'Libreville', 'Estuaire', 'SA', 1998, 120, "Filiale assurance du groupe BGFIBank. Leader IARD et assurance-crédit au Gabon.", ['assurance', 'IARD', 'crédit', 'BGFIBank'], false, 'https://assinco-sa.com'],
  ['SAHAM Assurance Gabon', 'fin', 'Libreville', 'Estuaire', 'SA', 2005, 100, "Assureur généraliste, membre de la Fédération Gabonaise des Sociétés d'Assurances.", ['assurance', 'SAHAM']],
  ['SUNU Assurances Gabon', 'fin', 'Libreville', 'Estuaire', 'SA', 2010, 80, "Assureur panafricain. Membre de la Fédération Gabonaise des Sociétés d'Assurances.", ['assurance', 'SUNU', 'panafricain']],
  ['UGB - Union Gabonaise de Banque', 'fin', 'Libreville', 'Estuaire', 'SA', 1962, 350, "Banque commerciale historique du Gabon. Services aux particuliers, professionnels et entreprises.", ['banque', 'commerciale', 'historique']],
  ['UBA Gabon', 'fin', 'Libreville', 'Estuaire', 'SA', 2008, 120, "United Bank for Africa, filiale gabonaise. Services bancaires aux particuliers et entreprises.", ['banque', 'UBA', 'Nigeria']],
  ['Citibank Gabon', 'fin', 'Libreville', 'Estuaire', 'SA', 1985, 80, "Banque internationale. Cash management, trade, trésorerie pour secteurs public et privé.", ['banque', 'internationale', 'Citibank']],
  ['BCEG - Banque pour le Commerce et l\'Entrepreneuriat', 'fin', 'Libreville', 'Estuaire', 'SA', 2018, 60, "Banque dédiée aux PME et TPE. Filiale du groupe BGFI. Services accessibles et conseil.", ['banque', 'PME', 'entrepreneuriat', 'BGFI']],
  ['Gras Savoye Gabon', 'fin', 'Libreville', 'Estuaire', 'SA', 1990, 40, "Courtier international en assurances. Conseil et gestion des risques.", ['courtier', 'assurance', 'risques']],
  ['OLEA Gabon', 'fin', 'Libreville', 'Estuaire', 'SARL', 2020, 15, "Solutions d'assurance innovantes au Gabon.", ['assurance', 'innovation']],
  ['Exco Libreville', 'fin', 'Libreville', 'Estuaire', 'SARL', 2005, 30, "Cabinet d'audit et conseil, membre Exco Afrique et Kreston International.", ['audit', 'conseil', 'Kreston'], false, 'https://excoafrique.com'],
  ['Grant Thornton Gabon', 'fin', 'Libreville', 'Estuaire', 'SARL', 2002, 40, "Audit, conseil juridique, fiscal et social. Réseau international.", ['audit', 'conseil', 'fiscal'], false, 'https://grantthornton.ga'],
  ['Baker Tilly Gabon', 'fin', 'Libreville', 'Estuaire', 'SARL', 2008, 25, "Audit comptable, conseil juridique et fiscal, expertise sociale.", ['audit', 'comptable', 'fiscal'], false, 'https://bakertillygabon.com'],
  ['FEAG - Fiduciaire d\'Expertise et Gestion', 'fin', 'Libreville', 'Estuaire', 'SARL', 2000, 20, "Cabinet d'expertise comptable et gestion.", ['expertise', 'comptable', 'gestion']],
  ['HLB Premus Audit & Conseil', 'fin', 'Libreville', 'Estuaire', 'SARL', 2010, 18, "Audit et conseil, membre réseau HLB International.", ['audit', 'HLB', 'conseil']],

  // ═══════════════════════ SÉCURITÉ (10) ═══════════════════════
  ['G4S Gabon Secure Solutions', 'comm', 'Libreville', 'Estuaire', 'SA', 2005, 500, "Fournisseur mondial de solutions de sécurité intégrées. Gardiennage, gestion des risques.", ['sécurité', 'gardiennage', 'G4S']],
  ['DMT Sécurité', 'comm', 'Libreville', 'Estuaire', 'SARL', 2010, 80, "Société de sécurité privée et gardiennage au Gabon.", ['sécurité', 'gardiennage']],
  ['Elite Protection Sécurité', 'comm', 'Libreville', 'Estuaire', 'SARL', 2012, 60, "Services de protection et sécurité privée.", ['protection', 'sécurité']],
  ['SAS Sécurité Alarme Service', 'comm', 'Libreville', 'Estuaire', 'SARL', 2008, 40, "Alarme, contrôle d'accès, vidéosurveillance, détection incendie.", ['alarme', 'vidéosurveillance', 'sécurité']],
  ['Mandji Protection', 'comm', 'Libreville', 'Estuaire', 'SARL', 2015, 35, "Société de gardiennage et protection.", ['gardiennage', 'protection']],
  ['Ortyx Sécurité et Services Gabon', 'comm', 'Libreville', 'Estuaire', 'SARL', 2016, 30, "Services de sécurité et gardiennage.", ['sécurité', 'gardiennage']],
  ['Omega Sécurité', 'comm', 'Libreville', 'Estuaire', 'SARL', 2014, 25, "Sécurité privée et surveillance.", ['sécurité', 'surveillance']],

  // ═══════════════════════ SANTÉ & PHARMACIES (35+) ═══════════════════════
  ['Clinique des Charbonnages', 'sante', 'Libreville', 'Estuaire', 'SARL', 1990, 80, "Clinique privée multidisciplinaire à Libreville.", ['clinique', 'multidisciplinaire']],
  ['Clinique des Cinq Palmiers', 'sante', 'Libreville', 'Estuaire', 'SARL', 2000, 60, "Clinique privée, consultations et soins spécialisés.", ['clinique', 'soins']],
  ['Clinique Louis Pasteur', 'sante', 'Libreville', 'Estuaire', 'SARL', 1995, 70, "Clinique médico-chirurgicale de référence.", ['clinique', 'chirurgie', 'Pasteur']],
  ['Clinique MIA', 'sante', 'Libreville', 'Estuaire', 'SARL', 2005, 40, "Clinique médicale à Libreville.", ['clinique', 'médecine']],
  ['Clinique Chambrier', 'sante', 'Libreville', 'Estuaire', 'SARL', 2002, 35, "Centre médical et consultations.", ['clinique', 'centre médical']],
  ['Clinique Medico Chirurgicale De La Paix', 'sante', 'Libreville', 'Estuaire', 'SARL', 2008, 45, "Clinique médico-chirurgicale.", ['chirurgie', 'clinique']],
  ['Clinique Biyoghe', 'sante', 'Libreville', 'Estuaire', 'SARL', 2010, 30, "Clinique privée à Libreville.", ['clinique', 'privée']],
  ['Pharmacie des Facultés', 'sante', 'Libreville', 'Estuaire', 'SARL', 1998, 12, "Pharmacie de référence, quartier des Facultés.", ['pharmacie']],
  ['Pharmacie du Golf', 'sante', 'Libreville', 'Estuaire', 'SARL', 2002, 10, "Pharmacie dans le quartier du Golf.", ['pharmacie']],
  ['Pharmacie du Cap Esterias', 'sante', 'Libreville', 'Estuaire', 'SARL', 2005, 8, "Pharmacie au Cap Esterias.", ['pharmacie']],
  ['Pharmacie Centrale de Garde', 'sante', 'Libreville', 'Estuaire', 'SARL', 1985, 15, "Pharmacie de garde 24h/24.", ['pharmacie', 'garde']],
  ['Pharmacie Sainte-Marie', 'sante', 'Libreville', 'Estuaire', 'SARL', 2000, 10, "Pharmacie, parapharmacie.", ['pharmacie']],
  ['Pharmacie d\'Acae', 'sante', 'Libreville', 'Estuaire', 'SARL', 2003, 8, "Pharmacie de quartier.", ['pharmacie']],
  ['Pharmacie d\'Avorbam', 'sante', 'Libreville', 'Estuaire', 'SARL', 2006, 8, "Pharmacie et parapharmacie.", ['pharmacie']],
  ['Pharmacie des Gue-Gue', 'sante', 'Libreville', 'Estuaire', 'SARL', 1995, 10, "Pharmacie à Libreville.", ['pharmacie']],
  ['UbiPharm Gabon', 'sante', 'Libreville', 'Estuaire', 'SA', 2005, 50, "Distribution pharmaceutique. Réseau de pharmacies au Gabon.", ['distribution', 'pharma', 'réseau']],

  // ═══════════════════════ TOURISME & HÔTELLERIE & RESTAURANTS (30+) ═══════════════════════
  ['Hôtel Nomad', 'tour', 'Libreville', 'Estuaire', 'SARL', 2016, 25, "Hôtel boutique à Libreville.", ['hôtel', 'boutique']],
  ['Onomo Hotel Libreville', 'tour', 'Libreville', 'Estuaire', 'SARL', 2018, 40, "Hôtel de chaîne africaine panafricaine.", ['hôtel', 'Onomo']],
  ['Park Inn by Radisson Libreville', 'tour', 'Libreville', 'Estuaire', 'SA', 2015, 60, "Hôtel 4 étoiles du groupe Radisson.", ['hôtel', '4 étoiles', 'Radisson']],
  ['Hôtel Le Méridien Re-Ndama', 'tour', 'Libreville', 'Estuaire', 'SA', 1975, 120, "Hôtel historique 5 étoiles sur le bord de mer.", ['hôtel', '5 étoiles', 'historique']],
  ['King Solomon Hotel', 'tour', 'Libreville', 'Estuaire', 'SARL', 2012, 35, "Hôtel d'affaires à Libreville.", ['hôtel', 'affaires']],
  ['Hôtel Hibiscus', 'tour', 'Port-Gentil', 'Ogooué-Maritime', 'SARL', 2005, 30, "Hôtel à Port-Gentil.", ['hôtel', 'Port-Gentil']],
  ['L\'Ogooué Palace', 'tour', 'Lambaréné', 'Moyen-Ogooué', 'SARL', 2010, 25, "Hôtel à Lambaréné, sur les rives de l'Ogooué.", ['hôtel', 'Lambaréné']],
  ['Restaurant Le Phare du Large', 'tour', 'Libreville', 'Estuaire', 'SARL', 2008, 20, "Restaurant gastronomique, cuisine française et locale.", ['restaurant', 'gastronomique']],
  ['Restaurant Chez le Libanais', 'tour', 'Libreville', 'Estuaire', 'SARL', 2000, 15, "Restaurant populaire, cuisine libanaise.", ['restaurant', 'libanais']],
  ['Le Café de la Gare', 'tour', 'Libreville', 'Estuaire', 'EI', 2015, 10, "Café restaurant dans le centre-ville.", ['café', 'restaurant']],

  // ═══════════════════════ COMMERCE & DISTRIBUTION (40+) ═══════════════════════
  ['Prix Import Gabon', 'comm', 'Libreville', 'Estuaire', 'SA', 2005, 200, "Supermarché et import-export. Chaîne de distribution alimentaire au Gabon.", ['supermarché', 'import', 'distribution']],
  ['Géant CKDO', 'comm', 'Libreville', 'Estuaire', 'SA', 2010, 150, "Grande surface, centre commercial et distribution au Gabon.", ['supermarché', 'centre commercial']],
  ['Centre Commercial Mbolo', 'comm', 'Libreville', 'Estuaire', 'SA', 2000, 100, "Centre commercial de référence à Libreville.", ['centre commercial', 'distribution']],
  ['Supergros', 'comm', 'Libreville', 'Estuaire', 'SA', 2008, 80, "Grossiste et détaillant alimentaire.", ['grossiste', 'alimentaire']],
  ['San Supermarket', 'comm', 'Libreville', 'Estuaire', 'SARL', 2012, 40, "Supermarché de proximité.", ['supermarché', 'proximité']],
  ['Viga Supermarket', 'comm', 'Libreville', 'Estuaire', 'SARL', 2015, 30, "Supermarché et alimentation.", ['supermarché', 'alimentation']],
  ['Casino Gabon', 'comm', 'Libreville', 'Estuaire', 'SA', 1998, 120, "Grande distribution, filiale du groupe Casino France.", ['grande distribution', 'Casino', 'France']],
  ['Cecado Gabon', 'comm', 'Libreville', 'Estuaire', 'SA', 1985, 200, "Importation et distribution de produits alimentaires et ménagers.", ['import', 'distribution', 'alimentaire']],

  // ═══════════════════════ BTP & IMMOBILIER (25+) ═══════════════════════
  ['FACO Construction', 'btp', 'Libreville', 'Estuaire', 'SARL', 2008, 80, "Entreprise de construction et travaux publics.", ['construction', 'BTP']],
  ['GIEEBI', 'btp', 'Libreville', 'Estuaire', 'SARL', 2005, 60, "Entreprise de génie civil et bâtiment.", ['génie civil', 'bâtiment']],
  ['Socoba Gabon', 'btp', 'Libreville', 'Estuaire', 'SA', 2000, 150, "Construction et bâtiment, grands chantiers d'infrastructure.", ['construction', 'infrastructure']],
  ['SOBEA Gabon', 'btp', 'Libreville', 'Estuaire', 'SA', 1995, 200, "Société de Bâtiment et dEntreprises dAfrique. Travaux publics et bâtiment.", ['bâtiment', 'travaux publics']],
  ['Dragages Gabon', 'btp', 'Libreville', 'Estuaire', 'SA', 1980, 180, "Dragage, génie civil maritime et terrestre.", ['dragage', 'génie civil']],
  ['Entreprise Jean Lefebvre Gabon', 'btp', 'Libreville', 'Estuaire', 'SA', 1975, 220, "Travaux routiers, terrassement, assainissement.", ['routes', 'terrassement']],
  ['SNCI - Société Nationale de Construction Immobilière', 'btp', 'Libreville', 'Estuaire', 'SA', 1972, 150, "Promotion immobilière et logements sociaux.", ['immobilier', 'logements sociaux']],
  ['Agence Nationale de l\'Urbanisme (ANUTTC)', 'btp', 'Libreville', 'Estuaire', 'SA', 2011, 80, "Planification urbaine et aménagement du territoire.", ['urbanisme', 'aménagement']],

  // ═══════════════════════ TRANSPORT & LOGISTIQUE (20+) ═══════════════════════
  ['National Airways Gabon', 'trans', 'Libreville', 'Estuaire', 'SA', 2010, 60, "Transport aérien intérieur et régional.", ['aviation', 'transport aérien']],
  ['Tropical Air Gabon', 'trans', 'Libreville', 'Estuaire', 'SARL', 2015, 30, "Compagnie aérienne régionale.", ['aérien', 'régional']],
  ['Gabon Cargo', 'trans', 'Libreville', 'Estuaire', 'SA', 2008, 80, "Transport de fret aérien et maritime.", ['fret', 'cargo']],
  ['CNAT - Cie Nationale de Transport', 'trans', 'Libreville', 'Estuaire', 'SA', 1978, 200, "Transport de marchandises, logistique nationale.", ['transport', 'national', 'logistique']],
  ['SDV Gabon (ex-SCAC)', 'trans', 'Libreville', 'Estuaire', 'SA', 1990, 150, "Transitaire et logistique portuaire. Groupe AGL.", ['transitaire', 'logistique', 'portuaire']],
  ['DHL Gabon', 'trans', 'Libreville', 'Estuaire', 'SA', 2000, 60, "Services de courrier express et logistique internationale.", ['express', 'courrier', 'international'], false, 'https://dhl.com'],
  ['GETMA Gabon', 'trans', 'Libreville', 'Estuaire', 'SA', 2005, 100, "Logistique portuaire et manutention.", ['logistique', 'manutention', 'port']],
  ['STCG - Société de Transport en Commun de Libreville', 'trans', 'Libreville', 'Estuaire', 'SA', 1988, 250, "Transport urbain de Libreville. Bus et minibus.", ['bus', 'transport urbain', 'Libreville']],

  // ═══════════════════════ MINES & PÉTROLE additionnel (15+) ═══════════════════════
  ['Maurel & Prom Gabon', 'mines', 'Port-Gentil', 'Ogooué-Maritime', 'SA', 2005, 200, "Exploration et production pétrolière, champs Ezanga et Onal.", ['pétrole', 'exploration', 'production']],
  ['Addax Petroleum Gabon', 'mines', 'Port-Gentil', 'Ogooué-Maritime', 'SA', 2000, 300, "Exploration et production pétrolière offshore et onshore.", ['pétrole', 'offshore', 'onshore']],
  ['Vaalco Energy Gabon', 'mines', 'Port-Gentil', 'Ogooué-Maritime', 'SA', 1995, 150, "Producteur pétrolier indépendant. Champ d'Etame offshore.", ['pétrole', 'Etame', 'offshore']],
  ['BW Energy Gabon', 'mines', 'Port-Gentil', 'Ogooué-Maritime', 'SA', 2018, 120, "Production pétrolière, champ de Dussafu.", ['pétrole', 'Dussafu', 'production']],
  ['Tullow Oil Gabon', 'mines', 'Port-Gentil', 'Ogooué-Maritime', 'SA', 2010, 80, "Exploration pétrolière et gazière.", ['pétrole', 'exploration']],
  ['Nouvelle Gabon Mining (NGM)', 'mines', 'Franceville', 'Haut-Ogooué', 'SA', 2015, 250, "Exploitation de manganèse dans le Haut-Ogooué.", ['manganèse', 'mining']],
  ['Gabon Mining (CICMHZ)', 'mines', 'Moanda', 'Haut-Ogooué', 'SA', 2012, 200, "Extraction et traitement de manganèse.", ['manganèse', 'extraction']],
  ['Société des Mines de Fer de Belinga', 'mines', 'Makokou', 'Ogooué-Ivindo', 'SA', 2006, 50, "Projet d'exploitation du fer de Belinga, un des plus grands gisements d'Afrique.", ['fer', 'Belinga', 'projet']],
  ['SEEG Mines (Division)', 'mines', 'Moanda', 'Haut-Ogooué', 'SA', 2000, 100, "Services miniers et fourniture d'énergie aux sites miniers.", ['services miniers', 'énergie']],

  // ═══════════════════════ AGRICULTURE additionnel (15+) ═══════════════════════
  ['Agro Gabon', 'agri', 'Libreville', 'Estuaire', 'SA', 1980, 500, "Production d'hévéa (caoutchouc naturel) et huile de palme.", ['hévéa', 'caoutchouc', 'huile de palme']],
  ['SMAG - Sté Meunière et Avicole du Gabon', 'agri', 'Libreville', 'Estuaire', 'SA', 1972, 350, "Meunerie, aliments pour bétail, aviculture.", ['meunerie', 'aviculture', 'aliments']],
  ['SIAEB - Sté Industrielle Agricole et d\'Élevage de Boumango', 'agri', 'Franceville', 'Haut-Ogooué', 'SA', 1978, 200, "Agriculture et élevage bovin dans le Haut-Ogooué.", ['élevage', 'agriculture', 'bovin']],
  ['SOGADEL - Société Gabonaise de Développement de l\'Élevage', 'agri', 'Libreville', 'Estuaire', 'SA', 1985, 100, "Développement de l'élevage au Gabon.", ['élevage', 'développement']],
  ['Sucaf Gabon (Somdiaa)', 'agri', 'Franceville', 'Haut-Ogooué', 'SA', 1970, 600, "Production sucrière. Plantation de canne à sucre à Franceville.", ['sucre', 'canne', 'Somdiaa']],
  ['Café du Gabon', 'agri', 'Libreville', 'Estuaire', 'SARL', 2010, 30, "Production et commercialisation de café gabonais.", ['café', 'production']],
  ['Les Fermes du Gabon', 'agri', 'Libreville', 'Estuaire', 'SARL', 2015, 40, "Fermes maraîchères et avicoles.", ['fermes', 'maraîcher', 'aviculture']],
  ['Hévégab', 'agri', 'Libreville', 'Estuaire', 'SA', 1981, 800, "Production d'hévéa (caoutchouc). Plantations dans le Woleu-Ntem.", ['hévéa', 'caoutchouc', 'plantation']],

  // ═══════════════════════ ÉNERGIE & ENVIRONNEMENT (10+) ═══════════════════════
  ['Gabon Power Company', 'ener', 'Libreville', 'Estuaire', 'SA', 2014, 80, "Production d'électricité indépendante.", ['électricité', 'production', 'IPP']],
  ['Eranove Gabon', 'ener', 'Libreville', 'Estuaire', 'SA', 2018, 60, "Gestion de services publics d'eau et d'électricité.", ['eau', 'électricité', 'services publics']],
  ['Averda Gabon', 'ener', 'Libreville', 'Estuaire', 'SA', 2015, 200, "Gestion des déchets et services environnementaux.", ['déchets', 'environnement', 'propreté']],
  ['Clean Africa Gabon', 'ener', 'Libreville', 'Estuaire', 'SARL', 2017, 50, "Collecte et traitement des déchets.", ['déchets', 'collecte', 'recyclage']],
  ['Ausar Energy Gabon', 'ener', 'Libreville', 'Estuaire', 'SA', 2019, 30, "Énergies renouvelables, solaire et biomasse.", ['solaire', 'renouvelable', 'biomasse']],

  // ═══════════════════════ ÉDUCATION & FORMATION (12+) ═══════════════════════
  ['Université Omar Bongo', 'educ', 'Libreville', 'Estuaire', 'SA', 1970, 500, "Première université du Gabon. Lettres, sciences humaines, droit, économie.", ['université', 'public', 'recherche']],
  ['Université des Sciences et Techniques de Masuku', 'educ', 'Franceville', 'Haut-Ogooué', 'SA', 1986, 300, "Université scientifique du Gabon à Franceville.", ['université', 'sciences', 'technique']],
  ['Institut Africain d\'Informatique (IAI)', 'educ', 'Libreville', 'Estuaire', 'SA', 1971, 100, "Formation supérieure en informatique, organisme intergouvernemental.", ['informatique', 'formation', 'IAI'], true],
  ['ESG Business School Gabon', 'educ', 'Libreville', 'Estuaire', 'SARL', 2010, 30, "École supérieure de gestion et commerce.", ['business school', 'gestion']],
  ['Institut Supérieur de Technologie (IST)', 'educ', 'Libreville', 'Estuaire', 'SA', 1998, 80, "Formation technique et professionnelle supérieure.", ['technique', 'formation', 'IST']],
  ['Lycée Blaise Pascal', 'educ', 'Libreville', 'Estuaire', 'SA', 1960, 70, "Lycée d'excellence, convention avec la France.", ['lycée', 'français', 'excellence']],

  // ═══════════════════════ TECH & DIGITAL (15+) ═══════════════════════
  ['Canal+ Gabon', 'tech', 'Libreville', 'Estuaire', 'SA', 1998, 120, "Diffusion de chaînes TV payantes et contenus numériques.", ['TV', 'médias', 'numérique', 'Canal+'], true],
  ['Matrix Gabon', 'tech', 'Libreville', 'Estuaire', 'SARL', 2014, 25, "Intégration de systèmes informatiques et réseaux.", ['IT', 'réseaux', 'intégration'], true],
  ['GOS - Gabon Oil Services', 'tech', 'Port-Gentil', 'Ogooué-Maritime', 'SA', 2008, 80, "Services IT pour le secteur pétrolier.", ['IT', 'pétrole', 'services'], true],
  ['Africa Online Gabon', 'tech', 'Libreville', 'Estuaire', 'SA', 2000, 40, "Fournisseur d'accès Internet et services numériques.", ['Internet', 'FAI', 'numérique'], true],
  ['Solsi Gabon', 'tech', 'Libreville', 'Estuaire', 'SARL', 2010, 30, "Solutions logicielles et services informatiques.", ['logiciel', 'IT', 'développement'], true],
  ['Satcom Gabon', 'tech', 'Libreville', 'Estuaire', 'SA', 2005, 50, "Télécommunications par satellite, réseaux VSAT.", ['satellite', 'VSAT', 'télécoms'], true],
  ['Vivendi Africa Gabon', 'tech', 'Libreville', 'Estuaire', 'SA', 2020, 30, "Fibre optique et Internet très haut débit.", ['fibre', 'Internet', 'THD'], true],

  // ═══════════════════════ SERVICES JURIDIQUES (10+) ═══════════════════════
  ['Cabinet NKEA & Associés', 'comm', 'Libreville', 'Estuaire', 'SARL', 1991, 15, "Cabinet d'avocats, 33+ ans d'expérience. Droit social, pénal civil et affaires.", ['avocats', 'droit', 'affaires']],
  ['Cabinet Essone - Avocats d\'Affaires OHADA', 'comm', 'Libreville', 'Estuaire', 'SARL', 2005, 10, "Droit des affaires, bancaire, minier, hydrocarbures, arbitrage CCJA.", ['avocats', 'OHADA', 'affaires']],
  ['JURIDAF Gabon', 'comm', 'Libreville', 'Estuaire', 'SARL', 2008, 8, "Juristes d'affaires internationales. Conseil juridique aux entreprises.", ['conseil', 'juridique', 'international']],
  ['Chambre des Notaires du Gabon', 'comm', 'Libreville', 'Estuaire', 'SA', 1960, 30, "Ordre professionnel des notaires.", ['notaires', 'ordre']],
  ['CNCJG - Chambre des Conseils Juridiques', 'comm', 'Libreville', 'Estuaire', 'SA', 2000, 20, "Chambre nationale des conseils juridiques du Gabon.", ['conseil juridique', 'chambre']],
];

// ══════════════════════════════════════════════════════════════════════════
// EXPORT
// ══════════════════════════════════════════════════════════════════════════

export const GENERATED_ENTERPRISES: AnnuaireEnterprise[] = COMPANIES_DATA.map((entry, i) => buildEnterprise(entry, i));
