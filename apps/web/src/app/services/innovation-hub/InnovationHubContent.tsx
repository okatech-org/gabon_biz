'use client';

import React, { useState, useEffect, useRef, useCallback } from 'react';

import Link from 'next/link';
import {
  Grid3x3, Rocket, Trophy, Brain, Star, MessageSquare,
  MessageCircle, GitCompareArrows, Wallet, HeartPulse, Sprout,
  GraduationCap, Truck, Building2, Leaf, Shield, ShoppingCart, Lock,
  ArrowRight, ChevronLeft, ChevronRight, Lightbulb, Search, X, SlidersHorizontal,
} from 'lucide-react';
import SolutionCard from '@/components/innovation/SolutionCard';
import DefiCard from '@/components/innovation/DefiCard';
import { ServiceTimeline } from '@/components/services/ServiceTimeline';

import {
  SOLUTIONS_KIMBA, DEFIS_KIMBA, STARTUPS_VEDETTES,
  ECOSYSTEME_STATS, CATEGORIES_CONFIG,
  type SolutionCategorie,
} from '@/lib/mock/innovation-data';

import CompactHero from '@/components/services/CompactHero';

const accentColor = '#8b5cf6';

const CATEGORY_ICONS: Record<string, React.ElementType> = {
  FinTech: Wallet, HealthTech: HeartPulse, AgriTech: Sprout,
  EdTech: GraduationCap, LogisTech: Truck, GovTech: Building2,
  GreenTech: Leaf, AssurTech: Shield, 'e-Commerce': ShoppingCart,
  'Cybersécurité': Lock,
};

// ─── CountUp Component ──────────────────────────────────────────────

function CountUp({ end, suffix = '', prefix = '', duration = 2000 }: { end: number; suffix?: string; prefix?: string; duration?: number }) {
  const [value, setValue] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const hasAnimated = useRef(false);

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting && !hasAnimated.current) {
        hasAnimated.current = true;
        const start = performance.now();
        const animate = (now: number) => {
          const progress = Math.min((now - start) / duration, 1);
          const eased = 1 - Math.pow(1 - progress, 3);
          setValue(Number((eased * end).toFixed(end < 10 ? 1 : 0)));
          if (progress < 1) requestAnimationFrame(animate);
        };
        requestAnimationFrame(animate);
      }
    }, { threshold: 0.3 });
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [end, duration]);

  return <span ref={ref}>{prefix}{value}{suffix}</span>;
}

// ─── Main Component ─────────────────────────────────────────────────

