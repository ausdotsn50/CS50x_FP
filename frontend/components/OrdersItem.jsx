import { COLORS } from "@/constants/color.js"
import Feather from '@expo/vector-icons/Feather';
import { styles } from "@/assets/styles/home.styles.js"
import { Text, TouchableOpacity, View } from "react-native";

export const OrdersItem = ({ item, onDelete }) => {
    const typeDisplay = item.type === "deliver" ? "Deliver" : "Walk-In";
    const costAdd = item.type === "deliver" ? 5.00 : 0;
    const formattedDate = new Intl.DateTimeFormat('en-US', {
        dateStyle: 'medium',
    }).format(new Date(item.created_at));

    return (
        <View style={styles.orderCard}>
            <TouchableOpacity style={styles.orderContent}>
                <View style={styles.orderLeft}>
                    <Text style={styles.orderTitle}>{item.item}</Text>
                    <Text style={styles.orderType}>{typeDisplay}</Text>
                </View>

                <View style={styles.orderRight}>
                    <Text style={styles.orderAmount}>Php {((parseFloat(item.base_price) + costAdd) * item.quantity).toFixed(2)}</Text>
                    <Text style={styles.orderDate}>{formattedDate}</Text>
                </View>
            </TouchableOpacity>
            <TouchableOpacity style={styles.deleteButton} onPress={() => onDelete(item.id)}>
                <Feather name="trash-2" size={24} color={COLORS.redShd} />
            </TouchableOpacity>
        </View>
    );
}
