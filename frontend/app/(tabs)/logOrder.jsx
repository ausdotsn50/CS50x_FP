import { FlatList, TextInput, Text, View } from 'react-native';
import { styles } from "@/assets/styles/logOrder.styles.js";
import { genStyles } from '@/assets/styles/general.styles.js';
import { useState } from 'react';
import { useCustomers } from "@/hooks/useCustomers.js";
import { useUser } from '@clerk/clerk-expo';
import { CustomersItem } from '@/components/CustomersItem';
import { useEffect  } from 'react';
import PageLoader from '@/components/PageLoader';

export default function LogOrder() {
    const { user } = useUser();
    const { customers, isLoading, loadData } = useCustomers(user.id)
    const[searchQuery, setSearchQuery] = useState(""); // by default, an empty string
    
    const handleSearch = (query) => {
        setSearchQuery(query);
    }

    // Call customers hook
    useEffect(() => {
        loadData()
    }, [loadData]);

    console.log("customers: ", customers);

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
                >
                </TextInput>
            </View>
            {/* Customers list */}
            <FlatList
                style={genStyles.itemsList}
                contentContainerStyle={genStyles.itemsListContent}
                data={customers}
                renderItem={({item}) => (
                    <CustomersItem item={item}/>
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