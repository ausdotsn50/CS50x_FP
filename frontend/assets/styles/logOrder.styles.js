// styles src: https://gist.github.com/burakorkmez/2df88764ee2ba45672af1b98efd7737a
// styles src: https://www.npmjs.com/package/react-native-element-dropdown
import { StyleSheet } from "react-native";
import { COLORS } from "@/constants/color.js";

export const styles = StyleSheet.create({
  header: {
    flexDirection: "row",
    justifyContent: "flex-end", 
    alignItems: "center",
    marginBottom: 20,
    paddingHorizontal: 0,
    paddingVertical: 12,
  },
  searchBar: {
    paddingHorizontal: 20,
    paddingVertical: 8, // adjust based on list container
    borderColor: COLORS.borderDrk,
    borderWidth: 1,
    borderRadius: 8,
    marginBottom: 20,
    paddingBottom: 5,
    fontSize: 16,
    color: COLORS.shadow,
    width: "100%",
    textAlign: "center"
  },
  orderForm: {
    backgroundColor: COLORS.card,
    paddingVertical: 40,
    paddingHorizontal: 20,
    marginTop: 20,
    zIndex: 1,
    borderRadius: 12,
    shadowColor: COLORS.shadow,
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
    marginBottom: 30,
  },
  orderFormTitle: {
    fontSize: 24,
    fontWeight: "600",
    color: COLORS.text,
    marginBottom: 30,
    textAlign: "center",
  },
  dropdown: {
    height: 50,
    width: '100%', 
    borderColor: COLORS.border,
    borderWidth: 0.5,
    borderRadius: 8,
    paddingHorizontal: 8,
    backgroundColor: COLORS.card,
    marginBottom: 30,
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
    textAlign: "center",
    fontWeight: "bold",
    color: COLORS.border,
    fontSize: 16,
  },
  iconStyle: {
    width: 20,
    height: 20,
  },
  inputSearchStyle: {
    color: COLORS.borderDrk,
    textAlign: "center",
    height: 40,
    fontSize: 16,
  },
  itemTextStyle: {
    textAlign: "center",
    color: COLORS.borderDrk,
    fontSize: 16,
  },
  submitButton: {
    backgroundColor: COLORS.background,
    marginTop: 30,
    borderRadius: 12,
    width: '90%',
    height: 50,
    justifyContent: "center", 
    alignItems: "center",     
    alignSelf: "center",
  },
  subButtonTxt: {
    color: COLORS.text,
    fontWeight: "bold",
    fontSize: 16,
    textAlign: "center",
  }
});
