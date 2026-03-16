import { NextRequest, NextResponse } from 'next/server';
import { rateLimitWithQuota } from '@/lib/iasted/rate-limiter';
import { getIAstedPrompt } from '@/lib/iasted/system-prompt';
import { getOpenAIToolsConfig } from '@/lib/iasted/tools';

/**
 * POST /api/voice/realtime
 * Creates an ephemeral session token for the OpenAI Realtime API.
 * The browser uses this short-lived token to connect directly via WebSocket.
 * The actual API key never reaches the client.
 *
 * Returns: { client_secret: { value: string }, session_id: string }
 */
export async function POST(request: NextRequest) {
  try {
    // Rate limiting + daily voice quota
    const rateLimited = rateLimitWithQuota(request, 'realtime', true);
    if (rateLimited) return rateLimited;

    const apiKey = process.env.OPENAI_API_KEY;
    if (!apiKey) {
      return NextResponse.json({ error: 'Service vocal indisponible' }, { status: 503 });
    }

    // Build tool definitions for Realtime API format
    const tools = getOpenAIToolsConfig().map((t) => ({
      type: t.type,
      name: t.function.name,
      description: t.function.description,
      parameters: t.function.parameters,
    }));

    // Create ephemeral session via OpenAI Realtime Sessions API
    const response = await fetch('https://api.openai.com/v1/realtime/sessions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${apiKey}`,
      },
      signal: AbortSignal.timeout(15_000), // 15s timeout
      body: JSON.stringify({
        model: 'gpt-realtime-1.5',
        voice: 'echo',
        instructions: getIAstedPrompt('vocal'),
        tools,
        input_audio_format: 'pcm16',
        output_audio_format: 'pcm16',
        input_audio_transcription: {
          model: 'gpt-4o-transcribe',
        },
        turn_detection: {
          type: 'server_vad',
          threshold: 0.5,
          prefix_padding_ms: 300,
          silence_duration_ms: 500,
          create_response: true,
        },
        temperature: 0.8,
        max_response_output_tokens: 1024,
      }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error('[Realtime] Session creation failed:', response.status, errorText);
      return NextResponse.json(
        { error: 'Impossible de démarrer la session vocale' },
        { status: 502 },
      );
    }

    const session = await response.json();

    // Return session config so the client can send session.update after WS connect
    // This is critical for mobile — the WS doesn't always inherit the session config
    const sessionConfig = {
      instructions: getIAstedPrompt('vocal'),
      voice: 'echo',
      input_audio_format: 'pcm16',
      output_audio_format: 'pcm16',
      input_audio_transcription: { model: 'gpt-4o-transcribe' },
      turn_detection: {
        type: 'server_vad',
        threshold: 0.5,
        prefix_padding_ms: 300,
        silence_duration_ms: 500,
        create_response: true,
      },
      tools,
      temperature: 0.8,
      max_response_output_tokens: 1024,
    };

    return NextResponse.json({
      client_secret: session.client_secret,
      session_id: session.id,
      session_config: sessionConfig,
    });
  } catch (error) {
    console.error('[Realtime] Server error:', error);
    return NextResponse.json({ error: 'Erreur serveur' }, { status: 500 });
  }
}
