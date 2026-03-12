// GABON BIZ — User Info API Route
// Returns the authenticated user's info from the session cookie
// Supports both GABON ID tokens and demo JWT tokens

import { NextRequest, NextResponse } from 'next/server';
import { getUserInfo } from '@/lib/auth';
import { jwtVerify } from 'jose';

const DEMO_SECRET = new TextEncoder().encode(
  process.env.DEMO_JWT_SECRET || 'gabon-biz-demo-secret-dev-2026',
);

export async function GET(request: NextRequest) {
  const sessionValue = request.cookies.get('__session')?.value;

  if (!sessionValue) {
    return NextResponse.json({ user: null }, { status: 401 });
  }

  // Check if this is a demo token (prefixed with "demo:")
  if (sessionValue.startsWith('demo:')) {
    const demoToken = sessionValue.slice(5); // Remove "demo:" prefix
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
      // Demo token expired or invalid
      return NextResponse.json({ user: null, expired: true }, { status: 401 });
    }
  }

  // Normal GABON ID flow
  try {
    const user = await getUserInfo(sessionValue);
    if (!user) {
      return NextResponse.json({ user: null }, { status: 401 });
    }
    return NextResponse.json({ user });
  } catch {
    return NextResponse.json({ user: null }, { status: 401 });
  }
}
