'use client';

import React from 'react';
import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import { ArrowLeft, Heart, Flag, Play } from 'lucide-react';
import RatingStars from '@/components/ui/RatingStars';

import { getSolutionById, SOLUTIONS_KIMBA, PRICING_CONFIG, MATURITE_CONFIG } from '@/lib/mock/innovation-data';

export default function SolutionDetailPage() {
  const { solutionId } = useParams<{ solutionId: string }>();
  const router = useRouter();
  const solution = getSolutionById(solutionId);

  if (!solution) {
    return (
      <div className="text-center py-20">
        <p className="text-lg text-gray-400 mb-4">Solution introuvable</p>
        <Link href="/dashboard/innovation" className="text-violet-600 text-sm no-underline hover:underline">← Retour au catalogue</Link>
      </div>
    );
  }

  const s = solution;
  const pricingConf = PRICING_CONFIG[s.pricingModel];
  const maturiteConf = MATURITE_CONFIG[s.maturite];
  const similar = SOLUTIONS_KIMBA.filter(x => x.categorie === s.categorie && x.id !== s.id).slice(0, 3);

  return (
    <div>
      {/* Back */}
      <button onClick={() => router.back()} className="flex items-center gap-2 text-sm text-gray-500 hover:text-violet-600 bg-transparent border-none cursor-pointer mb-6 p-0">
        <ArrowLeft size={16} /> Retour au catalogue
      </button>

      <div className="flex flex-col lg:flex-row gap-8">
        {/* Main content */}
        <div className="flex-1 min-w-0">
          {/* Header */}
          <div className="flex items-center gap-2 mb-3 flex-wrap">
            <span className="text-xs font-semibold px-2.5 py-1 rounded-full" style={{ color: pricingConf.color, background: pricingConf.bg }}>{pricingConf.label}</span>
            <span className="text-xs font-medium px-2 py-0.5 rounded-full" style={{ color: maturiteConf.color, background: `${maturiteConf.color}15` }}>{maturiteConf.label}</span>
            {s.badges.map(b => (
              <span key={b} className="text-xs font-medium px-2.5 py-1 rounded-full bg-violet-50 dark:bg-violet-900/30 text-violet-600 dark:text-violet-400">{b}</span>
            ))}
          </div>

          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-1">{s.nom}</h1>
          <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">par <Link href={`/dashboard/innovation/startups/${s.startup.id}`} className="text-violet-600 dark:text-violet-400 no-underline hover:underline">{s.startup.nom}</Link></p>

          <div className="flex items-center gap-4 mb-6">
            <RatingStars rating={s.rating} count={s.ratingsCount} />
            <span className="text-sm text-gray-400">•</span>
            <span className="text-sm text-gray-500">{s.deploiements} déploiements</span>
            <span className="text-sm text-gray-400">•</span>
            <span className="text-sm text-gray-500">Publié le {new Date(s.datePublication).toLocaleDateString('fr-FR')}</span>
          </div>

          {/* Description */}
          <div className="mb-8">
            <h2 className="text-lg font-bold text-gray-900 dark:text-white mb-3">Description</h2>
            <p className="text-sm text-gray-700 dark:text-gray-300 leading-relaxed">{s.description}</p>
          </div>

          {/* Features */}
          <div className="mb-8">
            <h2 className="text-lg font-bold text-gray-900 dark:text-white mb-3">Fonctionnalités</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
              {s.fonctionnalites.map(f => (
                <div key={f} className="flex items-start gap-2 p-3 rounded-xl bg-gray-100 dark:bg-gray-800/50">
                  <span className="text-violet-500 font-bold mt-0.5">✓</span>
                  <span className="text-sm text-gray-700 dark:text-gray-300">{f}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Technologies */}
          <div className="mb-8">
            <h2 className="text-lg font-bold text-gray-900 dark:text-white mb-3">Technologies</h2>
            <div className="flex flex-wrap gap-2">
              {s.technologies.map(t => (
                <span key={t} className="text-sm px-3 py-1.5 rounded-xl bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400">{t}</span>
              ))}
            </div>
          </div>

          {/* Mock reviews */}
          <div>
            <h2 className="text-lg font-bold text-gray-900 dark:text-white mb-3">Avis utilisateurs</h2>
            <div className="space-y-3">
              {[
                { name: 'Utilisateur vérifié', rating: 5, text: 'Excellente solution, mise en place rapide et support réactif.' },
                { name: 'Entreprise Libreville', rating: 4, text: 'Bon produit dans l\'ensemble, quelques améliorations souhaitées sur le reporting.' },
              ].map((review, i) => (
                <div key={i} className="p-4 rounded-2xl bg-gray-100 dark:bg-gray-800/50">
                  <div className="flex items-center gap-3 mb-2">
                    <div className="w-8 h-8 rounded-full bg-linear-to-br from-violet-400 to-indigo-500 flex items-center justify-center text-white text-xs font-bold">
                      {review.name.charAt(0)}
                    </div>
                    <div>
                      <div className="text-sm font-semibold text-gray-900 dark:text-white">{review.name}</div>
                      <RatingStars rating={review.rating} size={12} showValue={false} />
                    </div>
                  </div>
                  <p className="text-sm text-gray-600 dark:text-gray-400">{review.text}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Sidebar */}
        <div className="lg:w-[320px] shrink-0 space-y-4">
          {/* Actions */}
          <div className="p-5 rounded-2xl bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 space-y-3">
            <button className="w-full py-3 rounded-xl bg-linear-to-r from-violet-600 to-indigo-600 text-white text-sm font-semibold border-none cursor-pointer hover:opacity-90 transition-opacity flex items-center justify-center gap-2">
              📩 Contacter la startup
            </button>
            {s.demoDisponible && (
              <button className="w-full py-3 rounded-xl bg-violet-50 dark:bg-violet-900/30 text-violet-600 dark:text-violet-400 text-sm font-semibold border-none cursor-pointer hover:bg-violet-100 dark:hover:bg-violet-900/50 transition-colors flex items-center justify-center gap-2">
                <Play size={14} /> Demander une démo
              </button>
            )}
            <div className="flex gap-2">
              <button className="flex-1 py-2.5 rounded-xl bg-gray-100 dark:bg-gray-800 text-gray-500 text-sm border-none cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors flex items-center justify-center gap-1.5">
                <Heart size={14} /> Favoris
              </button>
              <button className="flex-1 py-2.5 rounded-xl bg-gray-100 dark:bg-gray-800 text-gray-500 text-sm border-none cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors flex items-center justify-center gap-1.5">
                <Flag size={14} /> Signaler
              </button>
            </div>
          </div>

          {/* Matching score mock */}
          <div className="p-5 rounded-2xl bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800">
            <h3 className="text-sm font-bold text-gray-900 dark:text-white mb-3">Score de compatibilité</h3>
            <div className="relative w-full h-3 rounded-full bg-gray-100 dark:bg-gray-800 mb-2">
              <div className="h-full rounded-full bg-linear-to-r from-violet-500 to-indigo-500" style={{ width: '87%' }} />
            </div>
            <p className="text-2xl font-bold text-violet-600">87%</p>
            <p className="text-xs text-gray-400">Basé sur votre profil et vos recherches</p>
          </div>

          {/* Pricing */}
          <div className="p-5 rounded-2xl bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800">
            <h3 className="text-sm font-bold text-gray-900 dark:text-white mb-2">💰 Tarification</h3>
            <p className="text-base font-semibold text-gray-900 dark:text-white mb-1">{pricingConf.label}</p>
            <p className="text-sm text-gray-500">{s.prixIndicatif}</p>
          </div>

          {/* Startup link */}
          <Link href={`/dashboard/innovation/startups/${s.startup.id}`} className="block p-5 rounded-2xl bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 hover:border-violet-300 dark:hover:border-violet-700 transition-colors no-underline">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-linear-to-br from-violet-500 to-indigo-600 flex items-center justify-center text-white font-bold">
                {s.startup.nom.charAt(0)}
              </div>
              <div>
                <div className="text-sm font-semibold text-gray-900 dark:text-white">{s.startup.nom}</div>
                <div className="text-xs text-violet-600 dark:text-violet-400">Voir le profil →</div>
              </div>
            </div>
          </Link>

          {/* Similar solutions */}
          {similar.length > 0 && (
            <div className="p-5 rounded-2xl bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800">
              <h3 className="text-sm font-bold text-gray-900 dark:text-white mb-3">Solutions similaires</h3>
              <div className="space-y-2">
                {similar.map(sim => (
                  <Link key={sim.id} href={`/dashboard/innovation/${sim.id}`}
                    className="flex items-center gap-3 p-2 rounded-xl hover:bg-gray-100 dark:hover:bg-gray-800 no-underline transition-colors">
                    <div className="text-sm font-medium text-gray-900 dark:text-white">{sim.nom}</div>
                    <span className="text-xs text-gray-400 ml-auto">⭐ {sim.rating}</span>
                  </Link>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
