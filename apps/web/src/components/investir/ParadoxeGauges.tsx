'use client';

import React from 'react';
import { motion } from 'framer-motion';
import type { GaugeData } from '@/lib/mock/investir-data';

export default function ParadoxeGauges({ gauges }: { gauges: GaugeData[] }) {
  return (
    <div className="space-y-5">
      {gauges.map((g, i) => {
        const pct = (g.value / g.max) * 100;
        return (
          <motion.div
            key={g.label}
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.15 }}
          >
            <div className="flex items-center justify-between mb-1.5">
              <span className="text-sm font-bold text-white">{g.label}</span>
              <span className="text-sm font-black" style={{ color: g.color }}>
                {g.value}%
              </span>
            </div>
            <div className="h-3 bg-white/10 rounded-full overflow-hidden">
              <motion.div
                initial={{ width: 0 }}
                whileInView={{ width: `${pct}%` }}
                viewport={{ once: true }}
                transition={{ duration: 1.5, delay: i * 0.15, ease: 'easeOut' }}
                className="h-full rounded-full"
                style={{ background: g.color }}
              />
            </div>
            <p className="text-xs text-gray-400 mt-1 italic">{g.interpretation}</p>
          </motion.div>
        );
      })}
    </div>
  );
}
