'use client';

import React from 'react';
import { motion } from 'framer-motion';
import type { MacroIndicator } from '@/lib/mock/investir-data';

export default function MacroTable({ data, source }: { data: MacroIndicator[]; source: string }) {
  const years = ['2022', '2023', '2024', '2025(p)', '2026(p)'];
  const keys: (keyof MacroIndicator)[] = ['y2022', 'y2023', 'y2024', 'y2025', 'y2026'];

  return (
    <div>
      <div className="overflow-x-auto rounded-xl border border-gray-200/60 dark:border-white/8">
        <table className="w-full text-sm">
          <thead>
            <tr className="bg-gray-100 dark:bg-white/3">
              <th className="text-left font-bold text-gray-900 dark:text-white px-4 py-3 text-xs uppercase tracking-wider">
                Indicateur
              </th>
              {years.map((y) => (
                <th
                  key={y}
                  className="text-center font-bold text-gray-900 dark:text-white px-3 py-3 text-xs"
                >
                  {y}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100 dark:divide-white/5">
            {data.map((row, i) => (
              <motion.tr
                key={i}
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.05 }}
                className="hover:bg-gray-100/50 dark:hover:bg-white/2 transition-colors"
              >
                <td className="px-4 py-3 text-xs font-medium text-gray-700 dark:text-gray-300 max-w-[200px]">
                  {row.indicateur}
                </td>
                {keys.map((k) => {
                  const v = row[k] as number | null;
                  const isNeg = v !== null && v < 0;
                  return (
                    <td
                      key={k}
                      className={`text-center px-3 py-3 font-semibold text-xs ${v === null ? 'text-gray-300' : isNeg ? 'text-red-500' : 'text-gray-900 dark:text-white'}`}
                    >
                      {v === null ? '—' : v.toFixed(1)}
                    </td>
                  );
                })}
              </motion.tr>
            ))}
          </tbody>
        </table>
      </div>
      <p className="text-[10px] text-gray-400 mt-2 italic">Source : {source}</p>
    </div>
  );
}
