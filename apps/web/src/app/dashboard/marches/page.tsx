'use client';

// GABON BIZ — Marchés Publics (M2)

import React, { useState } from 'react';
import Link from 'next/link';
import { PageHeader, StatusBadge, EmptyState, formatCFA, formatDate } from '@/components/ui';

const MOCK_TENDERS = [
  { id: '1', reference: 'DGMP-2026-AO-001', title: 'Développement du SI de gestion des marchés publics', issuingAuthority: 'MENUDI', sector: { name: 'Technologies' }, budgetMin: 500000000, budgetMax: 1200000000, submissionDeadline: '2026-06-30', status: 'PUBLISHED', _count: { submissions: 5 } },
  { id: '2', reference: 'DGMP-2026-AO-002', title: 'Réhabilitation du réseau fibre optique de Libreville', issuingAuthority: 'ANINF', sector: { name: 'Télécommunications' }, budgetMin: 2000000000, budgetMax: 3500000000, submissionDeadline: '2026-07-15', status: 'PUBLISHED', _count: { submissions: 12 } },
  { id: '3', reference: 'DGMP-2026-AO-003', title: 'Fourniture d\'équipements informatiques pour les écoles', issuingAuthority: 'MEN', sector: { name: 'Éducation' }, budgetMin: 150000000, budgetMax: 300000000, submissionDeadline: '2026-05-20', status: 'CLOSED', _count: { submissions: 8 } },
  { id: '4', reference: 'DGMP-2026-AO-004', title: 'Plateforme e-santé nationale', issuingAuthority: 'Min. Santé', sector: { name: 'Santé' }, budgetMin: 800000000, budgetMax: 1500000000, submissionDeadline: '2026-08-01', status: 'DRAFT', _count: { submissions: 0 } },
];

export default function MarchesPage() {
  const [filter, setFilter] = useState('ALL');

  const filtered = filter === 'ALL'
    ? MOCK_TENDERS
    : MOCK_TENDERS.filter((t) => t.status === filter);

  return (
    <div>
      <PageHeader
        title="Marchés Publics"
        subtitle={`${MOCK_TENDERS.length} appel(s) d'offres`}
      />

      {/* Filters */}
      <div style={{ display: 'flex', gap: 8, marginBottom: 24 }}>
        {['ALL', 'PUBLISHED', 'CLOSED', 'DRAFT'].map((s) => (
          <button
            key={s}
            onClick={() => setFilter(s)}
            style={{
              padding: '8px 16px', borderRadius: 8, fontSize: 13, fontWeight: 500,
              border: '1px solid', cursor: 'pointer',
              background: filter === s ? '#3b82f6' : 'white',
              color: filter === s ? 'white' : '#374151',
              borderColor: filter === s ? '#3b82f6' : '#e5e7eb',
            }}
          >
            {s === 'ALL' ? 'Tous' : s === 'PUBLISHED' ? 'Ouverts' : s === 'CLOSED' ? 'Clôturés' : 'Brouillons'}
          </button>
        ))}
      </div>

      {/* Cards */}
      {filtered.length === 0 ? (
        <EmptyState icon="📋" title="Aucun marché" description="Aucun marché public ne correspond à vos filtres." />
      ) : (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
          {filtered.map((t) => (
            <Link key={t.id} href={`/dashboard/marches/${t.id}`} style={{ textDecoration: 'none' }}>
              <div style={{
                background: 'white', borderRadius: 16, padding: '24px 28px',
                border: '1px solid #f0f0f0', boxShadow: '0 1px 3px rgba(0,0,0,0.04)',
                transition: 'all 0.2s ease', cursor: 'pointer',
              }}>
                {/* Header */}
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 12 }}>
                  <div style={{ flex: 1 }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 6 }}>
                      <span style={{ fontSize: 12, fontFamily: 'monospace', color: '#9ca3af', fontWeight: 500 }}>{t.reference}</span>
                      <StatusBadge status={t.status} />
                    </div>
                    <h3 style={{ fontSize: 16, fontWeight: 600, color: '#111827', margin: 0, lineHeight: 1.4 }}>
                      {t.title}
                    </h3>
                  </div>
                </div>

                {/* Details */}
                <div style={{
                  display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 16,
                  padding: '14px 0 0', borderTop: '1px solid #f5f5f5',
                }}>
                  <div>
                    <div style={{ fontSize: 11, color: '#9ca3af', fontWeight: 500, marginBottom: 2 }}>AUTORITÉ</div>
                    <div style={{ fontSize: 13, color: '#374151', fontWeight: 500 }}>{t.issuingAuthority}</div>
                  </div>
                  <div>
                    <div style={{ fontSize: 11, color: '#9ca3af', fontWeight: 500, marginBottom: 2 }}>BUDGET</div>
                    <div style={{ fontSize: 13, color: '#374151', fontWeight: 500 }}>
                      {formatCFA(t.budgetMin)} — {formatCFA(t.budgetMax)}
                    </div>
                  </div>
                  <div>
                    <div style={{ fontSize: 11, color: '#9ca3af', fontWeight: 500, marginBottom: 2 }}>DATE LIMITE</div>
                    <div style={{ fontSize: 13, color: '#374151', fontWeight: 500 }}>{formatDate(t.submissionDeadline)}</div>
                  </div>
                  <div>
                    <div style={{ fontSize: 11, color: '#9ca3af', fontWeight: 500, marginBottom: 2 }}>SOUMISSIONS</div>
                    <div style={{ fontSize: 13, color: '#374151', fontWeight: 500 }}>{t._count.submissions} candidature(s)</div>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
