import { Alert } from "react-native";
import { API_URL } from "./useOrders";
import { useCallback, useState } from "react"

// react custom hook
export const useProducts = (userId) => {
    const[products, setProducts] = useState([]); // store products data here
    const[isLoading, setIsLoading] = useState(true); // set to true so it is fetched immediately : after fetching is set to false
    
    const fetchProducts = useCallback(async() => {
        try {
            const response = await fetch(`${API_URL}/products/${userId}`);
            const data = await response.json();
            setProducts(data);
        } catch(error) {
            console.error("Error fetching products: ", error);
        }
    }, [userId]);
    
    const loadData = useCallback(async() => {
        if (!userId) return;
        setIsLoading(true);

        try {
            await fetchProducts();
        } catch(error) {
            console.error("Error loading data: ", error);
        } finally {
            setIsLoading(false); // after fetching set to false
        }
    },[fetchProducts, userId]);

    const deleteProduct = useCallback(async(id) => {
        try {
            const response = await fetch(`${API_URL}/products/${id}`, { method : "DELETE"});
            if (!response.ok) throw new Error("Failed to delete product");

            loadData();
            Alert.alert("Success", "Product deleted successfully");
        } catch(error) {
            console.error("Error deleting product: ", error); 
            Alert.alert("An error occurred", error.message);
        }
    }, [loadData]);

    return { products, isLoading, loadData, deleteProduct };
}