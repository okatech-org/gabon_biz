'use client';
import React, { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { IMPACT_METRICS } from '@/lib/mock/incubateur-data';

function CountUp({
  target,
  suffix,
  duration = 2000,
}: {
  target: number;
  suffix: string;
  duration?: number;
}) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLDivElement>(null);
  const started = useRef(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !started.current) {
          started.current = true;
          const start = performance.now();
          const animate = (now: number) => {
            const elapsed = now - start;
            const progress = Math.min(elapsed / duration, 1);
            const eased = 1 - Math.pow(1 - progress, 3);
            setCount(Math.round(target * eased * 100) / 100);
            if (progress < 1) requestAnimationFrame(animate);
          };
          requestAnimationFrame(animate);
        }
      },
      { threshold: 0.3 },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [target, duration]);

  const display = Number.isInteger(target)
    ? Math.round(count).toLocaleString('fr-FR')
    : count.toFixed(2);

  return (
    <div ref={ref} className="text-xs sm:text-2xl md:text-3xl font-extrabold text-gray-900 dark:text-white">
      {display}
      <span className="text-[9px] sm:text-lg">{suffix}</span>
    </div>
  );
}

export default function ImpactDashboard() {
  return (
    <div className="grid grid-cols-5 gap-2 sm:gap-4">
      {IMPACT_METRICS.map((m, i) => (
        <motion.div
          key={m.label}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: i * 0.08 }}
          className="text-center bg-white dark:bg-white/5 rounded-xl sm:rounded-2xl border border-gray-200/60 dark:border-white/8 p-2 sm:p-4 transition-all"
        >
          <div
            className="w-6 h-6 sm:w-10 sm:h-10 rounded-full mx-auto mb-1 sm:mb-2 flex items-center justify-center"
            style={{ background: `${m.color}15` }}
          >
            <div className="w-3 h-3 sm:w-5 sm:h-5 rounded-full" style={{ background: m.color }} />
          </div>
          <CountUp target={m.value} suffix={m.suffix} />
          <p className="text-[7px] sm:text-[10px] text-gray-500 dark:text-gray-400 mt-0.5 sm:mt-1 leading-tight">
            {m.label}
          </p>
        </motion.div>
      ))}
    </div>
  );
}
