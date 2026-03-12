'use client';

import React from 'react';
import Link from 'next/link';
import { TrendingUp, Globe, Scale, Briefcase, Map, Rocket, Phone, ArrowRight, Wallet, ShoppingCart, HeartPulse, Sprout, GraduationCap, Building2, CheckCircle } from 'lucide-react';
import { ServiceHero } from '@/components/services/ServiceHero';
import { ServiceFeatures } from '@/components/services/ServiceFeatures';
import { ServiceTimeline } from '@/components/services/ServiceTimeline';
import { ServiceStats } from '@/components/services/ServiceStats';
import { ServiceFAQ } from '@/components/services/ServiceFAQ';
import { ServiceTestimonials } from '@/components/services/ServiceTestimonials';
import { ServiceBreadcrumb } from '@/components/services/ServiceBreadcrumb';
import { useI18n } from '@/lib/i18n/i18nContext';

const accentColor = '#14b8a6';

const NUMERIQUE_VERTICALES = [
  { icon: Wallet, titre: 'FinTech', desc: 'Mobile money, micro-crédit, néo-banque', color: '#10B981' },
  { icon: ShoppingCart, titre: 'e-Commerce', desc: 'Marketplace, livraison dernier km', color: '#8B5CF6' },
  { icon: HeartPulse, titre: 'HealthTech', desc: 'DMPG, télémédecine, e-pharmacie', color: '#EF4444' },
  { icon: Sprout, titre: 'AgriTech', desc: 'Micro-finance agricole, traçabilité', color: '#22C55E' },
  { icon: GraduationCap, titre: 'EdTech', desc: 'Formation continue, bootcamps', color: '#F59E0B' },
  { icon: Building2, titre: 'GovTech', desc: 'E-gov, data centers, cybersécurité', color: '#6366F1' },
];

