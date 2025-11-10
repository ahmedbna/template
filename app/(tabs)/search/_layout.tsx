import { Stack } from 'expo-router';
import { useColor } from '@/hooks/useColor';
import { useColorScheme } from '@/hooks/useColorScheme';
import { isLiquidGlassAvailable } from 'expo-glass-effect';
import { Text } from '@/components/ui/text';
import { Platform } from 'react-native';

export default function SearchLayout() {
  const theme = useColorScheme();
  const text = useColor('text');
  const background = useColor('background');

  return (
    <Stack
      screenOptions={{
        headerLargeTitle: true,
        headerLargeTitleShadowVisible: false,
        headerTintColor: text,
        headerBlurEffect: isLiquidGlassAvailable()
          ? undefined
          : theme === 'dark'
            ? 'systemMaterialDark'
            : 'systemMaterialLight',
        headerStyle: {
          backgroundColor: isLiquidGlassAvailable()
            ? 'transparent'
            : background,
        },
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
