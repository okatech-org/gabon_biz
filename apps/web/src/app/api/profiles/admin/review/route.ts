// GABON BIZ — Admin Profile Review API
// POST /api/profiles/admin/review — Approve or reject a pending profile request
// GET  /api/profiles/admin/review — List all pending requests
// Body (POST): { targetNip: string, profileType: string, action: 'approve' | 'reject', reason?: string }

import { NextRequest, NextResponse } from 'next/server';
import { getUserInfo } from '@/lib/auth';
import { adminReviewProfile, getAllPendingRequests, getProfileState } from '@/lib/profile-store';
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

function isAdmin(nip: string): boolean {
  const state = getProfileState(nip);
  return hasActiveProfile(state, 'ADMIN') || hasActiveProfile(state, 'SYSADMIN');
}

export async function GET(request: NextRequest) {
  const nip = await extractNip(request);
  if (!nip || !isAdmin(nip)) {
    return NextResponse.json({ error: 'Accès refusé' }, { status: 403 });
  }

  const pending = getAllPendingRequests();
  return NextResponse.json({ pending, count: pending.length });
}

export async function POST(request: NextRequest) {
  const adminNip = await extractNip(request);
  if (!adminNip || !isAdmin(adminNip)) {
    return NextResponse.json({ error: 'Accès refusé' }, { status: 403 });
  }

  try {
    const body = await request.json();
    const { targetNip, profileType, action, reason } = body;

    if (!targetNip || !profileType || !['approve', 'reject'].includes(action)) {
      return NextResponse.json({ error: 'Paramètres invalides' }, { status: 400 });
    }

    const result = adminReviewProfile(
      targetNip,
      profileType as ProfileType,
      action as 'approve' | 'reject',
      adminNip,
      reason,
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
