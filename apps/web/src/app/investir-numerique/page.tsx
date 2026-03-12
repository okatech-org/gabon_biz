'use client';

// GABON BIZ — Investir dans l'Économie Numérique du Gabon
// Redesigned to match homepage premium aesthetic

import React, { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion, useScroll, useTransform, useInView } from 'framer-motion';
import {
  Building2, Signal, Smartphone, TrendingDown, TrendingUp,
  ArrowRight, ExternalLink, DollarSign, Users, Shield, Globe,
  Wallet, ShoppingCart, HeartPulse, Sprout, GraduationCap,
  FileCheck, Landmark, Handshake, Percent,
  AlertTriangle, CheckCircle, ChevronRight, Rocket,
  BarChart3, Activity, Target, Zap, PlayCircle,
} from 'lucide-react';
import { Navbar, Footer } from '@/app/page';
import {
  HERO_INVESTIR, PARADOXE_NUMERIQUE, MACRO_INDICATORS, MACRO_KEY_FACTS,
  VERTICALES, CASE_STUDY_POZI, CADRE_JURIDIQUE, PARTENARIATS,
  MARCHE_TELECOM, OPERATEURS_TELECOM, RISQUES, CTA_FINAL,
} from '@/lib/mock/investir-data';

// ═══════════════════════════════════════════
//  ICON MAP (string → component)
// ═══════════════════════════════════════════

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const ICON_MAP: Record<string, any> = {
  Building2, Signal, Smartphone, TrendingDown, TrendingUp,
  DollarSign, Users, Shield, Globe,
  Wallet, ShoppingCart, HeartPulse, Sprout, GraduationCap,
  FileCheck, Landmark, Handshake, Percent,
};

function getIcon(name: string) {
  return ICON_MAP[name] || Zap;
}

// ═══════════════════════════════════════════
//  ANIMATION VARIANTS (matching homepage)
// ═══════════════════════════════════════════

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i: number) => ({
    opacity: 1, y: 0,
    transition: { duration: 0.6, delay: i * 0.1, ease: 'easeOut' as const },
  }),
};

const stagger = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1 } },
};

// ═══════════════════════════════════════════
//  ANIMATED COUNTER
// ═══════════════════════════════════════════

function AnimatedCounter({ value }: { value: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true });
  const [display, setDisplay] = useState('0');

  useEffect(() => {
    if (!isInView) return;
    const numMatch = value.match(/[\d.,]+/);
    if (!numMatch) { setDisplay(value); return; }
    const target = parseFloat(numMatch[0].replace(',', '.'));
    const pre = value.substring(0, value.indexOf(numMatch[0]));
    const suf = value.substring(value.indexOf(numMatch[0]) + numMatch[0].length);
    const hasComma = numMatch[0].includes(',');
    const steps = 40;
    let step = 0;
    const interval = setInterval(() => {
      step++;
      const eased = 1 - Math.pow(1 - step / steps, 3);
      const current = target * eased;
      const formatted = hasComma
        ? current.toFixed(1).replace('.', ',')
        : current < 10 ? current.toFixed(1) : Math.round(current).toString();
      setDisplay(pre + formatted + suf);
      if (step >= steps) { clearInterval(interval); setDisplay(value); }
    }, 37);
    return () => clearInterval(interval);
  }, [isInView, value]);

  return <span ref={ref}>{display}</span>;
}

// ═══════════════════════════════════════════
//  ANIMATED GAUGE BAR
// ═══════════════════════════════════════════

function GaugeBar({ label, value, max, color, interpretation }: {
  label: string; value: number; max: number; color: string; interpretation: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true });
  const pct = Math.min((value / max) * 100, 100);

  return (
    <div ref={ref} className="mb-6">
      <div className="flex justify-between items-baseline mb-2">
        <span className="font-semibold text-white text-sm">{label}</span>
        <span className="font-bold text-lg" style={{ color }}>{value}%</span>
      </div>
      <div className="h-3 bg-white/10 rounded-full overflow-hidden backdrop-blur-sm">
        <motion.div
          className="h-full rounded-full"
          style={{ backgroundColor: color }}
          initial={{ width: 0 }}
          animate={isInView ? { width: `${pct}%` } : { width: 0 }}
          transition={{ duration: 1.2, ease: 'easeOut' }}
        />
      </div>
      <p className="text-xs text-white/50 mt-1.5 italic">{interpretation}</p>
    </div>
  );
}

