import PageLoader from '@/components/PageLoader';
import { FlatList, TextInput, Text, View } from 'react-native';
import { styles } from "@/assets/styles/logOrder.styles.js";
import { genStyles } from '@/assets/styles/general.styles.js';
import { useState } from 'react';
import { useCustomers } from "@/hooks/useCustomers.js";
import { useUser } from '@clerk/clerk-expo';
import { CustomersItem } from '@/components/CustomersItem';
import { useEffect  } from 'react';
import { handleDelete } from '@/utils/helpers';
import { useRouter } from 'expo-router';

export default function LogOrder() {
    const[searchQuery, setSearchQuery] = useState(""); // by default, an empty string
    
    const { user } = useUser();
    const { customers, isLoading, loadData, deleteCustomer } = useCustomers(user.id)

    const router = useRouter();
    
    const handleSearch = (query) => {
        setSearchQuery(query);
    }

    const createOrder = () => {
        router.push("logOrder/orderFor")
    }

    // Call customers hook
    useEffect(() => {
        loadData()
    }, [loadData]);

    if(isLoading) return <PageLoader />;

    return (
        <View style={genStyles.container}>
            <View style={genStyles.content}>
                <TextInput 
                    autoCapitalize='none'
                    autoComplete={false}
                    autoCorrect={false}
                    placeholder="Search" 
                    clearButtonMode='always' 
                    style={styles.searchBar}
                    value={searchQuery}
                    onChangeText={(query) => handleSearch(query) }
                />
            </View>
            {/* Customers list */}
            <FlatList
                style={genStyles.itemsList}
                contentContainerStyle={genStyles.itemsListContent}
                data={customers}
                renderItem={({item}) => (
                    // Choose customer op
                    // To do: choose products for customer purchase
                    <CustomersItem item={item} onDelete={handleDelete} delOp={deleteCustomer} cardAct={createOrder}/>
                )}
                ListEmptyComponent={
                    <View style={genStyles.emptyState}>
                    <Text style={genStyles.emptyStateTitle}>No customers to display yet</Text>
                    </View>
                }
            />
        </View>
    );
}