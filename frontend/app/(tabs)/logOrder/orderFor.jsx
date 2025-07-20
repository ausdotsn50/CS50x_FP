import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import PageLoader from '@/components/PageLoader';

import { COLORS } from "@/constants/color.js"
import { genStyles } from '@/assets/styles/general.styles.js';
import { Text, TextInput, TouchableOpacity, View } from 'react-native'
import { styles } from "@/assets/styles/logOrder.styles.js";
import { useRouter } from 'expo-router';
import { CustomDropdown } from '@/components/CustomDropdown';
import { useProducts } from '@/hooks/useProducts';
import { useUser } from '@clerk/clerk-expo';
import { useEffect } from 'react';

const orderFor = () => {
  const router = useRouter();
  const { user } = useUser();
  const { products, isLoading, loadData } = useProducts(user.id)

  const handleReturn = () => {
    router.back()
  }

  // Call products hook
  useEffect(() => {
      loadData()
  }, [loadData]);

  const newProdMap = products.map(product => ({
    label: product.item,
    value: product.item,
  }));

  if(isLoading) return <PageLoader />;

  return (
    <View style={genStyles.container}>
      <View style={genStyles.content}>
        <View style={styles.header}>
            <TouchableOpacity>
              <MaterialIcons name="cancel" size={24} color={COLORS.text} onPress={handleReturn}/>
            </TouchableOpacity>
        </View>

        {/* Container for customer order interface  */}
        <View style={styles.orderForm}>
          <Text style={styles.orderFormTitle}>Create an order for Delfa</Text>
          <CustomDropdown 
            data={newProdMap} 
            placeholderText="Select product to order"/>
          <CustomDropdown 
            data={[
              { label: 'Walk-in', value: 'walk-in' },
              { label: 'Deliver', value: 'deliver' },
            ]}  
            placeholderText="Select type of order"/>
          <TextInput 
              autoCapitalize='none'
              autoComplete={false}
              autoCorrect={false}
              placeholder="Enter order quantity" 
              clearButtonMode='always' 
              style={[styles.searchBar, { marginBottom : 0 }]}
          />
          <TouchableOpacity style={styles.submitButton}>
              <Text style={styles.subButtonTxt}>Submit Order</Text>
          </TouchableOpacity>
        </View>

      </View>
    </View>
  )
}

export default orderFor;