'use client';

// GABON BIZ — Admin Système Dashboard
// Infrastructure monitoring, deployments, logs, system configuration
// Polish: framer-motion animations, accessibility, responsive grid, semantic HTML

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useAuth } from '@/lib/auth-context';
import {
  Activity,
  Database,
  Zap,
  Flame,
  Cloud,
  Settings,
  CheckCircle2,
  AlertTriangle,
  XCircle,
  Cpu,
  HardDrive,
  Wifi,
  MemoryStick,
  Rocket,
  Clock,
  User,
  Filter,
  ToggleLeft,
  ToggleRight,
  Server,
  GitBranch,
  Globe,
  ShieldCheck,
  Bot,
  Brain,
  Mic,
  MessageSquare,
  Languages,
  BarChart3,
  Download,
  RotateCcw,
  Trash2,
} from 'lucide-react';

/* ─── Mock Data ─── */

const SERVICES = [
  {
    name: 'API Gateway',
    status: 'healthy' as const,
    latency: '45ms',
    uptime: '99.99%',
    icon: Activity,
  },
  {
    name: 'PostgreSQL (Cloud SQL)',
    status: 'healthy' as const,
    latency: '12ms',
    uptime: '99.98%',
    icon: Database,
  },
  { name: 'Redis Cache', status: 'healthy' as const, latency: '2ms', uptime: '99.99%', icon: Zap },
  {
    name: 'Firebase Hosting',
    status: 'healthy' as const,
    latency: '28ms',
    uptime: '100%',
    icon: Flame,
  },
  {
    name: 'Cloud Run (Web)',
    status: 'warning' as const,
    latency: '120ms',
    uptime: '99.95%',
    icon: Cloud,
  },
  {
    name: 'Cloud Run (API)',
    status: 'healthy' as const,
    latency: '55ms',
    uptime: '99.97%',
    icon: Settings,
  },
];

const DEPLOYMENTS = [
  {
    id: 'deploy-007',
    service: 'web',
    version: 'v2.4.1',
    status: 'success',
    time: '12 mar 2026 · 19:45',
    duration: '2m 34s',
    author: 'Rodrigue M.',
  },
  {
    id: 'deploy-006',
    service: 'api-gateway',
    version: 'v1.8.3',
    status: 'success',
    time: '12 mar 2026 · 15:20',
    duration: '1m 48s',
    author: 'Rodrigue M.',
  },
  {
    id: 'deploy-005',
    service: 'web',
    version: 'v2.4.0',
    status: 'failed',
    time: '11 mar 2026 · 22:10',
    duration: '3m 12s',
    author: 'CI/CD',
  },
  {
    id: 'deploy-004',
    service: 'api-gateway',
    version: 'v1.8.2',
    status: 'success',
    time: '11 mar 2026 · 14:30',
    duration: '1m 55s',
    author: 'Rodrigue M.',
  },
  {
    id: 'deploy-003',
    service: 'web',
    version: 'v2.3.9',
    status: 'success',
    time: '10 mar 2026 · 09:15',
    duration: '2m 10s',
    author: 'CI/CD',
  },
];

const LOGS = [
  {
    time: '20:31:12',
    level: 'error',
    service: 'api-gateway',
    message: 'Connection timeout to upstream /api/auth/me — retrying (3/3)',
  },
  {
    time: '20:30:58',
    level: 'warn',
    service: 'cloud-run-web',
    message: 'High memory usage: 87% — consider scaling up',
  },
  {
    time: '20:28:44',
    level: 'info',
    service: 'redis',
    message: 'Cache hit ratio: 94.2% — 12,340 hits / 780 misses',
  },
  {
    time: '20:25:01',
    level: 'info',
    service: 'api-gateway',
    message: 'Health check passed — all endpoints responding',
  },
  {
    time: '20:22:33',
    level: 'warn',
    service: 'cloud-run-api',
    message: 'Slow query detected: SELECT * FROM enterprises — 450ms',
  },
  {
    time: '20:20:15',
    level: 'info',
    service: 'firebase',
    message: 'Hosting deployment v2.4.1 propagated to CDN edge nodes',
  },
  {
    time: '20:15:00',
    level: 'info',
    service: 'cloud-sql',
    message: 'Automated backup completed — 2.4 GB compressed',
  },
  {
    time: '20:10:22',
    level: 'error',
    service: 'api-gateway',
    message: 'Rate limit exceeded for IP 196.168.x.x — 429 returned',
  },
];

