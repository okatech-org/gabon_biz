import React from 'react';
import { StyleSheet, TouchableOpacity, Platform } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useTheme } from './ThemeContext';

interface ThemeToggleProps {
  variant?: 'light' | 'dark';
}

export default function ThemeToggle({ variant = 'dark' }: ThemeToggleProps) {
  const { isDark, toggleTheme } = useTheme();
  const isLightVariant = variant === 'light';

  return (
    <TouchableOpacity
      style={[styles.trigger, isLightVariant ? styles.triggerLight : styles.triggerDark]}
      onPress={toggleTheme}
      activeOpacity={0.7}
    >
      <Ionicons
        name={isDark ? 'sunny' : 'moon'}
        size={20}
        color={isLightVariant ? '#ffffff' : '#374151'}
      />
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  trigger: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: 8,
    borderRadius: 10,
    width: 40,
    height: 40,
    marginLeft: 8,
  },
  triggerLight: {
    backgroundColor: 'rgba(255,255,255,0.2)',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.35)',
  },
  triggerDark: {
    backgroundColor: '#ffffff',
    borderWidth: 1,
    borderColor: '#e5e7eb',
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.08,
        shadowRadius: 3,
      },
      android: { elevation: 2 },
    }),
  },
});
