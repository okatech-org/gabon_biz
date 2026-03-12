'use client';

import React from 'react';
import { Building2, FileText, Hash, LayoutDashboard, Search, CreditCard, Bell } from 'lucide-react';
import { ServiceHero } from '@/components/services/ServiceHero';
import { ServiceFeatures } from '@/components/services/ServiceFeatures';
import { ServiceTimeline } from '@/components/services/ServiceTimeline';
import { ServiceStats } from '@/components/services/ServiceStats';
import { ServiceFAQ } from '@/components/services/ServiceFAQ';
import { ServiceTestimonials } from '@/components/services/ServiceTestimonials';
import { ServiceBreadcrumb } from '@/components/services/ServiceBreadcrumb';
import { useI18n } from '@/lib/i18n/i18nContext';

const accentColor = '#009e49';

export default function GuichetEntrepreneurContent() {
  const { tr } = useI18n();
  return (
    <>
      <div className="max-w-7xl mx-auto px-6 pt-24 pb-4">
        <ServiceBreadcrumb serviceName={tr('svc.guichet.title')} accentColor={accentColor} />
      </div>

      <ServiceHero
        badge={tr('svc.guichet.badge')}
        title={tr('svc.guichet.title')}
        subtitle={tr('svc.guichet.subtitle')}
        ctaPrimary={{ label: tr('svc.guichet.cta1'), href: "/login" }}
        ctaSecondary={{ label: tr('svc.guichet.cta2'), href: "/dashboard/entreprises" }}
        metrics={[
          { value: tr('svc.guichet.m1.val'), label: tr('svc.guichet.m1.label') },
          { value: tr('svc.guichet.m2.val'), label: tr('svc.guichet.m2.label') },
          { value: tr('svc.guichet.m3.val'), label: tr('svc.guichet.m3.label') }
        ]}
        accentColor={accentColor}
        icon={Building2}
      />

      <ServiceFeatures
        accentColor={accentColor}
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

      <section className="py-24 bg-gray-50 dark:bg-gray-900/50">
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

      <ServiceFAQ
        accentColor={accentColor}
        questions={[
          { question: tr('svc.guichet.faq1.q'), answer: tr('svc.guichet.faq1.a') },
          { question: tr('svc.guichet.faq2.q'), answer: tr('svc.guichet.faq2.a') },
          { question: tr('svc.guichet.faq3.q'), answer: tr('svc.guichet.faq3.a') },
          { question: tr('svc.guichet.faq4.q'), answer: tr('svc.guichet.faq4.a') },
          { question: tr('svc.guichet.faq5.q'), answer: tr('svc.guichet.faq5.a') }
        ]}
      />

      <ServiceTestimonials
        accentColor={accentColor}
        testimonials={[
          { quote: tr('svc.guichet.testi1.quote'), author: tr('svc.guichet.testi1.author'), role: tr('svc.guichet.testi1.role'), company: tr('svc.guichet.testi1.company') },
          { quote: tr('svc.guichet.testi2.quote'), author: tr('svc.guichet.testi2.author'), role: tr('svc.guichet.testi2.role'), company: tr('svc.guichet.testi2.company') },
          { quote: tr('svc.guichet.testi3.quote'), author: tr('svc.guichet.testi3.author'), role: tr('svc.guichet.testi3.role'), company: tr('svc.guichet.testi3.company') }
        ]}
      />
    </>
  );
}
