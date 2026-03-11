// GABON BIZ — User Info API Route
// Returns the authenticated user's info from the session cookie

import { NextRequest, NextResponse } from 'next/server';
import { getUserInfo } from '@/lib/auth';

export async function GET(request: NextRequest) {
  const accessToken = request.cookies.get('gabon-biz-session')?.value;

  if (!accessToken) {
    return NextResponse.json({ user: null }, { status: 401 });
  }

  try {
    const user = await getUserInfo(accessToken);
    if (!user) {
      return NextResponse.json({ user: null }, { status: 401 });
    }
    return NextResponse.json({ user });
  } catch {
    return NextResponse.json({ user: null }, { status: 401 });
  }
}
