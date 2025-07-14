import { useCallback, useState } from "react"

const API_URL = "http://localhost:5001/api"

// react custom hook follow-along
export const useOrders = (userId) => {
    const[orders, setOrders] = useState([]); // orders state that is going to be an empty array --> array of orders will be stored here
    const[summary, setSummary] = useState({
        revenue: 0,
        walkins: 0,
        delivers: 0,
    }); // state that keeps track of summary
    // subject to update
    const[isLoading, setIsLoading] = useState(true); // set to true so it is fetched immediately
    // after fetching is set to false

    /* useCallback 
        useCallback takes two arguments: 
        a function and a dependency array. 
        
        It "memoizes" (caches) the provided function, 
        meaning it will only recreate the function if 
        one of the values in its dependency array changes

        - preventing unnecessary re-renders of components
    */
    const fetchOrders = useCallback(async() => {
        try {
            const response = await fetch(`${API_URL}/orders/${userId}`);
            const data = await response.json();
            setOrders(data);
        } catch(error) {
            console.log("Error fetching orders", error);
        }
    }, [userId]);

    // arg1: whole callback func, arg2: userId

    const fetchSummary = useCallback(async() => {
        try {
            const response = await fetch(`${API_URL}/orders/summary/${userId}`);
            const data = await response.json();
            setSummary(data);
        } catch(error) {
            console.log("Error fetching summarry", error);
        }
    }, [userId]);

    // function to be able to call orders and summary at the same time
    const loadData = useCallback(async() => {
        if (!userId) return;
        setIsLoading(true);

        try {
            // functions can be run simultaneously
            /* Instead of
                await fetchOrders
                await fetchSummary    
            */

            await Promise.all([fetchOrders(), fetchSummary()]);
        } catch(error) {
            console.error("Error loading data:", error);
        } finally {
            setIsLoading(false); // after fetching set to false
        }
    },[fetchOrders, fetchSummary, userId]);

    // loadData to refresh UI
    // add delete functionality

    return { orders, summary, isLoading, loadData };
}

// deploy API in render.com