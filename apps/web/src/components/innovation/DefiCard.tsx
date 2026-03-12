'use client';

import React from 'react';
import Link from 'next/link';
import { type Defi } from '@/lib/mock/innovation-data';
import { getDaysUntilDeadline } from '@/lib/mock/innovation-data';

interface DefiCardProps {
  defi: Defi;
  isPublic?: boolean;
}

export default function DefiCard({ defi: d, isPublic = false }: DefiCardProps) {
  const daysLeft = getDaysUntilDeadline(d.deadline);
  const maxDays = 120;
  const progress = Math.max(5, Math.min(100, 100 - (daysLeft / maxDays) * 100));
  const href = isPublic ? '#' : `/dashboard/innovation/defis/${d.id}`;

  const CATEGORY_COLORS: Record<string, string> = {
    FinTech: '#10B981', HealthTech: '#EF4444', AgriTech: '#22C55E',
    GovTech: '#6366F1', LogisTech: '#3B82F6', GreenTech: '#059669',
    'AgriTech / AssurTech': '#8B5CF6',
  };
  const catColor = CATEGORY_COLORS[d.categorie] || '#8B5CF6';

  return (
    <div className="group relative flex flex-col p-5 rounded-2xl border border-gray-100 dark:border-gray-800 bg-white dark:bg-gray-900/60 hover:shadow-xl hover:shadow-violet-500/5 hover:border-violet-300 dark:hover:border-violet-700 transition-all duration-300">
      {/* Top */}
      <div className="flex items-start justify-between gap-2 mb-3">
        <span className="text-xs font-semibold px-2.5 py-1 rounded-full" style={{ color: catColor, background: `${catColor}15` }}>
          {d.categorie}
        </span>
        <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-amber-50 dark:bg-amber-900/30 text-amber-600 dark:text-amber-400">
          {d.budget}
        </span>
      </div>

      {/* Title */}
      <Link href={href} className="no-underline">
        <h3 className="text-base font-bold text-gray-900 dark:text-white group-hover:text-violet-600 dark:group-hover:text-violet-400 transition-colors mb-1">
          {d.titre}
        </h3>
      </Link>
      <p className="text-xs text-gray-500 dark:text-gray-400 mb-2">par {d.emetteur}</p>

      {/* Description */}
      <p className="text-sm text-gray-600 dark:text-gray-400 line-clamp-2 mb-4 flex-1">{d.description}</p>

      {/* Tags */}
      <div className="flex flex-wrap gap-1.5 mb-4">
        {d.tags.map(tag => (
          <span key={tag} className="text-[10px] font-medium px-2 py-0.5 rounded-full bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400">
            {tag}
          </span>
        ))}
      </div>

      {/* Countdown & submissions */}
      <div className="flex items-center justify-between text-xs text-gray-500 dark:text-gray-400 mb-2">
        <span className="flex items-center gap-1.5">
          <span>⏰</span>
          <span className={daysLeft <= 30 ? 'text-red-500 font-semibold' : ''}>
            J-{daysLeft}
          </span>
        </span>
        <span className="flex items-center gap-1.5">
          <span>📩</span> {d.soumissions} soumission{d.soumissions > 1 ? 's' : ''}
        </span>
      </div>

      {/* Progress bar */}
      <div className="w-full h-1.5 rounded-full bg-gray-100 dark:bg-gray-800 overflow-hidden">
        <div
          className="h-full rounded-full transition-all duration-700"
          style={{
            width: `${progress}%`,
            background: daysLeft <= 30 ? '#EF4444' : `linear-gradient(90deg, ${catColor}, #8B5CF6)`,
          }}
        />
      </div>

      {/* Reward */}
      <div className="mt-3 pt-3 border-t border-gray-50 dark:border-gray-800">
        <p className="text-[11px] text-gray-400 dark:text-gray-500 mb-0.5">🏆 Récompense</p>
        <p className="text-xs text-gray-700 dark:text-gray-300 font-medium line-clamp-1">{d.recompense}</p>
      </div>
    </div>
  );
}
