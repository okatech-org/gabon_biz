// GABON BIZ — Login Page
// "Se connecter avec IDENTITE.GA" — like Sign in with Google/Apple
'use client';

import { useSearchParams } from 'next/navigation';
import { Suspense, useState } from 'react';

// ── Error messages mapping ─────────────────────────────────────
const ERROR_MESSAGES: Record<string, string> = {
  no_code: "Aucun code d'autorisation reçu. Veuillez réessayer.",
  state_mismatch: 'Erreur de sécurité (CSRF). Veuillez réessayer.',
  pkce_missing: 'Session expirée. Veuillez réessayer.',
  token_exchange_failed: "Échec de l'authentification. Veuillez réessayer.",
  access_denied: "Vous avez refusé l'accès. Connectez-vous pour continuer.",
  consent_denied: "Vous avez refusé les permissions. L'accès est nécessaire pour utiliser GABON BIZ.",
};

function LoginContent() {
  const searchParams = useSearchParams();
  const error = searchParams.get('error');
  const redirect = searchParams.get('redirect');
  const [isLoading, setIsLoading] = useState(false);

  const errorMessage = error
    ? ERROR_MESSAGES[error] || 'Erreur de connexion. Veuillez réessayer.'
    : null;

  const loginHref = `/api/auth/login${redirect ? `?redirect=${encodeURIComponent(redirect)}` : ''}`;

  return (
    <div style={styles.container}>
      {/* Background decoration */}
      <div style={styles.bgDecor1} />
      <div style={styles.bgDecor2} />

      <div style={styles.card}>
        {/* GABON BIZ Logo */}
        <div style={styles.logo}>
          <div style={styles.logoBadge}>GB</div>
          <h1 style={styles.logoText}>
            GABON <span style={{ color: '#E67E22' }}>BIZ</span>
          </h1>
        </div>

        <h2 style={styles.title}>Bienvenue</h2>
        <p style={styles.subtitle}>
          Accédez à l&apos;écosystème économique numérique du Gabon en vous connectant avec votre
          identité nationale.
        </p>

        {/* Error display */}
        {errorMessage && <div style={styles.error}>{errorMessage}</div>}

        {/* Separator */}
        <div style={styles.separator}>
          <div style={styles.separatorLine} />
          <span style={styles.separatorText}>Connexion sécurisée</span>
          <div style={styles.separatorLine} />
        </div>

        {/* ── IDENTITE.GA Login Button ────────────────────── */}
        <a
          href={loginHref}
          style={{
            ...styles.idnButton,
            ...(isLoading ? styles.idnButtonLoading : {}),
          }}
          onClick={() => setIsLoading(true)}
        >
          {/* IDENTITE.GA Shield Icon */}
          <div style={styles.idnIcon}>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
              <path
                d="M12 2L3 7v5c0 5.25 3.82 10.17 9 11.38C17.18 22.17 21 17.25 21 12V7L12 2z"
                fill="#009E49"
              />
              <path
                d="M12 2L3 7v5c0 5.25 3.82 10.17 9 11.38V2z"
                fill="#009E49"
                opacity="0.8"
              />
              <text
                x="12"
                y="15"
                textAnchor="middle"
                fill="white"
                fontSize="8"
                fontWeight="bold"
                fontFamily="Arial"
              >
                ID
              </text>
            </svg>
          </div>

          <div style={styles.idnButtonContent}>
            <span style={styles.idnButtonLabel}>Se connecter avec</span>
            <span style={styles.idnButtonBrand}>IDENTITE.GA</span>
          </div>

          {isLoading && <div style={styles.spinner} />}
        </a>

        {/* Features list */}
        <div style={styles.features}>
          <div style={styles.featureItem}>
            <span style={styles.featureIcon}>&#x1F512;</span>
            <span>Authentification sécurisée par NIP</span>
          </div>
          <div style={styles.featureItem}>
            <span style={styles.featureIcon}>&#x26A1;</span>
            <span>Accès à tous les services GABON BIZ</span>
          </div>
          <div style={styles.featureItem}>
            <span style={styles.featureIcon}>&#x1F1EC;&#x1F1E6;</span>
            <span>Identité nationale vérifiée</span>
          </div>
        </div>

        {/* Footer */}
        <p style={styles.footer}>
          En vous connectant, vous acceptez les{' '}
          <a href="/conditions" style={styles.footerLink}>
            conditions d&apos;utilisation
          </a>{' '}
          et la{' '}
          <a href="/confidentialite" style={styles.footerLink}>
            politique de confidentialité
          </a>{' '}
          de GABON BIZ.
        </p>

        <div style={styles.poweredBy}>
          <span style={styles.poweredByText}>Propulsé par le MENUDI</span>
        </div>
      </div>
    </div>
  );
}

export default function LoginPage() {
  return (
    <Suspense
      fallback={
        <div
          style={{
            minHeight: '100vh',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            background: '#1a1a2e',
            color: 'white',
          }}
        >
          Chargement...
        </div>
      }
    >
      <LoginContent />
    </Suspense>
  );
}

