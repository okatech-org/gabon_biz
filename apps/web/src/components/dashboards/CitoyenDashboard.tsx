'use client';

// GABON BIZ — Espace Citoyen / Public
// Fatima Nzé — Citoyenne consultante

import React, { useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import {
  Search,
  Building2,
  FileText,
  BarChart3,
  TrendingUp,
  ArrowRight,
  MapPin,
  Globe,
  Users,
  Factory,
  BookOpen,
  ExternalLink,
  Sparkles,
} from 'lucide-react';

/* ═══════ MOCK DATA ═══════ */

const NATIONAL_STATS = [
  { icon: Building2, label: 'Entreprises au Gabon', value: '528', color: '#009e49' },
  { icon: FileText, label: 'Marchés ouverts', value: '12', color: '#3b82f6' },
  { icon: TrendingUp, label: 'Startups actives', value: '128', color: '#8b5cf6' },
  { icon: BarChart3, label: 'Score IDES', value: '0.52', color: '#f59e0b' },
];

const MARCHES_OUVERTS = [
  {
    ref: 'DGMP-2026-AO-001',
    title: 'Développement du SI de gestion des marchés publics',
    autorite: 'MENUDI',
    deadline: '30 juin 2026',
    budget: '500M — 1.2 Mds FCFA',
    sector: 'Technologies',
  },
  {
    ref: 'DGMP-2026-AO-002',
    title: 'Réhabilitation du réseau fibre optique de Libreville',
    autorite: 'ANINF',
    deadline: '15 juillet 2026',
    budget: '2 — 3.5 Mds FCFA',
    sector: 'Télécommunications',
  },
  {
    ref: 'DGMP-2026-AO-005',
    title: 'Plateforme de services numériques citoyens',
    autorite: 'MENUDI',
    deadline: '10 août 2026',
    budget: '300M — 600M FCFA',
    sector: 'E-Gouvernement',
  },
];

const ECOSYSTEM_FIGURES = [
  { label: 'Population', value: '2.4M', icon: Users, color: '#009e49' },
  { label: 'Taux Internet', value: '62.3%', icon: Globe, color: '#3b82f6' },
  { label: 'Couverture 4G', value: '78.5%', icon: TrendingUp, color: '#14b8a6' },
  { label: 'Diplômés STEM/an', value: '2 150', icon: Users, color: '#8b5cf6' },
  { label: 'Centres données', value: '3', icon: Building2, color: '#f59e0b' },
  { label: 'PIB numérique', value: '6.2%', icon: BarChart3, color: '#ec4899' },
];

const USEFUL_LINKS = [
  {
    icon: Building2,
    title: 'Guichet Unique',
    desc: "Vérifier l'existence d'une entreprise",
    href: '/dashboard/entreprises',
    color: '#009e49',
  },
  {
    icon: FileText,
    title: 'Marchés Publics',
    desc: "Appels d'offres ouverts",
    href: '/dashboard/marches',
    color: '#3b82f6',
  },
  {
    icon: BarChart3,
    title: 'Observatoire',
    desc: 'Statistiques nationales',
    href: '/dashboard/observatoire',
    color: '#f59e0b',
  },
  {
    icon: Factory,
    title: 'Filières',
    desc: 'Cartographie sectorielle',
    href: '/dashboard/filieres',
    color: '#009e49',
  },
  {
    icon: BookOpen,
    title: 'Annuaire',
    desc: 'Répertoire des entreprises',
    href: '/dashboard/annuaire',
    color: '#3b82f6',
  },
];

/* ═══════ COMPONENT ═══════ */

export default function CitoyenDashboard({ user }: { user: { name?: string; location?: string } }) {
  const [searchQuery, setSearchQuery] = useState('');

  return (
    <div className="space-y-6">
      {/* ═══════ HERO ═══════ */}
      <motion.section
        id="citoyen-hero"
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        className="rounded-2xl p-6 sm:p-8 text-white relative overflow-hidden"
        style={{ background: 'linear-gradient(135deg, #009e49 0%, #047857 50%, #065f46 100%)' }}
      >
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(255,255,255,0.12),transparent_50%)]" />
        <div className="absolute top-4 right-6 opacity-10 hidden sm:block" aria-hidden="true">
          <Globe size={120} />
        </div>
        <div className="relative z-10">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-12 h-12 rounded-xl bg-white/20 backdrop-blur-sm flex items-center justify-center shrink-0">
              <Sparkles size={24} />
            </div>
            <div className="min-w-0">
              <h1 className="text-xl sm:text-2xl font-bold">
                Bienvenue, {user?.name || 'Fatima N.'} 👋
              </h1>
              <p className="text-sm opacity-80 flex items-center gap-1">
                <MapPin size={12} className="shrink-0" /> {user?.location || 'Port-Gentil'} · Votre
                portail économique national
              </p>
            </div>
          </div>
          <p className="text-sm opacity-70 mt-3 max-w-2xl">
            Consultez l&apos;annuaire des entreprises gabonaises, les marchés publics ouverts et les
            statistiques nationales du numérique.
          </p>
        </div>
      </motion.section>

      {/* ═══════ STATS NATIONALES ═══════ */}
      <section id="citoyen-stats" className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
        {NATIONAL_STATS.map((s, i) => (
          <motion.div
            key={s.label}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.06 }}
            className="bg-white dark:bg-white/5 rounded-xl border border-gray-200/60 dark:border-white/8 p-4"
          >
            <div className="flex items-center gap-2 mb-2">
              <div
                className="w-8 h-8 rounded-lg flex items-center justify-center"
                style={{ background: `${s.color}15` }}
              >
                <s.icon size={16} style={{ color: s.color }} />
              </div>
              <span className="text-[11px] font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                {s.label}
              </span>
            </div>
            <p className="text-xl font-bold text-gray-900 dark:text-white">{s.value}</p>
          </motion.div>
        ))}
      </section>

      {/* ═══════ RECHERCHE RAPIDE ═══════ */}
      <motion.section
        id="citoyen-search"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="bg-white dark:bg-white/5 rounded-xl border border-gray-200/60 dark:border-white/8 p-4 sm:p-6"
      >
        <h2 className="text-sm font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-3 flex items-center gap-2">
          <Search size={14} /> Rechercher une entreprise
        </h2>
        <div className="flex flex-col sm:flex-row gap-3">
          <div className="flex-1 relative">
            <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
            <input
              id="citoyen-search-input"
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Nom d'entreprise, RCCM, NIF..."
              aria-label="Rechercher une entreprise par nom, RCCM ou NIF"
              className="w-full pl-10 pr-4 py-3 rounded-xl border border-gray-200 dark:border-white/10 bg-gray-50 dark:bg-white/3 text-sm text-gray-900 dark:text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-emerald-500/30 focus:border-emerald-500 transition-all"
            />
          </div>
          <Link
            href="/dashboard/annuaire"
            aria-label="Rechercher dans l'annuaire des entreprises"
            className="flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-emerald-500 hover:bg-emerald-600 text-white text-sm font-semibold no-underline transition-colors shrink-0"
          >
            Rechercher <ArrowRight size={14} />
          </Link>
        </div>
        <p className="text-[11px] text-gray-400 mt-2">
          Vérifiez l&apos;existence légale d&apos;une entreprise dans le registre national
        </p>
      </motion.section>

      {/* ═══════ MARCHÉS PUBLICS OUVERTS ═══════ */}
      <section id="citoyen-marches">
        <div className="flex items-center justify-between mb-3">
          <h2 className="text-sm font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wider flex items-center gap-2">
            <FileText size={14} /> Marchés publics ouverts
          </h2>
          <Link
            href="/dashboard/marches"
            className="text-xs font-semibold text-emerald-600 dark:text-emerald-400 flex items-center gap-1 no-underline hover:underline"
          >
            Voir tous <ExternalLink size={10} />
          </Link>
        </div>
        <div className="space-y-3">
          {MARCHES_OUVERTS.map((marche, i) => (
            <motion.div
              key={marche.ref}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.08 }}
              className="bg-white dark:bg-white/5 rounded-xl border border-gray-200/60 dark:border-white/8 p-4 sm:p-5 hover:shadow-lg hover:-translate-y-0.5 transition-all"
            >
              <div className="flex items-start justify-between mb-2">
                <div className="min-w-0">
                  <div className="flex items-center gap-2 mb-1 flex-wrap">
                    <span className="text-[10px] font-mono font-semibold text-gray-400">
                      {marche.ref}
                    </span>
                    <span className="text-[10px] font-semibold text-blue-600 bg-blue-50 dark:bg-blue-500/10 px-2 py-0.5 rounded-full">
                      Ouvert
                    </span>
                  </div>
                  <h3 className="text-sm font-semibold text-gray-900 dark:text-white">
                    {marche.title}
                  </h3>
                </div>
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4 text-xs mt-3 pt-3 border-t border-gray-100 dark:border-white/5">
                <div>
                  <span className="text-gray-400 block mb-0.5">Autorité</span>
                  <span className="font-medium text-gray-700 dark:text-gray-300">
                    {marche.autorite}
                  </span>
                </div>
                <div>
                  <span className="text-gray-400 block mb-0.5">Budget</span>
                  <span className="font-medium text-gray-700 dark:text-gray-300">
                    {marche.budget}
                  </span>
                </div>
                <div>
                  <span className="text-gray-400 block mb-0.5">Date limite</span>
                  <span className="font-medium text-gray-700 dark:text-gray-300">
                    {marche.deadline}
                  </span>
                </div>
                <div>
                  <span className="text-gray-400 block mb-0.5">Secteur</span>
                  <span className="font-medium text-gray-700 dark:text-gray-300">
                    {marche.sector}
                  </span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ═══════ ÉCOSYSTÈME EN CHIFFRES ═══════ */}
      <section id="citoyen-ecosystem">
        <h2 className="text-sm font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-3 flex items-center gap-2">
          <TrendingUp size={14} /> L&apos;écosystème numérique en chiffres
        </h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 xl:grid-cols-6 gap-3">
          {ECOSYSTEM_FIGURES.map((fig, i) => (
            <motion.div
              key={fig.label}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: i * 0.05 }}
              className="bg-white dark:bg-white/5 rounded-xl border border-gray-200/60 dark:border-white/8 p-4 text-center hover:shadow-md transition-all"
            >
              <div
                className="w-10 h-10 rounded-xl flex items-center justify-center mx-auto mb-2"
                style={{ background: `${fig.color}15` }}
              >
                <fig.icon size={18} style={{ color: fig.color }} />
              </div>
              <p className="text-lg font-bold text-gray-900 dark:text-white">{fig.value}</p>
              <p className="text-[10px] text-gray-500 dark:text-gray-400 font-medium">
                {fig.label}
              </p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ═══════ LIENS UTILES ═══════ */}
      <section id="citoyen-quick-access">
        <h2 className="text-sm font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-3">
          Accès rapide
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3">
          {USEFUL_LINKS.map((link, i) => (
            <motion.div
              key={link.href}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 + i * 0.05 }}
            >
              <Link
                href={link.href}
                aria-label={`Accéder à ${link.title}`}
                className="block bg-white dark:bg-white/5 rounded-xl border border-gray-200/60 dark:border-white/8 p-4 hover:shadow-lg hover:-translate-y-0.5 transition-all group no-underline"
              >
                <div
                  className="w-9 h-9 rounded-lg flex items-center justify-center text-white mb-3"
                  style={{ background: link.color }}
                >
                  <link.icon size={16} />
                </div>
                <h3 className="text-sm font-bold text-gray-900 dark:text-white mb-0.5 group-hover:text-emerald-500 transition-colors">
                  {link.title}
                </h3>
                <p className="text-[10px] text-gray-500 dark:text-gray-400 line-clamp-1">
                  {link.desc}
                </p>
              </Link>
            </motion.div>
          ))}
        </div>
      </section>
    </div>
  );
}
