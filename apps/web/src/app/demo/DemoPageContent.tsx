'use client';

// GABON BIZ — Demo Page Content (Premium redesign inspired by homepage)
// Full-screen hero → Glassmorphic profile cards → Polished access matrix

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { DEMO_ACCOUNTS, type DemoAccount } from '@/lib/demo-accounts';
import {
  ArrowRight,
  ShieldCheck,
  MapPin,
  Phone,
  Clock,
  Sparkles,
  Users,
  Grid3x3,
  ChevronDown,
  CheckCircle2,
  Minus,
} from 'lucide-react';
import { useI18n } from '@/lib/i18n/i18nContext';
import { useAuth } from '@/lib/auth-context';
import { Navbar } from '@/app/page';

import CompactHero from '@/components/services/CompactHero';

const MODULE_SHORT_NAMES: Record<string, string> = {
  '/dashboard/entreprises': 'Guichet',
  '/dashboard/marches': 'Marchés',
  '/dashboard/soumissions': 'Soumissions',
  '/dashboard/innovation': 'Innovation',
  '/dashboard/incubateur': 'Incubateur',
  '/dashboard/investir': 'Investir',
  '/dashboard/observatoire': 'Observatoire',
  '/dashboard/filieres': 'Filières',
  '/dashboard/admin': 'Admin',
  '/dashboard/cgi': 'CGI',
  '/dashboard/annuaire': 'Annuaire',
};

const MATRIX_MODULES = [
  { path: '/dashboard/entreprises', label: 'Guichet' },
  { path: '/dashboard/marches', label: 'Marchés' },
  { path: '/dashboard/soumissions', label: 'Soumis.' },
  { path: '/dashboard/innovation', label: 'Innov.' },
  { path: '/dashboard/incubateur', label: 'Incub.' },
  { path: '/dashboard/investir', label: 'Investir' },
  { path: '/dashboard/observatoire', label: 'Obs.' },
  { path: '/dashboard/filieres', label: 'Filières' },
  { path: '/dashboard/cgi', label: 'CGI' },
];

/* ═══════════════════════════════
   ANIMATION VARIANTS
   ═══════════════════════════════ */

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, delay: i * 0.08, ease: 'easeOut' as const },
  }),
};

const stagger = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.06 } },
};

/* ═══════════════════════════════
   GLASSMORPHIC PROFILE CARD
   ═══════════════════════════════ */

