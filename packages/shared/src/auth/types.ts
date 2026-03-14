// GABON BIZ — Auth Types & Constants
// Shared across backend (NestJS) and frontend (Next.js)
// Authentication via IDENTITE.GA (OAuth 2.0 / OpenID Connect)

export interface GabonIdUser {
  sub?: string; // Subject identifier (from OIDC)
  nip: string; // 14 chars, the Numéro d'Identification Personnel
  fullName: string;
  given_name?: string;
  family_name?: string;
  email: string;
  phone?: string;
  cnieNumber?: string;
  profileType: 'ENTREPRENEUR' | 'INVESTOR' | 'STARTUP' | 'ADMIN' | 'PUBLIC';
  gender?: string;
  birthdate?: string;
  address?: string;
}

export interface GabonIdTokenPayload {
  sub: string; // NIP
  nip: string;
  fullName: string;
  given_name?: string;
  family_name?: string;
  email: string;
  phone?: string;
  profileType: string;
  gender?: string;
  iat: number;
  exp: number;
  iss: string;
  aud?: string;
}

export interface AuthTokens {
  accessToken: string;
  refreshToken: string;
  idToken?: string;
  expiresIn: number;
}

export interface OidcConfig {
  issuer: string;
  authorizationEndpoint: string;
  tokenEndpoint: string;
  userinfoEndpoint: string;
  jwksUri: string;
  clientId: string;
  clientSecret: string;
  redirectUri: string;
  scopes: string[];
}

// ============================================================
// IDENTITE.GA — OpenID Connect Configuration
// ============================================================
// In production: points to the real IDENTITE.GA (identite.ga)
// In development: points to local idn.ga on port 5173 (Vite)
//   with Supabase Edge Functions for OAuth endpoints
// ============================================================

// The Supabase project URL that powers IDENTITE.GA
const IDN_SUPABASE_URL =
  process.env.IDN_GA_SUPABASE_URL || 'https://jvukslcsgbihcptnkpll.supabase.co';

// The frontend URL of IDENTITE.GA (for authorization page)
const IDN_GA_URL = process.env.IDN_GA_URL || 'http://localhost:5173';

export const IDENTITE_GA_CONFIG = {
  // Frontend authorization page (React SPA with consent screen)
  issuer: IDN_GA_URL,
  authorizationEndpoint: `${IDN_GA_URL}/oauth/authorize`,

  // Supabase Edge Functions for server-to-server OAuth
  tokenEndpoint: `${IDN_SUPABASE_URL}/functions/v1/oauth-token`,
  userinfoEndpoint: `${IDN_SUPABASE_URL}/functions/v1/oauth-userinfo`,

  // Discovery & keys
  jwksUri: `${IDN_GA_URL}/.well-known/jwks.json`,
  wellKnown: `${IDN_GA_URL}/.well-known/openid-configuration`,

  // GABON BIZ client credentials
  clientId: process.env.IDN_GA_CLIENT_ID || 'gabon-biz',
  clientSecret: process.env.IDN_GA_CLIENT_SECRET || 'gabon-biz-secret-dev-2026',
  redirectUri: process.env.IDN_GA_REDIRECT_URI || 'http://localhost:3000/api/auth/callback',

  // Scopes requested by GABON BIZ
  scopes: ['openid', 'profile', 'email', 'phone', 'nip'],
};

// Backward compatibility alias
export const GABON_ID_CONFIG = IDENTITE_GA_CONFIG;

export const AUTH_CONSTANTS = {
  ACCESS_TOKEN_EXPIRY: 60 * 60, // 1 hour (aligned with IDENTITE.GA)
  REFRESH_TOKEN_EXPIRY: 30 * 24 * 60 * 60, // 30 days
  COOKIE_NAME: '__session',
  REFRESH_COOKIE_NAME: 'gabon-biz-refresh',
  PKCE_COOKIE_NAME: 'gabon-biz-pkce',
  STATE_COOKIE_NAME: 'gabon-biz-state',
  NIP_LENGTH: 14,
  RATE_LIMIT_PER_USER: 100, // req/min
  RATE_LIMIT_PER_IP: 1000, // req/min
};

export const ROLES = {
  ADMIN: 'ADMIN',
  ENTREPRENEUR: 'ENTREPRENEUR',
  INVESTOR: 'INVESTOR',
  STARTUP: 'STARTUP',
  PUBLIC: 'PUBLIC',
} as const;

export type Role = (typeof ROLES)[keyof typeof ROLES];

// Demo users for development
export const DEMO_USERS: GabonIdUser[] = [
  {
    nip: '24010112345601',
    fullName: 'Jean-Pierre Mbadinga',
    given_name: 'Jean-Pierre',
    family_name: 'Mbadinga',
    email: 'jean.mbadinga@email.ga',
    phone: '+24107123456',
    profileType: 'ENTREPRENEUR',
  },
  {
    nip: '24050565432105',
    fullName: 'Admin MENUDI',
    given_name: 'Admin',
    family_name: 'MENUDI',
    email: 'admin@menudi.gov.ga',
    phone: '+24101000001',
    profileType: 'ADMIN',
  },
  {
    nip: '24040476543204',
    fullName: 'Sophie Nguema Ndong',
    given_name: 'Sophie',
    family_name: 'Nguema Ndong',
    email: 'sophie.nguema@email.ga',
    phone: '+24106543210',
    profileType: 'INVESTOR',
  },
  {
    nip: '24030387654303',
    fullName: 'Patrick Ondo Bile',
    given_name: 'Patrick',
    family_name: 'Ondo Bile',
    email: 'patrick.ondo@email.ga',
    phone: '+24107987654',
    profileType: 'STARTUP',
  },
];
