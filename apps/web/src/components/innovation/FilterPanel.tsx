'use client';

import React from 'react';
import { type SolutionCategorie, type PricingModel, type Maturite, CATEGORIES_CONFIG, PRICING_CONFIG, MATURITE_CONFIG } from '@/lib/mock/innovation-data';

interface FilterPanelProps {
  activeCategorie: SolutionCategorie | 'all';
  onCategorieChange: (cat: SolutionCategorie | 'all') => void;
  activePricing: PricingModel | 'all';
  onPricingChange: (p: PricingModel | 'all') => void;
  activeMaturite: Maturite | 'all';
  onMaturiteChange: (m: Maturite | 'all') => void;
  minRating: number;
  onMinRatingChange: (r: number) => void;
  categoryCounts?: Record<string, number>;
}

function Chip({ label, active, color, count, onClick }: { label: string; active: boolean; color?: string; count?: number; onClick: () => void }) {
  return (
    <button
      onClick={onClick}
      className={`inline-flex items-center gap-1.5 text-xs font-medium px-3 py-1.5 rounded-full border-none cursor-pointer transition-all duration-200 ${
        active
          ? 'text-white shadow-md'
          : 'bg-gray-50 dark:bg-gray-800 text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700'
      }`}
      style={active ? { background: color || '#8B5CF6' } : undefined}
    >
      {label}
      {count !== undefined && (
        <span className={`text-[10px] px-1.5 py-0.5 rounded-full ${active ? 'bg-white/20 text-white' : 'bg-gray-200 dark:bg-gray-700 text-gray-500 dark:text-gray-400'}`}>
          {count}
        </span>
      )}
    </button>
  );
}

export default function FilterPanel({
  activeCategorie, onCategorieChange,
  activePricing, onPricingChange,
  activeMaturite, onMaturiteChange,
  minRating, onMinRatingChange,
  categoryCounts,
}: FilterPanelProps) {
  return (
    <div className="space-y-4">
      {/* Categories */}
      <div>
        <label className="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-2 block">Catégorie</label>
        <div className="flex flex-wrap gap-2">
          <Chip label="Tout" active={activeCategorie === 'all'} color="#6b7280" count={categoryCounts ? Object.values(categoryCounts).reduce((a, b) => a + b, 0) : undefined} onClick={() => onCategorieChange('all')} />
          {CATEGORIES_CONFIG.map(c => (
            <Chip key={c.value} label={c.label} active={activeCategorie === c.value} color={c.color} count={categoryCounts?.[c.value]} onClick={() => onCategorieChange(c.value)} />
          ))}
        </div>
      </div>

      {/* Pricing */}
      <div>
        <label className="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-2 block">Modèle de prix</label>
        <div className="flex flex-wrap gap-2">
          <Chip label="Tous" active={activePricing === 'all'} onClick={() => onPricingChange('all')} />
          {(Object.entries(PRICING_CONFIG) as [PricingModel, typeof PRICING_CONFIG[PricingModel]][]).map(([key, conf]) => (
            <Chip key={key} label={conf.label} active={activePricing === key} color={conf.color} onClick={() => onPricingChange(key)} />
          ))}
        </div>
      </div>

      {/* Maturity */}
      <div>
        <label className="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-2 block">Maturité</label>
        <div className="flex flex-wrap gap-2">
          <Chip label="Tous" active={activeMaturite === 'all'} onClick={() => onMaturiteChange('all')} />
          {(Object.entries(MATURITE_CONFIG) as [Maturite, typeof MATURITE_CONFIG[Maturite]][]).map(([key, conf]) => (
            <Chip key={key} label={conf.label} active={activeMaturite === key} color={conf.color} onClick={() => onMaturiteChange(key)} />
          ))}
        </div>
      </div>

      {/* Rating */}
      <div>
        <label className="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-2 block">Note minimum</label>
        <div className="flex flex-wrap gap-2">
          {[0, 3, 4, 4.5].map(r => (
            <Chip key={r} label={r === 0 ? 'Tout' : `${r}+ ⭐`} active={minRating === r} color="#F59E0B" onClick={() => onMinRatingChange(r)} />
          ))}
        </div>
      </div>
    </div>
  );
}
