import PageLoader from '@/components/PageLoader';

import { CustomersItem } from '@/components/CustomersItem';
import { FilteredSearch } from '@/components/FilteredSearch';
import { FlatList, Text, View, RefreshControl } from 'react-native';
import { genStyles } from '@/assets/styles/general.styles.js';
import { handleDelete } from '@/utils/helpers';
import { useCustomers } from "@/hooks/useCustomers.js";
import { useEffect, useState  } from 'react';
import { useRouter } from 'expo-router';
import { useUser } from '@clerk/clerk-expo';

export default function LogOrder() {
    const { user } = useUser();
    const { customers, isLoading, loadData, deleteCustomer } = useCustomers(user.id);
    const router = useRouter(); 

    const[filteredCustomers, setFilteredCustomers] = useState([]); // stored filtered query of customers here
    const[refreshing, setRefreshing] = useState(false);

    const onRefresh = async() => {
        setRefreshing(true);
        await loadData() // loading the data from scratch
        setRefreshing(false);
    }

    const createOrder = (id, name) => {
        router.push({
            pathname: "/logOrder/orderFor",
            params: {
                customerId: id,
                customerName: name,
            }
        });
    };
    
    // Call customers hook
    useEffect(() => {
        loadData()
    }, [loadData]);

    if(isLoading) return <PageLoader />;

    return (
        <View style={genStyles.container}>
            <View style={genStyles.content}>
                <FilteredSearch dataToFilter={customers} onFilter={setFilteredCustomers}/>
            </View>
            {/* Customers list */}
            <FlatList
                style={genStyles.itemsList}
                contentContainerStyle={genStyles.itemsListContent}
                data={filteredCustomers}
                renderItem={({item}) => (
                    // Choose customer op
                    // To do: choose products for customer purchase
                    <CustomersItem item={item} onDelete={handleDelete} delOp={deleteCustomer} cardAct={createOrder}
                    />
                )}
                ListEmptyComponent={
                    <View style={genStyles.emptyState}>
                    <Text style={genStyles.emptyStateTitle}>No customers to display yet</Text>
                    </View>
                }
                refreshControl={
                    <RefreshControl refreshing={refreshing} onRefresh={onRefresh}/>
                }
            />
        </View>
    );
}