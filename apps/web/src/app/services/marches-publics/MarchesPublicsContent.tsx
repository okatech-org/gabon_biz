'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import {
  FileSearch,
  Search,
  BellRing,
  Send,
  ShieldCheck,
  ClipboardList,
  Download,
  Bell,
  BarChart3,
  ChevronRight,
  Shield,
} from 'lucide-react';
import CompactHero from '@/components/services/CompactHero';
import { ServiceStats } from '@/components/services/ServiceStats';
import { useServiceToast, ToastContainer } from '@/components/services/InteractiveServiceSection';
import { ServiceActionCard, ServiceSearchInput } from '@/components/services/ServiceActionCard';
import {
  MARCHES_PUBLICS,
  SECTEURS_MARCHES,
  ALERTES_DEFAULT,
  MES_SOUMISSIONS,
  formatBudgetCFA,
} from '@/lib/mock/marches-data';
import { useAuth } from '@/lib/auth-context';
import { useI18n } from '@/lib/i18n/i18nContext';

const accentColor = '#3b82f6';

const fadeIn = {
  hidden: { opacity: 0, y: 20 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, delay: i * 0.1, ease: 'easeOut' as const },
  }),
};

/* ═══════════════════════════════════════════
   MARCHÉS PUBLICS — BLENDED INFO + INTERACTIVE
   ═══════════════════════════════════════════ */
