'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import {
  Lightbulb,
  Users,
  Award,
  Wrench,
  Video,
  Globe,
  GraduationCap,
  MapPin,
  Cpu,
  Calendar,
  ArrowRight,
  ChevronRight,
  Printer,
  Zap,
  Mic,
  Palette,
  Camera,
} from 'lucide-react';
import CompactHero from '@/components/services/CompactHero';
import { ServiceStats } from '@/components/services/ServiceStats';
import {
  useServiceToast,
  ToastContainer,
  ConfirmationModal,
} from '@/components/services/InteractiveServiceSection';
import { ServiceActionCard } from '@/components/services/ServiceActionCard';
import {
  CGI_EVENEMENTS,
  CGI_PROJETS_FABLAB,
  CGI_PRODUCTIONS_MEDIALAB,
  CGI_POLES,
  CGI_PROGRAMME_SADA,
  type CGIEvenement,
} from '@/lib/mock/cgi-data';
import { useAuth } from '@/lib/auth-context';
import { useI18n } from '@/lib/i18n/i18nContext';

const accentColor = '#F59E0B';

const fadeIn = {
  hidden: { opacity: 0, y: 20 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, delay: i * 0.1, ease: 'easeOut' as const },
  }),
};

/* ═══════════════════════════════════════════
   CGI PAGE — BLENDED INFO + INTERACTIVE
   ═══════════════════════════════════════════ */
