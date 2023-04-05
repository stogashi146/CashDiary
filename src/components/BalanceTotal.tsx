import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { AntDesign } from "@expo/vector-icons";

export const BalanceTotal: React.FC = () => {
  return (
    <View style={styles.balanceBox}>
      <Text style={styles.balanceLabel}>収支</Text>
      <Text style={styles.balanceAmount}>
        <AntDesign name="plus" size={24} color={"black"} />
        ￥2,000
      </Text>
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
