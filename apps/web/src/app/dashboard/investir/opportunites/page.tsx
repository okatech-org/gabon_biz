'use client';

// GABON BIZ — Dashboard Investir — Opportunités Sectorielles

import React, { useState } from 'react';
import {
  Wallet, ShoppingCart, HeartPulse, Sprout, GraduationCap, Building2,
  Zap, ChevronDown, ChevronUp, Star, ArrowRight,
} from 'lucide-react';
import { PageHeader } from '@/components/ui';
import { VERTICALES } from '@/lib/mock/investir-data';

const ICON_MAP: Record<string, React.ComponentType<{ size?: number; className?: string }>> = {
  Wallet, ShoppingCart, HeartPulse, Sprout, GraduationCap, Building2,
};

// Scoring d'attractivité (simplifié)
const SCORING: Record<string, { score: number; label: string }> = {
  fintech: { score: 92, label: 'Très élevé' },
  ecommerce: { score: 85, label: 'Élevé' },
  healthtech: { score: 78, label: 'Élevé' },
  agritech: { score: 72, label: 'Modéré-Élevé' },
  edtech: { score: 65, label: 'Modéré' },
  'govtech-infra': { score: 88, label: 'Très élevé' },
};

const FILTER_OPTIONS = [
  { value: '', label: 'Toutes les verticales' },
  ...VERTICALES.map(v => ({ value: v.id, label: v.titre })),
];

