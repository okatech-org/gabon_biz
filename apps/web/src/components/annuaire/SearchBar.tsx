'use client';

import { Search, X } from 'lucide-react';
import { useState, useEffect, useRef } from 'react';
import { useI18n } from '@/lib/i18n/i18nContext';

interface SearchBarProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  large?: boolean;
}

export default function SearchBar({ value, onChange, placeholder, large = false }: SearchBarProps) {
  const { tr } = useI18n();
  const [local, setLocal] = useState(value);
  const timer = useRef<ReturnType<typeof setTimeout>>(null);

  useEffect(() => { setLocal(value); }, [value]);

  const handleChange = (v: string) => {
    setLocal(v);
    if (timer.current) clearTimeout(timer.current);
    timer.current = setTimeout(() => onChange(v), 300);
  };

  const effectivePlaceholder = placeholder || tr('ann.search_ph');

  return (
    <div className={`relative w-full ${large ? 'max-w-2xl' : ''}`}>
      <Search size={large ? 22 : 18} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
      <input
        type="text"
        value={local}
        onChange={(e) => handleChange(e.target.value)}
        placeholder={effectivePlaceholder}
        className={`w-full bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-2xl
          text-gray-900 dark:text-white placeholder:text-gray-400
          focus:outline-none focus:ring-2 focus:ring-emerald-500/40 focus:border-emerald-500
          transition-all duration-200
          ${large ? 'pl-14 pr-12 py-4 text-lg shadow-lg' : 'pl-11 pr-10 py-3 text-sm'}`}
      />
      {local && (
        <button
          onClick={() => { setLocal(''); onChange(''); }}
          className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 bg-transparent border-none cursor-pointer p-0"
        >
          <X size={large ? 20 : 16} />
        </button>
      )}
    </div>
  );
}
