'use client';

import React, { useState, useMemo } from 'react';
import { Grid3X3, Search } from 'lucide-react';
import StartupProfileCard from '@/components/incubateur/StartupProfileCard';
import { ALL_STARTUPS_SING } from '@/lib/mock/incubateur-startups';
import { PORTFOLIO_FILTERS } from '@/lib/mock/incubateur-data';

export default function StartupsPage() {
  const [query, setQuery] = useState('');
  const [sector, setSector] = useState('all');
  const [tier, setTier] = useState('all');
  const [sortBy, setSortBy] = useState('score');

  const filtered = useMemo(() => {
    let list = [...ALL_STARTUPS_SING];
    if (sector !== 'all') list = list.filter((s) => s.secteur === sector);
    if (tier !== 'all') list = list.filter((s) => s.tier === tier);
    if (query)
      list = list.filter(
        (s) =>
          s.nom.toLowerCase().includes(query.toLowerCase()) ||
          s.programmeRaw.toLowerCase().includes(query.toLowerCase()) ||
          s.secteurRaw.toLowerCase().includes(query.toLowerCase()),
      );
    if (sortBy === 'score') list.sort((a, b) => b.score - a.score);
    else if (sortBy === 'emplois') list.sort((a, b) => b.emplois - a.emplois);
    else if (sortBy === 'nom') list.sort((a, b) => a.nom.localeCompare(b.nom));
    else if (sortBy === 'num') list.sort((a, b) => a.num - b.num);
    return list;
  }, [query, sector, tier, sortBy]);

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 rounded-xl bg-linear-to-br from-amber-400 to-orange-500 flex items-center justify-center text-white">
          <Grid3X3 size={18} />
        </div>
        <div>
          <h1 className="text-xl font-black text-gray-900 dark:text-white">Portfolio Startups SING</h1>
          <p className="text-sm text-gray-500">
            {ALL_STARTUPS_SING.length} startups incubées · {ALL_STARTUPS_SING.filter(s => s.actif).length} actives · {ALL_STARTUPS_SING.reduce((sum, s) => sum + s.emplois, 0)} emplois
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
            placeholder="Rechercher une startup, programme, secteur..."
            className="w-full pl-9 pr-4 py-2.5 rounded-xl border border-gray-200 dark:border-white/10 bg-white dark:bg-white/5 text-sm text-gray-900 dark:text-white"
          />
        </div>
        <select
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value)}
          className="px-4 py-2.5 rounded-xl border border-gray-200 dark:border-white/10 bg-white dark:bg-white/5 text-sm text-gray-900 dark:text-white"
        >
          <option value="score">Tri: Score</option>
          <option value="emplois">Tri: Emplois</option>
          <option value="nom">Tri: Nom A→Z</option>
          <option value="num">Tri: N° PDF</option>
        </select>
      </div>

      {/* Tier filters */}
      <div className="flex flex-wrap gap-2">
        {[
          { label: `Tous (${ALL_STARTUPS_SING.length})`, value: 'all' },
          { label: `⭐ Top (${ALL_STARTUPS_SING.filter(s => s.tier === 'TOP').length})`, value: 'TOP' },
          { label: `✓ Actifs (${ALL_STARTUPS_SING.filter(s => s.tier === 'ACTIVE').length})`, value: 'ACTIVE' },
          { label: `○ Inactifs (${ALL_STARTUPS_SING.filter(s => s.tier === 'INACTIVE').length})`, value: 'INACTIVE' },
        ].map((f) => (
          <button
            key={f.value}
            onClick={() => setTier(f.value)}
            className={`text-xs font-semibold px-3 py-1.5 rounded-full transition-all ${tier === f.value ? 'bg-pink-500 text-white' : 'bg-white dark:bg-white/5 text-gray-600 dark:text-gray-400 border border-gray-200 dark:border-white/10'}`}
          >
            {f.label}
          </button>
        ))}
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
