'use client';

import React from 'react';
import { Navbar, Footer } from '@/app/page';

export default function AnnuaireLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="bg-white dark:bg-gray-950 font-sans selection:bg-emerald-500/30 flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-1">{children}</main>
      <Footer />
    </div>
  );
}
