'use client';

import React, { useState, useRef, useEffect, useMemo } from 'react';
import { motion } from 'framer-motion';
import {
  Rocket,
  Search,
  Mail,
  Building2,
  TrendingUp,
  Banknote,
  Users,
  Code,
  Lightbulb,
  GraduationCap,
  Globe,
  Shield,
  Zap,
  Server,
  Headset,
  Palette,
  CheckCircle,
  ChevronLeft,
  ChevronRight,
  X,
} from 'lucide-react';
import ProgrammeCard from '@/components/incubateur/ProgrammeCard';
import StartupProfileCard from '@/components/incubateur/StartupProfileCard';
import ImpactDashboard from '@/components/incubateur/ImpactDashboard';
import {
  PROGRAMMES_REELS,
  PILIERS_SING,
  SUCCESS_STORIES,
  HERO_SING,
  MINILAB_SECTION,
  GABON_DIGITAL_SECTION,
  SING_300_SECTION,
  CTA_FINAL,
  SECTEUR_CONFIG,
} from '@/lib/mock/incubateur-data';
import { ALL_STARTUPS_SING } from '@/lib/mock/incubateur-startups';
import CompactHero from '@/components/services/CompactHero';
import type { SecteurNormalise } from '@/lib/mock/incubateur-types';



const PILIER_ICONS: Record<string, React.ElementType> = {
  Rocket,
  Banknote,
  Lightbulb,
  Code,
};

// ═══════ SECTION COMPONENTS ═══════

function HeroSection() {
  return (
    <CompactHero
      badge={HERO_SING.badge}
      badgeIcon={<Rocket size={14} />}
      title={<><span className="block">{HERO_SING.title}</span><span className="block text-white/85 text-xl md:text-2xl font-medium">{HERO_SING.titleAccent}</span></>}
      subtitle={HERO_SING.subtitle}
      backgroundClasses="bg-linear-to-br from-pink-600 via-rose-500 to-fuchsia-600 dark:from-pink-900 dark:via-rose-800 dark:to-fuchsia-900"
      overlays={<>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_50%,rgba(255,255,255,0.1),transparent_60%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_20%,rgba(255,255,255,0.08),transparent_50%)]" />
      </>}
      accentColor="#ec4899"
      ctaPrimary={{ label: 'Candidater maintenant', href: '/dashboard/incubateur/candidature' }}
      ctaSecondary={{ label: 'Explorer les programmes', href: '#programmes' }}
      stats={HERO_SING.stats.map(s => ({
        value: s.value + ((s as Record<string, string>).suffix || ''),
        label: s.label,
      }))}
    >
      {/* Partner marquee */}
      <div className="overflow-hidden mt-2">
        <p className="text-xs text-white/40 uppercase tracking-wider mb-2">Partenaires</p>
        <div className="flex gap-8 animate-marquee whitespace-nowrap">
          {[...HERO_SING.partners, ...HERO_SING.partners].map((p, i) => (
            <span key={i} className="text-sm text-white/50 font-semibold">{p}</span>
          ))}
        </div>
      </div>
    </CompactHero>
  );
}

