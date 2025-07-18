import { Alert } from "react-native";

export const handleDelete = (id, itemType) => {
    const capitalized = itemType.charAt(0).toUpperCase() + itemType.slice(1)
    Alert.alert(`Delete ${capitalized}`, `Are you sure you want to delete this ${itemType}?`, [
        { text: "Cancel", style: "cancel"},
        { text: "Delete", style: "destructive", onPress: () => deleteOrder(id)},
    ]);
};

