import { Stack } from 'expo-router';
import { useColor } from '@/hooks/useColor';
import { useColorScheme } from '@/hooks/useColorScheme';
import { isLiquidGlassAvailable } from 'expo-glass-effect';
import { Text } from '@/components/ui/text';
import { Platform } from 'react-native';

export default function SearchLayout() {
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
          title: 'Search',
          headerTitle: () =>
            Platform.OS === 'android' ? (
              <Text variant='heading'>Search</Text>
            ) : undefined,
          headerSearchBarOptions: {
            placement: 'automatic',
            placeholder: 'Search',
            onChangeText: () => {},
          },
        }}
      />
    </Stack>
  );
}
