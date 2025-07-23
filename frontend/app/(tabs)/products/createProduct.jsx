import MaterialIcons from '@expo/vector-icons/MaterialIcons';

import { COLORS } from "@/constants/color.js"
import { genStyles } from '@/assets/styles/general.styles.js';
import { View, Text, TouchableOpacity } from 'react-native';
import { styles } from "@/assets/styles/logOrder.styles.js";
import { useRouter } from 'expo-router';

const createProduct = () => {
    const router = useRouter();
    const handleReturn = () => {
        router.back();
    }

    return (
        <View style={genStyles.container}>
            <View style={genStyles.content}>
                <View style={genStyles.header}>
                    <TouchableOpacity>
                        <MaterialIcons name="cancel" size={24} color={COLORS.text} onPress={handleReturn}/>
                    </TouchableOpacity>
                </View>

                {/* Container for create/add products interface */}
                <View style={genStyles.form}>
                    <Text style={genStyles.formTitle}>New Product</Text>
                </View>
            </View>
        </View>
    );
}

// on submit order: use order route to create a new order for
export default createProduct;