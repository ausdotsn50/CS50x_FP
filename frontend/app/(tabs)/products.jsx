import { Text, View } from 'react-native';
import { genStyles } from '@/assets/styles/general.styles.js';
import { styles } from "@/assets/styles/logOrder.styles.js";

export default function Products() {
    const[searchQuery, setSearchQuery] = useState(""); // by default, an empty string

    const handleSearch = (query) => {
        setSearchQuery(query); // searchQuery value changes via setSearchQuery
        
        const formattedQuery = query.toLowerCase(); // query in lower case
        const filteredData = filter(customers, (customer) => { 
            return contains(customer, formattedQuery)
        })
        setFilteredCustomers(filteredData);
    }

    const contains = (cm, query) => { // customer compared to query
        return cm.name?.toLowerCase().includes(query); // lower case to lower case comparison
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
                />
            </View>
        </View>
    );
}