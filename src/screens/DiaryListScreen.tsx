import { StyleSheet, Text, View } from "react-native";
import { DiaryList } from "../components/DiaryList";
import { MonthSelect } from "../components/MonthSelect";
import { IncomeExpenseTotal } from "../components/IncomeExpenseTotal";
import { BalanceSummary } from "../components/BalanceSummary";
import { SortPicker } from "../components/SortPicker";
import { useNavigation } from "@react-navigation/native";
import { useEffect, useState } from "react";
import { AntDesign } from "@expo/vector-icons";
import { useFetchDiary } from "../hooks/useFetchDiary";

interface DiaryListScreenProps {
  navigation: any;
}

export const DiaryListScreen: React.FC<DiaryListScreenProps> = () => {
  const navigation = useNavigation();
  const [diaries, setDiaries] = useState<DiaryData[]>([]);
  const [amountSummary, setAmountSummary] = useState<AmountSummaryData>({
    expense: 0,
    income: 0,
    total: 0,
    directionType: "zero",
  });
  const { fetchAllDiary, fetchDiaries } = useFetchDiary();

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

    // DBから全ての日記を取得
    fetchAllDiary();
    // stateに日記をセット
    const diaries = fetchDiaries;
    setDiaries(diaries);
  }, [fetchDiaries]);

  // useEffect(() => {
  //   const { calculatedAmountSummary } = useCalcAmountSummary(balances);
  //   setAmountSummary(calculatedAmountSummary);
  // }, [balances]);

  const onPressAddIcon = () => {
    navigation.navigate("DiaryCreate");
  };

  return (
    <View style={styles.container}>
      <MonthSelect />
      {/* <BalanceSummary /> */}
      {/* <BalanceTotal /> */}
      <SortPicker />
      <DiaryList diaries={diaries} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFFFFF",
  },
});