export default function CGIContent() {
  const { tr } = useI18n();

  const stats = [
    { value: tr('svc.cgi.s1v') || '3 420+', label: tr('svc.cgi.s1l') || 'Personnes formées' },
    { value: tr('svc.cgi.s2v') || '1 247', label: tr('svc.cgi.s2l') || 'Certifiés internationaux' },
    { value: tr('svc.cgi.s3v') || '64', label: tr('svc.cgi.s3l') || 'Projets FabLab' },
    { value: tr('svc.cgi.s4v') || '480', label: tr('svc.cgi.s4l') || 'Jeunes formés IA' },
    { value: tr('svc.cgi.s5v') || '78%', label: tr('svc.cgi.s5l') || "Taux d'insertion" },
    { value: tr('svc.cgi.s6v') || '7/9', label: tr('svc.cgi.s6l') || 'Provinces atteintes' },
    { value: tr('svc.cgi.s7v') || '100', label: tr('svc.cgi.s7l') || 'Enseignants formés' },
    { value: tr('svc.cgi.s8v') || '12', label: tr('svc.cgi.s8l') || 'Partenaires internationaux' },
  ];

  return (
    <>
      {/* ─── HERO ─── */}
      <CompactHero
        badge={tr('svc.cgi.badge') || "Centre Gabonais de l'Innovation"}
        badgeIcon={<Lightbulb size={14} />}
        title={
          <>
            <span className="block">
              {tr('svc.cgi.title') || "L'Innovation au Service du Gabon"}
            </span>
            <span className="block text-white/85 text-xl md:text-2xl font-medium">
              Centre d&apos;Innovation (CGI)
            </span>
          </>
        }
        subtitle={
          tr('svc.cgi.subtitle') ||
          'Filiale SPIN sous tutelle MENUDI — 4 Pôles: Acculturation, Certification, FabLab, MediaLab'
        }
        backgroundClasses="bg-linear-to-br from-amber-600 via-orange-500 to-yellow-600 dark:from-amber-900 dark:via-orange-800 dark:to-yellow-900"
        overlays={
          <>
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_50%,rgba(255,255,255,0.1),transparent_60%)]" />
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_20%,rgba(255,255,255,0.08),transparent_50%)]" />
          </>
        }
        accentColor={accentColor}
        ctaPrimary={{ label: tr('svc.cgi.cta1') || 'Accéder au CGI', href: '/dashboard/cgi' }}
        ctaSecondary={{ label: tr('svc.cgi.cta2') || 'Essayer en Démo', href: '/demo' }}
        stats={[
          { value: tr('svc.cgi.m1v') || '3 420+', label: tr('svc.cgi.m1l') || 'Formés' },
          { value: tr('svc.cgi.m2v') || '64', label: tr('svc.cgi.m2l') || 'Projets FabLab' },
          { value: tr('svc.cgi.m3v') || '1 247', label: tr('svc.cgi.m3l') || 'Certifiés' },
        ]}
      />

      {/* ─── §1: INNOVATION HUB IMAGE + INTRO ─── */}
      <section className="py-20 bg-white dark:bg-gray-950">
        <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-2 gap-12 lg:gap-16 items-center">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeIn}
            custom={0}
            className="relative rounded-3xl overflow-hidden shadow-2xl aspect-4/3"
          >
            <Image
              src="/images/services/cgi-innovation-hub.png"
              alt="Centre Gabonais de l'Innovation — FabLab et espace de travail collaboratif"
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 50vw"
            />
            <div className="absolute inset-0 bg-linear-to-t from-black/40 via-transparent to-transparent" />
            <div className="absolute bottom-4 left-4 right-4">
              <span className="px-3 py-1.5 rounded-full bg-amber-500/90 text-white text-xs font-bold backdrop-blur-sm">
                📍 FabLab — CGI Libreville
              </span>
            </div>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeIn}
            custom={1}
          >
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-100 dark:bg-amber-950/40 text-amber-700 dark:text-amber-400 text-xs font-bold mb-4">
              <Lightbulb size={14} /> L&apos;Innovation Made in Gabon
            </div>
            <h2 className="text-3xl lg:text-4xl font-extrabold text-gray-900 dark:text-white mb-4 leading-tight">
              Un écosystème complet pour <span style={{ color: accentColor }}>innover</span>,{' '}
              <span style={{ color: accentColor }}>apprendre</span> et{' '}
              <span style={{ color: accentColor }}>créer</span>
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-400 leading-relaxed mb-6">
              Le CGI réunit sous un même toit formation numérique, prototypage technologique et
              production audiovisuelle. Des caravanes mobiles aux certifications internationales,
              l&apos;innovation est accessible à tous les Gabonais.
            </p>
            {/* Poles mini badges */}
            <div className="grid grid-cols-2 gap-3">
              {CGI_POLES.map((pole) => (
                <div
                  key={pole.id}
                  className="flex items-start gap-3 p-3 rounded-xl bg-gray-50 dark:bg-white/3 border border-gray-100 dark:border-gray-800"
                >
                  <div
                    className="w-9 h-9 rounded-lg flex items-center justify-center shrink-0"
                    style={{ backgroundColor: `${pole.color}18` }}
                  >
                    {pole.id === 'acculturation' && (
                      <Users size={18} style={{ color: pole.color }} />
                    )}
                    {pole.id === 'certification' && (
                      <Award size={18} style={{ color: pole.color }} />
                    )}
                    {pole.id === 'fablab' && <Wrench size={18} style={{ color: pole.color }} />}
                    {pole.id === 'medialab' && <Video size={18} style={{ color: pole.color }} />}
                  </div>
                  <div className="min-w-0">
                    <div className="text-sm font-bold text-gray-900 dark:text-white">
                      {pole.name}
                    </div>
                    <div className="text-[11px] text-gray-500 dark:text-gray-400 line-clamp-2">
                      {pole.description}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* ─── §2: FORMATIONS — Image + Interactive ─── */}
      <section className="py-20 bg-gray-50 dark:bg-gray-900/50">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid md:grid-cols-2 gap-12 lg:gap-16 items-start mb-12">
            {/* Left: context */}
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeIn}
              custom={0}
            >
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-100 dark:bg-amber-950/40 text-amber-700 dark:text-amber-400 text-xs font-bold mb-4">
                <GraduationCap size={14} /> Acculturation & Formation
              </div>
              <h2 className="text-3xl font-extrabold text-gray-900 dark:text-white mb-4">
                Formations numériques ouvertes à tous
              </h2>
              <p className="text-gray-600 dark:text-gray-400 leading-relaxed mb-6">
                Du programme INITIA pour l&apos;IA aux caravanes numériques provinciales, le CGI
                forme les citoyens gabonais aux compétences du futur. Inscrivez-vous directement aux
                prochaines sessions.
              </p>
              {/* Training image */}
              <div className="relative rounded-2xl overflow-hidden shadow-lg aspect-16/10">
                <Image
                  src="/images/services/cgi-training-workshop.png"
                  alt="Atelier de formation numérique au CGI — Data Analytics Workshop"
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 45vw"
                />
                <div className="absolute inset-0 bg-linear-to-t from-black/50 via-transparent to-transparent" />
                <div className="absolute bottom-3 left-3 right-3 flex gap-2">
                  <span className="px-2 py-1 rounded-md bg-white/20 backdrop-blur-sm text-white text-[10px] font-semibold">
                    🎓 3 420+ formés
                  </span>
                  <span className="px-2 py-1 rounded-md bg-white/20 backdrop-blur-sm text-white text-[10px] font-semibold">
                    📊 78% insertion pro
                  </span>
                </div>
              </div>
            </motion.div>

            {/* Right: interactive formations */}
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeIn}
              custom={1}
            >
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-bold text-gray-900 dark:text-white flex items-center gap-2">
                  <Calendar size={18} style={{ color: accentColor }} /> Prochains événements
                </h3>
                <span className="text-xs text-gray-500 dark:text-gray-400">
                  {CGI_EVENEMENTS.filter((e) => e.statut !== 'terminé').length} sessions ouvertes
                </span>
              </div>
              <FormationsPanel accentColor={accentColor} />
            </motion.div>
          </div>
        </div>
      </section>

      {/* ─── §3: FABLAB & MEDIALAB — Side by Side ─── */}
      <section className="py-20 bg-white dark:bg-gray-950">
        <div className="max-w-7xl mx-auto px-6">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeIn}
            custom={0}
            className="text-center mb-12"
          >
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-100 dark:bg-amber-950/40 text-amber-700 dark:text-amber-400 text-xs font-bold mb-4">
              <Wrench size={14} /> Prototypage & Production
            </div>
            <h2 className="text-3xl font-extrabold text-gray-900 dark:text-white mb-3">
              Du prototype à la production
            </h2>
            <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
              Accédez au FabLab pour prototyper vos innovations ou sollicitez le MediaLab pour
              produire vos contenus numériques.
            </p>
          </motion.div>

          <div className="grid lg:grid-cols-2 gap-8">
            {/* FabLab column */}
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeIn}
              custom={0}
            >
              <div className="rounded-2xl border border-gray-200 dark:border-gray-800 overflow-hidden bg-gray-50 dark:bg-white/2">
                <div className="p-5 border-b border-gray-200 dark:border-gray-800 bg-linear-to-r from-emerald-50 to-teal-50 dark:from-emerald-950/30 dark:to-teal-950/30">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-10 h-10 rounded-xl bg-emerald-500/10 flex items-center justify-center">
                      <Wrench size={20} className="text-emerald-600 dark:text-emerald-400" />
                    </div>
                    <div>
                      <h3 className="text-lg font-bold text-gray-900 dark:text-white">FabLab</h3>
                      <p className="text-xs text-gray-500 dark:text-gray-400">
                        Prototypage & Fabrication numérique
                      </p>
                    </div>
                  </div>
                  {/* Equipment mini stats */}
                  <div className="flex gap-3">
                    {[
                      { icon: <Printer size={13} />, label: 'Imprimantes 3D', val: '10' },
                      { icon: <Zap size={13} />, label: 'Découpe Laser', val: '2' },
                      { icon: <Cpu size={13} />, label: 'Kits Arduino', val: '80' },
                    ].map((s) => (
                      <div
                        key={s.label}
                        className="flex-1 px-2.5 py-2 rounded-lg bg-white/70 dark:bg-white/5 text-center"
                      >
                        <div className="flex justify-center text-emerald-600 dark:text-emerald-400 mb-1">
                          {s.icon}
                        </div>
                        <div className="text-sm font-extrabold text-gray-900 dark:text-white">
                          {s.val}
                        </div>
                        <div className="text-[9px] text-gray-500 dark:text-gray-400">{s.label}</div>
                      </div>
                    ))}
                  </div>
                </div>
                <div className="p-5">
                  <FabLabPanel accentColor={accentColor} />
                </div>
              </div>
            </motion.div>

            {/* MediaLab column */}
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeIn}
              custom={1}
            >
              <div className="rounded-2xl border border-gray-200 dark:border-gray-800 overflow-hidden bg-gray-50 dark:bg-white/2">
                <div className="p-5 border-b border-gray-200 dark:border-gray-800 bg-linear-to-r from-purple-50 to-violet-50 dark:from-purple-950/30 dark:to-violet-950/30">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-10 h-10 rounded-xl bg-purple-500/10 flex items-center justify-center">
                      <Video size={20} className="text-purple-600 dark:text-purple-400" />
                    </div>
                    <div>
                      <h3 className="text-lg font-bold text-gray-900 dark:text-white">MediaLab</h3>
                      <p className="text-xs text-gray-500 dark:text-gray-400">
                        Production audiovisuelle & design
                      </p>
                    </div>
                  </div>
                  <div className="flex gap-3">
                    {[
                      { icon: <Camera size={13} />, label: 'Vidéos', val: '24' },
                      { icon: <Mic size={13} />, label: 'Podcasts', val: '18' },
                      { icon: <Palette size={13} />, label: 'Designs', val: '12' },
                    ].map((s) => (
                      <div
                        key={s.label}
                        className="flex-1 px-2.5 py-2 rounded-lg bg-white/70 dark:bg-white/5 text-center"
                      >
                        <div className="flex justify-center text-purple-600 dark:text-purple-400 mb-1">
                          {s.icon}
                        </div>
                        <div className="text-sm font-extrabold text-gray-900 dark:text-white">
                          {s.val}
                        </div>
                        <div className="text-[9px] text-gray-500 dark:text-gray-400">{s.label}</div>
                      </div>
                    ))}
                  </div>
                </div>
                <div className="p-5">
                  <MediaLabPanel accentColor={accentColor} />
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ─── §4: SADA — Smart Africa ─── */}
      <section className="py-20 bg-linear-to-br from-amber-600 via-orange-500 to-yellow-600 dark:from-amber-900 dark:via-orange-800 dark:to-yellow-900 text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_80%,rgba(255,255,255,0.08),transparent_50%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_20%,rgba(255,255,255,0.06),transparent_60%)]" />
        <div className="relative z-10 max-w-7xl mx-auto px-6 grid md:grid-cols-2 gap-12 lg:gap-16 items-center">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeIn}
            custom={0}
          >
            <Globe size={48} className="mb-6 opacity-70" />
            <h2 className="text-3xl lg:text-4xl font-extrabold mb-4">
              {tr('svc.cgi.sada_title') || 'Smart Africa Digital Academy'}
            </h2>
            <p className="text-white/85 text-lg leading-relaxed mb-6">
              {tr('svc.cgi.sada_desc') || CGI_PROGRAMME_SADA.description}
            </p>
            <div className="flex gap-6 mb-6">
              {CGI_PROGRAMME_SADA.financements.map((f) => (
                <div key={f.source} className="text-center">
                  <div className="text-2xl font-extrabold">{f.montant}</div>
                  <div className="text-xs text-white/65">{f.source}</div>
                </div>
              ))}
              <div className="text-center">
                <div className="text-2xl font-extrabold">
                  {CGI_PROGRAMME_SADA.impactReseau.paysMembres.length}
                </div>
                <div className="text-xs text-white/65">
                  {tr('svc.cgi.members') || 'Pays membres'}
                </div>
              </div>
            </div>
            <div className="flex flex-wrap gap-2">
              {CGI_PROGRAMME_SADA.impactReseau.thematiques.map((t) => (
                <span
                  key={t}
                  className="px-3 py-1 rounded-full bg-white/12 text-white/90 text-xs font-semibold border border-white/15"
                >
                  {t}
                </span>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeIn}
            custom={1}
          >
            <div className="grid grid-cols-2 gap-4">
              {CGI_PROGRAMME_SADA.objectifs.map((obj, i) => (
                <div
                  key={i}
                  className="p-4 rounded-2xl bg-white/8 backdrop-blur-sm border border-white/12 hover:bg-white/12 transition-colors"
                >
                  <div className="text-3xl font-extrabold text-white/30 mb-2">0{i + 1}</div>
                  <p className="text-sm text-white/85 leading-relaxed">{obj}</p>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* ─── §5: RÉSERVATION SALLES ─── */}
      <section className="py-20 bg-gray-50 dark:bg-gray-900/50">
        <div className="max-w-7xl mx-auto px-6">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeIn}
            custom={0}
            className="text-center mb-10"
          >
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-100 dark:bg-amber-950/40 text-amber-700 dark:text-amber-400 text-xs font-bold mb-4">
              <Calendar size={14} /> Espaces & Réservation
            </div>
            <h2 className="text-3xl font-extrabold text-gray-900 dark:text-white mb-3">
              Réservez un espace au CGI
            </h2>
            <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
              Salles de formation, espace coworking ou studio MediaLab — réservez l&apos;espace
              adapté à vos besoins.
            </p>
          </motion.div>
          <ReservationPanel accentColor={accentColor} />
        </div>
      </section>

      {/* ─── §6: COVERAGE MAP + STATS ─── */}
      <section className="py-20 bg-white dark:bg-gray-950">
        <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-2 gap-12 lg:gap-16 items-center">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeIn}
            custom={0}
          >
            <h2 className="text-3xl font-extrabold mb-6 text-gray-900 dark:text-white">
              {tr('svc.cgi.coverage') || 'Présent dans tout le Gabon'}
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-400 leading-relaxed mb-6">
              {tr('svc.cgi.coverage_desc') ||
                'Le CGI déploie ses formations et équipements à travers les 9 provinces du Gabon.'}
            </p>
            <ul className="space-y-4">
              {[
                {
                  icon: <MapPin size={14} />,
                  text: tr('svc.cgi.loc1') || 'CGI Libreville — Siège national, 4 pôles actifs',
                },
                {
                  icon: <Cpu size={14} />,
                  text: tr('svc.cgi.loc2') || 'FabLab Moanda — PPP avec Eramet Comilog',
                },
                {
                  icon: <GraduationCap size={14} />,
                  text: tr('svc.cgi.loc3') || 'Espace IA Port-Gentil — Partenariat USA',
                },
                {
                  icon: <Globe size={14} />,
                  text: tr('svc.cgi.loc4') || 'Caravanes numériques — 7/9 provinces couvertes',
                },
              ].map((item, i) => (
                <li key={i} className="flex gap-3 text-gray-700 dark:text-gray-300">
                  <div
                    className="w-6 h-6 rounded-full flex items-center justify-center text-white font-bold shrink-0"
                    style={{ backgroundColor: accentColor }}
                  >
                    {item.icon}
                  </div>
                  {item.text}
                </li>
              ))}
            </ul>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeIn}
            custom={1}
            className="relative rounded-3xl overflow-hidden shadow-2xl aspect-4/3"
          >
            <Image
              src="/images/services/cgi-innovation-hub.png"
              alt="Centre Gabonais de l'Innovation — espace de travail"
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 50vw"
            />
            <div className="absolute inset-0 bg-linear-to-t from-black/50 via-transparent to-transparent" />
            <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between">
              <span className="px-3 py-1.5 rounded-full bg-white/20 backdrop-blur-sm text-white text-xs font-bold">
                🌍 3 sites — 7 provinces
              </span>
              <a
                href="/dashboard/cgi"
                className="px-3 py-1.5 rounded-full text-white text-xs font-bold flex items-center gap-1 hover:bg-white/20 transition-colors"
                style={{ backgroundColor: `${accentColor}CC` }}
              >
                Explorer <ArrowRight size={12} />
              </a>
            </div>
          </motion.div>
        </div>
      </section>

      <ServiceStats accentColor={accentColor} stats={stats} />
    </>
  );
}

