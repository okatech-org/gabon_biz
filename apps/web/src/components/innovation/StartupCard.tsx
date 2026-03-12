'use client';

import React from 'react';
import Link from 'next/link';
import { type Startup, MATURITE_CONFIG, getSolutionsByStartup } from '@/lib/mock/innovation-data';

interface StartupCardProps {
  startup: Startup;
  isPublic?: boolean;
}

export default function StartupCard({ startup: st, isPublic = false }: StartupCardProps) {
  const href = isPublic ? '#' : `/dashboard/innovation/startups/${st.id}`;
  const stadeConf = MATURITE_CONFIG[st.stade];
  const solutions = getSolutionsByStartup(st.id);

  const badgeColors: Record<string, string> = {
    'Vérifié KIMBA': '#8B5CF6',
    'Alumni SING': '#8B5CF6',
    'Deal VC (€650K)': '#10B981',
    'Lauréat Moov Africa': '#F59E0B',
    'Leader e-Commerce': '#EC4899',
    'Projet CGI': '#F59E0B',
  };

  const mainBadge = st.badges.find(b => b !== 'Vérifié KIMBA') || st.badges[0];
  const mainBadgeColor = badgeColors[mainBadge] || '#8B5CF6';

  return (
    <div className="group relative flex flex-col p-5 rounded-2xl border border-gray-100 dark:border-gray-800 bg-white dark:bg-gray-900/60 hover:shadow-xl hover:shadow-violet-500/5 hover:border-violet-300 dark:hover:border-violet-700 transition-all duration-300">
      {/* Header */}
      <div className="flex items-start gap-4 mb-4">
        <div className="w-14 h-14 rounded-2xl bg-linear-to-br from-violet-500 to-indigo-600 flex items-center justify-center text-white text-xl font-bold shrink-0">
          {st.nom.charAt(0)}
        </div>
        <div className="flex-1 min-w-0">
          <Link href={href} className="no-underline">
            <h3 className="text-base font-bold text-gray-900 dark:text-white group-hover:text-violet-600 dark:group-hover:text-violet-400 transition-colors truncate">
              {st.nom}
            </h3>
          </Link>
          <p className="text-xs text-gray-500 dark:text-gray-400">
            {st.secteur} • Depuis {st.anneeCreation}
          </p>
        </div>
        <span className="text-xs font-medium px-2 py-0.5 rounded-full shrink-0" style={{ color: stadeConf.color, background: `${stadeConf.color}15` }}>
          {stadeConf.label}
        </span>
      </div>

      {/* Description */}
      <p className="text-sm text-gray-600 dark:text-gray-400 line-clamp-2 mb-4 flex-1">{st.description}</p>

      {/* Metrics */}
      <div className="grid grid-cols-3 gap-2 mb-4">
        {Object.entries(st.metriques).slice(0, 3).map(([key, val]) => (
          <div key={key} className="text-center p-2 rounded-xl bg-gray-50 dark:bg-gray-800/50">
            <div className="text-sm font-bold text-gray-900 dark:text-white">{val}</div>
            <div className="text-[10px] text-gray-400 dark:text-gray-500 capitalize truncate">{key}</div>
          </div>
        ))}
      </div>

      {/* Badges & info */}
      <div className="flex items-center justify-between pt-3 border-t border-gray-50 dark:border-gray-800">
        <span className="text-xs font-semibold px-2.5 py-1 rounded-full" style={{ color: mainBadgeColor, background: `${mainBadgeColor}15` }}>
          {mainBadge}
        </span>
        <div className="flex items-center gap-2 text-xs text-gray-400">
          <span>👥 {st.equipe}</span>
          <span>📦 {solutions.length} solution{solutions.length > 1 ? 's' : ''}</span>
        </div>
      </div>
    </div>
  );
}
