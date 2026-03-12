// GABON BIZ — Demo Authentication API Route
// Signs a JWT for demo accounts (dev/staging only)

import { NextRequest, NextResponse } from 'next/server';
import { SignJWT } from 'jose';
import { getDemoAccountById } from '@/lib/demo-accounts';

const DEMO_SECRET = new TextEncoder().encode(
  process.env.DEMO_JWT_SECRET || 'gabon-biz-demo-secret-dev-2026'
);

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { accountId } = body;

    if (!accountId) {
      return NextResponse.json(
        { error: 'accountId requis' },
        { status: 400 }
      );
    }

    const account = getDemoAccountById(accountId);
    if (!account) {
      return NextResponse.json(
        { error: 'Compte démo introuvable' },
        { status: 404 }
      );
    }

    // Sign a demo JWT with 2h expiration
    const token = await new SignJWT({
      nip: account.user.nip,
      fullName: account.user.fullName,
      name: account.user.name,
      email: account.user.email,
      phone: account.user.phone,
      profileType: account.user.profileType,
      roles: account.user.roles,
      organization: account.user.organization,
      title: account.user.title,
      location: account.user.location,
      locale: account.user.locale,
      isDemo: true,
    })
      .setProtectedHeader({ alg: 'HS256' })
      .setIssuedAt()
      .setExpirationTime('2h')
      .setSubject(account.id)
      .sign(DEMO_SECRET);

    // Set the session cookie with "demo:" prefix to distinguish from real tokens
    const response = NextResponse.json({
      success: true,
      redirectTo: '/dashboard',
      profile: account.label,
    });

    response.cookies.set('gabon-biz-session', `demo:${token}`, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      path: '/',
      maxAge: 7200, // 2 hours
    });

    return response;
  } catch {
    return NextResponse.json(
      { error: 'Erreur serveur' },
      { status: 500 }
    );
  }
}
