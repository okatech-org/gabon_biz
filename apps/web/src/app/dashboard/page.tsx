'use client';

// GABON BIZ — Dashboard Home (adaptive by profile)
// Routes to dedicated dashboard components for specific profiles

import { useAuth } from '@/lib/auth-context';
import { getDemoAccountByNip } from '@/lib/demo-accounts';
import { StatsCard } from '@/components/ui';
import Link from 'next/link';

// Profile-specific dashboards
import MentorDashboard from '@/components/dashboards/MentorDashboard';
import AdminDashboard from '@/components/dashboards/AdminDashboard';
import AnalysteDashboard from '@/components/dashboards/AnalysteDashboard';
import CitoyenDashboard from '@/components/dashboards/CitoyenDashboard';
import EntrepreneurDashboard from '@/components/dashboards/EntrepreneurDashboard';
import StartupDashboard from '@/components/dashboards/StartupDashboard';
import InvestisseurDashboard from '@/components/dashboards/InvestisseurDashboard';
import DGMPDashboard from '@/components/dashboards/DGMPDashboard';

// Map of profile IDs to their dedicated dashboard components
const PROFILE_DASHBOARDS: Record<
  string,
  React.ComponentType<{ user: Record<string, string | undefined> }>
> = {
  'demo-mentor': MentorDashboard,
  'demo-admin': AdminDashboard,
  'demo-analyste': AnalysteDashboard,
  'demo-citoyen': CitoyenDashboard,
  'demo-entrepreneur': EntrepreneurDashboard,
  'demo-startup': StartupDashboard,
  'demo-investisseur': InvestisseurDashboard,
  'demo-dgmp': DGMPDashboard,
};

// ─── Demo stats per profile ───
function getDemoStats(nip: string) {
  const account = getDemoAccountByNip(nip);
  if (!account) return null;

  const statsMap: Record<
    string,
    { icon: string; title: string; value: string | number; color: string }[]
  > = {
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
    'demo-sysadmin': [
      { icon: '🟢', title: 'Uptime', value: '99.94%', color: '#10b981' },
      { icon: '📡', title: 'Requêtes / 24h', value: '145K', color: '#3b82f6' },
      { icon: '⚠️', title: 'Erreurs 5xx', value: 3, color: '#ef4444' },
      { icon: '🚀', title: 'Déploiements', value: 12, color: '#8b5cf6' },
    ],
    'demo-cgi': [
      { icon: '🎓', title: 'Personnes formées', value: '3 420', color: '#f59e0b' },
      { icon: '🛠️', title: 'Projets FabLab', value: 64, color: '#8b5cf6' },
      { icon: '📈', title: 'Taux insertion', value: '78%', color: '#10b981' },
      { icon: '🤝', title: 'Partenaires', value: 12, color: '#0ea5e9' },
    ],
  };

  return {
    stats: statsMap[account.id] || [],
    alert: getAlertForProfile(account.id),
  };
}

function getAlertForProfile(profileId: string): { text: string; color: string } | null {
  const alerts: Record<string, { text: string; color: string }> = {
    'demo-entrepreneur': {
      text: '2 marchés correspondent à votre profil — Voir les alertes',
      color: '#009e49',
    },
    'demo-startup': { text: 'Jalon semaine 8 : Premiers clients — dans 5 jours', color: '#8b5cf6' },
    'demo-investisseur': {
      text: "3 nouvelles startups dans votre secteur d'intérêt",
      color: '#14b8a6',
    },
    'demo-dgmp': {
      text: "5 soumissions en attente d'évaluation pour AO-2026-002",
      color: '#3b82f6',
    },
    'demo-partenaire': { text: 'Nouveau rapport IDES Q4 2025 disponible', color: '#0ea5e9' },
    'demo-autorite': { text: 'Date limite AO-2026-001 dans 3 jours', color: '#7c3aed' },
    'demo-sysadmin': { text: 'Alerte CPU Cloud Run — pic 87% à 14h32', color: '#ef4444' },
    'demo-cgi': { text: 'Cohorte INITIA #4 — démarrage dans 5 jours, 89/120 inscrits', color: '#f59e0b' },
  };
  return alerts[profileId] || null;
}

