'use client';

// GABON BIZ — Espace Analyste Observatoire
// Hervé Essono — Analyste Données Numériques, ANINF

import React, { useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import {
  BarChart3,
  TrendingUp,
  TrendingDown,
  AlertTriangle,
  FileText,
  Database,
  Globe,
  Activity,
  Download,
  Factory,
  BookOpen,
  Eye,
  RefreshCw,
} from 'lucide-react';

/* ═══════ MOCK DATA ═══════ */

const KEY_INDICATORS = [
  {
    name: 'Taux de pénétration Internet',
    value: 62.3,
    unit: '%',
    trend: +2.1,
    period: 'Q4 2025',
    category: 'Infrastructure',
    color: '#3b82f6',
  },
  {
    name: 'Couverture 4G',
    value: 78.5,
    unit: '%',
    trend: +5.3,
    period: 'Q4 2025',
    category: 'Infrastructure',
    color: '#3b82f6',
  },
  {
    name: 'Score e-Government (ONU)',
    value: 0.52,
    unit: '/1',
    trend: +0.04,
    period: '2024',
    category: 'Politiques',
    color: '#8b5cf6',
  },
  {
    name: 'Startups enregistrées',
    value: 128,
    unit: '',
    trend: +15,
    period: 'Q4 2025',
    category: 'Innovation',
    color: '#f59e0b',
  },
  {
    name: 'Femmes dans le numérique',
    value: 28.7,
    unit: '%',
    trend: +1.2,
    period: '2025',
    category: 'Inclusion',
    color: '#ec4899',
  },
  {
    name: 'Diplômés STEM annuels',
    value: 2150,
    unit: '',
    trend: +120,
    period: '2025',
    category: 'Compétences',
    color: '#10b981',
  },
  {
    name: 'Brevets déposés',
    value: 34,
    unit: '',
    trend: +8,
    period: '2025',
    category: 'Innovation',
    color: '#f59e0b',
  },
  {
    name: 'Accès mobile rural',
    value: 45.2,
    unit: '%',
    trend: -3.2,
    period: 'Q4 2025',
    category: 'Inclusion',
    color: '#ec4899',
  },
];

const ANOMALIES = [
  {
    indicator: 'Taux pénétration Internet',
    expected: '64.5%',
    actual: '62.3%',
    deviation: '-3.4%',
    severity: 'medium',
    detail: 'Baisse inattendue liée aux coupures réseau en zone rurale',
  },
  {
    indicator: 'Accès mobile rural',
    expected: '48.0%',
    actual: '45.2%',
    deviation: '-5.8%',
    severity: 'high',
    detail: 'Dégradation significative — investigation infrastructure requise',
  },
];

const RECENT_REPORTS = [
  {
    title: 'Rapport Observatoire Q4 2025',
    type: 'PDF',
    date: '5 mars 2026',
    status: 'Publié',
    pages: 42,
  },
  {
    title: 'Tableau de bord IDES 2025',
    type: 'Excel',
    date: '28 fév 2026',
    status: 'Publié',
    pages: 15,
  },
  {
    title: 'Rapport Inclusion Numérique',
    type: 'PDF',
    date: '15 fév 2026',
    status: 'Brouillon',
    pages: 28,
  },
];

const API_STATS = [
  { endpoint: '/api/v1/indicators', calls: '12,450', uptime: '99.8%' },
  { endpoint: '/api/v1/enterprises', calls: '8,230', uptime: '99.9%' },
  { endpoint: '/api/v1/reports', calls: '3,120', uptime: '99.7%' },
];

/* ═══════ COMPONENT ═══════ */

export default function AnalysteDashboard({
  user,
}: {
  user: { name?: string; title?: string; organization?: string };
}) {
  const [categoryFilter, setCategoryFilter] = useState('Tous');
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [downloadingReport, setDownloadingReport] = useState<number | null>(null);
  const categories = ['Tous', ...new Set(KEY_INDICATORS.map((i) => i.category))];
  const filteredIndicators =
    categoryFilter === 'Tous'
      ? KEY_INDICATORS
      : KEY_INDICATORS.filter((i) => i.category === categoryFilter);

  const handleRefresh = () => {
    setIsRefreshing(true);
    setTimeout(() => setIsRefreshing(false), 1500);
  };

  const handleDownload = (index: number, title: string) => {
    setDownloadingReport(index);
    // Simulated download — in production, this would fetch from the API
    setTimeout(() => {
      setDownloadingReport(null);
      // Create a mock download
      const blob = new Blob([`Rapport: ${title}\nDate: ${new Date().toLocaleDateString('fr-FR')}\n\nContenu du rapport...`], { type: 'text/plain' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `${title.replace(/\s+/g, '_')}.txt`;
      a.click();
      URL.revokeObjectURL(url);
    }, 800);
  };

  return (
    <div className="space-y-6">
      {/* ═══════ HERO ═══════ */}
      <motion.section
        id="analyste-hero"
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        className="rounded-2xl p-6 sm:p-8 text-white relative overflow-hidden"
        style={{ background: 'linear-gradient(135deg, #f59e0b 0%, #d97706 50%, #b45309 100%)' }}
      >
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(255,255,255,0.15),transparent_50%)]" />
        <div className="absolute top-4 right-6 opacity-10 hidden sm:block" aria-hidden="true">
          <BarChart3 size={120} />
        </div>
        <div className="relative z-10">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-12 h-12 rounded-xl bg-white/20 backdrop-blur-sm flex items-center justify-center shrink-0">
              <BarChart3 size={24} />
            </div>
            <div className="min-w-0">
              <h1 className="text-xl sm:text-2xl font-bold">
                Bienvenue, {user?.name || 'Hervé E.'} 👋
              </h1>
              <p className="text-sm opacity-80 truncate">
                {user?.title || 'Analyste Données Numériques'} —{' '}
                {user?.organization || 'ANINF - Observatoire du Numérique'}
              </p>
            </div>
          </div>
          <p className="text-sm opacity-70 mt-3 max-w-2xl">
            Suivi des indicateurs de l&apos;économie numérique gabonaise, génération de rapports et
            gestion de l&apos;API Open Data.
          </p>
        </div>
      </motion.section>

      {/* ═══════ STATS RAPIDES ═══════ */}
      <section id="analyste-stats" className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
        {[
          { icon: BarChart3, label: 'Indicateurs suivis', value: '42', color: '#f59e0b' },
          { icon: TrendingUp, label: 'Mis à jour', value: '38', color: '#10b981' },
          { icon: AlertTriangle, label: 'Anomalies', value: '2', color: '#ef4444' },
          { icon: FileText, label: 'Rapports', value: '3', color: '#3b82f6' },
        ].map((s, i) => (
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

      {/* ═══════ INDICATEURS CLÉS ═══════ */}
      <section id="analyste-indicators">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-3">
          <h2 className="text-sm font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wider flex items-center gap-2">
            <Activity size={14} /> Indicateurs clés
          </h2>
          <div className="flex flex-wrap gap-1.5">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setCategoryFilter(cat)}
                aria-label={`Filtrer par ${cat}`}
                aria-pressed={categoryFilter === cat}
                className={`text-[11px] font-semibold px-3 py-1 rounded-lg border transition-all cursor-pointer ${
                  categoryFilter === cat
                    ? 'bg-amber-500 text-white border-amber-500'
                    : 'bg-white dark:bg-white/5 text-gray-500 dark:text-gray-400 border-gray-200 dark:border-white/10 hover:bg-gray-100 dark:hover:bg-white/8'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Desktop table */}
        <div className="bg-white dark:bg-white/5 rounded-xl border border-gray-200/60 dark:border-white/8 overflow-hidden hidden sm:block">
          <div className="overflow-x-auto">
            <table
              className="w-full text-sm"
              role="table"
              aria-label="Indicateurs économiques numériques"
            >
              <thead>
                <tr className="border-b border-gray-200 dark:border-white/5 bg-gray-100/50 dark:bg-white/2">
                  <th className="text-left py-3 px-4 text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase">
                    Indicateur
                  </th>
                  <th className="text-left py-3 px-4 text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase">
                    Catégorie
                  </th>
                  <th className="text-right py-3 px-4 text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase">
                    Valeur
                  </th>
                  <th className="text-right py-3 px-4 text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase">
                    Tendance
                  </th>
                  <th className="text-right py-3 px-4 text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase hidden md:table-cell">
                    Période
                  </th>
                </tr>
              </thead>
              <tbody>
                {filteredIndicators.map((ind, i) => (
                  <motion.tr
                    key={ind.name}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: i * 0.03 }}
                    className="border-b border-gray-50 dark:border-white/3 hover:bg-gray-100 dark:hover:bg-white/2 transition-colors"
                  >
                    <td className="py-3 px-4 font-medium text-gray-900 dark:text-white">
                      {ind.name}
                    </td>
                    <td className="py-3 px-4">
                      <span
                        className="text-[10px] font-semibold px-2 py-0.5 rounded-full"
                        style={{ background: `${ind.color}15`, color: ind.color }}
                      >
                        {ind.category}
                      </span>
                    </td>
                    <td className="py-3 px-4 text-right font-bold" style={{ color: ind.color }}>
                      {typeof ind.value === 'number' && ind.value < 10
                        ? ind.value.toFixed(2)
                        : ind.value.toLocaleString('fr-FR')}
                      {ind.unit}
                    </td>
                    <td className="py-3 px-4 text-right">
                      <span
                        className={`inline-flex items-center gap-1 text-xs font-semibold ${ind.trend >= 0 ? 'text-emerald-600' : 'text-red-500'}`}
                      >
                        {ind.trend >= 0 ? <TrendingUp size={12} /> : <TrendingDown size={12} />}
                        {ind.trend >= 0 ? '+' : ''}
                        {ind.trend}
                      </span>
                    </td>
                    <td className="py-3 px-4 text-right text-gray-400 text-xs hidden md:table-cell">
                      {ind.period}
                    </td>
                  </motion.tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Mobile cards */}
        <div className="sm:hidden space-y-2">
          {filteredIndicators.map((ind, i) => (
            <motion.div
              key={ind.name}
              initial={{ opacity: 0, y: 5 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.03 }}
              className="bg-white dark:bg-white/5 rounded-xl border border-gray-200/60 dark:border-white/8 p-4"
            >
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-medium text-gray-900 dark:text-white">
                  {ind.name}
                </span>
                <span
                  className={`inline-flex items-center gap-1 text-xs font-semibold ${ind.trend >= 0 ? 'text-emerald-600' : 'text-red-500'}`}
                >
                  {ind.trend >= 0 ? <TrendingUp size={12} /> : <TrendingDown size={12} />}
                  {ind.trend >= 0 ? '+' : ''}
                  {ind.trend}
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span
                  className="text-[10px] font-semibold px-2 py-0.5 rounded-full"
                  style={{ background: `${ind.color}15`, color: ind.color }}
                >
                  {ind.category}
                </span>
                <span className="text-lg font-bold" style={{ color: ind.color }}>
                  {typeof ind.value === 'number' && ind.value < 10
                    ? ind.value.toFixed(2)
                    : ind.value.toLocaleString('fr-FR')}
                  {ind.unit}
                </span>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ═══════ ANOMALIES ═══════ */}
      <section id="analyste-anomalies" role="alert" aria-label="Anomalies détectées">
        <h2 className="text-sm font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-3 flex items-center gap-2">
          <AlertTriangle size={14} className="text-red-500" /> Anomalies détectées
        </h2>
        <div className="space-y-3">
          {ANOMALIES.map((anomaly, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.1 }}
              className={`p-4 rounded-xl border ${
                anomaly.severity === 'high'
                  ? 'bg-red-50/80 dark:bg-red-500/8 border-red-200/50 dark:border-red-500/20'
                  : 'bg-amber-50/80 dark:bg-amber-500/8 border-amber-200/50 dark:border-amber-500/20'
              }`}
            >
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2">
                  <AlertTriangle
                    size={14}
                    className={anomaly.severity === 'high' ? 'text-red-500' : 'text-amber-500'}
                  />
                  <span className="font-semibold text-sm text-gray-900 dark:text-white">
                    {anomaly.indicator}
                  </span>
                </div>
                <span
                  className={`text-xs font-bold px-2 py-0.5 rounded-full ${
                    anomaly.severity === 'high'
                      ? 'bg-red-100 text-red-600 dark:bg-red-500/20 dark:text-red-400'
                      : 'bg-amber-100 text-amber-600 dark:bg-amber-500/20 dark:text-amber-400'
                  }`}
                >
                  {anomaly.severity === 'high' ? 'Critique' : 'Modéré'}
                </span>
              </div>
              <div className="grid grid-cols-3 gap-2 sm:gap-4 text-xs mb-2">
                <div>
                  <span className="text-gray-400">Attendu:</span>{' '}
                  <span className="font-semibold text-gray-700 dark:text-gray-300">
                    {anomaly.expected}
                  </span>
                </div>
                <div>
                  <span className="text-gray-400">Actuel:</span>{' '}
                  <span className="font-semibold text-gray-700 dark:text-gray-300">
                    {anomaly.actual}
                  </span>
                </div>
                <div>
                  <span className="text-gray-400">Écart:</span>{' '}
                  <span className="font-bold text-red-500">{anomaly.deviation}</span>
                </div>
              </div>
              <p className="text-xs text-gray-500 dark:text-gray-400">{anomaly.detail}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ═══════ TWO-COLUMN: Reports + API ═══════ */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Reports */}
        <section id="analyste-reports">
          <h2 className="text-sm font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-3 flex items-center gap-2">
            <FileText size={14} /> Rapports récents
          </h2>
          <div className="bg-white dark:bg-white/5 rounded-xl border border-gray-200/60 dark:border-white/8 divide-y divide-gray-100 dark:divide-white/5">
            {RECENT_REPORTS.map((report, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: i * 0.08 }}
                className="flex items-center gap-3 p-4 hover:bg-gray-100 dark:hover:bg-white/3 transition-colors"
              >
                <div className="w-9 h-9 rounded-lg bg-blue-50 dark:bg-blue-500/10 flex items-center justify-center shrink-0">
                  <FileText size={16} className="text-blue-500" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-gray-900 dark:text-white truncate">
                    {report.title}
                  </p>
                  <p className="text-[10px] text-gray-400">
                    {report.type} · {report.pages} pages · {report.date}
                  </p>
                </div>
                <span
                  className={`text-[10px] font-semibold px-2 py-0.5 rounded-full shrink-0 hidden sm:inline-flex ${
                    report.status === 'Publié'
                      ? 'bg-emerald-50 text-emerald-600 dark:bg-emerald-500/15'
                      : 'bg-gray-100 text-gray-500 dark:bg-white/5'
                  }`}
                >
                  {report.status}
                </span>
                <button
                  onClick={() => handleDownload(i, report.title)}
                  disabled={downloadingReport === i}
                  aria-label={`Télécharger ${report.title}`}
                  className="bg-transparent border-none cursor-pointer p-1 disabled:opacity-50"
                >
                  {downloadingReport === i ? (
                    <RefreshCw
                      size={14}
                      className="text-amber-500 animate-spin"
                    />
                  ) : (
                    <Download
                      size={14}
                      className="text-gray-300 dark:text-gray-600 hover:text-gray-500 transition-colors"
                    />
                  )}
                </button>
              </motion.div>
            ))}
          </div>
        </section>

        {/* API Open Data */}
        <section id="analyste-api">
          <h2 className="text-sm font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-3 flex items-center gap-2">
            <Database size={14} /> API Open Data
          </h2>
          <div className="bg-white dark:bg-white/5 rounded-xl border border-gray-200/60 dark:border-white/8 p-4 space-y-4">
            <div className="flex items-center justify-between text-sm">
              <span className="text-gray-500 dark:text-gray-400">Statut global</span>
              <span
                className="inline-flex items-center gap-1.5 text-emerald-600 font-semibold"
                role="status"
              >
                <span
                  className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"
                  aria-hidden="true"
                />
                Opérationnel
              </span>
            </div>
            <div className="space-y-3">
              {API_STATS.map((api, i) => (
                <div
                  key={i}
                  className="flex items-center gap-3 p-3 bg-gray-100/50 dark:bg-white/3 rounded-lg"
                >
                  <Globe size={14} className="text-amber-500 shrink-0" />
                  <div className="flex-1 min-w-0">
                    <p className="text-xs font-mono font-medium text-gray-700 dark:text-gray-300 truncate">
                      {api.endpoint}
                    </p>
                  </div>
                  <div className="text-right shrink-0">
                    <p className="text-xs font-bold text-gray-900 dark:text-white">
                      {api.calls} <span className="hidden sm:inline">appels</span>
                    </p>
                    <p className="text-[10px] text-emerald-500">Uptime: {api.uptime}</p>
                  </div>
                </div>
              ))}
            </div>
            <button
              onClick={handleRefresh}
              disabled={isRefreshing}
              aria-label="Rafraîchir les données API Open Data"
              className="w-full text-xs font-semibold text-amber-600 dark:text-amber-400 flex items-center justify-center gap-1.5 py-2 rounded-lg bg-amber-50 dark:bg-amber-500/10 hover:bg-amber-100 dark:hover:bg-amber-500/15 transition-colors cursor-pointer border-none disabled:opacity-60"
            >
              <RefreshCw size={12} className={isRefreshing ? 'animate-spin' : ''} />
              {isRefreshing ? 'Rafraîchissement...' : 'Rafraîchir les données'}
            </button>
          </div>
        </section>
      </div>

      {/* ═══════ ACTIONS RAPIDES ═══════ */}
      <section id="analyste-quick-access">
        <h2 className="text-sm font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-3">
          Accès rapide
        </h2>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
          {[
            {
              icon: BarChart3,
              title: 'Observatoire',
              desc: 'Indicateurs complets',
              href: '/dashboard/observatoire',
              color: '#f59e0b',
            },
            {
              icon: Factory,
              title: 'Filières',
              desc: 'Cartographie sectorielle',
              href: '/dashboard/filieres',
              color: '#009e49',
            },
            {
              icon: Eye,
              title: 'Investir',
              desc: 'Données macro',
              href: '/dashboard/investir',
              color: '#14b8a6',
            },
            {
              icon: BookOpen,
              title: 'Annuaire',
              desc: 'Répertoire entreprises',
              href: '/dashboard/annuaire',
              color: '#3b82f6',
            },
          ].map((mod, i) => (
            <motion.div
              key={mod.href}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 + i * 0.05 }}
            >
              <Link
                href={mod.href}
                aria-label={`Accéder à ${mod.title}`}
                className="block bg-white dark:bg-white/5 rounded-xl border border-gray-200/60 dark:border-white/8 p-4 hover:-translate-y-0.5 transition-all group no-underline"
              >
                <div
                  className="w-9 h-9 rounded-lg flex items-center justify-center text-white mb-3"
                  style={{ background: mod.color }}
                >
                  <mod.icon size={16} />
                </div>
                <h3 className="text-sm font-bold text-gray-900 dark:text-white mb-0.5 group-hover:text-amber-500 transition-colors">
                  {mod.title}
                </h3>
                <p className="text-[10px] text-gray-500 dark:text-gray-400">{mod.desc}</p>
              </Link>
            </motion.div>
          ))}
        </div>
      </section>
    </div>
  );
}
