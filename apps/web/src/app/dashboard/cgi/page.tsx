'use client';

// CGI Dashboard — Overview Page
// 4 KPI cards, 4 pole cards, events timeline, partnerships
// Enhanced for Directeur CGI profile with SADA program management

import Link from 'next/link';
import { motion } from 'framer-motion';
import {
  Users,
  Award,
  Wrench,
  Video,
  Calendar,
  MapPin,
  Globe,
  ArrowRight,
  TrendingUp,
  GraduationCap,
  Handshake,
  FileText,
  DollarSign,
  BarChart3,
} from 'lucide-react';
import { useAuth } from '@/lib/auth-context';
import { getDemoAccountByNip } from '@/lib/demo-accounts';
import {
  CGI_STATS_HERO,
  CGI_POLES,
  CGI_EVENEMENTS,
  CGI_PARTENARIATS,
  CGI_SITES,
} from '@/lib/mock/cgi-data';

import type { LucideIcon } from 'lucide-react';

const POLE_ICONS: Record<string, LucideIcon> = {
  acculturation: Users,
  certification: Award,
  fablab: Wrench,
  medialab: Video,
};

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: (i: number) => ({ opacity: 1, y: 0, transition: { delay: i * 0.08, duration: 0.5 } }),
};

const STAT_CARDS = [
  {
    label: 'Personnes formées',
    value: CGI_STATS_HERO.personnesFormees.toLocaleString(),
    icon: GraduationCap,
    color: 'from-amber-500 to-orange-500',
  },
  {
    label: 'Certifiés internationaux',
    value: CGI_STATS_HERO.certifies2026.toLocaleString(),
    icon: Award,
    color: 'from-blue-500 to-indigo-500',
  },
  {
    label: 'Projets FabLab',
    value: CGI_STATS_HERO.projetsFabLab.toString(),
    icon: Wrench,
    color: 'from-emerald-500 to-teal-500',
  },
  {
    label: 'Taux insertion pro',
    value: `${CGI_STATS_HERO.tauxInsertionPro}%`,
    icon: TrendingUp,
    color: 'from-purple-500 to-pink-500',
  },
];

const STATUS_LABEL: Record<string, { text: string; cls: string }> = {
  inscriptions_ouvertes: {
    text: 'Inscriptions ouvertes',
    cls: 'bg-emerald-100 text-emerald-700 dark:bg-emerald-900/50 dark:text-emerald-400',
  },
  complet: { text: 'Complet', cls: 'bg-red-100 text-red-700 dark:bg-red-900/50 dark:text-red-400' },
  en_cours: {
    text: 'En cours',
    cls: 'bg-blue-100 text-blue-700 dark:bg-blue-900/50 dark:text-blue-400',
  },
  terminé: {
    text: 'Terminé',
    cls: 'bg-gray-100 text-gray-600 dark:bg-gray-800 dark:text-gray-400',
  },
};

/* ─── SADA Program Data (for Directeur CGI) ─── */

const SADA_COHORTES = [
  {
    id: 'sada-v1',
    name: 'Vague 1 — Libreville',
    status: 'terminé',
    participants: 420,
    diplomes: 385,
    taux: '91.7%',
  },
  {
    id: 'sada-v2',
    name: 'Vague 2 — Port-Gentil / Franceville',
    status: 'en_cours',
    participants: 350,
    diplomes: 0,
    taux: '—',
  },
  {
    id: 'sada-v3',
    name: 'Vague 3 — National (9 provinces)',
    status: 'inscriptions_ouvertes',
    participants: 125,
    diplomes: 0,
    taux: '—',
  },
];

const CGI_BUDGET = [
  { label: 'Budget annuel CGI', value: '4.2 Mds FCFA', icon: DollarSign, color: '#F59E0B' },
  { label: 'Dépenses Q1 2026', value: '980 M FCFA', icon: BarChart3, color: '#3b82f6' },
  { label: 'Subventions partenaires', value: '1.8 Mds FCFA', icon: Handshake, color: '#10b981' },
  { label: 'Rapports trimestriels', value: '12', icon: FileText, color: '#8b5cf6' },
];

