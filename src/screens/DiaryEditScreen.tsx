import React, { useEffect } from "react";
import { useState } from "react";
import * as SQLite from "expo-sqlite";
import {
  Alert,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  View,
} from "react-native";
import SegmentedControl from "@react-native-segmented-control/segmented-control";
import { BalanceSummary } from "../components/BalanceSummary";
import { AddBalance } from "../components/AddBalance";
import { DiaryEntryForm } from "../components/DiaryEntryForm";
import { useNavigation, useRoute } from "@react-navigation/native";
import { AntDesign } from "@expo/vector-icons";
import {
  formatDateStringWithWeekday,
  formatDateToYYYYMMDD,
} from "../utils/DateFormat";
import { GrayBar } from "../components/GrayBar";
import { BalanceList } from "../components/BalanceList";
import { DB_NAME } from "../../config/database";
import { useCalcAmountSummary } from "../hooks/useCalcAmountSummary";
import { useFetchDiaryBalance } from "../hooks/useFetchDiaryBalance";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { SafeAreaView } from "react-native-safe-area-context";

type RouteParams = {
  diaryId: number;
};

export const DiaryEditScreen: React.FC<RouteParams> = () => {
  const route = useRoute();

  const { diaryId } = route.params as RouteParams;
  // const insets = useSafeAreaInsets();

  const [diaryEntry, setDiaryEntry] = useState<DiaryData>({
    date: formatDateToYYYYMMDD(new Date()),
    title: "",
    content: "",
  });
  const [balances, setBalances] = useState<CashBalanceData[]>([]);
  // タブ切り替え 0:日記 1:家計簿
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [amountSummary, setAmountSummary] = useState<AmountSummaryData>({
    expense: 0,
    income: 0,
    total: 0,
    directionType: "zero",
  });

  const { calculatedAmountSummary } = useCalcAmountSummary(balances);
  const { fetchDiaryBalanceDetail, fetchedDiary, fetchedBalances } =
    useFetchDiaryBalance();

  // 定数を定義
  const TabIndex = {
    DIARY: 0,
    BALANCE: 1,
  };
  const db = SQLite.openDatabase(DB_NAME);
  const navigation = useNavigation();

  useEffect(() => {
    navigation.setOptions({
      headerTitle: `${formatDateStringWithWeekday(diaryEntry.date)} - 編集`,
      headerRight: () => (
        <AntDesign
          name="save"
          size={27}
          color="black"
          style={{ paddingRight: 15, paddingTop: 5 }}
          onPress={onPressUpdate}
        />
      ),
    });
  }, [diaryEntry, balances]);

  useEffect(() => {
    setAmountSummary(calculatedAmountSummary);
  }, [calculatedAmountSummary]);

  useEffect(() => {
    fetchDiaryBalanceDetail(diaryId);
  }, []);

  useEffect(() => {
    fetchedDiary && setDiaryEntry(fetchedDiary);
    fetchedBalances && setBalances(fetchedBalances);
  }, [fetchedDiary, fetchedBalances]);

  const onPressUpdate = () => {
    db.transaction(
      (tx) => {
        db.transaction((tx) => {
          const query1 =
            "UPDATE diary SET date = ?, title = ?, content = ? WHERE id = ?";
          tx.executeSql(
            query1,
            [diaryEntry.date, diaryEntry.title, diaryEntry.content, diaryId],
            () => {},
            (error) => {
              console.log("Update 1 failed:", error);
              tx.executeSql("ROLLBACK"); // エラーが発生した場合、トランザクション全体をロールバックします
              return false;
            }
          );
          // 家計簿は全削除してから再登録する
          const query2 = "DELETE FROM cash_balance WHERE diary_id = ?";
          tx.executeSql(
            query2,
            [diaryId],
            () => {
              balances.map((balance) => {
                tx.executeSql(
                  "INSERT INTO cash_balance (diary_id, title, income_expense_type, amount, cash_balance_category_id) VALUES (?, ?, ?, ?, ?)",
                  [
                    diaryId,
                    balance.title,
                    balance.incomeExpenseType,
                    balance.amount,
                    0,
                  ],
                  () => {},
                  (error) => {
                    console.log("Update 3 failed:", error);
                    tx.executeSql("ROLLBACK");
                    return false;
                  }
                );
              });
            },
            (error) => {
              console.log("Update 2 failed:", error);
              tx.executeSql("ROLLBACK");
              return false;
            }
          );
        });
      },
      (error) => {
        console.log(error);
        return Alert.alert("日記・家計簿の更新に失敗しました");
      },
      () => {
        Alert.alert(
          "日記・家計簿を更新に成功しました",
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
        <View style={styles.balanceContainer}>
          <View>
            <BalanceSummary amountSummary={amountSummary} />
            <GrayBar style={{ justifyContent: "center" }}></GrayBar>
            <BalanceList
              balances={balances}
              handleDeleteBalance={handleDeleteBalance}
            />
          </View>
          <View style={styles.addBalanceButton}>
            <AddBalance handleCreateBalance={handleCreateBalance} />
          </View>
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
    marginTop: 10,
    marginBottom: 10,
  },
  balanceContainer: {
    flex: 1,
    justifyContent: "space-between",
  },
  addBalanceButton: {
    marginBottom: 5,
  },
});
