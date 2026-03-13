'use client';

import React from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';

/* ═══════════════════════════════════════════════════
   CompactHero — Unified compact hero for all public pages
   2-column layout: text left, stats right
   ═══════════════════════════════════════════════════ */

export interface CompactHeroStat {
  value: string | number;
  label: string;
  icon?: React.ReactNode;
}

export interface CompactHeroCTA {
  label: string;
  href: string;
  external?: boolean;
}

export interface CompactHeroProps {
  /** Small pill badge text */
  badge: string;
  /** Icon shown in badge pill */
  badgeIcon?: React.ReactNode;
  /** Main heading — can include JSX for gradient spans */
  title: React.ReactNode;
  /** Subtitle paragraph */
  subtitle: React.ReactNode;
  /** Primary CTA button */
  ctaPrimary?: CompactHeroCTA;
  /** Secondary CTA button */
  ctaSecondary?: CompactHeroCTA;
  /** Stats shown in 2×2 grid on the right */
  stats?: CompactHeroStat[];
  /** Background classes (gradient, solid color, etc.) */
  backgroundClasses: string;
  /** Optional overlay elements (radial gradients, images) */
  overlays?: React.ReactNode;
  /** Accent color hex for CTA buttons */
  accentColor?: string;
  /** Optional children rendered below CTAs (e.g. search bar) */
  children?: React.ReactNode;
  /** Optional extra className for the inner container */
  innerClassName?: string;
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

export default function CompactHero({
  badge,
  badgeIcon,
  title,
  subtitle,
  ctaPrimary,
  ctaSecondary,
  stats,
  backgroundClasses,
  overlays,
  accentColor = '#10b981',
  children,
  innerClassName,
}: CompactHeroProps) {
  return (
    <section className={`relative overflow-x-clip ${backgroundClasses}`}>
      {/* Overlays (gradients, images, etc.) */}
      {overlays}

      <div className={innerClassName || "relative z-10 max-w-7xl mx-auto px-4 sm:px-6 py-8 pt-36 sm:py-20 sm:pt-28"}>
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4 sm:gap-12">
          {/* ── LEFT: Text content ── */}
          <div className="flex-1 max-w-2xl min-w-0">
            {/* Badge */}
            <motion.div
              variants={fadeUp}
              custom={0}
              initial="hidden"
              animate="visible"
              className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/12 backdrop-blur-sm border border-white/20 text-white text-xs font-semibold mb-3 sm:mb-6 max-w-full whitespace-normal text-center"
            >
              <span className="flex items-center gap-2">{badgeIcon}{badge}</span>
            </motion.div>

            {/* Title */}
            <motion.div
              variants={fadeUp}
              custom={1}
              initial="hidden"
              animate="visible"
            >
              <h1 className="text-2xl sm:text-4xl md:text-5xl font-extrabold text-white leading-[1.1] tracking-tight mb-2 sm:mb-4 wrap-break-word">
                {title}
              </h1>
            </motion.div>

            {/* Subtitle */}
            <motion.div
              variants={fadeUp}
              custom={2}
              initial="hidden"
              animate="visible"
              className="text-sm sm:text-base md:text-lg text-white/75 leading-relaxed mb-4 sm:mb-8 max-w-xl"
            >
              <span>{subtitle}</span>
            </motion.div>

            {/* CTAs */}
            {(ctaPrimary || ctaSecondary) && (
              <motion.div
                variants={fadeUp}
                custom={3}
                initial="hidden"
                animate="visible"
                className="flex flex-wrap gap-2 sm:gap-3 mb-4 sm:mb-6"
              >
                {ctaPrimary && (
                  <Link
                    href={ctaPrimary.href}
                    target={ctaPrimary.external ? '_blank' : undefined}
                    className="inline-flex items-center gap-2 px-5 sm:px-7 py-2.5 sm:py-3 rounded-xl text-white font-semibold text-sm transition-all hover:opacity-90 shadow-lg no-underline"
                    style={{
                      backgroundColor: accentColor,
                      boxShadow: `0 8px 24px ${accentColor}40`,
                    }}
                  >
                    {ctaPrimary.label}
                  </Link>
                )}
                {ctaSecondary && (
                  <Link
                    href={ctaSecondary.href}
                    target={ctaSecondary.external ? '_blank' : undefined}
                    className="inline-flex items-center gap-2 px-5 sm:px-7 py-2.5 sm:py-3 rounded-xl bg-white/10 hover:bg-white/20 backdrop-blur-sm border border-white/20 text-white font-semibold text-sm transition-all no-underline"
                  >
                    {ctaSecondary.label}
                  </Link>
                )}
              </motion.div>
            )}

            {/* Optional children (search bar, extra content) */}
            {children && (
              <motion.div
                variants={fadeUp}
                custom={4}
                initial="hidden"
                animate="visible"
              >
                <div>{children}</div>
              </motion.div>
            )}
          </div>

          {/* ── RIGHT: Stats grid ── */}
          {stats && stats.length > 0 && (
            <motion.div
              variants={stagger}
              initial="hidden"
              animate="visible"
              className="grid grid-cols-4 sm:grid-cols-2 gap-2 sm:gap-3 lg:w-[340px] shrink-0"
            >
              {stats.map((stat, i) => (
                <motion.div
                  key={i}
                  variants={fadeUp}
                  custom={i + 3}
                  className="rounded-xl sm:rounded-2xl bg-white/8 backdrop-blur-xl border border-white/12 p-2 sm:p-4 text-center hover:bg-white/12 transition-colors min-w-0 overflow-hidden"
                >
                  {stat.icon && (
                    <div className="flex justify-center mb-0.5 sm:mb-1.5 opacity-70">
                      <span className="[&>svg]:w-3.5 [&>svg]:h-3.5 sm:[&>svg]:w-[18px] sm:[&>svg]:h-[18px]">{stat.icon}</span>
                    </div>
                  )}
                  <div className="text-sm sm:text-2xl font-extrabold text-white truncate">{String(stat.value)}</div>
                  <div className="text-[8px] sm:text-[11px] text-white/55 mt-0.5 leading-tight wrap-break-word hyphens-auto">{stat.label}</div>
                </motion.div>
              ))}
            </motion.div>
          )}
        </div>
      </div>
    </section>
  );
}
