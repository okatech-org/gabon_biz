// GABON BIZ — Login API Route
// Initiates OAuth 2.0 + PKCE flow with IDENTITE.GA
// Generates state + code_verifier, stores them in httpOnly cookies,
// then redirects the user to IDENTITE.GA's authorization page

import { NextRequest, NextResponse } from 'next/server';
import { buildAuthorizationUrl } from '@/lib/auth';

export async function GET(request: NextRequest) {
  // Optional: capture where the user wanted to go after login
  const redirectAfterLogin = request.nextUrl.searchParams.get('redirect') || '/dashboard';

  // Build the IDENTITE.GA authorization URL with PKCE
  const { url, state, codeVerifier } = await buildAuthorizationUrl(redirectAfterLogin);

  // NextResponse.redirect requires an absolute URL object for external redirects
  const redirectUrl = new URL(url);
  const response = NextResponse.redirect(redirectUrl);

  // Store PKCE code_verifier in an httpOnly cookie (needed for callback)
  response.cookies.set('gabon-biz-pkce', codeVerifier, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    maxAge: 600, // 10 minutes — must complete login within this time
    path: '/',
  });

  // Store OAuth state for CSRF validation
  response.cookies.set('gabon-biz-state', state, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    maxAge: 600,
    path: '/',
  });

  // Store the intended redirect destination
  if (redirectAfterLogin && redirectAfterLogin !== '/dashboard') {
    response.cookies.set('gabon-biz-redirect', redirectAfterLogin, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 600,
      path: '/',
    });
  }

  return response;
}
