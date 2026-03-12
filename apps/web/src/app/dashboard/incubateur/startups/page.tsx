'use client';

import React, { useState, useMemo } from 'react';
import { Grid3X3, Search, List } from 'lucide-react';
import StartupProfileCard from '@/components/incubateur/StartupProfileCard';
import { STARTUPS_PORTFOLIO } from '@/lib/mock/incubateur-startups';
import { PORTFOLIO_FILTERS } from '@/lib/mock/incubateur-data';

export default function StartupsPage() {
  const [query, setQuery] = useState('');
  const [sector, setSector] = useState('all');
  const [sortBy, setSortBy] = useState('name');

  const filtered = useMemo(() => {
    let list = [...STARTUPS_PORTFOLIO];
    if (sector !== 'all') list = list.filter((s) => s.sector === sector);
    if (query)
      list = list.filter(
        (s) =>
          s.name.toLowerCase().includes(query.toLowerCase()) ||
          s.tagline.toLowerCase().includes(query.toLowerCase()),
      );
    if (sortBy === 'name') list.sort((a, b) => a.name.localeCompare(b.name));
    else if (sortBy === 'year') list.sort((a, b) => b.year - a.year);
    else if (sortBy === 'funding')
      list.sort(
        (a, b) =>
          parseInt(b.fundingRaised.replace(/\D/g, '') || '0') -
          parseInt(a.fundingRaised.replace(/\D/g, '') || '0'),
      );
    return list;
  }, [query, sector, sortBy]);

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-amber-400 to-orange-500 flex items-center justify-center text-white">
          <Grid3X3 size={18} />
        </div>
        <div>
          <h1 className="text-xl font-black text-gray-900 dark:text-white">Portfolio Startups</h1>
          <p className="text-sm text-gray-500">
            {STARTUPS_PORTFOLIO.length} startups incubées par la SING
          </p>
        </div>
      </div>

      {/* Search + Sort */}
      <div className="flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1">
          <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Rechercher une startup..."
            className="w-full pl-9 pr-4 py-2.5 rounded-xl border border-gray-200 dark:border-white/10 bg-white dark:bg-white/5 text-sm text-gray-900 dark:text-white"
          />
        </div>
        <select
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value)}
          className="px-4 py-2.5 rounded-xl border border-gray-200 dark:border-white/10 bg-white dark:bg-white/5 text-sm text-gray-900 dark:text-white"
        >
          <option value="name">Tri: Nom</option>
          <option value="year">Tri: Année</option>
          <option value="funding">Tri: Levée de fonds</option>
        </select>
      </div>

      {/* Sector filters */}
      <div className="flex flex-wrap gap-2">
        {PORTFOLIO_FILTERS.map((f) => (
          <button
            key={f.value}
            onClick={() => setSector(f.value)}
            className={`text-xs font-semibold px-3 py-1.5 rounded-full transition-all ${sector === f.value ? 'bg-pink-500 text-white' : 'bg-white dark:bg-white/5 text-gray-600 dark:text-gray-400 border border-gray-200 dark:border-white/10'}`}
          >
            {f.label} <span className="text-[10px] opacity-60">{f.count}</span>
          </button>
        ))}
      </div>

      {/* Results */}
      <div className="text-sm text-gray-500 dark:text-gray-400">
        {filtered.length} résultat{filtered.length > 1 ? 's' : ''}
      </div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {filtered.map((s, i) => (
          <StartupProfileCard key={s.id} startup={s} index={i} />
        ))}
      </div>
    </div>
  );
}
