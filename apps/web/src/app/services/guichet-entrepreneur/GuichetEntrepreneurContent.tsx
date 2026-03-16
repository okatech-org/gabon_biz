'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import {
  Building2,
  FileText,
  Search,
  CreditCard,
  Calendar,
  ClipboardList,
  CheckCircle2,
  Clock,
  Shield,
  Users,
} from 'lucide-react';
import CompactHero from '@/components/services/CompactHero';
import { ServiceStats } from '@/components/services/ServiceStats';
import {
  useServiceToast,
  ToastContainer,
  ConfirmationModal,
} from '@/components/services/InteractiveServiceSection';
import { ServiceActionCard, ServiceSearchInput } from '@/components/services/ServiceActionCard';
import {
  GUICHET_DOSSIERS,
  GUICHET_DOCUMENTS,
  GUICHET_RENDEZ_VOUS,
  FORMES_JURIDIQUES,
  GUICHET_WIZARD_STEPS,
  GUICHET_FRAIS,
} from '@/lib/mock/guichet-data';
import { useAuth } from '@/lib/auth-context';
import { useI18n } from '@/lib/i18n/i18nContext';

const accentColor = '#009e49';

const fadeIn = {
  hidden: { opacity: 0, y: 20 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, delay: i * 0.1, ease: 'easeOut' as const },
  }),
};

/* ═══════════════════════════════════════════
   GUICHET UNIQUE — BLENDED INFO + INTERACTIVE
   ═══════════════════════════════════════════ */
