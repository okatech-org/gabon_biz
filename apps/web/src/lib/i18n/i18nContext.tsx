'use client';

import React, { createContext, useContext, useState, useCallback, ReactNode, useEffect } from 'react';
import { Lang, translations } from './translations';

interface I18nContextValue {
  lang: Lang;
  setLang: (lang: Lang) => void;
  tr: (key: string) => string;
}

const I18nContext = createContext<I18nContextValue>({
  lang: 'fr',
  setLang: () => {},
  tr: (key: string) => key,
});

export function I18nProvider({ children }: { children: ReactNode }) {
  const [lang, setLangState] = useState<Lang>('fr');
  const [mounted, setMounted] = useState(false);

  // Load language from localStorage
  useEffect(() => {
    const timer = setTimeout(() => setMounted(true), 0);
    const savedLang = localStorage.getItem('gabon-biz-lang') as Lang;
    if (savedLang && translations[savedLang]) {
      setLangState(savedLang);
    } else {
      // Try to detect browser language
      const browserLang = navigator.language.split('-')[0] as Lang;
      if (translations[browserLang]) {
        setLangState(browserLang);
      }
    }
  }, []);

  const setLang = useCallback((newLang: Lang) => {
    setLangState(newLang);
    localStorage.setItem('gabon-biz-lang', newLang);
    document.documentElement.lang = newLang;
  }, []);

  const tr = useCallback(
    (key: string) => {
      // fallback to fr if key is missing in chosen lang
      return translations[lang]?.[key] ?? translations.fr[key] ?? key;
    },
    [lang],
  );

  return (
    <I18nContext.Provider value={{ lang: mounted ? lang : 'fr', setLang, tr }}>
      {children}
    </I18nContext.Provider>
  );
}

export function useI18n() {
  return useContext(I18nContext);
}
