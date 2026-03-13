'use client';

// GABON BIZ — Espace Administrateur MENUDI
// Marie-Claire Ndong — Directrice de la Digitalisation

import React from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import {
  ShieldCheck,
  Building2,
  FileText,
  Send,
  Lightbulb,
  GraduationCap,
  TrendingUp,
  BarChart3,
  Factory,
  BookOpen,
  Users,
  AlertTriangle,
  CheckCircle2,
  Clock,
  Activity,
  ArrowRight,
  Settings,
  Globe,
  PieChart,
} from 'lucide-react';

/* ═══════ MOCK DATA ═══════ */

const PLATFORM_KPIS = [
  { icon: Building2, label: 'Entreprises', value: '528', delta: '+12 ce mois', color: '#009e49' },
  {
    icon: FileText,
    label: 'Marchés actifs',
    value: '12',
    delta: '3 expirent bientôt',
    color: '#3b82f6',
  },
  { icon: Lightbulb, label: 'Startups', value: '128', delta: '+5 cette semaine', color: '#8b5cf6' },
  { icon: Users, label: 'Utilisateurs', value: '3 200', delta: '+45 ce mois', color: '#f59e0b' },
  { icon: Send, label: 'Soumissions', value: '156', delta: '25 en attente', color: '#14b8a6' },
  {
    icon: GraduationCap,
    label: 'Startups incubées',
    value: '28',
    delta: 'Cohorte 4 active',
    color: '#ec4899',
  },
];

const SYSTEM_ALERTS = [
  {
    type: 'warning',
    text: '15 entreprises en attente de validation',
    action: 'Valider',
    href: '/dashboard/entreprises',
    color: '#ef4444',
    icon: AlertTriangle,
  },
  {
    type: 'info',
    text: 'Nouvelle cohorte SING 2.0 — 12 candidatures reçues',
    action: 'Examiner',
    href: '/dashboard/incubateur',
    color: '#3b82f6',
    icon: GraduationCap,
  },
  {
    type: 'warning',
    text: '3 marchés publics expirent dans 5 jours',
    action: 'Voir',
    href: '/dashboard/marches',
    color: '#f59e0b',
    icon: Clock,
  },
  {
    type: 'success',
    text: 'Rapport Observatoire Q1 2026 prêt pour publication',
    action: 'Publier',
    href: '/dashboard/observatoire',
    color: '#10b981',
    icon: CheckCircle2,
  },
];

const ADMIN_MODULES = [
  {
    icon: Building2,
    title: 'Guichet Unique',
    desc: '528 entreprises · 15 en attente',
    href: '/dashboard/entreprises',
    color: '#009e49',
    badge: '15',
  },
  {
    icon: FileText,
    title: 'Marchés Publics',
    desc: '12 marchés actifs · 156 soumissions',
    href: '/dashboard/marches',
    color: '#3b82f6',
    badge: null,
  },
  {
    icon: Send,
    title: 'Soumissions',
    desc: '25 à évaluer',
    href: '/dashboard/soumissions',
    color: '#f59e0b',
    badge: '25',
  },
  {
    icon: Lightbulb,
    title: 'Innovation Hub',
    desc: '128 solutions · 45 défis',
    href: '/dashboard/innovation',
    color: '#8b5cf6',
    badge: null,
  },
  {
    icon: GraduationCap,
    title: 'Incubateur',
    desc: 'SING 2.0 — Cohorte 4',
    href: '/dashboard/incubateur',
    color: '#ec4899',
    badge: null,
  },
  {
    icon: TrendingUp,
    title: 'Investir',
    desc: 'Portail investissement',
    href: '/dashboard/investir',
    color: '#14b8a6',
    badge: null,
  },
  {
    icon: BarChart3,
    title: 'Observatoire',
    desc: '42 indicateurs suivis',
    href: '/dashboard/observatoire',
    color: '#f59e0b',
    badge: '2',
  },
  {
    icon: Factory,
    title: 'Filières',
    desc: 'Cartographie sectorielle',
    href: '/dashboard/filieres',
    color: '#009e49',
    badge: null,
  },
  {
    icon: Globe,
    title: "Centre d'Innovation",
    desc: 'CGI — 4 pôles',
    href: '/dashboard/cgi',
    color: '#f59e0b',
    badge: null,
  },
  {
    icon: BookOpen,
    title: 'Annuaire',
    desc: 'Répertoire national',
    href: '/dashboard/annuaire',
    color: '#3b82f6',
    badge: null,
  },
];

