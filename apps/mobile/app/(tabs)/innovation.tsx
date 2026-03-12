import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { useI18n } from '../../lib/i18n/i18nContext';
import { useTheme } from '../../lib/theme/ThemeContext';

const SOLUTIONS = [
  {
    id: '1',
    name: 'GabonPay',
    startup: 'Mbadinga Technologies',
    category: 'FinTech',
    pricing: 'Freemium',
    rating: 4.5,
    icon: '💳',
  },
  {
    id: '2',
    name: 'AgroTrack',
    startup: 'Ogooué Agri',
    category: 'AgriTech',
    pricing: 'Payant',
    rating: 4.2,
    icon: '🌱',
  },
  {
    id: '3',
    name: 'EduConnect GA',
    startup: 'Digital School GA',
    category: 'EdTech',
    pricing: 'Gratuit',
    rating: 4.8,
    icon: '📚',
  },
  {
    id: '4',
    name: 'HealthBot GA',
    startup: 'MedGabon AI',
    category: 'HealthTech',
    pricing: 'Freemium',
    rating: 3.9,
    icon: '🩺',
  },
];

export default function InnovationScreen() {
  const { tr } = useI18n();
  const { colors } = useTheme();

  return (
    <ScrollView style={[styles.container, { backgroundColor: colors.background }]}>
      <Text style={[styles.title, { color: colors.text }]}>{tr('innovation.title')}</Text>
      <Text style={[styles.subtitle, { color: colors.textMuted }]}>
        {tr('innovation.subtitle')}
      </Text>

      {SOLUTIONS.map((s) => (
        <TouchableOpacity
          key={s.id}
          style={[styles.card, { backgroundColor: colors.card, shadowColor: colors.shadow }]}
        >
          <View style={styles.cardRow}>
            <View style={styles.iconWrap}>
              <Text style={{ fontSize: 28 }}>{s.icon}</Text>
            </View>
            <View style={{ flex: 1 }}>
              <Text style={[styles.name, { color: colors.text }]}>{s.name}</Text>
              <Text style={[styles.meta, { color: colors.textMuted }]}>
                {s.startup} • {s.category}
              </Text>
              <View style={styles.ratingRow}>
                <Text style={{ fontSize: 13 }}>⭐ {s.rating}</Text>
                <View style={styles.pricingBadge}>
                  <Text style={styles.pricingText}>{s.pricing}</Text>
                </View>
              </View>
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
    padding: 16,
    marginBottom: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.04,
    shadowRadius: 4,
    elevation: 2,
  },
  cardRow: { flexDirection: 'row', alignItems: 'center', gap: 14 },
  iconWrap: {
    width: 52,
    height: 52,
    borderRadius: 14,
    backgroundColor: '#f0fdf4',
    alignItems: 'center',
    justifyContent: 'center',
  },
  name: { fontSize: 15, fontWeight: '600', color: '#111827' },
  meta: { fontSize: 12, color: '#9ca3af', marginTop: 2 },
  ratingRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    marginTop: 6,
  },
  pricingBadge: {
    backgroundColor: '#dbeafe',
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 6,
  },
  pricingText: { fontSize: 11, fontWeight: '600', color: '#1e40af' },
});