const METRICS = [
  { label: 'CPU Cloud Run', value: 87, unit: '%', status: 'warning' as const, icon: Cpu },
  { label: 'RAM Utilisée', value: 62, unit: '%', status: 'healthy' as const, icon: MemoryStick },
  { label: 'Stockage DB', value: 45, unit: '%', status: 'healthy' as const, icon: HardDrive },
  { label: 'Bande passante', value: 78, unit: '%', status: 'healthy' as const, icon: Wifi },
];

const FEATURE_FLAGS = [
  {
    key: 'ENABLE_INNOVATION_HUB',
    label: 'Innovation Hub',
    desc: 'Module Innovation Hub KIMBA',
    enabled: true,
  },
  {
    key: 'ENABLE_INCUBATEUR',
    label: 'Programme Incubateur',
    desc: 'Incubateur SING 2.0',
    enabled: true,
  },
  {
    key: 'ENABLE_CGI_SADA',
    label: 'Programme SADA',
    desc: 'Formations acculturation numérique',
    enabled: true,
  },
  {
    key: 'ENABLE_INVESTIR_SIMULATOR',
    label: 'Simulateur ROI',
    desc: 'Calculateur retour sur investissement',
    enabled: true,
  },
  {
    key: 'ENABLE_AI_MATCHING',
    label: 'Matching IA',
    desc: 'Recommandations intelligentes (beta)',
    enabled: false,
  },
  {
    key: 'MAINTENANCE_MODE',
    label: 'Mode Maintenance',
    desc: 'Page maintenance pour les utilisateurs',
    enabled: false,
  },
];

/* ─── Helpers ─── */

type HealthStatus = 'healthy' | 'warning' | 'error';

const STATUS_CONFIG: Record<
  HealthStatus,
  { bg: string; text: string; dot: string; label: string; Icon: typeof CheckCircle2 }
> = {
  healthy: {
    bg: 'bg-emerald-50 dark:bg-emerald-950/40',
    text: 'text-emerald-700 dark:text-emerald-400',
    dot: 'bg-emerald-500',
    label: 'OK',
    Icon: CheckCircle2,
  },
  warning: {
    bg: 'bg-amber-50 dark:bg-amber-950/40',
    text: 'text-amber-700 dark:text-amber-400',
    dot: 'bg-amber-500',
    label: 'Attention',
    Icon: AlertTriangle,
  },
  error: {
    bg: 'bg-red-50 dark:bg-red-950/40',
    text: 'text-red-700 dark:text-red-400',
    dot: 'bg-red-500',
    label: 'Erreur',
    Icon: XCircle,
  },
};

const LOG_COLORS: Record<string, string> = {
  info: 'text-blue-400',
  warn: 'text-amber-400',
  error: 'text-red-400',
};
const DEPLOY_STYLES: Record<string, string> = {
  success: 'bg-emerald-100 text-emerald-700 dark:bg-emerald-900/50 dark:text-emerald-400',
  failed: 'bg-red-100 text-red-700 dark:bg-red-900/50 dark:text-red-400',
};

const SYSTEM_INFO = [
  { icon: Server, label: 'Environnement', value: 'Production' },
  { icon: Globe, label: 'Région', value: 'europe-west1' },
  { icon: GitBranch, label: 'Framework', value: 'Next.js 15.x' },
  { icon: Settings, label: 'Node', value: 'v22 LTS' },
  { icon: Database, label: 'Base de données', value: 'Cloud SQL PostgreSQL 15' },
  { icon: Zap, label: 'Cache', value: 'Redis 7.2 Memorystore' },
  { icon: ShieldCheck, label: 'CDN', value: 'Firebase Hosting + Cloud CDN' },
  { icon: Rocket, label: 'CI/CD', value: 'Cloud Build + GitHub Actions' },
];

const fadeUp = {
  hidden: { opacity: 0, y: 16 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.06, duration: 0.4, ease: 'easeOut' as const },
  }),
};

/* ─── Component ─── */

/* ─── iAsted Agent Config Defaults ─── */

