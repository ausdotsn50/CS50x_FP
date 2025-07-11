import { Redirect } from 'expo-router';
import { Tabs } from 'expo-router';
import { useUser } from '@clerk/clerk-expo';
import { Ionicons, FontAwesome, FontAwesome5, FontAwesome6 } from "@expo/vector-icons";
import { COLORS } from "@/constants/color.js";
import { BlurView } from 'expo-blur';
import { StyleSheet } from 'react-native';

export default function TabLayout() {
  const { isSignedIn } = useUser();

  if (!isSignedIn) return <Redirect href={"/sign-in"} />;

  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: COLORS.primary, // passed down to props.color for active
        tabBarInactiveTintColor: COLORS.primReduc, // passed down to props.color for inactive
        tabBarLabelStyle: {
          fontSize: 12,
          fontWeight: '300',
        },

        // Cp from react navigation doc
        tabBarStyle: { position: 'absolute' },
        tabBarBackground: () => (
          <BlurView tint="light" intensity={100} style={StyleSheet.absoluteFill} />
        ),
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          tabBarLabel: "Home",
          tabBarIcon: ({ color }) => (
            <FontAwesome name="home" size={24} color={color} />
          ),
        }}
      />

      <Tabs.Screen
        name="logOrder"
        options={{
          tabBarLabel: "Log Order",
          tabBarIcon: ({ color }) => (
            <FontAwesome5 name="cash-register" size={21} color={color} />
          ),
        }}
      />

      <Tabs.Screen
        name="customers"
        options={{
          tabBarLabel: "Customers",
          tabBarIcon: ({ color }) => (
            <Ionicons name="person" size={23} color={color} />
          ),
        }}
      />

      <Tabs.Screen
        name="products"
        options={{
          tabBarLabel: "Products",
          tabBarIcon: ({ color }) => (
            <FontAwesome6 name="bottle-water" size={23} color={color} />
          ),
        }}
      />
    </Tabs>
  );
}