export default function GuichetEntrepreneurContent() {
  const { tr } = useI18n();

  return (
    <>
      {/* ─── HERO ─── */}
      <CompactHero
        badge={tr('svc.guichet.badge') || "Guichet Unique de l'Entrepreneuriat"}
        badgeIcon={<Building2 size={14} />}
        title={
          <>
            <span className="block">
              {tr('svc.guichet.title') || 'Créez votre entreprise au Gabon'}
            </span>
            <span className="block text-white/85 text-xl md:text-2xl font-medium">
              Guichet Unique Entrepreneur
            </span>
          </>
        }
        subtitle={
          tr('svc.guichet.subtitle') ||
          'Immatriculation, suivi de dossier et rendez-vous — 100% en ligne'
        }
        backgroundClasses="bg-linear-to-br from-emerald-600 via-green-500 to-teal-600 dark:from-emerald-900 dark:via-green-800 dark:to-teal-900"
        overlays={
          <>
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_50%,rgba(255,255,255,0.1),transparent_60%)]" />
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_20%,rgba(255,255,255,0.08),transparent_50%)]" />
          </>
        }
        accentColor={accentColor}
        ctaPrimary={{
          label: tr('svc.guichet.cta1') || 'Immatriculer mon entreprise',
          href: '#immatriculer',
        }}
        ctaSecondary={{
          label: tr('svc.guichet.cta2') || 'Espace entreprises',
          href: '/dashboard/entreprises',
        }}
        stats={[
          {
            value: tr('svc.guichet.m1.val') || '+12 000',
            label: tr('svc.guichet.m1.label') || 'Entreprises créées',
          },
          {
            value: tr('svc.guichet.m2.val') || '48h',
            label: tr('svc.guichet.m2.label') || 'Délai moyen',
          },
          {
            value: tr('svc.guichet.m3.val') || '98%',
            label: tr('svc.guichet.m3.label') || 'Satisfaction',
          },
        ]}
      />

      {/* ─── §1: REGISTRATION IMAGE + CONTEXT ─── */}
      <section className="py-20 bg-white dark:bg-gray-950">
        <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-2 gap-12 lg:gap-16 items-center">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeIn}
            custom={0}
            className="relative rounded-3xl overflow-hidden shadow-2xl aspect-[4/3]"
          >
            <Image
              src="/images/services/guichet-registration.png"
              alt="Bureau d'enregistrement des entreprises — ANPI Gabon"
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 50vw"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
            <div className="absolute bottom-4 left-4 right-4 flex items-center gap-2">
              <span className="px-3 py-1.5 rounded-full bg-emerald-500/90 text-white text-xs font-bold backdrop-blur-sm">
                🏛️ Guichet Unique — ANPI
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
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-100 dark:bg-emerald-950/40 text-emerald-700 dark:text-emerald-400 text-xs font-bold mb-4">
              <Building2 size={14} /> Créer votre entreprise
            </div>
            <h2 className="text-3xl lg:text-4xl font-extrabold text-gray-900 dark:text-white mb-4 leading-tight">
              De l&apos;idée à <span style={{ color: accentColor }}>l&apos;immatriculation</span> en
              quelques clics
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-400 leading-relaxed mb-6">
              {tr('svc.guichet.section1.desc') ||
                "Le Guichet Unique de l'Entrepreneuriat simplifie la création d'entreprise au Gabon. Choisissez votre forme juridique, soumettez vos documents et recevez votre RCCM en 48h."}
            </p>

            {/* Key benefits */}
            <div className="grid grid-cols-2 gap-3">
              {[
                { icon: <Clock size={18} />, title: '48h', desc: 'Délai de traitement' },
                { icon: <Shield size={18} />, title: '100%', desc: 'Dématérialisé' },
                { icon: <CreditCard size={18} />, title: '25 000 FCFA', desc: 'À partir de' },
                { icon: <Users size={18} />, title: '12 000+', desc: 'Entreprises créées' },
              ].map((b, i) => (
                <div
                  key={i}
                  className="flex items-start gap-3 p-3 rounded-xl bg-gray-50 dark:bg-white/3 border border-gray-100 dark:border-gray-800"
                >
                  <div className="w-9 h-9 rounded-lg bg-emerald-500/10 flex items-center justify-center shrink-0 text-emerald-600 dark:text-emerald-400">
                    {b.icon}
                  </div>
                  <div>
                    <div className="text-sm font-bold text-gray-900 dark:text-white">{b.title}</div>
                    <div className="text-[11px] text-gray-500 dark:text-gray-400">{b.desc}</div>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* ─── §2: IMMATRICULATION WIZARD ─── */}
      <section id="immatriculer" className="py-20 bg-gray-50 dark:bg-gray-900/50">
        <div className="max-w-7xl mx-auto px-6">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeIn}
            custom={0}
            className="text-center mb-10"
          >
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-100 dark:bg-emerald-950/40 text-emerald-700 dark:text-emerald-400 text-xs font-bold mb-4">
              <FileText size={14} /> Immatriculation en ligne
            </div>
            <h2 className="text-3xl font-extrabold text-gray-900 dark:text-white mb-3">
              Immatriculez votre entreprise
            </h2>
            <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
              Suivez le processus en 5 étapes pour enregistrer votre entreprise au RCCM.
            </p>
          </motion.div>
          <ImmatriculerPanel />
        </div>
      </section>

      {/* ─── §3: TRACKING IMAGE + SUIVI/DOCUMENTS ─── */}
      <section className="py-20 bg-white dark:bg-gray-950">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid md:grid-cols-2 gap-12 lg:gap-16 items-start">
            {/* Left: context + image */}
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeIn}
              custom={0}
            >
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-100 dark:bg-emerald-950/40 text-emerald-700 dark:text-emerald-400 text-xs font-bold mb-4">
                <Search size={14} /> Suivi & Documents
              </div>
              <h2 className="text-3xl font-extrabold text-gray-900 dark:text-white mb-4">
                Suivez votre dossier en temps réel
              </h2>
              <p className="text-gray-600 dark:text-gray-400 leading-relaxed mb-6">
                {tr('svc.guichet.section2.desc') ||
                  "Consultez l'avancement de votre dossier d'immatriculation à tout moment. Recevez des notifications à chaque étape et téléchargez vos documents dès qu'ils sont prêts."}
              </p>

              {/* Tracking image */}
              <div className="relative rounded-2xl overflow-hidden shadow-lg aspect-[16/10]">
                <Image
                  src="/images/services/guichet-tracking.png"
                  alt="Suivi de dossier d'immatriculation en ligne"
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 45vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
                <div className="absolute bottom-3 left-3 right-3 flex gap-2">
                  <span className="px-2 py-1 rounded-md bg-white/20 backdrop-blur-sm text-white text-[10px] font-semibold">
                    📊 Suivi en temps réel
                  </span>
                  <span className="px-2 py-1 rounded-md bg-white/20 backdrop-blur-sm text-white text-[10px] font-semibold">
                    🔔 Notifications automatiques
                  </span>
                </div>
              </div>
            </motion.div>

            {/* Right: interactive suivi */}
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeIn}
              custom={1}
            >
              <SuiviDossierPanel />
            </motion.div>
          </div>
        </div>
      </section>

      {/* ─── §4: DOCUMENTS ─── */}
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
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-100 dark:bg-emerald-950/40 text-emerald-700 dark:text-emerald-400 text-xs font-bold mb-4">
              <ClipboardList size={14} /> Gestion documentaire
            </div>
            <h2 className="text-3xl font-extrabold text-gray-900 dark:text-white mb-3">
              Vos documents d&apos;entreprise
            </h2>
            <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
              Suivez l&apos;état de vos pièces justificatives et téléchargez vos documents
              officiels.
            </p>
          </motion.div>
          <DocumentsPanel />
        </div>
      </section>

      {/* ─── §5: RENDEZ-VOUS ─── */}
      <section className="py-20 bg-white dark:bg-gray-950">
        <div className="max-w-7xl mx-auto px-6">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeIn}
            custom={0}
            className="text-center mb-10"
          >
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-100 dark:bg-emerald-950/40 text-emerald-700 dark:text-emerald-400 text-xs font-bold mb-4">
              <Calendar size={14} /> Prise de rendez-vous
            </div>
            <h2 className="text-3xl font-extrabold text-gray-900 dark:text-white mb-3">
              Prenez rendez-vous avec un agent
            </h2>
            <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
              Besoin d&apos;assistance ? Réservez un créneau avec un agent du Guichet Unique.
            </p>
          </motion.div>
          <RendezVousPanel />
        </div>
      </section>

      {/* ─── STATS ─── */}
      <ServiceStats
        accentColor={accentColor}
        stats={[
          {
            value: tr('svc.guichet.stat1.val') || '+12 000',
            label: tr('svc.guichet.stat1.label') || 'Entreprises créées en ligne',
          },
          {
            value: tr('svc.guichet.stat2.val') || '48h',
            label: tr('svc.guichet.stat2.label') || 'Délai moyen de traitement',
          },
          {
            value: tr('svc.guichet.stat3.val') || '98%',
            label: tr('svc.guichet.stat3.label') || 'Taux de satisfaction',
          },
        ]}
      />
    </>
  );
}

