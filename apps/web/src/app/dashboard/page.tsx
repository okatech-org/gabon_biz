// GABON BIZ — Dashboard Page (Protected)
'use client';

import { useAuth } from '@/lib/auth-context';

export default function DashboardPage() {
  const { user, isLoading, logout } = useAuth();

  if (isLoading) {
    return (
      <div style={styles.loading}>
        <div style={styles.spinner} />
        <p>Chargement...</p>
      </div>
    );
  }

  if (!user) return null;

  return (
    <div style={styles.container}>
      {/* Header */}
      <header style={styles.header}>
        <div style={styles.headerLeft}>
          <div style={styles.logoBadge}>GB</div>
          <h1 style={styles.headerTitle}>
            GABON <span style={{ color: '#E67E22' }}>BIZ</span>
          </h1>
        </div>
        <div style={styles.headerRight}>
          <span style={styles.userName}>{user.fullName}</span>
          <span style={styles.badge}>{user.profileType}</span>
          <button onClick={logout} style={styles.logoutBtn}>
            Déconnexion
          </button>
        </div>
      </header>

      {/* Welcome */}
      <main style={styles.main}>
        <div style={styles.welcome}>
          <h2 style={styles.welcomeTitle}>Bienvenue, {user.fullName.split(' ')[0]} 👋</h2>
          <p style={styles.welcomeSubtitle}>
            NIP : {user.nip} · Profil : {user.profileType}
          </p>
        </div>

        {/* Module cards */}
        <div style={styles.grid}>
          {[
            {
              title: 'Mon entreprise',
              icon: '🏢',
              color: '#E67E22',
              href: '/dashboard/entreprise',
            },
            { title: 'Marchés Publics', icon: '📋', color: '#3498DB', href: '/dashboard/marches' },
            {
              title: 'Innovation Hub',
              icon: '💡',
              color: '#9B59B6',
              href: '/dashboard/innovation',
            },
            { title: 'Incubateur', icon: '🚀', color: '#27AE60', href: '/dashboard/incubateur' },
            {
              title: 'Investir au Gabon',
              icon: '💰',
              color: '#F39C12',
              href: '/dashboard/investir',
            },
            {
              title: 'Observatoire',
              icon: '📊',
              color: '#1ABC9C',
              href: '/dashboard/observatoire',
            },
          ].map((mod, i) => (
            <a key={i} href={mod.href} style={{ ...styles.card, borderTopColor: mod.color }}>
              <span style={styles.cardIcon}>{mod.icon}</span>
              <h3 style={styles.cardTitle}>{mod.title}</h3>
            </a>
          ))}
        </div>
      </main>
    </div>
  );
}

const styles: Record<string, React.CSSProperties> = {
  container: { minHeight: '100vh', background: '#F5F6FA' },
  loading: {
    minHeight: '100vh',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '16px',
    color: '#7F8C8D',
  },
  spinner: {
    width: '40px',
    height: '40px',
    border: '4px solid #E8E8E8',
    borderTopColor: '#E67E22',
    borderRadius: '50%',
    animation: 'spin 1s linear infinite',
  },
  header: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: '16px 32px',
    background: 'white',
    borderBottom: '1px solid #E8E8E8',
  },
  headerLeft: { display: 'flex', alignItems: 'center', gap: '10px' },
  logoBadge: {
    width: '36px',
    height: '36px',
    borderRadius: '8px',
    background: 'linear-gradient(135deg, #E67E22, #D35400)',
    color: 'white',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontWeight: 'bold',
    fontSize: '14px',
  },
  headerTitle: { fontSize: '20px', fontWeight: 700, color: '#2C3E50', margin: 0 },
  headerRight: { display: 'flex', alignItems: 'center', gap: '12px' },
  userName: { fontSize: '14px', color: '#2C3E50', fontWeight: 500 },
  badge: {
    padding: '4px 10px',
    borderRadius: '6px',
    fontSize: '11px',
    fontWeight: 600,
    background: '#FFF3E0',
    color: '#E65100',
  },
  logoutBtn: {
    padding: '8px 16px',
    border: '1px solid #E8E8E8',
    borderRadius: '8px',
    background: 'white',
    color: '#7F8C8D',
    fontSize: '13px',
    cursor: 'pointer',
  },
  main: { maxWidth: '1200px', margin: '0 auto', padding: '32px' },
  welcome: { marginBottom: '32px' },
  welcomeTitle: { fontSize: '28px', color: '#2C3E50', margin: 0 },
  welcomeSubtitle: { fontSize: '14px', color: '#95A5A6', marginTop: '8px' },
  grid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
    gap: '20px',
  },
  card: {
    background: 'white',
    borderRadius: '14px',
    padding: '28px 24px',
    borderTop: '4px solid',
    textDecoration: 'none',
    boxShadow: '0 2px 8px rgba(0,0,0,0.06)',
    transition: 'transform 0.2s, box-shadow 0.2s',
    cursor: 'pointer',
  },
  cardIcon: { fontSize: '36px', display: 'block', marginBottom: '12px' },
  cardTitle: { fontSize: '16px', fontWeight: 600, color: '#2C3E50', margin: 0 },
};