export default function MarchesPublicsContent() {
  const { tr } = useI18n();

  return (
    <>
      {/* ─── HERO ─── */}
      <CompactHero
        badge={tr('svc.marches.badge') || 'Plateforme Nationale des Marchés Publics'}
        badgeIcon={<FileSearch size={14} />}
        title={
          <>
            <span className="block">
              {tr('svc.name.marches') || 'Transparence & Compétitivité'}
            </span>
            <span className="block text-white/85 text-xl md:text-2xl font-medium">
              Marchés Publics Numériques
            </span>
          </>
        }
        subtitle={
          tr('svc.marches.subtitle') ||
          "Consultez les appels d'offres, soumissionnez en ligne et suivez vos candidatures en toute transparence"
        }
        backgroundClasses="bg-linear-to-br from-blue-600 via-blue-500 to-indigo-600 dark:from-blue-900 dark:via-blue-800 dark:to-indigo-900"
        overlays={
          <>
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_50%,rgba(255,255,255,0.1),transparent_60%)]" />
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_20%,rgba(255,255,255,0.08),transparent_50%)]" />
          </>
        }
        accentColor={accentColor}
        ctaPrimary={{
          label: tr('svc.marches.cta1') || "Consulter les appels d'offres",
          href: '#appels-offres',
        }}
        ctaSecondary={{
          label: tr('svc.marches.cta2') || 'Espace marchés',
          href: '/dashboard/marches',
        }}
        stats={[
          {
            value: tr('svc.marches.m1.val') || '145+',
            label: tr('svc.marches.m1.label') || 'Marchés actifs',
          },
          {
            value: tr('svc.marches.m2.val') || '89',
            label: tr('svc.marches.m2.label') || 'Contrats attribués',
          },
          {
            value: tr('svc.marches.m3.val') || '100%',
            label: tr('svc.marches.m3.label') || 'Transparence',
          },
        ]}
      />

      {/* ─── §1: PROCUREMENT IMAGE + CONTEXT ─── */}
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
              src="/images/services/marches-bidding.png"
              alt="Réunion de la commission des marchés publics — Transparence numérique"
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 50vw"
            />
            <div className="absolute inset-0 bg-linear-to-t from-black/40 via-transparent to-transparent" />
            <div className="absolute bottom-4 left-4 right-4 flex items-center gap-2">
              <span className="px-3 py-1.5 rounded-full bg-blue-500/90 text-white text-xs font-bold backdrop-blur-sm">
                🏛️ Commission des Marchés Publics
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
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-100 dark:bg-blue-950/40 text-blue-700 dark:text-blue-400 text-xs font-bold mb-4">
              <ShieldCheck size={14} /> Transparence garantie
            </div>
            <h2 className="text-3xl lg:text-4xl font-extrabold text-gray-900 dark:text-white mb-4 leading-tight">
              Des marchés publics <span style={{ color: accentColor }}>ouverts</span> et{' '}
              <span style={{ color: accentColor }}>compétitifs</span>
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-400 leading-relaxed mb-6">
              {tr('svc.marches.sec1.desc') ||
                "La plateforme numérique des marchés publics du Gabon garantit l'équité, la transparence et l'efficacité dans l'attribution des contrats publics. Chaque étape est traçable et vérifiable."}
            </p>

            {/* Key features */}
            <div className="grid grid-cols-2 gap-3">
              {[
                {
                  icon: <Search size={18} />,
                  title: 'Recherche avancée',
                  desc: 'Filtrez par secteur, budget et localisation',
                },
                {
                  icon: <Bell size={18} />,
                  title: 'Alertes intelligentes',
                  desc: 'Notifications sur-mesure',
                },
                {
                  icon: <Send size={18} />,
                  title: 'Soumission en ligne',
                  desc: 'Déposez vos offres 100% en ligne',
                },
                {
                  icon: <Shield size={18} />,
                  title: 'Traçabilité',
                  desc: 'Chaque étape est documentée',
                },
              ].map((b, i) => (
                <div
                  key={i}
                  className="flex items-start gap-3 p-3 rounded-xl bg-gray-50 dark:bg-white/3 border border-gray-100 dark:border-gray-800"
                >
                  <div className="w-9 h-9 rounded-lg bg-blue-500/10 flex items-center justify-center shrink-0 text-blue-600 dark:text-blue-400">
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

      {/* ─── §2: APPELS D'OFFRES — Interactive ─── */}
      <section id="appels-offres" className="py-20 bg-gray-50 dark:bg-gray-900/50">
        <div className="max-w-7xl mx-auto px-6">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeIn}
            custom={0}
            className="text-center mb-10"
          >
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-100 dark:bg-blue-950/40 text-blue-700 dark:text-blue-400 text-xs font-bold mb-4">
              <FileSearch size={14} /> Appels d&apos;offres en cours
            </div>
            <h2 className="text-3xl font-extrabold text-gray-900 dark:text-white mb-3">
              Consultez les marchés disponibles
            </h2>
            <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
              Recherchez par secteur, budget ou localisation et consultez les détails de chaque
              appel d&apos;offres.
            </p>
          </motion.div>
          <AppelsOffresPanel />
        </div>
      </section>

      {/* ─── §3: INFRASTRUCTURE IMAGE + SOUMISSION ─── */}
      <section className="py-20 bg-white dark:bg-gray-950">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid md:grid-cols-2 gap-12 lg:gap-16 items-start">
            {/* Left: image + context */}
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeIn}
              custom={0}
            >
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-100 dark:bg-blue-950/40 text-blue-700 dark:text-blue-400 text-xs font-bold mb-4">
                <Send size={14} /> Soumission numérique
              </div>
              <h2 className="text-3xl font-extrabold text-gray-900 dark:text-white mb-4">
                Soumissionnez directement en ligne
              </h2>
              <p className="text-gray-600 dark:text-gray-400 leading-relaxed mb-6">
                {tr('svc.marches.sec2.desc') ||
                  'Déposez votre offre technique et financière de manière sécurisée. Le processus est entièrement dématérialisé, du dépôt à la notification de résultat.'}
              </p>

              {/* Infrastructure image */}
              <div className="relative rounded-2xl overflow-hidden shadow-lg aspect-16/10">
                <Image
                  src="/images/services/marches-infrastructure.png"
                  alt="Projet d'infrastructure — Suivi numérique des chantiers au Gabon"
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 45vw"
                />
                <div className="absolute inset-0 bg-linear-to-t from-black/50 via-transparent to-transparent" />
                <div className="absolute bottom-3 left-3 right-3 flex gap-2">
                  <span className="px-2 py-1 rounded-md bg-white/20 backdrop-blur-sm text-white text-[10px] font-semibold">
                    🏗️ Infrastructure
                  </span>
                  <span className="px-2 py-1 rounded-md bg-white/20 backdrop-blur-sm text-white text-[10px] font-semibold">
                    📊 Suivi numérique
                  </span>
                </div>
              </div>
            </motion.div>

            {/* Right: submission form */}
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeIn}
              custom={1}
            >
              <SoumissionPanel />
            </motion.div>
          </div>
        </div>
      </section>

      {/* ─── §4: ALERTES ─── */}
      <section className="py-20 bg-gray-50 dark:bg-gray-900/50">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid md:grid-cols-2 gap-12 lg:gap-16 items-start">
            {/* Alertes panel */}
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeIn}
              custom={0}
            >
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-100 dark:bg-blue-950/40 text-blue-700 dark:text-blue-400 text-xs font-bold mb-4">
                <BellRing size={14} /> Alertes personnalisées
              </div>
              <h2 className="text-3xl font-extrabold text-gray-900 dark:text-white mb-4">
                Ne manquez plus aucune opportunité
              </h2>
              <p className="text-gray-600 dark:text-gray-400 leading-relaxed mb-6">
                Configurez des alertes par secteur, budget ou autorité contractante. Recevez une
                notification dès qu&apos;un nouveau marché correspond à vos critères.
              </p>
              <AlertesPanel />
            </motion.div>

            {/* Dashboard panel */}
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeIn}
              custom={1}
            >
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-100 dark:bg-blue-950/40 text-blue-700 dark:text-blue-400 text-xs font-bold mb-4">
                <BarChart3 size={14} /> Tableau de bord
              </div>
              <h2 className="text-3xl font-extrabold text-gray-900 dark:text-white mb-4">
                Suivez vos soumissions
              </h2>
              <p className="text-gray-600 dark:text-gray-400 leading-relaxed mb-6">
                Consultez l&apos;historique de toutes vos candidatures, leur statut
                d&apos;évaluation et votre taux de succès.
              </p>
              <DashboardPanel />
            </motion.div>
          </div>
        </div>
      </section>

      {/* ─── STATS ─── */}
      <ServiceStats
        accentColor={accentColor}
        stats={[
          {
            value: tr('svc.marches.stat1.val') || '145+',
            label: tr('svc.marches.stat1.label') || 'Marchés publiés',
          },
          {
            value: tr('svc.marches.stat2.val') || '89',
            label: tr('svc.marches.stat2.label') || 'Contrats attribués',
          },
          {
            value: tr('svc.marches.stat3.val') || '100%',
            label: tr('svc.marches.stat3.label') || 'Processus transparent',
          },
        ]}
      />
    </>
  );
}

