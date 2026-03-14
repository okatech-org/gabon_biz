// GABON BIZ — Onboarding Page
// Shown after first login via IDENTITE.GA
// User starts as Citoyen (PUBLIC) and can optionally activate a business profile
'use client';

import { useState } from 'react';
import { useAuth } from '@/lib/auth-context';
import { PROFILE_DEFINITIONS, REQUESTABLE_PROFILES, type ProfileType } from '@/lib/profiles';

type Step = 'welcome' | 'choose' | 'details' | 'complete';

export default function OnboardingPage() {
  const { user } = useAuth();
  const [step, setStep] = useState<Step>('welcome');
  const [selectedProfile, setSelectedProfile] = useState<ProfileType | null>(null);
  const [metadata, setMetadata] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [resultMessage, setResultMessage] = useState('');

  const userName = user?.given_name || user?.fullName?.split(' ')[0] || 'Citoyen';

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
          setResultMessage(`Votre profil Entrepreneur a été activé ! Vous pouvez maintenant accéder au Guichet Unique et aux Marchés Publics.`);
        } else if (selectedProfile === 'STARTUP' || selectedProfile === 'INVESTOR') {
          setResultMessage(`Votre demande de profil ${profileDef?.label} a été soumise. Un administrateur MENUDI l'examinera sous 48h.`);
        } else {
          setResultMessage('Votre compte Citoyen est prêt !');
        }
        setStep('complete');
      }
    } catch {
      setResultMessage('Une erreur est survenue. Veuillez réessayer.');
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
                background: i <= ['welcome', 'choose', 'details', 'complete'].indexOf(step) ? '#009E49' : '#E0E0E0',
              }}
            />
          ))}
        </div>

        {/* ── Step 1: Welcome ──────────────────────────────────── */}
        {step === 'welcome' && (
          <div style={styles.stepContent}>
            <div style={styles.welcomeIcon}>🇬🇦</div>
            <h1 style={styles.title}>
              Bienvenue sur GABON BIZ, {userName} !
            </h1>
            <p style={styles.subtitle}>
              Votre identité a été vérifiée via <strong style={{ color: '#009E49' }}>IDENTITE.GA</strong>.
              Vous disposez maintenant d&apos;un compte <strong>Citoyen</strong> qui vous donne accès
              à l&apos;écosystème économique numérique du Gabon.
            </p>

            <div style={styles.citizenCard}>
              <div style={styles.citizenIcon}>👤</div>
              <div>
                <div style={styles.citizenLabel}>Profil activé automatiquement</div>
                <div style={styles.citizenTitle}>Citoyen / Public</div>
                <div style={styles.citizenDesc}>
                  Annuaire des entreprises, Observatoire économique, Marchés publics en consultation, Filières
                </div>
              </div>
            </div>

            <button style={styles.primaryBtn} onClick={() => setStep('choose')}>
              Continuer
            </button>
            <button style={styles.skipBtn} onClick={() => { setSelectedProfile(null); handleComplete(); }}>
              Rester en tant que Citoyen
            </button>
          </div>
        )}

        {/* ── Step 2: Choose profile ───────────────────────────── */}
        {step === 'choose' && (
          <div style={styles.stepContent}>
            <h1 style={styles.title}>Quel est votre profil ?</h1>
            <p style={styles.subtitle}>
              Vous pouvez activer un ou plusieurs profils métier pour accéder à des fonctionnalités avancées.
              Vous pourrez toujours en ajouter d&apos;autres plus tard.
            </p>

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
                    <div style={{ fontWeight: 700, fontSize: '15px', color: def.color }}>{def.label}</div>
                    <div style={{ fontSize: '12px', color: '#6B7280', marginTop: '4px', lineHeight: '1.4' }}>
                      {def.description.slice(0, 80)}...
                    </div>
                    {def.level === 2 && (
                      <div style={styles.validationBadge}>Validation requise</div>
                    )}
                    {def.level === 1 && (
                      <div style={{ ...styles.validationBadge, background: '#ECFDF5', color: '#059669' }}>
                        Activation immédiate
                      </div>
                    )}
                  </button>
                );
              })}
            </div>

            <div style={styles.btnRow}>
              <button style={styles.backBtn} onClick={() => setStep('welcome')}>Retour</button>
              <button
                style={styles.primaryBtn}
                onClick={() => selectedProfile ? setStep('details') : handleComplete()}
              >
                {selectedProfile ? 'Continuer' : 'Rester Citoyen'}
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
              Activation : {PROFILE_DEFINITIONS[selectedProfile].label}
            </h1>

            {selectedProfile === 'ENTREPRENEUR' && (
              <div style={styles.formGroup}>
                <label style={styles.label}>Nom de l&apos;entreprise</label>
                <input
                  style={styles.input}
                  placeholder="Ex: Mbadinga Technologies SARL"
                  value={metadata.companyName || ''}
                  onChange={(e) => setMetadata({ ...metadata, companyName: e.target.value })}
                />
                <label style={styles.label}>Numéro RCCM (optionnel)</label>
                <input
                  style={styles.input}
                  placeholder="Ex: GA-LBV-2024-B-12345"
                  value={metadata.rccm || ''}
                  onChange={(e) => setMetadata({ ...metadata, rccm: e.target.value })}
                />
                <label style={styles.label}>Secteur d&apos;activité</label>
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
                <label style={styles.label}>Ville</label>
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
                <label style={styles.label}>Nom du projet / startup</label>
                <input
                  style={styles.input}
                  placeholder="Ex: TechPay Solutions"
                  value={metadata.startupName || ''}
                  onChange={(e) => setMetadata({ ...metadata, startupName: e.target.value })}
                />
                <label style={styles.label}>Description courte</label>
                <textarea
                  style={{ ...styles.input, minHeight: '80px', resize: 'vertical' as const }}
                  placeholder="Décrivez votre projet en quelques lignes..."
                  value={metadata.description || ''}
                  onChange={(e) => setMetadata({ ...metadata, description: e.target.value })}
                />
                <label style={styles.label}>Stade de développement</label>
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
                <label style={styles.label}>Secteur</label>
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
                <div style={styles.infoBox}>
                  Votre candidature sera examinée par l&apos;équipe Innovation Hub.
                  Vous recevrez une notification sous 48h.
                </div>
              </div>
            )}

            {selectedProfile === 'INVESTOR' && (
              <div style={styles.formGroup}>
                <label style={styles.label}>Structure d&apos;investissement</label>
                <input
                  style={styles.input}
                  placeholder="Ex: Ndong Capital Partners"
                  value={metadata.fundName || ''}
                  onChange={(e) => setMetadata({ ...metadata, fundName: e.target.value })}
                />
                <label style={styles.label}>Type d&apos;investisseur</label>
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
                <label style={styles.label}>Secteurs cibles</label>
                <input
                  style={styles.input}
                  placeholder="Ex: Fintech, Agritech, Cleantech"
                  value={metadata.targetSectors || ''}
                  onChange={(e) => setMetadata({ ...metadata, targetSectors: e.target.value })}
                />
                <label style={styles.label}>Ticket moyen (FCFA)</label>
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
                <div style={styles.infoBox}>
                  Votre dossier sera examiné par l&apos;équipe MENUDI.
                  Une vérification renforcée sera effectuée.
                </div>
              </div>
            )}

            <div style={styles.btnRow}>
              <button style={styles.backBtn} onClick={() => setStep('choose')}>Retour</button>
              <button style={styles.primaryBtn} onClick={handleComplete} disabled={isSubmitting}>
                {isSubmitting ? 'Envoi en cours...' : selectedProfile === 'ENTREPRENEUR' ? 'Activer le profil' : 'Soumettre la demande'}
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
            <h1 style={styles.title}>C&apos;est fait !</h1>
            <p style={styles.subtitle}>{resultMessage}</p>

            {selectedProfile && (
              <div style={{
                ...styles.citizenCard,
                borderColor: PROFILE_DEFINITIONS[selectedProfile]?.color || '#009E49',
                background: PROFILE_DEFINITIONS[selectedProfile]?.bgColor || '#F0FFF4',
              }}>
                <div style={styles.citizenIcon}>
                  {PROFILE_DEFINITIONS[selectedProfile]?.icon}
                </div>
                <div>
                  <div style={{ fontWeight: 700, color: PROFILE_DEFINITIONS[selectedProfile]?.color }}>
                    {PROFILE_DEFINITIONS[selectedProfile]?.label}
                  </div>
                  <div style={{ fontSize: '12px', color: '#6B7280' }}>
                    {selectedProfile === 'ENTREPRENEUR' ? 'Actif' : 'En attente de validation'}
                  </div>
                </div>
              </div>
            )}

            <a href="/dashboard" style={{ ...styles.primaryBtn, textDecoration: 'none', display: 'block', textAlign: 'center' }}>
              Accéder au tableau de bord
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
    position: 'absolute', top: '-20%', right: '-10%',
    width: '600px', height: '600px', borderRadius: '50%',
    background: 'radial-gradient(circle, rgba(0,158,73,0.12) 0%, transparent 70%)',
    pointerEvents: 'none',
  },
  bgGlow2: {
    position: 'absolute', bottom: '-15%', left: '-10%',
    width: '500px', height: '500px', borderRadius: '50%',
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
    display: 'flex', justifyContent: 'center', gap: '8px', marginBottom: '28px',
  },
  dot: {
    width: '8px', height: '8px', borderRadius: '50%', transition: 'background 0.3s',
  },
  stepContent: {
    textAlign: 'center' as const,
  },
  welcomeIcon: { fontSize: '48px', marginBottom: '16px' },
  title: {
    fontSize: '24px', fontWeight: 700, color: '#1F2937', marginBottom: '12px',
  },
  subtitle: {
    fontSize: '14px', color: '#6B7280', lineHeight: '1.6', marginBottom: '24px', maxWidth: '420px', margin: '0 auto 24px',
  },
  citizenCard: {
    display: 'flex', alignItems: 'center', gap: '14px',
    padding: '16px', borderRadius: '12px',
    border: '2px solid #D1D5DB', background: '#F9FAFB',
    marginBottom: '24px', textAlign: 'left' as const,
  },
  citizenIcon: { fontSize: '28px', flexShrink: 0 },
  citizenLabel: { fontSize: '11px', color: '#9CA3AF', fontWeight: 500, textTransform: 'uppercase' as const, letterSpacing: '0.5px' },
  citizenTitle: { fontSize: '16px', fontWeight: 700, color: '#1F2937' },
  citizenDesc: { fontSize: '12px', color: '#6B7280', lineHeight: '1.4', marginTop: '2px' },
  primaryBtn: {
    width: '100%', padding: '14px', border: 'none', borderRadius: '12px',
    background: 'linear-gradient(135deg, #009E49, #00783A)',
    color: 'white', fontSize: '15px', fontWeight: 600, cursor: 'pointer',
  },
  skipBtn: {
    width: '100%', padding: '12px', border: 'none', borderRadius: '10px',
    background: 'transparent', color: '#9CA3AF', fontSize: '13px',
    cursor: 'pointer', marginTop: '8px',
  },
  backBtn: {
    padding: '14px 24px', border: '1px solid #E5E7EB', borderRadius: '12px',
    background: 'white', color: '#6B7280', fontSize: '14px', cursor: 'pointer', fontWeight: 500,
  },
  btnRow: {
    display: 'flex', gap: '12px', marginTop: '24px',
  },
  profileGrid: {
    display: 'flex', flexDirection: 'column' as const, gap: '12px', marginBottom: '0',
  },
  profileCard: {
    display: 'flex', flexDirection: 'column' as const, alignItems: 'center',
    padding: '20px 16px', borderRadius: '14px',
    border: '2px solid #E5E7EB', cursor: 'pointer',
    transition: 'all 0.2s', textAlign: 'center' as const,
    width: '100%', background: 'white',
  },
  validationBadge: {
    marginTop: '8px', padding: '3px 10px', borderRadius: '6px',
    fontSize: '10px', fontWeight: 600, background: '#FFF7ED', color: '#D97706',
  },
  formGroup: {
    display: 'flex', flexDirection: 'column' as const, gap: '12px',
    textAlign: 'left' as const, marginBottom: '0',
  },
  label: {
    fontSize: '13px', fontWeight: 600, color: '#374151',
  },
  input: {
    width: '100%', padding: '10px 14px', borderRadius: '10px',
    border: '1.5px solid #D1D5DB', fontSize: '14px', outline: 'none',
    fontFamily: 'inherit',
  },
  infoBox: {
    padding: '12px 16px', borderRadius: '10px',
    background: '#EFF6FF', border: '1px solid #BFDBFE',
    fontSize: '12px', color: '#1D4ED8', lineHeight: '1.5',
  },
};
