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

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, delay: i * 0.08, ease: 'easeOut' as const },
  }),
};

const stagger = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.06 } },
};

export function ServiceHero({
  badge, title, subtitle, ctaPrimary, ctaSecondary, metrics, accentColor, icon: Icon
}: ServiceHeroProps) {
  return (
    <section 
      className="relative overflow-hidden"
      style={{ '--accent': accentColor } as React.CSSProperties}
    >
      {/* Background gradient */}
      <div 
        className="absolute inset-0 opacity-[0.07] dark:opacity-[0.04]"
        style={{ 
          background: `linear-gradient(135deg, var(--accent), transparent 70%)`
        }} 
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10 py-8 sm:py-16 pt-4 sm:pt-10">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6 sm:gap-10">

          {/* ── LEFT: Text content ── */}
          <div className="flex-1 max-w-2xl">
            {/* Badge */}
            <motion.div 
              className="inline-flex items-center gap-2 px-3 py-1.5 sm:px-4 sm:py-2 rounded-full w-fit mb-4 sm:mb-6 shadow-sm border"
              style={{ 
                backgroundColor: `color-mix(in srgb, var(--accent) 10%, transparent)`, 
                borderColor: `color-mix(in srgb, var(--accent) 25%, transparent)` 
              }}
              variants={fadeUp}
              custom={0}
              initial="hidden"
              animate="visible"
            >
              <Icon size={18} style={{ color: 'var(--accent)' }} />
              <span className="text-sm font-semibold" style={{ color: 'var(--accent)' }}>
                {badge}
              </span>
            </motion.div>

            {/* Title */}
            <motion.h1 
              className="text-2xl sm:text-4xl md:text-5xl font-extrabold tracking-tight mb-3 sm:mb-4 bg-clip-text text-transparent"
              style={{ backgroundImage: `linear-gradient(to right, var(--accent), color-mix(in srgb, var(--accent) 65%, black))` }}
              variants={fadeUp}
              custom={1}
              initial="hidden"
              animate="visible"
            >
              {title}
            </motion.h1>

            {/* Subtitle */}
            <motion.p 
              className="text-sm sm:text-base md:text-lg text-gray-600 dark:text-gray-300 max-w-xl mb-5 sm:mb-8 leading-relaxed font-light"
              variants={fadeUp}
              custom={2}
              initial="hidden"
              animate="visible"
            >
              {subtitle}
            </motion.p>

            {/* CTAs */}
            <motion.div 
              className="flex flex-wrap gap-3"
              variants={fadeUp}
              custom={3}
              initial="hidden"
              animate="visible"
            >
              <Link 
                href={ctaPrimary.href}
                className="px-7 py-3 rounded-xl text-white font-semibold text-sm text-center transition-all shadow-lg hover:shadow-xl hover:opacity-90 flex items-center justify-center no-underline"
                style={{ backgroundColor: 'var(--accent)', boxShadow: `0 8px 24px color-mix(in srgb, var(--accent) 35%, transparent)` }}
              >
                {ctaPrimary.label}
              </Link>
              <Link 
                href={ctaSecondary.href}
                className="px-7 py-3 rounded-xl bg-white dark:bg-gray-800 text-gray-900 dark:text-white border border-gray-200 dark:border-gray-700 font-semibold text-sm text-center transition-all hover:bg-gray-50 dark:hover:bg-gray-700 flex items-center justify-center no-underline"
              >
                {ctaSecondary.label}
              </Link>
            </motion.div>
          </div>

          {/* ── RIGHT: Metrics grid 2×2 ── */}
          {metrics && metrics.length > 0 && (
            <motion.div 
              className="grid grid-cols-3 gap-2 sm:gap-3 lg:w-[340px] shrink-0"
              variants={stagger}
              initial="hidden"
              animate="visible"
            >
              {metrics.map((m, i) => (
                <motion.div 
                  key={i} 
                  variants={fadeUp} 
                  custom={i + 3}
                  className="rounded-xl sm:rounded-2xl p-3 sm:p-5 text-center border transition-colors"
                  style={{
                    backgroundColor: `color-mix(in srgb, var(--accent) 5%, transparent)`,
                    borderColor: `color-mix(in srgb, var(--accent) 12%, transparent)`,
                  }}
                >
                  <span className="text-lg sm:text-2xl font-extrabold text-gray-900 dark:text-white block">
                    {m.value}
                  </span>
                  <span className="text-[10px] sm:text-[11px] text-gray-500 dark:text-gray-400 font-medium mt-0.5 sm:mt-1 block leading-tight">
                    {m.label}
                  </span>
                </motion.div>
              ))}
            </motion.div>
          )}

        </div>
      </div>
    </section>
  );
}
