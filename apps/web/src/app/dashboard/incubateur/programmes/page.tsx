'use client';

import React from 'react';
import { BookOpen } from 'lucide-react';
import ProgrammeCard from '@/components/incubateur/ProgrammeCard';
import { PROGRAMMES_REELS } from '@/lib/mock/incubateur-data';

export default function ProgrammesPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 rounded-xl bg-linear-to-br from-blue-500 to-cyan-600 flex items-center justify-center text-white">
          <BookOpen size={18} />
        </div>
        <div>
          <h1 className="text-xl font-black text-gray-900 dark:text-white">Programmes</h1>
          <p className="text-sm text-gray-500">
            {PROGRAMMES_REELS.length} programmes d&apos;incubation et d&apos;accélération
          </p>
        </div>
      </div>
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
        {PROGRAMMES_REELS.map((p, i) => (
          <ProgrammeCard key={p.id} programme={p} index={i} />
        ))}
      </div>
    </div>
  );
}
