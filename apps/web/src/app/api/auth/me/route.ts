// GABON BIZ — User Info API Route
// Returns the authenticated user's info from the session cookie
// Supports:
//   1. IDENTITE.GA OAuth tokens (access_token → userinfo endpoint)
//   2. Demo JWT tokens (prefixed with "demo:")
// Auto-refreshes expired tokens using the refresh token cookie

import { NextRequest, NextResponse } from 'next/server';
import { getUserInfo, refreshAccessToken } from '@/lib/auth';
import { jwtVerify } from 'jose';

const DEMO_SECRET = new TextEncoder().encode(
  process.env.DEMO_JWT_SECRET || 'gabon-biz-demo-secret-dev-2026',
);

export async function GET(request: NextRequest) {
  const sessionValue = request.cookies.get('__session')?.value;

  if (!sessionValue) {
    // Return 200 with null user (not 401) to avoid browser console errors.
    // This endpoint is a "check" not a "protected resource".
    return NextResponse.json({ user: null });
  }

  // ── Demo token flow ──────────────────────────────────────────
  if (sessionValue.startsWith('demo:')) {
    const demoToken = sessionValue.slice(5);
    try {
      const { payload } = await jwtVerify(demoToken, DEMO_SECRET);
      return NextResponse.json({
        user: {
          nip: payload.nip,
          fullName: payload.fullName,
          name: payload.name,
          email: payload.email,
          phone: payload.phone,
          profileType: payload.profileType,
          roles: payload.roles,
          organization: payload.organization,
          title: payload.title,
          location: payload.location,
          locale: payload.locale,
          isDemo: true,
        },
      });
    } catch {
      return NextResponse.json({ user: null, expired: true });
    }
  }

  // ── IDENTITE.GA OAuth flow ───────────────────────────────────
  // Try to get user info with the current access token
  let user = await getUserInfo(sessionValue);

  if (user) {
    return NextResponse.json({
      user: {
        nip: user.nip,
        fullName: user.fullName,
        name: user.fullName,
        given_name: user.given_name,
        family_name: user.family_name,
        email: user.email,
        phone: user.phone,
        profileType: user.profileType,
        gender: user.gender,
        birthdate: user.birthdate,
        isDemo: false,
        provider: 'identite.ga',
      },
    });
  }

  // ── Token expired? Try silent refresh ────────────────────────
  const refreshToken = request.cookies.get('gabon-biz-refresh')?.value;
  if (!refreshToken) {
    return NextResponse.json({ user: null, expired: true });
  }

  const newTokens = await refreshAccessToken(refreshToken);
  if (!newTokens) {
    return NextResponse.json({ user: null, expired: true });
  }

  // Fetch user info with the new access token
  user = await getUserInfo(newTokens.access_token);
  if (!user) {
    return NextResponse.json({ user: null });
  }

  // Build response with refreshed cookies
  const response = NextResponse.json({
    user: {
      nip: user.nip,
      fullName: user.fullName,
      name: user.fullName,
      given_name: user.given_name,
      family_name: user.family_name,
      email: user.email,
      phone: user.phone,
      profileType: user.profileType,
      gender: user.gender,
      birthdate: user.birthdate,
      isDemo: false,
      provider: 'identite.ga',
    },
  });

  // Update session cookies with new tokens
  response.cookies.set('__session', newTokens.access_token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    maxAge: newTokens.expires_in || 3600,
    path: '/',
  });

  response.cookies.set('gabon-biz-refresh', newTokens.refresh_token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    maxAge: 30 * 24 * 60 * 60,
    path: '/',
  });

  return response;
}
