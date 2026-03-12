'use client';

import { useParams } from 'next/navigation';
import Link from 'next/link';
import { ChevronRight, ArrowLeft } from 'lucide-react';
import { getEnterpriseByRccm, ENTERPRISES } from '@/lib/annuaire-data';
import EnterpriseFiche from '@/components/annuaire/EnterpriseFiche';
import EnterpriseCard from '@/components/annuaire/EnterpriseCard';
import { useI18n } from '@/lib/i18n/i18nContext';

export default function EnterprisePage() {
  const { tr } = useI18n();
  const params = useParams();
  const rccm = decodeURIComponent(params.rccm as string);
  const enterprise = getEnterpriseByRccm(rccm);

  if (!enterprise) {
    return (
      <div className="pt-28 pb-20 px-6">
        <div className="max-w-3xl mx-auto text-center">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">{tr('ann.not_found_title')}</h1>
          <p className="text-gray-500 dark:text-gray-400 mb-6">
            {tr('ann.no_match')} <strong className="font-mono">{rccm}</strong>.
          </p>
          <Link href="/annuaire" className="inline-flex items-center gap-2 text-emerald-600 dark:text-emerald-400 font-semibold no-underline hover:underline">
            <ArrowLeft size={16} /> {tr('ann.back')}
          </Link>
        </div>
      </div>
    );
  }

  // Similar enterprises: same sector, different ID
  const similar = ENTERPRISES
    .filter((e) => e.sector.id === enterprise.sector.id && e.id !== enterprise.id && e.status === 'ACTIVE')
    .slice(0, 3);

  return (
    <div className="pt-24 pb-20 px-6">
      <div className="max-w-4xl mx-auto">
        {/* Breadcrumb */}
        <nav className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400 mb-6">
          <Link href="/" className="hover:text-emerald-500 no-underline transition-colors">{tr('ann.home')}</Link>
          <ChevronRight size={14} />
          <Link href="/annuaire" className="hover:text-emerald-500 no-underline transition-colors">{tr('ann.directory')}</Link>
          <ChevronRight size={14} />
          <span className="text-gray-900 dark:text-white font-medium truncate">{enterprise.name}</span>
        </nav>

        {/* Fiche */}
        <EnterpriseFiche enterprise={enterprise} />

        {/* Similar enterprises */}
        {similar.length > 0 && (
          <section className="mt-12">
            <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-6">
              {tr('ann.similar')}
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {similar.map((e, i) => (
                <EnterpriseCard key={e.id} enterprise={e} index={i} />
              ))}
            </div>
          </section>
        )}
      </div>
    </div>
  );
}
