// GABON BIZ — Mock IDENTITE.GA Provider
// Simulates the IDENTITE.GA OAuth 2.0 / OIDC endpoints for local development
// Implements: Discovery, Authorization (with consent), Token (with PKCE), UserInfo
// This replaces the need to run the full idn.ga project locally

import express from 'express';
import cors from 'cors';
import crypto from 'crypto';
import {
  DEMO_USERS,
  IDENTITE_GA_CONFIG,
  AUTH_CONSTANTS,
  createMockJwt,
  type GabonIdUser,
} from '@gabon-biz/shared/src/auth';

const app = express();
const PORT = 4000;
const JWT_SECRET = 'identite-ga-mock-secret-dev-only';

// ── Storage ────────────────────────────────────────────────────
interface AuthCodeEntry {
  user: GabonIdUser;
  redirectUri: string;
  codeChallenge?: string;
  codeChallengeMethod?: string;
  scopes: string[];
  expiresAt: number;
}

const authCodes = new Map<string, AuthCodeEntry>();
const consents = new Map<string, string[]>(); // nip → granted scopes

// Runtime user store — mutable copy of DEMO_USERS
const runtimeUsers: GabonIdUser[] = [...DEMO_USERS];

app.use(cors({ origin: true, credentials: true }));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// ============================================================
// OIDC Discovery Endpoint
// ============================================================
app.get('/.well-known/openid-configuration', (_req, res) => {
  const issuer = `http://localhost:${PORT}`;
  res.json({
    issuer,
    authorization_endpoint: `${issuer}/oauth/authorize`,
    token_endpoint: `${issuer}/functions/v1/oauth-token`,
    userinfo_endpoint: `${issuer}/functions/v1/oauth-userinfo`,
    jwks_uri: `${issuer}/.well-known/jwks.json`,
    response_types_supported: ['code'],
    subject_types_supported: ['public'],
    id_token_signing_alg_values_supported: ['HS256'],
    scopes_supported: ['openid', 'profile', 'email', 'phone', 'nip', 'verify', 'address', 'diplomas'],
    claims_supported: [
      'sub', 'nip', 'fullName', 'given_name', 'family_name',
      'email', 'phone', 'phone_number', 'profileType', 'gender', 'birthdate',
    ],
    grant_types_supported: ['authorization_code', 'refresh_token'],
    code_challenge_methods_supported: ['S256', 'plain'],
  });
});

// ============================================================
// JWKS Endpoint (placeholder for dev)
// ============================================================
app.get('/.well-known/jwks.json', (_req, res) => {
  res.json({ keys: [] }); // HMAC doesn't use JWKS, but endpoint must exist
});

