import React from "react";
import { StyleSheet, Text, View } from "react-native";

export const MonthSelect: React.FC = () => {
  return (
    <View style={styles.monthContainer}>
      <Text style={styles.monthArrow}>＜</Text>
      <Text style={styles.monthTitle}>2023年11月</Text>
      <Text style={styles.monthArrow}>＞</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  monthContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginHorizontal: 20,
    height: 50,
  },
  monthArrow: {
    fontSize: 20,
    lineHeight: 32,
    marginTop: 1,
  },
  monthTitle: {
    fontSize: 20,
    fontWeight: "400",
    lineHeight: 32,
    color: "#D6423A",
    paddingHorizontal: 50,
    backgroundColor: "#F2F2F6",
  },
});
