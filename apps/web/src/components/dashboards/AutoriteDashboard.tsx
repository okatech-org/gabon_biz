'use client';

// GABON BIZ — Espace Autorité Contractante
// Jean-Sylvain Mba — Directeur des Marchés et Contrats, ANINF

import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import {
  Landmark,
  ClipboardList,
  Inbox,
  Search,
  Wallet,
  ArrowRight,
  Calendar,
  BookOpen,
  CheckCircle2,
  Clock,
  AlertCircle,
} from 'lucide-react';

/* ═══════ MOCK DATA ═══════ */

const STATS = [
  { icon: ClipboardList, label: 'Marchés publiés', value: '4', color: '#7c3aed' },
  { icon: Inbox, label: 'Soumissions reçues', value: '18', color: '#3b82f6' },
  { icon: Search, label: 'En évaluation', value: '2', color: '#f59e0b' },
  { icon: Wallet, label: 'Budget engagé', value: '8.5 Mds', color: '#10b981' },
];

const MARCHES = [
  { ref: 'AO-2026-001', title: 'Réseau intranet sécurisé — ANINF', status: 'Évaluation', soumissions: 8, budget: '2.5 Mds FCFA', deadline: '20 mars 2026', statusColor: '#f59e0b' },
  { ref: 'AO-2026-002', title: 'Plateforme e-gouvernance Phase 2', status: 'Publié', soumissions: 3, budget: '1.8 Mds FCFA', deadline: '15 avr 2026', statusColor: '#10b981' },
  { ref: 'AO-2026-003', title: 'Modernisation datacenter Libreville', status: 'Publié', soumissions: 0, budget: '3.2 Mds FCFA', deadline: '30 avr 2026', statusColor: '#10b981' },
  { ref: 'AO-2026-004', title: 'WiFi ZES Nkok — couverture industrielle', status: 'Brouillon', soumissions: 0, budget: '800M FCFA', deadline: '—', statusColor: '#6b7280' },
];

const SOUMISSIONS = [
  { entreprise: 'GabonTech Consulting', initials: 'GC', ao: 'AO-2026-001', score: 91, status: 'Évalué', color: '#10b981' },
  { entreprise: 'AfricaTech Solutions', initials: 'AS', ao: 'AO-2026-001', score: 75, status: 'Évalué', color: '#f59e0b' },
  { entreprise: 'DigiGabon SARL', initials: 'DG', ao: 'AO-2026-001', score: 68, status: 'En cours', color: '#3b82f6' },
  { entreprise: 'Mbadinga Technologies', initials: 'MT', ao: 'AO-2026-002', score: null, status: 'Reçue', color: '#8b5cf6' },
  { entreprise: 'InfraTech Afrique', initials: 'IA', ao: 'AO-2026-002', score: null, status: 'Reçue', color: '#8b5cf6' },
];

const CALENDAR = [
  { date: '17 mars', event: 'Date limite AO-001 — Évaluation finale', icon: AlertCircle, color: '#ef4444' },
  { date: '20 mars', event: "Comité d'attribution AO-001", icon: CheckCircle2, color: '#f59e0b' },
  { date: '15 avr', event: 'Date limite AO-002 — Réception soumissions', icon: Clock, color: '#3b82f6' },
  { date: '30 avr', event: 'Date limite AO-003 — Réception soumissions', icon: Clock, color: '#3b82f6' },
];

/* ═══════ COMPONENT ═══════ */

