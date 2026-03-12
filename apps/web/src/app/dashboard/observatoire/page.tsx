'use client';

// GABON BIZ — Observatoire (M6)

import React from 'react';
import { PageHeader, StatsCard } from '@/components/ui';

const CATEGORIES = [
  { key: 'INFRASTRUCTURE', label: 'Infrastructure', icon: '🏗️', color: '#3b82f6', indicators: [
    { name: 'Taux de pénétration Internet', value: 62.3, unit: '%', period: '2025-Q4' },
    { name: 'Couverture 4G nationale', value: 78.5, unit: '%', period: '2025-Q4' },
    { name: 'Centres de données actifs', value: 3, unit: '', period: '2025-Q4' },
  ]},
  { key: 'SKILLS', label: 'Compétences', icon: '🎓', color: '#10b981', indicators: [
    { name: 'Diplômés STEM annuels', value: 2150, unit: '', period: '2025' },
    { name: 'Formations numériques actives', value: 45, unit: '', period: '2025-Q4' },
  ]},
  { key: 'INNOVATION', label: 'Innovation', icon: '💡', color: '#f59e0b', indicators: [
    { name: 'Brevets déposés', value: 34, unit: '', period: '2025' },
    { name: 'Startups enregistrées', value: 128, unit: '', period: '2025-Q4' },
    { name: 'Labs R&D', value: 8, unit: '', period: '2025-Q4' },
  ]},
  { key: 'POLICY', label: 'Politiques', icon: '📜', color: '#8b5cf6', indicators: [
    { name: 'Score e-Government (ONU)', value: 0.52, unit: '/1', period: '2024' },
    { name: 'Textes réglementaires numériques', value: 12, unit: '', period: '2025' },
  ]},
  { key: 'INCLUSION', label: 'Inclusion', icon: '🤝', color: '#ec4899', indicators: [
    { name: 'Accès mobile rural', value: 45.2, unit: '%', period: '2025-Q4' },
    { name: 'Femmes dans le numérique', value: 28.7, unit: '%', period: '2025' },
  ]},
];

export default function ObservatoirePage() {
  return (
    <div>
      <PageHeader title="Observatoire du Numérique" subtitle="Indicateurs de l'écosystème numérique gabonais" />

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 16, marginBottom: 32 }}>
        <StatsCard icon="📊" title="Indicateurs" value={42} color="#3b82f6" />
        <StatsCard icon="🏢" title="Entreprises actives" value={350} color="#009e49" />
        <StatsCard icon="🚀" title="Startups" value={128} color="#f59e0b" />
        <StatsCard icon="📋" title="Marchés publics" value={67} color="#8b5cf6" />
      </div>

      {CATEGORIES.map((cat) => (
        <div key={cat.key} style={{ marginBottom: 24 }}>
          <h2 style={{
            fontSize: 16, fontWeight: 600, color: '#111827', marginBottom: 12,
            display: 'flex', alignItems: 'center', gap: 8,
          }}>
            <span>{cat.icon}</span> {cat.label}
          </h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 12 }}>
            {cat.indicators.map((ind) => (
              <div key={ind.name} style={{
                background: 'white', borderRadius: 12, padding: '18px 20px',
                border: '1px solid #f0f0f0',
              }}>
                <div style={{ fontSize: 12, color: '#9ca3af', marginBottom: 6 }}>{ind.name}</div>
                <div style={{ display: 'flex', alignItems: 'baseline', gap: 4 }}>
                  <span style={{ fontSize: 24, fontWeight: 700, color: cat.color }}>
                    {typeof ind.value === 'number' && ind.value < 10 ? ind.value.toFixed(2) : ind.value.toLocaleString('fr-FR')}
                  </span>
                  <span style={{ fontSize: 13, color: '#6b7280' }}>{ind.unit}</span>
                </div>
                <div style={{ fontSize: 11, color: '#d1d5db', marginTop: 4 }}>{ind.period}</div>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}
