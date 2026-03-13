'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Users, Calendar, CheckCircle, Clock, Award, ArrowRight } from 'lucide-react';
import { COHORTES_HISTORIQUE } from '@/lib/mock/incubateur-startups';
import { STATUS_CONFIG } from '@/lib/mock/incubateur-data';

export default function CohortesPage() {
  const [filter, setFilter] = useState<string>('all');
  const filtered =
    filter === 'all' ? COHORTES_HISTORIQUE : COHORTES_HISTORIQUE.filter((c) => c.status === filter);

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 rounded-xl bg-linear-to-br from-pink-400 to-rose-500 flex items-center justify-center text-white">
          <Users size={18} />
        </div>
        <div>
          <h1 className="text-xl font-black text-gray-900 dark:text-white">Cohortes</h1>
          <p className="text-sm text-gray-500">Historique complet de toutes les cohortes SING</p>
        </div>
      </div>

      <div className="flex gap-2">
        {['all', 'IN_PROGRESS', 'COMPLETED'].map((s) => (
          <button
            key={s}
            onClick={() => setFilter(s)}
            className={`text-xs font-semibold px-4 py-2 rounded-full transition-all ${filter === s ? 'bg-pink-500 text-white' : 'bg-white dark:bg-white/5 text-gray-600 dark:text-gray-400 border border-gray-200 dark:border-white/10'}`}
          >
            {s === 'all' ? 'Toutes' : STATUS_CONFIG[s]?.label || s}
          </button>
        ))}
      </div>

      <div className="space-y-4">
        {filtered.map((c, i) => {
          const statusConf = STATUS_CONFIG[c.status];
          const fillPercent = (c.places.filled / c.places.total) * 100;
          return (
            <motion.div
              key={c.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.05 }}
              className="bg-white dark:bg-white/5 rounded-2xl border border-gray-200/60 dark:border-white/8 p-5 hover:shadow-md transition-all"
            >
              <div className="flex items-start justify-between mb-3">
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <h3 className="text-base font-bold text-gray-900 dark:text-white">{c.name}</h3>
                    <span
                      className="text-[10px] font-bold px-2.5 py-0.5 rounded-full text-white"
                      style={{ background: statusConf?.color }}
                    >
                      {statusConf?.label}
                    </span>
                  </div>
                  <p className="text-xs text-gray-500">{c.programme}</p>
                </div>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-3 text-xs">
                <div className="flex items-center gap-1.5 text-gray-500">
                  <Calendar size={12} />{' '}
                  {new Date(c.startDate).toLocaleDateString('fr-FR', {
                    month: 'short',
                    year: 'numeric',
                  })}{' '}
                  —{' '}
                  {new Date(c.endDate).toLocaleDateString('fr-FR', {
                    month: 'short',
                    year: 'numeric',
                  })}
                </div>
                <div className="flex items-center gap-1.5 text-gray-500">
                  <Users size={12} /> {c.places.filled}/{c.places.total} startups
                </div>
                <div className="flex items-center gap-1.5 text-gray-500">
                  <Award size={12} /> {c.mentors} mentors
                </div>
                <div className="flex items-center gap-1.5 text-gray-500">
                  {c.sponsors.join(', ')}
                </div>
              </div>

              <div className="mb-3">
                <div className="h-1.5 bg-gray-100 dark:bg-white/8 rounded-full overflow-hidden">
                  <div
                    className="h-full rounded-full bg-pink-500"
                    style={{ width: `${fillPercent}%` }}
                  />
                </div>
              </div>

              <div className="flex flex-wrap gap-1 mb-3">
                {c.startups.slice(0, 6).map((s) => (
                  <span
                    key={s}
                    className="text-[10px] font-medium px-2 py-0.5 rounded-full bg-gray-100 dark:bg-white/6 text-gray-600 dark:text-gray-300"
                  >
                    {s}
                  </span>
                ))}
                {c.startups.length > 6 && (
                  <span className="text-[10px] text-gray-400">+{c.startups.length - 6}</span>
                )}
              </div>

              {c.results && (
                <div className="flex gap-4 pt-3 border-t border-gray-100 dark:border-white/5">
                  {Object.entries(c.results).map(([k, v]) => (
                    <div key={k} className="text-xs">
                      <span className="text-gray-400 capitalize">
                        {k.replace(/([A-Z])/g, ' $1')}:{' '}
                      </span>
                      <span className="font-bold text-gray-900 dark:text-white">{v}</span>
                    </div>
                  ))}
                </div>
              )}
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
