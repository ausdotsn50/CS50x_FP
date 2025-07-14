// To do
// Home page
import { useUser } from '@clerk/clerk-expo';
import { Text, View } from 'react-native';
import { SignOutButton } from '@/components/SignOutButton';
import { useOrders } from "../../hooks/useOrders";
import { useEffect } from 'react';
import PageLoader from "../../components/PageLoader";
import { styles } from "@/assets/styles/auth.styles.js";

export default function Home() {
  const { user } = useUser();
  const { orders, summary, isLoading, loadData } = useOrders(user.id)

  // console.log("user id:", user.id);

  // Call orders hook
  useEffect(() => {
    loadData()
  }, [loadData]);

  console.log("summary: ", summary);

  if(isLoading) return <PageLoader />;

  return (
    <View style={styles.container}>
      <Text>Hello {user?.emailAddresses[0].emailAddress}</Text>
      <Text>Order made by: {orders[0].user_id} </Text>
      <Text>Order type: {orders[0].type} </Text>
      <Text>Order created at: {summary[0].created_at}</Text>
      <SignOutButton />
    </View>
  );
}