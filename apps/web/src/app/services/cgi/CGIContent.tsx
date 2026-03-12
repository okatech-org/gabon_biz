'use client';

import React from 'react';
import { Lightbulb, Users, Award, Wrench, Video, Globe, GraduationCap, Star, MapPin, Cpu } from 'lucide-react';
import { ServiceHero } from '@/components/services/ServiceHero';
import { ServiceFeatures } from '@/components/services/ServiceFeatures';
import { ServiceTimeline } from '@/components/services/ServiceTimeline';
import { ServiceStats } from '@/components/services/ServiceStats';
import { ServiceFAQ } from '@/components/services/ServiceFAQ';
import { ServiceTestimonials } from '@/components/services/ServiceTestimonials';
import { ServiceBreadcrumb } from '@/components/services/ServiceBreadcrumb';
import { useI18n } from '@/lib/i18n/i18nContext';

const accentColor = '#F59E0B';

const FEATURE_ICONS = [Users, Award, Wrench, Video];

export default function CGIContent() {
  const { tr } = useI18n();

  const features = [
    { title: tr('svc.cgi.f1_title'), description: tr('svc.cgi.f1_desc'), highlights: [tr('svc.cgi.f1_h1'), tr('svc.cgi.f1_h2'), tr('svc.cgi.f1_h3'), tr('svc.cgi.f1_h4')] },
    { title: tr('svc.cgi.f2_title'), description: tr('svc.cgi.f2_desc'), highlights: ['Certifications UIT', 'SADA – Smart Africa', 'Cybersécurité', 'Data Science'] },
    { title: tr('svc.cgi.f3_title'), description: tr('svc.cgi.f3_desc'), highlights: ['Impression 3D', 'Découpe laser', 'Robotique', 'FabLab Moanda (PPP Eramet Comilog)'] },
    { title: tr('svc.cgi.f4_title'), description: tr('svc.cgi.f4_desc'), highlights: ['Capsules vidéo', 'Podcast', 'Branding startups', 'Communication institutionnelle'] },
  ];

  const timeline = [
    { title: tr('svc.cgi.tl1'), description: tr('svc.cgi.tl1d') },
    { title: tr('svc.cgi.tl2'), description: tr('svc.cgi.tl2d') },
    { title: tr('svc.cgi.tl3'), description: tr('svc.cgi.tl3d') },
    { title: tr('svc.cgi.tl4'), description: tr('svc.cgi.tl4d') },
    { title: tr('svc.cgi.tl5'), description: tr('svc.cgi.tl5d') },
    { title: tr('svc.cgi.tl6'), description: tr('svc.cgi.tl6d') },
    { title: tr('svc.cgi.tl7'), description: tr('svc.cgi.tl7d') },
    { title: tr('svc.cgi.tl8'), description: tr('svc.cgi.tl8d') },
  ];

  const stats = [
    { value: tr('svc.cgi.s1v'), label: tr('svc.cgi.s1l') },
    { value: tr('svc.cgi.s2v'), label: tr('svc.cgi.s2l') },
    { value: tr('svc.cgi.s3v'), label: tr('svc.cgi.s3l') },
    { value: tr('svc.cgi.s4v'), label: tr('svc.cgi.s4l') },
    { value: tr('svc.cgi.s5v'), label: tr('svc.cgi.s5l') },
    { value: tr('svc.cgi.s6v'), label: tr('svc.cgi.s6l') },
    { value: tr('svc.cgi.s7v'), label: tr('svc.cgi.s7l') },
    { value: tr('svc.cgi.s8v'), label: tr('svc.cgi.s8l') },
  ];

  const faqs = [
    { question: tr('svc.cgi.faq1q'), answer: tr('svc.cgi.faq1a') },
    { question: tr('svc.cgi.faq2q'), answer: tr('svc.cgi.faq2a') },
    { question: tr('svc.cgi.faq3q'), answer: tr('svc.cgi.faq3a') },
    { question: tr('svc.cgi.faq4q'), answer: tr('svc.cgi.faq4a') },
    { question: tr('svc.cgi.faq5q'), answer: tr('svc.cgi.faq5a') },
    { question: tr('svc.cgi.faq6q'), answer: tr('svc.cgi.faq6a') },
  ];

  const testimonials = [
    { quote: tr('svc.cgi.t1_quote'), author: 'Éric Mbeng Nkoghe', role: tr('svc.cgi.t1_role'), company: '' },
    { quote: tr('svc.cgi.t2_quote'), author: 'Laetitia Koumba Nzé', role: tr('svc.cgi.t2_role'), company: '' },
    { quote: tr('svc.cgi.t3_quote'), author: 'Jean-Michel Obiang', role: tr('svc.cgi.t3_role'), company: '' },
  ];

  return (
    <>
      <div className="max-w-7xl mx-auto px-6 pt-24 pb-4">
        <ServiceBreadcrumb serviceName={tr('svc.cgi.breadcrumb')} accentColor={accentColor} />
      </div>

      <ServiceHero
        badge={tr('svc.cgi.badge')}
        title={tr('svc.cgi.title')}
        subtitle={tr('svc.cgi.subtitle')}
        ctaPrimary={{ label: tr('svc.cgi.cta1'), href: '/dashboard/cgi' }}
        ctaSecondary={{ label: tr('svc.cgi.cta2'), href: '/demo' }}
        metrics={[
          { value: tr('svc.cgi.m1v'), label: tr('svc.cgi.m1l') },
          { value: tr('svc.cgi.m2v'), label: tr('svc.cgi.m2l') },
          { value: tr('svc.cgi.m3v'), label: tr('svc.cgi.m3l') },
        ]}
        accentColor={accentColor}
        icon={Lightbulb}
      />

      <ServiceFeatures
        accentColor={accentColor}
        features={features.map((f, i) => ({
          icon: FEATURE_ICONS[i] || Lightbulb,
          title: f.title,
          description: f.description,
        }))}
      />

      <ServiceTimeline
        accentColor={accentColor}
        steps={timeline.map((t, i) => ({
          number: i + 1,
          title: t.title,
          description: t.description,
        }))}
      />

      {/* Poles Detail Section */}
      <section className="py-24 bg-gray-50 dark:bg-gray-900/50">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-12 text-center">{tr('svc.cgi.poles')}</h2>
          <div className="grid md:grid-cols-2 gap-8">
            {features.map((feature, i) => {
              const Icon = FEATURE_ICONS[i] || Lightbulb;
              return (
                <div key={i} className="p-8 rounded-3xl bg-white dark:bg-gray-950 border border-gray-100 dark:border-gray-800 hover:shadow-xl transition-shadow">
                  <div className="w-14 h-14 rounded-2xl flex items-center justify-center mb-6" style={{ backgroundColor: `${accentColor}20` }}>
                    <Icon size={28} style={{ color: accentColor }} />
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">{feature.title}</h3>
                  <p className="text-gray-600 dark:text-gray-400 mb-6 leading-relaxed">{feature.description}</p>
                  <ul className="space-y-2">
                    {feature.highlights.map((h) => (
                      <li key={h} className="flex items-center gap-2 text-sm text-gray-700 dark:text-gray-300">
                        <div className="w-5 h-5 rounded-full flex items-center justify-center text-white font-bold text-xs shrink-0" style={{ backgroundColor: accentColor }}>✓</div>
                        {h}
                      </li>
                    ))}
                  </ul>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Coverage / Map Section */}
      <section className="py-24 bg-white dark:bg-gray-950">
        <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-2 gap-16 items-center">
          <div>
            <h3 className="text-3xl font-bold mb-6 text-gray-900 dark:text-white">{tr('svc.cgi.coverage')}</h3>
            <p className="text-lg text-gray-600 dark:text-gray-400 leading-relaxed mb-6">
              {tr('svc.cgi.coverage_desc')}
            </p>
            <ul className="space-y-4">
              <li className="flex gap-3 text-gray-700 dark:text-gray-300">
                <div className="w-6 h-6 rounded-full flex items-center justify-center text-white font-bold shrink-0" style={{ backgroundColor: accentColor }}>
                  <MapPin size={14} />
                </div>
                {tr('svc.cgi.loc1')}
              </li>
              <li className="flex gap-3 text-gray-700 dark:text-gray-300">
                <div className="w-6 h-6 rounded-full flex items-center justify-center text-white font-bold shrink-0" style={{ backgroundColor: accentColor }}>
                  <Cpu size={14} />
                </div>
                {tr('svc.cgi.loc2')}
              </li>
              <li className="flex gap-3 text-gray-700 dark:text-gray-300">
                <div className="w-6 h-6 rounded-full flex items-center justify-center text-white font-bold shrink-0" style={{ backgroundColor: accentColor }}>
                  <GraduationCap size={14} />
                </div>
                {tr('svc.cgi.loc3')}
              </li>
              <li className="flex gap-3 text-gray-700 dark:text-gray-300">
                <div className="w-6 h-6 rounded-full flex items-center justify-center text-white font-bold shrink-0" style={{ backgroundColor: accentColor }}>
                  <Globe size={14} />
                </div>
                {tr('svc.cgi.loc4')}
              </li>
            </ul>
          </div>
          <div className="bg-gray-200 dark:bg-gray-800 rounded-3xl aspect-4/3 flex items-center justify-center p-8">
            <span className="text-gray-400">{tr('svc.cgi.map_ph')}</span>
          </div>
        </div>
      </section>

      {/* SADA Section */}
      <section className="py-24 bg-gray-50 dark:bg-gray-900/50">
        <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-2 gap-16 items-center">
          <div className="bg-linear-to-br from-amber-500 to-orange-500 rounded-3xl p-8 text-white aspect-4/3 flex flex-col justify-center">
            <Globe size={48} className="mb-6 opacity-80" />
            <h3 className="text-3xl font-bold mb-4">{tr('svc.cgi.sada_title')}</h3>
            <p className="text-white/90 text-lg">{tr('svc.cgi.sada_desc')}</p>
            <div className="flex gap-4 mt-6">
              <div className="text-center">
                <div className="text-2xl font-extrabold">$20M</div>
                <div className="text-xs text-white/70">{tr('svc.cgi.wb')}</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-extrabold">€5M</div>
                <div className="text-xs text-white/70">GIZ/BMZ</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-extrabold">4</div>
                <div className="text-xs text-white/70">{tr('svc.cgi.members')}</div>
              </div>
            </div>
          </div>
          <div>
            <h3 className="text-3xl font-bold mb-6 text-gray-900 dark:text-white">{tr('svc.cgi.sada_gabon')}</h3>
            <p className="text-lg text-gray-600 dark:text-gray-400 leading-relaxed mb-6">
              {tr('svc.cgi.sada_signed')}
            </p>
            <ul className="space-y-4">
              <li className="flex gap-3 text-gray-700 dark:text-gray-300">
                <div className="w-6 h-6 rounded-full flex items-center justify-center text-white font-bold shrink-0" style={{ backgroundColor: accentColor }}>
                  <Star size={14} />
                </div>
                {tr('svc.cgi.sada_modules')}
              </li>
              <li className="flex gap-3 text-gray-700 dark:text-gray-300">
                <div className="w-6 h-6 rounded-full flex items-center justify-center text-white font-bold shrink-0" style={{ backgroundColor: accentColor }}>
                  <Award size={14} />
                </div>
                {tr('svc.cgi.sada_recognition')}
              </li>
            </ul>
          </div>
        </div>
      </section>

      <ServiceStats
        accentColor={accentColor}
        stats={stats}
      />

      <ServiceFAQ
        accentColor={accentColor}
        questions={faqs}
      />

      <ServiceTestimonials
        accentColor={accentColor}
        testimonials={testimonials}
      />
    </>
  );
}
