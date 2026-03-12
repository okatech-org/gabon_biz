'use client';

// GABON BIZ — Shared UI Components (Tailwind + Dark Mode)
// StatusBadge, StatsCard, PageHeader, EmptyState, PrimaryButton, FilterBar

import React from 'react';

// ============================================
// STATUS BADGE
// ============================================
const STATUS_CONFIG: Record<string, { bg: string; text: string; dot: string }> = {
  DRAFT: {
    bg: 'bg-gray-100 dark:bg-gray-800',
    text: 'text-gray-600 dark:text-gray-400',
    dot: 'bg-gray-400',
  },
  PENDING: {
    bg: 'bg-amber-50 dark:bg-amber-950/40',
    text: 'text-amber-700 dark:text-amber-400',
    dot: 'bg-amber-500',
  },
  ACTIVE: {
    bg: 'bg-emerald-50 dark:bg-emerald-950/40',
    text: 'text-emerald-700 dark:text-emerald-400',
    dot: 'bg-emerald-500',
  },
  PUBLISHED: {
    bg: 'bg-blue-50 dark:bg-blue-950/40',
    text: 'text-blue-700 dark:text-blue-400',
    dot: 'bg-blue-500',
  },
  CLOSED: {
    bg: 'bg-red-50 dark:bg-red-950/40',
    text: 'text-red-700 dark:text-red-400',
    dot: 'bg-red-500',
  },
  AWARDED: {
    bg: 'bg-emerald-50 dark:bg-emerald-950/40',
    text: 'text-emerald-700 dark:text-emerald-400',
    dot: 'bg-emerald-500',
  },
  CANCELLED: {
    bg: 'bg-gray-100 dark:bg-gray-800',
    text: 'text-gray-600 dark:text-gray-400',
    dot: 'bg-gray-400',
  },
  SUSPENDED: {
    bg: 'bg-red-50 dark:bg-red-950/40',
    text: 'text-red-700 dark:text-red-400',
    dot: 'bg-red-500',
  },
  SUBMITTED: {
    bg: 'bg-blue-50 dark:bg-blue-950/40',
    text: 'text-blue-700 dark:text-blue-400',
    dot: 'bg-blue-500',
  },
  UNDER_REVIEW: {
    bg: 'bg-amber-50 dark:bg-amber-950/40',
    text: 'text-amber-700 dark:text-amber-400',
    dot: 'bg-amber-500',
  },
  REJECTED: {
    bg: 'bg-red-50 dark:bg-red-950/40',
    text: 'text-red-700 dark:text-red-400',
    dot: 'bg-red-500',
  },
  WITHDRAWN: {
    bg: 'bg-gray-100 dark:bg-gray-800',
    text: 'text-gray-600 dark:text-gray-400',
    dot: 'bg-gray-400',
  },
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
  const cfg = STATUS_CONFIG[status] || STATUS_CONFIG.DRAFT;
  const label = STATUS_LABELS[status] || status;

  return (
    <span
      className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold ${cfg.bg} ${cfg.text}`}
    >
      <span className={`w-1.5 h-1.5 rounded-full ${cfg.dot}`} />
      {label}
    </span>
  );
}

// ============================================
// STATS CARD
// ============================================
export function StatsCard({
  title,
  value,
  icon,
  color = '#009e49',
}: {
  title: string;
  value: string | number;
  icon: string;
  color?: string;
}) {
  return (
    <div className="bg-white dark:bg-gray-900 rounded-2xl p-5 sm:p-6 shadow-sm border border-gray-100 dark:border-gray-800 flex flex-col gap-2 transition-shadow hover:shadow-md">
      <div className="flex justify-between items-center">
        <span className="text-[13px] text-gray-500 dark:text-gray-400 font-medium">{title}</span>
        <span
          className="text-xl w-10 h-10 rounded-xl flex items-center justify-center shrink-0"
          style={{ background: `${color}15` }}
        >
          {icon}
        </span>
      </div>
      <span className="text-2xl sm:text-[28px] font-bold text-gray-900 dark:text-white tracking-tight">
        {typeof value === 'number' ? value.toLocaleString('fr-FR') : value}
      </span>
    </div>
  );
}

// ============================================
// PAGE HEADER
// ============================================
export function PageHeader({
  title,
  subtitle,
  action,
}: {
  title: string;
  subtitle?: string;
  action?: React.ReactNode;
}) {
  return (
    <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-3 mb-8">
      <div>
        <h1 className="text-2xl sm:text-[28px] font-bold text-gray-900 dark:text-white mb-1 tracking-tight">
          {title}
        </h1>
        {subtitle && <p className="text-sm text-gray-500 dark:text-gray-400 m-0">{subtitle}</p>}
      </div>
      {action}
    </div>
  );
}

// ============================================
// EMPTY STATE
// ============================================
export function EmptyState({
  icon,
  title,
  description,
  action,
}: {
  icon: string;
  title: string;
  description: string;
  action?: React.ReactNode;
}) {
  return (
    <div className="text-center py-16 px-5 bg-gray-50 dark:bg-gray-900/50 rounded-2xl border-2 border-dashed border-gray-200 dark:border-gray-700">
      <span className="text-5xl block">{icon}</span>
      <h3 className="text-lg font-semibold text-gray-700 dark:text-gray-300 mt-4 mb-2">{title}</h3>
      <p className="text-sm text-gray-500 dark:text-gray-400 mb-5">{description}</p>
      {action}
    </div>
  );
}

// ============================================
// PRIMARY BUTTON
// ============================================
export function PrimaryButton({
  children,
  onClick,
  href,
  style: customStyle,
  className: extraClass,
}: {
  children: React.ReactNode;
  onClick?: () => void;
  href?: string;
  style?: React.CSSProperties;
  className?: string;
}) {
  const cls = `inline-flex items-center gap-2 px-5 py-3 rounded-xl text-sm font-semibold
    bg-gradient-to-br from-emerald-600 to-emerald-500 dark:from-emerald-500 dark:to-emerald-600
    text-white border-0 cursor-pointer no-underline shadow-md shadow-emerald-600/20
    hover:shadow-lg hover:shadow-emerald-600/30 hover:-translate-y-0.5
    active:translate-y-0 transition-all duration-200 ${extraClass || ''}`;

  if (href) {
    return (
      <a href={href} className={cls} style={customStyle}>
        {children}
      </a>
    );
  }
  return (
    <button onClick={onClick} className={cls} style={customStyle}>
      {children}
    </button>
  );
}

// ============================================
// FILTER BAR (reusable filter pills)
// ============================================
export function FilterBar({
  options,
  active,
  onChange,
  accentColor,
}: {
  options: { value: string; label: string }[];
  active: string;
  onChange: (value: string) => void;
  accentColor?: string;
}) {
  return (
    <div className="flex flex-wrap gap-2 mb-6" role="tablist" aria-label="Filtres">
      {options.map((opt) => {
        const isActive = active === opt.value;
        return (
          <button
            key={opt.value}
            onClick={() => onChange(opt.value)}
            role="tab"
            aria-selected={isActive}
            className={`px-4 py-2 rounded-lg text-[13px] font-medium border cursor-pointer transition-all duration-200
              focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-500
              ${
                isActive
                  ? 'text-white border-transparent shadow-sm'
                  : 'bg-white dark:bg-gray-900 text-gray-600 dark:text-gray-400 border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-800'
              }`}
            style={
              isActive
                ? { background: accentColor || '#009e49', borderColor: accentColor || '#009e49' }
                : undefined
            }
          >
            {opt.label}
          </button>
        );
      })}
    </div>
  );
}

// ============================================
// DATA TABLE WRAPPER (consistent styling)
// ============================================
export function DataTableWrapper({ children }: { children: React.ReactNode }) {
  return (
    <div className="bg-white dark:bg-gray-900 rounded-2xl overflow-hidden border border-gray-100 dark:border-gray-800 shadow-sm">
      <div className="overflow-x-auto">
        <table className="w-full border-collapse text-sm">{children}</table>
      </div>
    </div>
  );
}

export function TableHead({ children }: { children: React.ReactNode }) {
  return (
    <thead>
      <tr className="border-b border-gray-100 dark:border-gray-800 bg-gray-50/80 dark:bg-gray-800/50">
        {children}
      </tr>
    </thead>
  );
}

export function Th({
  children,
  align = 'left',
}: {
  children: React.ReactNode;
  align?: 'left' | 'right' | 'center';
}) {
  return (
    <th
      className={`px-5 py-3.5 font-semibold text-xs uppercase text-gray-500 dark:text-gray-400 tracking-wide text-${align}`}
    >
      {children}
    </th>
  );
}

export function Td({
  children,
  align = 'left',
  className: extra,
}: {
  children: React.ReactNode;
  align?: 'left' | 'right' | 'center';
  className?: string;
}) {
  return <td className={`px-5 py-4 text-${align} ${extra || ''}`}>{children}</td>;
}

export function Tr({ children, onClick }: { children: React.ReactNode; onClick?: () => void }) {
  return (
    <tr
      onClick={onClick}
      className="border-b border-gray-50 dark:border-gray-800/50 hover:bg-gray-50/60 dark:hover:bg-gray-800/30 transition-colors cursor-pointer"
    >
      {children}
    </tr>
  );
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
    day: '2-digit',
    month: 'long',
    year: 'numeric',
  }).format(new Date(date));
}
