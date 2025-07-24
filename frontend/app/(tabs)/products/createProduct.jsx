import MaterialIcons from '@expo/vector-icons/MaterialIcons';

import { Alert, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { API_URL } from '@/hooks/useOrders';
import { COLORS } from "@/constants/color.js"
import { genStyles } from '@/assets/styles/general.styles.js';
import { useRouter } from 'expo-router';
import { useState } from 'react';
import { useUser } from '@clerk/clerk-expo';
import { ErrorBox } from '@/components/ErrorBox';

const createProduct = () => {
    const router = useRouter();
    const { user } = useUser();

    // Values to be submitted
    const[itemValue, setItemValue] = useState(null);
    const[priceValue, setPriceValue] = useState(null);

    const[formSubError, setFormSubError] = useState(""); // error msg display for form submission
    const[subLoading, setSubLoading] = useState(false); // submission of form loading
    
    // Functions to be used
    const handleReturn = () => {
        router.back();
    }
    
    const submitForm = async() => {
        const price = Number(priceValue); // for isNaN checker

        if(!itemValue || !priceValue) {
            setFormSubError("All fields are required");
        } else if(isNaN(price) || price <= 0) {
            setFormSubError("Positive numeric values only");
        } else {
            setSubLoading(true);
            try {
                const response = await fetch(`${API_URL}/products`, {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                        userId: user.id,
                        item: itemValue,
                        base_price: priceValue,
                    }),
                });
                    if(!response.ok) throw new Error("Failed to create product");
                    Alert.alert("Success", "Product created succesfully");
            } catch(error) {
                console.error("Error creating product: ", error);
                Alert.alert("An error occurred", error.message);
            } finally {
                setSubLoading(false);
            }
        }
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
                    <TextInput
                        autoCapitalize="none"
                        autocomplete={false}
                        autoCorrect={false}
                        clearButtonMode="always"
                        style={[genStyles.searchBar, { marginBottom : 20, color: COLORS.borderDrk}]}
                        placeholder="Enter product item"
                        value={itemValue}
                        onChangeText={(item) => {
                            setItemValue(item);
                        }}
                    />
                    <TextInput
                        autoCapitalize="none"
                        autocomplete={false}
                        autoCorrect={false}
                        clearButtonMode="always"
                        style={[genStyles.searchBar, { marginBottom : 0, color: COLORS.borderDrk}]}
                        placeholder="Enter product base price"
                        value={priceValue}
                        onChangeText={(price) => {
                            const isDecimal = price.replace(/[^0-9.]/g, '').replace(/(\..*?)\./g, '$1'); // allows decimal format input
                            setPriceValue(isDecimal);
                        }}
                    />
                    <TouchableOpacity style={[genStyles.submitButton, subLoading && {backgroundColor : COLORS.card}]} onPress={submitForm} disabled={subLoading}>
                        <Text style={genStyles.subButtonTxt}>{subLoading ? "Creating..." : "Create Product"}</Text>
                    </TouchableOpacity>
                </View>

                <ErrorBox error={formSubError} setError={setFormSubError}/>
            </View>
        </View>
    );
}

// on submit order: use order route to create a new order for
export default createProduct;