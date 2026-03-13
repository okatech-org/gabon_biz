'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Bell, TrendingUp, TrendingDown, Minus, Filter, Clock } from 'lucide-react';
import {
  VEILLE_NEWS,
  VEILLE_TREND_INDICATORS,
  VEILLE_ALERT_SECTORS,
  VEILLE_ALERT_TYPES,
} from '@/lib/mock/investir-data';
import type { VeilleImpact } from '@/lib/mock/investir-data';

const IMPACT_CONFIG: Record<
  VeilleImpact,
  { label: string; color: string; icon: typeof TrendingUp }
> = {
  positif: { label: 'Positif', color: '#10B981', icon: TrendingUp },
  neutre: { label: 'Neutre', color: '#6B7280', icon: Minus },
  negatif: { label: 'Négatif', color: '#EF4444', icon: TrendingDown },
};

const TREND_ICONS = { up: TrendingUp, down: TrendingDown, stable: Minus };

export default function VeillePage() {
  const [filter, setFilter] = useState('all');
  const filtered =
    filter === 'all' ? VEILLE_NEWS : VEILLE_NEWS.filter((n) => n.category === filter);

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 rounded-xl bg-linear-to-br from-red-500 to-rose-600 flex items-center justify-center text-white">
          <Bell size={18} />
        </div>
        <div>
          <h1 className="text-xl font-black text-gray-900 dark:text-white">Veille & Alertes</h1>
          <p className="text-sm text-gray-500">
            Restez informé des opportunités et évolutions de l&apos;écosystème
          </p>
        </div>
      </div>

      {/* Trend Indicators */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
        {VEILLE_TREND_INDICATORS.map((t) => {
          const TIcon = TREND_ICONS[t.trend];
          return (
            <div
              key={t.label}
              className="bg-white dark:bg-white/5 rounded-xl border border-gray-200/60 dark:border-white/8 p-4"
            >
              <div className="flex items-center gap-2 mb-1">
                <TIcon size={12} style={{ color: t.color }} />
                <span className="text-[10px] font-semibold text-gray-500 uppercase tracking-wider">
                  {t.label}
                </span>
              </div>
              <p className="text-sm font-bold" style={{ color: t.color }}>
                {t.value}
              </p>
            </div>
          );
        })}
      </div>

      {/* Category filters */}
      <div className="flex flex-wrap gap-2">
        {['all', ...new Set(VEILLE_NEWS.map((n) => n.category))].map((c) => (
          <button
            key={c}
            onClick={() => setFilter(c)}
            className={`text-xs font-semibold px-3 py-1.5 rounded-full transition-all ${filter === c ? 'bg-teal-500 text-white' : 'bg-white dark:bg-white/5 text-gray-600 dark:text-gray-400 border border-gray-200 dark:border-white/10'}`}
          >
            {c === 'all' ? 'Tout' : c}
          </button>
        ))}
      </div>

      {/* News feed */}
      <div className="space-y-3">
        {filtered.map((n, i) => {
          const imp = IMPACT_CONFIG[n.impact];
          const ImpIcon = imp.icon;
          return (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.05 }}
              className="bg-white dark:bg-white/5 rounded-xl border border-gray-200/60 dark:border-white/8 p-4 hover:shadow-md transition-all"
            >
              <div className="flex items-start justify-between mb-2">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-gray-100 dark:bg-white/6 text-gray-600 dark:text-gray-300">
                      {n.category}
                    </span>
                    <span className="text-[10px] text-gray-400 flex items-center gap-1">
                      <Clock size={10} /> {new Date(n.date).toLocaleDateString('fr-FR')}
                    </span>
                  </div>
                  <h3 className="text-sm font-bold text-gray-900 dark:text-white">{n.title}</h3>
                </div>
                <span
                  className="flex items-center gap-1 text-[10px] font-bold px-2 py-0.5 rounded-full shrink-0 ml-3"
                  style={{ background: `${imp.color}15`, color: imp.color }}
                >
                  <ImpIcon size={10} /> {imp.label}
                </span>
              </div>
              <p className="text-xs text-gray-600 dark:text-gray-400">{n.summary}</p>
              <p className="text-[10px] text-gray-400 mt-2">Source : {n.source}</p>
            </motion.div>
          );
        })}
      </div>

      {/* Alert config */}
      <div className="bg-gray-50 dark:bg-white/3 rounded-2xl border border-gray-200/60 dark:border-white/8 p-5">
        <h2 className="text-sm font-bold text-gray-900 dark:text-white mb-3 flex items-center gap-2">
          <Filter size={14} /> Configurer mes alertes
        </h2>
        <div className="space-y-3">
          <div>
            <p className="text-xs font-semibold text-gray-500 mb-2">Secteurs surveillés</p>
            <div className="flex flex-wrap gap-2">
              {VEILLE_ALERT_SECTORS.map((s) => (
                <label
                  key={s}
                  className="flex items-center gap-1.5 text-xs text-gray-600 dark:text-gray-400 cursor-pointer"
                >
                  <input
                    type="checkbox"
                    defaultChecked={s === 'FinTech' || s === 'GovTech'}
                    className="rounded border-gray-300 text-teal-500"
                  />{' '}
                  {s}
                </label>
              ))}
            </div>
          </div>
          <div>
            <p className="text-xs font-semibold text-gray-500 mb-2">Types d&apos;alerte</p>
            <div className="flex flex-wrap gap-2">
              {VEILLE_ALERT_TYPES.map((t) => (
                <label
                  key={t}
                  className="flex items-center gap-1.5 text-xs text-gray-600 dark:text-gray-400 cursor-pointer"
                >
                  <input
                    type="checkbox"
                    defaultChecked
                    className="rounded border-gray-300 text-teal-500"
                  />{' '}
                  {t}
                </label>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
