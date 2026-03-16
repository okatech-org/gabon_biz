import { NextRequest, NextResponse } from 'next/server';
import { getIAstedPrompt } from '@/lib/iasted/system-prompt';

// Use the unified system prompt (single source of truth)
const SYSTEM_PROMPT = getIAstedPrompt('text');

export async function POST(request: NextRequest) {
  try {
    const { message, history } = await request.json();

    if (!message || typeof message !== 'string') {
      return NextResponse.json({ error: 'Message requis' }, { status: 400 });
    }

    const apiKey = process.env.OPENAI_API_KEY;

    if (!apiKey) {
      // Fallback mode without API key — provide a helpful response
      return NextResponse.json({
        response: getFallbackResponse(message),
      });
    }

    // Build the conversation for OpenAI
    const messages: Array<{ role: string; content: string }> = [
      { role: 'system', content: SYSTEM_PROMPT },
    ];

    // Add history if present
    if (history && Array.isArray(history)) {
      for (const msg of history) {
        messages.push({
          role: msg.role === 'model' ? 'assistant' : 'user',
          content: msg.content,
        });
      }
    }

    // Add user message
    messages.push({
      role: 'user',
      content: message,
    });

    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        model: 'gpt-4.1',
        messages,
        temperature: 0.7,
        top_p: 0.9,
        max_tokens: 2048,
      }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error('OpenAI API error:', errorText);
      return NextResponse.json({
        response:
          "Désolé, une erreur s'est produite avec le service IA. Veuillez réessayer dans quelques instants.",
      });
    }

    const data = await response.json();
    const text = data?.choices?.[0]?.message?.content;

    if (!text) {
      return NextResponse.json({
        response: "Désolé, je n'ai pas pu générer de réponse. Veuillez reformuler votre question.",
      });
    }

    return NextResponse.json({ response: text });
  } catch (error) {
    console.error('Chat API error:', error);
    return NextResponse.json({
      response: "Désolé, une erreur technique s'est produite. Veuillez réessayer.",
    });
  }
}

function getFallbackResponse(message: string): string {
  const q = message.toLowerCase();

  if (q.includes('créer') && (q.includes('entreprise') || q.includes('société'))) {
    return `## Créer une entreprise au Gabon 🏢

Avec le **Guichet Unique Entrepreneur** de GABON BIZ, vous pouvez créer votre entreprise **100% en ligne en 48h** :

- **EI** : à partir de 50 000 XAF
- **SARL** : à partir de 150 000 XAF
- **SA** : à partir de 300 000 XAF

**Documents requis** : CNIE, justificatif de domicile, statuts, PV d'AG, formulaire de déclaration d'activité.

👉 Rendez-vous sur le module **[Guichet Entrepreneur](/services/guichet-entrepreneur)** pour commencer.`;
  }

  if (
    q.includes('marché') ||
    (q.includes('appel') && q.includes('offre')) ||
    q.includes('soumission')
  ) {
    return `## Marchés Publics Numériques 📋

GABON BIZ centralise **500+ marchés publics** par an (45 Mds XAF) :

- 🔍 Recherche par mot-clé, secteur, budget, région
- 🔔 Alertes automatiques J-7 avant deadline
- ✍️ Soumission électronique avec signature GABON ID
- 📊 Traçabilité complète et scores communiqués

**Condition** : RCCM valide au Gabon.

👉 Accédez aux **[Marchés Publics](/services/marches-publics)** pour explorer les appels d'offres.`;
  }

  if (
    q.includes('incubateur') ||
    q.includes('sing') ||
    q.includes('startup') ||
    q.includes('candidat')
  ) {
    return `## Incubateur SING 2.0 🚀

La SING propose **7 programmes** d'incubation pour les startups tech :

- **Cohorte Innovation 4.0** : 3 mois gratuit (7 places restantes — Avril 2026)
- **VISA Startup** : Label officiel MENUDI
- **TechClinic BOOST & WIN** : 6 semaines avec Digital Africa
- **WELP** : Programme dédié aux femmes entrepreneures
- **SmartGov** : Startups d'État
- **Hackathons** : 48-72h, prix de 1M FCFA+
- **SING Capital** : Financement 500K à 15M FCFA

**280+ startups** incubées, **76% taux de survie**.

👉 **[Candidatez maintenant](/services/incubateur)** !`;
  }

  if (q.includes('investir') || q.includes('investissement')) {
    return `## Investir au Gabon 💰

Le Gabon offre un **océan bleu numérique** :

- 📱 135% pénétration mobile, 94% couverture 4G
- 💵 PIB/hab PPA $16 470 (5ème Afrique)
- 🏦 FCFA arrimé à l'Euro (zéro risque de change)
- 🎯 6 verticales : FinTech, e-Commerce, HealthTech, AgriTech, EdTech, GovTech

**Avantages** : 3 ans exonération IS, ZIS de Nkok, FONAP.

👉 Explorez le module **[Investir au Gabon](/services/investir)**.`;
  }

  if (q.includes('cgi') || q.includes('formation') || q.includes('sada') || q.includes('fablab')) {
    return `## Centre Gabonais de l'Innovation (CGI) 🎓

Le CGI est le pivot de l'écosystème numérique gabonais :

- **3 420+** personnes formées
- **1 247** certifiés internationaux (UIT/SADA)
- **64** projets FabLab
- **480** jeunes formés à l'IA (INITIA)

**4 pôles** : Acculturation, Certification, FabLab, MediaLab.

👉 Découvrez le **[CGI](/services/cgi)**.`;
  }

  return `Bonjour ! Je suis **iAsted** 🤖, l'assistant IA de GABON BIZ.

Je peux vous aider sur tous les services de la plateforme :

- 🏢 **Création d'entreprise** (Guichet Entrepreneur)
- 📋 **Marchés publics** (appels d'offres, soumissions)
- 🚀 **Incubateur SING 2.0** (programmes, candidature)
- 💰 **Investir au Gabon** (verticales, cadre juridique)
- 🎓 **CGI** (formations, certifications, FabLab)
- 🔍 **Innovation Hub KIMBA** (solutions tech gabonaises)

Comment puis-je vous aider ?`;
}
