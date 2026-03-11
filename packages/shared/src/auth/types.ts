// GABON BIZ — Auth Types & Constants
// Shared across backend (NestJS) and frontend (Next.js)

export interface GabonIdUser {
  nip: string; // 14 chars, the subject identifier
  fullName: string;
  email: string;
  phone?: string;
  cnieNumber?: string;
  profileType: 'ENTREPRENEUR' | 'INVESTOR' | 'STARTUP' | 'ADMIN' | 'PUBLIC';
}

export interface GabonIdTokenPayload {
  sub: string; // NIP
  nip: string;
  fullName: string;
  email: string;
  phone?: string;
  profileType: string;
  iat: number;
  exp: number;
  iss: string;
}

export interface AuthTokens {
  accessToken: string;
  refreshToken: string;
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

// GABON ID OIDC configuration
export const GABON_ID_CONFIG = {
  // In production, these will point to the real GABON ID server
  // In development, they point to our mock OIDC provider
  issuer: process.env.GABON_ID_ISSUER || 'http://localhost:4000',
  authorizationEndpoint: '/authorize',
  tokenEndpoint: '/token',
  userinfoEndpoint: '/userinfo',
  jwksUri: '/.well-known/jwks.json',
  wellKnown: '/.well-known/openid-configuration',
  clientId: process.env.GABON_ID_CLIENT_ID || 'gabon-biz-client',
  clientSecret: process.env.GABON_ID_CLIENT_SECRET || 'gabon-biz-secret-dev',
  redirectUri: process.env.GABON_ID_REDIRECT_URI || 'http://localhost:3000/auth/callback',
  scopes: ['openid', 'profile', 'email', 'phone', 'nip'],
};

export const AUTH_CONSTANTS = {
  ACCESS_TOKEN_EXPIRY: 15 * 60, // 15 minutes in seconds
  REFRESH_TOKEN_EXPIRY: 7 * 24 * 60 * 60, // 7 days in seconds
  COOKIE_NAME: 'gabon-biz-session',
  REFRESH_COOKIE_NAME: 'gabon-biz-refresh',
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
    email: 'jean.mbadinga@email.ga',
    phone: '+24107123456',
    profileType: 'ENTREPRENEUR',
  },
  {
    nip: '24050565432105',
    fullName: 'Admin MENUDI',
    email: 'admin@menudi.gov.ga',
    phone: '+24101000001',
    profileType: 'ADMIN',
  },
  {
    nip: '24040476543204',
    fullName: 'Sophie Nguema Ndong',
    email: 'sophie.nguema@email.ga',
    phone: '+24106543210',
    profileType: 'INVESTOR',
  },
  {
    nip: '24030387654303',
    fullName: 'Patrick Ondo Bile',
    email: 'patrick.ondo@email.ga',
    phone: '+24107987654',
    profileType: 'STARTUP',
  },
];
