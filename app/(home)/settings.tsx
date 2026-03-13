import { SignOutButton } from '@/components/auth/singout';
import { Spinner } from '@/components/ui/spinner';
import { api } from '@/convex/_generated/api';
import { useQuery } from 'convex/react';
import { ScrollView, Text, View } from 'react-native';

export default function SettingsScreen() {
  const user = useQuery(api.auth.loggedInUser);

  if (user === undefined) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Spinner color='#000000' />
      </View>
    );
  }

  if (user === null) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text>Not Authenticated</Text>
      </View>
    );
  }

  return (
    <ScrollView
      style={{ flex: 1 }}
      contentContainerStyle={{
        flex: 1,
        gap: 18,
        paddingTop: 96,
        alignItems: 'center',
      }}
    >
      <View style={{ alignItems: 'center' }}>
        <Text>Your convex user Id</Text>
        <Text>{user._id}</Text>
      </View>

      <SignOutButton />
    </ScrollView>
  );
}
