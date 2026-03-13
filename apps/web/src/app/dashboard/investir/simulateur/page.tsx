'use client';

import React from 'react';
import { Calculator } from 'lucide-react';
import ROISimulator from '@/components/investir/ROISimulator';

export default function SimulateurPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 rounded-xl bg-linear-to-br from-amber-400 to-orange-500 flex items-center justify-center text-white">
          <Calculator size={18} />
        </div>
        <div>
          <h1 className="text-xl font-black text-gray-900 dark:text-white">Simulateur ROI</h1>
          <p className="text-sm text-gray-500">
            Estimez le retour sur investissement de votre projet au Gabon
          </p>
        </div>
      </div>

      <div className="bg-slate-900 rounded-2xl p-6">
        <ROISimulator />
      </div>
    </div>
  );
}