export default function CGIDashboardPage() {
  const { user } = useAuth();
  const account = user?.isDemo ? getDemoAccountByNip(user.nip) : null;
  const isDirecteurCGI = account?.id === 'demo-cgi' || user?.roles?.includes('CGI_DIRECTEUR');

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex items-center gap-4">
        <div
          className="w-12 h-12 rounded-xl bg-linear-to-br from-amber-500 to-orange-600 flex items-center justify-center text-white shrink-0"
          aria-hidden="true"
        >
          <GraduationCap size={24} />
        </div>
        <div>
          <h1 className="text-2xl font-extrabold text-gray-900 dark:text-white">
            Centre Gabonais de l&apos;Innovation
          </h1>
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-0.5">
            Filiale SPIN — Tutelle MENUDI · 4 Pôles · {CGI_STATS_HERO.partenairesInternationaux}{' '}
            Partenaires
          </p>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
        {STAT_CARDS.map((s, i) => (
          <motion.div
            key={s.label}
            variants={fadeUp}
            custom={i}
            initial="hidden"
            animate="visible"
            className="p-5 rounded-2xl bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 transition-shadow"
          >
            <div
              className={`w-10 h-10 rounded-xl bg-linear-to-br ${s.color} flex items-center justify-center mb-3`}
            >
              <s.icon size={20} className="text-white" />
            </div>
            <div className="text-2xl font-extrabold text-gray-900 dark:text-white">{s.value}</div>
            <div className="text-sm text-gray-500 dark:text-gray-400">{s.label}</div>
          </motion.div>
        ))}
      </div>

      {/* Directeur CGI — Budget & SADA sections */}
      {isDirecteurCGI && (
        <>
          {/* Budget Overview */}
          <section aria-label="Pilotage budgétaire">
            <h2 className="text-lg font-bold text-gray-900 dark:text-white mb-3 flex items-center gap-2">
              <DollarSign size={18} className="text-amber-500" /> Pilotage Budgétaire
            </h2>
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
              {CGI_BUDGET.map((b, i) => {
                const Icon = b.icon;
                return (
                  <motion.div
                    key={b.label}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.05 }}
                    className="p-4 rounded-xl bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800"
                  >
                    <Icon size={16} style={{ color: b.color }} className="mb-2" />
                    <div className="text-lg font-extrabold text-gray-900 dark:text-white">
                      {b.value}
                    </div>
                    <div className="text-xs text-gray-500 dark:text-gray-400">{b.label}</div>
                  </motion.div>
                );
              })}
            </div>
          </section>

          {/* SADA Program */}
          <section aria-label="Programme SADA">
            <h2 className="text-lg font-bold text-gray-900 dark:text-white mb-3 flex items-center gap-2">
              <GraduationCap size={18} className="text-amber-500" /> Programme SADA — Cohortes
            </h2>
            <div className="space-y-3">
              {SADA_COHORTES.map((c) => {
                const st = STATUS_LABEL[c.status] || STATUS_LABEL.en_cours;
                return (
                  <div
                    key={c.id}
                    className="flex items-center gap-4 p-4 rounded-xl bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800"
                  >
                    <div className="flex-1 min-w-0">
                      <h4 className="font-semibold text-gray-900 dark:text-white">{c.name}</h4>
                      <div className="flex items-center gap-4 text-xs text-gray-500 dark:text-gray-400 mt-1">
                        <span>{c.participants} participants</span>
                        {c.diplomes > 0 && <span>{c.diplomes} diplômés</span>}
                        {c.taux !== '—' && (
                          <span>
                            Taux réussite : <strong className="text-emerald-600">{c.taux}</strong>
                          </span>
                        )}
                      </div>
                    </div>
                    <span
                      className={`px-2.5 py-1 rounded-full text-xs font-semibold whitespace-nowrap ${st.cls}`}
                    >
                      {st.text}
                    </span>
                  </div>
                );
              })}
            </div>
          </section>
        </>
      )}

      {/* 4 Poles */}
      <section aria-label="Les 4 pôles">
        <h2 className="text-lg font-bold text-gray-900 dark:text-white mb-3">Les 4 Pôles</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {CGI_POLES.map((pole, i) => {
            const Icon = POLE_ICONS[pole.id] || Users;
            return (
              <motion.div
                key={pole.id}
                variants={fadeUp}
                custom={i + 4}
                initial="hidden"
                animate="visible"
              >
                <Link
                  href={pole.href}
                  className="group block p-5 rounded-2xl bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 transition-all"
                >
                  <div className="flex items-center gap-4 mb-3">
                    <div
                      className="w-12 h-12 rounded-xl flex items-center justify-center shrink-0"
                      style={{ background: `${pole.color}20` }}
                    >
                      <Icon size={24} style={{ color: pole.color }} />
                    </div>
                    <div>
                      <h3 className="font-bold text-gray-900 dark:text-white group-hover:text-amber-600 dark:group-hover:text-amber-400 transition-colors">
                        {pole.name}
                      </h3>
                      <p className="text-sm text-gray-500 dark:text-gray-400">{pole.description}</p>
                    </div>
                  </div>
                  <div className="flex gap-3 flex-wrap">
                    {Object.entries(pole.stats).map(([k, v]) => (
                      <span
                        key={k}
                        className="px-2.5 py-1 rounded-lg bg-gray-100 dark:bg-gray-800 text-xs font-medium text-gray-600 dark:text-gray-300"
                      >
                        {String(v)}{' '}
                        <span className="text-gray-400">{k.replace(/([A-Z])/g, ' $1').trim()}</span>
                      </span>
                    ))}
                  </div>
                  <div className="mt-3 flex items-center gap-1 text-sm font-semibold text-amber-600 dark:text-amber-400 opacity-0 group-hover:opacity-100 transition-opacity">
                    Explorer <ArrowRight size={14} />
                  </div>
                </Link>
              </motion.div>
            );
          })}
        </div>
      </section>

      {/* Events Timeline */}
      <section aria-label="Prochains événements">
        <h2 className="text-lg font-bold text-gray-900 dark:text-white mb-3 flex items-center gap-2">
          <Calendar size={18} className="text-amber-500" /> Prochains Événements
        </h2>
        <div className="space-y-3">
          {CGI_EVENEMENTS.map((evt) => {
            const st = STATUS_LABEL[evt.statut] || STATUS_LABEL.en_cours;
            return (
              <div
                key={evt.id}
                className="flex items-center gap-4 p-4 rounded-xl bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800"
              >
                <div className="w-14 text-center shrink-0">
                  <div className="text-xs text-gray-400 uppercase">
                    {new Date(evt.date).toLocaleDateString('fr-FR', { month: 'short' })}
                  </div>
                  <div className="text-xl font-bold text-gray-900 dark:text-white">
                    {new Date(evt.date).getDate()}
                  </div>
                </div>
                <div className="flex-1 min-w-0">
                  <h4 className="font-semibold text-gray-900 dark:text-white truncate">
                    {evt.title}
                  </h4>
                  <div className="flex items-center gap-3 text-xs text-gray-500 dark:text-gray-400 mt-1">
                    <span className="flex items-center gap-1">
                      <MapPin size={12} /> {evt.location}
                    </span>
                    <span>
                      {evt.inscriptions}/{evt.places} inscrits
                    </span>
                  </div>
                </div>
                <span
                  className={`px-2.5 py-1 rounded-full text-xs font-semibold whitespace-nowrap ${st.cls}`}
                >
                  {st.text}
                </span>
              </div>
            );
          })}
        </div>
      </section>

      {/* Sites & Partners */}
      <div className="grid md:grid-cols-2 gap-6">
        {/* Sites */}
        <div>
          <h2 className="text-lg font-bold text-gray-900 dark:text-white mb-3 flex items-center gap-2">
            <MapPin size={18} className="text-amber-500" /> Sites CGI
          </h2>
          <div className="space-y-3">
            {CGI_SITES.map((site) => (
              <div
                key={site.id}
                className="p-4 rounded-xl bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800"
              >
                <h4 className="font-semibold text-gray-900 dark:text-white">{site.name}</h4>
                <p className="text-sm text-gray-500 dark:text-gray-400">{site.province}</p>
                {site.partenaire && (
                  <span className="inline-block mt-2 px-2 py-0.5 rounded-md bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 text-xs font-medium">
                    PPP {site.partenaire}
                  </span>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Partnerships */}
        <div>
          <h2 className="text-lg font-bold text-gray-900 dark:text-white mb-3 flex items-center gap-2">
            <Handshake size={18} className="text-amber-500" /> Partenariats Internationaux
          </h2>
          <div className="space-y-3">
            {CGI_PARTENARIATS.map((p) => (
              <div
                key={p.nom}
                className="flex items-center gap-3 p-3 rounded-xl bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800"
              >
                <Globe size={18} className="text-amber-500 shrink-0" />
                <div className="flex-1 min-w-0">
                  <h4 className="font-semibold text-sm text-gray-900 dark:text-white truncate">
                    {p.nom}
                  </h4>
                  <p className="text-xs text-gray-500 dark:text-gray-400">{p.programme}</p>
                </div>
                <span className="text-xs text-gray-400 shrink-0">Depuis {p.depuis}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
