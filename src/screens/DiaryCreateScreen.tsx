import React from "react";
import { useState } from "react";
import { AppBar } from "../components/AppBar";
import {
  KeyboardAvoidingView,
  Platform,
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
import { SafeAreaView } from "react-native-safe-area-context";

export const DiaryCreateScreen: React.FC = () => {
  // タブ切り替え 0:日記 1:家計簿
  const [selectedIndex, setSelectedIndex] = useState(0);

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <SafeAreaView>
        <AppBar />
        {selectedIndex == 0 ? (
          <ScrollView>
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
            <DiaryEntryForm />
          </ScrollView>
        ) : (
          <View>
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
            <IncomeExpenseTotal />
            <BalanceTotal />
            <SortPicker />
            <DiaryBalanceList />
            <AddBalance />
          </View>
        )}
      </SafeAreaView>
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
});
