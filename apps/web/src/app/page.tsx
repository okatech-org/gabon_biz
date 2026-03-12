'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import Image from 'next/image';
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';
import {
  Building2, FileText, Lightbulb, Rocket, TrendingUp,
  BarChart3, ArrowRight, ChevronDown, Users,
  Globe, Shield, Zap, Menu, X, Moon, Sun,
  CheckCircle, Star, Phone, MapPin, Clock, PlayCircle, MessageSquare,
} from 'lucide-react';
import { useState, useRef, useEffect } from 'react';
import { useTheme } from '@/lib/theme-provider';
import { useI18n } from '@/lib/i18n/i18nContext';
import { ServicesDropdown, MobileServicesDropdown, servicesItems } from '@/components/ServicesDropdown';

const LANGUAGES = [
  { code: 'fr', label: 'Français', flag: '🇫🇷' },
  { code: 'en', label: 'English', flag: '🇬🇧' },
  { code: 'es', label: 'Español', flag: '🇪🇸' },
  { code: 'ar', label: 'العربية', flag: '🇸🇦' },
  { code: 'zh', label: '中文', flag: '🇨🇳' },
  { code: 'ru', label: 'Русский', flag: '🇷🇺' },
  { code: 'ja', label: '日本語', flag: '🇯🇵' },
] as const;

/* ═══════════════════════════════════════════
   DATA
   ═══════════════════════════════════════════ */

const SERVICES = [
  { icon: Building2, id: 'gue', color: 'from-emerald-500 to-emerald-600', href: '/dashboard/entreprises', img: '/images/entrepreneur.png' },
  { icon: FileText, id: 'markets', color: 'from-blue-500 to-blue-600', href: '/dashboard/marches', img: '/images/hero-libreville.png' },
  { icon: Lightbulb, id: 'innovation', color: 'from-violet-500 to-violet-600', href: '/dashboard/innovation', img: '/images/innovation-hub.png' },
  { icon: Rocket, id: 'incubator', color: 'from-pink-500 to-pink-600', href: '/dashboard/incubateur', img: '/images/entrepreneur.png' },
  { icon: TrendingUp, id: 'invest', color: 'from-teal-500 to-teal-600', href: '/dashboard/investir', img: '/images/hero-libreville.png' },
  { icon: Zap, id: 'cgi', color: 'from-amber-500 to-amber-600', href: '/services/cgi', img: '/images/innovation-hub.png' },
];

const QUICK_LINKS = [
  { id: '1', icon: Building2, color: 'text-emerald-500', bg: 'bg-emerald-50 dark:bg-emerald-950/50' },
  { id: '2', icon: FileText, color: 'text-blue-500', bg: 'bg-blue-50 dark:bg-blue-950/50' },
  { id: '3', icon: Rocket, color: 'text-pink-500', bg: 'bg-pink-50 dark:bg-pink-950/50' },
  { id: '4', icon: Phone, color: 'text-amber-500', bg: 'bg-amber-50 dark:bg-amber-950/50' },
];

const BENEFITS = [
  { id: '1', icon: Clock },
  { id: '2', icon: Shield },
  { id: '3', icon: Users },
];

const TESTIMONIALS = [
  { id: '1' },
  { id: '2' },
  { id: '3' },
];

/* ═══════════════════════════════════════════
   ANIMATION VARIANTS
   ═══════════════════════════════════════════ */

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i: number) => ({
    opacity: 1, y: 0,
    transition: { duration: 0.6, delay: i * 0.1, ease: 'easeOut' as const },
  }),
};

const stagger = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1 } },
};

/* ═══════════════════════════════════════════
   COMPONENTS
   ═══════════════════════════════════════════ */

function ThemeToggle({ className = '' }: { className?: string }) {
  const { resolvedTheme, toggleTheme } = useTheme();

  return (
    <button
      onClick={toggleTheme}
      className={`p-2.5 rounded-xl transition-all duration-200
        bg-gray-100 hover:bg-gray-200 dark:bg-gray-800 dark:hover:bg-gray-700
        text-gray-600 dark:text-gray-300 ${className}`}
      aria-label={resolvedTheme === 'dark' ? 'Passer en mode clair' : 'Passer en mode sombre'}
    >
      {resolvedTheme === 'dark' ? <Sun size={18} /> : <Moon size={18} />}
    </button>
  );
}

