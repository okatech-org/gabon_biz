'use client';

// GABON BIZ — Espace Entrepreneur
// Ange Moussavou — Directeur Général, Mbadinga Technologies SARL

import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import {
  Building2,
  FileText,
  Send,
  AlertTriangle,
  ArrowRight,
  CheckCircle2,
  Clock,
  Factory,
  BookOpen,
  Bell,
  BadgeCheck,
  XCircle,
  Briefcase,
} from 'lucide-react';

/* ═══════ MOCK DATA ═══════ */

const STATS = [
  { icon: Building2, label: 'Mes entreprises', value: '3', color: '#009e49' },
  { icon: FileText, label: 'Marchés ouverts', value: '12', color: '#3b82f6' },
  { icon: Send, label: 'Soumissions', value: '2', color: '#f59e0b' },
  { icon: Bell, label: 'Alertes', value: '5', color: '#ef4444' },
];

const MARCHES_COMPATIBLES = [
  {
    id: 1,
    ref: 'DGMP-2026-AO-001',
    titre: 'Développement du SI de gestion des marchés publics',
    autorite: 'MENUDI',
    budget: '500M — 1.2Mds FCFA',
    dateLimite: '30 juin 2026',
    secteur: 'Technologies de l\'Information',
    color: '#3b82f6',
  },
  {
    id: 2,
    ref: 'DGMP-2026-AO-005',
    titre: 'Plateforme e-santé nationale — Système de gestion hospitalière',
    autorite: 'Min. Santé',
    budget: '800M — 2Mds FCFA',
    dateLimite: '15 août 2026',
    secteur: 'HealthTech',
    color: '#10b981',
  },
];

const MES_ENTREPRISES = [
  {
    id: 1,
    nom: 'Mbadinga Technologies SARL',
    type: 'SARL',
    rccm: 'GA-LIB-2026-B-00001',
    secteur: 'Technologies de l\'Information',
    employes: 15,
    statut: 'Active',
    statutColor: '#10b981',
  },
  {
    id: 2,
    nom: 'Ogooué Logistics SA',
    type: 'SA',
    rccm: 'GA-LIB-2026-B-00002',
    secteur: 'Transport et Logistique',
    employes: 45,
    statut: 'En attente',
    statutColor: '#f59e0b',
  },
  {
    id: 3,
    nom: 'EcoGabon EI',
    type: 'EI',
    rccm: 'GA-PGE-2026-B-00001',
    secteur: 'Environnement',
    employes: 3,
    statut: 'Brouillon',
    statutColor: '#6b7280',
  },
];

const SOUMISSIONS = [
  {
    id: 1,
    ref: 'DGMP-2026-AO-001',
    titre: 'Développement du SI des marchés publics',
    montant: '750 000 000 FCFA',
    date: '10 mars 2026',
    statut: 'Soumis',
    statutColor: '#3b82f6',
    via: 'Mbadinga Technologies SARL',
  },
  {
    id: 2,
    ref: 'DGMP-2026-AO-002',
    titre: 'Réseau fibre optique de Libreville',
    montant: '2 800 000 000 FCFA',
    date: '05 mars 2026',
    statut: 'En évaluation',
    statutColor: '#f59e0b',
    via: 'Ogooué Logistics SA',
  },
  {
    id: 3,
    ref: 'DGMP-2026-AO-003',
    titre: 'Équipements informatiques pour écoles',
    montant: '200 000 000 FCFA',
    date: '20 février 2026',
    statut: 'Rejeté',
    statutColor: '#ef4444',
    via: 'Mbadinga Technologies SARL',
  },
];

const RECENT_ACTIVITY = [
  {
    text: 'Soumission AO-001 envoyée — Mbadinga Technologies',
    time: 'Il y a 2h',
    icon: CheckCircle2,
    color: '#10b981',
  },
  {
    text: 'EcoGabon EI — brouillon sauvegardé',
    time: 'Hier',
    icon: FileText,
    color: '#6b7280',
  },
  {
    text: 'Nouveau marché compatible : Plateforme e-santé nationale',
    time: 'Il y a 2j',
    icon: Bell,
    color: '#ef4444',
  },
  {
    text: 'Ogooué Logistics SA — dossier RCCM mis à jour',
    time: 'Il y a 3j',
    icon: BadgeCheck,
    color: '#f59e0b',
  },
];

/* ═══════ COMPONENT ═══════ */