function ProgrammesSection() {
  const [filter, setFilter] = useState<string>('all');
  const programmes = PROGRAMMES_REELS;
  const filtered =
    filter === 'all' ? programmes : programmes.filter((p) => p.pilier === filter);

  const scrollRef = useRef<HTMLDivElement>(null);
  const [activeDot, setActiveDot] = useState(0);

  // Number of "pages" for dots: ceil(columns / visible columns)
  // Each column = 2 cards stacked. Total columns = ceil(filtered.length / 2)
  const totalCols = Math.ceil(filtered.length / 2);
  // Visible cols depends on viewport — we'll compute from scroll position
  const computeDots = () => {
    const el = scrollRef.current;
    if (!el) return;
    const maxScroll = el.scrollWidth - el.clientWidth;
    if (maxScroll <= 0) { setActiveDot(0); return; }
    const ratio = el.scrollLeft / maxScroll;
    const totalDots = Math.max(1, Math.ceil(totalCols / 2)); // rough
    setActiveDot(Math.min(Math.round(ratio * (totalDots - 1)), totalDots - 1));
  };

  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;
    el.addEventListener('scroll', computeDots, { passive: true });
    // Initial compute via rAF to avoid synchronous setState in effect
    const raf = requestAnimationFrame(computeDots);
    return () => { el.removeEventListener('scroll', computeDots); cancelAnimationFrame(raf); };
  });

  const totalDots = Math.max(1, Math.ceil(totalCols / 2));

  const scrollByPage = (dir: number) => {
    const el = scrollRef.current;
    if (!el) return;
    // Scroll by roughly 2 columns worth
    const colWidth = el.scrollWidth / totalCols;
    el.scrollBy({ left: dir * colWidth * 2, behavior: 'smooth' });
  };

  return (
    <section id="programmes" className="py-20 bg-gray-100 dark:bg-gray-900/50">
      <div className="max-w-7xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-10"
        >
          <span className="text-xs font-bold text-pink-500 uppercase tracking-wider">
            Programmes
          </span>
          <h2 className="text-3xl md:text-4xl font-black text-gray-900 dark:text-white mt-2">
            17 Programmes d&apos;Incubation
          </h2>
          <p className="text-gray-600 dark:text-gray-400 mt-2 max-w-2xl mx-auto">
            De l&apos;idéation au scaling, chaque programme est conçu pour une étape clé de votre
            parcours entrepreneurial.
          </p>
        </motion.div>

        {/* Pilier filter chips */}
        <div className="flex flex-wrap justify-center gap-2 mb-6">
          {['all', 'Pivot 4.0', 'Partenaire', 'SING Conseil'].map((s) => (
            <button
              key={s}
              onClick={() => setFilter(s)}
              className={`text-xs font-semibold px-4 py-2 rounded-full transition-all border-none cursor-pointer ${filter === s ? 'bg-pink-500 text-white' : 'bg-white dark:bg-white/5 text-gray-600 dark:text-gray-400 border border-gray-200 dark:border-white/10 hover:bg-pink-50 dark:hover:bg-pink-500/10'}`}
            >
              {s === 'all' ? `Tous (${programmes.length})` : s}
            </button>
          ))}
        </div>

        {/* Horizontal 2-row carousel */}
        <div className="relative group">
          {/* Left/Right nav arrows (desktop hover) */}
          <button
            onClick={() => scrollByPage(-1)}
            className="absolute left-0 top-1/2 -translate-y-1/2 z-20 w-8 h-8 rounded-full bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 items-center justify-center cursor-pointer text-gray-500 hover:text-gray-900 dark:hover:text-white transition-all opacity-0 group-hover:opacity-100 hidden md:flex"
          >
            <ChevronLeft size={16} />
          </button>
          <button
            onClick={() => scrollByPage(1)}
            className="absolute right-0 top-1/2 -translate-y-1/2 z-20 w-8 h-8 rounded-full bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 items-center justify-center cursor-pointer text-gray-500 hover:text-gray-900 dark:hover:text-white transition-all opacity-0 group-hover:opacity-100 hidden md:flex"
          >
            <ChevronRight size={16} />
          </button>

          {/* Fade edges */}
          <div className="absolute left-0 top-0 bottom-0 w-6 bg-linear-to-r from-gray-50 dark:from-gray-900/50 to-transparent z-10 pointer-events-none" />
          <div className="absolute right-0 top-0 bottom-0 w-6 bg-linear-to-l from-gray-50 dark:from-gray-900/50 to-transparent z-10 pointer-events-none" />

          {/* Scrollable grid: 2 rows, auto-flow column */}
          <div
            ref={scrollRef}
            className="grid grid-rows-2 grid-flow-col gap-3 sm:gap-4 overflow-x-auto pb-2"
            style={{
              scrollbarWidth: 'none',
              msOverflowStyle: 'none',
              gridAutoColumns: 'calc(50% - 6px)',
            }}
          >
            <style>{`[data-prog-scroll]::-webkit-scrollbar { display: none; }`}</style>
            {filtered.map((p, i) => (
              <div key={p.id} className="min-w-0" style={{ gridAutoColumns: undefined }}>
                <ProgrammeCard programme={p} index={i} />
              </div>
            ))}
          </div>
        </div>

        {/* Dot indicators */}
        <div className="flex justify-center gap-1.5 mt-4">
          {Array.from({ length: totalDots }).map((_, i) => (
            <button
              key={i}
              onClick={() => {
                const el = scrollRef.current;
                if (!el) return;
                const maxScroll = el.scrollWidth - el.clientWidth;
                el.scrollTo({ left: (i / Math.max(1, totalDots - 1)) * maxScroll, behavior: 'smooth' });
              }}
              className={`w-2 h-2 rounded-full transition-all border-none cursor-pointer ${i === activeDot ? 'bg-pink-500 scale-125' : 'bg-gray-300 dark:bg-gray-600'}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

const ITEMS_PER_PAGE_PORTFOLIO = 12;

function PortfolioSection() {
  const [sectorFilter, setSectorFilter] = useState('all');
  const [tierFilter, setTierFilter] = useState<string>('all');
  const [query, setQuery] = useState('');
  const [page, setPage] = useState(1);

  // Build sector options from SECTEUR_CONFIG
  const sectorOptions = useMemo(() => {
    return Object.entries(SECTEUR_CONFIG).map(([key, conf]) => ({
      value: key,
      label: conf.label,
      count: ALL_STARTUPS_SING.filter(s => s.secteur === key).length,
    })).filter(o => o.count > 0).sort((a, b) => b.count - a.count);
  }, []);

  // Filter results
  const filtered = useMemo(() => {
    let results = ALL_STARTUPS_SING;
    if (sectorFilter !== 'all') results = results.filter(s => s.secteur === sectorFilter);
    if (tierFilter === 'TOP') results = results.filter(s => s.tier === 'TOP');
    else if (tierFilter === 'ACTIVE') results = results.filter(s => s.actif);
    else if (tierFilter === 'MATURE') results = results.filter(s => s.maturite === 'M');
    if (query.trim()) {
      const q = query.toLowerCase();
      results = results.filter(s =>
        s.nom.toLowerCase().includes(q) ||
        s.programmeRaw.toLowerCase().includes(q) ||
        s.secteurRaw.toLowerCase().includes(q)
      );
    }
    return results;
  }, [sectorFilter, tierFilter, query]);

  const totalPages = Math.ceil(filtered.length / ITEMS_PER_PAGE_PORTFOLIO);
  const pageResults = filtered.slice((page - 1) * ITEMS_PER_PAGE_PORTFOLIO, page * ITEMS_PER_PAGE_PORTFOLIO);

  const hasFilters = sectorFilter !== 'all' || tierFilter !== 'all' || !!query;

  const resetAll = () => {
    setSectorFilter('all');
    setTierFilter('all');
    setQuery('');
    setPage(1);
  };

  // Smart pagination pages
  const paginationPages = useMemo(() => {
    const pages: (number | 'dots')[] = [];
    const addPage = (p: number) => { if (p >= 1 && p <= totalPages && !pages.includes(p)) pages.push(p); };
    addPage(1);
    if (page > 3) pages.push('dots');
    for (let i = page - 1; i <= page + 1; i++) addPage(i);
    if (page < totalPages - 2) pages.push('dots');
    addPage(totalPages);
    return pages;
  }, [page, totalPages]);

  return (
    <section className="py-20">
      <div className="max-w-7xl mx-auto px-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-8"
        >
          <span className="text-xs font-bold text-pink-500 uppercase tracking-wider">
            Portfolio
          </span>
          <h2 className="text-3xl md:text-4xl font-black text-gray-900 dark:text-white mt-2">
            {ALL_STARTUPS_SING.length} Startups Propulsées par la SING
          </h2>
          <p className="text-gray-600 dark:text-gray-400 mt-2 max-w-2xl mx-auto">
            Explorez le portfolio de l&apos;écosystème tech gabonais le plus dynamique
            d&apos;Afrique centrale.
          </p>
        </motion.div>

        {/* ═══ Search + Filters Bar ═══ */}
        <div className="bg-white/60 dark:bg-white/3 backdrop-blur-xl rounded-2xl border border-gray-200/50 dark:border-white/6 px-4 py-3 mb-6">
          <div className="flex items-center gap-2 flex-wrap">
            {/* Search input */}
            <div className="relative flex-1 min-w-[160px] max-w-sm">
              <Search size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 dark:text-gray-500 pointer-events-none" />
              <input
                type="text"
                value={query}
                onChange={(e) => { setQuery(e.target.value); setPage(1); }}
                placeholder="Rechercher une startup..."
                className="w-full bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-xl text-xs text-gray-700 dark:text-gray-300 placeholder:text-gray-400 dark:placeholder:text-gray-500 pl-9 pr-8 py-2 focus:outline-none focus:ring-2 focus:ring-pink-500/30 focus:border-pink-400/50 transition-all"
              />
              {query && (
                <button
                  onClick={() => { setQuery(''); setPage(1); }}
                  className="absolute right-2.5 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 bg-transparent border-none cursor-pointer p-0 flex"
                >
                  <X size={13} />
                </button>
              )}
            </div>

            {/* Sector dropdown */}
            <div className="relative">
              <select
                value={sectorFilter}
                onChange={(e) => { setSectorFilter(e.target.value); setPage(1); }}
                className={`appearance-none text-xs font-medium pl-3 pr-8 py-2 rounded-xl border cursor-pointer transition-all duration-200 outline-none
                  ${sectorFilter !== 'all'
                    ? 'bg-pink-500 text-white border-transparent'
                    : 'bg-white dark:bg-gray-900 border-gray-200 dark:border-gray-700 text-gray-600 dark:text-gray-400 hover:border-gray-300 dark:hover:border-gray-600'
                  }`}
              >
                <option value="all">Tous les secteurs</option>
                {sectorOptions.map((o) => (
                  <option key={o.value} value={o.value}>{o.label} ({o.count})</option>
                ))}
              </select>
              <ChevronRight
                size={13}
                className={`absolute right-2.5 top-1/2 -translate-y-1/2 pointer-events-none rotate-90 ${sectorFilter !== 'all' ? 'text-white/70' : 'text-gray-400 dark:text-gray-500'}`}
              />
            </div>

            {/* Separator */}
            <div className="hidden sm:block w-px h-5 bg-gray-200 dark:bg-gray-700 mx-0.5" />

            {/* Tier chips */}
            <div className="flex items-center gap-1.5">
              {[
                { label: 'Tous', value: 'all', color: '#6b7280' },
                { label: '⭐ Top', value: 'TOP', color: '#f59e0b' },
                { label: 'Actif', value: 'ACTIVE', color: '#10b981' },
                { label: 'Mature', value: 'MATURE', color: '#3b82f6' },
              ].map((chip) => (
                <button
                  key={chip.value}
                  onClick={() => { setTierFilter(chip.value); setPage(1); }}
                  className={`inline-flex items-center gap-1 text-xs font-medium px-2.5 py-1.5 rounded-lg border-none cursor-pointer transition-all duration-200 whitespace-nowrap ${
                    tierFilter === chip.value
                      ? 'text-white'
                      : 'bg-gray-100 dark:bg-gray-800 text-gray-500 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-700'
                  }`}
                  style={tierFilter === chip.value ? { background: chip.color } : undefined}
                >
                  {chip.label}
                </button>
              ))}
            </div>
          </div>

          {/* Active filter tags + result count */}
          {hasFilters && (
            <div className="flex items-center justify-between pt-2 mt-2 border-t border-gray-200/50 dark:border-white/6">
              <div className="flex items-center gap-1.5 flex-wrap">
                {query && (
                  <span className="inline-flex items-center gap-1 text-[11px] font-medium px-2 py-1 rounded-lg bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300">
                    🔍 &ldquo;{query}&rdquo;
                    <button onClick={() => { setQuery(''); setPage(1); }} className="bg-transparent border-none cursor-pointer text-gray-400 hover:text-gray-600 p-0 flex"><X size={11} /></button>
                  </span>
                )}
                {sectorFilter !== 'all' && (
                  <span className="inline-flex items-center gap-1 text-[11px] font-medium px-2 py-1 rounded-lg bg-pink-50 dark:bg-pink-900/20 text-pink-700 dark:text-pink-400">
                    {SECTEUR_CONFIG[sectorFilter as SecteurNormalise]?.label}
                    <button onClick={() => { setSectorFilter('all'); setPage(1); }} className="bg-transparent border-none cursor-pointer text-pink-400 hover:text-pink-600 p-0 flex"><X size={11} /></button>
                  </span>
                )}
                {tierFilter !== 'all' && (
                  <span className="inline-flex items-center gap-1 text-[11px] font-medium px-2 py-1 rounded-lg bg-amber-50 dark:bg-amber-900/20 text-amber-700 dark:text-amber-400">
                    {tierFilter === 'TOP' ? '⭐ Top' : tierFilter === 'ACTIVE' ? 'Actif' : 'Mature'}
                    <button onClick={() => { setTierFilter('all'); setPage(1); }} className="bg-transparent border-none cursor-pointer text-amber-400 hover:text-amber-600 p-0 flex"><X size={11} /></button>
                  </span>
                )}
                <button
                  onClick={resetAll}
                  className="flex items-center gap-1 text-[11px] font-medium text-red-500 hover:text-red-600 bg-transparent border-none cursor-pointer transition-colors p-0 ml-1"
                >
                  <X size={12} /> Réinitialiser
                </button>
              </div>
              <span className="text-xs text-gray-500 dark:text-gray-400 whitespace-nowrap">
                <strong className="text-gray-900 dark:text-white">{filtered.length}</strong> startups
              </span>
            </div>
          )}
        </div>

        {/* Result count (when no active filters) */}
        {!hasFilters && (
          <div className="flex items-end justify-between mb-4">
            <p className="text-sm text-gray-500 dark:text-gray-400 m-0">
              <strong className="text-gray-900 dark:text-white">{filtered.length}</strong> startups
            </p>
            {totalPages > 1 && (
              <span className="text-xs text-gray-400 dark:text-gray-500 hidden md:block">
                {(page - 1) * ITEMS_PER_PAGE_PORTFOLIO + 1}–{Math.min(page * ITEMS_PER_PAGE_PORTFOLIO, filtered.length)} / {filtered.length}
              </span>
            )}
          </div>
        )}

        {/* ═══ Grid ═══ */}
        {pageResults.length > 0 ? (
          <div className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3 sm:gap-4">
            {pageResults.map((s, i) => (
              <StartupProfileCard key={s.id} startup={s} index={i} />
            ))}
          </div>
        ) : (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center py-20 bg-white/60 dark:bg-white/2 backdrop-blur-xl rounded-3xl border border-gray-200/50 dark:border-white/6"
          >
            <Search size={40} className="mx-auto mb-4 text-gray-300 dark:text-gray-700" />
            <p className="text-lg font-semibold text-gray-500 dark:text-gray-400">Aucun résultat</p>
            <p className="text-sm text-gray-400 dark:text-gray-500 mt-1">Essayez d&apos;ajuster vos filtres de recherche</p>
          </motion.div>
        )}

        {/* ═══ Smart Pagination ═══ */}
        {totalPages > 1 && (
          <div className="mt-10 flex flex-col items-center gap-3">
            <p className="text-xs text-gray-400 dark:text-gray-500 m-0">
              Page <span className="font-semibold text-gray-600 dark:text-gray-300">{page}</span> sur{' '}
              <span className="font-semibold text-gray-600 dark:text-gray-300">{totalPages}</span>
              {' '}— {filtered.length} résultats
            </p>
            <div className="flex items-center gap-1.5">
              <button
                onClick={() => setPage((p) => Math.max(1, p - 1))}
                disabled={page === 1}
                className="flex items-center gap-1 px-3 py-2 rounded-xl text-sm font-medium
                  bg-white border-gray-200/70
                  dark:bg-gray-900/60 dark:border-gray-700/50 dark:hover:border-gray-600/60
                  border text-gray-600 dark:text-gray-400 disabled:opacity-30 cursor-pointer transition-all"
              >
                <ChevronLeft size={15} /> Préc.
              </button>
              {paginationPages.map((p, i) =>
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
                        ? 'bg-pink-500 text-white border-pink-500'
                        : 'bg-white border-gray-200/70 text-gray-600 hover:bg-gray-100 dark:bg-gray-900/60 dark:border-gray-700/50 dark:text-gray-400 dark:hover:bg-gray-800/60'
                      }`}
                  >
                    {p}
                  </button>
                )
              )}
              <button
                onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
                disabled={page === totalPages}
                className="flex items-center gap-1 px-3 py-2 rounded-xl text-sm font-medium
                  bg-white border-gray-200/70
                  dark:bg-gray-900/60 dark:border-gray-700/50 dark:hover:border-gray-600/60
                  border text-gray-600 dark:text-gray-400 disabled:opacity-30 cursor-pointer transition-all"
              >
                Suiv. <ChevronRight size={15} />
              </button>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}

