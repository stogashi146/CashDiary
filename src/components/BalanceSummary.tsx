import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { AntDesign } from "@expo/vector-icons";

interface balanceSummaryProps {
  amountSummary: AmountSummaryData;
}

export const BalanceSummary: React.FC<balanceSummaryProps> = (props) => {
  const { amountSummary } = props;
  return (
    <View>
      <View style={styles.incomeExpenseContainer}>
        <View style={styles.incomeExpenseInnerContainer}>
          <Text style={styles.incomeExpenseInnerLabel}>支出</Text>
          <Text style={styles.expenseInnerAmount}>
            <AntDesign name="minus" size={16} iconStyle={styles.expenseIcon} />
            ￥{amountSummary.expense}
          </Text>
        </View>
        <View style={styles.incomeExpenseInnerContainer}>
          <Text style={styles.incomeExpenseInnerLabel}>収入</Text>
          <Text style={styles.incomeInnerAmount}>
            <AntDesign name="plus" size={16} iconStyle={styles.incomeIcon} />￥
            {amountSummary.income}
          </Text>
        </View>
      </View>

      <View style={styles.balanceBox}>
        <Text style={styles.balanceLabel}>収支</Text>
        <Text style={styles.balanceAmount}>
          {amountSummary.directionType === "plus" && (
            <AntDesign name="plus" size={24} color={"black"} />
          )}
          {amountSummary.directionType === "minus" && (
            <AntDesign name="minus" size={24} color={"black"} />
          )}
          ￥{amountSummary.total}
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
  balanceBox: {
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center",
    alignSelf: "center",
    borderWidth: 0.5,
    borderRadius: 10,
    borderColor: "rgba(0, 0, 0, 0.5)",
    width: "90.8%",
    marginTop: 5,
    paddingVertical: 3,
  },
  balanceLabel: {
    fontSize: 14,
    paddingLeft: 35,
  },
  balanceAmount: {
    fontSize: 23,
    fontWeight: "500",
    flex: 1,
    textAlign: "center",
    paddingRight: 35,
  },
});
