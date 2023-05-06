import React, { useEffect } from "react";
import { useState } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import * as SQLite from "expo-sqlite";
import { DB_NAME } from "../../config/database";
import SegmentedControl from "@react-native-segmented-control/segmented-control";
import { BalanceSummary } from "../components/BalanceSummary";
import { SortPicker } from "../components/SortPicker";
import { DiaryEntryDetail } from "../components/DiaryEntryDetail";
import { useNavigation, useRoute } from "@react-navigation/native";
import { useCalcAmountSummary } from "../hooks/useCalcAmountSummary";
import { BalanceList } from "../components/BalanceList";
import { formatDateStringWithWeekday } from "../utils/DateFormat";
import { AntDesign } from "@expo/vector-icons";
import { useFetchDiaryBalance } from "../hooks/useFetchDiaryBalance";

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
  const { fetchDiaryBalanceDetail, fetchedDiary, fetchedBalances } =
    useFetchDiaryBalance();
  const navigation = useNavigation();

  useEffect(() => {
    if (!diary.date) {
      return;
    }
    navigation.setOptions({
      headerTitle: `${formatDateStringWithWeekday(diary.date)} - 詳細`,
      // 編集画面リンクボタン
      headerRight: () => (
        <AntDesign
          name="edit"
          size={24}
          color="black"
          style={{ paddingRight: 15, paddingTop: 5 }}
          onPress={() => {
            navigation.navigate("DiaryEdit", {
              diaryId: diaryId,
            });
          }}
        />
      ),
      // リストへ戻るボタン
      headerLeft: () => (
        <TouchableOpacity
          style={{ flexDirection: "row", alignItems: "center" }}
          onPress={() => {
            navigation.navigate("DiaryList");
          }}
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
    fetchDiaryBalanceDetail(diaryId);
  }, []);

  useEffect(() => {
    fetchedDiary && setDiary(fetchedDiary);
    fetchedBalances && setBalances(fetchedBalances);
  }, [fetchedDiary, fetchedBalances]);

  useEffect(() => {
    setAmountSummary(calculatedAmountSummary);
  }, [calculatedAmountSummary]);

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
    marginVertical: 10,
  },
  tabControl: {
    width: "80%",
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
