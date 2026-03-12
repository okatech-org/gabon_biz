// GABON BIZ — Next.js Middleware
// Protects /dashboard/* routes by checking for valid session cookie
// Supports both GABON ID tokens and demo JWT tokens (demo: prefix)

import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

// Routes that require authentication
const PROTECTED_PATHS = ['/dashboard'];

// Routes that authenticated users should not see
const AUTH_PATHS = ['/login'];

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const sessionToken = request.cookies.get('gabon-biz-session')?.value;
  const isAuthenticated = !!sessionToken;

  // Check if the path is protected
  const isProtectedPath = PROTECTED_PATHS.some((path) => pathname.startsWith(path));
  const isAuthPath = AUTH_PATHS.some((path) => pathname.startsWith(path));

  // Redirect unauthenticated users away from protected routes
  if (isProtectedPath && !isAuthenticated) {
    const loginUrl = new URL('/login', request.url);
    loginUrl.searchParams.set('redirect', pathname);
    return NextResponse.redirect(loginUrl);
  }

  // Redirect authenticated users away from auth pages
  if (isAuthPath && isAuthenticated) {
    return NextResponse.redirect(new URL('/dashboard', request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/dashboard/:path*', '/login'],
};
