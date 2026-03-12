'use client';

// GABON BIZ — Espace Mentor / Expert
// Dr. Christelle Nguema — Professeure & Mentore SING 2.0

import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import {
  GraduationCap,
  Users,
  Calendar,
  Star,
  ArrowRight,
  Video,
  Clock,
  FileCheck,
  TrendingUp,
  MessageSquare,
  ClipboardCheck,
  BookOpen,
  Lightbulb,
  BarChart3,
} from 'lucide-react';

/* ═══════ MOCK DATA ═══════ */

const STARTUPS_ACCOMPAGNEES = [
  {
    id: 1,
    name: 'TechPay Solutions',
    sector: 'FinTech',
    founder: 'Sara Mboumba',
    progress: 75,
    stage: 'Semaine 8/12',
    status: 'En bonne voie',
    statusColor: '#10b981',
    nextSession: '14 mars — Stratégie Go-to-Market',
  },
  {
    id: 2,
    name: 'AgriSmart Gabon',
    sector: 'AgriTech',
    founder: 'Paul Nzé',
    progress: 45,
    stage: 'Semaine 5/12',
    status: "Besoin d'attention",
    statusColor: '#f59e0b',
    nextSession: '16 mars — Pivot produit',
  },
  {
    id: 3,
    name: 'EduConnect',
    sector: 'EdTech',
    founder: 'Grace Obame',
    progress: 90,
    stage: 'Semaine 11/12',
    status: 'Excellent',
    statusColor: '#8b5cf6',
    nextSession: '18 mars — Préparation Demo Day',
  },
];

const PROCHAINES_SESSIONS = [
  {
    id: 1,
    startup: 'TechPay Solutions',
    date: '14 mars 2026',
    heure: '14h00',
    sujet: 'Stratégie Go-to-Market',
    type: 'video',
    color: '#ec4899',
  },
  {
    id: 2,
    startup: 'AgriSmart Gabon',
    date: '16 mars 2026',
    heure: '10h00',
    sujet: 'Pivot produit & validation marché',
    type: 'presentiel',
    color: '#f59e0b',
  },
  {
    id: 3,
    startup: 'EduConnect',
    date: '18 mars 2026',
    heure: '16h00',
    sujet: 'Préparation Demo Day',
    type: 'video',
    color: '#8b5cf6',
  },
  {
    id: 4,
    startup: 'Panel SING 2.0',
    date: '20 mars 2026',
    heure: '09h00',
    sujet: 'Évaluation mi-parcours cohorte',
    type: 'presentiel',
    color: '#3b82f6',
  },
];

const EVALUATIONS_EN_COURS = [
  {
    id: 1,
    candidat: 'MobiHealth',
    secteur: 'HealthTech',
    soumisLe: '8 mars 2026',
    score: null,
    status: 'À évaluer',
  },
  {
    id: 2,
    candidat: 'LogiTrack',
    secteur: 'Logistique',
    soumisLe: '7 mars 2026',
    score: null,
    status: 'À évaluer',
  },
  {
    id: 3,
    candidat: 'GreenEnergy GA',
    secteur: 'CleanTech',
    soumisLe: '5 mars 2026',
    score: 78,
    status: 'Évalué',
  },
];

const RECENT_ACTIVITY = [
  {
    text: 'Session mentorat avec TechPay Solutions complétée',
    time: 'Il y a 2h',
    icon: Video,
    color: '#ec4899',
  },
  {
    text: 'Évaluation GreenEnergy GA soumise — Score: 78/100',
    time: 'Hier',
    icon: ClipboardCheck,
    color: '#10b981',
  },
  {
    text: 'Nouveau message de Sara Mboumba (TechPay)',
    time: 'Il y a 2j',
    icon: MessageSquare,
    color: '#3b82f6',
  },
  {
    text: 'Milestone "MVP Fonctionnel" validé pour EduConnect',
    time: 'Il y a 3j',
    icon: FileCheck,
    color: '#8b5cf6',
  },
];

/* ═══════ COMPONENT ═══════ */

