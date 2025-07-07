import { ActivityIndicator, Text, TouchableOpacity } from 'react-native';
import { useClerk } from '@clerk/clerk-expo';
import { useRouter } from 'expo-router';
import { useState } from 'react';

export const SignOutButton = () => {
  const { signOut } = useClerk();
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const handleSignOut = async () => {
    try {
      setLoading(true); // on sign-out, setLoading 'state' to true
      await signOut(); // from Clerk
      router.replace('/sign-in');
    } catch (err) {
      console.error(JSON.stringify(err, null, 2));
    } finally {
      setLoading(false); // !imp
    }
  };

  return (
    <TouchableOpacity onPress={handleSignOut} disabled={loading}>
      {loading ? <ActivityIndicator /> : <Text>Sign out</Text>}
    </TouchableOpacity>
  );
};

// Loading: add acivity indicator
// Else: button