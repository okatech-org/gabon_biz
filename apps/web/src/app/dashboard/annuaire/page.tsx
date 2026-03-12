'use client';

import { useState, useMemo } from 'react';
import { Download, History } from 'lucide-react';
import DashboardLayout from '@/components/DashboardLayout';
import SearchBar from '@/components/annuaire/SearchBar';
import EnterpriseCard from '@/components/annuaire/EnterpriseCard';
import EnterpriseFilters from '@/components/annuaire/EnterpriseFilters';
import FavoriteButton from '@/components/annuaire/FavoriteButton';
import { SECTORS, searchEnterprises, type SearchFilters } from '@/lib/annuaire-data';
import Link from 'next/link';

const ITEMS_PER_PAGE = 12;

export default function DashboardAnnuairePage() {
  const [query, setQuery] = useState('');
  const [filters, setFilters] = useState<SearchFilters>({});
  const [page, setPage] = useState(1);
  const [activeSector, setActiveSector] = useState<string | undefined>();

  const results = useMemo(() => {
    const allFilters: SearchFilters = { ...filters, query, sector: activeSector || filters.sector, sortBy: 'date' };
    return searchEnterprises(allFilters);
  }, [query, filters, activeSector]);
  const totalPages = Math.ceil(results.length / ITEMS_PER_PAGE);
  const pageResults = results.slice((page - 1) * ITEMS_PER_PAGE, page * ITEMS_PER_PAGE);

  const exportCSV = () => {
    const header = 'Nom,RCCM,NIF,Forme,Secteur,Ville,Province,Statut,Employés\n';
    const rows = results.map((e) =>
      `"${e.name}",${e.rccm},${e.nif},${e.legalForm},"${e.sector.name}",${e.address.city},${e.address.province},${e.status},${e.employeeCount}`
    ).join('\n');
    const blob = new Blob([header + rows], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'annuaire-gabon-biz.csv';
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between flex-wrap gap-4">
          <div>
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white m-0">📒 Annuaire des Entreprises</h1>
            <p className="text-sm text-gray-500 dark:text-gray-400 m-0 mt-1">Recherche avancée et gestion des entreprises</p>
          </div>
          <div className="flex gap-2">
            <Link
              href="/dashboard/annuaire/favoris"
              className="inline-flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400 no-underline hover:bg-red-100 dark:hover:bg-red-900/30 transition-colors"
            >
              ❤️ Favoris
            </Link>
            <Link
              href="/dashboard/annuaire/carte"
              className="inline-flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400 no-underline hover:bg-blue-100 dark:hover:bg-blue-900/30 transition-colors"
            >
              🗺️ Carte
            </Link>
            <button
              onClick={exportCSV}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium bg-emerald-50 dark:bg-emerald-900/20 text-emerald-600 dark:text-emerald-400 hover:bg-emerald-100 dark:hover:bg-emerald-900/30 border-none cursor-pointer transition-colors"
            >
              <Download size={14} /> Export CSV
            </button>
          </div>
        </div>

        {/* Search */}
        <SearchBar value={query} onChange={(v) => { setQuery(v); setPage(1); }} />

        {/* Recent searches placeholder */}
        <div className="flex items-center gap-2 text-xs text-gray-400 dark:text-gray-500">
          <History size={12} />
          Recherches récentes : <span className="text-gray-600 dark:text-gray-400">technologies</span>, <span className="text-gray-600 dark:text-gray-400">Libreville</span>
        </div>

        {/* Sector pills */}
        <div className="flex gap-2 overflow-x-auto pb-1">
          <button
            onClick={() => { setActiveSector(undefined); setPage(1); }}
            className={`shrink-0 px-3 py-1.5 rounded-full text-xs font-semibold border-none cursor-pointer transition-all
              ${!activeSector ? 'bg-emerald-500 text-white' : 'bg-gray-100 dark:bg-gray-800 text-gray-500'}`}
          >
            Tous
          </button>
          {SECTORS.map((s) => (
            <button
              key={s.id}
              onClick={() => { setActiveSector(activeSector === s.slug ? undefined : s.slug); setPage(1); }}
              className={`shrink-0 px-3 py-1.5 rounded-full text-xs font-semibold border-none cursor-pointer transition-all
                ${activeSector === s.slug ? 'text-white' : 'hover:opacity-80'}`}
              style={activeSector === s.slug ? { background: s.color } : { background: `${s.color}12`, color: s.color }}
            >
              {s.icon} {s.name}
            </button>
          ))}
        </div>

        {/* Filters */}
        <EnterpriseFilters filters={filters} onChange={(f) => { setFilters(f); setPage(1); }} totalResults={results.length} />

        {/* Grid */}
        {pageResults.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">
            {pageResults.map((e, i) => (
              <EnterpriseCard
                key={e.id}
                enterprise={e}
                index={i}
                showFavorite
                favoriteSlot={<FavoriteButton enterpriseId={e.id} />}
              />
            ))}
          </div>
        ) : (
          <div className="text-center py-16 text-gray-400">Aucun résultat pour ces critères.</div>
        )}

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="flex items-center justify-center gap-3">
            <button
              onClick={() => setPage((p) => Math.max(1, p - 1))}
              disabled={page === 1}
              className="px-4 py-2 rounded-xl text-sm font-medium bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 disabled:opacity-30 border-none cursor-pointer transition-colors"
            >
              ← Précédent
            </button>
            <span className="text-sm text-gray-500">Page {page}/{totalPages}</span>
            <button
              onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
              disabled={page === totalPages}
              className="px-4 py-2 rounded-xl text-sm font-medium bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 disabled:opacity-30 border-none cursor-pointer transition-colors"
            >
              Suivant →
            </button>
          </div>
        )}
      </div>
    </DashboardLayout>
  );
}
