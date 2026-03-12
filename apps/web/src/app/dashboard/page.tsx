'use client';

// GABON BIZ — Dashboard Home (adaptive by profile)

import { useAuth } from '@/lib/auth-context';
import { getDemoAccountByNip } from '@/lib/demo-accounts';
import { StatsCard } from '@/components/ui';
import Link from 'next/link';

// Demo stats per profile type
function getDemoStats(nip: string) {
  const account = getDemoAccountByNip(nip);
  if (!account) return null;

  const statsMap: Record<string, { icon: string; title: string; value: string | number; color: string }[]> = {
    'demo-entrepreneur': [
      { icon: '🏢', title: 'Mes entreprises', value: 3, color: '#009e49' },
      { icon: '📋', title: 'Marchés ouverts', value: 12, color: '#3b82f6' },
      { icon: '📨', title: 'Soumissions', value: 2, color: '#f59e0b' },
      { icon: '🔔', title: 'Alertes', value: 5, color: '#ef4444' },
    ],
    'demo-startup': [
      { icon: '💡', title: 'Solutions publiées', value: 2, color: '#8b5cf6' },
      { icon: '👁️', title: 'Vues ce mois', value: 340, color: '#3b82f6' },
      { icon: '📩', title: 'Contacts reçus', value: 8, color: '#14b8a6' },
      { icon: '📈', title: 'Progression cohorte', value: '75%', color: '#ec4899' },
    ],
    'demo-investisseur': [
      { icon: '🚀', title: 'Startups suivies', value: 4, color: '#8b5cf6' },
      { icon: '📊', title: 'Deal flow', value: 15, color: '#3b82f6' },
      { icon: '💰', title: 'Investissements', value: 3, color: '#14b8a6' },
      { icon: '📈', title: 'ROI moyen', value: '+22%', color: '#009e49' },
    ],
    'demo-dgmp': [
      { icon: '📋', title: 'Marchés publiés', value: 8, color: '#3b82f6' },
      { icon: '📨', title: 'Soumissions à évaluer', value: 25, color: '#f59e0b' },
      { icon: '✅', title: 'Marchés attribués', value: 3, color: '#009e49' },
      { icon: '💰', title: 'Budget total', value: '45 Mds', color: '#8b5cf6' },
    ],
    'demo-mentor': [
      { icon: '🚀', title: 'Startups accompagnées', value: 3, color: '#ec4899' },
      { icon: '📅', title: 'Sessions ce mois', value: 12, color: '#3b82f6' },
      { icon: '⏰', title: 'Prochaine session', value: 'Demain', color: '#f59e0b' },
      { icon: '⭐', title: 'Note moyenne', value: '4.8/5', color: '#009e49' },
    ],
    'demo-admin': [
      { icon: '🏢', title: 'Entreprises', value: 528, color: '#009e49' },
      { icon: '📋', title: 'Marchés actifs', value: 12, color: '#3b82f6' },
      { icon: '🚀', title: 'Startups', value: 128, color: '#8b5cf6' },
      { icon: '👥', title: 'Utilisateurs', value: '3 200', color: '#f59e0b' },
    ],
    'demo-analyste': [
      { icon: '📊', title: 'Indicateurs suivis', value: 42, color: '#f59e0b' },
      { icon: '✅', title: 'Mis à jour', value: 38, color: '#009e49' },
      { icon: '⚠️', title: 'Anomalies', value: 2, color: '#ef4444' },
      { icon: '📄', title: 'Rapports', value: 3, color: '#3b82f6' },
    ],
    'demo-citoyen': [
      { icon: '🏢', title: 'Entreprises au Gabon', value: 528, color: '#009e49' },
      { icon: '📋', title: 'Marchés ouverts', value: 12, color: '#3b82f6' },
      { icon: '🚀', title: 'Startups actives', value: 128, color: '#8b5cf6' },
      { icon: '📊', title: 'Score IDES', value: '0.52', color: '#f59e0b' },
    ],
    'demo-partenaire': [
      { icon: '📈', title: 'PIB croissance', value: '6.2%', color: '#009e49' },
      { icon: '💰', title: 'IDE entrants', value: '$1.5B', color: '#14b8a6' },
      { icon: '🚀', title: 'Startups financées', value: 45, color: '#8b5cf6' },
      { icon: '📊', title: 'Score IDES', value: '0.52', color: '#f59e0b' },
    ],
    'demo-autorite': [
      { icon: '📋', title: 'Mes marchés publiés', value: 4, color: '#7c3aed' },
      { icon: '📨', title: 'Soumissions reçues', value: 18, color: '#3b82f6' },
      { icon: '🔍', title: 'En évaluation', value: 2, color: '#f59e0b' },
      { icon: '💰', title: 'Budget engagé', value: '8.5 Mds', color: '#009e49' },
    ],
  };

  return {
    stats: statsMap[account.id] || statsMap['demo-citoyen']!,
    alert: getAlertForProfile(account.id),
  };
}

