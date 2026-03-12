'use client';

// GABON BIZ — Mes Entreprises (M1) — Contextual by profile

import React, { useState } from 'react';
import Link from 'next/link';
import { useAuth } from '@/lib/auth-context';
import { getDemoAccountByNip } from '@/lib/demo-accounts';
import {
  PageHeader,
  StatusBadge,
  PrimaryButton,
  EmptyState,
  FilterBar,
  DataTableWrapper,
  TableHead,
  Th,
  Td,
  Tr,
  formatDate,
} from '@/components/ui';

// Data per profile
const PROFILE_DATA: Record<string, typeof MOCK_ENTERPRISES_DEFAULT> = {
  'demo-entrepreneur': [
    {
      id: '1',
      name: 'Mbadinga Technologies SARL',
      rccm: 'GA-LIB-2026-B-00001',
      nif: 'NIF-GA-000001',
      legalForm: 'SARL',
      status: 'ACTIVE',
      sector: { name: "Technologies de l'Information" },
      employeeCount: 15,
      createdAt: '2026-01-15',
      revenue: '45,2 M FCFA',
    },
    {
      id: '2',
      name: 'Ogooué Logistics SA',
      rccm: 'GA-LIB-2026-B-00002',
      nif: 'NIF-GA-000002',
      legalForm: 'SA',
      status: 'PENDING',
      sector: { name: 'Transport et Logistique' },
      employeeCount: 45,
      createdAt: '2026-02-01',
      revenue: '— ',
    },
    {
      id: '3',
      name: 'EcoGabon EI',
      rccm: 'GA-PGE-2026-B-00001',
      nif: 'NIF-GA-000003',
      legalForm: 'EI',
      status: 'DRAFT',
      sector: { name: 'Environnement' },
      employeeCount: 3,
      createdAt: '2026-03-01',
      revenue: '— ',
    },
  ],
  'demo-startup': [
    {
      id: '1',
      name: 'TechPay Solutions',
      rccm: 'GA-LIB-2026-B-00042',
      nif: 'NIF-GA-000042',
      legalForm: 'SAS',
      status: 'ACTIVE',
      sector: { name: 'FinTech / Paiement Mobile' },
      employeeCount: 8,
      createdAt: '2025-06-15',
      revenue: '12,5 M FCFA',
    },
  ],
};

const MOCK_ENTERPRISES_DEFAULT = [
  {
    id: '1',
    name: 'Mbadinga Technologies SARL',
    rccm: 'GA-LIB-2026-B-00001',
    nif: 'NIF-GA-000001',
    legalForm: 'SARL',
    status: 'ACTIVE',
    sector: { name: "Technologies de l'Information" },
    employeeCount: 15,
    createdAt: '2026-01-15',
    revenue: '45,2 M FCFA',
  },
  {
    id: '2',
    name: 'Ogooué Logistics SA',
    rccm: 'GA-LIB-2026-B-00002',
    nif: 'NIF-GA-000002',
    legalForm: 'SA',
    status: 'PENDING',
    sector: { name: 'Transport et Logistique' },
    employeeCount: 45,
    createdAt: '2026-02-01',
    revenue: '— ',
  },
  {
    id: '3',
    name: 'EcoGabon EI',
    rccm: 'GA-PGE-2026-B-00001',
    nif: 'NIF-GA-000003',
    legalForm: 'EI',
    status: 'DRAFT',
    sector: { name: 'Environnement' },
    employeeCount: 3,
    createdAt: '2026-03-01',
    revenue: '— ',
  },
];

// Startup-specific quick actions
const STARTUP_ACTIONS = [
  { label: 'Publier une solution', icon: '💡', href: '/dashboard/innovation', color: '#8b5cf6' },
  { label: 'Ma cohorte SING 2.0', icon: '🎓', href: '/dashboard/incubateur', color: '#ec4899' },
  { label: 'Rechercher un financement', icon: '💰', href: '/dashboard/investir', color: '#14b8a6' },
];

