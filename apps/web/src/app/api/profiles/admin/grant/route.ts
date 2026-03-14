// GABON BIZ — Admin Profile Grant API
// POST /api/profiles/admin/grant — Grant a profile directly (ADMIN/SYSADMIN only by super-admin)
// Body: { targetNip: string, profileType: string }

import { NextRequest, NextResponse } from 'next/server';
import { getUserInfo } from '@/lib/auth';
import { adminGrantProfile, getProfileState } from '@/lib/profile-store';
import { type ProfileType, hasActiveProfile } from '@/lib/profiles';
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

function isSuperAdmin(nip: string): boolean {
  const state = getProfileState(nip);
  return hasActiveProfile(state, 'SYSADMIN');
}

export async function POST(request: NextRequest) {
  const adminNip = await extractNip(request);
  if (!adminNip || !isSuperAdmin(adminNip)) {
    return NextResponse.json(
      { error: 'Accès refusé. Seul le super-administrateur peut attribuer des profils.' },
      { status: 403 },
    );
  }

  try {
    const body = await request.json();
    const { targetNip, profileType } = body;

    if (!targetNip || !profileType) {
      return NextResponse.json({ error: 'Paramètres invalides (targetNip, profileType requis)' }, { status: 400 });
    }

    const result = adminGrantProfile(
      targetNip,
      profileType as ProfileType,
      adminNip,
    );

    return NextResponse.json({
      success: result.success,
      message: result.message,
      profileState: result.state,
    });
  } catch {
    return NextResponse.json({ error: 'Erreur serveur' }, { status: 500 });
  }
}