/* ═══════════════════════════════════════════
   INLINE INTERACTIVE PANELS
   ═══════════════════════════════════════════ */

/* ─── Formations Panel ─── */
function FormationsPanel({ accentColor }: { accentColor: string }) {
  const { isAuthenticated } = useAuth();
  const { toasts, showToast, dismissToast } = useServiceToast();
  const [modal, setModal] = useState<CGIEvenement | null>(null);
  const [loading, setLoading] = useState(false);

  const handleInscription = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setModal(null);
      showToast('✅ Inscription confirmée ! Vous recevrez un email de confirmation.');
    }, 1200);
  };

  const events = CGI_EVENEMENTS.filter((e) => e.statut !== 'terminé');

  if (!isAuthenticated) {
    return (
      <div className="rounded-2xl border border-gray-200 dark:border-gray-800 bg-gray-50/50 dark:bg-white/2 p-6 text-center">
        <GraduationCap size={32} className="mx-auto mb-3 text-gray-400" />
        <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
          Connectez-vous pour vous inscrire aux formations et événements du CGI.
        </p>
        <div className="flex justify-center gap-3">
          <a
            href="/demo"
            className="px-4 py-2 rounded-xl text-white text-sm font-semibold"
            style={{ backgroundColor: accentColor }}
          >
            Essayer en Démo
          </a>
          <a
            href="/login"
            className="px-4 py-2 rounded-xl bg-gray-200 dark:bg-gray-800 text-gray-700 dark:text-gray-300 text-sm font-semibold"
          >
            Se connecter
          </a>
        </div>
      </div>
    );
  }

  return (
    <>
      <div className="space-y-3">
        {events.map((evt, i) => (
          <ServiceActionCard
            key={evt.id}
            title={evt.title}
            subtitle={`Pôle: ${evt.pole}`}
            index={i}
            accentColor={accentColor}
            status={{
              label:
                evt.statut === 'inscriptions_ouvertes'
                  ? 'Inscriptions ouvertes'
                  : evt.statut === 'complet'
                    ? 'Complet'
                    : 'En cours',
              color:
                evt.statut === 'inscriptions_ouvertes'
                  ? '#10b981'
                  : evt.statut === 'complet'
                    ? '#ef4444'
                    : '#3b82f6',
            }}
            details={[
              {
                icon: 'calendar',
                label: new Date(evt.date).toLocaleDateString('fr-FR', {
                  day: 'numeric',
                  month: 'long',
                  year: 'numeric',
                }),
              },
              { icon: 'location', label: evt.location },
              { icon: 'users', label: `${evt.inscriptions}/${evt.places} inscrits` },
            ]}
            actionLabel={evt.statut === 'complet' ? 'Complet' : "S'inscrire"}
            disabled={evt.statut === 'complet'}
            onAction={() => setModal(evt)}
          />
        ))}
      </div>

      <ConfirmationModal
        open={!!modal}
        onClose={() => setModal(null)}
        onConfirm={handleInscription}
        title={`Inscription — ${modal?.title || ''}`}
        description={`Confirmez votre inscription à cet événement du ${modal ? new Date(modal.date).toLocaleDateString('fr-FR') : ''} à ${modal?.location || ''}. Places restantes : ${modal ? modal.places - modal.inscriptions : 0}`}
        confirmLabel="Confirmer l'inscription"
        accentColor={accentColor}
        loading={loading}
      />
      <ToastContainer toasts={toasts} onDismiss={dismissToast} />
    </>
  );
}

