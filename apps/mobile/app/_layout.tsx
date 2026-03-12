import { Stack } from 'expo-router';
import { I18nProvider } from '../lib/i18n/i18nContext';
import { ThemeProvider } from '../lib/theme/ThemeContext';

export default function RootLayout() {
  return (
    <ThemeProvider>
      <I18nProvider>
        <Stack screenOptions={{ headerShown: false }}>
          <Stack.Screen name="(tabs)" />
        </Stack>
      </I18nProvider>
    </ThemeProvider>
  );
}
