// To do
// Home page
import PageLoader from "../../components/PageLoader";

import { SignOutButton } from '@/components/SignOutButton';
import { styles } from "@/assets/styles/auth.styles.js";
import { Text, View } from 'react-native';
import { useEffect } from 'react';
import { useOrders } from "../../hooks/useOrders";
import { useUser } from '@clerk/clerk-expo';


export default function Home() {
  const { user } = useUser();
  const { orders, summary, isLoading, loadData } = useOrders(user.id)

  // console.log("user id:", user.id);

  // Call orders hook
  useEffect(() => {
    loadData()
  }, [loadData]);

  console.log("orders: ", orders);
  console.log("summary: ", summary);

  if(isLoading) return <PageLoader />;

  return (
    <View style={styles.container}>
      <Text>Hello {user?.emailAddresses[0].emailAddress}</Text>
      <Text>Order Information</Text>
      <Text>Name: {orders[0].name}</Text>
      <Text>Address: {orders[0].address}</Text>
      <Text>Order type: {orders[0].type}</Text>
      <Text>Number of orders: {orders[0].quantity}</Text>
      <Text>Total amount owed: {orders[0].base_price * orders[0].quantity}</Text>
      <SignOutButton />
    </View>
  );
}