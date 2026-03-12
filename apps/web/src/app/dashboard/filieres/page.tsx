'use client';

// GABON BIZ — Filières (M7)

import React from 'react';
import { PageHeader, StatsCard } from '@/components/ui';

const MOCK_FILIERES = [
  { id: '1', name: 'Technologies de l\'Information', enterprises: 85, tenders: 12, revenue: '45.2 Mds FCFA', icon: '💻' },
  { id: '2', name: 'Agriculture & Agroalimentaire', enterprises: 120, tenders: 8, revenue: '78.5 Mds FCFA', icon: '🌾' },
  { id: '3', name: 'Mines & Hydrocarbures', enterprises: 45, tenders: 15, revenue: '230 Mds FCFA', icon: '⛏️' },
  { id: '4', name: 'Transport & Logistique', enterprises: 65, tenders: 10, revenue: '52 Mds FCFA', icon: '🚛' },
  { id: '5', name: 'Bois & Forêt', enterprises: 95, tenders: 6, revenue: '95 Mds FCFA', icon: '🌲' },
  { id: '6', name: 'Santé & Pharmacie', enterprises: 38, tenders: 9, revenue: '22 Mds FCFA', icon: '🏥' },
  { id: '7', name: 'Éducation & Formation', enterprises: 52, tenders: 7, revenue: '18 Mds FCFA', icon: '🎓' },
  { id: '8', name: 'Énergie & Environnement', enterprises: 28, tenders: 11, revenue: '35 Mds FCFA', icon: '⚡' },
];

export default function FilieresPage() {
  const totalEnterprises = MOCK_FILIERES.reduce((s, f) => s + f.enterprises, 0);
  const totalTenders = MOCK_FILIERES.reduce((s, f) => s + f.tenders, 0);

  return (
    <div>
      <PageHeader title="Filières Sectorielles" subtitle="Cartographie économique du Gabon" />

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 16, marginBottom: 32 }}>
        <StatsCard icon="🏭" title="Filières" value={MOCK_FILIERES.length} color="#009e49" />
        <StatsCard icon="🏢" title="Entreprises" value={totalEnterprises} color="#3b82f6" />
        <StatsCard icon="📋" title="Marchés publics" value={totalTenders} color="#f59e0b" />
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 16 }}>
        {MOCK_FILIERES.map((f) => (
          <div key={f.id} style={{
            background: 'white', borderRadius: 16, padding: '24px',
            border: '1px solid #f0f0f0', boxShadow: '0 1px 3px rgba(0,0,0,0.04)',
            cursor: 'pointer', transition: 'all 0.2s',
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 14, marginBottom: 16 }}>
              <span style={{
                fontSize: 28, width: 52, height: 52, borderRadius: 14,
                background: '#f0fdf4', display: 'flex', alignItems: 'center', justifyContent: 'center',
              }}>
                {f.icon}
              </span>
              <h3 style={{ fontSize: 15, fontWeight: 600, color: '#111827', margin: 0 }}>{f.name}</h3>
            </div>
            <div style={{
              display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 12,
              padding: '12px 0 0', borderTop: '1px solid #f5f5f5',
            }}>
              <div>
                <div style={{ fontSize: 11, color: '#9ca3af', marginBottom: 2 }}>ENTREPRISES</div>
                <div style={{ fontSize: 18, fontWeight: 700, color: '#111827' }}>{f.enterprises}</div>
              </div>
              <div>
                <div style={{ fontSize: 11, color: '#9ca3af', marginBottom: 2 }}>MARCHÉS</div>
                <div style={{ fontSize: 18, fontWeight: 700, color: '#3b82f6' }}>{f.tenders}</div>
              </div>
              <div>
                <div style={{ fontSize: 11, color: '#9ca3af', marginBottom: 2 }}>REVENUS</div>
                <div style={{ fontSize: 14, fontWeight: 600, color: '#009e49' }}>{f.revenue}</div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
