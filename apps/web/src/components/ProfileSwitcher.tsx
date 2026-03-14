// GABON BIZ — Profile Switcher Component
// Displays the user's active profiles and allows switching between them
// Also shows pending requests and link to add new profiles
'use client';

import { useState, useEffect, useRef } from 'react';
import {
  PROFILE_DEFINITIONS,
  type ProfileType,
  type UserProfileState,
  getActiveProfiles,
} from '@/lib/profiles';

interface ProfileSwitcherProps {
  userName: string;
  userEmail?: string;
}

export default function ProfileSwitcher({ userName, userEmail }: ProfileSwitcherProps) {
  const [profileState, setProfileState] = useState<UserProfileState | null>(null);
  const [isOpen, setIsOpen] = useState(false);
  const [isSwitching, setIsSwitching] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    fetchProfiles();
  }, []);

  // Close dropdown on outside click
  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClick);
    return () => document.removeEventListener('mousedown', handleClick);
  }, []);

  async function fetchProfiles() {
    try {
      const res = await fetch('/api/profiles');
      if (res.ok) {
        const data = await res.json();
        setProfileState(data.profileState);
      }
    } catch { /* ignore */ }
  }

  async function switchProfile(type: ProfileType) {
    setIsSwitching(true);
    try {
      const res = await fetch('/api/profiles/switch', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ profileType: type }),
      });
      if (res.ok) {
        const data = await res.json();
        setProfileState(data.profileState);
        setIsOpen(false);
        // Reload to apply new profile across the app
        window.location.reload();
      }
    } catch { /* ignore */ }
    setIsSwitching(false);
  }

  if (!profileState) return null;

  const activeDef = PROFILE_DEFINITIONS[profileState.activeProfile] || PROFILE_DEFINITIONS.PUBLIC;
  const activeProfiles = getActiveProfiles(profileState);
  const pendingCount = profileState.profiles.filter((p) => p.status === 'pending').length;

  return (
    <div ref={dropdownRef} style={{ position: 'relative' }}>
      {/* ── Active Profile Button ────────────────────── */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: '10px',
          width: '100%',
          padding: '10px 12px',
          background: activeDef.bgColor,
          border: `1.5px solid ${activeDef.borderColor}`,
          borderRadius: '12px',
          cursor: 'pointer',
          textAlign: 'left' as const,
          transition: 'all 0.2s',
        }}
      >
        <div style={{
          width: '36px', height: '36px', borderRadius: '10px',
          background: `linear-gradient(135deg, ${activeDef.color}, ${activeDef.color}cc)`,
          color: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center',
          fontSize: '16px', flexShrink: 0,
        }}>
          {activeDef.icon}
        </div>
        <div style={{ flex: 1, minWidth: 0 }}>
          <div style={{
            fontSize: '13px', fontWeight: 700, color: '#1F2937',
            whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis',
          }}>
            {userName}
          </div>
          <div style={{ fontSize: '11px', color: activeDef.color, fontWeight: 600 }}>
            {activeDef.shortLabel}
            {pendingCount > 0 && (
              <span style={{
                marginLeft: '6px', padding: '1px 6px', borderRadius: '4px',
                background: '#FEF3C7', color: '#D97706', fontSize: '10px',
              }}>
                {pendingCount} en attente
              </span>
            )}
          </div>
        </div>
        <svg width="16" height="16" viewBox="0 0 16 16" fill="#9CA3AF"
          style={{ transform: isOpen ? 'rotate(180deg)' : 'none', transition: 'transform 0.2s', flexShrink: 0 }}>
          <path d="M4 6l4 4 4-4" stroke="#9CA3AF" strokeWidth="2" fill="none" strokeLinecap="round" />
        </svg>
      </button>

      {/* ── Dropdown ─────────────────────────────────── */}
      {isOpen && (
        <div style={{
          position: 'absolute',
          bottom: '100%',
          left: 0, right: 0,
          marginBottom: '8px',
          background: 'white',
          borderRadius: '14px',
          border: '1px solid #E5E7EB',
          boxShadow: '0 10px 40px rgba(0,0,0,0.15)',
          overflow: 'hidden',
          zIndex: 50,
        }}>
          <div style={{ padding: '12px 14px', borderBottom: '1px solid #F3F4F6' }}>
            <div style={{ fontSize: '11px', color: '#9CA3AF', fontWeight: 600, textTransform: 'uppercase' as const, letterSpacing: '0.5px' }}>
              Mes profils actifs
            </div>
          </div>

          {activeProfiles.map((def) => (
            <button
              key={def.type}
              onClick={() => def.type !== profileState.activeProfile && switchProfile(def.type)}
              disabled={isSwitching}
              style={{
                display: 'flex', alignItems: 'center', gap: '10px',
                width: '100%', padding: '10px 14px',
                background: def.type === profileState.activeProfile ? def.bgColor : 'white',
                border: 'none', cursor: 'pointer',
                borderLeft: def.type === profileState.activeProfile ? `3px solid ${def.color}` : '3px solid transparent',
                transition: 'all 0.15s',
              }}
            >
              <span style={{ fontSize: '18px' }}>{def.icon}</span>
              <span style={{
                fontSize: '13px', fontWeight: def.type === profileState.activeProfile ? 700 : 500,
                color: def.type === profileState.activeProfile ? def.color : '#4B5563',
              }}>
                {def.label}
              </span>
              {def.type === profileState.activeProfile && (
                <span style={{
                  marginLeft: 'auto', fontSize: '10px', fontWeight: 600,
                  padding: '2px 8px', borderRadius: '4px',
                  background: def.color, color: 'white',
                }}>
                  Actif
                </span>
              )}
            </button>
          ))}

          {/* Pending profiles */}
          {profileState.profiles.filter((p) => p.status === 'pending').map((p) => {
            const def = PROFILE_DEFINITIONS[p.type];
            return (
              <div
                key={p.type}
                style={{
                  display: 'flex', alignItems: 'center', gap: '10px',
                  padding: '10px 14px', opacity: 0.6,
                  borderLeft: '3px solid transparent',
                }}
              >
                <span style={{ fontSize: '18px' }}>{def?.icon}</span>
                <span style={{ fontSize: '13px', color: '#9CA3AF' }}>{def?.label}</span>
                <span style={{
                  marginLeft: 'auto', fontSize: '10px', fontWeight: 600,
                  padding: '2px 8px', borderRadius: '4px',
                  background: '#FEF3C7', color: '#D97706',
                }}>
                  En attente
                </span>
              </div>
            );
          })}

          {/* Add profile link */}
          <a
            href="/dashboard/profils"
            style={{
              display: 'flex', alignItems: 'center', gap: '8px',
              padding: '10px 14px', borderTop: '1px solid #F3F4F6',
              color: '#009E49', fontSize: '13px', fontWeight: 600,
              textDecoration: 'none', cursor: 'pointer',
            }}
          >
            <span style={{ fontSize: '16px' }}>+</span>
            Ajouter un profil
          </a>
        </div>
      )}
    </div>
  );
}