// ─── Quick actions per profile ───
const QUICK_ACTIONS: Record<
  string,
  { icon: string; label: string; href: string; color: string }[]
> = {
  'demo-entrepreneur': [
    { icon: '📋', label: 'Soumissionner à un AO', href: '/dashboard/marches', color: '#3b82f6' },
    {
      icon: '🏢',
      label: 'Nouvelle entreprise',
      href: '/dashboard/entreprises/creer',
      color: '#009e49',
    },
    { icon: '📊', label: 'Voir mes filières', href: '/dashboard/filieres', color: '#f59e0b' },
  ],
  'demo-startup': [
    { icon: '💡', label: 'Publier une solution', href: '/dashboard/innovation', color: '#8b5cf6' },
    { icon: '🎓', label: 'Ma cohorte SING 2.0', href: '/dashboard/incubateur', color: '#ec4899' },
    {
      icon: '💰',
      label: 'Rechercher un financement',
      href: '/dashboard/investir',
      color: '#14b8a6',
    },
  ],
  'demo-investisseur': [
    {
      icon: '🚀',
      label: 'Explorer le Deal Flow',
      href: '/dashboard/investir/opportunites',
      color: '#8b5cf6',
    },
    { icon: '📊', label: 'Dashboard Macro', href: '/dashboard/investir/macro', color: '#3b82f6' },
    {
      icon: '🧮',
      label: 'Simuler un ROI',
      href: '/dashboard/investir/simulateur',
      color: '#14b8a6',
    },
  ],
  'demo-dgmp': [
    {
      icon: '📋',
      label: "Publier un appel d'offres",
      href: '/dashboard/marches/nouveau',
      color: '#3b82f6',
    },
    {
      icon: '📨',
      label: 'Évaluer les soumissions',
      href: '/dashboard/soumissions',
      color: '#f59e0b',
    },
    { icon: '🏭', label: 'Voir les filières', href: '/dashboard/filieres', color: '#009e49' },
  ],
  'demo-partenaire': [
    { icon: '📊', label: 'Country Risk Overview', href: '/dashboard/investir', color: '#0ea5e9' },
    { icon: '📄', label: 'Rapport IDES Q4', href: '/dashboard/investir', color: '#3b82f6' },
    { icon: '🤝', label: 'Co-investissements', href: '/dashboard/investir', color: '#14b8a6' },
  ],
  'demo-autorite': [
    { icon: '📋', label: 'Créer un appel d\'offres', href: '/dashboard/marches/autorite', color: '#7c3aed' },
    { icon: '📨', label: 'Soumissions reçues', href: '/dashboard/marches/autorite', color: '#3b82f6' },
    { icon: '📒', label: 'Annuaire entreprises', href: '/dashboard/annuaire', color: '#009e49' },
  ],
  'demo-sysadmin': [
    { icon: '🖥️', label: 'Console Admin', href: '/dashboard/admin', color: '#334155' },
    { icon: '📊', label: 'Monitoring services', href: '/dashboard/admin', color: '#3b82f6' },
    { icon: '🚀', label: 'Voir les déploiements', href: '/dashboard/admin', color: '#10b981' },
  ],
  'demo-cgi': [
    { icon: '💡', label: 'Pilotage CGI', href: '/dashboard/cgi', color: '#f59e0b' },
    { icon: '🎓', label: 'Cohortes SADA', href: '/dashboard/cgi', color: '#8b5cf6' },
    { icon: '📊', label: 'Observatoire', href: '/dashboard/observatoire', color: '#3b82f6' },
  ],
};

