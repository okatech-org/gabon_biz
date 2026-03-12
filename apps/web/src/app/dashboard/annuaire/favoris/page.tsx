'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Heart, Trash2 } from 'lucide-react';
import DashboardLayout from '@/components/DashboardLayout';
import EnterpriseCard from '@/components/annuaire/EnterpriseCard';
import { getEnterpriseById, type AnnuaireEnterprise } from '@/lib/annuaire-data';

function loadFavorites(): AnnuaireEnterprise[] {
  if (typeof window === 'undefined') return [];
  const ids: string[] = JSON.parse(localStorage.getItem('gabon-biz-favs') || '[]');
  return ids.map(getEnterpriseById).filter(Boolean) as AnnuaireEnterprise[];
}

export default function FavorisPage() {
  const [favorites, setFavorites] = useState<AnnuaireEnterprise[]>(loadFavorites);

  const removeFav = (id: string) => {
    const ids: string[] = JSON.parse(localStorage.getItem('gabon-biz-favs') || '[]');
    const next = ids.filter((i) => i !== id);
    localStorage.setItem('gabon-biz-favs', JSON.stringify(next));
    setFavorites(next.map(getEnterpriseById).filter(Boolean) as AnnuaireEnterprise[]);
  };

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white m-0">❤️ Mes Entreprises Suivies</h1>
          <p className="text-sm text-gray-500 dark:text-gray-400 m-0 mt-1">{favorites.length} entreprise{favorites.length !== 1 ? 's' : ''} dans vos favoris</p>
        </div>

        {favorites.length > 0 ? (
          <div className="space-y-4">
            {favorites.map((e, i) => (
              <div key={e.id} className="relative">
                <EnterpriseCard enterprise={e} index={i} />
                <button
                  onClick={() => removeFav(e.id)}
                  className="absolute top-6 right-4 p-1.5 rounded-full bg-red-50 dark:bg-red-900/20 text-red-500 hover:bg-red-100 dark:hover:bg-red-900/30 border-none cursor-pointer transition-colors z-10"
                  title="Retirer des favoris"
                >
                  <Trash2 size={14} />
                </button>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-20">
            <Heart size={48} className="mx-auto mb-4 text-gray-300 dark:text-gray-600" />
            <p className="text-gray-500 dark:text-gray-400 mb-4">Aucune entreprise dans vos favoris</p>
            <Link
              href="/dashboard/annuaire"
              className="text-emerald-600 dark:text-emerald-400 font-semibold no-underline hover:underline"
            >
              Parcourir l&apos;annuaire →
            </Link>
          </div>
        )}
      </div>
    </DashboardLayout>
  );
}
