'use client';

import React, { useState } from 'react';
import { PageHeader } from '@/components/ui';
import StartupCard from '@/components/innovation/StartupCard';
import SearchBar from '@/components/innovation/SearchBar';
import { STARTUPS_VEDETTES, MATURITE_CONFIG, type Maturite } from '@/lib/mock/innovation-data';

export default function StartupsPage() {
  const [search, setSearch] = useState('');
  const [stadeFilter, setStadeFilter] = useState<Maturite | 'all'>('all');

  const filtered = STARTUPS_VEDETTES.filter(st => {
    const matchSearch = !search || st.nom.toLowerCase().includes(search.toLowerCase()) || st.secteur.toLowerCase().includes(search.toLowerCase());
    const matchStade = stadeFilter === 'all' || st.stade === stadeFilter;
    return matchSearch && matchStade;
  });

  return (
    <div>
      <PageHeader title="Catalogue Startups" subtitle="L'écosystème tech gabonais" />

      <div className="flex items-center gap-3 mb-6 flex-wrap">
        <div className="flex-1 min-w-[200px]">
          <SearchBar value={search} onChange={setSearch} placeholder="Rechercher une startup..." />
        </div>
        <div className="flex gap-2">
          <button onClick={() => setStadeFilter('all')}
            className={`text-xs px-3 py-1.5 rounded-full border-none cursor-pointer ${stadeFilter === 'all' ? 'bg-violet-600 text-white' : 'bg-gray-100 dark:bg-gray-800 text-gray-500'}`}>
            Tous
          </button>
          {(Object.keys(MATURITE_CONFIG) as Maturite[]).map(m => (
            <button key={m} onClick={() => setStadeFilter(m)}
              className={`text-xs px-3 py-1.5 rounded-full border-none cursor-pointer ${stadeFilter === m ? 'bg-violet-600 text-white' : 'bg-gray-100 dark:bg-gray-800 text-gray-500'}`}>
              {MATURITE_CONFIG[m].label}
            </button>
          ))}
        </div>
      </div>

      <p className="text-sm text-gray-500 mb-4">{filtered.length} startup{filtered.length > 1 ? 's' : ''}</p>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {filtered.map(st => <StartupCard key={st.id} startup={st} />)}
      </div>

      {filtered.length === 0 && (
        <div className="text-center py-16 text-gray-400">Aucune startup trouvée</div>
      )}
    </div>
  );
}
