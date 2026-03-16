// GABON BIZ — Onboarding Page
// Shown after first login via IDENTITE.GA
// User starts as Citoyen (PUBLIC) and can optionally activate a business profile
'use client';

import { useState } from 'react';
import { useAuth } from '@/lib/auth-context';
import { PROFILE_DEFINITIONS, REQUESTABLE_PROFILES, type ProfileType } from '@/lib/profiles';
import { useI18n } from '@/lib/i18n/i18nContext';

type Step = 'welcome' | 'choose' | 'details' | 'complete';

export default function OnboardingPage() {
  const { user } = useAuth();
  const { tr } = useI18n();
  const [step, setStep] = useState<Step>('welcome');
  const [selectedProfile, setSelectedProfile] = useState<ProfileType | null>(null);
  const [metadata, setMetadata] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [resultMessage, setResultMessage] = useState('');

  const userName =
    user?.given_name || user?.fullName?.split(' ')[0] || tr('onb.citizen_title').split(' ')[0];

  async function handleComplete() {
    setIsSubmitting(true);
    try {
      const res = await fetch('/api/profiles/onboarding', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          profileType: selectedProfile,
          metadata: selectedProfile ? metadata : undefined,
        }),
      });
      const data = await res.json();
      if (data.success) {
        const profileDef = selectedProfile ? PROFILE_DEFINITIONS[selectedProfile] : null;
        if (selectedProfile === 'ENTREPRENEUR') {
          setResultMessage(tr('onb.result_entrepreneur'));
        } else if (selectedProfile === 'STARTUP' || selectedProfile === 'INVESTOR') {
          setResultMessage(tr('onb.result_pending').replace('{profile}', profileDef?.label || ''));
        } else {
          setResultMessage(tr('onb.result_citizen'));
        }
        setStep('complete');
      }
    } catch {
      setResultMessage(tr('onb.error'));
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <div style={styles.container}>
      <div style={styles.bgGlow1} />
      <div style={styles.bgGlow2} />

      <div style={styles.card}>
        {/* Progress dots */}
        <div style={styles.progress}>
          {(['welcome', 'choose', 'details', 'complete'] as Step[]).map((s, i) => (
            <div
              key={s}
              style={{
                ...styles.dot,
                background:
                  i <= ['welcome', 'choose', 'details', 'complete'].indexOf(step)
                    ? '#009E49'
                    : '#E0E0E0',
              }}
            />
          ))}
        </div>

        {/* ── Step 1: Welcome ──────────────────────────────────── */}
        {step === 'welcome' && (
          <div style={styles.stepContent}>
            <div style={styles.welcomeIcon}>🇬🇦</div>
            <h1 style={styles.title}>
              {tr('onb.welcome_title')} {userName} !
            </h1>
            <p style={styles.subtitle}>
              {tr('onb.welcome_desc')} <strong style={{ color: '#009E49' }}>IDENTITE.GA</strong>.
              {tr('onb.welcome_desc2')} <strong>{tr('onb.citizen_title').split(' ')[0]}</strong>{' '}
              {tr('onb.welcome_desc3')}
            </p>

            <div style={styles.citizenCard}>
              <div style={styles.citizenIcon}>👤</div>
              <div>
                <div style={styles.citizenLabel}>{tr('onb.auto_profile')}</div>
                <div style={styles.citizenTitle}>{tr('onb.citizen_title')}</div>
                <div style={styles.citizenDesc}>{tr('onb.citizen_desc')}</div>
              </div>
            </div>

            <button style={styles.primaryBtn} onClick={() => setStep('choose')}>
              {tr('onb.continue')}
            </button>
            <button
              style={styles.skipBtn}
              onClick={() => {
                setSelectedProfile(null);
                handleComplete();
              }}
            >
              {tr('onb.stay_citizen')}
            </button>
          </div>
        )}

        {/* ── Step 2: Choose profile ───────────────────────────── */}
        {step === 'choose' && (
          <div style={styles.stepContent}>
            <h1 style={styles.title}>{tr('onb.choose_title')}</h1>
            <p style={styles.subtitle}>{tr('onb.choose_desc')}</p>

            <div style={styles.profileGrid}>
              {REQUESTABLE_PROFILES.map((type) => {
                const def = PROFILE_DEFINITIONS[type];
                const isSelected = selectedProfile === type;
                return (
                  <button
                    key={type}
                    style={{
                      ...styles.profileCard,
                      borderColor: isSelected ? def.color : '#E5E7EB',
                      background: isSelected ? def.bgColor : 'white',
                      boxShadow: isSelected ? `0 0 0 2px ${def.color}20` : 'none',
                    }}
                    onClick={() => setSelectedProfile(isSelected ? null : type)}
                  >
                    <div style={{ fontSize: '32px', marginBottom: '8px' }}>{def.icon}</div>
                    <div style={{ fontWeight: 700, fontSize: '15px', color: def.color }}>
                      {def.label}
                    </div>
                    <div
                      style={{
                        fontSize: '12px',
                        color: '#6B7280',
                        marginTop: '4px',
                        lineHeight: '1.4',
                      }}
                    >
                      {def.description.slice(0, 80)}...
                    </div>
                    {def.level === 2 && (
                      <div style={styles.validationBadge}>{tr('onb.validation_required')}</div>
                    )}
                    {def.level === 1 && (
                      <div
                        style={{
                          ...styles.validationBadge,
                          background: '#ECFDF5',
                          color: '#059669',
                        }}
                      >
                        {tr('onb.instant_activation')}
                      </div>
                    )}
                  </button>
                );
              })}
            </div>

            <div style={styles.btnRow}>
              <button style={styles.backBtn} onClick={() => setStep('welcome')}>
                {tr('onb.back')}
              </button>
              <button
                style={styles.primaryBtn}
                onClick={() => (selectedProfile ? setStep('details') : handleComplete())}
              >
                {selectedProfile ? tr('onb.continue') : tr('onb.stay_citizen_btn')}
              </button>
            </div>
          </div>
        )}

        {/* ── Step 3: Details ──────────────────────────────────── */}
        {step === 'details' && selectedProfile && (
          <div style={styles.stepContent}>
            <div style={{ fontSize: '40px', marginBottom: '12px' }}>
              {PROFILE_DEFINITIONS[selectedProfile].icon}
            </div>
            <h1 style={styles.title}>
              {tr('onb.activation')} {PROFILE_DEFINITIONS[selectedProfile].label}
            </h1>

            {selectedProfile === 'ENTREPRENEUR' && (
              <div style={styles.formGroup}>
                <label style={styles.label}>{tr('onb.company_name')}</label>
                <input
                  style={styles.input}
                  placeholder="Ex: Mbadinga Technologies SARL"
                  value={metadata.companyName || ''}
                  onChange={(e) => setMetadata({ ...metadata, companyName: e.target.value })}
                />
                <label style={styles.label}>{tr('onb.rccm_optional')}</label>
                <input
                  style={styles.input}
                  placeholder="Ex: GA-LBV-2024-B-12345"
                  value={metadata.rccm || ''}
                  onChange={(e) => setMetadata({ ...metadata, rccm: e.target.value })}
                />
                <label style={styles.label}>{tr('onb.sector')}</label>
                <select
                  style={styles.input}
                  value={metadata.sector || ''}
                  onChange={(e) => setMetadata({ ...metadata, sector: e.target.value })}
                >
                  <option value="">Choisir...</option>
                  <option value="tech">Technologies / Numérique</option>
                  <option value="agri">Agriculture / Agro-industrie</option>
                  <option value="commerce">Commerce / Distribution</option>
                  <option value="services">Services / Conseil</option>
                  <option value="industrie">Industrie / Production</option>
                  <option value="btp">BTP / Construction</option>
                  <option value="transport">Transport / Logistique</option>
                  <option value="sante">Santé / Pharmacie</option>
                  <option value="education">Éducation / Formation</option>
                  <option value="tourisme">Tourisme / Hôtellerie</option>
                  <option value="autre">Autre</option>
                </select>
                <label style={styles.label}>{tr('onb.city')}</label>
                <select
                  style={styles.input}
                  value={metadata.city || ''}
                  onChange={(e) => setMetadata({ ...metadata, city: e.target.value })}
                >
                  <option value="">Choisir...</option>
                  <option value="libreville">Libreville</option>
                  <option value="port-gentil">Port-Gentil</option>
                  <option value="franceville">Franceville</option>
                  <option value="oyem">Oyem</option>
                  <option value="moanda">Moanda</option>
                  <option value="lambarene">Lambaréné</option>
                  <option value="mouila">Mouila</option>
                  <option value="tchibanga">Tchibanga</option>
                  <option value="autre">Autre</option>
                </select>
              </div>
            )}

            {selectedProfile === 'STARTUP' && (
              <div style={styles.formGroup}>
                <label style={styles.label}>{tr('onb.startup_name')}</label>
                <input
                  style={styles.input}
                  placeholder="Ex: TechPay Solutions"
                  value={metadata.startupName || ''}
                  onChange={(e) => setMetadata({ ...metadata, startupName: e.target.value })}
                />
                <label style={styles.label}>{tr('onb.short_desc')}</label>
                <textarea
                  style={{ ...styles.input, minHeight: '80px', resize: 'vertical' as const }}
                  placeholder="Décrivez votre projet en quelques lignes..."
                  value={metadata.description || ''}
                  onChange={(e) => setMetadata({ ...metadata, description: e.target.value })}
                />
                <label style={styles.label}>{tr('onb.dev_stage')}</label>
                <select
                  style={styles.input}
                  value={metadata.stage || ''}
                  onChange={(e) => setMetadata({ ...metadata, stage: e.target.value })}
                >
                  <option value="">Choisir...</option>
                  <option value="ideation">Idéation</option>
                  <option value="mvp">MVP / Prototype</option>
                  <option value="early">Traction initiale</option>
                  <option value="growth">Croissance</option>
                  <option value="scale">Mise à l&apos;échelle</option>
                </select>
                <label style={styles.label}>{tr('onb.sector')}</label>
                <select
                  style={styles.input}
                  value={metadata.sector || ''}
                  onChange={(e) => setMetadata({ ...metadata, sector: e.target.value })}
                >
                  <option value="">Choisir...</option>
                  <option value="fintech">Fintech</option>
                  <option value="agritech">Agritech</option>
                  <option value="healthtech">Healthtech</option>
                  <option value="edtech">Edtech</option>
                  <option value="cleantech">Cleantech</option>
                  <option value="ecommerce">E-commerce</option>
                  <option value="saas">SaaS / B2B</option>
                  <option value="autre">Autre</option>
                </select>
                <div style={styles.infoBox}>{tr('onb.startup_info')}</div>
              </div>
            )}

            {selectedProfile === 'INVESTOR' && (
              <div style={styles.formGroup}>
                <label style={styles.label}>{tr('onb.invest_structure')}</label>
                <input
                  style={styles.input}
                  placeholder="Ex: Ndong Capital Partners"
                  value={metadata.fundName || ''}
                  onChange={(e) => setMetadata({ ...metadata, fundName: e.target.value })}
                />
                <label style={styles.label}>{tr('onb.investor_type')}</label>
                <select
                  style={styles.input}
                  value={metadata.investorType || ''}
                  onChange={(e) => setMetadata({ ...metadata, investorType: e.target.value })}
                >
                  <option value="">Choisir...</option>
                  <option value="vc">Fonds de capital-risque (VC)</option>
                  <option value="ba">Business Angel</option>
                  <option value="family">Family Office</option>
                  <option value="corporate">Corporate Venture</option>
                  <option value="dfi">DFI / Institution financière</option>
                  <option value="autre">Autre</option>
                </select>
                <label style={styles.label}>{tr('onb.target_sectors')}</label>
                <input
                  style={styles.input}
                  placeholder="Ex: Fintech, Agritech, Cleantech"
                  value={metadata.targetSectors || ''}
                  onChange={(e) => setMetadata({ ...metadata, targetSectors: e.target.value })}
                />
                <label style={styles.label}>{tr('onb.avg_ticket')}</label>
                <select
                  style={styles.input}
                  value={metadata.ticketSize || ''}
                  onChange={(e) => setMetadata({ ...metadata, ticketSize: e.target.value })}
                >
                  <option value="">Choisir...</option>
                  <option value="5m-25m">5M - 25M FCFA</option>
                  <option value="25m-100m">25M - 100M FCFA</option>
                  <option value="100m-500m">100M - 500M FCFA</option>
                  <option value="500m+">500M+ FCFA</option>
                </select>
                <div style={styles.infoBox}>{tr('onb.investor_info')}</div>
              </div>
            )}

            <div style={styles.btnRow}>
              <button style={styles.backBtn} onClick={() => setStep('choose')}>
                {tr('onb.back')}
              </button>
              <button style={styles.primaryBtn} onClick={handleComplete} disabled={isSubmitting}>
                {isSubmitting
                  ? tr('onb.submitting')
                  : selectedProfile === 'ENTREPRENEUR'
                    ? tr('onb.activate_profile')
                    : tr('onb.submit_request')}
              </button>
            </div>
          </div>
        )}

        {/* ── Step 4: Complete ─────────────────────────────────── */}
        {step === 'complete' && (
          <div style={styles.stepContent}>
            <div style={{ fontSize: '48px', marginBottom: '16px' }}>
              {selectedProfile && PROFILE_DEFINITIONS[selectedProfile]
                ? PROFILE_DEFINITIONS[selectedProfile].icon
                : '✅'}
            </div>
            <h1 style={styles.title}>{tr('onb.done')}</h1>
            <p style={styles.subtitle}>{resultMessage}</p>

            {selectedProfile && (
              <div
                style={{
                  ...styles.citizenCard,
                  borderColor: PROFILE_DEFINITIONS[selectedProfile]?.color || '#009E49',
                  background: PROFILE_DEFINITIONS[selectedProfile]?.bgColor || '#F0FFF4',
                }}
              >
                <div style={styles.citizenIcon}>{PROFILE_DEFINITIONS[selectedProfile]?.icon}</div>
                <div>
                  <div
                    style={{ fontWeight: 700, color: PROFILE_DEFINITIONS[selectedProfile]?.color }}
                  >
                    {PROFILE_DEFINITIONS[selectedProfile]?.label}
                  </div>
                  <div style={{ fontSize: '12px', color: '#6B7280' }}>
                    {selectedProfile === 'ENTREPRENEUR' ? tr('onb.active') : tr('onb.pending')}
                  </div>
                </div>
              </div>
            )}

            <a
              href="/dashboard"
              style={{
                ...styles.primaryBtn,
                textDecoration: 'none',
                display: 'block',
                textAlign: 'center',
              }}
            >
              {tr('onb.go_dashboard')}
            </a>
          </div>
        )}
      </div>
    </div>
  );
}

