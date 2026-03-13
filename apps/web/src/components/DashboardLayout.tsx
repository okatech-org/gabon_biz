'use client';

// GABON BIZ — Sidebar Navigation Layout
// Dynamic navigation based on user role and demo account permissions
// Responsive: drawer overlay on mobile, fixed sidebar on md+

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useAuth } from '@/lib/auth-context';
import { getDemoAccountByNip } from '@/lib/demo-accounts';
import DemoBanner from '@/components/DemoBanner';

interface NavItem {
  path: string;
  icon: string;
  label: string;
  children?: { path: string; label: string }[];
}

// All possible nav items
const ALL_NAV_ITEMS: NavItem[] = [
  { path: '/dashboard', icon: '🏠', label: 'Tableau de bord' },
  { path: '/dashboard/entreprises', icon: '🏢', label: 'Mes Entreprises' },
  { path: '/dashboard/marches', icon: '📋', label: 'Marchés Publics' },
  { path: '/dashboard/soumissions', icon: '📨', label: 'Mes Soumissions' },
  {
    path: '/dashboard/innovation',
    icon: '💡',
    label: 'Innovation Hub',
    children: [
      { path: '/dashboard/innovation/defis', label: "Défis d'Innovation" },
      { path: '/dashboard/innovation/startups', label: 'Startups' },
      { path: '/dashboard/innovation/matching', label: 'Matching IA' },
      { path: '/dashboard/innovation/comparer', label: 'Comparer' },
      { path: '/dashboard/innovation/analytics', label: 'Analytics' },
    ],
  },
  { path: '/dashboard/incubateur', icon: '🎓', label: 'Incubateur' },
  {
    path: '/dashboard/investir',
    icon: '💰',
    label: 'Investir',
    children: [
      { path: '/dashboard/investir/opportunites', label: 'Opportunités Sectorielles' },
      { path: '/dashboard/investir/macro', label: 'Dashboard Macro' },
      { path: '/dashboard/investir/due-diligence', label: 'Due Diligence Pays' },
      { path: '/dashboard/investir/simulateur', label: 'Simulateur ROI' },
      { path: '/dashboard/investir/veille', label: 'Veille & Alertes' },
    ],
  },
  { path: '/dashboard/observatoire', icon: '📊', label: 'Observatoire' },
  { path: '/dashboard/filieres', icon: '🏭', label: 'Filières' },
  { path: '/dashboard/annuaire', icon: '📒', label: 'Annuaire' },
  { path: '/dashboard/cgi', icon: '💡', label: "Centre d'Innovation" },
];

const ADMIN_ITEMS: NavItem[] = [
  { path: '/dashboard/admin', icon: '🖥️', label: 'Admin Système' },
  { path: '/dashboard/admin/entreprises', icon: '⚙️', label: 'Gestion Entreprises' },
  { path: '/dashboard/admin/marches', icon: '📊', label: 'Gestion Marchés' },
];

function getNavItemsForUser(user: ReturnType<typeof useAuth>['user']): NavItem[] {
  if (!user) return ALL_NAV_ITEMS.slice(0, 4); // Default: first 4

  // Demo user: filter by accessible modules
  if (user.isDemo) {
    const account = getDemoAccountByNip(user.nip);
    if (account) {
      return ALL_NAV_ITEMS.filter((item) => account.accessibleModules.includes(item.path)).map(
        (item) => ({
          ...item,
          children: item.children?.filter((child) =>
            account.accessibleModules.includes(child.path),
          ),
        }),
      );
    }
  }

  // Non-demo: show all items
  return ALL_NAV_ITEMS;
}

