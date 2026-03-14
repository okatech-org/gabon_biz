// GABON BIZ — Next.js Middleware
// Protects /dashboard/* routes by checking for valid session cookie
// Redirects new users to /onboarding on first login
// Supports both IDENTITE.GA tokens and demo JWT tokens (demo: prefix)

import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

// Routes that require authentication
const PROTECTED_PATHS = ['/dashboard', '/onboarding'];

// Routes that authenticated users should not see
const AUTH_PATHS = ['/login'];

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const sessionToken = request.cookies.get('__session')?.value;
  const isAuthenticated = !!sessionToken;

  // Check path types
  const isProtectedPath = PROTECTED_PATHS.some((path) => pathname.startsWith(path));
  const isAuthPath = AUTH_PATHS.some((path) => pathname.startsWith(path));
  const isOnboardingPath = pathname.startsWith('/onboarding');

  // Redirect unauthenticated users away from protected routes
  if (isProtectedPath && !isAuthenticated) {
    const loginUrl = new URL('/login', request.url);
    loginUrl.searchParams.set('redirect', pathname);
    return NextResponse.redirect(loginUrl);
  }

  // Redirect authenticated users away from auth pages
  if (isAuthPath && isAuthenticated) {
    // Check if user needs onboarding (cookie flag set by callback)
    const needsOnboarding = request.cookies.get('gabon-biz-onboarding')?.value === 'true';
    if (needsOnboarding) {
      return NextResponse.redirect(new URL('/onboarding', request.url));
    }
    return NextResponse.redirect(new URL('/dashboard', request.url));
  }

  // If user is on dashboard but needs onboarding, redirect
  if (pathname.startsWith('/dashboard') && !isOnboardingPath) {
    const needsOnboarding = request.cookies.get('gabon-biz-onboarding')?.value === 'true';
    if (needsOnboarding) {
      return NextResponse.redirect(new URL('/onboarding', request.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/dashboard/:path*', '/login', '/onboarding/:path*'],
};
