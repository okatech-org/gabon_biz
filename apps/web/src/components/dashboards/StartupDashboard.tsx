'use client';

// GABON BIZ — Espace Startup / Fondateur
// Sara Mboumba — CEO & Co-fondatrice, TechPay Solutions

import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import {
  Rocket,
  Lightbulb,
  Eye,
  MessageSquare,
  GraduationCap,
  ArrowRight,
  CheckCircle2,
  Clock,
  TrendingUp,
  DollarSign,
  Users,
  BookOpen,
  Target,
  Zap,
} from 'lucide-react';

/* ═══════ MOCK DATA ═══════ */

const STATS = [
  { icon: Lightbulb, label: 'Solutions publiées', value: '2', color: '#8b5cf6' },
  { icon: Eye, label: 'Vues ce mois', value: '340', color: '#3b82f6' },
  { icon: MessageSquare, label: 'Contacts reçus', value: '8', color: '#14b8a6' },
  { icon: TrendingUp, label: 'Progression cohorte', value: '75%', color: '#ec4899' },
];

const INCUBATION = {
  programme: 'SING 2.0 — Cohorte 4',
  semaine: 8,
  totalSemaines: 12,
  prochainJalon: 'Premiers clients — dans 5 jours',
  milestones: [
    { label: 'Idéation & Validation', done: true },
    { label: 'Prototype MVP', done: true },
    { label: 'Design Sprint', done: true },
    { label: 'Go-to-Market', done: false },
    { label: 'Premiers clients', done: false },
    { label: 'Demo Day', done: false },
  ],
};

const MES_SOLUTIONS = [
  {
    id: 1,
    nom: 'TechPay Mobile',
    description: 'Application de paiement mobile pour commerçants du Gabon',
    vues: 245,
    contacts: 5,
    rating: 4.7,
    secteur: 'FinTech',
    statut: 'Publiée',
    statutColor: '#10b981',
  },
  {
    id: 2,
    nom: 'TechPay API',
    description: 'API de paiement en ligne pour e-commerce CEMAC',
    vues: 95,
    contacts: 3,
    rating: 4.3,
    secteur: 'FinTech',
    statut: 'En revue',
    statutColor: '#f59e0b',
  },
];

const FUNDING_PIPELINE = [
  {
    stage: 'Recherche',
    count: 5,
    color: '#6b7280',
    items: ['Fonds FIGA', 'Programme BPI', 'AfDB Youth'],
  },
  {
    stage: 'Contact',
    count: 3,
    color: '#3b82f6',
    items: ['Ndong Capital', 'Saviu Ventures', 'POZI'],
  },
  {
    stage: 'Due Diligence',
    count: 1,
    color: '#f59e0b',
    items: ['Ndong Capital Partners'],
  },
  {
    stage: 'Closing',
    count: 0,
    color: '#10b981',
    items: [],
  },
];

const RECENT_ACTIVITY = [
  {
    text: 'Solution "TechPay Mobile" publiée sur l\'Innovation Hub',
    time: 'Il y a 3h',
    icon: Lightbulb,
    color: '#8b5cf6',
  },
  {
    text: 'Nouveau contact reçu de Ndong Capital Partners',
    time: 'Hier',
    icon: MessageSquare,
    color: '#14b8a6',
  },
  {
    text: 'Milestone complété : Design Sprint terminé',
    time: 'Il y a 3j',
    icon: CheckCircle2,
    color: '#ec4899',
  },
  {
    text: 'TechPay API — 12 nouvelles vues cette semaine',
    time: 'Il y a 4j',
    icon: Eye,
    color: '#3b82f6',
  },
];

/* ═══════ COMPONENT ═══════ */

