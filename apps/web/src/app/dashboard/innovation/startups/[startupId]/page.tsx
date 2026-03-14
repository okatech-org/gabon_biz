'use client';

import React from 'react';
import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import { ArrowLeft, Globe, Linkedin, Twitter, MapPin, Calendar, Users } from 'lucide-react';
import SolutionCard from '@/components/innovation/SolutionCard';
import { getStartupById, getSolutionsByStartup, MATURITE_CONFIG } from '@/lib/mock/innovation-data';

export default function StartupProfilePage() {
  const { startupId } = useParams<{ startupId: string }>();
  const router = useRouter();
  const startup = getStartupById(startupId);

  if (!startup) {
    return (
      <div className="text-center py-20">
        <p className="text-lg text-gray-400 mb-4">Startup introuvable</p>
        <Link href="/dashboard/innovation/startups" className="text-violet-600 text-sm no-underline hover:underline">← Retour au catalogue</Link>
      </div>
    );
  }

  const st = startup;
  const solutions = getSolutionsByStartup(st.id);
  const stadeConf = MATURITE_CONFIG[st.stade];

  return (
    <div className="max-w-5xl">
      <button onClick={() => router.back()} className="flex items-center gap-2 text-sm text-gray-500 hover:text-violet-600 bg-transparent border-none cursor-pointer mb-6 p-0">
        <ArrowLeft size={16} /> Retour
      </button>

      {/* Header */}
      <div className="flex items-start gap-6 mb-8">
        <div className="w-20 h-20 rounded-3xl bg-linear-to-br from-violet-500 to-indigo-600 flex items-center justify-center text-white text-3xl font-bold shrink-0">
          {st.nom.charAt(0)}
        </div>
        <div className="flex-1">
          <div className="flex items-center gap-3 mb-2 flex-wrap">
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white">{st.nom}</h1>
            <span className="text-xs font-medium px-2.5 py-1 rounded-full" style={{ color: stadeConf.color, background: `${stadeConf.color}15` }}>{stadeConf.label}</span>
            {st.badges.map(b => (
              <span key={b} className="text-xs font-medium px-2.5 py-1 rounded-full bg-violet-50 dark:bg-violet-900/30 text-violet-600 dark:text-violet-400">{b}</span>
            ))}
          </div>
          <p className="text-sm text-gray-500 dark:text-gray-400 mb-1">{st.fondateur} • {st.secteur}</p>
          <div className="flex items-center gap-4 text-xs text-gray-400">
            <span className="flex items-center gap-1"><MapPin size={12} /> {st.localisation}</span>
            <span className="flex items-center gap-1"><Calendar size={12} /> Depuis {st.anneeCreation}</span>
            <span className="flex items-center gap-1"><Users size={12} /> {st.equipe} personnes</span>
          </div>
        </div>
      </div>

      {/* Description */}
      <p className="text-base text-gray-700 dark:text-gray-300 leading-relaxed mb-8">{st.description}</p>

      {/* Metrics */}
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-8">
        {Object.entries(st.metriques).map(([key, val]) => (
          <div key={key} className="p-5 rounded-2xl bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 text-center">
            <div className="text-xl font-bold text-gray-900 dark:text-white">{val}</div>
            <div className="text-xs text-gray-400 capitalize mt-1">{key}</div>
          </div>
        ))}
      </div>

      {/* Social links */}
      <div className="flex gap-3 mb-10">
        <a href={st.social.website} className="flex items-center gap-2 px-4 py-2 rounded-xl bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 text-sm no-underline hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors">
          <Globe size={14} /> Site web
        </a>
        <a href={st.social.linkedin} className="flex items-center gap-2 px-4 py-2 rounded-xl bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 text-sm no-underline hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors">
          <Linkedin size={14} /> LinkedIn
        </a>
        <a href={st.social.twitter} className="flex items-center gap-2 px-4 py-2 rounded-xl bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 text-sm no-underline hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors">
          <Twitter size={14} /> Twitter
        </a>
      </div>

      {/* Solutions */}
      {solutions.length > 0 && (
        <div>
          <h2 className="text-lg font-bold text-gray-900 dark:text-white mb-4">Solutions publiées ({solutions.length})</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {solutions.map(sol => <SolutionCard key={sol.id} solution={sol} />)}
          </div>
        </div>
      )}
    </div>
  );
}
