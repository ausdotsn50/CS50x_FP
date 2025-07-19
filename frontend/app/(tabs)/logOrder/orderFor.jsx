import MaterialIcons from '@expo/vector-icons/MaterialIcons';

import { COLORS } from "@/constants/color.js"
import { genStyles } from '@/assets/styles/general.styles.js';
import { Text, TextInput, TouchableOpacity, View } from 'react-native'
import { styles } from "@/assets/styles/logOrder.styles.js";
import { useRouter } from 'expo-router';
import { CustomDropdown } from '@/components/CustomDropdown';

const orderFor = () => {
  const router = useRouter();

  const handleReturn = () => {
    router.back()
  }

  // Order for customer picked {id}
  // Id for some route to insert the new order
  

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
          <Text style={genStyles.sectionTitle}>Create an order for Delfa</Text>
          <CustomDropdown placeholderText="Select product to order"/>
          <CustomDropdown placeholderText="Select type of order"/>
          <TextInput 
              autoCapitalize='none'
              autoComplete={false}
              autoCorrect={false}
              placeholder="Select order quantity" 
              clearButtonMode='always' 
              style={styles.searchBar}
              onChangeText={(query) => handleSearch(query) }
          />
        </View>

      </View>
    </View>
  )
}

export default orderFor;