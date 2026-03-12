import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useI18n } from '../../lib/i18n/i18nContext';
import { useTheme } from '../../lib/theme/ThemeContext';

const MOCK_ENTERPRISES = [
  {
    id: '1',
    name: 'Mbadinga Technologies SARL',
    rccm: 'GA-LIB-2026-B-00001',
    status: 'ACTIVE',
    color: '#10b981',
  },
  {
    id: '2',
    name: 'Ogooué Logistics SA',
    rccm: 'GA-LIB-2026-B-00002',
    status: 'PENDING',
    color: '#f59e0b',
  },
  {
    id: '3',
    name: 'EcoGabon EI',
    rccm: 'GA-PGE-2026-B-00001',
    status: 'DRAFT',
    color: '#9ca3af',
  },
];

const STATUS_KEYS: Record<string, string> = {
  ACTIVE: 'enterprises.status.active',
  PENDING: 'enterprises.status.pending',
  DRAFT: 'enterprises.status.draft',
};

export default function EntreprisesScreen() {
  const { tr } = useI18n();
  const { colors } = useTheme();

  return (
    <ScrollView style={[styles.container, { backgroundColor: colors.background }]}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={[styles.title, { color: colors.text }]}>{tr('enterprises.title')}</Text>
        <TouchableOpacity style={styles.addBtn}>
          <Ionicons name="add" size={20} color="#ffffff" />
          <Text style={styles.addBtnText}>{tr('enterprises.new')}</Text>
        </TouchableOpacity>
      </View>

      {/* Cards */}
      {MOCK_ENTERPRISES.map((e) => (
        <TouchableOpacity
          key={e.id}
          style={[styles.card, { backgroundColor: colors.card, shadowColor: colors.shadow }]}
        >
          <View style={styles.cardHeader}>
            <View style={{ flex: 1 }}>
              <Text style={[styles.cardName, { color: colors.text }]}>{e.name}</Text>
              <Text style={[styles.cardRccm, { color: colors.textMuted }]}>{e.rccm}</Text>
            </View>
            <View style={[styles.badge, { backgroundColor: `${e.color}20` }]}>
              <View style={[styles.dot, { backgroundColor: e.color }]} />
              <Text style={[styles.badgeText, { color: e.color }]}>
                {tr(STATUS_KEYS[e.status])}
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
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  title: { fontSize: 22, fontWeight: '700', color: '#111827' },
  addBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    backgroundColor: '#009e49',
    borderRadius: 10,
    paddingHorizontal: 14,
    paddingVertical: 10,
  },
  addBtnText: { color: '#ffffff', fontSize: 13, fontWeight: '600' },
  card: {
    backgroundColor: '#ffffff',
    borderRadius: 14,
    padding: 18,
    marginBottom: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.04,
    shadowRadius: 4,
    elevation: 2,
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  },
  cardName: { fontSize: 15, fontWeight: '600', color: '#111827', marginBottom: 4 },
  cardRccm: { fontSize: 12, color: '#9ca3af', fontFamily: 'monospace' },
  badge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 8,
  },
  dot: { width: 6, height: 6, borderRadius: 3 },
  badgeText: { fontSize: 11, fontWeight: '600' },
});
