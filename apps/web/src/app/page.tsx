'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import Image from 'next/image';
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';
import {
  Building2, FileText, Lightbulb, Rocket, TrendingUp,
  BarChart3, ArrowRight, Users,
  Globe, Shield, Zap, Menu, X, Moon, Sun,
  CheckCircle, Phone, Clock, PlayCircle,
} from 'lucide-react';
import { useState, useRef, useEffect } from 'react';
import { useTheme } from '@/lib/theme-provider';
import { useI18n } from '@/lib/i18n/i18nContext';
import { servicesItems } from '@/components/ServicesDropdown';

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
      className={`p-2.5 rounded-full transition-all duration-200
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
        className="p-2.5 rounded-full text-sm font-medium
          bg-gray-100 hover:bg-gray-200 dark:bg-gray-800 dark:hover:bg-gray-700
          text-gray-600 dark:text-gray-300 transition-all duration-200"
        aria-label="Changer de langue"
      >
        <Globe size={18} />
      </button>

      {isOpen && (
        <div className="absolute right-0 top-full mt-2 w-48 py-2
          bg-white dark:bg-gray-900 rounded-xl
          border border-gray-200 dark:border-gray-800
         
          z-50 overflow-hidden">
          {LANGUAGES.map((l) => (
            <button
              key={l.code}
              onClick={() => { setLang(l.code); setIsOpen(false); }}
              className={`w-full flex items-center gap-3 px-4 py-2.5 text-sm transition-colors
                ${lang === l.code
                  ? 'bg-emerald-50 dark:bg-emerald-950/50 text-emerald-700 dark:text-emerald-400 font-semibold'
                  : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800'}`}
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
    <>
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300
      ${showSubBar ? 'bg-white/95 dark:bg-gray-950/90 backdrop-blur-xl border-b border-gray-300 dark:border-gray-800/50' : 'bg-transparent py-2'}`}
    >
      <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-3 group">
          <div className="w-10 h-10 rounded-xl bg-linear-to-br from-emerald-500 to-emerald-600 flex items-center justify-center">
            <span className="text-white font-bold text-lg">G</span>
          </div>
          <span className={`font-bold text-xl tracking-tight transition-colors ${showSubBar ? 'text-gray-900 dark:text-white' : 'text-white'}`}>
            GABON <span className="text-emerald-400">BIZ</span>
          </span>
        </Link>

        <div className="hidden md:flex items-center gap-6">
          <Link
            href="/annuaire"
            className="flex items-center gap-1.5 px-4 py-2 text-sm font-semibold text-white rounded-xl bg-linear-to-r from-blue-500 to-indigo-500 hover:from-blue-600 hover:to-indigo-600 transition-all"
          >
            <Building2 size={16} />
            Annuaire d&apos;entreprises
          </Link>
          
          <Link
            href="/demo"
            className="flex items-center gap-1.5 px-4 py-2 text-sm font-semibold text-white rounded-xl bg-linear-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 transition-all animate-pulse hover:animate-none"
          >
            <PlayCircle size={16} />
            Démo
          </Link>

          <Link
            href="/investir-numerique"
            className="flex items-center gap-1.5 px-4 py-2 text-sm font-semibold text-white rounded-xl bg-linear-to-r from-teal-500 to-emerald-500 hover:from-teal-600 hover:to-emerald-600 transition-all"
          >
            <TrendingUp size={16} />
            Investir
          </Link>

          <div className="h-6 w-px bg-gray-200 dark:bg-gray-700 mx-2 hidden lg:block"></div>
          
          <LanguageSelector />
          <ThemeToggle />
          <Link
            href="/login"
            className="px-5 py-2.5 text-sm font-semibold text-white rounded-xl bg-linear-to-r from-emerald-500 to-emerald-600 hover:from-emerald-600 hover:to-emerald-700 transition-all"
          >
            {tr('nav.login')}
          </Link>
        </div>

        <div className="md:hidden flex items-center gap-2">
          <Link
            href="/demo"
            className="flex items-center gap-1 px-2.5 py-1.5 text-[11px] font-bold text-amber-900 rounded-lg bg-amber-400 hover:bg-amber-300 transition-all animate-pulse no-underline"
          >
            <PlayCircle size={13} />
            Démo
          </Link>
          <LanguageSelector />
          <ThemeToggle />
          <button className="p-2 text-gray-500 dark:text-gray-400" onClick={() => setOpen(!open)}>
            {open ? <X /> : <Menu />}
          </button>
        </div>
      </div>

      {/* ═══════ SERVICE SUB-BAR (always visible) ═══════ */}
      <div
        className={`hidden md:block border-t transition-colors duration-300 ${
          showSubBar
            ? 'border-gray-100/50 dark:border-white/5 bg-white/60 dark:bg-gray-950/60 backdrop-blur-md'
            : 'border-white/10 bg-white/5 backdrop-blur-md'
        }`}
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
                  className={`shrink-0 flex items-center gap-2 px-3.5 py-2 rounded-lg text-xs font-semibold transition-all no-underline
                    ${isActive
                      ? showSubBar
                        ? `bg-gray-100 dark:bg-white/8 ${item.color}`
                        : `bg-white/15 text-white`
                      : showSubBar
                        ? `${item.color} hover:bg-gray-100 dark:hover:bg-white/5 opacity-70 hover:opacity-100`
                        : 'text-white/70 hover:text-white hover:bg-white/10'
                    }`}
                >
                  <Icon size={14} className={showSubBar ? item.color : isActive ? 'text-white' : 'text-white/70'} />
                  {tr(`services.dropdown.${item.key}`) || item.slug}
                </Link>
              );
            })}
          </div>
        </div>
      </div>

      {/* ═══════ MOBILE SERVICE SUB-BAR (horizontal scroll) ═══════ */}
      {!open && (
        <div
          className={`md:hidden border-t transition-colors duration-300 overflow-x-auto hide-scrollbar ${
            showSubBar
              ? 'border-gray-100/50 dark:border-white/5 bg-white/80 dark:bg-gray-950/80 backdrop-blur-md'
              : 'border-white/10 bg-white/5 backdrop-blur-md'
          }`}
        >
          <div className="flex items-center gap-1 px-4 py-1.5 w-max">
            {servicesItems.map((item) => {
              const Icon = item.icon;
              const isActive = item.slug === currentServiceSlug;
              return (
                <Link
                  key={item.slug}
                  href={`/services/${item.slug}`}
                  className={`shrink-0 flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-[11px] font-semibold transition-all no-underline
                    ${isActive
                      ? showSubBar
                        ? `bg-gray-100 dark:bg-white/8 ${item.color}`
                        : 'bg-white/15 text-white'
                      : showSubBar
                        ? `${item.color} hover:bg-gray-100 dark:hover:bg-white/5 opacity-70 hover:opacity-100`
                        : 'text-white/70 hover:text-white hover:bg-white/10'
                    }`}
                >
                  <Icon size={12} className={showSubBar ? item.color : isActive ? 'text-white' : 'text-white/70'} />
                  {tr(`services.dropdown.${item.key}`) || item.slug}
                </Link>
              );
            })}
          </div>
        </div>
      )}
    </nav>

    {/* ═══════ MOBILE MENU DROPDOWN — rendered outside <nav> to avoid backdrop-blur stacking context ═══════ */}
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.25, ease: 'easeOut' }}
          className="md:hidden fixed inset-x-0 top-[80px] bottom-0 bg-white dark:bg-gray-950 z-50 overflow-y-auto"
        >
          <div className="px-5 py-5 flex flex-col gap-5">

            {/* ── Section: Nos Services (2-col grid) ── */}
            <div>
              <p className="text-[10px] font-bold uppercase tracking-widest text-gray-400 dark:text-gray-500 mb-3 px-1">Nos Services</p>
              <div className="grid grid-cols-3 gap-2">
                {servicesItems.map(item => {
                  const Icon = item.icon;
                  return (
                    <Link
                      key={item.slug}
                      href={`/services/${item.slug}`}
                      onClick={() => setOpen(false)}
                      className="flex flex-col items-center gap-1.5 p-3 rounded-2xl bg-gray-100 dark:bg-gray-900 border border-gray-200 dark:border-gray-800 hover:border-gray-200 dark:hover:border-gray-700 transition-all active:scale-95 no-underline"
                    >
                      <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${item.bg}`}>
                        <Icon size={20} className={item.color} />
                      </div>
                      <span className="text-[11px] font-semibold text-gray-700 dark:text-gray-300 text-center leading-tight">
                        {tr(`services.dropdown.${item.key}`) || item.slug}
                      </span>
                    </Link>
                  );
                })}
              </div>
            </div>

            {/* ── Section: Actions rapides ── */}
            <div>
              <p className="text-[10px] font-bold uppercase tracking-widest text-gray-400 dark:text-gray-500 mb-3 px-1">Actions rapides</p>
              <div className="flex flex-col gap-2">
                <Link
                  href="/annuaire"
                  onClick={() => setOpen(false)}
                  className="flex items-center gap-3 px-4 py-3 rounded-xl bg-blue-50 dark:bg-blue-950/30 border border-blue-100 dark:border-blue-900/50 no-underline active:scale-[0.98] transition-all"
                >
                  <div className="w-9 h-9 rounded-lg bg-blue-500 flex items-center justify-center shrink-0">
                    <Building2 size={18} className="text-white" />
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-gray-900 dark:text-white m-0">Annuaire d&apos;entreprises</p>
                    <p className="text-[11px] text-gray-500 dark:text-gray-400 m-0">Trouvez une entreprise</p>
                  </div>
                </Link>
              </div>
            </div>

            {/* ── Footer: Login ── */}
            <div className="mt-auto pt-3 border-t border-gray-200 dark:border-gray-800 flex items-center">
              <Link
                href="/login"
                onClick={() => setOpen(false)}
                className="w-full px-5 py-2.5 text-sm font-semibold text-white text-center rounded-xl bg-linear-to-r from-emerald-500 to-emerald-600 no-underline active:scale-[0.98] transition-all"
              >
                {tr('nav.login')}
              </Link>
            </div>

          </div>
        </motion.div>
      )}
    </AnimatePresence>
    </>
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
    <section className="relative min-h-[75vh] sm:min-h-[85vh] md:min-h-[90vh] flex items-center overflow-hidden pt-28 md:pt-20">
      <motion.div style={{ y }} className="absolute inset-0 z-0">
        <Image src="/images/hero-libreville.png" alt="Libreville" fill priority loading="eager" sizes="100vw" className="object-cover" />
      </motion.div>
      <div className="absolute inset-0 z-0 bg-linear-to-b from-slate-900/80 via-slate-900/60 to-slate-900/90 dark:from-black/90 dark:via-black/70 dark:to-black/90" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 w-full py-8 sm:py-16 md:py-20 flex flex-col justify-center">
        <div className="max-w-3xl">
          <motion.div variants={fadeUp} custom={0} initial="hidden" animate="visible" className="inline-flex items-center gap-2 px-3 sm:px-4 py-1.5 sm:py-2 rounded-full bg-white/10 backdrop-blur-md border border-white/20 mb-4 sm:mb-8">
            <span className="text-sm">🇬🇦</span>
            <span className="text-xs sm:text-sm font-medium text-emerald-300">{tr('hero.badge')}</span>
          </motion.div>

          <motion.h1 variants={fadeUp} custom={1} initial="hidden" animate="visible" className="text-xl sm:text-3xl md:text-5xl lg:text-[3.5rem] xl:text-6xl font-extrabold text-white leading-[1.1] tracking-tight">
            <span className="text-transparent bg-clip-text bg-linear-to-r from-emerald-400 to-emerald-200">
              {tr('hero.title.l1') || tr('hero.title')}
            </span>
            {' '}
            {tr('hero.title.l2')}
          </motion.h1>

          <motion.p variants={fadeUp} custom={2} initial="hidden" animate="visible" className="mt-3 sm:mt-6 text-sm sm:text-base md:text-lg lg:text-xl text-white/80 leading-relaxed max-w-2xl font-light">
            {tr('hero.desc')}
          </motion.p>

          <motion.div variants={fadeUp} custom={3} initial="hidden" animate="visible" className="mt-5 sm:mt-10 flex flex-row flex-wrap items-center gap-2 sm:gap-4">
            <Link href="/login" className="px-4 sm:px-8 py-2.5 sm:py-4 text-xs sm:text-base font-semibold text-white rounded-xl sm:rounded-2xl bg-emerald-600 hover:bg-emerald-500 transition-all flex items-center justify-center gap-1.5 sm:gap-2">
              {tr('hero.cta.primary')} <ArrowRight size={16} className="sm:w-[18px] sm:h-[18px]" />
            </Link>
            <a href="#services" className="px-4 sm:px-8 py-2.5 sm:py-4 text-xs sm:text-base font-semibold text-white rounded-xl sm:rounded-2xl bg-white/10 hover:bg-white/20 backdrop-blur-md border border-white/10 transition-all flex items-center justify-center gap-1.5 sm:gap-2">
              <PlayCircle size={16} className="sm:w-[18px] sm:h-[18px]" /> {tr('hero.cta.secondary')}
            </a>
            <button onClick={() => window.dispatchEvent(new CustomEvent('iasted:open'))} className="px-4 sm:px-6 py-2.5 sm:py-4 text-xs sm:text-sm font-semibold text-amber-900 bg-amber-400 rounded-xl sm:rounded-2xl hover:bg-amber-300 transition-all flex items-center justify-center gap-1.5 sm:gap-2 animate-pulse cursor-pointer">
              {tr('hero.cta.special')}
            </button>
          </motion.div>
        </div>

        {/* 2x2 Glassmorphism Features */}
        <motion.div variants={stagger} initial="hidden" animate="visible" className="grid grid-cols-2 md:grid-cols-4 gap-2 sm:gap-4 mt-6 sm:mt-16 md:mt-20">
          {[1, 2, 3, 4].map((i) => (
            <motion.div key={i} variants={fadeUp} custom={i + 3} className="p-2.5 sm:p-5 rounded-xl sm:rounded-2xl bg-white/5 backdrop-blur-xl border border-white/10 hover:bg-white/10 transition-colors">
              <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-lg bg-emerald-500/20 flex items-center justify-center mb-2 sm:mb-4">
                {i === 1 ? <Zap size={20} className="text-emerald-400" /> :
                 i === 2 ? <Globe size={20} className="text-emerald-400" /> :
                 i === 3 ? <Lightbulb size={20} className="text-emerald-400" /> :
                 <Users size={20} className="text-emerald-400" />}
              </div>
              <h3 className="text-white font-semibold text-sm sm:text-base mb-1">{tr(`hero.feat${i}.title`)}</h3>
              <p className="text-white/60 text-xs sm:text-sm leading-relaxed">{tr(`hero.feat${i}.desc`)}</p>
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
    <section className="py-6 sm:py-12 bg-gray-100 dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="flex flex-col md:flex-row items-center justify-between mb-8">
          <h2 className="text-base sm:text-2xl font-bold text-gray-900 dark:text-white flex items-center gap-2">
            <Zap size={24} className="text-emerald-500" />
            {tr('ql.title') || "Accès Rapide"}
          </h2>
        </div>
        
        {/* Desktop Grid / Mobile Carousel */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4">
          {QUICK_LINKS.map((ql) => (
            <motion.div key={ql.id} whileHover={{ scale: 1.03 }} transition={{ type: "spring", stiffness: 300 }}>
              <Link href="#" className="flex flex-col items-center text-center sm:flex-row sm:items-start sm:text-left gap-2 sm:gap-4 p-3 sm:p-5 bg-white dark:bg-gray-800 rounded-2xl border border-gray-200 dark:border-gray-700 hover:border-emerald-300 dark:hover:border-emerald-800 transition-all group h-full">
                <div className={`w-10 h-10 sm:w-12 sm:h-12 rounded-xl flex items-center justify-center shrink-0 ${ql.bg}`}>
                  <ql.icon size={20} className={`sm:w-6 sm:h-6 ${ql.color}`} />
                </div>
                <div className="min-w-0">
                  <h3 className="text-xs sm:text-base font-semibold text-gray-900 dark:text-white group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors leading-tight">
                    {tr(`ql.${ql.id}.title`)}
                  </h3>
                  <p className="text-[10px] sm:text-sm text-gray-500 dark:text-gray-400 mt-0.5 sm:mt-1">{tr(`ql.${ql.id}.desc`)}</p>
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
    <section id="services" className="py-10 sm:py-24 bg-white dark:bg-gray-950">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="text-center mb-6 sm:mb-16">
          <div className="inline-flex items-center gap-1.5 sm:gap-2 px-2.5 sm:px-3 py-1 sm:py-1.5 rounded-full bg-emerald-50 dark:bg-emerald-950/50 text-emerald-600 dark:text-emerald-400 text-[10px] sm:text-sm font-semibold mb-3 sm:mb-6">
            <BarChart3 size={16} /> {tr('services.badge') || "Nos Services"}
          </div>
          <h2 className="text-lg sm:text-3xl md:text-5xl font-bold text-gray-900 dark:text-white tracking-tight">
            {tr('services.title') || tr('modules.title')}
          </h2>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-8">
          {SERVICES.map((srv, i) => (
            <motion.div key={srv.id} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }} className="group">
              <Link href={srv.href} className="flex flex-col bg-gray-100 dark:bg-gray-900 rounded-2xl sm:rounded-3xl overflow-hidden border border-gray-200 dark:border-gray-800 transition-all duration-300 relative h-full">
                <div className="h-24 sm:h-48 relative overflow-hidden bg-gray-200 dark:bg-gray-800">
                  <Image src={srv.img} alt={srv.id} fill sizes="(max-width: 768px) 50vw, 33vw" className="object-cover transform group-hover:scale-105 transition-transform duration-700" />
                  <div className="absolute inset-0 bg-linear-to-t from-gray-900/60 to-transparent" />
                </div>
                
                <div className="px-3 sm:px-6 pb-3 sm:pb-8 pt-0 flex-1 flex flex-col relative">
                  <div className={`w-10 h-10 sm:w-16 sm:h-16 rounded-xl sm:rounded-2xl flex items-center justify-center bg-linear-to-br ${srv.color} text-white -mt-5 sm:-mt-8 mb-2 sm:mb-4 relative z-10 border-2 sm:border-4 border-gray-200 dark:border-gray-900`}>
                    <srv.icon size={18} className="sm:w-7 sm:h-7" />
                  </div>
                  <h3 className="text-xs sm:text-xl font-bold text-gray-900 dark:text-white mb-0.5 sm:mb-2 group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors leading-tight">
                    {tr(`module.${srv.id}.title`)}
                  </h3>
                  <p className="text-[10px] sm:text-base text-gray-600 dark:text-gray-400 leading-snug sm:leading-relaxed mb-1.5 sm:mb-6 flex-1 line-clamp-2 sm:line-clamp-none">
                    {tr(`module.${srv.id}.desc`)}
                  </p>
                  <div className="inline-flex items-center gap-1 sm:gap-2 text-[10px] sm:text-sm font-semibold text-emerald-600 dark:text-emerald-400 sm:opacity-0 sm:translate-y-2 sm:group-hover:opacity-100 sm:group-hover:translate-y-0 transition-all duration-300">
                    {tr('services.btn') || "Explorer"} <ArrowRight size={12} className="sm:w-4 sm:h-4" />
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
    <section id="about" className="py-10 sm:py-24 bg-gray-100 dark:bg-gray-900 overflow-hidden relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="grid lg:grid-cols-2 gap-6 sm:gap-16 items-center">
          <motion.div initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} className="text-center lg:text-left">
            <div className="inline-flex items-center gap-1.5 sm:gap-2 px-2.5 sm:px-3 py-1 sm:py-1.5 rounded-full bg-emerald-50 dark:bg-emerald-950/50 text-emerald-600 dark:text-emerald-400 text-[10px] sm:text-sm font-semibold mb-3 sm:mb-6">
              <Globe size={12} className="sm:w-4 sm:h-4" /> {tr('about.badge') || "Présentation"}
            </div>
            <h2 className="text-lg sm:text-3xl md:text-5xl font-bold text-gray-900 dark:text-white tracking-tight mb-2 sm:mb-6">
              {tr('about.title')}
            </h2>
            <p className="text-xs sm:text-lg text-gray-600 dark:text-gray-400 leading-relaxed mb-3 sm:mb-8">
              {tr('about.desc') || tr('about.desc1')}
            </p>
            
            <ul className="space-y-1.5 sm:space-y-4 mb-4 sm:mb-10 inline-block text-left">
              {[1, 2, 3].map(i => (
                <li key={i} className="flex items-start gap-1.5 sm:gap-3">
                  <CheckCircle size={14} className="text-emerald-500 shrink-0 mt-0.5 sm:w-6 sm:h-6 sm:mt-1" />
                  <span className="text-[11px] sm:text-base text-gray-700 dark:text-gray-300 font-medium">{tr(`about.check${i}`)}</span>
                </li>
              ))}
            </ul>

            <div>
              <Link href="/about" className="inline-flex items-center gap-1.5 sm:gap-2 px-4 sm:px-8 py-2.5 sm:py-4 bg-gray-900 dark:bg-white text-white dark:text-gray-900 rounded-xl sm:rounded-2xl font-semibold text-xs sm:text-base hover:bg-gray-800 dark:hover:bg-gray-100 transition-colors">
                {tr('about.cta') || "En savoir plus"} <ArrowRight size={14} className="sm:w-[18px] sm:h-[18px]" />
              </Link>
            </div>
          </motion.div>

          <motion.div initial={{ opacity: 0, x: 30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} className="relative h-[200px] sm:h-[400px] lg:h-[600px] rounded-2xl sm:rounded-3xl overflow-hidden bg-gray-200 dark:bg-gray-800">
            <Image src="/images/entrepreneur.png" alt="Platform" fill sizes="(max-width: 1024px) 100vw, 50vw" className="object-cover" />
            <div className="absolute inset-0 bg-linear-to-tr from-emerald-900/60 to-transparent" />
            
            {/* Floating Card */}
            <div className="absolute bottom-3 left-3 right-3 sm:bottom-8 sm:left-8 sm:right-8 bg-white/90 dark:bg-gray-900/90 backdrop-blur-xl p-3 sm:p-6 rounded-xl sm:rounded-2xl border border-gray-200 dark:border-gray-700/50">
              <div className="flex items-center gap-2.5 sm:gap-4">
                <div className="w-9 h-9 sm:w-14 sm:h-14 bg-emerald-100 dark:bg-emerald-900/50 rounded-lg sm:rounded-xl flex items-center justify-center shrink-0">
                  <TrendingUp size={18} className="text-emerald-600 dark:text-emerald-400 sm:w-7 sm:h-7" />
                </div>
                <div>
                  <h4 className="text-sm sm:text-2xl font-bold text-gray-900 dark:text-white">{tr('about.stat1')}</h4>
                  <p className="text-[10px] sm:text-base text-gray-500 dark:text-gray-400 font-medium">{tr('about.stat1.label')}</p>
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
    <section className="py-10 sm:py-24 bg-white dark:bg-gray-950">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="text-center mb-6 sm:mb-16">
          <div className="inline-flex items-center gap-1.5 sm:gap-2 px-2.5 sm:px-3 py-1 sm:py-1.5 rounded-full bg-emerald-50 dark:bg-emerald-950/50 text-emerald-600 dark:text-emerald-400 text-[10px] sm:text-sm font-semibold mb-3 sm:mb-6">
            <Shield size={16} /> {tr('benefits.badge') || "Avantages"}
          </div>
          <h2 className="text-lg sm:text-3xl md:text-5xl font-bold text-gray-900 dark:text-white tracking-tight">
            {tr('benefits.title') || "Pourquoi nous choisir ?"}
          </h2>
        </div>

        <div className="grid grid-cols-3 gap-2 sm:gap-8">
          {BENEFITS.map((b, i) => (
            <motion.div key={b.id} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.15 }}>
              <div className="h-full p-3 sm:p-8 rounded-2xl sm:rounded-3xl bg-linear-to-br from-gray-100 to-white dark:from-gray-900 dark:to-gray-950 border border-gray-200 dark:border-gray-800 transition-all flex flex-col items-center text-center sm:items-start sm:text-left">
                <div className="w-9 h-9 sm:w-16 sm:h-16 rounded-xl sm:rounded-2xl bg-emerald-100 dark:bg-emerald-900/50 flex flex-col items-center justify-center mb-2 sm:mb-6 text-emerald-600 dark:text-emerald-400">
                  <b.icon size={18} className="sm:w-8 sm:h-8" />
                </div>
                <h3 className="text-[11px] sm:text-2xl font-bold text-gray-900 dark:text-white mb-1 sm:mb-4 leading-tight">{tr(`benefits.${b.id}.title`)}</h3>
                <p className="text-[9px] sm:text-base text-gray-600 dark:text-gray-400 leading-snug sm:leading-relaxed mb-2 sm:mb-6">{tr(`benefits.${b.id}.desc`)}</p>
                <div className="inline-flex px-2 sm:px-4 py-1 sm:py-2 bg-emerald-50 dark:bg-emerald-950/50 rounded-md sm:rounded-lg text-emerald-700 dark:text-emerald-300 font-bold text-[10px] sm:text-lg mt-auto">
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



function CTAAndInvestSection() {
  const { tr } = useI18n();
  return (
    <section className="py-8 sm:py-16 bg-white dark:bg-gray-950">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-2 gap-3 sm:gap-6">
          {/* CTA Card */}
          <div className="rounded-2xl sm:rounded-3xl bg-linear-to-br from-emerald-600 to-teal-700 overflow-hidden relative">
            <div className="absolute inset-0 bg-[url('/images/hero-libreville.png')] mix-blend-overlay opacity-20 bg-cover bg-center" />
            <div className="relative z-10 p-4 sm:p-8 lg:p-10 flex flex-col justify-between h-full">
              <div>
                <h2 className="text-sm sm:text-2xl lg:text-3xl font-extrabold text-white mb-2 sm:mb-5 leading-tight">
                  {tr('ctafinal.title')}
                </h2>
                <ul className="space-y-1.5 sm:space-y-4 mb-3 sm:mb-8">
                  {[1, 2, 3].map(i => (
                    <li key={i} className="flex items-center gap-1.5 sm:gap-3 text-white/90 text-[10px] sm:text-base lg:text-lg font-semibold">
                      <CheckCircle size={14} className="text-emerald-300 shrink-0 sm:w-5 sm:h-5" />
                      {tr(`ctafinal.check${i}`)}
                    </li>
                  ))}
                </ul>
              </div>
              <Link href="/login" className="inline-flex items-center gap-1.5 sm:gap-2 px-3 sm:px-6 py-2 sm:py-3 bg-white text-emerald-700 rounded-lg sm:rounded-xl font-bold text-[10px] sm:text-sm hover:bg-gray-100 transition-colors w-fit">
                {tr('ctafinal.btn')} <ArrowRight size={14} className="sm:w-4 sm:h-4" />
              </Link>
            </div>
          </div>

          {/* Invest Card */}
          <div className="rounded-2xl sm:rounded-3xl bg-linear-to-br from-teal-600 via-emerald-500 to-green-600 overflow-hidden relative">
            <div className="absolute top-0 right-0 w-60 h-60 bg-white/5 rounded-full -translate-y-1/2 translate-x-1/3 blur-3xl" />
            <div className="relative z-10 p-4 sm:p-8 lg:p-10 flex flex-col justify-between h-full">
              <div>
                <div className="w-8 h-8 sm:w-12 sm:h-12 rounded-lg sm:rounded-xl bg-white/15 flex items-center justify-center mb-2 sm:mb-5">
                  <TrendingUp size={18} className="text-white sm:w-6 sm:h-6" />
                </div>
                <h2 className="text-sm sm:text-2xl lg:text-3xl font-extrabold text-white mb-1.5 sm:mb-3 leading-tight">
                  Investissez dans l&apos;Économie Numérique du Gabon
                </h2>
                <p className="text-white/80 text-[10px] sm:text-sm leading-relaxed mb-3 sm:mb-6 line-clamp-3 sm:line-clamp-none">
                  Découvrez les 6 verticales de croissance, les données macroéconomiques BAD et le premier deal VC historique.
                </p>
              </div>
              <Link
                href="/investir-numerique"
                className="inline-flex items-center gap-1.5 sm:gap-2 px-3 sm:px-6 py-2 sm:py-3 bg-white text-teal-700 rounded-lg sm:rounded-xl font-bold text-[10px] sm:text-sm hover:bg-gray-100 transition-colors w-fit"
              >
                Explorer les opportunités <ArrowRight size={14} className="sm:w-4 sm:h-4" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}


export function Footer() {
  const { tr } = useI18n();
  return (
    <footer className="bg-gray-950 pt-6 sm:pt-12 pb-4 sm:pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="flex flex-col items-center text-center gap-3 sm:gap-6 mb-4 sm:mb-8 md:flex-row md:text-left md:justify-between">
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-lg bg-linear-to-br from-emerald-500 to-emerald-600 flex items-center justify-center">
              <span className="text-white font-bold text-xs sm:text-sm">G</span>
            </div>
            <span className="font-bold text-white text-sm sm:text-lg">
              GABON <span className="text-emerald-400">BIZ</span>
            </span>
          </div>
          <div className="flex gap-3 sm:gap-6 flex-wrap justify-center text-xs sm:text-base">
            <Link href="#" className="text-gray-400 hover:text-white transition-colors">Termes</Link>
            <Link href="#" className="text-gray-400 hover:text-white transition-colors">Confidentialité</Link>
            <Link href="#" className="text-gray-400 hover:text-white transition-colors">Cookies</Link>
            <Link href="/investir-numerique" className="text-teal-400 hover:text-teal-300 transition-colors font-medium">Investir</Link>
          </div>
        </div>
        <div className="text-center md:text-left border-t border-gray-800 pt-3 sm:pt-8 mt-3 sm:mt-8">
          <p className="text-[10px] sm:text-sm text-gray-500">{tr('footer.desc')}</p>
          <p className="mt-1 sm:mt-2 text-[10px] sm:text-xs text-gray-600">© 2026 République Gabonaise. {tr('footer.rights')}</p>
        </div>
      </div>
    </footer>
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

        <CTAAndInvestSection />
      </main>
      <Footer />
    </div>
  );
}
