'use client';
import React from 'react';
import { motion } from 'framer-motion';
import { MapPin, Calendar, Users, Trophy, ArrowRight } from 'lucide-react';
import type { Evenement } from '@/lib/mock/incubateur-types';

const TYPE_CONFIG: Record<string, { label: string; color: string }> = {
  HACKATHON: { label: 'Hackathon', color: '#EF4444' },
  CONFERENCE: { label: 'Conférence', color: '#3B82F6' },
  DEMO_DAY: { label: 'Demo Day', color: '#EC4899' },
  WORKSHOP: { label: 'Atelier', color: '#F59E0B' },
  DEMO: { label: 'Démo', color: '#10B981' },
};

export default function EventCard({ event, index = 0 }: { event: Evenement; index?: number }) {
  const typeConf = TYPE_CONFIG[event.type] || { label: event.type, color: '#6b7280' };
  const fillPercent = (event.registered / event.capacity) * 100;
  const dateStr = new Date(event.date).toLocaleDateString('fr-FR', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  });

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.08, type: 'spring', stiffness: 100 }}
      className="bg-white dark:bg-white/5 rounded-2xl border border-gray-200/60 dark:border-white/8 overflow-hidden hover:shadow-lg transition-all hover:-translate-y-1"
    >
      <div className="h-1.5 w-full" style={{ background: typeConf.color }} />
      <div className="p-5">
        <div className="flex items-center justify-between mb-3">
          <span
            className="text-[10px] font-bold px-2.5 py-1 rounded-full text-white"
            style={{ background: typeConf.color }}
          >
            {typeConf.label}
          </span>
          {event.prize && (
            <span className="text-[10px] font-bold text-amber-500 flex items-center gap-1">
              <Trophy size={10} /> {event.prize}
            </span>
          )}
        </div>

        <h3 className="text-sm font-bold text-gray-900 dark:text-white mb-2">{event.name}</h3>
        <p className="text-xs text-gray-600 dark:text-gray-400 line-clamp-2 mb-3">
          {event.description}
        </p>

        <div className="space-y-1.5 text-xs text-gray-500 dark:text-gray-400 mb-3">
          <div className="flex items-center gap-1.5">
            <Calendar size={12} /> {dateStr}
            {event.endDate &&
              ` — ${new Date(event.endDate).toLocaleDateString('fr-FR', { day: 'numeric', month: 'short' })}`}
          </div>
          <div className="flex items-center gap-1.5">
            <MapPin size={12} /> {event.location}
          </div>
          <div className="flex items-center gap-1.5">
            <Users size={12} /> {event.registered}/{event.capacity} inscrits
          </div>
        </div>

        {/* Capacity bar */}
        <div className="mb-4">
          <div className="h-1.5 bg-gray-100 dark:bg-white/8 rounded-full overflow-hidden">
            <div
              className="h-full rounded-full transition-all"
              style={{ width: `${fillPercent}%`, background: typeConf.color }}
            />
          </div>
        </div>

        <div className="flex items-center justify-between">
          <div className="flex flex-wrap gap-1">
            {event.tags.slice(0, 2).map((t) => (
              <span
                key={t}
                className="text-[10px] font-medium px-1.5 py-0.5 rounded bg-gray-100 dark:bg-white/6 text-gray-500"
              >
                {t}
              </span>
            ))}
          </div>
          {event.registrationOpen && (
            <button
              className="flex items-center gap-1 text-[10px] font-bold px-3 py-1.5 rounded-full text-white transition-all hover:opacity-90"
              style={{ background: typeConf.color }}
            >
              S&apos;inscrire <ArrowRight size={10} />
            </button>
          )}
        </div>
      </div>
    </motion.div>
  );
}
