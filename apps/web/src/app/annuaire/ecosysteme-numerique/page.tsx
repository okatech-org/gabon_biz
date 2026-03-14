'use client';

import { useState, useMemo, useRef, useEffect } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Rocket, Users, Lightbulb, TrendingUp } from 'lucide-react';
import { getDigitalEcosystemEnterprises, DIGITAL_ECOSYSTEM_STATS, formatXAF } from '@/lib/annuaire-data';
import EnterpriseCard from '@/components/annuaire/EnterpriseCard';
import SectorDistribution from '@/components/annuaire/SectorDistribution';
import EcosystemMap from '@/components/annuaire/EcosystemMap';
import { useI18n } from '@/lib/i18n/i18nContext';

// Animated counter
function AnimatedCounter({ target, suffix = '' }: { target: number; suffix?: string }) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const duration = 1500;
    const step = target / (duration / 16);
    let current = 0;
    const timer = setInterval(() => {
      current += step;
      if (current >= target) { current = target; clearInterval(timer); }
      setCount(Math.round(current));
    }, 16);
    return () => clearInterval(timer);
  }, [target]);

  return <span ref={ref}>{count.toLocaleString('fr-FR')}{suffix}</span>;
}

export default function EcosystemeNumeriquePage() {
  const { tr } = useI18n();
  const [selectedCategory, setSelectedCategory] = useState<string | undefined>();
  const allStartups = useMemo(() => getDigitalEcosystemEnterprises(), []);
  const stats = DIGITAL_ECOSYSTEM_STATS;

  const filtered = useMemo(
    () => selectedCategory ? allStartups.filter((e) => e.digitalCategory === selectedCategory) : allStartups,
    [selectedCategory, allStartups]
  );

  const seekingFunding = allStartups.filter((e) => e.startupProfile?.seekingFunding);

  return (
    <div className="pt-24 pb-20">
      {/* HERO */}
      <section className="px-6 mb-16">
        <div className="max-w-5xl mx-auto text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-sm font-semibold bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-400 mb-6">
              {tr('ann.eco_badge')}
            </span>
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4 leading-tight">
              {tr('ann.eco_title1')}
              <br />
              <span className="text-transparent bg-clip-text bg-linear-to-r from-purple-500 to-blue-500">
                {tr('ann.eco_title2')}
              </span>
            </h1>
            <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
              <strong>{stats.totalStartups}</strong> {tr('ann.startups')}, <strong>{stats.totalSolutions}</strong> {tr('ann.solutions_lbl')},{' '}
              <strong>{stats.categories.length}</strong> {tr('ann.categories')}.
              <br />{tr('ann.innovation_click')}
            </p>
          </motion.div>
        </div>
      </section>

      {/* STAT COUNTERS */}
      <section className="px-6 mb-16">
        <div className="max-w-4xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            { icon: <Rocket size={24} />, value: stats.totalStartups, label: tr('ann.stat_startups'), color: '#8b5cf6' },
            { icon: <Users size={24} />, value: stats.totalEmployees, label: tr('ann.stat_jobs'), color: '#3b82f6' },
            { icon: <Lightbulb size={24} />, value: stats.totalSolutions, label: tr('ann.stat_solutions'), color: '#f59e0b' },
            { icon: <TrendingUp size={24} />, value: stats.seekingFunding, label: tr('ann.stat_funding'), color: '#10b981' },
          ].map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 * i }}
              className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-200 dark:border-gray-800 p-5 text-center"
            >
              <div
                className="w-12 h-12 rounded-xl mx-auto mb-3 flex items-center justify-center text-white"
                style={{ background: stat.color }}
              >
                {stat.icon}
              </div>
              <div className="text-3xl font-bold text-gray-900 dark:text-white">
                <AnimatedCounter target={stat.value} />
              </div>
              <div className="text-sm text-gray-500 dark:text-gray-400 mt-1">{stat.label}</div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* CATEGORY DISTRIBUTION */}
      <section className="px-6 mb-10">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6 text-center">
            {tr('ann.by_category')}
          </h2>
          <SectorDistribution
            selectedCategory={selectedCategory}
            onSelectCategory={setSelectedCategory}
          />
        </div>
      </section>

      {/* STARTUP GRID */}
      <section className="px-6 mb-16">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {filtered.map((e, i) => (
              <EnterpriseCard key={e.id} enterprise={e} index={i} />
            ))}
          </div>
          {filtered.length === 0 && (
            <div className="text-center py-12 text-gray-400">
              {tr('ann.no_startup_cat')}
            </div>
          )}
        </div>
      </section>

      {/* MAP */}
      <section className="px-6 mb-16">
        <div className="max-w-3xl mx-auto">
          <EcosystemMap />
        </div>
      </section>

      {/* FUNDING TABLE */}
      <section className="px-6 mb-16">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6 text-center">
            {tr('ann.funding_title')}
          </h2>
          <div className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-200 dark:border-gray-800 overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-gray-200 dark:border-gray-700">
                    <th className="text-left py-3 px-4 text-gray-500 dark:text-gray-400 font-semibold">{tr('ann.th_startup')}</th>
                    <th className="text-left py-3 px-4 text-gray-500 dark:text-gray-400 font-semibold">{tr('ann.category')}</th>
                    <th className="text-left py-3 px-4 text-gray-500 dark:text-gray-400 font-semibold">{tr('ann.stage')}</th>
                    <th className="text-right py-3 px-4 text-gray-500 dark:text-gray-400 font-semibold">{tr('ann.th_amount')}</th>
                    <th className="text-right py-3 px-4 text-gray-500 dark:text-gray-400 font-semibold"></th>
                  </tr>
                </thead>
                <tbody>
                  {seekingFunding
                    .sort((a, b) => (b.startupProfile?.fundingTarget || 0) - (a.startupProfile?.fundingTarget || 0))
                    .map((e) => (
                      <tr key={e.id} className="border-b border-gray-200 dark:border-gray-800 hover:bg-gray-100 dark:hover:bg-gray-800/50 transition-colors">
                        <td className="py-3 px-4 font-medium text-gray-900 dark:text-white">{e.name}</td>
                        <td className="py-3 px-4">
                          <span className="px-2 py-0.5 rounded-full text-[11px] font-semibold bg-purple-50 dark:bg-purple-900/20 text-purple-600 dark:text-purple-400">
                            {e.digitalCategory}
                          </span>
                        </td>
                        <td className="py-3 px-4 text-gray-600 dark:text-gray-400">{e.startupProfile?.fundingStage}</td>
                        <td className="py-3 px-4 text-right font-semibold text-amber-600 dark:text-amber-400">
                          {e.startupProfile?.fundingTarget ? formatXAF(e.startupProfile.fundingTarget) : '—'}
                        </td>
                        <td className="py-3 px-4 text-right">
                          <Link href={`/annuaire/${e.rccm}`} className="text-emerald-600 dark:text-emerald-400 hover:underline no-underline text-xs font-semibold">
                            {tr('ann.see')}
                          </Link>
                        </td>
                      </tr>
                    ))}
                </tbody>
              </table>
            </div>
            <div className="px-4 py-3 text-center text-xs text-gray-400 dark:text-gray-500 bg-gray-100 dark:bg-gray-800/30">
              {tr('ann.total_sought')} <strong className="text-amber-600 dark:text-amber-400">{formatXAF(stats.totalFundingTarget)}</strong>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="px-6">
        <div className="max-w-3xl mx-auto text-center bg-linear-to-br from-purple-600 to-blue-600 rounded-3xl p-10 text-white">
          <h2 className="text-2xl font-bold mb-3">{tr('ann.cta_title')}</h2>
          <p className="text-purple-100 mb-6 text-sm">
            {tr('ann.cta_desc')}
          </p>
          <div className="flex flex-wrap gap-3 justify-center">
            <Link href="/login" className="px-6 py-3 rounded-xl text-sm font-semibold bg-white text-purple-700 hover:bg-purple-50 no-underline transition-colors">
              {tr('ann.cta_register')}
            </Link>
            <Link href="/services/incubateur" className="px-6 py-3 rounded-xl text-sm font-semibold bg-white/20 text-white hover:bg-white/30 no-underline transition-colors border border-white/30">
              {tr('ann.cta_sing')}
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