function ProfileCard({
  account,
  onSelect,
  index,
}: {
  account: DemoAccount;
  onSelect: (id: string) => void;
  index: number;
}) {
  const [loading, setLoading] = useState(false);
  const { tr } = useI18n();
  const modules = account.accessibleModules.filter((m) => m !== '/dashboard');

  const handleClick = async () => {
    setLoading(true);
    onSelect(account.id);
  };

  const initials = account.user.fullName
    .split(' ')
    .map((n) => n[0])
    .join('')
    .slice(0, 2);

  return (
    <motion.div
      variants={fadeUp}
      custom={index}
      whileHover={{ y: -6, scale: 1.01 }}
      whileTap={{ scale: 0.98 }}
      className="group relative bg-white/80 dark:bg-white/6 backdrop-blur-xl rounded-3xl border border-white/20 dark:border-white/8 shadow-black/3 dark:shadow-black/30 hover:border-white/40 dark:hover:border-white/15 transition-all duration-500 cursor-pointer overflow-hidden flex flex-col"
      onClick={handleClick}
    >
      {/* Accent glow on hover */}
      <div
        className="absolute inset-0 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
        style={{
          background: `radial-gradient(circle at 50% 0%, ${account.accentColor}15, transparent 70%)`,
        }}
      />

      {/* Top gradient bar */}
      <div
        className="h-1 w-full rounded-t-3xl"
        style={{
          background: `linear-gradient(90deg, ${account.accentColor}, ${account.accentColor}80)`,
        }}
      />

      <div className="p-5 flex flex-col flex-1 relative z-10">
        {/* Avatar row */}
        <div className="flex items-center gap-3.5 mb-4">
          <div
            className="w-12 h-12 rounded-2xl flex items-center justify-center text-white font-bold text-sm shrink-0"
            style={{
              background: `linear-gradient(135deg, ${account.accentColor}, ${account.accentColor}bb)`,
              boxShadow: `0 8px 24px ${account.accentColor}30`,
            }}
          >
            {initials}
          </div>
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2">
              <span className="text-lg">{account.icon}</span>
              <h3 className="text-sm font-bold text-gray-900 dark:text-white truncate leading-tight">
                {account.label}
              </h3>
            </div>
            <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5 truncate">
              {account.user.fullName}
            </p>
          </div>
        </div>

        {/* Org + Location */}
        {account.user.organization && (
          <div className="mb-3 px-3 py-2 rounded-xl bg-gray-100/80 dark:bg-white/4 border border-gray-200/50 dark:border-white/6">
            <p className="text-xs font-medium text-gray-700 dark:text-gray-300 truncate">
              {account.user.title} — {account.user.organization}
            </p>
            {account.user.location && (
              <p className="flex items-center gap-1 text-[11px] text-gray-400 dark:text-gray-500 mt-0.5">
                <MapPin size={10} />
                {account.user.location}
              </p>
            )}
          </div>
        )}

        {/* Description */}
        <p className="text-xs text-gray-600 dark:text-gray-400 leading-relaxed line-clamp-2 mb-4">
          {account.description}
        </p>

        {/* Module pills */}
        <div className="flex flex-wrap gap-1.5 mb-5">
          {modules.slice(0, 4).map((m) => (
            <span
              key={m}
              className="px-2.5 py-0.5 text-[10px] font-semibold rounded-lg backdrop-blur-sm"
              style={{
                background: `${account.accentColor}12`,
                color: account.accentColor,
                border: `1px solid ${account.accentColor}20`,
              }}
            >
              {MODULE_SHORT_NAMES[m] || m.split('/').pop()}
            </span>
          ))}
          {modules.length > 4 && (
            <span className="px-2.5 py-0.5 text-[10px] font-semibold rounded-lg bg-gray-100/80 dark:bg-white/6 text-gray-500 dark:text-gray-400 border border-gray-200/50 dark:border-white/6">
              +{modules.length - 4}
            </span>
          )}
        </div>

        {/* CTA button */}
        <button
          disabled={loading}
          className="mt-auto w-full py-3 rounded-2xl text-sm font-bold text-white flex items-center justify-center gap-2 transition-all duration-300 hover:scale-[1.02] disabled:opacity-60"
          style={{
            background: `linear-gradient(135deg, ${account.accentColor}, ${account.accentColor}cc)`,
            boxShadow: `0 4px 16px ${account.accentColor}30`,
          }}
        >
          {loading ? (
            <span className="animate-spin">⏳</span>
          ) : (
            <>
              {tr('demo.access')} <ArrowRight size={16} />
            </>
          )}
        </button>
      </div>
    </motion.div>
  );
}

/* ═══════════════════════════════
   PREMIUM ACCESS MATRIX
   ═══════════════════════════════ */

