import { FlatList, TextInput, Text, View } from 'react-native';
import { styles } from "@/assets/styles/logOrder.styles.js";
import { genStyles } from '@/assets/styles/general.styles';
import { useState } from 'react';

export default function LogOrder() {
    const [isLoading, setIsLoading] = useState(false);
    const [data, setData] = useState([]); // fetching data from an API endpoint
    // const [error, setError] = useState(null);
    // const [fullData, setFullData] = useState([]);
    const[searchQuery, setSearchQuery] = useState(""); // by default, an empty string

    const handleSearch = (query) => {
        setSearchQuery(query);
    }
    
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
                <FlatList
                />
            </View>
        </View>
    );
}