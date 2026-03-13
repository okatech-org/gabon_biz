'use client';

import React from 'react';
import { usePathname } from 'next/navigation';
import { Navbar, Footer } from '@/app/page';
import { ServiceCTA } from '@/components/services/ServiceCTA';


export default function ServicesLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  // pathname looks like /services/guichet-entrepreneur
  const parts = pathname.split('/');
  const currentSlug = parts[parts.length - 1] || '';

  return (
    <div className="bg-white dark:bg-gray-950 font-sans selection:bg-emerald-500/30 flex flex-col min-h-screen">
      <Navbar activeServiceSlug={currentSlug} />
      
      <main className="flex-1">
        {children}
      </main>
      
      <ServiceCTA />
      
      <Footer />
    </div>
  );
}
