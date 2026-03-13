'use client';

import React from 'react';
import { Calendar } from 'lucide-react';
import EventCard from '@/components/incubateur/EventCard';
import { EVENEMENTS } from '@/lib/mock/incubateur-startups';

export default function EvenementsPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 rounded-xl bg-linear-to-br from-red-500 to-rose-600 flex items-center justify-center text-white">
          <Calendar size={18} />
        </div>
        <div>
          <h1 className="text-xl font-black text-gray-900 dark:text-white">Événements</h1>
          <p className="text-sm text-gray-500">Hackathons, ateliers, Demo Days & conférences</p>
        </div>
      </div>
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
        {EVENEMENTS.map((e, i) => (
          <EventCard key={e.id} event={e} index={i} />
        ))}
      </div>
    </div>
  );
}
