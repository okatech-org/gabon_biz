'use client';

import React from 'react';
import { PageHeader } from '@/components/ui';
import { PieChart, Pie, Cell, AreaChart, Area, BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from 'recharts';
import { ANALYTICS_REPARTITION, ANALYTICS_EVOLUTION, SOLUTIONS_KIMBA } from '@/lib/mock/innovation-data';

const TOP_SOLUTIONS = [...SOLUTIONS_KIMBA].sort((a, b) => b.ratingsCount - a.ratingsCount).slice(0, 5);

const AVG_RATING_BY_CAT = ANALYTICS_REPARTITION.map(cat => {
  const sols = SOLUTIONS_KIMBA.filter(s => s.categorie === cat.name);
  const avg = sols.length ? sols.reduce((s, x) => s + x.rating, 0) / sols.length : 0;
  return { name: cat.name, rating: Number(avg.toFixed(1)), color: cat.color };
});

export default function AnalyticsPage() {
  return (
    <div>
      <PageHeader title="📊 Analytics Écosystème" subtitle="Tableau de bord de l'innovation gabonaise" />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Donut - Répartition */}
        <div className="p-6 rounded-2xl bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800">
          <h3 className="text-base font-bold text-gray-900 dark:text-white mb-4">Répartition des solutions par catégorie</h3>
          <ResponsiveContainer width="100%" height={280}>
            <PieChart>
              <Pie data={ANALYTICS_REPARTITION} dataKey="value" nameKey="name" cx="50%" cy="50%" innerRadius={60} outerRadius={110} paddingAngle={2} label={({ name, value }) => `${name} (${value})`} labelLine={false}>
                {ANALYTICS_REPARTITION.map((entry) => (
                  <Cell key={entry.name} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>

        {/* Area - Évolution */}
        <div className="p-6 rounded-2xl bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800">
          <h3 className="text-base font-bold text-gray-900 dark:text-white mb-4">Évolution du catalogue</h3>
          <ResponsiveContainer width="100%" height={280}>
            <AreaChart data={ANALYTICS_EVOLUTION}>
              <defs>
                <linearGradient id="colorSolutions" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#8B5CF6" stopOpacity={0.3} />
                  <stop offset="95%" stopColor="#8B5CF6" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
              <XAxis dataKey="mois" tick={{ fontSize: 11 }} />
              <YAxis tick={{ fontSize: 11 }} />
              <Tooltip />
              <Area type="monotone" dataKey="solutions" stroke="#8B5CF6" fill="url(#colorSolutions)" strokeWidth={2} />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        {/* Bar - Note moyenne */}
        <div className="p-6 rounded-2xl bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800">
          <h3 className="text-base font-bold text-gray-900 dark:text-white mb-4">Note moyenne par catégorie</h3>
          <ResponsiveContainer width="100%" height={280}>
            <BarChart data={AVG_RATING_BY_CAT} layout="vertical">
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
              <XAxis type="number" domain={[0, 5]} tick={{ fontSize: 11 }} />
              <YAxis type="category" dataKey="name" width={100} tick={{ fontSize: 11 }} />
              <Tooltip />
              <Bar dataKey="rating" radius={[0, 6, 6, 0]}>
                {AVG_RATING_BY_CAT.map((entry) => (
                  <Cell key={entry.name} fill={entry.color} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Leaderboard - Top 5 */}
        <div className="p-6 rounded-2xl bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800">
          <h3 className="text-base font-bold text-gray-900 dark:text-white mb-4">Top 5 solutions les plus consultées</h3>
          <div className="space-y-3">
            {TOP_SOLUTIONS.map((sol, i) => (
              <div key={sol.id} className="flex items-center gap-4 p-3 rounded-xl bg-gray-100 dark:bg-gray-800/50">
                <div className={`w-8 h-8 rounded-lg flex items-center justify-center text-white text-sm font-bold ${
                  i === 0 ? 'bg-amber-400' : i === 1 ? 'bg-gray-400' : i === 2 ? 'bg-amber-700' : 'bg-gray-300 dark:bg-gray-600'
                }`}>
                  {i + 1}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="text-sm font-semibold text-gray-900 dark:text-white truncate">{sol.nom}</div>
                  <div className="text-xs text-gray-400">{sol.startup.nom} • {sol.categorie}</div>
                </div>
                <div className="text-right shrink-0">
                  <div className="text-sm font-bold text-gray-900 dark:text-white">⭐ {sol.rating}</div>
                  <div className="text-xs text-gray-400">{sol.ratingsCount} avis</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