// ─── Recent activity per profile ───
const RECENT_ACTIVITY: Record<string, { icon: string; text: string; time: string }[]> = {
  'demo-entrepreneur': [
    { icon: '✅', text: 'Soumission AO-001 envoyée — Mbadinga Technologies', time: 'Il y a 2h' },
    { icon: '📄', text: 'EcoGabon EI — brouillon sauvegardé', time: 'Hier' },
    {
      icon: '🔔',
      text: 'Nouveau marché compatible : Plateforme e-santé nationale',
      time: 'Il y a 2j',
    },
  ],
  'demo-startup': [
    {
      icon: '💡',
      text: 'Solution "TechPay Mobile" publiée sur l\'Innovation Hub',
      time: 'Il y a 3h',
    },
    { icon: '📩', text: 'Nouveau contact reçu de Ndong Capital Partners', time: 'Hier' },
    { icon: '🎓', text: 'Milestone complété : Design Sprint terminé', time: 'Il y a 3j' },
  ],
  'demo-investisseur': [
    {
      icon: '🚀',
      text: 'TechPay Solutions ajoutée à votre portefeuille de suivi',
      time: 'Il y a 1h',
    },
    { icon: '📊', text: 'Rapport Due Diligence Gabon mis à jour', time: 'Hier' },
    { icon: '💰', text: 'Simulation ROI FinTech : 28% sur 5 ans', time: 'Il y a 2j' },
  ],
  'demo-dgmp': [
    { icon: '📋', text: 'AO-004 Plateforme e-santé — brouillon créé', time: 'Il y a 1h' },
    { icon: '✅', text: 'Évaluation terminée : AfricaTech Consulting — 75/100', time: 'Il y a 4h' },
    { icon: '📨', text: '2 nouvelles soumissions reçues pour AO-002', time: 'Hier' },
  ],
  'demo-partenaire': [
    { icon: '📄', text: 'Rapport IDES Q4 2025 téléchargé', time: 'Il y a 30min' },
    { icon: '🤝', text: 'Co-investissement Gabon Digital 2030 — pipeline mis à jour', time: 'Il y a 2h' },
    { icon: '📊', text: 'Score Doing Business actualisé : #132 (+12 places)', time: 'Hier' },
  ],
  'demo-autorite': [
    { icon: '📋', text: 'AO-001 Réseau intranet — 8 soumissions reçues', time: 'Il y a 1h' },
    { icon: '✅', text: 'GabonTech Consulting évalué — Score 91/100', time: 'Il y a 3h' },
    { icon: '📝', text: 'Brouillon AO-004 WiFi ZES sauvegardé', time: 'Hier' },
  ],
  'demo-sysadmin': [
    { icon: '🚀', text: 'Déploiement v2.4.1 réussi — Cloud Run europe-west1', time: 'Il y a 45min' },
    { icon: '⚠️', text: 'Redis — pic latence 45ms (résolu automatiquement)', time: 'Il y a 2h' },
    { icon: '🔧', text: 'Feature flag "Matching IA" activé en production', time: 'Hier' },
  ],
  'demo-cgi': [
    { icon: '🎓', text: 'Cohorte INITIA #4 — 89 inscrits, ouverture dans 5 jours', time: 'Il y a 1h' },
    { icon: '🛠️', text: 'FabLab Moanda — 3 nouveaux prototypes validés', time: 'Il y a 4h' },
    { icon: '🤝', text: 'Smart Africa — convention signée pour 2026', time: 'Hier' },
  ],
};

// ─── Module map ───
const ALL_MODULES_MAP: Record<
  string,
  { icon: string; title: string; desc: string; color: string }
