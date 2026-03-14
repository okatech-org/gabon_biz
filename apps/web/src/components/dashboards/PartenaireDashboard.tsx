'use client';

// GABON BIZ — Espace Partenaire International (DFI)
// Li Wei — Chargé d'Investissement, Banque Mondiale - Bureau Gabon

import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import {
  Globe,
  TrendingUp,
  DollarSign,
  Rocket,
  BarChart3,
  ArrowRight,
  FileText,
  Handshake,
  Shield,
  Target,
  PieChart,
  Activity,
} from 'lucide-react';

/* ═══════ MOCK DATA ═══════ */

const STATS = [
  { icon: TrendingUp, label: 'GDP Growth', value: '6.2%', color: '#10b981' },
  { icon: DollarSign, label: 'FDI Inflows', value: '$1.5B', color: '#0ea5e9' },
  { icon: Rocket, label: 'Funded Startups', value: '45', color: '#8b5cf6' },
  { icon: BarChart3, label: 'IDES Score', value: '0.52', color: '#f59e0b' },
];

const COUNTRY_RISK = [
  { label: 'Political Stability', score: 6.2, color: '#10b981' },
  { label: 'Economic Growth', score: 7.5, color: '#3b82f6' },
  { label: 'Digital Readiness', score: 5.8, color: '#8b5cf6' },
  { label: 'Regulatory Framework', score: 6.0, color: '#f59e0b' },
  { label: 'Infrastructure', score: 5.1, color: '#ef4444' },
];

const DEAL_FLOW = [
  { sector: 'GovTech', deals: 8, avgTicket: '€500K', growth: '+45%' },
  { sector: 'FinTech', deals: 12, avgTicket: '€350K', growth: '+62%' },
  { sector: 'AgriTech', deals: 5, avgTicket: '€200K', growth: '+28%' },
  { sector: 'EdTech', deals: 4, avgTicket: '€150K', growth: '+35%' },
  { sector: 'Infrastructure', deals: 3, avgTicket: '€2M', growth: '+18%' },
];

const CO_INVESTMENTS = [
  { program: 'Gabon Digital 2030', partner: 'BAD / Banque Mondiale', amount: '$45M', stage: 'Pipeline', color: '#3b82f6' },
  { program: 'SADA — Smart Cities', partner: 'Huawei / CEMAC', amount: '$12M', stage: 'Due Diligence', color: '#f59e0b' },
  { program: 'Fibre Optique Phase 2', partner: 'AFD / BEI', amount: '$80M', stage: 'Approved', color: '#10b981' },
];

const REPORTS = [
  { title: 'Rapport IDES Q4 2025', date: '15 jan 2026', type: 'PDF', isNew: true },
  { title: 'Doing Business Gabon 2026', date: '28 déc 2025', type: 'PDF', isNew: false },
  { title: 'MoU Tracker — CEMAC Digital', date: '10 jan 2026', type: 'Excel', isNew: true },
  { title: 'Gabon Digital 2030 — Progress', date: '5 jan 2026', type: 'PDF', isNew: false },
];

const STAGE_STYLES: Record<string, string> = {
  'Pipeline': 'bg-blue-50 dark:bg-blue-500/10 text-blue-600',
  'Due Diligence': 'bg-amber-50 dark:bg-amber-500/10 text-amber-600',
  'Approved': 'bg-emerald-50 dark:bg-emerald-500/10 text-emerald-600',
};

/* ═══════ COMPONENT ═══════ */

