import PageLoader from "@/components/PageLoader";

import { Alert, FlatList, Image, RefreshControl, Text, View } from 'react-native';
import { OrdersItem } from "../../components/OrdersItem";
import { SignOutButton } from '@/components/SignOutButton';
import { genStyles } from "@/assets/styles/general.styles.js";
import { styles } from "@/assets/styles/home.styles.js";
import { useEffect } from 'react';
import { useOrders } from "../../hooks/useOrders";
import { useUser } from '@clerk/clerk-expo';

export default function Home() {
  const { user } = useUser();
  const { orders, summary, isLoading, loadData, deleteOrder } = useOrders(user.id)
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

  // console.log("orders: ", orders);
  // console.log("summary: ", summary);
  

  const handleDelete = (id) => {
    Alert.alert("Delete Order", "Are you sure you want to delete this order?", [
      { text: "Cancel", style: "cancel"},
      { text: "Delete", style: "destructive", onPress: () => deleteOrder(id)},
    ]);
  };

  if(isLoading) return <PageLoader />;
  
  const topItem = summary.topRevContri[0].quantity > 1 ? summary.topRevContri[0].item + "s" :  summary.topRevContri[0].item;

  return (
    <View style={genStyles.container}>
      <View style={genStyles.content}>
        
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
                <Text style={styles.revenueAmount}>Php {parseFloat(summary.revenue[0].rev).toFixed(2)}</Text>
                <Text style={styles.topRevenueTitle}>Top Revenue Contributor</Text>
                <Text style={styles.topRevenueText}>{summary.topRevContri[0].name} | {summary.topRevContri[0].address} Area</Text>
                <Text style={styles.topRevenueText}>{summary.topRevContri[0].quantity} {topItem}</Text>
              </View>

              <View>
                <View style={styles.reportMiniCard}>
                  <Text style={styles.delivers}>Delivers</Text>
                  <Text style={styles.delivers}>{summary.delivers[0].count}</Text>
                </View>

                <View style={styles.reportMiniCard}>
                  <Text style={styles.walkins}>Walk-Ins</Text>
                  <Text style={styles.walkins}>{summary.walkins[0].count}</Text>
                </View>
              </View>

            </View>
          </View>
        
        {/* Start of logging all orders */}
        <View style={genStyles.itemsHeaderContainer}>
          <Text style={styles.sectionTitle}>Recent Orders</Text>
        </View>

          
      </View>
      
      {/* FlastList used for performance reasons, for rendering in particular */}
      <FlatList
        style={genStyles.itemsList}
        contentContainerStyle={genStyles.itemsListContent}
        data={null}
        renderItem={({item}) => (
          <OrdersItem item={item} onDelete={handleDelete}/>
        )}
        ListEmptyComponent={
          <View style={genStyles.emptyState}>
            <Text style={genStyles.emptyStateTitle}>No orders to display yet</Text>
          </View>
        }
      />
    </View>
  );
}