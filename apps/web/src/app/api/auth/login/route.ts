// GABON BIZ — Login API Route
// Redirects user to GABON ID authorization page

import { NextResponse } from 'next/server';
import { getLoginUrl } from '@/lib/auth';

export async function GET() {
  const loginUrl = getLoginUrl();
  return NextResponse.redirect(loginUrl);
}
