'use client';

// CGI Dashboard — Formations & Certifications
// 3 sections: Acculturation, International Certifications, Tech Clubs

import { useState } from 'react';
import { motion } from 'framer-motion';
import { GraduationCap, Award, Users, BookOpen, ChevronRight, ExternalLink } from 'lucide-react';

import Link from 'next/link';
import { CGI_FORMATIONS, CGI_CERTIFICATIONS, CGI_CLUBS_TECH } from '@/lib/mock/cgi-data';

type Tab = 'formations' | 'certifications' | 'clubs';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const TABS: { id: Tab; label: string; icon: any }[] = [
  { id: 'formations', label: 'Acculturation Digitale', icon: GraduationCap },
  { id: 'certifications', label: 'Certifications Internationales', icon: Award },
  { id: 'clubs', label: 'Clubs Technologiques', icon: Users },
];

const STATUT_BADGE: Record<string, string> = {
  actif: 'bg-emerald-100 text-emerald-700 dark:bg-emerald-900/50 dark:text-emerald-400',
  en_cours: 'bg-blue-100 text-blue-700 dark:bg-blue-900/50 dark:text-blue-400',
  planifié: 'bg-amber-100 text-amber-700 dark:bg-amber-900/50 dark:text-amber-400',
  terminé: 'bg-gray-100 text-gray-600 dark:bg-gray-800 dark:text-gray-400',
};

const NIVEAU_BADGE: Record<string, string> = {
  Débutant: 'bg-green-100 text-green-700 dark:bg-green-900/50 dark:text-green-400',
  Intermédiaire: 'bg-amber-100 text-amber-700 dark:bg-amber-900/50 dark:text-amber-400',
  Avancé: 'bg-red-100 text-red-700 dark:bg-red-900/50 dark:text-red-400',
};

