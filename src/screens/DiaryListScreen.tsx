import * as SQLite from "expo-sqlite";
import { StyleSheet, Text, View } from "react-native";
import { DiaryList } from "../components/DiaryList";
import { MonthSelect } from "../components/MonthSelect";
import { IncomeExpenseTotal } from "../components/IncomeExpenseTotal";
import { BalanceSummary } from "../components/BalanceSummary";
import { SortPicker } from "../components/SortPicker";
import { useNavigation } from "@react-navigation/native";
import { useEffect, useState } from "react";
import { AntDesign } from "@expo/vector-icons";
import { DB_NAME } from "../../config/database";

interface DiaryListScreenProps {
  navigation: any;
}

export const DiaryListScreen: React.FC<DiaryListScreenProps> = () => {
  const db = SQLite.openDatabase(DB_NAME);
  const navigation = useNavigation();
  const [diaryBalances, setDiaryBalances] = useState<DiaryBalanceData[]>([]);
  const [amountSummary, setAmountSummary] = useState<AmountSummaryData>({
    expense: 0,
    income: 0,
    total: 0,
    directionType: "zero",
  });

  useEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <AntDesign
          name="plus"
          size={24}
          color="black"
          style={{ paddingRight: 15, paddingTop: 5 }}
          onPress={onPressAddIcon}
        />
      ),
    });
  }, []);

  useEffect(() => {
    db.transaction((tx) => {
      tx.executeSql(
        `SELECT
          d.id,
          d.date,
          d.title AS title,
          SUM(CASE WHEN c.balance_type = 'income' THEN c.amount ELSE -c.amount END) AS total
        FROM diary AS d
        LEFT JOIN cash_balance AS c ON d.id = c.diary_id
        GROUP BY d.id`,
        [],
        (_, { rows }) => {
          rows._array.forEach((row: DiaryBalanceData) => {
            if (!row.total) {
              row.total = "0";
            }
          });
          setDiaryBalances(rows._array);
        },
        (_, error) => {
          console.log("error", error);
          return false;
        }
      );
    });
  }, [diaryBalances]);

  const onPressAddIcon = () => {
    navigation.navigate("DiaryCreate");
  };

  return (
    <View style={styles.container}>
      <MonthSelect />
      {/* <BalanceSummary /> */}
      {/* <BalanceTotal /> */}
      <SortPicker />
      <DiaryList diaryBalances={diaryBalances} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFFFFF",
  },
});