function getAlertForProfile(profileId: string): { text: string; color: string } | null {
  const alerts: Record<string, { text: string; color: string }> = {
    'demo-entrepreneur': { text: '2 marchés correspondent à votre profil — Voir les alertes', color: '#009e49' },
    'demo-startup': { text: 'Jalon semaine 8 : Premiers clients — dans 5 jours', color: '#8b5cf6' },
    'demo-investisseur': { text: '3 nouvelles startups dans votre secteur d\'intérêt', color: '#14b8a6' },
    'demo-dgmp': { text: '5 soumissions en attente d\'évaluation pour AO-2026-002', color: '#3b82f6' },
    'demo-mentor': { text: 'Session avec TechPay Solutions dans 2 heures', color: '#ec4899' },
    'demo-admin': { text: '15 entreprises en attente de validation', color: '#ef4444' },
    'demo-analyste': { text: 'Anomalie détectée : taux pénétration internet en baisse de 3.2%', color: '#f59e0b' },
    'demo-citoyen': { text: 'Bienvenue sur GABON BIZ, votre portail économique national', color: '#009e49' },
    'demo-partenaire': { text: 'Nouveau rapport IDES Q4 2025 disponible', color: '#0ea5e9' },
    'demo-autorite': { text: 'Date limite AO-2026-001 dans 3 jours', color: '#7c3aed' },
  };
  return alerts[profileId] || null;
}

// Default modules for non-demo users
const DEFAULT_MODULES = [
  { icon: '🏢', title: 'Mes Entreprises', desc: 'Créer et gérer vos entreprises', path: '/dashboard/entreprises', color: '#009e49' },
  { icon: '📋', title: 'Marchés Publics', desc: 'Consulter les appels d\'offres', path: '/dashboard/marches', color: '#3b82f6' },
  { icon: '📨', title: 'Soumissions', desc: 'Suivre vos candidatures', path: '/dashboard/soumissions', color: '#f59e0b' },
  { icon: '💡', title: 'Innovation Hub', desc: 'Explorer les solutions numériques', path: '/dashboard/innovation', color: '#8b5cf6' },
  { icon: '🎓', title: 'Incubateur', desc: 'Rejoindre une cohorte', path: '/dashboard/incubateur', color: '#ec4899' },
  { icon: '💰', title: 'Investir', desc: 'Opportunités d\'investissement', path: '/dashboard/investir', color: '#14b8a6' },
];