export default function InvestirContent() {
  const { tr } = useI18n();
  return (
    <>
      <div className="max-w-7xl mx-auto px-6 pt-24 pb-4">
        <ServiceBreadcrumb serviceName={tr('svc.name.investir')} accentColor={accentColor} />
      </div>

      <ServiceHero
        badge={tr('svc.investir.badge')}
        title={tr('svc.name.investir')}
        subtitle={tr('svc.investir.subtitle')}
        ctaPrimary={{ label: tr('svc.investir.cta1'), href: "/guide-investisseur" }}
        ctaSecondary={{ label: tr('svc.investir.cta2'), href: "/contact" }}
        metrics={[
          { value: tr('svc.investir.m1.val'), label: tr('svc.investir.m1.label') },
          { value: tr('svc.investir.m2.val'), label: tr('svc.investir.m2.label') },
          { value: tr('svc.investir.m3.val'), label: tr('svc.investir.m3.label') }
        ]}
        accentColor={accentColor}
        icon={TrendingUp}
      />

      <ServiceFeatures
        accentColor={accentColor}
        features={[
          { icon: Map, title: "Zones Économiques Spéciales", description: "Implantation facilitée dans la ZES de Nkok. Avantages fiscaux et douaniers uniques." },
          { icon: Scale, title: "Cadre légal sécurisé", description: "Charte des investissements garantissant la liberté d'entreprendre et le libre transfert des capitaux." },
          { icon: Globe, title: "Positionnement stratégique", description: "Plateforme logistique majeure en Afrique centrale." },
          { icon: Briefcase, title: "Guichet de l'investisseur", description: "Accompagnement personnalisé par l'ANPI pour agréments, visas et autorisations." },
          { icon: Rocket, title: "Secteurs prioritaires", description: "Agro-industrie, bois, mines, numérique, tourisme et transformation locale." },
          { icon: Phone, title: "Ligne dédiée internationale", description: "Assistance multilingue pour les IDE." }
        ]}
      />

      <ServiceTimeline
        accentColor={accentColor}
        steps={[
          { number: 1, title: "Exploration et analyse", description: "Consultez la cartographie des opportunités et le guide de l'investisseur." },
          { number: 2, title: "Déclaration d'intention", description: "Soumettez votre dossier d'investissement pour une étude de préfaisabilité." },
          { number: 3, title: "Agréments et Installation", description: "Obtenez rapidement vos agréments investisseurs via notre circuit court." },
          { number: 4, title: "Déploiement et suivi", description: "Suivi aftercare pour la pérennité de vos activités au Gabon." }
        ]}
      />

      <section className="py-24 bg-gray-50 dark:bg-gray-900/50">
        <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-2 gap-16 items-center mb-24">
          <div className="bg-gray-200 dark:bg-gray-800 rounded-3xl aspect-4/3 flex items-center justify-center p-8">
            <span className="text-gray-400">Image illustrative</span>
          </div>
          <div>
            <h3 className="text-3xl font-bold mb-6 text-gray-900 dark:text-white">{tr('svc.investir.sec1.title')}</h3>
            <p className="text-lg text-gray-600 dark:text-gray-400 leading-relaxed mb-6">
              {tr('svc.investir.sec1.desc')}
            </p>
            <ul className="space-y-4">
              <li className="flex gap-3 text-gray-700 dark:text-gray-300"><div className="w-6 h-6 rounded-full flex items-center justify-center text-white font-bold shrink-0" style={{ backgroundColor: accentColor }}>✓</div>{tr('svc.investir.sec1.check1')}</li>
              <li className="flex gap-3 text-gray-700 dark:text-gray-300"><div className="w-6 h-6 rounded-full flex items-center justify-center text-white font-bold shrink-0" style={{ backgroundColor: accentColor }}>✓</div>{tr('svc.investir.sec1.check2')}</li>
            </ul>
          </div>
        </div>
        
        <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-2 gap-16 items-center">
          <div className="order-2 md:order-1">
            <h3 className="text-3xl font-bold mb-6 text-gray-900 dark:text-white">{tr('svc.investir.sec2.title')}</h3>
            <p className="text-lg text-gray-600 dark:text-gray-400 leading-relaxed mb-6">
              {tr('svc.investir.sec2.desc')}
            </p>
            <ul className="space-y-4">
              <li className="flex gap-3 text-gray-700 dark:text-gray-300"><div className="w-6 h-6 rounded-full flex items-center justify-center text-white font-bold shrink-0" style={{ backgroundColor: accentColor }}>✓</div>{tr('svc.investir.sec2.check1')}</li>
              <li className="flex gap-3 text-gray-700 dark:text-gray-300"><div className="w-6 h-6 rounded-full flex items-center justify-center text-white font-bold shrink-0" style={{ backgroundColor: accentColor }}>✓</div>{tr('svc.investir.sec2.check2')}</li>
            </ul>
          </div>
          <div className="order-1 md:order-2 bg-gray-200 dark:bg-gray-800 rounded-3xl aspect-4/3 flex items-center justify-center p-8">
            <span className="text-gray-400">Image illustrative</span>
          </div>
        </div>
      </section>

      {/* NEW — L'Économie Numérique : La Verticale Prioritaire */}
      <section className="py-24 bg-white dark:bg-gray-950">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-teal-50 dark:bg-teal-950/50 text-teal-600 dark:text-teal-400 text-sm font-semibold mb-4">
              🚀 Verticale Prioritaire
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
              L&apos;Économie Numérique : 6 Verticales de Croissance
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
              135% de pénétration mobile, mais seulement 33% de comptes numériques actifs.
              Ce gap représente la plus grande opportunité d&apos;investissement en Afrique Centrale.
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {NUMERIQUE_VERTICALES.map((v, i) => (
              <div key={i} className="p-6 rounded-2xl bg-gray-50 dark:bg-gray-900 border border-gray-100 dark:border-gray-800 hover:shadow-lg transition-shadow">
                <div className="w-12 h-12 rounded-xl flex items-center justify-center mb-4" style={{ backgroundColor: v.color + '15' }}>
                  <v.icon size={24} className="text-current" style={{ color: v.color }} />
                </div>
                <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-1">{v.titre}</h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">{v.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* NEW — Success Story POZI */}
      <section className="py-24 bg-gray-50 dark:bg-gray-900/50">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-50 dark:bg-emerald-950/50 text-emerald-600 dark:text-emerald-400 text-sm font-semibold mb-6">
                ✅ Success Story
              </div>
              <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">
                POZI : Le Premier Deal VC Étranger du Gabon
              </h2>
              <p className="text-lg text-gray-600 dark:text-gray-400 leading-relaxed mb-6">
                En octobre 2025, la startup gabonaise POZI (télématique & gestion de flotte IA) a clôturé
                un tour Seed de <strong>€650 000</strong>, mené par Saviu Ventures avec Emsy Capital en co-investisseur.
              </p>
              <ul className="space-y-3 mb-6">
                {[
                  '2 500+ véhicules connectés au Gabon',
                  'Clients B2B : transporteurs nationaux et multinationales',
                  'Expansion prévue en Côte d\'Ivoire — objectif 35 000 véhicules / 10 marchés en 2030',
                ].map((item, i) => (
                  <li key={i} className="flex items-start gap-3 text-gray-700 dark:text-gray-300">
                    <CheckCircle size={18} className="text-emerald-500 shrink-0 mt-0.5" />
                    <span className="text-sm">{item}</span>
                  </li>
                ))}
              </ul>
              <p className="text-sm text-gray-500 dark:text-gray-400 italic">
                &ldquo;Première levée VC étrangère au Gabon. La preuve que l&apos;écosystème est prêt.&rdquo;
              </p>
            </div>
            <div className="bg-linear-to-br from-teal-500 to-emerald-600 rounded-3xl p-10 text-white">
              <h3 className="text-xl font-bold mb-6">Métriques du deal</h3>
              <div className="grid grid-cols-2 gap-4">
                {[
                  { label: 'Montant', value: '€650K' },
                  { label: 'Lead Investor', value: 'Saviu Ventures' },
                  { label: 'Co-Investor', value: 'Emsy Capital' },
                  { label: 'Secteur', value: 'LogisTech / IA' },
                  { label: 'Véhicules', value: '2 500+' },
                  { label: 'Ambition 2030', value: '35K véhicules' },
                ].map((m, i) => (
                  <div key={i} className="p-3 bg-white/10 rounded-xl border border-white/10">
                    <div className="text-white/70 text-xs mb-1">{m.label}</div>
                    <div className="font-bold text-sm">{m.value}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* NEW — Écosystème de Support Investisseur */}
      <section className="py-24 bg-white dark:bg-gray-950">
        <div className="max-w-7xl mx-auto px-6 text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
            Écosystème de Support Investisseur
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
            Un réseau institutionnel structuré pour sécuriser et accélérer votre investissement
          </p>
        </div>
        <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {[
            { icon: '🏛️', titre: 'ANPI-Gabon', desc: 'Guichet Numérique — création entreprise 100% en ligne' },
            { icon: '🚀', titre: 'SING SA', desc: '1er incubateur 100% numérique CEMAC — 38 startups' },
            { icon: '💡', titre: 'CGI / SADA', desc: 'Centre d\'Innovation (UIT) — formations internationales' },
            { icon: '🏦', titre: 'FONAP', desc: 'Prêts bonifiés et co-financement projets innovants' },
          ].map((item, i) => (
            <div key={i} className="p-6 rounded-2xl bg-gray-50 dark:bg-gray-900 border border-gray-100 dark:border-gray-800 text-center hover:shadow-lg transition-shadow">
              <div className="text-3xl mb-3">{item.icon}</div>
              <h3 className="font-bold text-gray-900 dark:text-white mb-2">{item.titre}</h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* NEW — CTA vers page investir-numerique */}
      <section className="py-16 bg-gray-50 dark:bg-gray-900/50">
        <div className="max-w-5xl mx-auto px-6">
          <div className="rounded-3xl bg-linear-to-r from-teal-600 via-emerald-500 to-green-600 p-10 md:p-14 text-center relative overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full -translate-y-1/2 translate-x-1/3 blur-3xl" />
            <div className="relative z-10">
              <h2 className="text-2xl md:text-3xl font-extrabold text-white mb-4">
                Rapport complet : Investir dans l&apos;Économie Numérique du Gabon
              </h2>
              <p className="text-white/80 mb-8 max-w-2xl mx-auto">
                Données macroéconomiques BAD, marchés télécom ARCEP, 6 verticales sectorielles, deal flow et cas d&apos;étude POZI — tout en un.
              </p>
              <Link href="/investir-numerique" className="inline-flex items-center gap-2 px-8 py-4 bg-white text-teal-700 rounded-2xl font-bold text-base hover:bg-gray-100 transition-all shadow-xl no-underline">
                Accéder au rapport <ArrowRight size={18} />
              </Link>
            </div>
          </div>
        </div>
      </section>

      <ServiceStats
        accentColor={accentColor}
        stats={[
          { value: tr('svc.investir.m1.val'), label: "Pôles de compétitivité" },
          { value: "11%", label: "Croissance des IDE (2025)" },
          { value: "3M+", label: "Marché consommateurs (CEMAC)" }
        ]}
      />

      <ServiceFAQ
        accentColor={accentColor}
        questions={[
          { question: "Qu'est-ce que l'agrément investisseur ?", answer: "Un statut officiel octroyé par l'ANPI pour bénéficier des avantages de la Charte." },
          { question: "Un étranger peut-il détenir 100% de son entreprise ?", answer: "Oui, sauf dans les secteurs stratégiques régulés." },
          { question: "Comment rapatrier ses bénéfices ?", answer: "Bénéfices et capitaux librement transférables conformément aux règles CEMAC/BEAC." },
          { question: "Quels avantages en ZES ?", answer: "Exonération d'IS et TVA, rapatriement 100%, infrastructures premium, douane intégrée." },
          { question: "Quel accompagnement offre GABON BIZ ?", answer: "Démarches préliminaires en ligne et mise en relation avec l'ANPI-GABON." }
        ]}
      />

      <ServiceTestimonials
        accentColor={accentColor}
        testimonials={[
          { quote: "Le guichet unique nous a permis d'installer notre usine en un temps record.", author: "Rajiv Sharma", role: "Directeur des Opérations", company: "ZES Nkok" },
          { quote: "La transparence et les incitations fiscales sont réelles et appliquées.", author: "Claire Dupont", role: "Investisseur International", company: "Paris" }
        ]}
      />
    </>
  );
}
