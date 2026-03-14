'use client';

import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';

interface ServiceStatsProps {
  stats: Array<{ value: string; label: string }>;
  accentColor: string;
}

const GRID_COLS: Record<number, string> = {
  2: 'grid-cols-2',
  3: 'grid-cols-3',
  4: 'grid-cols-4',
};

export function ServiceStats({ stats, accentColor }: ServiceStatsProps) {
  return (
    <section 
      className="py-12 relative overflow-hidden"
      style={{ '--accent': accentColor } as React.CSSProperties}
    >
      <div 
        className="absolute inset-0 opacity-[0.06]"
        style={{ backgroundColor: 'var(--accent)' }}
      />
      <div className="max-w-7xl mx-auto px-3 sm:px-6 relative z-10">
        <div className={`grid ${GRID_COLS[Math.min(stats.length, 4)] || 'grid-cols-4'} gap-2 sm:gap-3 text-center`}>
          {stats.map((stat, i) => (
            <StatItem key={i} value={stat.value} label={stat.label} delay={i * 0.08} />
          ))}
        </div>
      </div>
    </section>
  );
}

function StatItem({ value, label, delay }: { value: string; label: string; delay: number }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-50px' });
  
  return (
    <motion.div 
      ref={ref}
      initial={{ opacity: 0, y: 12 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 12 }}
      transition={{ duration: 0.4, delay, ease: 'easeOut' }}
      className="flex flex-col items-center justify-center p-2.5 sm:p-4 bg-white/80 dark:bg-gray-900/60 backdrop-blur-sm rounded-lg sm:rounded-xl border border-gray-200 dark:border-gray-800/50"
    >
      <div className="text-lg sm:text-2xl md:text-3xl font-extrabold mb-0.5 sm:mb-1 tracking-tight" style={{ color: 'var(--accent)' }}>
        {value}
      </div>
      <div className="text-gray-500 dark:text-gray-400 font-medium text-[10px] sm:text-xs leading-tight">
        {label}
      </div>
    </motion.div>
  );
}

