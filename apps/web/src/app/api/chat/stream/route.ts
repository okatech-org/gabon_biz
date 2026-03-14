import { NextRequest } from 'next/server';
import { getIAstedPrompt } from '@/lib/iasted/system-prompt';
import { getOpenAIToolsConfig } from '@/lib/iasted/tools';
import { rateLimitWithQuota } from '@/lib/iasted/rate-limiter';

// Use the unified system prompt (text mode = markdown + links)
const SYSTEM_PROMPT = getIAstedPrompt('text');

export async function POST(request: NextRequest) {
  try {
    // Rate limiting + daily quota: 30 req/min + role-based daily limit
    const rateLimited = rateLimitWithQuota(request, 'chat', false);
    if (rateLimited) return rateLimited;

    const { message, history, page } = await request.json();

    if (!message || typeof message !== 'string') {
      return new Response(JSON.stringify({ error: 'Message requis' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    const apiKey = process.env.OPENAI_API_KEY;

    if (!apiKey) {
      // No streaming for fallback — return a single SSE event with the full fallback
      const fallback = getFallbackResponse(message);
      const encoder = new TextEncoder();
      const stream = new ReadableStream({
        start(controller) {
          controller.enqueue(encoder.encode(`data: ${JSON.stringify({ text: fallback })}\n\n`));
          controller.enqueue(encoder.encode('data: [DONE]\n\n'));
          controller.close();
        },
      });
      return new Response(stream, {
        headers: {
          'Content-Type': 'text/event-stream',
          'Cache-Control': 'no-cache',
          Connection: 'keep-alive',
        },
      });
    }

    // Build OpenAI messages array
    const messages: Array<{ role: string; content: string }> = [
      {
        role: 'system',
        content: SYSTEM_PROMPT + (page ? `\n\n[CONTEXTE] L'utilisateur est actuellement sur la page : ${page}. Adapte ta réponse à ce contexte.` : ''),
      },
    ];

    if (history && Array.isArray(history)) {
      for (const msg of history) {
        messages.push({
          role: msg.role === 'model' ? 'assistant' : 'user',
          content: msg.content,
        });
      }
    }

    messages.push({
      role: 'user',
      content: message,
    });

    // OpenAI Chat Completions with streaming
    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        model: 'gpt-4.1',
        messages,
        tools: getOpenAIToolsConfig(),
        temperature: 0.8,
        top_p: 0.9,
        max_tokens: 2048,
        stream: true,
      }),
    });

    if (!response.ok || !response.body) {
      const errorText = await response.text();
      console.error('OpenAI streaming error:', errorText);
      const encoder = new TextEncoder();
      const stream = new ReadableStream({
        start(controller) {
          controller.enqueue(
            encoder.encode(
              `data: ${JSON.stringify({ text: "Désolé, une erreur s'est produite. Réessaie dans un instant ! 🔄" })}\n\n`
            )
          );
          controller.enqueue(encoder.encode('data: [DONE]\n\n'));
          controller.close();
        },
      });
      return new Response(stream, {
        headers: {
          'Content-Type': 'text/event-stream',
          'Cache-Control': 'no-cache',
          Connection: 'keep-alive',
        },
      });
    }

    // Pipe the OpenAI SSE stream to the client, extracting text chunks
    const reader = response.body.getReader();
    const decoder = new TextDecoder();
    const encoder = new TextEncoder();

    // Track tool calls across chunks (OpenAI streams them incrementally)
    const pendingToolCalls: Record<number, { name: string; arguments: string }> = {};

    const stream = new ReadableStream({
      async start(controller) {
        let buffer = '';

        try {
          for (;;) {
            const { done, value } = await reader.read();
            if (done) break;

            buffer += decoder.decode(value, { stream: true });
            const lines = buffer.split('\n');
            buffer = lines.pop() || '';

            for (const line of lines) {
              if (!line.startsWith('data: ')) continue;
              const jsonStr = line.slice(6).trim();
              if (!jsonStr || jsonStr === '[DONE]') continue;

              try {
                const parsed = JSON.parse(jsonStr);
                const delta = parsed?.choices?.[0]?.delta;
                if (!delta) continue;

                // Forward text chunks
                if (delta.content) {
                  controller.enqueue(
                    encoder.encode(`data: ${JSON.stringify({ text: delta.content })}\n\n`)
                  );
                }

                // Accumulate tool calls (streamed incrementally by OpenAI)
                if (delta.tool_calls) {
                  for (const tc of delta.tool_calls) {
                    const idx = tc.index ?? 0;
                    if (!pendingToolCalls[idx]) {
                      pendingToolCalls[idx] = { name: '', arguments: '' };
                    }
                    if (tc.function?.name) {
                      pendingToolCalls[idx].name += tc.function.name;
                    }
                    if (tc.function?.arguments) {
                      pendingToolCalls[idx].arguments += tc.function.arguments;
                    }
                  }
                }

                // When finish_reason is 'tool_calls', emit accumulated tool calls
                const finishReason = parsed?.choices?.[0]?.finish_reason;
                if (finishReason === 'tool_calls') {
                  for (const [, tc] of Object.entries(pendingToolCalls)) {
                    try {
                      const args = JSON.parse(tc.arguments || '{}');
                      controller.enqueue(
                        encoder.encode(`data: ${JSON.stringify({
                          functionCall: {
                            name: tc.name,
                            args,
                          },
                        })}\n\n`)
                      );
                    } catch {
                      // Skip malformed tool call arguments
                    }
                  }
                }
              } catch {
                // Skip malformed JSON chunks
              }
            }
          }
        } catch (err) {
          console.error('Stream read error:', err);
        } finally {
          controller.enqueue(encoder.encode('data: [DONE]\n\n'));
          controller.close();
        }
      },
    });

    return new Response(stream, {
      headers: {
        'Content-Type': 'text/event-stream',
        'Cache-Control': 'no-cache',
        Connection: 'keep-alive',
      },
    });
  } catch (error) {
    console.error('Chat stream error:', error);
    const encoder = new TextEncoder();
    const stream = new ReadableStream({
      start(controller) {
        controller.enqueue(
          encoder.encode(
            `data: ${JSON.stringify({ text: "Oups, erreur technique ! Réessaie 🔄" })}\n\n`
          )
        );
        controller.enqueue(encoder.encode('data: [DONE]\n\n'));
        controller.close();
      },
    });
    return new Response(stream, {
      headers: {
        'Content-Type': 'text/event-stream',
        'Cache-Control': 'no-cache',
        Connection: 'keep-alive',
      },
    });
  }
}

