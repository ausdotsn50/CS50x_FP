import { ItemCard } from "./ItemCard";

export const ProductsItem = ({ item, onDelete, delOp, cardAct}) => {
    return (
        <ItemCard
            title={item.item}
            subT={"Php " + parseFloat(item.base_price).toFixed(2)}
            rightContent={null}
            onDelete={onDelete}
            id={item.id}
            itemType="product"
            delOp={delOp}
            cardAction={cardAct} // function call
        />
    )
}
