'use client';

import React from 'react';
import { Building2, FileText, Hash, LayoutDashboard, Search, CreditCard, Bell } from 'lucide-react';
import CompactHero from '@/components/services/CompactHero';
import { ServiceFeatures } from '@/components/services/ServiceFeatures';
import { ServiceTimeline } from '@/components/services/ServiceTimeline';
import { ServiceStats } from '@/components/services/ServiceStats';

import { useI18n } from '@/lib/i18n/i18nContext';

const accentColor = '#009e49';

export default function GuichetEntrepreneurContent() {
  const { tr } = useI18n();
  return (
    <>
      <CompactHero
        badge={tr('svc.guichet.badge')}
        badgeIcon={<Building2 size={14} />}
        title={<><span className="block">{tr('svc.guichet.title')}</span><span className="block text-white/85 text-xl md:text-2xl font-medium">Guichet Unique Entrepreneur</span></>}
        subtitle={tr('svc.guichet.subtitle')}
        backgroundClasses="bg-linear-to-br from-emerald-600 via-green-500 to-teal-600 dark:from-emerald-900 dark:via-green-800 dark:to-teal-900"
        overlays={<>
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_50%,rgba(255,255,255,0.1),transparent_60%)]" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_20%,rgba(255,255,255,0.08),transparent_50%)]" />
        </>}
        accentColor={accentColor}
        ctaPrimary={{ label: tr('svc.guichet.cta1'), href: "/login" }}
        ctaSecondary={{ label: tr('svc.guichet.cta2'), href: "/dashboard/entreprises" }}
        stats={[
          { value: tr('svc.guichet.m1.val'), label: tr('svc.guichet.m1.label') },
          { value: tr('svc.guichet.m2.val'), label: tr('svc.guichet.m2.label') },
          { value: tr('svc.guichet.m3.val'), label: tr('svc.guichet.m3.label') }
        ]}
      />

      <ServiceFeatures
        accentColor={accentColor}
        mobileColumns={3}
        features={[
          { icon: FileText, title: tr('svc.guichet.f1.title'), description: tr('svc.guichet.f1.desc') },
          { icon: Hash, title: tr('svc.guichet.f2.title'), description: tr('svc.guichet.f2.desc') },
          { icon: LayoutDashboard, title: tr('svc.guichet.f3.title'), description: tr('svc.guichet.f3.desc') },
          { icon: Search, title: tr('svc.guichet.f4.title'), description: tr('svc.guichet.f4.desc') },
          { icon: CreditCard, title: tr('svc.guichet.f5.title'), description: tr('svc.guichet.f5.desc') },
          { icon: Bell, title: tr('svc.guichet.f6.title'), description: tr('svc.guichet.f6.desc') }
        ]}
      />

      <ServiceTimeline
        accentColor={accentColor}
        steps={[
          { number: 1, title: tr('svc.guichet.s1.title'), description: tr('svc.guichet.s1.desc') },
          { number: 2, title: tr('svc.guichet.s2.title'), description: tr('svc.guichet.s2.desc') },
          { number: 3, title: tr('svc.guichet.s3.title'), description: tr('svc.guichet.s3.desc') },
          { number: 4, title: tr('svc.guichet.s4.title'), description: tr('svc.guichet.s4.desc') }
        ]}
      />

      <section className="py-24 bg-gray-100 dark:bg-gray-900/50">
        <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-2 gap-16 items-center mb-24">
          <div className="bg-gray-200 dark:bg-gray-800 rounded-3xl aspect-4/3 flex items-center justify-center p-8">
            <span className="text-gray-400">Image illustrative</span>
          </div>
          <div>
            <h3 className="text-3xl font-bold mb-6 text-gray-900 dark:text-white">{tr('svc.guichet.section1.title')}</h3>
            <p className="text-lg text-gray-600 dark:text-gray-400 leading-relaxed mb-6">
              {tr('svc.guichet.section1.desc')}
            </p>
            <ul className="space-y-4">
              <li className="flex gap-3 text-gray-700 dark:text-gray-300"><div className="w-6 h-6 rounded-full flex items-center justify-center text-white font-bold shrink-0" style={{ backgroundColor: accentColor }}>✓</div>{tr('svc.guichet.section1.check1')}</li>
              <li className="flex gap-3 text-gray-700 dark:text-gray-300"><div className="w-6 h-6 rounded-full flex items-center justify-center text-white font-bold shrink-0" style={{ backgroundColor: accentColor }}>✓</div>{tr('svc.guichet.section1.check2')}</li>
            </ul>
          </div>
        </div>
        
        <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-2 gap-16 items-center">
          <div className="order-2 md:order-1">
            <h3 className="text-3xl font-bold mb-6 text-gray-900 dark:text-white">{tr('svc.guichet.section2.title')}</h3>
            <p className="text-lg text-gray-600 dark:text-gray-400 leading-relaxed mb-6">
              {tr('svc.guichet.section2.desc')}
            </p>
            <ul className="space-y-4">
              <li className="flex gap-3 text-gray-700 dark:text-gray-300"><div className="w-6 h-6 rounded-full flex items-center justify-center text-white font-bold shrink-0" style={{ backgroundColor: accentColor }}>✓</div>{tr('svc.guichet.section2.check1')}</li>
              <li className="flex gap-3 text-gray-700 dark:text-gray-300"><div className="w-6 h-6 rounded-full flex items-center justify-center text-white font-bold shrink-0" style={{ backgroundColor: accentColor }}>✓</div>{tr('svc.guichet.section2.check2')}</li>
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
          { value: tr('svc.guichet.stat1.val'), label: tr('svc.guichet.stat1.label') },
          { value: tr('svc.guichet.stat2.val'), label: tr('svc.guichet.stat2.label') },
          { value: tr('svc.guichet.stat3.val'), label: tr('svc.guichet.stat3.label') }
        ]}
      />

    </>
  );
}
