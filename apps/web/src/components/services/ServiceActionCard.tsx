'use client';

// Reusable card component for service actions (booking, registration, etc.)

import React from 'react';
import { ArrowRight, Clock, MapPin, Users, Calendar } from 'lucide-react';

interface ActionCardProps {
  title: string;
  subtitle?: string;
  status?: { label: string; color: string };
  details?: { icon: 'clock' | 'location' | 'users' | 'calendar' | 'custom'; label: string }[];
  actionLabel?: string;
  onAction?: () => void;
  accentColor?: string;
  disabled?: boolean;
  loading?: boolean;
  index?: number;
  children?: React.ReactNode;
}

const DETAIL_ICONS = {
  clock: Clock,
  location: MapPin,
  users: Users,
  calendar: Calendar,
  custom: Clock,
};

export function ServiceActionCard({
  title,
  subtitle,
  status,
  details = [],
  actionLabel = 'Accéder',
  onAction,
  accentColor = '#009e49',
  disabled = false,
  loading = false,
  index: _index = 0,
  children,
}: ActionCardProps) {
  return (
    <div className="group bg-white dark:bg-gray-900 rounded-2xl border border-gray-200 dark:border-gray-800 p-5 hover:border-gray-300 dark:hover:border-gray-700 transition-all">
      {/* Header */}
      <div className="flex items-start justify-between gap-3 mb-3">
        <div className="flex-1 min-w-0">
          <h4 className="text-[15px] font-bold text-gray-900 dark:text-white leading-snug mb-1">
            {title}
          </h4>
          {subtitle && <p className="text-xs text-gray-500 dark:text-gray-400">{subtitle}</p>}
        </div>
        {status && (
          <span
            className="px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wide whitespace-nowrap shrink-0"
            style={{ background: `${status.color}15`, color: status.color }}
          >
            {status.label}
          </span>
        )}
      </div>

      {/* Details row */}
      {details.length > 0 && (
        <div className="flex flex-wrap gap-3 mb-4">
          {details.map((d, i) => {
            const Icon = DETAIL_ICONS[d.icon] || Clock;
            return (
              <span
                key={i}
                className="flex items-center gap-1.5 text-xs text-gray-500 dark:text-gray-400"
              >
                <Icon size={13} className="shrink-0" />
                {d.label}
              </span>
            );
          })}
        </div>
      )}

      {/* Custom content */}
      {children}

      {/* Action button */}
      {onAction && (
        <button
          onClick={onAction}
          disabled={disabled || loading}
          className="mt-3 w-full flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl text-sm font-bold text-white transition-all hover:scale-[1.02] disabled:opacity-50 disabled:cursor-not-allowed"
          style={{ background: disabled ? '#9ca3af' : accentColor }}
        >
          {loading ? (
            <span className="animate-spin">⏳</span>
          ) : (
            <>
              {actionLabel} <ArrowRight size={14} />
            </>
          )}
        </button>
      )}
    </div>
  );
}

/* ═══════ SEARCH INPUT ═══════ */

export function ServiceSearchInput({
  placeholder = 'Rechercher...',
  value,
  onChange,
  onSearch,
  accentColor = '#009e49',
}: {
  placeholder?: string;
  value: string;
  onChange: (v: string) => void;
  onSearch?: () => void;
  accentColor?: string;
}) {
  return (
    <div className="flex gap-2 mb-6">
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        onKeyDown={(e) => e.key === 'Enter' && onSearch?.()}
        placeholder={placeholder}
        className="flex-1 px-4 py-3 rounded-xl bg-gray-100 dark:bg-white/5 border border-gray-200 dark:border-white/10 text-sm text-gray-900 dark:text-white placeholder:text-gray-400 dark:placeholder:text-gray-500 focus:outline-none focus:ring-2 transition-all"
        style={{ '--tw-ring-color': `${accentColor}40` } as React.CSSProperties}
      />
      {onSearch && (
        <button
          onClick={onSearch}
          className="px-5 py-3 rounded-xl text-sm font-bold text-white transition-all hover:scale-[1.02]"
          style={{ background: accentColor }}
        >
          Rechercher
        </button>
      )}
    </div>
  );
}

/* ═══════ STAT MINI CARD ═══════ */

export function ServiceStatMini({
  icon,
  label,
  value,
  color,
}: {
  icon: React.ReactNode;
  label: string;
  value: string | number;
  color: string;
}) {
  return (
    <div className="p-4 rounded-xl bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800">
      <div className="flex items-center gap-2 mb-2">
        <div
          className="w-8 h-8 rounded-lg flex items-center justify-center"
          style={{ background: `${color}15` }}
        >
          {icon}
        </div>
        <span className="text-[11px] font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">
          {label}
        </span>
      </div>
      <div className="text-xl font-extrabold text-gray-900 dark:text-white">{value}</div>
    </div>
  );
}
