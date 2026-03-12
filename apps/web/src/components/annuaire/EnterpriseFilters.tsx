'use client';

import { X } from 'lucide-react';
import { PROVINCES, LEGAL_FORMS } from '@/lib/annuaire-data';
import { useI18n } from '@/lib/i18n/i18nContext';

interface FiltersProps {
  filters: {
    sector?: string;
    province?: string;
    legalForm?: string;
    status?: string;
    digitalOnly?: boolean;
  };
  onChange: (filters: FiltersProps['filters']) => void;
  totalResults: number;
}

/* Reusable chip component — same pattern as innovation-hub FilterPanel */
function Chip({ label, active, color, onClick }: { label: string; active: boolean; color?: string; onClick: () => void }) {
  return (
    <button
      onClick={onClick}
      className={`inline-flex items-center gap-1.5 text-xs font-medium px-3 py-1.5 rounded-full border-none cursor-pointer transition-all duration-200 ${
        active
          ? 'text-white shadow-md'
          : 'bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-700'
      }`}
      style={active ? { background: color || '#10b981' } : undefined}
    >
      {label}
    </button>
  );
}

export default function EnterpriseFilters({ filters, onChange, totalResults }: FiltersProps) {
  const { tr } = useI18n();

  const update = (key: string, value: string | boolean) => {
    onChange({ ...filters, [key]: value || undefined });
  };

  const reset = () => onChange({});

  const hasFilters = Object.values(filters).some(Boolean);

  return (
    <div className="space-y-4">
      {/* Province */}
      <div>
        <label className="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-2 block">{tr('ann.all_provinces') || 'Province'}</label>
        <div className="flex flex-wrap gap-2">
          <Chip label={tr('ann.all_count') || 'Toutes'} active={!filters.province} color="#6b7280" onClick={() => update('province', '')} />
          {PROVINCES.map((p) => (
            <Chip key={p} label={p} active={filters.province === p} color="#10b981" onClick={() => update('province', p)} />
          ))}
        </div>
      </div>

      {/* Legal Form */}
      <div>
        <label className="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-2 block">{tr('ann.legal_form') || 'Forme juridique'}</label>
        <div className="flex flex-wrap gap-2">
          <Chip label={tr('ann.all_count') || 'Toutes'} active={!filters.legalForm} color="#6b7280" onClick={() => update('legalForm', '')} />
          {LEGAL_FORMS.map((f) => (
            <Chip key={f} label={f} active={filters.legalForm === f} color="#3b82f6" onClick={() => update('legalForm', f)} />
          ))}
        </div>
      </div>

      {/* Status */}
      <div>
        <label className="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-2 block">{tr('ann.all_statuses') || 'Statut'}</label>
        <div className="flex flex-wrap gap-2">
          <Chip label={tr('ann.all_count') || 'Tous'} active={!filters.status} color="#6b7280" onClick={() => update('status', '')} />
          <Chip label={tr('ann.active') || 'Actif'} active={filters.status === 'ACTIVE'} color="#10b981" onClick={() => update('status', 'ACTIVE')} />
          <Chip label={tr('ann.suspended') || 'Suspendu'} active={filters.status === 'SUSPENDED'} color="#f59e0b" onClick={() => update('status', 'SUSPENDED')} />
          <Chip label={tr('ann.closed') || 'Fermé'} active={filters.status === 'CLOSED'} color="#ef4444" onClick={() => update('status', 'CLOSED')} />
        </div>
      </div>

      {/* Digital only */}
      <div>
        <label className="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-2 block">{tr('ann.digital') || 'Écosystème numérique'}</label>
        <div className="flex flex-wrap gap-2">
          <Chip label="Toutes les entreprises" active={!filters.digitalOnly} color="#6b7280" onClick={() => update('digitalOnly', false)} />
          <Chip label="🚀 Numérique uniquement" active={!!filters.digitalOnly} color="#8b5cf6" onClick={() => update('digitalOnly', !filters.digitalOnly)} />
        </div>
      </div>

      {/* Reset + result count */}
      {hasFilters && (
        <div className="flex items-center justify-between pt-2 border-t border-gray-200/50 dark:border-white/6">
          <button
            onClick={reset}
            className="flex items-center gap-1 text-xs font-medium text-red-500 hover:text-red-600 bg-transparent border-none cursor-pointer transition-colors p-0"
          >
            <X size={14} /> {tr('ann.reset') || 'Réinitialiser'}
          </button>
          <span className="text-xs text-gray-500 dark:text-gray-400">
            <strong className="text-gray-900 dark:text-white">{totalResults}</strong> {totalResults !== 1 ? tr('ann.enterprises_pl') : tr('ann.enterprises')}
          </span>
        </div>
      )}
    </div>
  );
}
