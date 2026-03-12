'use client';

import React from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { TrendingUp, ArrowRight } from 'lucide-react';
import { INVESTIR_HUB_STATS, INVESTIR_HUB_MODULES, DEAL_FLOW } from '@/lib/mock/investir-data';
import DealFlowCard from '@/components/investir/DealFlowCard';

export default function InvestirHubPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-teal-500 to-emerald-600 flex items-center justify-center text-white">
          <TrendingUp size={18} />
        </div>
        <div>
          <h1 className="text-2xl font-black text-gray-900 dark:text-white">Investir au Gabon</h1>
          <p className="text-sm text-gray-500 dark:text-gray-400">
            Deal Flow, opportunités sectorielles et données macroéconomiques
          </p>
        </div>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
        {INVESTIR_HUB_STATS.map((s, i) => {
          const Icon = s.icon;
          return (
            <motion.div
              key={s.label}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.05 }}
              className="bg-white dark:bg-white/5 rounded-xl border border-gray-200/60 dark:border-white/8 p-4"
            >
              <Icon size={14} className="text-teal-500 mb-1" />
              <p className="text-lg font-black text-gray-900 dark:text-white">{s.value}</p>
              <p className="text-[10px] text-gray-500">{s.label}</p>
            </motion.div>
          );
        })}
      </div>

      {/* Modules */}
      <div>
        <h2 className="text-sm font-bold text-gray-500 uppercase tracking-wider mb-3">Modules</h2>
        <div className="grid grid-cols-2 lg:grid-cols-5 gap-3">
          {INVESTIR_HUB_MODULES.map((m, i) => {
            const Icon = m.icon;
            return (
              <motion.div
                key={m.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.04 }}
              >
                <Link
                  href={m.href}
                  className="block bg-white dark:bg-white/5 rounded-xl border border-gray-200/60 dark:border-white/8 p-4 hover:shadow-lg hover:-translate-y-0.5 transition-all group"
                >
                  <div
                    className="w-9 h-9 rounded-lg flex items-center justify-center text-white mb-3"
                    style={{ background: m.color }}
                  >
                    <Icon size={16} />
                  </div>
                  <h3 className="text-sm font-bold text-gray-900 dark:text-white mb-1 group-hover:text-teal-500 transition-colors">
                    {m.title}
                  </h3>
                  <span
                    className="text-[10px] font-semibold px-2 py-0.5 rounded-full"
                    style={{ background: `${m.color}15`, color: m.color }}
                  >
                    {m.badge}
                  </span>
                </Link>
              </motion.div>
            );
          })}
        </div>
      </div>

      {/* Deal Flow */}
      <div>
        <div className="flex items-center justify-between mb-3">
          <h2 className="text-sm font-bold text-gray-500 uppercase tracking-wider">
            Deal Flow Pipeline
          </h2>
          <Link
            href="/dashboard/investir/opportunites"
            className="text-xs text-teal-500 font-semibold flex items-center gap-1 hover:underline"
          >
            Voir tout <ArrowRight size={10} />
          </Link>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
          {DEAL_FLOW.slice(0, 6).map((d, i) => (
            <DealFlowCard key={d.id} deal={d} index={i} />
          ))}
        </div>
      </div>
    </div>
  );
}