export default function StartupDashboard({
  user,
}: {
  user: { name?: string; title?: string; organization?: string };
}) {
  const progress = Math.round((INCUBATION.semaine / INCUBATION.totalSemaines) * 100);

  return (
    <div className="space-y-6">
      {/* ═══════ HERO ═══════ */}
      <motion.section
        id="startup-hero"
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        className="rounded-2xl p-6 sm:p-8 text-white relative overflow-hidden"
        style={{ background: 'linear-gradient(135deg, #8b5cf6 0%, #6d28d9 50%, #5b21b6 100%)' }}
      >
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(255,255,255,0.15),transparent_50%)]" />
        <div className="absolute top-4 right-6 opacity-10 hidden sm:block" aria-hidden="true">
          <Rocket size={120} />
        </div>
        <div className="relative z-10">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-12 h-12 rounded-xl bg-white/20 backdrop-blur-sm flex items-center justify-center shrink-0">
              <Rocket size={24} />
            </div>
            <div>
              <h1 className="text-xl sm:text-2xl font-bold">
                Bienvenue, {user?.name || 'Sara M.'} 👋
              </h1>
              <p className="text-sm opacity-80">
                {user?.title || 'CEO & Co-fondatrice'} —{' '}
                {user?.organization || 'TechPay Solutions'}
              </p>
            </div>
          </div>
          <p className="text-sm opacity-70 mt-3 max-w-2xl">
            Publiez vos solutions, suivez votre progression dans l&apos;incubateur SING 2.0 et
            recherchez des financements pour accélérer votre croissance.
          </p>
        </div>
      </motion.section>

      {/* ═══════ STATS ═══════ */}
      <section id="startup-stats" className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
        {STATS.map((s, i) => (
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

      {/* ═══════ INCUBATION SING 2.0 ═══════ */}
      <section id="startup-incubation">
        <h2 className="text-sm font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-3 flex items-center gap-2">
          <GraduationCap size={14} /> Incubation — {INCUBATION.programme}
        </h2>
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white dark:bg-white/5 rounded-xl border border-gray-200/60 dark:border-white/8 p-5"
        >
          {/* Progress bar */}
          <div className="flex justify-between text-sm mb-2">
            <span className="font-medium text-gray-700 dark:text-gray-300">
              Semaine {INCUBATION.semaine}/{INCUBATION.totalSemaines}
            </span>
            <span className="font-bold text-purple-600 dark:text-purple-400">{progress}%</span>
          </div>
          <div className="h-3 bg-gray-100 dark:bg-white/10 rounded-full overflow-hidden mb-4">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${progress}%` }}
              transition={{ duration: 1.2 }}
              className="h-full rounded-full"
              style={{
                background: 'linear-gradient(90deg, #8b5cf6, #ec4899)',
              }}
            />
          </div>

          {/* Alert */}
          <div
            className="rounded-lg px-4 py-2.5 mb-4 flex items-center gap-2 text-sm"
            style={{ background: '#8b5cf615', color: '#8b5cf6' }}
          >
            <Zap size={14} />
            <span className="font-medium">Prochain jalon : {INCUBATION.prochainJalon}</span>
          </div>

          {/* Milestones */}
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
            {INCUBATION.milestones.map((m, i) => (
              <div
                key={i}
                className={`flex items-center gap-2 px-3 py-2 rounded-lg text-xs ${
                  m.done
                    ? 'bg-emerald-50 dark:bg-emerald-500/10 text-emerald-600 dark:text-emerald-400'
                    : 'bg-gray-100 dark:bg-white/5 text-gray-400 dark:text-gray-500'
                }`}
              >
                {m.done ? <CheckCircle2 size={12} /> : <Clock size={12} />}
                <span className={m.done ? 'font-semibold' : ''}>{m.label}</span>
              </div>
            ))}
          </div>
        </motion.div>
      </section>

      {/* ═══════ MES SOLUTIONS ═══════ */}
      <section id="startup-solutions">
        <div className="flex items-center justify-between mb-3">
          <h2 className="text-sm font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wider flex items-center gap-2">
            <Lightbulb size={14} /> Mes Solutions
          </h2>
          <Link
            href="/dashboard/innovation"
            className="text-xs font-semibold text-purple-600 dark:text-purple-400 hover:underline no-underline flex items-center gap-1"
          >
            Innovation Hub <ArrowRight size={12} />
          </Link>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {MES_SOLUTIONS.map((sol, i) => (
            <motion.div
              key={sol.id}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.08 }}
              className="bg-white dark:bg-white/5 rounded-xl border border-gray-200/60 dark:border-white/8 p-5 hover:-translate-y-0.5 transition-all"
            >
              <div className="flex items-center justify-between mb-3">
                <div className="min-w-0">
                  <h3 className="text-sm font-bold text-gray-900 dark:text-white truncate">
                    {sol.nom}
                  </h3>
                  <p className="text-xs text-gray-400 truncate">{sol.description}</p>
                </div>
                <span
                  className="text-[10px] font-semibold px-2.5 py-1 rounded-full shrink-0 ml-2"
                  style={{ background: `${sol.statutColor}15`, color: sol.statutColor }}
                >
                  {sol.statut}
                </span>
              </div>

              <div className="flex items-center gap-4 text-xs text-gray-500 dark:text-gray-400">
                <span className="flex items-center gap-1">
                  <Eye size={12} className="text-blue-500" />
                  {sol.vues} vues
                </span>
                <span className="flex items-center gap-1">
                  <MessageSquare size={12} className="text-teal-500" />
                  {sol.contacts} contacts
                </span>
                <span className="flex items-center gap-1">
                  ⭐ {sol.rating}
                </span>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ═══════ PIPELINE FINANCEMENT ═══════ */}
      <section id="startup-funding">
        <h2 className="text-sm font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-3 flex items-center gap-2">
          <DollarSign size={14} /> Pipeline de Financement
        </h2>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          {FUNDING_PIPELINE.map((stage, i) => (
            <motion.div
              key={stage.stage}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.08 }}
              className="bg-white dark:bg-white/5 rounded-xl border border-gray-200/60 dark:border-white/8 p-4"
            >
              <div className="flex items-center justify-between mb-2">
                <span
                  className="text-[10px] font-bold uppercase tracking-wider"
                  style={{ color: stage.color }}
                >
                  {stage.stage}
                </span>
                <span
                  className="w-6 h-6 rounded-full flex items-center justify-center text-white text-[10px] font-bold"
                  style={{ background: stage.color }}
                >
                  {stage.count}
                </span>
              </div>
              <div className="space-y-1">
                {stage.items.length > 0 ? (
                  stage.items.map((item, j) => (
                    <p key={j} className="text-xs text-gray-600 dark:text-gray-400 truncate">
                      {item}
                    </p>
                  ))
                ) : (
                  <p className="text-xs text-gray-300 dark:text-gray-600 italic">Aucun</p>
                )}
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ═══════ TWO-COLUMN: Activity + Quick Access ═══════ */}
      <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
        {/* ACTIVITÉ RÉCENTE */}
        <section id="startup-activity" className="lg:col-span-3">
          <h2 className="text-sm font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-3">
            Activité récente
          </h2>
          <div className="bg-white dark:bg-white/5 rounded-xl border border-gray-200/60 dark:border-white/8 divide-y divide-gray-100 dark:divide-white/5">
            {RECENT_ACTIVITY.map((a, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.05 }}
                className="flex items-center gap-3 p-3 hover:bg-gray-100 dark:hover:bg-white/3 transition-colors"
              >
                <div
                  className="w-8 h-8 rounded-lg flex items-center justify-center shrink-0"
                  style={{ background: `${a.color}15` }}
                >
                  <a.icon size={14} style={{ color: a.color }} />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm text-gray-900 dark:text-white truncate">{a.text}</p>
                  <p className="text-[10px] text-gray-400">{a.time}</p>
                </div>
                <ArrowRight size={12} className="text-gray-300 dark:text-gray-600 shrink-0" />
              </motion.div>
            ))}
          </div>
        </section>

        {/* ACCÈS RAPIDE */}
        <section id="startup-quick-access" className="lg:col-span-2">
          <h2 className="text-sm font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-3">
            Accès rapide
          </h2>
          <div className="grid grid-cols-2 gap-3">
            {[
              {
                icon: Lightbulb,
                title: 'Innovation Hub',
                desc: 'Publier et gérer',
                href: '/dashboard/innovation',
                color: '#8b5cf6',
              },
              {
                icon: GraduationCap,
                title: 'Incubateur',
                desc: 'SING 2.0 Cohorte',
                href: '/dashboard/incubateur',
                color: '#ec4899',
              },
              {
                icon: Target,
                title: 'Investir',
                desc: 'Recherche financement',
                href: '/dashboard/investir',
                color: '#14b8a6',
              },
              {
                icon: BookOpen,
                title: 'Annuaire',
                desc: 'Répertoire entreprises',
                href: '/dashboard/annuaire',
                color: '#3b82f6',
              },
            ].map((mod, i) => (
              <motion.div
                key={mod.href}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 + i * 0.05 }}
              >
                <Link
                  href={mod.href}
                  aria-label={`Accéder à ${mod.title}`}
                  className="block bg-white dark:bg-white/5 rounded-xl border border-gray-200/60 dark:border-white/8 p-4 hover:-translate-y-0.5 transition-all group no-underline"
                >
                  <div
                    className="w-9 h-9 rounded-lg flex items-center justify-center text-white mb-3"
                    style={{ background: mod.color }}
                  >
                    <mod.icon size={16} />
                  </div>
                  <h3 className="text-sm font-bold text-gray-900 dark:text-white mb-0.5 group-hover:text-purple-500 transition-colors">
                    {mod.title}
                  </h3>
                  <p className="text-[10px] text-gray-500 dark:text-gray-400">{mod.desc}</p>
                </Link>
              </motion.div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}