const FILTER_OPTIONS = [
  { value: 'ALL', label: 'Toutes' },
  { value: 'ACTIVE', label: 'Actives' },
  { value: 'PENDING', label: 'En attente' },
  { value: 'DRAFT', label: 'Brouillons' },
];

export default function EntreprisesPage() {
  const { user } = useAuth();
  const [filter, setFilter] = useState('ALL');

  const account = user?.isDemo ? getDemoAccountByNip(user.nip) : null;
  const isStartup = account?.user.profileType === 'STARTUP';
  const enterprises = account
    ? PROFILE_DATA[account.id] || MOCK_ENTERPRISES_DEFAULT
    : MOCK_ENTERPRISES_DEFAULT;

  const filtered = filter === 'ALL' ? enterprises : enterprises.filter((e) => e.status === filter);

  return (
    <div>
      <PageHeader
        title={isStartup ? 'Ma Startup' : 'Mes Entreprises'}
        subtitle={
          isStartup
            ? `${account?.user.organization} — ${account?.user.title}`
            : `${enterprises.length} entreprise(s) enregistrée(s)`
        }
        action={
          isStartup ? undefined : (
            <PrimaryButton href="/dashboard/entreprises/creer">
              ➕ Nouvelle Entreprise
            </PrimaryButton>
          )
        }
      />

      {/* Startup quick actions */}
      {isStartup && (
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-6">
          {STARTUP_ACTIONS.map((a) => (
            <Link
              key={a.label}
              href={a.href}
              className="no-underline group flex items-center gap-3 p-3.5 rounded-xl border border-gray-100 dark:border-gray-800 bg-white dark:bg-gray-900 hover:shadow-md hover:-translate-y-0.5 transition-all duration-200"
            >
              <span className="text-xl group-hover:scale-110 transition-transform">{a.icon}</span>
              <span className="text-[13px] font-semibold" style={{ color: a.color }}>
                {a.label}
              </span>
            </Link>
          ))}
        </div>
      )}

      {/* Filters (only for multi-enterprise profiles) */}
      {!isStartup && <FilterBar options={FILTER_OPTIONS} active={filter} onChange={setFilter} />}

      {/* Table */}
      {filtered.length === 0 ? (
        <EmptyState
          icon="🏢"
          title="Aucune entreprise"
          description="Créez votre première entreprise pour commencer."
          action={
            <PrimaryButton href="/dashboard/entreprises/creer">Créer une entreprise</PrimaryButton>
          }
        />
      ) : (
        <DataTableWrapper>
          <TableHead>
            <Th>Entreprise</Th>
            <Th>RCCM</Th>
            <Th>Secteur</Th>
            <Th>Statut</Th>
            <Th align="right">Créé le</Th>
          </TableHead>
          <tbody>
            {filtered.map((e) => (
              <Tr key={e.id}>
                <Td>
                  <Link href={`/dashboard/entreprises/${e.id}`} className="no-underline">
                    <div className="font-semibold text-gray-900 dark:text-white">{e.name}</div>
                    <div className="text-xs text-gray-400 dark:text-gray-500">
                      {e.legalForm} • {e.employeeCount} employés
                    </div>
                  </Link>
                </Td>
                <Td>
                  <span className="text-gray-500 dark:text-gray-400 font-mono text-xs">
                    {e.rccm}
                  </span>
                </Td>
                <Td>
                  <span className="text-gray-500 dark:text-gray-400">{e.sector.name}</span>
                </Td>
                <Td>
                  <StatusBadge status={e.status} />
                </Td>
                <Td align="right">
                  <span className="text-gray-400 dark:text-gray-500 text-[13px]">
                    {formatDate(e.createdAt)}
                  </span>
                </Td>
              </Tr>
            ))}
          </tbody>
        </DataTableWrapper>
      )}
    </div>
  );
}
