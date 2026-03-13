'use client';

// GABON BIZ — Marchés Publics (M2) — Dual view: Soumissionnaire & Gestionnaire DGMP

import React, { useState } from 'react';
import Link from 'next/link';
import { useAuth } from '@/lib/auth-context';
import { getDemoAccountByNip } from '@/lib/demo-accounts';
import {
  PageHeader,
  StatusBadge,
  EmptyState,
  PrimaryButton,
  FilterBar,
  StatsCard,
  formatCFA,
  formatDate,
} from '@/components/ui';

const MOCK_TENDERS = [
  {
    id: '1',
    reference: 'DGMP-2026-AO-001',
    title: 'Développement du SI de gestion des marchés publics',
    issuingAuthority: 'MENUDI',
    sector: { name: 'Technologies' },
    budgetMin: 500000000,
    budgetMax: 1200000000,
    submissionDeadline: '2026-06-30',
    status: 'PUBLISHED',
    _count: { submissions: 5 },
    publishedBy: 'Patrick Obame',
    evaluationStatus: '3/5 évalués',
  },
  {
    id: '2',
    reference: 'DGMP-2026-AO-002',
    title: 'Réhabilitation du réseau fibre optique de Libreville',
    issuingAuthority: 'ANINF',
    sector: { name: 'Télécommunications' },
    budgetMin: 2000000000,
    budgetMax: 3500000000,
    submissionDeadline: '2026-07-15',
    status: 'PUBLISHED',
    _count: { submissions: 12 },
    publishedBy: 'Jean-Sylvain Mba',
    evaluationStatus: '0/12 évalués',
  },
  {
    id: '3',
    reference: 'DGMP-2026-AO-003',
    title: "Fourniture d'équipements informatiques pour les écoles",
    issuingAuthority: 'MEN',
    sector: { name: 'Éducation' },
    budgetMin: 150000000,
    budgetMax: 300000000,
    submissionDeadline: '2026-05-20',
    status: 'CLOSED',
    _count: { submissions: 8 },
    publishedBy: 'Patrick Obame',
    evaluationStatus: '8/8 évalués',
  },
  {
    id: '4',
    reference: 'DGMP-2026-AO-004',
    title: 'Plateforme e-santé nationale',
    issuingAuthority: 'Min. Santé',
    sector: { name: 'Santé' },
    budgetMin: 800000000,
    budgetMax: 1500000000,
    submissionDeadline: '2026-08-01',
    status: 'DRAFT',
    _count: { submissions: 0 },
    publishedBy: 'Patrick Obame',
    evaluationStatus: 'Brouillon',
  },
  {
    id: '5',
    reference: 'DGMP-2026-AO-005',
    title: "Audit sécurité des systèmes d'information publics",
    issuingAuthority: 'ANINF',
    sector: { name: 'Technologies' },
    budgetMin: 100000000,
    budgetMax: 250000000,
    submissionDeadline: '2026-09-15',
    status: 'PUBLISHED',
    _count: { submissions: 3 },
    publishedBy: 'Jean-Sylvain Mba',
    evaluationStatus: '1/3 évalués',
  },
];

// DGMP stats
const DGMP_STATS = [
  { icon: '📋', title: 'Marchés publiés', value: 8, color: '#3b82f6' },
  { icon: '📨', title: 'Soumissions reçues', value: 25, color: '#f59e0b' },
  { icon: '✅', title: 'Marchés attribués', value: 3, color: '#009e49' },
  { icon: '💰', title: 'Budget engagé', value: '45 Mds FCFA' as string | number, color: '#8b5cf6' },
];

