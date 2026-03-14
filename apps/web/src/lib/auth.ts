// GABON BIZ — Next.js Auth Utilities
// Server-side auth helpers for API route handlers
// OAuth 2.0 + PKCE flow with IDENTITE.GA as identity provider

// ============================================================
// Configuration — IDENTITE.GA endpoints
// ============================================================

// Frontend URL of IDENTITE.GA (for authorization / consent page)
const IDN_GA_URL = process.env.IDN_GA_URL || 'http://localhost:5173';

// Supabase Edge Functions URL (for token exchange & userinfo)
const IDN_SUPABASE_URL =
  process.env.IDN_GA_SUPABASE_URL || 'https://jvukslcsgbihcptnkpll.supabase.co';

const CLIENT_ID = process.env.IDN_GA_CLIENT_ID || 'gabon-biz';
const CLIENT_SECRET = process.env.IDN_GA_CLIENT_SECRET || 'gabon-biz-secret-dev-2026';
const REDIRECT_URI = process.env.IDN_GA_REDIRECT_URI || 'http://localhost:3000/api/auth/callback';

// Endpoints
const AUTHORIZE_URL = `${IDN_GA_URL}/oauth/authorize`;
const TOKEN_URL = `${IDN_SUPABASE_URL}/functions/v1/oauth-token`;
const USERINFO_URL = `${IDN_SUPABASE_URL}/functions/v1/oauth-userinfo`;

// ============================================================
// Types
// ============================================================

export interface AuthUser {
  nip: string;
  fullName: string;
  given_name?: string;
  family_name?: string;
  email: string;
  phone?: string;
  profileType: string;
  gender?: string;
  birthdate?: string;
}

export interface TokenResponse {
  access_token: string;
  token_type: string;
  expires_in: number;
  refresh_token: string;
  id_token?: string;
}

// ============================================================
// PKCE Utilities (RFC 7636)
// ============================================================

/** Generate a cryptographically random code_verifier (43-128 chars) */
export function generateCodeVerifier(): string {
  const array = new Uint8Array(48); // 48 bytes → 64 base64url chars
  crypto.getRandomValues(array);
  return base64UrlEncode(array);
}

/** Derive the code_challenge from the code_verifier using SHA-256 */
export async function generateCodeChallenge(verifier: string): Promise<string> {
  const encoder = new TextEncoder();
  const data = encoder.encode(verifier);
  const digest = await crypto.subtle.digest('SHA-256', data);
  return base64UrlEncode(new Uint8Array(digest));
}

/** Base64 URL-safe encoding (no padding) */
function base64UrlEncode(bytes: Uint8Array): string {
  let str = '';
  for (const byte of bytes) {
    str += String.fromCharCode(byte);
  }
  return btoa(str).replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '');
}

// ============================================================
// OAuth Flow
// ============================================================

/** Generate a random state parameter for CSRF protection */
export function generateState(): string {
  const array = new Uint8Array(32);
  crypto.getRandomValues(array);
  return Array.from(array, (b) => b.toString(16).padStart(2, '0')).join('');
}

/**
 * Build the IDENTITE.GA authorization URL with PKCE
 * Returns { url, state, codeVerifier } — state & codeVerifier must be stored in cookies
 */
export async function buildAuthorizationUrl(redirectPath?: string): Promise<{
  url: string;
  state: string;
  codeVerifier: string;
}> {
  const state = generateState();
  const codeVerifier = generateCodeVerifier();
  const codeChallenge = await generateCodeChallenge(codeVerifier);

  const params = new URLSearchParams({
    response_type: 'code',
    client_id: CLIENT_ID,
    redirect_uri: REDIRECT_URI,
    scope: 'openid profile email phone nip',
    state,
    code_challenge: codeChallenge,
    code_challenge_method: 'S256',
  });

  return {
    url: `${AUTHORIZE_URL}?${params.toString()}`,
    state,
    codeVerifier,
  };
}

/**
 * Exchange authorization code for tokens (with PKCE code_verifier)
 * Calls IDENTITE.GA's oauth-token Edge Function
 */
export async function exchangeCodeForTokens(
  code: string,
  codeVerifier: string,
): Promise<TokenResponse> {
  const response = await fetch(TOKEN_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: new URLSearchParams({
      grant_type: 'authorization_code',
      code,
      redirect_uri: REDIRECT_URI,
      client_id: CLIENT_ID,
      client_secret: CLIENT_SECRET,
      code_verifier: codeVerifier,
    }),
  });

  if (!response.ok) {
    const error = await response.text();
    console.error('[IDENTITE.GA] Token exchange failed:', response.status, error);
    throw new Error(`Échec de l'échange du code d'autorisation (${response.status})`);
  }

  return response.json();
}

/**
 * Refresh access token using refresh token
 * Calls IDENTITE.GA's oauth-token Edge Function
 */
export async function refreshAccessToken(refreshToken: string): Promise<TokenResponse | null> {
  try {
    const response = await fetch(TOKEN_URL, {
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
  } catch {
    return null;
  }
}

/**
 * Get user info from IDENTITE.GA
 * Calls IDENTITE.GA's oauth-userinfo Edge Function
 */
export async function getUserInfo(accessToken: string): Promise<AuthUser | null> {
  try {
    const response = await fetch(USERINFO_URL, {
      headers: { Authorization: `Bearer ${accessToken}` },
    });

    if (!response.ok) return null;

    const data = await response.json();

    // Map IDENTITE.GA claims to GABON BIZ AuthUser
    return {
      nip: data.nip || data.sub,
      fullName: data.fullName || `${data.given_name || ''} ${data.family_name || ''}`.trim(),
      given_name: data.given_name,
      family_name: data.family_name,
      email: data.email,
      phone: data.phone_number || data.phone,
      profileType: data.profileType || 'PUBLIC',
      gender: data.gender,
      birthdate: data.birthdate,
    };
  } catch {
    return null;
  }
}
