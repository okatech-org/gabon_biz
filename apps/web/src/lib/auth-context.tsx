// GABON BIZ — Next.js Auth Context (Client-side)
// Manages authentication state via IDENTITE.GA OAuth 2.0
// Includes progressive profile system
'use client';

import { createContext, useContext, useState, useEffect, useCallback, type ReactNode } from 'react';
import { type UserProfileState, type ProfileType, PROFILE_DEFINITIONS } from '@/lib/profiles';

export interface AuthUser {
  nip: string;
  fullName: string;
  name: string;
  given_name?: string;
  family_name?: string;
  email: string;
  phone?: string;
  profileType: 'ENTREPRENEUR' | 'STARTUP' | 'INVESTOR' | 'ADMIN' | 'PUBLIC' | string;
  roles?: string[];
  avatar?: string;
  organization?: string;
  title?: string;
  location?: string;
  locale?: string;
  gender?: string;
  birthdate?: string;
  isDemo?: boolean;
  provider?: 'identite.ga' | 'demo';
}

interface AuthContextType {
  user: AuthUser | null;
  isLoading: boolean;
  isAuthenticated: boolean;
  /** Current profile state (multi-profile system) */
  profileState: UserProfileState | null;
  /** Active profile type */
  activeProfile: ProfileType;
  /** Active profile definition (icon, color, label, etc.) */
  activeProfileDef: typeof PROFILE_DEFINITIONS[ProfileType] | null;
  /** Redirect to IDENTITE.GA login */
  login: (redirectPath?: string) => void;
  /** Clear session and redirect to home page */
  logout: () => void;
  /** Re-check authentication status */
  refreshAuth: () => Promise<void>;
  /** Refresh profile state from server */
  refreshProfiles: () => Promise<void>;
  /** Switch the active profile */
  switchProfile: (type: ProfileType) => Promise<boolean>;
}

const AuthContext = createContext<AuthContextType>({
  user: null,
  isLoading: true,
  isAuthenticated: false,
  profileState: null,
  activeProfile: 'PUBLIC',
  activeProfileDef: null,
  login: () => {},
  logout: () => {},
  refreshAuth: async () => {},
  refreshProfiles: async () => {},
  switchProfile: async () => false,
});

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<AuthUser | null>(null);
  const [profileState, setProfileState] = useState<UserProfileState | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const checkAuth = useCallback(async () => {
    try {
      const res = await fetch('/api/auth/me');
      if (res.ok) {
        const data = await res.json();
        setUser(data.user);
      } else {
        setUser(null);
        setProfileState(null);
      }
    } catch {
      setUser(null);
      setProfileState(null);
    } finally {
      setIsLoading(false);
    }
  }, []);

  const fetchProfiles = useCallback(async () => {
    try {
      const res = await fetch('/api/profiles');
      if (res.ok) {
        const data = await res.json();
        setProfileState(data.profileState);
      }
    } catch { /* ignore */ }
  }, []);

  // Check auth on mount, then fetch profiles
  useEffect(() => {
    checkAuth();
  }, [checkAuth]);

  useEffect(() => {
    if (user) {
      fetchProfiles();
    }
  }, [user, fetchProfiles]);

  const login = useCallback((redirectPath?: string) => {
    const params = redirectPath ? `?redirect=${encodeURIComponent(redirectPath)}` : '';
    window.location.href = `/api/auth/login${params}`;
  }, []);

  const logout = useCallback(async () => {
    await fetch('/api/auth/logout', { method: 'POST' });
    setUser(null);
    setProfileState(null);
    window.location.href = '/';
  }, []);

  const switchProfile = useCallback(async (type: ProfileType): Promise<boolean> => {
    try {
      const res = await fetch('/api/profiles/switch', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ profileType: type }),
      });
      if (res.ok) {
        const data = await res.json();
        setProfileState(data.profileState);
        return true;
      }
    } catch { /* ignore */ }
    return false;
  }, []);

  const activeProfile: ProfileType = profileState?.activeProfile || 'PUBLIC';
  const activeProfileDef = PROFILE_DEFINITIONS[activeProfile] || PROFILE_DEFINITIONS.PUBLIC;

  return (
    <AuthContext.Provider
      value={{
        user,
        isLoading,
        isAuthenticated: !!user,
        profileState,
        activeProfile,
        activeProfileDef,
        login,
        logout,
        refreshAuth: checkAuth,
        refreshProfiles: fetchProfiles,
        switchProfile,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}

export default AuthContext;
