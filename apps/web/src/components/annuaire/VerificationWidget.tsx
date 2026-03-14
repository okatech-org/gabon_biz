'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, CheckCircle, XCircle, AlertTriangle } from 'lucide-react';
import Link from 'next/link';
import { verifyEnterprise, type AnnuaireEnterprise } from '@/lib/annuaire-data';
import { StatusBadge } from './StartupBadge';
import { useI18n } from '@/lib/i18n/i18nContext';

export default function VerificationWidget() {
  const { tr } = useI18n();
  const [input, setInput] = useState('');
  const [result, setResult] = useState<AnnuaireEnterprise | null | undefined>(undefined);
  const [loading, setLoading] = useState(false);

  const handleVerify = () => {
    if (!input.trim()) return;
    setLoading(true);
    // Simulate network delay
    setTimeout(() => {
      setResult(verifyEnterprise(input));
      setLoading(false);
    }, 600);
  };

  return (
    <div className="max-w-2xl mx-auto">
      {/* Search input */}
      <div className="flex gap-3">
        <div className="relative flex-1">
          <Search size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            value={input}
            onChange={(e) => { setInput(e.target.value); setResult(undefined); }}
            onKeyDown={(e) => e.key === 'Enter' && handleVerify()}
            placeholder={`${tr('ann.enter_rccm')} (ex: GA-LIB-2024-B-00142)`}
            className="w-full pl-11 pr-4 py-3.5 rounded-xl bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 text-gray-900 dark:text-white text-sm placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-emerald-500/40 focus:border-emerald-500 transition-all"
          />
        </div>
        <button
          onClick={handleVerify}
          disabled={!input.trim() || loading}
          className="px-6 py-3.5 rounded-xl text-sm font-semibold text-white bg-emerald-600 hover:bg-emerald-700 disabled:opacity-50 disabled:cursor-not-allowed border-none cursor-pointer transition-colors shrink-0"
        >
          {loading ? '...' : tr('ann.verify_btn')}
        </button>
      </div>

      <p className="text-xs text-gray-400 dark:text-gray-500 mt-2">
        {tr('ann.examples')} <button onClick={() => setInput('GA-LIB-2024-B-00142')} className="text-emerald-500 hover:underline bg-transparent border-none cursor-pointer p-0 text-xs">GA-LIB-2024-B-00142</button> ou <button onClick={() => setInput('NIF-GA-2024-00142')} className="text-emerald-500 hover:underline bg-transparent border-none cursor-pointer p-0 text-xs">NIF-GA-2024-00142</button>
      </p>

      {/* Result */}
      <AnimatePresence mode="wait">
        {result !== undefined && (
          <motion.div
            key={result ? result.id : 'not-found'}
            initial={{ opacity: 0, y: 12, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.3 }}
            className="mt-6"
          >
            {result ? (
              <div className={`rounded-2xl border-2 p-6 ${
                result.status === 'ACTIVE'
                  ? 'border-emerald-200 dark:border-emerald-800 bg-emerald-50/50 dark:bg-emerald-950/20'
                  : result.status === 'CLOSED'
                    ? 'border-red-200 dark:border-red-800 bg-red-50/50 dark:bg-red-950/20'
                    : 'border-amber-200 dark:border-amber-800 bg-amber-50/50 dark:bg-amber-950/20'
              }`}>
                <div className="flex items-start gap-3 mb-4">
                  {result.status === 'ACTIVE' ? (
                    <CheckCircle size={24} className="text-emerald-500 shrink-0 mt-0.5" />
                  ) : result.status === 'CLOSED' ? (
                    <AlertTriangle size={24} className="text-red-500 shrink-0 mt-0.5" />
                  ) : (
                    <AlertTriangle size={24} className="text-amber-500 shrink-0 mt-0.5" />
                  )}
                  <div>
                    <h3 className="text-lg font-bold text-gray-900 dark:text-white m-0">
                      {result.status === 'ACTIVE' ? tr('ann.found') : result.status === 'CLOSED' ? tr('ann.closed_msg') : tr('ann.suspended_msg')}
                    </h3>
                    <p className="text-sm text-gray-500 dark:text-gray-400 m-0 mt-1">
                      {result.status === 'CLOSED' && tr('ann.ceased')}
                    </p>
                  </div>
                </div>

                <div className="bg-white dark:bg-gray-900 rounded-xl p-5 space-y-3">
                  <div className="flex items-center justify-between">
                    <h4 className="text-lg font-bold text-gray-900 dark:text-white m-0">{result.name}</h4>
                    <StatusBadge status={result.status} />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-sm">
                    <div>
                      <div className="text-gray-400 text-xs font-medium mb-0.5">RCCM</div>
                      <div className="font-mono text-gray-700 dark:text-gray-300">{result.rccm}</div>
                    </div>
                    <div>
                      <div className="text-gray-400 text-xs font-medium mb-0.5">NIF</div>
                      <div className="font-mono text-gray-700 dark:text-gray-300">{result.nif}</div>
                    </div>
                    <div>
                      <div className="text-gray-400 text-xs font-medium mb-0.5">{tr('ann.legal_form')}</div>
                      <div className="text-gray-700 dark:text-gray-300">{result.legalForm}</div>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm">
                    <div>
                      <div className="text-gray-400 text-xs font-medium mb-0.5">{tr('ann.sector')}</div>
                      <div className="text-gray-700 dark:text-gray-300">{result.sector.icon} {result.sector.name}</div>
                    </div>
                    <div>
                      <div className="text-gray-400 text-xs font-medium mb-0.5">{tr('ann.location')}</div>
                      <div className="text-gray-700 dark:text-gray-300">{result.address.city}, {result.address.province}</div>
                    </div>
                  </div>

                  <div className="pt-3 border-t border-gray-200 dark:border-gray-800">
                    <Link
                      href={`/annuaire/${result.rccm}`}
                      className="inline-flex items-center gap-2 text-sm font-semibold text-emerald-600 dark:text-emerald-400 hover:text-emerald-700 no-underline"
                    >
                      {tr('ann.see_full')}
                    </Link>
                  </div>
                </div>
              </div>
            ) : (
              <div className="rounded-2xl border-2 border-gray-200 dark:border-gray-700 bg-gray-100 dark:bg-gray-900 p-6">
                <div className="flex items-start gap-3">
                  <XCircle size={24} className="text-gray-400 shrink-0 mt-0.5" />
                  <div>
                    <h3 className="text-lg font-bold text-gray-900 dark:text-white m-0">{tr('ann.not_found')}</h3>
                    <p className="text-sm text-gray-500 dark:text-gray-400 m-0 mt-1">
                      {tr('ann.no_match')} <strong className="font-mono">{input}</strong>.
                      <br />{tr('ann.not_found_msg')}
                    </p>
                  </div>
                </div>
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
