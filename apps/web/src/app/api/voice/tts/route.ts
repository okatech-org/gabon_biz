import { NextRequest, NextResponse } from 'next/server';
import { rateLimitWithQuota } from '@/lib/iasted/rate-limiter';

/**
 * POST /api/voice/tts
 * OpenAI Text-to-Speech — converts text to natural speech audio.
 * Body: { text: string, voice?: string }
 * Returns: audio/mpeg binary stream
 */
export async function POST(request: NextRequest) {
  try {
    // Rate limiting + daily voice quota
    const rateLimited = rateLimitWithQuota(request, 'tts', true);
    if (rateLimited) return rateLimited;

    const apiKey = process.env.OPENAI_API_KEY;
    if (!apiKey) {
      return NextResponse.json(
        { error: 'Service vocal indisponible' },
        { status: 503 }
      );
    }

    const body = await request.json();
    const { text, voice = 'echo' } = body; // 'echo' = neutral francophone masculine voice

    if (!text || typeof text !== 'string') {
      return NextResponse.json(
        { error: 'Texte requis' },
        { status: 400 }
      );
    }

    // Truncate for TTS (max ~4096 chars)
    const truncated = text.length > 4000 ? text.slice(0, 4000) + '...' : text;

    const response = await fetch('https://api.openai.com/v1/audio/speech', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        model: 'tts-1',        // tts-1 = fast, tts-1-hd = higher quality
        input: truncated,
        voice,                  // onyx = deep masculine, alloy = neutral
        speed: 1.0,
        response_format: 'mp3',
      }),
    });

    if (!response.ok || !response.body) {
      const errorText = await response.text();
      console.error('[OpenAI TTS] API error:', response.status, errorText);
      return NextResponse.json(
        { error: 'Erreur de synthèse vocale' },
        { status: 502 }
      );
    }

    // Stream audio back to client
    return new Response(response.body, {
      headers: {
        'Content-Type': 'audio/mpeg',
        'Cache-Control': 'no-cache',
      },
    });
  } catch (error) {
    console.error('[OpenAI TTS] Server error:', error);
    return NextResponse.json(
      { error: 'Erreur serveur' },
      { status: 500 }
    );
  }
}