/* ═══════════════════════════════════════════
   INLINE INTERACTIVE PANELS
   ═══════════════════════════════════════════ */

/* ─── Appels d'Offres Panel ─── */
function AppelsOffresPanel() {
  const [search, setSearch] = useState('');
  const [sectorFilter, setSectorFilter] = useState('all');
  const [selectedMarche, setSelectedMarche] = useState<(typeof MARCHES_PUBLICS)[0] | null>(null);

  const filtered = MARCHES_PUBLICS.filter((m) => {
    const matchSearch =
      !search ||
      m.titre.toLowerCase().includes(search.toLowerCase()) ||
      m.reference.toLowerCase().includes(search.toLowerCase());
    const matchSector = sectorFilter === 'all' || m.secteur === sectorFilter;
    return matchSearch && matchSector;
  });

  const STATUT_STYLES: Record<string, { label: string; color: string }> = {
    ouvert: { label: 'Ouvert', color: '#10b981' },
    cloture: { label: 'Clôturé', color: '#f59e0b' },
    attribue: { label: 'Attribué', color: '#3b82f6' },
    annule: { label: 'Annulé', color: '#ef4444' },
  };

  return (
    <div>
      {/* Search + Filter */}
      <ServiceSearchInput
        placeholder="Rechercher par titre ou référence..."
        value={search}
        onChange={setSearch}
        accentColor={accentColor}
      />

      {/* Sector chips */}
      <div className="flex flex-wrap gap-2 mb-6">
        <button
          onClick={() => setSectorFilter('all')}
          className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${sectorFilter === 'all' ? 'text-white' : 'text-gray-500 bg-gray-100 dark:bg-white/5'}`}
          style={sectorFilter === 'all' ? { background: accentColor } : undefined}
        >
          Tous ({MARCHES_PUBLICS.length})
        </button>
        {SECTEURS_MARCHES.filter((s) => s.marchesActifs > 0).map((s) => (
          <button
            key={s.id}
            onClick={() => setSectorFilter(s.nom)}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${sectorFilter === s.nom ? 'text-white' : 'text-gray-500 bg-gray-100 dark:bg-white/5'}`}
            style={sectorFilter === s.nom ? { background: s.color } : undefined}
          >
            {s.icon} {s.nom} ({s.marchesActifs})
          </button>
        ))}
      </div>

      {/* Results */}
      <div className="space-y-4">
        {filtered.map((m, i) => {
          const st = STATUT_STYLES[m.statut] || STATUT_STYLES.ouvert;
          return (
            <ServiceActionCard
              key={m.id}
              title={m.titre}
              subtitle={`Réf: ${m.reference} · ${m.autoriteContractante}`}
              index={i}
              accentColor={accentColor}
              status={st}
              details={[
                {
                  icon: 'calendar',
                  label: `Limite: ${new Date(m.dateLimite).toLocaleDateString('fr-FR')}`,
                },
                { icon: 'location', label: m.lieu },
                { icon: 'users', label: `${m.soumissions} soumission(s)` },
              ]}
              actionLabel={m.statut === 'ouvert' ? 'Voir les détails' : 'Consulter'}
              onAction={() => setSelectedMarche(m)}
            >
              <div className="flex items-center gap-3 mt-1 text-xs">
                <span className="px-2 py-0.5 rounded-md bg-blue-50 dark:bg-blue-950/30 text-blue-600 font-semibold">
                  {m.secteur}
                </span>
                <span className="text-gray-500">
                  Budget: {formatBudgetCFA(m.budgetMin)} — {formatBudgetCFA(m.budgetMax)}
                </span>
              </div>
            </ServiceActionCard>
          );
        })}
        {filtered.length === 0 && (
          <div className="text-center py-8 text-gray-400">
            <Search size={32} className="mx-auto mb-3 opacity-40" />
            <p className="text-sm">Aucun marché trouvé</p>
          </div>
        )}
      </div>

      {/* Detail modal */}
      {selectedMarche && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div
            className="absolute inset-0 bg-black/40 backdrop-blur-sm"
            onClick={() => setSelectedMarche(null)}
          />
          <div className="relative bg-white dark:bg-gray-900 rounded-2xl p-6 max-w-lg w-full shadow-2xl border border-gray-200 dark:border-gray-800 max-h-[80vh] overflow-y-auto">
            <div className="flex items-start justify-between mb-4">
              <div>
                <span className="text-xs font-mono text-gray-400">{selectedMarche.reference}</span>
                <h3 className="text-lg font-bold text-gray-900 dark:text-white mt-1">
                  {selectedMarche.titre}
                </h3>
              </div>
              <button
                onClick={() => setSelectedMarche(null)}
                className="text-gray-400 hover:text-gray-600"
              >
                ✕
              </button>
            </div>
            <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
              {selectedMarche.description}
            </p>
            <div className="grid grid-cols-2 gap-4 mb-4">
              <div>
                <div className="text-[11px] text-gray-400 uppercase tracking-wide mb-0.5">
                  Autorité
                </div>
                <div className="text-sm font-medium text-gray-900 dark:text-white">
                  {selectedMarche.autoriteContractante}
                </div>
              </div>
              <div>
                <div className="text-[11px] text-gray-400 uppercase tracking-wide mb-0.5">
                  Secteur
                </div>
                <div className="text-sm font-medium text-gray-900 dark:text-white">
                  {selectedMarche.secteur}
                </div>
              </div>
              <div>
                <div className="text-[11px] text-gray-400 uppercase tracking-wide mb-0.5">
                  Budget
                </div>
                <div className="text-sm font-medium text-gray-900 dark:text-white">
                  {formatBudgetCFA(selectedMarche.budgetMin)} —{' '}
                  {formatBudgetCFA(selectedMarche.budgetMax)}
                </div>
              </div>
              <div>
                <div className="text-[11px] text-gray-400 uppercase tracking-wide mb-0.5">
                  Date limite
                </div>
                <div className="text-sm font-medium text-gray-900 dark:text-white">
                  {new Date(selectedMarche.dateLimite).toLocaleDateString('fr-FR')}
                </div>
              </div>
            </div>
            {selectedMarche.statut === 'ouvert' && (
              <button
                onClick={() => setSelectedMarche(null)}
                className="w-full py-3 rounded-xl text-sm font-bold text-white mt-4"
                style={{ background: accentColor }}
              >
                📨 Soumissionner
              </button>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

/* ─── Soumission Panel ─── */
function SoumissionPanel() {
  const { isAuthenticated } = useAuth();
  const { toasts, showToast, dismissToast } = useServiceToast();
  const [selectedMarche, setSelectedMarche] = useState('');
  const [loading, setLoading] = useState(false);

  const openMarches = MARCHES_PUBLICS.filter((m) => m.statut === 'ouvert');

  const handleSubmit = () => {
    if (!selectedMarche) return;
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      showToast('✅ Soumission envoyée avec succès ! Référence: SOUM-2026-00044');
      setSelectedMarche('');
    }, 1500);
  };

  if (!isAuthenticated) {
    return (
      <div className="rounded-2xl border border-gray-200 dark:border-gray-800 bg-gray-50/50 dark:bg-white/2 p-8 text-center">
        <Send size={36} className="mx-auto mb-3 text-gray-400" />
        <p className="text-gray-600 dark:text-gray-400 mb-4">
          Connectez-vous pour déposer une soumission.
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
      <div className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-200 dark:border-gray-800 p-6">
        <h4 className="text-lg font-bold text-gray-900 dark:text-white mb-4">
          📨 Déposer une soumission
        </h4>

        {/* Select marché */}
        <div className="mb-4">
          <label className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-1 block">
            Appel d&apos;offres
          </label>
          <select
            value={selectedMarche}
            onChange={(e) => setSelectedMarche(e.target.value)}
            className="w-full px-4 py-2.5 rounded-xl bg-gray-50 dark:bg-white/5 border border-gray-200 dark:border-white/10 text-sm text-gray-900 dark:text-white"
          >
            <option value="">— Sélectionnez un marché —</option>
            {openMarches.map((m) => (
              <option key={m.id} value={m.id}>
                {m.reference} — {m.titre}
              </option>
            ))}
          </select>
        </div>

        {/* Form fields */}
        {["Nom de l'entreprise", 'Numéro RCCM', "Montant de l'offre (FCFA)", 'Observations'].map(
          (label) => (
            <div key={label} className="mb-4">
              <label className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-1 block">
                {label}
              </label>
              {label === 'Observations' ? (
                <textarea
                  className="w-full px-4 py-2.5 rounded-xl bg-gray-50 dark:bg-white/5 border border-gray-200 dark:border-white/10 text-sm text-gray-900 dark:text-white"
                  rows={3}
                  placeholder={label}
                />
              ) : (
                <input
                  className="w-full px-4 py-2.5 rounded-xl bg-gray-50 dark:bg-white/5 border border-gray-200 dark:border-white/10 text-sm text-gray-900 dark:text-white"
                  placeholder={label}
                />
              )}
            </div>
          ),
        )}

        {/* Document upload */}
        <div className="mb-6">
          <label className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-1 block">
            Documents joints
          </label>
          <div className="flex items-center gap-3 p-4 rounded-xl border-2 border-dashed border-gray-200 dark:border-gray-800 bg-gray-50 dark:bg-white/3">
            <Download size={20} className="text-gray-400" />
            <span className="text-sm text-gray-500">
              Glissez vos fichiers ici ou cliquez pour sélectionner
            </span>
          </div>
        </div>

        <button
          onClick={handleSubmit}
          disabled={!selectedMarche || loading}
          className="w-full py-3 rounded-xl text-sm font-bold text-white transition-all hover:scale-[1.02] disabled:opacity-50"
          style={{ background: accentColor }}
        >
          {loading ? '⏳ Envoi en cours...' : '📨 Déposer la soumission'}
        </button>
      </div>
      <ToastContainer toasts={toasts} onDismiss={dismissToast} />
    </>
  );
}

/* ─── Alertes Panel ─── */
function AlertesPanel() {
  const { isAuthenticated } = useAuth();
  const [alertes, setAlertes] = useState(ALERTES_DEFAULT);
  const { toasts, showToast, dismissToast } = useServiceToast();

  const toggleAlerte = (id: string) => {
    setAlertes((prev) => prev.map((a) => (a.id === id ? { ...a, actif: !a.actif } : a)));
    const alerte = alertes.find((a) => a.id === id);
    if (alerte) {
      showToast(
        alerte.actif
          ? `🔕 Alerte "${alerte.label}" désactivée`
          : `🔔 Alerte "${alerte.label}" activée`,
      );
    }
  };

  if (!isAuthenticated) {
    return (
      <div className="rounded-2xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-white/2 p-6 text-center">
        <Bell size={32} className="mx-auto mb-3 text-gray-400" />
        <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
          Connectez-vous pour configurer vos alertes.
        </p>
        <a
          href="/demo"
          className="inline-flex items-center gap-1 px-4 py-2 rounded-xl text-white text-sm font-semibold"
          style={{ backgroundColor: accentColor }}
        >
          Essayer en Démo <ChevronRight size={14} />
        </a>
      </div>
    );
  }

  return (
    <>
      <div className="space-y-3">
        {alertes.map((alerte) => (
          <div
            key={alerte.id}
            className="flex items-center gap-4 p-4 rounded-xl bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800"
          >
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 mb-0.5">
                <span className="text-xs font-bold uppercase tracking-wide px-2 py-0.5 rounded-md bg-blue-50 dark:bg-blue-950/30 text-blue-600">
                  {alerte.type}
                </span>
                <span className="text-sm font-semibold text-gray-900 dark:text-white">
                  {alerte.label}
                </span>
              </div>
              <p className="text-xs text-gray-500 dark:text-gray-400">{alerte.description}</p>
            </div>
            <button
              onClick={() => toggleAlerte(alerte.id)}
              className={`w-12 h-7 rounded-full flex items-center transition-all duration-300 px-1 ${
                alerte.actif ? 'justify-end' : 'justify-start bg-gray-200 dark:bg-gray-700'
              }`}
              style={alerte.actif ? { background: accentColor } : undefined}
            >
              <div className="w-5 h-5 rounded-full bg-white shadow-sm" />
            </button>
          </div>
        ))}
      </div>

      <div className="mt-4 p-4 rounded-xl bg-blue-50 dark:bg-blue-950/20 border border-blue-200/50 dark:border-blue-800/30">
        <div className="flex items-center gap-2 text-blue-600 dark:text-blue-400 mb-1">
          <Bell size={16} />
          <span className="text-xs font-bold uppercase tracking-wide">Info</span>
        </div>
        <p className="text-xs text-blue-700 dark:text-blue-300">
          Les alertes sont envoyées par email et notification push dès qu&apos;un nouveau marché
          correspond à vos critères.
        </p>
      </div>
      <ToastContainer toasts={toasts} onDismiss={dismissToast} />
    </>
  );
}

/* ─── Dashboard Panel ─── */
function DashboardPanel() {
  const { isAuthenticated } = useAuth();

  const STATUT_STYLES: Record<string, { label: string; color: string }> = {
    soumis: { label: 'Soumis', color: '#3b82f6' },
    en_evaluation: { label: 'En évaluation', color: '#f59e0b' },
    retenu: { label: 'Retenu', color: '#10b981' },
    non_retenu: { label: 'Non retenu', color: '#ef4444' },
  };

  if (!isAuthenticated) {
    return (
      <div className="rounded-2xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-white/2 p-6 text-center">
        <BarChart3 size={32} className="mx-auto mb-3 text-gray-400" />
        <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
          Connectez-vous pour voir vos soumissions.
        </p>
        <a
          href="/demo"
          className="inline-flex items-center gap-1 px-4 py-2 rounded-xl text-white text-sm font-semibold"
          style={{ backgroundColor: accentColor }}
        >
          Essayer en Démo <ChevronRight size={14} />
        </a>
      </div>
    );
  }

  return (
    <div>
      {/* Stats summary */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-6">
        {[
          { label: 'Soumissions', value: MES_SOUMISSIONS.length, color: '#3b82f6' },
          {
            label: 'En évaluation',
            value: MES_SOUMISSIONS.filter((s) => s.statut === 'en_evaluation').length,
            color: '#f59e0b',
          },
          {
            label: 'Retenues',
            value: MES_SOUMISSIONS.filter((s) => s.statut === 'retenu').length,
            color: '#10b981',
          },
          { label: 'Taux de succès', value: '—', color: '#8b5cf6' },
        ].map((s) => (
          <div
            key={s.label}
            className="p-3 rounded-xl bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 text-center"
          >
            <div className="text-lg font-extrabold" style={{ color: s.color }}>
              {s.value}
            </div>
            <div className="text-[11px] text-gray-500 dark:text-gray-400">{s.label}</div>
          </div>
        ))}
      </div>

      {/* Submissions list */}
      <h4 className="text-sm font-bold text-gray-500 uppercase tracking-wider mb-3">Historique</h4>
      <div className="space-y-3">
        {MES_SOUMISSIONS.map((sub, i) => {
          const st = STATUT_STYLES[sub.statut] || STATUT_STYLES.soumis;
          return (
            <ServiceActionCard
              key={sub.id}
              title={sub.marcheTitre}
              subtitle={`Réf: ${sub.reference} · ${sub.marcheRef}`}
              index={i}
              accentColor={accentColor}
              status={st}
              details={[
                {
                  icon: 'calendar',
                  label: `Soumis le ${new Date(sub.dateSoumission).toLocaleDateString('fr-FR')}`,
                },
                { icon: 'custom', label: `Montant: ${sub.montant}` },
              ]}
            />
          );
        })}
        {MES_SOUMISSIONS.length === 0 && (
          <div className="text-center py-8 text-gray-400">
            <ClipboardList size={32} className="mx-auto mb-3 opacity-40" />
            <p className="text-sm">Aucune soumission pour le moment</p>
          </div>
        )}
      </div>
    </div>
  );
}
