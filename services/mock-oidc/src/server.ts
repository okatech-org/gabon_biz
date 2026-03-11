// GABON BIZ — Mock OIDC Provider (simulates GABON ID)
// This server provides OpenID Connect endpoints for local development

import express from 'express';
import cors from 'cors';
import crypto from 'crypto';
import {
  DEMO_USERS,
  GABON_ID_CONFIG,
  AUTH_CONSTANTS,
  createMockJwt,
  type GabonIdUser,
} from '@gabon-biz/shared/src/auth';

const app = express();
const PORT = 4000;
const JWT_SECRET = 'gabon-id-mock-secret-dev-only';

// Store authorization codes temporarily
const authCodes = new Map<string, { user: GabonIdUser; redirectUri: string; expiresAt: number }>();

app.use(cors({ origin: true, credentials: true }));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// ============================================
// OIDC Discovery Endpoint
// ============================================
app.get('/.well-known/openid-configuration', (_req, res) => {
  const issuer = `http://localhost:${PORT}`;
  res.json({
    issuer,
    authorization_endpoint: `${issuer}/authorize`,
    token_endpoint: `${issuer}/token`,
    userinfo_endpoint: `${issuer}/userinfo`,
    jwks_uri: `${issuer}/.well-known/jwks.json`,
    response_types_supported: ['code'],
    subject_types_supported: ['public'],
    id_token_signing_alg_values_supported: ['HS256'],
    scopes_supported: ['openid', 'profile', 'email', 'phone', 'nip'],
    claims_supported: ['sub', 'nip', 'fullName', 'email', 'phone', 'profileType'],
    grant_types_supported: ['authorization_code', 'refresh_token'],
  });
});

// ============================================
// JWKS Endpoint (placeholder for dev)
// ============================================
app.get('/.well-known/jwks.json', (_req, res) => {
  res.json({ keys: [] }); // HMAC doesn't use JWKS, but endpoint must exist
});

// ============================================
// Authorization Endpoint
// Displays a login page with demo accounts
// ============================================
app.get('/authorize', (req, res) => {
  const { redirect_uri, state, client_id } = req.query;

  if (client_id !== GABON_ID_CONFIG.clientId) {
    return res.status(400).json({ error: 'invalid_client', message: 'Client ID inconnu' });
  }

  // Render a simple HTML login page with demo user selection
  const html = `
<!DOCTYPE html>
<html lang="fr">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>GABON ID — Connexion</title>
  <style>
    * { box-sizing: border-box; margin: 0; padding: 0; }
    body {
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
      background: linear-gradient(135deg, #009E49 0%, #FFD100 50%, #3A75C4 100%);
      min-height: 100vh;
      display: flex;
      align-items: center;
      justify-content: center;
    }
    .container {
      background: white;
      border-radius: 16px;
      padding: 40px;
      max-width: 420px;
      width: 90%;
      box-shadow: 0 20px 60px rgba(0,0,0,0.3);
    }
    .logo { text-align: center; margin-bottom: 24px; }
    .logo h1 { font-size: 28px; color: #009E49; }
    .logo p { color: #666; font-size: 14px; margin-top: 4px; }
    h2 { font-size: 18px; color: #333; margin-bottom: 16px; text-align: center; }
    .subtitle { text-align: center; color: #888; font-size: 13px; margin-bottom: 20px; }
    .user-card {
      display: flex;
      align-items: center;
      gap: 12px;
      padding: 14px 16px;
      border: 2px solid #E8E8E8;
      border-radius: 10px;
      margin-bottom: 10px;
      cursor: pointer;
      transition: all 0.2s;
    }
    .user-card:hover { border-color: #009E49; background: #F0FFF4; }
    .avatar {
      width: 42px; height: 42px;
      border-radius: 50%;
      background: #E67E22;
      color: white;
      display: flex;
      align-items: center;
      justify-content: center;
      font-weight: bold;
      font-size: 16px;
    }
    .user-info h3 { font-size: 14px; color: #333; }
    .user-info p { font-size: 12px; color: #888; }
    .badge {
      margin-left: auto;
      padding: 3px 8px;
      border-radius: 4px;
      font-size: 11px;
      font-weight: 600;
    }
    .badge-ENTREPRENEUR { background: #FFF3E0; color: #E65100; }
    .badge-ADMIN { background: #E8F5E9; color: #2E7D32; }
    .badge-INVESTOR { background: #E3F2FD; color: #1565C0; }
    .badge-STARTUP { background: #F3E5F5; color: #7B1FA2; }
    .footer { text-align: center; margin-top: 20px; font-size: 12px; color: #AAA; }
  </style>
</head>
<body>
  <div class="container">
    <div class="logo">
      <h1>🇬🇦 GABON ID</h1>
      <p>Système National d'Identité Digitale</p>
    </div>
    <h2>Choisissez un compte de démonstration</h2>
    <p class="subtitle">Cliquez sur un profil pour vous connecter à GABON BIZ</p>
    ${DEMO_USERS.map(
      (u) => `
      <div class="user-card" onclick="login('${u.nip}')">
        <div class="avatar">${u.fullName
          .split(' ')
          .map((n) => n[0])
          .join('')
          .slice(0, 2)}</div>
        <div class="user-info">
          <h3>${u.fullName}</h3>
          <p>NIP: ${u.nip}</p>
        </div>
        <span class="badge badge-${u.profileType}">${u.profileType}</span>
      </div>`,
    ).join('')}
    <p class="footer">Environnement de développement — Mock GABON ID</p>
  </div>
  <script>
    function login(nip) {
      const params = new URLSearchParams({
        nip,
        redirect_uri: '${redirect_uri}',
        state: '${state || ''}',
      });
      window.location.href = '/authorize/callback?' + params.toString();
    }
  </script>
</body>
</html>`;

  res.setHeader('Content-Type', 'text/html');
  res.send(html);
});