export default function EntrepreneurDashboard({
  user,
}: {
  user: { name?: string; title?: string; organization?: string };
}) {
  return (
    <div className="space-y-6">
      {/* ═══════ HERO ═══════ */}
      <motion.section
        id="entrepreneur-hero"
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        className="rounded-2xl p-6 sm:p-8 text-white relative overflow-hidden"
        style={{ background: 'linear-gradient(135deg, #009e49 0%, #006633 50%, #004d26 100%)' }}
      >
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(255,255,255,0.15),transparent_50%)]" />
        <div className="absolute top-4 right-6 opacity-10 hidden sm:block" aria-hidden="true">
          <Building2 size={120} />
        </div>
        <div className="relative z-10">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-12 h-12 rounded-xl bg-white/20 backdrop-blur-sm flex items-center justify-center shrink-0">
              <Building2 size={24} />
            </div>
            <div>
              <h1 className="text-xl sm:text-2xl font-bold">
                Bienvenue, {user?.name || 'Ange M.'} 👋
              </h1>
              <p className="text-sm opacity-80">
                {user?.title || 'Directeur Général'} —{' '}
                {user?.organization || 'Mbadinga Technologies SARL'}
              </p>
            </div>
          </div>
          <p className="text-sm opacity-70 mt-3 max-w-2xl">
            Gérez vos entreprises, consultez les marchés publics compatibles et suivez vos
            soumissions en temps réel.
          </p>
        </div>
      </motion.section>

      {/* ═══════ STATS ═══════ */}
      <section id="entrepreneur-stats" className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
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

      {/* ═══════ MARCHÉS COMPATIBLES ═══════ */}
      <section id="entrepreneur-marches">
        <h2 className="text-sm font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-3 flex items-center gap-2">
          <AlertTriangle size={14} /> Marchés compatibles avec votre profil
        </h2>
        <div className="space-y-3">
          {MARCHES_COMPATIBLES.map((m, i) => (
            <motion.div
              key={m.id}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.06 }}
              className="flex items-center gap-3 sm:gap-4 p-4 rounded-xl border"
              style={{
                background: `${m.color}08`,
                borderColor: `${m.color}20`,
              }}
            >
              <div
                className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0"
                style={{ background: `${m.color}15` }}
              >
                <Briefcase size={18} style={{ color: m.color }} />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 flex-wrap mb-1">
                  <span className="text-[10px] font-mono text-gray-400">{m.ref}</span>
                  <span
                    className="text-[10px] font-semibold px-2 py-0.5 rounded-full"
                    style={{ background: `${m.color}15`, color: m.color }}
                  >
                    ✅ Compatible
                  </span>
                </div>
                <p className="text-sm font-semibold text-gray-900 dark:text-white truncate">
                  {m.titre}
                </p>
                <p className="text-xs text-gray-500 dark:text-gray-400 truncate">
                  {m.autorite} · {m.budget} · Limite : {m.dateLimite}
                </p>
              </div>
              <Link
                href="/dashboard/marches"
                className="text-xs font-bold px-3 sm:px-4 py-2 rounded-lg text-white shrink-0 hover:opacity-90 transition-opacity no-underline"
                style={{ background: m.color }}
              >
                Voir
              </Link>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ═══════ MES ENTREPRISES ═══════ */}
      <section id="entrepreneur-entreprises">
        <div className="flex items-center justify-between mb-3">
          <h2 className="text-sm font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wider flex items-center gap-2">
            <Building2 size={14} /> Mes Entreprises
          </h2>
          <Link
            href="/dashboard/entreprises"
            className="text-xs font-semibold text-emerald-600 dark:text-emerald-400 hover:underline no-underline flex items-center gap-1"
          >
            Tout voir <ArrowRight size={12} />
          </Link>
        </div>
        <div className="bg-white dark:bg-white/5 rounded-xl border border-gray-200/60 dark:border-white/8 overflow-hidden">
          {/* Desktop table */}
          <div className="hidden sm:block">
            <table className="w-full text-sm" role="table" aria-label="Liste de mes entreprises">
              <thead>
                <tr className="border-b border-gray-200 dark:border-white/5 bg-gray-100/50 dark:bg-white/2">
                  <th className="text-left py-3 px-4 text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase">
                    Entreprise
                  </th>
                  <th className="text-left py-3 px-4 text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase hidden md:table-cell">
                    RCCM
                  </th>
                  <th className="text-left py-3 px-4 text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase">
                    Secteur
                  </th>
                  <th className="text-center py-3 px-4 text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase">
                    Statut
                  </th>
                </tr>
              </thead>
              <tbody>
                {MES_ENTREPRISES.map((e) => (
                  <tr
                    key={e.id}
                    className="border-b border-gray-50 dark:border-white/3 hover:bg-gray-100 dark:hover:bg-white/2 transition-colors"
                  >
                    <td className="py-3 px-4">
                      <div className="font-semibold text-gray-900 dark:text-white">{e.nom}</div>
                      <div className="text-[10px] text-gray-400">
                        {e.type} · {e.employes} employés
                      </div>
                    </td>
                    <td className="py-3 px-4 text-gray-500 dark:text-gray-400 font-mono text-xs hidden md:table-cell">
                      {e.rccm}
                    </td>
                    <td className="py-3 px-4 text-gray-500 dark:text-gray-400 text-xs">
                      {e.secteur}
                    </td>
                    <td className="py-3 px-4 text-center">
                      <span
                        className="text-xs font-semibold px-2.5 py-1 rounded-full"
                        style={{ background: `${e.statutColor}15`, color: e.statutColor }}
                      >
                        {e.statut}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Mobile cards */}
          <div className="sm:hidden divide-y divide-gray-100 dark:divide-white/5">
            {MES_ENTREPRISES.map((e) => (
              <div key={e.id} className="p-4">
                <div className="flex items-center justify-between mb-2">
                  <span className="font-semibold text-sm text-gray-900 dark:text-white">
                    {e.nom}
                  </span>
                  <span
                    className="text-[10px] font-semibold px-2 py-0.5 rounded-full"
                    style={{ background: `${e.statutColor}15`, color: e.statutColor }}
                  >
                    {e.statut}
                  </span>
                </div>
                <div className="flex items-center gap-3 text-xs text-gray-500 dark:text-gray-400">
                  <span>{e.type}</span>
                  <span>·</span>
                  <span>{e.secteur}</span>
                  <span>·</span>
                  <span>{e.employes} emp.</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════ SOUMISSIONS RÉCENTES ═══════ */}
      <section id="entrepreneur-soumissions">
        <div className="flex items-center justify-between mb-3">
          <h2 className="text-sm font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wider flex items-center gap-2">
            <Send size={14} /> Soumissions récentes
          </h2>
          <Link
            href="/dashboard/soumissions"
            className="text-xs font-semibold text-emerald-600 dark:text-emerald-400 hover:underline no-underline flex items-center gap-1"
          >
            Tout voir <ArrowRight size={12} />
          </Link>
        </div>
        <div className="bg-white dark:bg-white/5 rounded-xl border border-gray-200/60 dark:border-white/8 divide-y divide-gray-100 dark:divide-white/5">
          {SOUMISSIONS.map((s, i) => {
            const StatusIcon =
              s.statut === 'Soumis'
                ? CheckCircle2
                : s.statut === 'En évaluation'
                  ? Clock
                  : XCircle;
            return (
              <motion.div
                key={s.id}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.05 }}
                className="flex items-center gap-3 sm:gap-4 p-3 sm:p-4 hover:bg-gray-100 dark:hover:bg-white/3 transition-colors"
              >
                <div
                  className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0"
                  style={{ background: `${s.statutColor}15` }}
                >
                  <StatusIcon size={18} style={{ color: s.statutColor }} />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="text-[10px] font-mono text-gray-400">{s.ref}</span>
                    <span
                      className="text-[10px] font-semibold px-2 py-0.5 rounded-full"
                      style={{ background: `${s.statutColor}15`, color: s.statutColor }}
                    >
                      {s.statut}
                    </span>
                  </div>
                  <p className="text-sm font-semibold text-gray-900 dark:text-white truncate">
                    {s.titre}
                  </p>
                  <p className="text-xs text-gray-500 dark:text-gray-400 truncate">
                    via {s.via} · {s.date}
                  </p>
                </div>
                <div className="text-right shrink-0 hidden sm:block">
                  <p className="text-sm font-bold text-gray-900 dark:text-white">{s.montant}</p>
                </div>
              </motion.div>
            );
          })}
        </div>
      </section>

      {/* ═══════ TWO-COLUMN: Activity + Quick Access ═══════ */}
      <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
        {/* ACTIVITÉ RÉCENTE */}
        <section id="entrepreneur-activity" className="lg:col-span-3">
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
        <section id="entrepreneur-quick-access" className="lg:col-span-2">
          <h2 className="text-sm font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-3">
            Accès rapide
          </h2>
          <div className="grid grid-cols-2 gap-3">
            {[
              {
                icon: FileText,
                title: 'Marchés Publics',
                desc: 'Appels d\'offres ouverts',
                href: '/dashboard/marches',
                color: '#3b82f6',
              },
              {
                icon: Send,
                title: 'Soumissions',
                desc: 'Suivre mes candidatures',
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
                  <h3 className="text-sm font-bold text-gray-900 dark:text-white mb-0.5 group-hover:text-emerald-500 transition-colors">
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
