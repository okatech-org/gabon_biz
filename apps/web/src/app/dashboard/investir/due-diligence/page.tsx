'use client';

// GABON BIZ — Dashboard Investir — Due Diligence Pays

import React, { useState } from 'react';
import {
  ChevronDown, ChevronUp, Building2, Scale, Receipt,
  FileText, Users, CheckCircle, ExternalLink,
} from 'lucide-react';
import { PageHeader } from '@/components/ui';
import { DUE_DILIGENCE } from '@/lib/mock/investir-data';

const SECTION_ICONS = [Building2, Scale, Receipt, FileText, Users];
const SECTION_COLORS = ['#3B82F6', '#8B5CF6', '#10B981', '#F59E0B', '#EF4444'];

export default function DueDiligencePage() {
  const [expandedSections, setExpandedSections] = useState<Set<number>>(new Set([0]));

  const toggleSection = (index: number) => {
    setExpandedSections(prev => {
      const next = new Set(prev);
      if (next.has(index)) next.delete(index);
      else next.add(index);
      return next;
    });
  };

  return (
    <div>
      <PageHeader
        title="Due Diligence Pays"
        subtitle="Fiche de due diligence synthétique pour les comités d'investissement. Données institutionnelles, juridiques, fiscales et écosystème."
      />

      {/* Quick summary */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 12, marginBottom: 32 }}>
        {[
          { label: 'Régime', value: 'République (CTRI)', icon: '🏛️' },
          { label: 'Monnaie', value: 'FCFA (arrimé €)', icon: '💶' },
          { label: 'PIB/hab PPA', value: '$16 470', icon: '💰' },
          { label: 'Urbanisation', value: '90%', icon: '🏙️' },
        ].map((s, i) => (
          <div key={i} style={{ background: 'white', borderRadius: 16, padding: '16px 20px', border: '1px solid #f0f0f0', textAlign: 'center' }}
            className="dark:bg-gray-900 dark:border-gray-800"
          >
            <div style={{ fontSize: 24, marginBottom: 6 }}>{s.icon}</div>
            <div style={{ fontSize: 11, color: '#9CA3AF', marginBottom: 2 }}>{s.label}</div>
            <div style={{ fontSize: 15, fontWeight: 700 }} className="text-gray-900 dark:text-white">{s.value}</div>
          </div>
        ))}
      </div>

      {/* Sections */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
        {DUE_DILIGENCE.map((section, idx) => {
          const Icon = SECTION_ICONS[idx] || Building2;
          const color = SECTION_COLORS[idx] || '#6B7280';
          const isExpanded = expandedSections.has(idx);

          return (
            <div key={idx} style={{
              background: 'white', borderRadius: 20, border: '1px solid #f0f0f0',
              overflow: 'hidden',
            }}
            className="dark:bg-gray-900 dark:border-gray-800"
            >
              {/* Header */}
              <div
                style={{
                  padding: '16px 24px', cursor: 'pointer',
                  display: 'flex', alignItems: 'center', gap: 14,
                  borderLeft: `4px solid ${color}`,
                }}
                onClick={() => toggleSection(idx)}
              >
                <div style={{
                  width: 40, height: 40, borderRadius: 12,
                  backgroundColor: color + '15',
                  display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0,
                }}>
                  <Icon size={20} style={{ color }} />
                </div>
                <h3 style={{ flex: 1, fontSize: 15, fontWeight: 600, margin: 0 }} className="text-gray-900 dark:text-white">
                  {section.titre}
                </h3>
                <span style={{
                  padding: '4px 10px', borderRadius: 8, fontSize: 11, fontWeight: 600,
                  background: color + '15', color,
                }}>
                  {section.items.length} items
                </span>
                {isExpanded ? <ChevronUp size={18} className="text-gray-400" /> : <ChevronDown size={18} className="text-gray-400" />}
              </div>

              {/* Content */}
              {isExpanded && (
                <div style={{ padding: '0 24px 20px' }}>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                    {section.items.map((item, i) => (
                      <div key={i} style={{
                        display: 'flex', alignItems: 'flex-start', gap: 12,
                        padding: '12px 16px', background: '#f9fafb', borderRadius: 12,
                      }}
                      className="dark:bg-gray-800"
                      >
                        <CheckCircle size={16} style={{ color, marginTop: 2, flexShrink: 0 }} />
                        <div>
                          <div style={{ fontSize: 12, fontWeight: 600, color: '#6B7280', marginBottom: 2 }}>{item.label}</div>
                          <div style={{ fontSize: 13, fontWeight: 500 }} className="text-gray-900 dark:text-white">{item.value}</div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Liens utiles */}
      <div style={{ marginTop: 32 }}>
        <h2 style={{ fontSize: 16, fontWeight: 600, marginBottom: 12 }} className="text-gray-900 dark:text-white">Liens utiles</h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 12 }}>
          {[
            { label: 'Guichet Numérique de l\'Investissement', url: 'https://www.gni-anpigabon.com/', org: 'ANPI-Gabon' },
            { label: 'SING — Incubateur National', url: 'https://www.sing.ga/', org: 'SING SA' },
            { label: 'Banque Mondiale — Gabon', url: 'https://www.worldbank.org/en/country/gabon', org: 'World Bank' },
          ].map((link, i) => (
            <a key={i} href={link.url} target="_blank" rel="noopener noreferrer"
              style={{
                background: 'white', borderRadius: 16, padding: '16px 20px',
                border: '1px solid #f0f0f0', textDecoration: 'none',
                display: 'flex', alignItems: 'center', gap: 12,
              }}
              className="dark:bg-gray-900 dark:border-gray-800 hover:shadow-lg"
            >
              <ExternalLink size={18} className="text-teal-500" />
              <div>
                <div style={{ fontSize: 13, fontWeight: 600 }} className="text-gray-900 dark:text-white">{link.label}</div>
                <div style={{ fontSize: 11, color: '#9CA3AF' }}>{link.org}</div>
              </div>
            </a>
          ))}
        </div>
      </div>

      {/* Download CTA */}
      <div style={{
        marginTop: 24, padding: '20px 24px', borderRadius: 16,
        background: 'linear-gradient(135deg, #8B5CF6, #6366F1)',
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
      }}>
        <div>
          <h3 style={{ color: 'white', fontSize: 14, fontWeight: 700, margin: 0 }}>Télécharger le rapport complet</h3>
          <p style={{ color: 'rgba(255,255,255,0.8)', fontSize: 12, margin: '4px 0 0' }}>PDF exportable pour vos comités d&apos;investissement (bientôt disponible)</p>
        </div>
        <button style={{
          padding: '10px 20px', borderRadius: 12, background: 'white', color: '#6366F1',
          border: 'none', fontWeight: 600, fontSize: 13, cursor: 'pointer', opacity: 0.7,
        }} disabled>
          Bientôt disponible
        </button>
      </div>
    </div>
  );
}
