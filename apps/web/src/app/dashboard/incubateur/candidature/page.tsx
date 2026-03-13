'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  BookOpen,
  User,
  Lightbulb,
  Users,
  Presentation,
  ArrowRight,
  ArrowLeft,
  CheckCircle,
  Rocket,
} from 'lucide-react';
import { PROGRAMMES_REELS } from '@/lib/mock/incubateur-data';

const STEPS = [
  { title: 'Choisir un programme', icon: BookOpen },
  { title: 'Mon profil', icon: User },
  { title: 'Mon projet', icon: Lightbulb },
  { title: "L'équipe", icon: Users },
  { title: 'Pitch & Documents', icon: Presentation },
];

const openProgrammes = PROGRAMMES_REELS;

export default function CandidaturePage() {
  const [step, setStep] = useState(0);
  const [submitted, setSubmitted] = useState(false);
  const [selectedProgramme, setSelectedProgramme] = useState<string>('');

  if (submitted) {
    return (
      <div className="max-w-lg mx-auto text-center py-20">
        <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ type: 'spring' }}>
          <div className="w-20 h-20 rounded-full bg-green-500 flex items-center justify-center mx-auto mb-6">
            <CheckCircle size={40} className="text-white" />
          </div>
          <h2 className="text-2xl font-black text-gray-900 dark:text-white mb-3">
            Candidature soumise !
          </h2>
          <p className="text-gray-600 dark:text-gray-400 mb-6">Réponse sous 15 jours ouvrés.</p>
          <div className="bg-gray-50 dark:bg-white/5 rounded-xl p-4 text-left space-y-2">
            {[
              'Confirmation email envoyée',
              'Revue par le comité de sélection',
              'Entretien si présélectionné',
              'Décision finale et onboarding',
            ].map((s, i) => (
              <div
                key={i}
                className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400"
              >
                <CheckCircle size={14} className="text-green-500" /> {s}
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 rounded-xl bg-linear-to-br from-pink-500 to-fuchsia-600 flex items-center justify-center text-white">
          <Rocket size={18} />
        </div>
        <div>
          <h1 className="text-xl font-black text-gray-900 dark:text-white">
            Candidature — Incubateur SING
          </h1>
          <p className="text-sm text-gray-500">Remplissez le formulaire en 5 étapes</p>
        </div>
      </div>

      {/* Stepper */}
      <div className="flex items-center gap-1 overflow-x-auto pb-2">
        {STEPS.map((s, i) => (
          <div key={i} className="flex items-center">
            <div
              className={`flex items-center gap-1.5 px-3 py-2 rounded-full text-xs font-semibold whitespace-nowrap transition-all ${
                i === step
                  ? 'bg-pink-500 text-white'
                  : i < step
                    ? 'bg-green-500/10 text-green-600'
                    : 'bg-gray-100 dark:bg-white/5 text-gray-400'
              }`}
            >
              {i < step ? <CheckCircle size={12} /> : <s.icon size={12} />}
              <span className="hidden sm:inline">{s.title}</span>
              <span className="sm:hidden">{i + 1}</span>
            </div>
            {i < STEPS.length - 1 && (
              <div
                className={`w-6 h-0.5 mx-1 ${i < step ? 'bg-green-500' : 'bg-gray-200 dark:bg-white/10'}`}
              />
            )}
          </div>
        ))}
      </div>

      {/* Step Content */}
      <AnimatePresence mode="wait">
        <motion.div
          key={step}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -20 }}
          className="bg-white dark:bg-white/5 rounded-2xl border border-gray-200/60 dark:border-white/8 p-6"
        >
          <h2 className="text-lg font-bold text-gray-900 dark:text-white mb-4">
            {STEPS[step].title}
          </h2>

          {step === 0 && (
            <div className="grid md:grid-cols-2 gap-3">
              {openProgrammes.map((p) => (
                <button
                  key={p.id}
                  onClick={() => setSelectedProgramme(p.id)}
                  className={`text-left p-4 rounded-xl border-2 transition-all ${selectedProgramme === p.id ? 'border-pink-500 bg-pink-50 dark:bg-pink-500/5' : 'border-gray-200 dark:border-white/10 hover:border-pink-300'}`}
                >
                  <div className="flex items-center gap-2 mb-2">
                    <div
                      className="w-6 h-6 rounded-md flex items-center justify-center text-white text-xs"
                      style={{ background: p.color }}
                    >
                      {p.name[0]}
                    </div>
                    <h3 className="text-sm font-bold text-gray-900 dark:text-white">{p.name}</h3>
                  </div>
                  <p className="text-xs text-gray-500 line-clamp-2 mb-2">{p.description}</p>
                  <div className="flex gap-3 text-[10px] text-gray-400">
                    <span>{p.totalStartups} startups</span>
                    <span>{p.totalEmplois} emplois</span>
                    <span>{p.pilier}</span>
                  </div>
                </button>
              ))}
            </div>
          )}

          {step === 1 && (
            <div className="grid md:grid-cols-2 gap-4">
              {[
                { l: 'Nom complet', t: 'text', r: true },
                { l: 'Email', t: 'email', r: true },
                { l: 'Téléphone', t: 'tel', r: true },
                { l: 'Ville', t: 'select' },
                { l: 'Formation', t: 'text' },
              ].map((f) => (
                <div key={f.l}>
                  <label className="text-xs font-semibold text-gray-700 dark:text-gray-300 mb-1 block">
                    {f.l}
                    {f.r && <span className="text-pink-500">*</span>}
                  </label>
                  {f.t === 'select' ? (
                    <select className="w-full px-3 py-2.5 rounded-xl border border-gray-200 dark:border-white/10 bg-gray-50 dark:bg-white/5 text-sm text-gray-900 dark:text-white">
                      <option>Libreville</option>
                      <option>Port-Gentil</option>
                      <option>Franceville</option>
                      <option>Oyem</option>
                      <option>Autre</option>
                    </select>
                  ) : (
                    <input
                      type={f.t}
                      className="w-full px-3 py-2.5 rounded-xl border border-gray-200 dark:border-white/10 bg-gray-50 dark:bg-white/5 text-sm text-gray-900 dark:text-white"
                    />
                  )}
                </div>
              ))}
              <div className="md:col-span-2">
                <label className="text-xs font-semibold text-gray-700 dark:text-gray-300 mb-1 block">
                  Expérience professionnelle
                </label>
                <textarea
                  rows={3}
                  className="w-full px-3 py-2.5 rounded-xl border border-gray-200 dark:border-white/10 bg-gray-50 dark:bg-white/5 text-sm text-gray-900 dark:text-white"
                />
              </div>
            </div>
          )}

          {step === 2 && (
            <div className="space-y-4">
              {[
                { l: 'Nom du projet/startup', t: 'text', r: true },
                { l: 'Quel problème résolvez-vous ?', t: 'area', r: true },
                { l: 'Votre solution en 3 phrases', t: 'area', r: true },
                { l: 'Modèle économique', t: 'area' },
              ].map((f) => (
                <div key={f.l}>
                  <label className="text-xs font-semibold text-gray-700 dark:text-gray-300 mb-1 block">
                    {f.l}
                    {f.r && <span className="text-pink-500">*</span>}
                  </label>
                  {f.t === 'area' ? (
                    <textarea
                      rows={3}
                      className="w-full px-3 py-2.5 rounded-xl border border-gray-200 dark:border-white/10 bg-gray-50 dark:bg-white/5 text-sm text-gray-900 dark:text-white"
                    />
                  ) : (
                    <input
                      type="text"
                      className="w-full px-3 py-2.5 rounded-xl border border-gray-200 dark:border-white/10 bg-gray-50 dark:bg-white/5 text-sm text-gray-900 dark:text-white"
                    />
                  )}
                </div>
              ))}
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="text-xs font-semibold text-gray-700 dark:text-gray-300 mb-1 block">
                    Secteur
                  </label>
                  <select className="w-full px-3 py-2.5 rounded-xl border border-gray-200 dark:border-white/10 bg-gray-50 dark:bg-white/5 text-sm text-gray-900 dark:text-white">
                    {[
                      'FinTech',
                      'HealthTech',
                      'AgriTech',
                      'EdTech',
                      'GovTech',
                      'e-Commerce',
                      'Mobilité',
                      'Autre',
                    ].map((s) => (
                      <option key={s}>{s}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="text-xs font-semibold text-gray-700 dark:text-gray-300 mb-1 block">
                    Stade actuel
                  </label>
                  <select className="w-full px-3 py-2.5 rounded-xl border border-gray-200 dark:border-white/10 bg-gray-50 dark:bg-white/5 text-sm text-gray-900 dark:text-white">
                    {['Idée', 'Prototype', 'MVP', 'Lancé', 'Traction'].map((s) => (
                      <option key={s}>{s}</option>
                    ))}
                  </select>
                </div>
              </div>
            </div>
          )}

          {step === 3 && (
            <div className="space-y-4">
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="text-xs font-semibold text-gray-700 dark:text-gray-300 mb-1 block">
                    Taille de l&apos;équipe
                  </label>
                  <input
                    type="number"
                    min={1}
                    max={20}
                    defaultValue={2}
                    className="w-full px-3 py-2.5 rounded-xl border border-gray-200 dark:border-white/10 bg-gray-50 dark:bg-white/5 text-sm text-gray-900 dark:text-white"
                  />
                </div>
                <div>
                  <label className="text-xs font-semibold text-gray-700 dark:text-gray-300 mb-1 block">
                    Disponibilité
                  </label>
                  <select className="w-full px-3 py-2.5 rounded-xl border border-gray-200 dark:border-white/10 bg-gray-50 dark:bg-white/5 text-sm text-gray-900 dark:text-white">
                    <option>Temps plein</option>
                    <option>Temps partiel (&gt;50%)</option>
                    <option>Temps partiel (&lt;50%)</option>
                  </select>
                </div>
              </div>
              <div>
                <label className="text-xs font-semibold text-gray-700 dark:text-gray-300 mb-1 block">
                  Co-fondateurs (noms et rôles)
                </label>
                <textarea
                  rows={3}
                  className="w-full px-3 py-2.5 rounded-xl border border-gray-200 dark:border-white/10 bg-gray-50 dark:bg-white/5 text-sm text-gray-900 dark:text-white"
                />
              </div>
              <div>
                <label className="text-xs font-semibold text-gray-700 dark:text-gray-300 mb-1 block">
                  Compétences techniques
                </label>
                <div className="flex flex-wrap gap-2">
                  {[
                    'Développement web',
                    'Mobile',
                    'IA/ML',
                    'Data',
                    'Design',
                    'Marketing',
                    'Finance',
                    'Juridique',
                  ].map((s) => (
                    <label
                      key={s}
                      className="flex items-center gap-1.5 text-xs text-gray-600 dark:text-gray-400 cursor-pointer"
                    >
                      <input type="checkbox" className="rounded border-gray-300" /> {s}
                    </label>
                  ))}
                </div>
              </div>
            </div>
          )}

          {step === 4 && (
            <div className="space-y-4">
              <div>
                <label className="text-xs font-semibold text-gray-700 dark:text-gray-300 mb-1 block">
                  Lien vidéo pitch (2 min max)
                </label>
                <input
                  type="url"
                  placeholder="YouTube, Loom ou Google Drive"
                  className="w-full px-3 py-2.5 rounded-xl border border-gray-200 dark:border-white/10 bg-gray-50 dark:bg-white/5 text-sm text-gray-900 dark:text-white"
                />
              </div>
              <div>
                <label className="text-xs font-semibold text-gray-700 dark:text-gray-300 mb-1 block">
                  Pitch deck (PDF, max 10MB)
                </label>
                <input
                  type="file"
                  accept=".pdf"
                  className="w-full text-sm text-gray-600 file:mr-4 file:py-2 file:px-4 file:rounded-xl file:border-0 file:text-sm file:font-semibold file:bg-pink-50 file:text-pink-600 hover:file:bg-pink-100"
                />
              </div>
              <div>
                <label className="text-xs font-semibold text-gray-700 dark:text-gray-300 mb-1 block">
                  Pourquoi la SING ? <span className="text-pink-500">*</span>
                </label>
                <textarea
                  rows={4}
                  className="w-full px-3 py-2.5 rounded-xl border border-gray-200 dark:border-white/10 bg-gray-50 dark:bg-white/5 text-sm text-gray-900 dark:text-white"
                />
              </div>
            </div>
          )}
        </motion.div>
      </AnimatePresence>

      {/* Navigation */}
      <div className="flex justify-between">
        <button
          onClick={() => setStep(Math.max(0, step - 1))}
          disabled={step === 0}
          className="flex items-center gap-1.5 px-5 py-2.5 rounded-xl text-sm font-semibold text-gray-600 dark:text-gray-400 bg-gray-100 dark:bg-white/5 disabled:opacity-30 hover:bg-gray-200 transition-all"
        >
          <ArrowLeft size={14} /> Précédent
        </button>
        {step < 4 ? (
          <button
            onClick={() => setStep(step + 1)}
            className="flex items-center gap-1.5 px-5 py-2.5 rounded-xl text-sm font-semibold text-white bg-pink-500 hover:bg-pink-600 transition-all"
          >
            Suivant <ArrowRight size={14} />
          </button>
        ) : (
          <button
            onClick={() => setSubmitted(true)}
            className="flex items-center gap-1.5 px-6 py-2.5 rounded-xl text-sm font-bold text-white bg-green-500 hover:bg-green-600 transition-all"
          >
            <CheckCircle size={14} /> Soumettre ma candidature
          </button>
        )}
      </div>
    </div>
  );
}
