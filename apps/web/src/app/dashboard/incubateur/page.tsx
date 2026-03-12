'use client';

// GABON BIZ — Incubateur (M4)

import React from 'react';
import { PageHeader, StatusBadge, PrimaryButton, formatDate } from '@/components/ui';

const MOCK_COHORTS = [
  { id: '1', name: 'Cohorte Accélération 2026', description: 'Programme de 6 mois pour startups tech early-stage', startDate: '2026-04-01', endDate: '2026-10-01', maxStartups: 15, status: 'OPEN', _count: { applications: 8 } },
  { id: '2', name: 'GabonTech Bootcamp', description: 'Formation intensive de 3 mois en IA et Data Science', startDate: '2026-01-15', endDate: '2026-04-15', maxStartups: 20, status: 'IN_PROGRESS', _count: { applications: 20 } },
  { id: '3', name: 'Green Innovation Lab', description: 'Incubation dédiée aux solutions environnementales', startDate: '2025-06-01', endDate: '2025-12-01', maxStartups: 10, status: 'COMPLETED', _count: { applications: 10 } },
];

const COHORT_STATUS_COLORS: Record<string, { bg: string; text: string }> = {
  OPEN: { bg: '#d1fae5', text: '#065f46' },
  IN_PROGRESS: { bg: '#dbeafe', text: '#1e40af' },
  COMPLETED: { bg: '#f3f4f6', text: '#6b7280' },
};

export default function IncubateurPage() {
  return (
    <div>
      <PageHeader title="Incubateur" subtitle="Programmes d'accélération et d'incubation" />

      <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
        {MOCK_COHORTS.map((c) => (
          <div key={c.id} style={{
            background: 'white', borderRadius: 16, padding: '24px 28px',
            border: '1px solid #f0f0f0', boxShadow: '0 1px 3px rgba(0,0,0,0.04)',
          }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
              <div style={{ flex: 1 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 6 }}>
                  <h3 style={{ fontSize: 16, fontWeight: 600, color: '#111827', margin: 0 }}>{c.name}</h3>
                  <span style={{
                    padding: '3px 10px', borderRadius: 6, fontSize: 11, fontWeight: 600,
                    background: COHORT_STATUS_COLORS[c.status]?.bg,
                    color: COHORT_STATUS_COLORS[c.status]?.text,
                  }}>
                    {c.status === 'OPEN' ? 'Ouvert' : c.status === 'IN_PROGRESS' ? 'En cours' : 'Terminé'}
                  </span>
                </div>
                <p style={{ fontSize: 13, color: '#6b7280', margin: '0 0 12px' }}>{c.description}</p>
                <div style={{ display: 'flex', gap: 24, fontSize: 13, color: '#6b7280' }}>
                  <span>📅 {formatDate(c.startDate)} → {formatDate(c.endDate)}</span>
                  <span>👥 {c._count.applications}/{c.maxStartups} candidatures</span>
                </div>
              </div>
              {c.status === 'OPEN' && (
                <PrimaryButton style={{ background: 'linear-gradient(135deg, #8b5cf6, #a78bfa)' }}>
                  Postuler
                </PrimaryButton>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
