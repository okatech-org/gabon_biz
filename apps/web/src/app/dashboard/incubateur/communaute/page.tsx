'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Network, Hash, Users, Clock, Star, MessageSquare } from 'lucide-react';
import { COMMUNAUTE } from '@/lib/mock/incubateur-startups';

export default function CommunautePage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-indigo-500 to-violet-600 flex items-center justify-center text-white">
          <Network size={18} />
        </div>
        <div>
          <h1 className="text-xl font-black text-gray-900 dark:text-white">Communauté</h1>
          <p className="text-sm text-gray-500">Réseau alumni & networking SING</p>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
        {[
          { l: 'Total alumni', v: COMMUNAUTE.stats.totalAlumni, icon: Users },
          { l: 'Membres actifs', v: COMMUNAUTE.stats.activeMembers, icon: Star },
          { l: 'Mentors', v: COMMUNAUTE.stats.mentors, icon: MessageSquare },
          { l: 'Canaux', v: COMMUNAUTE.stats.channels, icon: Hash },
        ].map((s) => (
          <div
            key={s.l}
            className="bg-white dark:bg-white/5 rounded-xl border border-gray-200/60 dark:border-white/8 p-4"
          >
            <s.icon size={14} className="text-indigo-500 mb-1" />
            <p className="text-xl font-black text-gray-900 dark:text-white">{s.v}</p>
            <p className="text-[10px] text-gray-500">{s.l}</p>
          </div>
        ))}
      </div>

      {/* Alumni Spotlight */}
      <div className="bg-gradient-to-br from-indigo-500 to-violet-600 rounded-2xl p-6 text-white">
        <p className="text-xs font-bold uppercase tracking-wider text-white/60 mb-2">
          Alumni Spotlight
        </p>
        <h3 className="text-lg font-black mb-1">{COMMUNAUTE.alumniSpotlight.startup}</h3>
        <p className="text-sm text-white/80 mb-2">{COMMUNAUTE.alumniSpotlight.achievement}</p>
        <blockquote className="text-sm italic text-white/70">
          &ldquo;{COMMUNAUTE.alumniSpotlight.quote}&rdquo;
        </blockquote>
        <p className="text-xs text-white/50 mt-2">{COMMUNAUTE.alumniSpotlight.programme}</p>
      </div>

      {/* Channels */}
      <div>
        <h2 className="text-sm font-bold text-gray-500 uppercase tracking-wider mb-3">
          Canaux thématiques
        </h2>
        <div className="grid md:grid-cols-2 gap-3">
          {COMMUNAUTE.channels.map((ch, i) => (
            <motion.div
              key={ch.name}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.04 }}
              className="bg-white dark:bg-white/5 rounded-xl border border-gray-200/60 dark:border-white/8 p-4 hover:shadow-md transition-all cursor-pointer"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Hash size={14} className="text-indigo-500" />
                  <h3 className="text-sm font-bold text-gray-900 dark:text-white">{ch.name}</h3>
                </div>
                <span className="text-[10px] font-bold bg-indigo-50 dark:bg-indigo-500/10 text-indigo-600 px-2 py-0.5 rounded-full">
                  {ch.members}
                </span>
              </div>
              <p className="text-xs text-gray-500 mt-1">{ch.description}</p>
              <div className="flex items-center gap-1 mt-2 text-[10px] text-gray-400">
                <Clock size={10} /> {ch.lastMessage}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
