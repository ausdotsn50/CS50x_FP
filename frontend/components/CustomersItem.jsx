import { COLORS } from "@/constants/color.js"
import Feather from '@expo/vector-icons/Feather';
import { genStyles } from "@/assets/styles/general.styles.js"
import { Text, TouchableOpacity, View } from "react-native";

export const CustomersItem = ({ item }) => {
    return (
        <View style={genStyles.itemCard}>
            <TouchableOpacity style={genStyles.itemContent}>
                
                <View style={genStyles.itemLeft}>
                    <Text style={genStyles.itemTitle}>{item.name}</Text>
                    <Text style={genStyles.itemType}>{item.address}</Text>
                </View>

            </TouchableOpacity>
            <TouchableOpacity style={genStyles.deleteButton} onPress={() => onDelete(item.id)}>
                <Feather name="trash-2" size={24} color={COLORS.redShd} />
            </TouchableOpacity>
        </View>
    );
}
