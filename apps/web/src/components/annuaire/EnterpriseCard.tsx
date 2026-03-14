'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { MapPin, Copy, Check, ExternalLink, Users, Calendar } from 'lucide-react';
import { useState } from 'react';
import type { AnnuaireEnterprise } from '@/lib/annuaire-data';
import { SingBadge, StatusBadge } from './StartupBadge';

/** Convert a hex color to a soft pastel background + muted text version */
function softColor(hex: string): { bg: string; text: string } {
  return { bg: `${hex}12`, text: `${hex}cc` };
}

/** Map sector slugs to a curated palette */
const SECTOR_COLORS: Record<string, string> = {
  'sec-01': '#6366f1', // Tech — Indigo
  'sec-02': '#16a34a', // Agri — Green
  'sec-03': '#d97706', // Mines — Amber
  'sec-04': '#0284c7', // Transport — Sky
  'sec-05': '#65a30d', // Bois — Lime
  'sec-06': '#dc2626', // Santé — Red
  'sec-07': '#7c3aed', // Éducation — Violet
  'sec-08': '#0d9488', // Énergie — Teal
  'sec-09': '#ea580c', // BTP — Orange
  'sec-10': '#2563eb', // Commerce — Blue
  'sec-11': '#db2777', // Tourisme — Pink
  'sec-12': '#059669', // Finance — Emerald
};

interface EnterpriseCardProps {
  enterprise: AnnuaireEnterprise;
  index?: number;
  showFavorite?: boolean;
  favoriteSlot?: React.ReactNode;
}

