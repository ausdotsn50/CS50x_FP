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
import { useEffect, useState } from 'react';
import { useLocalSearchParams } from 'expo-router';

const orderFor = () => {
  const router = useRouter();
  const { user } = useUser();
  const { products, isLoading, loadData } = useProducts(user.id); 
  const { customerId, customerName } = useLocalSearchParams(); // local params passed from logOrder/index.jsx

  // Values for form submission
  const[productValue, setProductValue] = useState(null);
  const[pTypeValue, setPTypeValue] = useState(null);
  const[pQuantValue, setPQuantValue] = useState(null);

  // products data
  const newProdMap = products.map(product => ({
    label: product.item,
    value: product.id,
  }));

  // product ids only
  const productIds = products.map(product => product.id);

  // types data
  const types = [
    { label: 'Walk-in', value: 'walk in' },
    { label: 'Deliver', value: 'deliver' },
  ]

  // type values only
  const typeValues = types.map(type => type.value);

  const handleReturn = () => {
    router.back()
  }

  // Form submission logic and validation
  // Note: includes is an array function
  const submitForm = () => {
    if(!productValue || !pTypeValue || !pQuantValue || !productIds.includes(productValue) || 
      !typeValues.includes(pTypeValue) || isNaN(pQuantValue) || pQuantValue <= 0) {
        console.log("Form not ready for submission");
    }
    else {
      // To do, add route for submitting orders
      console.log("Form submitted");
      console.log(productValue);
      console.log(pTypeValue);
      console.log(pQuantValue);
    }
  }

  // Call products hook
  useEffect(() => {
      loadData()
  }, [loadData]);

  // console.log(newProdMap);
  // console.log(customerId, customerName);

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
          <Text style={styles.orderFormTitle}>Create an order for {customerName}</Text>
          <CustomDropdown 
            data={newProdMap} 
            placeholderText="Select product to order"
            passedValue={productValue}
            onChangeAct={(item) => {
              setProductValue(item.value);
            }}
          />
          <CustomDropdown 
            data={types}  
            placeholderText="Select type of order"
            passedValue={pTypeValue}
            onChangeAct={(item) => {
              setPTypeValue(item.value);
            }}
          />
          <TextInput 
              autoCapitalize='none'
              autoComplete={false}
              autoCorrect={false}
              clearButtonMode='always' 
              keyboardType="number-pad"
              style={[styles.searchBar, { marginBottom : 0, color: COLORS.borderDrk}]}
              placeholder="Enter order quantity"
              value={pQuantValue}
              onChangeText={(numInput) =>  {
                  const onlyDigits = numInput.replace(/[^0-9]/g, ''); // arguments for replace method string.replace(searchValue, replacement)
                  setPQuantValue(onlyDigits);
              }}
          />
          <TouchableOpacity style={styles.submitButton} onPress={submitForm}>
              <Text style={styles.subButtonTxt}>Submit Order</Text>
          </TouchableOpacity>
        </View>

      </View>
    </View>
  )
}

// on submit order: use order route to create a new order for
export default orderFor;