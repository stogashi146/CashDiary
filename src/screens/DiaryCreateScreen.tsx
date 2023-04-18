import React, { useEffect } from "react";
import { useState } from "react";
import {
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  View,
} from "react-native";
import SegmentedControl from "@react-native-segmented-control/segmented-control";
import { IncomeExpenseTotal } from "../components/IncomeExpenseTotal";
import { BalanceTotal } from "../components/BalanceTotal";
import { AddBalance } from "../components/AddBalance";
import { DiaryEntryForm } from "../components/DiaryEntryForm";
import { SafeAreaView } from "react-native-safe-area-context";
import { useNavigation } from "@react-navigation/native";
import { AntDesign } from "@expo/vector-icons";
import {
  formatDateStringWithWeekday,
  formatDateToYYYYMMDD,
} from "../utils/DateFormat";
import { GrayBar } from "../components/GrayBar";
import { insertDiary } from "../utils/DatabaseUtils";
import { useInsertDiary } from "../hooks/useInsertDiary";
import { BalanceList } from "../components/BalanceList";

export const DiaryCreateScreen: React.FC = () => {
  // タブ切り替え 0:日記 1:家計簿
  const [selectedIndex, setSelectedIndex] = useState(0);
  // 定数を定義
  const TabIndex = {
    DIARY: 0,
    BALANCE: 1,
  };

  const [diaryEntry, setDiaryEntry] = useState<DiaryData>({
    date: formatDateToYYYYMMDD(new Date()),
    title: "",
    content: "",
  });
  const [balances, setBalances] = useState<CashBalanceData[]>([]);
  const { insertDiary, diaryInsertedSuccess, error } = useInsertDiary();

  const navigation = useNavigation();
  useEffect(() => {
    navigation.setOptions({
      headerTitle: formatDateStringWithWeekday(diaryEntry.date),
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
  }, [diaryEntry.date, balances]);

  const onPressSaveIcon = () => {
    insertDiary(diaryEntry);
    if (error) {
      console.log("Error: " + error);
      return alert("日記を保存に失敗しました。");
    }

    if (diaryInsertedSuccess) {
      return alert("日記を保存しました。");
    }
  };

  const handleSetDate = (date: Date) => {
    setDiaryEntry({ ...diaryEntry, date: formatDateToYYYYMMDD(date) });
  };

  const handleSetTitle = (title: string) => {
    setDiaryEntry({ ...diaryEntry, title });
  };

  const handleSetContent = (content: string) => {
    setDiaryEntry({ ...diaryEntry, content });
  };

  const handleCreateBalance = (balance: CashBalanceData) => {
    setBalances([...balances, balance]);
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
        {selectedIndex == TabIndex.DIARY ? (
          <ScrollView>
            {renderTabPanel()}
            <DiaryEntryForm
              handleSetDate={handleSetDate}
              handleSetTitle={handleSetTitle}
              handleSetContent={handleSetContent}
            />
          </ScrollView>
        ) : (
          <View>
            {renderTabPanel()}
            <IncomeExpenseTotal />
            <BalanceTotal />
            <GrayBar style={{ justifyContent: "center" }}></GrayBar>
            <BalanceList balances={balances} />
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
