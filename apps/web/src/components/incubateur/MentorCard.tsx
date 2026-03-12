'use client';
import React from 'react';
import { motion } from 'framer-motion';
import { Star, Clock, Users, MessageSquare } from 'lucide-react';
import type { Mentor } from '@/lib/mock/incubateur-types';

export default function MentorCard({ mentor, index = 0 }: { mentor: Mentor; index?: number }) {
  const initials = mentor.name
    .split(' ')
    .map((w) => w[0])
    .join('')
    .slice(0, 2);
  const colors = ['#ec4899', '#3b82f6', '#10b981', '#f59e0b', '#8b5cf6'];
  const bgColor = colors[index % colors.length];

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.1, type: 'spring', stiffness: 100 }}
      className="bg-white dark:bg-white/5 rounded-2xl border border-gray-200/60 dark:border-white/8 p-5 hover:shadow-lg transition-all hover:-translate-y-1"
    >
      <div className="flex items-start gap-3 mb-4">
        <div
          className="w-12 h-12 rounded-full flex items-center justify-center text-white font-bold text-sm shrink-0"
          style={{ background: bgColor }}
        >
          {initials}
        </div>
        <div className="flex-1 min-w-0">
          <h3 className="text-sm font-bold text-gray-900 dark:text-white truncate">
            {mentor.name}
          </h3>
          <p className="text-xs text-gray-500 dark:text-gray-400 truncate">{mentor.title}</p>
          <div className="flex items-center gap-1 mt-1">
            {Array.from({ length: 5 }).map((_, i) => (
              <Star
                key={i}
                size={10}
                className={
                  i < Math.floor(mentor.rating)
                    ? 'text-amber-400 fill-amber-400'
                    : 'text-gray-300 dark:text-gray-600'
                }
              />
            ))}
            <span className="text-[10px] text-gray-500 ml-1">{mentor.rating}</span>
          </div>
        </div>
      </div>

      <p className="text-xs text-gray-600 dark:text-gray-400 mb-3 line-clamp-2">{mentor.bio}</p>

      <div className="flex flex-wrap gap-1 mb-3">
        {mentor.expertise.map((e) => (
          <span
            key={e}
            className="text-[10px] font-medium px-2 py-0.5 rounded-full"
            style={{ background: `${bgColor}15`, color: bgColor }}
          >
            {e}
          </span>
        ))}
      </div>

      <div className="flex gap-3 text-[10px] text-gray-500 dark:text-gray-400 pt-3 border-t border-gray-100 dark:border-white/5">
        <span className="flex items-center gap-1">
          <Users size={10} /> {mentor.mentees} mentees
        </span>
        <span className="flex items-center gap-1">
          <Clock size={10} /> {mentor.experience}
        </span>
      </div>

      <button
        className="mt-3 w-full flex items-center justify-center gap-1.5 py-2 rounded-xl text-xs font-semibold text-white transition-all hover:opacity-90"
        style={{ background: bgColor }}
      >
        <MessageSquare size={12} /> Demander un mentorat
      </button>
    </motion.div>
  );
}
