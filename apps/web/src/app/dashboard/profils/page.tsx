// GABON BIZ — Profile Management Page
// /dashboard/profils — View active profiles, request new ones, track pending requests
'use client';

import { useState, useEffect } from 'react';
import { useAuth } from '@/lib/auth-context';
import {
  PROFILE_DEFINITIONS,
  REQUESTABLE_PROFILES,
  type ProfileType,
  type UserProfileState,
} from '@/lib/profiles';

type ModalState = { open: false } | { open: true; type: ProfileType };

export default function ProfilesPage() {
  const { user } = useAuth();
  const [profileState, setProfileState] = useState<UserProfileState | null>(null);
  const [modal, setModal] = useState<ModalState>({ open: false });
  const [metadata, setMetadata] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [toast, setToast] = useState<string | null>(null);

  useEffect(() => {
    fetchProfiles();
  }, []);

  async function fetchProfiles() {
    const res = await fetch('/api/profiles');
    if (res.ok) {
      const data = await res.json();
      setProfileState(data.profileState);
    }
  }

  async function handleRequest() {
    if (!modal.open) return;
    setIsSubmitting(true);
    try {
      const res = await fetch('/api/profiles/request', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ profileType: modal.type, metadata }),
      });
      const data = await res.json();
      setToast(data.message);
      setProfileState(data.profileState);
      setModal({ open: false });
      setMetadata({});
      setTimeout(() => setToast(null), 4000);
    } catch {
      setToast('Erreur lors de la demande.');
    }
    setIsSubmitting(false);
  }

  if (!profileState) {
    return <div style={{ padding: '40px', textAlign: 'center', color: '#9CA3AF' }}>Chargement...</div>;
  }

  const activeProfiles = profileState.profiles.filter((p) => p.status === 'active');
  const pendingProfiles = profileState.profiles.filter((p) => p.status === 'pending');
  const rejectedProfiles = profileState.profiles.filter((p) => p.status === 'rejected');

  const availableTypes = REQUESTABLE_PROFILES.filter((type) => {
    const existing = profileState.profiles.find((p) => p.type === type);
    return !existing || existing.status === 'rejected';
  });

  return (
    <div style={{ maxWidth: '800px', margin: '0 auto', padding: '0 20px' }}>
      {/* Toast */}
      {toast && (
        <div style={{
          position: 'fixed', top: '20px', right: '20px', zIndex: 100,
          padding: '14px 20px', borderRadius: '12px',
          background: '#059669', color: 'white', fontSize: '14px',
          boxShadow: '0 8px 30px rgba(0,0,0,0.15)', maxWidth: '400px',
        }}>
          {toast}
        </div>
      )}

      {/* Header */}
      <div style={{ marginBottom: '32px' }}>
        <h1 style={{ fontSize: '24px', fontWeight: 700, color: '#1F2937', marginBottom: '6px' }}>
          Mes Profils
        </h1>
        <p style={{ fontSize: '14px', color: '#6B7280' }}>
          Gérez vos profils et activez de nouvelles capacités sur GABON BIZ.
        </p>
      </div>

      {/* Active Profiles */}
      <section style={{ marginBottom: '32px' }}>
        <h2 style={{ fontSize: '16px', fontWeight: 600, color: '#374151', marginBottom: '12px' }}>
          Profils actifs
        </h2>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
          {activeProfiles.map((p) => {
            const def = PROFILE_DEFINITIONS[p.type];
            const isCurrent = profileState.activeProfile === p.type;
            return (
              <div key={p.type} style={{
                display: 'flex', alignItems: 'center', gap: '14px',
                padding: '16px', borderRadius: '14px',
                border: `2px solid ${isCurrent ? def.color : '#E5E7EB'}`,
                background: isCurrent ? def.bgColor : 'white',
              }}>
                <div style={{
                  width: '44px', height: '44px', borderRadius: '12px',
                  background: `linear-gradient(135deg, ${def.color}, ${def.color}cc)`,
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  fontSize: '20px', color: 'white', flexShrink: 0,
                }}>
                  {def.icon}
                </div>
                <div style={{ flex: 1 }}>
                  <div style={{ fontSize: '15px', fontWeight: 700, color: '#1F2937' }}>{def.label}</div>
                  <div style={{ fontSize: '12px', color: '#6B7280', marginTop: '2px' }}>
                    {def.description.slice(0, 100)}
                  </div>
                  {p.activatedAt && (
                    <div style={{ fontSize: '11px', color: '#9CA3AF', marginTop: '4px' }}>
                      Activé le {new Date(p.activatedAt).toLocaleDateString('fr-FR')}
                    </div>
                  )}
                </div>
                {isCurrent && (
                  <span style={{
                    padding: '4px 10px', borderRadius: '6px',
                    background: def.color, color: 'white',
                    fontSize: '11px', fontWeight: 700, flexShrink: 0,
                  }}>
                    Actif
                  </span>
                )}
              </div>
            );
          })}
        </div>
      </section>

      {/* Pending */}
      {pendingProfiles.length > 0 && (
        <section style={{ marginBottom: '32px' }}>
          <h2 style={{ fontSize: '16px', fontWeight: 600, color: '#374151', marginBottom: '12px' }}>
            En attente de validation
          </h2>
          {pendingProfiles.map((p) => {
            const def = PROFILE_DEFINITIONS[p.type];
            return (
              <div key={p.type} style={{
                display: 'flex', alignItems: 'center', gap: '14px',
                padding: '16px', borderRadius: '14px',
                border: '2px solid #FDE68A', background: '#FFFBEB',
              }}>
                <span style={{ fontSize: '24px' }}>{def.icon}</span>
                <div style={{ flex: 1 }}>
                  <div style={{ fontWeight: 700, fontSize: '14px', color: '#92400E' }}>{def.label}</div>
                  <div style={{ fontSize: '12px', color: '#B45309' }}>
                    Demande soumise le {p.requestedAt ? new Date(p.requestedAt).toLocaleDateString('fr-FR') : '—'}
                  </div>
                </div>
                <span style={{
                  padding: '4px 10px', borderRadius: '6px',
                  background: '#FEF3C7', color: '#D97706',
                  fontSize: '11px', fontWeight: 700,
                }}>
                  En attente
                </span>
              </div>
            );
          })}
        </section>
      )}

      {/* Rejected */}
      {rejectedProfiles.length > 0 && (
        <section style={{ marginBottom: '32px' }}>
          <h2 style={{ fontSize: '16px', fontWeight: 600, color: '#374151', marginBottom: '12px' }}>
            Demandes refusées
          </h2>
          {rejectedProfiles.map((p) => {
            const def = PROFILE_DEFINITIONS[p.type];
            return (
              <div key={p.type} style={{
                padding: '16px', borderRadius: '14px',
                border: '2px solid #FECACA', background: '#FEF2F2',
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '8px' }}>
                  <span style={{ fontSize: '20px' }}>{def.icon}</span>
                  <span style={{ fontWeight: 700, color: '#991B1B' }}>{def.label}</span>
                </div>
                {p.rejectionReason && (
                  <div style={{ fontSize: '13px', color: '#B91C1C', marginBottom: '8px' }}>
                    Motif : {p.rejectionReason}
                  </div>
                )}
                <button
                  onClick={() => { setModal({ open: true, type: p.type }); setMetadata({}); }}
                  style={{
                    padding: '6px 14px', borderRadius: '8px',
                    border: '1px solid #FCA5A5', background: 'white',
                    color: '#DC2626', fontSize: '12px', fontWeight: 600, cursor: 'pointer',
                  }}
                >
                  Renouveler la demande
                </button>
              </div>
            );
          })}
        </section>
      )}

      {/* Available profiles */}
      {availableTypes.length > 0 && (
        <section>
          <h2 style={{ fontSize: '16px', fontWeight: 600, color: '#374151', marginBottom: '12px' }}>
            Profils disponibles
          </h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
            {availableTypes.map((type) => {
              const def = PROFILE_DEFINITIONS[type];
              return (
                <div key={type} style={{
                  display: 'flex', alignItems: 'center', gap: '14px',
                  padding: '16px', borderRadius: '14px',
                  border: '2px dashed #D1D5DB', background: '#FAFAFA',
                }}>
                  <span style={{ fontSize: '28px' }}>{def.icon}</span>
                  <div style={{ flex: 1 }}>
                    <div style={{ fontWeight: 700, fontSize: '14px', color: '#374151' }}>{def.label}</div>
                    <div style={{ fontSize: '12px', color: '#6B7280', marginTop: '2px' }}>{def.description.slice(0, 80)}...</div>
                    <div style={{ fontSize: '11px', color: '#9CA3AF', marginTop: '4px' }}>
                      {def.canSelfActivate && !def.requiresVerification
                        ? 'Activation immédiate'
                        : def.canSelfActivate
                          ? 'Activation avec vérification'
                          : 'Validation par administrateur requise'}
                    </div>
                  </div>
                  <button
                    onClick={() => { setModal({ open: true, type }); setMetadata({}); }}
                    style={{
                      padding: '8px 16px', borderRadius: '10px',
                      border: 'none', background: def.color, color: 'white',
                      fontSize: '12px', fontWeight: 700, cursor: 'pointer', flexShrink: 0,
                    }}
                  >
                    Activer
                  </button>
                </div>
              );
            })}
          </div>
        </section>
      )}

      {/* ── Request Modal ────────────────────────────────── */}
      {modal.open && (
        <div style={{
          position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.5)',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          zIndex: 100, padding: '20px',
        }}
          onClick={() => setModal({ open: false })}
        >
          <div
            style={{
              background: 'white', borderRadius: '20px', padding: '32px',
              maxWidth: '480px', width: '100%', maxHeight: '80vh', overflowY: 'auto',
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <div style={{ fontSize: '32px', textAlign: 'center', marginBottom: '12px' }}>
              {PROFILE_DEFINITIONS[modal.type].icon}
            </div>
            <h2 style={{ fontSize: '20px', fontWeight: 700, textAlign: 'center', marginBottom: '6px' }}>
              Activer le profil {PROFILE_DEFINITIONS[modal.type].label}
            </h2>
            <p style={{ fontSize: '13px', color: '#6B7280', textAlign: 'center', marginBottom: '20px' }}>
              {PROFILE_DEFINITIONS[modal.type].description}
            </p>

            <div style={{ marginBottom: '8px', fontSize: '13px', fontWeight: 600, color: '#374151' }}>
              Prérequis :
            </div>
            <ul style={{ marginBottom: '20px', paddingLeft: '20px' }}>
              {PROFILE_DEFINITIONS[modal.type].requirements.map((r, i) => (
                <li key={i} style={{ fontSize: '13px', color: '#6B7280', marginBottom: '4px' }}>{r}</li>
              ))}
            </ul>

            {/* Simple metadata collection */}
            {modal.type === 'ENTREPRENEUR' && (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', marginBottom: '20px' }}>
                <input style={modalInputStyle} placeholder="Nom de l'entreprise"
                  value={metadata.companyName || ''} onChange={(e) => setMetadata({ ...metadata, companyName: e.target.value })} />
                <input style={modalInputStyle} placeholder="Numéro RCCM (optionnel)"
                  value={metadata.rccm || ''} onChange={(e) => setMetadata({ ...metadata, rccm: e.target.value })} />
              </div>
            )}
            {modal.type === 'STARTUP' && (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', marginBottom: '20px' }}>
                <input style={modalInputStyle} placeholder="Nom de la startup"
                  value={metadata.startupName || ''} onChange={(e) => setMetadata({ ...metadata, startupName: e.target.value })} />
                <textarea style={{ ...modalInputStyle, minHeight: '60px' }} placeholder="Description du projet"
                  value={metadata.description || ''} onChange={(e) => setMetadata({ ...metadata, description: e.target.value })} />
              </div>
            )}
            {modal.type === 'INVESTOR' && (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', marginBottom: '20px' }}>
                <input style={modalInputStyle} placeholder="Nom de la structure d'investissement"
                  value={metadata.fundName || ''} onChange={(e) => setMetadata({ ...metadata, fundName: e.target.value })} />
                <input style={modalInputStyle} placeholder="Secteurs cibles"
                  value={metadata.targetSectors || ''} onChange={(e) => setMetadata({ ...metadata, targetSectors: e.target.value })} />
              </div>
            )}

            <div style={{ display: 'flex', gap: '10px' }}>
              <button onClick={() => setModal({ open: false })}
                style={{ flex: 1, padding: '12px', border: '1px solid #E5E7EB', borderRadius: '10px', background: 'white', color: '#6B7280', fontSize: '14px', cursor: 'pointer' }}>
                Annuler
              </button>
              <button onClick={handleRequest} disabled={isSubmitting}
                style={{
                  flex: 1, padding: '12px', border: 'none', borderRadius: '10px',
                  background: PROFILE_DEFINITIONS[modal.type].color, color: 'white',
                  fontSize: '14px', fontWeight: 700, cursor: 'pointer',
                  opacity: isSubmitting ? 0.6 : 1,
                }}>
                {isSubmitting ? 'Envoi...' : PROFILE_DEFINITIONS[modal.type].canSelfActivate ? 'Activer' : 'Soumettre'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

const modalInputStyle: React.CSSProperties = {
  width: '100%', padding: '10px 14px', borderRadius: '10px',
  border: '1.5px solid #D1D5DB', fontSize: '14px', outline: 'none',
  fontFamily: 'inherit',
};
