'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { MapPin, Copy, Check, ExternalLink } from 'lucide-react';
import { useState } from 'react';
import type { AnnuaireEnterprise } from '@/lib/annuaire-data';
import { SECTORS } from '@/lib/annuaire-data';
import { StartupBadge, IncubatedBadge, FundingBadge, StatusBadge, RatingStars } from './StartupBadge';

interface EnterpriseCardProps {
  enterprise: AnnuaireEnterprise;
  index?: number;
  showFavorite?: boolean;
  favoriteSlot?: React.ReactNode;
}

export default function EnterpriseCard({ enterprise: e, index = 0, showFavorite, favoriteSlot }: EnterpriseCardProps) {
  const [copied, setCopied] = useState(false);
  const sectorColor = SECTORS.find((s) => s.id === e.sector.id)?.color || '#6b7280';

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
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: index * 0.04, ease: 'easeOut' }}
    >
      <Link
        href={`/annuaire/${e.rccm}`}
        className="group block bg-white/80 dark:bg-white/5 backdrop-blur-xl rounded-3xl border border-gray-200/50 dark:border-white/8 hover:border-white/40 dark:hover:border-white/15 overflow-hidden transition-all duration-500 no-underline h-full shadow-lg shadow-black/2 dark:shadow-black/20 hover:shadow-xl"
        style={{ ['--card-accent' as string]: sectorColor }}
        onMouseEnter={(ev) => { (ev.currentTarget as HTMLElement).style.borderColor = sectorColor; (ev.currentTarget as HTMLElement).style.boxShadow = `0 20px 40px ${sectorColor}15`; }}
        onMouseLeave={(ev) => { (ev.currentTarget as HTMLElement).style.borderColor = ''; (ev.currentTarget as HTMLElement).style.boxShadow = ''; }}
      >
        {/* Top accent */}
        <div className="h-1 w-full rounded-t-3xl" style={{ background: `linear-gradient(90deg, ${sectorColor}, ${sectorColor}80)` }} />

        <div className="p-5 flex flex-col h-full">
          {/* Header: avatar + name + fav */}
          <div className="flex items-start gap-3 mb-3">
            <div
              className="w-11 h-11 rounded-2xl flex items-center justify-center text-white font-bold text-sm shrink-0 shadow-lg"
              style={{ background: `linear-gradient(135deg, ${sectorColor}, ${sectorColor}bb)`, boxShadow: `0 6px 20px ${sectorColor}25` }}
            >
              {initials}
            </div>
            <div className="flex-1 min-w-0">
              <h3 className="text-[15px] font-semibold text-gray-900 dark:text-white m-0 leading-snug line-clamp-2 group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors">
                {e.name}
              </h3>
              <div className="flex items-center gap-1.5 mt-1 text-xs text-gray-500 dark:text-gray-400">
                <span className="font-medium">{e.legalForm}</span>
                <span>•</span>
                <MapPin size={11} className="shrink-0" />
                <span className="truncate">{e.address.city}, {e.address.province}</span>
              </div>
            </div>
            {showFavorite && favoriteSlot && (
              <div className="shrink-0">{favoriteSlot}</div>
            )}
          </div>

          {/* Sector pill */}
          <div className="flex items-center gap-2 mb-2 flex-wrap">
            <span
              className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg text-[11px] font-semibold backdrop-blur-sm"
              style={{ background: `${sectorColor}10`, color: sectorColor, border: `1px solid ${sectorColor}18` }}
            >
              {e.sector.icon} {e.sector.name}
            </span>
            {e.status !== 'ACTIVE' && <StatusBadge status={e.status} />}
          </div>

          {/* Digital ecosystem badges */}
          {e.isDigitalEcosystem && (
            <div className="flex flex-wrap gap-1.5 mb-2">
              {e.digitalCategory && <StartupBadge category={e.digitalCategory} />}
              {e.startupProfile?.isIncubated && <IncubatedBadge cohort={e.startupProfile.cohortName} />}
              {e.startupProfile?.seekingFunding && <FundingBadge />}
            </div>
          )}

          {/* Description */}
          <p className="text-xs text-gray-600 dark:text-gray-400 leading-relaxed line-clamp-2 m-0 mb-3">
            {e.description}
          </p>

          {/* Tags */}
          <div className="flex flex-wrap gap-1 mb-3">
            {e.tags.slice(0, 3).map((tag) => (
              <span key={tag} className="px-2 py-0.5 text-[10px] font-medium rounded-lg bg-gray-100/80 dark:bg-white/4 text-gray-500 dark:text-gray-400 border border-gray-200/50 dark:border-white/6">
                {tag}
              </span>
            ))}
            {e.tags.length > 3 && (
              <span className="px-2 py-0.5 text-[10px] font-medium rounded-full bg-gray-100 dark:bg-gray-800 text-gray-400">
                +{e.tags.length - 3}
              </span>
            )}
          </div>

          {/* Stats row if available */}
          {e.publicStats.averageRating && (
            <div className="mb-3">
              <RatingStars rating={e.publicStats.averageRating} />
            </div>
          )}

          {/* Footer: RCCM + link */}
          <div className="mt-auto pt-3 border-t border-gray-100/50 dark:border-white/6 flex items-center justify-between">
            <button
              onClick={copyRccm}
              className="flex items-center gap-1.5 text-[11px] font-mono text-gray-400 dark:text-gray-500 hover:text-emerald-500 bg-transparent border-none cursor-pointer p-0 transition-colors"
              title="Copier le RCCM"
            >
              {copied ? <Check size={12} className="text-emerald-500" /> : <Copy size={12} />}
              {e.rccm}
            </button>
            <span className="text-xs font-medium text-emerald-600 dark:text-emerald-400 flex items-center gap-1 group-hover:gap-2 transition-all">
              Fiche <ExternalLink size={12} />
            </span>
          </div>
        </div>
      </Link>
    </motion.div>
  );
}