/* ═══════════════════════════════════════════
   INLINE INTERACTIVE PANELS
   ═══════════════════════════════════════════ */

/* ─── Immatriculer Panel — Wizard ─── */
function ImmatriculerPanel() {
  const { isAuthenticated } = useAuth();
  const [step, setStep] = useState(0);
  const [selectedForme, setSelectedForme] = useState('');
  const { toasts, showToast, dismissToast } = useServiceToast();

  if (!isAuthenticated) {
    return (
      <div className="rounded-2xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-white/[0.02] p-8 text-center max-w-lg mx-auto">
        <FileText size={36} className="mx-auto mb-3 text-gray-400" />
        <p className="text-gray-600 dark:text-gray-400 mb-4">
          Connectez-vous pour démarrer l&apos;immatriculation de votre entreprise.
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
      {/* Wizard steps indicator */}
      <div className="flex items-center justify-center gap-1 mb-8">
        {GUICHET_WIZARD_STEPS.map((s, i) => (
          <React.Fragment key={s.id}>
            <button
              onClick={() => i <= step && setStep(i)}
              className={`flex items-center gap-2 px-3 py-2 rounded-xl text-xs font-semibold transition-all ${
                i === step
                  ? 'text-white'
                  : i < step
                    ? 'text-emerald-600 bg-emerald-50 dark:bg-emerald-950/30'
                    : 'text-gray-400 bg-gray-100 dark:bg-white/5'
              }`}
              style={i === step ? { background: accentColor } : undefined}
            >
              {i < step ? (
                <CheckCircle2 size={14} />
              ) : (
                <span className="w-5 h-5 rounded-full bg-white/20 flex items-center justify-center text-[10px] font-bold">
                  {s.id}
                </span>
              )}
              <span className="hidden sm:inline">{s.label}</span>
            </button>
            {i < GUICHET_WIZARD_STEPS.length - 1 && (
              <div
                className={`w-6 h-0.5 rounded-full ${i < step ? 'bg-emerald-400' : 'bg-gray-200 dark:bg-gray-700'}`}
              />
            )}
          </React.Fragment>
        ))}
      </div>

      {/* Step 0: Forme juridique */}
      {step === 0 && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {FORMES_JURIDIQUES.map((forme) => (
            <button
              key={forme.id}
              onClick={() => {
                setSelectedForme(forme.id);
                setStep(1);
              }}
              className={`text-left p-5 rounded-2xl border transition-all hover:-translate-y-0.5 ${
                selectedForme === forme.id
                  ? 'border-emerald-400 bg-emerald-50 dark:bg-emerald-950/30'
                  : 'border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900'
              }`}
            >
              <h4 className="text-[15px] font-bold text-gray-900 dark:text-white mb-1">
                {forme.label}
              </h4>
              <p className="text-xs text-gray-500 dark:text-gray-400 mb-3">{forme.description}</p>
              <div className="flex gap-4 text-xs">
                <span className="text-emerald-600 font-semibold">⏱ {forme.delai}</span>
                <span className="text-gray-500">{forme.cout}</span>
              </div>
            </button>
          ))}
        </div>
      )}

      {/* Step 1: Info entreprise */}
      {step === 1 && (
        <div className="max-w-lg mx-auto bg-white dark:bg-gray-900 rounded-2xl border border-gray-200 dark:border-gray-800 p-6">
          <h4 className="text-lg font-bold text-gray-900 dark:text-white mb-4">
            Informations de l&apos;entreprise
          </h4>
          <div className="space-y-4">
            {[
              'Dénomination sociale',
              'Objet social',
              'Capital social (FCFA)',
              'Adresse du siège',
            ].map((label) => (
              <div key={label}>
                <label className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-1 block">
                  {label}
                </label>
                <input
                  className="w-full px-4 py-2.5 rounded-xl bg-gray-50 dark:bg-white/5 border border-gray-200 dark:border-white/10 text-sm text-gray-900 dark:text-white"
                  placeholder={label}
                />
              </div>
            ))}
          </div>
          <button
            onClick={() => setStep(2)}
            className="mt-6 w-full py-3 rounded-xl text-sm font-bold text-white"
            style={{ background: accentColor }}
          >
            Étape suivante →
          </button>
        </div>
      )}

      {/* Step 2: Documents */}
      {step === 2 && (
        <div className="max-w-lg mx-auto">
          <h4 className="text-lg font-bold text-gray-900 dark:text-white mb-4">Documents requis</h4>
          <div className="space-y-3">
            {GUICHET_DOCUMENTS.filter((d) => d.type === 'requis').map((doc) => (
              <div
                key={doc.id}
                className="flex items-center gap-3 p-4 rounded-xl bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800"
              >
                <FileText size={18} className="text-emerald-500 shrink-0" />
                <div className="flex-1 min-w-0">
                  <h5 className="text-sm font-semibold text-gray-900 dark:text-white">{doc.nom}</h5>
                  <p className="text-xs text-gray-500 dark:text-gray-400">{doc.description}</p>
                </div>
                <button className="text-xs font-semibold px-3 py-1.5 rounded-lg bg-emerald-50 dark:bg-emerald-950/30 text-emerald-600">
                  📎 Joindre
                </button>
              </div>
            ))}
          </div>
          <button
            onClick={() => setStep(3)}
            className="mt-6 w-full py-3 rounded-xl text-sm font-bold text-white"
            style={{ background: accentColor }}
          >
            Étape suivante →
          </button>
        </div>
      )}

      {/* Step 3: Paiement */}
      {step === 3 && (
        <div className="max-w-lg mx-auto bg-white dark:bg-gray-900 rounded-2xl border border-gray-200 dark:border-gray-800 p-6">
          <h4 className="text-lg font-bold text-gray-900 dark:text-white mb-4">
            Récapitulatif des frais
          </h4>
          <div className="space-y-3 mb-6">
            {GUICHET_FRAIS.map((frais) => (
              <div
                key={frais.label}
                className="flex items-center justify-between py-2 border-b border-gray-100 dark:border-gray-800 last:border-0"
              >
                <span className="text-sm text-gray-700 dark:text-gray-300">{frais.label}</span>
                <span
                  className={`text-sm font-bold ${frais.obligatoire ? 'text-gray-900 dark:text-white' : 'text-gray-400'}`}
                >
                  {frais.montant} {!frais.obligatoire && '(optionnel)'}
                </span>
              </div>
            ))}
          </div>
          <div className="flex items-center justify-between p-3 rounded-xl bg-emerald-50 dark:bg-emerald-950/30 mb-6">
            <span className="text-sm font-bold text-emerald-700 dark:text-emerald-400">Total</span>
            <span className="text-lg font-extrabold text-emerald-700 dark:text-emerald-400">
              90 000 FCFA
            </span>
          </div>
          <button
            onClick={() => setStep(4)}
            className="w-full py-3 rounded-xl text-sm font-bold text-white"
            style={{ background: accentColor }}
          >
            Payer et soumettre →
          </button>
        </div>
      )}

      {/* Step 4: Confirmation */}
      {step === 4 && (
        <div className="text-center py-10">
          <div className="w-20 h-20 rounded-full bg-emerald-100 dark:bg-emerald-950/30 flex items-center justify-center mx-auto mb-6">
            <CheckCircle2 size={40} className="text-emerald-500" />
          </div>
          <h4 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
            Dossier soumis avec succès !
          </h4>
          <p className="text-gray-500 dark:text-gray-400 mb-2">
            Référence : <strong className="text-emerald-600">GUE-2026-CRE-00342</strong>
          </p>
          <p className="text-sm text-gray-400 mb-6">Délai estimé de traitement : 72 heures</p>
          <button
            onClick={() => {
              setStep(0);
              setSelectedForme('');
              showToast('✅ Nouveau dossier créé ! Suivez-le dans la section "Suivi de dossier".');
            }}
            className="px-6 py-3 rounded-xl text-sm font-bold text-white"
            style={{ background: accentColor }}
          >
            Nouveau dossier
          </button>
        </div>
      )}

      <ToastContainer toasts={toasts} onDismiss={dismissToast} />
    </>
  );
}

