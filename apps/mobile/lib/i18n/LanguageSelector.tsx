import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Modal, Platform } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useI18n } from './i18nContext';
import { Lang, LANG_LABELS, LANG_FLAGS } from './translations';

const LANGUAGES: Lang[] = ['fr', 'en', 'es', 'ar', 'zh', 'ru', 'ja'];

interface LanguageSelectorProps {
  /** Use 'light' when on a dark/green background, 'dark' for light backgrounds */
  variant?: 'light' | 'dark';
}

export default function LanguageSelector({ variant = 'dark' }: LanguageSelectorProps) {
  const { lang, setLang, tr } = useI18n();
  const [visible, setVisible] = useState(false);

  const isLight = variant === 'light';

  return (
    <>
      <TouchableOpacity
        style={[styles.trigger, isLight ? styles.triggerLight : styles.triggerDark]}
        onPress={() => setVisible(true)}
        activeOpacity={0.7}
      >
        <Text style={styles.flag}>{LANG_FLAGS[lang]}</Text>
        <Text style={[styles.triggerLabel, isLight ? styles.labelLight : styles.labelDark]}>
          {lang.toUpperCase()}
        </Text>
        <Ionicons name="chevron-down" size={14} color={isLight ? '#ffffff' : '#374151'} />
      </TouchableOpacity>

      <Modal
        visible={visible}
        transparent
        animationType="fade"
        onRequestClose={() => setVisible(false)}
      >
        <TouchableOpacity
          style={styles.overlay}
          activeOpacity={1}
          onPress={() => setVisible(false)}
        >
          <View style={styles.sheet}>
            <Text style={styles.sheetTitle}>{tr('lang.title')}</Text>

            {LANGUAGES.map((code) => (
              <TouchableOpacity
                key={code}
                style={[styles.langRow, lang === code && styles.langRowActive]}
                onPress={() => {
                  setLang(code);
                  setVisible(false);
                }}
              >
                <Text style={styles.langFlag}>{LANG_FLAGS[code]}</Text>
                <Text style={[styles.langLabel, lang === code && styles.langLabelActive]}>
                  {LANG_LABELS[code]}
                </Text>
                {lang === code && <Ionicons name="checkmark-circle" size={20} color="#009e49" />}
              </TouchableOpacity>
            ))}

            <TouchableOpacity style={styles.closeBtn} onPress={() => setVisible(false)}>
              <Text style={styles.closeBtnText}>{tr('lang.close')}</Text>
            </TouchableOpacity>
          </View>
        </TouchableOpacity>
      </Modal>
    </>
  );
}

const styles = StyleSheet.create({
  trigger: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 10,
    minWidth: 72,
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
  triggerLabel: {
    fontSize: 13,
    fontWeight: '700',
    letterSpacing: 0.5,
  },
  labelLight: { color: '#ffffff' },
  labelDark: { color: '#374151' },
  flag: { fontSize: 20 },
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  sheet: {
    backgroundColor: '#ffffff',
    borderRadius: 20,
    padding: 24,
    width: '85%',
    maxWidth: 340,
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 8 },
        shadowOpacity: 0.15,
        shadowRadius: 24,
      },
      android: { elevation: 8 },
    }),
  },
  sheetTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#111827',
    marginBottom: 16,
    textAlign: 'center',
  },
  langRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    padding: 14,
    borderRadius: 12,
    marginBottom: 4,
  },
  langRowActive: {
    backgroundColor: '#f0fdf4',
  },
  langFlag: { fontSize: 22 },
  langLabel: { fontSize: 16, color: '#374151', flex: 1 },
  langLabelActive: { fontWeight: '700', color: '#009e49' },
  closeBtn: {
    marginTop: 12,
    padding: 14,
    backgroundColor: '#f3f4f6',
    borderRadius: 12,
    alignItems: 'center',
  },
  closeBtnText: { fontSize: 15, fontWeight: '600', color: '#6b7280' },
});
