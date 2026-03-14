'use client';

// GABON BIZ — Soumissions — Dual view: Soumissionnaire & Évaluateur DGMP

import React, { useState } from 'react';
import { useAuth } from '@/lib/auth-context';
import { getDemoAccountByNip } from '@/lib/demo-accounts';
import {
  PageHeader,
  StatusBadge,
  EmptyState,
  FilterBar,
  DataTableWrapper,
  TableHead,
  Th,
  Td,
  Tr,
  formatCFA,
  formatDate,
} from '@/components/ui';

// ——— Entrepreneur view ———
const MOCK_SUBMISSIONS = [
  {
    id: '1',
    tender: {
      reference: 'DGMP-2026-AO-001',
      title: 'Développement du SI des marchés publics',
      status: 'PUBLISHED',
    },
    enterprise: { name: 'Mbadinga Technologies SARL' },
    proposedAmount: 750000000,
    status: 'SUBMITTED',
    submittedAt: '2026-03-10',
  },
  {
    id: '2',
    tender: {
      reference: 'DGMP-2026-AO-002',
      title: 'Réseau fibre optique de Libreville',
      status: 'PUBLISHED',
    },
    enterprise: { name: 'Ogooué Logistics SA' },
    proposedAmount: 2800000000,
    status: 'UNDER_REVIEW',
    submittedAt: '2026-03-05',
  },
  {
    id: '3',
    tender: {
      reference: 'DGMP-2026-AO-003',
      title: 'Équipements informatiques pour écoles',
      status: 'CLOSED',
    },
    enterprise: { name: 'Mbadinga Technologies SARL' },
    proposedAmount: 200000000,
    status: 'REJECTED',
    submittedAt: '2026-02-20',
  },
];

// ——— DGMP Evaluator view ———
const DGMP_SUBMISSIONS = [
  {
    id: '1',
    tender: 'DGMP-2026-AO-001',
    title: 'Développement du SI des marchés publics',
    enterprise: 'Mbadinga Technologies SARL',
    amount: 750000000,
    submittedAt: '2026-03-10',
    score: null,
    status: 'À évaluer',
    sector: 'Technologies',
  },
  {
    id: '2',
    tender: 'DGMP-2026-AO-001',
    title: 'Développement du SI des marchés publics',
    enterprise: 'Gabon Digital Solutions',
    amount: 680000000,
    submittedAt: '2026-03-08',
    score: 82,
    status: 'Évalué',
    sector: 'Technologies',
  },
  {
    id: '3',
    tender: 'DGMP-2026-AO-001',
    title: 'Développement du SI des marchés publics',
    enterprise: 'AfricaTech Consulting',
    amount: 920000000,
    submittedAt: '2026-03-09',
    score: 75,
    status: 'Évalué',
    sector: 'Technologies',
  },
  {
    id: '4',
    tender: 'DGMP-2026-AO-001',
    title: 'Développement du SI des marchés publics',
    enterprise: 'Ogooué IT Services',
    amount: 810000000,
    submittedAt: '2026-03-11',
    score: null,
    status: 'À évaluer',
    sector: 'Technologies',
  },
  {
    id: '5',
    tender: 'DGMP-2026-AO-001',
    title: 'Développement du SI des marchés publics',
    enterprise: 'Libreville Tech Hub',
    amount: 650000000,
    submittedAt: '2026-03-07',
    score: 88,
    status: 'Évalué',
    sector: 'Technologies',
  },
  {
    id: '6',
    tender: 'DGMP-2026-AO-002',
    title: 'Réseau fibre optique Libreville',
    enterprise: 'FibreGabon SA',
    amount: 2900000000,
    submittedAt: '2026-03-01',
    score: null,
    status: 'À évaluer',
    sector: 'Télécommunications',
  },
  {
    id: '7',
    tender: 'DGMP-2026-AO-002',
    title: 'Réseau fibre optique Libreville',
    enterprise: 'Ogooué Logistics SA',
    amount: 2800000000,
    submittedAt: '2026-03-02',
    score: null,
    status: 'À évaluer',
    sector: 'Télécommunications',
  },
  {
    id: '8',
    tender: 'DGMP-2026-AO-003',
    title: 'Équipements informatiques écoles',
    enterprise: 'EduTech Gabon',
    amount: 180000000,
    submittedAt: '2026-02-15',
    score: 91,
    status: 'Attribué',
    sector: 'Éducation',
  },
  {
    id: '9',
    tender: 'DGMP-2026-AO-003',
    title: 'Équipements informatiques écoles',
    enterprise: 'Mbadinga Technologies SARL',
    amount: 200000000,
    submittedAt: '2026-02-20',
    score: 68,
    status: 'Rejeté',
    sector: 'Éducation',
  },
];

