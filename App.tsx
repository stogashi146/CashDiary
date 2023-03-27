import { StyleSheet, Text, View } from "react-native";
import { AppBar } from "./src/components/AppBar";
import { DiaryBalanceList } from "./src/components/DiaryBalanceList";
import { MonthSelect } from "./src/components/MonthSelect";
import { IncomeExpenseTotal } from "./src/components/IncomeExpenseTotal";
import { BalanceTotal } from "./src/components/BalanceTotal";

export default function App() {
  return (
    <View style={styles.container}>
      <AppBar />
      <MonthSelect />
      <IncomeExpenseTotal />
      <BalanceTotal />
      <View style={styles.sortContainer}>
        <View></View>
      </View>
      <DiaryBalanceList />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFFFFF",
  },
  sortContainer: {
    backgroundColor: "#F2F2F6",
    borderBottomWidth: 0.5,
    borderBottomColor: "rgba(0, 0, 0, 0.5)",
    height: 35,
    marginTop: 10,
  },
});