/* ─── FabLab Panel ─── */
function FabLabPanel({ accentColor: _accentColor }: { accentColor: string }) {
  const { isAuthenticated } = useAuth();
  const { toasts, showToast, dismissToast } = useServiceToast();
  const [modal, setModal] = useState<(typeof CGI_PROJETS_FABLAB)[0] | null>(null);
  const [loading, setLoading] = useState(false);

  const STATUT_LABELS: Record<string, { label: string; color: string }> = {
    ideation: { label: 'Idéation', color: '#f59e0b' },
    en_cours: { label: 'En cours', color: '#3b82f6' },
    prototype_fonctionnel: { label: 'Prototype', color: '#10b981' },
    production: { label: 'Production', color: '#8b5cf6' },
    déployé: { label: 'Déployé', color: '#059669' },
  };

  const handleRequest = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setModal(null);
      showToast("✅ Demande d'accès FabLab envoyée !");
    }, 1200);
  };

  if (!isAuthenticated) {
    return (
      <div className="text-center py-4">
        <p className="text-sm text-gray-500 dark:text-gray-400 mb-3">
          Connectez-vous pour demander l&apos;accès au FabLab.
        </p>
        <a
          href="/demo"
          className="inline-flex items-center gap-1 px-4 py-2 rounded-xl text-white text-sm font-semibold"
          style={{ backgroundColor: '#10b981' }}
        >
          Essayer en Démo <ChevronRight size={14} />
        </a>
      </div>
    );
  }

  return (
    <>
      <div className="space-y-3">
        {CGI_PROJETS_FABLAB.slice(0, 3).map((proj, i) => {
          const st = STATUT_LABELS[proj.statut] || STATUT_LABELS.en_cours;
          return (
            <ServiceActionCard
              key={proj.id}
              title={proj.titre}
              subtitle={proj.porteur}
              index={i}
              accentColor="#10b981"
              status={st}
              details={[{ icon: 'location', label: proj.site }]}
              actionLabel="Demander accès"
              onAction={() => setModal(proj)}
            >
              <div className="flex flex-wrap gap-1.5 mb-1">
                {proj.technologies.slice(0, 3).map((t) => (
                  <span
                    key={t}
                    className="px-2 py-0.5 text-[10px] font-semibold rounded-md bg-emerald-50 dark:bg-emerald-950/30 text-emerald-700 dark:text-emerald-400"
                  >
                    {t}
                  </span>
                ))}
              </div>
            </ServiceActionCard>
          );
        })}
      </div>

      <ConfirmationModal
        open={!!modal}
        onClose={() => setModal(null)}
        onConfirm={handleRequest}
        title="Demande d'accès FabLab"
        description={`Vous demandez l'accès au FabLab pour le projet "${modal?.titre || ''}". Notre équipe vous contactera sous 48h.`}
        confirmLabel="Envoyer la demande"
        accentColor="#10b981"
        loading={loading}
      />
      <ToastContainer toasts={toasts} onDismiss={dismissToast} />
    </>
  );
}

