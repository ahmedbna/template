import { Stack } from 'expo-router';
import { useColor } from '@/hooks/useColor';
import { Platform, useColorScheme } from 'react-native';
import { Text } from '@/components/ui/text';
import { isLiquidGlassAvailable } from 'expo-glass-effect';

export default function SettingsLayout() {
  const text = useColor('text');
  const theme = useColorScheme();

  return (
    <Stack
      screenOptions={{
        headerLargeTitle: true,
        headerLargeTitleShadowVisible: false,
        headerTransparent: true,
        headerTintColor: text,
        headerBlurEffect: isLiquidGlassAvailable()
          ? undefined
          : theme === 'dark'
            ? 'systemMaterialDark'
            : 'systemMaterialLight',
      }}
    >
      <Stack.Screen
        name='index'
        options={{
          title: 'Settings',
          headerTitle: () =>
            Platform.OS === 'android' ? (
              <Text variant='heading'>Settings</Text>
            ) : undefined,
        }}
      />
    </Stack>
  );
}
