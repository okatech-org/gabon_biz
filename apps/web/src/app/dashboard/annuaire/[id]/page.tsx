'use client';

import { useParams } from 'next/navigation';
import Link from 'next/link';
import { ChevronRight, ArrowLeft, MessageSquare, Bell } from 'lucide-react';
import { getEnterpriseById } from '@/lib/annuaire-data';
import EnterpriseFiche from '@/components/annuaire/EnterpriseFiche';
import FavoriteButton from '@/components/annuaire/FavoriteButton';

export default function DashboardEnterpriseDetailPage() {
  const params = useParams();
  const enterprise = getEnterpriseById(params.id as string);

  if (!enterprise) {
    return (
      <div className="text-center py-20">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Entreprise non trouvée</h1>
        <Link href="/dashboard/annuaire" className="text-emerald-600 dark:text-emerald-400 no-underline hover:underline">
          <ArrowLeft size={16} className="inline mr-1" /> Retour à l&apos;annuaire
        </Link>
      </div>
    );
  }

  return (
    <>
      {/* Breadcrumb */}
      <nav className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400 mb-6">
        <Link href="/dashboard/annuaire" className="hover:text-emerald-500 no-underline transition-colors">Annuaire</Link>
        <ChevronRight size={14} />
        <span className="text-gray-900 dark:text-white font-medium truncate">{enterprise.name}</span>
      </nav>

      {/* Actions bar */}
      <div className="flex items-center justify-end gap-2 mb-4">
        <FavoriteButton enterpriseId={enterprise.id} />
        <button className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400 border-none cursor-pointer hover:bg-blue-100 dark:hover:bg-blue-900/30 transition-colors">
          <MessageSquare size={14} /> Contacter
        </button>
        <button className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium bg-amber-50 dark:bg-amber-900/20 text-amber-600 dark:text-amber-400 border-none cursor-pointer hover:bg-amber-100 dark:hover:bg-amber-900/30 transition-colors">
          <Bell size={14} /> Surveiller
        </button>
      </div>

      <EnterpriseFiche enterprise={enterprise} />
    </>
  );
}
