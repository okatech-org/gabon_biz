'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import type { DealPipeline } from '@/lib/mock/investir-data';
import { DEAL_STATUS_CONFIG } from '@/lib/mock/investir-data';

const SECTOR_COLORS: Record<string, string> = {
  FinTech: '#10B981',
  HealthTech: '#EF4444',
  'e-Commerce': '#8B5CF6',
  AgriTech: '#22C55E',
  EdTech: '#F59E0B',
  GovTech: '#6366F1',
};

export default function DealFlowCard({ deal, index }: { deal: DealPipeline; index: number }) {
  const status = DEAL_STATUS_CONFIG[deal.statut];
  const sectorColor = SECTOR_COLORS[deal.secteur] || '#6B7280';

  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.05 }}
      className="bg-white dark:bg-white/5 rounded-xl border border-gray-200/60 dark:border-white/8 p-4 hover:shadow-md transition-all group cursor-pointer"
    >
      <div className="flex items-start justify-between mb-2">
        <div>
          <h3 className="text-sm font-bold text-gray-900 dark:text-white group-hover:text-teal-500 transition-colors">
            {deal.startup}
          </h3>
          <div className="flex items-center gap-2 mt-0.5">
            <span
              className="text-[10px] font-bold px-2 py-0.5 rounded-full text-white"
              style={{ background: sectorColor }}
            >
              {deal.secteur}
            </span>
            <span className="text-[10px] text-gray-400">{deal.stade}</span>
          </div>
        </div>
        <span
          className="text-[10px] font-bold px-2.5 py-0.5 rounded-full"
          style={{ background: `${status.color}15`, color: status.color }}
        >
          {status.label}
        </span>
      </div>
      <div className="grid grid-cols-2 gap-2 mb-2 text-xs">
        <div>
          <span className="text-gray-400">Recherche :</span>{' '}
          <span className="font-bold text-gray-900 dark:text-white">{deal.montantRecherche}</span>
        </div>
        <div>
          <span className="text-gray-400">Valo :</span>{' '}
          <span className="font-bold text-gray-900 dark:text-white">{deal.valorisation}</span>
        </div>
      </div>
      <p className="text-[10px] text-gray-500 mb-2">{deal.metriques}</p>
      <div className="flex items-center gap-1 text-teal-500 text-[10px] font-semibold opacity-0 group-hover:opacity-100 transition-opacity">
        Voir le deal <ArrowRight size={10} />
      </div>
    </motion.div>
  );
}
