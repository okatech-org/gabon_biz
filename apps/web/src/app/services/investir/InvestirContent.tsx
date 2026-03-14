'use client';

import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import {
  BarChart3,
  Calculator,
  ArrowDown,
  ExternalLink,
  ChevronDown,
  ChevronUp,
  Shield,
  Globe,
  TrendingUp,
  Server,
  Users,
  CheckCircle,
} from 'lucide-react';
import {
  HERO_INVESTIR,
  PARADOXE_META,
  PARADOXE_GAUGES,
  MACRO_TABLE,
  MACRO_SOURCE,
  MACRO_CHARTS,
  KEY_FACTS,
  VERTICALES,
  CASE_STUDY_POZI,
  PARCOURS_STEPS,
  CADRE_JURIDIQUE,
  ECOSYSTEME_SUPPORT,
  PARTENARIATS,
  RISQUES,
  GABON_DIGITAL_VISION,
  CTA_FINAL,
} from '@/lib/mock/investir-data';
import ParadoxeGauges from '@/components/investir/ParadoxeGauges';
import MacroTable from '@/components/investir/MacroTable';
import VerticaleCard from '@/components/investir/VerticaleCard';
import ROISimulator from '@/components/investir/ROISimulator';
import InvestorJourneyMap from '@/components/investir/InvestorJourneyMap';
import TelecomChart from '@/components/investir/TelecomChart';
import RisqueCard from '@/components/investir/RisqueCard';

import CompactHero from '@/components/services/CompactHero';

function useCountUp(target: number, duration = 2000) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          const start = performance.now();
          const tick = (now: number) => {
            const p = Math.min((now - start) / duration, 1);
            setCount(Math.round(target * p));
            if (p < 1) requestAnimationFrame(tick);
          };
          requestAnimationFrame(tick);
          obs.disconnect();
        }
      },
      { threshold: 0.3 },
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [target, duration]);
  return { ref, count };
}

function SectionWrapper({
  id,
  theme,
  children,
}: {
  id?: string;
  theme: 'dark' | 'light' | 'light-gray' | 'gradient';
  children: React.ReactNode;
}) {
  const bg =
    theme === 'dark'
      ? 'bg-slate-900'
      : theme === 'light-gray'
        ? 'bg-gray-100 dark:bg-gray-950'
        : theme === 'gradient'
          ? 'bg-linear-to-r from-teal-600 via-emerald-500 to-green-600'
          : 'bg-white dark:bg-gray-950';
  return (
    <section id={id} className={`${bg} py-16 md:py-20`}>
      <div className="max-w-6xl mx-auto px-4 sm:px-6">{children}</div>
    </section>
  );
}

function SectionBadge({ text, dark = false }: { text: string; dark?: boolean }) {
  return (
    <span
      className={`inline-block text-xs font-bold px-3 py-1 rounded-full mb-3 ${dark ? 'bg-white/10 text-teal-300' : 'bg-teal-500/10 text-teal-600 dark:text-teal-400'}`}
    >
      {text}
    </span>
  );
}

