'use client';

import React from 'react';
import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import { ArrowLeft, Clock, Users, DollarSign, Award } from 'lucide-react';
import { getDefiById, getDaysUntilDeadline } from '@/lib/mock/innovation-data';

export default function DefiDetailPage() {
  const { defiId } = useParams<{ defiId: string }>();
  const router = useRouter();
  const defi = getDefiById(defiId);

  if (!defi) {
    return (
      <div className="text-center py-20">
        <p className="text-lg text-gray-400 mb-4">Défi introuvable</p>
        <Link href="/dashboard/innovation/defis" className="text-violet-600 text-sm no-underline hover:underline">← Retour aux défis</Link>
      </div>
    );
  }

  const d = defi;
  const daysLeft = getDaysUntilDeadline(d.deadline);

  return (
    <div className="max-w-4xl">
      <button onClick={() => router.back()} className="flex items-center gap-2 text-sm text-gray-500 hover:text-violet-600 bg-transparent border-none cursor-pointer mb-6 p-0">
        <ArrowLeft size={16} /> Retour aux défis
      </button>

      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center gap-2 mb-3">
          <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-violet-50 dark:bg-violet-900/30 text-violet-600">{d.categorie}</span>
          <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-green-50 dark:bg-green-900/20 text-green-600">{d.statut}</span>
        </div>
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">{d.titre}</h1>
        <p className="text-sm text-gray-500 dark:text-gray-400">par {d.emetteur}</p>
      </div>

      {/* Key info */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
        {[
          { icon: DollarSign, label: 'Budget', value: d.budget, color: '#F59E0B' },
          { icon: Clock, label: 'Deadline', value: `J-${daysLeft}`, color: daysLeft <= 30 ? '#EF4444' : '#3B82F6' },
          { icon: Users, label: 'Soumissions', value: `${d.soumissions}`, color: '#8B5CF6' },
          { icon: Award, label: 'Récompense', value: 'Voir ci-dessous', color: '#10B981' },
        ].map(item => (
          <div key={item.label} className="p-4 rounded-2xl bg-white dark:bg-gray-900 border border-gray-100 dark:border-gray-800 text-center">
            <item.icon size={20} className="mx-auto mb-2" style={{ color: item.color }} />
            <div className="text-sm font-bold text-gray-900 dark:text-white">{item.value}</div>
            <div className="text-xs text-gray-400">{item.label}</div>
          </div>
        ))}
      </div>

      {/* Description */}
      <div className="p-6 rounded-2xl bg-white dark:bg-gray-900 border border-gray-100 dark:border-gray-800 mb-6">
        <h2 className="text-lg font-bold text-gray-900 dark:text-white mb-3">Description du défi</h2>
        <p className="text-sm text-gray-700 dark:text-gray-300 leading-relaxed mb-4">{d.description}</p>
        <div className="flex flex-wrap gap-1.5">
          {d.tags.map(tag => (
            <span key={tag} className="text-xs px-2.5 py-1 rounded-full bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400">{tag}</span>
          ))}
        </div>
      </div>

      {/* Reward */}
      <div className="p-6 rounded-2xl bg-linear-to-r from-violet-50 to-indigo-50 dark:from-violet-950/20 dark:to-indigo-950/20 border border-violet-100 dark:border-violet-900/30 mb-6">
        <h2 className="text-lg font-bold text-gray-900 dark:text-white mb-2">🏆 Récompense</h2>
        <p className="text-sm text-gray-700 dark:text-gray-300">{d.recompense}</p>
      </div>

      {/* Submit CTA */}
      <div className="p-6 rounded-2xl bg-white dark:bg-gray-900 border border-gray-100 dark:border-gray-800">
        <h2 className="text-lg font-bold text-gray-900 dark:text-white mb-3">Soumettre une proposition</h2>
        <p className="text-sm text-gray-500 mb-4">Décrivez votre solution et expliquez en quoi elle répond au défi.</p>
        <textarea
          placeholder="Décrivez votre solution..."
          className="w-full p-4 rounded-xl bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 text-sm text-gray-900 dark:text-white resize-none h-32 outline-none focus:border-violet-400 transition-colors"
        />
        <button className="mt-3 px-6 py-3 rounded-xl bg-linear-to-r from-violet-600 to-indigo-600 text-white text-sm font-semibold border-none cursor-pointer hover:opacity-90 transition-opacity">
          Soumettre ma proposition
        </button>
      </div>
    </div>
  );
}
