'use client';

// CGI Dashboard — MediaLab
// Media productions grid (video, podcast, design, event coverage)

import { motion } from 'framer-motion';
import { Video, Podcast, Palette, Camera, ChevronRight, Play, ExternalLink } from 'lucide-react';
import DashboardLayout from '@/components/DashboardLayout';
import Link from 'next/link';
import { CGI_PRODUCTIONS_MEDIALAB } from '@/lib/mock/cgi-data';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const TYPE_CONFIG: Record<string, { icon: any; color: string; bg: string }> = {
  video: { icon: Video, color: 'text-red-500', bg: 'bg-red-50 dark:bg-red-900/30' },
  podcast: { icon: Podcast, color: 'text-purple-500', bg: 'bg-purple-50 dark:bg-purple-900/30' },
  design: { icon: Palette, color: 'text-pink-500', bg: 'bg-pink-50 dark:bg-pink-900/30' },
  evenement: { icon: Camera, color: 'text-blue-500', bg: 'bg-blue-50 dark:bg-blue-900/30' },
};

const STATUS_BADGE: Record<string, string> = {
  actif: 'bg-emerald-100 text-emerald-700 dark:bg-emerald-900/50 dark:text-emerald-400',
  en_production: 'bg-amber-100 text-amber-700 dark:bg-amber-900/50 dark:text-amber-400',
  terminé: 'bg-gray-100 text-gray-600 dark:bg-gray-800 dark:text-gray-400',
};

export default function CGIMediaLabPage() {
  return (
    <DashboardLayout>
      <div className="space-y-8">
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400">
          <Link href="/dashboard/cgi" className="hover:text-amber-500 transition-colors">CGI</Link>
          <ChevronRight size={14} />
          <span className="text-gray-900 dark:text-white font-medium">MediaLab</span>
        </div>

        <div>
          <h1 className="text-2xl font-extrabold text-gray-900 dark:text-white flex items-center gap-2">
            <Video size={24} className="text-purple-500" /> MediaLab
          </h1>
          <p className="text-gray-500 dark:text-gray-400 mt-1">
            Production audiovisuelle, design graphique et contenus éducatifs numériques
          </p>
        </div>

        {/* Summary Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {Object.entries(TYPE_CONFIG).map(([type, cfg]) => {
            const count = CGI_PRODUCTIONS_MEDIALAB.filter((p) => p.type === type).length;
            const totalEpisodes = CGI_PRODUCTIONS_MEDIALAB.filter((p) => p.type === type).reduce((s, p) => s + p.episodes, 0);
            const TypeIcon = cfg.icon;
            return (
              <div key={type} className="p-4 rounded-2xl bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800">
                <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${cfg.bg} mb-3`}>
                  <TypeIcon size={20} className={cfg.color} />
                </div>
                <div className="text-lg font-bold text-gray-900 dark:text-white">{count} production{count > 1 ? 's' : ''}</div>
                <div className="text-xs text-gray-500 dark:text-gray-400">{totalEpisodes} épisodes/livrables</div>
              </div>
            );
          })}
        </div>

        {/* Productions Grid */}
        <div className="grid md:grid-cols-2 gap-4">
          {CGI_PRODUCTIONS_MEDIALAB.map((prod, i) => {
            const tc = TYPE_CONFIG[prod.type] || TYPE_CONFIG.video;
            const ProdIcon = tc.icon;
            return (
              <motion.div
                key={prod.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                className="p-5 rounded-2xl bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 transition-shadow flex flex-col"
              >
                <div className="flex items-start justify-between gap-3 mb-3">
                  <div className="flex items-center gap-3">
                    <div className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 ${tc.bg}`}>
                      <ProdIcon size={20} className={tc.color} />
                    </div>
                    <div>
                      <h3 className="font-bold text-gray-900 dark:text-white">{prod.titre}</h3>
                      <p className="text-xs text-gray-500 dark:text-gray-400 capitalize">{prod.type}</p>
                    </div>
                  </div>
                  <span className={`shrink-0 px-2 py-0.5 rounded-md text-xs font-semibold ${STATUS_BADGE[prod.statut] || ''}`}>
                    {prod.statut.replace('_', ' ')}
                  </span>
                </div>

                <p className="text-sm text-gray-600 dark:text-gray-400 mb-4 flex-1">{prod.description}</p>

                <div className="space-y-2 text-xs text-gray-500 dark:text-gray-400">
                  <div className="flex justify-between">
                    <span>Format</span>
                    <span className="font-medium text-gray-700 dark:text-gray-300">{prod.format}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Épisodes / Livrables</span>
                    <span className="font-bold text-gray-900 dark:text-white">{prod.episodes}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Public cible</span>
                    <span className="font-medium text-gray-700 dark:text-gray-300">{prod.public}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span>Plateforme</span>
                    <span className="font-medium text-amber-600 dark:text-amber-400 flex items-center gap-1">
                      {prod.plateforme.length > 30 ? prod.plateforme.slice(0, 30) + '…' : prod.plateforme}
                      <ExternalLink size={10} />
                    </span>
                  </div>
                </div>

                <div className="mt-4 pt-4 border-t border-gray-200 dark:border-gray-800">
                  <button className="flex items-center gap-2 text-sm font-semibold text-purple-600 dark:text-purple-400 hover:text-purple-700 dark:hover:text-purple-300 transition-colors">
                    <Play size={14} /> Voir les contenus
                  </button>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </DashboardLayout>
  );
}
