'use client';

import { useState } from 'react';
import { Save, Eye, EyeOff, Tag } from 'lucide-react';
import DashboardLayout from '@/components/DashboardLayout';
import { SECTORS } from '@/lib/annuaire-data';

export default function MaFichePage() {
  const [visible, setVisible] = useState(true);
  const [saved, setSaved] = useState(false);
  const [form, setForm] = useState({
    name: 'Mon Entreprise SARL',
    description: 'Description de votre entreprise...',
    sector: 'technologies',
    city: 'Libreville',
    province: 'Estuaire',
    phone: '',
    email: '',
    website: '',
    tags: 'technologie, innovation',
  });

  const handleSave = () => {
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  return (
    <DashboardLayout>
      <div className="max-w-3xl space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white m-0">📝 Ma Fiche Annuaire</h1>
            <p className="text-sm text-gray-500 dark:text-gray-400 m-0 mt-1">Gérez les informations publiques de votre entreprise</p>
          </div>
          <button
            onClick={() => setVisible(!visible)}
            className={`inline-flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium border-none cursor-pointer transition-colors
              ${visible
                ? 'bg-emerald-50 dark:bg-emerald-900/20 text-emerald-600 dark:text-emerald-400'
                : 'bg-gray-100 dark:bg-gray-800 text-gray-500'
              }`}
          >
            {visible ? <Eye size={16} /> : <EyeOff size={16} />}
            {visible ? 'Visible' : 'Masquée'}
          </button>
        </div>

        <div className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-200 dark:border-gray-800 p-6 space-y-5">
          {/* Company name */}
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Raison sociale</label>
            <input
              type="text"
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              className="w-full px-4 py-3 rounded-xl bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 text-gray-900 dark:text-white text-sm focus:ring-2 focus:ring-emerald-500/40 focus:border-emerald-500 outline-none transition-all"
            />
          </div>

          {/* Description */}
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Description</label>
            <textarea
              value={form.description}
              onChange={(e) => setForm({ ...form, description: e.target.value })}
              rows={4}
              className="w-full px-4 py-3 rounded-xl bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 text-gray-900 dark:text-white text-sm focus:ring-2 focus:ring-emerald-500/40 focus:border-emerald-500 outline-none transition-all resize-y"
            />
          </div>

          {/* Sector + Location */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Secteur</label>
              <select
                value={form.sector}
                onChange={(e) => setForm({ ...form, sector: e.target.value })}
                className="w-full px-4 py-3 rounded-xl bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 text-gray-900 dark:text-white text-sm"
              >
                {SECTORS.map((s) => (
                  <option key={s.id} value={s.slug}>{s.icon} {s.name}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Ville</label>
              <input
                type="text"
                value={form.city}
                onChange={(e) => setForm({ ...form, city: e.target.value })}
                className="w-full px-4 py-3 rounded-xl bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 text-gray-900 dark:text-white text-sm focus:ring-2 focus:ring-emerald-500/40 focus:border-emerald-500 outline-none transition-all"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Province</label>
              <input
                type="text"
                value={form.province}
                onChange={(e) => setForm({ ...form, province: e.target.value })}
                className="w-full px-4 py-3 rounded-xl bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 text-gray-900 dark:text-white text-sm focus:ring-2 focus:ring-emerald-500/40 focus:border-emerald-500 outline-none transition-all"
              />
            </div>
          </div>

          {/* Contact */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Téléphone</label>
              <input type="tel" value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })}
                className="w-full px-4 py-3 rounded-xl bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 text-gray-900 dark:text-white text-sm focus:ring-2 focus:ring-emerald-500/40 focus:border-emerald-500 outline-none transition-all"
                placeholder="+241..." />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Email</label>
              <input type="email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })}
                className="w-full px-4 py-3 rounded-xl bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 text-gray-900 dark:text-white text-sm focus:ring-2 focus:ring-emerald-500/40 focus:border-emerald-500 outline-none transition-all"
                placeholder="contact@..." />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Site web</label>
              <input type="url" value={form.website} onChange={(e) => setForm({ ...form, website: e.target.value })}
                className="w-full px-4 py-3 rounded-xl bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 text-gray-900 dark:text-white text-sm focus:ring-2 focus:ring-emerald-500/40 focus:border-emerald-500 outline-none transition-all"
                placeholder="https://..." />
            </div>
          </div>

          {/* Tags */}
          <div>
            <label className="flex items-center gap-1.5 text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              <Tag size={14} /> Tags / Mots-clés
            </label>
            <input
              type="text"
              value={form.tags}
              onChange={(e) => setForm({ ...form, tags: e.target.value })}
              className="w-full px-4 py-3 rounded-xl bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 text-gray-900 dark:text-white text-sm focus:ring-2 focus:ring-emerald-500/40 focus:border-emerald-500 outline-none transition-all"
              placeholder="Séparés par des virgules"
            />
          </div>

          {/* Save */}
          <div className="pt-4 border-t border-gray-100 dark:border-gray-800 flex items-center justify-between">
            <p className="text-xs text-gray-400 m-0">
              ⚠️ Mode démo — Les modifications ne seront pas sauvegardées.
            </p>
            <button
              onClick={handleSave}
              className="inline-flex items-center gap-2 px-6 py-2.5 rounded-xl text-sm font-semibold text-white bg-emerald-600 hover:bg-emerald-700 border-none cursor-pointer transition-colors"
            >
              <Save size={16} />
              {saved ? '✓ Sauvegardé' : 'Enregistrer'}
            </button>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
