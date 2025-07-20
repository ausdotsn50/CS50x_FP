import Feather from '@expo/vector-icons/Feather';

import { COLORS } from "@/constants/color.js"
import { genStyles } from "@/assets/styles/general.styles.js"
import { Text, TouchableOpacity, View } from "react-native";

// actual rendering * actual func calls
export const ItemCard = ({ title, subT, rightContent, onDelete, id, itemType, delOp, cardAction}) => {
    return (
        <View style={genStyles.itemCard}>
            <TouchableOpacity style={genStyles.itemContent} onPress={() => cardAction(id, title)}> 
                <View style={genStyles.itemLeft}>
                    <Text style={genStyles.itemTitle}>{title}</Text>
                    <Text style={genStyles.itemType}>{subT}</Text>
                </View>

                {rightContent && (
                    <View style={genStyles.itemRight}>
                        {rightContent}
                    </View>
                )}
            </TouchableOpacity>
            
            <TouchableOpacity style={genStyles.deleteButton} onPress={() => onDelete(id, itemType, delOp)}>
                <Feather name="trash-2" size={24} color={COLORS.redShd} />
            </TouchableOpacity>
        </View>
    );
}
