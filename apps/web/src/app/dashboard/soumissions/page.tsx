'use client';

// GABON BIZ — Mes Soumissions

import React from 'react';
import { PageHeader, StatusBadge, EmptyState, formatCFA, formatDate } from '@/components/ui';

const MOCK_SUBMISSIONS = [
  { id: '1', tender: { reference: 'DGMP-2026-AO-001', title: 'Développement du SI des marchés publics', status: 'PUBLISHED' }, enterprise: { name: 'Mbadinga Technologies SARL' }, proposedAmount: 750000000, status: 'SUBMITTED', submittedAt: '2026-03-10' },
  { id: '2', tender: { reference: 'DGMP-2026-AO-002', title: 'Réseau fibre optique de Libreville', status: 'PUBLISHED' }, enterprise: { name: 'Ogooué Logistics SA' }, proposedAmount: 2800000000, status: 'UNDER_REVIEW', submittedAt: '2026-03-05' },
  { id: '3', tender: { reference: 'DGMP-2026-AO-003', title: 'Équipements informatiques pour écoles', status: 'CLOSED' }, enterprise: { name: 'Mbadinga Technologies SARL' }, proposedAmount: 200000000, status: 'REJECTED', submittedAt: '2026-02-20' },
];

export default function SoumissionsPage() {
  return (
    <div>
      <PageHeader
        title="Mes Soumissions"
        subtitle={`${MOCK_SUBMISSIONS.length} soumission(s)`}
      />

      {MOCK_SUBMISSIONS.length === 0 ? (
        <EmptyState icon="📨" title="Aucune soumission" description="Soumissionnez à un marché public pour commencer." />
      ) : (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
          {MOCK_SUBMISSIONS.map((s) => (
            <div key={s.id} style={{
              background: 'white', borderRadius: 14, padding: '20px 24px',
              border: '1px solid #f0f0f0', boxShadow: '0 1px 3px rgba(0,0,0,0.04)',
            }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                <div style={{ flex: 1 }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 6 }}>
                    <span style={{ fontSize: 12, fontFamily: 'monospace', color: '#9ca3af' }}>{s.tender.reference}</span>
                    <StatusBadge status={s.status} />
                  </div>
                  <h3 style={{ fontSize: 15, fontWeight: 600, color: '#111827', margin: '0 0 4px' }}>{s.tender.title}</h3>
                  <p style={{ fontSize: 13, color: '#6b7280', margin: 0 }}>via {s.enterprise.name}</p>
                </div>
                <div style={{ textAlign: 'right' }}>
                  <div style={{ fontSize: 15, fontWeight: 600, color: '#111827' }}>{formatCFA(s.proposedAmount)}</div>
                  <div style={{ fontSize: 12, color: '#9ca3af' }}>{formatDate(s.submittedAt)}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
