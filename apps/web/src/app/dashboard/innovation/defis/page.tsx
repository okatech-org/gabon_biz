'use client';

import React, { useState } from 'react';
import { Trophy } from 'lucide-react';
import { PageHeader } from '@/components/ui';
import DefiCard from '@/components/innovation/DefiCard';
import { DEFIS_KIMBA } from '@/lib/mock/innovation-data';

export default function DefisPage() {
  const [filter, setFilter] = useState('all');
  const defis = filter === 'all' ? DEFIS_KIMBA : DEFIS_KIMBA.filter(d => d.categorie === filter);
  const totalSoumissions = DEFIS_KIMBA.reduce((s, d) => s + d.soumissions, 0);

  return (
    <div>
      <PageHeader title="Défis d'Innovation" subtitle="Relevez les défis des entreprises et institutions gabonaises" />

      {/* Stats */}
      <div className="flex items-center gap-4 mb-6 flex-wrap">
        <div className="px-4 py-2 rounded-xl bg-green-50 dark:bg-green-900/20 text-green-600 text-sm font-semibold flex items-center gap-2">
          <Trophy size={16} /> {DEFIS_KIMBA.filter(d => d.statut === 'ouvert').length} défis ouverts
        </div>
        <div className="px-4 py-2 rounded-xl bg-gray-100 dark:bg-gray-800 text-gray-500 text-sm">
          {totalSoumissions} soumissions totales
        </div>
      </div>

      {/* Category filter */}
      <div className="flex flex-wrap gap-2 mb-8">
        <button onClick={() => setFilter('all')}
          className={`text-xs font-medium px-3 py-1.5 rounded-full border-none cursor-pointer transition-colors ${filter === 'all' ? 'bg-violet-600 text-white' : 'bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400'}`}>
          Tous
        </button>
        {['FinTech', 'GreenTech', 'GovTech', 'LogisTech', 'AgriTech / AssurTech'].map(cat => (
          <button key={cat} onClick={() => setFilter(cat)}
            className={`text-xs font-medium px-3 py-1.5 rounded-full border-none cursor-pointer transition-colors ${filter === cat ? 'bg-violet-600 text-white' : 'bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400'}`}>
            {cat}
          </button>
        ))}
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {defis.map(defi => <DefiCard key={defi.id} defi={defi} />)}
      </div>

      {defis.length === 0 && (
        <div className="text-center py-16 text-gray-400">Aucun défi dans cette catégorie</div>
      )}
    </div>
  );
}