// ============================================================
// Authorization Endpoint — /oauth/authorize
// Mimics IDENTITE.GA's authorization page with consent screen
// ============================================================
app.get('/oauth/authorize', (req, res) => {
  const {
    redirect_uri,
    state,
    client_id,
    scope,
    code_challenge,
    code_challenge_method,
    response_type,
  } = req.query as Record<string, string>;

  if (response_type !== 'code') {
    return res.status(400).json({ error: 'unsupported_response_type' });
  }

  if (client_id !== IDENTITE_GA_CONFIG.clientId) {
    return res.status(400).json({ error: 'invalid_client', message: 'Client ID inconnu' });
  }

  const requestedScopes = (scope || 'openid').split(' ');

  // Render the IDENTITE.GA login page (realistic NIP + password form)
  const html = `
<!DOCTYPE html>
<html lang="fr">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>IDENTITE.GA — Connexion</title>
  <style>
    * { box-sizing: border-box; margin: 0; padding: 0; }
    body {
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
      background: linear-gradient(135deg, #003D1F 0%, #005528 30%, #009E49 70%, #00C05A 100%);
      min-height: 100vh;
      display: flex;
      align-items: center;
      justify-content: center;
      padding: 20px;
    }
    .page-layout {
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 20px;
      width: 100%;
      max-width: 440px;
    }
    .container {
      background: white;
      border-radius: 20px;
      padding: 36px 32px 28px;
      width: 100%;
      box-shadow: 0 24px 80px rgba(0,0,0,0.35);
    }
    .logo { text-align: center; margin-bottom: 24px; }
    .logo .shield {
      font-size: 44px;
      margin-bottom: 8px;
      filter: drop-shadow(0 2px 8px rgba(0,0,0,0.15));
    }
    .logo h1 {
      font-size: 28px;
      font-weight: 800;
      color: #009E49;
      letter-spacing: 2px;
    }
    .logo .subtitle {
      color: #888;
      font-size: 12px;
      margin-top: 6px;
      letter-spacing: 0.5px;
      text-transform: uppercase;
    }
    .divider {
      height: 1px;
      background: linear-gradient(90deg, transparent, #E0E0E0, transparent);
      margin: 0 0 20px;
    }
    .app-badge {
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 8px;
      margin-bottom: 20px;
      padding: 10px 16px;
      background: #FFFBF0;
      border: 1px solid #FFE0A3;
      border-radius: 10px;
    }
    .app-badge .dot { width: 8px; height: 8px; border-radius: 50%; background: #E67E22; }
    .app-badge span { font-size: 13px; color: #B8860B; }
    .app-badge strong { color: #E67E22; }
    .form-title {
      font-size: 15px;
      color: #333;
      text-align: center;
      margin-bottom: 20px;
      line-height: 1.5;
    }
    .field { margin-bottom: 16px; }
    .field label {
      display: block;
      font-size: 12px;
      font-weight: 600;
      color: #555;
      margin-bottom: 6px;
      text-transform: uppercase;
      letter-spacing: 0.5px;
    }
    .field input {
      width: 100%;
      padding: 12px 14px;
      font-size: 15px;
      border: 2px solid #E8E8E8;
      border-radius: 10px;
      outline: none;
      transition: all 0.2s;
      font-family: inherit;
    }
    .field input:focus {
      border-color: #009E49;
      box-shadow: 0 0 0 3px rgba(0,158,73,0.12);
    }
    .field input::placeholder {
      color: #C0C0C0;
      font-size: 13px;
    }
    .field .hint {
      font-size: 11px;
      color: #AAA;
      margin-top: 4px;
    }
    .error-msg {
      display: none;
      padding: 10px 14px;
      background: #FFF5F5;
      border: 1px solid #FED7D7;
      border-radius: 8px;
      color: #C53030;
      font-size: 13px;
      margin-bottom: 16px;
      text-align: center;
    }
    .error-msg.show { display: block; }
    .submit-btn {
      width: 100%;
      padding: 13px;
      font-size: 15px;
      font-weight: 700;
      color: white;
      background: linear-gradient(135deg, #009E49, #007A39);
      border: none;
      border-radius: 10px;
      cursor: pointer;
      transition: all 0.2s;
      letter-spacing: 0.5px;
    }
    .submit-btn:hover { transform: translateY(-1px); box-shadow: 0 6px 20px rgba(0,158,73,0.35); }
    .submit-btn:active { transform: translateY(0); }
    .submit-btn:disabled {
      opacity: 0.6;
      cursor: wait;
      transform: none;
      box-shadow: none;
    }
    .deny-link {
      display: block;
      width: 100%;
      padding: 10px;
      margin-top: 12px;
      text-align: center;
      font-size: 13px;
      color: #999;
      text-decoration: none;
      border-radius: 8px;
      transition: all 0.15s;
    }
    .deny-link:hover { background: #FFF5F5; color: #E53E3E; }
    .scopes-mini {
      margin-top: 16px;
      padding-top: 16px;
      border-top: 1px solid #F0F0F0;
    }
    .scopes-mini summary {
      font-size: 11px;
      color: #AAA;
      cursor: pointer;
      text-align: center;
    }
    .scopes-mini .scope-list {
      margin-top: 8px;
      display: flex;
      flex-wrap: wrap;
      gap: 4px;
      justify-content: center;
    }
    .scopes-mini .scope-tag {
      padding: 2px 8px;
      background: #F0FFF4;
      border: 1px solid #C8E6C9;
      border-radius: 4px;
      font-size: 10px;
      color: #2E7D32;
    }
    /* --- Test credentials hint --- */
    .test-hint {
      background: rgba(255,255,255,0.12);
      backdrop-filter: blur(8px);
      border: 1px solid rgba(255,255,255,0.2);
      border-radius: 12px;
      padding: 14px 18px;
      width: 100%;
      color: white;
    }
    .test-hint summary {
      font-size: 11px;
      cursor: pointer;
      opacity: 0.8;
      text-align: center;
      letter-spacing: 0.3px;
    }
    .test-hint table {
      width: 100%;
      margin-top: 10px;
      border-collapse: collapse;
    }
    .test-hint th {
      text-align: left;
      font-size: 10px;
      color: rgba(255,255,255,0.6);
      text-transform: uppercase;
      letter-spacing: 0.5px;
      padding-bottom: 6px;
    }
    .test-hint td {
      font-size: 12px;
      padding: 4px 0;
      color: rgba(255,255,255,0.9);
      font-family: 'SF Mono', 'Menlo', monospace;
    }
    .test-hint .profile-badge {
      font-family: inherit;
      padding: 1px 6px;
      border-radius: 4px;
      font-size: 10px;
      font-weight: 600;
    }
    .badge-ENTREPRENEUR { background: rgba(230,81,0,0.2); color: #FFB74D; }
    .badge-ADMIN { background: rgba(46,125,50,0.2); color: #81C784; }
    .badge-INVESTOR { background: rgba(21,101,192,0.2); color: #64B5F6; }
    .badge-STARTUP { background: rgba(123,31,162,0.2); color: #CE93D8; }
  </style>
</head>
<body>
  <div class="page-layout">
    <div class="container">
      <div class="logo">
        <div class="shield">&#x1F6E1;</div>
        <h1>IDENTITE.GA</h1>
        <div class="subtitle">Identit&eacute; Num&eacute;rique du Gabon</div>
      </div>

      <div class="divider"></div>

      <div class="app-badge">
        <div class="dot"></div>
        <span>Connexion &agrave; <strong>GABON BIZ</strong></span>
      </div>

      <p class="form-title">
        Entrez vos identifiants <strong>IDENTITE.GA</strong> pour acc&eacute;der &agrave; GABON BIZ
      </p>

      <div id="error" class="error-msg"></div>

      <form id="loginForm" onsubmit="handleLogin(event)">
        <div class="field">
          <label for="nip">Num&eacute;ro d'Identification Personnel (NIP)</label>
          <input
            type="text"
            id="nip"
            name="nip"
            placeholder="Ex: 24010112345601"
            autocomplete="username"
            inputmode="numeric"
            maxlength="14"
            required
          />
          <div class="hint">14 chiffres — votre identifiant national unique</div>
        </div>
        <div class="field">
          <label for="password">Mot de passe</label>
          <input
            type="password"
            id="password"
            name="password"
            placeholder="Votre mot de passe"
            autocomplete="current-password"
            required
          />
        </div>
        <button type="submit" class="submit-btn" id="submitBtn">
          Se connecter
        </button>
      </form>

      <!-- Link to real IDENTITE.GA for account creation -->
      <div style="text-align:center;margin-top:14px">
        <a href="https://identite.ga/onboarding/profile" target="_blank" rel="noopener" style="font-size:13px;color:#009E49;text-decoration:none;font-weight:600">
          Pas encore de compte ? Cr&eacute;er un compte sur IDENTITE.GA &rarr;
        </a>
        <div style="font-size:11px;color:#AAA;margin-top:4px">
          Vous serez redirig&eacute; vers le portail d'identit&eacute; nationale
        </div>
      </div>

      <a class="deny-link" href="${redirect_uri}?error=access_denied&error_description=L'utilisateur+a+refus%C3%A9+l'acc%C3%A8s${state ? '&state=' + state : ''}">
        Annuler et revenir &agrave; GABON BIZ
      </a>

      <details class="scopes-mini">
        <summary>Permissions demand&eacute;es par GABON BIZ</summary>
        <div class="scope-list">
          ${requestedScopes.map((s) => {
            const labels: Record<string, string> = {
              openid: 'Identifiant',
              profile: 'Profil',
              email: 'Email',
              phone: 'T\\u00e9l\\u00e9phone',
              nip: 'NIP',
              verify: 'V\\u00e9rification',
            };
            return '<span class="scope-tag">' + (labels[s] || s) + '</span>';
          }).join('')}
        </div>
      </details>
    </div>

    <details class="test-hint">
      <summary>&#x1F9EA; Comptes de test (environnement de d&eacute;veloppement)</summary>
      <table>
        <tr><th>NIP</th><th>Nom</th><th>Profil</th></tr>
        ${runtimeUsers.map((u) => '<tr>'
          + '<td>' + u.nip + '</td>'
          + '<td style="font-family:inherit">' + u.fullName + '</td>'
          + '<td><span class="profile-badge badge-' + u.profileType + '">' + u.profileType + '</span></td>'
          + '</tr>'
        ).join('')}
      </table>
      <p style="margin-top:8px;font-size:11px;opacity:0.7;font-family:inherit;text-align:center">
        Mot de passe : <strong>gabon2026</strong> (tous les comptes)
      </p>
    </details>
  </div>

  <script>
    const MOCK_PASSWORD = 'gabon2026';

    function handleLogin(e) {
      e.preventDefault();
      const nip = document.getElementById('nip').value.trim();
      const password = document.getElementById('password').value;
      const errorEl = document.getElementById('error');
      const btn = document.getElementById('submitBtn');

      errorEl.classList.remove('show');

      if (!nip || nip.length !== 14) {
        errorEl.textContent = 'Le NIP doit contenir exactement 14 chiffres.';
        errorEl.classList.add('show');
        return;
      }

      if (password !== MOCK_PASSWORD) {
        errorEl.textContent = 'Mot de passe incorrect.';
        errorEl.classList.add('show');
        return;
      }

      btn.disabled = true;
      btn.textContent = 'Connexion en cours...';

      const params = new URLSearchParams({
        nip,
        redirect_uri: '${redirect_uri}',
        state: '${state || ''}',
        code_challenge: '${code_challenge || ''}',
        code_challenge_method: '${code_challenge_method || ''}',
        scope: '${scope || 'openid'}',
      });
      window.location.href = '/oauth/authorize/callback?' + params.toString();
    }

    // Auto-focus NIP field
    document.getElementById('nip').focus();
  </script>
</body>
</html>`;

  res.setHeader('Content-Type', 'text/html');
  res.send(html);
});


