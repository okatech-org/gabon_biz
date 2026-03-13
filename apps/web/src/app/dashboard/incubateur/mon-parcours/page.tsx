'use client';

import React from 'react';
import { motion } from 'framer-motion';
import {
  Route,
  CheckCircle,
  Lock,
  Clock,
  TrendingUp,
  Calendar,
  BookOpen,
  Target,
} from 'lucide-react';
import { MON_PARCOURS_MILESTONES } from '@/lib/mock/incubateur-startups';

const currentProgramme = {
  name: 'Cohorte Innovation 4.0 — Promotion Mars 2026',
  startDate: '2026-01-15',
  endDate: '2026-04-15',
  currentWeek: 8,
  totalWeeks: 12,
  progressPercent: 68,
};

const myKPIs = [
  { label: 'Score global', value: '78/100', trend: '+5 cette semaine', color: '#ec4899' },
  { label: 'Deliverables validés', value: '9/14', trend: '3 en attente', color: '#10B981' },
  { label: 'Sessions mentorat', value: '6', trend: 'Prochain: lundi', color: '#A855F7' },
  { label: 'Heures coworking', value: '120', trend: '15h cette semaine', color: '#3B82F6' },
];

const nextTasks = [
  { title: '100 utilisateurs actifs', deadline: '2026-03-20', priority: 'HIGH' as const },
  { title: 'Finaliser business model', deadline: '2026-03-15', priority: 'MEDIUM' as const },
  { title: 'Metrics deck pour mentor review', deadline: '2026-03-14', priority: 'HIGH' as const },
];

const PRIORITY_COLORS = { HIGH: '#EF4444', MEDIUM: '#F59E0B', LOW: '#10B981' };
const STATUS_ICONS = { COMPLETED: CheckCircle, IN_PROGRESS: Clock, LOCKED: Lock };

export default function MonParcoursPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 rounded-xl bg-linear-to-br from-pink-500 to-rose-600 flex items-center justify-center text-white">
          <Route size={18} />
        </div>
        <div>
          <h1 className="text-xl font-black text-gray-900 dark:text-white">Mon Parcours</h1>
          <p className="text-sm text-gray-500">{currentProgramme.name}</p>
        </div>
      </div>

      {/* Progress bar */}
      <div className="bg-white dark:bg-white/5 rounded-2xl border border-gray-200/60 dark:border-white/8 p-5">
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm font-semibold text-gray-900 dark:text-white">
            Semaine {currentProgramme.currentWeek}/{currentProgramme.totalWeeks}
          </span>
          <span className="text-sm font-bold text-pink-500">
            {currentProgramme.progressPercent}%
          </span>
        </div>
        <div className="h-3 bg-gray-100 dark:bg-white/8 rounded-full overflow-hidden">
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: `${currentProgramme.progressPercent}%` }}
            transition={{ duration: 1.5 }}
            className="h-full rounded-full bg-linear-to-r from-pink-500 to-fuchsia-600"
          />
        </div>
        <div className="flex justify-between text-xs text-gray-400 mt-2">
          <span>
            {new Date(currentProgramme.startDate).toLocaleDateString('fr-FR', {
              day: 'numeric',
              month: 'short',
            })}
          </span>
          <span>
            {new Date(currentProgramme.endDate).toLocaleDateString('fr-FR', {
              day: 'numeric',
              month: 'short',
              year: 'numeric',
            })}
          </span>
        </div>
      </div>

      {/* KPIs */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
        {myKPIs.map((k) => (
          <div
            key={k.label}
            className="bg-white dark:bg-white/5 rounded-xl border border-gray-200/60 dark:border-white/8 p-4"
          >
            <p className="text-[10px] font-semibold text-gray-500 uppercase tracking-wider mb-1">
              {k.label}
            </p>
            <p className="text-xl font-black text-gray-900 dark:text-white">{k.value}</p>
            <p className="text-[10px] mt-1" style={{ color: k.color }}>
              {k.trend}
            </p>
          </div>
        ))}
      </div>

      {/* Timeline */}
      <div className="bg-white dark:bg-white/5 rounded-2xl border border-gray-200/60 dark:border-white/8 p-5">
        <h2 className="text-sm font-bold text-gray-900 dark:text-white mb-4">
          Timeline des milestones
        </h2>
        <div className="space-y-4">
          {MON_PARCOURS_MILESTONES.map((m, i) => {
            const StatusIcon = STATUS_ICONS[m.status];
            const color =
              m.status === 'COMPLETED'
                ? '#10B981'
                : m.status === 'IN_PROGRESS'
                  ? '#ec4899'
                  : '#9CA3AF';
            return (
              <motion.div
                key={m.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.1 }}
                className={`flex gap-4 ${m.status === 'LOCKED' ? 'opacity-40' : ''}`}
              >
                <div className="flex flex-col items-center">
                  <div
                    className="w-8 h-8 rounded-full flex items-center justify-center"
                    style={{ background: `${color}15` }}
                  >
                    <StatusIcon size={14} style={{ color }} />
                  </div>
                  {i < MON_PARCOURS_MILESTONES.length - 1 && (
                    <div className="w-0.5 flex-1 mt-1" style={{ background: `${color}30` }} />
                  )}
                </div>
                <div className="flex-1 pb-4">
                  <div className="flex items-center justify-between">
                    <h3 className="text-sm font-bold text-gray-900 dark:text-white">{m.title}</h3>
                    <span className="text-xs text-gray-400">{m.week}</span>
                  </div>
                  {m.completedDate && (
                    <p className="text-xs text-green-500 mt-0.5">
                      Complété le {new Date(m.completedDate).toLocaleDateString('fr-FR')}
                    </p>
                  )}
                  <div className="flex flex-wrap gap-1 mt-2">
                    {m.deliverables.map((d) => (
                      <span
                        key={d}
                        className="text-[10px] font-medium px-2 py-0.5 rounded bg-gray-100 dark:bg-white/6 text-gray-500"
                      >
                        {d}
                      </span>
                    ))}
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>

      {/* Next Tasks */}
      <div className="bg-white dark:bg-white/5 rounded-2xl border border-gray-200/60 dark:border-white/8 p-5">
        <h2 className="text-sm font-bold text-gray-900 dark:text-white mb-3">Prochaines tâches</h2>
        <div className="space-y-2">
          {nextTasks.map((t) => (
            <div
              key={t.title}
              className="flex items-center gap-3 p-3 rounded-xl bg-gray-50 dark:bg-white/3"
            >
              <div
                className="w-2 h-2 rounded-full"
                style={{ background: PRIORITY_COLORS[t.priority] }}
              />
              <div className="flex-1">
                <p className="text-sm font-medium text-gray-900 dark:text-white">{t.title}</p>
                <p className="text-xs text-gray-400">
                  {new Date(t.deadline).toLocaleDateString('fr-FR')}
                </p>
              </div>
              <span
                className="text-[10px] font-bold px-2 py-0.5 rounded-full"
                style={{
                  background: `${PRIORITY_COLORS[t.priority]}15`,
                  color: PRIORITY_COLORS[t.priority],
                }}
              >
                {t.priority}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
