'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {
  Rocket,
  ArrowRight,
  BookOpen,
  Search,
  Mail,
  ChevronDown,
  ChevronUp,
  Building2,
  TrendingUp,
  Banknote,
  Users,
  Code,
  Lightbulb,
  GraduationCap,
  Globe,
  Shield,
  Zap,
  Server,
  Headset,
  Palette,
  CheckCircle,
} from 'lucide-react';
import ProgrammeCard from '@/components/incubateur/ProgrammeCard';
import StartupProfileCard from '@/components/incubateur/StartupProfileCard';
import ImpactDashboard from '@/components/incubateur/ImpactDashboard';
import {
  PROGRAMMES_SING,
  PILIERS_SING,
  SUCCESS_STORIES,
  FAQ_SING,
  HERO_SING,
  MINILAB_SECTION,
  GABON_DIGITAL_SECTION,
  SING_300_SECTION,
  CTA_FINAL,
  PORTFOLIO_FILTERS,
  STATUS_CONFIG,
} from '@/lib/mock/incubateur-data';
import { STARTUPS_PORTFOLIO } from '@/lib/mock/incubateur-startups';

const accentColor = '#ec4899';

const PILIER_ICONS: Record<string, React.ElementType> = {
  Rocket,
  Banknote,
  Lightbulb,
  Code,
};

// ═══════ SECTION COMPONENTS ═══════

function HeroSection() {
  return (
    <section className="relative min-h-[80vh] flex items-center justify-center overflow-hidden bg-gradient-to-br from-pink-600 via-rose-500 to-fuchsia-600 dark:from-pink-900 dark:via-rose-800 dark:to-fuchsia-900">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_50%,rgba(255,255,255,0.1),transparent_60%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_20%,rgba(255,255,255,0.08),transparent_50%)]" />

      <div className="relative z-10 max-w-5xl mx-auto px-6 text-center py-20">
        {/* Badge */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/15 backdrop-blur-sm border border-white/20 text-white text-xs font-semibold mb-6"
        >
          <Rocket size={14} /> {HERO_SING.badge}
        </motion.div>

        {/* Title */}
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="text-5xl md:text-7xl font-black text-white mb-3"
        >
          {HERO_SING.title}
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="text-xl md:text-2xl text-white/90 font-medium mb-4 max-w-3xl mx-auto"
        >
          {HERO_SING.titleAccent}
        </motion.p>
        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="text-base text-white/70 mb-8 max-w-2xl mx-auto"
        >
          {HERO_SING.subtitle}
        </motion.p>

        {/* CTAs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="flex flex-col sm:flex-row gap-4 justify-center mb-12"
        >
          <motion.a
            href="/dashboard/incubateur/candidature"
            animate={{
              scale: [1, 1.02, 1],
              boxShadow: [
                '0 0 0 0 rgba(255,255,255,0.3)',
                '0 0 0 12px rgba(255,255,255,0)',
                '0 0 0 0 rgba(255,255,255,0)',
              ],
            }}
            transition={{ duration: 2, repeat: Infinity }}
            className="inline-flex items-center gap-2 px-8 py-4 bg-white text-pink-600 font-bold rounded-2xl text-base hover:bg-white/90 transition-all shadow-xl"
          >
            <Rocket size={18} /> Candidater maintenant
          </motion.a>
          <a
            href="#programmes"
            className="inline-flex items-center gap-2 px-8 py-4 bg-white/10 backdrop-blur-sm border border-white/20 text-white font-semibold rounded-2xl text-base hover:bg-white/20 transition-all"
          >
            <BookOpen size={18} /> Explorer les programmes
          </a>
        </motion.div>

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-3xl mx-auto"
        >
          {HERO_SING.stats.map((s) => (
            <div
              key={s.label}
              className="bg-white/10 backdrop-blur-sm rounded-xl p-4 border border-white/10"
            >
              <div className="text-2xl md:text-3xl font-black text-white">
                {s.value}
                <span className="text-base text-white/60">{s.suffix || ''}</span>
              </div>
              <div className="text-xs text-white/60 mt-1">{s.label}</div>
            </div>
          ))}
        </motion.div>

        {/* Partners Marquee */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
          className="mt-12 overflow-hidden"
        >
          <p className="text-xs text-white/40 uppercase tracking-wider mb-3">Partenaires</p>
          <div className="flex gap-8 animate-marquee whitespace-nowrap">
            {[...HERO_SING.partners, ...HERO_SING.partners].map((p, i) => (
              <span key={i} className="text-sm text-white/50 font-semibold">
                {p}
              </span>
            ))}
          </div>
        </motion.div>
      </div>
      <style jsx>{`
        @keyframes marquee {
          from {
            transform: translateX(0);
          }
          to {
            transform: translateX(-50%);
          }
        }
        .animate-marquee {
          animation: marquee 20s linear infinite;
        }
      `}</style>
    </section>
  );
}

