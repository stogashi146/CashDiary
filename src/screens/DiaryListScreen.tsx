import { StyleSheet, Text, View } from "react-native";
import { AppBar } from "../components/AppBar";
import { DiaryBalanceList } from "../components/DiaryBalanceList";
import { MonthSelect } from "../components/MonthSelect";
import { IncomeExpenseTotal } from "../components/IncomeExpenseTotal";
import { BalanceTotal } from "../components/BalanceTotal";
import { SortPicker } from "../components/SortPicker";

export const DiaryListScreen: React.FC = () => {
  return (
    <View style={styles.container}>
      <AppBar />
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
