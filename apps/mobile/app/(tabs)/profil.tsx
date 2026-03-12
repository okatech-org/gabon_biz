import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useI18n } from '../../lib/i18n/i18nContext';
import LanguageSelector from '../../lib/i18n/LanguageSelector';
import { useTheme } from '../../lib/theme/ThemeContext';

const MENU_KEYS = [
  { icon: 'notifications-outline' as const, labelKey: 'profile.menu.notifications', badge: 3 },
  { icon: 'mail-outline' as const, labelKey: 'profile.menu.messages', badge: 1 },
  { icon: 'document-text-outline' as const, labelKey: 'profile.menu.documents', badge: 0 },
  { icon: 'stats-chart-outline' as const, labelKey: 'profile.menu.submissions', badge: 0 },
  { icon: 'settings-outline' as const, labelKey: 'profile.menu.settings', badge: 0 },
  { icon: 'help-circle-outline' as const, labelKey: 'profile.menu.help', badge: 0 },
];

export default function ProfilScreen() {
  const { tr } = useI18n();
  const { colors, isDark } = useTheme();

  return (
    <ScrollView style={[styles.container, { backgroundColor: colors.background }]}>
      {/* Avatar */}
      <View style={styles.header}>
        <View style={styles.avatar}>
          <Text style={styles.avatarText}>JN</Text>
        </View>
        <Text style={[styles.name, { color: colors.text }]}>Jean Ndong</Text>
        <Text style={[styles.email, { color: colors.textMuted }]}>j.ndong@gabon-id.ga</Text>
        <View style={styles.roleBadge}>
          <Text style={styles.roleText}>{tr('profile.role')}</Text>
        </View>
      </View>

      {/* Language */}
      <View style={[styles.langRow, { backgroundColor: colors.card, shadowColor: colors.shadow }]}>
        <Ionicons name="globe-outline" size={22} color={colors.text} />
        <Text style={[styles.langLabel, { color: colors.text }]}>
          {tr('profile.menu.language')}
        </Text>
        <View style={{ flex: 1 }} />
        <LanguageSelector />
      </View>

      {/* Menu */}
      <View style={[styles.menu, { backgroundColor: colors.card, shadowColor: colors.shadow }]}>
        {MENU_KEYS.map((item) => (
          <TouchableOpacity
            key={item.labelKey}
            style={[styles.menuItem, { borderBottomColor: isDark ? colors.border : '#f5f5f5' }]}
          >
            <Ionicons name={item.icon} size={22} color={colors.text} />
            <Text style={[styles.menuLabel, { color: colors.text }]}>{tr(item.labelKey)}</Text>
            <View style={{ flex: 1 }} />
            {item.badge > 0 && (
              <View style={styles.badgeCircle}>
                <Text style={styles.badgeText}>{item.badge}</Text>
              </View>
            )}
            <Ionicons name="chevron-forward" size={16} color={colors.border} />
          </TouchableOpacity>
        ))}
      </View>

      {/* Logout */}
      <TouchableOpacity
        style={[
          styles.logoutBtn,
          { backgroundColor: colors.card, borderColor: isDark ? '#ef444450' : '#fecaca' },
        ]}
      >
        <Ionicons name="log-out-outline" size={20} color="#ef4444" />
        <Text style={styles.logoutText}>{tr('profile.logout')}</Text>
      </TouchableOpacity>

      <View style={{ height: 40 }} />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f8f9fb' },
  header: { alignItems: 'center', padding: 32, paddingTop: 16 },
  avatar: {
    width: 72,
    height: 72,
    borderRadius: 36,
    backgroundColor: '#009e49',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 12,
  },
  avatarText: { color: '#ffffff', fontSize: 24, fontWeight: '700' },
  name: { fontSize: 20, fontWeight: '700', color: '#111827' },
  email: { fontSize: 14, color: '#9ca3af', marginTop: 4 },
  roleBadge: {
    marginTop: 10,
    backgroundColor: '#d1fae5',
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 8,
  },
  roleText: { fontSize: 11, fontWeight: '700', color: '#065f46' },
  langRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 14,
    marginHorizontal: 16,
    marginBottom: 12,
    backgroundColor: '#ffffff',
    borderRadius: 14,
    padding: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.04,
    shadowRadius: 4,
    elevation: 2,
  },
  langLabel: { fontSize: 15, color: '#374151', fontWeight: '500' },
  menu: {
    marginHorizontal: 16,
    backgroundColor: '#ffffff',
    borderRadius: 16,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.04,
    shadowRadius: 4,
    elevation: 2,
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 14,
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#f5f5f5',
  },
  menuLabel: { fontSize: 15, color: '#374151', fontWeight: '500' },
  badgeCircle: {
    backgroundColor: '#ef4444',
    borderRadius: 10,
    minWidth: 20,
    height: 20,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 6,
    marginRight: 8,
  },
  badgeText: { color: '#ffffff', fontSize: 11, fontWeight: '700' },
  logoutBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    margin: 16,
    padding: 16,
    backgroundColor: '#ffffff',
    borderRadius: 14,
    borderWidth: 1,
    borderColor: '#fecaca',
  },
  logoutText: { fontSize: 15, fontWeight: '600', color: '#ef4444' },
});
