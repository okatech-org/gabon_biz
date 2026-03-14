'use client';

import React from 'react';
import RatingStars from '@/components/ui/RatingStars';
import { type Solution, PRICING_CONFIG, MATURITE_CONFIG } from '@/lib/mock/innovation-data';

interface CompareTableProps {
  solutions: Solution[];
  onRemove?: (id: string) => void;
}

const COMPARE_ROWS: { label: string; key: string; render: (s: Solution) => React.ReactNode }[] = [
  { label: 'Catégorie', key: 'cat', render: s => s.categorie },
  { label: 'Sous-catégorie', key: 'sub', render: s => s.sousCategorie },
  { label: 'Startup', key: 'startup', render: s => s.startup.nom },
  { label: 'Maturité', key: 'mat', render: s => {
    const c = MATURITE_CONFIG[s.maturite];
    return <span className="text-xs font-semibold px-2 py-0.5 rounded-full" style={{ color: c.color, background: `${c.color}15` }}>{c.label}</span>;
  }},
  { label: 'Prix', key: 'prix', render: s => {
    const c = PRICING_CONFIG[s.pricingModel];
    return <span className="text-xs font-semibold" style={{ color: c.color }}>{c.label}</span>;
  }},
  { label: 'Prix indicatif', key: 'prixind', render: s => <span className="text-xs">{s.prixIndicatif}</span> },
  { label: 'Note', key: 'rating', render: s => <RatingStars rating={s.rating} size={12} count={s.ratingsCount} /> },
  { label: 'Déploiements', key: 'dep', render: s => s.deploiements },
  { label: 'Démo', key: 'demo', render: s => s.demoDisponible ? '✅' : '❌' },
  { label: 'Badges', key: 'badges', render: s => (
    <div className="flex flex-wrap gap-1">{s.badges.map(b => (
      <span key={b} className="text-[10px] px-1.5 py-0.5 rounded-full bg-violet-50 dark:bg-violet-900/30 text-violet-600 dark:text-violet-400">{b}</span>
    ))}</div>
  )},
  { label: 'Technologies', key: 'tech', render: s => (
    <div className="flex flex-wrap gap-1">{s.technologies.map(t => (
      <span key={t} className="text-[10px] px-1.5 py-0.5 rounded bg-gray-100 dark:bg-gray-800 text-gray-500">{t}</span>
    ))}</div>
  )},
];

export default function CompareTable({ solutions, onRemove }: CompareTableProps) {
  if (solutions.length === 0) {
    return (
      <div className="text-center py-16">
        <p className="text-lg text-gray-400 dark:text-gray-500 mb-2">Aucune solution à comparer</p>
        <p className="text-sm text-gray-400">Sélectionnez 2 à 4 solutions depuis le catalogue</p>
      </div>
    );
  }

  return (
    <div className="overflow-x-auto rounded-2xl border border-gray-200 dark:border-gray-800">
      <table className="w-full border-collapse">
        <thead>
          <tr>
            <th className="text-left p-4 bg-gray-100 dark:bg-gray-800/50 text-xs font-semibold text-gray-500 uppercase tracking-wider sticky left-0 min-w-[140px]">
              Critère
            </th>
            {solutions.map(s => (
              <th key={s.id} className="p-4 bg-gray-100 dark:bg-gray-800/50 text-center min-w-[200px]">
                <div className="flex flex-col items-center gap-1">
                  <span className="text-sm font-bold text-gray-900 dark:text-white">{s.nom}</span>
                  <span className="text-xs text-gray-400">{s.startup.nom}</span>
                  {onRemove && (
                    <button onClick={() => onRemove(s.id)} className="text-xs text-red-400 hover:text-red-500 bg-transparent border-none cursor-pointer mt-1">
                      ✕ Retirer
                    </button>
                  )}
                </div>
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {COMPARE_ROWS.map((row, i) => (
            <tr key={row.key} className={i % 2 === 0 ? 'bg-white dark:bg-gray-900/30' : 'bg-gray-100/50 dark:bg-gray-800/20'}>
              <td className="p-3 text-xs font-semibold text-gray-500 dark:text-gray-400 sticky left-0 bg-inherit">
                {row.label}
              </td>
              {solutions.map(s => (
                <td key={s.id} className="p-3 text-center text-sm text-gray-700 dark:text-gray-300">
                  {row.render(s)}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