/* ─── MediaLab Panel ─── */
function MediaLabPanel({ accentColor: _accentColor }: { accentColor: string }) {
  const { isAuthenticated } = useAuth();
  const { toasts, showToast, dismissToast } = useServiceToast();
  const [modal, setModal] = useState<(typeof CGI_PRODUCTIONS_MEDIALAB)[0] | null>(null);
  const [loading, setLoading] = useState(false);

  const TYPE_LABELS: Record<string, { label: string; color: string }> = {
    video: { label: 'Vidéo', color: '#ef4444' },
    podcast: { label: 'Podcast', color: '#8b5cf6' },
    design: { label: 'Design', color: '#f59e0b' },
    evenement: { label: 'Événement', color: '#3b82f6' },
  };

  const handleRequest = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setModal(null);
      showToast('✅ Demande de production envoyée !');
    }, 1200);
  };

  if (!isAuthenticated) {
    return (
      <div className="text-center py-4">
        <p className="text-sm text-gray-500 dark:text-gray-400 mb-3">
          Connectez-vous pour demander une production.
        </p>
        <a
          href="/demo"
          className="inline-flex items-center gap-1 px-4 py-2 rounded-xl text-white text-sm font-semibold"
          style={{ backgroundColor: '#8b5cf6' }}
        >
          Essayer en Démo <ChevronRight size={14} />
        </a>
      </div>
    );
  }

  return (
    <>
      <div className="space-y-3">
        {CGI_PRODUCTIONS_MEDIALAB.map((prod, i) => {
          const tl = TYPE_LABELS[prod.type] || TYPE_LABELS.video;
          return (
            <ServiceActionCard
              key={prod.id}
              title={prod.titre}
              subtitle={prod.description}
              index={i}
              accentColor="#8b5cf6"
              status={{ label: tl.label, color: tl.color }}
              details={[
                {
                  icon: 'custom',
                  label: `${prod.episodes} ${prod.type === 'design' ? 'projets' : 'épisodes'}`,
                },
                { icon: 'users', label: prod.public },
              ]}
              actionLabel="Demander une production"
              onAction={() => setModal(prod)}
            />
          );
        })}
      </div>

      <ConfirmationModal
        open={!!modal}
        onClose={() => setModal(null)}
        onConfirm={handleRequest}
        title="Demande de production MediaLab"
        description={`Vous demandez une production "${modal?.titre || ''}". Le MediaLab vous contactera sous 72h.`}
        confirmLabel="Envoyer la demande"
        accentColor="#8b5cf6"
        loading={loading}
      />
      <ToastContainer toasts={toasts} onDismiss={dismissToast} />
    </>
  );
}

