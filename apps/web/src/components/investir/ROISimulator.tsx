'use client';

import React, { useState, useMemo, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Calculator, ArrowRight, ArrowLeft, TrendingUp, Clock, Users, Percent } from 'lucide-react';
import {
  ROI_VERTICALES_OPTIONS,
  ROI_HORIZONS,
  ROI_INSTRUMENTS,
  ROI_ENTRY_MODES,
  ROI_DISCLAIMER,
} from '@/lib/mock/investir-data';

function formatEur(n: number) {
  if (n >= 1_000_000) return `€${(n / 1_000_000).toFixed(1)}M`;
  if (n >= 1_000) return `€${(n / 1_000).toFixed(0)}K`;
  return `€${n.toFixed(0)}`;
}

export default function ROISimulator({ compact = false }: { compact?: boolean }) {
  const [step, setStep] = useState(0);
  const [montant, setMontant] = useState(500_000);
  const [verticale, setVerticale] = useState('fintech');
  const [horizon, setHorizon] = useState(5);
  const [instrument, setInstrument] = useState('equity');
  const [entry, setEntry] = useState('partnership');

  const results = useMemo(() => {
    const vm = ROI_VERTICALES_OPTIONS.find((v) => v.value === verticale)?.multiplier || 1;
    const hm = ROI_HORIZONS.find((h) => h.value === horizon)?.multiplier || 1;
    const rf = ROI_INSTRUMENTS.find((i) => i.value === instrument)?.riskFactor || 1;
    const cf = ROI_ENTRY_MODES.find((e) => e.value === entry)?.costFactor || 1;
    const base = (montant * vm * hm * rf) / cf;
    return {
      pessimiste: Math.round(base * 0.5),
      base: Math.round(base),
      optimiste: Math.round(base * 1.8),
      tri: `${((Math.pow(base / montant, 1 / horizon) - 1) * 100).toFixed(1)}%`,
      payback: `${Math.max(1, Math.round(horizon * (montant / base) * 1.2))} ans`,
      emplois: Math.round((montant / 50000) * hm),
    };
  }, [montant, verticale, horizon, instrument, entry]);

  const maxChart = results.optimiste * 1.1;

  return (
    <div className={compact ? '' : 'space-y-6'}>
      <AnimatePresence mode="wait">
        {step === 0 && (
          <motion.div
            key="s1"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="bg-white/5 backdrop-blur-xl rounded-2xl border border-white/10 p-6 space-y-5"
          >
            <h3 className="text-sm font-bold text-white flex items-center gap-2">
              <span className="w-6 h-6 rounded-full bg-teal-500 text-white text-xs font-bold flex items-center justify-center">
                1
              </span>{' '}
              Votre investissement
            </h3>
            <div>
              <label className="text-xs font-semibold text-gray-300 mb-2 block">
                Montant d&apos;investissement : {formatEur(montant)}
              </label>
              <input
                type="range"
                min={50_000}
                max={5_000_000}
                step={50_000}
                value={montant}
                onChange={(e) => setMontant(+e.target.value)}
                className="w-full accent-teal-500"
              />
              <div className="flex justify-between text-[10px] text-gray-500">
                <span>€50K</span>
                <span>€5M</span>
              </div>
            </div>
            <div>
              <label className="text-xs font-semibold text-gray-300 mb-2 block">
                Verticale ciblée
              </label>
              <div className="grid grid-cols-3 gap-2">
                {ROI_VERTICALES_OPTIONS.map((v) => (
                  <button
                    key={v.value}
                    onClick={() => setVerticale(v.value)}
                    className={`text-xs font-semibold px-3 py-2 rounded-xl transition-all ${verticale === v.value ? 'bg-teal-500 text-white' : 'bg-white/5 text-gray-400 border border-white/10 hover:border-teal-500/50'}`}
                  >
                    {v.label}
                  </button>
                ))}
              </div>
            </div>
            <div>
              <label className="text-xs font-semibold text-gray-300 mb-2 block">
                Horizon d&apos;investissement
              </label>
              <div className="flex gap-2">
                {ROI_HORIZONS.map((h) => (
                  <button
                    key={h.value}
                    onClick={() => setHorizon(h.value)}
                    className={`flex-1 text-sm font-bold py-2.5 rounded-xl transition-all ${horizon === h.value ? 'bg-teal-500 text-white' : 'bg-white/5 text-gray-400 border border-white/10'}`}
                  >
                    {h.label}
                  </button>
                ))}
              </div>
            </div>
          </motion.div>
        )}

        {step === 1 && (
          <motion.div
            key="s2"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="bg-white/5 backdrop-blur-xl rounded-2xl border border-white/10 p-6 space-y-5"
          >
            <h3 className="text-sm font-bold text-white flex items-center gap-2">
              <span className="w-6 h-6 rounded-full bg-teal-500 text-white text-xs font-bold flex items-center justify-center">
                2
              </span>{' '}
              Votre stratégie
            </h3>
            <div>
              <label className="text-xs font-semibold text-gray-300 mb-2 block">
                Type d&apos;investissement
              </label>
              <div className="space-y-2">
                {ROI_INSTRUMENTS.map((i) => (
                  <button
                    key={i.value}
                    onClick={() => setInstrument(i.value)}
                    className={`w-full text-left text-xs font-semibold px-4 py-3 rounded-xl transition-all ${instrument === i.value ? 'bg-teal-500 text-white' : 'bg-white/5 text-gray-400 border border-white/10 hover:border-teal-500/50'}`}
                  >
                    {i.label}
                  </button>
                ))}
              </div>
            </div>
            <div>
              <label className="text-xs font-semibold text-gray-300 mb-2 block">
                Mode d&apos;entrée
              </label>
              <div className="space-y-2">
                {ROI_ENTRY_MODES.map((e) => (
                  <button
                    key={e.value}
                    onClick={() => setEntry(e.value)}
                    className={`w-full text-left text-xs font-semibold px-4 py-3 rounded-xl transition-all ${entry === e.value ? 'bg-teal-500 text-white' : 'bg-white/5 text-gray-400 border border-white/10 hover:border-teal-500/50'}`}
                  >
                    {e.label}
                  </button>
                ))}
              </div>
            </div>
          </motion.div>
        )}

        {step === 2 && (
          <motion.div
            key="s3"
            initial={{ opacity: 0, y: 30, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ type: 'spring', stiffness: 100 }}
            className="bg-white/5 backdrop-blur-xl rounded-2xl border border-white/10 p-6 space-y-5"
          >
            <h3 className="text-sm font-bold text-white flex items-center gap-2">
              <span className="w-6 h-6 rounded-full bg-teal-500 text-white text-xs font-bold flex items-center justify-center">
                3
              </span>{' '}
              Résultats estimés
            </h3>

            {/* 3 scenarios */}
            <div className="grid grid-cols-3 gap-3">
              {[
                { label: 'Pessimiste', value: results.pessimiste, color: '#EF4444' },
                { label: 'Base', value: results.base, color: '#F59E0B' },
                { label: 'Optimiste', value: results.optimiste, color: '#10B981' },
              ].map((s) => (
                <motion.div
                  key={s.label}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="text-center p-4 rounded-xl bg-white/5 border border-white/5"
                >
                  <p className="text-[10px] text-gray-400 uppercase tracking-wider mb-1">
                    {s.label}
                  </p>
                  <p className="text-lg font-black" style={{ color: s.color }}>
                    {formatEur(s.value)}
                  </p>
                  <p className="text-[10px] text-gray-500">
                    {((s.value / montant - 1) * 100).toFixed(0)}% retour
                  </p>
                </motion.div>
              ))}
            </div>

            {/* Mini chart bars */}
            <div className="flex items-end gap-1 h-20">
              {Array.from({ length: horizon }, (_, i) => {
                const yr = i + 1;
                const factor = yr / horizon;
                const pess = montant + (results.pessimiste - montant) * factor;
                const base = montant + (results.base - montant) * factor;
                const opti = montant + (results.optimiste - montant) * factor;
                return (
                  <div key={yr} className="flex-1 flex flex-col items-center gap-0.5">
                    <div className="w-full flex gap-px items-end" style={{ height: '60px' }}>
                      <motion.div
                        initial={{ height: 0 }}
                        animate={{ height: `${(pess / maxChart) * 100}%` }}
                        transition={{ delay: i * 0.1 }}
                        className="flex-1 rounded-t-sm bg-red-500/50"
                      />
                      <motion.div
                        initial={{ height: 0 }}
                        animate={{ height: `${(base / maxChart) * 100}%` }}
                        transition={{ delay: i * 0.1 + 0.05 }}
                        className="flex-1 rounded-t-sm bg-amber-500/70"
                      />
                      <motion.div
                        initial={{ height: 0 }}
                        animate={{ height: `${(opti / maxChart) * 100}%` }}
                        transition={{ delay: i * 0.1 + 0.1 }}
                        className="flex-1 rounded-t-sm bg-emerald-500"
                      />
                    </div>
                    <span className="text-[9px] text-gray-500">An {yr}</span>
                  </div>
                );
              })}
            </div>

            {/* KPIs */}
            <div className="grid grid-cols-3 gap-3">
              <div className="flex items-center gap-2 p-2 rounded-lg bg-white/5">
                <Percent size={12} className="text-teal-400" />
                <div>
                  <p className="text-xs font-bold text-white">{results.tri}</p>
                  <p className="text-[10px] text-gray-500">TRI estimé</p>
                </div>
              </div>
              <div className="flex items-center gap-2 p-2 rounded-lg bg-white/5">
                <Clock size={12} className="text-teal-400" />
                <div>
                  <p className="text-xs font-bold text-white">{results.payback}</p>
                  <p className="text-[10px] text-gray-500">Payback</p>
                </div>
              </div>
              <div className="flex items-center gap-2 p-2 rounded-lg bg-white/5">
                <Users size={12} className="text-teal-400" />
                <div>
                  <p className="text-xs font-bold text-white">{results.emplois}</p>
                  <p className="text-[10px] text-gray-500">Emplois créés</p>
                </div>
              </div>
            </div>

            <p className="text-[10px] text-gray-500 leading-relaxed">{ROI_DISCLAIMER}</p>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Navigation */}
      <div className="flex justify-between mt-4">
        <button
          onClick={() => setStep(Math.max(0, step - 1))}
          disabled={step === 0}
          className="flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-semibold text-gray-400 bg-white/5 disabled:opacity-30 hover:bg-white/10 transition-all"
        >
          <ArrowLeft size={12} /> Précédent
        </button>
        {step < 2 ? (
          <button
            onClick={() => setStep(step + 1)}
            className="flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-semibold text-white bg-teal-500 hover:bg-teal-600 transition-all"
          >
            Suivant <ArrowRight size={12} />
          </button>
        ) : (
          <a
            href="/dashboard/investir"
            className="flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-semibold text-white bg-teal-500 hover:bg-teal-600 transition-all"
          >
            Dashboard complet <ArrowRight size={12} />
          </a>
        )}
      </div>
    </div>
  );
}
