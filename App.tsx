import { StyleSheet, Text, View } from "react-native";
import { AppBar } from "./src/components/AppBar";
import { DiaryBalanceList } from "./src/components/DiaryBalanceList";
import { MonthSelect } from "./src/components/MonthSelect";
import { IncomeExpenseTotal } from "./src/components/IncomeExpenseTotal";
import { BalanceTotal } from "./src/components/BalanceTotal";
import { SortPicker } from "./src/components/SortPicker";
import { DiaryListScreen } from "./src/screens/DiaryListScreen";
import { DiaryDetailScreen } from "./src/screens/DiaryDetailScreen";
import { DiaryEditScreen } from "./src/screens/DiaryEditScreen";

export default function App() {
  return <DiaryEditScreen />;
  // return <DiaryDetailScreen />;
}
