import PageLoader from "../../components/PageLoader";

import { SignOutButton } from '@/components/SignOutButton';
import { styles } from "@/assets/styles/home.styles.js";
import { FlatList, Image, Text, View } from 'react-native';
import { useEffect } from 'react';
import { useOrders } from "../../hooks/useOrders";
import { useUser } from '@clerk/clerk-expo';


export default function Home() {
  const { user } = useUser();
  const { orders, summary, isLoading, loadData } = useOrders(user.id)
  const currentDate = new Date(); // date today

  const options1 = { year: 'numeric', month: 'long', day: 'numeric' };
  const options2 = { weekday: 'long' }

  const formattedDate = currentDate.toLocaleDateString(undefined, options1);
  const day = currentDate.toLocaleDateString(undefined, options2);

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

          {/* Place for summary card */}
          <View style={styles.reportCard}>
            <Text style={styles.reportTitle}>{day} Report | {formattedDate}</Text>

            {/* L and R report divisions */}
            <View style={styles.report}>
              
              <View>
                <Text style={styles.revenueAmount}>Php {parseFloat(summary.revenue).toFixed(2)}</Text>
                <Text style={styles.topRevenueTitle}>Top Revenue Contributor</Text>
                <Text style={styles.topRevenueText}>RJ | Lagundi Area</Text>
                <Text style={styles.topRevenueText}>7 Water Dispenser Jugs</Text>
              </View>

              <View>
                <View style={styles.reportMiniCard}>
                  <Text style={styles.delivers}>Delivers</Text>
                  <Text style={styles.delivers}>{summary.delivers[0].count}</Text>
                </View>

                <View style={styles.reportMiniCard}>
                  <Text style={styles.walkins}>Walk-ins</Text>
                  <Text style={styles.walkins}>{summary.walkins[0].count}</Text>
                </View>
              </View>

            </View>
          </View>
        
        {/* Start of logging all transactions */}
        <View style={styles.transactionsHeaderContainer}>
          <Text style={styles.sectionTitle}>Recent Orders</Text>
        </View>

          
      </View>

      {/* FlastList used for performance reasons, for rendering in particular */}
      <FlatList
        style={styles.transactionsList}
        contentContainerStyle={styles.transactionsListContent}
        data={orders}
      />
    </View>
  );
}