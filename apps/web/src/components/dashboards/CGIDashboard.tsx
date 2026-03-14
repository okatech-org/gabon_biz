'use client';

// GABON BIZ — Espace Directeur CGI
// Dr. Franck-Éric Oyane Ndong — Directeur Général, Centre Gabonais de l'Innovation

import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import {
  Lightbulb,
  GraduationCap,
  Award,
  Hammer,
  Film,
  Users,
  Handshake,
  ArrowRight,
  BarChart3,
  Target,
  TrendingUp,
  BookOpen,
} from 'lucide-react';

/* ═══════ MOCK DATA ═══════ */

const STATS = [
  { icon: GraduationCap, label: 'Personnes formées', value: '3 420', color: '#f59e0b' },
  { icon: Hammer, label: 'Projets FabLab', value: '64', color: '#8b5cf6' },
  { icon: TrendingUp, label: "Taux d'insertion", value: '78%', color: '#10b981' },
  { icon: Handshake, label: 'Partenaires', value: '12', color: '#0ea5e9' },
];

const POLES = [
  { name: 'Acculturation Numérique', icon: GraduationCap, stat1: { label: 'Formés', value: '1 850' }, stat2: { label: 'Sessions', value: '24' }, color: '#f59e0b' },
  { name: 'Certification', icon: Award, stat1: { label: 'Formés', value: '620' }, stat2: { label: 'Sessions', value: '8' }, color: '#3b82f6' },
  { name: 'FabLab', icon: Hammer, stat1: { label: 'Projets', value: '64' }, stat2: { label: 'Prototypes', value: '18' }, color: '#8b5cf6' },
  { name: 'MediaLab', icon: Film, stat1: { label: 'Productions', value: '32' }, stat2: { label: 'Diffusions', value: '12' }, color: '#ec4899' },
];

const COHORTES = [
  { name: 'INITIA #4', status: 'Inscription', inscrits: 89, max: 120, start: '20 mars 2026', color: '#10b981' },
  { name: 'SADA Batch #2', status: 'En cours', inscrits: 45, max: 50, start: '10 jan 2026', color: '#f59e0b' },
  { name: 'INITIA #3', status: 'Terminée', inscrits: 112, max: 120, start: '15 sept 2025', color: '#6b7280' },
];

const SADA_MILESTONES = [
  { label: 'Phase 1 — Diagnostic', progress: 100, color: '#10b981' },
  { label: 'Phase 2 — Formation formateurs', progress: 85, color: '#3b82f6' },
  { label: 'Phase 3 — Déploiement provincial', progress: 35, color: '#f59e0b' },
  { label: "Phase 4 — Impact & évaluation", progress: 0, color: '#6b7280' },
];

const PARTNERS = [
  { name: 'Smart Africa', type: 'Alliance', status: 'Actif', since: '2024', color: '#10b981' },
  { name: 'UIT', type: 'Agence UN', status: 'Actif', since: '2024', color: '#10b981' },
  { name: 'UNESCO', type: 'Agence UN', status: 'Actif', since: '2025', color: '#10b981' },
  { name: 'Huawei Seeds', type: 'Privé', status: 'En cours', since: '2026', color: '#f59e0b' },
];

const STATUS_CLASSES: Record<string, string> = {
  'Inscription': 'bg-emerald-50 dark:bg-emerald-500/10 text-emerald-600',
  'En cours': 'bg-amber-50 dark:bg-amber-500/10 text-amber-600',
  'Terminée': 'bg-gray-100 dark:bg-white/5 text-gray-500',
};

/* ═══════ COMPONENT ═══════ */

