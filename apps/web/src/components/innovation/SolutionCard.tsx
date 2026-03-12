'use client';

import React from 'react';
import Link from 'next/link';
import RatingStars from '@/components/ui/RatingStars';
import { type Solution, PRICING_CONFIG, MATURITE_CONFIG } from '@/lib/mock/innovation-data';

interface SolutionCardProps {
  solution: Solution;
  variant?: 'grid' | 'list';
  onQuickView?: (id: string) => void;
  onCompare?: (id: string) => void;
  isCompareSelected?: boolean;
  isPublic?: boolean;
}

export default function SolutionCard({
  solution: s,
  variant = 'grid',
  onQuickView,
  onCompare,
  isCompareSelected = false,
  isPublic = false,
}: SolutionCardProps) {
  const pricingConf = PRICING_CONFIG[s.pricingModel];
  const maturiteConf = MATURITE_CONFIG[s.maturite];
  const href = isPublic ? '#' : `/dashboard/innovation/${s.id}`;

  if (variant === 'list') {
    return (
      <div className="group relative flex items-start gap-5 p-5 rounded-2xl border border-gray-100 dark:border-gray-800 bg-white dark:bg-gray-900/60 hover:shadow-lg hover:border-violet-300 dark:hover:border-violet-700 transition-all duration-200">
        {/* Avatar */}
        <div className="w-12 h-12 rounded-xl bg-linear-to-br from-violet-500 to-indigo-600 flex items-center justify-center text-white text-lg font-bold shrink-0">
          {s.startup.nom.charAt(0)}
        </div>

        {/* Content */}
        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between gap-3 mb-1">
            <div>
              <Link href={href} className="text-base font-semibold text-gray-900 dark:text-white hover:text-violet-600 dark:hover:text-violet-400 no-underline">
                {s.nom}
              </Link>
              <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">{s.startup.nom} • {s.categorie}</p>
            </div>
            <span className="text-xs font-semibold px-2.5 py-1 rounded-md shrink-0" style={{ color: pricingConf.color, background: pricingConf.bg }}>
              {pricingConf.label}
            </span>
          </div>
          <p className="text-sm text-gray-600 dark:text-gray-400 line-clamp-1 mb-2">{s.descriptionCourte}</p>
          <div className="flex items-center gap-4 flex-wrap">
            <RatingStars rating={s.rating} size={14} count={s.ratingsCount} />
            <span className="text-xs text-gray-400">{s.deploiements} déploiements</span>
            <span className="text-xs font-medium px-2 py-0.5 rounded-full" style={{ color: maturiteConf.color, background: `${maturiteConf.color}15` }}>
              {maturiteConf.label}
            </span>
          </div>
        </div>

        {/* Actions */}
        {!isPublic && (
          <div className="flex flex-col gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
            {onQuickView && (
              <button onClick={(e) => { e.preventDefault(); onQuickView(s.id); }}
                className="text-xs px-3 py-1.5 rounded-lg bg-violet-50 dark:bg-violet-900/30 text-violet-600 dark:text-violet-400 hover:bg-violet-100 dark:hover:bg-violet-900/50 border-none cursor-pointer transition-colors">
                👁 Aperçu
              </button>
            )}
            {onCompare && (
              <button onClick={(e) => { e.preventDefault(); onCompare(s.id); }}
                className={`text-xs px-3 py-1.5 rounded-lg border-none cursor-pointer transition-colors ${isCompareSelected ? 'bg-violet-600 text-white' : 'bg-gray-50 dark:bg-gray-800 text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700'}`}>
                ⚖ Comparer
              </button>
            )}
          </div>
        )}
      </div>
    );
  }

  // Grid variant
  return (
    <div className="group relative flex flex-col p-5 rounded-2xl border border-gray-100 dark:border-gray-800 bg-white dark:bg-gray-900/60 hover:shadow-xl hover:shadow-violet-500/5 hover:border-violet-300 dark:hover:border-violet-700 transition-all duration-300">
      {/* Top row */}
      <div className="flex items-start justify-between gap-2 mb-3">
        <span className="text-xs font-medium px-2.5 py-1 rounded-full" style={{ color: PRICING_CONFIG[s.pricingModel].color, background: PRICING_CONFIG[s.pricingModel].bg }}>
          {PRICING_CONFIG[s.pricingModel].label}
        </span>
        <span className="text-xs font-medium px-2 py-0.5 rounded-full" style={{ color: maturiteConf.color, background: `${maturiteConf.color}15` }}>
          {maturiteConf.label}
        </span>
      </div>

      {/* Title */}
      <Link href={href} className="no-underline">
        <h3 className="text-base font-bold text-gray-900 dark:text-white group-hover:text-violet-600 dark:group-hover:text-violet-400 transition-colors mb-0.5">
          {s.nom}
        </h3>
      </Link>
      <p className="text-xs text-gray-500 dark:text-gray-400 mb-2">par {s.startup.nom}</p>

      {/* Description */}
      <p className="text-sm text-gray-600 dark:text-gray-400 line-clamp-2 mb-3 flex-1">{s.descriptionCourte}</p>

      {/* Rating + deployments */}
      <div className="flex items-center justify-between mb-3">
        <RatingStars rating={s.rating} size={14} count={s.ratingsCount} />
        <span className="text-xs text-gray-400 dark:text-gray-500">{s.deploiements} dép.</span>
      </div>

      {/* Badges */}
      <div className="flex flex-wrap gap-1.5 mb-3">
        {s.badges.slice(0, 3).map(badge => (
          <span key={badge} className="text-[10px] font-medium px-2 py-0.5 rounded-full bg-violet-50 dark:bg-violet-900/30 text-violet-600 dark:text-violet-400">
            {badge}
          </span>
        ))}
      </div>

      {/* Actions */}
      {!isPublic && (
        <div className="flex gap-2 pt-3 border-t border-gray-50 dark:border-gray-800">
          {onQuickView && (
            <button onClick={(e) => { e.preventDefault(); onQuickView(s.id); }}
              className="flex-1 text-xs py-2 rounded-lg bg-violet-50 dark:bg-violet-900/30 text-violet-600 dark:text-violet-400 hover:bg-violet-100 dark:hover:bg-violet-900/50 border-none cursor-pointer transition-colors font-medium">
              👁 Aperçu
            </button>
          )}
          {onCompare && (
            <button onClick={(e) => { e.preventDefault(); onCompare(s.id); }}
              className={`flex-1 text-xs py-2 rounded-lg border-none cursor-pointer transition-colors font-medium ${isCompareSelected ? 'bg-violet-600 text-white' : 'bg-gray-50 dark:bg-gray-800 text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700'}`}>
              ⚖ Comparer
            </button>
          )}
        </div>
      )}
    </div>
  );
}
