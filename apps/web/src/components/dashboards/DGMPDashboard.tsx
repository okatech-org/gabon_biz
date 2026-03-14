'use client';

// GABON BIZ — Espace Agent DGMP
// Patrick Obame — Chef de Service Dématérialisation, DGMP

import React from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import {
  ClipboardList,
  FileText,
  Send,
  CheckCircle2,
  Clock,
  AlertTriangle,
  ArrowRight,
  DollarSign,
  Users,
  Factory,
  BookOpen,
  Activity,
  BarChart3,
  Gavel,
} from 'lucide-react';

/* ═══════ MOCK DATA ═══════ */

const STATS = [
  { icon: FileText, label: 'Marchés publiés', value: '8', color: '#3b82f6' },
  { icon: Send, label: 'Soumissions à évaluer', value: '25', color: '#f59e0b' },
  { icon: CheckCircle2, label: 'Marchés attribués', value: '3', color: '#009e49' },
  { icon: DollarSign, label: 'Budget total', value: '45 Mds', color: '#8b5cf6' },
];

const ALERTES_ACTIONS = [
  {
    type: 'warning',
    text: "5 soumissions en attente d'évaluation pour AO-2026-002",
    action: 'Évaluer',
    href: '/dashboard/soumissions',
    color: '#f59e0b',
    icon: Send,
  },
  {
    type: 'warning',
    text: '2 marchés expirent dans les 7 prochains jours',
    action: 'Voir',
    href: '/dashboard/marches',
    color: '#ef4444',
    icon: AlertTriangle,
  },
  {
    type: 'info',
    text: 'Brouillon AO-2026-004 incomplet — reprendre la rédaction',
    action: 'Compléter',
    href: '/dashboard/marches',
    color: '#3b82f6',
    icon: FileText,
  },
];

const MARCHES_EN_COURS = [
  {
    id: 1,
    ref: 'DGMP-2026-AO-001',
    titre: 'SI de gestion des marchés publics',
    statut: 'Ouvert',
    statutColor: '#10b981',
    soumissions: 12,
    budget: '15 Mds FCFA',
    evaluation: 75,
  },
  {
    id: 2,
    ref: 'DGMP-2026-AO-002',
    titre: 'Réseau fibre optique de Libreville',
    statut: 'En évaluation',
    statutColor: '#f59e0b',
    soumissions: 8,
    budget: '12 Mds FCFA',
    evaluation: 40,
  },
  {
    id: 3,
    ref: 'DGMP-2026-AO-003',
    titre: 'Équipements informatiques pour écoles',
    statut: 'Ouvert',
    statutColor: '#10b981',
    soumissions: 5,
    budget: '3 Mds FCFA',
    evaluation: 0,
  },
  {
    id: 4,
    ref: 'DGMP-2026-AO-004',
    titre: 'Plateforme e-santé nationale',
    statut: 'Brouillon',
    statutColor: '#6b7280',
    soumissions: 0,
    budget: '8 Mds FCFA',
    evaluation: 0,
  },
];

const TOP_SOUMISSIONS = [
  {
    id: 1,
    entreprise: 'AfricaTech Consulting',
    marche: 'AO-001',
    score: 92,
    montant: '12.5 Mds FCFA',
    statut: 'Évaluée',
    statutColor: '#10b981',
  },
  {
    id: 2,
    entreprise: 'GabonTech Solutions',
    marche: 'AO-001',
    score: 85,
    montant: '14.2 Mds FCFA',
    statut: 'Évaluée',
    statutColor: '#10b981',
  },
  {
    id: 3,
    entreprise: 'Mbadinga Technologies',
    marche: 'AO-001',
    score: 75,
    montant: '10.8 Mds FCFA',
    statut: 'En évaluation',
    statutColor: '#f59e0b',
  },
];

const RECENT_ACTIVITY = [
  {
    text: 'AO-004 Plateforme e-santé — brouillon créé',
    time: 'Il y a 1h',
    icon: FileText,
    color: '#3b82f6',
  },
  {
    text: 'Évaluation terminée : AfricaTech Consulting — 92/100',
    time: 'Il y a 4h',
    icon: CheckCircle2,
    color: '#10b981',
  },
  {
    text: '2 nouvelles soumissions reçues pour AO-002',
    time: 'Hier',
    icon: Send,
    color: '#f59e0b',
  },
  {
    text: 'AO-003 — date limite prolongée de 15 jours',
    time: 'Il y a 2j',
    icon: Clock,
    color: '#8b5cf6',
  },
];

/* ═══════ COMPONENT ═══════ */