// ── Styles ─────────────────────────────────────────────────────
const styles: Record<string, React.CSSProperties> = {
  container: {
    minHeight: '100vh',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    background: 'linear-gradient(135deg, #1a1a2e 0%, #16213e 50%, #0f3460 100%)',
    padding: '20px',
    position: 'relative',
    overflow: 'hidden',
  },
  bgGlow1: {
    position: 'absolute',
    top: '-20%',
    right: '-10%',
    width: '600px',
    height: '600px',
    borderRadius: '50%',
    background: 'radial-gradient(circle, rgba(0,158,73,0.12) 0%, transparent 70%)',
    pointerEvents: 'none',
  },
  bgGlow2: {
    position: 'absolute',
    bottom: '-15%',
    left: '-10%',
    width: '500px',
    height: '500px',
    borderRadius: '50%',
    background: 'radial-gradient(circle, rgba(230,126,34,0.1) 0%, transparent 70%)',
    pointerEvents: 'none',
  },
  card: {
    background: 'white',
    borderRadius: '24px',
    padding: '40px 32px',
    maxWidth: '560px',
    width: '100%',
    boxShadow: '0 25px 60px rgba(0,0,0,0.3)',
    position: 'relative',
    zIndex: 1,
  },
  progress: {
    display: 'flex',
    justifyContent: 'center',
    gap: '8px',
    marginBottom: '28px',
  },
  dot: {
    width: '8px',
    height: '8px',
    borderRadius: '50%',
    transition: 'background 0.3s',
  },
  stepContent: {
    textAlign: 'center' as const,
  },
  welcomeIcon: { fontSize: '48px', marginBottom: '16px' },
  title: {
    fontSize: '24px',
    fontWeight: 700,
    color: '#1F2937',
    marginBottom: '12px',
  },
  subtitle: {
    fontSize: '14px',
    color: '#6B7280',
    lineHeight: '1.6',
    marginBottom: '24px',
    maxWidth: '420px',
    margin: '0 auto 24px',
  },
  citizenCard: {
    display: 'flex',
    alignItems: 'center',
    gap: '14px',
    padding: '16px',
    borderRadius: '12px',
    border: '2px solid #D1D5DB',
    background: '#F9FAFB',
    marginBottom: '24px',
    textAlign: 'left' as const,
  },
  citizenIcon: { fontSize: '28px', flexShrink: 0 },
  citizenLabel: {
    fontSize: '11px',
    color: '#9CA3AF',
    fontWeight: 500,
    textTransform: 'uppercase' as const,
    letterSpacing: '0.5px',
  },
  citizenTitle: { fontSize: '16px', fontWeight: 700, color: '#1F2937' },
  citizenDesc: { fontSize: '12px', color: '#6B7280', lineHeight: '1.4', marginTop: '2px' },
  primaryBtn: {
    width: '100%',
    padding: '14px',
    border: 'none',
    borderRadius: '12px',
    background: 'linear-gradient(135deg, #009E49, #00783A)',
    color: 'white',
    fontSize: '15px',
    fontWeight: 600,
    cursor: 'pointer',
  },
  skipBtn: {
    width: '100%',
    padding: '12px',
    border: 'none',
    borderRadius: '10px',
    background: 'transparent',
    color: '#9CA3AF',
    fontSize: '13px',
    cursor: 'pointer',
    marginTop: '8px',
  },
  backBtn: {
    padding: '14px 24px',
    border: '1px solid #E5E7EB',
    borderRadius: '12px',
    background: 'white',
    color: '#6B7280',
    fontSize: '14px',
    cursor: 'pointer',
    fontWeight: 500,
  },
  btnRow: {
    display: 'flex',
    gap: '12px',
    marginTop: '24px',
  },
  profileGrid: {
    display: 'flex',
    flexDirection: 'column' as const,
    gap: '12px',
    marginBottom: '0',
  },
  profileCard: {
    display: 'flex',
    flexDirection: 'column' as const,
    alignItems: 'center',
    padding: '20px 16px',
    borderRadius: '14px',
    border: '2px solid #E5E7EB',
    cursor: 'pointer',
    transition: 'all 0.2s',
    textAlign: 'center' as const,
    width: '100%',
    background: 'white',
  },
  validationBadge: {
    marginTop: '8px',
    padding: '3px 10px',
    borderRadius: '6px',
    fontSize: '10px',
    fontWeight: 600,
    background: '#FFF7ED',
    color: '#D97706',
  },
  formGroup: {
    display: 'flex',
    flexDirection: 'column' as const,
    gap: '12px',
    textAlign: 'left' as const,
    marginBottom: '0',
  },
  label: {
    fontSize: '13px',
    fontWeight: 600,
    color: '#374151',
  },
  input: {
    width: '100%',
    padding: '10px 14px',
    borderRadius: '10px',
    border: '1.5px solid #D1D5DB',
    fontSize: '14px',
    outline: 'none',
    fontFamily: 'inherit',
  },
  infoBox: {
    padding: '12px 16px',
    borderRadius: '10px',
    background: '#EFF6FF',
    border: '1px solid #BFDBFE',
    fontSize: '12px',
    color: '#1D4ED8',
    lineHeight: '1.5',
  },
};
