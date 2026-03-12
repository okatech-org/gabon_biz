import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { Ionicons } from '@expo/vector-icons';
import { useI18n } from '../../lib/i18n/i18nContext';
import { useTheme } from '../../lib/theme/ThemeContext';

const MODULES_KEYS = [
  {
    titleKey: 'module.enterprises.title',
    descKey: 'module.enterprises.desc',
    icon: '🏢',
    color: '#009e49',
    screen: 'entreprises',
  },
  {
    titleKey: 'module.markets.title',
    descKey: 'module.markets.desc',
    icon: '📋',
    color: '#3b82f6',
    screen: 'marches',
  },
  {
    titleKey: 'module.innovation.title',
    descKey: 'module.innovation.desc',
    icon: '💡',
    color: '#8b5cf6',
    screen: 'innovation',
  },
  {
    titleKey: 'module.incubator.title',
    descKey: 'module.incubator.desc',
    icon: '🚀',
    color: '#ec4899',
    screen: 'incubateur',
  },
  {
    titleKey: 'module.investors.title',
    descKey: 'module.investors.desc',
    icon: '💰',
    color: '#14b8a6',
    screen: 'investir',
  },
  {
    titleKey: 'module.stats.title',
    descKey: 'module.stats.desc',
    icon: '📊',
    color: '#f59e0b',
    screen: 'observatoire',
  },
  {
    titleKey: 'module.directory.title',
    descKey: 'module.directory.desc',
    icon: '🌾',
    color: '#ef4444',
    screen: 'filieres',
  },
];

const STATS_KEYS = [
  { value: '350+', labelKey: 'home.stats.enterprises', icon: 'business' as const },
  { value: '67', labelKey: 'home.stats.tenders', icon: 'briefcase' as const },
  { value: '128', labelKey: 'home.stats.startups', icon: 'rocket' as const },
];

export default function HomeScreen() {
  const { tr } = useI18n();
  const { colors, isDark } = useTheme();

  return (
    <ScrollView style={[styles.container, { backgroundColor: colors.background }]}>
      <StatusBar style="light" />

      {/* Hero */}
      <View style={[styles.hero, { backgroundColor: colors.heroBg }]}>
        <Text
          style={[styles.badge, { color: colors.primaryLight, backgroundColor: colors.iconBg }]}
        >
          {tr('home.hero.subtitle')}
        </Text>
        <Text style={styles.heroTitle}>{tr('home.hero.title')}</Text>
        <Text style={[styles.heroSubtitle, { color: colors.primaryLight }]}>
          {tr('home.hero.description')}
        </Text>
      </View>

      {/* Stats */}
      <View style={styles.statsRow}>
        {STATS_KEYS.map((s) => (
          <View
            key={s.labelKey}
            style={[styles.statCard, { backgroundColor: colors.card, shadowColor: colors.shadow }]}
          >
            <Ionicons name={s.icon} size={20} color={colors.primary} />
            <Text style={[styles.statValue, { color: colors.text }]}>{s.value}</Text>
            <Text style={[styles.statLabel, { color: colors.textMuted }]}>{tr(s.labelKey)}</Text>
          </View>
        ))}
      </View>

      {/* Modules */}
      <View style={styles.section}>
        <Text style={[styles.sectionTitle, { color: colors.text }]}>{tr('home.modules')}</Text>
        {MODULES_KEYS.map((mod, i) => (
          <TouchableOpacity
            key={i}
            style={[
              styles.moduleCard,
              { backgroundColor: colors.card, shadowColor: colors.shadow },
            ]}
          >
            <View
              style={[
                styles.moduleIcon,
                { backgroundColor: isDark ? colors.iconBg : `${mod.color}15` },
              ]}
            >
              <Text style={{ fontSize: 28 }}>{mod.icon}</Text>
            </View>
            <View style={styles.moduleText}>
              <Text style={[styles.moduleTitle, { color: colors.text }]}>{tr(mod.titleKey)}</Text>
              <Text style={[styles.moduleDesc, { color: colors.textMuted }]}>
                {tr(mod.descKey)}
              </Text>
            </View>
            <Ionicons name="chevron-forward" size={18} color={colors.textMuted} />
          </TouchableOpacity>
        ))}
      </View>

      <View style={{ height: 40 }} />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f8f9fb' },
  hero: {
    backgroundColor: '#009e49',
    padding: 32,
    paddingTop: 20,
    paddingBottom: 40,
    alignItems: 'center',
  },

  badge: {
    fontSize: 12,
    color: '#d1fae5',
    backgroundColor: 'rgba(255,255,255,0.15)',
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 12,
    overflow: 'hidden',
    marginBottom: 12,
  },
  heroTitle: { fontSize: 32, fontWeight: '800', color: '#ffffff', letterSpacing: 1 },
  heroSubtitle: { fontSize: 14, color: '#d1fae5', marginTop: 6, textAlign: 'center' },
  statsRow: {
    flexDirection: 'row',
    marginHorizontal: 16,
    marginTop: -24,
    gap: 10,
  },
  statCard: {
    flex: 1,
    backgroundColor: '#ffffff',
    borderRadius: 14,
    padding: 16,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.06,
    shadowRadius: 8,
    elevation: 3,
  },
  statValue: { fontSize: 22, fontWeight: '800', color: '#111827', marginTop: 6 },
  statLabel: { fontSize: 11, color: '#9ca3af', marginTop: 2, fontWeight: '500' },
  section: { padding: 16, paddingTop: 24 },
  sectionTitle: { fontSize: 18, fontWeight: '700', color: '#111827', marginBottom: 12 },
  moduleCard: {
    backgroundColor: '#ffffff',
    borderRadius: 14,
    padding: 16,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 14,
    marginBottom: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.04,
    shadowRadius: 4,
    elevation: 2,
  },
  moduleIcon: {
    width: 52,
    height: 52,
    borderRadius: 14,
    alignItems: 'center',
    justifyContent: 'center',
  },
  moduleText: { flex: 1 },
  moduleTitle: { fontSize: 15, fontWeight: '600', color: '#111827' },
  moduleDesc: { fontSize: 12, color: '#9ca3af', marginTop: 2 },
});
