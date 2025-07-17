// styles src: https://gist.github.com/burakorkmez/2df88764ee2ba45672af1b98efd7737a
import { StyleSheet } from "react-native";
import { COLORS } from "@/constants/color.js";

export const styles = StyleSheet.create({
    searchBar: {
        paddingHorizontal: 20,
        paddingVertical: 10, // adjust based on list container
        borderColor: COLORS.borderDrk,
        borderWidth: 1,
        borderRadius: 8,
        marginBottom: 20,
        paddingBottom: 5,
    }
});
