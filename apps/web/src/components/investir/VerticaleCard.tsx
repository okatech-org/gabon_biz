'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ExternalLink } from 'lucide-react';
import type { VerticaleInvestissement } from '@/lib/mock/investir-data';

function AttractivenessDonut({ score, color }: { score: number; color: string }) {
  return (
    <div className="relative w-12 h-12">
      <svg viewBox="0 0 36 36" className="w-full h-full -rotate-90">
        <circle
          cx="18"
          cy="18"
          r="14"
          fill="none"
          stroke="currentColor"
          strokeWidth="3"
          className="text-gray-200 dark:text-white/10"
        />
        <motion.circle
          cx="18"
          cy="18"
          r="14"
          fill="none"
          stroke={color}
          strokeWidth="3"
          strokeLinecap="round"
          strokeDasharray={`${(score / 100) * 88} 88`}
          initial={{ strokeDasharray: '0 88' }}
          whileInView={{ strokeDasharray: `${(score / 100) * 88} 88` }}
          viewport={{ once: true }}
          transition={{ duration: 1.2, delay: 0.3 }}
        />
      </svg>
      <span className="absolute inset-0 flex items-center justify-center text-[10px] font-black text-gray-900 dark:text-white">
        {score}
      </span>
    </div>
  );
}

export default function VerticaleCard({
  verticale,
  index,
}: {
  verticale: VerticaleInvestissement;
  index: number;
}) {
  const [open, setOpen] = useState(false);
  const Icon = verticale.icon;

  return (
    <>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: index * 0.08 }}
        onClick={() => setOpen(true)}
        className="group bg-white dark:bg-white/5 rounded-2xl border border-gray-200/60 dark:border-white/8 p-5 hover:shadow-xl hover:-translate-y-1 transition-all cursor-pointer overflow-hidden relative"
      >
        {/* Header */}
        <div className="flex items-start justify-between mb-3">
          <div className="flex items-center gap-2">
            <div
              className="w-10 h-10 rounded-xl flex items-center justify-center text-white"
              style={{ background: verticale.color }}
            >
              <Icon size={18} />
            </div>
            <h3 className="text-sm font-black text-gray-900 dark:text-white leading-tight">
              {verticale.titre}
            </h3>
          </div>
          <AttractivenessDonut score={verticale.attractiveness} color={verticale.color} />
        </div>

        {/* Market */}
        <div className="grid grid-cols-3 gap-2 mb-3">
          <div>
            <p className="text-[10px] text-gray-400">Taille</p>
            <p className="text-xs font-bold text-gray-900 dark:text-white">
              {verticale.marche.taille.split(' ').slice(0, 3).join(' ')}
            </p>
          </div>
          <div>
            <p className="text-[10px] text-gray-400">Pénétration</p>
            <p className="text-xs font-bold" style={{ color: verticale.color }}>
              {verticale.marche.penetration}
            </p>
          </div>
          <div>
            <p className="text-[10px] text-gray-400">Croissance</p>
            <p className="text-xs font-bold text-gray-900 dark:text-white">
              {verticale.marche.croissance.split(' ').slice(0, 2).join(' ')}
            </p>
          </div>
        </div>

        {/* Startups */}
        <div className="flex flex-wrap gap-1 mb-2">
          {verticale.startupsExistantes.slice(0, 4).map((s) => (
            <span
              key={s.nom}
              className="text-[10px] font-medium px-2 py-0.5 rounded-full"
              style={{ background: `${verticale.color}12`, color: verticale.color }}
            >
              {s.nom}
            </span>
          ))}
          {verticale.startupsExistantes.length > 4 && (
            <span className="text-[10px] text-gray-400">
              +{verticale.startupsExistantes.length - 4}
            </span>
          )}
        </div>

        {/* Hover reveal — strategy */}
        <div className="absolute bottom-0 left-0 right-0 translate-y-full group-hover:translate-y-0 transition-transform bg-gradient-to-t from-black/80 to-transparent p-4 rounded-b-2xl">
          <p className="text-[10px] font-semibold text-white/60 uppercase tracking-wider mb-1">
            Stratégie d&apos;entrée
          </p>
          <p className="text-xs text-white line-clamp-2">{verticale.strategieEntree}</p>
        </div>
      </motion.div>

      {/* Modal */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4"
            onClick={() => setOpen(false)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-white dark:bg-gray-900 rounded-2xl max-w-lg w-full max-h-[85vh] overflow-y-auto p-6"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div
                    className="w-10 h-10 rounded-xl flex items-center justify-center text-white"
                    style={{ background: verticale.color }}
                  >
                    <Icon size={18} />
                  </div>
                  <h2 className="text-lg font-black text-gray-900 dark:text-white">
                    {verticale.titre}
                  </h2>
                </div>
                <button
                  onClick={() => setOpen(false)}
                  className="text-gray-400 hover:text-gray-600"
                >
                  <X size={20} />
                </button>
              </div>

              <div className="space-y-4">
                <div>
                  <h3 className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-1">
                    Opportunité
                  </h3>
                  <p className="text-sm text-gray-700 dark:text-gray-300">
                    {verticale.opportunite}
                  </p>
                </div>
                <div className="grid grid-cols-3 gap-3">
                  <div className="bg-gray-50 dark:bg-white/5 rounded-xl p-3">
                    <p className="text-[10px] text-gray-500 mb-1">Taille</p>
                    <p className="text-xs font-bold text-gray-900 dark:text-white">
                      {verticale.marche.taille}
                    </p>
                  </div>
                  <div className="bg-gray-50 dark:bg-white/5 rounded-xl p-3">
                    <p className="text-[10px] text-gray-500 mb-1">Pénétration</p>
                    <p className="text-xs font-bold" style={{ color: verticale.color }}>
                      {verticale.marche.penetration}
                    </p>
                  </div>
                  <div className="bg-gray-50 dark:bg-white/5 rounded-xl p-3">
                    <p className="text-[10px] text-gray-500 mb-1">Croissance</p>
                    <p className="text-xs font-bold text-gray-900 dark:text-white">
                      {verticale.marche.croissance}
                    </p>
                  </div>
                </div>
                <div>
                  <h3 className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">
                    Startups existantes
                  </h3>
                  <div className="space-y-2">
                    {verticale.startupsExistantes.map((s) => (
                      <div
                        key={s.nom}
                        className="flex items-center justify-between p-2 rounded-lg bg-gray-50 dark:bg-white/5"
                      >
                        <div>
                          <p className="text-sm font-bold text-gray-900 dark:text-white">{s.nom}</p>
                          <p className="text-xs text-gray-500">{s.description}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
                <div>
                  <h3 className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-1">
                    Risques
                  </h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400">{verticale.risques}</p>
                </div>
                <div>
                  <h3 className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-1">
                    Stratégie d&apos;entrée
                  </h3>
                  <p className="text-sm text-gray-700 dark:text-gray-300">
                    {verticale.strategieEntree}
                  </p>
                </div>
                <button
                  className="w-full py-2.5 rounded-xl font-bold text-sm text-white transition-all hover:brightness-110"
                  style={{ background: verticale.color }}
                >
                  Exprimer mon intérêt
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
