// Main tab layout
// To do: customize tabs look
import { Redirect } from 'expo-router';
import { Tabs } from 'expo-router';
import { useUser } from '@clerk/clerk-expo';
import { Ionicons, FontAwesome, FontAwesome5, FontAwesome6 } from "@expo/vector-icons";
import { COLORS } from "@/constants/color.js";

export default function TabLayout() {
  // const { isSignedIn, user, isLoaded } = useUser();
  // Learn more: https://clerk.com/docs/hooks/use-user
  const { isSignedIn } = useUser(); // isSignedin checker

  if (!isSignedIn) return <Redirect href={"/sign-in"} />; // sign-in as default page
    
  // Note: title - above; tabBar -  below
  // Globally apply a style to your tabBars in <Tabs>
  return (
    <Tabs screenOptions={{ 
          headerShown : false,
          tabBarActiveTintColor: "none", // to modify
          tabBarInactiveTintColor: "none", // to modify
          tabBarLabelStyle: {
            fontSize: 12,
            fontWeight: 300,
          },
        }}
      >
      <Tabs.Screen 
        name="index" 
        options={{ 
          tabBarLabel: "Home",
          tabBarIcon: () => <FontAwesome name="home" size={24} color="black" />,
        }} 
      />

      <Tabs.Screen 
        name="logOrder" 
        options={{ 
          tabBarLabel: "Log Order",
          tabBarIcon: () => <FontAwesome5 name="cash-register" size={21} color="black" />,
        }} 
      />

      <Tabs.Screen 
        name="customers" 
        options={{ 
          tabBarLabel: "Customers",
          tabBarIcon: () => <Ionicons name="person" size={23} color="black" />,
        }} 
      />

      <Tabs.Screen 
        name="products" 
        options={{ 
          tabBarLabel: "Products",
          tabBarIcon: () => <FontAwesome6 name="bottle-water" size={23} color="black" />,
        }} 
      />
    </Tabs>
  );
}
