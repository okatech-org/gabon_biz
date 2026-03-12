'use client';

// GABON BIZ — Demo Banner
// Persistent banner shown at the top of the dashboard when user is in demo mode

import Link from 'next/link';
import { useAuth } from '@/lib/auth-context';
import { getDemoAccountByNip } from '@/lib/demo-accounts';
import { useState } from 'react';

export default function DemoBanner() {
  const { user } = useAuth();
  const [dismissed, setDismissed] = useState(false);

  if (!user?.isDemo || dismissed) return null;

  const account = getDemoAccountByNip(user.nip);
  const profileLabel = account?.label || user.profileType;

  return (
    <div
      className="sticky top-0 z-100 flex items-center justify-center gap-3 px-4 py-2.5"
      style={{
        background: 'linear-gradient(135deg, #f59e0b, #ea580c)',
        minHeight: 44,
      }}
    >
      <span className="text-white text-sm font-semibold text-center">
        🔒 Mode démo — Vous êtes connecté en tant que{' '}
        <strong>{profileLabel}</strong> ({user.name})
      </span>
      <Link
        href="/demo"
        className="ml-2 px-3 py-1 text-xs font-semibold text-amber-900 bg-white/90 rounded-lg hover:bg-white transition-colors"
      >
        Changer de profil
      </Link>
      <button
        onClick={() => setDismissed(true)}
        className="ml-1 text-white/80 hover:text-white text-lg leading-none transition-colors"
        aria-label="Masquer la bannière"
      >
        ×
      </button>
    </div>
  );
}
