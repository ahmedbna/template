import { ScrollView } from '@/components/ui/scroll-view';
import { Text } from '@/components/ui/text';

export default function SearchScreen() {
  return (
    <ScrollView
      style={{
        flex: 1,
        gap: 16,
        padding: 24,
      }}
    >
      <Text
        variant='heading'
        style={{
          textAlign: 'center',
        }}
      >
        BNA Search Screen
      </Text>
    </ScrollView>
  );
}
