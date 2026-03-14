'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { PARCOURS_STEPS } from '@/lib/mock/investir-data';

export default function InvestorJourneyMap() {
  return (
    <div className="relative">
      {/* Vertical line */}
      <div className="absolute left-6 top-0 bottom-0 w-0.5 bg-linear-to-b from-teal-500 via-emerald-500 to-green-500 opacity-30" />

      <div className="space-y-6">
        {PARCOURS_STEPS.map((s, i) => {
          const Icon = s.icon;
          return (
            <motion.div
              key={s.number}
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.12 }}
              className="flex gap-5 group"
            >
              {/* Number circle */}
              <div className="relative z-10 shrink-0">
                <div className="w-12 h-12 rounded-full bg-linear-to-br from-teal-500 to-emerald-600 flex items-center justify-center text-white shadow-teal-500/20 group-hover:scale-110 transition-transform">
                  <Icon size={18} />
                </div>
              </div>

              {/* Content */}
              <div className="flex-1 pb-2 group-hover:translate-x-1 transition-transform">
                <div className="flex items-center justify-between mb-1">
                  <h3 className="text-sm font-black text-gray-900 dark:text-white">{s.title}</h3>
                  <span className="text-[10px] font-semibold text-teal-500 bg-teal-500/10 px-2 py-0.5 rounded-full">
                    {s.duration}
                  </span>
                </div>
                <p className="text-xs text-gray-600 dark:text-gray-400 mb-2 leading-relaxed">
                  {s.description}
                </p>
                <div className="flex flex-wrap gap-1">
                  {s.tools.map((t) => (
                    <span
                      key={t}
                      className="text-[10px] font-medium px-2 py-0.5 rounded-full bg-gray-100 dark:bg-white/6 text-gray-600 dark:text-gray-300"
                    >
                      {t}
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
