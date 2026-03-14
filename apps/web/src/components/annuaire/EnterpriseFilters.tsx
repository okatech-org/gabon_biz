'use client';

import { useState, useRef, useEffect } from 'react';
import { X, ChevronDown, SlidersHorizontal, Search, ChevronLeft as ScrollLeft, ChevronRight as ScrollRight } from 'lucide-react';
import { PROVINCES, LEGAL_FORMS } from '@/lib/annuaire-data';
import { useI18n } from '@/lib/i18n/i18nContext';

interface FiltersProps {
  filters: {
    sector?: string;
    province?: string;
    legalForm?: string;
    status?: string;
    digitalOnly?: boolean;
    singOnly?: boolean;
  };
  onChange: (filters: FiltersProps['filters']) => void;
  totalResults: number;
  /* Search bar — integrated into filter zone */
  query?: string;
  onQueryChange?: (q: string) => void;
}

/* ── Styled select dropdown ────────────────────────────────────── */
function FilterSelect({
  value,
  options,
  placeholder,
  onChange,
  accentColor = '#10b981',
}: {
  value: string;
  options: { value: string; label: string }[];
  placeholder: string;
  onChange: (v: string) => void;
  accentColor?: string;
}) {
  const isActive = !!value;
  return (
    <div className="relative">
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className={`appearance-none text-xs font-medium pl-3 pr-8 py-2 rounded-xl border cursor-pointer transition-all duration-200 outline-none
          ${isActive
            ? 'text-white border-transparent'
            : 'bg-white dark:bg-gray-900 border-gray-200 dark:border-gray-700 text-gray-600 dark:text-gray-400 hover:border-gray-300 dark:hover:border-gray-600'
          }`}
        style={isActive ? { background: accentColor } : undefined}
      >
        <option value="">{placeholder}</option>
        {options.map((o) => (
          <option key={o.value} value={o.value}>{o.label}</option>
        ))}
      </select>
      <ChevronDown
        size={13}
        className={`absolute right-2.5 top-1/2 -translate-y-1/2 pointer-events-none ${isActive ? 'text-white/70' : 'text-gray-400 dark:text-gray-500'}`}
      />
    </div>
  );
}

/* ── Small toggle chip ─────────────────────────────────────────── */
function Chip({ label, active, color, onClick }: { label: string; active: boolean; color?: string; onClick: () => void }) {
  return (
    <button
      onClick={onClick}
      className={`inline-flex items-center gap-1 text-xs font-medium px-2.5 py-1.5 rounded-lg border-none cursor-pointer transition-all duration-200 whitespace-nowrap ${
        active
          ? 'text-white'
          : 'bg-gray-100 dark:bg-gray-800 text-gray-500 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-700'
      }`}
      style={active ? { background: color || '#10b981' } : undefined}
    >
      {label}
    </button>
  );
}

