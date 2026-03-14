// GABON BIZ — Profile Request API
// POST /api/profiles/request — Request activation of a new profile
// Body: { profileType: string, metadata?: Record<string, string> }

import { NextRequest, NextResponse } from 'next/server';
import { getUserInfo } from '@/lib/auth';
import { requestProfile } from '@/lib/profile-store';
import { REQUESTABLE_PROFILES, type ProfileType } from '@/lib/profiles';
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

    if (!profileType || !REQUESTABLE_PROFILES.includes(profileType as ProfileType)) {
      return NextResponse.json(
        { error: `Profil invalide. Options: ${REQUESTABLE_PROFILES.join(', ')}` },
        { status: 400 },
      );
    }

    const result = requestProfile(nip, profileType as ProfileType, metadata);

    return NextResponse.json({
      success: true,
      status: result.status,
      message: result.message,
      profileState: result.state,
    });
  } catch {
    return NextResponse.json({ error: 'Erreur serveur' }, { status: 500 });
  }
}
