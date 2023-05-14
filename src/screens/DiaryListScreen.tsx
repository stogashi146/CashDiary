import React, { useCallback } from "react";
import * as SQLite from "expo-sqlite";
import { StyleSheet, Text, View } from "react-native";
import { DiaryList } from "../components/DiaryList";
import { MonthSelect } from "../components/MonthSelect";
import { BalanceSummary } from "../components/BalanceSummary";
import { SortPicker } from "../components/SortPicker";
import { useFocusEffect, useNavigation } from "@react-navigation/native";
import { useEffect, useState } from "react";
import { AntDesign } from "@expo/vector-icons";
import { DB_NAME } from "../../config/database";
import { formatDateToYYYYMMIso } from "../utils/DateFormat";
import { SORT_TYPE, SortType } from "../constants/SortTypeContants";
import { Alert } from "react-native";

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
  const [sortType, setSortType] = useState<SortType>(SORT_TYPE.newest);

  const handleSetMonth = (date: Date) => {
    setCurrentMonth(date);
    console.log(date);
  };

  const handleSetSortType = (type: SortType) => {
    setSortType(type);
  };

  useEffect(() => {
    navigation.setOptions({
      headerTitle: "日記一覧",
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

  const onFocus = useCallback(() => {
    fetchDiaryBalances();
  }, []);
  // 詳細画面から戻った際に再度fetchする
  useFocusEffect(onFocus);

  useEffect(() => {
    fetchDiaryBalances();
  }, [currentMonth]);

  const fetchDiaryBalances = () => {
    db.transaction((tx) => {
      tx.executeSql(
        `SELECT
        d.id,
        d.date,
        d.title AS title,
        SUM(CASE WHEN c.income_expense_type
         = 'income' THEN c.amount ELSE -c.amount END) AS total
      FROM diary AS d
      LEFT JOIN cash_balance AS c ON d.id = c.diary_id
      WHERE d.date LIKE '${formatDateToYYYYMMIso(currentMonth)}%'
      GROUP BY d.id
      ORDER BY d.date DESC
      `,
        [],
        (_, { rows }) => {
          const totals: string[] = [];
          rows._array.forEach((row: DiaryBalanceData) => {
            // totalがnullの場合は0をセット
            if (!row.total) {
              row.total = "0";
            }
            totals.push(row.total);
          });
          setDiaryBalances(rows._array);
          calcAmountSummary(totals);
        },
        (_, error) => {
          console.log("error", error);
          return false;
        }
      );
      tx.executeSql(
        `SELECT
        *
      FROM cash_balance`,
        [],
        (_, { rows }) => {
          // console.log(rows);
        },
        (_, error) => {
          console.log("error", error);
          return false;
        }
      );
    });
  };

  const onPressDelete = (id: number) => {
    if (!id) return;

    Alert.alert(
      "日記・家計簿を削除しますか？",
      "日記とそれに紐づく家計簿も削除します",
      [
        {
          text: "キャンセル",
          onPress: () => {
            return;
          },
          style: "cancel",
        },
        {
          text: "削除",
          onPress: () => {
            handleDeleteDiary(id);
          },
        },
      ],
      { cancelable: true }
    );
  };

  const handleDeleteDiary = (id: number) => {
    db.transaction(
      (tx) => {
        tx.executeSql(
          "delete from diary where id = ?",
          [id],
          () => {
            console.log("diary delete success");
          },
          (_, error) => {
            console.log(error.message);
            return false;
          }
        );
        tx.executeSql(
          "delete from cash_balance where diary_id = ?",
          [id],
          () => {
            console.log("cash_balance delete success");
          },
          (_, error) => {
            console.log(error.message);
            return false;
          }
        );
      },
      () => {
        console.log("delete fail");
      },
      () => {
        console.log("delete success");
        fetchDiaryBalances();
      }
    );
  };

  const onPressAddIcon = () => {
    navigation.navigate("DiaryCreate");
  };

  //　日記毎の合計金額から、内訳を計算する
  const calcAmountSummary = (diaryAmount: string[]) => {
    const summary: AmountSummaryData = {
      expense: 0,
      income: 0,
      total: 0,
      directionType: "zero",
    };
    var total: number = 0;

    diaryAmount.forEach((amount) => {
      const num_amount = Number(amount);
      switch (Math.sign(num_amount)) {
        case 1:
          summary.income += Math.abs(num_amount);
          break;
        case -1:
          summary.expense += Math.abs(num_amount);
          break;
        default:
          break;
      }
      total += num_amount;
    });

    // amountSummaryの計算
    setAmountSummary({
      expense: summary.expense,
      income: summary.income,
      total: total,
      directionType: getDirectionType(total),
    });
  };

  // directionTypeを判定する
  const getDirectionType = (value: number) => {
    switch (Math.sign(value)) {
      case 1:
        return "plus";
      case -1:
        return "minus";
      default:
        return "zero";
    }
  };

  return (
    <View style={styles.container}>
      <MonthSelect handleSetMonth={handleSetMonth} />
      <BalanceSummary amountSummary={amountSummary} />
      <SortPicker handleSetSortType={handleSetSortType} />
      <DiaryList
        diaryBalances={diaryBalances}
        sortType={sortType}
        onPressDelete={onPressDelete}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFFFFF",
  },
});
