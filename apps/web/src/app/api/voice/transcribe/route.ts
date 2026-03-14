import { NextRequest, NextResponse } from 'next/server';
import { rateLimitWithQuota } from '@/lib/iasted/rate-limiter';

/**
 * POST /api/voice/transcribe
 * Accepts audio blob (webm/mp4 from MediaRecorder), transcribes via Whisper.
 * Returns: { text: string }
 */
export async function POST(request: NextRequest) {
  try {
    // Rate limiting + daily voice quota
    const rateLimited = rateLimitWithQuota(request, 'transcribe', true);
    if (rateLimited) return rateLimited;

    const apiKey = process.env.OPENAI_API_KEY;
    if (!apiKey) {
      return NextResponse.json(
        { error: 'Service de transcription indisponible' },
        { status: 503 }
      );
    }

    const formData = await request.formData();
    const audioFile = formData.get('audio') as File | null;

    if (!audioFile) {
      return NextResponse.json(
        { error: 'Aucun fichier audio fourni' },
        { status: 400 }
      );
    }

    // Forward to OpenAI Whisper API
    const whisperForm = new FormData();
    whisperForm.append('file', audioFile, 'audio.webm');
    whisperForm.append('model', 'whisper-1');
    whisperForm.append('language', 'fr');
    whisperForm.append('response_format', 'json');

    const response = await fetch('https://api.openai.com/v1/audio/transcriptions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${apiKey}`,
      },
      body: whisperForm,
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error('[Whisper] API error:', response.status, errorText);
      return NextResponse.json(
        { error: 'Erreur de transcription' },
        { status: 502 }
      );
    }

    const result = await response.json();
    return NextResponse.json({ text: result.text || '' });
  } catch (error) {
    console.error('[Whisper] Server error:', error);
    return NextResponse.json(
      { error: 'Erreur serveur' },
      { status: 500 }
    );
  }
}
