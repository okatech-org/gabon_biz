'use client';

import { motion } from 'framer-motion';
import { ShieldCheck } from 'lucide-react';
import VerificationWidget from '@/components/annuaire/VerificationWidget';
import { useI18n } from '@/lib/i18n/i18nContext';

export default function VerifierPage() {
  const { tr } = useI18n();
  return (
    <div className="pt-28 pb-20 px-6">
      <div className="max-w-3xl mx-auto">
        {/* Hero */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-10"
        >
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-emerald-100 dark:bg-emerald-900/30 mb-6">
            <ShieldCheck size={32} className="text-emerald-600 dark:text-emerald-400" />
          </div>
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-3">
            {tr('ann.verify_title')}
          </h1>
          <p className="text-gray-600 dark:text-gray-400 max-w-lg mx-auto">
            {tr('ann.verify_desc')}
          </p>
        </motion.div>

        {/* Widget */}
        <VerificationWidget />

        {/* Info box */}
        <div className="mt-12 bg-blue-50 dark:bg-blue-950/20 rounded-2xl p-6 border border-blue-100 dark:border-blue-900/30">
          <h3 className="text-sm font-bold text-blue-700 dark:text-blue-400 mb-2">{tr('ann.verify_about')}</h3>
          <p className="text-sm text-blue-600 dark:text-blue-300 leading-relaxed m-0">
            {tr('ann.verify_info')}
          </p>
        </div>
      </div>
    </div>
  );
}
