import React, { useEffect } from "react";
import { useState } from "react";
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
import { useNavigation } from "@react-navigation/native";
import { AntDesign } from "@expo/vector-icons";
import { formatDateWithWeekday } from "../utils/dateFormat";

export const DiaryCreateScreen: React.FC = () => {
  // タブ切り替え 0:日記 1:家計簿
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [diaryEntry, setDiaryEntry] = useState<DiaryData>();
  const [balances, setBalances] = useState<BalanceData[]>();
  const [diaryBalance, setDiaryBalance] = useState<DiaryBalanceData>();

  const navigation = useNavigation();
  useEffect(() => {
    navigation.setOptions({
      headerTitle: formatDateWithWeekday(selectedDate),
      headerRight: () => (
        <AntDesign
          name="save"
          size={27}
          color="black"
          style={{ paddingRight: 15, paddingTop: 5 }}
          onPress={onPressSaveIcon}
        />
      ),
    });
  }, [selectedDate]);

  const onPressSaveIcon = () => {
    alert("保存しました");
  };

  const handleSetDate = (date: Date) => {
    setSelectedDate(date);
  };

  const handleCreateBalance = (balance: BalanceData) => {
    setBalances([balance]);
  };

  const renderTabPanel = () => {
    return (
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
    );
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <SafeAreaView>
        {selectedIndex == 0 ? (
          <ScrollView>
            {renderTabPanel()}
            <DiaryEntryForm handleSetDate={handleSetDate} />
          </ScrollView>
        ) : (
          <View>
            {renderTabPanel()}
            <IncomeExpenseTotal />
            <BalanceTotal />
            <SortPicker />
            <DiaryBalanceList />
            <AddBalance handleCreateBalance={handleCreateBalance} />
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
    marginBottom: 10,
  },
});
