'use client';
import React from 'react';
import { motion } from 'framer-motion';
import { ExternalLink, Star, Award } from 'lucide-react';
import type { StartupProfile } from '@/lib/mock/incubateur-types';
import { STAGE_CONFIG } from '@/lib/mock/incubateur-data';

const SECTOR_COLORS: Record<string, string> = {
  fintech: '#10B981',
  govtech: '#6366F1',
  healthtech: '#EF4444',
  ecommerce: '#EC4899',
  agritech: '#22C55E',
  musictech: '#F59E0B',
  insurtech: '#0EA5E9',
  mobilite: '#3B82F6',
  edtech: '#8B5CF6',
};

export default function StartupProfileCard({
  startup,
  index = 0,
}: {
  startup: StartupProfile;
  index?: number;
}) {
  const sectorColor = SECTOR_COLORS[startup.sector] || '#6b7280';
  const stageConf = STAGE_CONFIG[startup.stage];
  const initials =
    startup.name.replace(/[^A-Z]/g, '').slice(0, 2) || startup.name.slice(0, 2).toUpperCase();
  const metricEntries = Object.entries(startup.metrics).slice(0, 3);

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ delay: index * 0.06, type: 'spring', stiffness: 100 }}
      className={`group relative bg-white dark:bg-white/5 rounded-2xl border overflow-hidden transition-all duration-300 hover:shadow-xl hover:shadow-black/5 dark:hover:shadow-black/30 hover:-translate-y-1 ${
        startup.featured
          ? 'border-amber-400/50 ring-1 ring-amber-400/20'
          : startup.status === 'LEGACY'
            ? 'border-violet-400/50 ring-1 ring-violet-400/20'
            : 'border-gray-200/60 dark:border-white/8'
      }`}
    >
      {/* Top accent bar */}
      <div className="h-1 w-full" style={{ background: sectorColor }} />

      <div className="p-5">
        {/* Header: Logo + Name */}
        <div className="flex items-start gap-3 mb-3">
          <div
            className="w-11 h-11 rounded-xl flex items-center justify-center text-white text-sm font-bold shrink-0"
            style={{ background: sectorColor }}
          >
            {initials}
          </div>
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2">
              <h3 className="text-sm font-bold text-gray-900 dark:text-white truncate">
                {startup.name}
              </h3>
              {startup.featured && (
                <Star size={14} className="text-amber-400 fill-amber-400 shrink-0" />
              )}
              {startup.status === 'LEGACY' && (
                <Award size={14} className="text-violet-400 shrink-0" />
              )}
            </div>
            <p className="text-xs text-gray-500 dark:text-gray-400 truncate">{startup.tagline}</p>
          </div>
        </div>

        {/* Badges */}
        <div className="flex flex-wrap gap-1.5 mb-3">
          <span
            className="text-[10px] font-semibold px-2 py-0.5 rounded-full text-white"
            style={{ background: sectorColor }}
          >
            {startup.sector.charAt(0).toUpperCase() + startup.sector.slice(1)}
          </span>
          {stageConf && (
            <span
              className="text-[10px] font-semibold px-2 py-0.5 rounded-full"
              style={{ background: `${stageConf.color}18`, color: stageConf.color }}
            >
              {stageConf.label}
            </span>
          )}
          <span className="text-[10px] font-medium px-2 py-0.5 rounded-full bg-gray-100 dark:bg-white/8 text-gray-500 dark:text-gray-400">
            {startup.year}
          </span>
        </div>

        {/* Description */}
        <p className="text-xs text-gray-600 dark:text-gray-400 line-clamp-2 mb-3 leading-relaxed">
          {startup.description}
        </p>

        {/* Metrics */}
        <div className="grid grid-cols-3 gap-2 mb-3">
          {metricEntries.map(([key, val]) => (
            <div key={key} className="text-center bg-gray-50 dark:bg-white/3 rounded-lg p-1.5">
              <div className="text-xs font-bold text-gray-900 dark:text-white">{val}</div>
              <div className="text-[9px] text-gray-500 dark:text-gray-400 truncate capitalize">
                {key.replace(/_/g, ' ')}
              </div>
            </div>
          ))}
        </div>

        {/* Tags */}
        <div className="flex flex-wrap gap-1 mb-3">
          {startup.tags.slice(0, 3).map((t) => (
            <span
              key={t}
              className="text-[10px] font-medium px-1.5 py-0.5 rounded bg-gray-100 dark:bg-white/6 text-gray-500 dark:text-gray-400"
            >
              {t}
            </span>
          ))}
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between pt-2 border-t border-gray-100 dark:border-white/5">
          <span className="text-[10px] text-gray-400">{startup.programme}</span>
          {startup.website && (
            <a
              href={startup.website}
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-400 hover:text-pink-500 transition-colors"
            >
              <ExternalLink size={12} />
            </a>
          )}
        </div>
      </div>
    </motion.div>
  );
}
