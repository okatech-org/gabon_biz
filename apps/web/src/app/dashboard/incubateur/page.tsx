'use client';

import React from 'react';
import { motion } from 'framer-motion';
import {
  Rocket,
  FileText,
  Route,
  Users,
  Brain,
  Banknote,
  Calendar,
  Network,
  Grid3X3,
  BookOpen,
  BarChart3,
  TrendingUp,
  Video,
  CheckCircle,
  Trophy,
  MessageSquare,
  ArrowRight,
} from 'lucide-react';
import Link from 'next/link';

const quickStats = [
  { label: 'Mon programme', value: 'Cohorte Innovation 4.0', icon: Rocket, status: 'active' },
  { label: 'Progression', value: '68%', icon: TrendingUp },
  { label: 'Prochain mentorat', value: 'Lundi 14h', icon: Calendar },
  { label: 'Financement en cours', value: '5M FCFA', icon: Banknote },
];

const modules = [
  {
    title: 'Candidature',
    description: "Postuler à un programme d'incubation",
    icon: FileText,
    href: '/dashboard/incubateur/candidature',
    color: '#ec4899',
    badge: '3 programmes ouverts',
  },
  {
    title: 'Mon Parcours',
    description: "Suivre ma progression d'incubation",
    icon: Route,
    href: '/dashboard/incubateur/mon-parcours',
    color: '#F43F5E',
    badge: 'Semaine 8/12',
  },
  {
    title: 'Cohortes',
    description: 'Toutes les cohortes passées et en cours',
    icon: Users,
    href: '/dashboard/incubateur/cohortes',
    color: '#FB7185',
    badge: '12 cohortes',
  },
  {
    title: 'Mentorat IA',
    description: 'Trouver le mentor idéal par matching intelligent',
    icon: Brain,
    href: '/dashboard/incubateur/mentoring',
    color: '#A855F7',
    badge: '15 mentors',
  },
  {
    title: 'Financement',
    description: 'Pipeline SING Capital & Okoumé',
    icon: Banknote,
    href: '/dashboard/incubateur/financement',
    color: '#10B981',
    badge: '509M FCFA levés',
  },
  {
    title: 'Événements',
    description: 'Hackathons, ateliers, Demo Days',
    icon: Calendar,
    href: '/dashboard/incubateur/evenements',
    color: '#EF4444',
    badge: '3 à venir',
  },
  {
    title: 'Communauté',
    description: 'Réseau alumni et networking',
    icon: Network,
    href: '/dashboard/incubateur/communaute',
    color: '#6366F1',
    badge: '280+ alumni',
  },
  {
    title: 'Portfolio Startups',
    description: 'Explorer toutes les startups SING',
    icon: Grid3X3,
    href: '/dashboard/incubateur/startups',
    color: '#F59E0B',
    badge: '28 actives',
  },
  {
    title: 'Programmes',
    description: 'Catalogue complet des programmes',
    icon: BookOpen,
    href: '/dashboard/incubateur/programmes',
    color: '#3B82F6',
    badge: '7 programmes',
  },
  {
    title: 'Analytics & Impact',
    description: "KPIs de l'écosystème",
    icon: BarChart3,
    href: '/dashboard/incubateur/analytics',
    color: '#14B8A6',
    badge: 'Temps réel',
  },
];

const recentActivity = [
  {
    type: 'mentoring',
    text: 'Session mentorat avec Dr. Ndong — lundi 14h',
    time: 'Il y a 2h',
    icon: Video,
    color: '#A855F7',
  },
  {
    type: 'milestone',
    text: "Milestone 'MVP Fonctionnel' validé ✓",
    time: 'Hier',
    icon: CheckCircle,
    color: '#10B981',
  },
  {
    type: 'funding',
    text: 'Dossier SING Capital soumis — en revue',
    time: 'Il y a 3j',
    icon: FileText,
    color: '#F59E0B',
  },
  {
    type: 'event',
    text: 'Hackathon Gabon Tech Week — inscription ouverte',
    time: 'Il y a 5j',
    icon: Trophy,
    color: '#EF4444',
  },
  {
    type: 'community',
    text: 'Nouveau message dans le canal #fintech',
    time: 'Il y a 1s',
    icon: MessageSquare,
    color: '#6366F1',
  },
];

export default function IncubateurHubPage() {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <div className="flex items-center gap-3 mb-1">
          <div className="w-10 h-10 rounded-xl bg-linear-to-br from-pink-500 to-fuchsia-600 flex items-center justify-center text-white">
            <Rocket size={18} />
          </div>
          <div>
            <h1 className="text-2xl font-black text-gray-900 dark:text-white">
              Incubateur SING 2.0
            </h1>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              Votre espace d&apos;incubation numérique
            </p>
          </div>
        </div>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
        {quickStats.map((s, i) => (
          <motion.div
            key={s.label}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.05 }}
            className="bg-white dark:bg-white/5 rounded-xl border border-gray-200/60 dark:border-white/8 p-4"
          >
            <div className="flex items-center gap-2 mb-1">
              <s.icon size={14} className="text-pink-500" />
              <span className="text-[10px] font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                {s.label}
              </span>
            </div>
            <p className="text-lg font-bold text-gray-900 dark:text-white">{s.value}</p>
          </motion.div>
        ))}
      </div>

      {/* Modules Grid */}
      <div>
        <h2 className="text-sm font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-3">
          Modules
        </h2>
        <div className="grid grid-cols-2 lg:grid-cols-5 gap-3">
          {modules.map((m, i) => (
            <motion.div
              key={m.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.04 }}
            >
              <Link
                href={m.href}
                className="block bg-white dark:bg-white/5 rounded-xl border border-gray-200/60 dark:border-white/8 p-4 hover:shadow-lg hover:-translate-y-0.5 transition-all group"
              >
                <div
                  className="w-9 h-9 rounded-lg flex items-center justify-center text-white mb-3"
                  style={{ background: m.color }}
                >
                  <m.icon size={16} />
                </div>
                <h3 className="text-sm font-bold text-gray-900 dark:text-white mb-0.5 group-hover:text-pink-500 transition-colors">
                  {m.title}
                </h3>
                <p className="text-[10px] text-gray-500 dark:text-gray-400 mb-2 line-clamp-1">
                  {m.description}
                </p>
                <span
                  className="text-[10px] font-semibold px-2 py-0.5 rounded-full"
                  style={{ background: `${m.color}15`, color: m.color }}
                >
                  {m.badge}
                </span>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Recent Activity */}
      <div>
        <h2 className="text-sm font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-3">
          Activité récente
        </h2>
        <div className="bg-white dark:bg-white/5 rounded-xl border border-gray-200/60 dark:border-white/8 divide-y divide-gray-100 dark:divide-white/5">
          {recentActivity.map((a, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.05 }}
              className="flex items-center gap-3 p-3 hover:bg-gray-50 dark:hover:bg-white/3 transition-colors cursor-pointer"
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
      </div>
    </div>
  );
}
