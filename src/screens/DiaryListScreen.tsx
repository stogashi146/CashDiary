import { StyleSheet, Text, View } from "react-native";
import { DiaryBalanceList } from "../components/DiaryBalanceList";
import { MonthSelect } from "../components/MonthSelect";
import { IncomeExpenseTotal } from "../components/IncomeExpenseTotal";
import { BalanceTotal } from "../components/BalanceTotal";
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
    fetchAllDiary();
  }, []);

  useEffect(() => {
    const diaries = fetchDiaries;

    setDiaries(diaries);
  }, [fetchDiaries]);

  const onPressAddIcon = () => {
    navigation.navigate("DiaryCreate");
  };

  return (
    <View style={styles.container}>
      <MonthSelect />
      <IncomeExpenseTotal />
      <BalanceTotal />
      <SortPicker />
      <DiaryBalanceList diaries={diaries} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFFFFF",
  },
});
