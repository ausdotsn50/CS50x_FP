// To do
// Main layout
import { Redirect } from 'expo-router';
import { Tabs } from 'expo-router';
import { useUser } from '@clerk/clerk-expo';

export default function TabLayout() {
  // const { isSignedIn, user, isLoaded } = useUser();
  // Learn more: https://clerk.com/docs/hooks/use-user
  const { isSignedIn } = useUser(); // isSignedin checker

  if (!isSignedIn) return <Redirect href={"/sign-in"} />; // sign-in as default page
    
  return (
    <Tabs screenOptions={{ headerShown : false }}>
      <Tabs.Screen name="index" options={{ title: "Home" }} />
      <Tabs.Screen name="logOrder" options={{ title: "Log Order" }} />
      <Tabs.Screen name="customers" options={{ title: "Customers "}} />
      <Tabs.Screen name="products" options={{ title: "Products "}} />
    </Tabs>
  );
}
