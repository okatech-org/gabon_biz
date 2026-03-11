// GABON BIZ — Next.js Auth Utilities
// Server-side auth helpers for API route handlers

const GABON_ID_ISSUER = process.env.GABON_ID_ISSUER || 'http://localhost:4000';
const CLIENT_ID = process.env.GABON_ID_CLIENT_ID || 'gabon-biz-client';
const CLIENT_SECRET = process.env.GABON_ID_CLIENT_SECRET || 'gabon-biz-secret-dev';
const REDIRECT_URI = process.env.GABON_ID_REDIRECT_URI || 'http://localhost:3000/auth/callback';

export interface AuthUser {
  nip: string;
  fullName: string;
  email: string;
  phone?: string;
  profileType: string;
}

// Build the GABON ID authorization URL
export function getLoginUrl(state?: string): string {
  const params = new URLSearchParams({
    response_type: 'code',
    client_id: CLIENT_ID,
    redirect_uri: REDIRECT_URI,
    scope: 'openid profile email phone nip',
    state: state || generateState(),
  });
  return `${GABON_ID_ISSUER}/authorize?${params.toString()}`;
}

// Exchange authorization code for tokens
export async function exchangeCodeForTokens(code: string) {
  const response = await fetch(`${GABON_ID_ISSUER}/token`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: new URLSearchParams({
      grant_type: 'authorization_code',
      code,
      redirect_uri: REDIRECT_URI,
      client_id: CLIENT_ID,
      client_secret: CLIENT_SECRET,
    }),
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message || "Échec de l'échange du code");
  }

  return response.json();
}

// Refresh access token using refresh token
export async function refreshAccessToken(refreshToken: string) {
  const response = await fetch(`${GABON_ID_ISSUER}/token`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: new URLSearchParams({
      grant_type: 'refresh_token',
      refresh_token: refreshToken,
      client_id: CLIENT_ID,
      client_secret: CLIENT_SECRET,
    }),
  });

  if (!response.ok) return null;
  return response.json();
}

// Get user info from GABON ID
export async function getUserInfo(accessToken: string): Promise<AuthUser | null> {
  const response = await fetch(`${GABON_ID_ISSUER}/userinfo`, {
    headers: { Authorization: `Bearer ${accessToken}` },
  });

  if (!response.ok) return null;
  return response.json();
}

// Generate a random state parameter for CSRF protection
function generateState(): string {
  const array = new Uint8Array(32);
  crypto.getRandomValues(array);
  return Array.from(array, (b) => b.toString(16).padStart(2, '0')).join('');
}
