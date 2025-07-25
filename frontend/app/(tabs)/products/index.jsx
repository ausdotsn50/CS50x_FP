import Ionicons from '@expo/vector-icons/Ionicons';
import PageLoader from '@/components/PageLoader';

import { COLORS } from "@/constants/color.js"
import { FilteredSearch } from '@/components/FilteredSearch';
import { FlatList, RefreshControl, Text, TouchableOpacity, View } from 'react-native';
import { genStyles } from '@/assets/styles/general.styles.js';
import { handleDelete } from "@/utils/helpers";
import { ProductsItem } from '@/components/ProductsItem';
import { useEffect, useState } from 'react';
import { useProducts } from '@/hooks/useProducts';
import { useRouter } from 'expo-router';
import { useUser } from '@clerk/clerk-expo';

export default function Products() {
    const router = useRouter(); 
    
    const { user } = useUser();
    const { products, isLoading, loadData, deleteProduct } = useProducts(user.id); // add a delete route for this
    
    const[filteredProducts, setFilteredProducts] = useState([]);
    const[refreshing, setRefreshing] = useState(false);

    const createProduct = () => {
        // console.log("Creating product...");
        router.push("products/createProduct");
    }

    const onRefresh = async() => {
        setRefreshing(true);
        await loadData() // loading the data from scratch
        setRefreshing(false);
    } 

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
            {/* Add button */}
            <View style={[genStyles.itemCard, { marginHorizontal : 20 }]}>
                <TouchableOpacity onPress={() => createProduct()}style={[genStyles.itemContent, { alignItems: 'center', justifyContent: 'center' }]}> 
                    <Ionicons name="bag-add-outline" size={24} color={COLORS.text} />
                </TouchableOpacity>
            </View>
            <FlatList
                style={genStyles.itemsList}
                contentContainerStyle={genStyles.itemsListContent}
                data={filteredProducts}
                renderItem={({item}) => (
                    // Choose customer op
                    // To do: choose products for customer purchase
                    <ProductsItem item={item} onDelete={handleDelete} delOp={deleteProduct} cardAct={() => {null}}
                    />
                )}
                ListEmptyComponent={
                    <View style={genStyles.emptyState}>
                    <Text style={genStyles.emptyStateTitle}>No products to display yet</Text>
                    </View>
                }
                refreshControl={
                    <RefreshControl refreshing={refreshing} onRefresh={onRefresh}/>
                }
            />
            
        </View>
    );
}