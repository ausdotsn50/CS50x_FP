// styles src: https://gist.github.com/burakorkmez/2df88764ee2ba45672af1b98efd7737a
import { StyleSheet } from "react-native";
import { COLORS } from "@/constants/color.js";

export const genStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  content: {
    padding: 20,
    paddingBottom: 0,
  },
});
