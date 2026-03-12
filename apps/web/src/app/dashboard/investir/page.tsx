'use client';

// GABON BIZ — Dashboard Investir — Deal Flow Principal
// Enrichi avec données réelles de l'écosystème

import React, { useState } from 'react';
import Link from 'next/link';
import {
  TrendingUp, ArrowRight, Building2, Rocket, BarChart3,
  FileSearch, ChevronRight, Search, Filter,
} from 'lucide-react';
import { PageHeader, StatsCard } from '@/components/ui';
import { DEAL_FLOW, DEAL_FLOW_STATS } from '@/lib/mock/investir-data';

const STATUT_CONFIG = {
  ouvert: { label: 'Ouvert', bg: 'bg-emerald-50 dark:bg-emerald-950/30', text: 'text-emerald-700 dark:text-emerald-400' },
  en_discussion: { label: 'En discussion', bg: 'bg-amber-50 dark:bg-amber-950/30', text: 'text-amber-700 dark:text-amber-400' },
  terme_sheet: { label: 'Term Sheet', bg: 'bg-blue-50 dark:bg-blue-950/30', text: 'text-blue-700 dark:text-blue-400' },
  cloture: { label: 'Clôturé', bg: 'bg-gray-100 dark:bg-gray-800', text: 'text-gray-600 dark:text-gray-400' },
};

const STADE_COLORS: Record<string, string> = {
  'Pre-Seed': '#EF4444',
  'Seed': '#F59E0B',
  'Post-Seed': '#3B82F6',
  'Série A': '#8B5CF6',
  'Croissance': '#10B981',
};

const SUB_PAGES = [
  { label: 'Opportunités Sectorielles', description: 'Explorer les 6 verticales de croissance', href: '/dashboard/investir/opportunites', icon: Rocket, color: '#10B981' },
  { label: 'Dashboard Macroéconomique', description: 'Indicateurs PIB, inflation, télécom', href: '/dashboard/investir/macro', icon: BarChart3, color: '#3B82F6' },
  { label: 'Due Diligence Pays', description: 'Fiche pays pour comités d\'investissement', href: '/dashboard/investir/due-diligence', icon: FileSearch, color: '#8B5CF6' },
];

