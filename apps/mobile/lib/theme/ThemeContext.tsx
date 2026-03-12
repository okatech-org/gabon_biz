import React, { createContext, useContext, useState, useEffect, useMemo } from 'react';
import { useColorScheme } from 'react-native';

export const lightColors = {
  background: '#f8f9fb',
  card: '#ffffff',
  text: '#111827',
  textMuted: '#6b7280',
  primary: '#009e49',
  primaryLight: '#d1fae5',
  border: '#e5e7eb',
  iconBg: 'rgba(0, 0, 0, 0.05)',
  heroBg: '#009e49',
  shadow: '#000000',
};

export const darkColors = {
  background: '#0f172a',
  card: '#1e293b',
  text: '#f8fafc',
  textMuted: '#94a3b8',
  primary: '#10b981',
  primaryLight: '#064e3b',
  border: '#334155',
  iconBg: 'rgba(255, 255, 255, 0.1)',
  heroBg: '#022c22',
  shadow: '#000000',
};

export type ThemeColors = typeof lightColors;

interface ThemeContextType {
  isDark: boolean;
  colors: ThemeColors;
  toggleTheme: () => void;
  setTheme: (mode: 'light' | 'dark' | 'system') => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const systemColorScheme = useColorScheme();
  const [themeMode, setThemeMode] = useState<'light' | 'dark' | 'system'>('system');

  const isDark = useMemo(() => {
    if (themeMode === 'system') {
      return systemColorScheme === 'dark';
    }
    return themeMode === 'dark';
  }, [themeMode, systemColorScheme]);

  const colors = isDark ? darkColors : lightColors;

  const toggleTheme = () => {
    setThemeMode((prev) => (isDark ? 'light' : 'dark'));
  };

  const setTheme = (mode: 'light' | 'dark' | 'system') => {
    setThemeMode(mode);
  };

  return (
    <ThemeContext.Provider value={{ isDark, colors, toggleTheme, setTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
}
