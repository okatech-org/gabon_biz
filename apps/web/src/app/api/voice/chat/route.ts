import { NextRequest } from 'next/server';
import { IASTED_SYSTEM_PROMPT_VOCAL } from '@/lib/iasted/system-prompt';

/**
 * POST /api/voice/chat
 * GPT-4o streaming chat for voice conversations.
 * Uses SSE to stream responses in real-time.
 * Body: { message: string, history?: { role: string, content: string }[] }
 */
export async function POST(request: NextRequest) {
  try {
    const apiKey = process.env.OPENAI_API_KEY;
    if (!apiKey) {
      return new Response(
        'data: {"error":"Service vocal indisponible"}\n\ndata: [DONE]\n\n',
        { status: 503, headers: { 'Content-Type': 'text/event-stream' } }
      );
    }

    const body = await request.json();
    const { message, history = [] } = body;

    if (!message || typeof message !== 'string') {
      return new Response(
        'data: {"error":"Message requis"}\n\ndata: [DONE]\n\n',
        { status: 400, headers: { 'Content-Type': 'text/event-stream' } }
      );
    }

    // Build messages array with system prompt + history + current message
    const messages = [
      { role: 'system', content: IASTED_SYSTEM_PROMPT_VOCAL },
      ...history.slice(-10).map((msg: { role: string; content: string }) => ({
        role: msg.role === 'model' ? 'assistant' : msg.role,
        content: msg.content,
      })),
      { role: 'user', content: message },
    ];

    // Call GPT-4o with streaming
    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        model: 'gpt-4o',
        messages,
        stream: true,
        temperature: 0.7,
        max_tokens: 300, // Keep concise for vocal responses
        top_p: 0.9,
      }),
    });

    if (!response.ok || !response.body) {
      const errorText = await response.text();
      console.error('[GPT-4o Voice] API error:', response.status, errorText);
      return new Response(
        'data: {"text":"Désolé, je suis temporairement indisponible. Réessaie dans un instant."}\n\ndata: [DONE]\n\n',
        { status: 200, headers: { 'Content-Type': 'text/event-stream' } }
      );
    }

    // Stream the response via SSE
    const encoder = new TextEncoder();
    const decoder = new TextDecoder();
    const reader = response.body.getReader();

    const stream = new ReadableStream({
      async start(controller) {
        let buffer = '';
        try {
          while (true) {
            const { done, value } = await reader.read();
            if (done) break;

            buffer += decoder.decode(value, { stream: true });
            const lines = buffer.split('\n');
            buffer = lines.pop() || '';

            for (const line of lines) {
              if (!line.startsWith('data: ')) continue;
              const data = line.slice(6).trim();
              if (data === '[DONE]') {
                controller.enqueue(encoder.encode('data: [DONE]\n\n'));
                continue;
              }
              try {
                const parsed = JSON.parse(data);
                const delta = parsed.choices?.[0]?.delta?.content;
                if (delta) {
                  controller.enqueue(
                    encoder.encode(`data: ${JSON.stringify({ text: delta })}\n\n`)
                  );
                }
              } catch { /* skip malformed chunks */ }
            }
          }
          controller.enqueue(encoder.encode('data: [DONE]\n\n'));
        } catch (err) {
          console.error('[GPT-4o Voice] Stream error:', err);
        } finally {
          controller.close();
        }
      },
    });

    return new Response(stream, {
      headers: {
        'Content-Type': 'text/event-stream',
        'Cache-Control': 'no-cache',
        'Connection': 'keep-alive',
      },
    });
  } catch (error) {
    console.error('[GPT-4o Voice] Server error:', error);
    return new Response(
      'data: {"text":"Une erreur est survenue."}\n\ndata: [DONE]\n\n',
      { status: 200, headers: { 'Content-Type': 'text/event-stream' } }
    );
  }
}
