'use client';

// GABON BIZ — Autorité Contractante — Gestion des Marchés
// Pipeline AO, création d'appels d'offres, évaluation des soumissions
// Polish: motion animations, responsive table, ARIA, form transitions

import React, { useState } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import {
  FilePlus2,
  ChevronLeft,
  FileText,
  Send,
  Eye,
  CheckCircle2,
  ClipboardList,
  Award,
  Clock,
  Calendar,
  Building2,
  Filter,
} from 'lucide-react';
import { PageHeader, StatusBadge, formatCFA, formatDate } from '@/components/ui';

/* ─── Mock Data ─── */

const MY_TENDERS = [
  {
    id: 'ao-001',
    reference: 'ANINF-2026-AO-001',
    title: 'Modernisation du réseau intranet gouvernemental',
    sector: 'Infrastructure numérique',
    status: 'PUBLISHED',
    budget: 1500000000,
    deadline: '2026-04-15',
    submissions: 8,
    evaluatedCount: 3,
    createdAt: '2026-02-15',
  },
  {
    id: 'ao-002',
    reference: 'ANINF-2026-AO-002',
    title: 'Plateforme de gestion documentaire unifiée (GED)',
    sector: 'Logiciel',
    status: 'PUBLISHED',
    budget: 680000000,
    deadline: '2026-05-01',
    submissions: 5,
    evaluatedCount: 0,
    createdAt: '2026-03-01',
  },
  {
    id: 'ao-003',
    reference: 'ANINF-2026-AO-003',
    title: 'Audit cybersécurité des systèmes critiques',
    sector: 'Cybersécurité',
    status: 'EVALUATION',
    budget: 350000000,
    deadline: '2026-03-10',
    submissions: 12,
    evaluatedCount: 12,
    createdAt: '2026-01-20',
  },
  {
    id: 'ao-004',
    reference: 'ANINF-2026-AO-004',
    title: 'Déploiement WiFi public — Zones économiques spéciales',
    sector: 'Télécommunications',
    status: 'DRAFT',
    budget: 2200000000,
    deadline: '',
    submissions: 0,
    evaluatedCount: 0,
    createdAt: '2026-03-10',
  },
];

const SUBMISSIONS_RECEIVED = [
  {
    id: 's-1',
    enterprise: 'Mbadinga Technologies SARL',
    tender: 'ANINF-2026-AO-001',
    amount: 1350000000,
    score: 85,
    status: 'EVALUATED',
    date: '2026-03-08',
  },
  {
    id: 's-2',
    enterprise: 'Ogooué Digital Solutions',
    tender: 'ANINF-2026-AO-001',
    amount: 1480000000,
    score: 72,
    status: 'EVALUATED',
    date: '2026-03-09',
  },
  {
    id: 's-3',
    enterprise: 'GabonTech Consulting SA',
    tender: 'ANINF-2026-AO-001',
    amount: 1200000000,
    score: 91,
    status: 'EVALUATED',
    date: '2026-03-07',
  },
  {
    id: 's-4',
    enterprise: 'Digital Estuaire SARL',
    tender: 'ANINF-2026-AO-002',
    amount: 620000000,
    score: null,
    status: 'PENDING',
    date: '2026-03-11',
  },
  {
    id: 's-5',
    enterprise: 'Nzé & Partners IT',
    tender: 'ANINF-2026-AO-002',
    amount: 670000000,
    score: null,
    status: 'PENDING',
    date: '2026-03-10',
  },
];

const PIPELINE_STAGES = [
  { key: 'DRAFT', label: 'Brouillon', color: '#9ca3af', Icon: FileText },
  { key: 'PUBLISHED', label: 'Publié', color: '#3b82f6', Icon: Send },
  { key: 'EVALUATION', label: 'Évaluation', color: '#f59e0b', Icon: Eye },
  { key: 'AWARDED', label: 'Attribué', color: '#10b981', Icon: Award },
];

