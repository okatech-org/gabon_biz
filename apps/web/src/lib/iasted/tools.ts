import type { IAstedTool } from '@/types/iasted';

// ─── OpenAI Function Calling Tool Definitions ────────────────────

export const IASTED_TOOLS: IAstedTool[] = [
  {
    name: 'navigate_to',
    description: 'Naviguer vers une page de GABON BIZ',
    parameters: {
      type: 'object',
      properties: {
        path: {
          type: 'string',
          description: 'Route de la page (ex: /services/investir, /dashboard, /annuaire)',
        },
        section: { type: 'string', description: 'Ancre optionnelle dans la page (ex: #fintech)' },
      },
      required: ['path'],
    },
  },
  {
    name: 'search_ecosystem',
    description:
      "Rechercher dans l'annuaire de l'écosystème GABON BIZ (entreprises, startups, investisseurs)",
    parameters: {
      type: 'object',
      properties: {
        query: { type: 'string', description: 'Terme de recherche' },
        category: {
          type: 'string',
          description: 'Catégorie',
          enum: ['startup', 'entreprise', 'investisseur', 'incubateur', 'mentor', 'institution'],
        },
        sector: {
          type: 'string',
          description: "Secteur d'activité (FinTech, AgriTech, EdTech, etc.)",
        },
        location: {
          type: 'string',
          description: 'Localisation (Libreville, Port-Gentil, Franceville, etc.)',
        },
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
        business_type: {
          type: 'string',
          description: 'Forme juridique',
          enum: ['SARL', 'SA', 'SAS', 'EI', 'GIE', 'SCI'],
        },
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
        program_type: {
          type: 'string',
          description: 'Type de programme (Innovation 4.0, VISA Startup, WELP, etc.)',
        },
        cohort_status: {
          type: 'string',
          description: 'Statut',
          enum: ['active', 'upcoming', 'completed'],
        },
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
        maturity: {
          type: 'string',
          description: 'Maturité',
          enum: ['concept', 'mvp', 'scaling', 'mature'],
        },
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
        vertical: {
          type: 'string',
          description: 'Verticale',
          enum: ['fintech', 'e-sante', 'edtech', 'agritech', 'e-commerce', 'govtech'],
        },
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
        indicator_type: {
          type: 'string',
          description: 'Type',
          enum: [
            'ides',
            'egdi',
            'mobile_penetration',
            'internet',
            'transactions',
            'startups',
            'employment',
          ],
        },
        compare_with: {
          type: 'string',
          description: 'Pays de comparaison (CEMAC, Cameroun, Congo, etc.)',
        },
      },
    },
  },
  {
    name: 'control_ui',
    description: "Contrôler l'interface utilisateur de GABON BIZ",
    parameters: {
      type: 'object',
      properties: {
        action: {
          type: 'string',
          description: 'Action UI',
          enum: [
            'set_theme_dark',
            'set_theme_light',
            'toggle_theme',
            'set_locale',
            'close_chat',
            'clear_chat',
          ],
        },
        value: {
          type: 'string',
          description:
            'Valeur optionnelle (code langue pour set_locale: fr, en, es, ar, zh, ru, ja)',
        },
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
  // ═══ New Agent Tools (Data Retrieval + Actions) ═══════════════
  {
    name: 'verify_enterprise',
    description:
      "Vérifier l'existence d'une entreprise au Gabon par son RCCM, NIF ou nom, et retourner ses informations",
    parameters: {
      type: 'object',
      properties: {
        query: { type: 'string', description: "Nom, RCCM ou NIF de l'entreprise à vérifier" },
      },
      required: ['query'],
    },
  },
  {
    name: 'compare_business_types',
    description:
      "Comparer les différentes formes juridiques d'entreprise au Gabon (EI, SARL, SAS, SA) : coûts, capital, avantages, inconvénients",
    parameters: {
      type: 'object',
      properties: {
        types: {
          type: 'string',
          description: 'Formes à comparer, séparées par des virgules (ex: SARL,SAS,EI)',
        },
      },
    },
  },
  {
    name: 'get_marche_details',
    description:
      "Obtenir les détails d'un marché public spécifique (budget, deadline, critères, autorité contractante)",
    parameters: {
      type: 'object',
      properties: {
        marche_id: { type: 'string', description: 'Identifiant ou mot-clé du marché' },
        sector: { type: 'string', description: 'Secteur pour filtrer' },
      },
    },
  },
  {
    name: 'check_eligibility',
    description:
      "Vérifier si l'utilisateur est éligible à un programme SING en fonction de critères (stade, secteur, ancienneté)",
    parameters: {
      type: 'object',
      properties: {
        program: {
          type: 'string',
          description: 'Programme visé',
          enum: [
            'innovation_4_0',
            'visa_startup',
            'techclinic',
            'welp',
            'smartgov',
            'hackathon',
            'sing_capital',
          ],
        },
        stage: {
          type: 'string',
          description: 'Stade de la startup',
          enum: ['idee', 'prototype', 'mvp', 'traction', 'scaling'],
        },
        sector: { type: 'string', description: "Secteur d'activité" },
        team_size: { type: 'string', description: "Taille de l'équipe" },
      },
    },
  },
  {
    name: 'calculate_creation_cost',
    description:
      "Calculer le coût total estimé pour la création d'une entreprise au Gabon (frais de dossier, notaire, capital, timbres)",
    parameters: {
      type: 'object',
      properties: {
        business_type: {
          type: 'string',
          description: 'Forme juridique',
          enum: ['SARL', 'SA', 'SAS', 'EI', 'GIE', 'SCI'],
        },
        capital: { type: 'string', description: 'Capital social prévu en FCFA' },
        include_notary: {
          type: 'string',
          description: 'Inclure les frais de notaire (oui/non)',
          enum: ['oui', 'non'],
        },
      },
      required: ['business_type'],
    },
  },
  {
    name: 'get_deadline_alerts',
    description:
      'Obtenir les prochaines deadlines importantes (marchés publics, programmes SING, formations CGI)',
    parameters: {
      type: 'object',
      properties: {
        category: {
          type: 'string',
          description: 'Catégorie',
          enum: ['marches', 'sing', 'cgi', 'all'],
        },
        days_ahead: { type: 'string', description: "Nombre de jours à l'avance (défaut: 30)" },
      },
    },
  },
  {
    name: 'summarize_page',
    description:
      "Résumer le contenu de la page actuelle pour l'utilisateur et expliquer les actions disponibles",
    parameters: {
      type: 'object',
      properties: {
        detail_level: {
          type: 'string',
          description: 'Niveau de détail',
          enum: ['bref', 'detaille'],
        },
      },
    },
  },
  {
    name: 'convert_currency',
    description:
      'Convertir un montant entre devises (XAF, EUR, USD, GBP, AED, CNY, RUB, JPY). Utile pour les investisseurs internationaux.',
    parameters: {
      type: 'object',
      properties: {
        amount: { type: 'string', description: 'Montant à convertir' },
        from: {
          type: 'string',
          description: 'Devise source',
          enum: ['XAF', 'EUR', 'USD', 'GBP', 'AED', 'CNY', 'RUB', 'JPY'],
        },
        to: {
          type: 'string',
          description: 'Devise cible',
          enum: ['XAF', 'EUR', 'USD', 'GBP', 'AED', 'CNY', 'RUB', 'JPY'],
        },
      },
      required: ['amount', 'from', 'to'],
    },
  },
  {
    name: 'open_chat',
    description: 'Ouvrir la fenêtre de chat iAsted',
    parameters: { type: 'object', properties: {} },
  },
  {
    name: 'close_chat',
    description: 'Fermer la fenêtre de chat iAsted',
    parameters: { type: 'object', properties: {} },
  },
  {
    name: 'clear_conversation',
    description: "Effacer l'historique de la conversation en cours",
    parameters: { type: 'object', properties: {} },
  },
];

/**
 * Convert IASTED_TOOLS to OpenAI API format for function calling.
 * OpenAI expects: { type: "function", function: { name, description, parameters } }
 */
export function getOpenAIToolsConfig() {
  return IASTED_TOOLS.map((tool) => ({
    type: 'function' as const,
    function: {
      name: tool.name,
      description: tool.description,
      parameters: tool.parameters,
    },
  }));
}
