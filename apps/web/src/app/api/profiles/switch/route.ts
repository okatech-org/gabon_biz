// GABON BIZ — Profile Switch API
// POST /api/profiles/switch — Switch the active profile
// Body: { profileType: string }

import { NextRequest, NextResponse } from 'next/server';
import { getUserInfo } from '@/lib/auth';
import { switchActiveProfile } from '@/lib/profile-store';
import { type ProfileType } from '@/lib/profiles';
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
    const { profileType } = body;

    const state = switchActiveProfile(nip, profileType as ProfileType);
    if (!state) {
      return NextResponse.json(
        { error: 'Ce profil n\'est pas actif ou n\'existe pas.' },
        { status: 400 },
      );
    }

    return NextResponse.json({
      success: true,
      activeProfile: state.activeProfile,
      profileState: state,
    });
  } catch {
    return NextResponse.json({ error: 'Erreur serveur' }, { status: 500 });
  }
}