function SuccessStoriesSection() {
  const [active, setActive] = useState(0);
  const story = SUCCESS_STORIES[active];
  return (
    <section className="py-10 sm:py-20 bg-gray-100 dark:bg-gray-900/50">
      <div className="max-w-5xl mx-auto px-4 sm:px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-4 sm:mb-10"
        >
          <span className="text-[10px] sm:text-xs font-bold text-pink-500 uppercase tracking-wider">
            Success Stories
          </span>
          <h2 className="text-xl sm:text-3xl md:text-4xl font-black text-gray-900 dark:text-white mt-1 sm:mt-2">
            Ils ont réussi avec la SING
          </h2>
        </motion.div>
        <motion.div
          key={active}
          initial={{ opacity: 0, x: 30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ type: 'spring', stiffness: 100 }}
          className={`relative rounded-2xl sm:rounded-3xl p-4 sm:p-8 md:p-12 bg-linear-to-br ${story.gradient} text-white overflow-hidden`}
        >
          <div className="absolute inset-0 bg-black/10" />
          <div className="relative z-10">
            <div className="flex items-center gap-2 sm:gap-3 mb-3 sm:mb-6">
              <div className="w-10 h-10 sm:w-14 sm:h-14 rounded-xl sm:rounded-2xl bg-white/20 flex items-center justify-center text-lg sm:text-2xl font-black">
                {story.startup[0]}
              </div>
              <div>
                <h3 className="text-sm sm:text-xl font-bold">{story.startup}</h3>
                <p className="text-[10px] sm:text-sm text-white/70">
                  {story.programme} · {story.year}
                </p>
              </div>
            </div>
            <blockquote className="text-xs sm:text-lg md:text-xl font-medium italic mb-4 sm:mb-8 leading-relaxed line-clamp-3 sm:line-clamp-none">
              &ldquo;{story.quote}&rdquo;
            </blockquote>
            <div className="grid grid-cols-3 gap-2 sm:gap-4">
              {story.metrics.map((m) => (
                <div
                  key={m.label}
                  className="bg-white/10 backdrop-blur-sm rounded-lg sm:rounded-xl p-2 sm:p-4 text-center"
                >
                  <div className="text-sm sm:text-xl md:text-2xl font-black">{m.value}</div>
                  <div className="text-[9px] sm:text-xs text-white/70 mt-0.5 sm:mt-1">{m.label}</div>
                </div>
              ))}
            </div>
          </div>
        </motion.div>
        <div className="flex justify-center gap-2 sm:gap-3 mt-4 sm:mt-6">
          {SUCCESS_STORIES.map((_, i) => (
            <button
              key={i}
              onClick={() => setActive(i)}
              className={`w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full transition-all ${i === active ? 'bg-pink-500 scale-125' : 'bg-gray-300 dark:bg-gray-600'}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

function PiliersSection() {
  return (
    <section className="py-20">
      <div className="max-w-7xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <span className="text-xs font-bold text-pink-500 uppercase tracking-wider">
            Architecture
          </span>
          <h2 className="text-3xl md:text-4xl font-black text-gray-900 dark:text-white mt-2">
            Les 4 Piliers de la SING
          </h2>
        </motion.div>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-5">
          {PILIERS_SING.map((p, i) => {
            const Icon = PILIER_ICONS[p.iconName] || Rocket;
            return (
              <motion.div
                key={p.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="bg-white dark:bg-white/5 rounded-xl sm:rounded-2xl border border-gray-200/60 dark:border-white/8 p-3 sm:p-6 transition-all hover:-translate-y-1 group"
              >
                {/* Icon + Title inline */}
                <div className="flex items-center gap-2 sm:gap-3 mb-2 sm:mb-3">
                  <div
                    className="w-8 h-8 sm:w-10 sm:h-10 rounded-lg sm:rounded-xl flex items-center justify-center text-white shrink-0"
                    style={{ background: p.color }}
                  >
                    <Icon size={16} className="sm:hidden" />
                    <Icon size={20} className="hidden sm:block" />
                  </div>
                  <div className="min-w-0">
                    <h3 className="text-sm sm:text-lg font-bold text-gray-900 dark:text-white leading-tight truncate">{p.name}</h3>
                    <p className="text-[10px] sm:text-xs text-gray-500 dark:text-gray-400 truncate">{p.subtitle}</p>
                  </div>
                </div>

                {/* Description — hidden on mobile, visible on sm+ */}
                <p className="hidden sm:block text-sm text-gray-600 dark:text-gray-400 mb-4 line-clamp-3">
                  {p.description}
                </p>

                {/* Compact stats */}
                <div className="space-y-1 sm:space-y-2 mb-2 sm:mb-4">
                  {p.stats.map((s) => (
                    <div key={s.label} className="flex justify-between text-[10px] sm:text-xs">
                      <span className="text-gray-500 dark:text-gray-400 truncate mr-1">{s.label}</span>
                      <span className="font-bold text-gray-900 dark:text-white shrink-0">{s.value}</span>
                    </div>
                  ))}
                </div>

                {/* Tags */}
                <div className="flex flex-wrap gap-1">
                  {p.programmes.slice(0, 3).map((pr) => (
                    <span
                      key={pr}
                      className="text-[8px] sm:text-[10px] font-medium px-1 sm:px-1.5 py-0.5 rounded truncate max-w-full"
                      style={{ background: `${p.color}15`, color: p.color }}
                    >
                      {pr}
                    </span>
                  ))}
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

function MinilabSection() {
  const ml = MINILAB_SECTION;
  const FEATURE_ICONS: Record<string, React.ElementType> = { Headset, Code, Palette, Globe };
  return (
    <section className="py-20 bg-gray-100 dark:bg-gray-900/50">
      <div className="max-w-6xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-10"
        >
          <span className="inline-flex items-center gap-1.5 text-[10px] font-bold px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-500 mb-3">
            {ml.badge}
          </span>
          <h2 className="text-3xl md:text-4xl font-black text-gray-900 dark:text-white">
            {ml.title}
          </h2>
          <p className="text-gray-600 dark:text-gray-400 mt-2 max-w-xl mx-auto">{ml.subtitle}</p>
        </motion.div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          {ml.features.map((f, i) => {
            const Icon = FEATURE_ICONS[f.iconName] || Code;
            return (
              <motion.div
                key={f.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="bg-white dark:bg-white/5 rounded-xl p-5 border border-gray-200/60 dark:border-white/8 text-center"
              >
                <div className="w-10 h-10 rounded-xl bg-emerald-500/10 flex items-center justify-center mx-auto mb-3">
                  <Icon size={18} className="text-emerald-500" />
                </div>
                <h4 className="text-sm font-bold text-gray-900 dark:text-white mb-1">{f.name}</h4>
                <p className="text-xs text-gray-500 dark:text-gray-400">{f.desc}</p>
              </motion.div>
            );
          })}
        </div>
        <div className="grid md:grid-cols-3 gap-4">
          {ml.establishments.map((e) => (
            <div
              key={e.name}
              className="bg-white dark:bg-white/5 rounded-xl p-4 border border-gray-200/60 dark:border-white/8 flex items-center gap-3"
            >
              <div className="w-8 h-8 rounded-lg bg-emerald-500/10 flex items-center justify-center">
                <GraduationCap size={14} className="text-emerald-500" />
              </div>
              <div>
                <p className="text-sm font-semibold text-gray-900 dark:text-white">{e.name}</p>
                <p className="text-xs text-gray-500">
                  {e.city} · {e.status}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function GabonDigitalSection() {
  const gd = GABON_DIGITAL_SECTION;
  const ICONS: Record<string, React.ElementType> = { Globe, TrendingUp, Server, Users };
  return (
    <section className="py-20">
      <div className="max-w-6xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-10"
        >
          <span className="inline-flex items-center gap-1.5 text-[10px] font-bold px-3 py-1 rounded-full bg-blue-500/10 text-blue-500 mb-3">
            {gd.badge}
          </span>
          <h2 className="text-3xl md:text-4xl font-black text-gray-900 dark:text-white">
            {gd.title}
          </h2>
          <p className="text-gray-600 dark:text-gray-400 mt-2 max-w-xl mx-auto">{gd.subtitle}</p>
        </motion.div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          {gd.keyFigures.map((f, i) => {
            const Icon = ICONS[f.iconName] || Globe;
            return (
              <motion.div
                key={f.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="bg-blue-50 dark:bg-blue-500/5 rounded-xl p-5 border border-blue-100 dark:border-blue-500/10 text-center"
              >
                <Icon size={20} className="text-blue-500 mx-auto mb-2" />
                <div className="text-xl font-black text-gray-900 dark:text-white">
                  {f.value}
                  <span className="text-sm text-gray-500 ml-1">{f.suffix || ''}</span>
                </div>
                <div className="text-xs text-gray-500 dark:text-gray-400 mt-1">{f.label}</div>
              </motion.div>
            );
          })}
        </div>
        <div className="bg-white dark:bg-white/5 rounded-2xl border border-gray-200/60 dark:border-white/8 p-6">
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <h4 className="text-sm font-bold text-gray-900 dark:text-white mb-3">
                Piliers du mégaprojet
              </h4>
              <ul className="space-y-2">
                {gd.pillars.map((p) => (
                  <li
                    key={p}
                    className="flex items-start gap-2 text-sm text-gray-600 dark:text-gray-400"
                  >
                    <CheckCircle size={14} className="text-blue-500 mt-0.5 shrink-0" />
                    {p}
                  </li>
                ))}
              </ul>
            </div>
            <div className="bg-blue-50 dark:bg-blue-500/5 rounded-xl p-5 flex items-center">
              <p className="text-sm text-gray-700 dark:text-gray-300 leading-relaxed">
                {gd.singRole}
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function Sing300Section() {
  const s3 = SING_300_SECTION;
  const ICONS: Record<string, React.ElementType> = { Shield, Building2, Zap, Globe };
  return (
    <section className="py-20 bg-gray-100 dark:bg-gray-900/50">
      <div className="max-w-6xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-10"
        >
          <h2 className="text-3xl md:text-4xl font-black text-gray-900 dark:text-white">
            {s3.title}
          </h2>
          <p className="text-gray-600 dark:text-gray-400 mt-2 max-w-xl mx-auto">{s3.subtitle}</p>
        </motion.div>
        <div className="grid grid-cols-2 gap-3 sm:gap-5">
          {s3.axes.map((a, i) => {
            const Icon = ICONS[a.iconName] || Shield;
            return (
              <motion.div
                key={a.number}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="bg-white dark:bg-white/5 rounded-xl sm:rounded-2xl border border-gray-200/60 dark:border-white/8 p-3 sm:p-6"
              >
                {/* Icon + Axe label */}
                <div className="flex items-center gap-2 sm:gap-3 mb-2 sm:mb-3">
                  <div className="w-7 h-7 sm:w-10 sm:h-10 rounded-lg sm:rounded-xl bg-pink-500/10 flex items-center justify-center shrink-0">
                    <Icon size={14} className="text-pink-500 sm:hidden" />
                    <Icon size={18} className="text-pink-500 hidden sm:block" />
                  </div>
                  <h3 className="text-xs sm:text-sm font-bold text-gray-900 dark:text-white leading-tight">
                    Axe {a.number} — {a.title}
                  </h3>
                </div>
                <p className="text-[10px] sm:text-xs text-gray-500 dark:text-gray-400 mb-2 sm:mb-3 line-clamp-3">{a.description}</p>
                <div className="flex items-center gap-2 sm:gap-3">
                  <div className="flex-1 h-1.5 sm:h-2 bg-gray-100 dark:bg-white/8 rounded-full overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      whileInView={{ width: `${a.progress}%` }}
                      viewport={{ once: true }}
                      transition={{ duration: 1.5, delay: 0.3 }}
                      className="h-full rounded-full bg-pink-500"
                    />
                  </div>
                  <span className="text-[10px] sm:text-xs font-bold text-pink-500 shrink-0">{a.progress}%</span>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

function ImpactSection() {
  return (
    <section className="py-20">
      <div className="max-w-7xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-10"
        >
          <span className="text-xs font-bold text-pink-500 uppercase tracking-wider">Impact</span>
          <h2 className="text-3xl md:text-4xl font-black text-gray-900 dark:text-white mt-2">
            L&apos;Impact SING en Temps Réel
          </h2>
        </motion.div>
        <ImpactDashboard />
      </div>
    </section>
  );
}


function CTASection() {
  return (
    <section className="py-10 sm:py-20 bg-linear-to-br from-pink-600 via-rose-500 to-fuchsia-600">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <h2 className="text-xl sm:text-3xl md:text-4xl font-black text-white mb-2 sm:mb-4">{CTA_FINAL.title}</h2>
          <p className="text-sm sm:text-lg text-white/80 mb-4 sm:mb-8">{CTA_FINAL.subtitle}</p>
          <div className="flex flex-wrap justify-center gap-2 sm:gap-4">
            <a
              href="/dashboard/incubateur/candidature"
              className="inline-flex items-center gap-2 px-4 sm:px-8 py-2.5 sm:py-4 bg-white text-pink-600 font-bold rounded-xl sm:rounded-2xl hover:bg-white/90 transition-all text-sm sm:text-base"
            >
              <Rocket size={16} /> Candidater
            </a>
            <a
              href="/dashboard/incubateur/startups"
              className="inline-flex items-center gap-2 px-4 sm:px-8 py-2.5 sm:py-4 bg-white/10 backdrop-blur-sm border border-white/20 text-white font-semibold rounded-xl sm:rounded-2xl hover:bg-white/20 transition-all text-sm sm:text-base"
            >
              <Search size={16} /> Portfolio
            </a>
            <a
              href="mailto:contact@sing.ga"
              className="inline-flex items-center gap-2 px-4 sm:px-8 py-2.5 sm:py-4 bg-white/10 backdrop-blur-sm border border-white/20 text-white font-semibold rounded-xl sm:rounded-2xl hover:bg-white/20 transition-all text-sm sm:text-base"
            >
              <Mail size={16} /> Contact
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

// ═══════ MAIN PAGE ═══════

export default function IncubateurContent() {
  return (
    <>
      <HeroSection />
      <ProgrammesSection />
      <PortfolioSection />
      <SuccessStoriesSection />
      <PiliersSection />
      <MinilabSection />
      <GabonDigitalSection />
      <Sing300Section />
      <ImpactSection />
      <CTASection />
    </>
  );
}