export default function InnovationHubContent() {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeFilter, setActiveFilter] = useState<SolutionCategorie | 'all'>('all');
  const [carouselIdx, setCarouselIdx] = useState(0);
  const [page, setPage] = useState(1);
  const ITEMS_PER_PAGE = 8;

  /* ── Scroll fade indicators for category row ── */
  const catScrollRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(false);

  const checkCatScroll = useCallback(() => {
    const el = catScrollRef.current;
    if (!el) return;
    setCanScrollLeft(el.scrollLeft > 8);
    setCanScrollRight(el.scrollLeft < el.scrollWidth - el.clientWidth - 8);
  }, []);

  useEffect(() => {
    checkCatScroll();
    const el = catScrollRef.current;
    if (el) el.addEventListener('scroll', checkCatScroll, { passive: true });
    window.addEventListener('resize', checkCatScroll);
    return () => {
      el?.removeEventListener('scroll', checkCatScroll);
      window.removeEventListener('resize', checkCatScroll);
    };
  }, [checkCatScroll]);

  const scrollCatBy = (dir: number) => {
    catScrollRef.current?.scrollBy({ left: dir * 280, behavior: 'smooth' });
  };


  // Auto-advance carousel
  useEffect(() => {
    const timer = setInterval(() => {
      setCarouselIdx(prev => (prev + 1) % STARTUPS_VEDETTES.length);
    }, 6000);
    return () => clearInterval(timer);
  }, []);

  // Filtered solutions for public catalogue
  const categoryFiltered = activeFilter === 'all'
    ? SOLUTIONS_KIMBA
    : SOLUTIONS_KIMBA.filter(s => s.categorie === activeFilter);

  const filteredSolutions = searchQuery
    ? categoryFiltered.filter(s =>
        s.nom.toLowerCase().includes(searchQuery.toLowerCase()) ||
        s.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        s.startup.nom.toLowerCase().includes(searchQuery.toLowerCase()) ||
        s.technologies.some(t => t.toLowerCase().includes(searchQuery.toLowerCase()))
      )
    : categoryFiltered;

  const totalPages = Math.ceil(filteredSolutions.length / ITEMS_PER_PAGE);
  const pageResults = filteredSolutions.slice((page - 1) * ITEMS_PER_PAGE, page * ITEMS_PER_PAGE);

  const hasActiveFilters = activeFilter !== 'all' || !!searchQuery;
  const activeFilterCount = (activeFilter !== 'all' ? 1 : 0) + (searchQuery ? 1 : 0);


  const PROCESS_STEPS = [
    { step: 1, title: 'Décrivez votre besoin en langage naturel', description: "Pas de formulaire complexe. Tapez simplement ce que vous cherchez. Notre IA analyse votre demande.", icon: MessageSquare, highlight: 'IA' },
    { step: 2, title: 'Recevez des recommandations sur mesure', description: "L'algorithme de matching croise votre besoin avec les 100+ solutions et propose un top 5 classé par score.", icon: Brain, highlight: 'Score IA' },
    { step: 3, title: 'Comparez côte à côte', description: "Sélectionnez 2 à 4 solutions et comparez-les : fonctionnalités, pricing, avis, maturité, certifications.", icon: GitCompareArrows, highlight: 'Comparaison' },
    { step: 4, title: 'Contactez et testez', description: "Envoyez un message direct à la startup, planifiez une démo live, ou demandez un POC.", icon: MessageCircle, highlight: 'Contact direct' },
    { step: 5, title: 'Notez et recommandez', description: "Laissez un avis vérifié pour aider la communauté. Les meilleures solutions remontent en visibilité.", icon: Star, highlight: 'Communauté' },
  ];

  return (
    <>
      {/* ═══════════════ SECTION 1 : HERO ═══════════════ */}
      <CompactHero
        badge="Plateforme Nationale d'Open Innovation"
        badgeIcon={<Lightbulb size={14} />}
        title={<>KIMBA <span className="bg-linear-to-r from-amber-300 to-yellow-300 bg-clip-text text-transparent">2.0</span></>}
        subtitle="La place de marché intelligente de l'innovation gabonaise — Matching IA, catalogue de 100+ solutions, défis d'innovation ouverts."
        backgroundClasses="bg-linear-to-br from-violet-600 via-purple-500 to-indigo-600"
        overlays={
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_50%,rgba(255,255,255,0.1),transparent_50%)]" />
        }
        accentColor="#8b5cf6"
        stats={[
          { value: '100+', label: 'Solutions publiées', icon: <Grid3x3 size={18} className="text-violet-300" /> },
          { value: '38', label: 'Startups actives', icon: <Rocket size={18} className="text-violet-300" /> },
          { value: '15', label: 'Défis ouverts', icon: <Trophy size={18} className="text-violet-300" /> },
          { value: '94%', label: 'Taux de matching', icon: <Brain size={18} className="text-violet-300" /> },
        ]}
      >
        {/* Quick action pills — search moved to filter bar below */}
        <div className="flex flex-wrap items-center gap-2">
          <Link href="/dashboard/innovation"
            className="px-4 py-2 text-xs font-semibold text-white rounded-xl bg-violet-500 hover:bg-violet-400 transition-all shadow-violet-500/25 flex items-center gap-1.5 no-underline border-none cursor-pointer">
            <Grid3x3 size={13} /> Explorer le catalogue
          </Link>
          <Link href="/dashboard/innovation/matching"
            className="px-4 py-2 text-xs font-semibold text-white rounded-xl bg-white/10 hover:bg-white/20 backdrop-blur-md border border-white/10 transition-all flex items-center gap-1.5 no-underline">
            <Brain size={13} /> Matching IA
          </Link>
          <Link href="/dashboard/innovation/defis"
            className="px-4 py-2 text-xs font-semibold text-white rounded-xl bg-white/10 hover:bg-white/20 backdrop-blur-md border border-white/10 transition-all flex items-center gap-1.5 no-underline">
            <Trophy size={13} /> Défis ouverts
          </Link>
        </div>
      </CompactHero>

      {/* ═══════════════ SECTION 2 : CATALOGUE PUBLIC ═══════════════ */}
      <section className="py-12">
        <div className="max-w-7xl mx-auto px-6">

          {/* ── Section heading ── */}
          <div className="flex items-center justify-between mb-3">
            <h2 className="text-lg md:text-xl font-bold text-gray-900 dark:text-white m-0">
              Explorez par catégorie
            </h2>
            <span className="text-xs text-gray-400 dark:text-gray-500 hidden sm:block">
              Filtrez par secteur, technologie ou budget
            </span>
          </div>

          {/* ── Category chips — scrollable row with fade ── */}
          <div className="relative group mb-4">
            {/* Left fade + arrow */}
            {canScrollLeft && (
              <>
                <div className="absolute left-0 top-0 bottom-0 w-10 bg-linear-to-r from-white dark:from-gray-950 to-transparent z-10 pointer-events-none rounded-l-xl" />
                <button
                  onClick={() => scrollCatBy(-1)}
                  className="absolute left-0 top-1/2 -translate-y-1/2 z-20 w-7 h-7 rounded-full bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 flex items-center justify-center cursor-pointer text-gray-500 hover:text-gray-900 dark:hover:text-white transition-all opacity-0 group-hover:opacity-100"
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
                  onClick={() => scrollCatBy(1)}
                  className="absolute right-0 top-1/2 -translate-y-1/2 z-20 w-7 h-7 rounded-full bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 flex items-center justify-center cursor-pointer text-gray-500 hover:text-gray-900 dark:hover:text-white transition-all opacity-0 group-hover:opacity-100"
                >
                  <ChevronRight size={14} />
                </button>
              </>
            )}

            {/* Scrollable row — hidden scrollbar */}
            <div
              ref={catScrollRef}
              className="flex gap-2 overflow-x-auto pb-1"
              style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
            >
              <button
                onClick={() => { setActiveFilter('all'); setPage(1); }}
                className={`shrink-0 inline-flex items-center gap-1.5 text-xs font-semibold px-3.5 py-2 rounded-xl border-none cursor-pointer transition-all duration-200 ${activeFilter === 'all' ? 'bg-violet-600 text-white shadow-violet-500/25' : 'bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-700'}`}
              >
                Tout <span className={`text-[10px] px-1.5 py-0.5 rounded-full ${activeFilter === 'all' ? 'bg-white/20 text-white' : 'bg-gray-200 dark:bg-gray-700 text-gray-500 dark:text-gray-400'}`}>{SOLUTIONS_KIMBA.length}</span>
              </button>
              {CATEGORIES_CONFIG.map(cat => {
                const Icon = CATEGORY_ICONS[cat.value];
                const count = SOLUTIONS_KIMBA.filter(s => s.categorie === cat.value).length;
                if (count === 0) return null;
                return (
                  <button key={cat.value}
                    onClick={() => { setActiveFilter(cat.value); setPage(1); }}
                    className={`shrink-0 inline-flex items-center gap-1.5 text-xs font-semibold px-3.5 py-2 rounded-xl border-none cursor-pointer transition-all duration-200 ${activeFilter === cat.value ? 'text-white' : 'bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-700'}`}
                    style={activeFilter === cat.value ? { background: cat.color, boxShadow: `0 6px 20px ${cat.color}30` } : undefined}
                  >
                    {Icon && <Icon size={13} />} {cat.label} <span className={`text-[10px] px-1.5 py-0.5 rounded-full ${activeFilter === cat.value ? 'bg-white/20 text-white' : 'bg-gray-200 dark:bg-gray-700 text-gray-500 dark:text-gray-400'}`}>{count}</span>
                  </button>
                );
              })}
            </div>

            {/* Dot indicators */}
            <div className="flex justify-center gap-1 mt-2">
              <span className={`w-1.5 h-1.5 rounded-full transition-colors ${canScrollLeft ? 'bg-gray-300 dark:bg-gray-600' : 'bg-violet-500'}`} />
              <span className={`w-1.5 h-1.5 rounded-full transition-colors ${canScrollLeft && canScrollRight ? 'bg-violet-500' : 'bg-gray-300 dark:bg-gray-600'}`} />
              <span className={`w-1.5 h-1.5 rounded-full transition-colors ${canScrollRight ? 'bg-gray-300 dark:bg-gray-600' : 'bg-violet-500'}`} />
            </div>
          </div>

          {/* ── Compact filter bar (search + active tags) ── */}
          <div className="bg-white/60 dark:bg-white/3 backdrop-blur-xl rounded-2xl border border-gray-200/50 dark:border-white/6 px-4 py-3 mb-8">
            <div className="flex items-center gap-2 flex-wrap">
              {/* Integrated search */}
              <div className="relative flex-1 min-w-[180px] max-w-sm">
                <Search size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 dark:text-gray-500 pointer-events-none" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => { setSearchQuery(e.target.value); setPage(1); }}
                  placeholder="Rechercher une solution, startup, technologie..."
                  className="w-full bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-xl text-xs text-gray-700 dark:text-gray-300 placeholder:text-gray-400 dark:placeholder:text-gray-500 pl-9 pr-8 py-2 focus:outline-none focus:ring-2 focus:ring-violet-500/30 focus:border-violet-400/50 transition-all"
                />
                {searchQuery && (
                  <button
                    onClick={() => { setSearchQuery(''); setPage(1); }}
                    className="absolute right-2.5 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 bg-transparent border-none cursor-pointer p-0 flex"
                  >
                    <X size={13} />
                  </button>
                )}
              </div>

              {/* Filter toggle badge */}
              <button
                className={`inline-flex items-center gap-1.5 text-xs font-semibold px-3 py-2 rounded-xl border cursor-pointer transition-all duration-200
                  ${hasActiveFilters
                    ? 'bg-violet-50 dark:bg-violet-900/20 text-violet-600 dark:text-violet-400 border-violet-200 dark:border-violet-800'
                    : 'bg-white dark:bg-gray-900 text-gray-500 dark:text-gray-400 border-gray-200 dark:border-gray-700'
                  }`}
                onClick={() => { setActiveFilter('all'); setSearchQuery(''); setPage(1); }}
              >
                <SlidersHorizontal size={13} />
                Filtres
                {activeFilterCount > 0 && (
                  <span className="bg-violet-500 text-white text-[10px] font-bold px-1.5 py-0.5 rounded-full leading-none">
                    {activeFilterCount}
                  </span>
                )}
              </button>

              {/* Result count */}
              <span className="text-xs text-gray-500 dark:text-gray-400 ml-auto whitespace-nowrap">
                <strong className="text-gray-900 dark:text-white">{filteredSolutions.length}</strong> solutions
              </span>
            </div>

            {/* Active filter tags */}
            {hasActiveFilters && (
              <div className="flex items-center gap-1.5 flex-wrap mt-2 pt-2 border-t border-gray-200/50 dark:border-white/6">
                {searchQuery && (
                  <span className="inline-flex items-center gap-1 text-[11px] font-medium px-2 py-1 rounded-lg bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300">
                    🔍 &ldquo;{searchQuery}&rdquo;
                    <button onClick={() => { setSearchQuery(''); setPage(1); }} className="bg-transparent border-none cursor-pointer text-gray-400 hover:text-gray-600 p-0 flex"><X size={11} /></button>
                  </span>
                )}
                {activeFilter !== 'all' && (
                  <span className="inline-flex items-center gap-1 text-[11px] font-medium px-2 py-1 rounded-lg bg-violet-50 dark:bg-violet-900/20 text-violet-700 dark:text-violet-400">
                    📂 {CATEGORIES_CONFIG.find(c => c.value === activeFilter)?.label}
                    <button onClick={() => { setActiveFilter('all'); setPage(1); }} className="bg-transparent border-none cursor-pointer text-violet-400 hover:text-violet-600 p-0 flex"><X size={11} /></button>
                  </span>
                )}
                <button
                  onClick={() => { setActiveFilter('all'); setSearchQuery(''); setPage(1); }}
                  className="flex items-center gap-1 text-[11px] font-medium text-red-500 hover:text-red-600 bg-transparent border-none cursor-pointer transition-colors p-0 ml-1"
                >
                  <X size={12} /> Réinitialiser
                </button>
              </div>
            )}
          </div>

          {/* Solutions grid — paginated */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-5 mb-8">
            {pageResults.map(sol => (
              <SolutionCard key={sol.id} solution={sol} isPublic />
            ))}
          </div>

          {pageResults.length === 0 && (
            <div className="text-center py-12 bg-white/60 dark:bg-white/2 backdrop-blur-xl rounded-3xl border border-gray-200/50 dark:border-white/6">
              <Grid3x3 size={48} className="mx-auto mb-4 text-gray-300 dark:text-gray-700" />
              <p className="text-lg font-semibold text-gray-500 dark:text-gray-400">Aucune solution trouvée</p>
              <p className="text-sm text-gray-400 dark:text-gray-500 mt-1">Essayez de modifier vos filtres ou votre recherche</p>
            </div>
          )}

          {/* ═══ PAGINATION ═══ */}
          {totalPages > 1 && (() => {
            const pages: (number | 'dots')[] = [];
            const addPage = (p: number) => { if (p >= 1 && p <= totalPages && !pages.includes(p)) pages.push(p); };
            addPage(1);
            if (page > 3) pages.push('dots');
            for (let i = page - 1; i <= page + 1; i++) addPage(i);
            if (page < totalPages - 2) pages.push('dots');
            addPage(totalPages);

            return (
              <div className="flex flex-col items-center gap-4">
                <p className="text-xs text-gray-400 dark:text-gray-500 m-0">
                  Page <span className="font-semibold text-gray-600 dark:text-gray-300">{page}</span> sur{' '}
                  <span className="font-semibold text-gray-600 dark:text-gray-300">{totalPages}</span>
                  {' '}— {filteredSolutions.length} solutions
                </p>

                <div className="flex items-center gap-1.5">
                  <button
                    onClick={() => setPage(p => Math.max(1, p - 1))}
                    disabled={page === 1}
                    className="flex items-center gap-1 px-3 py-2 rounded-xl text-sm font-medium
                      bg-white border-gray-200/70
                      dark:bg-gray-900/60 dark:border-gray-700/50 dark:hover:border-gray-600/60
                      border text-gray-600 dark:text-gray-400 disabled:opacity-30 cursor-pointer transition-all"
                  >
                    <ChevronLeft size={15} /> Préc.
                  </button>

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
                            ? 'bg-violet-600 text-white border-violet-600 shadow-violet-500/25'
                            : 'bg-white border-gray-200/70 text-gray-600 hover:bg-gray-100 dark:bg-gray-900/60 dark:border-gray-700/50 dark:text-gray-400 dark:hover:bg-gray-800/60'
                          }`}
                      >
                        {p}
                      </button>
                    )
                  )}

                  <button
                    onClick={() => setPage(p => Math.min(totalPages, p + 1))}
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
            );
          })()}
        </div>
      </section>

      {/* ═══════════════ SECTION 3 : DÉFIS ═══════════════ */}
      <section className="py-20 bg-gray-100 dark:bg-gray-900/50">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-10">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-3">
              Défis d&apos;Innovation Ouverts
            </h2>
            <p className="text-gray-500 dark:text-gray-400">
              Les grandes entreprises et institutions recherchent des solutions. Relevez le défi !
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 mb-8">
            {DEFIS_KIMBA.slice(0, 3).map(defi => (
              <DefiCard key={defi.id} defi={defi} isPublic />
            ))}
          </div>

          <div className="text-center">
            <Link href="/dashboard/innovation/defis"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-violet-50 dark:bg-violet-900/30 text-violet-600 dark:text-violet-400 font-semibold hover:bg-violet-100 dark:hover:bg-violet-900/50 transition-colors no-underline text-sm">
              Voir tous les défis et soumettre une solution <ArrowRight size={16} />
            </Link>
          </div>
        </div>
      </section>

      {/* ═══════════════ SECTION 4 : COMMENT ÇA MARCHE ═══════════════ */}
      <ServiceTimeline
        accentColor={accentColor}
        steps={PROCESS_STEPS.map(s => ({
          number: s.step,
          title: s.title,
          description: s.description,
          icon: s.icon,
          highlight: s.highlight,
        }))}
      />

      {/* ═══════════════ SECTION 5 : STARTUPS VEDETTES ═══════════════ */}
      <section className="py-10 sm:py-20 bg-gray-100 dark:bg-gray-900/50 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-4 sm:mb-10">
            <h2 className="text-xl sm:text-3xl font-bold text-gray-900 dark:text-white mb-1 sm:mb-3">Startups à la Une</h2>
            <p className="text-sm sm:text-base text-gray-500 dark:text-gray-400">Les pépites de l&apos;écosystème tech gabonais</p>
          </div>

          <div className="relative">
            {/* Carousel */}
            <div className="overflow-hidden rounded-3xl">
              <div className="flex transition-transform duration-500 ease-out" style={{ transform: `translateX(-${carouselIdx * 100}%)` }}>
                {STARTUPS_VEDETTES.map(st => {
                  const badgeColors: Record<string, string> = {
                    'Deal VC (€650K)': '#10B981', 'Alumni SING': '#8B5CF6',
                    'Lauréat Moov Africa': '#F59E0B', 'Leader e-Commerce': '#EC4899',
                    'Projet CGI': '#F59E0B',
                  };
                  const mainBadge = st.badges.find(b => b !== 'Vérifié KIMBA') || st.badges[0];
                  const mainBadgeColor = badgeColors[mainBadge] || '#8B5CF6';

                  return (
                    <div key={st.id} className="w-full shrink-0 px-1 sm:px-2">
                      <div className="bg-white dark:bg-gray-900 rounded-2xl sm:rounded-3xl p-4 sm:p-8 md:p-10 border border-gray-200 dark:border-gray-800">
                        <div className="flex items-start gap-3 sm:gap-8 sm:flex-col md:flex-row">
                          {/* Avatar */}
                          <div className="w-10 h-10 sm:w-20 sm:h-20 rounded-xl sm:rounded-3xl bg-linear-to-br from-violet-500 to-indigo-600 flex items-center justify-center text-white text-lg sm:text-3xl font-bold shrink-0">
                            {st.nom.charAt(0)}
                          </div>
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center gap-2 sm:gap-3 mb-1 sm:mb-2 flex-wrap">
                              <h3 className="text-sm sm:text-2xl font-bold text-gray-900 dark:text-white">{st.nom}</h3>
                              <span className="text-[10px] sm:text-xs font-bold px-2 sm:px-3 py-0.5 sm:py-1 rounded-full text-white" style={{ background: mainBadgeColor }}>
                                {mainBadge}
                              </span>
                            </div>
                            <p className="text-[10px] sm:text-sm text-gray-500 dark:text-gray-400 mb-1">{st.fondateur} • {st.secteur} • Depuis {st.anneeCreation}</p>
                            <p className="text-xs sm:text-base text-gray-700 dark:text-gray-300 mb-2 sm:mb-4 line-clamp-2 sm:line-clamp-none">{st.description}</p>
                            <div className="flex flex-wrap gap-1.5 sm:gap-3">
                              {Object.entries(st.metriques).map(([key, val]) => (
                                <div key={key} className="px-2 sm:px-4 py-1 sm:py-2 rounded-lg sm:rounded-xl bg-gray-100 dark:bg-gray-800/50">
                                  <div className="text-[10px] sm:text-sm font-bold text-gray-900 dark:text-white">{val}</div>
                                  <div className="text-[8px] sm:text-[10px] text-gray-400 capitalize">{key}</div>
                                </div>
                              ))}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Navigation */}
            <div className="flex items-center justify-center gap-4 mt-6">
              <button onClick={() => setCarouselIdx(prev => (prev - 1 + STARTUPS_VEDETTES.length) % STARTUPS_VEDETTES.length)}
                className="w-10 h-10 rounded-full bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 flex items-center justify-center text-gray-500 hover:text-violet-600 cursor-pointer transition-colors">
                <ChevronLeft size={18} />
              </button>
              <div className="flex gap-2">
                {STARTUPS_VEDETTES.map((_, i) => (
                  <button key={i} onClick={() => setCarouselIdx(i)}
                    className={`w-2.5 h-2.5 rounded-full border-none cursor-pointer transition-all duration-300 ${i === carouselIdx ? 'bg-violet-600 w-6' : 'bg-gray-300 dark:bg-gray-600'}`} />
                ))}
              </div>
              <button onClick={() => setCarouselIdx(prev => (prev + 1) % STARTUPS_VEDETTES.length)}
                className="w-10 h-10 rounded-full bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 flex items-center justify-center text-gray-500 hover:text-violet-600 cursor-pointer transition-colors">
                <ChevronRight size={18} />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════════ SECTION 6 : STATS ÉCOSYSTÈME ═══════════════ */}
      <section className="py-10 sm:py-20 relative overflow-hidden">
        <div className="absolute inset-0 bg-linear-to-br from-violet-50 to-indigo-50 dark:from-violet-950/20 dark:to-indigo-950/20" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-4 sm:mb-10">
            <h2 className="text-xl sm:text-3xl font-bold text-gray-900 dark:text-white mb-1 sm:mb-3">L&apos;Écosystème en Temps Réel</h2>
          </div>
          <div className="grid grid-cols-3 md:grid-cols-3 lg:grid-cols-6 gap-2 sm:gap-4">
            {ECOSYSTEME_STATS.map(stat => (
              <div key={stat.label} className="text-center p-2 sm:p-5 rounded-xl sm:rounded-2xl bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800">
                <div className="text-lg sm:text-3xl font-bold mb-0.5 sm:mb-1" style={{ color: stat.color }}>
                  <CountUp end={stat.value} prefix={stat.prefix || ''} suffix={stat.suffix || ''} />
                </div>
                <div className="text-[9px] sm:text-xs text-gray-500 dark:text-gray-400">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>




      {/* ═══════════════ CTA FINAL ═══════════════ */}
      <section className="py-10 sm:py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center">
          <h2 className="text-xl sm:text-3xl font-bold text-gray-900 dark:text-white mb-2 sm:mb-4">
            Prêt à trouver la solution tech idéale ?
          </h2>
          <p className="text-sm sm:text-base text-gray-500 dark:text-gray-400 mb-4 sm:mb-8 max-w-xl mx-auto">
            Rejoignez KIMBA 2.0 et accédez au plus grand catalogue de solutions numériques gabonaises.
          </p>
          <div className="flex flex-row gap-2 sm:gap-3 justify-center">
            <Link href="/dashboard/innovation"
              className="px-4 sm:px-8 py-2.5 sm:py-3.5 rounded-xl bg-linear-to-r from-violet-600 to-indigo-600 text-white font-semibold hover:opacity-90 transition-opacity no-underline text-xs sm:text-sm shadow-violet-500/25">
              Explorer le catalogue
            </Link>
            <Link href="/dashboard/innovation/matching"
              className="px-4 sm:px-8 py-2.5 sm:py-3.5 rounded-xl bg-violet-50 dark:bg-violet-900/30 text-violet-600 dark:text-violet-400 font-semibold hover:bg-violet-100 dark:hover:bg-violet-900/50 transition-colors no-underline text-xs sm:text-sm">
              Matching IA
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