// ============================================
// Authorization Callback (after user selects account)
// Generates an authorization code and redirects
// ============================================
app.get('/authorize/callback', (req, res) => {
  const { nip, redirect_uri, state } = req.query as Record<string, string>;

  const user = DEMO_USERS.find((u) => u.nip === nip);
  if (!user) {
    return res.status(400).json({ error: 'invalid_user', message: 'NIP inconnu' });
  }

  // Generate authorization code
  const code = crypto.randomBytes(32).toString('hex');
  authCodes.set(code, {
    user,
    redirectUri: redirect_uri,
    expiresAt: Date.now() + 5 * 60 * 1000, // 5 minutes
  });

  // Redirect back to the client with the code
  const redirectUrl = new URL(redirect_uri);
  redirectUrl.searchParams.set('code', code);
  if (state) redirectUrl.searchParams.set('state', state);

  res.redirect(redirectUrl.toString());
});

// ============================================
// Token Endpoint
// Exchanges authorization code for tokens
// ============================================
app.post('/token', (req, res) => {
  const { grant_type, code, refresh_token, client_id, client_secret } = req.body;

  // Verify client credentials
  if (client_id !== GABON_ID_CONFIG.clientId || client_secret !== GABON_ID_CONFIG.clientSecret) {
    return res.status(401).json({ error: 'invalid_client' });
  }

  if (grant_type === 'authorization_code') {
    const authCode = authCodes.get(code);
    if (!authCode || authCode.expiresAt < Date.now()) {
      authCodes.delete(code);
      return res.status(400).json({ error: 'invalid_grant', message: 'Code expiré ou invalide' });
    }

    // Delete used code
    authCodes.delete(code);

    // Generate tokens
    const accessToken = createMockJwt(
      authCode.user,
      JWT_SECRET,
      AUTH_CONSTANTS.ACCESS_TOKEN_EXPIRY,
    );
    const newRefreshToken = createMockJwt(
      authCode.user,
      JWT_SECRET,
      AUTH_CONSTANTS.REFRESH_TOKEN_EXPIRY,
    );

    return res.json({
      access_token: accessToken,
      token_type: 'Bearer',
      expires_in: AUTH_CONSTANTS.ACCESS_TOKEN_EXPIRY,
      refresh_token: newRefreshToken,
      id_token: accessToken, // In mock, id_token = access_token
    });
  }

  if (grant_type === 'refresh_token') {
    // Decode the refresh token to get the user
    // eslint-disable-next-line @typescript-eslint/no-var-requires
    const { verifyMockJwt: verifyRefresh } = require('@gabon-biz/shared/src/auth/jwt-utils');
    const payload = verifyRefresh(refresh_token, JWT_SECRET);
    if (!payload) {
      return res.status(400).json({ error: 'invalid_grant', message: 'Refresh token invalide' });
    }

    const user = DEMO_USERS.find((u) => u.nip === payload.nip);
    if (!user) {
      return res.status(400).json({ error: 'invalid_grant' });
    }

    const accessToken = createMockJwt(user, JWT_SECRET, AUTH_CONSTANTS.ACCESS_TOKEN_EXPIRY);
    const newRefreshToken = createMockJwt(user, JWT_SECRET, AUTH_CONSTANTS.REFRESH_TOKEN_EXPIRY);

    return res.json({
      access_token: accessToken,
      token_type: 'Bearer',
      expires_in: AUTH_CONSTANTS.ACCESS_TOKEN_EXPIRY,
      refresh_token: newRefreshToken,
    });
  }

  return res.status(400).json({ error: 'unsupported_grant_type' });
});

// ============================================
// UserInfo Endpoint
// Returns user claims from the access token
// ============================================
app.get('/userinfo', (req, res) => {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ error: 'invalid_token' });
  }

  const token = authHeader.substring(7);
  // eslint-disable-next-line @typescript-eslint/no-var-requires
  const { verifyMockJwt: verifyToken } = require('@gabon-biz/shared/src/auth/jwt-utils');
  const payload = verifyToken(token, JWT_SECRET);

  if (!payload) {
    return res.status(401).json({ error: 'invalid_token', message: 'Token invalide ou expiré' });
  }

  res.json({
    sub: payload.nip,
    nip: payload.nip,
    fullName: payload.fullName,
    email: payload.email,
    phone: payload.phone,
    profileType: payload.profileType,
  });
});

// ============================================
// Start the server
// ============================================
app.listen(PORT, () => {
  console.log(`\n🇬🇦 Mock GABON ID (OIDC Provider) running on http://localhost:${PORT}`);
  console.log(`📋 Discovery: http://localhost:${PORT}/.well-known/openid-configuration`);
  console.log(`🔐 Authorize: http://localhost:${PORT}/authorize`);
  console.log(`\n👥 Demo accounts:`);
  DEMO_USERS.forEach((u) => {
    console.log(`   ${u.profileType.padEnd(12)} — ${u.fullName} (${u.nip})`);
  });
  console.log('');
});
