'use client';

import React from 'react';
import { Brain } from 'lucide-react';
import MentorCard from '@/components/incubateur/MentorCard';
import { MENTORS } from '@/lib/mock/incubateur-startups';

export default function MentoringPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-purple-500 to-violet-600 flex items-center justify-center text-white">
          <Brain size={18} />
        </div>
        <div>
          <h1 className="text-xl font-black text-gray-900 dark:text-white">Mentorat IA</h1>
          <p className="text-sm text-gray-500">
            {MENTORS.length} mentors disponibles — matching intelligent
          </p>
        </div>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
        {MENTORS.map((m, i) => (
          <MentorCard key={m.id} mentor={m} index={i} />
        ))}
      </div>
    </div>
  );
}
