'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { MARCHE_TELECOM } from '@/lib/mock/investir-data';

export default function TelecomChart() {
  const sorted = [...MARCHE_TELECOM.operateurs].sort((a, b) => b.partMarche - a.partMarche);

  return (
    <div>
      <div className="grid grid-cols-3 gap-3 mb-6">
        <div className="bg-white/10 rounded-xl p-3 text-center">
          <p className="text-lg font-black text-white">
            {MARCHE_TELECOM.stats.parcTotal.toLocaleString('fr-FR')}
          </p>
          <p className="text-[10px] text-gray-400">Parc total abonnés</p>
        </div>
        <div className="bg-white/10 rounded-xl p-3 text-center">
          <p className="text-lg font-black text-white">{MARCHE_TELECOM.stats.chiffreAffaires}</p>
          <p className="text-[10px] text-gray-400">CA Q3 2025</p>
        </div>
        <div className="bg-white/10 rounded-xl p-3 text-center">
          <p className="text-lg font-black text-white">{MARCHE_TELECOM.stats.repartition.mobile}</p>
          <p className="text-[10px] text-gray-400">Mobile</p>
        </div>
      </div>

      <div className="space-y-3">
        {sorted.map((op, i) => (
          <motion.div
            key={op.nom}
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.1 }}
            className="flex items-center gap-3"
          >
            <span className="text-xs font-semibold text-gray-300 w-36 shrink-0 truncate">
              {op.nom}
            </span>
            <div className="flex-1 h-4 bg-white/8 rounded-full overflow-hidden">
              <motion.div
                initial={{ width: 0 }}
                whileInView={{ width: `${op.partMarche}%` }}
                viewport={{ once: true }}
                transition={{ duration: 1, delay: i * 0.1 }}
                className="h-full rounded-full"
                style={{ background: op.color }}
              />
            </div>
            <span className="text-xs font-bold text-white w-14 text-right">{op.partMarche}%</span>
            <span className="text-[10px] text-gray-500 w-16 text-right">{op.type}</span>
          </motion.div>
        ))}
      </div>

      <p className="text-[10px] text-gray-500 mt-3 italic">
        Source : {MARCHE_TELECOM.stats.source}
      </p>
    </div>
  );
}