/* ─── Reservation Panel ─── */
const CGI_SALLES = [
  {
    id: 'salle-1',
    nom: 'Salle de conférence — Rez-de-chaussée',
    capacite: 50,
    equipements: ['Vidéoprojecteur', 'WiFi', 'Micro'],
    prix: '50 000 FCFA/jour',
    disponible: true,
  },
  {
    id: 'salle-2',
    nom: 'Salle de formation A',
    capacite: 30,
    equipements: ['PCs', 'Vidéoprojecteur', 'WiFi'],
    prix: '35 000 FCFA/jour',
    disponible: true,
  },
  {
    id: 'salle-3',
    nom: 'Salle de formation B',
    capacite: 20,
    equipements: ['PCs', 'WiFi'],
    prix: '25 000 FCFA/jour',
    disponible: false,
  },
  {
    id: 'salle-4',
    nom: 'Espace Coworking',
    capacite: 15,
    equipements: ['WiFi', 'Imprimante', 'Café'],
    prix: '5 000 FCFA/jour',
    disponible: true,
  },
  {
    id: 'salle-5',
    nom: 'Studio MediaLab',
    capacite: 5,
    equipements: ['Caméra 4K', 'Micro', 'Fond vert', 'Éclairage'],
    prix: '75 000 FCFA/jour',
    disponible: true,
  },
];

