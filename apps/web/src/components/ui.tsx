'use client';

// GABON BIZ — Shared UI Components
// StatusBadge, StatsCard, DataTable, PageHeader, EmptyState

import React from 'react';

// ============================================
// STATUS BADGE
// ============================================
const STATUS_COLORS: Record<string, { bg: string; text: string; dot: string }> = {
  DRAFT: { bg: '#f3f4f6', text: '#6b7280', dot: '#9ca3af' },
  PENDING: { bg: '#fef3c7', text: '#92400e', dot: '#f59e0b' },
  ACTIVE: { bg: '#d1fae5', text: '#065f46', dot: '#10b981' },
  PUBLISHED: { bg: '#dbeafe', text: '#1e40af', dot: '#3b82f6' },
  CLOSED: { bg: '#fecaca', text: '#991b1b', dot: '#ef4444' },
  AWARDED: { bg: '#d1fae5', text: '#065f46', dot: '#10b981' },
  CANCELLED: { bg: '#f3f4f6', text: '#6b7280', dot: '#9ca3af' },
  SUSPENDED: { bg: '#fecaca', text: '#991b1b', dot: '#ef4444' },
  SUBMITTED: { bg: '#dbeafe', text: '#1e40af', dot: '#3b82f6' },
  UNDER_REVIEW: { bg: '#fef3c7', text: '#92400e', dot: '#f59e0b' },
  REJECTED: { bg: '#fecaca', text: '#991b1b', dot: '#ef4444' },
  WITHDRAWN: { bg: '#f3f4f6', text: '#6b7280', dot: '#9ca3af' },
};

const STATUS_LABELS: Record<string, string> = {
  DRAFT: 'Brouillon',
  PENDING: 'En attente',
  ACTIVE: 'Active',
  PUBLISHED: 'Publié',
  CLOSED: 'Clôturé',
  AWARDED: 'Attribué',
  CANCELLED: 'Annulé',
  SUSPENDED: 'Suspendu',
  SUBMITTED: 'Soumis',
  UNDER_REVIEW: 'En évaluation',
  REJECTED: 'Rejeté',
  WITHDRAWN: 'Retiré',
};

export function StatusBadge({ status }: { status: string }) {
  const colors = STATUS_COLORS[status] || STATUS_COLORS.DRAFT;
  const label = STATUS_LABELS[status] || status;

  return (
    <span
      style={{
        display: 'inline-flex', alignItems: 'center', gap: 6,
        padding: '4px 12px', borderRadius: 20, fontSize: 12, fontWeight: 600,
        backgroundColor: colors.bg, color: colors.text,
      }}
    >
      <span style={{ width: 7, height: 7, borderRadius: '50%', backgroundColor: colors.dot }} />
      {label}
    </span>
  );
}

// ============================================
// STATS CARD
// ============================================
export function StatsCard({ title, value, icon, color = '#009e49' }: {
  title: string;
  value: string | number;
  icon: string;
  color?: string;
}) {
  return (
    <div style={{
      background: 'white', borderRadius: 16, padding: '24px 28px',
      boxShadow: '0 1px 3px rgba(0,0,0,0.06), 0 1px 2px rgba(0,0,0,0.04)',
      border: '1px solid #f0f0f0',
      display: 'flex', flexDirection: 'column', gap: 8,
    }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <span style={{ fontSize: 13, color: '#6b7280', fontWeight: 500 }}>{title}</span>
        <span style={{
          fontSize: 20, width: 40, height: 40, borderRadius: 12,
          background: `${color}15`, display: 'flex', alignItems: 'center', justifyContent: 'center',
        }}>
          {icon}
        </span>
      </div>
      <span style={{ fontSize: 28, fontWeight: 700, color: '#111827', letterSpacing: -0.5 }}>
        {typeof value === 'number' ? value.toLocaleString('fr-FR') : value}
      </span>
    </div>
  );
}

// ============================================
// PAGE HEADER
// ============================================
export function PageHeader({ title, subtitle, action }: {
  title: string;
  subtitle?: string;
  action?: React.ReactNode;
}) {
  return (
    <div style={{
      display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start',
      marginBottom: 32,
    }}>
      <div>
        <h1 style={{
          fontSize: 28, fontWeight: 700, color: '#111827', marginBottom: 4,
          letterSpacing: -0.3,
        }}>
          {title}
        </h1>
        {subtitle && (
          <p style={{ fontSize: 14, color: '#6b7280', margin: 0 }}>{subtitle}</p>
        )}
      </div>
      {action}
    </div>
  );
}

// ============================================
// EMPTY STATE
// ============================================
export function EmptyState({ icon, title, description, action }: {
  icon: string;
  title: string;
  description: string;
  action?: React.ReactNode;
}) {
  return (
    <div style={{
      textAlign: 'center', padding: '60px 20px',
      background: '#fafafa', borderRadius: 16, border: '2px dashed #e5e7eb',
    }}>
      <span style={{ fontSize: 48 }}>{icon}</span>
      <h3 style={{ fontSize: 18, fontWeight: 600, color: '#374151', marginTop: 16, marginBottom: 8 }}>
        {title}
      </h3>
      <p style={{ fontSize: 14, color: '#6b7280', marginBottom: 20 }}>{description}</p>
      {action}
    </div>
  );
}

// ============================================
// PRIMARY BUTTON
// ============================================
export function PrimaryButton({ children, onClick, href, style: customStyle }: {
  children: React.ReactNode;
  onClick?: () => void;
  href?: string;
  style?: React.CSSProperties;
}) {
  const baseStyle: React.CSSProperties = {
    display: 'inline-flex', alignItems: 'center', gap: 8,
    padding: '12px 24px', borderRadius: 12, fontSize: 14, fontWeight: 600,
    background: 'linear-gradient(135deg, #009e49 0%, #3cba54 100%)',
    color: 'white', border: 'none', cursor: 'pointer',
    textDecoration: 'none', transition: 'all 0.2s ease',
    boxShadow: '0 2px 8px rgba(0,158,73,0.3)',
    ...customStyle,
  };

  if (href) {
    return <a href={href} style={baseStyle}>{children}</a>;
  }
  return <button onClick={onClick} style={baseStyle}>{children}</button>;
}

// ============================================
// FORMAT CURRENCY (FCFA)
// ============================================
export function formatCFA(amount: number | null | undefined): string {
  if (amount == null) return '—';
  return new Intl.NumberFormat('fr-FR', {
    style: 'currency',
    currency: 'XAF',
    maximumFractionDigits: 0,
  }).format(amount);
}

// ============================================
// FORMAT DATE
// ============================================
export function formatDate(date: string | Date | null | undefined): string {
  if (!date) return '—';
  return new Intl.DateTimeFormat('fr-FR', {
    day: '2-digit', month: 'long', year: 'numeric',
  }).format(new Date(date));
}
