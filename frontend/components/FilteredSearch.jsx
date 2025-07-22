import filter from "lodash.filter";

import { useEffect, useState } from "react";
import { styles } from "@/assets/styles/logOrder.styles.js";
import { TextInput } from 'react-native';


export const FilteredSearch = ({ dataToFilter, onFilter }) => {
    const[searchQuery, setSearchQuery] = useState(""); // by default, an empty string

    const handleSearch = (query) => {
        setSearchQuery(query); // searchQuery value changes via setSearchQuery
        
        const formattedQuery = query.toLowerCase(); // query in lower case
        const filteredData = filter(dataToFilter, (data) => { 
            return contains(data, formattedQuery)
        })
        // set to filtered update
        onFilter(filteredData);
    }

    const contains = (cm, query) => { // customer compared to query
        return cm.name?.toLowerCase().includes(query); // lower case to lower case comparison
    }

    // requires useEffect
    useEffect(() => {
        if(searchQuery.trim() === "") { // currently contained in searchQuery
            onFilter(dataToFilter);
        }
    },[dataToFilter]);

    return (
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
    );
}