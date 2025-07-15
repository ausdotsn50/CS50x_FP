// To do
// Home page
import PageLoader from "../../components/PageLoader";
import { useRouter } from 'expo-router';
import { SignOutButton } from '@/components/SignOutButton';
import { styles } from "@/assets/styles/home.styles.js";
import { Text, Image, View, TouchableOpacity } from 'react-native';
import { useEffect } from 'react';
import { useOrders } from "../../hooks/useOrders";
import { useUser } from '@clerk/clerk-expo';


export default function Home() {
  const { user } = useUser();
  const router = useRouter();
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
      <View style={styles.content}>
        {/* HEADER */}
        <View style={styles.header}>
          {/* Left side of header */}
          <View style={styles.headerLeft}>
            <Image 
              source={require("@/assets/images/waterDispenserBottle.png")}
              style={styles.headerLogo}
              resizeMode="contain"
            />
            <View style={styles.welcomeContainer}>

              <Text style={styles.welcomeText}>Welcome,</Text>
              <Text style={styles.usernameText}>{user?.emailAddresses[0]?.emailAddress.split("@")[0]}</Text>

            </View>
          </View>

          {/* Right side of header */}
          <View style={styles.headerRight}>
            <SignOutButton />
          </View>
        


        </View>
      </View>
    </View>
  );
}