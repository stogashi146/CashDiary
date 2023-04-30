import React from "react";
import { StyleSheet, Text, View, ViewStyle } from "react-native";
import { AntDesign } from "@expo/vector-icons";

interface IncomeExpenseTotalProps {
  expense: number;
  income: number;
  style?: ViewStyle;
}

export const IncomeExpenseTotal: React.FC<IncomeExpenseTotalProps> = (
  props
) => {
  const { expense, income, style } = props;
  const combinedStyles = StyleSheet.compose(
    styles.incomeExpenseContainer,
    style
  );

  return (
    <View style={styles.incomeExpenseContainer}>
      <View style={styles.incomeExpenseInnerContainer}>
        <Text style={styles.incomeExpenseInnerLabel}>支出</Text>
        <Text style={styles.expenseInnerAmount}>
          <AntDesign name="minus" size={16} iconStyle={styles.expenseIcon} />￥
          {expense}
        </Text>
      </View>
      <View style={styles.incomeExpenseInnerContainer}>
        <Text style={styles.incomeExpenseInnerLabel}>収入</Text>
        <Text style={styles.incomeInnerAmount}>
          <AntDesign name="plus" size={16} iconStyle={styles.incomeIcon} />￥
          {income}
        </Text>
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
    borderRadius: 10,
    borderColor: "rgba(0, 0, 0, 0.5)",
    width: "43%",
    paddingVertical: 4,
  },
  incomeExpenseInnerLabel: {
    fontSize: 14,
  },
  incomeInnerAmount: {
    fontSize: 18,
    fontWeight: "500",
    color: "#0094FF",
  },
  incomeIcon: {
    color: "#0094FF",
  },
  expenseInnerAmount: {
    fontSize: 18,
    fontWeight: "500",
    color: "#FF0000",
  },
  expenseIcon: {
    color: "#FF0000",
  },
});