function ReservationPanel({ accentColor }: { accentColor: string }) {
  const { isAuthenticated } = useAuth();
  const { toasts, showToast, dismissToast } = useServiceToast();
  const [modal, setModal] = useState<(typeof CGI_SALLES)[0] | null>(null);
  const [loading, setLoading] = useState(false);

  const handleReservation = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setModal(null);
      showToast(`✅ Réservation confirmée pour "${modal?.nom}" !`);
    }, 1200);
  };

  if (!isAuthenticated) {
    return (
      <div className="rounded-2xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-white/2 p-8 text-center">
        <Calendar size={36} className="mx-auto mb-3 text-gray-400" />
        <p className="text-gray-600 dark:text-gray-400 mb-4">
          Connectez-vous pour réserver un espace au CGI.
        </p>
        <div className="flex justify-center gap-3">
          <a
            href="/demo"
            className="px-5 py-2.5 rounded-xl text-white text-sm font-semibold"
            style={{ backgroundColor: accentColor }}
          >
            Essayer en Démo
          </a>
          <a
            href="/login"
            className="px-5 py-2.5 rounded-xl bg-gray-200 dark:bg-gray-800 text-gray-700 dark:text-gray-300 text-sm font-semibold"
          >
            Se connecter
          </a>
        </div>
      </div>
    );
  }

  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {CGI_SALLES.map((salle, i) => (
          <ServiceActionCard
            key={salle.id}
            title={salle.nom}
            subtitle={salle.prix}
            index={i}
            accentColor={accentColor}
            status={{
              label: salle.disponible ? 'Disponible' : 'Occupée',
              color: salle.disponible ? '#10b981' : '#ef4444',
            }}
            details={[{ icon: 'users', label: `${salle.capacite} places` }]}
            disabled={!salle.disponible}
            actionLabel={salle.disponible ? 'Réserver' : 'Indisponible'}
            onAction={() => salle.disponible && setModal(salle)}
          >
            <div className="flex flex-wrap gap-1.5 mb-1">
              {salle.equipements.map((eq) => (
                <span
                  key={eq}
                  className="px-2 py-0.5 text-[10px] font-semibold rounded-md bg-amber-50 dark:bg-amber-950/30 text-amber-700 dark:text-amber-400"
                >
                  {eq}
                </span>
              ))}
            </div>
          </ServiceActionCard>
        ))}
      </div>

      <ConfirmationModal
        open={!!modal}
        onClose={() => setModal(null)}
        onConfirm={handleReservation}
        title={`Réserver — ${modal?.nom || ''}`}
        description={`Confirmez la réservation de "${modal?.nom || ''}" (${modal?.capacite} places). Tarif : ${modal?.prix || ''}.`}
        confirmLabel="Confirmer la réservation"
        accentColor={accentColor}
        loading={loading}
      />
      <ToastContainer toasts={toasts} onDismiss={dismissToast} />
    </>
  );
}
