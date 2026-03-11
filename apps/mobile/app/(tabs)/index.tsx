import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { StatusBar } from 'expo-status-bar';

const MODULES = [
  { title: 'Créer mon entreprise', icon: '🏢', color: '#E67E22' },
  { title: 'Marchés Publics', icon: '📋', color: '#3498DB' },
  { title: 'Innovation Hub', icon: '💡', color: '#9B59B6' },
  { title: 'Incubateur Digital', icon: '🚀', color: '#27AE60' },
  { title: 'Investir au Gabon', icon: '💰', color: '#F39C12' },
  { title: 'Observatoire', icon: '📊', color: '#1ABC9C' },
];

export default function HomeScreen() {
  return (
    <ScrollView style={styles.container}>
      <StatusBar style="light" />
      <View style={styles.hero}>
        <Text style={styles.heroTitle}>GABON BIZ</Text>
        <Text style={styles.heroSubtitle}>Votre portail économique numérique</Text>
      </View>
      <View style={styles.grid}>
        {MODULES.map((mod, index) => (
          <TouchableOpacity key={index} style={[styles.card, { borderLeftColor: mod.color }]}>
            <Text style={styles.cardIcon}>{mod.icon}</Text>
            <Text style={styles.cardTitle}>{mod.title}</Text>
          </TouchableOpacity>
        ))}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F5F6FA' },
  hero: {
    backgroundColor: '#E67E22',
    padding: 32,
    paddingTop: 48,
    alignItems: 'center',
  },
  heroTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
  heroSubtitle: {
    fontSize: 16,
    color: '#FDEBD0',
    marginTop: 8,
  },
  grid: {
    padding: 16,
    gap: 12,
  },
  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 20,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
    borderLeftWidth: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  cardIcon: { fontSize: 32 },
  cardTitle: { fontSize: 16, fontWeight: '600', color: '#2C3E50' },
});
