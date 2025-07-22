import { Text, View, FlatList } from 'react-native';
import { genStyles } from '@/assets/styles/general.styles.js';
// import { FilteredSearch } from '@/components/FilteredSearch';
// import { styles } from "@/assets/styles/logOrder.styles.js";
import { useState } from 'react';
import { ProductsItem } from '@/components/ProductsItem';
import { useProducts } from '@/hooks/useProducts';
import { handleDelete } from "@/utils/helpers";
import { useUser } from '@clerk/clerk-expo';
import { useEffect } from 'react';
import { FilteredSearch } from '@/components/FilteredSearch';

import PageLoader from '@/components/PageLoader';

export default function Products() {
    const { user } = useUser();
    const { products, isLoading, loadData } = useProducts(user.id); // add a delete route for this
    const[filteredProducts, setFilteredProducts] = useState([]);

    // Call customers hook
    useEffect(() => {
        loadData()
    }, [loadData]);

    if(isLoading) return <PageLoader />;

    return (
        <View style={genStyles.container}>
            <View style={genStyles.content}>
                <FilteredSearch dataToFilter={products} onFilter={setFilteredProducts}/>
            </View>
            <FlatList
                style={genStyles.itemsList}
                contentContainerStyle={genStyles.itemsListContent}
                data={filteredProducts}
                renderItem={({item}) => (
                    // Choose customer op
                    // To do: choose products for customer purchase
                    <ProductsItem item={item} onDelete={handleDelete} delOp={null} cardAct={null}
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