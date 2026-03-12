'use client';

import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';

interface ServiceStatsProps {
  stats: Array<{ value: string; label: string }>;
  accentColor: string;
}

export function ServiceStats({ stats, accentColor }: ServiceStatsProps) {
  return (
    <section 
      className="py-20 relative overflow-hidden"
      style={{ '--accent': accentColor } as React.CSSProperties}
    >
      <div 
        className="absolute inset-0 opacity-10"
        style={{ backgroundColor: 'var(--accent)' }}
      />
      <div className="max-w-6xl mx-auto px-6 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
          {stats.map((stat, i) => (
            <StatItem key={i} value={stat.value} label={stat.label} delay={i * 0.15} />
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
      initial={{ opacity: 0, scale: 0.95, y: 20 }}
      animate={isInView ? { opacity: 1, scale: 1, y: 0 } : { opacity: 0, scale: 0.95, y: 20 }}
      transition={{ duration: 0.6, delay, type: "spring", stiffness: 100 }}
      className="flex flex-col items-center justify-center p-8 bg-white/70 dark:bg-gray-900/70 backdrop-blur-md rounded-3xl border border-white/40 dark:border-gray-800/60 shadow-xl"
    >
      <div className="text-4xl md:text-5xl lg:text-6xl font-extrabold mb-3 tracking-tight" style={{ color: 'var(--accent)' }}>
        {value}
      </div>
      <div className="text-gray-700 dark:text-gray-300 font-semibold text-lg">
        {label}
      </div>
    </motion.div>
  );
}
