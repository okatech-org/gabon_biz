import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useI18n } from '../../lib/i18n/i18nContext';
import { useTheme } from '../../lib/theme/ThemeContext';

const MOCK_TENDERS = [
  {
    id: '1',
    ref: 'DGMP-2026-AO-001',
    title: 'Développement du SI des marchés publics',
    authority: 'MENUDI',
    deadline: '30 juin 2026',
    status: 'PUBLISHED',
    submissions: 5,
  },
  {
    id: '2',
    ref: 'DGMP-2026-AO-002',
    title: 'Réseau fibre optique Libreville',
    authority: 'ANINF',
    deadline: '15 juil. 2026',
    status: 'PUBLISHED',
    submissions: 12,
  },
  {
    id: '3',
    ref: 'DGMP-2026-AO-003',
    title: 'Équipements informatiques écoles',
    authority: 'MEN',
    deadline: '20 mai 2026',
    status: 'CLOSED',
    submissions: 8,
  },
];

const STATUS_COLORS: Record<string, { bg: string; text: string }> = {
  PUBLISHED: { bg: '#dbeafe', text: '#1e40af' },
  CLOSED: { bg: '#fecaca', text: '#991b1b' },
  DRAFT: { bg: '#f3f4f6', text: '#6b7280' },
};

export default function MarchesScreen() {
  const { tr } = useI18n();
  const { colors } = useTheme();

  return (
    <ScrollView style={[styles.container, { backgroundColor: colors.background }]}>
      <Text style={[styles.title, { color: colors.text }]}>{tr('markets.title')}</Text>
      <Text style={[styles.subtitle, { color: colors.textMuted }]}>
        {MOCK_TENDERS.length} {tr('markets.tenders_count')}
      </Text>

      {MOCK_TENDERS.map((t) => (
        <TouchableOpacity
          key={t.id}
          style={[styles.card, { backgroundColor: colors.card, shadowColor: colors.shadow }]}
        >
          <View style={styles.cardTop}>
            <Text style={styles.ref}>{t.ref}</Text>
            <View style={[styles.badge, { backgroundColor: STATUS_COLORS[t.status]?.bg }]}>
              <Text style={[styles.badgeText, { color: STATUS_COLORS[t.status]?.text }]}>
                {t.status === 'PUBLISHED' ? tr('markets.status.open') : tr('markets.status.closed')}
              </Text>
            </View>
          </View>
          <Text style={[styles.cardTitle, { color: colors.text }]}>{t.title}</Text>
          <View style={styles.cardMeta}>
            <View style={styles.metaItem}>
              <Ionicons name="business-outline" size={14} color="#9ca3af" />
              <Text style={styles.metaText}>{t.authority}</Text>
            </View>
            <View style={styles.metaItem}>
              <Ionicons name="calendar-outline" size={14} color="#9ca3af" />
              <Text style={styles.metaText}>{t.deadline}</Text>
            </View>
            <View style={styles.metaItem}>
              <Ionicons name="document-text-outline" size={14} color="#9ca3af" />
              <Text style={styles.metaText}>
                {t.submissions} {tr('markets.submissions')}
              </Text>
            </View>
          </View>
        </TouchableOpacity>
      ))}

      <View style={{ height: 40 }} />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f8f9fb', padding: 16 },
  title: { fontSize: 22, fontWeight: '700', color: '#111827', marginBottom: 4 },
  subtitle: { fontSize: 14, color: '#9ca3af', marginBottom: 16 },
  card: {
    backgroundColor: '#ffffff',
    borderRadius: 14,
    padding: 18,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.04,
    shadowRadius: 4,
    elevation: 2,
  },
  cardTop: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  ref: { fontSize: 12, color: '#9ca3af', fontFamily: 'monospace' },
  badge: { paddingHorizontal: 8, paddingVertical: 3, borderRadius: 6 },
  badgeText: { fontSize: 11, fontWeight: '600' },
  cardTitle: {
    fontSize: 15,
    fontWeight: '600',
    color: '#111827',
    lineHeight: 20,
    marginBottom: 10,
  },
  cardMeta: { flexDirection: 'row', gap: 16, flexWrap: 'wrap' },
  metaItem: { flexDirection: 'row', alignItems: 'center', gap: 4 },
  metaText: { fontSize: 12, color: '#9ca3af' },
});
