// GABON BIZ — Profile Store (in-memory for development)
// In production, replace with Prisma/Supabase/PostgreSQL queries
// This store persists user profile states across API requests

import {
  type UserProfileState,
  type ProfileType,
  type ProfileStatus,
  createDefaultProfileState,
  SELF_ACTIVATED_PROFILES,
  ADMIN_ONLY_PROFILES,
} from './profiles';

// ── Demo NIP → ProfileType mapping ─────────────────────────────
const DEMO_PROFILE_MAP: Record<string, { profileType: ProfileType; extraProfiles?: ProfileType[] }> = {
  'GA-DEMO-ENT-001': { profileType: 'ENTREPRENEUR' },
  'GA-DEMO-STA-001': { profileType: 'STARTUP' },
  'GA-DEMO-INV-001': { profileType: 'INVESTOR' },
  'GA-DEMO-ADM-001': { profileType: 'ADMIN' },
  'GA-DEMO-SYS-001': { profileType: 'SYSADMIN', extraProfiles: ['ADMIN'] },
  'GA-DEMO-DGM-001': { profileType: 'PUBLIC' },
  'GA-DEMO-MEN-001': { profileType: 'PUBLIC' },
  'GA-DEMO-ANA-001': { profileType: 'PUBLIC' },
  'GA-DEMO-CIT-001': { profileType: 'PUBLIC' },
  'GA-DEMO-PTR-001': { profileType: 'INVESTOR' },
  'GA-DEMO-AUT-001': { profileType: 'PUBLIC' },
  'GA-DEMO-CGI-001': { profileType: 'ADMIN' },
};

// ── In-memory store ────────────────────────────────────────────
const profileStore = new Map<string, UserProfileState>();

// ── Public API ─────────────────────────────────────────────────

/** Get or create a user's profile state (seeds demo profiles automatically) */
export function getProfileState(nip: string): UserProfileState {
  if (!profileStore.has(nip)) {
    const state = createDefaultProfileState(nip);

    // Auto-seed demo profiles
    const demoConfig = DEMO_PROFILE_MAP[nip];
    if (demoConfig) {
      const now = new Date().toISOString();
      state.isFirstLogin = false;
      state.onboardingCompleted = true;

      if (demoConfig.profileType !== 'PUBLIC') {
        state.profiles.push({
          type: demoConfig.profileType,
          status: 'active',
          activatedAt: now,
        });
        state.activeProfile = demoConfig.profileType;
      }

      // Add extra profiles (e.g., SYSADMIN also gets ADMIN)
      if (demoConfig.extraProfiles) {
        for (const extra of demoConfig.extraProfiles) {
          if (!state.profiles.some((p) => p.type === extra)) {
            state.profiles.push({
              type: extra,
              status: 'active',
              activatedAt: now,
            });
          }
        }
      }
    }

    profileStore.set(nip, state);
  }
  return profileStore.get(nip)!;
}

/** Mark onboarding as completed */
export function completeOnboarding(nip: string): UserProfileState {
  const state = getProfileState(nip);
  state.isFirstLogin = false;
  state.onboardingCompleted = true;
  profileStore.set(nip, state);
  return state;
}

/** Switch the active profile (must be an active profile the user has) */
export function switchActiveProfile(nip: string, profileType: ProfileType): UserProfileState | null {
  const state = getProfileState(nip);
  const profile = state.profiles.find((p) => p.type === profileType && p.status === 'active');
  if (!profile) return null;
  state.activeProfile = profileType;
  profileStore.set(nip, state);
  return state;
}

/**
 * Request activation of a new profile
 * - Level 0-1 (PUBLIC, ENTREPRENEUR): auto-activated
 * - Level 2 (STARTUP, INVESTOR): pending admin validation
 * - Level 3 (ADMIN, SYSADMIN): rejected (admin-only)
 */