const IASTED_DEFAULTS = {
  expertMode: true,
  localRouter: true,
  faqCache: true,
  voiceEnabled: true,
  learningEnabled: true,
  maxHistory: 10,
  maxTokensVoice: 500,
  maxTokensChat: 1000,
  idleTimeout: 120,
  confidenceThreshold: 0.6,
  temperature: 0.7,
  voiceGender: 'female' as 'male' | 'female',
};

type IAstedConfig = typeof IASTED_DEFAULTS;

function loadIastedConfig(): IAstedConfig {
  if (typeof window === 'undefined') return IASTED_DEFAULTS;
  try {
    const raw = localStorage.getItem('iasted_admin_config');
    return raw ? { ...IASTED_DEFAULTS, ...JSON.parse(raw) } : IASTED_DEFAULTS;
  } catch {
    return IASTED_DEFAULTS;
  }
}

const IASTED_STATS = {
  conversationsToday: 47,
  conversationsTotal: 1_234,
  voiceCommands: 312,
  topQuestions: [
    { q: 'Comment créer une entreprise ?', count: 89 },
    { q: "C'est quoi la SING ?", count: 67 },
    { q: 'Marchés publics en cours', count: 52 },
    { q: 'Coût création SARL', count: 41 },
    { q: 'Programme KIMBA', count: 38 },
  ],
  languages: [
    { lang: 'Français', pct: 78 },
    { lang: 'English', pct: 12 },
    { lang: 'Español', pct: 4 },
    { lang: '中文', pct: 3 },
    { lang: 'العربية', pct: 2 },
    { lang: 'Autre', pct: 1 },
  ],
};