/* ─── Suivi Dossier Panel ─── */
function SuiviDossierPanel() {
  const { isAuthenticated } = useAuth();
  const [searchRef, setSearchRef] = useState('');
  const [found, setFound] = useState<(typeof GUICHET_DOSSIERS)[0] | null>(null);
  const [searched, setSearched] = useState(false);

  const handleSearch = () => {
    setSearched(true);
    const dossier = GUICHET_DOSSIERS.find((d) =>
      d.reference.toLowerCase().includes(searchRef.toLowerCase()),
    );
    setFound(dossier || null);
  };

  const STATUT_STYLES: Record<string, { label: string; color: string }> = {
    brouillon: { label: 'Brouillon', color: '#9ca3af' },
    soumis: { label: 'Soumis', color: '#3b82f6' },
    en_traitement: { label: 'En traitement', color: '#f59e0b' },
    validé: { label: 'Validé', color: '#10b981' },
    rejeté: { label: 'Rejeté', color: '#ef4444' },
  };

  if (!isAuthenticated) {
    return (
      <div className="rounded-2xl border border-gray-200 dark:border-gray-800 bg-gray-50/50 dark:bg-white/[0.02] p-6 text-center">
        <Search size={32} className="mx-auto mb-3 text-gray-400" />
        <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
          Connectez-vous pour consulter l&apos;état de vos dossiers.
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
    <div>
      <ServiceSearchInput
        placeholder="Entrez votre référence (ex: GUE-2026-CRE-00147)"
        value={searchRef}
        onChange={setSearchRef}
        onSearch={handleSearch}
        accentColor={accentColor}
      />

      <h4 className="text-sm font-bold text-gray-500 uppercase tracking-wider mb-3">
        Vos dossiers en cours
      </h4>
      <div className="space-y-3">
        {(searched && found ? [found] : GUICHET_DOSSIERS).map((dos, i) => {
          const st = STATUT_STYLES[dos.statut] || STATUT_STYLES.soumis;
          return (
            <ServiceActionCard
              key={dos.id}
              title={dos.entreprise}
              subtitle={`Réf: ${dos.reference} · ${dos.formeJuridique}`}
              index={i}
              accentColor={accentColor}
              status={st}
              details={[
                {
                  icon: 'calendar',
                  label: `Soumis le ${new Date(dos.dateSoumission).toLocaleDateString('fr-FR')}`,
                },
                { icon: 'clock', label: dos.etapeCourante },
              ]}
            >
              <div className="mt-2">
                <div className="flex items-center justify-between text-xs mb-1">
                  <span className="text-gray-500">Progression</span>
                  <span className="font-bold" style={{ color: st.color }}>
                    {dos.progression}%
                  </span>
                </div>
                <div className="h-2 bg-gray-100 dark:bg-white/5 rounded-full overflow-hidden">
                  <div
                    className="h-full rounded-full transition-all duration-700"
                    style={{ width: `${dos.progression}%`, background: st.color }}
                  />
                </div>
              </div>
            </ServiceActionCard>
          );
        })}
        {searched && !found && (
          <div className="text-center py-8 text-gray-400">
            <Search size={32} className="mx-auto mb-3 opacity-40" />
            <p className="text-sm">Aucun dossier trouvé pour cette référence</p>
          </div>
        )}
      </div>
    </div>
  );
}

/* ─── Documents Panel ─── */
function DocumentsPanel() {
  const { isAuthenticated } = useAuth();
  const { toasts, showToast, dismissToast } = useServiceToast();

  const STATUT_DOC: Record<string, { label: string; color: string }> = {
    a_fournir: { label: 'À fournir', color: '#9ca3af' },
    fourni: { label: 'Fourni', color: '#3b82f6' },
    en_verification: { label: 'En vérification', color: '#f59e0b' },
    validé: { label: 'Validé', color: '#10b981' },
    rejeté: { label: 'Rejeté', color: '#ef4444' },
  };

  if (!isAuthenticated) {
    return (
      <div className="rounded-2xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-white/[0.02] p-8 text-center max-w-lg mx-auto">
        <ClipboardList size={36} className="mx-auto mb-3 text-gray-400" />
        <p className="text-gray-600 dark:text-gray-400 mb-4">
          Connectez-vous pour gérer vos documents.
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
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {GUICHET_DOCUMENTS.map((doc, i) => {
          const st = STATUT_DOC[doc.statut] || STATUT_DOC.a_fournir;
          return (
            <ServiceActionCard
              key={doc.id}
              title={doc.nom}
              subtitle={doc.description}
              index={i}
              accentColor={accentColor}
              status={st}
              details={[
                { icon: 'custom', label: `Format: ${doc.format}` },
                {
                  icon: 'custom',
                  label: doc.type === 'requis' ? 'Document requis' : 'Document généré',
                },
              ]}
              actionLabel={
                doc.type === 'genere' && doc.statut === 'a_fournir'
                  ? 'Indisponible'
                  : doc.statut === 'validé'
                    ? '📥 Télécharger'
                    : '📎 Joindre'
              }
              disabled={doc.type === 'genere' && doc.statut === 'a_fournir'}
              onAction={() =>
                showToast(
                  doc.statut === 'validé'
                    ? '📥 Téléchargement en cours...'
                    : '📎 Document joint avec succès !',
                  doc.statut === 'validé' ? 'info' : 'success',
                )
              }
            />
          );
        })}
      </div>
      <ToastContainer toasts={toasts} onDismiss={dismissToast} />
    </>
  );
}

/* ─── Rendez-vous Panel ─── */
function RendezVousPanel() {
  const { isAuthenticated } = useAuth();
  const { toasts, showToast, dismissToast } = useServiceToast();
  const [modal, setModal] = useState<(typeof GUICHET_RENDEZ_VOUS)[0] | null>(null);
  const [loading, setLoading] = useState(false);

  const handleConfirm = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setModal(null);
      showToast(
        `✅ Rendez-vous confirmé le ${modal?.date} à ${modal?.heure} avec ${modal?.agent} !`,
      );
    }, 1200);
  };

  if (!isAuthenticated) {
    return (
      <div className="rounded-2xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-white/[0.02] p-8 text-center max-w-lg mx-auto">
        <Calendar size={36} className="mx-auto mb-3 text-gray-400" />
        <p className="text-gray-600 dark:text-gray-400 mb-4">
          Connectez-vous pour prendre rendez-vous avec un agent.
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
        {GUICHET_RENDEZ_VOUS.map((rdv, i) => (
          <ServiceActionCard
            key={rdv.id}
            title={rdv.motif}
            subtitle={`Service: ${rdv.service} · Agent: ${rdv.agent}`}
            index={i}
            accentColor={accentColor}
            status={{
              label:
                rdv.statut === 'disponible'
                  ? 'Disponible'
                  : rdv.statut === 'confirmé'
                    ? 'Confirmé'
                    : rdv.statut,
              color:
                rdv.statut === 'disponible'
                  ? '#10b981'
                  : rdv.statut === 'confirmé'
                    ? '#3b82f6'
                    : '#9ca3af',
            }}
            details={[
              {
                icon: 'calendar',
                label: new Date(rdv.date).toLocaleDateString('fr-FR', {
                  weekday: 'long',
                  day: 'numeric',
                  month: 'long',
                }),
              },
              { icon: 'clock', label: rdv.heure },
            ]}
            actionLabel={rdv.statut === 'disponible' ? 'Réserver ce créneau' : 'Déjà réservé'}
            disabled={rdv.statut !== 'disponible'}
            onAction={() => setModal(rdv)}
          />
        ))}
      </div>

      <ConfirmationModal
        open={!!modal}
        onClose={() => setModal(null)}
        onConfirm={handleConfirm}
        title="Confirmer le rendez-vous"
        description={`Rendez-vous le ${modal ? new Date(modal.date).toLocaleDateString('fr-FR', { weekday: 'long', day: 'numeric', month: 'long' }) : ''} à ${modal?.heure || ''} · Service: ${modal?.service || ''} · Agent: ${modal?.agent || ''}`}
        confirmLabel="Confirmer le rendez-vous"
        accentColor={accentColor}
        loading={loading}
      />
      <ToastContainer toasts={toasts} onDismiss={dismissToast} />
    </>
  );
}
