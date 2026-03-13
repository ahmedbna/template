import { useAuthActions } from '@convex-dev/auth/react';
import { useConvexAuth } from 'convex/react';
import { useRouter } from 'expo-router';
import { LogOut } from 'lucide-react-native';
import { Text, TouchableOpacity } from 'react-native';

export const SignOutButton = () => {
  const router = useRouter();
  const { signOut } = useAuthActions();
  const { isAuthenticated } = useConvexAuth();

  const handleSignOut = async () => {
    try {
      await signOut();
      // Force a hard refresh to ensure clean state
      router.dismissAll();
    } catch (error) {
      console.error('Sign out error:', error);
      // Fallback navigation
      router.dismissAll();
    }
  };

  return isAuthenticated ? (
    <TouchableOpacity
      onPress={handleSignOut}
      style={{
        flexDirection: 'row',
        alignItems: 'center',
        padding: 12,
        backgroundColor: '#FF3B30',
        borderRadius: 8,
      }}
    >
      <LogOut color='white' />
      <Text style={{ color: 'white', fontWeight: 'bold' }}>Logout</Text>
    </TouchableOpacity>
  ) : null;
};
