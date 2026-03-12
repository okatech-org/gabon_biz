'use client';

import { useState, useMemo } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Search, CheckCircle, Cpu, Building2, ChevronLeft, ChevronRight, BarChart3, MapPin, Zap } from 'lucide-react';
import EnterpriseCard from '@/components/annuaire/EnterpriseCard';
import EnterpriseFilters from '@/components/annuaire/EnterpriseFilters';
import { SECTORS, ENTERPRISES, searchEnterprises, type SearchFilters } from '@/lib/annuaire-data';
import { useI18n } from '@/lib/i18n/i18nContext';

const ITEMS_PER_PAGE = 12;

/* ═══════════════════════════════
   ANIMATION VARIANTS
   ═══════════════════════════════ */
const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i: number) => ({
    opacity: 1, y: 0,
    transition: { duration: 0.6, delay: i * 0.08, ease: 'easeOut' as const },
  }),
};

const stagger = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1 } },
};

export default function AnnuairePage() {
  const { tr } = useI18n();
  const [query, setQuery] = useState('');
  const [filters, setFilters] = useState<SearchFilters>({});
  const [page, setPage] = useState(1);
  const [activeSector, setActiveSector] = useState<string | undefined>();
  const { scrollY } = useScroll();
  const y = useTransform(scrollY, [0, 800], [0, 300]);

  const allFilters: SearchFilters = {
    ...filters,
    query,
    sector: activeSector || filters.sector,
    sortBy: 'date',
  };

  const results = useMemo(() => searchEnterprises(allFilters), [query, filters, activeSector]);
  const totalPages = Math.ceil(results.length / ITEMS_PER_PAGE);
  const pageResults = results.slice((page - 1) * ITEMS_PER_PAGE, page * ITEMS_PER_PAGE);

  const totalEnterprises = ENTERPRISES.length;
  const totalTech = ENTERPRISES.filter(e => e.isDigitalEcosystem).length;

  return (
    <div>
      {/* ═══════ HERO — homepage style ═══════ */}
      <section className="relative min-h-[90vh] flex items-center overflow-hidden pt-20">
        <motion.div style={{ y }} className="absolute inset-0 z-0">
          <Image src="/images/hero-libreville.png" alt="Libreville" fill priority className="object-cover" />
        </motion.div>
        <div className="absolute inset-0 z-0 bg-linear-to-b from-slate-900/80 via-slate-900/60 to-slate-900/90 dark:from-black/90 dark:via-black/70 dark:to-black/90" />

        <div className="relative z-10 max-w-7xl mx-auto px-6 w-full py-20 flex flex-col justify-center">
          <div className="max-w-3xl">
            <motion.div variants={fadeUp} custom={0} initial="hidden" animate="visible" className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 backdrop-blur-md border border-white/20 mb-8">
              <Building2 size={16} className="text-emerald-400" />
              <span className="text-sm font-medium text-emerald-300">{totalEnterprises} {tr('ann.listed')}</span>
            </motion.div>

            <motion.h1 variants={fadeUp} custom={1} initial="hidden" animate="visible" className="text-3xl sm:text-4xl md:text-5xl lg:text-[3.5rem] xl:text-6xl font-extrabold text-white leading-[1.1] tracking-tight">
              <span className="text-transparent bg-clip-text bg-linear-to-r from-emerald-400 to-emerald-200">
                {tr('ann.title1')}
              </span>
              {' '}
              {tr('ann.title2')}.
            </motion.h1>

            <motion.p variants={fadeUp} custom={2} initial="hidden" animate="visible" className="mt-6 text-base md:text-lg lg:text-xl text-white/80 leading-relaxed max-w-2xl font-light">
              {tr('ann.subtitle')}
            </motion.p>

            {/* Search bar */}
            <motion.div variants={fadeUp} custom={3} initial="hidden" animate="visible" className="mt-10 max-w-2xl relative">
              <Search size={22} className="absolute left-5 top-1/2 -translate-y-1/2 text-white/40 pointer-events-none z-10" />
              <input
                type="text"
                value={query}
                onChange={(e) => { setQuery(e.target.value); setPage(1); }}
                placeholder={tr('ann.search_ph')}
                className="w-full bg-white/8 backdrop-blur-xl border border-white/15 rounded-2xl text-white placeholder:text-white/40 pl-14 pr-6 py-4 text-lg focus:outline-none focus:ring-2 focus:ring-emerald-500/40 focus:border-emerald-500/50 transition-all shadow-2xl shadow-black/20"
              />
              {query && (
                <button
                  onClick={() => { setQuery(''); setPage(1); }}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-white/40 hover:text-white bg-transparent border-none cursor-pointer p-1"
                >
                  ✕
                </button>
              )}
            </motion.div>

            {/* Quick action pills */}
            <motion.div variants={fadeUp} custom={4} initial="hidden" animate="visible" className="mt-6 flex flex-wrap items-center gap-3">
              <button
                onClick={() => { setActiveSector(undefined); setFilters({}); setQuery(''); setPage(1); }}
                className="px-6 py-3 text-sm font-semibold text-white rounded-2xl bg-emerald-600 hover:bg-emerald-500 transition-all shadow-xl shadow-emerald-500/30 flex items-center gap-2 border-none cursor-pointer"
              >
                <Search size={16} /> {tr('ann.all')}
              </button>
              <Link href="/annuaire/ecosysteme-numerique" className="px-6 py-3 text-sm font-semibold text-white rounded-2xl bg-white/10 hover:bg-white/20 backdrop-blur-md border border-white/10 transition-all flex items-center gap-2 no-underline">
                <Cpu size={16} /> {tr('ann.ecosystem')}
              </Link>
              <Link href="/annuaire/verifier" className="px-6 py-3 text-sm font-semibold text-white rounded-2xl bg-white/10 hover:bg-white/20 backdrop-blur-md border border-white/10 transition-all flex items-center gap-2 no-underline">
                <CheckCircle size={16} /> {tr('ann.verify_link')}
              </Link>
            </motion.div>
          </div>

          {/* 4 Glassmorphic stat cards — homepage style */}
          <motion.div variants={stagger} initial="hidden" animate="visible" className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-20">
            {[
              { icon: <Building2 size={20} className="text-emerald-400" />, value: totalEnterprises, label: tr('ann.listed') },
              { icon: <BarChart3 size={20} className="text-emerald-400" />, value: SECTORS.length, label: 'Secteurs' },
              { icon: <MapPin size={20} className="text-emerald-400" />, value: '9', label: 'Provinces' },
              { icon: <Zap size={20} className="text-emerald-400" />, value: totalTech, label: 'Tech' },
            ].map((stat, i) => (
              <motion.div key={i} variants={fadeUp} custom={i + 5} className="p-5 rounded-2xl bg-white/5 backdrop-blur-xl border border-white/10 hover:bg-white/10 transition-colors">
                <div className="w-10 h-10 rounded-lg bg-emerald-500/20 flex items-center justify-center mb-4">
                  {stat.icon}
                </div>
                <h3 className="text-white font-extrabold text-2xl md:text-3xl">{stat.value}</h3>
                <p className="text-white/60 text-sm leading-relaxed">{stat.label}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ═══════ TRANSITION gradient ═══════ */}
      <div className="h-16 bg-linear-to-b from-slate-900 to-gray-50 dark:to-gray-950" />

      {/* ═══════ MAIN CONTENT ═══════ */}
      <div className="max-w-7xl mx-auto px-6 pt-8 pb-24">

        {/* ═══════ SECTOR CHIPS — innovation-hub style ═══════ */}
        <div className="text-center mb-6">
          <h2 className="text-xl md:text-2xl font-extrabold text-gray-900 dark:text-white mb-2">
            {tr('ann.explore') || 'Explorez les Entreprises Gabonaises'}
          </h2>
          <p className="text-sm text-gray-500 dark:text-gray-400 mb-6">
            {tr('ann.filter_desc') || 'Filtrez par secteur, province ou statut — sans inscription'}
          </p>
          <div className="flex flex-wrap gap-2 justify-center">
            <button
              onClick={() => { setActiveSector(undefined); setPage(1); }}
              className={`inline-flex items-center gap-1.5 text-xs font-medium px-3 py-1.5 rounded-full border-none cursor-pointer transition-all duration-200 ${
                !activeSector
                  ? 'text-white shadow-md bg-emerald-500'
                  : 'bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-700'
              }`}
            >
              {tr('ann.all_count')} <span className={`text-[10px] px-1.5 py-0.5 rounded-full ${!activeSector ? 'bg-white/20 text-white' : 'bg-gray-200 dark:bg-gray-700 text-gray-500 dark:text-gray-400'}`}>{totalEnterprises}</span>
            </button>
            {SECTORS.map((s) => {
              const count = ENTERPRISES.filter(e => e.sector.id === s.id).length;
              return (
                <button
                  key={s.id}
                  onClick={() => { setActiveSector(activeSector === s.slug ? undefined : s.slug); setPage(1); }}
                  className={`inline-flex items-center gap-1.5 text-xs font-medium px-3 py-1.5 rounded-full border-none cursor-pointer transition-all duration-200 ${
                    activeSector === s.slug
                      ? 'text-white shadow-md'
                      : 'bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-700'
                  }`}
                  style={activeSector === s.slug ? { background: s.color } : undefined}
                >
                  {s.icon} {s.name} <span className={`text-[10px] px-1.5 py-0.5 rounded-full ${activeSector === s.slug ? 'bg-white/20 text-white' : 'bg-gray-200 dark:bg-gray-700 text-gray-500 dark:text-gray-400'}`}>{count}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* ═══════ ADVANCED FILTERS — chip rows ═══════ */}
        <div className="bg-white/60 dark:bg-white/3 backdrop-blur-xl rounded-2xl border border-gray-200/50 dark:border-white/6 p-5 mb-8 shadow-sm">
          <EnterpriseFilters
            filters={filters}
            onChange={(f) => { setFilters(f); setPage(1); }}
            totalResults={results.length}
          />
        </div>

        {/* Section heading */}
        <div className="flex items-end justify-between mb-6">
          <div>
            <p className="text-sm text-gray-500 dark:text-gray-400 m-0">
              <strong className="text-gray-900 dark:text-white">{results.length}</strong> {results.length !== 1 ? tr('ann.enterprises_pl') : tr('ann.enterprises')}
              {activeSector && (
                <span className="ml-1 text-gray-400">
                  · {SECTORS.find(s => s.slug === activeSector)?.icon} {SECTORS.find(s => s.slug === activeSector)?.name}
                </span>
              )}
            </p>
          </div>
          {totalPages > 1 && (
            <span className="text-xs text-gray-400 dark:text-gray-500 hidden md:block">
              {(page - 1) * ITEMS_PER_PAGE + 1}–{Math.min(page * ITEMS_PER_PAGE, results.length)} / {results.length}
            </span>
          )}
        </div>

        {/* ═══════ RESULTS GRID ═══════ */}
        {pageResults.length > 0 ? (
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-40px' }}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5"
          >
            {pageResults.map((enterprise, i) => (
              <EnterpriseCard key={enterprise.id} enterprise={enterprise} index={i} />
            ))}
          </motion.div>
        ) : (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center py-24 bg-white/60 dark:bg-white/2 backdrop-blur-xl rounded-3xl border border-gray-200/50 dark:border-white/6"
          >
            <Search size={48} className="mx-auto mb-4 text-gray-300 dark:text-gray-700" />
            <p className="text-lg font-semibold text-gray-500 dark:text-gray-400">{tr('ann.no_results')}</p>
            <p className="text-sm text-gray-400 dark:text-gray-500 mt-1">{tr('ann.try_search')}</p>
          </motion.div>
        )}

        {/* ═══════ PAGINATION ═══════ */}
        {totalPages > 1 && (
          <div className="mt-12 flex items-center justify-center gap-2">
            <button
              onClick={() => setPage((p) => Math.max(1, p - 1))}
              disabled={page === 1}
              className="flex items-center gap-1.5 px-4 py-2.5 rounded-xl text-sm font-semibold bg-white/80 dark:bg-white/4 backdrop-blur-sm text-gray-700 dark:text-gray-300 border border-gray-200/50 dark:border-white/6 hover:bg-gray-100 dark:hover:bg-white/8 disabled:opacity-30 cursor-pointer transition-all"
            >
              <ChevronLeft size={16} /> {tr('ann.prev')}
            </button>

            <div className="flex items-center gap-1">
              {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
                <button
                  key={p}
                  onClick={() => setPage(p)}
                  className={`w-9 h-9 rounded-xl text-sm font-bold border-none cursor-pointer transition-all
                    ${page === p
                      ? 'bg-emerald-500 text-white shadow-lg shadow-emerald-500/20'
                      : 'bg-white/60 dark:bg-white/4 text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-white/8'
                    }`}
                >
                  {p}
                </button>
              ))}
            </div>

            <button
              onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
              disabled={page === totalPages}
              className="flex items-center gap-1.5 px-4 py-2.5 rounded-xl text-sm font-semibold bg-white/80 dark:bg-white/4 backdrop-blur-sm text-gray-700 dark:text-gray-300 border border-gray-200/50 dark:border-white/6 hover:bg-gray-100 dark:hover:bg-white/8 disabled:opacity-30 cursor-pointer transition-all"
            >
              {tr('ann.next')} <ChevronRight size={16} />
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
