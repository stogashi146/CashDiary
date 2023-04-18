import React, { useEffect } from "react";
import { useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import SegmentedControl from "@react-native-segmented-control/segmented-control";
import { IncomeExpenseTotal } from "../components/IncomeExpenseTotal";
import { BalanceTotal } from "../components/BalanceTotal";
import { SortPicker } from "../components/SortPicker";
import { DiaryBalanceList } from "../components/DiaryList";
import { DiaryEntryDetail } from "../components/DiaryEntryDetail";
import { AddBalance } from "../components/AddBalance";
import { useNavigation } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";

export const DiaryDetailScreen: React.FC = () => {
  // タブ切り替え 0:日記 1:家計簿
  const [selectedIndex, setSelectedIndex] = useState(0);
  const navigation = useNavigation();
  useEffect(() => {
    navigation.setOptions({ headerTitle: "2022/12/12" });
  }, []);

  return (
    <View style={styles.container}>
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
          <DiaryEntryDetail />
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
  addBalanceContainer: {
    alignItems: "center",
  },
  addBalanceRow: {
    width: "90%",
    height: 50,
    borderWidth: 1,
    borderColor: "#E1E1E1",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  addBalanceLabel: {
    position: "absolute",
    left: 20,
    fontSize: 12,
  },
  addBalanceText: {
    textAlign: "center",
    fontSize: 16,
  },
  addButtonContainer: {
    width: "90%",
    height: 50,
    marginTop: 5,
  },
});
