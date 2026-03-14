'use client';

import React from 'react';
import { FileSearch, Search, BellRing, Send, ShieldCheck, ClipboardList, Download } from 'lucide-react';
import CompactHero from '@/components/services/CompactHero';
import { ServiceFeatures } from '@/components/services/ServiceFeatures';
import { ServiceTimeline } from '@/components/services/ServiceTimeline';
import { ServiceStats } from '@/components/services/ServiceStats';

import { useI18n } from '@/lib/i18n/i18nContext';

const accentColor = '#3b82f6';

export default function MarchesPublicsContent() {
  const { tr } = useI18n();
  return (
    <>
      <CompactHero
        badge={tr('svc.marches.badge')}
        badgeIcon={<FileSearch size={14} />}
        title={<><span className="block">{tr('svc.name.marches')}</span><span className="block text-white/85 text-xl md:text-2xl font-medium">Marchés Publics Numériques</span></>}
        subtitle={tr('svc.marches.subtitle')}
        backgroundClasses="bg-linear-to-br from-blue-600 via-blue-500 to-indigo-600 dark:from-blue-900 dark:via-blue-800 dark:to-indigo-900"
        overlays={<>
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_50%,rgba(255,255,255,0.1),transparent_60%)]" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_20%,rgba(255,255,255,0.08),transparent_50%)]" />
        </>}
        accentColor={accentColor}
        ctaPrimary={{ label: tr('svc.marches.cta1'), href: "/dashboard/marches" }}
        ctaSecondary={{ label: tr('svc.marches.cta2'), href: "/dashboard/marches" }}
        stats={[
          { value: tr('svc.marches.m1.val'), label: tr('svc.marches.m1.label') },
          { value: tr('svc.marches.m2.val'), label: tr('svc.marches.m2.label') },
          { value: tr('svc.marches.m3.val'), label: tr('svc.marches.m3.label') }
        ]}
      />

      <ServiceFeatures
        accentColor={accentColor}
        features={[
          { icon: Search, title: tr('svc.marches.f1.title'), description: tr('svc.marches.f1.desc') },
          { icon: BellRing, title: tr('svc.marches.f2.title'), description: tr('svc.marches.f2.desc') },
          { icon: Send, title: tr('svc.marches.f3.title'), description: tr('svc.marches.f3.desc') },
          { icon: ShieldCheck, title: tr('svc.marches.f4.title'), description: tr('svc.marches.f4.desc') },
          { icon: ClipboardList, title: tr('svc.marches.f5.title'), description: tr('svc.marches.f5.desc') },
          { icon: Download, title: tr('svc.marches.f6.title'), description: tr('svc.marches.f6.desc') }
        ]}
      />

      <ServiceTimeline
        accentColor={accentColor}
        steps={[
          { number: 1, title: tr('svc.marches.s1.title'), description: tr('svc.marches.s1.desc') },
          { number: 2, title: tr('svc.marches.s2.title'), description: tr('svc.marches.s2.desc') },
          { number: 3, title: tr('svc.marches.s3.title'), description: tr('svc.marches.s3.desc') },
          { number: 4, title: tr('svc.marches.s4.title'), description: tr('svc.marches.s4.desc') }
        ]}
      />

      <section className="py-24 bg-gray-100 dark:bg-gray-900/50">
        <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-2 gap-16 items-center mb-24">
          <div className="bg-gray-200 dark:bg-gray-800 rounded-3xl aspect-4/3 flex items-center justify-center p-8">
            <span className="text-gray-400">Image illustrative</span>
          </div>
          <div>
            <h3 className="text-3xl font-bold mb-6 text-gray-900 dark:text-white">{tr('svc.marches.sec1.title')}</h3>
            <p className="text-lg text-gray-600 dark:text-gray-400 leading-relaxed mb-6">
              {tr('svc.marches.sec1.desc')}
            </p>
            <ul className="space-y-4">
              <li className="flex gap-3 text-gray-700 dark:text-gray-300"><div className="w-6 h-6 rounded-full flex items-center justify-center text-white font-bold shrink-0" style={{ backgroundColor: accentColor }}>✓</div>{tr('svc.marches.sec1.check1')}</li>
              <li className="flex gap-3 text-gray-700 dark:text-gray-300"><div className="w-6 h-6 rounded-full flex items-center justify-center text-white font-bold shrink-0" style={{ backgroundColor: accentColor }}>✓</div>{tr('svc.marches.sec1.check2')}</li>
            </ul>
          </div>
        </div>
        
        <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-2 gap-16 items-center">
          <div className="order-2 md:order-1">
            <h3 className="text-3xl font-bold mb-6 text-gray-900 dark:text-white">{tr('svc.marches.sec2.title')}</h3>
            <p className="text-lg text-gray-600 dark:text-gray-400 leading-relaxed mb-6">
              {tr('svc.marches.sec2.desc')}
            </p>
            <ul className="space-y-4">
              <li className="flex gap-3 text-gray-700 dark:text-gray-300"><div className="w-6 h-6 rounded-full flex items-center justify-center text-white font-bold shrink-0" style={{ backgroundColor: accentColor }}>✓</div>{tr('svc.marches.sec2.check1')}</li>
              <li className="flex gap-3 text-gray-700 dark:text-gray-300"><div className="w-6 h-6 rounded-full flex items-center justify-center text-white font-bold shrink-0" style={{ backgroundColor: accentColor }}>✓</div>{tr('svc.marches.sec2.check2')}</li>
            </ul>
          </div>
          <div className="order-1 md:order-2 bg-gray-200 dark:bg-gray-800 rounded-3xl aspect-4/3 flex items-center justify-center p-8">
            <span className="text-gray-400">Image illustrative</span>
          </div>
        </div>
      </section>

      <ServiceStats
        accentColor={accentColor}
        stats={[
          { value: tr('svc.marches.stat1.val'), label: tr('svc.marches.stat1.label') },
          { value: tr('svc.marches.stat2.val'), label: tr('svc.marches.stat2.label') },
          { value: tr('svc.marches.stat3.val'), label: tr('svc.marches.stat3.label') }
        ]}
      />

    </>
  );
}
