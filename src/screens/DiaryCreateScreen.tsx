import React, { useEffect } from "react";
import { useState } from "react";
import * as SQLite from "expo-sqlite";
import {
  Alert,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import SegmentedControl from "@react-native-segmented-control/segmented-control";
import { IncomeExpenseTotal } from "../components/IncomeExpenseTotal";
import { BalanceSummary } from "../components/BalanceSummary";
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
import { useInsertDiary } from "../hooks/useInsertDiary";
import { BalanceList } from "../components/BalanceList";
import { DB_NAME } from "../../config/database";
import { useCalcAmountSummary } from "../hooks/useCalcAmountSummary";

export const DiaryCreateScreen: React.FC = () => {
  // タブ切り替え 0:日記 1:家計簿
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [amountSummary, setAmountSummary] = useState<AmountSummaryData>({
    expense: 0,
    income: 0,
    total: 0,
    directionType: "zero",
  });
  // 定数を定義
  const TabIndex = {
    DIARY: 0,
    BALANCE: 1,
  };
  const db = SQLite.openDatabase(DB_NAME);

  const [diaryEntry, setDiaryEntry] = useState<DiaryData>({
    date: formatDateToYYYYMMDD(new Date()),
    title: "",
    content: "",
  });
  const [balances, setBalances] = useState<CashBalanceData[]>([]);
  const { calculatedAmountSummary } = useCalcAmountSummary(balances);
  const navigation = useNavigation();

  useEffect(() => {
    navigation.setOptions({
      headerTitle: `${formatDateStringWithWeekday(diaryEntry.date)} - 新規作成`,
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
  }, [diaryEntry, balances]);

  useEffect(() => {
    setAmountSummary(calculatedAmountSummary);
  }, [calculatedAmountSummary]);

  const onPressSaveIcon = () => {
    var diaryId: number | null = null;
    db.transaction(
      (tx) => {
        tx.executeSql(
          "INSERT INTO diary (date, title, content) VALUES (?, ?, ?)",
          [diaryEntry.date, diaryEntry.title, diaryEntry.content],
          (_, result) => {
            diaryId = result.insertId!;
            if (!diaryId) {
              return tx.executeSql("ROLLBACK");
            }
            balances.map((balance) => {
              tx.executeSql(
                "INSERT INTO cash_balance (diary_id, title, income_expense_type, amount, cash_balance_category_id) VALUES (?, ?, ?, ?, ?)",
                [
                  diaryId,
                  balance.title,
                  balance.incomeExpenseType,
                  balance.amount,
                  0,
                ]
              );
            });
          }
        );
      },
      (error) => {
        console.log(error);
        Alert.alert("日記・家計簿を保存に失敗しました");
      },
      () => {
        Alert.alert(
          "日記・家計簿を保存に成功しました",
          "詳細画面に遷移します",
          [
            {
              text: "OK",
              onPress: () => {
                navigation.navigate("DiaryDetail", {
                  diaryId: diaryId,
                });
              },
            },
          ]
        );
      }
    );
  };

  const handleSetDiary = (diary: DiaryData) => {
    setDiaryEntry({
      date: diary.date,
      title: diary.title,
      content: diary.content,
    });
  };

  const handleCreateBalance = (balance: CashBalanceData) => {
    setBalances([...balances, balance]);
  };

  const handleDeleteBalance = (deleteIndex: number) => {
    setBalances(
      balances.filter((balance, i) => {
        return i !== deleteIndex;
      })
    );
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
      {renderTabPanel()}
      {selectedIndex == TabIndex.DIARY ? (
        <ScrollView>
          <DiaryEntryForm diary={diaryEntry} handleSetDiary={handleSetDiary} />
        </ScrollView>
      ) : (
        <View>
          <BalanceSummary amountSummary={amountSummary} />
          <GrayBar style={{ justifyContent: "center" }}></GrayBar>
          <BalanceList
            balances={balances}
            handleDeleteBalance={handleDeleteBalance}
          />
          <AddBalance handleCreateBalance={handleCreateBalance} />
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
    marginTop: 10,
  },
  tabControl: {
    width: "80%",
    marginBottom: 10,
  },
});
