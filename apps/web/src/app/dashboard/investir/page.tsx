'use client';

// GABON BIZ — Investir au Gabon Hub
// Enhanced for Partenaire International with Country Risk, IDES, Co-Investments
// Polish: semantic sections, ARIA labels, consistent motion, Lucide icons

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import {
  TrendingUp,
  ArrowRight,
  Globe,
  Shield,
  FileText,
  Download,
  BarChart3,
  Handshake,
  Building2,
  MapPin,
} from 'lucide-react';
import { INVESTIR_HUB_STATS, INVESTIR_HUB_MODULES, DEAL_FLOW } from '@/lib/mock/investir-data';
import DealFlowCard from '@/components/investir/DealFlowCard';
import { useAuth } from '@/lib/auth-context';
import { getDemoAccountByNip } from '@/lib/demo-accounts';

/* ─── Country Risk Data (Partenaire International) ─── */

const COUNTRY_RISK = [
  {
    label: 'Doing Business Rank',
    value: '#132',
    trend: '+12 places',
    icon: BarChart3,
    color: '#0ea5e9',
  },
  {
    label: "Moody's Rating",
    value: 'B3',
    trend: 'Perspective stable',
    icon: Shield,
    color: '#8b5cf6',
  },
  { label: 'IDES Score', value: '0.52', trend: '+0.04 vs Q3', icon: TrendingUp, color: '#10b981' },
  {
    label: 'Indice attractivité IDE',
    value: '6.2/10',
    trend: '+0.8 pts',
    icon: Globe,
    color: '#f59e0b',
  },
];

const CO_INVEST_OPPORTUNITIES = [
  {
    id: 'co-1',
    title: 'Gabon Digital 2030 — Infrastructure fibre optique nationale',
    partner: 'Banque Mondiale / IFC',
    amount: '$120M',
    stage: 'Pipeline',
    color: '#0ea5e9',
    sector: 'Telecoms',
  },
  {
    id: 'co-2',
    title: 'Programme SADA — Formation numérique nationale',
    partner: 'BAD / UNESCO',
    amount: '$15M',
    stage: 'Engagé',
    color: '#10b981',
    sector: 'Éducation',
  },
  {
    id: 'co-3',
    title: 'Smart City Libreville — GovTech Platform',
    partner: 'Huawei / CEMAC',
    amount: '$45M',
    stage: 'Due Diligence',
    color: '#f59e0b',
    sector: 'GovTech',
  },
  {
    id: 'co-4',
    title: 'FinTech Hub Gabon — Inclusion financière',
    partner: 'GSMA / AFD',
    amount: '$8M',
    stage: 'Pipeline',
    color: '#ec4899',
    sector: 'FinTech',
  },
];

const fadeUp = {
  hidden: { opacity: 0, y: 12 },
  visible: (i: number) => ({ opacity: 1, y: 0, transition: { delay: i * 0.05, duration: 0.4 } }),
};

/* ─── Component ─── */