export default function MentorDashboard({
  user,
}: {
  user: { name?: string; title?: string; organization?: string };
}) {
  return (
    <div className="space-y-6">
      {/* ═══════ HERO ═══════ */}
      <motion.section
        id="mentor-hero"
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        className="rounded-2xl p-6 sm:p-8 text-white relative overflow-hidden"
        style={{ background: 'linear-gradient(135deg, #ec4899 0%, #be185d 50%, #9d174d 100%)' }}
      >
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(255,255,255,0.15),transparent_50%)]" />
        <div className="absolute top-4 right-6 opacity-10 hidden sm:block" aria-hidden="true">
          <GraduationCap size={120} />
        </div>
        <div className="relative z-10">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-12 h-12 rounded-xl bg-white/20 backdrop-blur-sm flex items-center justify-center shrink-0">
              <GraduationCap size={24} />
            </div>
            <div>
              <h1 className="text-xl sm:text-2xl font-bold">
                Bienvenue, {user?.name || 'Dr. Nguema'} 👋
              </h1>
              <p className="text-sm opacity-80">
                {user?.title || 'Professeure & Mentore SING 2.0'} —{' '}
                {user?.organization || 'École Polytechnique de Masuku'}
              </p>
            </div>
          </div>
          <p className="text-sm opacity-70 mt-3 max-w-2xl">
            Accompagnez vos startups, planifiez vos sessions de mentorat et évaluez les candidatures
            au programme d&apos;incubation.
          </p>
        </div>
      </motion.section>

      {/* ═══════ STATS RAPIDES ═══════ */}
      <section id="mentor-stats" className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
        {[
          { icon: Users, label: 'Startups accompagnées', value: '3', color: '#ec4899' },
          { icon: Calendar, label: 'Sessions ce mois', value: '12', color: '#3b82f6' },
          { icon: Clock, label: 'Prochaine session', value: 'Demain 14h', color: '#f59e0b' },
          { icon: Star, label: 'Note moyenne', value: '4.8/5', color: '#10b981' },
        ].map((s, i) => (
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

      {/* ═══════ MES STARTUPS ═══════ */}
      <section id="mentor-startups">
        <h2 className="text-sm font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-3 flex items-center gap-2">
          <Users size={14} /> Mes Startups
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {STARTUPS_ACCOMPAGNEES.map((startup, i) => (
            <motion.div
              key={startup.id}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.08 }}
              className="bg-white dark:bg-white/5 rounded-xl border border-gray-200/60 dark:border-white/8 p-5 hover:shadow-lg hover:-translate-y-0.5 transition-all"
            >
              <div className="flex items-center justify-between mb-3">
                <div className="min-w-0">
                  <h3 className="text-sm font-bold text-gray-900 dark:text-white truncate">
                    {startup.name}
                  </h3>
                  <p className="text-xs text-gray-400 truncate">
                    {startup.sector} · {startup.founder}
                  </p>
                </div>
                <span
                  className="text-[10px] font-semibold px-2.5 py-1 rounded-full shrink-0 ml-2"
                  style={{ background: `${startup.statusColor}15`, color: startup.statusColor }}
                >
                  {startup.status}
                </span>
              </div>

              {/* Progress bar */}
              <div className="mb-3">
                <div className="flex justify-between text-[11px] text-gray-400 mb-1">
                  <span>{startup.stage}</span>
                  <span className="font-semibold" style={{ color: startup.statusColor }}>
                    {startup.progress}%
                  </span>
                </div>
                <div className="h-2 bg-gray-100 dark:bg-white/10 rounded-full overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${startup.progress}%` }}
                    transition={{ duration: 1, delay: i * 0.2 }}
                    className="h-full rounded-full"
                    style={{
                      background: `linear-gradient(90deg, ${startup.statusColor}, ${startup.statusColor}cc)`,
                    }}
                  />
                </div>
              </div>

              <div className="flex items-center gap-2 text-xs text-gray-500 dark:text-gray-400">
                <Calendar size={12} className="text-pink-500 shrink-0" />
                <span className="truncate">{startup.nextSession}</span>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ═══════ AGENDA MENTORAT ═══════ */}
      <section id="mentor-sessions">
        <h2 className="text-sm font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-3 flex items-center gap-2">
          <Calendar size={14} /> Prochaines sessions
        </h2>
        <div className="bg-white dark:bg-white/5 rounded-xl border border-gray-200/60 dark:border-white/8 divide-y divide-gray-100 dark:divide-white/5">
          {PROCHAINES_SESSIONS.map((session, i) => (
            <motion.div
              key={session.id}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.05 }}
              className="flex items-center gap-3 sm:gap-4 p-3 sm:p-4 hover:bg-gray-50 dark:hover:bg-white/3 transition-colors"
            >
              <div
                className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0"
                style={{ background: `${session.color}15` }}
              >
                {session.type === 'video' ? (
                  <Video size={18} style={{ color: session.color }} />
                ) : (
                  <Users size={18} style={{ color: session.color }} />
                )}
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-semibold text-gray-900 dark:text-white truncate">
                  {session.startup}
                </p>
                <p className="text-xs text-gray-500 dark:text-gray-400 truncate">{session.sujet}</p>
              </div>
              <div className="text-right shrink-0 hidden sm:block">
                <p className="text-sm font-semibold text-gray-700 dark:text-gray-300">
                  {session.date}
                </p>
                <p className="text-xs text-gray-400">
                  {session.heure} · {session.type === 'video' ? 'Visio' : 'Présentiel'}
                </p>
              </div>
              <div className="text-right shrink-0 sm:hidden">
                <p className="text-xs font-semibold text-gray-700 dark:text-gray-300">
                  {session.date.split(' ').slice(0, 2).join(' ')}
                </p>
                <p className="text-[10px] text-gray-400">{session.heure}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ═══════ ÉVALUATIONS EN COURS ═══════ */}
      <section id="mentor-evaluations">
        <h2 className="text-sm font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-3 flex items-center gap-2">
          <ClipboardCheck size={14} /> Évaluations candidatures
        </h2>
        <div className="bg-white dark:bg-white/5 rounded-xl border border-gray-200/60 dark:border-white/8 overflow-hidden">
          {/* Desktop table */}
          <div className="hidden sm:block">
            <table
              className="w-full text-sm"
              role="table"
              aria-label="Évaluations des candidatures SING 2.0"
            >
              <thead>
                <tr className="border-b border-gray-100 dark:border-white/5 bg-gray-50/50 dark:bg-white/2">
                  <th className="text-left py-3 px-4 text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase">
                    Candidat
                  </th>
                  <th className="text-left py-3 px-4 text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase">
                    Secteur
                  </th>
                  <th className="text-left py-3 px-4 text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase hidden md:table-cell">
                    Soumis le
                  </th>
                  <th className="text-center py-3 px-4 text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase">
                    Score
                  </th>
                  <th className="text-center py-3 px-4 text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase">
                    Statut
                  </th>
                </tr>
              </thead>
              <tbody>
                {EVALUATIONS_EN_COURS.map((ev) => (
                  <tr
                    key={ev.id}
                    className="border-b border-gray-50 dark:border-white/3 hover:bg-gray-50 dark:hover:bg-white/2 transition-colors"
                  >
                    <td className="py-3 px-4 font-semibold text-gray-900 dark:text-white">
                      {ev.candidat}
                    </td>
                    <td className="py-3 px-4 text-gray-500 dark:text-gray-400">{ev.secteur}</td>
                    <td className="py-3 px-4 text-gray-500 dark:text-gray-400 hidden md:table-cell">
                      {ev.soumisLe}
                    </td>
                    <td className="py-3 px-4 text-center">
                      {ev.score !== null ? (
                        <span className="font-bold text-emerald-600">{ev.score}/100</span>
                      ) : (
                        <span className="text-gray-300 dark:text-gray-600">—</span>
                      )}
                    </td>
                    <td className="py-3 px-4 text-center">
                      <span
                        className={`text-xs font-semibold px-2.5 py-1 rounded-full ${
                          ev.status === 'Évalué'
                            ? 'bg-emerald-50 text-emerald-600 dark:bg-emerald-500/15 dark:text-emerald-400'
                            : 'bg-amber-50 text-amber-600 dark:bg-amber-500/15 dark:text-amber-400'
                        }`}
                      >
                        {ev.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Mobile cards */}
          <div className="sm:hidden divide-y divide-gray-100 dark:divide-white/5">
            {EVALUATIONS_EN_COURS.map((ev) => (
              <div key={ev.id} className="p-4">
                <div className="flex items-center justify-between mb-2">
                  <span className="font-semibold text-sm text-gray-900 dark:text-white">
                    {ev.candidat}
                  </span>
                  <span
                    className={`text-[10px] font-semibold px-2 py-0.5 rounded-full ${
                      ev.status === 'Évalué'
                        ? 'bg-emerald-50 text-emerald-600 dark:bg-emerald-500/15 dark:text-emerald-400'
                        : 'bg-amber-50 text-amber-600 dark:bg-amber-500/15 dark:text-amber-400'
                    }`}
                  >
                    {ev.status}
                  </span>
                </div>
                <div className="flex items-center gap-3 text-xs text-gray-500 dark:text-gray-400">
                  <span>{ev.secteur}</span>
                  <span>·</span>
                  <span>{ev.soumisLe}</span>
                  {ev.score !== null && (
                    <>
                      <span>·</span>
                      <span className="font-bold text-emerald-600">{ev.score}/100</span>
                    </>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════ TWO-COLUMN: Activity + Quick Access ═══════ */}
      <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
        {/* ACTIVITÉ RÉCENTE */}
        <section id="mentor-activity" className="lg:col-span-3">
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
                className="flex items-center gap-3 p-3 hover:bg-gray-50 dark:hover:bg-white/3 transition-colors"
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
        <section id="mentor-quick-access" className="lg:col-span-2">
          <h2 className="text-sm font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-3">
            Accès rapide
          </h2>
          <div className="grid grid-cols-2 gap-3">
            {[
              {
                icon: GraduationCap,
                title: 'Incubateur',
                desc: 'Programme SING 2.0',
                href: '/dashboard/incubateur',
                color: '#ec4899',
              },
              {
                icon: Lightbulb,
                title: 'Innovation Hub',
                desc: 'Solutions & startups',
                href: '/dashboard/innovation',
                color: '#8b5cf6',
              },
              {
                icon: BarChart3,
                title: 'Observatoire',
                desc: 'Indicateurs numériques',
                href: '/dashboard/observatoire',
                color: '#f59e0b',
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
                  className="block bg-white dark:bg-white/5 rounded-xl border border-gray-200/60 dark:border-white/8 p-4 hover:shadow-lg hover:-translate-y-0.5 transition-all group no-underline"
                >
                  <div
                    className="w-9 h-9 rounded-lg flex items-center justify-center text-white mb-3"
                    style={{ background: mod.color }}
                  >
                    <mod.icon size={16} />
                  </div>
                  <h3 className="text-sm font-bold text-gray-900 dark:text-white mb-0.5 group-hover:text-pink-500 transition-colors">
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
