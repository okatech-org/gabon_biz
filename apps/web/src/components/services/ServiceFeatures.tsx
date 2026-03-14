'use client';

import React from 'react';
import { motion, type Variants } from 'framer-motion';

interface Feature {
  title: string;
  description: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  icon: any;
}

interface ServiceFeaturesProps {
  features: Feature[];
  accentColor: string;
  mobileColumns?: 2 | 3 | 4;
}

const stagger: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1 } }
};

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: 'easeOut' } }
};

const MOBILE_COLS: Record<number, string> = { 2: 'grid-cols-2', 3: 'grid-cols-3', 4: 'grid-cols-4' };
const SM_COLS: Record<number, string> = { 2: 'sm:grid-cols-2', 3: 'sm:grid-cols-3', 4: 'sm:grid-cols-4', 5: 'sm:grid-cols-4', 6: 'sm:grid-cols-4' };

export function ServiceFeatures({ features, accentColor, mobileColumns = 4 }: ServiceFeaturesProps) {
  const smCols = SM_COLS[features.length] || 'sm:grid-cols-4';
  return (
    <section 
      className="py-12 sm:py-24 bg-gray-100 dark:bg-gray-900/30"
      style={{ '--accent': accentColor } as React.CSSProperties}
    >
      <div className="max-w-7xl mx-auto px-3 sm:px-6">
        <motion.div 
          className={`grid ${MOBILE_COLS[mobileColumns]} ${smCols} gap-2 sm:gap-4 lg:gap-6`}
          variants={stagger}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
        >
          {features.map((f, i) => {
            const Icon = f.icon;
            return (
              <motion.div 
                key={i} 
                variants={fadeUp}
                whileHover={{ y: -4 }}
                className="bg-white dark:bg-gray-800 p-3 sm:p-5 lg:p-8 rounded-xl sm:rounded-2xl transition-all duration-300 border border-gray-200 dark:border-gray-700 hover:border-gray-300 dark:hover:border-gray-600"
              >
                <div 
                  className="w-8 h-8 sm:w-12 sm:h-12 lg:w-14 lg:h-14 rounded-lg sm:rounded-xl flex items-center justify-center mb-2 sm:mb-4 lg:mb-6"
                  style={{ backgroundColor: 'color-mix(in srgb, var(--accent) 15%, transparent)' }}
                >
                  <Icon className="w-4 h-4 sm:w-6 sm:h-6 lg:w-7 lg:h-7" style={{ color: 'var(--accent)' }} />
                </div>
                <h3 className="text-xs sm:text-base lg:text-xl font-bold text-gray-900 dark:text-white mb-1 sm:mb-3 leading-tight">
                  {f.title}
                </h3>
                <p className="text-[10px] sm:text-sm lg:text-base text-gray-600 dark:text-gray-400 leading-snug sm:leading-relaxed hidden sm:block">
                  {f.description}
                </p>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