// ============================================================
// Authorization Callback (after user selects account + grants consent)
// Generates an authorization code and redirects back to GABON BIZ
// ============================================================
app.get('/oauth/authorize/callback', (req, res) => {
  const {
    nip,
    redirect_uri,
    state,
    code_challenge,
    code_challenge_method,
    scope,
  } = req.query as Record<string, string>;

  const user = runtimeUsers.find((u) => u.nip === nip);
  if (!user) {
    return res.status(400).json({ error: 'invalid_user', message: 'NIP inconnu' });
  }

  const scopes = (scope || 'openid').split(' ');

  // Save consent
  consents.set(nip, scopes);

  // Generate authorization code
  const code = crypto.randomBytes(32).toString('hex');
  authCodes.set(code, {
    user,
    redirectUri: redirect_uri,
    codeChallenge: code_challenge || undefined,
    codeChallengeMethod: code_challenge_method || undefined,
    scopes,
    expiresAt: Date.now() + 10 * 60 * 1000, // 10 minutes
  });

  // Redirect back to GABON BIZ with the code
  const redirectUrl = new URL(redirect_uri);
  redirectUrl.searchParams.set('code', code);
  if (state) redirectUrl.searchParams.set('state', state);

  res.redirect(redirectUrl.toString());
});

// ============================================================
// Token Endpoint — /functions/v1/oauth-token
// Matches the Supabase Edge Function path that GABON BIZ calls
// Supports PKCE validation
// ============================================================
app.post('/functions/v1/oauth-token', (req, res) => {
  const {
    grant_type,
    code,
    refresh_token,
    client_id,
    client_secret,
    code_verifier,
  } = req.body;

  // Verify client credentials
  if (client_id !== IDENTITE_GA_CONFIG.clientId || client_secret !== IDENTITE_GA_CONFIG.clientSecret) {
    return res.status(401).json({ error: 'invalid_client' });
  }

  // ── Authorization Code Grant ────────────────────────────────
  if (grant_type === 'authorization_code') {
    const authCode = authCodes.get(code);
    if (!authCode || authCode.expiresAt < Date.now()) {
      authCodes.delete(code);
      return res.status(400).json({ error: 'invalid_grant', message: 'Code expiré ou invalide' });
    }

    // PKCE Validation
    if (authCode.codeChallenge) {
      if (!code_verifier) {
        return res.status(400).json({ error: 'invalid_request', message: 'code_verifier requis (PKCE)' });
      }

      let computedChallenge: string;
      if (authCode.codeChallengeMethod === 'S256') {
        const hash = crypto.createHash('sha256').update(code_verifier).digest('base64url');
        computedChallenge = hash;
      } else {
        // plain
        computedChallenge = code_verifier;
      }

      if (computedChallenge !== authCode.codeChallenge) {
        authCodes.delete(code);
        return res.status(400).json({
          error: 'invalid_grant',
          message: 'PKCE code_verifier invalide',
        });
      }
    }

    // Delete used code (one-time use)
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
      scope: authCode.scopes.join(' '),
    });
  }

  // ── Refresh Token Grant ─────────────────────────────────────
  if (grant_type === 'refresh_token') {
    // eslint-disable-next-line @typescript-eslint/no-var-requires
    const { verifyMockJwt: verifyRefresh } = require('@gabon-biz/shared/src/auth/jwt-utils');
    const payload = verifyRefresh(refresh_token, JWT_SECRET);
    if (!payload) {
      return res.status(400).json({ error: 'invalid_grant', message: 'Refresh token invalide' });
    }

    const user = runtimeUsers.find((u) => u.nip === payload.nip);
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

// ============================================================
// UserInfo Endpoint — /functions/v1/oauth-userinfo
// Matches the Supabase Edge Function path that GABON BIZ calls
// Returns OIDC-standard claims + custom claims (nip, profileType)
// ============================================================
app.get('/functions/v1/oauth-userinfo', (req, res) => {
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

  // Find the full user record for additional fields
  const user = runtimeUsers.find((u) => u.nip === payload.nip);

  // Return OIDC-standard + custom claims
  res.json({
    sub: payload.nip,
    nip: payload.nip,
    fullName: payload.fullName || (user ? user.fullName : ''),
    given_name: user?.given_name || payload.fullName?.split(' ')[0],
    family_name: user?.family_name || payload.fullName?.split(' ').slice(1).join(' '),
    email: payload.email,
    email_verified: true,
    phone_number: payload.phone || user?.phone,
    phone_number_verified: true,
    profileType: payload.profileType || user?.profileType,
    gender: user?.gender || 'unknown',
    updated_at: Math.floor(Date.now() / 1000),
  });
});

// ============================================================
// Legacy endpoints (backward compatibility during transition)
// Redirect old paths → new IDENTITE.GA-compatible paths
// ============================================================
app.get('/authorize', (req, res) => {
  const qs = new URLSearchParams(req.query as Record<string, string>).toString();
  res.redirect(`/oauth/authorize?${qs}`);
});
app.post('/token', (req, res) => {
  // Re-route internally to the new endpoint handler
  res.redirect(307, '/functions/v1/oauth-token');
});
app.get('/userinfo', (req, res) => {
  res.redirect('/functions/v1/oauth-userinfo');
});

// ============================================================
// Start the server
// ============================================================
app.listen(PORT, () => {
  console.log(`\n\u{1F6E1}\uFE0F  Mock IDENTITE.GA (OIDC Provider) running on http://localhost:${PORT}`);
  console.log(`\u{1F4CB} Discovery: http://localhost:${PORT}/.well-known/openid-configuration`);
  console.log(`\u{1F510} Authorize: http://localhost:${PORT}/oauth/authorize`);
  console.log(`\u{1F4E6} Token:     http://localhost:${PORT}/functions/v1/oauth-token`);
  console.log(`\u{1F464} UserInfo:  http://localhost:${PORT}/functions/v1/oauth-userinfo`);
  console.log(`\n\u{1F464} Demo accounts:`);
  DEMO_USERS.forEach((u) => {
    console.log(`   ${u.profileType.padEnd(12)} \u2014 ${u.fullName} (${u.nip})`);
  });
  console.log('');
});