export default function OpportunitesPage() {
  const [filter, setFilter] = useState('');
  const [expanded, setExpanded] = useState<string | null>(null);

  const filtered = filter ? VERTICALES.filter(v => v.id === filter) : VERTICALES;

  return (
    <div>
      <PageHeader
        title="Opportunités Sectorielles"
        subtitle="6 verticales de croissance dans l'économie numérique gabonaise"
      />

      {/* Filter */}
      <div style={{ display: 'flex', gap: 8, marginBottom: 24, flexWrap: 'wrap' }}>
        {FILTER_OPTIONS.map(opt => (
          <button
            key={opt.value}
            onClick={() => setFilter(opt.value)}
            style={{
              padding: '8px 16px', borderRadius: 10, fontSize: 13, fontWeight: 600,
              border: filter === opt.value ? '2px solid #14b8a6' : '1px solid #E5E7EB',
              background: filter === opt.value ? '#14b8a615' : 'white',
              color: filter === opt.value ? '#14b8a6' : '#6B7280',
              cursor: 'pointer',
            }}
            className="dark:bg-gray-900 dark:border-gray-700"
          >
            {opt.label}
          </button>
        ))}
      </div>

      {/* Verticales */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
        {filtered.map((v) => {
          const Icon = ICON_MAP[v.icon] || Zap;
          const scoring = SCORING[v.id] || { score: 50, label: 'N/A' };
          const isExpanded = expanded === v.id;

          return (
            <div key={v.id} style={{
              background: 'white', borderRadius: 20, border: '1px solid #f0f0f0',
              boxShadow: '0 1px 3px rgba(0,0,0,0.04)', overflow: 'hidden',
            }}
            className="dark:bg-gray-900 dark:border-gray-800"
            >
              {/* Header */}
              <div
                style={{ padding: '20px 24px', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 16 }}
                onClick={() => setExpanded(isExpanded ? null : v.id)}
              >
                <div style={{ width: 48, height: 48, borderRadius: 14, backgroundColor: v.color + '15', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                  <Icon size={24} className="text-current" />
                </div>
                <div style={{ flex: 1 }}>
                  <h3 style={{ fontSize: 16, fontWeight: 600, margin: 0 }} className="text-gray-900 dark:text-white">{v.titre}</h3>
                  <p style={{ fontSize: 13, color: '#6B7280', margin: '2px 0 0' }}>{v.opportunite.substring(0, 100)}...</p>
                </div>

                {/* Score */}
                <div style={{ textAlign: 'center', marginRight: 12 }}>
                  <div style={{ width: 48, height: 48, borderRadius: '50%', background: `conic-gradient(${v.color} ${scoring.score * 3.6}deg, #E5E7EB ${scoring.score * 3.6}deg)`, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <div style={{ width: 38, height: 38, borderRadius: '50%', background: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 12, fontWeight: 700, color: v.color }} className="dark:bg-gray-900">
                      {scoring.score}
                    </div>
                  </div>
                  <div style={{ fontSize: 10, color: '#9CA3AF', marginTop: 4 }}>Attractivité</div>
                </div>

                {isExpanded ? <ChevronUp size={20} className="text-gray-400" /> : <ChevronDown size={20} className="text-gray-400" />}
              </div>

              {/* Expanded content */}
              {isExpanded && (
                <div style={{ padding: '0 24px 24px', borderTop: '1px solid #f0f0f0' }} className="dark:border-gray-800">
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16, marginTop: 16 }}>
                    {/* Marché */}
                    <div style={{ padding: 16, background: '#f9fafb', borderRadius: 14 }} className="dark:bg-gray-800">
                      <h4 style={{ fontSize: 12, fontWeight: 700, color: '#6B7280', textTransform: 'uppercase', letterSpacing: 1, marginBottom: 8 }}>Données de marché</h4>
                      <div style={{ fontSize: 13 }} className="text-gray-700 dark:text-gray-300">
                        <p style={{ margin: '0 0 6px' }}>📊 <strong>Taille :</strong> {v.marche.taille}</p>
                        <p style={{ margin: '0 0 6px' }}>📈 <strong>Pénétration :</strong> {v.marche.penetration}</p>
                        <p style={{ margin: 0 }}>🚀 <strong>Croissance :</strong> {v.marche.croissance}</p>
                      </div>
                    </div>

                    {/* Risques */}
                    <div style={{ padding: 16, background: '#FEF2F2', borderRadius: 14 }} className="dark:bg-red-950/20">
                      <h4 style={{ fontSize: 12, fontWeight: 700, color: '#EF4444', textTransform: 'uppercase', letterSpacing: 1, marginBottom: 8 }}>Risques</h4>
                      <p style={{ fontSize: 13, color: '#991B1B', margin: 0 }} className="dark:text-red-300">{v.risques}</p>
                      <div style={{ marginTop: 12 }}>
                        <h4 style={{ fontSize: 12, fontWeight: 700, color: '#10B981', textTransform: 'uppercase', letterSpacing: 1, marginBottom: 4 }}>Stratégie d&apos;entrée</h4>
                        <p style={{ fontSize: 13, color: '#065F46', margin: 0 }} className="dark:text-emerald-300">{v.strategieEntree}</p>
                      </div>
                    </div>
                  </div>

                  {/* Startups */}
                  <div style={{ marginTop: 16 }}>
                    <h4 style={{ fontSize: 12, fontWeight: 700, color: '#6B7280', textTransform: 'uppercase', letterSpacing: 1, marginBottom: 12 }}>Startups actives</h4>
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))', gap: 10 }}>
                      {v.startupsExistantes.map(s => (
                        <div key={s.nom} style={{
                          padding: '12px 16px', borderRadius: 12, border: '1px solid #E5E7EB',
                          display: 'flex', alignItems: 'center', gap: 10,
                        }}
                        className="dark:border-gray-700"
                        >
                          <Star size={16} className="shrink-0 text-current" />
                          <div>
                            <div style={{ fontSize: 13, fontWeight: 600 }} className="text-gray-900 dark:text-white">{s.nom}</div>
                            <div style={{ fontSize: 11, color: '#9CA3AF' }}>{s.description}</div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* CTA */}
                  <div style={{ marginTop: 16, textAlign: 'center' }}>
                    <button style={{
                      padding: '10px 24px', borderRadius: 12, background: v.color, color: 'white',
                      border: 'none', fontSize: 13, fontWeight: 600, cursor: 'pointer',
                      display: 'inline-flex', alignItems: 'center', gap: 8,
                    }}>
                      Exprimer mon intérêt <ArrowRight size={16} />
                    </button>
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
