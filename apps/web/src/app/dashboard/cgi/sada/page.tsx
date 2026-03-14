'use client';

// CGI Dashboard — SADA (Smart Africa Digital Academy)
// Program overview, module cards, financing, network impact

import { motion } from 'framer-motion';
import { Globe, ChevronRight, BookOpen, DollarSign, Users, Target, Calendar, MapPin, GraduationCap } from 'lucide-react';
import DashboardLayout from '@/components/DashboardLayout';
import Link from 'next/link';
import { CGI_PROGRAMME_SADA, CGI_MODULES_SADA } from '@/lib/mock/cgi-data';

export default function CGISADAPage() {
  const sada = CGI_PROGRAMME_SADA;

  return (
    <DashboardLayout>
      <div className="space-y-8">
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400">
          <Link href="/dashboard/cgi" className="hover:text-amber-500 transition-colors">CGI</Link>
          <ChevronRight size={14} />
          <span className="text-gray-900 dark:text-white font-medium">SADA</span>
        </div>

        {/* Header */}
        <div className="p-6 rounded-2xl bg-linear-to-r from-amber-500 to-orange-500 text-white">
          <div className="flex items-center gap-3 mb-3">
            <Globe size={28} />
            <h1 className="text-2xl font-extrabold">{sada.titre}</h1>
          </div>
          <p className="text-white/90 max-w-3xl">{sada.description}</p>
          <div className="mt-4 flex items-center gap-2 text-sm text-white/80">
            <Calendar size={14} />
            Signé le {new Date(sada.dateSignature).toLocaleDateString('fr-FR', { day: 'numeric', month: 'long', year: 'numeric' })}
            <span className="mx-2">·</span>
            <MapPin size={14} />
            {sada.lieuSignature}
          </div>
        </div>

        {/* Signataries */}
        <div className="grid md:grid-cols-2 gap-4">
          <div className="p-5 rounded-2xl bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800">
            <div className="text-xs text-gray-400 uppercase font-semibold mb-2">🇬🇦 Pour le Gabon</div>
            <p className="font-bold text-gray-900 dark:text-white">{sada.signataires.gabon}</p>
          </div>
          <div className="p-5 rounded-2xl bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800">
            <div className="text-xs text-gray-400 uppercase font-semibold mb-2">🌍 Pour Smart Africa</div>
            <p className="font-bold text-gray-900 dark:text-white">{sada.signataires.smartAfrica}</p>
          </div>
        </div>

        {/* Objectives */}
        <div>
          <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
            <Target size={20} className="text-amber-500" /> Objectifs
          </h2>
          <div className="grid md:grid-cols-2 gap-3">
            {sada.objectifs.map((obj, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.1 }}
                className="flex items-start gap-3 p-4 rounded-xl bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800"
              >
                <div className="w-7 h-7 rounded-lg bg-amber-50 dark:bg-amber-900/30 flex items-center justify-center shrink-0 text-amber-600 dark:text-amber-400 font-bold text-sm">
                  {i + 1}
                </div>
                <p className="text-sm text-gray-700 dark:text-gray-300">{obj}</p>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Financing */}
        <div>
          <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
            <DollarSign size={20} className="text-amber-500" /> Financements
          </h2>
          <div className="grid md:grid-cols-2 gap-4">
            {sada.financements.map((f) => (
              <div key={f.source} className="p-5 rounded-2xl bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800">
                <h3 className="font-bold text-gray-900 dark:text-white">{f.source}</h3>
                <div className="text-2xl font-extrabold text-amber-600 dark:text-amber-400 mt-1">{f.montant}</div>
                <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">{f.programme}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Modules */}
        <div>
          <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
            <BookOpen size={20} className="text-amber-500" /> Modules SADA au Gabon
          </h2>
          <div className="grid md:grid-cols-2 gap-4">
            {CGI_MODULES_SADA.map((m, i) => (
              <motion.div
                key={m.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                className="p-5 rounded-2xl bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 transition-shadow"
              >
                <h3 className="font-bold text-gray-900 dark:text-white mb-2">{m.titre}</h3>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between text-gray-500 dark:text-gray-400">
                    <span>Public</span>
                    <span className="font-medium text-gray-700 dark:text-gray-300 text-right max-w-[60%]">{m.public}</span>
                  </div>
                  <div className="flex justify-between text-gray-500 dark:text-gray-400">
                    <span>Durée</span>
                    <span className="font-medium text-gray-700 dark:text-gray-300">{m.duree}</span>
                  </div>
                  <div className="flex justify-between text-gray-500 dark:text-gray-400">
                    <span>Format</span>
                    <span className="font-medium text-gray-700 dark:text-gray-300">{m.format}</span>
                  </div>
                  <div className="flex justify-between text-gray-500 dark:text-gray-400">
                    <span>Langue</span>
                    <span className="font-medium text-gray-700 dark:text-gray-300">{m.langue}</span>
                  </div>
                  <div className="flex justify-between text-gray-500 dark:text-gray-400">
                    <span>Prochaine session</span>
                    <span className="font-medium text-amber-600 dark:text-amber-400">{m.prochaine}</span>
                  </div>
                </div>
                <div className="mt-3 pt-3 border-t border-gray-200 dark:border-gray-800 flex items-center justify-between">
                  <div className="text-xs text-gray-400">
                    <GraduationCap size={12} className="inline mr-1" />
                    {m.inscrits}/{m.places} inscrits
                  </div>
                  <div className="w-24 h-2 bg-gray-100 dark:bg-gray-800 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-amber-500 rounded-full transition-all"
                      style={{ width: `${(m.inscrits / m.places) * 100}%` }}
                    />
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Network Impact */}
        <div className="p-6 rounded-2xl bg-gray-100 dark:bg-gray-900 border border-gray-200 dark:border-gray-800">
          <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
            <Users size={20} className="text-amber-500" /> Impact Réseau SADA
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
            <div className="text-center">
              <div className="text-2xl font-extrabold text-gray-900 dark:text-white">{sada.impactReseau.paysMembres.length}</div>
              <div className="text-xs text-gray-500 dark:text-gray-400">Pays membres</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-extrabold text-amber-600 dark:text-amber-400">{sada.impactReseau.participantsFormes.toLocaleString()}</div>
              <div className="text-xs text-gray-500 dark:text-gray-400">Participants formés</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-extrabold text-gray-900 dark:text-white">{sada.impactReseau.thematiques.length}</div>
              <div className="text-xs text-gray-500 dark:text-gray-400">Thématiques</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-extrabold text-emerald-600 dark:text-emerald-400">55</div>
              <div className="text-xs text-gray-500 dark:text-gray-400">Pays reconnaissants</div>
            </div>
          </div>
          <div className="flex flex-wrap gap-2">
            {sada.impactReseau.paysMembres.map((pays) => (
              <span key={pays} className="px-3 py-1 rounded-lg bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 text-sm font-medium text-gray-700 dark:text-gray-300">
                {pays}
              </span>
            ))}
          </div>
          <div className="flex flex-wrap gap-2 mt-3">
            {sada.impactReseau.thematiques.map((t) => (
              <span key={t} className="px-2.5 py-1 rounded-lg bg-amber-50 dark:bg-amber-900/20 text-xs font-medium text-amber-700 dark:text-amber-400">
                {t}
              </span>
            ))}
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
