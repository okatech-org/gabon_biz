'use client';

// GABON BIZ — Mes Entreprises (M1)

import React, { useState } from 'react';
import Link from 'next/link';
import { PageHeader, StatusBadge, PrimaryButton, EmptyState, formatDate } from '@/components/ui';

// Mock data for demo
const MOCK_ENTERPRISES = [
  { id: '1', name: 'Mbadinga Technologies SARL', rccm: 'GA-LIB-2026-B-00001', nif: 'NIF-GA-000001', legalForm: 'SARL', status: 'ACTIVE', sector: { name: 'Technologies de l\'Information' }, employeeCount: 15, createdAt: '2026-01-15' },
  { id: '2', name: 'Ogooué Logistics SA', rccm: 'GA-LIB-2026-B-00002', nif: 'NIF-GA-000002', legalForm: 'SA', status: 'PENDING', sector: { name: 'Transport et Logistique' }, employeeCount: 45, createdAt: '2026-02-01' },
  { id: '3', name: 'EcoGabon EI', rccm: 'GA-PGE-2026-B-00001', nif: 'NIF-GA-000003', legalForm: 'EI', status: 'DRAFT', sector: { name: 'Environnement' }, employeeCount: 3, createdAt: '2026-03-01' },
];

export default function EntreprisesPage() {
  const [filter, setFilter] = useState('ALL');

  const filtered = filter === 'ALL'
    ? MOCK_ENTERPRISES
    : MOCK_ENTERPRISES.filter((e) => e.status === filter);

  return (
    <div>
      <PageHeader
        title="Mes Entreprises"
        subtitle={`${MOCK_ENTERPRISES.length} entreprise(s) enregistrée(s)`}
        action={<PrimaryButton href="/dashboard/entreprises/creer">➕ Nouvelle Entreprise</PrimaryButton>}
      />

      {/* Filters */}
      <div style={{ display: 'flex', gap: 8, marginBottom: 24 }}>
        {['ALL', 'ACTIVE', 'PENDING', 'DRAFT'].map((s) => (
          <button
            key={s}
            onClick={() => setFilter(s)}
            style={{
              padding: '8px 16px', borderRadius: 8, fontSize: 13, fontWeight: 500,
              border: '1px solid', cursor: 'pointer', transition: 'all 0.15s',
              background: filter === s ? '#009e49' : 'white',
              color: filter === s ? 'white' : '#374151',
              borderColor: filter === s ? '#009e49' : '#e5e7eb',
            }}
          >
            {s === 'ALL' ? 'Toutes' : s === 'ACTIVE' ? 'Actives' : s === 'PENDING' ? 'En attente' : 'Brouillons'}
          </button>
        ))}
      </div>

      {/* Table */}
      {filtered.length === 0 ? (
        <EmptyState
          icon="🏢"
          title="Aucune entreprise"
          description="Créez votre première entreprise pour commencer."
          action={<PrimaryButton href="/dashboard/entreprises/creer">Créer une entreprise</PrimaryButton>}
        />
      ) : (
        <div style={{
          background: 'white', borderRadius: 16, overflow: 'hidden',
          border: '1px solid #f0f0f0', boxShadow: '0 1px 3px rgba(0,0,0,0.04)',
        }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 14 }}>
            <thead>
              <tr style={{ borderBottom: '1px solid #f0f0f0', background: '#fafafa' }}>
                <th style={{ textAlign: 'left', padding: '14px 20px', fontWeight: 600, color: '#6b7280', fontSize: 12, textTransform: 'uppercase' }}>Entreprise</th>
                <th style={{ textAlign: 'left', padding: '14px 20px', fontWeight: 600, color: '#6b7280', fontSize: 12, textTransform: 'uppercase' }}>RCCM</th>
                <th style={{ textAlign: 'left', padding: '14px 20px', fontWeight: 600, color: '#6b7280', fontSize: 12, textTransform: 'uppercase' }}>Secteur</th>
                <th style={{ textAlign: 'left', padding: '14px 20px', fontWeight: 600, color: '#6b7280', fontSize: 12, textTransform: 'uppercase' }}>Statut</th>
                <th style={{ textAlign: 'right', padding: '14px 20px', fontWeight: 600, color: '#6b7280', fontSize: 12, textTransform: 'uppercase' }}>Créé le</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((e) => (
                <tr key={e.id} style={{ borderBottom: '1px solid #f8f8f8', cursor: 'pointer' }}>
                  <td style={{ padding: '16px 20px' }}>
                    <Link href={`/dashboard/entreprises/${e.id}`} style={{ textDecoration: 'none' }}>
                      <div style={{ fontWeight: 600, color: '#111827' }}>{e.name}</div>
                      <div style={{ fontSize: 12, color: '#9ca3af' }}>{e.legalForm} • {e.employeeCount} employés</div>
                    </Link>
                  </td>
                  <td style={{ padding: '16px 20px', color: '#6b7280', fontFamily: 'monospace', fontSize: 12 }}>{e.rccm}</td>
                  <td style={{ padding: '16px 20px', color: '#6b7280' }}>{e.sector.name}</td>
                  <td style={{ padding: '16px 20px' }}><StatusBadge status={e.status} /></td>
                  <td style={{ padding: '16px 20px', textAlign: 'right', color: '#9ca3af', fontSize: 13 }}>{formatDate(e.createdAt)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