function getFallbackResponse(message: string): string {
  const q = message.toLowerCase();

  if (q.includes('créer') && (q.includes('entreprise') || q.includes('société'))) {
    return `Super question ! 🏢 Créer ton entreprise sur GABON BIZ, c'est **100% en ligne et en 48h** :

- **EI** : ~50 000 XAF
- **SARL** : ~150 000 XAF  
- **SA** : ~300 000 XAF

Il te faut : CNIE, justificatif de domicile, statuts et PV d'AG.

👉 [Lance-toi sur le Guichet Entrepreneur](/services/guichet-entrepreneur) !`;
  }

  if (q.includes('marché') || (q.includes('appel') && q.includes('offre')) || q.includes('soumission')) {
    return `Il y a **500+ marchés publics** par an sur GABON BIZ, soit 45 milliards XAF ! 📋

Tu peux chercher par secteur, budget ou région, et activer les **alertes J-7** pour ne rien rater.

Condition : avoir un RCCM valide.

👉 [Explore les marchés publics](/services/marches-publics)`;
  }

  if (q.includes('incubateur') || q.includes('sing') || q.includes('startup') || q.includes('candidat')) {
    return `La SING, c'est le **1er incubateur 100% numérique de la CEMAC** ! 🚀

280+ startups incubées, 76% de taux de survie. Tu as le choix entre 7 programmes :
- **Cohorte Innovation 4.0** (7 places restantes, Avril 2026)
- **VISA Startup** (label officiel MENUDI)
- **SING Capital** (financement 500K à 15M FCFA)

👉 [Découvre les programmes](/services/incubateur)`;
  }

  if (q.includes('investir') || q.includes('investissement')) {
    return `Le Gabon, c'est un **océan bleu numérique** : 135% pénétration mobile mais seulement 33% de comptes actifs 💰

- PIB/hab $16 470 (5ème Afrique)
- FCFA arrimé à l'Euro (zéro risque de change)
- 3 ans d'exonération d'IS

👉 [Explore les opportunités](/services/investir)`;
  }

  if (q.includes('cgi') || q.includes('formation') || q.includes('sada') || q.includes('fablab')) {
    return `Le CGI c'est le cœur de la formation numérique au Gabon ! 🎓

3 420+ personnes formées, 1 247 certifiés internationaux. Les 4 pôles : Acculturation, Certification SADA, FabLab et MediaLab.

👉 [Découvre le CGI](/services/cgi)`;
  }

  return `Hey ! 👋 Je suis **iAsted**, ton assistant IA sur GABON BIZ.

Je peux t'aider à :
- 🏢 Créer ton entreprise
- 📋 Trouver des marchés publics
- 🚀 Candidater à la SING
- 💰 Investir au Gabon
- 🎓 Accéder aux formations CGI

Dis-moi ce dont tu as besoin !`;
}