function ProgrammesSection() {
  const [filter, setFilter] = useState<string>('all');
  const filtered =
    filter === 'all' ? PROGRAMMES_SING : PROGRAMMES_SING.filter((p) => p.status === filter);
  return (
    <section id="programmes" className="py-20 bg-gray-50 dark:bg-gray-900/50">
      <div className="max-w-7xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-10"
        >
          <span className="text-xs font-bold text-pink-500 uppercase tracking-wider">
            Programmes
          </span>
          <h2 className="text-3xl md:text-4xl font-black text-gray-900 dark:text-white mt-2">
            7 Programmes d&apos;Incubation
          </h2>
          <p className="text-gray-600 dark:text-gray-400 mt-2 max-w-2xl mx-auto">
            De l&apos;idéation au scaling, chaque programme est conçu pour une étape clé de votre
            parcours entrepreneurial.
          </p>
        </motion.div>
        <div className="flex flex-wrap justify-center gap-2 mb-8">
          {['all', 'OPEN', 'COMING_SOON', 'IN_PROGRESS', 'COMPLETED'].map((s) => (
            <button
              key={s}
              onClick={() => setFilter(s)}
              className={`text-xs font-semibold px-4 py-2 rounded-full transition-all ${filter === s ? 'bg-pink-500 text-white' : 'bg-white dark:bg-white/5 text-gray-600 dark:text-gray-400 border border-gray-200 dark:border-white/10 hover:bg-pink-50 dark:hover:bg-pink-500/10'}`}
            >
              {s === 'all' ? 'Tous' : STATUS_CONFIG[s]?.label || s}
            </button>
          ))}
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
          {filtered.map((p, i) => (
            <ProgrammeCard key={p.id} programme={p} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}

function PortfolioSection() {
  const [filter, setFilter] = useState('all');
  const [showAll, setShowAll] = useState(false);
  const filtered =
    filter === 'all' ? STARTUPS_PORTFOLIO : STARTUPS_PORTFOLIO.filter((s) => s.sector === filter);
  const displayed = showAll ? filtered : filtered.slice(0, 12);
  return (
    <section className="py-20">
      <div className="max-w-7xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-10"
        >
          <span className="text-xs font-bold text-pink-500 uppercase tracking-wider">
            Portfolio
          </span>
          <h2 className="text-3xl md:text-4xl font-black text-gray-900 dark:text-white mt-2">
            250+ Startups Propulsées par la SING
          </h2>
          <p className="text-gray-600 dark:text-gray-400 mt-2 max-w-2xl mx-auto">
            Explorez le portfolio de l&apos;écosystème tech gabonais le plus dynamique
            d&apos;Afrique centrale.
          </p>
        </motion.div>
        <div className="flex flex-wrap justify-center gap-2 mb-8">
          {PORTFOLIO_FILTERS.map((f) => (
            <button
              key={f.value}
              onClick={() => {
                setFilter(f.value);
                setShowAll(false);
              }}
              className={`text-xs font-semibold px-3 py-1.5 rounded-full transition-all ${filter === f.value ? 'bg-pink-500 text-white' : 'bg-white dark:bg-white/5 text-gray-600 dark:text-gray-400 border border-gray-200 dark:border-white/10'}`}
            >
              {f.label} <span className="text-[10px] opacity-60">{f.count}</span>
            </button>
          ))}
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {displayed.map((s, i) => (
            <StartupProfileCard key={s.id} startup={s} index={i} />
          ))}
        </div>
        {!showAll && filtered.length > 12 && (
          <div className="text-center mt-8">
            <button
              onClick={() => setShowAll(true)}
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-pink-500 text-white font-semibold text-sm hover:bg-pink-600 transition-all"
            >
              Voir les {filtered.length} startups <ArrowRight size={14} />
            </button>
          </div>
        )}
      </div>
    </section>
  );
}

function SuccessStoriesSection() {
  const [active, setActive] = useState(0);
  const story = SUCCESS_STORIES[active];
  return (
    <section className="py-20 bg-gray-50 dark:bg-gray-900/50">
      <div className="max-w-5xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-10"
        >
          <span className="text-xs font-bold text-pink-500 uppercase tracking-wider">
            Success Stories
          </span>
          <h2 className="text-3xl md:text-4xl font-black text-gray-900 dark:text-white mt-2">
            Ils ont réussi avec la SING
          </h2>
        </motion.div>
        <motion.div
          key={active}
          initial={{ opacity: 0, x: 30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ type: 'spring', stiffness: 100 }}
          className={`relative rounded-3xl p-8 md:p-12 bg-gradient-to-br ${story.gradient} text-white overflow-hidden`}
        >
          <div className="absolute inset-0 bg-black/10" />
          <div className="relative z-10">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-14 h-14 rounded-2xl bg-white/20 flex items-center justify-center text-2xl font-black">
                {story.startup[0]}
              </div>
              <div>
                <h3 className="text-xl font-bold">{story.startup}</h3>
                <p className="text-sm text-white/70">
                  {story.programme} · {story.year}
                </p>
              </div>
            </div>
            <blockquote className="text-lg md:text-xl font-medium italic mb-8 leading-relaxed">
              &ldquo;{story.quote}&rdquo;
            </blockquote>
            <div className="grid grid-cols-3 gap-4">
              {story.metrics.map((m) => (
                <div
                  key={m.label}
                  className="bg-white/10 backdrop-blur-sm rounded-xl p-4 text-center"
                >
                  <div className="text-xl md:text-2xl font-black">{m.value}</div>
                  <div className="text-xs text-white/70 mt-1">{m.label}</div>
                </div>
              ))}
            </div>
          </div>
        </motion.div>
        <div className="flex justify-center gap-3 mt-6">
          {SUCCESS_STORIES.map((_, i) => (
            <button
              key={i}
              onClick={() => setActive(i)}
              className={`w-3 h-3 rounded-full transition-all ${i === active ? 'bg-pink-500 scale-125' : 'bg-gray-300 dark:bg-gray-600'}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

function PiliersSection() {
  return (
    <section className="py-20">
      <div className="max-w-7xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <span className="text-xs font-bold text-pink-500 uppercase tracking-wider">
            Architecture
          </span>
          <h2 className="text-3xl md:text-4xl font-black text-gray-900 dark:text-white mt-2">
            Les 4 Piliers de la SING
          </h2>
        </motion.div>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-5">
          {PILIERS_SING.map((p, i) => {
            const Icon = PILIER_ICONS[p.iconName] || Rocket;
            return (
              <motion.div
                key={p.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="bg-white dark:bg-white/5 rounded-2xl border border-gray-200/60 dark:border-white/8 p-6 hover:shadow-lg transition-all hover:-translate-y-1 group"
              >
                <div
                  className="w-12 h-12 rounded-xl flex items-center justify-center text-white mb-4"
                  style={{ background: p.color }}
                >
                  <Icon size={22} />
                </div>
                <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-1">{p.name}</h3>
                <p className="text-xs text-gray-500 dark:text-gray-400 mb-3">{p.subtitle}</p>
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-4 line-clamp-3">
                  {p.description}
                </p>
                <div className="space-y-2 mb-4">
                  {p.stats.map((s) => (
                    <div key={s.label} className="flex justify-between text-xs">
                      <span className="text-gray-500 dark:text-gray-400">{s.label}</span>
                      <span className="font-bold text-gray-900 dark:text-white">{s.value}</span>
                    </div>
                  ))}
                </div>
                <div className="flex flex-wrap gap-1">
                  {p.programmes.slice(0, 3).map((pr) => (
                    <span
                      key={pr}
                      className="text-[10px] font-medium px-1.5 py-0.5 rounded"
                      style={{ background: `${p.color}15`, color: p.color }}
                    >
                      {pr}
                    </span>
                  ))}
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

function MinilabSection() {
  const ml = MINILAB_SECTION;
  const FEATURE_ICONS: Record<string, React.ElementType> = { Headset, Code, Palette, Globe };
  return (
    <section className="py-20 bg-gray-50 dark:bg-gray-900/50">
      <div className="max-w-6xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-10"
        >
          <span className="inline-flex items-center gap-1.5 text-[10px] font-bold px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-500 mb-3">
            {ml.badge}
          </span>
          <h2 className="text-3xl md:text-4xl font-black text-gray-900 dark:text-white">
            {ml.title}
          </h2>
          <p className="text-gray-600 dark:text-gray-400 mt-2 max-w-xl mx-auto">{ml.subtitle}</p>
        </motion.div>
        <div className="grid md:grid-cols-4 gap-4 mb-8">
          {ml.features.map((f, i) => {
            const Icon = FEATURE_ICONS[f.iconName] || Code;
            return (
              <motion.div
                key={f.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="bg-white dark:bg-white/5 rounded-xl p-5 border border-gray-200/60 dark:border-white/8 text-center"
              >
                <div className="w-10 h-10 rounded-xl bg-emerald-500/10 flex items-center justify-center mx-auto mb-3">
                  <Icon size={18} className="text-emerald-500" />
                </div>
                <h4 className="text-sm font-bold text-gray-900 dark:text-white mb-1">{f.name}</h4>
                <p className="text-xs text-gray-500 dark:text-gray-400">{f.desc}</p>
              </motion.div>
            );
          })}
        </div>
        <div className="grid md:grid-cols-3 gap-4">
          {ml.establishments.map((e) => (
            <div
              key={e.name}
              className="bg-white dark:bg-white/5 rounded-xl p-4 border border-gray-200/60 dark:border-white/8 flex items-center gap-3"
            >
              <div className="w-8 h-8 rounded-lg bg-emerald-500/10 flex items-center justify-center">
                <GraduationCap size={14} className="text-emerald-500" />
              </div>
              <div>
                <p className="text-sm font-semibold text-gray-900 dark:text-white">{e.name}</p>
                <p className="text-xs text-gray-500">
                  {e.city} · {e.status}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function GabonDigitalSection() {
  const gd = GABON_DIGITAL_SECTION;
  const ICONS: Record<string, React.ElementType> = { Globe, TrendingUp, Server, Users };
  return (
    <section className="py-20">
      <div className="max-w-6xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-10"
        >
          <span className="inline-flex items-center gap-1.5 text-[10px] font-bold px-3 py-1 rounded-full bg-blue-500/10 text-blue-500 mb-3">
            {gd.badge}
          </span>
          <h2 className="text-3xl md:text-4xl font-black text-gray-900 dark:text-white">
            {gd.title}
          </h2>
          <p className="text-gray-600 dark:text-gray-400 mt-2 max-w-xl mx-auto">{gd.subtitle}</p>
        </motion.div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          {gd.keyFigures.map((f, i) => {
            const Icon = ICONS[f.iconName] || Globe;
            return (
              <motion.div
                key={f.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="bg-blue-50 dark:bg-blue-500/5 rounded-xl p-5 border border-blue-100 dark:border-blue-500/10 text-center"
              >
                <Icon size={20} className="text-blue-500 mx-auto mb-2" />
                <div className="text-xl font-black text-gray-900 dark:text-white">
                  {f.value}
                  <span className="text-sm text-gray-500 ml-1">{f.suffix || ''}</span>
                </div>
                <div className="text-xs text-gray-500 dark:text-gray-400 mt-1">{f.label}</div>
              </motion.div>
            );
          })}
        </div>
        <div className="bg-white dark:bg-white/5 rounded-2xl border border-gray-200/60 dark:border-white/8 p-6">
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <h4 className="text-sm font-bold text-gray-900 dark:text-white mb-3">
                Piliers du mégaprojet
              </h4>
              <ul className="space-y-2">
                {gd.pillars.map((p) => (
                  <li
                    key={p}
                    className="flex items-start gap-2 text-sm text-gray-600 dark:text-gray-400"
                  >
                    <CheckCircle size={14} className="text-blue-500 mt-0.5 shrink-0" />
                    {p}
                  </li>
                ))}
              </ul>
            </div>
            <div className="bg-blue-50 dark:bg-blue-500/5 rounded-xl p-5 flex items-center">
              <p className="text-sm text-gray-700 dark:text-gray-300 leading-relaxed">
                {gd.singRole}
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function Sing300Section() {
  const s3 = SING_300_SECTION;
  const ICONS: Record<string, React.ElementType> = { Shield, Building2, Zap, Globe };
  return (
    <section className="py-20 bg-gray-50 dark:bg-gray-900/50">
      <div className="max-w-6xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-10"
        >
          <h2 className="text-3xl md:text-4xl font-black text-gray-900 dark:text-white">
            {s3.title}
          </h2>
          <p className="text-gray-600 dark:text-gray-400 mt-2 max-w-xl mx-auto">{s3.subtitle}</p>
        </motion.div>
        <div className="grid md:grid-cols-2 gap-5">
          {s3.axes.map((a, i) => {
            const Icon = ICONS[a.iconName] || Shield;
            return (
              <motion.div
                key={a.number}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="bg-white dark:bg-white/5 rounded-2xl border border-gray-200/60 dark:border-white/8 p-6"
              >
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-xl bg-pink-500/10 flex items-center justify-center shrink-0">
                    <Icon size={18} className="text-pink-500" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-sm font-bold text-gray-900 dark:text-white mb-1">
                      Axe {a.number} — {a.title}
                    </h3>
                    <p className="text-xs text-gray-500 dark:text-gray-400 mb-3">{a.description}</p>
                    <div className="flex items-center gap-3">
                      <div className="flex-1 h-2 bg-gray-100 dark:bg-white/8 rounded-full overflow-hidden">
                        <motion.div
                          initial={{ width: 0 }}
                          whileInView={{ width: `${a.progress}%` }}
                          viewport={{ once: true }}
                          transition={{ duration: 1.5, delay: 0.3 }}
                          className="h-full rounded-full bg-pink-500"
                        />
                      </div>
                      <span className="text-xs font-bold text-pink-500">{a.progress}%</span>
                    </div>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

function ImpactSection() {
  return (
    <section className="py-20">
      <div className="max-w-7xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-10"
        >
          <span className="text-xs font-bold text-pink-500 uppercase tracking-wider">Impact</span>
          <h2 className="text-3xl md:text-4xl font-black text-gray-900 dark:text-white mt-2">
            L&apos;Impact SING en Temps Réel
          </h2>
        </motion.div>
        <ImpactDashboard />
      </div>
    </section>
  );
}

function FAQSection() {
  const [open, setOpen] = useState<number | null>(null);
  return (
    <section className="py-20 bg-gray-50 dark:bg-gray-900/50">
      <div className="max-w-3xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-10"
        >
          <span className="text-xs font-bold text-pink-500 uppercase tracking-wider">FAQ</span>
          <h2 className="text-3xl font-black text-gray-900 dark:text-white mt-2">
            Questions fréquentes
          </h2>
        </motion.div>
        <div className="space-y-3">
          {FAQ_SING.map((faq, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.05 }}
              className="bg-white dark:bg-white/5 rounded-xl border border-gray-200/60 dark:border-white/8 overflow-hidden"
            >
              <button
                onClick={() => setOpen(open === i ? null : i)}
                className="w-full flex items-center justify-between p-4 text-left"
              >
                <span className="text-sm font-semibold text-gray-900 dark:text-white pr-4">
                  {faq.q}
                </span>
                {open === i ? (
                  <ChevronUp size={16} className="text-pink-500 shrink-0" />
                ) : (
                  <ChevronDown size={16} className="text-gray-400 shrink-0" />
                )}
              </button>
              {open === i && (
                <div className="px-4 pb-4">
                  <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
                    {faq.a}
                  </p>
                </div>
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

function CTASection() {
  return (
    <section className="py-20 bg-gradient-to-br from-pink-600 via-rose-500 to-fuchsia-600">
      <div className="max-w-4xl mx-auto px-6 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <h2 className="text-3xl md:text-4xl font-black text-white mb-4">{CTA_FINAL.title}</h2>
          <p className="text-lg text-white/80 mb-8">{CTA_FINAL.subtitle}</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="/dashboard/incubateur/candidature"
              className="inline-flex items-center gap-2 px-8 py-4 bg-white text-pink-600 font-bold rounded-2xl hover:bg-white/90 transition-all"
            >
              <Rocket size={18} /> Candidater à un programme
            </a>
            <a
              href="/dashboard/incubateur/startups"
              className="inline-flex items-center gap-2 px-8 py-4 bg-white/10 backdrop-blur-sm border border-white/20 text-white font-semibold rounded-2xl hover:bg-white/20 transition-all"
            >
              <Search size={18} /> Explorer le portfolio
            </a>
            <a
              href="mailto:contact@sing.ga"
              className="inline-flex items-center gap-2 px-8 py-4 bg-white/10 backdrop-blur-sm border border-white/20 text-white font-semibold rounded-2xl hover:bg-white/20 transition-all"
            >
              <Mail size={18} /> Contacter la SING
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

// ═══════ MAIN PAGE ═══════

export default function IncubateurContent() {
  return (
    <>
      <HeroSection />
      <ProgrammesSection />
      <PortfolioSection />
      <SuccessStoriesSection />
      <PiliersSection />
      <MinilabSection />
      <GabonDigitalSection />
      <Sing300Section />
      <ImpactSection />
      <FAQSection />
      <CTASection />
    </>
  );
}
