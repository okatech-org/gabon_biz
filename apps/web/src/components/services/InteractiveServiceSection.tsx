'use client';

// Reusable wrapper for interactive "Services en ligne" sections
// Provides tab navigation, auth-aware CTA, and toast notifications

import React, { useState, useCallback } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { Zap, LogIn, Sparkles, X, CheckCircle2 } from 'lucide-react';
import { useAuth } from '@/lib/auth-context';

/* ═══════ TOAST ═══════ */

interface Toast {
  id: number;
  message: string;
  type: 'success' | 'info';
}

let toastId = 0;

export function useServiceToast() {
  const [toasts, setToasts] = useState<Toast[]>([]);

  const showToast = useCallback((message: string, type: 'success' | 'info' = 'success') => {
    const id = ++toastId;
    setToasts((prev) => [...prev, { id, message, type }]);
    setTimeout(() => setToasts((prev) => prev.filter((t) => t.id !== id)), 4000);
  }, []);

  const dismissToast = useCallback((id: number) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  }, []);

  return { toasts, showToast, dismissToast };
}

export function ToastContainer({
  toasts,
  onDismiss,
}: {
  toasts: Toast[];
  onDismiss: (id: number) => void;
}) {
  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col gap-2">
      <AnimatePresence>
        {toasts.map((t) => (
          <motion.div
            key={t.id}
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -10, scale: 0.95 }}
            className={`flex items-center gap-3 px-5 py-3 rounded-2xl shadow-lg border backdrop-blur-xl ${
              t.type === 'success'
                ? 'bg-emerald-50/90 dark:bg-emerald-950/80 border-emerald-200 dark:border-emerald-800 text-emerald-800 dark:text-emerald-200'
                : 'bg-blue-50/90 dark:bg-blue-950/80 border-blue-200 dark:border-blue-800 text-blue-800 dark:text-blue-200'
            }`}
          >
            <CheckCircle2
              size={18}
              className={t.type === 'success' ? 'text-emerald-500' : 'text-blue-500'}
            />
            <span className="text-sm font-medium">{t.message}</span>
            <button
              onClick={() => onDismiss(t.id)}
              className="ml-2 opacity-50 hover:opacity-100 transition-opacity"
            >
              <X size={14} />
            </button>
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
}

/* ═══════ AUTH CTA BANNER ═══════ */

export function AuthCTABanner({ accentColor }: { accentColor: string }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="rounded-2xl p-6 text-center border border-dashed"
      style={{ borderColor: `${accentColor}40`, background: `${accentColor}08` }}
    >
      <div
        className="w-14 h-14 rounded-2xl mx-auto mb-4 flex items-center justify-center"
        style={{ background: `${accentColor}15` }}
      >
        <LogIn size={24} style={{ color: accentColor }} />
      </div>
      <h4 className="text-lg font-bold text-gray-900 dark:text-white mb-2">
        Connectez-vous pour utiliser ces services
      </h4>
      <p className="text-sm text-gray-500 dark:text-gray-400 mb-5 max-w-md mx-auto">
        Accédez à l&apos;ensemble des services interactifs en vous connectant avec un compte démo ou
        votre identifiant.
      </p>
      <div className="flex items-center justify-center gap-3 flex-wrap">
        <Link
          href="/demo"
          className="no-underline inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-bold text-white transition-all hover:scale-[1.02]"
          style={{ background: accentColor }}
        >
          <Sparkles size={16} /> Essayer en mode Démo
        </Link>
        <Link
          href="/login"
          className="no-underline inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold text-gray-700 dark:text-gray-300 bg-gray-100 dark:bg-white/5 border border-gray-200 dark:border-white/10 hover:bg-gray-200 dark:hover:bg-white/10 transition-all"
        >
          <LogIn size={16} /> Se connecter
        </Link>
      </div>
    </motion.div>
  );
}

/* ═══════ CONFIRMATION MODAL ═══════ */

export function ConfirmationModal({
  open,
  onClose,
  onConfirm,
  title,
  description,
  confirmLabel = 'Confirmer',
  accentColor = '#009e49',
  loading = false,
}: {
  open: boolean;
  onClose: () => void;
  onConfirm: () => void;
  title: string;
  description: string;
  confirmLabel?: string;
  accentColor?: string;
  loading?: boolean;
}) {
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" onClick={onClose} />
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 10 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        className="relative bg-white dark:bg-gray-900 rounded-2xl p-6 max-w-md w-full shadow-2xl border border-gray-200 dark:border-gray-800"
      >
        <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2">{title}</h3>
        <p className="text-sm text-gray-500 dark:text-gray-400 mb-6">{description}</p>
        <div className="flex gap-3 justify-end">
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-xl text-sm font-semibold text-gray-600 dark:text-gray-400 bg-gray-100 dark:bg-white/5 border border-gray-200 dark:border-white/10 hover:bg-gray-200 dark:hover:bg-white/10 transition-colors"
          >
            Annuler
          </button>
          <button
            onClick={onConfirm}
            disabled={loading}
            className="px-5 py-2 rounded-xl text-sm font-bold text-white transition-all hover:scale-[1.02] disabled:opacity-60"
            style={{ background: accentColor }}
          >
            {loading ? '⏳' : confirmLabel}
          </button>
        </div>
      </motion.div>
    </div>
  );
}

/* ═══════ TAB INTERFACE ═══════ */

export interface ServiceTab {
  id: string;
  label: string;
  icon: React.ReactNode;
  content: React.ReactNode;
}

export function InteractiveServiceSection({
  title = 'Services en ligne',
  subtitle,
  tabs,
  accentColor,
}: {
  title?: string;
  subtitle?: string;
  tabs: ServiceTab[];
  accentColor: string;
}) {
  const [activeTab, setActiveTab] = useState(tabs[0]?.id || '');
  const { isAuthenticated } = useAuth();

  return (
    <section className="py-16 bg-white dark:bg-gray-950" id="services-en-ligne">
      <div className="max-w-7xl mx-auto px-6">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-10"
        >
          <div
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-sm font-semibold mb-4"
            style={{ background: `${accentColor}12`, color: accentColor }}
          >
            <Zap size={16} />
            {title}
          </div>
          {subtitle && (
            <p className="text-gray-500 dark:text-gray-400 max-w-lg mx-auto">{subtitle}</p>
          )}
        </motion.div>

        {/* Tabs navigation */}
        <div className="flex flex-wrap gap-2 justify-center mb-8">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-semibold transition-all ${
                activeTab === tab.id
                  ? 'text-white shadow-lg'
                  : 'text-gray-600 dark:text-gray-400 bg-gray-100 dark:bg-white/5 border border-gray-200 dark:border-white/10 hover:bg-gray-200 dark:hover:bg-white/10'
              }`}
              style={
                activeTab === tab.id
                  ? { background: accentColor, boxShadow: `0 4px 16px ${accentColor}30` }
                  : undefined
              }
            >
              {tab.icon}
              {tab.label}
            </button>
          ))}
        </div>

        {/* Tab content */}
        <AnimatePresence mode="wait">
          {tabs.map((tab) =>
            tab.id === activeTab ? (
              <motion.div
                key={tab.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.25 }}
              >
                <>{!isAuthenticated ? <AuthCTABanner accentColor={accentColor} /> : tab.content}</>
              </motion.div>
            ) : null,
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}