export default function MarchesPage() {
  const { user } = useAuth();
  const [filter, setFilter] = useState('ALL');

  const account = user?.isDemo ? getDemoAccountByNip(user.nip) : null;
  const isDGMP =
    account?.user.roles.includes('DGMP') || account?.user.roles.includes('AUTORITE_CONTRACTANTE');
  const isEntrepreneur = account?.user.profileType === 'ENTREPRENEUR';

  const entrepreneurSector = 'Technologies';

  // Build filter options
  const filterOptions = isDGMP
    ? [
        { value: 'ALL', label: 'Tous' },
        { value: 'PUBLISHED', label: 'Ouverts' },
        { value: 'DRAFT', label: 'Brouillons' },
        { value: 'CLOSED', label: 'Clôturés' },
      ]
    : [
        { value: 'ALL', label: 'Tous' },
        { value: 'PUBLISHED', label: 'Ouverts' },
        { value: 'CLOSED', label: 'Clôturés' },
      ];

  if (isEntrepreneur) {
    filterOptions.push({ value: 'SECTOR', label: '🎯 Mon secteur' });
  }

  // Filter tenders
  const filteredTenders =
    filter === 'SECTOR'
      ? MOCK_TENDERS.filter((t) => t.sector.name === entrepreneurSector && t.status === 'PUBLISHED')
      : filter === 'ALL'
        ? MOCK_TENDERS
        : MOCK_TENDERS.filter((t) => t.status === filter);

  return (
    <div>
      <PageHeader
        title={isDGMP ? 'Gestion des Marchés Publics' : 'Marchés Publics'}
        subtitle={
          isDGMP
            ? `${MOCK_TENDERS.length} appels d'offres sous votre supervision`
            : `${MOCK_TENDERS.length} appel(s) d'offres`
        }
        action={
          isDGMP ? (
            <PrimaryButton href="/dashboard/marches/nouveau">
              ➕ Nouvel Appel d&apos;Offres
            </PrimaryButton>
          ) : undefined
        }
      />

      {/* DGMP/Autorité — Link to dedicated management page */}
      {isDGMP && (
        <Link
          href="/dashboard/marches/autorite"
          className="flex items-center justify-between p-4 mb-5 rounded-xl bg-linear-to-r from-violet-50 to-purple-50 dark:from-violet-950/30 dark:to-purple-950/30 border border-violet-200/60 dark:border-violet-800/40 no-underline hover:shadow-md transition-all duration-200"
        >
          <div className="flex items-center gap-3">
            <span className="text-2xl">🏛️</span>
            <div>
              <h3 className="text-sm font-bold text-gray-900 dark:text-white m-0">
                Espace Autorité Contractante
              </h3>
              <p className="text-xs text-gray-500 dark:text-gray-400 m-0">
                Pipeline AO, création d&apos;appels d&apos;offres, évaluer les soumissions
              </p>
            </div>
          </div>
          <span className="text-violet-600 dark:text-violet-400 font-semibold text-sm">
            Accéder →
          </span>
        </Link>
      )}

      {/* DGMP Stats row */}
      {isDGMP && (
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 mb-6">
          {DGMP_STATS.map((s) => (
            <StatsCard
              key={s.title}
              icon={s.icon}
              title={s.title}
              value={s.value}
              color={s.color}
            />
          ))}
        </div>
      )}

      {/* Entrepreneur sector filter info */}
      {isEntrepreneur && (
        <div className="flex items-center gap-2.5 px-4 py-2.5 rounded-xl mb-4 bg-emerald-50/50 dark:bg-emerald-950/20 border border-emerald-200/40 dark:border-emerald-800/30">
          <span>🎯</span>
          <span className="text-[13px] font-medium text-emerald-700 dark:text-emerald-400">
            {
              MOCK_TENDERS.filter(
                (t) => t.sector.name === entrepreneurSector && t.status === 'PUBLISHED',
              ).length
            }{' '}
            marchés correspondent à votre secteur (Technologies)
          </span>
        </div>
      )}

      {/* Filters */}
      <FilterBar
        options={filterOptions}
        active={filter}
        onChange={setFilter}
        accentColor={
          isDGMP ? '#3b82f6' : isEntrepreneur && filter === 'SECTOR' ? '#009e49' : '#3b82f6'
        }
      />

      {/* Tender Cards */}
      {filteredTenders.length === 0 ? (
        <EmptyState
          icon="📋"
          title="Aucun marché"
          description="Aucun marché public ne correspond à vos filtres."
        />
      ) : (
        <div className="flex flex-col gap-4">
          {filteredTenders.map((t) => {
            const isCompatible =
              isEntrepreneur && t.sector.name === entrepreneurSector && t.status === 'PUBLISHED';
            return (
              <Link key={t.id} href={`/dashboard/marches/${t.id}`} className="no-underline group">
                <div
                  className={`bg-white dark:bg-gray-900 rounded-2xl p-5 sm:p-6 border shadow-sm hover:shadow-md hover:-translate-y-0.5 transition-all duration-200 cursor-pointer ${isCompatible ? 'border-emerald-200/60 dark:border-emerald-800/40' : 'border-gray-100 dark:border-gray-800'}`}
                >
                  {/* Header */}
                  <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-2 mb-4">
                    <div className="flex-1 min-w-0">
                      <div className="flex flex-wrap items-center gap-2 mb-1.5">
                        <span className="text-xs font-mono text-gray-400 dark:text-gray-500">
                          {t.reference}
                        </span>
                        <StatusBadge status={t.status} />
                        {isCompatible && (
                          <span className="text-[10px] font-bold bg-emerald-50 dark:bg-emerald-950/40 text-emerald-600 dark:text-emerald-400 px-2 py-0.5 rounded-md">
                            ✅ Compatible
                          </span>
                        )}
                      </div>
                      <h3 className="text-[15px] sm:text-base font-semibold text-gray-900 dark:text-white m-0 leading-snug group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                        {t.title}
                      </h3>
                    </div>
                  </div>

                  {/* Details Grid */}
                  <div
                    className={`grid gap-4 pt-3.5 border-t border-gray-50 dark:border-gray-800 ${isDGMP ? 'grid-cols-2 sm:grid-cols-5' : 'grid-cols-2 sm:grid-cols-4'}`}
                  >
                    <div>
                      <div className="text-[11px] text-gray-400 dark:text-gray-500 font-medium uppercase tracking-wide mb-0.5">
                        Autorité
                      </div>
                      <div className="text-[13px] text-gray-700 dark:text-gray-300 font-medium">
                        {t.issuingAuthority}
                      </div>
                    </div>
                    <div>
                      <div className="text-[11px] text-gray-400 dark:text-gray-500 font-medium uppercase tracking-wide mb-0.5">
                        Budget
                      </div>
                      <div className="text-[13px] text-gray-700 dark:text-gray-300 font-medium">
                        {formatCFA(t.budgetMin)} — {formatCFA(t.budgetMax)}
                      </div>
                    </div>
                    <div>
                      <div className="text-[11px] text-gray-400 dark:text-gray-500 font-medium uppercase tracking-wide mb-0.5">
                        Date limite
                      </div>
                      <div className="text-[13px] text-gray-700 dark:text-gray-300 font-medium">
                        {formatDate(t.submissionDeadline)}
                      </div>
                    </div>
                    <div>
                      <div className="text-[11px] text-gray-400 dark:text-gray-500 font-medium uppercase tracking-wide mb-0.5">
                        Soumissions
                      </div>
                      <div className="text-[13px] text-gray-700 dark:text-gray-300 font-medium">
                        {t._count.submissions} candidature(s)
                      </div>
                    </div>
                    {isDGMP && (
                      <div>
                        <div className="text-[11px] text-gray-400 dark:text-gray-500 font-medium uppercase tracking-wide mb-0.5">
                          Évaluation
                        </div>
                        <div
                          className={`text-[13px] font-semibold ${t.evaluationStatus.includes('Brouillon') ? 'text-gray-400' : t.evaluationStatus.startsWith('0') ? 'text-red-500' : 'text-emerald-600 dark:text-emerald-400'}`}
                        >
                          {t.evaluationStatus}
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      )}
    </div>
  );
}