// ── Styles ─────────────────────────────────────────────────────
const styles: Record<string, React.CSSProperties> = {
  container: {
    minHeight: '100vh',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    background: 'linear-gradient(135deg, #1a1a2e 0%, #16213e 50%, #0f3460 100%)',
    padding: '20px',
    position: 'relative',
    overflow: 'hidden',
  },
  bgDecor1: {
    position: 'absolute',
    top: '-20%',
    right: '-10%',
    width: '500px',
    height: '500px',
    borderRadius: '50%',
    background: 'radial-gradient(circle, rgba(0,158,73,0.15) 0%, transparent 70%)',
    pointerEvents: 'none',
  },
  bgDecor2: {
    position: 'absolute',
    bottom: '-15%',
    left: '-10%',
    width: '400px',
    height: '400px',
    borderRadius: '50%',
    background: 'radial-gradient(circle, rgba(230,126,34,0.12) 0%, transparent 70%)',
    pointerEvents: 'none',
  },
  card: {
    background: 'white',
    borderRadius: '24px',
    padding: '40px 32px',
    maxWidth: '440px',
    width: '100%',
    boxShadow: '0 25px 60px rgba(0,0,0,0.3)',
    textAlign: 'center' as const,
    position: 'relative',
    zIndex: 1,
  },
  logo: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '12px',
    marginBottom: '28px',
  },
  logoBadge: {
    width: '52px',
    height: '52px',
    borderRadius: '14px',
    background: 'linear-gradient(135deg, #E67E22, #D35400)',
    color: 'white',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontWeight: 'bold',
    fontSize: '22px',
    boxShadow: '0 4px 12px rgba(230,126,34,0.3)',
  },
  logoText: {
    fontSize: '30px',
    fontWeight: 700,
    color: '#2C3E50',
    margin: 0,
  },
  title: {
    fontSize: '24px',
    color: '#2C3E50',
    marginBottom: '8px',
    fontWeight: 600,
  },
  subtitle: {
    fontSize: '14px',
    color: '#7F8C8D',
    lineHeight: '1.6',
    marginBottom: '24px',
    maxWidth: '360px',
    marginLeft: 'auto',
    marginRight: 'auto',
  },
  error: {
    background: '#FFF3E0',
    color: '#E65100',
    padding: '12px 16px',
    borderRadius: '10px',
    fontSize: '13px',
    marginBottom: '16px',
    border: '1px solid #FFE0B2',
    lineHeight: '1.4',
  },
  separator: {
    display: 'flex',
    alignItems: 'center',
    gap: '12px',
    marginBottom: '20px',
  },
  separatorLine: {
    flex: 1,
    height: '1px',
    background: '#E8E8E8',
  },
  separatorText: {
    fontSize: '12px',
    color: '#BDC3C7',
    whiteSpace: 'nowrap',
    fontWeight: 500,
    textTransform: 'uppercase' as const,
    letterSpacing: '0.5px',
  },

  // ── IDENTITE.GA Button ──────────────────────────────────────
  idnButton: {
    display: 'flex',
    alignItems: 'center',
    gap: '14px',
    width: '100%',
    padding: '14px 20px',
    background: 'white',
    border: '2px solid #E0E0E0',
    borderRadius: '14px',
    fontSize: '15px',
    cursor: 'pointer',
    textDecoration: 'none',
    color: '#2C3E50',
    transition: 'all 0.25s ease',
    boxShadow: '0 2px 8px rgba(0,0,0,0.06)',
    position: 'relative' as const,
  },
  idnButtonLoading: {
    opacity: 0.7,
    pointerEvents: 'none' as const,
  },
  idnIcon: {
    width: '40px',
    height: '40px',
    borderRadius: '10px',
    background: 'linear-gradient(135deg, #E8F5E9, #C8E6C9)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexShrink: 0,
  },
  idnButtonContent: {
    display: 'flex',
    flexDirection: 'column' as const,
    alignItems: 'flex-start',
    flex: 1,
  },
  idnButtonLabel: {
    fontSize: '12px',
    color: '#95A5A6',
    fontWeight: 400,
  },
  idnButtonBrand: {
    fontSize: '17px',
    fontWeight: 700,
    color: '#009E49',
    letterSpacing: '0.3px',
  },
  spinner: {
    width: '20px',
    height: '20px',
    border: '2px solid #E0E0E0',
    borderTopColor: '#009E49',
    borderRadius: '50%',
    animation: 'spin 0.8s linear infinite',
  },

  // ── Features ─────────────────────────────────────────────────
  features: {
    marginTop: '24px',
    display: 'flex',
    flexDirection: 'column' as const,
    gap: '10px',
  },
  featureItem: {
    display: 'flex',
    alignItems: 'center',
    gap: '10px',
    fontSize: '13px',
    color: '#7F8C8D',
    textAlign: 'left' as const,
  },
  featureIcon: {
    fontSize: '16px',
    width: '24px',
    textAlign: 'center' as const,
    flexShrink: 0,
  },

  // ── Footer ───────────────────────────────────────────────────
  footer: {
    fontSize: '11px',
    color: '#BDC3C7',
    marginTop: '24px',
    lineHeight: '1.5',
  },
  footerLink: {
    color: '#3498DB',
    textDecoration: 'none',
  },
  poweredBy: {
    marginTop: '16px',
    paddingTop: '16px',
    borderTop: '1px solid #F0F0F0',
  },
  poweredByText: {
    fontSize: '11px',
    color: '#BDC3C7',
    fontWeight: 500,
    letterSpacing: '0.3px',
  },
};
