'use client';

import { useState, useMemo, useRef, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { Search, CheckCircle, Cpu, Building2, ChevronLeft, ChevronRight, BarChart3, MapPin, Zap } from 'lucide-react';
import EnterpriseCard from '@/components/annuaire/EnterpriseCard';
import EnterpriseFilters from '@/components/annuaire/EnterpriseFilters';
import { SECTORS, ENTERPRISES, searchEnterprises, type SearchFilters } from '@/lib/annuaire-data';
import { useI18n } from '@/lib/i18n/i18nContext';
import CompactHero from '@/components/services/CompactHero';

const ITEMS_PER_PAGE = 12;

export default function AnnuairePage() {
  const { tr } = useI18n();
  const [query, setQuery] = useState('');
  const [filters, setFilters] = useState<SearchFilters>({});
  const [page, setPage] = useState(1);
  const [activeSector, setActiveSector] = useState<string | undefined>();

  /* Scroll fade indicators for sector row */
  const scrollRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(false);

  const checkScroll = () => {
    const el = scrollRef.current;
    if (!el) return;
    setCanScrollLeft(el.scrollLeft > 8);
    setCanScrollRight(el.scrollLeft < el.scrollWidth - el.clientWidth - 8);
  };

  useEffect(() => {
    checkScroll();
    const el = scrollRef.current;
    if (el) el.addEventListener('scroll', checkScroll, { passive: true });
    window.addEventListener('resize', checkScroll);
    return () => {
      el?.removeEventListener('scroll', checkScroll);
      window.removeEventListener('resize', checkScroll);
    };
  }, []);

  const scrollBy = (dir: number) => {
    scrollRef.current?.scrollBy({ left: dir * 280, behavior: 'smooth' });
  };

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
      {/* ═══════ COMPACT HERO — no search bar ═══════ */}
      <CompactHero
        badge={`${totalEnterprises} ${tr('ann.listed')}`}
        badgeIcon={<Building2 size={14} className="text-emerald-400" />}
        title={<><span className="text-transparent bg-clip-text bg-linear-to-r from-emerald-400 to-emerald-200">{tr('ann.title1')}</span>{' '}{tr('ann.title2')}.</>}
        subtitle={tr('ann.subtitle')}
        backgroundClasses="bg-slate-900"
        overlays={<>
          <div className="absolute inset-0">
            <Image src="/images/hero-libreville.png" alt="Libreville" fill priority className="object-cover opacity-25" />
          </div>
          <div className="absolute inset-0 bg-linear-to-b from-slate-900/60 via-slate-900/80 to-slate-900" />
        </>}
        accentColor="#10b981"
        stats={[
          { value: totalEnterprises, label: tr('ann.listed'), icon: <Building2 size={18} className="text-emerald-400" /> },
          { value: SECTORS.length, label: 'Secteurs', icon: <BarChart3 size={18} className="text-emerald-400" /> },
          { value: '9', label: 'Provinces', icon: <MapPin size={18} className="text-emerald-400" /> },
          { value: totalTech, label: 'Tech', icon: <Zap size={18} className="text-emerald-400" /> },
        ]}
      >
        {/* Quick action pills only — search moved to filter bar */}
        <div className="flex flex-wrap items-center gap-2">
          <button
            onClick={() => { setActiveSector(undefined); setFilters({}); setQuery(''); setPage(1); }}
            className="px-4 py-2 text-xs font-semibold text-white rounded-xl bg-emerald-600 hover:bg-emerald-500 transition-all shadow-lg shadow-emerald-500/25 flex items-center gap-1.5 border-none cursor-pointer"
          >
            <Search size={13} /> {tr('ann.all')}
          </button>
          <Link href="/annuaire/ecosysteme-numerique" className="px-4 py-2 text-xs font-semibold text-white rounded-xl bg-white/10 hover:bg-white/20 backdrop-blur-md border border-white/10 transition-all flex items-center gap-1.5 no-underline">
            <Cpu size={13} /> {tr('ann.ecosystem')}
          </Link>
          <Link href="/annuaire/verifier" className="px-4 py-2 text-xs font-semibold text-white rounded-xl bg-white/10 hover:bg-white/20 backdrop-blur-md border border-white/10 transition-all flex items-center gap-1.5 no-underline">
            <CheckCircle size={13} /> {tr('ann.verify_link')}
          </Link>
        </div>
      </CompactHero>

      {/* ═══════ MAIN CONTENT ═══════ */}
      <div className="max-w-7xl mx-auto px-6 pt-8 pb-24">

        {/* ═══════ SECTOR CHIPS — scrollable row with fade indicators ═══════ */}
        <div className="mb-6">
          <div className="flex items-center justify-between mb-3">
            <h2 className="text-lg md:text-xl font-bold text-gray-900 dark:text-white m-0">
              {tr('ann.explore') || 'Explorez par secteur'}
            </h2>
            <span className="text-xs text-gray-400 dark:text-gray-500 hidden sm:block">
              {tr('ann.filter_desc') || 'Filtrez par secteur, province ou statut'}
            </span>
          </div>

          {/* Scroll container with fade edges + arrow buttons */}
          <div className="relative group">
            {/* Left fade + arrow */}
            {canScrollLeft && (
              <>
                <div className="absolute left-0 top-0 bottom-0 w-10 bg-linear-to-r from-white dark:from-gray-950 to-transparent z-10 pointer-events-none rounded-l-xl" />
                <button
                  onClick={() => scrollBy(-1)}
                  className="absolute left-0 top-1/2 -translate-y-1/2 z-20 w-7 h-7 rounded-full bg-white dark:bg-gray-800 shadow-md border border-gray-200 dark:border-gray-700 flex items-center justify-center cursor-pointer text-gray-500 hover:text-gray-900 dark:hover:text-white transition-all opacity-0 group-hover:opacity-100"
                >
                  <ChevronLeft size={14} />
                </button>
              </>
            )}

            {/* Right fade + arrow */}
            {canScrollRight && (
              <>
                <div className="absolute right-0 top-0 bottom-0 w-10 bg-linear-to-l from-white dark:from-gray-950 to-transparent z-10 pointer-events-none rounded-r-xl" />
                <button
                  onClick={() => scrollBy(1)}
                  className="absolute right-0 top-1/2 -translate-y-1/2 z-20 w-7 h-7 rounded-full bg-white dark:bg-gray-800 shadow-md border border-gray-200 dark:border-gray-700 flex items-center justify-center cursor-pointer text-gray-500 hover:text-gray-900 dark:hover:text-white transition-all opacity-0 group-hover:opacity-100"
                >
                  <ChevronRight size={14} />
                </button>
              </>
            )}

            {/* Scrollable row — hidden scrollbar */}
            <div
              ref={scrollRef}
              className="flex gap-2 overflow-x-auto pb-1"
              style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
            >
              <style>{`[data-sector-scroll]::-webkit-scrollbar { display: none; }`}</style>
              <button
                onClick={() => { setActiveSector(undefined); setPage(1); }}
                className={`shrink-0 inline-flex items-center gap-1.5 text-xs font-semibold px-3.5 py-2 rounded-xl border-none cursor-pointer transition-all duration-200 ${
                  !activeSector
                    ? 'text-white shadow-md bg-emerald-500'
                    : 'bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-700'
                }`}
              >
                {tr('ann.all_count') || 'Tous'} <span className={`text-[10px] px-1.5 py-0.5 rounded-full ${!activeSector ? 'bg-white/20 text-white' : 'bg-gray-200 dark:bg-gray-700 text-gray-500 dark:text-gray-400'}`}>{totalEnterprises}</span>
              </button>
              {SECTORS.map((s) => {
                const count = ENTERPRISES.filter(e => e.sector.id === s.id).length;
                return (
                  <button
                    key={s.id}
                    onClick={() => { setActiveSector(activeSector === s.slug ? undefined : s.slug); setPage(1); }}
                    className={`shrink-0 inline-flex items-center gap-1.5 text-xs font-semibold px-3.5 py-2 rounded-xl border-none cursor-pointer transition-all duration-200 ${
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

            {/* Dot indicators */}
            <div className="flex justify-center gap-1 mt-2">
              <span className={`w-1.5 h-1.5 rounded-full transition-colors ${canScrollLeft ? 'bg-gray-300 dark:bg-gray-600' : 'bg-emerald-500'}`} />
              <span className={`w-1.5 h-1.5 rounded-full transition-colors ${canScrollLeft && canScrollRight ? 'bg-emerald-500' : 'bg-gray-300 dark:bg-gray-600'}`} />
              <span className={`w-1.5 h-1.5 rounded-full transition-colors ${canScrollRight ? 'bg-gray-300 dark:bg-gray-600' : 'bg-emerald-500'}`} />
            </div>
          </div>
        </div>

        {/* ═══════ ADVANCED FILTERS + SEARCH — compact bar ═══════ */}
        <div className="bg-white/60 dark:bg-white/3 backdrop-blur-xl rounded-2xl border border-gray-200/50 dark:border-white/6 px-4 py-3 mb-8 shadow-sm">
          <EnterpriseFilters
            filters={filters}
            onChange={(f) => { setFilters(f); setPage(1); }}
            totalResults={results.length}
            query={query}
            onQueryChange={(q) => { setQuery(q); setPage(1); }}
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
            className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3 sm:gap-5"
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
        {totalPages > 1 && (() => {
          /* Smart page-number generation: 1 … (page-1) page (page+1) … last */
          const pages: (number | 'dots')[] = [];
          const addPage = (p: number) => { if (p >= 1 && p <= totalPages && !pages.includes(p)) pages.push(p); };
          addPage(1);
          if (page > 3) pages.push('dots');
          for (let i = page - 1; i <= page + 1; i++) addPage(i);
          if (page < totalPages - 2) pages.push('dots');
          addPage(totalPages);

          return (
            <div className="mt-12 flex flex-col items-center gap-4">
              {/* Page info */}
              <p className="text-xs text-gray-400 dark:text-gray-500 m-0">
                Page <span className="font-semibold text-gray-600 dark:text-gray-300">{page}</span> sur{' '}
                <span className="font-semibold text-gray-600 dark:text-gray-300">{totalPages}</span>
                {' '}— {results.length} résultats
              </p>

              <div className="flex items-center gap-1.5">
                {/* Prev */}
                <button
                  onClick={() => setPage((p) => Math.max(1, p - 1))}
                  disabled={page === 1}
                  className="flex items-center gap-1 px-3 py-2 rounded-xl text-sm font-medium
                    bg-white border-gray-200/70 hover:shadow-sm
                    dark:bg-gray-900/60 dark:border-gray-700/50 dark:hover:border-gray-600/60
                    border text-gray-600 dark:text-gray-400 disabled:opacity-30 cursor-pointer transition-all"
                >
                  <ChevronLeft size={15} /> {tr('ann.prev')}
                </button>

                {/* Page buttons with ellipsis */}
                {pages.map((p, i) =>
                  p === 'dots' ? (
                    <span key={`dots-${i}`} className="w-9 h-9 flex items-center justify-center text-gray-400 dark:text-gray-600 text-sm select-none">
                      …
                    </span>
                  ) : (
                    <button
                      key={p}
                      onClick={() => setPage(p)}
                      className={`w-9 h-9 rounded-xl text-sm font-semibold border cursor-pointer transition-all
                        ${page === p
                          ? 'bg-gray-900 text-white border-gray-900 dark:bg-white dark:text-gray-900 dark:border-white shadow-sm'
                          : 'bg-white border-gray-200/70 text-gray-600 hover:bg-gray-50 dark:bg-gray-900/60 dark:border-gray-700/50 dark:text-gray-400 dark:hover:bg-gray-800/60'
                        }`}
                    >
                      {p}
                    </button>
                  )
                )}

                {/* Next */}
                <button
                  onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
                  disabled={page === totalPages}
                  className="flex items-center gap-1 px-3 py-2 rounded-xl text-sm font-medium
                    bg-white border-gray-200/70 hover:shadow-sm
                    dark:bg-gray-900/60 dark:border-gray-700/50 dark:hover:border-gray-600/60
                    border text-gray-600 dark:text-gray-400 disabled:opacity-30 cursor-pointer transition-all"
                >
                  {tr('ann.next')} <ChevronRight size={15} />
                </button>
              </div>
            </div>
          );
        })()}
      </div>
    </div>
  );
}
