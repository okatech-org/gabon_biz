// GABON BIZ — Logout API Route
// Clears all session cookies (IDENTITE.GA OAuth + demo tokens)

import { NextResponse } from 'next/server';

const COOKIES_TO_CLEAR = [
  '__session',
  'gabon-biz-refresh',
  'gabon-biz-id-token',
  'gabon-biz-pkce',
  'gabon-biz-state',
  'gabon-biz-redirect',
  'gabon-biz-onboarding',
];

export async function POST() {
  const response = NextResponse.json({ success: true });

  for (const name of COOKIES_TO_CLEAR) {
    response.cookies.set(name, '', {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 0,
      path: '/',
    });
  }

  return response;
}