const fadeUp = {
  hidden: { opacity: 0, y: 16 },
  visible: (i: number) => ({ opacity: 1, y: 0, transition: { delay: i * 0.06, duration: 0.4 } }),
};

/* ─── Component ─── */

export default function AutoriteContractantePage() {
  const [showForm, setShowForm] = useState(false);
  const [statusFilter, setStatusFilter] = useState<string>('ALL');

  const filteredTenders =
    statusFilter === 'ALL' ? MY_TENDERS : MY_TENDERS.filter((t) => t.status === statusFilter);

  const totalBudget = MY_TENDERS.reduce((sum, t) => sum + t.budget, 0);
  const totalSubmissions = MY_TENDERS.reduce((sum, t) => sum + t.submissions, 0);

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <PageHeader
          title="Mes Appels d'Offres"
          subtitle={`ANINF — Autorité Contractante · ${MY_TENDERS.length} marchés · ${formatCFA(totalBudget)} budget total`}
        />
        <button
          onClick={() => setShowForm(!showForm)}
          className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-linear-to-r from-violet-600 to-purple-600 text-white text-sm font-semibold border-none cursor-pointer hover:shadow-lg hover:shadow-violet-200 dark:hover:shadow-violet-900/30 transition-all shrink-0"
          aria-expanded={showForm}
          aria-controls="ao-form"
        >
          <FilePlus2 size={16} />
          {showForm ? 'Fermer' : 'Créer un AO'}
        </button>
      </div>

      {/* Quick Stats Pipeline */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        {PIPELINE_STAGES.map((stage, i) => {
          const count = MY_TENDERS.filter((t) => t.status === stage.key).length;
          const StageIcon = stage.Icon;
          return (
            <motion.div
              key={stage.key}
              variants={fadeUp}
              custom={i}
              initial="hidden"
              animate="visible"
              className={`p-4 rounded-xl bg-white dark:bg-gray-900 border text-center cursor-pointer transition-all ${
                statusFilter === stage.key
                  ? 'border-2 shadow-md'
                  : 'border-gray-100 dark:border-gray-800 hover:shadow-sm'
              }`}
              style={statusFilter === stage.key ? { borderColor: stage.color } : undefined}
              onClick={() => setStatusFilter(statusFilter === stage.key ? 'ALL' : stage.key)}
              role="button"
              aria-pressed={statusFilter === stage.key}
              aria-label={`Filtrer par ${stage.label}: ${count} marchés`}
            >
              <StageIcon size={20} className="mx-auto mb-1" style={{ color: stage.color }} />
              <div className="text-2xl font-extrabold mt-1" style={{ color: stage.color }}>
                {count}
              </div>
              <div className="text-xs text-gray-500 dark:text-gray-400">{stage.label}</div>
            </motion.div>
          );
        })}
      </div>

      {statusFilter !== 'ALL' && (
        <button
          onClick={() => setStatusFilter('ALL')}
          className="text-xs text-violet-600 dark:text-violet-400 font-semibold border-none bg-transparent cursor-pointer hover:underline"
        >
          ✕ Réinitialiser le filtre
        </button>
      )}

      {/* Create AO Form */}
      <AnimatePresence>
        {showForm && (
          <motion.div
            id="ao-form"
            initial={{ opacity: 0, height: 0, marginTop: 0 }}
            animate={{ opacity: 1, height: 'auto', marginTop: 0 }}
            exit={{ opacity: 0, height: 0, marginTop: 0 }}
            transition={{ duration: 0.3, ease: 'easeInOut' }}
            className="overflow-hidden"
          >
            <div className="p-6 rounded-2xl bg-white dark:bg-gray-900 border-2 border-violet-200 dark:border-violet-800 shadow-lg">
              <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
                <ClipboardList size={18} className="text-violet-500" />
                Nouvel Appel d&apos;Offres
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label
                    htmlFor="ao-title"
                    className="block text-xs font-semibold text-gray-500 dark:text-gray-400 mb-1"
                  >
                    Titre du marché <span className="text-red-500">*</span>
                  </label>
                  <input
                    id="ao-title"
                    type="text"
                    placeholder="Ex: Modernisation du système informatique"
                    className="w-full px-3 py-2.5 rounded-xl border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 text-sm text-gray-900 dark:text-white outline-none focus:border-violet-500 focus:ring-2 focus:ring-violet-100 dark:focus:ring-violet-800 transition-colors"
                    required
                  />
                </div>
                <div>
                  <label
                    htmlFor="ao-sector"
                    className="block text-xs font-semibold text-gray-500 dark:text-gray-400 mb-1"
                  >
                    Secteur <span className="text-red-500">*</span>
                  </label>
                  <select
                    id="ao-sector"
                    className="w-full px-3 py-2.5 rounded-xl border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 text-sm text-gray-900 dark:text-white outline-none focus:border-violet-500 transition-colors"
                    required
                  >
                    <option value="">Sélectionner un secteur</option>
                    <option>Infrastructure numérique</option>
                    <option>Logiciel</option>
                    <option>Cybersécurité</option>
                    <option>Télécommunications</option>
                    <option>Formation</option>
                  </select>
                </div>
                <div>
                  <label
                    htmlFor="ao-budget"
                    className="block text-xs font-semibold text-gray-500 dark:text-gray-400 mb-1"
                  >
                    Budget estimé (FCFA) <span className="text-red-500">*</span>
                  </label>
                  <input
                    id="ao-budget"
                    type="number"
                    placeholder="1 500 000 000"
                    className="w-full px-3 py-2.5 rounded-xl border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 text-sm text-gray-900 dark:text-white outline-none focus:border-violet-500 focus:ring-2 focus:ring-violet-100 dark:focus:ring-violet-800 transition-colors"
                    required
                    min={0}
                  />
                </div>
                <div>
                  <label
                    htmlFor="ao-deadline"
                    className="block text-xs font-semibold text-gray-500 dark:text-gray-400 mb-1"
                  >
                    Date limite de soumission <span className="text-red-500">*</span>
                  </label>
                  <input
                    id="ao-deadline"
                    type="date"
                    className="w-full px-3 py-2.5 rounded-xl border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 text-sm text-gray-900 dark:text-white outline-none focus:border-violet-500 focus:ring-2 focus:ring-violet-100 dark:focus:ring-violet-800 transition-colors"
                    required
                  />
                </div>
                <div className="md:col-span-2">
                  <label
                    htmlFor="ao-desc"
                    className="block text-xs font-semibold text-gray-500 dark:text-gray-400 mb-1"
                  >
                    Description & Cahier des charges
                  </label>
                  <textarea
                    id="ao-desc"
                    rows={3}
                    placeholder="Décrivez les exigences techniques et administratives..."
                    className="w-full px-3 py-2.5 rounded-xl border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 text-sm text-gray-900 dark:text-white outline-none focus:border-violet-500 focus:ring-2 focus:ring-violet-100 dark:focus:ring-violet-800 resize-y transition-colors"
                  />
                </div>
              </div>
              <div className="flex flex-wrap gap-3 mt-5">
                <button className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 text-sm font-medium border-none cursor-pointer hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors">
                  <FileText size={14} /> Sauvegarder brouillon
                </button>
                <button className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-linear-to-r from-violet-600 to-purple-600 text-white text-sm font-semibold border-none cursor-pointer hover:shadow-lg transition-all">
                  <Send size={14} /> Publier l&apos;appel d&apos;offres
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* My Tenders List */}
      <section aria-label="Pipeline des marchés">
        <h2 className="text-lg font-bold text-gray-900 dark:text-white mb-3 flex items-center gap-2">
          <ClipboardList size={18} className="text-violet-500" /> Pipeline des Marchés
          <span className="text-xs font-normal text-gray-400 ml-1">({filteredTenders.length})</span>
        </h2>
        <div className="space-y-3">
          {filteredTenders.map((t, idx) => {
            const stage = PIPELINE_STAGES.find((s) => s.key === t.status);
            return (
              <motion.div
                key={t.id}
                variants={fadeUp}
                custom={idx}
                initial="hidden"
                animate="visible"
                className="p-5 rounded-xl bg-white dark:bg-gray-900 border border-gray-100 dark:border-gray-800 hover:shadow-md transition-shadow"
              >
                <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3 mb-3">
                  <div className="flex-1 min-w-0">
                    <div className="flex flex-wrap items-center gap-2 mb-1">
                      <span className="text-xs font-mono text-gray-400">{t.reference}</span>
                      <StatusBadge status={t.status} />
                    </div>
                    <h3 className="text-base font-semibold text-gray-900 dark:text-white">
                      {t.title}
                    </h3>
                    <span className="text-xs text-gray-500 dark:text-gray-400">{t.sector}</span>
                  </div>
                  <div className="sm:text-right shrink-0">
                    <div className="text-sm font-bold text-gray-900 dark:text-white">
                      {formatCFA(t.budget)}
                    </div>
                    {t.deadline && (
                      <div className="flex items-center gap-1 text-xs text-gray-400 mt-1 sm:justify-end">
                        <Calendar size={10} /> Limite : {formatDate(t.deadline)}
                      </div>
                    )}
                  </div>
                </div>
                <div className="flex flex-wrap items-center gap-x-5 gap-y-1 pt-3 border-t border-gray-50 dark:border-gray-800 text-xs text-gray-500 dark:text-gray-400">
                  <span className="inline-flex items-center gap-1">
                    <Send size={10} /> {t.submissions} soumission(s)
                  </span>
                  <span className="inline-flex items-center gap-1">
                    <CheckCircle2 size={10} /> {t.evaluatedCount} évaluée(s)
                  </span>
                  <span className="inline-flex items-center gap-1">
                    <Clock size={10} /> Créé le {formatDate(t.createdAt)}
                  </span>
                  {/* Pipeline progress dots */}
                  <div
                    className="flex-1 flex items-center gap-1 justify-end"
                    aria-label={`Étape: ${stage?.label}`}
                  >
                    {PIPELINE_STAGES.map((s, i) => {
                      const reached = PIPELINE_STAGES.findIndex((p) => p.key === t.status) >= i;
                      return (
                        <div key={s.key} className="flex items-center gap-1">
                          <div
                            className="w-2.5 h-2.5 rounded-full transition-colors"
                            style={{ background: reached ? stage?.color : '#e5e7eb' }}
                            title={s.label}
                          />
                          {i < PIPELINE_STAGES.length - 1 && (
                            <div
                              className="w-4 h-0.5"
                              style={{ background: reached ? stage?.color : '#e5e7eb' }}
                            />
                          )}
                        </div>
                      );
                    })}
                  </div>
                </div>
              </motion.div>
            );
          })}
          {filteredTenders.length === 0 && (
            <div className="text-center py-8 text-gray-400 text-sm">
              Aucun marché pour ce filtre —{' '}
              <button
                onClick={() => setStatusFilter('ALL')}
                className="text-violet-500 font-semibold border-none bg-transparent cursor-pointer hover:underline"
              >
                voir tous
              </button>
            </div>
          )}
        </div>
      </section>

      {/* Soumissions Reçues — responsive: cards on mobile, table on desktop */}
      <section aria-label="Soumissions reçues">
        <h2 className="text-lg font-bold text-gray-900 dark:text-white mb-3 flex items-center gap-2">
          <Building2 size={18} className="text-blue-500" /> Soumissions Reçues
          <span className="text-xs font-normal text-gray-400 ml-1">({totalSubmissions})</span>
        </h2>

        {/* Desktop Table */}
        <div className="hidden sm:block overflow-x-auto rounded-xl border border-gray-100 dark:border-gray-800 bg-white dark:bg-gray-900">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-gray-50 dark:bg-gray-800/50 text-left">
                <th className="px-4 py-3 text-xs font-semibold text-gray-500 dark:text-gray-400">
                  Entreprise
                </th>
                <th className="px-4 py-3 text-xs font-semibold text-gray-500 dark:text-gray-400">
                  Réf. AO
                </th>
                <th className="px-4 py-3 text-xs font-semibold text-gray-500 dark:text-gray-400">
                  Montant
                </th>
                <th className="px-4 py-3 text-xs font-semibold text-gray-500 dark:text-gray-400">
                  Score
                </th>
                <th className="px-4 py-3 text-xs font-semibold text-gray-500 dark:text-gray-400">
                  Statut
                </th>
                <th className="px-4 py-3 text-xs font-semibold text-gray-500 dark:text-gray-400">
                  Date
                </th>
              </tr>
            </thead>
            <tbody>
              {SUBMISSIONS_RECEIVED.map((sub) => (
                <tr
                  key={sub.id}
                  className="border-t border-gray-50 dark:border-gray-800 hover:bg-gray-50 dark:hover:bg-gray-800/30 transition-colors"
                >
                  <td className="px-4 py-3 font-medium text-gray-900 dark:text-white">
                    {sub.enterprise}
                  </td>
                  <td className="px-4 py-3 font-mono text-xs text-gray-500">{sub.tender}</td>
                  <td className="px-4 py-3 font-semibold text-gray-700 dark:text-gray-300">
                    {formatCFA(sub.amount)}
                  </td>
                  <td className="px-4 py-3">
                    {sub.score !== null ? (
                      <span
                        className={`font-bold ${sub.score >= 80 ? 'text-emerald-600' : sub.score >= 60 ? 'text-amber-600' : 'text-red-600'}`}
                      >
                        {sub.score}/100
                      </span>
                    ) : (
                      <span className="text-gray-400">En attente</span>
                    )}
                  </td>
                  <td className="px-4 py-3">
                    <StatusBadge status={sub.status === 'EVALUATED' ? 'CLOSED' : 'PUBLISHED'} />
                  </td>
                  <td className="px-4 py-3 text-gray-500 dark:text-gray-400">
                    {formatDate(sub.date)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Mobile Cards */}
        <div className="sm:hidden space-y-3">
          {SUBMISSIONS_RECEIVED.map((sub) => (
            <div
              key={sub.id}
              className="p-4 rounded-xl bg-white dark:bg-gray-900 border border-gray-100 dark:border-gray-800"
            >
              <div className="flex items-center justify-between mb-2">
                <h4 className="text-sm font-semibold text-gray-900 dark:text-white truncate">
                  {sub.enterprise}
                </h4>
                <StatusBadge status={sub.status === 'EVALUATED' ? 'CLOSED' : 'PUBLISHED'} />
              </div>
              <div className="grid grid-cols-2 gap-y-1.5 text-xs text-gray-500 dark:text-gray-400">
                <span>
                  Réf:{' '}
                  <span className="font-mono text-gray-700 dark:text-gray-300">
                    {sub.tender.split('-').slice(-1)}
                  </span>
                </span>
                <span className="text-right">
                  Score:{' '}
                  {sub.score !== null ? (
                    <strong
                      className={
                        sub.score >= 80
                          ? 'text-emerald-600'
                          : sub.score >= 60
                            ? 'text-amber-600'
                            : 'text-red-600'
                      }
                    >
                      {sub.score}/100
                    </strong>
                  ) : (
                    'En attente'
                  )}
                </span>
                <span>
                  Montant:{' '}
                  <strong className="text-gray-700 dark:text-gray-300">
                    {formatCFA(sub.amount)}
                  </strong>
                </span>
                <span className="text-right">{formatDate(sub.date)}</span>
              </div>
            </div>
          ))}
        </div>
      </section>

      <div className="text-center py-4">
        <Link
          href="/dashboard/marches"
          className="inline-flex items-center gap-1.5 text-sm text-violet-600 dark:text-violet-400 font-semibold hover:underline"
        >
          <ChevronLeft size={14} /> Retour aux Marchés Publics
        </Link>
      </div>
    </div>
  );
}