export default function CGIFormationsPage() {
  const [tab, setTab] = useState<Tab>('formations');

  return (
    <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400">
          <Link href="/dashboard/cgi" className="hover:text-amber-500 transition-colors">CGI</Link>
          <ChevronRight size={14} />
          <span className="text-gray-900 dark:text-white font-medium">Formations & Certifications</span>
        </div>

        <h1 className="text-2xl font-extrabold text-gray-900 dark:text-white">
          Formations & Certifications
        </h1>

        {/* Tabs */}
        <div className="flex gap-2 overflow-x-auto pb-2">
          {TABS.map((t) => (
            <button
              key={t.id}
              onClick={() => setTab(t.id)}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-medium transition-all whitespace-nowrap ${
                tab === t.id
                  ? 'bg-amber-500 text-white shadow-amber-500/20'
                  : 'bg-white dark:bg-gray-900 text-gray-600 dark:text-gray-400 border border-gray-200 dark:border-gray-800 hover:bg-gray-100 dark:hover:bg-gray-800'
              }`}
            >
              <t.icon size={16} />
              {t.label}
            </button>
          ))}
        </div>

        {/* Content */}
        {tab === 'formations' && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-4">
            <p className="text-gray-500 dark:text-gray-400">
              Programmes d&apos;acculturation numérique pour tous publics — INITIA (IA), caravanes provinciales, et formation fonction publique.
            </p>
            <div className="grid gap-4">
              {CGI_FORMATIONS.map((f) => (
                <div key={f.id} className="p-5 rounded-2xl bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 transition-shadow">
                  <div className="flex items-start justify-between gap-4 mb-3">
                    <div>
                      <h3 className="font-bold text-gray-900 dark:text-white">{f.titre}</h3>
                      <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">Public : {f.public} · Durée : {f.duree}</p>
                    </div>
                    <div className="flex gap-2 shrink-0">
                      <span className={`px-2 py-0.5 rounded-md text-xs font-semibold ${NIVEAU_BADGE[f.niveau] || ''}`}>{f.niveau}</span>
                      <span className={`px-2 py-0.5 rounded-md text-xs font-semibold ${STATUT_BADGE[f.statut] || ''}`}>{f.statut.replace('_', ' ')}</span>
                    </div>
                  </div>

                  <div className="flex items-center gap-6 text-sm">
                    <div>
                      <span className="text-gray-400">Inscrits</span>
                      <span className="ml-1 font-bold text-gray-900 dark:text-white">{f.inscrits}</span>
                    </div>
                    <div>
                      <span className="text-gray-400">Certifiés</span>
                      <span className="ml-1 font-bold text-emerald-600 dark:text-emerald-400">{f.certifies}</span>
                    </div>
                    <div>
                      <span className="text-gray-400">Réussite</span>
                      <span className="ml-1 font-bold text-amber-600 dark:text-amber-400">{f.tauxReussite}</span>
                    </div>
                    <div className="ml-auto text-xs text-gray-400">
                      <BookOpen size={12} className="inline mr-1" />
                      Prochaine : {f.prochaineCession}
                    </div>
                  </div>

                  <div className="flex flex-wrap gap-1.5 mt-3">
                    {f.metiers.map((m) => (
                      <span key={m} className="px-2 py-0.5 rounded-md bg-gray-100 dark:bg-gray-800 text-xs text-gray-600 dark:text-gray-300">{m}</span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        )}

        {tab === 'certifications' && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-4">
            <p className="text-gray-500 dark:text-gray-400">
              Certifications reconnues internationalement, délivrées en partenariat avec l&apos;UIT et Smart Africa.
            </p>
            <div className="grid md:grid-cols-2 gap-4">
              {CGI_CERTIFICATIONS.map((c) => (
                <div key={c.id} className="p-5 rounded-2xl bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 transition-shadow">
                  <div className="flex items-start justify-between gap-3 mb-3">
                    <h3 className="font-bold text-gray-900 dark:text-white">{c.titre}</h3>
                    {c.reconnaissanceInternationale && (
                      <span className="shrink-0 px-2 py-0.5 rounded-md bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 text-xs font-semibold flex items-center gap-1">
                        <ExternalLink size={10} /> International
                      </span>
                    )}
                  </div>
                  <p className="text-sm text-gray-500 dark:text-gray-400 mb-3">{c.organisme} · {c.duree}</p>
                  <p className="text-xs text-gray-400 mb-3">Prérequis : {c.prerequis}</p>
                  <div className="flex items-center gap-4 text-sm">
                    <div><span className="text-gray-400">Candidats</span> <span className="font-bold text-gray-900 dark:text-white">{c.candidats}</span></div>
                    <div><span className="text-gray-400">Certifiés</span> <span className="font-bold text-emerald-600 dark:text-emerald-400">{c.certifies}</span></div>
                    <div><span className="text-gray-400">Réussite</span> <span className="font-bold text-amber-600 dark:text-amber-400">{c.tauxReussite}</span></div>
                  </div>
                  <div className="mt-3 text-xs text-gray-400">Prochaine session : {c.prochaineSessions}</div>
                </div>
              ))}
            </div>
          </motion.div>
        )}

        {tab === 'clubs' && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-4">
            <p className="text-gray-500 dark:text-gray-400">
              Clubs technologiques implantés dans les établissements scolaires — IA, robotique, code, data.
            </p>
            <div className="overflow-x-auto rounded-2xl border border-gray-200 dark:border-gray-800">
              <table className="w-full text-sm">
                <thead className="bg-gray-100 dark:bg-gray-900">
                  <tr>
                    <th className="px-4 py-3 text-left font-semibold text-gray-600 dark:text-gray-300">Club</th>
                    <th className="px-4 py-3 text-left font-semibold text-gray-600 dark:text-gray-300">Ville</th>
                    <th className="px-4 py-3 text-left font-semibold text-gray-600 dark:text-gray-300">Encadrant</th>
                    <th className="px-4 py-3 text-center font-semibold text-gray-600 dark:text-gray-300">Membres</th>
                    <th className="px-4 py-3 text-center font-semibold text-gray-600 dark:text-gray-300">Projets</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100 dark:divide-gray-800 bg-white dark:bg-gray-950">
                  {CGI_CLUBS_TECH.map((club) => (
                    <tr key={club.id} className="hover:bg-gray-100 dark:hover:bg-gray-900/50 transition-colors">
                      <td className="px-4 py-3 font-medium text-gray-900 dark:text-white">{club.nom}</td>
                      <td className="px-4 py-3 text-gray-600 dark:text-gray-400">{club.ville}</td>
                      <td className="px-4 py-3 text-gray-600 dark:text-gray-400">{club.enseignant}</td>
                      <td className="px-4 py-3 text-center font-bold text-gray-900 dark:text-white">{club.membres}</td>
                      <td className="px-4 py-3 text-center font-bold text-amber-600 dark:text-amber-400">{club.projets}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className="text-sm text-gray-500 dark:text-gray-400 text-center">
              {CGI_CLUBS_TECH.reduce((s, c) => s + c.membres, 0)} membres · {CGI_CLUBS_TECH.reduce((s, c) => s + c.projets, 0)} projets actifs
            </div>
          </motion.div>
        )}
    </div>
  );
}
