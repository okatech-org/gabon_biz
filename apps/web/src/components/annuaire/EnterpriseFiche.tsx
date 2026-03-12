'use client';

import Link from 'next/link';
import { MapPin, Phone, Mail, Globe, Copy, Check, Building2, Calendar, Users } from 'lucide-react';
import { useState } from 'react';
import { SECTORS, formatXAF, type AnnuaireEnterprise } from '@/lib/annuaire-data';
import { StatusBadge, StartupBadge, IncubatedBadge, FundingBadge, RatingStars } from './StartupBadge';
import { useI18n } from '@/lib/i18n/i18nContext';

export default function EnterpriseFiche({ enterprise: e }: { enterprise: AnnuaireEnterprise }) {
  const { tr } = useI18n();
  const [copiedField, setCopiedField] = useState<string | null>(null);
  const sectorColor = SECTORS.find((s) => s.id === e.sector.id)?.color || '#6b7280';

  const copy = (field: string, value: string) => {
    navigator.clipboard.writeText(value);
    setCopiedField(field);
    setTimeout(() => setCopiedField(null), 1500);
  };

  return (
    <div className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-200 dark:border-gray-800 overflow-hidden">
      {/* Header band */}
      <div className="h-2 w-full" style={{ background: `linear-gradient(90deg, ${sectorColor}, ${sectorColor}88)` }} />

      <div className="p-6 md:p-8">
        {/* Name + Status */}
        <div className="flex items-start justify-between gap-4 mb-6">
          <div className="flex items-center gap-4">
            <div
              className="w-16 h-16 rounded-2xl flex items-center justify-center text-white font-bold text-xl shrink-0"
              style={{ background: `linear-gradient(135deg, ${sectorColor}, ${sectorColor}cc)` }}
            >
              {e.name.split(' ').map((w) => w[0]).join('').slice(0, 2).toUpperCase()}
            </div>
            <div>
              <h1 className="text-2xl font-bold text-gray-900 dark:text-white m-0">{e.name}</h1>
              <div className="flex items-center gap-2 mt-1 text-sm text-gray-500 dark:text-gray-400">
                <Building2 size={14} />
                <span>{e.legalForm}</span>
                <span>•</span>
                <Calendar size={14} />
                <span>{tr('ann.created_in')} {e.yearFounded}</span>
                {e.employeeCount > 0 && (
                  <>
                    <span>•</span>
                    <Users size={14} />
                    <span>{e.employeeCount} {tr('ann.employees')}</span>
                  </>
                )}
              </div>
            </div>
          </div>
          <StatusBadge status={e.status} />
        </div>

        {/* Digital badges */}
        {e.isDigitalEcosystem && (
          <div className="flex flex-wrap gap-2 mb-6">
            {e.digitalCategory && <StartupBadge category={e.digitalCategory} color={sectorColor} />}
            {e.startupProfile?.isIncubated && <IncubatedBadge cohort={e.startupProfile.cohortName} />}
            {e.startupProfile?.seekingFunding && (
              <FundingBadge amount={e.startupProfile.fundingTarget ? formatXAF(e.startupProfile.fundingTarget) : undefined} />
            )}
          </div>
        )}

        {/* INFORMATIONS LÉGALES */}
        <section className="mb-8">
          <h2 className="text-sm font-bold text-gray-400 uppercase tracking-wider mb-3">{tr('ann.legal_info')}</h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {[
              { label: 'RCCM', value: e.rccm, field: 'rccm' },
              { label: 'NIF', value: e.nif, field: 'nif' },
              { label: tr('ann.legal_form'), value: e.legalForm, field: '' },
            ].map((item) => (
              <div key={item.label} className="bg-gray-50 dark:bg-gray-800/50 rounded-xl px-4 py-3">
                <div className="text-xs text-gray-400 font-medium mb-1">{item.label}</div>
                <div className="flex items-center gap-2">
                  <span className="font-mono text-sm text-gray-800 dark:text-gray-200">{item.value}</span>
                  {item.field && (
                    <button
                      onClick={() => copy(item.field, item.value)}
                      className="text-gray-400 hover:text-emerald-500 bg-transparent border-none cursor-pointer p-0 transition-colors"
                      title="Copy"
                    >
                      {copiedField === item.field ? <Check size={14} className="text-emerald-500" /> : <Copy size={14} />}
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* DESCRIPTION */}
        <section className="mb-8">
          <h2 className="text-sm font-bold text-gray-400 uppercase tracking-wider mb-3">{tr('ann.description')}</h2>
          <p className="text-gray-700 dark:text-gray-300 leading-relaxed m-0">{e.description}</p>
        </section>

        {/* COORDONNÉES */}
        <section className="mb-8">
          <h2 className="text-sm font-bold text-gray-400 uppercase tracking-wider mb-3">{tr('ann.contact')}</h2>
          <div className="space-y-2">
            <div className="flex items-center gap-2 text-sm text-gray-700 dark:text-gray-300">
              <MapPin size={16} className="text-gray-400 shrink-0" />
              {e.address.street}, {e.address.city}, {e.address.province}
            </div>
            {e.phone && (
              <div className="flex items-center gap-2 text-sm text-gray-700 dark:text-gray-300">
                <Phone size={16} className="text-gray-400 shrink-0" />
                {e.phone}
              </div>
            )}
            {e.email && (
              <div className="flex items-center gap-2 text-sm">
                <Mail size={16} className="text-gray-400 shrink-0" />
                <a href={`mailto:${e.email}`} className="text-emerald-600 dark:text-emerald-400 hover:underline">{e.email}</a>
              </div>
            )}
            {e.website && (
              <div className="flex items-center gap-2 text-sm">
                <Globe size={16} className="text-gray-400 shrink-0" />
                <a href={e.website} target="_blank" rel="noopener noreferrer" className="text-emerald-600 dark:text-emerald-400 hover:underline">{e.website}</a>
              </div>
            )}
          </div>
        </section>

        {/* SECTEUR & TAGS */}
        <section className="mb-8">
          <h2 className="text-sm font-bold text-gray-400 uppercase tracking-wider mb-3">{tr('ann.sector_tags')}</h2>
          <div className="flex flex-wrap gap-2">
            <span
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-sm font-semibold"
              style={{ background: `${sectorColor}15`, color: sectorColor }}
            >
              {e.sector.icon} {e.sector.name}
            </span>
            {e.tags.map((tag) => (
              <span key={tag} className="px-3 py-1.5 rounded-full text-xs font-medium bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400">
                {tag}
              </span>
            ))}
          </div>
        </section>

        {/* STARTUP PROFILE (digital ecosystem only) */}
        {e.isDigitalEcosystem && e.startupProfile && (
          <section className="mb-8 bg-purple-50/50 dark:bg-purple-950/10 rounded-2xl p-6 border border-purple-100 dark:border-purple-900/30">
            <h2 className="text-sm font-bold text-purple-600 dark:text-purple-400 uppercase tracking-wider mb-4">{tr('ann.startup_profile')}</h2>

            <div className="space-y-3">
              <div>
                <div className="text-xs text-gray-400 font-medium">Pitch</div>
                <p className="text-gray-800 dark:text-gray-200 italic m-0 mt-1">&ldquo;{e.startupProfile.pitch}&rdquo;</p>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                <div className="bg-white dark:bg-gray-900 rounded-xl p-3">
                  <div className="text-xs text-gray-400">{tr('ann.category')}</div>
                  <div className="text-sm font-semibold text-gray-800 dark:text-gray-200 mt-1">{e.digitalCategory}</div>
                </div>
                <div className="bg-white dark:bg-gray-900 rounded-xl p-3">
                  <div className="text-xs text-gray-400">{tr('ann.team')}</div>
                  <div className="text-sm font-semibold text-gray-800 dark:text-gray-200 mt-1">{e.startupProfile.teamSize} {tr('ann.people')}</div>
                </div>
                <div className="bg-white dark:bg-gray-900 rounded-xl p-3">
                  <div className="text-xs text-gray-400">{tr('ann.stage')}</div>
                  <div className="text-sm font-semibold text-gray-800 dark:text-gray-200 mt-1">{e.startupProfile.fundingStage}</div>
                </div>
                {e.startupProfile.seekingFunding && e.startupProfile.fundingTarget && (
                  <div className="bg-white dark:bg-gray-900 rounded-xl p-3">
                    <div className="text-xs text-gray-400">{tr('ann.seeking')}</div>
                    <div className="text-sm font-semibold text-amber-600 dark:text-amber-400 mt-1">{formatXAF(e.startupProfile.fundingTarget)}</div>
                  </div>
                )}
              </div>

              {e.startupProfile.isIncubated && e.startupProfile.cohortName && (
                <div className="text-sm text-gray-600 dark:text-gray-400">
                  🎓 {tr('ann.incubated')} — <strong>{e.startupProfile.cohortName}</strong>
                </div>
              )}

              {/* Solutions */}
              {e.startupProfile.solutions.length > 0 && (
                <div className="mt-4">
                  <h3 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">{tr('ann.solutions')}</h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {e.startupProfile.solutions.map((sol) => (
                      <div key={sol.name} className="bg-white dark:bg-gray-900 rounded-xl p-3 border border-gray-100 dark:border-gray-800">
                        <div className="font-semibold text-sm text-gray-800 dark:text-gray-200">{sol.name}</div>
                        <div className="text-xs text-gray-500 mt-0.5">{sol.category}</div>
                        <div className="mt-1">
                          <RatingStars rating={sol.rating} />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </section>
        )}

        {/* PUBLIC STATS */}
        {(e.publicStats.tenderParticipations || e.publicStats.innovationHubSolutions || e.publicStats.averageRating) && (
          <section className="mb-8">
            <h2 className="text-sm font-bold text-gray-400 uppercase tracking-wider mb-3">{tr('ann.public_stats')}</h2>
            <div className="flex flex-wrap gap-3">
              {e.publicStats.tenderParticipations != null && (
                <div className="px-4 py-2 rounded-xl bg-blue-50 dark:bg-blue-950/20 text-blue-700 dark:text-blue-300 text-sm font-medium">
                  📋 {e.publicStats.tenderParticipations} {tr('ann.tender_part')}
                </div>
              )}
              {e.publicStats.tendersWon != null && e.publicStats.tendersWon > 0 && (
                <div className="px-4 py-2 rounded-xl bg-emerald-50 dark:bg-emerald-950/20 text-emerald-700 dark:text-emerald-300 text-sm font-medium">
                  🏆 {e.publicStats.tendersWon} {tr('ann.tenders_won')}
                </div>
              )}
              {e.publicStats.innovationHubSolutions != null && (
                <div className="px-4 py-2 rounded-xl bg-purple-50 dark:bg-purple-950/20 text-purple-700 dark:text-purple-300 text-sm font-medium">
                  💡 {e.publicStats.innovationHubSolutions} {tr('ann.hub_solutions')} Hub
                </div>
              )}
              {e.publicStats.averageRating != null && (
                <div className="px-4 py-2 rounded-xl bg-amber-50 dark:bg-amber-950/20 text-amber-700 dark:text-amber-300 text-sm font-medium">
                  ⭐ {e.publicStats.averageRating.toFixed(1)} {tr('ann.avg_rating')}
                </div>
              )}
            </div>
          </section>
        )}

        {/* ACTIONS */}
        <div className="flex flex-wrap gap-3 pt-6 border-t border-gray-100 dark:border-gray-800">
          <Link
            href="/login"
            className="px-5 py-2.5 rounded-xl text-sm font-semibold text-white bg-emerald-600 hover:bg-emerald-700 no-underline transition-colors"
          >
            {tr('ann.login_contact')}
          </Link>
          <button
            onClick={() => {
              navigator.clipboard.writeText(window.location.href);
            }}
            className="px-5 py-2.5 rounded-xl text-sm font-semibold text-gray-700 dark:text-gray-300 bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 border-none cursor-pointer transition-colors"
          >
            {tr('ann.share')}
          </button>
        </div>
      </div>
    </div>
  );
}
