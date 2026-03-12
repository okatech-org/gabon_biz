'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { BarChart3, TrendingUp } from 'lucide-react';
import { ANALYTICS_CHARTS } from '@/lib/mock/incubateur-startups';
import ImpactDashboard from '@/components/incubateur/ImpactDashboard';

export default function AnalyticsPage() {
  const maxStartups = Math.max(...ANALYTICS_CHARTS.evolution.map((d) => d.startups));
  const maxFunding = Math.max(...ANALYTICS_CHARTS.funding.map((d) => d.amount));
  const totalSectors = ANALYTICS_CHARTS.sectors.reduce((s, d) => s + d.value, 0);

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-teal-500 to-cyan-600 flex items-center justify-center text-white">
          <BarChart3 size={18} />
        </div>
        <div>
          <h1 className="text-xl font-black text-gray-900 dark:text-white">Analytics & Impact</h1>
          <p className="text-sm text-gray-500">KPIs de l&apos;écosystème SING en temps réel</p>
        </div>
      </div>

      {/* Impact counters */}
      <ImpactDashboard />

      {/* Evolution chart */}
      <div className="bg-white dark:bg-white/5 rounded-2xl border border-gray-200/60 dark:border-white/8 p-5">
        <h3 className="text-sm font-bold text-gray-900 dark:text-white mb-4">
          Évolution des startups incubées (2018-2026)
        </h3>
        <div className="flex items-end gap-2 h-40">
          {ANALYTICS_CHARTS.evolution.map((d, i) => (
            <div key={d.year} className="flex-1 flex flex-col items-center gap-1">
              <span className="text-[10px] font-bold text-gray-900 dark:text-white">
                {d.startups}
              </span>
              <motion.div
                initial={{ height: 0 }}
                whileInView={{ height: `${(d.startups / maxStartups) * 100}%` }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08, duration: 0.6 }}
                className="w-full rounded-t-md bg-gradient-to-t from-pink-500 to-fuchsia-500"
                style={{ minHeight: 4 }}
              />
              <span className="text-[9px] text-gray-400">{d.year}</span>
            </div>
          ))}
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-4">
        {/* Sector distribution */}
        <div className="bg-white dark:bg-white/5 rounded-2xl border border-gray-200/60 dark:border-white/8 p-5">
          <h3 className="text-sm font-bold text-gray-900 dark:text-white mb-4">
            Répartition par secteur
          </h3>
          <div className="space-y-2">
            {ANALYTICS_CHARTS.sectors.map((s) => (
              <div key={s.name} className="flex items-center gap-3">
                <span className="text-xs text-gray-600 dark:text-gray-400 w-20 shrink-0">
                  {s.name}
                </span>
                <div className="flex-1 h-3 bg-gray-100 dark:bg-white/8 rounded-full overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    whileInView={{ width: `${(s.value / totalSectors) * 100}%` }}
                    viewport={{ once: true }}
                    className="h-full rounded-full"
                    style={{ background: s.color }}
                  />
                </div>
                <span className="text-xs font-bold text-gray-900 dark:text-white w-8 text-right">
                  {s.value}%
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Funding by year */}
        <div className="bg-white dark:bg-white/5 rounded-2xl border border-gray-200/60 dark:border-white/8 p-5">
          <h3 className="text-sm font-bold text-gray-900 dark:text-white mb-4">
            Fonds levés par année (M FCFA)
          </h3>
          <div className="flex items-end gap-2 h-32">
            {ANALYTICS_CHARTS.funding.map((d, i) => (
              <div key={d.year} className="flex-1 flex flex-col items-center gap-1">
                <span className="text-[9px] font-bold text-gray-600 dark:text-gray-400">
                  {d.amount}M
                </span>
                <motion.div
                  initial={{ height: 0 }}
                  whileInView={{ height: `${(d.amount / maxFunding) * 100}%` }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.08 }}
                  className="w-full rounded-t-md bg-gradient-to-t from-emerald-500 to-teal-500"
                  style={{ minHeight: 4 }}
                />
                <span className="text-[9px] text-gray-400">{d.year.slice(2)}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Benchmark */}
      <div className="bg-white dark:bg-white/5 rounded-2xl border border-gray-200/60 dark:border-white/8 p-5">
        <h3 className="text-sm font-bold text-gray-900 dark:text-white mb-1">
          Benchmark Afrique Centrale
        </h3>
        <p className="text-xs text-gray-500 mb-4">
          Gabon : N°1 entrepreneuriat numérique en Afrique centrale (2025)
        </p>
        <div className="space-y-3">
          {ANALYTICS_CHARTS.benchmark.map((b, i) => (
            <div key={b.country} className="flex items-center gap-3">
              <span className="text-lg">{b.flag}</span>
              <span className="text-xs text-gray-600 dark:text-gray-400 w-32 shrink-0">
                {b.country}
              </span>
              <div className="flex-1 h-3 bg-gray-100 dark:bg-white/8 rounded-full overflow-hidden">
                <motion.div
                  initial={{ width: 0 }}
                  whileInView={{ width: `${b.score}%` }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className={`h-full rounded-full ${i === 0 ? 'bg-gradient-to-r from-pink-500 to-fuchsia-500' : 'bg-gray-300 dark:bg-gray-600'}`}
                />
              </div>
              <span
                className={`text-xs font-bold w-10 text-right ${i === 0 ? 'text-pink-500' : 'text-gray-500'}`}
              >
                {b.score}%
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