const ALL_MODULES_MAP: Record<string, { icon: string; title: string; desc: string; color: string }> = {
  '/dashboard/entreprises': { icon: '🏢', title: 'Mes Entreprises', desc: 'Créer et gérer vos entreprises', color: '#009e49' },
  '/dashboard/marches': { icon: '📋', title: 'Marchés Publics', desc: 'Consulter les appels d\'offres', color: '#3b82f6' },
  '/dashboard/soumissions': { icon: '📨', title: 'Soumissions', desc: 'Suivre vos candidatures', color: '#f59e0b' },
  '/dashboard/innovation': { icon: '💡', title: 'Innovation Hub', desc: 'Explorer les solutions numériques', color: '#8b5cf6' },
  '/dashboard/incubateur': { icon: '🎓', title: 'Incubateur', desc: 'Rejoindre une cohorte', color: '#ec4899' },
  '/dashboard/investir': { icon: '💰', title: 'Investir', desc: 'Opportunités d\'investissement', color: '#14b8a6' },
  '/dashboard/observatoire': { icon: '📊', title: 'Observatoire', desc: 'Indicateurs numériques', color: '#f59e0b' },
  '/dashboard/filieres': { icon: '🏭', title: 'Filières', desc: 'Cartographie sectorielle', color: '#009e49' },
};

export default function DashboardPage() {
  const { user } = useAuth();

  // Get role-specific content
  const demoData = user?.isDemo ? getDemoStats(user.nip) : null;
  const account = user?.isDemo ? getDemoAccountByNip(user.nip) : null;

  // Build module grid from accessible modules
  const modules = account
    ? account.accessibleModules
        .filter((m) => m !== '/dashboard')
        .map((m) => ({ ...ALL_MODULES_MAP[m]!, path: m }))
        .filter((m) => m.title)
    : DEFAULT_MODULES;

  const stats = demoData?.stats || [
    { icon: '🏢', title: 'Entreprises', value: 4, color: '#009e49' },
    { icon: '📋', title: 'Marchés ouverts', value: 12, color: '#3b82f6' },
    { icon: '📨', title: 'Soumissions', value: 3, color: '#f59e0b' },
    { icon: '💡', title: 'Solutions', value: 28, color: '#8b5cf6' },
  ];

  return (
    <div>
      {/* Welcome */}
      <div
        className="rounded-2xl p-8 mb-8 text-white"
        style={{
          background: account
            ? `linear-gradient(135deg, ${account.accentColor} 0%, ${account.accentColor}cc 100%)`
            : 'linear-gradient(135deg, #009e49 0%, #006633 100%)',
        }}
      >
        <h1 className="text-2xl font-bold mb-1">
          Bienvenue, {user?.name || 'Utilisateur'} 👋
        </h1>
        <p className="text-sm opacity-85 m-0">
          {account
            ? `${account.user.title} — ${account.user.organization}`
            : 'Votre espace économique et entrepreneurial du Gabon'}
        </p>
      </div>

      {/* Alert */}
      {demoData?.alert && (
        <div
          className="rounded-xl px-5 py-3 mb-6 flex items-center gap-3 text-sm font-medium"
          style={{
            background: `${demoData.alert.color}12`,
            color: demoData.alert.color,
            border: `1px solid ${demoData.alert.color}30`,
          }}
        >
          <span>🔔</span>
          {demoData.alert.text}
        </div>
      )}

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {stats.map((s, i) => (
          <StatsCard key={i} icon={s.icon} title={s.title} value={s.value} color={s.color} />
        ))}
      </div>

      {/* Module Grid */}
      <h2 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-4">Modules</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {modules.map((mod) => (
          <Link
            key={mod.path}
            href={mod.path}
            className="no-underline bg-white dark:bg-gray-900 rounded-2xl p-6 border border-gray-100 dark:border-gray-800 shadow-sm hover:shadow-md transition-all duration-200 flex flex-col gap-3"
          >
            <span
              className="text-3xl w-13 h-13 rounded-xl flex items-center justify-center"
              style={{ background: `${mod.color}12` }}
            >
              {mod.icon}
            </span>
            <div>
              <h3 className="text-sm font-semibold text-gray-900 dark:text-gray-100 m-0 mb-1">
                {mod.title}
              </h3>
              <p className="text-xs text-gray-500 dark:text-gray-400 m-0">{mod.desc}</p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
