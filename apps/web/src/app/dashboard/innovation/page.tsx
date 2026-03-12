'use client';

import React, { useState, useMemo } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { Grid3x3, Trophy, Rocket, Brain, List, LayoutGrid, SlidersHorizontal, BarChart3 } from 'lucide-react';
import { PageHeader } from '@/components/ui';
import SolutionCard from '@/components/innovation/SolutionCard';
import DefiCard from '@/components/innovation/DefiCard';
import StartupCard from '@/components/innovation/StartupCard';
import SearchBar from '@/components/innovation/SearchBar';
import FilterPanel from '@/components/innovation/FilterPanel';
import SolutionQuickView from '@/components/innovation/SolutionQuickView';
import {
  SOLUTIONS_KIMBA, DEFIS_KIMBA, STARTUPS_VEDETTES,
  filterSolutions, getCategoryCounts,
  type SolutionCategorie, type PricingModel, type Maturite,
} from '@/lib/mock/innovation-data';

type TabId = 'solutions' | 'defis' | 'startups' | 'matching';

const TABS: { id: TabId; label: string; icon: React.ElementType; count?: number; badge?: string }[] = [
  { id: 'solutions', label: 'Solutions', icon: Grid3x3, count: SOLUTIONS_KIMBA.length },
  { id: 'defis', label: 'Défis', icon: Trophy, count: DEFIS_KIMBA.length },
  { id: 'startups', label: 'Startups', icon: Rocket, count: STARTUPS_VEDETTES.length },
  { id: 'matching', label: 'Matching IA', icon: Brain, badge: 'Nouveau' },
];

const SORT_OPTIONS = ['Pertinence', 'Note ↓', 'Plus récent', 'Plus populaire'] as const;

