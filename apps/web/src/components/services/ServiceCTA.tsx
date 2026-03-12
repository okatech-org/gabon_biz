'use client';

import React from 'react';
import Link from 'next/link';
import { ArrowRight, MessageSquare } from 'lucide-react';
import { motion } from 'framer-motion';
import { useI18n } from '@/lib/i18n/i18nContext';

export function ServiceCTA() {
  const { tr } = useI18n();
  return (
    <section className="relative py-20 overflow-hidden bg-linear-to-br from-emerald-600 to-blue-700">
      {/* Background patterns */}
      <div className="absolute inset-0 opacity-20 bg-[radial-gradient(circle_at_30%_50%,rgba(255,255,255,0.4),transparent_50%)]" />
      <div className="absolute inset-0 bg-[url('/images/hero-libreville.png')] mix-blend-overlay opacity-10 bg-cover bg-center" />
      
      <div className="max-w-4xl mx-auto px-6 relative z-10 text-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-3xl md:text-5xl font-extrabold text-white mb-6">
            {tr('svc.cta.title')}
          </h2>
          <p className="text-lg md:text-xl text-white/80 font-medium mb-10 max-w-2xl mx-auto leading-relaxed">
            {tr('svc.cta.desc')}
          </p>
          
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link 
              href="/login"
              className="px-8 py-4 bg-white text-emerald-700 font-bold rounded-xl shadow-xl hover:shadow-2xl hover:scale-105 transition-all w-full sm:w-auto flex items-center justify-center gap-2"
            >
              {tr('svc.cta.btn')} <ArrowRight size={20} />
            </Link>
            <Link 
              href="#contact"
              className="px-8 py-4 bg-white/10 hover:bg-white/20 text-white border border-white/20 font-bold rounded-xl backdrop-blur-md transition-all w-full sm:w-auto flex items-center justify-center gap-2"
            >
              <MessageSquare size={20} /> {tr('svc.cta.contact')}
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
