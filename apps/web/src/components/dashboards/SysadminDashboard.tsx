'use client';

// GABON BIZ — Espace Admin Système / DevOps
// Rodrigue Mba Ondo — Administrateur Système & DevOps, GABON BIZ

import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import {
  Monitor,
  Server,
  Activity,
  AlertTriangle,
  Rocket,
  CheckCircle2,
  XCircle,
  Bell,
  Shield,
  Settings,
  Database,
  Wifi,
} from 'lucide-react';

/* ═══════ MOCK DATA ═══════ */

const STATS = [
  { icon: Activity, label: 'Uptime', value: '99.94%', color: '#10b981' },
  { icon: Server, label: 'Req / 24h', value: '145K', color: '#3b82f6' },
  { icon: AlertTriangle, label: 'Erreurs 5xx', value: '3', color: '#ef4444' },
  { icon: Rocket, label: 'Déploiements', value: '12', color: '#8b5cf6' },
];

const ServiceIcon: Record<string, typeof Server> = {
  'Cloud Run (API)': Server,
  PostgreSQL: Database,
  Redis: Database,
  'Firebase Hosting': Wifi,
  'OpenAI TTS/STT': Activity,
  'OpenAI API': Activity,
};

const SERVICES = [
  {
    name: 'Cloud Run (API)',
    status: 'healthy',
    latency: '12ms',
    uptime: '99.97%',
    region: 'europe-west1',
  },
  {
    name: 'PostgreSQL',
    status: 'healthy',
    latency: '3ms',
    uptime: '99.99%',
    region: 'europe-west1',
  },
  { name: 'Redis', status: 'warning', latency: '45ms', uptime: '99.91%', region: 'europe-west1' },
  {
    name: 'Firebase Hosting',
    status: 'healthy',
    latency: '8ms',
    uptime: '99.98%',
    region: 'global',
  },
  {
    name: 'OpenAI TTS/STT',
    status: 'healthy',
    latency: '320ms',
    uptime: '99.85%',
    region: 'us-east',
  },
  { name: 'OpenAI API', status: 'healthy', latency: '180ms', uptime: '99.92%', region: 'global' },
];

const DEPLOYS = [
  {
    v: 'v2.4.1',
    date: '14 mars 14:32',
    ok: true,
    msg: 'Fix rate limiter + quotas journaliers',
    by: 'Rodrigue M.',
  },
  {
    v: 'v2.4.0',
    date: '13 mars 21:15',
    ok: true,
    msg: 'Audit iAsted + function calling GPT',
    by: 'Rodrigue M.',
  },
  {
    v: 'v2.3.8',
    date: '12 mars 19:30',
    ok: true,
    msg: 'Fix dashboard gaps + dead buttons',
    by: 'Rodrigue M.',
  },
  {
    v: 'v2.3.7',
    date: '11 mars 12:00',
    ok: false,
    msg: 'Annuaire redesign (rollback partiel)',
    by: 'Rodrigue M.',
  },
];

const ALERTS = [
  {
    severity: 'warning',
    msg: 'Redis — pic latence 45ms (seuil: 30ms)',
    time: 'Il y a 2h',
    resolved: false,
    icon: AlertTriangle,
    color: '#f59e0b',
  },
  {
    severity: 'info',
    msg: 'Feature flag "Matching IA" activé',
    time: 'Il y a 4h',
    resolved: true,
    icon: Bell,
    color: '#3b82f6',
  },
  {
    severity: 'error',
    msg: 'Erreur 500 /api/chat/stream (timeout GPT)',
    time: 'Hier 23:15',
    resolved: true,
    icon: XCircle,
    color: '#ef4444',
  },
  {
    severity: 'info',
    msg: 'Certificat SSL renouvelé — gabon-biz.web.app',
    time: 'Il y a 2j',
    resolved: true,
    icon: Shield,
    color: '#10b981',
  },
];

const STATUS_DOT: Record<string, string> = {
  healthy: 'bg-emerald-500',
  warning: 'bg-amber-500',
  error: 'bg-red-500',
};

/* ═══════ COMPONENT ═══════ */

