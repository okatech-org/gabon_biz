// GABON BIZ — Login Page
'use client';

import { useSearchParams } from 'next/navigation';
import { Suspense } from 'react';

function LoginContent() {
  const searchParams = useSearchParams();
  const error = searchParams.get('error');
  const redirect = searchParams.get('redirect');

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <div style={styles.logo}>
          <div style={styles.logoBadge}>GB</div>
          <h1 style={styles.logoText}>
            GABON <span style={{ color: '#E67E22' }}>BIZ</span>
          </h1>
        </div>

        <h2 style={styles.title}>Connexion</h2>
        <p style={styles.subtitle}>
          Connectez-vous avec votre identité nationale GABON ID pour accéder à la plateforme.
        </p>

        {error && <div style={styles.error}>⚠️ Erreur de connexion. Veuillez réessayer.</div>}

        <a
          href={`/api/auth/login${redirect ? `?redirect=${redirect}` : ''}`}
          style={styles.loginButton}
        >
          🇬🇦 Se connecter avec GABON ID
        </a>

        <p style={styles.footer}>
          En vous connectant, vous acceptez les conditions d&apos;utilisation de GABON BIZ.
        </p>
      </div>
    </div>
  );
}

export default function LoginPage() {
  return (
    <Suspense fallback={<div>Chargement...</div>}>
      <LoginContent />
    </Suspense>
  );
}

const styles: Record<string, React.CSSProperties> = {
  container: {
    minHeight: '100vh',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    background: 'linear-gradient(135deg, #1a1a2e 0%, #16213e 50%, #0f3460 100%)',
    padding: '20px',
  },
  card: {
    background: 'white',
    borderRadius: '20px',
    padding: '32px 20px',
    maxWidth: '440px',
    width: '100%',
    boxShadow: '0 25px 50px rgba(0,0,0,0.25)',
    textAlign: 'center' as const,
  },
  logo: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '12px',
    marginBottom: '32px',
  },
  logoBadge: {
    width: '48px',
    height: '48px',
    borderRadius: '12px',
    background: 'linear-gradient(135deg, #E67E22, #D35400)',
    color: 'white',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontWeight: 'bold',
    fontSize: '20px',
  },
  logoText: {
    fontSize: '28px',
    fontWeight: 700,
    color: '#2C3E50',
    margin: 0,
  },
  title: {
    fontSize: '22px',
    color: '#2C3E50',
    marginBottom: '8px',
  },
  subtitle: {
    fontSize: '14px',
    color: '#7F8C8D',
    lineHeight: '1.5',
    marginBottom: '24px',
  },
  error: {
    background: '#FFF3E0',
    color: '#E65100',
    padding: '12px 16px',
    borderRadius: '8px',
    fontSize: '14px',
    marginBottom: '16px',
  },
  loginButton: {
    display: 'block',
    width: '100%',
    padding: '16px',
    background: 'linear-gradient(135deg, #009E49, #00783A)',
    color: 'white',
    border: 'none',
    borderRadius: '12px',
    fontSize: '16px',
    fontWeight: 600,
    cursor: 'pointer',
    textDecoration: 'none',
    textAlign: 'center' as const,
    transition: 'transform 0.2s',
  },
  footer: {
    fontSize: '12px',
    color: '#BDC3C7',
    marginTop: '20px',
  },
};
