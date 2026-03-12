'use client';

import React, { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import {
  Grid3x3, Rocket, Trophy, Brain, Star, MessageSquare,
  MessageCircle, GitCompareArrows, Wallet, HeartPulse, Sprout,
  GraduationCap, Truck, Building2, Leaf, Shield, ShoppingCart, Lock,
  ArrowRight, ChevronLeft, ChevronRight, Lightbulb,
} from 'lucide-react';
import { ServiceBreadcrumb } from '@/components/services/ServiceBreadcrumb';
import SolutionCard from '@/components/innovation/SolutionCard';
import DefiCard from '@/components/innovation/DefiCard';
import SearchBar from '@/components/innovation/SearchBar';
import RatingStars from '@/components/ui/RatingStars';
import {
  SOLUTIONS_KIMBA, DEFIS_KIMBA, STARTUPS_VEDETTES, TEMOIGNAGES_KIMBA,
  FAQ_KIMBA, ECOSYSTEME_STATS, CATEGORIES_CONFIG,
  type SolutionCategorie,
} from '@/lib/mock/innovation-data';

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
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState('');
  const [activeFilter, setActiveFilter] = useState<SolutionCategorie | 'all'>('all');
  const [carouselIdx, setCarouselIdx] = useState(0);
  const [openFAQ, setOpenFAQ] = useState<number | null>(null);

  // Auto-advance carousel
  useEffect(() => {
    const timer = setInterval(() => {
      setCarouselIdx(prev => (prev + 1) % STARTUPS_VEDETTES.length);
    }, 6000);
    return () => clearInterval(timer);
  }, []);

  // Filtered solutions for public catalogue
  const filteredSolutions = activeFilter === 'all'
    ? SOLUTIONS_KIMBA.slice(0, 8)
    : SOLUTIONS_KIMBA.filter(s => s.categorie === activeFilter).slice(0, 8);

  const handleSearch = (q: string) => {
    router.push(`/dashboard/innovation/matching?q=${encodeURIComponent(q)}`);
  };

  const PROCESS_STEPS = [
    { step: 1, title: 'Décrivez votre besoin en langage naturel', description: "Pas de formulaire complexe. Tapez simplement ce que vous cherchez. Notre IA analyse votre demande.", icon: MessageSquare, highlight: 'IA' },
    { step: 2, title: 'Recevez des recommandations sur mesure', description: "L'algorithme de matching croise votre besoin avec les 100+ solutions et propose un top 5 classé par score.", icon: Brain, highlight: 'Score IA' },
    { step: 3, title: 'Comparez côte à côte', description: "Sélectionnez 2 à 4 solutions et comparez-les : fonctionnalités, pricing, avis, maturité, certifications.", icon: GitCompareArrows, highlight: 'Comparaison' },
    { step: 4, title: 'Contactez et testez', description: "Envoyez un message direct à la startup, planifiez une démo live, ou demandez un POC.", icon: MessageCircle, highlight: 'Contact direct' },
    { step: 5, title: 'Notez et recommandez', description: "Laissez un avis vérifié pour aider la communauté. Les meilleures solutions remontent en visibilité.", icon: Star, highlight: 'Communauté' },
  ];

  return (
    <>
      {/* Breadcrumb */}
      <div className="max-w-7xl mx-auto px-6 pt-24 pb-4">
        <ServiceBreadcrumb serviceName="Innovation Hub KIMBA 2.0" accentColor={accentColor} />
      </div>

      {/* ═══════════════ SECTION 1 : HERO ═══════════════ */}
      <section className="relative py-24 overflow-hidden">
        <div className="absolute inset-0 bg-linear-to-br from-violet-600 via-purple-500 to-indigo-600" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_50%,rgba(255,255,255,0.1),transparent_50%)]" />

        <div className="relative max-w-5xl mx-auto px-6 text-center">
          <span className="inline-flex items-center gap-2 text-xs font-semibold px-4 py-1.5 rounded-full bg-white/15 text-white/90 backdrop-blur mb-6">
            <Lightbulb size={14} /> Plateforme Nationale d&apos;Open Innovation
          </span>

          <h1 className="text-5xl md:text-6xl font-extrabold text-white mb-3 tracking-tight">
            KIMBA <span className="bg-linear-to-r from-amber-300 to-yellow-300 bg-clip-text text-transparent">2.0</span>
          </h1>
          <p className="text-xl md:text-2xl text-white/80 font-medium mb-2">
            La place de marché intelligente de l&apos;innovation gabonaise
          </p>
          <p className="text-base text-white/60 max-w-2xl mx-auto mb-10">
            Trouvez la solution tech gabonaise qui répond à votre besoin. Matching IA, catalogue de 100+ solutions, défis d&apos;innovation ouverts.
          </p>

          {/* Search bar */}
          <div className="flex justify-center mb-12">
            <SearchBar value={searchQuery} onChange={setSearchQuery} onSubmit={handleSearch} size="hero" />
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-3xl mx-auto">
            {[
              { value: 100, suffix: '+', label: 'Solutions publiées', icon: Grid3x3 },
              { value: 38, suffix: '', label: 'Startups actives', icon: Rocket },
              { value: 15, suffix: '', label: 'Défis ouverts', icon: Trophy },
              { value: 94, suffix: '%', label: 'Taux de matching', icon: Brain },
            ].map((stat) => (
              <div key={stat.label} className="rounded-2xl bg-white/10 backdrop-blur p-4 text-white">
                <stat.icon size={20} className="mb-2 mx-auto opacity-70" />
                <div className="text-2xl font-bold">
                  <CountUp end={stat.value} suffix={stat.suffix} />
                </div>
                <div className="text-xs text-white/60">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════ SECTION 2 : CATALOGUE PUBLIC ═══════════════ */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-10">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-3">
              Explorez les Solutions Tech Gabonaises
            </h2>
            <p className="text-gray-500 dark:text-gray-400">
              Filtrez par secteur, technologie ou budget — sans inscription
            </p>
          </div>

          {/* Filter chips */}
          <div className="flex flex-wrap gap-2 justify-center mb-10">
            <button
              onClick={() => setActiveFilter('all')}
              className={`inline-flex items-center gap-1.5 text-sm font-medium px-4 py-2 rounded-full border-none cursor-pointer transition-all duration-200 ${activeFilter === 'all' ? 'bg-violet-600 text-white shadow-lg shadow-violet-500/25' : 'bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-700'}`}
            >
              Tout <span className="text-xs opacity-70">{SOLUTIONS_KIMBA.length}</span>
            </button>
            {CATEGORIES_CONFIG.map(cat => {
              const Icon = CATEGORY_ICONS[cat.value];
              const count = SOLUTIONS_KIMBA.filter(s => s.categorie === cat.value).length;
              if (count === 0) return null;
              return (
                <button key={cat.value}
                  onClick={() => setActiveFilter(cat.value)}
                  className={`inline-flex items-center gap-1.5 text-sm font-medium px-4 py-2 rounded-full border-none cursor-pointer transition-all duration-200 ${activeFilter === cat.value ? 'text-white shadow-lg' : 'bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-700'}`}
                  style={activeFilter === cat.value ? { background: cat.color, boxShadow: `0 10px 25px ${cat.color}30` } : undefined}
                >
                  {Icon && <Icon size={14} />} {cat.label} <span className="text-xs opacity-70">{count}</span>
                </button>
              );
            })}
          </div>

          {/* Solutions grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 mb-8">
            {filteredSolutions.map(sol => (
              <SolutionCard key={sol.id} solution={sol} isPublic />
            ))}
          </div>

          {filteredSolutions.length === 0 && (
            <div className="text-center py-12 text-gray-400">Aucune solution dans cette catégorie</div>
          )}

          {/* CTA */}
          <div className="text-center">
            <Link href="/dashboard/innovation"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-linear-to-r from-violet-600 to-indigo-600 text-white font-semibold hover:opacity-90 transition-opacity no-underline text-sm">
              Explorer les 100+ solutions <ArrowRight size={16} />
            </Link>
          </div>
        </div>
      </section>

      {/* ═══════════════ SECTION 3 : DÉFIS ═══════════════ */}
      <section className="py-20 bg-gray-50 dark:bg-gray-900/50">
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
      <section className="py-20">
        <div className="max-w-5xl mx-auto px-6">
          <div className="text-center mb-14">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-3">
              Comment ça marche ?
            </h2>
            <p className="text-gray-500 dark:text-gray-400">5 étapes pour trouver la solution idéale</p>
          </div>

          <div className="relative">
            {/* Vertical line */}
            <div className="absolute left-6 md:left-1/2 top-0 bottom-0 w-0.5 bg-linear-to-b from-violet-400 via-purple-400 to-indigo-400 hidden md:block" style={{ transform: 'translateX(-50%)' }} />

            <div className="space-y-8 md:space-y-12">
              {PROCESS_STEPS.map((step, i) => (
                <div key={step.step} className={`relative flex flex-col md:flex-row items-start md:items-center gap-4 md:gap-8 ${i % 2 === 1 ? 'md:flex-row-reverse' : ''}`}>
                  {/* Step number */}
                  <div className="hidden md:flex absolute left-1/2 -translate-x-1/2 w-12 h-12 rounded-2xl bg-linear-to-br from-violet-500 to-indigo-600 items-center justify-center text-white font-bold text-lg shadow-lg shadow-violet-500/30 z-10">
                    {step.step}
                  </div>

                  {/* Content card */}
                  <div className={`flex-1 ${i % 2 === 1 ? 'md:pr-20 md:text-right' : 'md:pl-20'}`}>
                    <div className="p-6 rounded-2xl bg-white dark:bg-gray-900 border border-gray-100 dark:border-gray-800 shadow-sm">
                      <div className={`flex items-center gap-3 mb-2 ${i % 2 === 1 ? 'md:flex-row-reverse' : ''}`}>
                        <div className="md:hidden w-8 h-8 rounded-xl bg-linear-to-br from-violet-500 to-indigo-600 flex items-center justify-center text-white text-sm font-bold">
                          {step.step}
                        </div>
                        <step.icon size={20} className="text-violet-500" />
                        <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-violet-100 dark:bg-violet-900/40 text-violet-600 dark:text-violet-400 uppercase tracking-wider">
                          {step.highlight}
                        </span>
                      </div>
                      <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-1">{step.title}</h3>
                      <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">{step.description}</p>
                    </div>
                  </div>

                  {/* Spacer for alignment */}
                  <div className="hidden md:block flex-1" />
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════════ SECTION 5 : STARTUPS VEDETTES ═══════════════ */}
      <section className="py-20 bg-gray-50 dark:bg-gray-900/50 overflow-hidden">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-10">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-3">Startups à la Une</h2>
            <p className="text-gray-500 dark:text-gray-400">Les pépites de l&apos;écosystème tech gabonais</p>
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
                    <div key={st.id} className="w-full shrink-0 px-2">
                      <div className="bg-white dark:bg-gray-900 rounded-3xl p-8 md:p-10 border border-gray-100 dark:border-gray-800 shadow-sm">
                        <div className="flex flex-col md:flex-row items-start gap-8">
                          {/* Avatar */}
                          <div className="w-20 h-20 rounded-3xl bg-linear-to-br from-violet-500 to-indigo-600 flex items-center justify-center text-white text-3xl font-bold shrink-0">
                            {st.nom.charAt(0)}
                          </div>
                          <div className="flex-1">
                            <div className="flex items-center gap-3 mb-2 flex-wrap">
                              <h3 className="text-2xl font-bold text-gray-900 dark:text-white">{st.nom}</h3>
                              <span className="text-xs font-bold px-3 py-1 rounded-full text-white" style={{ background: mainBadgeColor }}>
                                {mainBadge}
                              </span>
                            </div>
                            <p className="text-sm text-gray-500 dark:text-gray-400 mb-1">{st.fondateur} • {st.secteur} • Depuis {st.anneeCreation}</p>
                            <p className="text-base text-gray-700 dark:text-gray-300 mb-4">{st.description}</p>
                            <div className="flex flex-wrap gap-3">
                              {Object.entries(st.metriques).map(([key, val]) => (
                                <div key={key} className="px-4 py-2 rounded-xl bg-gray-50 dark:bg-gray-800/50">
                                  <div className="text-sm font-bold text-gray-900 dark:text-white">{val}</div>
                                  <div className="text-[10px] text-gray-400 capitalize">{key}</div>
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
      <section className="py-20 relative overflow-hidden">
        <div className="absolute inset-0 bg-linear-to-br from-violet-50 to-indigo-50 dark:from-violet-950/20 dark:to-indigo-950/20" />
        <div className="relative max-w-7xl mx-auto px-6">
          <div className="text-center mb-10">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-3">L&apos;Écosystème en Temps Réel</h2>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {ECOSYSTEME_STATS.map(stat => (
              <div key={stat.label} className="text-center p-5 rounded-2xl bg-white dark:bg-gray-900 border border-gray-100 dark:border-gray-800 shadow-sm">
                <div className="text-3xl font-bold mb-1" style={{ color: stat.color }}>
                  <CountUp end={stat.value} prefix={stat.prefix || ''} suffix={stat.suffix || ''} />
                </div>
                <div className="text-xs text-gray-500 dark:text-gray-400">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════ SECTION 7 : TÉMOIGNAGES ═══════════════ */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-10">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-3">Ils témoignent</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {TEMOIGNAGES_KIMBA.map(t => (
              <div key={t.nom} className="p-6 rounded-2xl bg-white dark:bg-gray-900 border border-gray-100 dark:border-gray-800 shadow-sm">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 rounded-full bg-linear-to-br from-violet-500 to-indigo-600 flex items-center justify-center text-white text-sm font-bold">
                    {t.avatar}
                  </div>
                  <div>
                    <div className="text-sm font-semibold text-gray-900 dark:text-white">{t.nom}</div>
                    <div className="text-xs text-gray-500 dark:text-gray-400">{t.role}</div>
                  </div>
                </div>
                <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed mb-3 italic">&ldquo;{t.quote}&rdquo;</p>
                <div className="flex items-center justify-between">
                  <RatingStars rating={t.rating} size={14} showValue={false} />
                  {t.solutionUtilisee && (
                    <span className="text-[10px] px-2 py-0.5 rounded-full bg-violet-50 dark:bg-violet-900/30 text-violet-600 dark:text-violet-400">
                      {t.solutionUtilisee}
                    </span>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════ SECTION 8 : FAQ ═══════════════ */}
      <section className="py-20 bg-gray-50 dark:bg-gray-900/50">
        <div className="max-w-3xl mx-auto px-6">
          <div className="text-center mb-10">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-3">Questions Fréquentes</h2>
          </div>
          <div className="space-y-3">
            {FAQ_KIMBA.map((faq, i) => (
              <div key={i} className="rounded-2xl bg-white dark:bg-gray-900 border border-gray-100 dark:border-gray-800 overflow-hidden">
                <button onClick={() => setOpenFAQ(openFAQ === i ? null : i)}
                  className="w-full flex items-center justify-between p-5 text-left bg-transparent border-none cursor-pointer">
                  <span className="text-sm font-semibold text-gray-900 dark:text-white pr-4">{faq.q}</span>
                  <span className={`text-lg text-violet-500 transition-transform duration-200 shrink-0 ${openFAQ === i ? 'rotate-45' : ''}`}>+</span>
                </button>
                {openFAQ === i && (
                  <div className="px-5 pb-5 -mt-1">
                    <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">{faq.a}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════ CTA FINAL ═══════════════ */}
      <section className="py-20">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
            Prêt à trouver la solution tech idéale ?
          </h2>
          <p className="text-gray-500 dark:text-gray-400 mb-8 max-w-xl mx-auto">
            Rejoignez KIMBA 2.0 et accédez au plus grand catalogue de solutions numériques gabonaises.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link href="/dashboard/innovation"
              className="px-8 py-3.5 rounded-xl bg-linear-to-r from-violet-600 to-indigo-600 text-white font-semibold hover:opacity-90 transition-opacity no-underline text-sm shadow-lg shadow-violet-500/25">
              Explorer le catalogue
            </Link>
            <Link href="/dashboard/innovation/matching"
              className="px-8 py-3.5 rounded-xl bg-violet-50 dark:bg-violet-900/30 text-violet-600 dark:text-violet-400 font-semibold hover:bg-violet-100 dark:hover:bg-violet-900/50 transition-colors no-underline text-sm">
              Essayer le matching IA
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
