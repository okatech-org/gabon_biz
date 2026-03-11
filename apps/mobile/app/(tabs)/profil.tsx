import { View, Text, StyleSheet } from 'react-native';

export default function ProfilScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Mon Profil</Text>
      <Text style={styles.subtitle}>Connectez-vous via GABON ID pour accéder à votre profil.</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#F5F6FA',
  },
  title: { fontSize: 22, fontWeight: 'bold', color: '#2C3E50' },
  subtitle: {
    fontSize: 14,
    color: '#95A5A6',
    marginTop: 8,
    textAlign: 'center',
    paddingHorizontal: 32,
  },
});
