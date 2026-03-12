'use client';

import React from 'react';
import { Rocket, CalendarDays, GraduationCap, Users, TrendingUp, BookOpen, Handshake } from 'lucide-react';
import { ServiceHero } from '@/components/services/ServiceHero';
import { ServiceFeatures } from '@/components/services/ServiceFeatures';
import { ServiceTimeline } from '@/components/services/ServiceTimeline';
import { ServiceStats } from '@/components/services/ServiceStats';
import { ServiceFAQ } from '@/components/services/ServiceFAQ';
import { ServiceTestimonials } from '@/components/services/ServiceTestimonials';
import { ServiceBreadcrumb } from '@/components/services/ServiceBreadcrumb';
import { useI18n } from '@/lib/i18n/i18nContext';

const accentColor = '#ec4899';

export default function IncubateurContent() {
  const { tr } = useI18n();
  return (
    <>
      <div className="max-w-7xl mx-auto px-6 pt-24 pb-4">
        <ServiceBreadcrumb serviceName={tr('svc.name.incubateur')} accentColor={accentColor} />
      </div>

      <ServiceHero
        badge={tr('svc.incubateur.badge')}
        title={tr('svc.name.incubateur')}
        subtitle={tr('svc.incubateur.subtitle')}
        ctaPrimary={{ label: tr('svc.incubateur.cta1'), href: "/dashboard/incubateur" }}
        ctaSecondary={{ label: tr('svc.incubateur.cta2'), href: "/login" }}
        metrics={[
          { value: tr('svc.incubateur.m1.val'), label: tr('svc.incubateur.m1.label') },
          { value: tr('svc.incubateur.m2.val'), label: tr('svc.incubateur.m2.label') },
          { value: tr('svc.incubateur.m3.val'), label: tr('svc.incubateur.m3.label') }
        ]}
        accentColor={accentColor}
        icon={Rocket}
      />

      <ServiceFeatures
        accentColor={accentColor}
        features={[
          { icon: CalendarDays, title: "Programmes structurés", description: "Incubation classique (6 mois), Accélération (3 mois) ou Immersion (1 mois)." },
          { icon: GraduationCap, title: "Ateliers & Formations", description: "Business model, UX/UI, marketing digital, pitch." },
          { icon: Users, title: "Mentorat d'excellence", description: "Suivi par des entrepreneurs expérimentés et des investisseurs." },
          { icon: TrendingUp, title: "Financement d'amorçage", description: "Bourses de prototypage et financements sans prise de participation." },
          { icon: BookOpen, title: "Ressources mutualisées", description: "Espaces de coworking, outils logiciels, support juridique." },
          { icon: Handshake, title: "Réseau partenaire", description: "Communauté Alumni et partenariats stratégiques." }
        ]}
      />

      <ServiceTimeline
        accentColor={accentColor}
        steps={[
          { number: 1, title: "Candidature en ligne", description: "Soumettez votre projet via notre plateforme." },
          { number: 2, title: "Sélection et Pitch", description: "Les projets présélectionnés pitchent devant un comité d'experts." },
          { number: 3, title: "Immersion et Diagnostic", description: "Audit 360° et feuille de route personnalisée." },
          { number: 4, title: "Accélération et Demo Day", description: "Programme intensif puis présentation devant des investisseurs." }
        ]}
      />

      <section className="py-24 bg-gray-50 dark:bg-gray-900/50">
        <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-2 gap-16 items-center mb-24">
          <div className="bg-gray-200 dark:bg-gray-800 rounded-3xl aspect-4/3 flex items-center justify-center p-8">
            <span className="text-gray-400">Image illustrative</span>
          </div>
          <div>
            <h3 className="text-3xl font-bold mb-6 text-gray-900 dark:text-white">{tr('svc.incubateur.sec1.title')}</h3>
            <p className="text-lg text-gray-600 dark:text-gray-400 leading-relaxed mb-6">
              {tr('svc.incubateur.sec1.desc')}
            </p>
            <ul className="space-y-4">
              <li className="flex gap-3 text-gray-700 dark:text-gray-300"><div className="w-6 h-6 rounded-full flex items-center justify-center text-white font-bold shrink-0" style={{ backgroundColor: accentColor }}>✓</div>{tr('svc.incubateur.sec1.check1')}</li>
              <li className="flex gap-3 text-gray-700 dark:text-gray-300"><div className="w-6 h-6 rounded-full flex items-center justify-center text-white font-bold shrink-0" style={{ backgroundColor: accentColor }}>✓</div>{tr('svc.incubateur.sec1.check2')}</li>
            </ul>
          </div>
        </div>
        
        <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-2 gap-16 items-center">
          <div className="order-2 md:order-1">
            <h3 className="text-3xl font-bold mb-6 text-gray-900 dark:text-white">{tr('svc.incubateur.sec2.title')}</h3>
            <p className="text-lg text-gray-600 dark:text-gray-400 leading-relaxed mb-6">
              {tr('svc.incubateur.sec2.desc')}
            </p>
            <ul className="space-y-4">
              <li className="flex gap-3 text-gray-700 dark:text-gray-300"><div className="w-6 h-6 rounded-full flex items-center justify-center text-white font-bold shrink-0" style={{ backgroundColor: accentColor }}>✓</div>{tr('svc.incubateur.sec2.check1')}</li>
              <li className="flex gap-3 text-gray-700 dark:text-gray-300"><div className="w-6 h-6 rounded-full flex items-center justify-center text-white font-bold shrink-0" style={{ backgroundColor: accentColor }}>✓</div>{tr('svc.incubateur.sec2.check2')}</li>
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
          { value: tr('svc.incubateur.m1.val'), label: "Startups accompagnées" },
          { value: "1.5 Mds", label: "Fonds levés (XAF)" },
          { value: "85%", label: "Taux de survie à 2 ans" }
        ]}
      />

      <ServiceFAQ
        accentColor={accentColor}
        questions={[
          { question: "L'incubation est-elle payante ?", answer: "Les programmes sont subventionnés. Une participation symbolique peut être demandée." },
          { question: "Dois-je avoir une entreprise créée pour postuler ?", answer: "Non, vous pouvez postuler au stade de l'idée." },
          { question: "Combien de temps dure l'accompagnement ?", answer: "De 1 à 6 mois selon le programme, renouvelable une fois." },
          { question: "Prenez-vous des parts ?", answer: "Non, la SING 2.0 ne prend pas de capital dans les startups accompagnées." },
          { question: "Comment se déroulera le Demo Day ?", answer: "Journée de pitchs devant des investisseurs régionaux et internationaux." }
        ]}
      />

      <ServiceTestimonials
        accentColor={accentColor}
        testimonials={[
          { quote: "Le mentorat de la SING a complètement transformé notre modèle économique.", author: "Christian Boussougou", role: "CEO FinStart", company: "Libreville" },
          { quote: "L'accès aux ressources partagées nous a permis de tenir pendant la phase de création.", author: "Nina Mengue", role: "Fondatrice EduGabon", company: "Libreville" }
        ]}
      />
    </>
  );
}
