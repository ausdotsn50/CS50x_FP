import { Text, View, FlatList } from 'react-native';
import { genStyles } from '@/assets/styles/general.styles.js';
// import { FilteredSearch } from '@/components/FilteredSearch';
// import { styles } from "@/assets/styles/logOrder.styles.js";
import { useState } from 'react';
import { CustomersItem } from '@/components/CustomersItem';
import { useCustomers } from '@/hooks/useCustomers';
import { handleDelete } from "@/utils/helpers";
import { useUser } from '@clerk/clerk-expo';
import { useEffect } from 'react';
import { FilteredSearch } from '@/components/FilteredSearch';

import PageLoader from '@/components/PageLoader';

export default function customer() {
    const { user } = useUser();
    const { customers, isLoading, loadData, deleteCustomer } = useCustomers(user.id);
    const[filteredCustomers, setfilteredCustomers] = useState([]);

    // Call customers hook
    useEffect(() => {
        loadData()
    }, [loadData]);

    if(isLoading) return <PageLoader />;

    return (
        <View style={genStyles.container}>
            <View style={genStyles.content}>
                <FilteredSearch dataToFilter={customers} onFilter={setfilteredCustomers}/>
            </View>
            <FlatList
                style={genStyles.itemsList}
                contentContainerStyle={genStyles.itemsListContent}
                data={filteredCustomers}
                renderItem={({item}) => (
                    // Choose customer op
                    // To do: choose products for customer purchase
                    <CustomersItem item={item} onDelete={handleDelete} delOp={deleteCustomer} cardAct={() => {null}}
                    />
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