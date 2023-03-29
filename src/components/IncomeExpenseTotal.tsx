import React from "react";
import { StyleSheet, Text, View } from "react-native";

export const IncomeExpenseTotal: React.FC = () => {
  return (
    <View style={styles.incomeExpenseContainer}>
      <View style={styles.incomeExpenseInnerContainer}>
        <Text style={styles.incomeExpenseInnerLabel}>収入</Text>
        <Text style={styles.incomeInnerAmount}>+￥5,000</Text>
      </View>
      <View style={styles.incomeExpenseInnerContainer}>
        <Text style={styles.incomeExpenseInnerLabel}>支出</Text>
        <Text style={styles.expenseInnerAmount}>-￥3,000</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  incomeExpenseContainer: {
    flexDirection: "row",
    justifyContent: "space-evenly",
  },
  incomeExpenseInnerContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    borderWidth: 0.5,
    width: "43%",
    paddingVertical: 10,
  },
  incomeExpenseInnerLabel: {
    fontSize: 15,
  },
  incomeInnerAmount: {
    fontSize: 20,
    fontWeight: "500",
    color: "#0094FF",
  },
  expenseInnerAmount: {
    fontSize: 20,
    fontWeight: "500",
    color: "#FF0000",
  },
});
