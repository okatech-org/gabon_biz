'use client';

import React, { useState } from 'react';
import { Rocket } from 'lucide-react';
import VerticaleCard from '@/components/investir/VerticaleCard';
import { VERTICALES } from '@/lib/mock/investir-data';

export default function OpportunitesPage() {
  const [compare, setCompare] = useState<string[]>([]);

  const toggleCompare = (id: string) => {
    setCompare((prev) =>
      prev.includes(id)
        ? prev.filter((x) => x !== id)
        : prev.length < 2
          ? [...prev, id]
          : [prev[1], id],
    );
  };

  const compared = VERTICALES.filter((v) => compare.includes(v.id));

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-emerald-500 to-teal-600 flex items-center justify-center text-white">
          <Rocket size={18} />
        </div>
        <div>
          <h1 className="text-xl font-black text-gray-900 dark:text-white">
            Opportunités Sectorielles
          </h1>
          <p className="text-sm text-gray-500">
            6 verticales d&apos;investissement avec scores d&apos;attractivité
          </p>
        </div>
      </div>

      {/* Compare bar */}
      {compare.length > 0 && (
        <div className="bg-teal-50 dark:bg-teal-500/5 rounded-xl border border-teal-200/40 dark:border-teal-500/10 p-3 flex items-center justify-between">
          <p className="text-xs text-teal-600 dark:text-teal-400 font-semibold">
            Comparaison : {compared.map((v) => v.titre).join(' vs ') || 'Sélectionnez 2 verticales'}
          </p>
          <button
            onClick={() => setCompare([])}
            className="text-xs text-teal-500 font-semibold hover:underline"
          >
            Réinitialiser
          </button>
        </div>
      )}

      {/* Side-by-side comparison */}
      {compared.length === 2 && (
        <div className="grid md:grid-cols-2 gap-4">
          {compared.map((v) => {
            const Icon = v.icon;
            return (
              <div
                key={v.id}
                className="bg-white dark:bg-white/5 rounded-2xl border border-gray-200/60 dark:border-white/8 p-5"
              >
                <div className="flex items-center gap-2 mb-3">
                  <div
                    className="w-8 h-8 rounded-lg flex items-center justify-center text-white"
                    style={{ background: v.color }}
                  >
                    <Icon size={14} />
                  </div>
                  <h3 className="text-sm font-bold text-gray-900 dark:text-white">{v.titre}</h3>
                  <span className="text-sm font-black text-teal-500 ml-auto">
                    {v.attractiveness}/100
                  </span>
                </div>
                <div className="space-y-2 text-xs">
                  <div className="flex justify-between">
                    <span className="text-gray-500">Taille:</span>
                    <span className="font-bold text-gray-900 dark:text-white">
                      {v.marche.taille}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-500">Pénétration:</span>
                    <span className="font-bold" style={{ color: v.color }}>
                      {v.marche.penetration}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-500">Croissance:</span>
                    <span className="font-bold text-gray-900 dark:text-white">
                      {v.marche.croissance}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-500">Startups:</span>
                    <span className="font-bold text-gray-900 dark:text-white">
                      {v.startupsExistantes.length}
                    </span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Cards grid with compare checkboxes */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
        {VERTICALES.map((v, i) => (
          <div key={v.id} className="relative">
            <label className="absolute top-3 right-3 z-10 flex items-center gap-1 text-[10px] text-gray-500 cursor-pointer">
              <input
                type="checkbox"
                checked={compare.includes(v.id)}
                onChange={() => toggleCompare(v.id)}
                className="rounded border-gray-300 text-teal-500"
              />
              Comparer
            </label>
            <VerticaleCard verticale={v} index={i} />
          </div>
        ))}
      </div>
    </div>
  );
}