const DGMP_EVAL_STATS = [
  { label: 'Total soumissions', value: 25, color: '#3b82f6' },
  { label: 'À évaluer', value: 5, color: '#f59e0b' },
  { label: 'Évalués', value: 17, color: '#009e49' },
  { label: 'Attribués', value: 3, color: '#8b5cf6' },
];

const DGMP_FILTER_OPTIONS = [
  { value: 'all', label: 'Toutes' },
  { value: 'À évaluer', label: 'À évaluer' },
  { value: 'Évalué', label: 'Évalué' },
  { value: 'Attribué', label: 'Attribué' },
  { value: 'Rejeté', label: 'Rejeté' },
];

function getStatusColor(status: string) {
  switch (status) {
    case 'À évaluer':
      return { bg: 'bg-amber-50 dark:bg-amber-950/30', text: 'text-amber-600 dark:text-amber-400' };
    case 'Évalué':
      return { bg: 'bg-blue-50 dark:bg-blue-950/30', text: 'text-blue-600 dark:text-blue-400' };
    case 'Attribué':
      return {
        bg: 'bg-emerald-50 dark:bg-emerald-950/30',
        text: 'text-emerald-600 dark:text-emerald-400',
      };
    case 'Rejeté':
      return { bg: 'bg-red-50 dark:bg-red-950/30', text: 'text-red-600 dark:text-red-400' };
    default:
      return { bg: 'bg-gray-100 dark:bg-gray-800', text: 'text-gray-500 dark:text-gray-400' };
  }
}

