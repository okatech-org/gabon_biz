'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Banknote, ArrowRight } from 'lucide-react';
import { FINANCEMENT_SOURCES, FINANCEMENT_PIPELINE } from '@/lib/mock/incubateur-startups';

const stats = FINANCEMENT_PIPELINE.globalStats;

export default function FinancementPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-emerald-500 to-teal-600 flex items-center justify-center text-white">
          <Banknote size={18} />
        </div>
        <div>
          <h1 className="text-xl font-black text-gray-900 dark:text-white">Financement</h1>
          <p className="text-sm text-gray-500">Pipeline SING Capital & partenaires</p>
        </div>
      </div>

      {/* Global stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
        {[
          { l: 'Total levé', v: stats.totalRaised },
          { l: 'Startups financées', v: stats.startupsFinanced },
          { l: 'Ticket moyen', v: stats.averageTicket },
          { l: 'Taux de succès', v: stats.successRate },
        ].map((s) => (
          <div
            key={s.l}
            className="bg-white dark:bg-white/5 rounded-xl border border-gray-200/60 dark:border-white/8 p-4"
          >
            <p className="text-[10px] font-semibold text-gray-500 uppercase tracking-wider">
              {s.l}
            </p>
            <p className="text-xl font-black text-gray-900 dark:text-white mt-1">{s.v}</p>
          </div>
        ))}
      </div>

      {/* Sources */}
      <div>
        <h2 className="text-sm font-bold text-gray-500 uppercase tracking-wider mb-3">
          Sources de financement
        </h2>
        <div className="grid md:grid-cols-3 gap-4">
          {FINANCEMENT_SOURCES.map((s) => (
            <div
              key={s.name}
              className="bg-white dark:bg-white/5 rounded-xl border border-gray-200/60 dark:border-white/8 p-5"
            >
              <h3 className="text-sm font-bold text-gray-900 dark:text-white mb-1">{s.name}</h3>
              <p className="text-xs text-gray-500 mb-2">
                {s.type} · {s.range}
              </p>
              <div className="flex flex-wrap gap-1 mb-3">
                {s.instruments.map((i) => (
                  <span
                    key={i}
                    className="text-[10px] font-medium px-2 py-0.5 rounded-full bg-emerald-50 dark:bg-emerald-500/10 text-emerald-600"
                  >
                    {i}
                  </span>
                ))}
              </div>
              <p className="text-[10px] text-gray-400">{s.partners.join(' · ')}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Pipeline Kanban */}
      <div>
        <h2 className="text-sm font-bold text-gray-500 uppercase tracking-wider mb-3">
          Mon pipeline
        </h2>
        <div className="flex gap-3 overflow-x-auto pb-4">
          {FINANCEMENT_PIPELINE.columns.map((col) => (
            <div
              key={col.id}
              className="min-w-[200px] flex-shrink-0 bg-gray-50 dark:bg-white/3 rounded-xl p-3"
            >
              <div className="flex items-center justify-between mb-3">
                <h3 className="text-xs font-bold text-gray-900 dark:text-white">{col.label}</h3>
                <span className="text-[10px] font-bold bg-gray-200 dark:bg-white/10 text-gray-600 dark:text-gray-400 px-1.5 py-0.5 rounded">
                  {col.items.length}
                </span>
              </div>
              <div className="space-y-2">
                {col.items.map((item, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="bg-white dark:bg-white/5 rounded-lg border border-gray-200/60 dark:border-white/8 p-3"
                  >
                    <p className="text-xs font-bold text-gray-900 dark:text-white">{item.funder}</p>
                    <p className="text-xs text-emerald-500 font-semibold">{item.amount}</p>
                    <p className="text-[10px] text-gray-400">{item.type}</p>
                  </motion.div>
                ))}
                {col.items.length === 0 && (
                  <p className="text-xs text-gray-400 text-center py-4">—</p>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
