'use client';

import React, { Suspense, useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { Brain, Search, Loader2 } from 'lucide-react';
import { PageHeader } from '@/components/ui';
import RatingStars from '@/components/ui/RatingStars';
import { simulateMatching, getSolutionById, CATEGORIES_CONFIG, type SolutionCategorie, type MatchingResult } from '@/lib/mock/innovation-data';

const BUDGETS = ['< 5M', '5-15M', '15-40M', '> 40M'] as const;
const URGENCES = ['Immédiat', '< 3 mois', '< 6 mois'] as const;

type Step = 'input' | 'loading' | 'results';

function MatchingContent() {
  const searchParams = useSearchParams();
  const initialQuery = searchParams.get('q') || '';

  const [step, setStep] = useState<Step>(initialQuery ? 'loading' : 'input');
  const [query, setQuery] = useState(initialQuery);
  const [categorie, setCategorie] = useState<SolutionCategorie | ''>('');
  const [budget, setBudget] = useState('');
  const [urgence, setUrgence] = useState('');
  const [results, setResults] = useState<MatchingResult[]>([]);
  const [loadingText, setLoadingText] = useState('');

  // Auto-run matching if query comes from URL
  useEffect(() => {
    if (initialQuery && step === 'loading') {
      runMatching(initialQuery);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const runMatching = async (q: string) => {
    setStep('loading');
    const texts = ['Analyse de votre besoin...', 'Recherche dans 100+ solutions...', 'Classement par pertinence...'];
    for (let i = 0; i < texts.length; i++) {
      setLoadingText(texts[i]);
      await new Promise(r => setTimeout(r, 800));
    }
    const res = simulateMatching(q, categorie || undefined);
    setResults(res);
    setStep('results');
  };

  const handleSubmit = () => {
    if (!query.trim()) return;
    runMatching(query);
  };

  return (
    <div className="max-w-3xl mx-auto">
      <PageHeader title="Matching IA" subtitle="Trouvez la solution idéale en quelques secondes" />

      {/* ═══ Step 1: Input ═══ */}
      {step === 'input' && (
        <div className="p-8 rounded-3xl bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 rounded-xl bg-linear-to-br from-violet-500 to-indigo-600 flex items-center justify-center text-white">
              <Brain size={20} />
            </div>
            <h2 className="text-xl font-bold text-gray-900 dark:text-white">Assistant de Matching Intelligent</h2>
          </div>

          <label className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2 block">Décrivez votre besoin en langage libre :</label>
          <textarea value={query} onChange={e => setQuery(e.target.value)}
            placeholder="J'ai besoin d'une solution pour payer mes employés dans les provinces par mobile money..."
            className="w-full p-4 rounded-xl bg-gray-100 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 text-sm text-gray-900 dark:text-white resize-none h-28 outline-none focus:border-violet-400 transition-colors mb-5" />

          <label className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2 block">Ou sélectionnez une catégorie :</label>
          <div className="flex flex-wrap gap-2 mb-5">
            {CATEGORIES_CONFIG.map(c => (
              <button key={c.value} onClick={() => setCategorie(categorie === c.value ? '' : c.value)}
                className={`text-xs px-3 py-1.5 rounded-full border-none cursor-pointer transition-colors ${categorie === c.value ? 'text-white' : 'bg-gray-100 dark:bg-gray-800 text-gray-500'}`}
                style={categorie === c.value ? { background: c.color } : undefined}>
                {c.label}
              </button>
            ))}
          </div>

          <label className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2 block">Budget estimé :</label>
          <div className="flex flex-wrap gap-2 mb-5">
            {BUDGETS.map(b => (
              <button key={b} onClick={() => setBudget(budget === b ? '' : b)}
                className={`text-xs px-3 py-1.5 rounded-full border-none cursor-pointer transition-colors ${budget === b ? 'bg-violet-600 text-white' : 'bg-gray-100 dark:bg-gray-800 text-gray-500'}`}>
                {b} FCFA
              </button>
            ))}
          </div>

          <label className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2 block">Urgence :</label>
          <div className="flex flex-wrap gap-2 mb-8">
            {URGENCES.map(u => (
              <button key={u} onClick={() => setUrgence(urgence === u ? '' : u)}
                className={`text-xs px-3 py-1.5 rounded-full border-none cursor-pointer transition-colors ${urgence === u ? 'bg-violet-600 text-white' : 'bg-gray-100 dark:bg-gray-800 text-gray-500'}`}>
                {u}
              </button>
            ))}
          </div>

          <button onClick={handleSubmit} disabled={!query.trim()}
            className="w-full py-3.5 rounded-xl bg-linear-to-r from-violet-600 to-indigo-600 text-white text-sm font-semibold border-none cursor-pointer hover:opacity-90 transition-opacity disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2">
            <Search size={16} /> Trouver des solutions
          </button>
        </div>
      )}

      {/* ═══ Step 2: Loading ═══ */}
      {step === 'loading' && (
        <div className="p-12 rounded-3xl bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 text-center">
          <div className="w-16 h-16 rounded-2xl bg-linear-to-br from-violet-500 to-indigo-600 flex items-center justify-center text-white mx-auto mb-6 animate-pulse">
            <Brain size={28} />
          </div>
          <Loader2 size={24} className="text-violet-500 animate-spin mx-auto mb-4" />
          <p className="text-lg font-semibold text-gray-900 dark:text-white mb-2">{loadingText}</p>
          <div className="w-48 h-1.5 rounded-full bg-gray-100 dark:bg-gray-800 overflow-hidden mx-auto">
            <div className="h-full rounded-full bg-linear-to-r from-violet-500 to-indigo-500 animate-pulse" style={{ width: '60%' }} />
          </div>
        </div>
      )}

      {/* ═══ Step 3: Results ═══ */}
      {step === 'results' && (
        <div>
          <div className="p-6 rounded-3xl bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 mb-6">
            <p className="text-sm text-gray-500 mb-1">Votre recherche :</p>
            <p className="text-base font-semibold text-gray-900 dark:text-white mb-4 italic">&ldquo;{query}&rdquo;</p>
            <p className="text-lg font-bold text-gray-900 dark:text-white">✨ {results.length} solutions correspondent à votre besoin :</p>
          </div>

          <div className="space-y-4 mb-6">
            {results.map((r, i) => {
              const sol = getSolutionById(r.solutionId);
              if (!sol) return null;
              return (
                <div key={r.solutionId} className="p-5 rounded-2xl bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 hover:border-violet-300 dark:hover:border-violet-700 transition-colors">
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <span className="text-sm font-bold text-violet-600">#{i + 1}</span>
                        <Link href={`/dashboard/innovation/${sol.id}`} className="text-base font-bold text-gray-900 dark:text-white no-underline hover:text-violet-600 dark:hover:text-violet-400">
                          {sol.nom}
                        </Link>
                        <span className="text-xs text-gray-400">{sol.startup.nom}</span>
                      </div>
                      <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">{r.raison}</p>
                      <RatingStars rating={sol.rating} size={12} count={sol.ratingsCount} />
                    </div>
                    <div className="text-right">
                      <div className="text-2xl font-bold text-violet-600">{r.score}%</div>
                      <div className="w-20 h-2 rounded-full bg-gray-100 dark:bg-gray-800 overflow-hidden mt-1">
                        <div className="h-full rounded-full bg-linear-to-r from-violet-500 to-indigo-500" style={{ width: `${r.score}%` }} />
                      </div>
                      <div className="text-[10px] text-gray-400 mt-0.5">{r.score >= 80 ? 'Très pertinent' : r.score >= 60 ? 'Pertinent' : 'Partiel'}</div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          <div className="flex gap-3">
            <Link href={`/dashboard/innovation/comparer?ids=${results.slice(0, 3).map(r => r.solutionId).join(',')}`}
              className="flex-1 py-3 rounded-xl bg-linear-to-r from-violet-600 to-indigo-600 text-white text-sm font-semibold no-underline text-center hover:opacity-90 transition-opacity flex items-center justify-center gap-2">
              ⚖ Comparer le top 3
            </Link>
            <button onClick={() => { setStep('input'); setResults([]); }}
              className="px-6 py-3 rounded-xl bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 text-sm font-semibold border-none cursor-pointer hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors">
              Nouvelle recherche
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default function MatchingPage() {
  return (
    <Suspense fallback={<div className="flex items-center justify-center min-h-[40vh]"><div className="animate-spin rounded-full h-8 w-8 border-b-2 border-violet-600" /></div>}>
      <MatchingContent />
    </Suspense>
  );
}