function SidebarContent({
  pathname,
  user,
  logout,
  isAdmin,
  navItems,
  onNavClick,
}: {
  pathname: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  user: any;
  logout: () => void;
  isAdmin: boolean;
  navItems: NavItem[];
  onNavClick?: () => void;
}) {
  return (
    <>
      {/* Demo banner inside sidebar */}
      {user?.isDemo && <DemoBanner />}

      {/* Logo */}
      <div className="px-5 py-6 border-b border-gray-100 dark:border-gray-800 flex items-center gap-2.5">
        <Link href="/" className="flex items-center gap-2.5 no-underline">
          <span className="text-2xl font-extrabold bg-linear-to-r from-emerald-500 to-yellow-400 bg-clip-text text-transparent">
            GABON BIZ
          </span>
        </Link>
      </div>

      {/* Nav */}
      <nav className="flex-1 p-3 flex flex-col gap-1 overflow-y-auto">
        {navItems.map((item) => {
          const active =
            pathname === item.path ||
            (item.path !== '/dashboard' && pathname.startsWith(item.path));
          const hasChildren = item.children && item.children.length > 0;
          const showChildren = hasChildren && active;
          return (
            <div key={item.path}>
              <Link
                href={item.path}
                onClick={onNavClick}
                className={`flex items-center gap-2.5 px-3.5 py-2.5 rounded-xl text-sm no-underline transition-all duration-150
                    ${
                      active
                        ? 'font-semibold text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/50'
                        : 'font-normal text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-800'
                    }`}
              >
                <span className="text-lg">{item.icon}</span>
                {item.label}
              </Link>
              {showChildren &&
                item.children!.map((child) => {
                  const childActive = pathname === child.path;
                  return (
                    <Link
                      key={child.path}
                      href={child.path}
                      onClick={onNavClick}
                      className={`flex items-center gap-2 pl-12 pr-3.5 py-2 rounded-lg text-xs no-underline transition-all duration-150 ml-1
                        ${
                          childActive
                            ? 'font-semibold text-teal-600 dark:text-teal-400 bg-teal-50 dark:bg-teal-950/40'
                            : 'font-normal text-gray-500 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-800 hover:text-gray-700'
                        }`}
                    >
                      <span className="w-1.5 h-1.5 rounded-full bg-current opacity-60 shrink-0" />
                      {child.label}
                    </Link>
                  );
                })}
            </div>
          );
        })}

        {isAdmin && (
          <>
            <div className="mt-4 mb-2 px-3.5 text-[11px] font-semibold text-gray-400 dark:text-gray-500 uppercase tracking-wider">
              Administration
            </div>
            {ADMIN_ITEMS.map((item) => {
              const active = pathname === item.path;
              return (
                <Link
                  key={item.path}
                  href={item.path}
                  onClick={onNavClick}
                  className={`flex items-center gap-2.5 px-3.5 py-2.5 rounded-xl text-sm no-underline transition-all
                      ${
                        active
                          ? 'font-semibold text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/50'
                          : 'font-normal text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-800'
                      }`}
                >
                  <span className="text-lg">{item.icon}</span>
                  {item.label}
                </Link>
              );
            })}
          </>
        )}
      </nav>

      {/* User */}
      <div className="p-4 border-t border-gray-100 dark:border-gray-800 flex items-center gap-3 safe-area-bottom">
        <div
          className="w-9 h-9 rounded-full flex items-center justify-center text-white text-sm font-bold shrink-0"
          style={{
            background: user?.isDemo
              ? getDemoAccountByNip(user.nip)?.accentColor || '#009e49'
              : 'linear-gradient(135deg, #009e49, #3cba54)',
          }}
        >
          {user?.name?.charAt(0) || '?'}
        </div>
        <div className="flex-1 min-w-0">
          <div className="text-sm font-semibold text-gray-900 dark:text-gray-100 truncate">
            {user?.name || 'Utilisateur'}
          </div>
          {user?.organization && (
            <div className="text-xs text-gray-400 dark:text-gray-500 truncate">
              {user.organization}
            </div>
          )}
          <button
            onClick={logout}
            className="text-xs text-gray-400 dark:text-gray-500 hover:text-red-500 bg-transparent border-none cursor-pointer p-0 mt-0.5"
          >
            Déconnexion
          </button>
        </div>
      </div>
    </>
  );
}

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const { user, logout } = useAuth();
  const isAdmin = !!(user?.roles?.includes('ADMIN') || user?.roles?.includes('SYSADMIN'));
  const navItems = getNavItemsForUser(user);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  // Prevent body scroll when mobile sidebar open
  useEffect(() => {
    if (sidebarOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [sidebarOpen]);

  const accentColor = user?.isDemo
    ? getDemoAccountByNip(user.nip)?.accentColor || '#009e49'
    : '#009e49';

  return (
    <div className="flex min-h-screen bg-gray-50 dark:bg-gray-950">
      {/* ═══ MOBILE TOP BAR ═══ */}
      <header className="fixed top-0 left-0 right-0 z-40 md:hidden bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800 safe-area-top">
        <div className="flex items-center justify-between px-4 h-14">
          {/* Hamburger */}
          <button
            onClick={() => setSidebarOpen(true)}
            className="p-2 -ml-2 rounded-lg text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
            aria-label="Ouvrir le menu"
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <line x1="3" y1="6" x2="21" y2="6" />
              <line x1="3" y1="12" x2="21" y2="12" />
              <line x1="3" y1="18" x2="21" y2="18" />
            </svg>
          </button>

          {/* Logo */}
          <Link href="/dashboard" className="flex items-center gap-2 no-underline">
            <span className="text-lg font-extrabold bg-linear-to-r from-emerald-500 to-yellow-400 bg-clip-text text-transparent">
              GABON BIZ
            </span>
          </Link>

          {/* User avatar */}
          <div
            className="w-8 h-8 rounded-full flex items-center justify-center text-white text-xs font-bold shrink-0"
            style={{ background: accentColor }}
          >
            {user?.name?.charAt(0) || '?'}
          </div>
        </div>
      </header>

      {/* ═══ MOBILE OVERLAY ═══ */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm md:hidden"
          onClick={() => setSidebarOpen(false)}
          aria-hidden="true"
        />
      )}

      {/* ═══ SIDEBAR ═══ */}
      <aside
        className={`
          w-[280px] bg-white dark:bg-gray-900 border-r border-gray-200 dark:border-gray-800 
          flex flex-col fixed top-0 left-0 bottom-0 z-50

          /* Mobile: slide-in drawer */
          transition-transform duration-300 ease-in-out
          ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'}

          /* Desktop: always visible */
          md:translate-x-0 md:w-[260px]
        `}
      >
        {/* Close button — mobile only */}
        <button
          onClick={() => setSidebarOpen(false)}
          className="absolute top-4 right-4 p-1.5 rounded-lg text-gray-400 hover:text-gray-600 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors md:hidden z-10"
          aria-label="Fermer le menu"
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <line x1="18" y1="6" x2="6" y2="18" />
            <line x1="6" y1="6" x2="18" y2="18" />
          </svg>
        </button>

        <SidebarContent
          pathname={pathname}
          user={user}
          logout={logout}
          isAdmin={isAdmin}
          navItems={navItems}
          onNavClick={() => setSidebarOpen(false)}
        />
      </aside>

      {/* ═══ MAIN CONTENT ═══ */}
      <main className="flex-1 md:ml-[260px] p-4 pt-18 sm:p-6 sm:pt-20 md:p-8 md:pt-8 lg:p-10">
        {children}
      </main>
    </div>
  );
}
