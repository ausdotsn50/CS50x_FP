import MaterialIcons from '@expo/vector-icons/MaterialIcons';

import { COLORS } from "@/constants/color.js"
import { genStyles } from '@/assets/styles/general.styles.js';
import { View, Text, TextInput, TouchableOpacity } from 'react-native';
import { useState } from 'react';
import { useRouter } from 'expo-router';

const createProduct = () => {
    const[subLoading, setSubLoading] = useState(false); // submission of form loading
    const router = useRouter();
    const handleReturn = () => {
        router.back();
    }

    // submit form logic here

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
                    <TextInput
                        autoCapitalize="none"
                        autocomplete={false}
                        autoCorrect={false}
                        clearButtonMode="always"
                        style={[genStyles.searchBar, { marginBottom : 20, color: COLORS.borderDrk}]}
                        placeholder="Enter product name"
                    />
                    <TextInput
                        autoCapitalize="none"
                        autocomplete={false}
                        autoCorrect={false}
                        clearButtonMode="always"
                        style={[genStyles.searchBar, { marginBottom : 0, color: COLORS.borderDrk}]}
                        placeholder="Enter product base price"
                    />
                    <TouchableOpacity style={[genStyles.submitButton, subLoading && {backgroundColor : COLORS.card}]} onPress={null} disabled={subLoading}>
                        <Text style={genStyles.subButtonTxt}>{subLoading ? "Submitting..." : "Submit Order"}</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    );
}

// on submit order: use order route to create a new order for
export default createProduct;