export function requestProfile(
  nip: string,
  profileType: ProfileType,
  metadata?: Record<string, string>,
): { state: UserProfileState; status: ProfileStatus; message: string } {
  const state = getProfileState(nip);

  // Check if profile already exists
  const existing = state.profiles.find((p) => p.type === profileType);
  if (existing && existing.status === 'active') {
    return { state, status: 'active', message: 'Ce profil est déjà actif.' };
  }
  if (existing && existing.status === 'pending') {
    return { state, status: 'pending', message: 'Une demande est déjà en cours pour ce profil.' };
  }

  // Admin-only profiles cannot be self-requested
  if (ADMIN_ONLY_PROFILES.includes(profileType)) {
    return { state, status: 'rejected', message: 'Ce profil ne peut être attribué que par un administrateur.' };
  }

  const now = new Date().toISOString();

  // Self-activated profiles (PUBLIC, ENTREPRENEUR)
  if (SELF_ACTIVATED_PROFILES.includes(profileType)) {
    // Remove any previous rejected entry
    state.profiles = state.profiles.filter((p) => p.type !== profileType);
    state.profiles.push({
      type: profileType,
      status: 'active',
      activatedAt: now,
      requestedAt: now,
      metadata,
    });
    profileStore.set(nip, state);
    return {
      state,
      status: 'active',
      message: `Profil ${profileType} activé avec succès.`,
    };
  }

  // Profiles requiring validation (STARTUP, INVESTOR)
  state.profiles = state.profiles.filter((p) => p.type !== profileType);
  state.profiles.push({
    type: profileType,
    status: 'pending',
    requestedAt: now,
    metadata,
  });
  profileStore.set(nip, state);
  return {
    state,
    status: 'pending',
    message: `Demande de profil ${profileType} soumise. Elle sera examinée par un administrateur.`,
  };
}

/**
 * Admin action: approve or reject a pending profile request
 */
export function adminReviewProfile(
  targetNip: string,
  profileType: ProfileType,
  action: 'approve' | 'reject',
  adminNip: string,
  reason?: string,
): { state: UserProfileState; success: boolean; message: string } {
  const state = getProfileState(targetNip);
  const profileIndex = state.profiles.findIndex(
    (p) => p.type === profileType && p.status === 'pending',
  );

  if (profileIndex === -1) {
    return { state, success: false, message: 'Aucune demande en attente trouvée pour ce profil.' };
  }

  const now = new Date().toISOString();

  if (action === 'approve') {
    state.profiles[profileIndex].status = 'active';
    state.profiles[profileIndex].activatedAt = now;
    state.profiles[profileIndex].verifiedBy = adminNip;
    profileStore.set(targetNip, state);
    return { state, success: true, message: `Profil ${profileType} approuvé.` };
  }

  // Reject
  state.profiles[profileIndex].status = 'rejected';
  state.profiles[profileIndex].rejectedAt = now;
  state.profiles[profileIndex].rejectionReason = reason || 'Demande non conforme.';
  state.profiles[profileIndex].verifiedBy = adminNip;
  profileStore.set(targetNip, state);
  return { state, success: true, message: `Profil ${profileType} refusé.` };
}

/**
 * Admin action: grant a profile directly (for ADMIN, SYSADMIN, or any profile)
 */
export function adminGrantProfile(
  targetNip: string,
  profileType: ProfileType,
  adminNip: string,
): { state: UserProfileState; success: boolean; message: string } {
  const state = getProfileState(targetNip);
  const existing = state.profiles.find((p) => p.type === profileType && p.status === 'active');
  if (existing) {
    return { state, success: false, message: 'Ce profil est déjà actif.' };
  }

  const now = new Date().toISOString();
  state.profiles = state.profiles.filter((p) => p.type !== profileType);
  state.profiles.push({
    type: profileType,
    status: 'active',
    activatedAt: now,
    requestedAt: now,
    verifiedBy: adminNip,
  });
  profileStore.set(targetNip, state);
  return { state, success: true, message: `Profil ${profileType} attribué.` };
}

/**
 * Get all pending profile requests (for admin dashboard)
 */
export function getAllPendingRequests(): Array<{ nip: string; profile: ProfileType; requestedAt?: string; metadata?: Record<string, string> }> {
  const pending: Array<{ nip: string; profile: ProfileType; requestedAt?: string; metadata?: Record<string, string> }> = [];
  for (const [nip, state] of profileStore) {
    for (const p of state.profiles) {
      if (p.status === 'pending') {
        pending.push({ nip, profile: p.type, requestedAt: p.requestedAt, metadata: p.metadata });
      }
    }
  }
  return pending.sort((a, b) => (a.requestedAt || '').localeCompare(b.requestedAt || ''));
}
