'use client';

// GABON BIZ — Espace Investisseur VC
// Jean-Paul Ndong — Managing Partner, Ndong Capital Partners

import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import {
  TrendingUp,
  Rocket,
  BarChart3,
  DollarSign,
  ArrowRight,
  Calculator,
  Globe,
  Target,
  Briefcase,
  Star,
  PieChart,
} from 'lucide-react';

/* ═══════ MOCK DATA ═══════ */

const STATS = [
  { icon: Rocket, label: 'Startups suivies', value: '4', color: '#8b5cf6' },
  { icon: BarChart3, label: 'Deal flow', value: '15', color: '#3b82f6' },
  { icon: DollarSign, label: 'Investissements', value: '3', color: '#14b8a6' },
  { icon: TrendingUp, label: 'ROI moyen', value: '+22%', color: '#009e49' },
];

const DEAL_FLOW = [
  {
    stage: 'Screening',
    color: '#6b7280',
    startups: [
      { name: 'LogiTrack', sector: 'Logistique', raised: '—', score: 62 },
      { name: 'GreenEnergy GA', sector: 'CleanTech', raised: '—', score: 58 },
      { name: 'MobiHealth', sector: 'HealthTech', raised: '—', score: 55 },
    ],
  },
  {
    stage: 'Due Diligence',
    color: '#f59e0b',
    startups: [
      { name: 'EduConnect', sector: 'EdTech', raised: '50M FCFA', score: 78 },
      { name: 'AgriSmart', sector: 'AgriTech', raised: '25M FCFA', score: 71 },
    ],
  },
  {
    stage: 'Comité',
    color: '#3b82f6',
    startups: [
      { name: 'TechPay Solutions', sector: 'FinTech', raised: '150M FCFA', score: 88 },
    ],
  },
  {
    stage: 'Term Sheet',
    color: '#10b981',
    startups: [],
  },
];

const PORTFOLIO = [
  {
    id: 1,
    name: 'PayWay Cameroun',
    sector: 'FinTech',
    country: '🇨🇲 Cameroun',
    invested: '€250K',
    stage: 'Série A',
    multiple: '2.4x',
    multipleColor: '#10b981',
    status: 'Actif',
  },
  {
    id: 2,
    name: 'FarmLink Central',
    sector: 'AgriTech',
    country: '🇨🇲 Cameroun',
    invested: '€120K',
    stage: 'Seed',
    multiple: '1.8x',
    multipleColor: '#10b981',
    status: 'Actif',
  },
  {
    id: 3,
    name: 'TransitRDC',
    sector: 'Logistique',
    country: '🇨🇩 RDC',
    invested: '€80K',
    stage: 'Pre-Seed',
    multiple: '0.7x',
    multipleColor: '#ef4444',
    status: 'Sous surveillance',
  },
];

const MACRO_SNAPSHOT = [
  { label: 'PIB Croissance', value: '6.2%', delta: '+1.3pp', color: '#009e49' },
  { label: 'IDE Entrants', value: '$1.5B', delta: '+23%', color: '#14b8a6' },
  { label: 'Score IDES', value: '0.52', delta: '+0.08', color: '#f59e0b' },
  { label: 'Startups actives', value: '128', delta: '+34 en 2025', color: '#8b5cf6' },
];

const RECENT_ACTIVITY = [
  {
    text: 'TechPay Solutions ajoutée à votre portefeuille de suivi',
    time: 'Il y a 1h',
    icon: Rocket,
    color: '#8b5cf6',
  },
  {
    text: 'Rapport Due Diligence Gabon mis à jour',
    time: 'Hier',
    icon: BarChart3,
    color: '#3b82f6',
  },
  {
    text: 'Simulation ROI FinTech : 28% sur 5 ans',
    time: 'Il y a 2j',
    icon: Calculator,
    color: '#14b8a6',
  },
  {
    text: 'Nouveau deal flow : 3 startups SING 2.0 pré-qualifiées',
    time: 'Il y a 3j',
    icon: Star,
    color: '#f59e0b',
  },
];

/* ═══════ COMPONENT ═══════ */

