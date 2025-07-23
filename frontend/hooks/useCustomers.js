import { Alert } from "react-native";
import { API_URL } from "./useOrders";
import { useCallback, useState } from "react"

// react custom hook
export const useCustomers = (userId) => {
    const[customers, setCustomers] = useState([]); // store customers data here
    const[isLoading, setIsLoading] = useState(true); // set to true so it is fetched immediately : after fetching is set to false
    
    const fetchCustomers = useCallback(async() => {
        try {
            const response = await fetch(`${API_URL}/customers/${userId}`);
            const data = await response.json();
            setCustomers(data);
        } catch(error) {
            console.error("Error fetching customers: ", error);
        }
    }, [userId]);

    
    const loadData = useCallback(async() => {
        if (!userId) return;
        setIsLoading(true);

        try {
            await fetchCustomers();
        } catch(error) {
            console.error("Error loading data: ", error);
        } finally {
            setIsLoading(false); // after fetching set to false
        }
    },[fetchCustomers, userId]);

    const deleteCustomer = useCallback(async(id) => {
        try {
            const response = await fetch(`${API_URL}/customers/${id}`, { method : "DELETE"});
            if (!response.ok) throw new Error("Failed to delete customer");

            loadData();
            Alert.alert("Success", "Customer deleted successfully");
        } catch(error) {
            console.error("Error deleting customer: ", error); 
            Alert.alert("An error occurred", error.message);
        }
    }, [loadData]);
    
    return { customers, isLoading, loadData, deleteCustomer };
}