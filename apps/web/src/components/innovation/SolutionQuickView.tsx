'use client';

import React from 'react';
import RatingStars from '@/components/ui/RatingStars';
import { type Solution, PRICING_CONFIG, MATURITE_CONFIG } from '@/lib/mock/innovation-data';

interface SolutionQuickViewProps {
  solution: Solution;
  onClose: () => void;
  onViewDetail: (id: string) => void;
}

export default function SolutionQuickView({ solution: s, onClose, onViewDetail }: SolutionQuickViewProps) {
  const pricingConf = PRICING_CONFIG[s.pricingModel];
  const maturiteConf = MATURITE_CONFIG[s.maturite];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4" onClick={onClose}>
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" />

      {/* Modal */}
      <div className="relative bg-white dark:bg-gray-900 rounded-3xl shadow-2xl max-w-lg w-full max-h-[80vh] overflow-y-auto p-6" onClick={e => e.stopPropagation()}>
        {/* Close */}
        <button onClick={onClose} className="absolute top-4 right-4 w-8 h-8 rounded-full bg-gray-100 dark:bg-gray-800 text-gray-500 hover:text-gray-700 dark:hover:text-gray-300 border-none cursor-pointer flex items-center justify-center text-lg">×</button>

        {/* Header */}
        <div className="flex items-center gap-2 mb-1">
          <span className="text-xs font-semibold px-2.5 py-1 rounded-full" style={{ color: pricingConf.color, background: pricingConf.bg }}>{pricingConf.label}</span>
          <span className="text-xs font-medium px-2 py-0.5 rounded-full" style={{ color: maturiteConf.color, background: `${maturiteConf.color}15` }}>{maturiteConf.label}</span>
        </div>

        <h2 className="text-xl font-bold text-gray-900 dark:text-white mt-3 mb-1">{s.nom}</h2>
        <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">par {s.startup.nom}</p>

        {/* Rating */}
        <div className="flex items-center gap-3 mb-4">
          <RatingStars rating={s.rating} count={s.ratingsCount} />
          <span className="text-xs text-gray-400">•</span>
          <span className="text-xs text-gray-500">{s.deploiements} déploiements</span>
        </div>

        {/* Description */}
        <p className="text-sm text-gray-700 dark:text-gray-300 leading-relaxed mb-5">{s.description}</p>

        {/* Features */}
        <div className="mb-5">
          <h4 className="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-2">Fonctionnalités</h4>
          <ul className="space-y-1.5">
            {s.fonctionnalites.map(f => (
              <li key={f} className="flex items-start gap-2 text-sm text-gray-700 dark:text-gray-300">
                <span className="text-violet-500 mt-0.5">✓</span> {f}
              </li>
            ))}
          </ul>
        </div>

        {/* Technologies */}
        <div className="mb-5">
          <h4 className="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-2">Technologies</h4>
          <div className="flex flex-wrap gap-1.5">
            {s.technologies.map(t => (
              <span key={t} className="text-xs px-2.5 py-1 rounded-lg bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400">{t}</span>
            ))}
          </div>
        </div>

        {/* Badges */}
        <div className="flex flex-wrap gap-1.5 mb-5">
          {s.badges.map(b => (
            <span key={b} className="text-xs font-medium px-2.5 py-1 rounded-full bg-violet-50 dark:bg-violet-900/30 text-violet-600 dark:text-violet-400">{b}</span>
          ))}
        </div>

        {/* Pricing */}
        <div className="p-3 rounded-xl bg-gray-50 dark:bg-gray-800/50 mb-5">
          <span className="text-xs text-gray-400">💰 Prix indicatif</span>
          <p className="text-sm font-semibold text-gray-900 dark:text-white mt-0.5">{s.prixIndicatif}</p>
        </div>

        {/* Actions */}
        <div className="flex gap-3">
          <button onClick={() => onViewDetail(s.id)}
            className="flex-1 py-2.5 rounded-xl bg-linear-to-r from-violet-600 to-indigo-600 text-white text-sm font-semibold border-none cursor-pointer hover:opacity-90 transition-opacity">
            Voir la fiche complète
          </button>
          {s.demoDisponible && (
            <button className="px-5 py-2.5 rounded-xl bg-violet-50 dark:bg-violet-900/30 text-violet-600 dark:text-violet-400 text-sm font-semibold border-none cursor-pointer hover:bg-violet-100 dark:hover:bg-violet-900/50 transition-colors">
              Démo
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