export default function AdminDashboardPage() {
  const { user } = useAuth();
  const [logFilter, setLogFilter] = useState<string>('all');
  const [flags, setFlags] = useState(FEATURE_FLAGS);
  const [iastedConfig, setIastedConfig] = useState<IAstedConfig>(IASTED_DEFAULTS);

  // Load saved config on mount
  React.useEffect(() => {
    setIastedConfig(loadIastedConfig());
  }, []);

  const updateIastedConfig = (patch: Partial<IAstedConfig>) => {
    setIastedConfig((prev) => {
      const next = { ...prev, ...patch };
      try {
        localStorage.setItem('iasted_admin_config', JSON.stringify(next));
      } catch {
        /* noop */
      }
      return next;
    });
  };

  const resetIastedConfig = () => {
    setIastedConfig(IASTED_DEFAULTS);
    try {
      localStorage.removeItem('iasted_admin_config');
    } catch {
      /* noop */
    }
  };

  const filteredLogs = logFilter === 'all' ? LOGS : LOGS.filter((l) => l.level === logFilter);
  const healthyCount = SERVICES.filter((s) => s.status === 'healthy').length;

  const toggleFlag = (key: string) => {
    setFlags((prev) => prev.map((f) => (f.key === key ? { ...f, enabled: !f.enabled } : f)));
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-extrabold text-gray-900 dark:text-white flex items-center gap-3">
            <span
              className="w-10 h-10 rounded-xl bg-linear-to-br from-slate-600 to-slate-800 flex items-center justify-center text-white"
              aria-hidden="true"
            >
              <Settings size={20} />
            </span>
            Administration Système
          </h1>
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
            Supervision de l&apos;infrastructure GABON BIZ — Opérateur : {user?.name || 'Admin'}
          </p>
        </div>
        <div className="flex items-center gap-2 text-xs">
          <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-emerald-50 dark:bg-emerald-950/40 text-emerald-700 dark:text-emerald-400 font-semibold">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            {healthyCount}/{SERVICES.length} services opérationnels
          </span>
        </div>
      </div>

      {/* Services Status */}
      <section aria-label="Statut des services">
        <h2 className="text-lg font-bold text-gray-900 dark:text-white mb-3 flex items-center gap-2">
          <Activity size={18} className="text-emerald-500" /> Statut des Services
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
          {SERVICES.map((svc, i) => {
            const st = STATUS_CONFIG[svc.status];
            const SvcIcon = svc.icon;
            return (
              <motion.div
                key={svc.name}
                variants={fadeUp}
                custom={i}
                initial="hidden"
                animate="visible"
                className={`p-4 rounded-xl border bg-white dark:bg-gray-900 ${
                  svc.status === 'warning'
                    ? 'border-amber-200 dark:border-amber-800 ring-1 ring-amber-100 dark:ring-amber-900/50'
                    : 'border-gray-200 dark:border-gray-800'
                }`}
              >
                <div className="flex items-center justify-between mb-3">
                  <SvcIcon size={18} className="text-gray-400 dark:text-gray-500" />
                  <span
                    className={`inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full text-[11px] font-semibold ${st.bg} ${st.text}`}
                  >
                    <span className={`w-1.5 h-1.5 rounded-full ${st.dot}`} />
                    {st.label}
                  </span>
                </div>
                <h3 className="text-sm font-bold text-gray-900 dark:text-white">{svc.name}</h3>
                <div className="flex gap-4 mt-2 text-xs text-gray-500 dark:text-gray-400">
                  <span>
                    Latence:{' '}
                    <strong className="text-gray-700 dark:text-gray-300">{svc.latency}</strong>
                  </span>
                  <span>
                    Uptime:{' '}
                    <strong className="text-gray-700 dark:text-gray-300">{svc.uptime}</strong>
                  </span>
                </div>
              </motion.div>
            );
          })}
        </div>
      </section>

      {/* Performance Metrics */}
      <section aria-label="Métriques de performance">
        <h2 className="text-lg font-bold text-gray-900 dark:text-white mb-3 flex items-center gap-2">
          <Cpu size={18} className="text-blue-500" /> Métriques Performance
        </h2>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
          {METRICS.map((m, i) => {
            const color = m.status === 'warning' ? '#f59e0b' : '#10b981';
            const MetricIcon = m.icon;
            return (
              <motion.div
                key={m.label}
                variants={fadeUp}
                custom={i + 6}
                initial="hidden"
                animate="visible"
                className="p-4 rounded-xl bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800"
              >
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs text-gray-500 dark:text-gray-400">{m.label}</span>
                  <MetricIcon size={14} className="text-gray-400" />
                </div>
                <div className="text-2xl font-extrabold" style={{ color }}>
                  {m.value}
                  {m.unit}
                </div>
                <div
                  className="mt-2 h-2 rounded-full bg-gray-100 dark:bg-gray-800 overflow-hidden"
                  role="progressbar"
                  aria-valuenow={m.value}
                  aria-valuemin={0}
                  aria-valuemax={100}
                  aria-label={`${m.label}: ${m.value}${m.unit}`}
                >
                  <motion.div
                    className="h-full rounded-full"
                    style={{ background: color }}
                    initial={{ width: 0 }}
                    animate={{ width: `${m.value}%` }}
                    transition={{ duration: 0.8, delay: 0.2 + i * 0.1, ease: 'easeOut' as const }}
                  />
                </div>
              </motion.div>
            );
          })}
        </div>
      </section>

      {/* Deployments & Logs — side by side on desktop, stacked on mobile */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Deployments */}
        <section aria-label="Déploiements récents">
          <h2 className="text-lg font-bold text-gray-900 dark:text-white mb-3 flex items-center gap-2">
            <Rocket size={18} className="text-violet-500" /> Déploiements Récents
          </h2>
          <div className="space-y-2">
            {DEPLOYMENTS.map((d, i) => (
              <motion.div
                key={d.id}
                variants={fadeUp}
                custom={i}
                initial="hidden"
                animate="visible"
                className="flex items-center gap-3 p-3.5 rounded-xl bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800"
              >
                <span
                  className={`px-2 py-1 rounded-lg text-xs font-bold shrink-0 ${DEPLOY_STYLES[d.status]}`}
                >
                  {d.status === 'success' ? <CheckCircle2 size={12} /> : <XCircle size={12} />}
                </span>
                <div className="flex-1 min-w-0">
                  <div className="text-sm font-semibold text-gray-900 dark:text-white truncate">
                    {d.service} <span className="text-gray-400 font-normal">→</span> {d.version}
                  </div>
                  <div className="flex flex-wrap gap-x-3 gap-y-0.5 text-xs text-gray-500 dark:text-gray-400 mt-0.5">
                    <span className="inline-flex items-center gap-1">
                      <Clock size={10} /> {d.time}
                    </span>
                    <span>{d.duration}</span>
                    <span className="inline-flex items-center gap-1">
                      <User size={10} /> {d.author}
                    </span>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Logs */}
        <section aria-label="Logs système">
          <div className="flex items-center justify-between mb-3">
            <h2 className="text-lg font-bold text-gray-900 dark:text-white flex items-center gap-2">
              <Filter size={18} className="text-gray-500" /> Logs Système
            </h2>
            <div className="flex gap-1" role="group" aria-label="Filtrer par niveau de log">
              {(['all', 'error', 'warn', 'info'] as const).map((lvl) => (
                <button
                  key={lvl}
                  onClick={() => setLogFilter(lvl)}
                  aria-pressed={logFilter === lvl}
                  className={`px-2.5 py-1 rounded-lg text-xs font-medium border cursor-pointer transition-all ${
                    logFilter === lvl
                      ? 'bg-slate-700 text-white border-slate-700 dark:bg-slate-600 dark:border-slate-600'
                      : 'bg-white dark:bg-gray-900 text-gray-600 dark:text-gray-400 border-gray-200 dark:border-gray-700 hover:bg-gray-100 dark:hover:bg-gray-800'
                  }`}
                >
                  {lvl === 'all' ? 'Tous' : lvl.toUpperCase()}
                </button>
              ))}
            </div>
          </div>
          <div
            className="bg-gray-950 rounded-xl p-3 font-mono text-xs max-h-[340px] overflow-y-auto scrollbar-thin"
            role="log"
            aria-live="polite"
          >
            {filteredLogs.length === 0 ? (
              <div className="text-gray-500 text-center py-6">Aucun log pour ce filtre</div>
            ) : (
              filteredLogs.map((log, i) => (
                <div
                  key={i}
                  className="flex gap-2 py-1.5 border-b border-gray-800/50 last:border-0"
                >
                  <span className="text-gray-600 shrink-0 tabular-nums">{log.time}</span>
                  <span
                    className={`font-bold shrink-0 w-12 uppercase ${LOG_COLORS[log.level] || 'text-gray-400'}`}
                  >
                    {log.level}
                  </span>
                  <span className="text-cyan-400 shrink-0">[{log.service}]</span>
                  <span className="text-gray-300 wrap-break-word">{log.message}</span>
                </div>
              ))
            )}
          </div>
        </section>
      </div>

      {/* Feature Flags */}
      <section aria-label="Feature flags">
        <h2 className="text-lg font-bold text-gray-900 dark:text-white mb-3 flex items-center gap-2">
          <ToggleLeft size={18} className="text-orange-500" /> Feature Flags
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
          {flags.map((f) => {
            const FlagIcon = f.enabled ? ToggleRight : ToggleLeft;
            return (
              <div
                key={f.key}
                className="flex items-center justify-between p-4 rounded-xl bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800"
              >
                <div className="min-w-0 mr-3">
                  <div className="text-sm font-semibold text-gray-900 dark:text-white truncate">
                    {f.label}
                  </div>
                  <div className="text-[10px] text-gray-500 dark:text-gray-400 truncate">
                    {f.desc}
                  </div>
                  <div className="text-[10px] font-mono text-gray-400 mt-0.5">{f.key}</div>
                </div>
                <button
                  onClick={() => toggleFlag(f.key)}
                  role="switch"
                  aria-checked={f.enabled}
                  aria-label={`${f.label}: ${f.enabled ? 'activé' : 'désactivé'}`}
                  className={`relative w-11 h-6 rounded-full border-none cursor-pointer transition-colors duration-200 shrink-0 ${
                    f.enabled ? 'bg-emerald-500' : 'bg-gray-300 dark:bg-gray-700'
                  }`}
                >
                  <span
                    className={`absolute top-0.5 w-5 h-5 rounded-full bg-white transition-transform duration-200 flex items-center justify-center ${
                      f.enabled ? 'translate-x-[22px]' : 'translate-x-0.5'
                    }`}
                  >
                    <FlagIcon
                      size={10}
                      className={f.enabled ? 'text-emerald-600' : 'text-gray-400'}
                    />
                  </span>
                </button>
              </div>
            );
          })}
        </div>
      </section>

      {/* ═══════ iAsted — Agent IA Configuration ═══════ */}
      <section aria-label="Configuration iAsted">
        <h2 className="text-lg font-bold text-gray-900 dark:text-white mb-3 flex items-center gap-2">
          <Bot size={18} className="text-violet-500" /> iAsted — Agent IA
        </h2>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* ── Column 1: Toggles ── */}
          <div className="space-y-3">
            <h3 className="text-xs font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wider flex items-center gap-1.5">
              <Settings size={12} /> Comportement
            </h3>
            {[
              {
                key: 'expertMode' as const,
                label: 'Mode Expert',
                desc: 'Accompagnement proactif et conseil',
                icon: Brain,
              },
              {
                key: 'localRouter' as const,
                label: 'Routeur local',
                desc: 'Commandes instantanées côté client',
                icon: Zap,
              },
              {
                key: 'faqCache' as const,
                label: 'Cache FAQ',
                desc: 'Réponses fréquentes en cache',
                icon: Database,
              },
              {
                key: 'voiceEnabled' as const,
                label: 'Voix activée',
                desc: 'Synthèse vocale des réponses',
                icon: Mic,
              },
              {
                key: 'learningEnabled' as const,
                label: 'Apprentissage',
                desc: 'Enregistre les interactions',
                icon: Brain,
              },
            ].map((toggle) => {
              const ToggleIcon = toggle.icon;
              const isOn = iastedConfig[toggle.key] as boolean;
              return (
                <div
                  key={toggle.key}
                  className="flex items-center justify-between p-3 rounded-xl bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800"
                >
                  <div className="flex items-center gap-2.5 min-w-0 mr-3">
                    <div className="w-8 h-8 rounded-lg bg-violet-50 dark:bg-violet-500/10 flex items-center justify-center shrink-0">
                      <ToggleIcon size={14} className="text-violet-600 dark:text-violet-400" />
                    </div>
                    <div className="min-w-0">
                      <div className="text-sm font-semibold text-gray-900 dark:text-white truncate">
                        {toggle.label}
                      </div>
                      <div className="text-[10px] text-gray-500 dark:text-gray-400 truncate">
                        {toggle.desc}
                      </div>
                    </div>
                  </div>
                  <button
                    onClick={() => updateIastedConfig({ [toggle.key]: !isOn })}
                    role="switch"
                    aria-checked={isOn}
                    aria-label={`${toggle.label}: ${isOn ? 'activé' : 'désactivé'}`}
                    className={`relative w-11 h-6 rounded-full border-none cursor-pointer transition-colors duration-200 shrink-0 ${
                      isOn ? 'bg-violet-500' : 'bg-gray-300 dark:bg-gray-700'
                    }`}
                  >
                    <span
                      className={`absolute top-0.5 w-5 h-5 rounded-full bg-white shadow-sm transition-transform duration-200 flex items-center justify-center ${
                        isOn ? 'translate-x-[22px]' : 'translate-x-0.5'
                      }`}
                    >
                      {isOn ? (
                        <ToggleRight size={10} className="text-violet-600" />
                      ) : (
                        <ToggleLeft size={10} className="text-gray-400" />
                      )}
                    </span>
                  </button>
                </div>
              );
            })}
          </div>

          {/* ── Column 2: Sliders ── */}
          <div className="space-y-3">
            <h3 className="text-xs font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wider flex items-center gap-1.5">
              <Activity size={12} /> Paramètres
            </h3>
            {[
              {
                key: 'maxHistory' as const,
                label: 'Historique max',
                min: 5,
                max: 30,
                step: 1,
                unit: 'msg',
                icon: MessageSquare,
              },
              {
                key: 'maxTokensVoice' as const,
                label: 'Tokens (voix)',
                min: 100,
                max: 1000,
                step: 50,
                unit: 'tok',
                icon: Mic,
              },
              {
                key: 'maxTokensChat' as const,
                label: 'Tokens (chat)',
                min: 500,
                max: 2000,
                step: 100,
                unit: 'tok',
                icon: MessageSquare,
              },
              {
                key: 'idleTimeout' as const,
                label: 'Idle timeout',
                min: 30,
                max: 300,
                step: 15,
                unit: 's',
                icon: Clock,
              },
              {
                key: 'confidenceThreshold' as const,
                label: 'Seuil confiance',
                min: 0.1,
                max: 1.0,
                step: 0.05,
                unit: '',
                icon: Brain,
              },
              {
                key: 'temperature' as const,
                label: 'Température IA',
                min: 0.0,
                max: 1.0,
                step: 0.05,
                unit: '',
                icon: Flame,
              },
            ].map((slider) => {
              const SliderIcon = slider.icon;
              const value = iastedConfig[slider.key] as number;
              return (
                <div
                  key={slider.key}
                  className="p-3 rounded-xl bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800"
                >
                  <div className="flex items-center justify-between mb-1.5">
                    <div className="flex items-center gap-1.5">
                      <SliderIcon size={12} className="text-violet-500" />
                      <span className="text-xs font-semibold text-gray-700 dark:text-gray-300">
                        {slider.label}
                      </span>
                    </div>
                    <span className="text-xs font-bold text-violet-600 dark:text-violet-400 tabular-nums">
                      {slider.step < 1 ? value.toFixed(2) : value}
                      {slider.unit}
                    </span>
                  </div>
                  <input
                    type="range"
                    min={slider.min}
                    max={slider.max}
                    step={slider.step}
                    value={value}
                    onChange={(e) =>
                      updateIastedConfig({ [slider.key]: parseFloat(e.target.value) })
                    }
                    className="w-full h-1.5 rounded-full appearance-none bg-gray-200 dark:bg-gray-700 cursor-pointer accent-violet-500"
                    aria-label={slider.label}
                  />
                  <div className="flex justify-between mt-0.5">
                    <span className="text-[9px] text-gray-400">
                      {slider.step < 1 ? slider.min.toFixed(1) : slider.min}
                    </span>
                    <span className="text-[9px] text-gray-400">
                      {slider.step < 1 ? slider.max.toFixed(1) : slider.max}
                    </span>
                  </div>
                </div>
              );
            })}

            {/* Voice Gender Select */}
            <div className="p-3 rounded-xl bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800">
              <div className="flex items-center gap-1.5 mb-1.5">
                <Mic size={12} className="text-violet-500" />
                <span className="text-xs font-semibold text-gray-700 dark:text-gray-300">
                  Genre de voix
                </span>
              </div>
              <div className="flex gap-2">
                {(['female', 'male'] as const).map((g) => (
                  <button
                    key={g}
                    onClick={() => updateIastedConfig({ voiceGender: g })}
                    className={`flex-1 py-1.5 rounded-lg text-xs font-semibold border cursor-pointer transition-all ${
                      iastedConfig.voiceGender === g
                        ? 'bg-violet-500 text-white border-violet-500'
                        : 'bg-white dark:bg-gray-900 text-gray-600 dark:text-gray-400 border-gray-200 dark:border-gray-700 hover:bg-gray-100 dark:hover:bg-gray-800'
                    }`}
                  >
                    {g === 'female' ? '♀ Femme' : '♂ Homme'}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* ── Column 3: Stats + Actions ── */}
          <div className="space-y-3">
            <h3 className="text-xs font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wider flex items-center gap-1.5">
              <BarChart3 size={12} /> Statistiques Agent
            </h3>

            {/* KPIs */}
            <div className="grid grid-cols-2 gap-2">
              {[
                { label: "Aujourd'hui", value: IASTED_STATS.conversationsToday, color: '#8b5cf6' },
                {
                  label: 'Total conv.',
                  value: IASTED_STATS.conversationsTotal.toLocaleString(),
                  color: '#3b82f6',
                },
                { label: 'Cmd vocales', value: IASTED_STATS.voiceCommands, color: '#10b981' },
                { label: 'Langues', value: IASTED_STATS.languages.length, color: '#f59e0b' },
              ].map((kpi) => (
                <div
                  key={kpi.label}
                  className="p-3 rounded-xl bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 text-center"
                >
                  <div className="text-lg font-extrabold" style={{ color: kpi.color }}>
                    {kpi.value}
                  </div>
                  <div className="text-[10px] text-gray-500 dark:text-gray-400">{kpi.label}</div>
                </div>
              ))}
            </div>

            {/* Top Questions */}
            <div className="p-3 rounded-xl bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800">
              <div className="text-xs font-semibold text-gray-700 dark:text-gray-300 mb-2 flex items-center gap-1.5">
                <MessageSquare size={12} className="text-violet-500" /> Questions fréquentes
              </div>
              <div className="space-y-1.5">
                {IASTED_STATS.topQuestions.map((q, i) => (
                  <div key={i} className="flex items-center gap-2">
                    <span className="text-[10px] font-bold text-violet-500 w-4 text-right shrink-0">
                      #{i + 1}
                    </span>
                    <div className="flex-1 min-w-0">
                      <div className="text-[11px] text-gray-700 dark:text-gray-300 truncate">
                        {q.q}
                      </div>
                    </div>
                    <span className="text-[10px] font-bold text-gray-400 shrink-0">{q.count}×</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Language Distribution */}
            <div className="p-3 rounded-xl bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800">
              <div className="text-xs font-semibold text-gray-700 dark:text-gray-300 mb-2 flex items-center gap-1.5">
                <Languages size={12} className="text-violet-500" /> Distribution langues
              </div>
              <div className="space-y-1">
                {IASTED_STATS.languages.map((l) => (
                  <div key={l.lang} className="flex items-center gap-2">
                    <span className="text-[11px] text-gray-600 dark:text-gray-400 w-14 truncate shrink-0">
                      {l.lang}
                    </span>
                    <div className="flex-1 h-1.5 bg-gray-100 dark:bg-gray-800 rounded-full overflow-hidden">
                      <div
                        className="h-full rounded-full bg-violet-500"
                        style={{ width: `${l.pct}%` }}
                      />
                    </div>
                    <span className="text-[10px] font-bold text-gray-400 w-7 text-right shrink-0">
                      {l.pct}%
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Quick Actions */}
            <div className="space-y-2">
              <h3 className="text-xs font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wider flex items-center gap-1.5">
                <Zap size={12} /> Actions rapides
              </h3>
              <button
                onClick={resetIastedConfig}
                className="w-full flex items-center gap-2 px-3 py-2 rounded-lg text-xs font-semibold bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors cursor-pointer"
              >
                <RotateCcw size={12} /> Réinitialiser les paramètres
              </button>
              <button
                onClick={() => {
                  try {
                    localStorage.removeItem('iasted_faq_cache');
                  } catch {
                    /* */
                  }
                }}
                className="w-full flex items-center gap-2 px-3 py-2 rounded-lg text-xs font-semibold bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors cursor-pointer"
              >
                <Trash2 size={12} /> Vider le cache FAQ
              </button>
              <button
                onClick={() => {
                  const blob = new Blob(
                    [
                      JSON.stringify(
                        {
                          config: iastedConfig,
                          stats: IASTED_STATS,
                          exportedAt: new Date().toISOString(),
                        },
                        null,
                        2,
                      ),
                    ],
                    { type: 'application/json' },
                  );
                  const url = URL.createObjectURL(blob);
                  const a = document.createElement('a');
                  a.href = url;
                  a.download = 'iasted_analytics.json';
                  a.click();
                  URL.revokeObjectURL(url);
                }}
                className="w-full flex items-center gap-2 px-3 py-2 rounded-lg text-xs font-semibold bg-violet-50 dark:bg-violet-500/10 border border-violet-200 dark:border-violet-800 text-violet-700 dark:text-violet-400 hover:bg-violet-100 dark:hover:bg-violet-500/20 transition-colors cursor-pointer"
              >
                <Download size={12} /> Télécharger les analytics
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* System Info */}
      <section
        aria-label="Informations système"
        className="p-5 rounded-xl bg-gray-100 dark:bg-gray-900/50 border border-gray-200 dark:border-gray-800"
      >
        <h3 className="text-sm font-bold text-gray-600 dark:text-gray-400 mb-3 flex items-center gap-2">
          <Server size={14} /> Informations Système
        </h3>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {SYSTEM_INFO.map((info) => {
            const InfoIcon = info.icon;
            return (
              <div key={info.label} className="flex items-start gap-2 text-xs">
                <InfoIcon size={12} className="text-gray-400 mt-0.5 shrink-0" />
                <div>
                  <span className="text-gray-400 block">{info.label}</span>
                  <strong className="text-gray-700 dark:text-gray-300">{info.value}</strong>
                </div>
              </div>
            );
          })}
        </div>
      </section>
    </div>
  );
}
