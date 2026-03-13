import type { IAstedTool } from '@/types/iasted';

// ─── Gemini Function Calling Tool Definitions ────────────────────

export const IASTED_TOOLS: IAstedTool[] = [
  {
    name: 'navigate_to',
    description: "Naviguer vers une page de GABON BIZ",
    parameters: {
      type: 'object',
      properties: {
        path: { type: 'string', description: "Route de la page (ex: /services/investir, /dashboard, /annuaire)" },
        section: { type: 'string', description: "Ancre optionnelle dans la page (ex: #fintech)" },
      },
      required: ['path'],
    },
  },
  {
    name: 'search_ecosystem',
    description: "Rechercher dans l'annuaire de l'écosystème GABON BIZ (entreprises, startups, investisseurs)",
    parameters: {
      type: 'object',
      properties: {
        query: { type: 'string', description: 'Terme de recherche' },
        category: { type: 'string', description: 'Catégorie', enum: ['startup', 'entreprise', 'investisseur', 'incubateur', 'mentor', 'institution'] },
        sector: { type: 'string', description: "Secteur d'activité (FinTech, AgriTech, EdTech, etc.)" },
        location: { type: 'string', description: 'Localisation (Libreville, Port-Gentil, Franceville, etc.)' },
      },
      required: ['query'],
    },
  },
  {
    name: 'search_marches_publics',
    description: "Rechercher des appels d'offres et marchés publics",
    parameters: {
      type: 'object',
      properties: {
        sector: { type: 'string', description: 'Secteur (IT, BTP, santé, etc.)' },
        status: { type: 'string', description: 'Statut', enum: ['open', 'closed', 'upcoming'] },
        budget_min: { type: 'string', description: 'Budget minimum en XAF' },
        budget_max: { type: 'string', description: 'Budget maximum en XAF' },
        region: { type: 'string', description: 'Région' },
      },
    },
  },
  {
    name: 'start_business_creation',
    description: "Démarrer le processus de création d'entreprise en ligne",
    parameters: {
      type: 'object',
      properties: {
        business_type: { type: 'string', description: 'Forme juridique', enum: ['SARL', 'SA', 'SAS', 'EI', 'GIE', 'SCI'] },
        business_name: { type: 'string', description: "Nom de l'entreprise" },
        sector: { type: 'string', description: "Secteur d'activité" },
      },
      required: ['business_type'],
    },
  },
  {
    name: 'get_sing_programs',
    description: "Obtenir les informations sur les programmes d'incubation SING SA",
    parameters: {
      type: 'object',
      properties: {
        program_type: { type: 'string', description: "Type de programme (Innovation 4.0, VISA Startup, WELP, etc.)" },
        cohort_status: { type: 'string', description: 'Statut', enum: ['active', 'upcoming', 'completed'] },
      },
    },
  },
  {
    name: 'search_solutions_kimba',
    description: 'Rechercher des solutions numériques dans le hub KIMBA 2.0',
    parameters: {
      type: 'object',
      properties: {
        query: { type: 'string', description: 'Recherche' },
        sector: { type: 'string', description: 'Secteur' },
        maturity: { type: 'string', description: 'Maturité', enum: ['concept', 'mvp', 'scaling', 'mature'] },
      },
      required: ['query'],
    },
  },
  {
    name: 'simulate_roi',
    description: "Lancer le simulateur ROI Express pour une verticale d'investissement",
    parameters: {
      type: 'object',
      properties: {
        vertical: { type: 'string', description: 'Verticale', enum: ['fintech', 'e-sante', 'edtech', 'agritech', 'e-commerce', 'govtech'] },
        investment_amount: { type: 'string', description: 'Montant en FCFA' },
        time_horizon: { type: 'string', description: 'Horizon en mois' },
      },
      required: ['vertical'],
    },
  },
  {
    name: 'get_indicators',
    description: "Obtenir les indicateurs de l'Observatoire de l'Économie Numérique",
    parameters: {
      type: 'object',
      properties: {
        indicator_type: { type: 'string', description: 'Type', enum: ['ides', 'egdi', 'mobile_penetration', 'internet', 'transactions', 'startups', 'employment'] },
        compare_with: { type: 'string', description: 'Pays de comparaison (CEMAC, Cameroun, Congo, etc.)' },
      },
    },
  },
  {
    name: 'control_ui',
    description: "Contrôler l'interface utilisateur de GABON BIZ",
    parameters: {
      type: 'object',
      properties: {
        action: { type: 'string', description: 'Action UI', enum: ['set_theme_dark', 'set_theme_light', 'toggle_theme', 'set_locale', 'close_chat', 'clear_chat'] },
        value: { type: 'string', description: 'Valeur optionnelle (code langue pour set_locale: fr, en, es, ar, zh, ru, ja)' },
      },
      required: ['action'],
    },
  },
  {
    name: 'stop_conversation',
    description: 'Terminer la conversation vocale et revenir au mode texte',
    parameters: {
      type: 'object',
      properties: {},
    },
  },
];

/**
 * Convert IASTED_TOOLS to Gemini API format for function calling.
 */
export function getGeminiToolsConfig() {
  return [{
    function_declarations: IASTED_TOOLS.map(tool => ({
      name: tool.name,
      description: tool.description,
      parameters: tool.parameters,
    })),
  }];
}