export default function InvestirDashboardPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterSecteur, setFilterSecteur] = useState('');

  const secteurs = [...new Set(DEAL_FLOW.map(d => d.secteur))];
  const filteredDeals = DEAL_FLOW.filter(d => {
    if (searchTerm && !d.startup.toLowerCase().includes(searchTerm.toLowerCase())) return false;
    if (filterSecteur && d.secteur !== filterSecteur) return false;
    return true;
  });

  return (
    <div>
      <PageHeader
        title="Investir au Gabon"
        subtitle="Deal Flow, opportunités sectorielles et données macroéconomiques pour les investisseurs"
      />

      {/* Stats */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 16, marginBottom: 32 }}>
        {DEAL_FLOW_STATS.map((s, i) => (
          <StatsCard key={i} icon={i === 0 ? '🚀' : i === 1 ? '🎯' : i === 2 ? '💰' : '🏛️'} title={s.label} value={s.value} color="#14b8a6" />
        ))}
      </div>

      {/* SOUS-PAGES — Navigation rapide */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 16, marginBottom: 32 }}>
        {SUB_PAGES.map((sp) => (
          <Link key={sp.href} href={sp.href} style={{ textDecoration: 'none' }}>
            <div style={{
              background: 'white', borderRadius: 16, padding: '20px 24px',
              border: '1px solid #f0f0f0', boxShadow: '0 1px 3px rgba(0,0,0,0.04)',
              display: 'flex', alignItems: 'center', gap: 16,
              cursor: 'pointer', transition: 'all 0.2s',
            }}
            className="hover:shadow-lg hover:border-teal-200 dark:bg-gray-900 dark:border-gray-800 dark:hover:border-teal-800"
            >
              <div style={{ width: 48, height: 48, borderRadius: 14, backgroundColor: sp.color + '15', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                <sp.icon size={24} style={{ color: sp.color }} />
              </div>
              <div style={{ flex: 1 }}>
                <div style={{ fontWeight: 600, fontSize: 14, color: '#111827' }} className="dark:text-white">{sp.label}</div>
                <div style={{ fontSize: 12, color: '#9CA3AF', marginTop: 2 }}>{sp.description}</div>
              </div>
              <ChevronRight size={18} style={{ color: '#D1D5DB' }} />
            </div>
          </Link>
        ))}
      </div>

      {/* Deal Flow */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 16 }}>
        <h2 style={{ fontSize: 18, fontWeight: 600 }} className="text-gray-900 dark:text-white">
          Pipeline d&apos;Investissement
        </h2>
        <div style={{ display: 'flex', gap: 8 }}>
          <div style={{ position: 'relative' }}>
            <Search size={16} style={{ position: 'absolute', left: 10, top: '50%', transform: 'translateY(-50%)', color: '#9CA3AF' }} />
            <input
              type="text"
              placeholder="Rechercher une startup..."
              value={searchTerm}
              onChange={e => setSearchTerm(e.target.value)}
              style={{
                paddingLeft: 34, paddingRight: 12, paddingTop: 8, paddingBottom: 8,
                borderRadius: 10, border: '1px solid #E5E7EB', fontSize: 13, width: 200, outline: 'none',
              }}
              className="dark:bg-gray-900 dark:border-gray-700 dark:text-white"
            />
          </div>
          <div style={{ position: 'relative' }}>
            <Filter size={16} style={{ position: 'absolute', left: 10, top: '50%', transform: 'translateY(-50%)', color: '#9CA3AF' }} />
            <select
              value={filterSecteur}
              onChange={e => setFilterSecteur(e.target.value)}
              style={{
                paddingLeft: 34, paddingRight: 12, paddingTop: 8, paddingBottom: 8,
                borderRadius: 10, border: '1px solid #E5E7EB', fontSize: 13, outline: 'none',
                appearance: 'none', cursor: 'pointer',
              }}
              className="dark:bg-gray-900 dark:border-gray-700 dark:text-white"
            >
              <option value="">Tous les secteurs</option>
              {secteurs.map(s => <option key={s} value={s}>{s}</option>)}
            </select>
          </div>
        </div>
      </div>

      {/* Deals */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
        {filteredDeals.map((deal) => {
          const statut = STATUT_CONFIG[deal.statut];
          const stadeColor = STADE_COLORS[deal.stade] || '#6B7280';
          return (
            <div key={deal.id} style={{
              background: 'white', borderRadius: 16, padding: '20px 24px',
              border: '1px solid #f0f0f0', boxShadow: '0 1px 3px rgba(0,0,0,0.04)',
            }}
            className="dark:bg-gray-900 dark:border-gray-800"
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                <div style={{ flex: 1 }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 6 }}>
                    <h3 style={{ fontSize: 16, fontWeight: 600, margin: 0 }} className="text-gray-900 dark:text-white">{deal.startup}</h3>
                    <span style={{
                      padding: '3px 10px', borderRadius: 6, fontSize: 11, fontWeight: 600,
                      backgroundColor: stadeColor + '15', color: stadeColor,
                    }}>
                      {deal.stade}
                    </span>
                    <span className={`px-2.5 py-0.5 rounded-md text-xs font-semibold ${statut.bg} ${statut.text}`}>
                      {statut.label}
                    </span>
                  </div>
                  <p style={{ fontSize: 13, color: '#6b7280', margin: '0 0 8px' }}>{deal.secteur}</p>
                  <div style={{ display: 'flex', gap: 24, fontSize: 13 }}>
                    <span className="text-gray-700 dark:text-gray-300">💵 {deal.montantRecherche}</span>
                    <span className="text-gray-700 dark:text-gray-300">📊 {deal.valorisation}</span>
                    <span style={{ color: '#6B7280' }}>📈 {deal.metriques}</span>
                  </div>
                </div>
                <button
                  style={{
                    padding: '8px 16px', borderRadius: 10,
                    background: '#14b8a6', color: 'white', border: 'none',
                    fontSize: 12, fontWeight: 600, cursor: 'pointer',
                    display: 'flex', alignItems: 'center', gap: 6,
                  }}
                >
                  Détails <ArrowRight size={14} />
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {/* Lien page publique */}
      <div style={{ marginTop: 32, padding: '24px 28px', borderRadius: 20, background: 'linear-gradient(135deg, #14b8a6, #10b981)', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <div>
          <h3 style={{ color: 'white', fontSize: 16, fontWeight: 700, margin: 0 }}>Rapport complet : Économie Numérique du Gabon</h3>
          <p style={{ color: 'rgba(255,255,255,0.8)', fontSize: 13, margin: '4px 0 0' }}>Page publique de promotion avec données BAD, ARCEP, UNCDF et cas d&apos;étude POZI</p>
        </div>
        <Link href="/investir-numerique" style={{ color: 'white', display: 'flex', alignItems: 'center', gap: 6, fontWeight: 600, fontSize: 14, textDecoration: 'none' }}>
          Voir le rapport <ArrowRight size={16} />
        </Link>
      </div>
    </div>
  );
}