function LanguageSelector() {
  const { lang, setLang } = useI18n();
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const selected = LANGUAGES.find(l => l.code === lang) || LANGUAGES[0];

  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClick);
    return () => document.removeEventListener('mousedown', handleClick);
  }, []);

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-1.5 px-3 py-2 rounded-xl text-sm font-medium
          bg-gray-100 hover:bg-gray-200 dark:bg-gray-800 dark:hover:bg-gray-700
          text-gray-700 dark:text-gray-300 transition-all duration-200"
        aria-label="Changer de langue"
      >
        <span className="text-base">{selected.flag}</span>
        <span className="hidden lg:inline">{selected.code.toUpperCase()}</span>
        <ChevronDown size={14} className={`transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`} />
      </button>

      {isOpen && (
        <div className="absolute right-0 top-full mt-2 w-48 py-2
          bg-white dark:bg-gray-900 rounded-xl
          border border-gray-100 dark:border-gray-800
          shadow-xl shadow-gray-200/50 dark:shadow-black/30
          z-50 overflow-hidden">
          {LANGUAGES.map((l) => (
            <button
              key={l.code}
              onClick={() => { setLang(l.code); setIsOpen(false); }}
              className={`w-full flex items-center gap-3 px-4 py-2.5 text-sm transition-colors
                ${lang === l.code
                  ? 'bg-emerald-50 dark:bg-emerald-950/50 text-emerald-700 dark:text-emerald-400 font-semibold'
                  : 'text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800'}`}
            >
              <span className="text-lg">{l.flag}</span>
              <span>{l.label}</span>
              {lang === l.code && <span className="ml-auto text-emerald-500">✓</span>}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

export function Navbar({ activeServiceSlug }: { activeServiceSlug?: string }) {
  const [open, setOpen] = useState(false);
  const { tr } = useI18n();
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();

  // Auto-detect active service from current path
  const currentServiceSlug = activeServiceSlug || servicesItems.find(s => pathname?.startsWith(`/services/${s.slug}`))?.slug;

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const showSubBar = scrolled || !!currentServiceSlug;

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300
      ${showSubBar ? 'bg-white/90 dark:bg-gray-950/90 backdrop-blur-xl border-b border-gray-200/50 dark:border-gray-800/50 shadow-sm' : 'bg-transparent py-2'}`}
    >
      <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-3 group">
          <div className="w-10 h-10 rounded-xl bg-linear-to-br from-emerald-500 to-emerald-600 flex items-center justify-center shadow-lg shadow-emerald-500/20 group-hover:shadow-emerald-500/40 transition-shadow">
            <span className="text-white font-bold text-lg">G</span>
          </div>
          <span className={`font-bold text-xl tracking-tight transition-colors ${showSubBar ? 'text-gray-900 dark:text-white' : 'text-white'}`}>
            GABON <span className="text-emerald-400">BIZ</span>
          </span>
        </Link>

        <div className="hidden md:flex items-center gap-6">
          <ServicesDropdown scrolled={showSubBar} activeSlug={currentServiceSlug} />
          <Link href="/annuaire" className={`text-sm font-medium transition-colors hover:text-emerald-500 ${showSubBar ? 'text-gray-600 dark:text-gray-300' : 'text-white/90'}`}>Annuaire</Link>
          <Link href="/#about" className={`text-sm font-medium transition-colors hover:text-emerald-500 ${showSubBar ? 'text-gray-600 dark:text-gray-300' : 'text-white/90'}`}>{tr('nav.about')}</Link>
          <Link href="/#contact" className={`text-sm font-medium transition-colors hover:text-emerald-500 ${showSubBar ? 'text-gray-600 dark:text-gray-300' : 'text-white/90'}`}>Contact</Link>
          
          <Link
            href="/demo"
            className="flex items-center gap-1.5 px-4 py-2 text-sm font-semibold text-white rounded-xl bg-linear-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 transition-all shadow-md shadow-amber-500/20 hover:shadow-amber-500/30 animate-pulse hover:animate-none"
          >
            <PlayCircle size={16} />
            Démo
          </Link>

          <Link
            href="/investir-numerique"
            className="flex items-center gap-1.5 px-4 py-2 text-sm font-semibold text-white rounded-xl bg-linear-to-r from-teal-500 to-emerald-500 hover:from-teal-600 hover:to-emerald-600 transition-all shadow-md shadow-teal-500/20 hover:shadow-teal-500/30"
          >
            <TrendingUp size={16} />
            Investir
          </Link>

          <div className="h-6 w-px bg-gray-200 dark:bg-gray-700 mx-2 hidden lg:block"></div>
          
          <LanguageSelector />
          <ThemeToggle />
          <Link
            href="/login"
            className="px-5 py-2.5 text-sm font-semibold text-white rounded-xl bg-linear-to-r from-emerald-500 to-emerald-600 hover:from-emerald-600 hover:to-emerald-700 transition-all shadow-lg shadow-emerald-500/20 hover:shadow-emerald-500/30"
          >
            {tr('nav.login')}
          </Link>
        </div>

        <button className="md:hidden p-2 text-gray-500 dark:text-gray-400" onClick={() => setOpen(!open)}>
          {open ? <X /> : <Menu />}
        </button>
      </div>

      {/* ═══════ SERVICE SUB-BAR ═══════ */}
      <AnimatePresence>
        {showSubBar && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.25 }}
            className="hidden md:block border-t border-gray-100/50 dark:border-white/5 bg-white/60 dark:bg-gray-950/60 backdrop-blur-md overflow-hidden"
          >
            <div className="max-w-7xl mx-auto px-6">
              <div className="flex items-center gap-1 py-1.5 overflow-x-auto scrollbar-hide">
                {servicesItems.map((item) => {
                  const Icon = item.icon;
                  const isActive = item.slug === currentServiceSlug;
                  return (
                    <Link
                      key={item.slug}
                      href={`/services/${item.slug}`}
                      className={`shrink-0 flex items-center gap-2 px-3.5 py-2 rounded-lg text-xs font-semibold transition-all no-underline ${item.color}
                        ${isActive
                          ? 'bg-gray-100 dark:bg-white/8'
                          : 'hover:bg-gray-50 dark:hover:bg-white/5 opacity-70 hover:opacity-100'
                        }`}
                    >
                      <Icon size={14} className={item.color} />
                      {tr(`services.dropdown.${item.key}`) || item.slug}
                    </Link>
                  );
                })}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="md:hidden bg-white dark:bg-gray-950 border-t border-gray-100 dark:border-gray-800 px-6 py-4 flex flex-col gap-3 max-h-[80vh] overflow-y-auto shadow-2xl absolute w-full left-0 right-0"
          >
            <MobileServicesDropdown closeMenu={() => setOpen(false)} />
            <Link href="/annuaire" onClick={() => setOpen(false)} className="text-sm font-medium text-gray-700 dark:text-gray-300 py-2 border-b border-gray-100 dark:border-gray-800">Annuaire</Link>
            <Link href="/#about" onClick={() => setOpen(false)} className="text-sm font-medium text-gray-700 dark:text-gray-300 py-2 border-b border-gray-100 dark:border-gray-800">{tr('nav.about')}</Link>
            <Link href="/#contact" onClick={() => setOpen(false)} className="text-sm font-medium text-gray-700 dark:text-gray-300 py-2 border-b border-gray-100 dark:border-gray-800">Contact</Link>
            <Link href="/demo" onClick={() => setOpen(false)} className="flex items-center gap-2 px-4 py-3 text-sm font-semibold text-white text-center rounded-xl bg-linear-to-r from-amber-500 to-orange-500 shadow-md mt-2">
              <PlayCircle size={16} />
              Essayer la démo
            </Link>
            <Link href="/investir-numerique" onClick={() => setOpen(false)} className="flex items-center gap-2 px-4 py-3 text-sm font-semibold text-white text-center rounded-xl bg-linear-to-r from-teal-500 to-emerald-500 shadow-md">
              <TrendingUp size={16} />
              Investir dans le Numérique
            </Link>
            <div className="flex gap-4 py-2 mt-2">
              <LanguageSelector />
              <ThemeToggle />
            </div>
            <Link href="/login" onClick={() => setOpen(false)} className="mt-4 px-5 py-3 text-sm font-semibold text-white text-center rounded-xl bg-linear-to-r from-emerald-500 to-emerald-600 shadow-md">
              {tr('nav.login')}
            </Link>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}

/* ═══════════════════════════════════════════
   SECTIONS
   ═══════════════════════════════════════════ */

function HeroSection() {
  const { tr } = useI18n();
  const { scrollY } = useScroll();
  const y = useTransform(scrollY, [0, 800], [0, 300]); // Parallax effect

  return (
    <section className="relative min-h-[90vh] flex items-center overflow-hidden pt-20">
      <motion.div style={{ y }} className="absolute inset-0 z-0">
        <Image src="/images/hero-libreville.png" alt="Libreville" fill priority className="object-cover" />
      </motion.div>
      <div className="absolute inset-0 z-0 bg-linear-to-b from-slate-900/80 via-slate-900/60 to-slate-900/90 dark:from-black/90 dark:via-black/70 dark:to-black/90" />

      <div className="relative z-10 max-w-7xl mx-auto px-6 w-full py-20 flex flex-col justify-center">
        <div className="max-w-3xl">
          <motion.div variants={fadeUp} custom={0} initial="hidden" animate="visible" className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 backdrop-blur-md border border-white/20 mb-8">
            <span className="text-sm">🇬🇦</span>
            <span className="text-sm font-medium text-emerald-300">{tr('hero.badge')}</span>
          </motion.div>

          <motion.h1 variants={fadeUp} custom={1} initial="hidden" animate="visible" className="text-3xl sm:text-4xl md:text-5xl lg:text-[3.5rem] xl:text-6xl font-extrabold text-white leading-[1.1] tracking-tight">
            <span className="text-transparent bg-clip-text bg-linear-to-r from-emerald-400 to-emerald-200">
              {tr('hero.title.l1') || tr('hero.title')}
            </span>
            {' '}
            {tr('hero.title.l2')}
          </motion.h1>

          <motion.p variants={fadeUp} custom={2} initial="hidden" animate="visible" className="mt-6 text-base md:text-lg lg:text-xl text-white/80 leading-relaxed max-w-2xl font-light">
            {tr('hero.desc')}
          </motion.p>

          <motion.div variants={fadeUp} custom={3} initial="hidden" animate="visible" className="mt-10 flex flex-wrap items-center gap-4">
            <Link href="/login" className="px-8 py-4 text-base font-semibold text-white rounded-2xl bg-emerald-600 hover:bg-emerald-500 transition-all shadow-xl shadow-emerald-500/30 flex items-center gap-2">
              {tr('hero.cta.primary')} <ArrowRight size={18} />
            </Link>
            <a href="#services" className="px-8 py-4 text-base font-semibold text-white rounded-2xl bg-white/10 hover:bg-white/20 backdrop-blur-md border border-white/10 transition-all flex items-center gap-2">
              <PlayCircle size={18} /> {tr('hero.cta.secondary')}
            </a>
            <Link href="/ai-portal" className="px-6 py-4 text-sm font-semibold text-amber-900 bg-amber-400 rounded-2xl hover:bg-amber-300 transition-all shadow-lg shadow-amber-500/20 flex items-center gap-2 animate-pulse">
              {tr('hero.cta.special')}
            </Link>
          </motion.div>
        </div>

        {/* 2x2 Glassmorphism Features */}
        <motion.div variants={stagger} initial="hidden" animate="visible" className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-20">
          {[1, 2, 3, 4].map((i) => (
            <motion.div key={i} variants={fadeUp} custom={i + 3} className="p-5 rounded-2xl bg-white/5 backdrop-blur-xl border border-white/10 hover:bg-white/10 transition-colors">
              <div className="w-10 h-10 rounded-lg bg-emerald-500/20 flex items-center justify-center mb-4">
                {i === 1 ? <Zap size={20} className="text-emerald-400" /> :
                 i === 2 ? <Globe size={20} className="text-emerald-400" /> :
                 i === 3 ? <Lightbulb size={20} className="text-emerald-400" /> :
                 <Users size={20} className="text-emerald-400" />}
              </div>
              <h3 className="text-white font-semibold mb-1">{tr(`hero.feat${i}.title`)}</h3>
              <p className="text-white/60 text-sm leading-relaxed">{tr(`hero.feat${i}.desc`)}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

function QuickLinksSection() {
  const { tr } = useI18n();
  return (
    <section className="py-12 bg-gray-50 dark:bg-gray-900 border-b border-gray-100 dark:border-gray-800">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex flex-col md:flex-row items-center justify-between mb-8">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white flex items-center gap-2">
            <Zap size={24} className="text-emerald-500" />
            {tr('ql.title') || "Accès Rapide"}
          </h2>
        </div>
        
        {/* Desktop Grid / Mobile Carousel */}
        <div className="flex overflow-x-auto pb-4 -mx-6 px-6 md:mx-0 md:px-0 md:grid md:grid-cols-4 gap-4 snap-x snap-mandatory hide-scrollbar">
          {QUICK_LINKS.map((ql) => (
            <motion.div key={ql.id} className="min-w-[280px] md:min-w-0 snap-start" whileHover={{ scale: 1.03 }} transition={{ type: "spring", stiffness: 300 }}>
              <Link href="#" className="flex items-start gap-4 p-5 bg-white dark:bg-gray-800 rounded-2xl border border-gray-100 dark:border-gray-700 shadow-sm hover:shadow-xl hover:border-emerald-200 dark:hover:border-emerald-800 transition-all group">
                <div className={`w-12 h-12 rounded-xl flex items-center justify-center shrink-0 ${ql.bg}`}>
                  <ql.icon size={24} className={ql.color} />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 dark:text-white group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors">
                    {tr(`ql.${ql.id}.title`)}
                  </h3>
                  <p className="text-sm text-gray-500 dark:text-gray-400 mt-1 line-clamp-1">{tr(`ql.${ql.id}.desc`)}</p>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

function ServicesSection() {
  const { tr } = useI18n();
  return (
    <section id="services" className="py-24 bg-white dark:bg-gray-950">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-50 dark:bg-emerald-950/50 text-emerald-600 dark:text-emerald-400 text-sm font-semibold mb-6">
            <BarChart3 size={16} /> {tr('services.badge') || "Nos Services"}
          </div>
          <h2 className="text-3xl md:text-5xl font-bold text-gray-900 dark:text-white tracking-tight">
            {tr('services.title') || tr('modules.title')}
          </h2>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {SERVICES.map((srv, i) => (
            <motion.div key={srv.id} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }} className="group">
              <Link href={srv.href} className="flex flex-col bg-gray-50 dark:bg-gray-900 rounded-3xl overflow-hidden border border-gray-100 dark:border-gray-800 hover:shadow-2xl transition-all duration-300 relative h-full">
                <div className="h-48 relative overflow-hidden bg-gray-200 dark:bg-gray-800">
                  <Image src={srv.img} alt={srv.id} fill className="object-cover transform group-hover:scale-105 transition-transform duration-700" />
                  <div className="absolute inset-0 bg-linear-to-t from-gray-900/60 to-transparent" />
                </div>
                
                <div className="px-6 pb-8 pt-0 flex-1 flex flex-col relative">
                  <div className={`w-16 h-16 rounded-2xl flex items-center justify-center bg-linear-to-br ${srv.color} text-white shadow-xl -mt-8 mb-4 relative z-10 border-4 border-gray-50 dark:border-gray-900`}>
                    <srv.icon size={28} />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2 group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors">
                    {tr(`module.${srv.id}.title`)}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400 leading-relaxed mb-6 flex-1">
                    {tr(`module.${srv.id}.desc`)}
                  </p>
                  <div className="inline-flex items-center gap-2 text-sm font-semibold text-emerald-600 dark:text-emerald-400 opacity-0 transform translate-y-2 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300">
                    {tr('services.btn') || "Explorer"} <ArrowRight size={16} />
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

function PresentationSection() {
  const { tr } = useI18n();
  return (
    <section id="about" className="py-24 bg-gray-50 dark:bg-gray-900 overflow-hidden relative">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <motion.div initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}>
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-50 dark:bg-emerald-950/50 text-emerald-600 dark:text-emerald-400 text-sm font-semibold mb-6">
              <Globe size={16} /> {tr('about.badge') || "Présentation"}
            </div>
            <h2 className="text-3xl md:text-5xl font-bold text-gray-900 dark:text-white tracking-tight mb-6">
              {tr('about.title')}
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-400 leading-relaxed mb-8">
              {tr('about.desc') || tr('about.desc1')}
            </p>
            
            <ul className="space-y-4 mb-10">
              {[1, 2, 3].map(i => (
                <li key={i} className="flex items-start gap-3">
                  <CheckCircle size={24} className="text-emerald-500 shrink-0 mt-1" />
                  <span className="text-gray-700 dark:text-gray-300 font-medium">{tr(`about.check${i}`)}</span>
                </li>
              ))}
            </ul>

            <Link href="/about" className="inline-flex items-center gap-2 px-8 py-4 bg-gray-900 dark:bg-white text-white dark:text-gray-900 rounded-2xl font-semibold hover:bg-gray-800 dark:hover:bg-gray-100 transition-colors">
              {tr('about.cta') || "En savoir plus"} <ArrowRight size={18} />
            </Link>
          </motion.div>

          <motion.div initial={{ opacity: 0, x: 30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} className="relative h-[600px] rounded-3xl overflow-hidden bg-gray-200 dark:bg-gray-800">
            <Image src="/images/entrepreneur.png" alt="Platform" fill className="object-cover" />
            <div className="absolute inset-0 bg-linear-to-tr from-emerald-900/60 to-transparent" />
            
            {/* Floating Card */}
            <div className="absolute bottom-8 left-8 right-8 bg-white/90 dark:bg-gray-900/90 backdrop-blur-xl p-6 rounded-2xl shadow-2xl border border-white/20 dark:border-gray-700/50">
              <div className="flex items-center gap-4">
                <div className="w-14 h-14 bg-emerald-100 dark:bg-emerald-900/50 rounded-xl flex items-center justify-center shrink-0">
                  <TrendingUp size={28} className="text-emerald-600 dark:text-emerald-400" />
                </div>
                <div>
                  <h4 className="text-2xl font-bold text-gray-900 dark:text-white">{tr('about.stat1')}</h4>
                  <p className="text-gray-500 dark:text-gray-400 font-medium">{tr('about.stat1.label')}</p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

function BenefitsSection() {
  const { tr } = useI18n();
  return (
    <section className="py-24 bg-white dark:bg-gray-950">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-50 dark:bg-emerald-950/50 text-emerald-600 dark:text-emerald-400 text-sm font-semibold mb-6">
            <Shield size={16} /> {tr('benefits.badge') || "Avantages"}
          </div>
          <h2 className="text-3xl md:text-5xl font-bold text-gray-900 dark:text-white tracking-tight">
            {tr('benefits.title') || "Pourquoi nous choisir ?"}
          </h2>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {BENEFITS.map((b, i) => (
            <motion.div key={b.id} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.15 }}>
              <div className="h-full p-8 rounded-3xl bg-linear-to-br from-gray-50 to-white dark:from-gray-900 dark:to-gray-950 border border-gray-100 dark:border-gray-800 shadow-sm hover:shadow-xl transition-all">
                <div className="w-16 h-16 rounded-2xl bg-emerald-100 dark:bg-emerald-900/50 flex flex-col items-center justify-center mb-6 text-emerald-600 dark:text-emerald-400">
                  <b.icon size={32} />
                </div>
                <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">{tr(`benefits.${b.id}.title`)}</h3>
                <p className="text-gray-600 dark:text-gray-400 leading-relaxed mb-6">{tr(`benefits.${b.id}.desc`)}</p>
                <div className="inline-flex px-4 py-2 bg-emerald-50 dark:bg-emerald-950/50 rounded-lg text-emerald-700 dark:text-emerald-300 font-bold text-lg">
                  {tr(`benefits.${b.id}.stat`)}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

function TestimonialsSection() {
  const { tr } = useI18n();
  return (
    <section className="py-24 bg-gray-50 dark:bg-gray-900 border-y border-gray-100 dark:border-gray-800">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-blue-50 dark:bg-blue-950/50 text-blue-600 dark:text-blue-400 text-sm font-semibold mb-6">
            <MessageSquare size={16} /> {tr('testi.badge') || "Témoignages"}
          </div>
          <h2 className="text-3xl md:text-5xl font-bold text-gray-900 dark:text-white tracking-tight">
            {tr('testi.title') || "Ils ont transformé leur entreprise"}
          </h2>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {TESTIMONIALS.map((t, i) => (
            <motion.div key={t.id} initial={{ opacity: 0, scale: 0.95 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }}>
              <div className="p-8 rounded-3xl bg-white dark:bg-gray-950 border border-gray-100 dark:border-gray-800 shadow-sm relative h-full flex flex-col">
                <div className="flex text-amber-400 mb-6">
                  {[1,2,3,4,5].map(s => <Star key={s} size={18} fill="currentColor" />)}
                </div>
                <p className="text-lg text-gray-700 dark:text-gray-300 italic mb-8 flex-1">
                  &quot;{tr(`testi.${t.id}.quote`)}&quot;
                </p>
                <div className="flex items-center gap-4 mt-auto">
                  <div className="w-12 h-12 rounded-full bg-linear-to-tr from-emerald-500 to-blue-500 flex items-center justify-center text-white font-bold text-xl">
                    {tr(`testi.${t.id}.name`)?.charAt(0) || "U"}
                  </div>
                  <div>
                    <h4 className="font-bold text-gray-900 dark:text-white">{tr(`testi.${t.id}.name`)}</h4>
                    <span className="text-sm text-gray-500 dark:text-gray-400">{tr(`testi.${t.id}.role`)}</span>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

function CTAFinalSection() {
  const { tr } = useI18n();
  return (
    <section className="py-24 bg-white dark:bg-gray-950">
      <div className="max-w-5xl mx-auto px-6">
        <div className="rounded-[40px] bg-linear-to-r from-emerald-600 to-teal-700 overflow-hidden relative shadow-2xl">
          <div className="absolute inset-0 bg-[url('/images/hero-libreville.png')] mix-blend-overlay opacity-20 bg-cover bg-center" />
          
          <div className="grid md:grid-cols-2 p-12 lg:p-16 items-center relative z-10 gap-12">
            <div>
              <h2 className="text-3xl lg:text-5xl font-extrabold text-white mb-8 leading-tight">
                {tr('ctafinal.title')}
              </h2>
              <ul className="space-y-4 mb-10">
                {[1, 2, 3].map(i => (
                  <li key={i} className="flex items-center gap-3 text-white/90 font-medium">
                    <CheckCircle size={20} className="text-emerald-300" />
                    {tr(`ctafinal.check${i}`)}
                  </li>
                ))}
              </ul>
              <Link href="/login" className="inline-flex items-center gap-2 px-8 py-4 bg-white text-emerald-700 rounded-2xl font-bold text-lg hover:bg-gray-50 transition-colors shadow-xl">
                {tr('ctafinal.btn')} <ArrowRight size={20} />
              </Link>
            </div>
            
            <div className="hidden md:block">
              {/* Decorative Geometric Element */}
              <div className="w-full aspect-square rounded-full border-8 border-white/10 flex items-center justify-center">
                <div className="w-2/3 aspect-square rounded-full border-8 border-white/20 flex items-center justify-center">
                  <div className="w-1/2 aspect-square rounded-full bg-white/30 backdrop-blur-md flex items-center justify-center">
                    <Zap size={48} className="text-white" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export function PreFooter() {
  const { tr } = useI18n();
  return (
    <div className="bg-gray-900 border-b border-gray-800 py-12">
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-3 gap-8 text-center md:text-left">
        <div className="flex flex-col items-center md:items-start">
          <MapPin size={24} className="text-emerald-500 mb-4" />
          <h4 className="text-white font-semibold mb-2">Adresse</h4>
          <p className="text-gray-400">{tr('contact.address')}</p>
        </div>
        <div className="flex flex-col items-center md:items-start">
          <Phone size={24} className="text-emerald-500 mb-4" />
          <h4 className="text-white font-semibold mb-2">Téléphone</h4>
          <p className="text-gray-400">{tr('contact.phone')}</p>
        </div>
        <div className="flex flex-col items-center md:items-start">
          <Clock size={24} className="text-emerald-500 mb-4" />
          <h4 className="text-white font-semibold mb-2">Horaires</h4>
          <p className="text-gray-400">{tr('contact.hours')}</p>
        </div>
      </div>
    </div>
  );
}

export function Footer() {
  const { tr } = useI18n();
  return (
    <footer className="bg-gray-950 pt-16 pb-8">
      <PreFooter />
      <div className="max-w-7xl mx-auto px-6 mt-16">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6 mb-8">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-linear-to-br from-emerald-500 to-emerald-600 flex items-center justify-center">
              <span className="text-white font-bold text-sm">G</span>
            </div>
            <span className="font-bold text-white text-lg">
              GABON <span className="text-emerald-400">BIZ</span>
            </span>
          </div>
          <div className="flex gap-6 flex-wrap">
            <Link href="#" className="text-gray-400 hover:text-white transition-colors">Termes</Link>
            <Link href="#" className="text-gray-400 hover:text-white transition-colors">Confidentialité</Link>
            <Link href="#" className="text-gray-400 hover:text-white transition-colors">Cookies</Link>
            <Link href="/investir-numerique" className="text-teal-400 hover:text-teal-300 transition-colors font-medium">Investir dans le Numérique</Link>
          </div>
        </div>
        <div className="text-center md:text-left border-t border-gray-800 pt-8 mt-8">
          <p className="text-sm text-gray-500 ">{tr('footer.desc')}</p>
          <p className="mt-2 text-xs text-gray-600">© 2026 République Gabonaise. {tr('footer.rights')}</p>
        </div>
      </div>
    </footer>
  );
}

/* ═══════════════════════════════════════════
   INVEST BANNER
   ═══════════════════════════════════════════ */

function InvestBannerSection() {
  return (
    <section className="py-16 bg-white dark:bg-gray-950">
      <div className="max-w-6xl mx-auto px-6">
        <div className="rounded-3xl bg-linear-to-r from-teal-600 via-emerald-500 to-green-600 p-10 md:p-14 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-80 h-80 bg-white/5 rounded-full -translate-y-1/2 translate-x-1/3 blur-3xl" />
          <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-8">
            <div className="flex-1">
              <h2 className="text-2xl md:text-3xl font-extrabold text-white mb-3">
                Investissez dans l&apos;Économie Numérique du Gabon
              </h2>
              <p className="text-white/80 text-base max-w-xl">
                Découvrez les 6 verticales de croissance, les données macroéconomiques BAD et le premier deal VC historique.
              </p>
            </div>
            <Link
              href="/investir-numerique"
              className="px-8 py-4 bg-white text-teal-700 rounded-2xl font-bold text-sm hover:bg-gray-100 transition-all shadow-xl shrink-0 flex items-center gap-2 no-underline"
            >
              Explorer les opportunités <ArrowRight size={18} />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════
   PAGE
   ═══════════════════════════════════════════ */

export default function HomePage() {
  return (
    <div className="bg-white dark:bg-gray-950 font-sans selection:bg-emerald-500/30">
      <Navbar />
      <main>
        <HeroSection />
        <QuickLinksSection />
        <ServicesSection />
        <PresentationSection />
        <BenefitsSection />
        <TestimonialsSection />
        <CTAFinalSection />
        <InvestBannerSection />
      </main>
      <Footer />
    </div>
  );
}