function AccessMatrix() {
  const [expanded, setExpanded] = useState(false);

  return (
    <div>
      <div
        className={`overflow-x-auto ${!expanded ? 'max-h-[400px] overflow-hidden relative' : ''}`}
      >
        <table className="w-full text-xs border-collapse">
          <thead>
            <tr>
              <th className="text-left py-3.5 px-4 text-gray-500 dark:text-gray-400 font-bold border-b border-gray-200/50 dark:border-white/8 sticky left-0 bg-white/90 dark:bg-gray-950/90 backdrop-blur-sm z-10 text-sm">
                Profil
              </th>
              {MATRIX_MODULES.map((m) => (
                <th
                  key={m.path}
                  className="text-center py-3.5 px-2.5 text-gray-500 dark:text-gray-400 font-bold border-b border-gray-200/50 dark:border-white/8 whitespace-nowrap text-xs"
                >
                  {m.label}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {DEMO_ACCOUNTS.map((account, i) => (
              <motion.tr
                key={account.id}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.03 }}
                className="group hover:bg-gray-100/50 dark:hover:bg-white/2 transition-colors"
              >
                <td className="py-3 px-4 font-semibold text-gray-700 dark:text-gray-300 border-b border-gray-200/50 dark:border-white/4 sticky left-0 bg-white/90 dark:bg-gray-950/90 backdrop-blur-sm z-10 whitespace-nowrap">
                  <div className="flex items-center gap-2">
                    <span
                      className="w-2 h-2 rounded-full shrink-0"
                      style={{ background: account.accentColor }}
                    />
                    <span className="text-sm">{account.icon}</span>
                    <span className="text-xs">{account.label}</span>
                  </div>
                </td>
                {MATRIX_MODULES.map((m) => (
                  <td
                    key={m.path}
                    className="text-center py-3 px-2.5 border-b border-gray-200/50 dark:border-white/4"
                  >
                    {account.accessibleModules.includes(m.path) ? (
                      <CheckCircle2 size={16} className="inline-block text-emerald-500" />
                    ) : (
                      <Minus size={14} className="inline-block text-gray-300 dark:text-gray-700" />
                    )}
                  </td>
                ))}
              </motion.tr>
            ))}
          </tbody>
        </table>
        {!expanded && (
          <div className="absolute bottom-0 left-0 right-0 h-24 bg-linear-to-t from-white dark:from-gray-950 to-transparent pointer-events-none" />
        )}
      </div>
      <button
        onClick={() => setExpanded(!expanded)}
        className="mt-3 mx-auto flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold text-gray-600 dark:text-gray-400 bg-gray-100/50 dark:bg-white/4 border border-gray-200/50 dark:border-white/6 hover:bg-gray-200/50 dark:hover:bg-white/8 transition-all"
      >
        <ChevronDown
          size={16}
          className={`transition-transform duration-300 ${expanded ? 'rotate-180' : ''}`}
        />
        {expanded ? 'Réduire' : 'Voir tous les profils'}
      </button>
    </div>
  );
}

/* ═══════════════════════════════
   FOOTER (inline)
   ═══════════════════════════════ */

function DemoFooter() {
  const { tr } = useI18n();

  return (
    <footer className="relative bg-gray-950 overflow-hidden">
      {/* Decorative glow */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(16,185,129,0.08),transparent_50%)] pointer-events-none" />

      <div className="relative z-10">
        {/* Contact strip */}
        <div className="border-t border-white/6 py-12">
          <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-3 gap-8 text-center md:text-left">
            <div className="flex flex-col items-center md:items-start">
              <div className="w-10 h-10 rounded-xl bg-emerald-500/10 flex items-center justify-center mb-3">
                <MapPin size={20} className="text-emerald-400" />
              </div>
              <h4 className="text-white font-semibold mb-1 text-sm">{tr('demo.footer_address')}</h4>
              <p className="text-gray-400 text-sm">{tr('contact.address')}</p>
            </div>
            <div className="flex flex-col items-center md:items-start">
              <div className="w-10 h-10 rounded-xl bg-emerald-500/10 flex items-center justify-center mb-3">
                <Phone size={20} className="text-emerald-400" />
              </div>
              <h4 className="text-white font-semibold mb-1 text-sm">{tr('demo.footer_phone')}</h4>
              <p className="text-gray-400 text-sm">{tr('contact.phone')}</p>
            </div>
            <div className="flex flex-col items-center md:items-start">
              <div className="w-10 h-10 rounded-xl bg-emerald-500/10 flex items-center justify-center mb-3">
                <Clock size={20} className="text-emerald-400" />
              </div>
              <h4 className="text-white font-semibold mb-1 text-sm">{tr('demo.footer_hours')}</h4>
              <p className="text-gray-400 text-sm">{tr('contact.hours')}</p>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="max-w-7xl mx-auto px-6 py-8 border-t border-white/6">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-linear-to-br from-emerald-500 to-emerald-600 flex items-center justify-center">
                <span className="text-white font-bold text-sm">G</span>
              </div>
              <span className="font-bold text-white text-lg">
                GABON <span className="text-emerald-400">BIZ</span>
              </span>
            </div>
            <div className="flex gap-6">
              <Link href="#" className="text-gray-500 hover:text-white text-sm transition-colors">
                {tr('demo.footer_terms')}
              </Link>
              <Link href="#" className="text-gray-500 hover:text-white text-sm transition-colors">
                {tr('demo.footer_privacy')}
              </Link>
              <Link href="#" className="text-gray-500 hover:text-white text-sm transition-colors">
                {tr('demo.footer_cookies')}
              </Link>
            </div>
          </div>
          <div className="text-center md:text-left mt-6">
            <p className="text-sm text-gray-600">{tr('footer.desc')}</p>
            <p className="mt-1 text-xs text-gray-700">
              © 2026 République Gabonaise. {tr('footer.rights')}
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}

/* ═══════════════════════════════
   MAIN DEMO PAGE
   ═══════════════════════════════ */

export default function DemoPageContent() {
  const router = useRouter();
  const { refreshAuth } = useAuth();
  const { tr } = useI18n();
  const [, setError] = useState('');

  const handleSelect = async (accountId: string) => {
    setError('');
    try {
      const res = await fetch('/api/auth/demo', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ accountId }),
      });

      if (!res.ok) {
        const data = await res.json();
        setError(data.error || tr('demo.error_login'));
        return;
      }

      // Refresh auth context BEFORE navigating — prevents stale user name
      await refreshAuth();
      router.push('/dashboard');
    } catch {
      setError(tr('demo.error_network'));
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-950">
      <Navbar />

      {/* ═══════ HERO ═══════ */}
      <CompactHero
        badge="Mode Démonstration"
        badgeIcon={<Sparkles size={14} className="text-amber-400" />}
        title={
          <>
            Explorez GABON BIZ{' '}
            <span className="text-transparent bg-clip-text bg-linear-to-r from-emerald-400 to-teal-300">
              en action.
            </span>
          </>
        }
        subtitle={
          <>
            Choisissez un profil ci-dessous pour naviguer la plateforme avec des données réalistes.{' '}
            <strong className="text-white/90">Aucun compte requis.</strong>
          </>
        }
        backgroundClasses="bg-linear-to-br from-gray-900 via-emerald-950/60 to-gray-900"
        overlays={
          <>
            <div className="absolute inset-0">
              <Image
                src="/images/hero-libreville.png"
                alt="Libreville"
                fill
                className="object-cover opacity-15"
                sizes="100vw"
                priority
              />
            </div>
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_left,rgba(16,185,129,0.15),transparent_50%)]" />
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_right,rgba(245,158,11,0.10),transparent_50%)]" />
          </>
        }
        accentColor="#10b981"
        stats={[
          {
            value: DEMO_ACCOUNTS.length,
            label: 'Profils disponibles',
            icon: <Users size={18} className="text-emerald-400" />,
          },
          {
            value: '2h',
            label: 'Durée de session',
            icon: <ShieldCheck size={18} className="text-emerald-400" />,
          },
          {
            value: '11',
            label: 'Modules accessibles',
            icon: <Grid3x3 size={18} className="text-emerald-400" />,
          },
          {
            value: '100%',
            label: 'Données fictives',
            icon: <Sparkles size={18} className="text-amber-400" />,
          },
        ]}
      />

      {/* ═══════ PROFILE CARDS GRID ═══════ */}
      <section className="relative px-6 py-20 -mt-8">
        {/* Decorative gradient background */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(16,185,129,0.04),transparent_40%)] dark:bg-[radial-gradient(ellipse_at_top,rgba(16,185,129,0.06),transparent_40%)] pointer-events-none" />

        <div className="relative z-10 max-w-7xl mx-auto">
          {/* Section header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-emerald-50 dark:bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 text-sm font-semibold mb-4">
              <Users size={16} />
              {DEMO_ACCOUNTS.length} {tr('demo.profiles_available')}
            </div>
            <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900 dark:text-white">
              {tr('demo.choose_role')}
            </h2>
          </motion.div>

          {/* Cards grid */}
          <motion.div
            variants={stagger}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-50px' }}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5"
          >
            {DEMO_ACCOUNTS.map((account, i) => (
              <ProfileCard key={account.id} account={account} onSelect={handleSelect} index={i} />
            ))}
          </motion.div>
        </div>
      </section>

      {/* ═══════ ACCESS MATRIX ═══════ */}
      <section className="px-6 pb-24">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-8"
          >
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-blue-50 dark:bg-blue-500/10 text-blue-600 dark:text-blue-400 text-sm font-semibold mb-4">
              <Grid3x3 size={16} />
              {tr('demo.matrix_badge')}
            </div>
            <h2 className="text-3xl font-extrabold text-gray-900 dark:text-white">
              {tr('demo.matrix_title')}
            </h2>
            <p className="text-gray-500 dark:text-gray-400 mt-2 max-w-lg mx-auto">
              {tr('demo.matrix_desc')}
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="bg-white/80 dark:bg-white/3 backdrop-blur-xl rounded-3xl border border-gray-200/50 dark:border-white/6 p-4 md:p-6 shadow-black/2 dark:shadow-black/20"
          >
            <AccessMatrix />
          </motion.div>
        </div>
      </section>

      <DemoFooter />
    </div>
  );
}
