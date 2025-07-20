import { genStyles } from "@/assets/styles/general.styles.js"
import { Text } from "react-native";
import { ItemCard } from "./ItemCard";

export const OrdersItem = ({ item, onDelete, delOp }) => {
    const typeDisplay = item.type === "deliver" ? "Deliver" : "Walk-In";
    const costAdd = item.type === "deliver" ? 5.00 : 0;
    const formattedDate = new Intl.DateTimeFormat('en-US', {
        dateStyle: 'medium',
    }).format(new Date(item.created_at));

    return (
        <ItemCard
            title={item.name}
            subT={typeDisplay}
            rightContent={
                <>
                    <Text style={genStyles.itemAmount}>Php {((parseFloat(item.base_price) + costAdd) * item.quantity).toFixed(2)}</Text>
                    <Text style={genStyles.itemDate}>{formattedDate}</Text>
                </>
            }
            onDelete={onDelete} 
            id={item.id}
            itemType="order"
            delOp = {delOp}
            cardAction={() => {
                null
            }}
        />
    )
}
