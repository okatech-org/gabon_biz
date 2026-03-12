import { Tabs } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { useI18n } from '../../lib/i18n/i18nContext';
import LanguageSelector from '../../lib/i18n/LanguageSelector';
import { useTheme } from '../../lib/theme/ThemeContext';
import ThemeToggle from '../../lib/theme/ThemeToggle';
import { View } from 'react-native';

export default function TabLayout() {
  const { tr } = useI18n();
  const { colors } = useTheme();

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: colors.primary,
        tabBarInactiveTintColor: colors.textMuted,
        tabBarStyle: {
          backgroundColor: colors.card,
          borderTopColor: colors.border,
          paddingBottom: 8,
          paddingTop: 8,
          height: 88,
        },
        tabBarLabelStyle: { fontSize: 11, fontWeight: '600' },
        headerStyle: { backgroundColor: colors.heroBg },
        headerTintColor: '#ffffff',
        headerTitleStyle: { fontWeight: 'bold', fontSize: 17 },
        headerRight: () => (
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <LanguageSelector variant="light" />
            <ThemeToggle variant="light" />
          </View>
        ),
        headerRightContainerStyle: { paddingRight: 16 },
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: tr('tab.home'),
          headerShown: true,
          tabBarIcon: ({ color, size }) => <Ionicons name="home" size={size} color={color} />,
        }}
      />
      <Tabs.Screen
        name="entreprises"
        options={{
          title: tr('tab.enterprises'),
          tabBarIcon: ({ color, size }) => <Ionicons name="business" size={size} color={color} />,
        }}
      />
      <Tabs.Screen
        name="marches"
        options={{
          title: tr('tab.markets'),
          tabBarIcon: ({ color, size }) => <Ionicons name="briefcase" size={size} color={color} />,
        }}
      />
      <Tabs.Screen
        name="innovation"
        options={{
          title: tr('tab.innovation'),
          tabBarIcon: ({ color, size }) => <Ionicons name="bulb" size={size} color={color} />,
        }}
      />
      <Tabs.Screen
        name="profil"
        options={{
          title: tr('tab.profile'),
          tabBarIcon: ({ color, size }) => <Ionicons name="person" size={size} color={color} />,
        }}
      />
    </Tabs>
  );
}
