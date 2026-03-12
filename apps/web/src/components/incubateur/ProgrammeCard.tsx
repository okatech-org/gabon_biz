'use client';
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Clock, Users, CheckCircle, ArrowRight, X } from 'lucide-react';
import type { Programme } from '@/lib/mock/incubateur-types';
import { STATUS_CONFIG } from '@/lib/mock/incubateur-data';

export default function ProgrammeCard({
  programme,
  index = 0,
}: {
  programme: Programme;
  index?: number;
}) {
  const [showDetail, setShowDetail] = useState(false);
  const statusConf = STATUS_CONFIG[programme.status];
  const hasPlaces = programme.places.total !== null;
  const fillPercent = hasPlaces
    ? ((programme.places.total! - (programme.places.remaining ?? 0)) / programme.places.total!) *
      100
    : 0;

  return (
    <>
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: index * 0.08, type: 'spring', stiffness: 100 }}
        onClick={() => setShowDetail(true)}
        className="group cursor-pointer bg-white dark:bg-white/5 rounded-2xl border border-gray-200/60 dark:border-white/8 overflow-hidden transition-all hover:shadow-lg hover:-translate-y-1"
      >
        <div className="h-1.5 w-full" style={{ background: programme.color }} />
        <div className="p-5">
          {/* Status badge */}
          <div className="flex items-center justify-between mb-3">
            <span
              className="text-[10px] font-bold px-2.5 py-1 rounded-full text-white"
              style={{ background: statusConf.color }}
            >
              {statusConf.label}
            </span>
            {programme.status === 'OPEN' && (
              <motion.span
                animate={{ scale: [1, 1.1, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
                className="text-[10px] font-semibold text-pink-500"
              >
                ● Places dispo
              </motion.span>
            )}
          </div>

          {/* Title */}
          <h3 className="text-base font-bold text-gray-900 dark:text-white mb-1 group-hover:text-pink-500 transition-colors">
            {programme.name}
          </h3>
          <p className="text-xs text-gray-500 dark:text-gray-400 mb-3">{programme.pilier}</p>

          {/* Meta */}
          <div className="flex gap-4 text-xs text-gray-500 dark:text-gray-400 mb-3">
            <span className="flex items-center gap-1">
              <Clock size={12} /> {programme.duration}
            </span>
            <span className="flex items-center gap-1">{programme.cost}</span>
          </div>

          {/* Description */}
          <p className="text-xs text-gray-600 dark:text-gray-400 line-clamp-2 mb-4">
            {programme.description}
          </p>

          {/* Places progress */}
          {hasPlaces && (
            <div className="mb-3">
              <div className="flex justify-between text-[10px] text-gray-500 dark:text-gray-400 mb-1">
                <span>{programme.places.remaining} places restantes</span>
                <span>
                  {programme.places.total! - programme.places.remaining!}/{programme.places.total}
                </span>
              </div>
              <div className="h-1.5 bg-gray-100 dark:bg-white/8 rounded-full overflow-hidden">
                <div
                  className="h-full rounded-full transition-all"
                  style={{ width: `${fillPercent}%`, background: programme.color }}
                />
              </div>
            </div>
          )}

          {/* Tags */}
          <div className="flex flex-wrap gap-1">
            {programme.tags.map((t) => (
              <span
                key={t}
                className="text-[10px] font-medium px-1.5 py-0.5 rounded bg-gray-100 dark:bg-white/6 text-gray-500 dark:text-gray-400"
              >
                {t}
              </span>
            ))}
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
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm"
            onClick={() => setShowDetail(false)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-200 dark:border-white/10 max-w-xl w-full max-h-[80vh] overflow-y-auto shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="h-2 w-full rounded-t-2xl" style={{ background: programme.color }} />
              <div className="p-6">
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <span
                      className="text-[10px] font-bold px-2.5 py-1 rounded-full text-white"
                      style={{ background: statusConf.color }}
                    >
                      {statusConf.label}
                    </span>
                    <h2 className="text-xl font-bold text-gray-900 dark:text-white mt-2">
                      {programme.name}
                    </h2>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      {programme.pilier} · {programme.duration} · {programme.cost}
                    </p>
                  </div>
                  <button
                    onClick={() => setShowDetail(false)}
                    className="p-1 rounded-lg hover:bg-gray-100 dark:hover:bg-white/10 text-gray-400"
                  >
                    <X size={18} />
                  </button>
                </div>
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-5 leading-relaxed">
                  {programme.description}
                </p>

                {/* Phases Timeline */}
                <h4 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-3">
                  Phases du programme
                </h4>
                <div className="space-y-3 mb-5">
                  {programme.phases.map((ph, i) => (
                    <div key={i} className="flex items-center gap-3">
                      <div
                        className="w-8 h-8 rounded-full flex items-center justify-center text-white text-xs font-bold shrink-0"
                        style={{ background: programme.color }}
                      >
                        {i + 1}
                      </div>
                      <div className="flex-1">
                        <p className="text-sm font-medium text-gray-900 dark:text-white">
                          {ph.name}
                        </p>
                        <p className="text-xs text-gray-500 dark:text-gray-400">{ph.weeks}</p>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Eligibility */}
                <h4 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-3">
                  Critères d&apos;éligibilité
                </h4>
                <ul className="space-y-2 mb-5">
                  {programme.eligibility.map((e, i) => (
                    <li
                      key={i}
                      className="flex items-start gap-2 text-sm text-gray-600 dark:text-gray-400"
                    >
                      <CheckCircle
                        size={14}
                        className="mt-0.5 shrink-0"
                        style={{ color: programme.color }}
                      />
                      {e}
                    </li>
                  ))}
                </ul>

                {/* Alumni + CTA */}
                {programme.alumni.length > 0 && (
                  <div className="mb-5">
                    <h4 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">
                      Alumni
                    </h4>
                    <div className="flex flex-wrap gap-1.5">
                      {programme.alumni.map((a) => (
                        <span
                          key={a}
                          className="text-xs font-medium px-2 py-1 rounded-full bg-gray-100 dark:bg-white/6 text-gray-600 dark:text-gray-300"
                        >
                          {a}
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                {programme.status === 'OPEN' && (
                  <a
                    href="/dashboard/incubateur/candidature"
                    className="flex items-center justify-center gap-2 w-full py-3 rounded-xl text-white font-bold text-sm transition-all hover:opacity-90"
                    style={{ background: programme.color }}
                  >
                    Candidater <ArrowRight size={16} />
                  </a>
                )}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
