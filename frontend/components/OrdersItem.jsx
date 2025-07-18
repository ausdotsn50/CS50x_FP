import { COLORS } from "@/constants/color.js"
import Feather from '@expo/vector-icons/Feather';
import { genStyles } from "@/assets/styles/general.styles.js"
import { styles } from "@/assets/styles/home.styles.js"
import { Text, TouchableOpacity, View } from "react-native";

export const OrdersItem = ({ item, onDelete }) => {
    const typeDisplay = item.type === "deliver" ? "Deliver" : "Walk-In";
    const costAdd = item.type === "deliver" ? 5.00 : 0;
    const formattedDate = new Intl.DateTimeFormat('en-US', {
        dateStyle: 'medium',
    }).format(new Date(item.created_at));

    return (
        <View style={genStyles.itemCard}>
            <TouchableOpacity style={genStyles.itemContent}>
                <View style={genStyles.itemLeft}>
                    <Text style={genStyles.itemTitle}>{item.item}</Text>
                    <Text style={genStyles.itemType}>{typeDisplay}</Text>
                </View>

                <View style={genStyles.itemRight}>
                    <Text style={genStyles.itemAmount}>Php {((parseFloat(item.base_price) + costAdd) * item.quantity).toFixed(2)}</Text>
                    <Text style={genStyles.itemDate}>{formattedDate}</Text>
                </View>
            </TouchableOpacity>
            <TouchableOpacity style={genStyles.deleteButton} onPress={() => onDelete(item.id, "order")}>
                <Feather name="trash-2" size={24} color={COLORS.redShd} />
            </TouchableOpacity>
        </View>
    );
}
