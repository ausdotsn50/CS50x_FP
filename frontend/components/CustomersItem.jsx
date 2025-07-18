import { COLORS } from "@/constants/color.js"
import Feather from '@expo/vector-icons/Feather';
import { genStyles } from "@/assets/styles/general.styles.js"
import { Text, TouchableOpacity, View } from "react-native";
import { ItemCard } from "./ItemCard";

export const CustomersItem = ({ item, onDelete, delOp }) => {
    return (
        <ItemCard
            title={item.name}
            subT={item.address}
            rightContent={null}
            onDelete={onDelete}
            id={item.id}
            itemType="customer"
            delOp={delOp}
        />
    )
}