export default function DGMPDashboard({
  user,
}: {
  user: { name?: string; title?: string; organization?: string };
}) {
  const router = useRouter();

  return (
    <div className="space-y-6">
      {/* ═══════ HERO ═══════ */}
      <motion.section
        id="dgmp-hero"
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        className="rounded-2xl p-6 sm:p-8 text-white relative overflow-hidden"
        style={{ background: 'linear-gradient(135deg, #3b82f6 0%, #1d4ed8 50%, #1e40af 100%)' }}
      >
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(255,255,255,0.12),transparent_50%)]" />
        <div className="absolute top-4 right-6 opacity-10 hidden sm:block" aria-hidden="true">
          <ClipboardList size={120} />
        </div>
        <div className="relative z-10">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-12 h-12 rounded-xl bg-white/20 backdrop-blur-sm flex items-center justify-center shrink-0">
              <ClipboardList size={24} />
            </div>
            <div className="min-w-0">
              <div className="flex items-center gap-2 flex-wrap">
                <h1 className="text-xl sm:text-2xl font-bold">
                  Bienvenue, {user?.name || 'Patrick O.'} 👋
                </h1>
                <span className="text-[10px] font-bold bg-white/20 px-2 py-0.5 rounded-full uppercase tracking-wider shrink-0">
                  Agent DGMP
                </span>
              </div>
              <p className="text-sm opacity-80 truncate">
                {user?.title || 'Chef de Service Dématérialisation'} —{' '}
                {user?.organization || 'Direction Générale des Marchés Publics'}
              </p>
            </div>
          </div>
          <p className="text-sm opacity-70 mt-3 max-w-2xl">
            Publiez les appels d&apos;offres, évaluez les soumissions et attribuez les marchés
            publics en toute transparence.
          </p>
        </div>
      </motion.section>

      {/* ═══════ STATS ═══════ */}
      <section id="dgmp-stats" className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
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

      {/* ═══════ ALERTES & ACTIONS ═══════ */}
      <section id="dgmp-alerts" role="status" aria-label="Alertes et actions DGMP">
        <h2 className="text-sm font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-3 flex items-center gap-2">
          <AlertTriangle size={14} /> Actions requises
        </h2>
        <div className="space-y-2">
          {ALERTES_ACTIONS.map((alert, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.05 }}
              className="flex items-center gap-3 sm:gap-4 p-3 sm:p-4 rounded-xl border"
              style={{
                background: `${alert.color}08`,
                borderColor: `${alert.color}20`,
              }}
            >
              <div
                className="w-9 h-9 rounded-lg flex items-center justify-center shrink-0"
                style={{ background: `${alert.color}15` }}
              >
                <alert.icon size={16} style={{ color: alert.color }} />
              </div>
              <p className="flex-1 text-xs sm:text-sm font-medium text-gray-800 dark:text-gray-200">
                {alert.text}
              </p>
              <button
                onClick={() => router.push(alert.href)}
                aria-label={`${alert.action}: ${alert.text}`}
                className="text-xs font-bold px-3 sm:px-4 py-2 rounded-lg text-white shrink-0 hover:opacity-90 transition-opacity cursor-pointer border-none"
                style={{ background: alert.color }}
              >
                {alert.action}
              </button>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ═══════ MARCHÉS EN COURS ═══════ */}
      <section id="dgmp-marches">
        <div className="flex items-center justify-between mb-3">
          <h2 className="text-sm font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wider flex items-center gap-2">
            <FileText size={14} /> Marchés en cours
          </h2>
          <Link
            href="/dashboard/marches"
            className="text-xs font-semibold text-blue-600 dark:text-blue-400 hover:underline no-underline flex items-center gap-1"
          >
            Tout voir <ArrowRight size={12} />
          </Link>
        </div>
        <div className="bg-white dark:bg-white/5 rounded-xl border border-gray-200/60 dark:border-white/8 overflow-hidden">
          {/* Desktop table */}
          <div className="hidden sm:block">
            <table
              className="w-full text-sm"
              role="table"
              aria-label="Marchés publics en cours DGMP"
            >
              <thead>
                <tr className="border-b border-gray-200 dark:border-white/5 bg-gray-100/50 dark:bg-white/2">
                  <th className="text-left py-3 px-4 text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase">
                    Réf / Titre
                  </th>
                  <th className="text-center py-3 px-4 text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase">
                    Statut
                  </th>
                  <th className="text-center py-3 px-4 text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase hidden md:table-cell">
                    Soumissions
                  </th>
                  <th className="text-right py-3 px-4 text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase hidden lg:table-cell">
                    Budget
                  </th>
                  <th className="text-center py-3 px-4 text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase">
                    Évaluation
                  </th>
                </tr>
              </thead>
              <tbody>
                {MARCHES_EN_COURS.map((m) => (
                  <tr
                    key={m.id}
                    className="border-b border-gray-50 dark:border-white/3 hover:bg-gray-100 dark:hover:bg-white/2 transition-colors"
                  >
                    <td className="py-3 px-4">
                      <div className="text-[10px] font-mono text-gray-400">{m.ref}</div>
                      <div className="font-semibold text-gray-900 dark:text-white text-sm truncate max-w-[200px] lg:max-w-[300px]">
                        {m.titre}
                      </div>
                    </td>
                    <td className="py-3 px-4 text-center">
                      <span
                        className="text-xs font-semibold px-2.5 py-1 rounded-full"
                        style={{ background: `${m.statutColor}15`, color: m.statutColor }}
                      >
                        {m.statut}
                      </span>
                    </td>
                    <td className="py-3 px-4 text-center font-semibold text-gray-700 dark:text-gray-300 hidden md:table-cell">
                      {m.soumissions}
                    </td>
                    <td className="py-3 px-4 text-right font-bold text-gray-900 dark:text-white hidden lg:table-cell">
                      {m.budget}
                    </td>
                    <td className="py-3 px-4">
                      {m.evaluation > 0 ? (
                        <div className="flex items-center gap-2">
                          <div className="flex-1 h-2 bg-gray-100 dark:bg-white/10 rounded-full overflow-hidden">
                            <div
                              className="h-full rounded-full"
                              style={{
                                width: `${m.evaluation}%`,
                                background:
                                  m.evaluation >= 70
                                    ? '#10b981'
                                    : m.evaluation >= 30
                                      ? '#f59e0b'
                                      : '#ef4444',
                              }}
                            />
                          </div>
                          <span className="text-[10px] font-semibold text-gray-500 w-8 text-right">
                            {m.evaluation}%
                          </span>
                        </div>
                      ) : (
                        <span className="text-[10px] text-gray-300 dark:text-gray-600 italic">
                          —
                        </span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Mobile cards */}
          <div className="sm:hidden divide-y divide-gray-100 dark:divide-white/5">
            {MARCHES_EN_COURS.map((m) => (
              <div key={m.id} className="p-4">
                <div className="flex items-center justify-between mb-2">
                  <div className="min-w-0 flex-1">
                    <span className="text-[10px] font-mono text-gray-400 block">{m.ref}</span>
                    <span className="font-semibold text-sm text-gray-900 dark:text-white line-clamp-1">
                      {m.titre}
                    </span>
                  </div>
                  <span
                    className="text-[10px] font-semibold px-2 py-0.5 rounded-full shrink-0 ml-2"
                    style={{ background: `${m.statutColor}15`, color: m.statutColor }}
                  >
                    {m.statut}
                  </span>
                </div>
                <div className="flex items-center gap-3 text-xs text-gray-500 dark:text-gray-400">
                  <span>{m.soumissions} soumissions</span>
                  <span>·</span>
                  <span className="font-semibold">{m.budget}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════ TOP SOUMISSIONS ═══════ */}
      <section id="dgmp-top-soumissions">
        <div className="flex items-center justify-between mb-3">
          <h2 className="text-sm font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wider flex items-center gap-2">
            <Gavel size={14} /> Meilleures soumissions
          </h2>
          <Link
            href="/dashboard/soumissions"
            className="text-xs font-semibold text-blue-600 dark:text-blue-400 hover:underline no-underline flex items-center gap-1"
          >
            Tout voir <ArrowRight size={12} />
          </Link>
        </div>
        <div className="bg-white dark:bg-white/5 rounded-xl border border-gray-200/60 dark:border-white/8 divide-y divide-gray-100 dark:divide-white/5">
          {TOP_SOUMISSIONS.map((s, i) => (
            <motion.div
              key={s.id}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.05 }}
              className="flex items-center gap-3 sm:gap-4 p-3 sm:p-4 hover:bg-gray-100 dark:hover:bg-white/3 transition-colors"
            >
              {/* Score circle */}
              <div
                className="w-11 h-11 rounded-full flex items-center justify-center shrink-0 text-white text-sm font-bold"
                style={{
                  background:
                    s.score >= 85
                      ? '#10b981'
                      : s.score >= 70
                        ? '#f59e0b'
                        : '#ef4444',
                }}
              >
                {s.score}
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-semibold text-gray-900 dark:text-white truncate">
                  {s.entreprise}
                </p>
                <p className="text-xs text-gray-500 dark:text-gray-400 truncate">
                  {s.marche} · {s.montant}
                </p>
              </div>
              <span
                className="text-[10px] font-semibold px-2.5 py-1 rounded-full shrink-0"
                style={{ background: `${s.statutColor}15`, color: s.statutColor }}
              >
                {s.statut}
              </span>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ═══════ TWO-COLUMN: Activity + Quick Access ═══════ */}
      <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
        {/* ACTIVITÉ RÉCENTE */}
        <section id="dgmp-activity" className="lg:col-span-3">
          <h2 className="text-sm font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-3 flex items-center gap-2">
            <Activity size={14} /> Activité récente
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
        <section id="dgmp-quick-access" className="lg:col-span-2">
          <h2 className="text-sm font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-3">
            Accès rapide
          </h2>
          <div className="grid grid-cols-2 gap-3">
            {[
              {
                icon: FileText,
                title: 'Marchés Publics',
                desc: 'Gérer les AO',
                href: '/dashboard/marches',
                color: '#3b82f6',
              },
              {
                icon: Send,
                title: 'Soumissions',
                desc: 'Évaluer les offres',
                href: '/dashboard/soumissions',
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
                desc: 'Répertoire entreprises',
                href: '/dashboard/annuaire',
                color: '#6b7280',
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
                  <h3 className="text-sm font-bold text-gray-900 dark:text-white mb-0.5 group-hover:text-blue-500 transition-colors">
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
