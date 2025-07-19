// styles src: https://gist.github.com/burakorkmez/2df88764ee2ba45672af1b98efd7737a
import { StyleSheet } from "react-native";
import { COLORS } from "@/constants/color.js";

export const styles = StyleSheet.create({
    header : {
        flexDirection: "row",
        justifyContent: "flex-end", 
        alignItems: "center",
        marginBottom: 20,
        paddingHorizontal: 0,
        paddingVertical: 12,
    },
    searchBar: {
        paddingHorizontal: 20,
        paddingVertical: 10, // adjust based on list container
        borderColor: COLORS.borderDrk,
        borderWidth: 1,
        borderRadius: 8,
        marginBottom: 20,
        paddingBottom: 5,
    },
    orderForm: {
        alignItems: "center",
        width: '100%',
        paddingHorizontal: 20,
        marginTop: 20,
        zIndex: 1,
    },
    dropdown: {
        height: 50,
        width: '100%', 
        borderColor: COLORS.border,
        borderWidth: 0.5,
        borderRadius: 8,
        paddingHorizontal: 8,
        backgroundColor: COLORS.card,
        marginBottom: 20,
        zIndex: 10,
    },
    icon: {
      marginRight: 5,
    },
    label: {
      position: 'absolute',
      backgroundColor: 'white',
      left: 22,
      top: 8,
      zIndex: 999,
      paddingHorizontal: 8,
      fontSize: 14,
    },
    placeholderStyle: {
        fontWeight: "bold",
        color: COLORS.border,
        fontSize: 16,
        textAlign: "center",
    },
    selectedTextStyle: {
      fontSize: 16,
    },
    iconStyle: {
      width: 20,
      height: 20,
    },
    inputSearchStyle: {
      height: 40,
      fontSize: 16,
    },
});