export default function SysadminDashboard({
  user,
}: {
  user: { name?: string; title?: string; organization?: string };
}) {
  return (
    <div className="space-y-6">
      {/* ═══════ HERO ═══════ */}
      <motion.section
        id="sysadmin-hero"
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        className="rounded-2xl p-6 sm:p-8 text-white relative overflow-hidden"
        style={{ background: 'linear-gradient(135deg, #334155 0%, #1e293b 50%, #0f172a 100%)' }}
      >
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(255,255,255,0.08),transparent_50%)]" />
        <div className="absolute top-4 right-6 opacity-10 hidden sm:block" aria-hidden="true">
          <Monitor size={120} />
        </div>
        <div className="relative z-10">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-12 h-12 rounded-xl bg-white/15 backdrop-blur-sm flex items-center justify-center shrink-0">
              <Monitor size={24} />
            </div>
            <div className="min-w-0">
              <div className="flex items-center gap-2 flex-wrap">
                <h1 className="text-xl sm:text-2xl font-bold">
                  Bienvenue, {user?.name || 'Rodrigue M.'} 👋
                </h1>
                <span className="text-[10px] font-bold bg-white/15 px-2 py-0.5 rounded-full uppercase tracking-wider shrink-0">
                  Sysadmin
                </span>
              </div>
              <p className="text-sm opacity-80 truncate">
                {user?.title || 'Administrateur Système & DevOps'} —{' '}
                {user?.organization || 'GABON BIZ — Équipe Technique'}
              </p>
            </div>
          </div>
          <p className="text-sm opacity-60 mt-3 max-w-2xl">
            Supervisez l&apos;infrastructure, gérez les déploiements et monitorez la performance des
            services en temps réel.
          </p>
        </div>
      </motion.section>

      {/* ═══════ STATS ═══════ */}
      <section id="sysadmin-stats" className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
        {STATS.map((s, i) => (
          <motion.div
            key={s.label}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.06 }}
            className="bg-white dark:bg-white/5 rounded-xl border border-gray-200/60 dark:border-white/8 p-4"
          >
            <div className="flex items-center gap-2 mb-2">
              <div
                className="w-8 h-8 rounded-lg flex items-center justify-center"
                style={{ background: `${s.color}15` }}
              >
                <s.icon size={16} style={{ color: s.color }} />
              </div>
              <span className="text-[11px] font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                {s.label}
              </span>
            </div>
            <p className="text-xl font-bold text-gray-900 dark:text-white">{s.value}</p>
          </motion.div>
        ))}
      </section>

      {/* ═══════ SERVICES STATUS ═══════ */}
      <section id="sysadmin-services">
        <h2 className="text-sm font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-3 flex items-center gap-2">
          <Server size={14} /> État des Services
        </h2>
        <div className="bg-white dark:bg-white/5 rounded-xl border border-gray-200/60 dark:border-white/8 overflow-hidden">
          {/* Desktop table */}
          <div className="hidden sm:block">
            <table className="w-full text-sm" role="table" aria-label="État des services">
              <thead>
                <tr className="border-b border-gray-200 dark:border-white/5 bg-gray-100/50 dark:bg-white/2">
                  <th className="text-left py-3 px-4 text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase">
                    Service
                  </th>
                  <th className="text-center py-3 px-4 text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase">
                    Status
                  </th>
                  <th className="text-center py-3 px-4 text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase">
                    Latence
                  </th>
                  <th className="text-center py-3 px-4 text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase hidden md:table-cell">
                    Uptime
                  </th>
                  <th className="text-right py-3 px-4 text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase hidden lg:table-cell">
                    Région
                  </th>
                </tr>
              </thead>
              <tbody>
                {SERVICES.map((s) => {
                  const Icon = ServiceIcon[s.name] || Server;
                  return (
                    <tr
                      key={s.name}
                      className="border-b border-gray-50 dark:border-white/3 hover:bg-gray-100 dark:hover:bg-white/2 transition-colors"
                    >
                      <td className="py-3 px-4">
                        <div className="flex items-center gap-2">
                          <Icon size={14} className="text-gray-400 shrink-0" />
                          <span className="font-semibold text-gray-900 dark:text-white">
                            {s.name}
                          </span>
                        </div>
                      </td>
                      <td className="py-3 px-4 text-center">
                        <span className="inline-flex items-center gap-1.5">
                          <span className={`w-2 h-2 rounded-full ${STATUS_DOT[s.status] || ''}`} />
                          <span className="text-xs text-gray-500 dark:text-gray-400 capitalize">
                            {s.status}
                          </span>
                        </span>
                      </td>
                      <td className="py-3 px-4 text-center font-mono text-xs text-gray-500 dark:text-gray-400">
                        {s.latency}
                      </td>
                      <td className="py-3 px-4 text-center font-semibold text-emerald-600 hidden md:table-cell">
                        {s.uptime}
                      </td>
                      <td className="py-3 px-4 text-right text-xs text-gray-400 hidden lg:table-cell">
                        {s.region}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
          {/* Mobile cards */}
          <div className="sm:hidden divide-y divide-gray-100 dark:divide-white/5">
            {SERVICES.map((s) => (
              <div key={s.name} className="p-4">
                <div className="flex items-center justify-between mb-1">
                  <span className="font-semibold text-sm text-gray-900 dark:text-white">
                    {s.name}
                  </span>
                  <span className="inline-flex items-center gap-1.5">
                    <span className={`w-2 h-2 rounded-full ${STATUS_DOT[s.status] || ''}`} />
                    <span className="text-xs text-gray-500 capitalize">{s.status}</span>
                  </span>
                </div>
                <div className="flex items-center gap-3 text-xs text-gray-500 dark:text-gray-400">
                  <span>{s.latency}</span>
                  <span>·</span>
                  <span className="font-semibold text-emerald-600">{s.uptime}</span>
                  <span>·</span>
                  <span>{s.region}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════ TWO-COLUMN: Deployments + Alerts ═══════ */}
      <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
        {/* DEPLOYMENTS */}
        <section id="sysadmin-deploys" className="lg:col-span-3">
          <h2 className="text-sm font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-3 flex items-center gap-2">
            <Rocket size={14} /> Derniers Déploiements
          </h2>
          <div className="bg-white dark:bg-white/5 rounded-xl border border-gray-200/60 dark:border-white/8 divide-y divide-gray-100 dark:divide-white/5">
            {DEPLOYS.map((d, i) => (
              <motion.div
                key={d.v}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.05 }}
                className="flex items-start gap-3 p-3 hover:bg-gray-100 dark:hover:bg-white/3 transition-colors"
              >
                <div
                  className={`w-8 h-8 rounded-lg flex items-center justify-center shrink-0 ${d.ok ? 'bg-emerald-50 dark:bg-emerald-500/10' : 'bg-amber-50 dark:bg-amber-500/10'}`}
                >
                  {d.ok ? (
                    <CheckCircle2 size={14} className="text-emerald-600" />
                  ) : (
                    <AlertTriangle size={14} className="text-amber-600" />
                  )}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-0.5">
                    <span className="text-sm font-bold font-mono text-gray-900 dark:text-white">
                      {d.v}
                    </span>
                    <span className="text-[10px] text-gray-400">{d.date}</span>
                  </div>
                  <p className="text-xs text-gray-500 dark:text-gray-400 truncate">{d.msg}</p>
                </div>
                <span className="text-[10px] text-gray-400 shrink-0 hidden sm:block">{d.by}</span>
              </motion.div>
            ))}
          </div>
        </section>

        {/* ALERTS + QUICK ACCESS */}
        <section id="sysadmin-alerts" className="lg:col-span-2 space-y-6">
          <div>
            <h2 className="text-sm font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-3 flex items-center gap-2">
              <Bell size={14} /> Alertes
            </h2>
            <div className="bg-white dark:bg-white/5 rounded-xl border border-gray-200/60 dark:border-white/8 divide-y divide-gray-100 dark:divide-white/5">
              {ALERTS.map((a, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 + i * 0.05 }}
                  className={`flex items-start gap-3 p-3 ${a.resolved ? 'opacity-50' : ''}`}
                >
                  <div
                    className="w-8 h-8 rounded-lg flex items-center justify-center shrink-0"
                    style={{ background: `${a.color}15` }}
                  >
                    <a.icon size={14} style={{ color: a.color }} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-xs text-gray-700 dark:text-gray-300 truncate">{a.msg}</p>
                    <div className="flex items-center gap-2 mt-1">
                      <p className="text-[10px] text-gray-400">{a.time}</p>
                      {a.resolved && (
                        <span className="text-[10px] font-bold text-emerald-600">Résolu</span>
                      )}
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Quick Access */}
          <div>
            <h2 className="text-sm font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-3">
              Accès rapide
            </h2>
            <div className="grid grid-cols-2 gap-3">
              {[
                {
                  icon: Settings,
                  title: 'Console',
                  desc: 'Admin panel',
                  href: '/dashboard/admin',
                  color: '#334155',
                },
                {
                  icon: Activity,
                  title: 'Monitoring',
                  desc: 'Live metrics',
                  href: '/dashboard/admin',
                  color: '#3b82f6',
                },
              ].map((mod, i) => (
                <motion.div
                  key={mod.title}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 + i * 0.05 }}
                >
                  <Link
                    href={mod.href}
                    aria-label={`Accéder ${mod.title}`}
                    className="block bg-white dark:bg-white/5 rounded-xl border border-gray-200/60 dark:border-white/8 p-4 hover:-translate-y-0.5 transition-all group no-underline"
                  >
                    <div
                      className="w-9 h-9 rounded-lg flex items-center justify-center text-white mb-3"
                      style={{ background: mod.color }}
                    >
                      <mod.icon size={16} />
                    </div>
                    <h3 className="text-sm font-bold text-gray-900 dark:text-white mb-0.5 group-hover:text-slate-500 transition-colors">
                      {mod.title}
                    </h3>
                    <p className="text-[10px] text-gray-500 dark:text-gray-400">{mod.desc}</p>
                  </Link>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