> = {
  '/dashboard/entreprises': {
    icon: '🏢',
    title: 'Mes Entreprises',
    desc: 'Créer et gérer vos entreprises',
    color: '#009e49',
  },
  '/dashboard/marches': {
    icon: '📋',
    title: 'Marchés Publics',
    desc: "Consulter les appels d'offres",
    color: '#3b82f6',
  },
  '/dashboard/soumissions': {
    icon: '📨',
    title: 'Soumissions',
    desc: 'Suivre vos candidatures',
    color: '#f59e0b',
  },
  '/dashboard/innovation': {
    icon: '💡',
    title: 'Innovation Hub',
    desc: 'Explorer les solutions numériques',
    color: '#8b5cf6',
  },
  '/dashboard/incubateur': {
    icon: '🎓',
    title: 'Incubateur',
    desc: 'Rejoindre une cohorte',
    color: '#ec4899',
  },
  '/dashboard/investir': {
    icon: '💰',
    title: 'Investir',
    desc: "Opportunités d'investissement",
    color: '#14b8a6',
  },
  '/dashboard/investir/opportunites': {
    icon: '🎯',
    title: 'Opportunités',
    desc: 'Deal flow sectoriel',
    color: '#8b5cf6',
  },
  '/dashboard/investir/macro': {
    icon: '📊',
    title: 'Dashboard Macro',
    desc: 'Indicateurs macroéconomiques',
    color: '#3b82f6',
  },
  '/dashboard/investir/due-diligence': {
    icon: '🔍',
    title: 'Due Diligence',
    desc: 'Analyse de risque pays',
    color: '#f59e0b',
  },
  '/dashboard/investir/simulateur': {
    icon: '🧮',
    title: 'Simulateur ROI',
    desc: 'Projections de rendement',
    color: '#14b8a6',
  },
  '/dashboard/investir/veille': {
    icon: '📡',
    title: 'Veille & Alertes',
    desc: 'Monitoring personnalisé',
    color: '#ef4444',
  },
  '/dashboard/observatoire': {
    icon: '📊',
    title: 'Observatoire',
    desc: 'Indicateurs numériques',
    color: '#f59e0b',
  },
  '/dashboard/filieres': {
    icon: '🏭',
    title: 'Filières',
    desc: 'Cartographie sectorielle',
    color: '#009e49',
  },
  '/dashboard/admin': {
    icon: '🖥️',
    title: 'Admin Système',
    desc: 'Infrastructure, logs et déploiements',
    color: '#334155',
  },
  '/dashboard/cgi': {
    icon: '💡',
    title: "Centre d'Innovation",
    desc: '4 pôles, SADA et partenariats',
    color: '#f59e0b',
  },
  '/dashboard/annuaire': {
    icon: '📒',
    title: 'Annuaire',
    desc: 'Entreprises du Gabon',
    color: '#6b7280',
  },
};

const DEFAULT_MODULES = [
  {
    icon: '🏢',
    title: 'Mes Entreprises',
    desc: 'Créer et gérer vos entreprises',
    path: '/dashboard/entreprises',
    color: '#009e49',
  },
  {
    icon: '📋',
    title: 'Marchés Publics',
    desc: "Consulter les appels d'offres",
    path: '/dashboard/marches',
    color: '#3b82f6',
  },
  {
    icon: '📨',
    title: 'Soumissions',
    desc: 'Suivre vos candidatures',
    path: '/dashboard/soumissions',
    color: '#f59e0b',
  },
  {
    icon: '💡',
    title: 'Innovation Hub',
    desc: 'Explorer les solutions numériques',
    path: '/dashboard/innovation',
    color: '#8b5cf6',
  },
  {
    icon: '🎓',
    title: 'Incubateur',
    desc: 'Rejoindre une cohorte',
    path: '/dashboard/incubateur',
    color: '#ec4899',
  },
  {
    icon: '💰',
    title: 'Investir',
    desc: "Opportunités d'investissement",
    path: '/dashboard/investir',
    color: '#14b8a6',
  },
];

