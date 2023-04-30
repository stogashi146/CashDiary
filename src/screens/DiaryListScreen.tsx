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
import {
  formatDateToYYYYMMDD,
  formatDateToYYYYMMIso,
} from "../utils/DateFormat";

interface DiaryListScreenProps {
  navigation: any;
}

export const DiaryListScreen: React.FC<DiaryListScreenProps> = () => {
  const db = SQLite.openDatabase(DB_NAME);
  const navigation = useNavigation();
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [diaryBalances, setDiaryBalances] = useState<DiaryBalanceData[]>([]);
  const [amountSummary, setAmountSummary] = useState<AmountSummaryData>({
    expense: 0,
    income: 0,
    total: 0,
    directionType: "zero",
  });

  const handleSetMonth = (date: Date) => {
    setCurrentMonth(date);
    console.log(date);
  };

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
    console.log("SELECT");
    console.log(formatDateToYYYYMMIso(currentMonth));

    db.transaction((tx) => {
      tx.executeSql(
        `SELECT
          d.id,
          d.date,
          d.title AS title,
          SUM(CASE WHEN c.balance_type = 'income' THEN c.amount ELSE -c.amount END) AS total
        FROM diary AS d
        LEFT JOIN cash_balance AS c ON d.id = c.diary_id
        WHERE d.date LIKE '${formatDateToYYYYMMIso(currentMonth)}%'
        GROUP BY d.id`,
        [],
        (_, { rows }) => {
          console.log(rows);

          rows._array.forEach((row: DiaryBalanceData) => {
            // totalがnullの場合は0をセット
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
  }, [currentMonth]);

  const onPressAddIcon = () => {
    navigation.navigate("DiaryCreate");
  };

  return (
    <View style={styles.container}>
      <MonthSelect handleSetMonth={handleSetMonth} />
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
