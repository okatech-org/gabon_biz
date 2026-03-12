import React, { createContext, useContext, useState, useCallback, ReactNode } from 'react';
import { Lang, t } from './translations';

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
  const [lang, setLang] = useState<Lang>('fr');

  const tr = useCallback((key: string) => t[lang]?.[key] ?? t.fr[key] ?? key, [lang]);

  return <I18nContext.Provider value={{ lang, setLang, tr }}>{children}</I18nContext.Provider>;
}

export function useI18n() {
  return useContext(I18nContext);
}
