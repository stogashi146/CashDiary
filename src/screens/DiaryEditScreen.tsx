import React from "react";
import { useState } from "react";
import { AppBar } from "../components/AppBar";
import { StyleSheet, Text, View } from "react-native";
import SegmentedControl from "@react-native-segmented-control/segmented-control";
import { IncomeExpenseTotal } from "../components/IncomeExpenseTotal";
import { BalanceTotal } from "../components/BalanceTotal";
import { SortPicker } from "../components/SortPicker";
import { DiaryBalanceList } from "../components/DiaryBalanceList";
import { DiaryDetail } from "../components/DiaryDetail";
import { AddBalance } from "../components/AddBalance";

export const DiaryEditScreen: React.FC = () => {
  // タブ切り替え 0:日記 1:家計簿
  const [selectedIndex, setSelectedIndex] = useState(0);

  return (
    <View style={styles.container}>
      <AppBar />
      <View style={styles.tabContainer}>
        <SegmentedControl
          values={["日記", "家計簿"]}
          selectedIndex={selectedIndex}
          onChange={(event: any) => {
            setSelectedIndex(event.nativeEvent.selectedSegmentIndex);
          }}
          style={styles.tabControl}
        />
      </View>
      {selectedIndex == 0 ? (
        <View>
          <DiaryDetail />
        </View>
      ) : (
        <View>
          <IncomeExpenseTotal />
          <BalanceTotal />
          <SortPicker />
          <DiaryBalanceList />
          <AddBalance />
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFFFFF",
  },
  tabContainer: {
    alignItems: "center",
  },
  tabControl: {
    width: "80%",
    marginVertical: 10,
  },
});
