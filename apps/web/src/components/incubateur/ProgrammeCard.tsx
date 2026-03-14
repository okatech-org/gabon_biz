'use client';
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Users, CheckCircle, ArrowRight, X, TrendingUp, FileCheck, Briefcase } from 'lucide-react';
import type { ProgrammeReel } from '@/lib/mock/incubateur-types';

/** Convert a hex color to soft pastel variants */
function softColor(hex: string): { bg: string; text: string; bar: string } {
  return { bg: `${hex}12`, text: `${hex}cc`, bar: `${hex}60` };
}

export default function ProgrammeCard({
  programme,
  index = 0,
}: {
  programme: ProgrammeReel;
  index?: number;
}) {
  const [showDetail, setShowDetail] = useState(false);
  const activeRate = programme.totalStartups > 0
    ? Math.round((programme.startupsActives / programme.totalStartups) * 100)
    : 0;
  const soft = softColor(programme.color);

  return (
    <>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: index * 0.05, type: 'spring', stiffness: 120 }}
        onClick={() => setShowDetail(true)}
        className="group cursor-pointer rounded-2xl border transition-all duration-300 hover:-translate-y-0.5 h-full flex flex-col
          bg-white border-gray-200/70
          dark:bg-gray-900/60 dark:border-gray-700/50 dark:hover:shadow-lg dark:hover:shadow-black/20 dark:hover:border-gray-600/60"
      >
        <div className="p-5 flex-1 flex flex-col">
          {/* Header */}
          <div className="flex items-center justify-between mb-3">
            <span
              className="text-[10px] font-medium px-2.5 py-1 rounded-full"
              style={{ background: soft.bg, color: soft.text }}
            >
              {programme.pilier}
            </span>
            <span className="text-[10px] text-gray-400 dark:text-gray-500">
              {programme.totalStartups} startups
            </span>
          </div>

          {/* Title */}
          <h3 className="text-sm font-semibold mb-1 transition-colors
            text-gray-900 group-hover:text-gray-600
            dark:text-gray-100 dark:group-hover:text-gray-300">
            {programme.name}
          </h3>

          {/* Description */}
          <p className="text-[11px] text-gray-400 dark:text-gray-500 line-clamp-2 mb-4 leading-relaxed flex-1">
            {programme.description}
          </p>

          {/* Stats Grid */}
          <div className="grid grid-cols-3 gap-1.5 mb-3">
            <div className="text-center rounded-lg py-1.5 bg-gray-100 dark:bg-gray-800/50">
              <div className="text-xs font-semibold text-gray-700 dark:text-gray-300">{programme.startupsActives}</div>
              <div className="text-[9px] text-gray-400 dark:text-gray-500">Actives</div>
            </div>
            <div className="text-center rounded-lg py-1.5 bg-gray-100 dark:bg-gray-800/50">
              <div className="text-xs font-semibold text-gray-700 dark:text-gray-300">{programme.totalEmplois}</div>
              <div className="text-[9px] text-gray-400 dark:text-gray-500">Emplois</div>
            </div>
            <div className="text-center rounded-lg py-1.5 bg-gray-100 dark:bg-gray-800/50">
              <div className="text-xs font-semibold text-gray-700 dark:text-gray-300">{activeRate}%</div>
              <div className="text-[9px] text-gray-400 dark:text-gray-500">Activité</div>
            </div>
          </div>

          {/* Activity bar — soft tinted color */}
          <div className="h-1 bg-gray-100 dark:bg-gray-800 rounded-full overflow-hidden">
            <div
              className="h-full rounded-full transition-all"
              style={{ width: `${activeRate}%`, background: soft.bar }}
            />
          </div>
        </div>
      </motion.div>

      {/* Detail Modal */}
      <AnimatePresence>
        {showDetail && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm"
            onClick={() => setShowDetail(false)}
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="rounded-2xl border max-w-xl w-full max-h-[80vh] overflow-y-auto
                bg-white border-gray-200 dark:bg-gray-900 dark:border-gray-700"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="p-6">
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <span
                      className="text-[10px] font-medium px-2.5 py-1 rounded-full"
                      style={{ background: soft.bg, color: soft.text }}
                    >
                      {programme.pilier}
                    </span>
                    <h2 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mt-2">
                      {programme.name}
                    </h2>
                  </div>
                  <button
                    onClick={() => setShowDetail(false)}
                    className="p-1.5 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-400 dark:text-gray-500 transition-colors"
                  >
                    <X size={16} />
                  </button>
                </div>
                <p className="text-sm text-gray-500 dark:text-gray-400 mb-5 leading-relaxed">
                  {programme.description}
                </p>

                {/* Stats grid */}
                <h4 className="text-[10px] font-semibold text-gray-400 dark:text-gray-500 uppercase tracking-wider mb-3">
                  Statistiques
                </h4>
                <div className="grid grid-cols-2 gap-2.5 mb-5">
                  {[
                    { icon: Users, label: 'Total startups', value: programme.totalStartups },
                    { icon: TrendingUp, label: `Actives (${activeRate}%)`, value: programme.startupsActives },
                    { icon: CheckCircle, label: 'Formalisées', value: programme.startupsFormalisees },
                    { icon: Briefcase, label: 'Emplois créés', value: programme.totalEmplois },
                  ].map((s) => (
                    <div key={s.label} className="flex items-center gap-3 rounded-xl p-3
                      bg-gray-100 dark:bg-gray-800/50">
                      <s.icon size={15} className="shrink-0" style={{ color: soft.text }} />
                      <div>
                        <div className="text-sm font-semibold text-gray-700 dark:text-gray-300">{s.value}</div>
                        <div className="text-[10px] text-gray-400 dark:text-gray-500">{s.label}</div>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="flex items-center gap-3 rounded-xl p-3 mb-5
                  bg-gray-100 dark:bg-gray-800/50">
                  <FileCheck size={15} className="shrink-0" style={{ color: soft.text }} />
                  <div>
                    <div className="text-sm font-semibold text-gray-700 dark:text-gray-300">{programme.startupsMatures}</div>
                    <div className="text-[10px] text-gray-400 dark:text-gray-500">Startups matures</div>
                  </div>
                </div>

                <a
                  href="/dashboard/incubateur/candidature"
                  className="flex items-center justify-center gap-2 w-full py-3 rounded-xl font-semibold text-sm transition-all
                    bg-gray-900 text-white hover:bg-gray-800
                    dark:bg-gray-100 dark:text-gray-900 dark:hover:bg-gray-200"
                >
                  Candidater <ArrowRight size={15} />
                </a>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
