import React, { useState } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { AntDesign } from "@expo/vector-icons";
import { formatDateToYYYYMM } from "../utils/DateFormat";

interface MonthSelectmProps {
  handleSetMonth: (date: Date) => void;
}

export const MonthSelect: React.FC<MonthSelectmProps> = (props) => {
  const { handleSetMonth } = props;
  // 現在の日付をYYYY年MM月の形式にする
  const [currentMonth, setCurrentMonth] = useState(new Date());

  const onPressArrow = (type: "prev" | "next") => {
    const year = currentMonth.getFullYear();
    const month = currentMonth.getMonth();

    if (type === "prev") {
      const newDate = new Date(year, month - 1);
      setCurrentMonth(newDate);
      handleSetMonth(newDate);
    } else {
      const newDate = new Date(year, month + 1);
      setCurrentMonth(newDate);
      handleSetMonth(newDate);
    }
  };

  return (
    <View style={styles.monthContainer}>
      <TouchableOpacity
        style={styles.monthArrow}
        onPress={() => onPressArrow("prev")}
      >
        <AntDesign name="left" size={22} color="black" />
      </TouchableOpacity>
      <Text style={styles.monthTitle}>{formatDateToYYYYMM(currentMonth)}</Text>
      <TouchableOpacity
        style={styles.monthArrow}
        onPress={() => onPressArrow("next")}
      >
        <AntDesign name="right" size={22} color="black" />
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
    fontSize: 19,
    fontWeight: "400",
    lineHeight: 32,
    color: "black",
    paddingHorizontal: 50,
    backgroundColor: "#F2F2F6",
  },
});