export default function CGIDashboard({
  user,
}: {
  user: { name?: string; title?: string; organization?: string };
}) {
  return (
    <div className="space-y-6">
      {/* ═══════ HERO ═══════ */}
      <motion.section
        id="cgi-hero"
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        className="rounded-2xl p-6 sm:p-8 text-white relative overflow-hidden"
        style={{ background: 'linear-gradient(135deg, #f59e0b 0%, #d97706 50%, #b45309 100%)' }}
      >
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(255,255,255,0.15),transparent_50%)]" />
        <div className="absolute top-4 right-6 opacity-10 hidden sm:block" aria-hidden="true">
          <Lightbulb size={120} />
        </div>
        <div className="relative z-10">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-12 h-12 rounded-xl bg-white/20 backdrop-blur-sm flex items-center justify-center shrink-0">
              <Lightbulb size={24} />
            </div>
            <div className="min-w-0">
              <div className="flex items-center gap-2 flex-wrap">
                <h1 className="text-xl sm:text-2xl font-bold">
                  Bienvenue, {user?.name || 'Dr. Oyane N.'} 👋
                </h1>
                <span className="text-[10px] font-bold bg-white/20 px-2 py-0.5 rounded-full uppercase tracking-wider shrink-0">
                  Directeur CGI
                </span>
              </div>
              <p className="text-sm opacity-80 truncate">
                {user?.title || 'Directeur Général'} —{' '}
                {user?.organization || "Centre Gabonais de l'Innovation (CGI)"}
              </p>
            </div>
          </div>
          <p className="text-sm opacity-70 mt-3 max-w-2xl">
            Pilotez les 4 pôles du CGI, suivez les cohortes d&apos;incubation, le programme SADA et
            les partenariats internationaux.
          </p>
        </div>
      </motion.section>

      {/* ═══════ STATS ═══════ */}
      <section id="cgi-stats" className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
        {STATS.map((s, i) => (
          <motion.div
            key={s.label}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.06 }}
            className="bg-white dark:bg-white/5 rounded-xl border border-gray-200/60 dark:border-white/8 p-4"
          >
            <div className="flex items-center gap-2 mb-2">
              <div className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ background: `${s.color}15` }}>
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

      {/* ═══════ LES 4 PÔLES ═══════ */}
      <section id="cgi-poles">
        <h2 className="text-sm font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-3 flex items-center gap-2">
          <Target size={14} /> Les 4 Pôles du CGI
        </h2>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
          {POLES.map((p, i) => (
            <motion.div
              key={p.name}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 + i * 0.06 }}
              className="bg-white dark:bg-white/5 rounded-xl border border-gray-200/60 dark:border-white/8 p-4"
            >
              <div className="flex items-center gap-2 mb-3">
                <div className="w-9 h-9 rounded-lg flex items-center justify-center" style={{ background: `${p.color}15` }}>
                  <p.icon size={16} style={{ color: p.color }} />
                </div>
                <h3 className="text-xs font-bold text-gray-900 dark:text-white leading-tight">{p.name}</h3>
              </div>
              <div className="space-y-2">
                <div className="flex items-center justify-between text-xs">
                  <span className="text-gray-500 dark:text-gray-400">{p.stat1.label}</span>
                  <span className="font-bold" style={{ color: p.color }}>{p.stat1.value}</span>
                </div>
                <div className="flex items-center justify-between text-xs">
                  <span className="text-gray-500 dark:text-gray-400">{p.stat2.label}</span>
                  <span className="font-bold" style={{ color: p.color }}>{p.stat2.value}</span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ═══════ TWO-COLUMN: Cohortes + SADA ═══════ */}
      <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
        {/* COHORTES */}
        <section id="cgi-cohortes" className="lg:col-span-3">
          <h2 className="text-sm font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-3 flex items-center gap-2">
            <Users size={14} /> Cohortes
          </h2>
          <div className="bg-white dark:bg-white/5 rounded-xl border border-gray-200/60 dark:border-white/8 divide-y divide-gray-100 dark:divide-white/5">
            {COHORTES.map((c, i) => (
              <motion.div
                key={c.name}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.05 }}
                className="flex items-center gap-4 p-3 sm:p-4"
              >
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1 flex-wrap">
                    <span className="text-sm font-bold text-gray-900 dark:text-white">{c.name}</span>
                    <span className={`text-[10px] font-semibold px-2 py-0.5 rounded-full ${STATUS_CLASSES[c.status] || ''}`}>
                      {c.status}
                    </span>
                  </div>
                  <p className="text-[10px] text-gray-400">Début : {c.start}</p>
                </div>
                <div className="text-right shrink-0">
                  <span className="text-sm font-bold" style={{ color: c.color }}>
                    {c.inscrits}/{c.max}
                  </span>
                  <div className="w-20 sm:w-24 h-2 bg-gray-100 dark:bg-white/5 rounded-full mt-1.5 overflow-hidden">
                    <motion.div
                      className="h-full rounded-full"
                      initial={{ width: 0 }}
                      animate={{ width: `${(c.inscrits / c.max) * 100}%` }}
                      transition={{ duration: 0.8, ease: 'easeOut' }}
                      style={{ background: c.color }}
                    />
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </section>

        {/* SADA PROGRESS */}
        <section id="cgi-sada" className="lg:col-span-2">
          <h2 className="text-sm font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-3 flex items-center gap-2">
            <BarChart3 size={14} /> Programme SADA
          </h2>
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-white dark:bg-white/5 rounded-xl border border-gray-200/60 dark:border-white/8 p-4 space-y-4"
          >
            {SADA_MILESTONES.map((m) => (
              <div key={m.label}>
                <div className="flex items-center justify-between mb-1.5">
                  <span className="text-xs font-medium text-gray-700 dark:text-gray-300">{m.label}</span>
                  <span className="text-xs font-bold" style={{ color: m.color }}>{m.progress}%</span>
                </div>
                <div className="h-2 bg-gray-100 dark:bg-white/5 rounded-full overflow-hidden">
                  <motion.div
                    className="h-full rounded-full"
                    initial={{ width: 0 }}
                    animate={{ width: `${m.progress}%` }}
                    transition={{ duration: 0.8, ease: 'easeOut' }}
                    style={{ background: m.color }}
                  />
                </div>
              </div>
            ))}
          </motion.div>
        </section>
      </div>

      {/* ═══════ TWO-COLUMN: Partners + Quick Access ═══════ */}
      <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
        {/* PARTNERS */}
        <section id="cgi-partners" className="lg:col-span-3">
          <h2 className="text-sm font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-3 flex items-center gap-2">
            <Handshake size={14} /> Partenariats
          </h2>
          <div className="bg-white dark:bg-white/5 rounded-xl border border-gray-200/60 dark:border-white/8 divide-y divide-gray-100 dark:divide-white/5">
            {PARTNERS.map((p, i) => (
              <motion.div
                key={p.name}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.05 }}
                className="flex items-center gap-3 p-3 hover:bg-gray-100 dark:hover:bg-white/3 transition-colors"
              >
                <div className="w-8 h-8 rounded-lg flex items-center justify-center shrink-0" style={{ background: `${p.color}15` }}>
                  <Handshake size={14} style={{ color: p.color }} />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-semibold text-gray-900 dark:text-white">{p.name}</p>
                  <p className="text-[10px] text-gray-400">{p.type} · Depuis {p.since}</p>
                </div>
                <span className={`px-2 py-0.5 text-[10px] font-bold rounded-full ${p.status === 'Actif' ? 'bg-emerald-50 dark:bg-emerald-500/10 text-emerald-600' : 'bg-amber-50 dark:bg-amber-500/10 text-amber-600'}`}>
                  {p.status}
                </span>
                <ArrowRight size={12} className="text-gray-300 dark:text-gray-600 shrink-0" />
              </motion.div>
            ))}
          </div>
        </section>

        {/* QUICK ACCESS */}
        <section id="cgi-quick-access" className="lg:col-span-2">
          <h2 className="text-sm font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-3">
            Accès rapide
          </h2>
          <div className="grid grid-cols-2 gap-3">
            {[
              { icon: Lightbulb, title: 'Pilotage CGI', desc: 'Gestion des pôles', href: '/dashboard/cgi', color: '#f59e0b' },
              { icon: Users, title: 'Cohortes', desc: 'INITIA / SADA', href: '/dashboard/cgi', color: '#8b5cf6' },
              { icon: BarChart3, title: 'Observatoire', desc: 'Indicateurs', href: '/dashboard/observatoire', color: '#3b82f6' },
              { icon: BookOpen, title: 'Annuaire', desc: 'Entreprises', href: '/dashboard/annuaire', color: '#10b981' },
            ].map((mod, i) => (
              <motion.div key={mod.title} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 + i * 0.05 }}>
                <Link href={mod.href} aria-label={`Accéder à ${mod.title}`} className="block bg-white dark:bg-white/5 rounded-xl border border-gray-200/60 dark:border-white/8 p-4 hover:-translate-y-0.5 transition-all group no-underline">
                  <div className="w-9 h-9 rounded-lg flex items-center justify-center text-white mb-3" style={{ background: mod.color }}>
                    <mod.icon size={16} />
                  </div>
                  <h3 className="text-sm font-bold text-gray-900 dark:text-white mb-0.5 group-hover:text-amber-500 transition-colors">
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
