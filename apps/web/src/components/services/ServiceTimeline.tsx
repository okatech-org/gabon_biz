'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { useI18n } from '@/lib/i18n/i18nContext';

interface Step {
  number: number;
  title: string;
  description: string;
}

interface ServiceTimelineProps {
  steps: Step[];
  accentColor: string;
}

export function ServiceTimeline({ steps, accentColor }: ServiceTimelineProps) {
  const { tr } = useI18n();
  return (
    <section 
      className="py-24 bg-white dark:bg-gray-950"
      style={{ '--accent': accentColor } as React.CSSProperties}
    >
      <div className="max-w-5xl mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-bold text-gray-900 dark:text-white tracking-tight">
            {tr('svc.shared.how_it_works')}
          </h2>
        </div>

        <div className="relative">
          {/* Main vertical line for desktop */}
          <div className="hidden md:block absolute left-1/2 top-0 bottom-0 w-px bg-gray-200 dark:bg-gray-800 -translate-x-1/2" />
          
          {/* Main vertical line for mobile */}
          <div className="md:hidden absolute left-8 top-0 bottom-0 w-px bg-gray-200 dark:bg-gray-800" />

          <div className="space-y-12">
            {steps.map((step, i) => {
              const isEven = i % 2 === 0;
              return (
                <motion.div 
                  key={i}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-100px' }}
                  transition={{ duration: 0.5, delay: 0.1 }}
                  className="relative flex flex-col md:flex-row items-center gap-8 md:gap-0"
                >
                  {/* Left part */}
                  <div className={`md:w-1/2 flex w-full ${isEven ? 'md:justify-end md:pr-16 relative pl-24 md:pl-0' : 'md:order-2 md:pl-16 relative pl-24'}`}>
                    <div className="bg-gray-50 dark:bg-gray-900 p-8 rounded-2xl border border-gray-100 dark:border-gray-800 w-full hover:shadow-md transition-shadow">
                      <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">
                        {step.title}
                      </h3>
                      <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                        {step.description}
                      </p>
                    </div>
                  </div>

                  {/* Node (circle) */}
                  <div className="absolute left-8 md:left-1/2 top-8 md:top-1/2 md:-translate-y-1/2 -translate-x-1/2 flex flex-col items-center">
                    <div 
                      className="w-12 h-12 rounded-full flex items-center justify-center font-bold text-white shadow-lg z-10 text-lg"
                      style={{ backgroundColor: 'var(--accent)' }}
                    >
                      {step.number}
                    </div>
                  </div>

                  {/* Empty right part for layout balancing on desktop */}
                  <div className={`hidden md:flex md:w-1/2 ${isEven ? 'md:order-2' : ''}`} />
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
