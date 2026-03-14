'use client';

import React, { useState, useEffect, useRef } from 'react';
import { Search } from 'lucide-react';
import { SEARCH_EXAMPLES } from '@/lib/mock/innovation-data';

interface SearchBarProps {
  value: string;
  onChange: (val: string) => void;
  onSubmit?: (val: string) => void;
  placeholder?: string;
  size?: 'default' | 'hero';
}

export default function SearchBar({ value, onChange, onSubmit, placeholder, size = 'default' }: SearchBarProps) {
  const [typewriterText, setTypewriterText] = useState('');
  const [exampleIdx, setExampleIdx] = useState(0);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  const showTypewriter = !value && size === 'hero';

  useEffect(() => {
    if (!showTypewriter) return;
    let charIdx = 0;
    const example = SEARCH_EXAMPLES[exampleIdx];
    setTypewriterText('');

    intervalRef.current = setInterval(() => {
      if (charIdx <= example.length) {
        setTypewriterText(example.slice(0, charIdx));
        charIdx++;
      } else {
        if (intervalRef.current) clearInterval(intervalRef.current);
        setTimeout(() => {
          setExampleIdx(prev => (prev + 1) % SEARCH_EXAMPLES.length);
        }, 2500);
      }
    }, 50);

    return () => { if (intervalRef.current) clearInterval(intervalRef.current); };
  }, [exampleIdx, showTypewriter]);

  const isHero = size === 'hero';

  return (
    <form
      onSubmit={e => { e.preventDefault(); onSubmit?.(value); }}
      className={`relative flex items-center w-full ${isHero ? 'max-w-2xl' : ''}`}
    >
      <div className={`absolute left-4 text-gray-400 ${isHero ? 'text-violet-400' : ''}`}>
        <Search size={isHero ? 22 : 18} />
      </div>
      <input
        type="text"
        value={value}
        onChange={e => onChange(e.target.value)}
        placeholder={showTypewriter ? typewriterText : (placeholder || 'Recherche...')}
        className={`w-full border-none outline-none transition-all duration-200 ${
          isHero
            ? 'py-4 pl-13 pr-32 rounded-2xl text-base bg-white/10 backdrop-blur-xl text-white placeholder-white/50 shadow-violet-900/30 ring-1 ring-white/20 focus:ring-violet-400/60'
            : 'py-2.5 pl-11 pr-4 rounded-xl text-sm bg-white dark:bg-gray-800 text-gray-900 dark:text-white placeholder-gray-400 ring-1 ring-gray-200 dark:ring-gray-700 focus:ring-violet-400'
        }`}
      />
      {isHero && (
        <button
          type="submit"
          className="absolute right-2 px-5 py-2.5 rounded-xl bg-white text-violet-700 font-semibold text-sm hover:bg-violet-50 transition-colors border-none cursor-pointer"
        >
          Rechercher
        </button>
      )}
    </form>
  );
}
