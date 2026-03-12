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
}

const stagger: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1 } }
};

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: 'easeOut' } }
};

export function ServiceFeatures({ features, accentColor }: ServiceFeaturesProps) {
  return (
    <section 
      className="py-24 bg-gray-50 dark:bg-gray-900/30"
      style={{ '--accent': accentColor } as React.CSSProperties}
    >
      <div className="max-w-7xl mx-auto px-6">
        <motion.div 
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
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
                className="bg-white dark:bg-gray-800 p-8 rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 border border-gray-100 dark:border-gray-700 hover:border-accent"
              >
                <div 
                  className="w-14 h-14 rounded-xl flex items-center justify-center mb-6"
                  style={{ backgroundColor: 'color-mix(in srgb, var(--accent) 15%, transparent)' }}
                >
                  <Icon size={28} style={{ color: 'var(--accent)' }} />
                </div>
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">
                  {f.title}
                </h3>
                <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
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
