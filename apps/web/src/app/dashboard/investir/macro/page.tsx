'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { BarChart3 } from 'lucide-react';
import MacroTable from '@/components/investir/MacroTable';
import {
  MACRO_TABLE,
  MACRO_SOURCE,
  MACRO_CHARTS,
  KEY_FACTS,
  CASE_STUDY_POZI,
} from '@/lib/mock/investir-data';

export default function MacroPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 rounded-xl bg-linear-to-br from-blue-500 to-cyan-600 flex items-center justify-center text-white">
          <BarChart3 size={18} />
        </div>
        <div>
          <h1 className="text-xl font-black text-gray-900 dark:text-white">
            Dashboard Macroéconomique
          </h1>
          <p className="text-sm text-gray-500">Indicateurs BAD 2025 et contexte VC africain</p>
        </div>
      </div>

      {/* Key Facts */}
      <div className="grid md:grid-cols-4 gap-3">
        {KEY_FACTS.map((f, i) => {
          const Icon = f.icon;
          return (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.05 }}
              className="flex items-start gap-2 bg-teal-50 dark:bg-teal-500/5 rounded-xl border border-teal-200/40 dark:border-teal-500/10 p-3"
            >
              <Icon size={14} className="text-teal-500 mt-0.5 shrink-0" />
              <p className="text-xs text-gray-700 dark:text-gray-300">{f.fact}</p>
            </motion.div>
          );
        })}
      </div>

      {/* Macro table */}
      <MacroTable data={MACRO_TABLE} source={MACRO_SOURCE} />

      {/* Charts */}
      <div className="grid md:grid-cols-2 gap-4">
        {[MACRO_CHARTS.gdpGrowth, MACRO_CHARTS.inflation].map((chart) => {
          const max = Math.max(...chart.data.map((d) => Math.abs(d.v))) * 1.3;
          return (
            <div
              key={chart.title}
              className="bg-white dark:bg-white/5 rounded-xl border border-gray-200/60 dark:border-white/8 p-5"
            >
              <h3 className="text-xs font-bold text-gray-900 dark:text-white mb-4">
                {chart.title}
              </h3>
              <div className="flex items-end gap-3 h-32">
                {chart.data.map((d, i) => (
                  <div key={d.y} className="flex-1 flex flex-col items-center gap-1">
                    <span className="text-xs font-bold text-gray-600 dark:text-gray-300">
                      {d.v}%
                    </span>
                    <motion.div
                      initial={{ height: 0 }}
                      animate={{ height: `${(Math.abs(d.v) / max) * 100}%` }}
                      transition={{ delay: i * 0.1, duration: 0.8 }}
                      className={`w-full rounded-t-lg ${d.v >= 0 ? 'bg-linear-to-t from-teal-500 to-emerald-400' : 'bg-red-400'}`}
                      style={{ minHeight: 4 }}
                    />
                    <span className="text-[10px] text-gray-400">{d.y}</span>
                  </div>
                ))}
              </div>
            </div>
          );
        })}
      </div>

      {/* VC Context */}
      <div className="bg-white dark:bg-white/5 rounded-xl border border-gray-200/60 dark:border-white/8 p-5">
        <h3 className="text-sm font-bold text-gray-900 dark:text-white mb-3">
          {CASE_STUDY_POZI.vcContext.title}
        </h3>
        <div className="grid grid-cols-3 gap-4 mb-3">
          {CASE_STUDY_POZI.vcContext.stats.map((s) => (
            <div key={s.label} className="text-center bg-gray-50 dark:bg-white/3 rounded-xl p-4">
              <p className="text-lg font-black text-teal-500">{s.value}</p>
              <p className="text-xs text-gray-500 mt-1">{s.label}</p>
              <p className="text-[10px] text-gray-400">{s.source}</p>
            </div>
          ))}
        </div>
        <p className="text-sm text-gray-600 dark:text-gray-400 italic">
          {CASE_STUDY_POZI.vcContext.narrative}
        </p>
      </div>
    </div>
  );
}
