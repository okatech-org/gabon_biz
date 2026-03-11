// GABON BIZ — JWT Utilities (shared between backend and mock OIDC)

import { AUTH_CONSTANTS } from './types';
import type { GabonIdTokenPayload, GabonIdUser } from './types';

// Simple base64url encode/decode (no external dependencies)
export function base64UrlEncode(str: string): string {
  return Buffer.from(str)
    .toString('base64')
    .replace(/\+/g, '-')
    .replace(/\//g, '_')
    .replace(/=+$/, '');
}

export function base64UrlDecode(str: string): string {
  str = str.replace(/-/g, '+').replace(/_/g, '/');
  while (str.length % 4) str += '=';
  return Buffer.from(str, 'base64').toString();
}

// Create a simple HMAC-based JWT (for development/mock only)
// In production, GABON ID will use RS256 with proper key pairs
export function createMockJwt(
  user: GabonIdUser,
  secret: string,
  expiresInSeconds: number = AUTH_CONSTANTS.ACCESS_TOKEN_EXPIRY,
): string {
  const header = { alg: 'HS256', typ: 'JWT' };
  const now = Math.floor(Date.now() / 1000);

  const payload: GabonIdTokenPayload = {
    sub: user.nip,
    nip: user.nip,
    fullName: user.fullName,
    email: user.email,
    phone: user.phone,
    profileType: user.profileType,
    iat: now,
    exp: now + expiresInSeconds,
    iss: 'gabon-id-mock',
  };

  const headerB64 = base64UrlEncode(JSON.stringify(header));
  const payloadB64 = base64UrlEncode(JSON.stringify(payload));
  const data = `${headerB64}.${payloadB64}`;

  // Simple HMAC signature using Node.js crypto
  // eslint-disable-next-line @typescript-eslint/no-var-requires
  const crypto = require('crypto');
  const signature = crypto
    .createHmac('sha256', secret)
    .update(data)
    .digest('base64')
    .replace(/\+/g, '-')
    .replace(/\//g, '_')
    .replace(/=+$/, '');

  return `${data}.${signature}`;
}

// Decode JWT payload without verification (use for reading claims only)
export function decodeJwtPayload(token: string): GabonIdTokenPayload | null {
  try {
    const parts = token.split('.');
    if (parts.length !== 3) return null;
    const payload = JSON.parse(base64UrlDecode(parts[1]));
    return payload as GabonIdTokenPayload;
  } catch {
    return null;
  }
}

// Verify mock JWT (HMAC-SHA256, for development only)
export function verifyMockJwt(token: string, secret: string): GabonIdTokenPayload | null {
  try {
    const parts = token.split('.');
    if (parts.length !== 3) return null;

    // Verify signature
    // eslint-disable-next-line @typescript-eslint/no-var-requires
    const crypto = require('crypto');
    const data = `${parts[0]}.${parts[1]}`;
    const expectedSig = crypto
      .createHmac('sha256', secret)
      .update(data)
      .digest('base64')
      .replace(/\+/g, '-')
      .replace(/\//g, '_')
      .replace(/=+$/, '');

    if (parts[2] !== expectedSig) return null;

    // Decode and check expiry
    const payload = JSON.parse(base64UrlDecode(parts[1])) as GabonIdTokenPayload;
    const now = Math.floor(Date.now() / 1000);
    if (payload.exp && payload.exp < now) return null;

    return payload;
  } catch {
    return null;
  }
}
