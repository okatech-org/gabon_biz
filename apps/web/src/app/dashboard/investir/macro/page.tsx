'use client';

// GABON BIZ — Dashboard Investir — Macro Dashboard

import React from 'react';
import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import {
  TrendingUp, TrendingDown, DollarSign, BarChart3, Signal,
  CheckCircle, Info, Globe,
} from 'lucide-react';
import { PageHeader } from '@/components/ui';
import {
  MACRO_INDICATORS, MACRO_KEY_FACTS, MARCHE_TELECOM,
  OPERATEURS_TELECOM, PARADOXE_NUMERIQUE,
} from '@/lib/mock/investir-data';

// ═══════════════════════════════════════════
//  BAR CHART COMPONENT (CSS-based)
// ═══════════════════════════════════════════

function SimpleBarChart({ data, label, color }: {
  data: { year: string; value: number | null }[];
  label: string;
  color: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true });
  const maxVal = Math.max(...data.map(d => Math.abs(d.value ?? 0)));

  return (
    <div ref={ref} style={{ background: 'white', borderRadius: 20, border: '1px solid #f0f0f0', padding: 24 }} className="dark:bg-gray-900 dark:border-gray-800">
      <h3 style={{ fontSize: 14, fontWeight: 600, marginBottom: 20 }} className="text-gray-900 dark:text-white">{label}</h3>
      <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', height: 160, gap: 8 }}>
        {data.map((d, i) => {
          const pct = d.value !== null ? (Math.abs(d.value) / (maxVal || 1)) * 100 : 0;
          const isNeg = (d.value ?? 0) < 0;
          return (
            <div key={i} style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', height: '100%', justifyContent: 'flex-end' }}>
              <div style={{ fontSize: 11, fontWeight: 600, color: isNeg ? '#EF4444' : color, marginBottom: 4 }}>
                {d.value !== null ? d.value : '—'}
              </div>
              <motion.div
                style={{
                  width: '100%', maxWidth: 40, borderRadius: '8px 8px 4px 4px',
                  background: isNeg ? '#FEE2E2' : color + '30',
                  border: `2px solid ${isNeg ? '#EF4444' : color}`,
                }}
                initial={{ height: 0 }}
                animate={isInView ? { height: `${pct}%` } : { height: 0 }}
                transition={{ duration: 0.6, delay: i * 0.1 }}
              />
              <div style={{ fontSize: 10, color: '#9CA3AF', marginTop: 6 }}>{d.year}</div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

// ═══════════════════════════════════════════
//  HORIZONTAL BAR
// ═══════════════════════════════════════════

function HBar({ label, value, max, color }: { label: string; value: number; max: number; color: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true });
  return (
    <div ref={ref} style={{ marginBottom: 14 }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 4 }}>
        <span style={{ fontSize: 13, fontWeight: 500 }} className="text-gray-700 dark:text-gray-300">{label}</span>
        <span style={{ fontSize: 13, fontWeight: 700, color }}>{value}%</span>
      </div>
      <div style={{ height: 8, background: '#E5E7EB', borderRadius: 4, overflow: 'hidden' }} className="dark:bg-gray-700">
        <motion.div
          style={{ height: '100%', background: color, borderRadius: 4 }}
          initial={{ width: 0 }}
          animate={isInView ? { width: `${(value / max) * 100}%` } : { width: 0 }}
          transition={{ duration: 1, ease: 'easeOut' }}
        />
      </div>
    </div>
  );
}

export default function MacroDashboardPage() {
  const years = ['2022', '2023', '2024', '2025(p)', '2026(p)'];
  const gdpData = years.map((y, i) => ({ year: y, value: MACRO_INDICATORS[0][`y${2022 + i}` as keyof typeof MACRO_INDICATORS[0]] as number | null }));
  const inflData = years.map((y, i) => ({ year: y, value: MACRO_INDICATORS[2][`y${2022 + i}` as keyof typeof MACRO_INDICATORS[0]] as number | null }));

  return (
    <div>
      <PageHeader
        title="Dashboard Macroéconomique"
        subtitle="Indicateurs clés pour les comités d'investissement — Sources : BAD, ARCEP, UNCDF"
      />

      {/* Key facts */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 12, marginBottom: 32 }}>
        {MACRO_KEY_FACTS.map((kf, i) => {
          const icons = [DollarSign, Globe, TrendingUp, Globe];
          const Icon = icons[i] || Info;
          return (
            <div key={i} style={{ background: 'white', borderRadius: 16, padding: '16px 20px', border: '1px solid #f0f0f0', display: 'flex', alignItems: 'flex-start', gap: 12 }}
              className="dark:bg-gray-900 dark:border-gray-800"
            >
              <div style={{ width: 36, height: 36, borderRadius: 10, backgroundColor: '#3B82F615', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                <Icon size={18} style={{ color: '#3B82F6' }} />
              </div>
              <p style={{ fontSize: 12, lineHeight: 1.5, margin: 0 }} className="text-gray-700 dark:text-gray-300">{kf.fact}</p>
            </div>
          );
        })}
      </div>

      {/* Charts row */}
      <h2 style={{ fontSize: 16, fontWeight: 600, marginBottom: 12 }} className="text-gray-900 dark:text-white">Croissance & Stabilité</h2>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16, marginBottom: 32 }}>
        <SimpleBarChart data={gdpData} label="Croissance du PIB (%)" color="#10B981" />
        <SimpleBarChart data={inflData} label="Taux d'inflation (%)" color="#F59E0B" />
      </div>

      {/* Full macro table */}
      <div style={{ background: 'white', borderRadius: 20, border: '1px solid #f0f0f0', overflow: 'hidden', marginBottom: 32 }} className="dark:bg-gray-900 dark:border-gray-800">
        <div style={{ padding: '16px 20px', borderBottom: '1px solid #f0f0f0', display: 'flex', alignItems: 'center', gap: 8 }} className="dark:border-gray-800">
          <BarChart3 size={18} className="text-blue-500" />
          <h3 style={{ fontSize: 14, fontWeight: 600, margin: 0 }} className="text-gray-900 dark:text-white">Tableau complet — BAD 2025</h3>
        </div>
        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 13 }}>
            <thead>
              <tr style={{ borderBottom: '1px solid #E5E7EB' }} className="dark:border-gray-700">
                <th style={{ textAlign: 'left', padding: '10px 16px', fontWeight: 600 }} className="text-gray-900 dark:text-white">Indicateur</th>
                {years.map(y => <th key={y} style={{ textAlign: 'center', padding: '10px 12px', fontWeight: 600 }} className="text-gray-900 dark:text-white">{y}</th>)}
              </tr>
            </thead>
            <tbody>
              {MACRO_INDICATORS.map((row, i) => (
                <tr key={i} style={{ borderBottom: '1px solid #f5f5f5' }} className="dark:border-gray-800 hover:bg-gray-50 dark:hover:bg-gray-800/50">
                  <td style={{ padding: '10px 16px', fontWeight: 500 }} className="text-gray-700 dark:text-gray-300">{row.indicateur}</td>
                  {[row.y2022, row.y2023, row.y2024, row.y2025, row.y2026].map((v, j) => (
                    <td key={j} style={{ textAlign: 'center', padding: '10px 12px', fontWeight: 600, color: v === null ? '#9CA3AF' : (v as number) >= 0 ? '#10B981' : '#EF4444' }}>
                      {v === null ? '—' : v}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Connectivité */}
      <h2 style={{ fontSize: 16, fontWeight: 600, marginBottom: 12 }} className="text-gray-900 dark:text-white">Connectivité & Infrastructure</h2>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16, marginBottom: 32 }}>
        {/* Télécom */}
        <div style={{ background: 'white', borderRadius: 20, border: '1px solid #f0f0f0', padding: 24 }} className="dark:bg-gray-900 dark:border-gray-800">
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 16 }}>
            <Signal size={18} className="text-violet-500" />
            <h3 style={{ fontSize: 14, fontWeight: 600, margin: 0 }} className="text-gray-900 dark:text-white">Parts de marché télécom (Q3 2025)</h3>
          </div>
          {OPERATEURS_TELECOM.map(op => (
            <HBar key={op.nom} label={op.nom.length > 30 ? op.nom.substring(0, 30) + '...' : op.nom} value={op.partMarche} max={60} color="#8B5CF6" />
          ))}
          <div style={{ fontSize: 10, color: '#9CA3AF', marginTop: 8 }}>{MARCHE_TELECOM.source}</div>
        </div>

        {/* Paradoxe */}
        <div style={{ background: 'white', borderRadius: 20, border: '1px solid #f0f0f0', padding: 24 }} className="dark:bg-gray-900 dark:border-gray-800">
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 16 }}>
            <TrendingDown size={18} className="text-amber-500" />
            <h3 style={{ fontSize: 14, fontWeight: 600, margin: 0 }} className="text-gray-900 dark:text-white">Pénétration vs Adoption</h3>
          </div>
          {PARADOXE_NUMERIQUE.gauges.map(g => (
            <HBar key={g.label} label={g.label} value={g.value} max={g.max} color={g.color} />
          ))}
        </div>
      </div>

      {/* Climat des affaires */}
      <h2 style={{ fontSize: 16, fontWeight: 600, marginBottom: 12 }} className="text-gray-900 dark:text-white">Climat des Affaires</h2>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 12, marginBottom: 32 }}>
        {[
          { label: 'Création entreprise', value: '100% en ligne (GNI)', trend: 'up' },
          { label: 'Exonération IS', value: '3 ans pour nouvelles entreprises', trend: 'stable' },
          { label: 'Protection investissements', value: 'Code 1998 — anti-expropriation', trend: 'stable' },
        ].map((card, i) => (
          <div key={i} style={{ background: 'white', borderRadius: 16, padding: '16px 20px', border: '1px solid #f0f0f0' }}
            className="dark:bg-gray-900 dark:border-gray-800"
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 8 }}>
              {card.trend === 'up' ? <TrendingUp size={14} className="text-emerald-500" /> : <CheckCircle size={14} className="text-blue-500" />}
              <span style={{ fontSize: 12, fontWeight: 600, color: '#6B7280' }}>{card.label}</span>
            </div>
            <p style={{ fontSize: 14, fontWeight: 600, margin: 0 }} className="text-gray-900 dark:text-white">{card.value}</p>
          </div>
        ))}
      </div>

      {/* VC Context */}
      <div style={{ background: 'linear-gradient(135deg, #0F172A, #1E293B)', borderRadius: 20, padding: 28, color: 'white' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 16 }}>
          <Globe size={18} className="text-teal-400" />
          <h3 style={{ fontSize: 16, fontWeight: 600, margin: 0 }}>Capital-Risque Africain — Contexte</h3>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
          <div>
            <p style={{ fontSize: 13, color: '#94A3B8', lineHeight: 1.6 }}>
              83% des deals VC en Afrique se concentrent sur le &ldquo;Big Four&ldquo; : Kenya, Nigeria, Afrique du Sud, Égypte.
              L&apos;Afrique centrale et francophone est massivement sous-représentée.
            </p>
            <p style={{ fontSize: 13, color: '#94A3B8', lineHeight: 1.6, marginTop: 8 }}>
              Le deal POZI (€650K Seed, Saviu Ventures) prouve que la prime au premier entrant est massive au Gabon.
              Les valorisations d&apos;entrée y sont significativement plus basses qu&apos;au Kenya ou au Nigeria.
            </p>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
            {[
              { label: 'Funding startups Afrique 2024', value: '$2,2B', change: '-52% vs 2022' },
              { label: 'Big Four concentration', value: '83%', change: 'Kenya, Nigeria, SA, Égypte' },
              { label: '1er deal VC au Gabon', value: '€650K', change: 'POZI — Oct 2025' },
            ].map((stat, i) => (
              <div key={i} style={{ padding: '12px 16px', background: 'rgba(255,255,255,0.05)', borderRadius: 12, border: '1px solid rgba(255,255,255,0.1)' }}>
                <div style={{ fontSize: 11, color: '#94A3B8' }}>{stat.label}</div>
                <div style={{ fontSize: 20, fontWeight: 700 }}>{stat.value}</div>
                <div style={{ fontSize: 11, color: '#14B8A6' }}>{stat.change}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
