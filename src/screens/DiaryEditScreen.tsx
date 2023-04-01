import React from "react";
import { useState } from "react";
import { AppBar } from "../components/AppBar";
import {
  KeyboardAvoidingView,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import SegmentedControl from "@react-native-segmented-control/segmented-control";
import { IncomeExpenseTotal } from "../components/IncomeExpenseTotal";
import { BalanceTotal } from "../components/BalanceTotal";
import { SortPicker } from "../components/SortPicker";
import { DiaryBalanceList } from "../components/DiaryBalanceList";
import { DiaryEntryDetail } from "../components/DiaryEntryDetail";
import { AddBalance } from "../components/AddBalance";
import { DiaryEntryForm } from "../components/DiaryEntryForm";

export const DiaryEditScreen: React.FC = () => {
  // タブ切り替え 0:日記 1:家計簿
  const [selectedIndex, setSelectedIndex] = useState(0);

  return (
    <KeyboardAvoidingView style={styles.container} behavior="padding">
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
        <ScrollView>
          <DiaryEntryForm />
        </ScrollView>
      ) : (
        <View>
          <IncomeExpenseTotal />
          <BalanceTotal />
          <SortPicker />
          <DiaryBalanceList />
          <AddBalance />
        </View>
      )}
    </KeyboardAvoidingView>
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
  a: {
    // position: "absolute",
    // width: "100%",
    // right: 0,
    // bottom: -10,
  },
});
