'use client';
import React from 'react';
import { motion } from 'framer-motion';
import { ExternalLink, Star, Users, Zap, CheckCircle } from 'lucide-react';
import type { StartupSING } from '@/lib/mock/incubateur-types';
import { SECTEUR_CONFIG, PROGRAMMES_REELS } from '@/lib/mock/incubateur-data';

/** Convert a hex color to a soft pastel background + muted text version */
function softColor(hex: string): { bg: string; text: string } {
  return { bg: `${hex}12`, text: `${hex}cc` };
}

export default function StartupProfileCard({
  startup,
  index = 0,
}: {
  startup: StartupSING;
  index?: number;
}) {
  const secteurConf = SECTEUR_CONFIG[startup.secteur] || { label: startup.secteurRaw, color: '#6b7280' };
  const programme = PROGRAMMES_REELS.find(p => p.id === startup.programmeId);
  const initials = startup.nom.replace(/[^A-Z]/g, '').slice(0, 2) || startup.nom.slice(0, 2).toUpperCase();
  const soft = softColor(secteurConf.color);

  return (
    <motion.div
      onClick={() => { window.location.href = `/dashboard/incubateur/startups/${startup.id}`; }}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ delay: Math.min(index * 0.03, 0.4), type: 'spring', stiffness: 120 }}
      className="group relative block rounded-2xl border transition-all duration-300 hover:-translate-y-0.5 cursor-pointer
        bg-white border-gray-200/70
        dark:bg-gray-900/60 dark:border-gray-700/50 dark:hover:shadow-lg dark:hover:shadow-black/20 dark:hover:border-gray-600/60"
    >
      <div className="p-3 sm:p-5">
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
              <h3 className="text-xs sm:text-sm font-semibold truncate text-gray-900 dark:text-gray-100">
                {startup.nom}
              </h3>
              {startup.tier === 'TOP' && (
                <Star size={11} className="text-amber-400/80 fill-amber-400/80 shrink-0" />
              )}
            </div>
            <p className="text-[10px] sm:text-[11px] text-gray-400 dark:text-gray-500 truncate mt-0.5">
              {programme?.name || startup.programmeRaw}
            </p>
          </div>
        </div>

        {/* Badges — soft tinted versions of the real colors */}
        <div className="flex flex-wrap gap-1 sm:gap-1.5 mb-2 sm:mb-3">
          <span
            className="text-[9px] sm:text-[10px] font-medium px-1.5 sm:px-2 py-0.5 rounded-full"
            style={{ background: soft.bg, color: soft.text }}
          >
            {secteurConf.label}
          </span>
          {startup.tier === 'TOP' && (
            <span className="text-[9px] sm:text-[10px] font-medium px-1.5 sm:px-2 py-0.5 rounded-full
              bg-amber-50 text-amber-600/80 dark:bg-amber-900/15 dark:text-amber-400/80">
              Top
            </span>
          )}
          {startup.tier === 'ACTIVE' && (
            <span className="text-[9px] sm:text-[10px] font-medium px-1.5 sm:px-2 py-0.5 rounded-full
              bg-emerald-50 text-emerald-600/70 dark:bg-emerald-900/15 dark:text-emerald-400/70">
              Actif
            </span>
          )}
          {startup.maturite === 'M' && (
            <span className="text-[9px] sm:text-[10px] font-medium px-1.5 sm:px-2 py-0.5 rounded-full
              bg-blue-50 text-blue-500/70 dark:bg-blue-900/15 dark:text-blue-400/70">
              Mature
            </span>
          )}
        </div>

        {/* Metrics row */}
        <div className="grid grid-cols-3 gap-1 sm:gap-1.5 mb-2 sm:mb-3">
          <div className="text-center rounded-lg py-1 sm:py-1.5 bg-gray-100 dark:bg-gray-800/50">
            <div className="flex items-center justify-center gap-0.5 sm:gap-1">
              <Users size={8} className="text-gray-400 dark:text-gray-500 hidden sm:block" />
              <span className="text-[9px] sm:text-xs font-semibold text-gray-700 dark:text-gray-300">{startup.emplois}</span>
            </div>
            <div className="text-[8px] sm:text-[9px] text-gray-400 dark:text-gray-500 mt-0.5">Emplois</div>
          </div>
          <div className="text-center rounded-lg py-1 sm:py-1.5 bg-gray-100 dark:bg-gray-800/50">
            <div className="flex items-center justify-center gap-0.5 sm:gap-1">
              <Zap size={8} className="text-gray-400 dark:text-gray-500 hidden sm:block" />
              <span className="text-[9px] sm:text-xs font-semibold text-gray-700 dark:text-gray-300">{startup.actif ? 'Oui' : 'Non'}</span>
            </div>
            <div className="text-[8px] sm:text-[9px] text-gray-400 dark:text-gray-500 mt-0.5">Actif</div>
          </div>
          <div className="text-center rounded-lg py-1 sm:py-1.5 bg-gray-100 dark:bg-gray-800/50">
            <div className="flex items-center justify-center gap-0.5 sm:gap-1">
              <CheckCircle size={8} className="text-gray-400 dark:text-gray-500 hidden sm:block" />
              <span className="text-[9px] sm:text-xs font-semibold text-gray-700 dark:text-gray-300">{startup.formalisation ? 'Oui' : 'Non'}</span>
            </div>
            <div className="text-[8px] sm:text-[9px] text-gray-400 dark:text-gray-500 mt-0.5">Formalisé</div>
          </div>
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between pt-2 sm:pt-2.5 border-t border-gray-200 dark:border-gray-800">
          <span className="text-[9px] sm:text-[10px] text-gray-400 dark:text-gray-600 truncate mr-1 sm:mr-2">
            #{startup.num} · {startup.dateDemarrage || '—'}
          </span>
          {startup.siteWeb && (
            <a
              href={startup.siteWeb}
              target="_blank"
              rel="noopener noreferrer"
              onClick={(e) => e.stopPropagation()}
              className="text-gray-300 hover:text-gray-500 dark:text-gray-600 dark:hover:text-gray-400 transition-colors"
            >
              <ExternalLink size={12} />
            </a>
          )}
        </div>
      </div>
    </motion.div>
  );
}
