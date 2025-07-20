import filter from "lodash.filter";
import PageLoader from '@/components/PageLoader';

import { CustomersItem } from '@/components/CustomersItem';
import { FlatList, Text, TextInput, View } from 'react-native';
import { styles } from "@/assets/styles/logOrder.styles.js";
import { genStyles } from '@/assets/styles/general.styles.js';
import { handleDelete } from '@/utils/helpers';
import { useCustomers } from "@/hooks/useCustomers.js";
import { useEffect  } from 'react';
import { useRouter } from 'expo-router';
import { useState } from 'react';
import { useUser } from '@clerk/clerk-expo';

export default function LogOrder() {
    const { user } = useUser();
    const { customers, isLoading, loadData, deleteCustomer } = useCustomers(user.id)

    const[searchQuery, setSearchQuery] = useState(""); // by default, an empty string
    const[filteredCustomers, setFilteredCustomers] = useState([]); // stored filtered query of customers here

    const router = useRouter();
    
    const handleSearch = (query) => {
        setSearchQuery(query); // searchQuery value changes via setSearchQuery
        
        const formattedQuery = query.toLowerCase(); // query in lower case
        const filteredData = filter(customers, (customer) => { 
            return contains(customer, formattedQuery)
        })
        setFilteredCustomers(filteredData);
    }

    const contains = (cm, query) => { // customer compared to query
        return cm.name?.toLowerCase().includes(query); // lower case to lower case comparison
    }

    const createOrder = () => {
        router.push("logOrder/orderFor");
    }

    // Call customers hook
    useEffect(() => {
        loadData()
    }, [loadData]);

    useEffect(() => {
        if(searchQuery.trim() === "") {
            setFilteredCustomers(customers);
        }
    },[customers]);

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
                data={filteredCustomers}
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