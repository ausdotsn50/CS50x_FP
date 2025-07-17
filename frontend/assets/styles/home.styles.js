// styles src: https://gist.github.com/burakorkmez/2df88764ee2ba45672af1b98efd7737a
import { StyleSheet } from "react-native";
import { COLORS } from "@/constants/color.js";

export const styles = StyleSheet.create({
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 20,
    paddingHorizontal: 0,
    paddingVertical: 12,
  },
  headerLogo: {
    width: 75,
    height: 75,
  },
  headerLeft: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
  },
  headerRight: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
  },
  welcomeContainer: {
    flex: 1,
  },
  welcomeText: {
    fontSize: 14,
    color: COLORS.textLight,
    marginBottom: 2,
  },
  usernameText: {
    fontSize: 16,
    fontWeight: "600",
    color: COLORS.text,
  },
  logoutButton: {
    padding: 10,
    borderRadius: 20,
    backgroundColor: COLORS.card,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 1,
  },
  report: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
    paddingHorizontal: 0,
  },
  reportCard: {
    backgroundColor: COLORS.card,
    borderRadius: 20,
    padding: 20,
    marginBottom: 20,
    shadowColor: COLORS.shadow,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 3,
  },
  reportTitle: {
    fontSize: 16,
    color: COLORS.textLight,
    marginBottom: 8,
  },
  revenueAmount: {
    fontSize: 32,
    fontWeight: "bold",
    color: COLORS.text,
    marginBottom: 20,
  },
  topRevenueTitle: {
    fontSize: 14,
    fontWeight: "bold",
    color: COLORS.text,
    marginBottom: 5,
    borderBottomColor: COLORS.shadow,
    borderBottomWidth: StyleSheet.hairlineWidth, // Creates a thin line
  },
  topRevenueText: {
    fontSize: 12,
    color: COLORS.text,
  },
  reportMiniCard: {
    backgroundColor: COLORS.card,
    borderRadius: 20,
    padding: 10,
    marginBottom: 5,
    shadowColor: COLORS.shadow,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 3,
  },
  delivers: {
    textAlign: "center",
    color: COLORS.redShd,
  },
  walkins: {
    textAlign: "center",
    color: COLORS.grnShd,
  },
  summaryStats: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  summaryStatItem: {
    flex: 1,
    alignItems: "center",
  },
  statDivider: {
    borderRightWidth: 1,
    borderColor: COLORS.border,
  },
  summaryStatLabel: {
    fontSize: 14,
    color: COLORS.textLight,
    marginBottom: 4,
  },
  summaryStatAmount: {
    fontSize: 18,
    fontWeight: "600",
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "600",
    color: COLORS.text,
    marginBottom: 15,
  },
  orderCard: {
    backgroundColor: COLORS.card,
    borderRadius: 12,
    marginBottom: 10,
    flexDirection: "row",
    alignItems: "center",
    shadowColor: COLORS.shadow,
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  orderContent: {
    flex: 1,
    flexDirection: "row",
    padding: 15,
    alignItems: "center",
  },
  categoryIconContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "#F5F5F5",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 12,
  },
  orderLeft: {
    flex: 1,
  },
  orderTitle: {
    fontSize: 16,
    fontWeight: "500",
    color: COLORS.text,
    marginBottom: 4,
  },
  orderType: {
    fontSize: 14,
    color: COLORS.textLight,
  },
  orderRight: {
    alignItems: "flex-end",
  },
  orderAmount: {
    fontSize: 16,
    fontWeight: "600",
    marginBottom: 4,
    color: COLORS.grnShd,
  },
  orderDate: {
    fontSize: 12,
    color: COLORS.textLight,
  },
  deleteButton: {
    padding: 15,
    borderLeftWidth: 1,
    borderLeftColor: COLORS.border,
  },
  loadingContainer: { // uzsed
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: COLORS.background,
  },
  ordersHeaderContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 10,
    paddingBottom: 5,
  },
  ordersList: {
    flex: 1,
    marginHorizontal: 20,
  },
  ordersListContent: {
    paddingBottom: 20,
  },
  emptyState: {
    borderRadius: 16,
    alignItems: "center",
    justifyContent: "center",
    shadowColor: COLORS.shadow,
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  emptyStateTitle: {
    fontSize: 15,
    fontWeight: "600",
    color: COLORS.text,
    marginBottom: 8,
  },
});
