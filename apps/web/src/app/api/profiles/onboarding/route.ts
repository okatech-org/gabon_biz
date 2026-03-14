// GABON BIZ — Onboarding Completion API
// POST /api/profiles/onboarding — Mark onboarding as completed
// Optionally activates ENTREPRENEUR profile during onboarding
// Body: { profileType?: string, metadata?: Record<string, string> }

import { NextRequest, NextResponse } from 'next/server';
import { getUserInfo } from '@/lib/auth';
import { completeOnboarding, requestProfile } from '@/lib/profile-store';
import { type ProfileType, REQUESTABLE_PROFILES } from '@/lib/profiles';
import { jwtVerify } from 'jose';

const DEMO_SECRET = new TextEncoder().encode(
  process.env.DEMO_JWT_SECRET || 'gabon-biz-demo-secret-dev-2026',
);

async function extractNip(request: NextRequest): Promise<string | null> {
  const session = request.cookies.get('__session')?.value;
  if (!session) return null;
  if (session.startsWith('demo:')) {
    try {
      const { payload } = await jwtVerify(session.slice(5), DEMO_SECRET);
      return (payload.nip as string) || null;
    } catch { return null; }
  }
  const user = await getUserInfo(session);
  return user?.nip || null;
}

export async function POST(request: NextRequest) {
  const nip = await extractNip(request);
  if (!nip) {
    return NextResponse.json({ error: 'Non authentifié' }, { status: 401 });
  }

  try {
    const body = await request.json();
    const { profileType, metadata } = body;

    // If user chose a profile during onboarding, activate/request it
    if (profileType && REQUESTABLE_PROFILES.includes(profileType as ProfileType)) {
      requestProfile(nip, profileType as ProfileType, metadata);
    }

    // Mark onboarding as completed
    const state = completeOnboarding(nip);

    // Clear the onboarding cookie so middleware stops redirecting
    const response = NextResponse.json({
      success: true,
      profileState: state,
      redirectTo: '/dashboard',
    });

    response.cookies.set('gabon-biz-onboarding', '', {
      maxAge: 0,
      path: '/',
    });

    return response;
  } catch {
    return NextResponse.json({ error: 'Erreur serveur' }, { status: 500 });
  }
}
