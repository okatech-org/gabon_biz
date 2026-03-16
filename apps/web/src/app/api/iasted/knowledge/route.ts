// ─── iAsted Knowledge Base API ───────────────────────────────────
// POST: Log an interaction for learning
// GET: Retrieve analytics and frequent questions

import { NextRequest, NextResponse } from 'next/server';
import {
  logInteraction,
  getAnalytics,
  getFrequentQuestions,
  type InteractionLog,
} from '@/lib/iasted/knowledge-store';

/**
 * POST /api/iasted/knowledge
 * Log an interaction for learning.
 */
export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    const interaction: InteractionLog = {
      timestamp: new Date().toISOString(),
      sessionId: body.sessionId || 'unknown',
      userMessage: (body.userMessage || '').slice(0, 500),
      agentResponse: (body.agentResponse || '').slice(0, 1000),
      page: body.page || '/',
      lang: body.lang || 'fr',
      functionsCalled: body.functionsCalled || [],
      feedback: body.feedback,
      responseTimeMs: body.responseTimeMs,
    };

    logInteraction(interaction);

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error('[iAsted] [knowledge] POST error:', err);
    return NextResponse.json({ error: 'Failed to log' }, { status: 500 });
  }
}

/**
 * GET /api/iasted/knowledge
 * Retrieve analytics and top questions.
 */
export async function GET() {
  try {
    const analytics = getAnalytics();
    const faq = getFrequentQuestions(10);

    return NextResponse.json({
      analytics,
      frequentQuestions: faq,
    });
  } catch (err) {
    console.error('[iAsted] [knowledge] GET error:', err);
    return NextResponse.json({ error: 'Failed to retrieve' }, { status: 500 });
  }
}