export default function InvestisseurDashboard({
  user,
}: {
  user: { name?: string; title?: string; organization?: string };
}) {
  return (
    <div className="space-y-6">
      {/* ═══════ HERO ═══════ */}
      <motion.section
        id="investisseur-hero"
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        className="rounded-2xl p-6 sm:p-8 text-white relative overflow-hidden"
        style={{ background: 'linear-gradient(135deg, #14b8a6 0%, #0d9488 50%, #0f766e 100%)' }}
      >
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(255,255,255,0.15),transparent_50%)]" />
        <div className="absolute top-4 right-6 opacity-10 hidden sm:block" aria-hidden="true">
          <TrendingUp size={120} />
        </div>
        <div className="relative z-10">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-12 h-12 rounded-xl bg-white/20 backdrop-blur-sm flex items-center justify-center shrink-0">
              <TrendingUp size={24} />
            </div>
            <div className="min-w-0">
              <div className="flex items-center gap-2 flex-wrap">
                <h1 className="text-xl sm:text-2xl font-bold">
                  Bienvenue, {user?.name || 'J.P. Ndong'} 👋
                </h1>
                <span className="text-[10px] font-bold bg-white/20 px-2 py-0.5 rounded-full uppercase tracking-wider shrink-0">
                  VC Partner
                </span>
              </div>
              <p className="text-sm opacity-80 truncate">
                {user?.title || 'Managing Partner — Fonds VC Afrique Centrale'} —{' '}
                {user?.organization || 'Ndong Capital Partners'}
              </p>
            </div>
          </div>
          <p className="text-sm opacity-70 mt-3 max-w-2xl">
            Explorez le deal flow gabonais, analysez les métriques macroéconomiques et suivez les
            startups à fort potentiel dans votre pipeline d&apos;investissement.
          </p>
        </div>
      </motion.section>

      {/* ═══════ STATS ═══════ */}
      <section id="investisseur-stats" className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
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

      {/* ═══════ DEAL FLOW PIPELINE ═══════ */}
      <section id="investisseur-pipeline">
        <h2 className="text-sm font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-3 flex items-center gap-2">
          <Target size={14} /> Deal Flow Pipeline
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
          {DEAL_FLOW.map((stage, i) => (
            <motion.div
              key={stage.stage}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.08 }}
              className="bg-white dark:bg-white/5 rounded-xl border border-gray-200/60 dark:border-white/8 overflow-hidden"
            >
              {/* Stage header */}
              <div
                className="px-4 py-2.5 flex items-center justify-between"
                style={{ background: `${stage.color}10` }}
              >
                <span
                  className="text-xs font-bold uppercase tracking-wider"
                  style={{ color: stage.color }}
                >
                  {stage.stage}
                </span>
                <span
                  className="w-5 h-5 rounded-full flex items-center justify-center text-white text-[10px] font-bold"
                  style={{ background: stage.color }}
                >
                  {stage.startups.length}
                </span>
              </div>
              {/* Startups */}
              <div className="divide-y divide-gray-50 dark:divide-white/5">
                {stage.startups.length > 0 ? (
                  stage.startups.map((s, j) => (
                    <div key={j} className="px-4 py-3 hover:bg-gray-100 dark:hover:bg-white/3 transition-colors">
                      <p className="text-sm font-semibold text-gray-900 dark:text-white truncate">
                        {s.name}
                      </p>
                      <div className="flex items-center justify-between text-xs text-gray-500 dark:text-gray-400 mt-1">
                        <span>{s.sector}</span>
                        <span className="font-semibold" style={{ color: stage.color }}>
                          Score: {s.score}
                        </span>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="px-4 py-6 text-center text-xs text-gray-300 dark:text-gray-600 italic">
                    Pipeline vide
                  </div>
                )}
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ═══════ PORTEFEUILLE ═══════ */}
      <section id="investisseur-portfolio">
        <h2 className="text-sm font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-3 flex items-center gap-2">
          <Briefcase size={14} /> Mon Portefeuille
        </h2>
        <div className="bg-white dark:bg-white/5 rounded-xl border border-gray-200/60 dark:border-white/8 overflow-hidden">
          {/* Desktop table */}
          <div className="hidden sm:block">
            <table
              className="w-full text-sm"
              role="table"
              aria-label="Portefeuille d'investissements"
            >
              <thead>
                <tr className="border-b border-gray-200 dark:border-white/5 bg-gray-100/50 dark:bg-white/2">
                  <th className="text-left py-3 px-4 text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase">
                    Startup
                  </th>
                  <th className="text-left py-3 px-4 text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase hidden md:table-cell">
                    Pays
                  </th>
                  <th className="text-left py-3 px-4 text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase">
                    Stage
                  </th>
                  <th className="text-right py-3 px-4 text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase">
                    Investi
                  </th>
                  <th className="text-center py-3 px-4 text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase">
                    Multiple
                  </th>
                </tr>
              </thead>
              <tbody>
                {PORTFOLIO.map((p) => (
                  <tr
                    key={p.id}
                    className="border-b border-gray-50 dark:border-white/3 hover:bg-gray-100 dark:hover:bg-white/2 transition-colors"
                  >
                    <td className="py-3 px-4">
                      <div className="font-semibold text-gray-900 dark:text-white">{p.name}</div>
                      <div className="text-[10px] text-gray-400">{p.sector}</div>
                    </td>
                    <td className="py-3 px-4 text-gray-500 dark:text-gray-400 text-xs hidden md:table-cell">
                      {p.country}
                    </td>
                    <td className="py-3 px-4">
                      <span className="text-xs font-semibold px-2 py-0.5 rounded-full bg-gray-100 dark:bg-white/10 text-gray-600 dark:text-gray-300">
                        {p.stage}
                      </span>
                    </td>
                    <td className="py-3 px-4 text-right font-bold text-gray-900 dark:text-white">
                      {p.invested}
                    </td>
                    <td className="py-3 px-4 text-center">
                      <span className="font-bold text-sm" style={{ color: p.multipleColor }}>
                        {p.multiple}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Mobile cards */}
          <div className="sm:hidden divide-y divide-gray-100 dark:divide-white/5">
            {PORTFOLIO.map((p) => (
              <div key={p.id} className="p-4">
                <div className="flex items-center justify-between mb-2">
                  <div>
                    <span className="font-semibold text-sm text-gray-900 dark:text-white">
                      {p.name}
                    </span>
                    <span className="text-[10px] text-gray-400 ml-2">{p.country}</span>
                  </div>
                  <span className="font-bold text-sm" style={{ color: p.multipleColor }}>
                    {p.multiple}
                  </span>
                </div>
                <div className="flex items-center gap-3 text-xs text-gray-500 dark:text-gray-400">
                  <span>{p.sector}</span>
                  <span>·</span>
                  <span>{p.stage}</span>
                  <span>·</span>
                  <span className="font-semibold">{p.invested}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════ MACRO SNAPSHOT ═══════ */}
      <section id="investisseur-macro">
        <h2 className="text-sm font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-3 flex items-center gap-2">
          <PieChart size={14} /> Macro Snapshot — Gabon
        </h2>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          {MACRO_SNAPSHOT.map((m, i) => (
            <motion.div
              key={m.label}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.06 }}
              className="bg-white dark:bg-white/5 rounded-xl border border-gray-200/60 dark:border-white/8 p-4"
            >
              <p className="text-xl font-bold text-gray-900 dark:text-white">{m.value}</p>
              <p className="text-[10px] font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                {m.label}
              </p>
              <p className="text-[10px] mt-1 font-semibold" style={{ color: m.color }}>
                {m.delta}
              </p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ═══════ TWO-COLUMN: Activity + Quick Access ═══════ */}
      <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
        {/* ACTIVITÉ RÉCENTE */}
        <section id="investisseur-activity" className="lg:col-span-3">
          <h2 className="text-sm font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-3">
            Activité récente
          </h2>
          <div className="bg-white dark:bg-white/5 rounded-xl border border-gray-200/60 dark:border-white/8 divide-y divide-gray-100 dark:divide-white/5">
            {RECENT_ACTIVITY.map((a, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.05 }}
                className="flex items-center gap-3 p-3 hover:bg-gray-100 dark:hover:bg-white/3 transition-colors"
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

        {/* ACCÈS RAPIDE */}
        <section id="investisseur-quick-access" className="lg:col-span-2">
          <h2 className="text-sm font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-3">
            Accès rapide
          </h2>
          <div className="grid grid-cols-2 gap-3">
            {[
              {
                icon: Target,
                title: 'Opportunités',
                desc: 'Deal flow sectoriel',
                href: '/dashboard/investir/opportunites',
                color: '#8b5cf6',
              },
              {
                icon: BarChart3,
                title: 'Dashboard Macro',
                desc: 'Indicateurs pays',
                href: '/dashboard/investir/macro',
                color: '#3b82f6',
              },
              {
                icon: Globe,
                title: 'Due Diligence',
                desc: 'Analyse risque pays',
                href: '/dashboard/investir/due-diligence',
                color: '#f59e0b',
              },
              {
                icon: Calculator,
                title: 'Simulateur ROI',
                desc: 'Projections rendement',
                href: '/dashboard/investir/simulateur',
                color: '#14b8a6',
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
                  <h3 className="text-sm font-bold text-gray-900 dark:text-white mb-0.5 group-hover:text-teal-500 transition-colors">
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
