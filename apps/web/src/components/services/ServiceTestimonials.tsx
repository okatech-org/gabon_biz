'use client';

import React, { useState, useEffect, useCallback } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { Quote, ChevronLeft, ChevronRight } from 'lucide-react';
import { useI18n } from '@/lib/i18n/i18nContext';

interface Testimonial {
  quote: string;
  author: string;
  role: string;
  company?: string;
  avatar?: string;
}

interface ServiceTestimonialsProps {
  testimonials: Testimonial[];
  accentColor: string;
}

export function ServiceTestimonials({ testimonials, accentColor }: ServiceTestimonialsProps) {
  const { tr } = useI18n();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(0);

  const slideVariants = {
    enter: (direction: number) => ({
      x: direction > 0 ? 1000 : -1000,
      opacity: 0
    }),
    center: {
      zIndex: 1,
      x: 0,
      opacity: 1
    },
    exit: (direction: number) => ({
      zIndex: 0,
      x: direction < 0 ? 1000 : -1000,
      opacity: 0
    })
  };

  const swipeConfidenceThreshold = 10000;
  const swipePower = (offset: number, velocity: number) => {
    return Math.abs(offset) * velocity;
  };

  const paginate = useCallback((newDirection: number) => {
    setDirection(newDirection);
    setCurrentIndex((prev) => {
      let nextIndex = prev + newDirection;
      if (nextIndex < 0) nextIndex = testimonials.length - 1;
      if (nextIndex >= testimonials.length) nextIndex = 0;
      return nextIndex;
    });
  }, [testimonials]);

  useEffect(() => {
    if (!testimonials || testimonials.length <= 1) return;
    const timer = setInterval(() => {
      paginate(1);
    }, 5000);
    return () => clearInterval(timer);
  }, [paginate, testimonials]);

  if (!testimonials || testimonials.length === 0) return null;

  const current = testimonials[currentIndex];

  return (
    <section 
      className="py-24 bg-white dark:bg-gray-950 overflow-hidden"
      style={{ '--accent': accentColor } as React.CSSProperties}
    >
      <div className="max-w-4xl mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-bold text-gray-900 dark:text-white tracking-tight">
            {tr('svc.shared.testimonials_title')}
          </h2>
        </div>

        <div className="relative h-[300px] md:h-[220px] w-full flex items-center justify-center">
          <AnimatePresence initial={false} custom={direction}>
            <motion.div
              key={currentIndex}
              custom={direction}
              variants={slideVariants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{
                x: { type: "spring", stiffness: 300, damping: 30 },
                opacity: { duration: 0.2 }
              }}
              drag="x"
              dragConstraints={{ left: 0, right: 0 }}
              dragElastic={1}
              onDragEnd={(e, { offset, velocity }) => {
                const swipe = swipePower(offset.x, velocity.x);
                if (swipe < -swipeConfidenceThreshold) {
                  paginate(1);
                } else if (swipe > swipeConfidenceThreshold) {
                  paginate(-1);
                }
              }}
              className="absolute w-full px-4"
            >
              <div className="bg-gray-100 dark:bg-gray-900 p-8 rounded-3xl border border-gray-200 dark:border-gray-800 flex flex-col md:flex-row gap-8 items-center md:items-start text-center md:text-left">
                <div className="shrink-0">
                  {current.avatar ? (
                    <Image src={current.avatar} alt={current.author} width={80} height={80} className="w-20 h-20 rounded-full object-cover border-4 border-white dark:border-gray-800" />
                  ) : (
                    <div 
                      className="w-20 h-20 rounded-full flex items-center justify-center text-white text-2xl font-bold border-4 border-white dark:border-gray-800"
                      style={{ backgroundColor: 'var(--accent)' }}
                    >
                      {current.author.charAt(0)}
                    </div>
                  )}
                </div>
                
                <div className="flex-1 relative">
                  <Quote size={40} className="absolute -top-4 -left-4 text-gray-200 dark:text-gray-800 -z-10 rotate-180" />
                  <p className="text-lg md:text-xl text-gray-700 dark:text-gray-300 italic mb-6 leading-relaxed">
                    &ldquo;{current.quote}&rdquo;
                  </p>
                  <div>
                    <h4 className="font-bold text-gray-900 dark:text-white text-lg">
                      {current.author}
                    </h4>
                    <span className="text-gray-500 dark:text-gray-400">
                      {current.role} {current.company && <span className="text-accent font-medium"> • {current.company}</span>}
                    </span>
                  </div>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>

          {testimonials.length > 1 && (
            <>
              <button 
                className="absolute left-0 md:-left-12 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 flex items-center justify-center text-gray-500 hover:text-accent transition-colors z-10"
                onClick={() => paginate(-1)}
              >
                <ChevronLeft size={20} />
              </button>
              <button 
                className="absolute right-0 md:-right-12 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 flex items-center justify-center text-gray-500 hover:text-accent transition-colors z-10"
                onClick={() => paginate(1)}
              >
                <ChevronRight size={20} />
              </button>
            </>
          )}
        </div>
        
        {testimonials.length > 1 && (
          <div className="flex justify-center mt-12 gap-2">
            {testimonials.map((_, i) => (
              <button
                key={i}
                onClick={() => {
                  setDirection(i > currentIndex ? 1 : -1);
                  setCurrentIndex(i);
                }}
                className={`w-3 h-3 rounded-full transition-all duration-300 ${
                  i === currentIndex ? 'w-8 bg-accent' : 'bg-gray-300 dark:bg-gray-700 hover:bg-gray-400 dark:hover:bg-gray-600'
                }`}
                aria-label={`Go to slide ${i + 1}`}
              />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
