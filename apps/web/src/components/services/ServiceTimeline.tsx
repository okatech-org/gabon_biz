'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useI18n } from '@/lib/i18n/i18nContext';
import { ChevronRight } from 'lucide-react';

interface Step {
  number: number;
  title: string;
  description: string;
  icon?: React.ElementType;
  highlight?: string;
}

interface ServiceTimelineProps {
  steps: Step[];
  accentColor: string;
}

export function ServiceTimeline({ steps, accentColor }: ServiceTimelineProps) {
  const { tr } = useI18n();
  const [activeStep, setActiveStep] = useState(0);
  const current = steps[activeStep];

  // For steps with many items (>5), use a 2-row grid layout
  const isCompact = steps.length > 5;

  return (
    <section
      className="py-12 bg-white dark:bg-gray-950"
      style={{ '--accent': accentColor } as React.CSSProperties}
    >
      <div className="max-w-6xl mx-auto px-6">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl md:text-2xl font-bold text-gray-900 dark:text-white m-0">
            {tr('svc.shared.how_it_works')}
          </h2>
          <span className="text-xs text-gray-400 dark:text-gray-500 hidden sm:block">
            {steps.length} étapes
          </span>
        </div>

        {/* Compact Interactive Stepper */}
        <div className="bg-gray-50/80 dark:bg-gray-900/50 rounded-2xl border border-gray-100 dark:border-gray-800 overflow-hidden">

          {/* Step pills row */}
          <div className={`p-3 border-b border-gray-100 dark:border-gray-800 ${isCompact ? 'overflow-x-auto' : ''}`}
            style={isCompact ? { scrollbarWidth: 'none', msOverflowStyle: 'none' } : undefined}
          >
            <div className={`flex gap-1.5 ${isCompact ? 'min-w-max' : ''}`}>
              {steps.map((step, i) => (
                <button
                  key={i}
                  onClick={() => setActiveStep(i)}
                  className={`group flex items-center gap-2 px-3 py-2 rounded-xl text-xs font-semibold border-none cursor-pointer transition-all duration-200 shrink-0
                    ${activeStep === i
                      ? 'text-white shadow-md'
                      : 'bg-white dark:bg-gray-800/60 text-gray-600 dark:text-gray-400 hover:bg-white dark:hover:bg-gray-800'
                    }`}
                  style={activeStep === i
                    ? { backgroundColor: accentColor, boxShadow: `0 4px 14px ${accentColor}30` }
                    : undefined
                  }
                >
                  <span className={`w-5 h-5 rounded-md flex items-center justify-center text-[10px] font-bold leading-none
                    ${activeStep === i
                      ? 'bg-white/25 text-white'
                      : 'bg-gray-100 dark:bg-gray-700 text-gray-500 dark:text-gray-400'
                    }`}
                  >
                    {step.number}
                  </span>
                  <span className="hidden sm:inline truncate max-w-[120px]">{step.title}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Active step detail */}
          <AnimatePresence mode="wait">
            <motion.div
              key={activeStep}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.2 }}
              className="p-5 md:p-6"
            >
              <div className="flex flex-col md:flex-row items-start gap-4">
                {/* Step number badge */}
                <div
                  className="w-12 h-12 rounded-2xl flex items-center justify-center text-white font-bold text-lg shrink-0 shadow-lg"
                  style={{ backgroundColor: accentColor, boxShadow: `0 8px 24px ${accentColor}30` }}
                >
                  {current.number}
                </div>

                {/* Content */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1.5 flex-wrap">
                    {current.icon && <current.icon size={18} style={{ color: accentColor }} />}
                    <h3 className="text-lg font-bold text-gray-900 dark:text-white m-0">
                      {current.title}
                    </h3>
                    {current.highlight && (
                      <span
                        className="text-[10px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wider"
                        style={{ backgroundColor: `${accentColor}15`, color: accentColor }}
                      >
                        {current.highlight}
                      </span>
                    )}
                  </div>
                  <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed m-0">
                    {current.description}
                  </p>
                </div>

                {/* Navigation */}
                {activeStep < steps.length - 1 && (
                  <button
                    onClick={() => setActiveStep(prev => prev + 1)}
                    className="hidden md:flex items-center gap-1 px-3 py-2 rounded-xl text-xs font-semibold bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white cursor-pointer transition-all shrink-0"
                  >
                    Suivant <ChevronRight size={13} />
                  </button>
                )}
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Progress bar */}
          <div className="h-1 bg-gray-100 dark:bg-gray-800">
            <motion.div
              className="h-full rounded-full"
              style={{ backgroundColor: accentColor }}
              initial={false}
              animate={{ width: `${((activeStep + 1) / steps.length) * 100}%` }}
              transition={{ duration: 0.3, ease: 'easeOut' }}
            />
          </div>
        </div>
      </div>
    </section>
  );
}
