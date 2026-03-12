'use client';

import React from 'react';
import Link from 'next/link';
import { ChevronRight, Home } from 'lucide-react';
import { useI18n } from '@/lib/i18n/i18nContext';

interface ServiceBreadcrumbProps {
  serviceName: string;
  accentColor: string;
}

export function ServiceBreadcrumb({ serviceName, accentColor }: ServiceBreadcrumbProps) {
  const { tr } = useI18n();
  return (
    <nav 
      className="flex items-center space-x-2 text-sm text-gray-500 dark:text-gray-400 mb-8 overflow-x-auto whitespace-nowrap pb-2 hide-scrollbar w-full"
      style={{ '--accent': accentColor } as React.CSSProperties}
    >
      <Link href="/" className="hover:text-gray-900 dark:hover:text-white transition-colors flex items-center gap-1">
        <Home size={14} />
        <span>{tr('svc.breadcrumb.home')}</span>
      </Link>
      <ChevronRight size={14} className="shrink-0" />
      <span className="text-gray-500 dark:text-gray-400 pointer-events-none">
        {tr('svc.breadcrumb.services')}
      </span>
      <ChevronRight size={14} className="shrink-0" />
      <span className="font-semibold text-accent">
        {serviceName}
      </span>
    </nav>
  );
}