export default function DashboardPage() {
  const { user } = useAuth();
  const account = user?.isDemo ? getDemoAccountByNip(user.nip) : null;

  // ─── PROFILE-SPECIFIC DASHBOARD ───
  if (account && PROFILE_DASHBOARDS[account.id]) {
    const ProfileDashboard = PROFILE_DASHBOARDS[account.id];
    return (
      <ProfileDashboard
        user={{
          name: user?.name,
          title: user?.title,
          organization: user?.organization,
          location: user?.location,
        }}
      />
    );
  }

  // ─── GENERIC DASHBOARD (all other profiles) ───
  const demoData = user?.isDemo ? getDemoStats(user.nip) : null;

  // Build module grid from accessible modules
  const modules = account
    ? account.accessibleModules
        .filter((m) => m !== '/dashboard')
        .map((m) => ({ ...ALL_MODULES_MAP[m]!, path: m }))
        .filter((m) => m.title)
    : DEFAULT_MODULES;

  const stats = demoData?.stats?.length
    ? demoData.stats
    : [
        { icon: '🏢', title: 'Entreprises', value: 4, color: '#009e49' },
        { icon: '📋', title: 'Marchés ouverts', value: 12, color: '#3b82f6' },
        { icon: '📨', title: 'Soumissions', value: 3, color: '#f59e0b' },
        { icon: '💡', title: 'Solutions', value: 28, color: '#8b5cf6' },
      ];

  const quickActions = account ? QUICK_ACTIONS[account.id] || [] : [];
  const recentActivity = account ? RECENT_ACTIVITY[account.id] || [] : [];

  return (
    <div>
      {/* Welcome Banner */}
      <div
        className="rounded-2xl p-6 sm:p-8 mb-6 text-white"
        style={{
          background: account
            ? `linear-gradient(135deg, ${account.accentColor} 0%, ${account.accentColor}cc 100%)`
            : 'linear-gradient(135deg, #009e49 0%, #006633 100%)',
        }}
      >
        <h1 className="text-xl sm:text-2xl font-bold mb-1">
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
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 mb-8">
        {stats.map((s, i) => (
          <StatsCard key={i} icon={s.icon} title={s.title} value={s.value} color={s.color} />
        ))}
      </div>

      {/* Quick Actions */}
      {quickActions.length > 0 && (
        <>
          <h2 className="text-base font-semibold text-gray-900 dark:text-gray-100 mb-3 flex items-center gap-2">
            <span>⚡</span> Actions rapides
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-8">
            {quickActions.map((a) => (
              <Link
                key={a.label}
                href={a.href}
                className="no-underline group flex items-center gap-3 p-4 rounded-xl border border-gray-100 dark:border-gray-800 bg-white dark:bg-gray-900 hover:shadow-md hover:-translate-y-0.5 transition-all duration-200"
              >
                <span
                  className="text-xl w-10 h-10 rounded-lg flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform"
                  style={{ background: `${a.color}12` }}
                >
                  {a.icon}
                </span>
                <span className="text-[13px] font-semibold" style={{ color: a.color }}>
                  {a.label}
                </span>
              </Link>
            ))}
          </div>
        </>
      )}

      {/* Recent Activity */}
      {recentActivity.length > 0 && (
        <>
          <h2 className="text-base font-semibold text-gray-900 dark:text-gray-100 mb-3 flex items-center gap-2">
            <span>📝</span> Activité récente
          </h2>
          <div className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-100 dark:border-gray-800 divide-y divide-gray-50 dark:divide-gray-800/50 mb-8 shadow-sm">
            {recentActivity.map((act, i) => (
              <div key={i} className="flex items-start gap-3 px-5 py-4">
                <span className="text-lg mt-0.5">{act.icon}</span>
                <div className="flex-1 min-w-0">
                  <p className="text-sm text-gray-700 dark:text-gray-300 m-0 leading-snug">
                    {act.text}
                  </p>
                  <p className="text-xs text-gray-400 dark:text-gray-500 m-0 mt-1">{act.time}</p>
                </div>
              </div>
            ))}
          </div>
        </>
      )}

      {/* Module Grid */}
      <h2 className="text-base font-semibold text-gray-900 dark:text-gray-100 mb-3">Modules</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
        {modules.map((mod) => (
          <Link
            key={mod.path}
            href={mod.path}
            className="no-underline group bg-white dark:bg-gray-900 rounded-2xl p-5 sm:p-6 border border-gray-100 dark:border-gray-800 shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all duration-200 flex flex-col gap-3"
          >
            <span
              className="text-3xl w-13 h-13 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-200"
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
