// GABON BIZ — Auth Callback API Route
// Handles the IDENTITE.GA OAuth callback:
//   1. Validates state (CSRF protection)
//   2. Exchanges authorization code for tokens (with PKCE code_verifier)
//   3. Checks if this is the user's first login → sets onboarding flag
//   4. Sets session cookies
//   5. Cleans up temporary PKCE/state cookies
//   6. Redirects to onboarding (first login) or dashboard

import { NextRequest, NextResponse } from 'next/server';
import { exchangeCodeForTokens, getUserInfo } from '@/lib/auth';
import { getProfileState } from '@/lib/profile-store';

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const code = searchParams.get('code');
  const returnedState = searchParams.get('state');
  const error = searchParams.get('error');
  const errorDescription = searchParams.get('error_description');

  // --- Handle errors from IDENTITE.GA ---
  if (error) {
    console.error('[IDENTITE.GA] Authorization error:', error, errorDescription);
    const errorParam = encodeURIComponent(errorDescription || error);
    return NextResponse.redirect(new URL(`/login?error=${errorParam}`, request.url));
  }

  if (!code) {
    return NextResponse.redirect(new URL('/login?error=no_code', request.url));
  }

  // --- Validate state (CSRF protection) ---
  const storedState = request.cookies.get('gabon-biz-state')?.value;
  if (!storedState || storedState !== returnedState) {
    console.error('[IDENTITE.GA] State mismatch — possible CSRF attack');
    return NextResponse.redirect(new URL('/login?error=state_mismatch', request.url));
  }

  // --- Retrieve PKCE code_verifier ---
  const codeVerifier = request.cookies.get('gabon-biz-pkce')?.value;
  if (!codeVerifier) {
    console.error('[IDENTITE.GA] Missing PKCE code_verifier cookie');
    return NextResponse.redirect(new URL('/login?error=pkce_missing', request.url));
  }

  try {
    // Exchange the authorization code for tokens (with PKCE)
    const tokens = await exchangeCodeForTokens(code, codeVerifier);

    // --- Detect first login ---
    // Get the user's NIP from the access token to check profile state
    let isFirstLogin = false;
    try {
      const userInfo = await getUserInfo(tokens.access_token);
      if (userInfo?.nip) {
        const profileState = getProfileState(userInfo.nip);
        isFirstLogin = profileState.isFirstLogin;
      }
    } catch {
      // If we can't check, default to dashboard
    }

    // Redirect destination: onboarding for first login, else dashboard
    const storedRedirect = request.cookies.get('gabon-biz-redirect')?.value;
    const redirectTo = isFirstLogin ? '/onboarding' : (storedRedirect || '/dashboard');
    const response = NextResponse.redirect(new URL(redirectTo, request.url));

    // --- Set session cookies ---
    response.cookies.set('__session', tokens.access_token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: tokens.expires_in || 3600,
      path: '/',
    });

    response.cookies.set('gabon-biz-refresh', tokens.refresh_token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 30 * 24 * 60 * 60,
      path: '/',
    });

    if (tokens.id_token) {
      response.cookies.set('gabon-biz-id-token', tokens.id_token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'lax',
        maxAge: tokens.expires_in || 3600,
        path: '/',
      });
    }

    // Set onboarding flag for middleware
    if (isFirstLogin) {
      response.cookies.set('gabon-biz-onboarding', 'true', {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'lax',
        maxAge: 3600, // 1h — onboarding should be completed within this time
        path: '/',
      });
    }

    // --- Clean up temporary cookies ---
    response.cookies.set('gabon-biz-pkce', '', { maxAge: 0, path: '/' });
    response.cookies.set('gabon-biz-state', '', { maxAge: 0, path: '/' });
    response.cookies.set('gabon-biz-redirect', '', { maxAge: 0, path: '/' });

    return response;
  } catch (err) {
    console.error('[IDENTITE.GA] Token exchange error:', err);
    return NextResponse.redirect(new URL('/login?error=token_exchange_failed', request.url));
  }
}
