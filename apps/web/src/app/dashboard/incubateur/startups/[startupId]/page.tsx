'use client';

import React from 'react';
import { motion } from 'framer-motion';
import {
  ArrowLeft,
  ExternalLink,
  Star,
  Building2,
  Calendar,
  Users,
  CheckCircle,
  Zap,
} from 'lucide-react';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import { ALL_STARTUPS_SING } from '@/lib/mock/incubateur-startups';
import { SECTEUR_CONFIG, PROGRAMMES_REELS } from '@/lib/mock/incubateur-data';

export default function StartupDetailPage() {
  const params = useParams();
  const startup = ALL_STARTUPS_SING.find((s) => s.id === params.startupId);

  if (!startup) {
    return (
      <div className="text-center py-20">
        <h2 className="text-xl font-bold text-gray-900 dark:text-white">Startup non trouvée</h2>
        <Link
          href="/dashboard/incubateur/startups"
          className="text-pink-500 text-sm mt-2 inline-block"
        >
          ← Retour au portfolio
        </Link>
      </div>
    );
  }

  const secteurConf = SECTEUR_CONFIG[startup.secteur] || { label: startup.secteurRaw, color: '#6b7280' };
  const programme = PROGRAMMES_REELS.find(p => p.id === startup.programmeId);
  const initials = startup.nom.replace(/[^A-Z]/g, '').slice(0, 2) || startup.nom.slice(0, 2).toUpperCase();

  return (
    <div className="space-y-6">
      <Link
        href="/dashboard/incubateur/startups"
        className="inline-flex items-center gap-1.5 text-sm text-gray-500 hover:text-pink-500 transition-colors"
      >
        <ArrowLeft size={14} /> Retour au portfolio
      </Link>

      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white dark:bg-white/5 rounded-2xl border border-gray-200/60 dark:border-white/8 p-6"
      >
        <div className="flex items-start gap-4">
          <div
            className="w-16 h-16 rounded-2xl flex items-center justify-center text-white text-xl font-black"
            style={{ background: secteurConf.color }}
          >
            {initials}
          </div>
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-1">
              <h1 className="text-2xl font-black text-gray-900 dark:text-white">{startup.nom}</h1>
              {startup.tier === 'TOP' && <Star size={16} className="text-amber-400 fill-amber-400" />}
              <span className="text-xs text-gray-400">#{startup.num}</span>
            </div>
            <p className="text-base text-gray-600 dark:text-gray-400 mb-2">
              {programme?.name || startup.programmeRaw}
            </p>
            <div className="flex flex-wrap gap-2">
              <span
                className="text-xs font-bold px-3 py-1 rounded-full text-white"
                style={{ background: secteurConf.color }}
              >
                {secteurConf.label}
              </span>
              <span className={`text-xs font-bold px-3 py-1 rounded-full ${
                startup.tier === 'TOP' ? 'bg-amber-500/10 text-amber-600 border border-amber-400/20' :
                startup.tier === 'ACTIVE' ? 'bg-emerald-500/10 text-emerald-600 border border-emerald-400/20' :
                'bg-gray-500/10 text-gray-500 border border-gray-400/20'
              }`}>
                {startup.tier === 'TOP' ? '⭐ Top Startup' : startup.tier === 'ACTIVE' ? '✓ Active' : '○ Inactive'}
              </span>
              {startup.maturite === 'M' && (
                <span className="text-xs font-bold px-3 py-1 rounded-full bg-blue-500/10 text-blue-600 border border-blue-400/20">
                  Mature
                </span>
              )}
              {startup.siteWeb && (
                <a
                  href={startup.siteWeb}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 text-xs text-pink-500 hover:underline"
                >
                  <ExternalLink size={12} /> {startup.siteWeb}
                </a>
              )}
            </div>
          </div>
        </div>
      </motion.div>

      {/* Key Metrics */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        {[
          { label: 'Emplois créés', value: startup.emplois.toString(), icon: Users, color: '#3B82F6' },
          { label: 'Statut', value: startup.actif ? 'Actif' : 'Inactif', icon: Zap, color: startup.actif ? '#10B981' : '#9CA3AF' },
          { label: 'Formalisé', value: startup.formalisation ? 'Oui' : 'Non', icon: CheckCircle, color: startup.formalisation ? '#10B981' : '#EF4444' },
          { label: 'Score', value: startup.score.toFixed(1), icon: Star, color: '#F59E0B' },
        ].map((m, i) => (
          <motion.div
            key={m.label}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.05 }}
            className="bg-white dark:bg-white/5 rounded-xl border border-gray-200/60 dark:border-white/8 p-4 text-center"
          >
            <m.icon size={18} className="mx-auto mb-2" style={{ color: m.color }} />
            <div className="text-xl font-black text-gray-900 dark:text-white">{m.value}</div>
            <div className="text-xs text-gray-500 mt-1">{m.label}</div>
          </motion.div>
        ))}
      </div>

      {/* Details */}
      <div className="grid md:grid-cols-2 gap-4">
        <div className="bg-white dark:bg-white/5 rounded-2xl border border-gray-200/60 dark:border-white/8 p-6 space-y-4">
          <h2 className="text-sm font-bold text-gray-900 dark:text-white">Informations</h2>
          <div className="flex items-center gap-2 text-sm">
            <Building2 size={14} className="text-pink-500" />
            <span className="text-gray-500">Programme:</span>
            <span className="font-bold text-gray-900 dark:text-white">{programme?.name || startup.programmeRaw}</span>
          </div>
          <div className="flex items-center gap-2 text-sm">
            <Calendar size={14} className="text-pink-500" />
            <span className="text-gray-500">Démarrage:</span>
            <span className="font-bold text-gray-900 dark:text-white">{startup.dateDemarrage || 'Non renseigné'}</span>
          </div>
          <div className="flex items-center gap-2 text-sm">
            <Users size={14} className="text-pink-500" />
            <span className="text-gray-500">Maturité:</span>
            <span className="font-bold text-gray-900 dark:text-white">{startup.maturite === 'M' ? 'Mature' : 'Immature'}</span>
          </div>
          <div className="flex items-center gap-2 text-sm">
            <Zap size={14} className="text-pink-500" />
            <span className="text-gray-500">Secteur brut:</span>
            <span className="font-bold text-gray-900 dark:text-white">{startup.secteurRaw}</span>
          </div>
        </div>
        {programme && (
          <div className="bg-white dark:bg-white/5 rounded-2xl border border-gray-200/60 dark:border-white/8 p-6">
            <h2 className="text-sm font-bold text-gray-900 dark:text-white mb-3">Programme: {programme.name}</h2>
            <p className="text-xs text-gray-600 dark:text-gray-400 mb-4">{programme.description}</p>
            <div className="grid grid-cols-2 gap-2">
              {[
                { label: 'Total startups', value: programme.totalStartups },
                { label: 'Actives', value: programme.startupsActives },
                { label: 'Emplois', value: programme.totalEmplois },
                { label: 'Formalisées', value: programme.startupsFormalisees },
              ].map((s) => (
                <div key={s.label} className="bg-gray-50 dark:bg-white/3 rounded-lg p-2 text-center">
                  <div className="text-sm font-bold text-gray-900 dark:text-white">{s.value}</div>
                  <div className="text-[9px] text-gray-500">{s.label}</div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
