'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown } from 'lucide-react';
import { useI18n } from '@/lib/i18n/i18nContext';

interface FAQ {
  question: string;
  answer: string;
}

interface ServiceFAQProps {
  questions: FAQ[];
  accentColor: string;
}

export function ServiceFAQ({ questions, accentColor }: ServiceFAQProps) {
  const { tr } = useI18n();
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section 
      className="py-24 bg-gray-50 dark:bg-gray-900/50"
      style={{ '--accent': accentColor } as React.CSSProperties}
    >
      <div className="max-w-4xl mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-bold text-gray-900 dark:text-white tracking-tight">
            {tr('svc.shared.faq_title')}
          </h2>
        </div>

        <div className="space-y-4">
          {questions.map((faq, i) => {
            const isOpen = openIndex === i;
            return (
              <motion.div 
                key={i}
                className={`bg-white dark:bg-gray-800 rounded-2xl overflow-hidden shadow-sm border transition-colors ${
                  isOpen ? 'border-accent' : 'border-gray-100 dark:border-gray-700 hover:border-gray-200 dark:hover:border-gray-600'
                }`}
              >
                <button
                  onClick={() => setOpenIndex(isOpen ? null : i)}
                  className="w-full px-6 py-5 flex items-center justify-between text-left focus:outline-none"
                >
                  <span className={`font-semibold text-lg ${isOpen ? 'text-accent' : 'text-gray-900 dark:text-white'}`}>
                    {faq.question}
                  </span>
                  <motion.div
                    animate={{ rotate: isOpen ? 180 : 0 }}
                    transition={{ duration: 0.2 }}
                    className="shrink-0 ml-4"
                  >
                    <ChevronDown size={20} className={isOpen ? 'text-accent' : 'text-gray-400'} />
                  </motion.div>
                </button>
                
                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      key="content"
                      initial="collapsed"
                      animate="open"
                      exit="collapsed"
                      variants={{
                        open: { opacity: 1, height: "auto" },
                        collapsed: { opacity: 0, height: 0 }
                      }}
                      transition={{ duration: 0.3, ease: [0.04, 0.62, 0.23, 0.98] }}
                    >
                      <div className="px-6 pb-6 pt-0 text-gray-600 dark:text-gray-400 leading-relaxed whitespace-pre-line">
                        {faq.answer}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
