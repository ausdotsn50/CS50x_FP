import MaterialIcons from '@expo/vector-icons/MaterialIcons';

import { API_URL } from '@/hooks/useOrders';
import { COLORS } from "@/constants/color.js";
import { ErrorBox } from '@/components/ErrorBox';
import { genStyles } from '@/assets/styles/general.styles.js';
import { Text, TextInput, TouchableOpacity, View } from 'react-native';
import { useRouter } from 'expo-router';
import { useState } from 'react';
import { useUser } from '@clerk/clerk-expo';

const createCustomer = () => {
    const { user } = useUser();
    const router = useRouter();
    
    const[nameValue, setNameValue] = useState(null);
    const[addressValue, setAddressValue] = useState(null);

    const[formSubError, setFormSubError] = useState(""); // error msg display for form submission
    const[subLoading, setSubLoading] = useState(false); // submission of form loading

    const handleReturn = () => {
        router.back();
    }

    const submitForm = async() => {
        if(!nameValue || !addressValue) {
            setFormSubError("All fields are required");
        } else {
            setSubLoading(true);
            try {
                const response = await fetch(`${API_URL}/customers`, {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                        userId: user.id,
                        name: nameValue,
                        address: addressValue,
                    }),
                });
                    if(!response.ok) throw new Error("Failed to create customer");
                    Alert.alert("Success", "Customer created succesfully");
            } catch(error) {
                console.error("Error creating customer: ", error);
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

                {/* Container for create/add customers interface */}
                <View style={genStyles.form}>
                    <Text style={genStyles.formTitle}>New Customer</Text>
                    <TextInput
                        autoCapitalize="none"
                        autocomplete={false}
                        autoCorrect={false}
                        clearButtonMode="always"
                        style={[genStyles.searchBar, { marginBottom : 20, color: COLORS.borderDrk}]}
                        placeholder="Enter customer name"
                        value={nameValue}
                        onChangeText={(name) => {
                            setNameValue(name);
                        }}
                    />
                    <TextInput
                        autoCapitalize="none"
                        autocomplete={false}
                        autoCorrect={false}
                        clearButtonMode="always"
                        style={[genStyles.searchBar, { marginBottom : 0, color: COLORS.borderDrk}]}
                        placeholder="Enter customer address"
                        value={addressValue}
                        onChangeText={(address) => {
                            setAddressValue(address);
                        }}
                    />
                    <TouchableOpacity style={[genStyles.submitButton, subLoading && {backgroundColor : COLORS.card}]} onPress={submitForm} disabled={subLoading}>
                        <Text style={genStyles.subButtonTxt}>{subLoading ? "Creating..." : "Create Customer"}</Text>
                    </TouchableOpacity>
                </View>

                <ErrorBox error={formSubError} setError={setFormSubError}/>
            </View>
        </View>
    );
}

// on submit order: use order route to create a new order for
export default createCustomer;