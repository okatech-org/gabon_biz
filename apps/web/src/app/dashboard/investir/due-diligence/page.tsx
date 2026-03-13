'use client';

import React from 'react';
import { motion } from 'framer-motion';
import {
  FileSearch,
  CheckCircle,
  Shield,
  Percent,
  Landmark,
  Users,
  Globe,
  Clock,
} from 'lucide-react';
import {
  CADRE_JURIDIQUE,
  RISQUES,
  SEVERITE_CONFIG,
  ECOSYSTEME_SUPPORT,
} from '@/lib/mock/investir-data';

const SCORE_SECTIONS = [
  { label: 'Stabilité macro', score: 82, color: '#10B981' },
  { label: 'Cadre juridique', score: 75, color: '#3B82F6' },
  { label: 'Infrastructure tech', score: 88, color: '#8B5CF6' },
  { label: 'Capital humain', score: 55, color: '#F59E0B' },
  { label: 'Écosystème startup', score: 68, color: '#EC4899' },
];

const globalScore = Math.round(
  SCORE_SECTIONS.reduce((s, x) => s + x.score, 0) / SCORE_SECTIONS.length,
);

export default function DueDiligencePage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 rounded-xl bg-linear-to-br from-violet-500 to-purple-600 flex items-center justify-center text-white">
          <FileSearch size={18} />
        </div>
        <div>
          <h1 className="text-xl font-black text-gray-900 dark:text-white">Due Diligence Pays</h1>
          <p className="text-sm text-gray-500">
            Fiche d&apos;analyse pour votre comité d&apos;investissement
          </p>
        </div>
      </div>

      {/* Global confidence score */}
      <div className="bg-linear-to-br from-violet-500 to-purple-600 rounded-2xl p-6 text-white">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-xs font-bold text-white/60 uppercase tracking-wider">
              Score de confiance global
            </p>
            <p className="text-5xl font-black">
              {globalScore}
              <span className="text-lg text-white/60">/100</span>
            </p>
            <p className="text-xs text-white/80 mt-1 flex items-center gap-1">
              <Clock size={10} /> Mis à jour : mars 2026
            </p>
          </div>
          <div className="space-y-2 w-48">
            {SCORE_SECTIONS.map((s) => (
              <div key={s.label} className="flex items-center gap-2">
                <span className="text-[10px] text-white/70 w-24 shrink-0">{s.label}</span>
                <div className="flex-1 h-2 bg-white/20 rounded-full overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${s.score}%` }}
                    transition={{ duration: 1 }}
                    className="h-full rounded-full"
                    style={{ background: s.color }}
                  />
                </div>
                <span className="text-[10px] font-bold w-6 text-right">{s.score}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Cadre juridique */}
      <div>
        <h2 className="text-sm font-bold text-gray-500 uppercase tracking-wider mb-3">
          Cadre Juridique & Fiscal
        </h2>
        <div className="grid md:grid-cols-2 gap-3">
          {CADRE_JURIDIQUE.map((c, i) => {
            const Icon = c.icon;
            return (
              <motion.div
                key={c.titre}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.05 }}
                className="bg-white dark:bg-white/5 rounded-xl border border-gray-200/60 dark:border-white/8 p-4 flex gap-3"
              >
                <Icon size={16} className="text-teal-500 mt-0.5 shrink-0" />
                <div>
                  <h3 className="text-xs font-bold text-gray-900 dark:text-white mb-0.5">
                    {c.titre}
                  </h3>
                  <p className="text-xs text-gray-600 dark:text-gray-400">{c.description}</p>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>

      {/* Risques */}
      <div>
        <h2 className="text-sm font-bold text-gray-500 uppercase tracking-wider mb-3">
          Matrice de Risques
        </h2>
        <div className="space-y-3">
          {RISQUES.map((r, i) => {
            const sev = SEVERITE_CONFIG[r.severite];
            return (
              <motion.div
                key={r.risque}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.05 }}
                className="bg-white dark:bg-white/5 rounded-xl border border-gray-200/60 dark:border-white/8 p-4"
              >
                <div className="flex items-center justify-between mb-2">
                  <h3 className="text-xs font-bold text-gray-900 dark:text-white">{r.risque}</h3>
                  <span
                    className="text-[10px] font-bold px-2 py-0.5 rounded-full text-white"
                    style={{ background: sev.color }}
                  >
                    {sev.label}
                  </span>
                </div>
                <p className="text-xs text-gray-500 mb-2">{r.description}</p>
                <div className="flex items-start gap-1.5 bg-green-50 dark:bg-green-500/5 rounded-lg p-2 border border-green-200/40 dark:border-green-500/10">
                  <Shield size={10} className="text-green-500 mt-0.5 shrink-0" />
                  <p className="text-[10px] text-green-700 dark:text-green-300">{r.attenuation}</p>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>

      {/* Ecosystem */}
      <div>
        <h2 className="text-sm font-bold text-gray-500 uppercase tracking-wider mb-3">
          Écosystème de Support
        </h2>
        <div className="grid md:grid-cols-3 gap-3">
          {ECOSYSTEME_SUPPORT.map((inst) => {
            const Icon = inst.icon;
            return (
              <div
                key={inst.name}
                className="bg-white dark:bg-white/5 rounded-xl border border-gray-200/60 dark:border-white/8 p-3 flex items-center gap-3"
              >
                <div
                  className="w-8 h-8 rounded-lg flex items-center justify-center text-white shrink-0"
                  style={{ background: inst.color }}
                >
                  <Icon size={12} />
                </div>
                <div>
                  <p className="text-xs font-bold text-gray-900 dark:text-white">{inst.name}</p>
                  <p className="text-[10px] text-gray-500">{inst.role}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
