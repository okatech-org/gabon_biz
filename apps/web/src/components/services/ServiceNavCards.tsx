'use client';

import React from 'react';
import Link from 'next/link';
import { Building2, FileSearch, Lightbulb, Rocket, TrendingUp } from 'lucide-react';
import { useI18n } from '@/lib/i18n/i18nContext';

const navServices = [
  { slug: 'guichet-entrepreneur', nameKey: 'svc.name.guichet', icon: Building2, color: 'text-emerald-500', bg: 'bg-emerald-50 dark:bg-emerald-900/20', border: 'border-emerald-200 dark:border-emerald-800' },
  { slug: 'marches-publics', nameKey: 'svc.name.marches', icon: FileSearch, color: 'text-blue-500', bg: 'bg-blue-50 dark:bg-blue-900/20', border: 'border-blue-200 dark:border-blue-800' },
  { slug: 'innovation-hub', nameKey: 'svc.name.innovation', icon: Lightbulb, color: 'text-violet-500', bg: 'bg-violet-50 dark:bg-violet-900/20', border: 'border-violet-200 dark:border-violet-800' },
  { slug: 'incubateur', nameKey: 'svc.name.incubateur', icon: Rocket, color: 'text-pink-500', bg: 'bg-pink-50 dark:bg-pink-900/20', border: 'border-pink-200 dark:border-pink-800' },
  { slug: 'investir', nameKey: 'svc.name.investir', icon: TrendingUp, color: 'text-teal-500', bg: 'bg-teal-50 dark:bg-teal-900/20', border: 'border-teal-200 dark:border-teal-800' },
];

export function ServiceNavCards({ currentSlug }: { currentSlug: string }) {
  const { tr } = useI18n();
  return (
    <div className="bg-gray-50 dark:bg-gray-900 border-t border-gray-200 dark:border-gray-800 py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <h3 className="text-xl font-bold text-center text-gray-900 dark:text-white mb-10">{tr('svc.nav.discover')}</h3>
        <div className="grid grid-cols-6 lg:grid-cols-5 gap-2 sm:gap-4">
          {navServices.map((srv, idx) => {
            const Icon = srv.icon;
            const isActive = srv.slug === currentSlug;
            // First 2 items span 3 cols each (= 2 per row), last 3 span 2 cols each (= 3 per row)
            const mobileSpan = idx < 2 ? 'col-span-3' : 'col-span-2';
            
            return (
              <Link 
                key={srv.slug} 
                href={`/services/${srv.slug}`}
                className={`${mobileSpan} lg:col-span-1 relative group flex flex-col p-3 sm:p-5 rounded-xl sm:rounded-2xl bg-white dark:bg-gray-950 shadow-sm transition-all duration-300 border
                  ${isActive ? `border-2 ${srv.border} shadow-md` : 'border-gray-100 dark:border-gray-800 hover:shadow-lg hover:-translate-y-1'}`}
              >
                {isActive && (
                  <div className={`absolute -top-2.5 sm:-top-3 left-1/2 -translate-x-1/2 px-2 sm:px-3 py-0.5 rounded-full text-[10px] sm:text-xs font-bold ${srv.bg} ${srv.color}`}>
                    {tr('svc.nav.here')}
                  </div>
                )}
                <div className={`w-9 h-9 sm:w-12 sm:h-12 rounded-lg sm:rounded-xl flex items-center justify-center mb-2 sm:mb-4 ${srv.bg}`}>
                  <Icon className={`${srv.color} w-4 h-4 sm:w-6 sm:h-6`} />
                </div>
                <h4 className={`font-semibold text-xs sm:text-sm leading-snug transition-colors ${isActive ? srv.color : 'text-gray-800 dark:text-gray-200 group-hover:text-gray-900 dark:group-hover:text-white'}`}>
                  {tr(srv.nameKey)}
                </h4>
              </Link>
            );
          })}
        </div>
      </div>
    </div>
  );
}
