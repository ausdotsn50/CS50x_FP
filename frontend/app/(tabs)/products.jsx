import { Text, View, FlatList } from 'react-native';
import { genStyles } from '@/assets/styles/general.styles.js';
import { FilteredSearch } from '@/components/FilteredSearch';
import { styles } from "@/assets/styles/logOrder.styles.js";
import { useState } from 'react';
import { CustomersItem } from '@/components/CustomersItem';

export default function Products() {
    const[filteredProducts, setFilteredProducts] = useState([]);

    const products = [
        'This is temp',
        'This is temp I promise',
    ]

    return (
        <View style={genStyles.container}>
            <View style={genStyles.content}>
                
            </View>
            <FlatList
                style={genStyles.itemsList}
                contentContainerStyle={genStyles.itemsListContent}
                data={filteredProducts}
                renderItem={({item}) => (
                    // Choose customer op
                    // To do: choose products for customer purchase
                    <CustomersItem item={item} onDelete={null} delOp={null} cardAct={null}
                    />
                )}
                ListEmptyComponent={
                    <View style={genStyles.emptyState}>
                    <Text style={genStyles.emptyStateTitle}>No products to display yet</Text>
                    </View>
                }
            />
        </View>
    );
}