export default function PartenaireDashboard({
  user,
}: {
  user: { name?: string; title?: string; organization?: string };
}) {
  return (
    <div className="space-y-6">
      {/* ═══════ HERO ═══════ */}
      <motion.section
        id="partenaire-hero"
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        className="rounded-2xl p-6 sm:p-8 text-white relative overflow-hidden"
        style={{ background: 'linear-gradient(135deg, #0ea5e9 0%, #0284c7 50%, #0369a1 100%)' }}
      >
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(255,255,255,0.15),transparent_50%)]" />
        <div className="absolute top-4 right-6 opacity-10 hidden sm:block" aria-hidden="true">
          <Globe size={120} />
        </div>
        <div className="relative z-10">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-12 h-12 rounded-xl bg-white/20 backdrop-blur-sm flex items-center justify-center shrink-0">
              <Globe size={24} />
            </div>
            <div className="min-w-0">
              <div className="flex items-center gap-2 flex-wrap">
                <h1 className="text-xl sm:text-2xl font-bold">
                  Welcome, {user?.name || 'Li W.'} 👋
                </h1>
                <span className="text-[10px] font-bold bg-white/20 px-2 py-0.5 rounded-full uppercase tracking-wider shrink-0">
                  DFI Partner
                </span>
              </div>
              <p className="text-sm opacity-80 truncate">
                {user?.title || "Chargé d'Investissement Afrique Centrale"} —{' '}
                {user?.organization || 'Banque Mondiale - Bureau Gabon'}
              </p>
            </div>
          </div>
          <p className="text-sm opacity-70 mt-3 max-w-2xl">
            Explore the Gabonese market, analyze macro indicators, and identify co-investment
            opportunities across key digital sectors.
          </p>
        </div>
      </motion.section>

      {/* ═══════ STATS ═══════ */}
      <section id="partenaire-stats" className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
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

      {/* ═══════ COUNTRY RISK ═══════ */}
      <section id="partenaire-risk">
        <h2 className="text-sm font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-3 flex items-center gap-2">
          <Shield size={14} /> Country Risk Assessment
        </h2>
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.15 }}
          className="bg-white dark:bg-white/5 rounded-xl border border-gray-200/60 dark:border-white/8 p-4 sm:p-5 space-y-4"
        >
          {COUNTRY_RISK.map((r) => (
            <div key={r.label}>
              <div className="flex items-center justify-between mb-1.5">
                <span className="text-sm font-medium text-gray-700 dark:text-gray-300">{r.label}</span>
                <span className="text-sm font-bold" style={{ color: r.color }}>{r.score}/10</span>
              </div>
              <div className="h-2 bg-gray-100 dark:bg-white/5 rounded-full overflow-hidden">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${r.score * 10}%` }}
                  transition={{ duration: 0.8, ease: 'easeOut' }}
                  className="h-full rounded-full"
                  style={{ background: r.color }}
                />
              </div>
            </div>
          ))}
        </motion.div>
      </section>

      {/* ═══════ DEAL FLOW TABLE ═══════ */}
      <section id="partenaire-dealflow">
        <h2 className="text-sm font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-3 flex items-center gap-2">
          <Target size={14} /> Sectoral Deal Flow
        </h2>
        <div className="bg-white dark:bg-white/5 rounded-xl border border-gray-200/60 dark:border-white/8 overflow-hidden">
          {/* Desktop table */}
          <div className="hidden sm:block">
            <table className="w-full text-sm" role="table" aria-label="Sectoral Deal Flow">
              <thead>
                <tr className="border-b border-gray-200 dark:border-white/5 bg-gray-100/50 dark:bg-white/2">
                  <th className="text-left py-3 px-4 text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase">Sector</th>
                  <th className="text-center py-3 px-4 text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase">Deals</th>
                  <th className="text-center py-3 px-4 text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase">Avg Ticket</th>
                  <th className="text-right py-3 px-4 text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase">YoY Growth</th>
                </tr>
              </thead>
              <tbody>
                {DEAL_FLOW.map((d) => (
                  <tr key={d.sector} className="border-b border-gray-50 dark:border-white/3 hover:bg-gray-100 dark:hover:bg-white/2 transition-colors">
                    <td className="py-3 px-4 font-semibold text-gray-900 dark:text-white">{d.sector}</td>
                    <td className="py-3 px-4 text-center text-gray-500 dark:text-gray-400">{d.deals}</td>
                    <td className="py-3 px-4 text-center text-gray-500 dark:text-gray-400">{d.avgTicket}</td>
                    <td className="py-3 px-4 text-right font-bold text-emerald-600">{d.growth}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          {/* Mobile cards */}
          <div className="sm:hidden divide-y divide-gray-100 dark:divide-white/5">
            {DEAL_FLOW.map((d) => (
              <div key={d.sector} className="p-4">
                <div className="flex items-center justify-between mb-1">
                  <span className="font-semibold text-sm text-gray-900 dark:text-white">{d.sector}</span>
                  <span className="font-bold text-sm text-emerald-600">{d.growth}</span>
                </div>
                <div className="flex items-center gap-3 text-xs text-gray-500 dark:text-gray-400">
                  <span>{d.deals} deals</span>
                  <span>·</span>
                  <span>Avg {d.avgTicket}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════ CO-INVESTMENT PIPELINE ═══════ */}
      <section id="partenaire-coinvest">
        <h2 className="text-sm font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-3 flex items-center gap-2">
          <Handshake size={14} /> Co-Investment Pipeline
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          {CO_INVESTMENTS.map((c, i) => (
            <motion.div
              key={c.program}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 + i * 0.06 }}
              className="bg-white dark:bg-white/5 rounded-xl border border-gray-200/60 dark:border-white/8 p-4"
            >
              <h4 className="text-sm font-bold text-gray-900 dark:text-white mb-1">{c.program}</h4>
              <p className="text-xs text-gray-500 dark:text-gray-400 mb-3">{c.partner}</p>
              <div className="flex items-center justify-between">
                <span className="text-lg font-bold" style={{ color: c.color }}>{c.amount}</span>
                <span className={`px-2 py-0.5 text-[10px] font-bold rounded-full ${STAGE_STYLES[c.stage] || ''}`}>
                  {c.stage}
                </span>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ═══════ TWO-COLUMN: Reports + Quick Access ═══════ */}
      <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
        {/* REPORTS */}
        <section id="partenaire-reports" className="lg:col-span-3">
          <h2 className="text-sm font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-3 flex items-center gap-2">
            <FileText size={14} /> Reports & Documents
          </h2>
          <div className="bg-white dark:bg-white/5 rounded-xl border border-gray-200/60 dark:border-white/8 divide-y divide-gray-100 dark:divide-white/5">
            {REPORTS.map((r, i) => (
              <motion.div
                key={r.title}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.05 }}
                className="flex items-center gap-3 p-3 hover:bg-gray-100 dark:hover:bg-white/3 transition-colors"
              >
                <div className="w-8 h-8 rounded-lg flex items-center justify-center shrink-0 bg-sky-50 dark:bg-sky-500/10">
                  <FileText size={14} className="text-sky-600" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm text-gray-900 dark:text-white truncate">{r.title}</p>
                  <p className="text-[10px] text-gray-400">{r.date} · {r.type}</p>
                </div>
                {r.isNew && (
                  <span className="px-2 py-0.5 text-[10px] font-bold bg-sky-50 dark:bg-sky-500/10 text-sky-600 rounded-full shrink-0">
                    New
                  </span>
                )}
                <ArrowRight size={12} className="text-gray-300 dark:text-gray-600 shrink-0" />
              </motion.div>
            ))}
          </div>
        </section>

        {/* QUICK ACCESS */}
        <section id="partenaire-quick-access" className="lg:col-span-2">
          <h2 className="text-sm font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-3">
            Quick Access
          </h2>
          <div className="grid grid-cols-2 gap-3">
            {[
              { icon: PieChart, title: 'Country Risk', desc: 'Macro overview', href: '/dashboard/investir', color: '#0ea5e9' },
              { icon: BarChart3, title: 'IDES Report', desc: 'Q4 indicators', href: '/dashboard/observatoire', color: '#3b82f6' },
              { icon: Handshake, title: 'Co-investments', desc: 'Pipeline tracker', href: '/dashboard/investir/opportunites', color: '#14b8a6' },
              { icon: Activity, title: 'Market Watch', desc: 'Sector trends', href: '/dashboard/investir/veille', color: '#f59e0b' },
            ].map((mod, i) => (
              <motion.div
                key={mod.href}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 + i * 0.05 }}
              >
                <Link
                  href={mod.href}
                  aria-label={`Access ${mod.title}`}
                  className="block bg-white dark:bg-white/5 rounded-xl border border-gray-200/60 dark:border-white/8 p-4 hover:-translate-y-0.5 transition-all group no-underline"
                >
                  <div
                    className="w-9 h-9 rounded-lg flex items-center justify-center text-white mb-3"
                    style={{ background: mod.color }}
                  >
                    <mod.icon size={16} />
                  </div>
                  <h3 className="text-sm font-bold text-gray-900 dark:text-white mb-0.5 group-hover:text-sky-500 transition-colors">
                    {mod.title}
                  </h3>
                  <p className="text-[10px] text-gray-500 dark:text-gray-400">{mod.desc}</p>
                </Link>
              </motion.div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}
