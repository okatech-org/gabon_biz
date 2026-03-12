'use client';

import React, { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, Building2, FileSearch, Lightbulb, Rocket, TrendingUp, Zap } from 'lucide-react';
import { useI18n } from '@/lib/i18n/i18nContext';

export const servicesItems = [
  { slug: 'guichet-entrepreneur', icon: Building2, color: 'text-emerald-500', bg: 'bg-emerald-50 dark:bg-emerald-950/50', key: 'guichet' },
  { slug: 'marches-publics', icon: FileSearch, color: 'text-blue-500', bg: 'bg-blue-50 dark:bg-blue-950/50', key: 'marches' },
  { slug: 'innovation-hub', icon: Lightbulb, color: 'text-violet-500', bg: 'bg-violet-50 dark:bg-violet-950/50', key: 'innovation' },
  { slug: 'incubateur', icon: Rocket, color: 'text-pink-500', bg: 'bg-pink-50 dark:bg-pink-950/50', key: 'incubateur' },
  { slug: 'investir', icon: TrendingUp, color: 'text-teal-500', bg: 'bg-teal-50 dark:bg-teal-950/50', key: 'investir' },
  { slug: 'cgi', icon: Zap, color: 'text-amber-500', bg: 'bg-amber-50 dark:bg-amber-950/50', key: 'cgi' },
];

export function ServicesDropdown({ scrolled, activeSlug }: { scrolled: boolean, activeSlug?: string }) {
  const [isOpen, setIsOpen] = useState(false);
  const { tr } = useI18n();
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div 
      className="relative" 
      ref={dropdownRef}
      onMouseEnter={() => setIsOpen(true)}
      onMouseLeave={() => setIsOpen(false)}
    >
      <button 
        className={`flex items-center gap-1 text-sm font-medium transition-colors hover:text-emerald-500 ${activeSlug ? 'text-emerald-600 dark:text-emerald-400' : scrolled ? 'text-gray-600 dark:text-gray-300' : 'text-white/90'}`}
        onClick={() => setIsOpen(!isOpen)}
        aria-expanded={isOpen}
      >
        {tr('services.dropdown.title') || 'Nos Services'}
        <ChevronDown size={14} className={`transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`} />
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className="absolute top-full left-1/2 -translate-x-1/2 mt-4 w-[340px] p-2 rounded-2xl bg-white/95 dark:bg-gray-900/95 backdrop-blur-xl border border-gray-100 dark:border-gray-800 shadow-[0_25px_50px_rgba(0,0,0,0.15)] overflow-hidden"
          >
            <div className="flex flex-col gap-1">
              {servicesItems.map((item) => {
                const Icon = item.icon;
                const isActive = item.slug === activeSlug;
                return (
                  <Link 
                    key={item.slug} 
                    href={`/services/${item.slug}`}
                    className={`group flex items-center gap-4 p-3 rounded-xl transition-all hover:scale-[1.02] ${isActive ? 'bg-gray-50 dark:bg-gray-800' : 'hover:bg-gray-50 dark:hover:bg-gray-800/50'}`}
                    onClick={() => setIsOpen(false)}
                  >
                    <div className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 ${item.bg}`}>
                      <Icon size={20} className={item.color} />
                    </div>
                    <div>
                      <h4 className={`font-semibold text-sm transition-colors ${isActive ? item.color : 'text-gray-900 dark:text-white group-hover:' + item.color}`}>
                        {tr(`services.dropdown.${item.key}`) || item.slug}
                      </h4>
                      <p className="text-[13px] text-gray-500 dark:text-gray-400 line-clamp-1 mt-0.5">
                        {tr(`services.dropdown.${item.key}_desc`) || 'Découvrir ce service'}
                      </p>
                    </div>
                  </Link>
                );
              })}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export function MobileServicesDropdown({ closeMenu }: { closeMenu: () => void }) {
  const [open, setOpen] = useState(false);
  const { tr } = useI18n();

  return (
    <div className="py-2 border-b border-gray-100 dark:border-gray-800">
      <button 
        onClick={() => setOpen(!open)}
        className="flex items-center justify-between w-full text-sm font-medium text-gray-700 dark:text-gray-300 py-2"
      >
        {tr('services.dropdown.title') || 'Nos Services'}
        <ChevronDown size={14} className={`transition-transform duration-200 ${open ? 'rotate-180' : ''}`} />
      </button>
      
      <AnimatePresence>
        {open && (
          <motion.div 
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="overflow-hidden"
          >
            <div className="flex flex-col gap-2 mt-2 pl-4 pb-2">
              {servicesItems.map(item => {
                const Icon = item.icon;
                return (
                  <Link 
                    key={item.slug}
                    href={`/services/${item.slug}`}
                    onClick={closeMenu}
                    className="flex items-center gap-3 py-2"
                  >
                    <div className={`w-8 h-8 rounded-lg flex items-center justify-center shrink-0 ${item.bg}`}>
                      <Icon size={16} className={item.color} />
                    </div>
                    <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                      {tr(`services.dropdown.${item.key}`) || item.slug}
                    </span>
                  </Link>
                );
              })}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