export default function InvestirContent() {
  const [activeSection, setActiveSection] = useState('');


  // Sticky anchor nav scroll tracking
  useEffect(() => {
    const secs = HERO_INVESTIR.anchorNav.map((a) => a.href.replace('#', ''));
    const handler = () => {
      for (let i = secs.length - 1; i >= 0; i--) {
        const el = document.getElementById(secs[i]);
        if (el && el.getBoundingClientRect().top <= 120) {
          setActiveSection(secs[i]);
          return;
        }
      }
      setActiveSection('');
    };
    window.addEventListener('scroll', handler, { passive: true });
    return () => window.removeEventListener('scroll', handler);
  }, []);

  return (
    <div>
      {/* ═══════════ 1. HERO ═══════════ */}
      <CompactHero
        badge={`${HERO_INVESTIR.badge.icon} ${HERO_INVESTIR.badge.text}`}
        title={<>{HERO_INVESTIR.title.map((t, i) => <span key={i} className={`bg-linear-to-r ${t.gradient} bg-clip-text text-transparent block`}>{t.text}</span>)}</>}
        subtitle={HERO_INVESTIR.subtitle}
        backgroundClasses="bg-linear-to-br from-slate-900 via-emerald-950/60 to-slate-900"
        overlays={
          <div className="absolute inset-0 bg-[url('/images/hero-libreville.png')] bg-cover bg-center opacity-15" />
        }
        accentColor="#14b8a6"
        ctaPrimary={{ label: HERO_INVESTIR.primaryCTA.label, href: HERO_INVESTIR.primaryCTA.href }}
        ctaSecondary={{ label: HERO_INVESTIR.secondaryCTA.label, href: HERO_INVESTIR.secondaryCTA.href }}
        stats={HERO_INVESTIR.stats.map(s => {
          const Icon = s.icon;
          return { value: s.value, label: s.label, icon: <Icon size={18} className="text-teal-400" /> };
        })}
      >
        {/* Partner marquee */}
        <div className="overflow-hidden mt-2">
          <div className="flex animate-marquee gap-12">
            {[...HERO_INVESTIR.partners, ...HERO_INVESTIR.partners].map((p, i) => (
              <span key={i} className="text-xs font-semibold text-gray-500 whitespace-nowrap">
                {p}
              </span>
            ))}
          </div>
        </div>
      </CompactHero>

      {/* Sticky anchor nav */}
      <div className="sticky top-16 z-30 bg-white/90 dark:bg-gray-900/90 backdrop-blur-lg border-b border-gray-200/50 dark:border-white/5">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 flex gap-1 overflow-x-auto py-2">
          {HERO_INVESTIR.anchorNav.map((a) => (
            <a
              key={a.href}
              href={a.href}
              className={`text-xs font-semibold px-3 py-1.5 rounded-full whitespace-nowrap transition-all ${activeSection === a.href.replace('#', '') ? 'bg-teal-500 text-white' : 'text-gray-500 hover:text-teal-500 hover:bg-teal-50 dark:hover:bg-teal-500/10'}`}
            >
              {a.label}
            </a>
          ))}
        </div>
      </div>

      {/* ═══════════ 2. PARADOXE ═══════════ */}
      <SectionWrapper id="paradoxe" theme="dark">
        <SectionBadge text={PARADOXE_META.badge} dark />
        <h2 className="text-2xl md:text-3xl font-black text-white mb-2">{PARADOXE_META.title}</h2>
        <p className="text-sm text-gray-400 mb-8 max-w-2xl">{PARADOXE_META.description}</p>
        <div className="grid md:grid-cols-2 gap-8">
          <ParadoxeGauges gauges={PARADOXE_GAUGES} />
          <div className="space-y-6">
            {/* Gap Viz */}
            <div className="bg-white/5 rounded-2xl border border-white/10 p-6">
              <h3 className="text-sm font-bold text-white mb-4">{PARADOXE_META.gap.title}</h3>
              <div className="flex items-center justify-between">
                <div className="text-center">
                  <p
                    className="text-3xl font-black"
                    style={{ color: PARADOXE_META.gap.left.color }}
                  >
                    {PARADOXE_META.gap.left.value}
                  </p>
                  <p className="text-xs text-gray-400">{PARADOXE_META.gap.left.label}</p>
                </div>
                <div className="text-center px-4">
                  <p
                    className="text-2xl font-black"
                    style={{ color: PARADOXE_META.gap.gapValue.color }}
                  >
                    {PARADOXE_META.gap.gapValue.value}
                  </p>
                  <p className="text-[10px] text-gray-500">{PARADOXE_META.gap.gapValue.label}</p>
                </div>
                <div className="text-center">
                  <p
                    className="text-3xl font-black"
                    style={{ color: PARADOXE_META.gap.right.color }}
                  >
                    {PARADOXE_META.gap.right.value}
                  </p>
                  <p className="text-xs text-gray-400">{PARADOXE_META.gap.right.label}</p>
                </div>
              </div>
            </div>
            {/* Callout */}
            <div className="bg-linear-to-br from-teal-500/10 to-emerald-500/10 rounded-2xl border border-teal-500/20 p-6">
              <p className="text-sm text-gray-300 italic leading-relaxed">
                &ldquo;{PARADOXE_META.callout.stat}&rdquo;
              </p>
              <p className="text-base font-black text-teal-400 mt-3">
                {PARADOXE_META.callout.conclusion}
              </p>
            </div>
          </div>
        </div>
      </SectionWrapper>

      {/* ═══════════ 3. MACRO ═══════════ */}
      <SectionWrapper id="macro" theme="light">
        <SectionBadge text="📈 Données Macroéconomiques" />
        <h2 className="text-2xl md:text-3xl font-black text-gray-900 dark:text-white mb-2">
          Fondamentaux Macroéconomiques
        </h2>
        <p className="text-sm text-gray-500 mb-8">
          Stabilité monétaire (FCFA/Euro), inflation maîtrisée, excédent courant.
        </p>
        <MacroTable data={MACRO_TABLE} source={MACRO_SOURCE} />
        {/* Mini charts */}
        <div className="grid md:grid-cols-2 gap-6 mt-8">
          {[MACRO_CHARTS.gdpGrowth, MACRO_CHARTS.inflation].map((chart) => {
            const max = Math.max(...chart.data.map((d) => Math.abs(d.v))) * 1.3;
            return (
              <div key={chart.title} className="bg-gray-100 dark:bg-white/3 rounded-xl p-4">
                <h3 className="text-xs font-bold text-gray-900 dark:text-white mb-3">
                  {chart.title}
                </h3>
                <div className="flex items-end gap-2 h-24">
                  {chart.data.map((d, i) => (
                    <div key={d.y} className="flex-1 flex flex-col items-center gap-1">
                      <span className="text-[9px] font-bold text-gray-600 dark:text-gray-300">
                        {d.v}
                      </span>
                      <motion.div
                        initial={{ height: 0 }}
                        whileInView={{ height: `${(Math.abs(d.v) / max) * 100}%` }}
                        viewport={{ once: true }}
                        transition={{ delay: i * 0.08 }}
                        className={`w-full rounded-t-md ${d.v >= 0 ? 'bg-linear-to-t from-teal-500 to-emerald-400' : 'bg-red-400'}`}
                        style={{ minHeight: 4 }}
                      />
                      <span className="text-[8px] text-gray-400">{d.y}</span>
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
        {/* Key Facts */}
        <div className="grid md:grid-cols-4 gap-3 mt-8">
          {KEY_FACTS.map((f, i) => {
            const Icon = f.icon;
            return (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08 }}
                className="flex items-start gap-3 p-4 bg-teal-50 dark:bg-teal-500/5 rounded-xl border border-teal-200/40 dark:border-teal-500/10"
              >
                <Icon size={16} className="text-teal-500 mt-0.5 shrink-0" />
                <p className="text-xs text-gray-700 dark:text-gray-300">{f.fact}</p>
              </motion.div>
            );
          })}
        </div>
      </SectionWrapper>

      {/* ═══════════ 4. VERTICALES ═══════════ */}
      <SectionWrapper id="verticales" theme="light-gray">
        <SectionBadge text="🚀 Verticales de Croissance" />
        <h2 className="text-2xl md:text-3xl font-black text-gray-900 dark:text-white mb-2">
          6 Verticales d&apos;Investissement
        </h2>
        <p className="text-sm text-gray-500 mb-8">
          Chaque verticale représente un marché sous-pénétré avec des startups pionnières.
        </p>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
          {VERTICALES.map((v, i) => (
            <VerticaleCard key={v.id} verticale={v} index={i} />
          ))}
        </div>
      </SectionWrapper>

      {/* ═══════════ 5. POZI ═══════════ */}
      <SectionWrapper id="pozi" theme="light">
        <SectionBadge text={CASE_STUDY_POZI.badge} />
        <h2 className="text-2xl md:text-3xl font-black text-gray-900 dark:text-white mb-6">
          {CASE_STUDY_POZI.title}
        </h2>
        <div className="grid md:grid-cols-2 gap-8">
          {/* Timeline */}
          <div className="space-y-4">
            {CASE_STUDY_POZI.timeline.map((t, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="flex gap-4"
              >
                <div className="w-20 shrink-0">
                  <span className="text-xs font-black text-teal-500">{t.year}</span>
                </div>
                <div className="flex-1 pb-4 border-l-2 border-teal-200 dark:border-teal-800 pl-4">
                  <p className="text-sm text-gray-700 dark:text-gray-300">{t.event}</p>
                </div>
              </motion.div>
            ))}
          </div>
          {/* Metrics + VC Context */}
          <div className="space-y-4">
            <div className="bg-gray-100 dark:bg-white/3 rounded-2xl p-5 grid grid-cols-2 gap-3">
              {Object.entries(CASE_STUDY_POZI.metriques).map(([k, v]) => (
                <div key={k}>
                  <p className="text-[10px] text-gray-400 uppercase">
                    {k.replace(/([A-Z])/g, ' $1')}
                  </p>
                  <p className="text-xs font-bold text-gray-900 dark:text-white">{v}</p>
                </div>
              ))}
            </div>
            <div className="bg-teal-50 dark:bg-teal-500/5 rounded-2xl border border-teal-200/40 dark:border-teal-500/10 p-5">
              <h3 className="text-xs font-bold text-teal-600 dark:text-teal-400 uppercase tracking-wider mb-3">
                {CASE_STUDY_POZI.vcContext.title}
              </h3>
              <div className="grid grid-cols-3 gap-2 mb-3">
                {CASE_STUDY_POZI.vcContext.stats.map((s) => (
                  <div key={s.label} className="text-center">
                    <p className="text-sm font-black text-teal-600 dark:text-teal-300">{s.value}</p>
                    <p className="text-[10px] text-gray-500">{s.label}</p>
                  </div>
                ))}
              </div>
              <p className="text-xs text-teal-700 dark:text-teal-300 italic">
                {CASE_STUDY_POZI.vcContext.narrative}
              </p>
            </div>
          </div>
        </div>
      </SectionWrapper>

      {/* ═══════════ 6. SIMULATEUR ROI ═══════════ */}
      <SectionWrapper id="simulateur" theme="dark">
        <SectionBadge text="🧮 Outil Interactif" dark />
        <h2 className="text-2xl md:text-3xl font-black text-white mb-2">
          Simulez Votre Retour sur Investissement
        </h2>
        <p className="text-sm text-gray-400 mb-8">
          Estimez le potentiel de votre investissement dans l&apos;économie numérique gabonaise en 3
          étapes.
        </p>
        <div className="max-w-xl mx-auto">
          <ROISimulator />
        </div>
      </SectionWrapper>

      {/* ═══════════ 7. PARCOURS ═══════════ */}
      <SectionWrapper id="parcours" theme="light">
        <SectionBadge text="🗺️ Votre Parcours" />
        <h2 className="text-2xl md:text-3xl font-black text-gray-900 dark:text-white mb-2">
          Comment Investir au Gabon en 6 Étapes
        </h2>
        <p className="text-sm text-gray-500 mb-8">
          De la découverte au déploiement : un accompagnement structuré et digitalisé.
        </p>
        <div className="max-w-2xl mx-auto">
          <InvestorJourneyMap />
        </div>
      </SectionWrapper>

      {/* ═══════════ 8. CADRE JURIDIQUE ═══════════ */}
      <SectionWrapper id="juridique" theme="light-gray">
        <SectionBadge text="⚖️ Cadre Juridique" />
        <h2 className="text-2xl md:text-3xl font-black text-gray-900 dark:text-white mb-2">
          Un Cadre Juridique Favorable à l&apos;Investissement
        </h2>
        <p className="text-sm text-gray-500 mb-8">
          Code des Investissements, ANPI, ZIS de Nkok, exonérations fiscales.
        </p>
        <div className="grid grid-cols-2 lg:grid-cols-3 gap-2 sm:gap-4">
          {CADRE_JURIDIQUE.map((c, i) => {
            const Icon = c.icon;
            return (
              <motion.div
                key={c.titre}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08 }}
                className="bg-white dark:bg-white/5 rounded-xl border border-gray-200/60 dark:border-white/8 p-3 sm:p-5 hover:border-gray-300 dark:hover:border-white/15 transition-all"
              >
                <div className="flex items-center gap-2 mb-1 sm:mb-3 sm:block">
                  <Icon size={16} className="text-teal-500 sm:mb-3 shrink-0" />
                  <h3 className="text-xs sm:text-sm font-bold text-gray-900 dark:text-white">{c.titre}</h3>
                </div>
                <p className="text-[10px] sm:text-xs text-gray-600 dark:text-gray-400 leading-relaxed hidden sm:block">
                  {c.description}
                </p>
                {c.lien && (
                  <a
                    href={c.lien.href}
                    target={c.lien.external ? '_blank' : undefined}
                    rel={c.lien.external ? 'noopener noreferrer' : undefined}
                    className="inline-flex items-center gap-1 text-[10px] sm:text-xs text-teal-500 font-semibold mt-1 sm:mt-2 hover:underline"
                  >
                    <ExternalLink size={10} /> {c.lien.label}
                  </a>
                )}
              </motion.div>
            );
          })}
        </div>
      </SectionWrapper>

      {/* ═══════════ 9. ÉCOSYSTÈME ═══════════ */}
      <SectionWrapper id="ecosysteme" theme="light">
        <SectionBadge text="🤝 Écosystème" />
        <h2 className="text-2xl md:text-3xl font-black text-gray-900 dark:text-white mb-2">
          Écosystème de Support Investisseur
        </h2>
        <p className="text-sm text-gray-500 mb-8">
          Un réseau institutionnel structuré pour sécuriser et accélérer votre investissement.
        </p>
        <div className="grid grid-cols-2 lg:grid-cols-3 gap-2 sm:gap-4">
          {ECOSYSTEME_SUPPORT.map((inst, i) => {
            const Icon = inst.icon;
            return (
              <motion.div
                key={inst.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08 }}
                className="bg-white dark:bg-white/5 rounded-xl border border-gray-200/60 dark:border-white/8 p-3 sm:p-5 hover:border-gray-300 dark:hover:border-white/15 transition-all"
              >
                <div
                  className="w-8 h-8 sm:w-10 sm:h-10 rounded-lg sm:rounded-xl flex items-center justify-center text-white mb-2 sm:mb-3"
                  style={{ background: inst.color }}
                >
                  <Icon size={14} className="sm:hidden" />
                  <Icon size={16} className="hidden sm:block" />
                </div>
                <h3 className="text-xs sm:text-sm font-bold text-gray-900 dark:text-white">{inst.name}</h3>
                <p className="text-[10px] text-gray-500 mb-1 sm:mb-2">{inst.role}</p>
                <p className="text-[10px] sm:text-xs text-gray-600 dark:text-gray-400 hidden sm:block">{inst.description}</p>
                {inst.link && (
                  <a
                    href={inst.link}
                    className="text-[10px] sm:text-xs text-teal-500 font-semibold mt-1 sm:mt-2 inline-block hover:underline"
                  >
                    En savoir plus →
                  </a>
                )}
              </motion.div>
            );
          })}
        </div>
      </SectionWrapper>

      {/* ═══════════ 10. PARTENARIATS ═══════════ */}
      <SectionWrapper id="partenariats" theme="light-gray">
        <SectionBadge text="🌍 Social Proof" />
        <h2 className="text-2xl md:text-3xl font-black text-gray-900 dark:text-white mb-6">
          Partenariats Internationaux Actifs
        </h2>
        <div className="overflow-x-auto rounded-xl border border-gray-200/60 dark:border-white/8">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-gray-100 dark:bg-white/3">
                {['Partenaire', 'Programme', 'Montant', 'Impact', 'Type'].map((h) => (
                  <th
                    key={h}
                    className="text-left text-xs font-bold text-gray-900 dark:text-white px-4 py-3 uppercase tracking-wider"
                  >
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 dark:divide-white/5">
              {PARTENARIATS.map((p, i) => (
                <motion.tr
                  key={i}
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: true }}
                  className="hover:bg-gray-100/50 dark:hover:bg-white/2"
                >
                  <td className="px-4 py-3 font-bold text-gray-900 dark:text-white text-xs">
                    {p.partenaire}
                  </td>
                  <td className="px-4 py-3 text-xs text-gray-600 dark:text-gray-400">
                    {p.programme}
                  </td>
                  <td className="px-4 py-3 text-xs font-semibold text-teal-500">{p.montant}</td>
                  <td className="px-4 py-3 text-xs text-gray-600 dark:text-gray-400">{p.impact}</td>
                  <td className="px-4 py-3">
                    <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-gray-100 dark:bg-white/6 text-gray-600 dark:text-gray-300">
                      {p.type}
                    </span>
                  </td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </div>
      </SectionWrapper>

      {/* ═══════════ 11. TELECOM ═══════════ */}
      <SectionWrapper id="telecom" theme="dark">
        <SectionBadge text="📡 ARCEP Q3 2025" dark />
        <h2 className="text-2xl md:text-3xl font-black text-white mb-6">
          Un Marché Télécom Structuré et Lucratif
        </h2>
        <TelecomChart />
      </SectionWrapper>

      {/* ═══════════ 12. RISQUES ═══════════ */}
      <SectionWrapper id="risques" theme="light-gray">
        <SectionBadge text="⚠️ Analyse de Risques" />
        <h2 className="text-2xl md:text-3xl font-black text-gray-900 dark:text-white mb-2">
          Risques & Stratégies d&apos;Atténuation
        </h2>
        <p className="text-sm text-gray-500 mb-8">
          Transparence totale — chaque risque est accompagné de sa stratégie de mitigation.
        </p>
        <div className="grid grid-cols-2 md:grid-cols-2 gap-2 sm:gap-4">
          {RISQUES.map((r, i) => (
            <RisqueCard key={r.risque} risque={r} index={i} />
          ))}
        </div>
      </SectionWrapper>

      {/* ═══════════ 13. GABON DIGITAL 2030 ═══════════ */}
      <SectionWrapper id="gabon-digital" theme="dark">
        <SectionBadge text={GABON_DIGITAL_VISION.badge} dark />
        <h2 className="text-2xl md:text-3xl font-black text-white mb-2">
          {GABON_DIGITAL_VISION.title}
        </h2>
        <p className="text-sm text-gray-400 mb-8">{GABON_DIGITAL_VISION.subtitle}</p>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-8">
          {GABON_DIGITAL_VISION.keyFigures.map((f, i) => {
            const Icon = f.icon;
            return (
              <motion.div
                key={f.label}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="bg-white/5 rounded-xl border border-white/10 p-4 text-center"
              >
                <Icon size={16} className="text-teal-400 mx-auto mb-1" />
                <p className="text-xl font-black text-white">
                  {f.value}
                  <span className="text-sm text-gray-400 ml-1">{f.suffix || ''}</span>
                </p>
                <p className="text-[10px] text-gray-400 mt-1">{f.label}</p>
              </motion.div>
            );
          })}
        </div>
        {/* Timeline */}
        <div className="space-y-3 mb-8">
          {GABON_DIGITAL_VISION.deploymentTimeline.map((d, i) => (
            <motion.div
              key={d.year}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08 }}
              className={`flex items-center gap-4 p-3 rounded-xl ${d.status === 'completed' ? 'bg-teal-500/10 border border-teal-500/20' : d.status === 'in_progress' ? 'bg-amber-500/10 border border-amber-500/20' : 'bg-white/5 border border-white/5'}`}
            >
              <div
                className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 ${d.status === 'completed' ? 'bg-teal-500' : d.status === 'in_progress' ? 'bg-amber-500' : 'bg-gray-600'}`}
              >
                {d.status === 'completed' ? (
                  <CheckCircle size={14} className="text-white" />
                ) : (
                  <span className="text-xs font-bold text-white">{d.year.slice(2)}</span>
                )}
              </div>
              <div>
                <p className="text-xs font-bold text-white">{d.year}</p>
                <p className="text-xs text-gray-400">{d.milestone}</p>
              </div>
            </motion.div>
          ))}
        </div>
        {/* Projects grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-2 mb-6">
          {GABON_DIGITAL_VISION.projects.map((p) => (
            <div
              key={p}
              className="text-xs text-gray-400 p-2 bg-white/3 rounded-lg border border-white/5"
            >
              {p}
            </div>
          ))}
        </div>
        <p className="text-sm text-gray-400 italic leading-relaxed max-w-3xl">
          {GABON_DIGITAL_VISION.narrative}
        </p>
      </SectionWrapper>

      {/* ═══════════ 15. CTA FINAL ═══════════ */}
      <SectionWrapper theme="gradient">
        <div className="text-center py-2 sm:py-8">
          <h2 className="text-xl sm:text-2xl md:text-3xl font-black text-white mb-2 sm:mb-3">{CTA_FINAL.title}</h2>
          <p className="text-xs sm:text-sm text-white/80 mb-4 sm:mb-8 max-w-xl mx-auto">{CTA_FINAL.subtitle}</p>
          <div className="flex flex-wrap justify-center gap-2 sm:gap-3">
            {CTA_FINAL.actions.map((a) => {
              const Icon = a.icon;
              return a.variant === 'primary' ? (
                <Link
                  key={a.label}
                  href={a.href}
                  className="flex items-center gap-1.5 sm:gap-2 px-4 sm:px-6 py-2 sm:py-3 rounded-xl bg-white text-teal-600 font-bold text-xs sm:text-sm hover:bg-white/90 transition-all"
                >
                  <Icon size={14} /> {a.label}
                </Link>
              ) : (
                <a
                  key={a.label}
                  href={a.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1.5 sm:gap-2 px-4 sm:px-6 py-2 sm:py-3 rounded-xl border-2 border-white/30 text-white font-bold text-xs sm:text-sm hover:bg-white/10 transition-all"
                >
                  <Icon size={14} /> {a.label}
                </a>
              );
            })}
          </div>
        </div>
      </SectionWrapper>


    </div>
  );
}
