import React from "react";
import { StyleSheet, Text, View } from "react-native";

export const BalanceTotal = () => {
  return (
    <View style={styles.balanceBox}>
      <Text style={styles.balanceLabel}>収支</Text>
      <Text style={styles.balanceAmount}>+￥2,000</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  balanceBox: {
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center",
    alignSelf: "center",
    borderWidth: 0.5,
    width: "90.8%",
    marginTop: 5,
    paddingVertical: 6,
  },
  balanceLabel: {
    fontSize: 15,
    paddingLeft: 35,
  },
  balanceAmount: {
    fontSize: 28,
    fontWeight: "500",
    flex: 1,
    textAlign: "center",
    paddingRight: 35,
  },
});