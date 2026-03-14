'use client';

import { motion } from 'framer-motion';
import { DIGITAL_ECOSYSTEM_STATS } from '@/lib/annuaire-data';

interface SectorDistributionProps {
  selectedCategory?: string;
  onSelectCategory?: (cat: string | undefined) => void;
}

export default function SectorDistribution({ selectedCategory, onSelectCategory }: SectorDistributionProps) {
  const cats = DIGITAL_ECOSYSTEM_STATS.categories;

  return (
    <div>
      <div className="flex flex-wrap gap-2 justify-center">
        {/* All button */}
        <button
          onClick={() => onSelectCategory?.(undefined)}
          className={`px-4 py-2 rounded-full text-sm font-semibold border-none cursor-pointer transition-all duration-200
            ${!selectedCategory
              ? 'bg-emerald-500 text-white'
              : 'bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-700'
            }`}
        >
          Toutes ({DIGITAL_ECOSYSTEM_STATS.totalStartups})
        </button>

        {cats.map((cat, i) => (
          <motion.button
            key={cat.name}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: i * 0.03 }}
            onClick={() => onSelectCategory?.(selectedCategory === cat.name ? undefined : cat.name)}
            className={`px-4 py-2 rounded-full text-sm font-semibold border-none cursor-pointer transition-all duration-200
              ${selectedCategory === cat.name
                ? 'text-white'
                : 'text-gray-600 dark:text-gray-400 hover:opacity-80'
              }`}
            style={
              selectedCategory === cat.name
                ? { background: cat.color }
                : { background: `${cat.color}15`, color: cat.color }
            }
          >
            {cat.name} ({cat.count})
          </motion.button>
        ))}
      </div>
    </div>
  );
}
