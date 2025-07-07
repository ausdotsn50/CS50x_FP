// To do
// Home page
import { useUser } from '@clerk/clerk-expo';
import { Text, View } from 'react-native';
import { SignOutButton } from '@/components/SignOutButton';

export default function Home() {
  const { user } = useUser();

  return (
    <View>
      <Text>Hello {user?.emailAddresses[0].emailAddress}</Text>
      <SignOutButton />
    </View>
  )
}