export default function InvestirHubPage() {
  const { user } = useAuth();
  const account = user?.isDemo ? getDemoAccountByNip(user.nip) : null;
  const isPartnerIntl = account?.id === 'demo-partenaire' || user?.roles?.includes('PARTNER_INTL');
  const [pdfDownloading, setPdfDownloading] = useState(false);

  const handleDownloadPDF = async () => {
    setPdfDownloading(true);
    await new Promise((r) => setTimeout(r, 1500));
    setPdfDownloading(false);
    alert('Rapport IDES Q4 2025 téléchargé avec succès (62 pages, 4.2 MB)');
  };

  return (
    <div className="space-y-7">
      {/* Header */}
      <div className="flex items-center gap-3">
        <div
          className="w-10 h-10 rounded-xl bg-linear-to-br from-teal-500 to-emerald-600 flex items-center justify-center text-white"
          aria-hidden="true"
        >
          <TrendingUp size={18} />
        </div>
        <div>
          <h1 className="text-2xl font-black text-gray-900 dark:text-white">Investir au Gabon</h1>
          <p className="text-sm text-gray-500 dark:text-gray-400">
            {isPartnerIntl
              ? 'Country Risk, Deal Flow et opportunités de co-investissement'
              : 'Deal Flow, opportunités sectorielles et données macroéconomiques'}
          </p>
        </div>
      </div>

      {/* ── Partner International — Country Risk Section ── */}
      {isPartnerIntl && (
        <div className="space-y-5">
          {/* Country Risk Overview */}
          <section aria-label="Country Risk Overview">
            <h2 className="text-sm font-bold text-gray-500 uppercase tracking-wider mb-3 flex items-center gap-2">
              <Globe size={14} className="text-sky-500" /> Country Risk Overview — République
              Gabonaise
            </h2>
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
              {COUNTRY_RISK.map((r, i) => {
                const Icon = r.icon;
                return (
                  <motion.div
                    key={r.label}
                    variants={fadeUp}
                    custom={i}
                    initial="hidden"
                    animate="visible"
                    className="p-4 rounded-xl bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 transition-shadow"
                  >
                    <div className="flex items-center justify-between mb-2">
                      <Icon size={16} style={{ color: r.color }} aria-hidden="true" />
                      <span className="text-[10px] font-semibold text-emerald-600 bg-emerald-50 dark:bg-emerald-950/40 px-1.5 py-0.5 rounded">
                        {r.trend}
                      </span>
                    </div>
                    <div className="text-xl font-extrabold text-gray-900 dark:text-white">
                      {r.value}
                    </div>
                    <div className="text-[11px] text-gray-500 dark:text-gray-400 mt-0.5">
                      {r.label}
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </section>

          {/* IDES Report */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-5 rounded-xl bg-linear-to-r from-sky-50 to-blue-50 dark:from-sky-950/30 dark:to-blue-950/30 border border-sky-200/60 dark:border-sky-800/40"
          >
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-xl bg-sky-100 dark:bg-sky-900/50 flex items-center justify-center shrink-0">
                <FileText size={22} className="text-sky-600 dark:text-sky-400" />
              </div>
              <div>
                <h3 className="text-sm font-bold text-gray-900 dark:text-white">
                  Rapport IDES Q4 2025 — Gabon
                </h3>
                <p className="text-xs text-gray-500 dark:text-gray-400">
                  Index de Développement de l&apos;Économie du Numérique — 42 indicateurs · 62 pages
                </p>
                <p className="text-[10px] text-sky-600 dark:text-sky-400 font-medium mt-0.5">
                  Publié le 15 jan. 2026 · Banque Mondiale / MENUDI
                </p>
              </div>
            </div>
            <button
              onClick={handleDownloadPDF}
              disabled={pdfDownloading}
              className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-xl bg-sky-500 hover:bg-sky-600 text-white text-xs font-semibold border-none cursor-pointer transition-colors shrink-0 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <Download size={14} /> {pdfDownloading ? 'Téléchargement...' : 'Télécharger PDF'}
            </button>
          </motion.div>

          {/* Co-Investment Opportunities */}
          <section aria-label="Opportunités de co-investissement">
            <h2 className="text-sm font-bold text-gray-500 uppercase tracking-wider mb-3 flex items-center gap-2">
              <Handshake size={14} className="text-teal-500" /> Opportunités de Co-Investissement
            </h2>
            <div className="space-y-2.5">
              {CO_INVEST_OPPORTUNITIES.map((opp, i) => (
                <motion.div
                  key={opp.id}
                  variants={fadeUp}
                  custom={i + 4}
                  initial="hidden"
                  animate="visible"
                  className="flex items-center gap-4 p-4 rounded-xl bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 transition-shadow cursor-pointer group"
                >
                  <div
                    className="w-1.5 h-14 rounded-full shrink-0 group-hover:scale-y-110 transition-transform"
                    style={{ background: opp.color }}
                  />
                  <div className="flex-1 min-w-0">
                    <h4 className="text-sm font-semibold text-gray-900 dark:text-white truncate group-hover:text-teal-600 dark:group-hover:text-teal-400 transition-colors">
                      {opp.title}
                    </h4>
                    <div className="flex flex-wrap items-center gap-x-3 gap-y-0.5 mt-1">
                      <span className="text-xs text-gray-500 dark:text-gray-400 inline-flex items-center gap-1">
                        <Building2 size={10} /> {opp.partner}
                      </span>
                      <span className="text-xs text-gray-400 inline-flex items-center gap-1">
                        <MapPin size={10} /> {opp.sector}
                      </span>
                    </div>
                  </div>
                  <div className="text-right shrink-0">
                    <div className="text-sm font-bold text-gray-900 dark:text-white">
                      {opp.amount}
                    </div>
                    <span
                      className="text-[10px] font-semibold px-2 py-0.5 rounded-full inline-block mt-1"
                      style={{ background: `${opp.color}15`, color: opp.color }}
                    >
                      {opp.stage}
                    </span>
                  </div>
                </motion.div>
              ))}
            </div>
          </section>
        </div>
      )}

      {/* Quick Stats */}
      <section aria-label="Statistiques clés">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
          {INVESTIR_HUB_STATS.map((s, i) => {
            const Icon = s.icon;
            return (
              <motion.div
                key={s.label}
                variants={fadeUp}
                custom={i}
                initial="hidden"
                animate="visible"
                className="bg-white dark:bg-white/5 rounded-xl border border-gray-200/60 dark:border-white/8 p-4"
              >
                <Icon size={14} className="text-teal-500 mb-1" aria-hidden="true" />
                <p className="text-lg font-black text-gray-900 dark:text-white">{s.value}</p>
                <p className="text-[10px] text-gray-500">{s.label}</p>
              </motion.div>
            );
          })}
        </div>
      </section>

      {/* Modules */}
      <section aria-label="Modules investissement">
        <h2 className="text-sm font-bold text-gray-500 uppercase tracking-wider mb-3">Modules</h2>
        <div className="grid grid-cols-2 lg:grid-cols-5 gap-3">
          {INVESTIR_HUB_MODULES.map((m, i) => {
            const Icon = m.icon;
            return (
              <motion.div
                key={m.title}
                variants={fadeUp}
                custom={i}
                initial="hidden"
                animate="visible"
              >
                <Link
                  href={m.href}
                  className="block bg-white dark:bg-white/5 rounded-xl border border-gray-200/60 dark:border-white/8 p-4 hover:-translate-y-0.5 transition-all group"
                >
                  <div
                    className="w-9 h-9 rounded-lg flex items-center justify-center text-white mb-3"
                    style={{ background: m.color }}
                    aria-hidden="true"
                  >
                    <Icon size={16} />
                  </div>
                  <h3 className="text-sm font-bold text-gray-900 dark:text-white mb-1 group-hover:text-teal-500 transition-colors">
                    {m.title}
                  </h3>
                  <span
                    className="text-[10px] font-semibold px-2 py-0.5 rounded-full"
                    style={{ background: `${m.color}15`, color: m.color }}
                  >
                    {m.badge}
                  </span>
                </Link>
              </motion.div>
            );
          })}
        </div>
      </section>

      {/* Deal Flow */}
      <section aria-label="Deal flow pipeline">
        <div className="flex items-center justify-between mb-3">
          <h2 className="text-sm font-bold text-gray-500 uppercase tracking-wider">
            Deal Flow Pipeline
          </h2>
          <Link
            href="/dashboard/investir/opportunites"
            className="text-xs text-teal-500 font-semibold flex items-center gap-1 hover:underline"
          >
            Voir tout <ArrowRight size={10} />
          </Link>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
          {DEAL_FLOW.slice(0, 6).map((d, i) => (
            <DealFlowCard key={d.id} deal={d} index={i} />
          ))}
        </div>
      </section>
    </div>
  );
}
