// GABON BIZ — Profile State API
// GET /api/profiles — Returns the current user's profile state

import { NextRequest, NextResponse } from 'next/server';
import { getUserInfo } from '@/lib/auth';
import { getProfileState } from '@/lib/profile-store';
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
    } catch {
      return null;
    }
  }

  const user = await getUserInfo(session);
  return user?.nip || null;
}

export async function GET(request: NextRequest) {
  const nip = await extractNip(request);
  if (!nip) {
    return NextResponse.json({ error: 'Non authentifié' }, { status: 401 });
  }

  const state = getProfileState(nip);
  return NextResponse.json({ profileState: state });
}
