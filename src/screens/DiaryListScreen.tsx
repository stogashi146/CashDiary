import { StyleSheet, Text, View } from "react-native";
import { DiaryBalanceList } from "../components/DiaryBalanceList";
import { MonthSelect } from "../components/MonthSelect";
import { IncomeExpenseTotal } from "../components/IncomeExpenseTotal";
import { BalanceTotal } from "../components/BalanceTotal";
import { SortPicker } from "../components/SortPicker";

interface DiaryListScreenProps {
  navigation: any;
}

export const DiaryListScreen: React.FC<DiaryListScreenProps> = (props) => {
  const { navigation } = props;
  return (
    <View style={styles.container}>
      <MonthSelect />
      <IncomeExpenseTotal />
      <BalanceTotal />
      <SortPicker />
      <DiaryBalanceList />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFFFFF",
  },
});
