'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { AlertTriangle, Shield } from 'lucide-react';
import type { RisqueInvestisseur } from '@/lib/mock/investir-data';
import { SEVERITE_CONFIG } from '@/lib/mock/investir-data';

export default function RisqueCard({
  risque,
  index,
}: {
  risque: RisqueInvestisseur;
  index: number;
}) {
  const sev = SEVERITE_CONFIG[risque.severite];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.08 }}
      className="bg-white dark:bg-white/5 rounded-2xl border border-gray-200/60 dark:border-white/8 p-5 transition-all"
    >
      <div className="flex items-start justify-between mb-3">
        <div className="flex items-center gap-2">
          <AlertTriangle size={14} style={{ color: sev.color }} />
          <h3 className="text-sm font-bold text-gray-900 dark:text-white">{risque.risque}</h3>
        </div>
        <span
          className="text-[10px] font-bold px-2.5 py-0.5 rounded-full text-white"
          style={{ background: sev.color }}
        >
          {sev.label}
        </span>
      </div>
      <p className="text-xs text-gray-600 dark:text-gray-400 mb-3 leading-relaxed">
        {risque.description}
      </p>
      <div className="bg-green-50 dark:bg-green-500/5 rounded-xl p-3 border border-green-200/40 dark:border-green-500/10">
        <div className="flex items-center gap-1.5 mb-1">
          <Shield size={12} className="text-green-500" />
          <span className="text-[10px] font-bold text-green-600 dark:text-green-400 uppercase tracking-wider">
            Atténuation
          </span>
        </div>
        <p className="text-xs text-green-700 dark:text-green-300 leading-relaxed">
          {risque.attenuation}
        </p>
      </div>
    </motion.div>
  );
}