const RECENT_ACTIONS = [
  {
    text: 'Entreprise "OgoouéTech SARL" validée',
    time: 'Il y a 30min',
    icon: CheckCircle2,
    color: '#10b981',
  },
  {
    text: 'Nouveau marché DGMP-2026-AO-005 publié',
    time: 'Il y a 2h',
    icon: FileText,
    color: '#3b82f6',
  },
  {
    text: 'Cohorte SING 2.0 — 3 nouvelles candidatures',
    time: 'Il y a 4h',
    icon: GraduationCap,
    color: '#ec4899',
  },
  {
    text: 'Indicateur "Taux pénétration Internet" mis à jour',
    time: 'Hier',
    icon: BarChart3,
    color: '#f59e0b',
  },
  { text: 'Utilisateur @pmba promu superviseur', time: 'Il y a 2j', icon: Users, color: '#8b5cf6' },
];

const GEO_REPARTITION = [
  { city: 'Libreville', count: 312, pct: 59 },
  { city: 'Port-Gentil', count: 89, pct: 17 },
  { city: 'Franceville', count: 52, pct: 10 },
  { city: 'Oyem', count: 35, pct: 7 },
  { city: 'Autres', count: 40, pct: 7 },
];

/* ═══════ COMPONENT ═══════ */

export default function AdminDashboard({
  user,
}: {
  user: { name?: string; title?: string; organization?: string };
}) {
  const router = useRouter();

  return (
    <div className="space-y-6">
      {/* ═══════ HERO ═══════ */}
      <motion.section
        id="admin-hero"
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        className="rounded-2xl p-6 sm:p-8 text-white relative overflow-hidden"
        style={{ background: 'linear-gradient(135deg, #ef4444 0%, #b91c1c 50%, #991b1b 100%)' }}
      >
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(255,255,255,0.12),transparent_50%)]" />
        <div className="absolute top-4 right-6 opacity-10 hidden sm:block" aria-hidden="true">
          <ShieldCheck size={120} />
        </div>
        <div className="relative z-10">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-12 h-12 rounded-xl bg-white/20 backdrop-blur-sm flex items-center justify-center shrink-0">
              <ShieldCheck size={24} />
            </div>
            <div className="min-w-0">
              <div className="flex items-center gap-2 flex-wrap">
                <h1 className="text-xl sm:text-2xl font-bold">
                  Bienvenue, {user?.name || 'Marie-Claire N.'} 👋
                </h1>
                <span className="text-[10px] font-bold bg-white/20 px-2 py-0.5 rounded-full uppercase tracking-wider shrink-0">
                  Super Admin
                </span>
              </div>
              <p className="text-sm opacity-80 truncate">
                {user?.title || 'Directrice de la Digitalisation'} —{' '}
                {user?.organization || "Ministère de l'Économie Numérique"}
              </p>
            </div>
          </div>
          <p className="text-sm opacity-70 mt-3 max-w-2xl">
            Accès complet à tous les modules. Gestion des entreprises, marchés, cohortes,
            indicateurs et configuration système.
          </p>
        </div>
      </motion.section>

      {/* ═══════ PLATEFORME KPIs ═══════ */}
      <section id="admin-kpis" className="grid grid-cols-2 sm:grid-cols-3 xl:grid-cols-6 gap-3">
        {PLATFORM_KPIS.map((kpi, i) => (
          <motion.div
            key={kpi.label}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.05 }}
            className="bg-white dark:bg-white/5 rounded-xl border border-gray-200/60 dark:border-white/8 p-4"
          >
            <div className="flex items-center gap-2 mb-2">
              <div
                className="w-8 h-8 rounded-lg flex items-center justify-center"
                style={{ background: `${kpi.color}15` }}
              >
                <kpi.icon size={16} style={{ color: kpi.color }} />
              </div>
            </div>
            <p className="text-xl font-bold text-gray-900 dark:text-white">{kpi.value}</p>
            <p className="text-[10px] font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">
              {kpi.label}
            </p>
            <p className="text-[10px] mt-1" style={{ color: kpi.color }}>
              {kpi.delta}
            </p>
          </motion.div>
        ))}
      </section>

      {/* ═══════ ALERTES SYSTÈME ═══════ */}
      <section id="admin-alerts" role="status" aria-label="Alertes système">
        <h2 className="text-sm font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-3 flex items-center gap-2">
          <AlertTriangle size={14} /> Alertes & Actions requises
        </h2>
        <div className="space-y-2">
          {SYSTEM_ALERTS.map((alert, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.05 }}
              className="flex items-center gap-3 sm:gap-4 p-3 sm:p-4 rounded-xl border"
              style={{
                background: `${alert.color}08`,
                borderColor: `${alert.color}20`,
              }}
            >
              <div
                className="w-9 h-9 rounded-lg flex items-center justify-center shrink-0"
                style={{ background: `${alert.color}15` }}
              >
                <alert.icon size={16} style={{ color: alert.color }} />
              </div>
              <p className="flex-1 text-xs sm:text-sm font-medium text-gray-800 dark:text-gray-200">
                {alert.text}
              </p>
              <button
                onClick={() => router.push(alert.href)}
                aria-label={`${alert.action}: ${alert.text}`}
                className="text-xs font-bold px-3 sm:px-4 py-2 rounded-lg text-white shrink-0 hover:opacity-90 transition-opacity cursor-pointer border-none"
                style={{ background: alert.color }}
              >
                {alert.action}
              </button>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ═══════ MODULES D'ADMINISTRATION ═══════ */}
      <section id="admin-modules">
        <h2 className="text-sm font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-3 flex items-center gap-2">
          <Settings size={14} /> Modules de la plateforme
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3">
          {ADMIN_MODULES.map((mod, i) => (
            <motion.div
              key={mod.href}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.04 }}
            >
              <Link
                href={mod.href}
                aria-label={`Accéder à ${mod.title}`}
                className="relative block bg-white dark:bg-white/5 rounded-xl border border-gray-200/60 dark:border-white/8 p-4 hover:shadow-lg hover:-translate-y-0.5 transition-all group no-underline"
              >
                {mod.badge && (
                  <span
                    className="absolute -top-1.5 -right-1.5 w-5 h-5 rounded-full bg-red-500 text-white text-[10px] font-bold flex items-center justify-center shadow-sm"
                    aria-label={`${mod.badge} notifications`}
                  >
                    {mod.badge}
                  </span>
                )}
                <div
                  className="w-9 h-9 rounded-lg flex items-center justify-center text-white mb-3"
                  style={{ background: mod.color }}
                >
                  <mod.icon size={16} />
                </div>
                <h3 className="text-sm font-bold text-gray-900 dark:text-white mb-0.5 group-hover:text-red-500 transition-colors">
                  {mod.title}
                </h3>
                <p className="text-[10px] text-gray-500 dark:text-gray-400 line-clamp-1">
                  {mod.desc}
                </p>
              </Link>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ═══════ TWO-COLUMN: Activity + Géo ═══════ */}
      <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
        {/* Recent actions */}
        <section id="admin-activity" className="lg:col-span-3">
          <h2 className="text-sm font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-3 flex items-center gap-2">
            <Activity size={14} /> Activité récente
          </h2>
          <div className="bg-white dark:bg-white/5 rounded-xl border border-gray-200/60 dark:border-white/8 divide-y divide-gray-100 dark:divide-white/5">
            {RECENT_ACTIONS.map((a, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.05 }}
                className="flex items-center gap-3 p-3 hover:bg-gray-50 dark:hover:bg-white/3 transition-colors"
              >
                <div
                  className="w-8 h-8 rounded-lg flex items-center justify-center shrink-0"
                  style={{ background: `${a.color}15` }}
                >
                  <a.icon size={14} style={{ color: a.color }} />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm text-gray-900 dark:text-white truncate">{a.text}</p>
                  <p className="text-[10px] text-gray-400">{a.time}</p>
                </div>
                <ArrowRight size={12} className="text-gray-300 dark:text-gray-600 shrink-0" />
              </motion.div>
            ))}
          </div>
        </section>

        {/* Geo */}
        <section id="admin-geo" className="lg:col-span-2">
          <h2 className="text-sm font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-3 flex items-center gap-2">
            <PieChart size={14} /> Répartition géographique
          </h2>
          <div className="bg-white dark:bg-white/5 rounded-xl border border-gray-200/60 dark:border-white/8 p-4 space-y-3">
            {GEO_REPARTITION.map((g, i) => (
              <motion.div
                key={g.city}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: i * 0.08 }}
              >
                <div className="flex justify-between text-sm mb-1">
                  <span className="font-medium text-gray-700 dark:text-gray-300">{g.city}</span>
                  <span className="text-gray-500 dark:text-gray-400">
                    {g.count} <span className="text-[10px]">({g.pct}%)</span>
                  </span>
                </div>
                <div
                  className="h-2 bg-gray-100 dark:bg-white/10 rounded-full overflow-hidden"
                  role="progressbar"
                  aria-valuenow={g.pct}
                  aria-valuemin={0}
                  aria-valuemax={100}
                  aria-label={`${g.city}: ${g.pct}%`}
                >
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${g.pct}%` }}
                    transition={{ duration: 0.8, delay: i * 0.1 }}
                    className="h-full rounded-full bg-linear-to-r from-red-500 to-red-400"
                  />
                </div>
              </motion.div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}
