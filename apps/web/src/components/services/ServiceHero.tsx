'use client';

import React from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';

interface ServiceHeroProps {
  badge: string;
  title: string;
  subtitle: string;
  ctaPrimary: { label: string; href: string };
  ctaSecondary: { label: string; href: string };
  metrics: Array<{ value: string; label: string }>;
  accentColor: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  icon: any;
}

const fadeUp: any = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: 'easeOut' } }
};

const stagger: any = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1 } }
};

export function ServiceHero({
  badge, title, subtitle, ctaPrimary, ctaSecondary, metrics, accentColor, icon: Icon
}: ServiceHeroProps) {
  return (
    <section 
      className="relative pt-32 pb-20 overflow-hidden"
      style={{ '--accent': accentColor } as React.CSSProperties}
    >
      <div 
        className="absolute inset-0 opacity-10 dark:opacity-5"
        style={{ 
          background: `linear-gradient(to bottom, var(--accent), transparent)`
        }} 
      />
      
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <motion.div 
          className="flex items-center gap-3 px-4 py-2 rounded-full w-fit mb-8 shadow-sm border"
          style={{ backgroundColor: 'color-mix(in srgb, var(--accent) 15%, transparent)', borderColor: 'color-mix(in srgb, var(--accent) 30%, transparent)' }}
          variants={fadeUp}
          initial="hidden"
          animate="visible"
        >
          <Icon size={18} style={{ color: 'var(--accent)' }} />
          <span className="text-sm font-semibold" style={{ color: 'var(--accent)' }}>
            {badge}
          </span>
        </motion.div>

        <motion.h1 
          className="text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight mb-6 bg-clip-text text-transparent"
          style={{ backgroundImage: `linear-gradient(to right, var(--accent), color-mix(in srgb, var(--accent) 70%, black))` }}
          variants={fadeUp}
          initial="hidden"
          animate="visible"
        >
          {title}
        </motion.h1>

        <motion.p 
          className="text-lg md:text-xl text-gray-600 dark:text-gray-300 max-w-3xl mb-10 leading-relaxed font-light"
          variants={fadeUp}
          initial="hidden"
          animate="visible"
        >
          {subtitle}
        </motion.p>

        <motion.div 
          className="flex flex-col sm:flex-row gap-4 mb-16"
          variants={fadeUp}
          initial="hidden"
          animate="visible"
        >
          <Link 
            href={ctaPrimary.href}
            className="px-8 py-4 rounded-xl text-white font-semibold text-center transition-all shadow-lg hover:shadow-xl hover:opacity-90 flex items-center justify-center"
            style={{ backgroundColor: 'var(--accent)', boxShadow: `0 10px 25px -5px color-mix(in srgb, var(--accent) 40%, transparent)` }}
          >
            {ctaPrimary.label}
          </Link>
          <Link 
            href={ctaSecondary.href}
            className="px-8 py-4 rounded-xl bg-white dark:bg-gray-800 text-gray-900 dark:text-white border border-gray-200 dark:border-gray-700 font-semibold text-center transition-all hover:bg-gray-50 dark:hover:bg-gray-700 flex items-center justify-center"
          >
            {ctaSecondary.label}
          </Link>
        </motion.div>

        <motion.div 
          className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-10 border-t border-gray-200 dark:border-gray-800"
          variants={stagger}
          initial="hidden"
          animate="visible"
        >
          {metrics.map((m, i) => (
            <motion.div key={i} variants={fadeUp} className="flex flex-col gap-1">
              <span className="text-3xl font-bold text-gray-900 dark:text-white">
                {m.value}
              </span>
              <span className="text-sm text-gray-500 dark:text-gray-400 font-medium">
                {m.label}
              </span>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
