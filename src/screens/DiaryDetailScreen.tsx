import React, { useEffect } from "react";
import { useState } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import * as SQLite from "expo-sqlite";
import { DB_NAME } from "../../config/database";
import SegmentedControl from "@react-native-segmented-control/segmented-control";
import { IncomeExpenseTotal } from "../components/IncomeExpenseTotal";
import { BalanceSummary } from "../components/BalanceSummary";
import { SortPicker } from "../components/SortPicker";
// import { DiaryBalanceList } from "../components/DiaryList";
import { DiaryEntryDetail } from "../components/DiaryEntryDetail";
import { AddBalance } from "../components/AddBalance";
import { useNavigation, useRoute } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { useCalcAmountSummary } from "../hooks/useCalcAmountSummary";
import { BalanceList } from "../components/BalanceList";
import { formatDateStringWithWeekday } from "../utils/DateFormat";
import { AntDesign } from "@expo/vector-icons";

type RouteParams = {
  diaryId: number;
};

export const DiaryDetailScreen: React.FC = () => {
  const db = SQLite.openDatabase(DB_NAME);
  const route = useRoute();
  const { diaryId } = route.params as RouteParams;
  // タブ切り替え 0:日記 1:家計簿
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [diary, setDiary] = useState<DiaryData>({
    date: "",
    title: "",
    content: "",
  });
  const [balances, setBalances] = useState<CashBalanceData[]>([]);
  const [amountSummary, setAmountSummary] = useState<AmountSummaryData>({
    expense: 0,
    income: 0,
    total: 0,
    directionType: "zero",
  });
  const { calculatedAmountSummary } = useCalcAmountSummary(balances);

  const navigation = useNavigation();
  useEffect(() => {
    if (!diary.date) {
      return;
    }
    navigation.setOptions({
      headerTitle: formatDateStringWithWeekday(diary.date),
      headerRight: () => (
        <AntDesign
          name="edit"
          size={24}
          color="black"
          style={{ paddingRight: 15, paddingTop: 5 }}
        />
      ),
      headerLeft: () => (
        <TouchableOpacity
          style={{ flexDirection: "row", alignItems: "center" }}
          onPress={() => navigation.navigate("DiaryList")}
        >
          <AntDesign
            name="left"
            size={22}
            color="black"
            style={{ paddingLeft: 15 }}
          />
          <Text style={{ marginLeft: 2, fontSize: 16 }}>Back</Text>
        </TouchableOpacity>
      ),
    });
  }, [diary.date]);

  useEffect(() => {
    if (!diaryId) {
      return;
    }

    db.transaction((tx) => {
      // DiaryテーブルからdiaryIdに一致するレコードを取得するクエリ
      const query = `
        SELECT * FROM diary
        WHERE id = ${diaryId}
        LIMIT 1
      `;
      tx.executeSql(query, [], (_, { rows: { _array } }) => {
        console.log(_array);

        setDiary(_array[0]); // Diaryテーブルの最初のレコードをセット
      });

      // CashBalanceテーブルからdiaryIdに一致するレコードを取得するクエリ
      const query2 = `
        SELECT * FROM cash_balance
        WHERE diary_id = ${diaryId}
      `;
      tx.executeSql(query2, [], (_, { rows: { _array } }) => {
        const fetchBalances = _array;

        fetchBalances.map((balance) => {
          renameKey(balance, "income_expense_type", "incomeExpenseType");
        });

        setBalances(_array);
      });
    });
  }, []);

  useEffect(() => {
    setAmountSummary(calculatedAmountSummary);
  }, [calculatedAmountSummary]);

  const renameKey = (object: any, oldKey: string, newKey: string) => {
    // オブジェクトに古いキーが存在するかを確認
    if (Object.prototype.hasOwnProperty.call(object, oldKey)) {
      // 新しいキーに古いキーの値を代入
      object[newKey] = object[oldKey];
      // 古いキーを削除
      delete object[oldKey];
    }
  };

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
          <DiaryEntryDetail diary={diary} />
        </View>
      ) : (
        <View>
          <BalanceSummary amountSummary={amountSummary} />
          <SortPicker />
          <BalanceList balances={balances} />
          {/* <AddBalance /> */}
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
