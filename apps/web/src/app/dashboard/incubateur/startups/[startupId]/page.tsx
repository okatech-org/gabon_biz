'use client';

import React from 'react';
import { motion } from 'framer-motion';
import {
  ArrowLeft,
  ExternalLink,
  Star,
  Award,
  Building2,
  Calendar,
  Users,
  Banknote,
} from 'lucide-react';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import { STARTUPS_PORTFOLIO } from '@/lib/mock/incubateur-startups';
import { STAGE_CONFIG } from '@/lib/mock/incubateur-data';

const SECTOR_COLORS: Record<string, string> = {
  fintech: '#10B981',
  govtech: '#6366F1',
  healthtech: '#EF4444',
  ecommerce: '#EC4899',
  agritech: '#22C55E',
  musictech: '#F59E0B',
  insurtech: '#0EA5E9',
  mobilite: '#3B82F6',
  edtech: '#8B5CF6',
};

export default function StartupDetailPage() {
  const params = useParams();
  const startup = STARTUPS_PORTFOLIO.find((s) => s.id === params.startupId);

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

  const sectorColor = SECTOR_COLORS[startup.sector] || '#6b7280';
  const stageConf = STAGE_CONFIG[startup.stage];
  const initials =
    startup.name.replace(/[^A-Z]/g, '').slice(0, 2) || startup.name.slice(0, 2).toUpperCase();

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
            style={{ background: sectorColor }}
          >
            {initials}
          </div>
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-1">
              <h1 className="text-2xl font-black text-gray-900 dark:text-white">{startup.name}</h1>
              {startup.featured && <Star size={16} className="text-amber-400 fill-amber-400" />}
              {startup.status === 'LEGACY' && <Award size={16} className="text-violet-400" />}
            </div>
            <p className="text-base text-gray-600 dark:text-gray-400 mb-2">{startup.tagline}</p>
            <div className="flex flex-wrap gap-2">
              <span
                className="text-xs font-bold px-3 py-1 rounded-full text-white"
                style={{ background: sectorColor }}
              >
                {startup.sector}
              </span>
              {stageConf && (
                <span
                  className="text-xs font-bold px-3 py-1 rounded-full"
                  style={{ background: `${stageConf.color}15`, color: stageConf.color }}
                >
                  {stageConf.label}
                </span>
              )}
              {startup.website && (
                <a
                  href={startup.website}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 text-xs text-pink-500 hover:underline"
                >
                  <ExternalLink size={12} /> Site web
                </a>
              )}
            </div>
          </div>
        </div>
      </motion.div>

      {/* Metrics */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        {Object.entries(startup.metrics).map(([key, val], i) => (
          <motion.div
            key={key}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.05 }}
            className="bg-white dark:bg-white/5 rounded-xl border border-gray-200/60 dark:border-white/8 p-4 text-center"
          >
            <div className="text-xl font-black text-gray-900 dark:text-white">{val}</div>
            <div className="text-xs text-gray-500 capitalize mt-1">{key.replace(/_/g, ' ')}</div>
          </motion.div>
        ))}
      </div>

      {/* Description + Details */}
      <div className="grid md:grid-cols-3 gap-4">
        <div className="md:col-span-2 bg-white dark:bg-white/5 rounded-2xl border border-gray-200/60 dark:border-white/8 p-6">
          <h2 className="text-sm font-bold text-gray-900 dark:text-white mb-3">Description</h2>
          <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
            {startup.description}
          </p>
          <div className="flex flex-wrap gap-1.5 mt-4">
            {startup.tags.map((t) => (
              <span
                key={t}
                className="text-xs font-medium px-2 py-0.5 rounded-full bg-gray-100 dark:bg-white/6 text-gray-600 dark:text-gray-300"
              >
                {t}
              </span>
            ))}
          </div>
        </div>
        <div className="bg-white dark:bg-white/5 rounded-2xl border border-gray-200/60 dark:border-white/8 p-6 space-y-4">
          <div className="flex items-center gap-2 text-sm">
            <Building2 size={14} className="text-pink-500" />
            <span className="text-gray-500">Programme:</span>
            <span className="font-bold text-gray-900 dark:text-white">{startup.programme}</span>
          </div>
          <div className="flex items-center gap-2 text-sm">
            <Calendar size={14} className="text-pink-500" />
            <span className="text-gray-500">Année:</span>
            <span className="font-bold text-gray-900 dark:text-white">{startup.year}</span>
          </div>
          <div className="flex items-center gap-2 text-sm">
            <Users size={14} className="text-pink-500" />
            <span className="text-gray-500">Équipe:</span>
            <span className="font-bold text-gray-900 dark:text-white">
              {startup.employees || 'N/A'} personnes
            </span>
          </div>
          <div className="flex items-center gap-2 text-sm">
            <Banknote size={14} className="text-pink-500" />
            <span className="text-gray-500">Levée:</span>
            <span className="font-bold text-gray-900 dark:text-white">{startup.fundingRaised}</span>
          </div>
          <div className="text-sm">
            <span className="text-gray-500">Fondateurs:</span>
            {startup.founders.map((f) => (
              <p key={f.name} className="font-bold text-gray-900 dark:text-white">
                {f.name} — {f.role}
              </p>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