export default function InnovationPage() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState<TabId>('solutions');
  const [search, setSearch] = useState('');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [showFilters, setShowFilters] = useState(false);
  const [sortBy, setSortBy] = useState<string>('Pertinence');
  const [activeCategorie, setActiveCategorie] = useState<SolutionCategorie | 'all'>('all');
  const [activePricing, setActivePricing] = useState<PricingModel | 'all'>('all');
  const [activeMaturite, setActiveMaturite] = useState<Maturite | 'all'>('all');
  const [minRating, setMinRating] = useState(0);
  const [compareIds, setCompareIds] = useState<string[]>([]);
  const [quickViewId, setQuickViewId] = useState<string | null>(null);

  const categoryCounts = useMemo(() => getCategoryCounts(), []);

  const filteredSolutions = useMemo(() => {
    const results = filterSolutions({
      search, categorie: activeCategorie, pricing: activePricing,
      maturite: activeMaturite, minRating: minRating || undefined,
    });
    if (sortBy === 'Note ↓') results.sort((a, b) => b.rating - a.rating);
    if (sortBy === 'Plus récent') results.sort((a, b) => new Date(b.datePublication).getTime() - new Date(a.datePublication).getTime());
    if (sortBy === 'Plus populaire') results.sort((a, b) => b.ratingsCount - a.ratingsCount);
    return results;
  }, [search, activeCategorie, activePricing, activeMaturite, minRating, sortBy]);

  const quickViewSolution = quickViewId ? SOLUTIONS_KIMBA.find(s => s.id === quickViewId) : null;

  const toggleCompare = (id: string) => {
    setCompareIds(prev => prev.includes(id) ? prev.filter(x => x !== id) : prev.length < 4 ? [...prev, id] : prev);
  };

  return (
    <div>
      <PageHeader title="Innovation Hub KIMBA 2.0" subtitle="Place de marché intelligente de l'innovation gabonaise" />

      {/* Tabs */}
      <div className="flex items-center gap-1 p-1 mb-6 bg-gray-100 dark:bg-gray-800 rounded-xl w-fit">
        {TABS.map(tab => (
          <button key={tab.id} onClick={() => { setActiveTab(tab.id); if (tab.id === 'matching') router.push('/dashboard/innovation/matching'); }}
            className={`flex items-center gap-2 px-4 py-2.5 rounded-lg text-sm font-medium border-none cursor-pointer transition-all duration-200 ${
              activeTab === tab.id ? 'bg-white dark:bg-gray-900 text-violet-600 dark:text-violet-400 shadow-sm' : 'bg-transparent text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300'
            }`}>
            <tab.icon size={16} />
            {tab.label}
            {tab.count !== undefined && <span className="text-xs opacity-60">{tab.count}</span>}
            {tab.badge && <span className="text-[10px] px-1.5 py-0.5 rounded-full bg-violet-100 dark:bg-violet-900/40 text-violet-600 dark:text-violet-400 font-semibold">{tab.badge}</span>}
          </button>
        ))}
      </div>

      {/* ═══ Solutions Tab ═══ */}
      {activeTab === 'solutions' && (
        <>
          {/* Search + Controls */}
          <div className="flex items-center gap-3 mb-4 flex-wrap">
            <div className="flex-1 min-w-[200px]">
              <SearchBar value={search} onChange={setSearch} placeholder="Recherche par nom, technologie, besoin..." />
            </div>
            <button onClick={() => setShowFilters(!showFilters)}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-medium border-none cursor-pointer transition-colors ${showFilters ? 'bg-violet-100 dark:bg-violet-900/40 text-violet-600 dark:text-violet-400' : 'bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-700'}`}>
              <SlidersHorizontal size={16} /> Filtres
            </button>
            <select value={sortBy} onChange={e => setSortBy(e.target.value)}
              className="px-3 py-2.5 rounded-xl text-sm bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 border-none cursor-pointer focus:outline-none">
              {SORT_OPTIONS.map(o => <option key={o} value={o}>{o}</option>)}
            </select>
            <div className="flex items-center gap-1 bg-gray-100 dark:bg-gray-800 rounded-xl p-1">
              <button onClick={() => setViewMode('grid')}
                className={`p-2 rounded-lg border-none cursor-pointer transition-colors ${viewMode === 'grid' ? 'bg-white dark:bg-gray-900 text-violet-600 shadow-sm' : 'bg-transparent text-gray-400'}`}>
                <LayoutGrid size={16} />
              </button>
              <button onClick={() => setViewMode('list')}
                className={`p-2 rounded-lg border-none cursor-pointer transition-colors ${viewMode === 'list' ? 'bg-white dark:bg-gray-900 text-violet-600 shadow-sm' : 'bg-transparent text-gray-400'}`}>
                <List size={16} />
              </button>
            </div>
          </div>

          {/* Filters panel */}
          {showFilters && (
            <div className="p-5 mb-6 rounded-2xl bg-white dark:bg-gray-900 border border-gray-100 dark:border-gray-800 shadow-sm">
              <FilterPanel
                activeCategorie={activeCategorie} onCategorieChange={setActiveCategorie}
                activePricing={activePricing} onPricingChange={setActivePricing}
                activeMaturite={activeMaturite} onMaturiteChange={setActiveMaturite}
                minRating={minRating} onMinRatingChange={setMinRating}
                categoryCounts={categoryCounts}
              />
            </div>
          )}

          {/* Results count */}
          <div className="text-sm text-gray-500 dark:text-gray-400 mb-4">
            {filteredSolutions.length} solution{filteredSolutions.length > 1 ? 's' : ''} trouvée{filteredSolutions.length > 1 ? 's' : ''}
          </div>

          {/* Solutions grid/list */}
          <div className={viewMode === 'grid' ? 'grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5' : 'flex flex-col gap-3'}>
            {filteredSolutions.map(sol => (
              <SolutionCard key={sol.id} solution={sol} variant={viewMode}
                onQuickView={setQuickViewId} onCompare={toggleCompare}
                isCompareSelected={compareIds.includes(sol.id)} />
            ))}
          </div>

          {filteredSolutions.length === 0 && (
            <div className="text-center py-16 text-gray-400">
              <p className="text-lg mb-2">Aucune solution trouvée</p>
              <p className="text-sm">Modifiez vos filtres ou votre recherche</p>
            </div>
          )}

          {/* Compare bar */}
          {compareIds.length > 0 && (
            <div className="fixed bottom-6 left-1/2 -translate-x-1/2 flex items-center gap-4 px-6 py-3 rounded-2xl bg-white dark:bg-gray-900 border border-violet-200 dark:border-violet-800 shadow-2xl shadow-violet-500/10 z-40">
              <span className="text-sm font-semibold text-gray-900 dark:text-white">
                ⚖ {compareIds.length} solution{compareIds.length > 1 ? 's' : ''} sélectionnée{compareIds.length > 1 ? 's' : ''}
              </span>
              <Link href={`/dashboard/innovation/comparer?ids=${compareIds.join(',')}`}
                className="px-4 py-2 rounded-xl bg-linear-to-r from-violet-600 to-indigo-600 text-white text-sm font-semibold no-underline hover:opacity-90 transition-opacity">
                Comparer
              </Link>
              <button onClick={() => setCompareIds([])} className="text-xs text-gray-400 hover:text-red-500 bg-transparent border-none cursor-pointer">
                Tout désélectionner
              </button>
            </div>
          )}
        </>
      )}

      {/* ═══ Défis Tab ═══ */}
      {activeTab === 'defis' && (
        <div>
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-4">
              <div className="px-3 py-1.5 rounded-lg bg-green-50 dark:bg-green-900/20 text-green-600 text-sm font-semibold">{DEFIS_KIMBA.filter(d => d.statut === 'ouvert').length} ouverts</div>
              <div className="px-3 py-1.5 rounded-lg bg-gray-100 dark:bg-gray-800 text-gray-500 text-sm">{DEFIS_KIMBA.reduce((s, d) => s + d.soumissions, 0)} soumissions</div>
            </div>
            <Link href="/dashboard/innovation/defis" className="text-sm text-violet-600 dark:text-violet-400 font-medium no-underline hover:underline">
              Voir la page dédiée →
            </Link>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {DEFIS_KIMBA.map(defi => <DefiCard key={defi.id} defi={defi} />)}
          </div>
        </div>
      )}

      {/* ═══ Startups Tab ═══ */}
      {activeTab === 'startups' && (
        <div>
          <div className="flex items-center justify-between mb-6">
            <p className="text-sm text-gray-500">{STARTUPS_VEDETTES.length} startups dans l&apos;écosystème</p>
            <Link href="/dashboard/innovation/startups" className="text-sm text-violet-600 dark:text-violet-400 font-medium no-underline hover:underline">
              Voir le catalogue complet →
            </Link>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {STARTUPS_VEDETTES.map(st => <StartupCard key={st.id} startup={st} />)}
          </div>
        </div>
      )}

      {/* Quick View Modal */}
      {quickViewSolution && (
        <SolutionQuickView solution={quickViewSolution} onClose={() => setQuickViewId(null)}
          onViewDetail={(id) => { setQuickViewId(null); router.push(`/dashboard/innovation/${id}`); }} />
      )}

      {/* Quick nav to analytics */}
      <div className="mt-10 p-5 rounded-2xl bg-linear-to-r from-violet-50 to-indigo-50 dark:from-violet-950/20 dark:to-indigo-950/20 border border-violet-100 dark:border-violet-900/30 flex items-center justify-between">
        <div>
          <h3 className="text-base font-bold text-gray-900 dark:text-white mb-1">📊 Analytics Écosystème</h3>
          <p className="text-sm text-gray-500 dark:text-gray-400">Visualisez les tendances de l&apos;innovation gabonaise</p>
        </div>
        <Link href="/dashboard/innovation/analytics"
          className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-linear-to-r from-violet-600 to-indigo-600 text-white text-sm font-semibold no-underline hover:opacity-90 transition-opacity">
          <BarChart3 size={16} /> Voir les analytics
        </Link>
      </div>
    </div>
  );
}
