'use client';

// CGI Dashboard — FabLab
// Projects gallery + equipment table

import { motion } from 'framer-motion';
import { Wrench, ChevronRight, Cpu, Printer, CircuitBoard, CheckCircle, Clock, Lightbulb, Rocket, Package } from 'lucide-react';
import DashboardLayout from '@/components/DashboardLayout';
import Link from 'next/link';
import { CGI_PROJETS_FABLAB, CGI_EQUIPEMENTS } from '@/lib/mock/cgi-data';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const STATUT_CONFIG: Record<string, { label: string; color: string; icon: any }> = {
  ideation: { label: 'Idéation', color: 'bg-purple-100 text-purple-700 dark:bg-purple-900/50 dark:text-purple-400', icon: Lightbulb },
  en_cours: { label: 'En cours', color: 'bg-blue-100 text-blue-700 dark:bg-blue-900/50 dark:text-blue-400', icon: Clock },
  prototype_fonctionnel: { label: 'Prototype', color: 'bg-amber-100 text-amber-700 dark:bg-amber-900/50 dark:text-amber-400', icon: Cpu },
  production: { label: 'Production', color: 'bg-emerald-100 text-emerald-700 dark:bg-emerald-900/50 dark:text-emerald-400', icon: Package },
  déployé: { label: 'Déployé', color: 'bg-green-100 text-green-700 dark:bg-green-900/50 dark:text-green-400', icon: Rocket },
};

const EQ_STATUT: Record<string, string> = {
  opérationnel: 'text-emerald-600 dark:text-emerald-400',
  maintenance: 'text-amber-600 dark:text-amber-400',
  hors_service: 'text-red-600 dark:text-red-400',
};

export default function CGIFabLabPage() {
  return (
    <DashboardLayout>
      <div className="space-y-8">
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400">
          <Link href="/dashboard/cgi" className="hover:text-amber-500 transition-colors">CGI</Link>
          <ChevronRight size={14} />
          <span className="text-gray-900 dark:text-white font-medium">FabLab</span>
        </div>

        <div>
          <h1 className="text-2xl font-extrabold text-gray-900 dark:text-white flex items-center gap-2">
            <Wrench size={24} className="text-emerald-500" /> FabLab
          </h1>
          <p className="text-gray-500 dark:text-gray-400 mt-1">
            Prototypage, fabrication numérique et robotique — CGI Libreville & FabLab Moanda (PPP Eramet Comilog)
          </p>
        </div>

        {/* Projects Gallery */}
        <div>
          <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">Projets en cours</h2>
          <div className="grid md:grid-cols-2 gap-4">
            {CGI_PROJETS_FABLAB.map((p, i) => {
              const st = STATUT_CONFIG[p.statut] || STATUT_CONFIG.en_cours;
              const StIcon = st.icon;
              return (
                <motion.div
                  key={p.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.08 }}
                  className="p-5 rounded-2xl bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 transition-shadow flex flex-col"
                >
                  <div className="flex items-start justify-between gap-3 mb-3">
                    <h3 className="font-bold text-gray-900 dark:text-white">{p.titre}</h3>
                    <span className={`shrink-0 flex items-center gap-1 px-2 py-0.5 rounded-md text-xs font-semibold ${st.color}`}>
                      <StIcon size={12} /> {st.label}
                    </span>
                  </div>
                  <p className="text-sm text-gray-600 dark:text-gray-400 mb-3 flex-1">{p.description}</p>
                  <div className="text-xs text-gray-500 dark:text-gray-400 mb-3">
                    <span className="font-medium text-gray-700 dark:text-gray-300">{p.porteur}</span> · {p.site}
                  </div>
                  <div className="flex flex-wrap gap-1.5 mb-3">
                    {p.technologies.map((t) => (
                      <span key={t} className="px-2 py-0.5 rounded-md bg-gray-100 dark:bg-gray-800 text-xs text-gray-600 dark:text-gray-300 flex items-center gap-1">
                        <CircuitBoard size={10} /> {t}
                      </span>
                    ))}
                  </div>
                  <div className="flex items-center justify-between text-xs text-gray-400">
                    <span>{p.dateDebut} → {p.dateFin}</span>
                    {p.lienKIMBA && (
                      <Link href="/dashboard/innovation" className="text-amber-500 hover:text-amber-600 font-medium flex items-center gap-1">
                        KIMBA <ChevronRight size={12} />
                      </Link>
                    )}
                  </div>
                  {p.impact && (
                    <div className="mt-3 px-3 py-2 rounded-lg bg-emerald-50 dark:bg-emerald-900/20 text-emerald-700 dark:text-emerald-400 text-xs font-medium flex items-center gap-2">
                      <CheckCircle size={14} /> {p.impact}
                    </div>
                  )}
                </motion.div>
              );
            })}
          </div>
        </div>

        {/* Equipment Table */}
        <div>
          <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
            <Printer size={20} className="text-emerald-500" /> Équipements
          </h2>
          <div className="overflow-x-auto rounded-2xl border border-gray-200 dark:border-gray-800">
            <table className="w-full text-sm">
              <thead className="bg-gray-100 dark:bg-gray-900">
                <tr>
                  <th className="px-4 py-3 text-left font-semibold text-gray-600 dark:text-gray-300">Site</th>
                  <th className="px-4 py-3 text-left font-semibold text-gray-600 dark:text-gray-300">Équipement</th>
                  <th className="px-4 py-3 text-center font-semibold text-gray-600 dark:text-gray-300">Qté</th>
                  <th className="px-4 py-3 text-center font-semibold text-gray-600 dark:text-gray-300">Statut</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100 dark:divide-gray-800 bg-white dark:bg-gray-950">
                {CGI_EQUIPEMENTS.map((eq, i) => (
                  <tr key={i} className="hover:bg-gray-100 dark:hover:bg-gray-900/50 transition-colors">
                    <td className="px-4 py-3 text-gray-600 dark:text-gray-400 font-medium">{eq.site}</td>
                    <td className="px-4 py-3 text-gray-900 dark:text-white">{eq.equipement}</td>
                    <td className="px-4 py-3 text-center font-bold text-gray-900 dark:text-white">{eq.quantite}</td>
                    <td className={`px-4 py-3 text-center font-semibold text-xs ${EQ_STATUT[eq.statut] || ''}`}>
                      {eq.statut.replace('_', ' ')}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
