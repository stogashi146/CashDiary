import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { AntDesign } from "@expo/vector-icons";
import { formatDateToYYYYMM } from "../utils/dateFormat";

export const MonthSelect: React.FC = () => {
  // 現在の日付をYYYY年MM月の形式にする
  const [currentMonth, setcurrentMonth] = React.useState(new Date());

  const onPressArrow = (type: "prev" | "next") => {
    if (type === "prev") {
      setcurrentMonth(
        new Date(currentMonth.setMonth(currentMonth.getMonth() - 1))
      );
    } else {
      setcurrentMonth(
        new Date(currentMonth.setMonth(currentMonth.getMonth() + 1))
      );
    }
  };

  return (
    <View style={styles.monthContainer}>
      <TouchableOpacity
        style={styles.monthArrow}
        onPress={() => onPressArrow("prev")}
      >
        <AntDesign name="left" size={24} color="black" />
      </TouchableOpacity>
      <Text style={styles.monthTitle}>{formatDateToYYYYMM(currentMonth)}</Text>
      <TouchableOpacity
        style={styles.monthArrow}
        onPress={() => onPressArrow("next")}
      >
        <AntDesign name="right" size={24} color="black" />
      </TouchableOpacity>
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
    padding: 8,
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
