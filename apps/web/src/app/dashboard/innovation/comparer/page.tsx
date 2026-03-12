'use client';

import React, { Suspense, useMemo } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { ArrowLeft } from 'lucide-react';
import { PageHeader } from '@/components/ui';
import CompareTable from '@/components/innovation/CompareTable';
import { getSolutionById } from '@/lib/mock/innovation-data';

function ComparerContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const idsParam = searchParams.get('ids') || '';

  const solutions = useMemo(() => {
    return idsParam.split(',').filter(Boolean).map(getSolutionById).filter((s): s is NonNullable<typeof s> => !!s);
  }, [idsParam]);

  const handleRemove = (id: string) => {
    const newIds = idsParam.split(',').filter(x => x !== id).join(',');
    router.push(`/dashboard/innovation/comparer?ids=${newIds}`);
  };

  return (
    <div>
      <button onClick={() => router.back()} className="flex items-center gap-2 text-sm text-gray-500 hover:text-violet-600 bg-transparent border-none cursor-pointer mb-4 p-0">
        <ArrowLeft size={16} /> Retour
      </button>

      <PageHeader title="⚖ Comparer les solutions" subtitle={`${solutions.length} solution${solutions.length > 1 ? 's' : ''} sélectionnée${solutions.length > 1 ? 's' : ''}`} />

      <CompareTable solutions={solutions} onRemove={handleRemove} />
    </div>
  );
}

export default function ComparerPage() {
  return (
    <Suspense fallback={<div className="flex items-center justify-center min-h-[40vh]"><div className="animate-spin rounded-full h-8 w-8 border-b-2 border-violet-600" /></div>}>
      <ComparerContent />
    </Suspense>
  );
}