export default function EnterpriseFilters({ filters, onChange, totalResults, query, onQueryChange }: FiltersProps) {
  const { tr } = useI18n();
  const [expanded, setExpanded] = useState(false);

  const update = (key: string, value: string | boolean) => {
    onChange({ ...filters, [key]: value || undefined });
  };

  const reset = () => {
    onChange({});
    onQueryChange?.('');
  };

  const hasFilters = Object.values(filters).some(Boolean);
  const hasAny = hasFilters || !!query;

  /* Count active filters for badge */
  const activeCount = [filters.province, filters.legalForm, filters.status, filters.digitalOnly, filters.singOnly].filter(Boolean).length + (query ? 1 : 0);

  return (
    <div className="space-y-3">
      {/* ═══ ROW 1 — Search + Dropdowns ═══ */}
      <div className="flex items-center gap-2 flex-wrap">
        {/* Integrated search bar */}
        {onQueryChange && (
          <div className="relative flex-1 min-w-[180px] max-w-sm">
            <Search size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 dark:text-gray-500 pointer-events-none" />
            <input
              type="text"
              value={query || ''}
              onChange={(e) => onQueryChange(e.target.value)}
              placeholder={tr('ann.search_ph') || 'Rechercher...'}
              className="w-full bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-xl text-xs text-gray-700 dark:text-gray-300 placeholder:text-gray-400 dark:placeholder:text-gray-500 pl-9 pr-8 py-2 focus:outline-none focus:ring-2 focus:ring-emerald-500/30 focus:border-emerald-400/50 transition-all"
            />
            {query && (
              <button
                onClick={() => onQueryChange('')}
                className="absolute right-2.5 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 bg-transparent border-none cursor-pointer p-0 flex"
              >
                <X size={13} />
              </button>
            )}
          </div>
        )}

        {/* Filter toggle */}
        <button
          onClick={() => setExpanded(!expanded)}
          className={`inline-flex items-center gap-1.5 text-xs font-semibold px-3 py-2 rounded-xl border cursor-pointer transition-all duration-200
            ${expanded || hasFilters
              ? 'bg-emerald-50 dark:bg-emerald-900/20 text-emerald-600 dark:text-emerald-400 border-emerald-200 dark:border-emerald-800'
              : 'bg-white dark:bg-gray-900 text-gray-500 dark:text-gray-400 border-gray-200 dark:border-gray-700 hover:border-gray-300 dark:hover:border-gray-600'
            }`}
        >
          <SlidersHorizontal size={13} />
          {tr('ann.filters') || 'Filtres'}
          {activeCount > 0 && (
            <span className="bg-emerald-500 text-white text-[10px] font-bold px-1.5 py-0.5 rounded-full leading-none">
              {activeCount}
            </span>
          )}
        </button>

        {/* Province dropdown */}
        <FilterSelect
          value={filters.province || ''}
          placeholder={tr('ann.all_provinces') || 'Province'}
          accentColor="#10b981"
          options={PROVINCES.map((p) => ({ value: p, label: p }))}
          onChange={(v) => update('province', v)}
        />

        {/* Legal Form dropdown */}
        <FilterSelect
          value={filters.legalForm || ''}
          placeholder={tr('ann.legal_form') || 'Forme juridique'}
          accentColor="#3b82f6"
          options={LEGAL_FORMS.map((f) => ({ value: f, label: f }))}
          onChange={(v) => update('legalForm', v)}
        />

        {/* Separator */}
        <div className="hidden sm:block w-px h-5 bg-gray-200 dark:bg-gray-700 mx-1" />

        {/* Status chips — NO extra emojis, translations already include them */}
        <div className="flex items-center gap-1.5">
          <Chip label={tr('ann.all_count') || 'Tous'} active={!filters.status} color="#6b7280" onClick={() => update('status', '')} />
          <Chip label={tr('ann.active') || 'Actif'} active={filters.status === 'ACTIVE'} color="#10b981" onClick={() => update('status', 'ACTIVE')} />
          <Chip label={tr('ann.suspended') || 'Suspendu'} active={filters.status === 'SUSPENDED'} color="#f59e0b" onClick={() => update('status', 'SUSPENDED')} />
          <Chip label={tr('ann.closed') || 'Radié'} active={filters.status === 'CLOSED'} color="#ef4444" onClick={() => update('status', 'CLOSED')} />
        </div>
      </div>

      {/* ═══ ROW 2 — Expandable digital filters ═══ */}
      {(expanded || filters.digitalOnly || filters.singOnly) && (
        <div className="flex items-center gap-2 flex-wrap pl-0.5">
          <span className="text-[10px] font-semibold text-gray-400 dark:text-gray-500 uppercase tracking-wider">{tr('ann.digital') || 'Digital'}</span>
          <Chip label="Toutes" active={!filters.digitalOnly && !filters.singOnly} color="#6b7280" onClick={() => { update('digitalOnly', false); update('singOnly', false); }} />
          <Chip label="🚀 Numérique" active={!!filters.digitalOnly} color="#8b5cf6" onClick={() => { onChange({ ...filters, digitalOnly: !filters.digitalOnly, singOnly: false }); }} />
          <Chip label="🚀 Incubé SING" active={!!filters.singOnly} color="#10b981" onClick={() => { onChange({ ...filters, singOnly: !filters.singOnly, digitalOnly: false }); }} />
        </div>
      )}

      {/* ═══ Active filter tags + Reset + result count ═══ */}
      {hasAny && (
        <div className="flex items-center justify-between pt-1.5 border-t border-gray-200/50 dark:border-white/6">
          <div className="flex items-center gap-1.5 flex-wrap">
            {query && (
              <span className="inline-flex items-center gap-1 text-[11px] font-medium px-2 py-1 rounded-lg bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300">
                🔍 &ldquo;{query}&rdquo;
                <button onClick={() => onQueryChange?.('')} className="bg-transparent border-none cursor-pointer text-gray-400 hover:text-gray-600 p-0 flex"><X size={11} /></button>
              </span>
            )}
            {filters.province && (
              <span className="inline-flex items-center gap-1 text-[11px] font-medium px-2 py-1 rounded-lg bg-emerald-50 dark:bg-emerald-900/20 text-emerald-700 dark:text-emerald-400">
                📍 {filters.province}
                <button onClick={() => update('province', '')} className="bg-transparent border-none cursor-pointer text-emerald-400 hover:text-emerald-600 p-0 flex"><X size={11} /></button>
              </span>
            )}
            {filters.legalForm && (
              <span className="inline-flex items-center gap-1 text-[11px] font-medium px-2 py-1 rounded-lg bg-blue-50 dark:bg-blue-900/20 text-blue-700 dark:text-blue-400">
                📋 {filters.legalForm}
                <button onClick={() => update('legalForm', '')} className="bg-transparent border-none cursor-pointer text-blue-400 hover:text-blue-600 p-0 flex"><X size={11} /></button>
              </span>
            )}
            {filters.status && (
              <span className="inline-flex items-center gap-1 text-[11px] font-medium px-2 py-1 rounded-lg bg-amber-50 dark:bg-amber-900/20 text-amber-700 dark:text-amber-400">
                {filters.status === 'ACTIVE' ? '✅' : filters.status === 'SUSPENDED' ? '⏸' : '❌'} {filters.status}
                <button onClick={() => update('status', '')} className="bg-transparent border-none cursor-pointer text-amber-400 hover:text-amber-600 p-0 flex"><X size={11} /></button>
              </span>
            )}
            {(filters.digitalOnly || filters.singOnly) && (
              <span className="inline-flex items-center gap-1 text-[11px] font-medium px-2 py-1 rounded-lg bg-purple-50 dark:bg-purple-900/20 text-purple-700 dark:text-purple-400">
                🚀 {filters.singOnly ? 'SING' : 'Numérique'}
                <button onClick={() => { update('digitalOnly', false); update('singOnly', false); }} className="bg-transparent border-none cursor-pointer text-purple-400 hover:text-purple-600 p-0 flex"><X size={11} /></button>
              </span>
            )}

            {/* Reset all */}
            <button
              onClick={reset}
              className="flex items-center gap-1 text-[11px] font-medium text-red-500 hover:text-red-600 bg-transparent border-none cursor-pointer transition-colors p-0 ml-1"
            >
              <X size={12} /> {tr('ann.reset') || 'Réinitialiser'}
            </button>
          </div>

          <span className="text-xs text-gray-500 dark:text-gray-400 whitespace-nowrap">
            <strong className="text-gray-900 dark:text-white">{totalResults}</strong> {totalResults !== 1 ? tr('ann.enterprises_pl') : tr('ann.enterprises')}
          </span>
        </div>
      )}
    </div>
  );
}
