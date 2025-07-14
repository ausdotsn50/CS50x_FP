// To do
// Home page
import { useUser } from '@clerk/clerk-expo';
import { Text, View } from 'react-native';
import { SignOutButton } from '@/components/SignOutButton';
import { useOrders } from "../../hooks/useOrders";
import { useEffect } from 'react';

export default function Home() {
  const { user } = useUser();
  const { orders, summary, isLoading, loadData } = useOrders(user.id)
  
  console.log("user id:", user.id);

  // Call orders hook
  useEffect(() => {
    loadData()
  }, [loadData]);

  console.log("orders: ", orders);

  return (
    <View>
      <Text>Hello {user?.emailAddresses[0].emailAddress}</Text>
      <SignOutButton />
    </View>
  )
}