'use client';

import { useState } from 'react';
import DashboardLayout from '@/components/DashboardLayout';
import EcosystemMap from '@/components/annuaire/EcosystemMap';
import EnterpriseCard from '@/components/annuaire/EnterpriseCard';
import { ENTERPRISES, SECTORS, getEnterprisesByProvince } from '@/lib/annuaire-data';

export default function CartePage() {
  const [selectedProvince, setSelectedProvince] = useState<string | undefined>();
  const [selectedSector, setSelectedSector] = useState<string | undefined>();

  const provinces = [...new Set(ENTERPRISES.map((e) => e.address.province))].sort();
  const filteredByProvince = selectedProvince ? getEnterprisesByProvince(selectedProvince) : ENTERPRISES;
  const filtered = selectedSector
    ? filteredByProvince.filter((e) => e.sector.slug === selectedSector)
    : filteredByProvince;

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white m-0">🗺️ Cartographie des Entreprises</h1>
          <p className="text-sm text-gray-500 dark:text-gray-400 m-0 mt-1">Visualisez la répartition géographique</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Map */}
          <div>
            <EcosystemMap />
          </div>

          {/* Filters + list */}
          <div className="space-y-4">
            {/* Province select */}
            <div className="flex gap-3">
              <select
                value={selectedProvince || ''}
                onChange={(e) => setSelectedProvince(e.target.value || undefined)}
                className="flex-1 px-3 py-2.5 rounded-xl text-sm bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-300"
              >
                <option value="">Toutes les provinces ({ENTERPRISES.length})</option>
                {provinces.map((p) => (
                  <option key={p} value={p}>{p} ({getEnterprisesByProvince(p).length})</option>
                ))}
              </select>
              <select
                value={selectedSector || ''}
                onChange={(e) => setSelectedSector(e.target.value || undefined)}
                className="flex-1 px-3 py-2.5 rounded-xl text-sm bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-300"
              >
                <option value="">Tous les secteurs</option>
                {SECTORS.map((s) => (
                  <option key={s.id} value={s.slug}>{s.icon} {s.name}</option>
                ))}
              </select>
            </div>

            {/* Results */}
            <div className="text-sm text-gray-500 dark:text-gray-400">
              {filtered.length} entreprise{filtered.length !== 1 ? 's' : ''}
              {selectedProvince && ` en ${selectedProvince}`}
            </div>

            <div className="space-y-3 max-h-[600px] overflow-y-auto pr-1">
              {filtered.slice(0, 20).map((e, i) => (
                <EnterpriseCard key={e.id} enterprise={e} index={i} />
              ))}
              {filtered.length === 0 && (
                <div className="text-center py-8 text-gray-400">Aucune entreprise dans cette zone.</div>
              )}
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