export default function AutoriteDashboard({
  user,
}: {
  user: { name?: string; title?: string; organization?: string };
}) {
  return (
    <div className="space-y-6">
      {/* ═══════ HERO ═══════ */}
      <motion.section
        id="autorite-hero"
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        className="rounded-2xl p-6 sm:p-8 text-white relative overflow-hidden"
        style={{ background: 'linear-gradient(135deg, #7c3aed 0%, #6d28d9 50%, #5b21b6 100%)' }}
      >
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(255,255,255,0.15),transparent_50%)]" />
        <div className="absolute top-4 right-6 opacity-10 hidden sm:block" aria-hidden="true">
          <Landmark size={120} />
        </div>
        <div className="relative z-10">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-12 h-12 rounded-xl bg-white/20 backdrop-blur-sm flex items-center justify-center shrink-0">
              <Landmark size={24} />
            </div>
            <div className="min-w-0">
              <div className="flex items-center gap-2 flex-wrap">
                <h1 className="text-xl sm:text-2xl font-bold">
                  Bienvenue, {user?.name || 'Jean-Sylvain M.'} 👋
                </h1>
                <span className="text-[10px] font-bold bg-white/20 px-2 py-0.5 rounded-full uppercase tracking-wider shrink-0">
                  Autorité Contractante
                </span>
              </div>
              <p className="text-sm opacity-80 truncate">
                {user?.title || 'Directeur des Marchés et Contrats'} —{' '}
                {user?.organization || 'ANINF'}
              </p>
            </div>
          </div>
          <p className="text-sm opacity-70 mt-3 max-w-2xl">
            Créez et publiez vos appels d&apos;offres, évaluez les soumissions et attribuez les
            marchés publics numériques.
          </p>
        </div>
      </motion.section>

      {/* ═══════ STATS ═══════ */}
      <section id="autorite-stats" className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
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

      {/* ═══════ MES APPELS D'OFFRES ═══════ */}
      <section id="autorite-marches">
        <h2 className="text-sm font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-3 flex items-center gap-2">
          <ClipboardList size={14} /> Mes Appels d&apos;Offres
        </h2>
        <div className="bg-white dark:bg-white/5 rounded-xl border border-gray-200/60 dark:border-white/8 overflow-hidden">
          {/* Desktop table */}
          <div className="hidden sm:block">
            <table className="w-full text-sm" role="table" aria-label="Mes appels d'offres">
              <thead>
                <tr className="border-b border-gray-200 dark:border-white/5 bg-gray-100/50 dark:bg-white/2">
                  <th className="text-left py-3 px-4 text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase">Réf</th>
                  <th className="text-left py-3 px-4 text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase">Intitulé</th>
                  <th className="text-center py-3 px-4 text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase">Statut</th>
                  <th className="text-center py-3 px-4 text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase hidden md:table-cell">Soumissions</th>
                  <th className="text-right py-3 px-4 text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase">Budget</th>
                </tr>
              </thead>
              <tbody>
                {MARCHES.map((m) => (
                  <tr key={m.ref} className="border-b border-gray-50 dark:border-white/3 hover:bg-gray-100 dark:hover:bg-white/2 transition-colors">
                    <td className="py-3 px-4 font-mono text-xs text-gray-400">{m.ref}</td>
                    <td className="py-3 px-4 font-semibold text-gray-900 dark:text-white">{m.title}</td>
                    <td className="py-3 px-4 text-center">
                      <span className="text-xs font-semibold px-2.5 py-1 rounded-full" style={{ background: `${m.statusColor}15`, color: m.statusColor }}>
                        {m.status}
                      </span>
                    </td>
                    <td className="py-3 px-4 text-center text-gray-500 dark:text-gray-400 hidden md:table-cell">{m.soumissions}</td>
                    <td className="py-3 px-4 text-right font-bold text-violet-600 dark:text-violet-400">{m.budget}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          {/* Mobile cards */}
          <div className="sm:hidden divide-y divide-gray-100 dark:divide-white/5">
            {MARCHES.map((m) => (
              <div key={m.ref} className="p-4">
                <div className="flex items-center justify-between mb-1">
                  <span className="text-[10px] font-mono text-gray-400">{m.ref}</span>
                  <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full" style={{ background: `${m.statusColor}15`, color: m.statusColor }}>
                    {m.status}
                  </span>
                </div>
                <p className="text-sm font-semibold text-gray-900 dark:text-white truncate mb-1">{m.title}</p>
                <div className="flex items-center gap-3 text-xs text-gray-500 dark:text-gray-400">
                  <span>{m.soumissions} soumissions</span>
                  <span>·</span>
                  <span className="font-semibold text-violet-600">{m.budget}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════ TWO-COLUMN: Soumissions + Calendar ═══════ */}
      <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
        {/* SOUMISSIONS */}
        <section id="autorite-soumissions" className="lg:col-span-3">
          <h2 className="text-sm font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-3 flex items-center gap-2">
            <Inbox size={14} /> Dernières Soumissions
          </h2>
          <div className="bg-white dark:bg-white/5 rounded-xl border border-gray-200/60 dark:border-white/8 divide-y divide-gray-100 dark:divide-white/5">
            {SOUMISSIONS.map((s, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.05 }}
                className="flex items-center gap-3 p-3 hover:bg-gray-100 dark:hover:bg-white/3 transition-colors"
              >
                <div className="w-9 h-9 rounded-lg flex items-center justify-center shrink-0 text-xs font-bold text-violet-600 bg-violet-50 dark:bg-violet-500/10">
                  {s.initials}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-semibold text-gray-900 dark:text-white truncate">{s.entreprise}</p>
                  <p className="text-[10px] text-gray-400">{s.ao}</p>
                </div>
                {s.score !== null ? (
                  <span className={`text-sm font-bold ${s.score >= 80 ? 'text-emerald-600' : s.score >= 60 ? 'text-amber-600' : 'text-red-500'}`}>
                    {s.score}/100
                  </span>
                ) : (
                  <span className="px-2 py-0.5 text-[10px] font-bold rounded-full" style={{ background: `${s.color}15`, color: s.color }}>
                    {s.status}
                  </span>
                )}
                <ArrowRight size={12} className="text-gray-300 dark:text-gray-600 shrink-0" />
              </motion.div>
            ))}
          </div>
        </section>

        {/* CALENDAR + QUICK ACCESS */}
        <section id="autorite-calendar" className="lg:col-span-2 space-y-6">
          {/* Échéances */}
          <div>
            <h2 className="text-sm font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-3 flex items-center gap-2">
              <Calendar size={14} /> Échéances
            </h2>
            <div className="bg-white dark:bg-white/5 rounded-xl border border-gray-200/60 dark:border-white/8 divide-y divide-gray-100 dark:divide-white/5">
              {CALENDAR.map((c, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 + i * 0.05 }}
                  className="flex items-center gap-3 p-3"
                >
                  <div className="w-8 h-8 rounded-lg flex items-center justify-center shrink-0" style={{ background: `${c.color}15` }}>
                    <c.icon size={14} style={{ color: c.color }} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-xs text-gray-700 dark:text-gray-300 truncate">{c.event}</p>
                    <p className="text-[10px] font-bold text-gray-400">{c.date}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Quick access */}
          <div>
            <h2 className="text-sm font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-3">
              Accès rapide
            </h2>
            <div className="grid grid-cols-2 gap-3">
              {[
                { icon: ClipboardList, title: "Créer un AO", desc: "Nouvel appel d'offres", href: '/dashboard/marches/autorite', color: '#7c3aed' },
                { icon: BookOpen, title: 'Annuaire', desc: 'Entreprises', href: '/dashboard/annuaire', color: '#10b981' },
              ].map((mod, i) => (
                <motion.div key={mod.href} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 + i * 0.05 }}>
                  <Link href={mod.href} aria-label={`Accéder à ${mod.title}`} className="block bg-white dark:bg-white/5 rounded-xl border border-gray-200/60 dark:border-white/8 p-4 hover:-translate-y-0.5 transition-all group no-underline">
                    <div className="w-9 h-9 rounded-lg flex items-center justify-center text-white mb-3" style={{ background: mod.color }}>
                      <mod.icon size={16} />
                    </div>
                    <h3 className="text-sm font-bold text-gray-900 dark:text-white mb-0.5 group-hover:text-violet-500 transition-colors">
                      {mod.title}
                    </h3>
                    <p className="text-[10px] text-gray-500 dark:text-gray-400">{mod.desc}</p>
                  </Link>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