export default function SoumissionsPage() {
  const { user } = useAuth();
  const [dgmpFilter, setDgmpFilter] = useState('all');

  const account = user?.isDemo ? getDemoAccountByNip(user.nip) : null;
  const isDGMP =
    account?.user.roles.includes('DGMP') || account?.user.roles.includes('AUTORITE_CONTRACTANTE');

  if (isDGMP) {
    const filteredDgmp =
      dgmpFilter === 'all'
        ? DGMP_SUBMISSIONS
        : DGMP_SUBMISSIONS.filter((s) => s.status === dgmpFilter);

    return (
      <div>
        <PageHeader
          title="Évaluation des Soumissions"
          subtitle={`${DGMP_SUBMISSIONS.filter((s) => s.status === 'À évaluer').length} soumissions en attente d'évaluation`}
        />

        {/* Stats */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 mb-6">
          {DGMP_EVAL_STATS.map((s) => (
            <div
              key={s.label}
              className="bg-white dark:bg-gray-900 rounded-xl p-4 sm:p-5 border border-gray-200 dark:border-gray-800"
            >
              <div className="text-2xl font-bold" style={{ color: s.color }}>
                {s.value}
              </div>
              <div className="text-xs text-gray-400 dark:text-gray-500 mt-1">{s.label}</div>
            </div>
          ))}
        </div>

        {/* Filters */}
        <FilterBar
          options={DGMP_FILTER_OPTIONS}
          active={dgmpFilter}
          onChange={setDgmpFilter}
          accentColor="#3b82f6"
        />

        {/* Table */}
        <DataTableWrapper>
          <TableHead>
            <Th>Marché</Th>
            <Th>Entreprise</Th>
            <Th align="right">Montant</Th>
            <Th align="center">Score</Th>
            <Th align="center">Statut</Th>
            <Th align="center">Action</Th>
          </TableHead>
          <tbody>
            {filteredDgmp.map((s) => {
              const statusCls = getStatusColor(s.status);
              return (
                <Tr key={s.id}>
                  <Td>
                    <div className="text-[11px] font-mono text-gray-400 dark:text-gray-500">
                      {s.tender}
                    </div>
                    <div className="text-[13px] font-medium text-gray-900 dark:text-white">
                      {s.title}
                    </div>
                  </Td>
                  <Td>
                    <span className="text-[13px] font-medium text-gray-700 dark:text-gray-300">
                      {s.enterprise}
                    </span>
                  </Td>
                  <Td align="right">
                    <span className="text-[13px] font-semibold text-gray-900 dark:text-white">
                      {formatCFA(s.amount)}
                    </span>
                  </Td>
                  <Td align="center">
                    {s.score !== null ? (
                      <span
                        className={`text-sm font-bold ${s.score >= 80 ? 'text-emerald-600 dark:text-emerald-400' : s.score >= 60 ? 'text-amber-600 dark:text-amber-400' : 'text-red-500'}`}
                      >
                        {s.score}/100
                      </span>
                    ) : (
                      <span className="text-xs text-gray-300 dark:text-gray-600">—</span>
                    )}
                  </Td>
                  <Td align="center">
                    <span
                      className={`inline-block text-[11px] font-semibold px-2.5 py-1 rounded-md ${statusCls.bg} ${statusCls.text}`}
                    >
                      {s.status}
                    </span>
                  </Td>
                  <Td align="center">
                    {s.status === 'À évaluer' ? (
                      <button
                        className="px-3.5 py-1.5 rounded-lg text-xs font-semibold bg-blue-600 hover:bg-blue-700 text-white border-0 cursor-pointer transition-colors"
                        aria-label={`Évaluer ${s.enterprise}`}
                      >
                        Évaluer
                      </button>
                    ) : s.status === 'Évalué' ? (
                      <button
                        className="px-3.5 py-1.5 rounded-lg text-xs font-semibold bg-emerald-50 dark:bg-emerald-950/30 text-emerald-600 dark:text-emerald-400 border border-emerald-200 dark:border-emerald-800/40 cursor-pointer hover:bg-emerald-100 dark:hover:bg-emerald-950/50 transition-colors"
                        aria-label={`Attribuer à ${s.enterprise}`}
                      >
                        Attribuer
                      </button>
                    ) : (
                      <span className="text-xs text-gray-300 dark:text-gray-600">—</span>
                    )}
                  </Td>
                </Tr>
              );
            })}
          </tbody>
        </DataTableWrapper>
      </div>
    );
  }

  // ——— Standard soumissionnaire view ———
  return (
    <div>
      <PageHeader title="Mes Soumissions" subtitle={`${MOCK_SUBMISSIONS.length} soumission(s)`} />

      {MOCK_SUBMISSIONS.length === 0 ? (
        <EmptyState
          icon="📨"
          title="Aucune soumission"
          description="Soumissionnez à un marché public pour commencer."
        />
      ) : (
        <div className="flex flex-col gap-3">
          {MOCK_SUBMISSIONS.map((s) => (
            <div
              key={s.id}
              className="bg-white dark:bg-gray-900 rounded-xl p-5 border border-gray-200 dark:border-gray-800 transition-shadow"
            >
              <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-3">
                <div className="flex-1 min-w-0">
                  <div className="flex flex-wrap items-center gap-2 mb-1.5">
                    <span className="text-xs font-mono text-gray-400 dark:text-gray-500">
                      {s.tender.reference}
                    </span>
                    <StatusBadge status={s.status} />
                  </div>
                  <h3 className="text-[15px] font-semibold text-gray-900 dark:text-white m-0 mb-1">
                    {s.tender.title}
                  </h3>
                  <p className="text-[13px] text-gray-500 dark:text-gray-400 m-0">
                    via {s.enterprise.name}
                  </p>
                </div>
                <div className="text-right shrink-0">
                  <div className="text-[15px] font-semibold text-gray-900 dark:text-white">
                    {formatCFA(s.proposedAmount)}
                  </div>
                  <div className="text-xs text-gray-400 dark:text-gray-500">
                    {formatDate(s.submittedAt)}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