// ═══════════════════════════════════════════
//  SECTION 1 — HERO (Homepage-style dark hero)
// ═══════════════════════════════════════════

function HeroSection() {
  const statIcons = [Building2, Signal, Smartphone, TrendingDown];
  const { scrollY } = useScroll();
  const y = useTransform(scrollY, [0, 800], [0, 300]);

  return (
    <section className="relative min-h-[90vh] flex items-center overflow-hidden pt-20">
      {/* Parallax Background Image */}
      <motion.div style={{ y }} className="absolute inset-0 z-0">
        <Image src="/images/hero-libreville.png" alt="Gabon Economy" fill priority className="object-cover" />
      </motion.div>
      {/* Gradient Overlay */}
      <div className="absolute inset-0 z-0 bg-linear-to-b from-slate-900/85 via-emerald-950/60 to-slate-900/95 dark:from-black/90 dark:via-black/70 dark:to-black/95" />

      <div className="relative z-10 max-w-7xl mx-auto px-6 w-full py-20 flex flex-col justify-center">
        <div className="max-w-3xl">
          <motion.div variants={fadeUp} custom={0} initial="hidden" animate="visible" className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 backdrop-blur-md border border-white/20 mb-8">
            <span className="text-sm">🇬🇦</span>
            <span className="text-sm font-medium text-emerald-300">Économie Numérique du Gabon</span>
          </motion.div>

          <motion.h1 variants={fadeUp} custom={1} initial="hidden" animate="visible" className="text-2xl sm:text-3xl md:text-4xl lg:text-[2.75rem] xl:text-5xl font-extrabold text-white leading-[1.15] tracking-tight">
            <span className="text-transparent bg-clip-text bg-linear-to-r from-emerald-400 to-teal-200 whitespace-nowrap">
              L&apos;Économie Numérique du Gabon :
            </span>
            <br />
            <span className="text-transparent bg-clip-text bg-linear-to-r from-teal-300 to-emerald-200 whitespace-nowrap">
              Investissez dans le Hub Digital de l&apos;Afrique Centrale.
            </span>
            <br />
            <span className="text-white/90 whitespace-nowrap">Investissez dans l&apos;avenir.</span>
          </motion.h1>

          <motion.p variants={fadeUp} custom={2} initial="hidden" animate="visible" className="mt-6 text-lg md:text-xl text-white/80 leading-relaxed max-w-2xl font-light">
            {HERO_INVESTIR.subheadline}
          </motion.p>

          <motion.div variants={fadeUp} custom={3} initial="hidden" animate="visible" className="mt-10 flex flex-wrap items-center gap-4">
            <a href="#opportunites" className="px-8 py-4 text-base font-semibold text-white rounded-2xl bg-emerald-600 hover:bg-emerald-500 transition-all shadow-xl shadow-emerald-500/30 flex items-center gap-2">
              Explorer les opportunités <ArrowRight size={18} />
            </a>
            <Link href="/demo" className="px-8 py-4 text-base font-semibold text-white rounded-2xl bg-white/10 hover:bg-white/20 backdrop-blur-md border border-white/10 transition-all flex items-center gap-2">
              <PlayCircle size={18} /> Dashboard investisseur
            </Link>
          </motion.div>
        </div>

        {/* Hero Stats — Glassmorphism Cards */}
        <motion.div variants={stagger} initial="hidden" animate="visible" className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-20">
          {HERO_INVESTIR.heroStats.map((stat, i) => {
            const Icon = statIcons[i];
            return (
              <motion.div key={i} variants={fadeUp} custom={i + 4} className="p-5 rounded-2xl bg-white/5 backdrop-blur-xl border border-white/10 hover:bg-white/10 transition-colors">
                <div className="w-10 h-10 rounded-lg bg-emerald-500/20 flex items-center justify-center mb-4">
                  <Icon size={20} className="text-emerald-400" />
                </div>
                <div className="text-2xl md:text-3xl font-extrabold text-white mb-1">
                  <AnimatedCounter value={stat.value} />
                </div>
                <p className="text-white/60 text-sm leading-snug">{stat.label}</p>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}

// ═══════════════════════════════════════════
//  SECTION 2 — PARADOXE NUMÉRIQUE
// ═══════════════════════════════════════════

function ParadoxeSection() {
  return (
    <section className="py-28 bg-slate-900 dark:bg-black relative overflow-hidden">
      {/* Decorative blurs */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl" />
      <div className="absolute bottom-0 right-1/4 w-72 h-72 bg-amber-500/10 rounded-full blur-3xl" />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-amber-500/10 backdrop-blur-md border border-amber-500/20 text-amber-400 text-sm font-semibold mb-6">
            <Activity size={16} /> Data Storytelling
          </div>
          <h2 className="text-3xl md:text-5xl font-bold text-white tracking-tight mb-4">
            {PARADOXE_NUMERIQUE.title}
          </h2>
          <p className="text-lg text-white/60 max-w-3xl mx-auto">
            {PARADOXE_NUMERIQUE.description}
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-12 items-start">
          {/* Gauges on dark glassmorphism */}
          <motion.div initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} className="p-8 rounded-3xl bg-white/5 backdrop-blur-xl border border-white/10">
            {PARADOXE_NUMERIQUE.gauges.map((g, i) => (
              <GaugeBar key={i} {...g} />
            ))}
          </motion.div>

          {/* Key insight */}
          <motion.div initial={{ opacity: 0, x: 30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} className="flex flex-col gap-6">
            <div className="p-8 rounded-3xl bg-linear-to-br from-amber-500/15 to-orange-500/10 backdrop-blur-xl border border-amber-500/20">
              <AlertTriangle size={32} className="text-amber-400 mb-4" />
              <h3 className="text-xl font-bold text-white mb-4">Le chiffre clé</h3>
              <p className="text-white/80 leading-relaxed text-lg">
                {PARADOXE_NUMERIQUE.callout}
              </p>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="p-5 rounded-2xl bg-emerald-500/10 backdrop-blur-sm border border-emerald-500/20 text-center">
                <div className="text-3xl font-extrabold text-emerald-400">135%</div>
                <div className="text-xs text-emerald-300/80 mt-1">Pénétration mobile</div>
              </div>
              <div className="p-5 rounded-2xl bg-red-500/10 backdrop-blur-sm border border-red-500/20 text-center">
                <div className="text-3xl font-extrabold text-red-400">33%</div>
                <div className="text-xs text-red-300/80 mt-1">Comptes actifs</div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

// ═══════════════════════════════════════════
//  SECTION 3 — MACRO
// ═══════════════════════════════════════════

function MacroSection() {
  return (
    <section className="py-28 bg-white dark:bg-gray-950">
      <div className="max-w-7xl mx-auto px-6">
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-blue-50 dark:bg-blue-950/50 text-blue-600 dark:text-blue-400 text-sm font-semibold mb-6">
            <BarChart3 size={16} /> Données Macroéconomiques
          </div>
          <h2 className="text-3xl md:text-5xl font-bold text-gray-900 dark:text-white tracking-tight mb-4">
            Fondamentaux Macroéconomiques
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
            Stabilité monétaire (FCFA/Euro), inflation maîtrisée, excédent courant — les conditions d&apos;un investissement serein
          </p>
        </motion.div>

        {/* Table */}
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
          className="bg-gray-50 dark:bg-gray-900 rounded-3xl border border-gray-100 dark:border-gray-800 overflow-hidden shadow-sm mb-12 hover:shadow-xl transition-shadow duration-300">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-950">
                  <th className="text-left py-4 px-6 font-semibold text-gray-900 dark:text-white">Indicateur</th>
                  {['2022', '2023', '2024', '2025(p)', '2026(p)'].map(y => (
                    <th key={y} className="text-center py-4 px-4 font-semibold text-gray-900 dark:text-white">{y}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {MACRO_INDICATORS.map((row, i) => (
                  <tr key={i} className="border-b border-gray-100 dark:border-gray-800/50 hover:bg-white dark:hover:bg-gray-950/50 transition-colors">
                    <td className="py-3.5 px-6 font-medium text-gray-700 dark:text-gray-300">{row.indicateur}</td>
                    {[row.y2022, row.y2023, row.y2024, row.y2025, row.y2026].map((val, j) => (
                      <td key={j} className="text-center py-3.5 px-4">
                        <span className={`font-semibold ${val === null ? 'text-gray-400' : (val as number) >= 0 ? 'text-emerald-600 dark:text-emerald-400' : 'text-red-500'}`}>
                          {val === null ? '—' : val}
                        </span>
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="px-6 py-3 bg-white dark:bg-gray-950 text-xs text-gray-500 dark:text-gray-400 border-t border-gray-100 dark:border-gray-800">
            Source : Banque Africaine de Développement, Rapport Pays 2025 ; UNCDF Diagnostic Gabon 2023
          </div>
        </motion.div>

        {/* Key Facts */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {MACRO_KEY_FACTS.map((kf, i) => {
            const Icon = getIcon(kf.icon);
            return (
              <motion.div key={i} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.08 }}
                className="flex items-start gap-3 p-5 bg-gray-50 dark:bg-gray-900 rounded-2xl border border-gray-100 dark:border-gray-800 hover:shadow-xl hover:border-emerald-200 dark:hover:border-emerald-800 transition-all group">
                <div className="w-10 h-10 rounded-xl bg-blue-50 dark:bg-blue-950/50 flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform">
                  <Icon size={20} className="text-blue-600 dark:text-blue-400" />
                </div>
                <p className="text-sm text-gray-700 dark:text-gray-300 leading-relaxed">{kf.fact}</p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

// ═══════════════════════════════════════════
//  SECTION 4 — VERTICALES (Homepage service card style)
// ═══════════════════════════════════════════

function VerticalesSection() {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const verticalIcons: Record<string, any> = {
    Wallet, ShoppingCart, HeartPulse, Sprout, GraduationCap, Building2,
  };

  const verticalImages = [
    '/images/entrepreneur.png', '/images/hero-libreville.png', '/images/innovation-hub.png',
    '/images/entrepreneur.png', '/images/hero-libreville.png', '/images/innovation-hub.png',
  ];

  return (
    <section id="opportunites" className="py-28 bg-gray-50 dark:bg-gray-900">
      <div className="max-w-7xl mx-auto px-6">
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-50 dark:bg-emerald-950/50 text-emerald-600 dark:text-emerald-400 text-sm font-semibold mb-6">
            <Target size={16} /> Verticales de Croissance
          </div>
          <h2 className="text-3xl md:text-5xl font-bold text-gray-900 dark:text-white tracking-tight mb-4">
            6 Verticales d&apos;Investissement
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
            Des marchés sous-pénétrés, des startups pionnières, et un écosystème de soutien gouvernemental
          </p>
        </motion.div>

        {/* Service-card style grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {VERTICALES.map((v, i) => {
            const Icon = verticalIcons[v.icon] || Zap;
            const img = verticalImages[i % verticalImages.length];
            return (
              <motion.div key={v.id} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }} className="group">
                <div className="flex flex-col bg-white dark:bg-gray-950 rounded-3xl overflow-hidden border border-gray-100 dark:border-gray-800 hover:shadow-2xl transition-all duration-300 h-full">
                  {/* Image header like homepage service cards */}
                  <div className="h-44 relative overflow-hidden bg-gray-200 dark:bg-gray-800">
                    <Image src={img} alt={v.titre} fill className="object-cover transform group-hover:scale-105 transition-transform duration-700" />
                    <div className="absolute inset-0 bg-linear-to-t from-gray-900/70 to-transparent" />
                    {/* Market data overlay */}
                    <div className="absolute bottom-3 left-4 right-4 flex justify-between items-end">
                      <div>
                        <span className="text-white/70 text-xs">Marché</span>
                        <div className="text-white font-bold text-sm">{v.marche.taille}</div>
                      </div>
                      <div className="text-right">
                        <span className="text-white/70 text-xs">Croissance</span>
                        <div className="text-emerald-400 font-bold text-sm">{v.marche.croissance}</div>
                      </div>
                    </div>
                  </div>

                  <div className="px-6 pb-7 pt-0 flex-1 flex flex-col relative">
                    {/* Icon overlap like homepage */}
                    <div className="w-14 h-14 rounded-2xl flex items-center justify-center text-white shadow-xl -mt-7 mb-4 relative z-10 border-4 border-white dark:border-gray-950" style={{ backgroundColor: v.color }}>
                      <Icon size={24} />
                    </div>

                    <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2 group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors">
                      {v.titre}
                    </h3>
                    <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed mb-5 flex-1">
                      {v.opportunite}
                    </p>

                    {/* Startups tags */}
                    <div className="mb-4">
                      <div className="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-2">Startups actives</div>
                      <div className="flex flex-wrap gap-1.5">
                        {v.startupsExistantes.slice(0, 3).map((s) => (
                          <span key={s.nom} className="px-2.5 py-1 rounded-lg text-xs font-medium" style={{ backgroundColor: v.color + '15', color: v.color }}>
                            {s.nom}
                          </span>
                        ))}
                        {v.startupsExistantes.length > 3 && (
                          <span className="px-2.5 py-1 rounded-lg text-xs font-medium bg-gray-100 dark:bg-gray-800 text-gray-500 dark:text-gray-400">
                            +{v.startupsExistantes.length - 3}
                          </span>
                        )}
                      </div>
                    </div>

                    {/* Strategy */}
                    <div className="pt-4 border-t border-gray-100 dark:border-gray-800">
                      <div className="inline-flex items-center gap-2 text-sm font-semibold text-emerald-600 dark:text-emerald-400 opacity-0 transform translate-y-2 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300">
                        {v.strategieEntree} <ArrowRight size={14} />
                      </div>
                      <p className="text-xs text-gray-500 dark:text-gray-400 group-hover:hidden">{v.strategieEntree}</p>
                    </div>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

// ═══════════════════════════════════════════
//  SECTION 5 — CASE STUDY POZI
// ═══════════════════════════════════════════

function CaseStudySection() {
  const metricEntries = Object.entries(CASE_STUDY_POZI.metriques);
  const metricLabels: Record<string, string> = {
    vehiculesConnectes: 'Véhicules connectés',
    montantLeve: 'Montant levé',
    leadInvestor: 'Lead Investor',
    coInvestor: 'Co-Investor',
    conseilJuridique: 'Conseil juridique',
    secteur: 'Secteur',
    clientele: 'Clientèle',
    ambition2030: 'Ambition 2030',
  };

  return (
    <section className="py-28 bg-white dark:bg-gray-950">
      <div className="max-w-7xl mx-auto px-6">
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-50 dark:bg-emerald-950/50 text-emerald-600 dark:text-emerald-400 text-sm font-semibold mb-6">
            <Rocket size={16} /> Success Story
          </div>
          <h2 className="text-3xl md:text-5xl font-bold text-gray-900 dark:text-white tracking-tight">
            {CASE_STUDY_POZI.titre}
          </h2>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Timeline */}
          <motion.div initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}
            className="bg-gray-50 dark:bg-gray-900 rounded-3xl border border-gray-100 dark:border-gray-800 p-8 hover:shadow-xl transition-shadow">
            <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-8">Chronologie</h3>
            <div className="relative">
              <div className="absolute left-6 top-0 bottom-0 w-0.5 bg-linear-to-b from-emerald-500 to-teal-500" />
              {CASE_STUDY_POZI.timeline.map((t, i) => (
                <motion.div key={i} initial={{ opacity: 0, x: -10 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }}
                  className="relative flex items-start gap-6 mb-8 last:mb-0">
                  <div className="w-12 h-12 rounded-full bg-linear-to-br from-emerald-500 to-teal-500 flex items-center justify-center text-white font-bold text-xs z-10 shrink-0 shadow-lg shadow-emerald-500/20">
                    {t.year.slice(0, 4)}
                  </div>
                  <div className="pt-2">
                    <div className="text-sm font-bold text-emerald-600 dark:text-emerald-400 mb-1">{t.year}</div>
                    <p className="text-sm text-gray-700 dark:text-gray-300">{t.event}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Metrics */}
          <motion.div initial={{ opacity: 0, x: 30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}>
            <div className="bg-linear-to-br from-emerald-600 to-teal-600 rounded-3xl p-8 text-white mb-6 shadow-xl shadow-emerald-500/20">
              <h3 className="text-lg font-bold mb-2">Signification</h3>
              <p className="text-white/90 leading-relaxed">{CASE_STUDY_POZI.significance}</p>
            </div>

            <div className="bg-gray-50 dark:bg-gray-900 rounded-3xl border border-gray-100 dark:border-gray-800 p-8 hover:shadow-xl transition-shadow">
              <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-6">Métriques clés</h3>
              <div className="grid grid-cols-2 gap-4">
                {metricEntries.map(([key, val]) => (
                  <div key={key} className="p-3 bg-white dark:bg-gray-950 rounded-xl border border-gray-100 dark:border-gray-800">
                    <div className="text-xs text-gray-500 dark:text-gray-400 mb-1">{metricLabels[key] || key}</div>
                    <div className="font-bold text-gray-900 dark:text-white text-sm">{val}</div>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

// ═══════════════════════════════════════════
//  SECTION 6 — CADRE JURIDIQUE
// ═══════════════════════════════════════════

function CadreJuridiqueSection() {
  return (
    <section className="py-28 bg-gray-50 dark:bg-gray-900">
      <div className="max-w-7xl mx-auto px-6">
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-indigo-50 dark:bg-indigo-950/50 text-indigo-600 dark:text-indigo-400 text-sm font-semibold mb-6">
            <Shield size={16} /> Cadre Juridique
          </div>
          <h2 className="text-3xl md:text-5xl font-bold text-gray-900 dark:text-white tracking-tight mb-4">
            {CADRE_JURIDIQUE.titre}
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
            {CADRE_JURIDIQUE.subtitle}
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {CADRE_JURIDIQUE.avantages.map((a, i) => {
            const Icon = getIcon(a.icon);
            return (
              <motion.div key={i} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.08 }}
                className="p-7 bg-white dark:bg-gray-950 rounded-3xl border border-gray-100 dark:border-gray-800 hover:shadow-2xl hover:border-indigo-200 dark:hover:border-indigo-800 transition-all group">
                <div className="w-12 h-12 rounded-xl bg-indigo-50 dark:bg-indigo-950/50 flex items-center justify-center mb-5 group-hover:scale-110 transition-transform">
                  <Icon size={24} className="text-indigo-600 dark:text-indigo-400" />
                </div>
                <h3 className="font-bold text-gray-900 dark:text-white mb-2 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">{a.titre}</h3>
                <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">{a.description}</p>
                {a.lien && (
                  <a href={a.lien} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1.5 text-sm font-semibold text-indigo-600 dark:text-indigo-400 mt-4 hover:underline">
                    Visiter <ExternalLink size={14} />
                  </a>
                )}
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

// ═══════════════════════════════════════════
//  SECTION 7 — PARTENARIATS
// ═══════════════════════════════════════════

function PartenariatsSection() {
  return (
    <section className="py-28 bg-white dark:bg-gray-950">
      <div className="max-w-7xl mx-auto px-6">
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-50 dark:bg-emerald-950/50 text-emerald-600 dark:text-emerald-400 text-sm font-semibold mb-6">
            <Globe size={16} /> Social Proof
          </div>
          <h2 className="text-3xl md:text-5xl font-bold text-gray-900 dark:text-white tracking-tight mb-4">
            Partenariats Internationaux Actifs
          </h2>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
          className="bg-gray-50 dark:bg-gray-900 rounded-3xl border border-gray-100 dark:border-gray-800 overflow-hidden shadow-sm hover:shadow-xl transition-shadow">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-950">
                  <th className="text-left py-4 px-6 font-semibold text-gray-900 dark:text-white">Partenaire</th>
                  <th className="text-left py-4 px-4 font-semibold text-gray-900 dark:text-white">Programme</th>
                  <th className="text-left py-4 px-4 font-semibold text-gray-900 dark:text-white">Montant</th>
                  <th className="text-left py-4 px-4 font-semibold text-gray-900 dark:text-white">Impact</th>
                  <th className="text-left py-4 px-4 font-semibold text-gray-900 dark:text-white">Type</th>
                </tr>
              </thead>
              <tbody>
                {PARTENARIATS.map((p, i) => (
                  <tr key={i} className="border-b border-gray-100 dark:border-gray-800/50 hover:bg-white dark:hover:bg-gray-950/50 transition-colors">
                    <td className="py-3.5 px-6 font-semibold text-gray-900 dark:text-white">{p.partenaire}</td>
                    <td className="py-3.5 px-4 text-gray-700 dark:text-gray-300">{p.programme}</td>
                    <td className="py-3.5 px-4 font-medium text-emerald-600 dark:text-emerald-400">{p.montant}</td>
                    <td className="py-3.5 px-4 text-gray-600 dark:text-gray-400">{p.impact}</td>
                    <td className="py-3.5 px-4">
                      <span className="px-2.5 py-1 rounded-lg text-xs font-medium bg-blue-50 dark:bg-blue-950/50 text-blue-600 dark:text-blue-400">
                        {p.type}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

// ═══════════════════════════════════════════
//  SECTION 8 — MARCHÉ TÉLÉCOM
// ═══════════════════════════════════════════

function TelecomSection() {
  const maxMarche = Math.max(...OPERATEURS_TELECOM.map(o => o.partMarche));
  return (
    <section className="py-28 bg-slate-900 dark:bg-black relative overflow-hidden">
      {/* Decorative */}
      <div className="absolute top-20 right-10 w-96 h-96 bg-violet-500/10 rounded-full blur-3xl" />
      <div className="absolute bottom-10 left-10 w-72 h-72 bg-purple-500/10 rounded-full blur-3xl" />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-violet-500/10 backdrop-blur-md border border-violet-500/20 text-violet-400 text-sm font-semibold mb-6">
            <Signal size={16} /> ARCEP Q3 2025
          </div>
          <h2 className="text-3xl md:text-5xl font-bold text-white tracking-tight mb-4">
            {MARCHE_TELECOM.titre}
          </h2>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Stats cards */}
          <motion.div initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} className="space-y-4">
            <div className="p-6 rounded-3xl bg-linear-to-br from-violet-500 to-purple-600 text-white shadow-xl shadow-violet-500/20">
              <div className="text-sm text-white/70 mb-1">Parc total d&apos;abonnés</div>
              <div className="text-4xl font-extrabold">{MARCHE_TELECOM.parcTotal.toLocaleString('fr-FR')}</div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="p-5 rounded-2xl bg-white/5 backdrop-blur-xl border border-white/10">
                <div className="text-xs text-white/60 mb-1">Mobile</div>
                <div className="text-2xl font-bold text-white">{MARCHE_TELECOM.repartition.mobile}%</div>
              </div>
              <div className="p-5 rounded-2xl bg-white/5 backdrop-blur-xl border border-white/10">
                <div className="text-xs text-white/60 mb-1">Fixe</div>
                <div className="text-2xl font-bold text-white">{MARCHE_TELECOM.repartition.fixe}%</div>
              </div>
            </div>
            <div className="p-5 rounded-2xl bg-white/5 backdrop-blur-xl border border-white/10">
              <div className="text-xs text-white/60 mb-1">Chiffre d&apos;affaires Q3 2025</div>
              <div className="text-xl font-bold text-white">{MARCHE_TELECOM.chiffreAffairesQ3_2025}</div>
            </div>
          </motion.div>

          {/* Horizontal bar chart */}
          <motion.div initial={{ opacity: 0, x: 30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}
            className="p-8 rounded-3xl bg-white/5 backdrop-blur-xl border border-white/10">
            <h3 className="text-lg font-bold text-white mb-6">Parts de marché opérateurs</h3>
            <div className="space-y-5">
              {OPERATEURS_TELECOM.map((op) => (
                <div key={op.nom}>
                  <div className="flex justify-between items-baseline mb-1.5">
                    <span className="text-sm font-medium text-white/80 truncate mr-2">{op.nom}</span>
                    <span className="text-sm font-bold text-violet-400 shrink-0">{op.partMarche}%</span>
                  </div>
                  <div className="h-2.5 bg-white/10 rounded-full overflow-hidden">
                    <motion.div
                      className="h-full bg-linear-to-r from-violet-500 to-purple-500 rounded-full"
                      initial={{ width: 0 }}
                      whileInView={{ width: `${(op.partMarche / maxMarche) * 100}%` }}
                      viewport={{ once: true }}
                      transition={{ duration: 1, ease: 'easeOut' }}
                    />
                  </div>
                  <span className="text-xs text-white/40">{op.type}</span>
                </div>
              ))}
            </div>
            <div className="mt-6 pt-4 border-t border-white/10 text-xs text-white/40">
              {MARCHE_TELECOM.source}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

// ═══════════════════════════════════════════
//  SECTION 9 — RISQUES
// ═══════════════════════════════════════════

function RisquesSection() {
  const severiteColors = {
    faible: { bg: 'bg-green-50 dark:bg-green-950/30', text: 'text-green-700 dark:text-green-400', label: 'Faible' },
    moyenne: { bg: 'bg-amber-50 dark:bg-amber-950/30', text: 'text-amber-700 dark:text-amber-400', label: 'Moyenne' },
    haute: { bg: 'bg-red-50 dark:bg-red-950/30', text: 'text-red-700 dark:text-red-400', label: 'Haute' },
  };

  return (
    <section className="py-28 bg-gray-50 dark:bg-gray-900">
      <div className="max-w-7xl mx-auto px-6">
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-red-50 dark:bg-red-950/50 text-red-600 dark:text-red-400 text-sm font-semibold mb-6">
            <AlertTriangle size={16} /> Analyse de Risques
          </div>
          <h2 className="text-3xl md:text-5xl font-bold text-gray-900 dark:text-white tracking-tight mb-4">
            Risques &amp; Stratégies d&apos;Atténuation
          </h2>
        </motion.div>

        <div className="space-y-4">
          {RISQUES.map((r, i) => {
            const sev = severiteColors[r.severite];
            return (
              <motion.div key={i} initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.08 }}
                className="bg-white dark:bg-gray-950 rounded-3xl border border-gray-100 dark:border-gray-800 p-6 hover:shadow-xl hover:border-emerald-200 dark:hover:border-emerald-800 transition-all">
                <div className="flex flex-col md:flex-row md:items-start gap-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <h3 className="font-bold text-gray-900 dark:text-white">{r.risque}</h3>
                      <span className={`px-2.5 py-0.5 rounded-full text-xs font-semibold ${sev.bg} ${sev.text}`}>
                        {sev.label}
                      </span>
                    </div>
                    <p className="text-sm text-gray-600 dark:text-gray-400">{r.description}</p>
                  </div>
                  <div className="md:w-2/5 p-4 bg-emerald-50 dark:bg-emerald-950/30 rounded-2xl border border-emerald-200/50 dark:border-emerald-800/30">
                    <div className="flex items-center gap-2 mb-1">
                      <CheckCircle size={16} className="text-emerald-600 dark:text-emerald-400 shrink-0" />
                      <span className="text-xs font-semibold text-emerald-700 dark:text-emerald-300 uppercase tracking-wider">Atténuation</span>
                    </div>
                    <p className="text-sm text-emerald-800 dark:text-emerald-200">{r.attenuation}</p>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

// ═══════════════════════════════════════════
//  SECTION 10 — CTA FINAL (Homepage CTA style)
// ═══════════════════════════════════════════

function CTASection() {
  return (
    <section className="py-28 bg-white dark:bg-gray-950">
      <div className="max-w-5xl mx-auto px-6">
        <div className="rounded-[40px] bg-linear-to-r from-emerald-600 via-teal-500 to-emerald-600 overflow-hidden relative shadow-2xl shadow-emerald-500/20">
          <div className="absolute inset-0 bg-black/10" />
          <div className="absolute top-0 right-0 w-96 h-96 bg-white/5 rounded-full -translate-y-1/2 translate-x-1/3 blur-3xl" />
          <div className="absolute bottom-0 left-0 w-72 h-72 bg-teal-300/10 rounded-full translate-y-1/2 -translate-x-1/3 blur-3xl" />

          <div className="relative z-10 p-12 lg:p-16 text-center">
            <h2 className="text-3xl lg:text-5xl font-extrabold text-white mb-6 leading-tight">
              {CTA_FINAL.titre}
            </h2>
            <p className="text-lg text-white/85 mb-10 max-w-2xl mx-auto">
              {CTA_FINAL.description}
            </p>

            <div className="flex flex-wrap justify-center gap-4">
              {CTA_FINAL.actions.map((action, i) => (
                action.variant === 'primary' ? (
                  <Link key={i} href={action.href} className="px-8 py-4 bg-white text-emerald-700 rounded-2xl font-bold text-base hover:bg-gray-100 transition-all shadow-xl flex items-center gap-2">
                    {action.label} <ChevronRight size={18} />
                  </Link>
                ) : (
                  <a key={i} href={action.href} target="_blank" rel="noopener noreferrer"
                    className="px-8 py-4 bg-white/10 backdrop-blur-md border border-white/20 text-white rounded-2xl font-semibold text-base hover:bg-white/20 transition-all flex items-center gap-2">
                    {action.label} <ExternalLink size={16} />
                  </a>
                )
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

// ═══════════════════════════════════════════
//  PAGE
// ═══════════════════════════════════════════

export default function InvestirNumeriquePage() {
  return (
    <div className="bg-white dark:bg-gray-950 font-sans selection:bg-emerald-500/30">
      <Navbar activeServiceSlug="investir" />
      <main>
        <HeroSection />
        <ParadoxeSection />
        <MacroSection />
        <VerticalesSection />
        <CaseStudySection />
        <CadreJuridiqueSection />
        <PartenariatsSection />
        <TelecomSection />
        <RisquesSection />
        <CTASection />
      </main>
      <Footer />
    </div>
  );
}