export default function EnterpriseCard({ enterprise: e, index = 0, showFavorite, favoriteSlot }: EnterpriseCardProps) {
  const [copied, setCopied] = useState(false);
  const sectorHex = SECTOR_COLORS[e.sector.id] || '#6b7280';
  const soft = softColor(sectorHex);

  const initials = e.name
    .split(' ')
    .map((w) => w[0])
    .filter(Boolean)
    .join('')
    .slice(0, 2)
    .toUpperCase();

  const copyRccm = (ev: React.MouseEvent) => {
    ev.preventDefault();
    ev.stopPropagation();
    navigator.clipboard.writeText(e.rccm);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ delay: Math.min(index * 0.03, 0.4), type: 'spring', stiffness: 120 }}
    >
      <Link
        href={`/annuaire/${e.rccm}`}
        className="group relative block rounded-2xl border transition-all duration-300 hover:-translate-y-0.5 no-underline h-full
          bg-white border-gray-200/70
          dark:bg-gray-900/60 dark:border-gray-700/50 dark:hover:shadow-lg dark:hover:shadow-black/20 dark:hover:border-gray-600/60"
      >
        <div className="p-3 sm:p-5 flex flex-col h-full">
          {/* Header: Initials + Name */}
          <div className="flex items-start gap-2 sm:gap-3 mb-2 sm:mb-3">
            <div
              className="w-8 h-8 sm:w-10 sm:h-10 rounded-lg sm:rounded-xl flex items-center justify-center text-[10px] sm:text-xs font-bold shrink-0"
              style={{ background: soft.bg, color: soft.text }}
            >
              {initials}
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-1">
                <h3 className="text-xs sm:text-sm font-semibold truncate m-0 text-gray-900 dark:text-gray-100">
                  {e.name}
                </h3>
              </div>
              <p className="text-[10px] sm:text-[11px] text-gray-400 dark:text-gray-500 truncate mt-0.5 m-0">
                {e.sector.icon} {e.sector.name}
              </p>
            </div>
            {showFavorite && favoriteSlot && (
              <div className="shrink-0">{favoriteSlot}</div>
            )}
          </div>

          {/* Badges — soft tinted chips */}
          <div className="flex flex-wrap gap-1 sm:gap-1.5 mb-2 sm:mb-3">
            <span
              className="text-[9px] sm:text-[10px] font-medium px-1.5 sm:px-2 py-0.5 rounded-full"
              style={{ background: soft.bg, color: soft.text }}
            >
              {e.legalForm}
            </span>
            {e.status !== 'ACTIVE' && (
              <StatusBadge status={e.status} />
            )}
            {e.isSingStartup && <SingBadge />}
            {e.isDigitalEcosystem && !e.isSingStartup && (
              <span className="text-[9px] sm:text-[10px] font-medium px-1.5 sm:px-2 py-0.5 rounded-full
                bg-indigo-50 text-indigo-500/80 dark:bg-indigo-900/15 dark:text-indigo-400/70">
                Digital
              </span>
            )}
          </div>

          {/* Description */}
          <p className="hidden sm:block text-xs text-gray-500 dark:text-gray-400 leading-relaxed line-clamp-2 m-0 mb-3 flex-1">
            {e.description}
          </p>

          {/* Metrics row — 3 columns (inspired from incubateur) */}
          <div className="grid grid-cols-3 gap-1 sm:gap-1.5 mb-2 sm:mb-3">
            <div className="text-center rounded-lg py-1 sm:py-1.5 bg-gray-100 dark:bg-gray-800/50">
              <div className="flex items-center justify-center gap-0.5 sm:gap-1">
                <MapPin size={8} className="text-gray-400 dark:text-gray-500 hidden sm:block" />
                <span className="text-[9px] sm:text-[10px] font-semibold text-gray-700 dark:text-gray-300 truncate">{e.address.city}</span>
              </div>
              <div className="text-[8px] sm:text-[9px] text-gray-400 dark:text-gray-500 mt-0.5 hidden sm:block">{e.address.province}</div>
            </div>
            <div className="text-center rounded-lg py-1 sm:py-1.5 bg-gray-100 dark:bg-gray-800/50">
              <div className="flex items-center justify-center gap-0.5 sm:gap-1">
                <Users size={8} className="text-gray-400 dark:text-gray-500 hidden sm:block" />
                <span className="text-[9px] sm:text-[10px] font-semibold text-gray-700 dark:text-gray-300">{e.employeeCount}</span>
              </div>
              <div className="text-[8px] sm:text-[9px] text-gray-400 dark:text-gray-500 mt-0.5">Emplois</div>
            </div>
            <div className="text-center rounded-lg py-1 sm:py-1.5 bg-gray-100 dark:bg-gray-800/50">
              <div className="flex items-center justify-center gap-0.5 sm:gap-1">
                <Calendar size={8} className="text-gray-400 dark:text-gray-500 hidden sm:block" />
                <span className="text-[9px] sm:text-[10px] font-semibold text-gray-700 dark:text-gray-300">{e.yearFounded}</span>
              </div>
              <div className="text-[8px] sm:text-[9px] text-gray-400 dark:text-gray-500 mt-0.5">Fondée</div>
            </div>
          </div>

          {/* Footer: RCCM + link */}
          <div className="mt-auto pt-2 sm:pt-2.5 border-t border-gray-200 dark:border-gray-800 flex items-center justify-between">
            <button
              onClick={copyRccm}
              className="flex items-center gap-1 sm:gap-1.5 text-[9px] sm:text-[10px] font-mono text-gray-400 dark:text-gray-600 hover:text-emerald-500 bg-transparent border-none cursor-pointer p-0 transition-colors truncate mr-1 sm:mr-2"
              title="Copier le RCCM"
            >
              {copied ? <Check size={10} className="text-emerald-500" /> : <Copy size={10} />}
              <span className="hidden sm:inline">{e.rccm}</span>
              <span className="sm:hidden">{e.rccm.length > 10 ? e.rccm.slice(0, 10) + '…' : e.rccm}</span>
            </button>
            <span className="text-[10px] text-gray-300 hover:text-gray-500 dark:text-gray-600 dark:hover:text-gray-400 transition-colors shrink-0">
              <ExternalLink size={11} />
            </span>
          </div>
        </div>
      </Link>
    </motion.div>
  );
}
