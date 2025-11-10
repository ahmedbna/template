import { Button } from '@/components/ui/button';
import { Link } from '@/components/ui/link';
import { Text } from '@/components/ui/text';
import { View } from '@/components/ui/view';

export default function HomeScreen() {
  return (
    <View
      style={{
        flex: 1,
        gap: 16,
        padding: 24,
        justifyContent: 'center',
      }}
    >
      <Text
        variant='heading'
        style={{
          textAlign: 'center',
        }}
      >
        Built with ❤️ by BNA
      </Text>

      <Link asChild href='/sheet'>
        <Button>Open Sheet</Button>
      </Link>
    </View>
  );
}
