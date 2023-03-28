import { StyleSheet, Text, View } from "react-native";
import { AppBar } from "./src/components/AppBar";
import { DiaryBalanceList } from "./src/components/DiaryBalanceList";
import { MonthSelect } from "./src/components/MonthSelect";
import { IncomeExpenseTotal } from "./src/components/IncomeExpenseTotal";
import { BalanceTotal } from "./src/components/BalanceTotal";
import { useState } from "react";
import DropDownPicker from "react-native-dropdown-picker";

export default function App() {
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState(null);
  const [items, setItems] = useState([
    { label: "日付が新しい順", value: "newest" },
    { label: "日付が古い順", value: "oldest" },
    { label: "金額が高い順", value: "highest" },
    { label: "金額が安い順", value: "lowest" },
  ]);
  return (
    <View style={styles.container}>
      <AppBar />
      <MonthSelect />
      <IncomeExpenseTotal />
      <BalanceTotal />
      <View style={styles.sortContainer}>
        <DropDownPicker
          open={open}
          value={value}
          items={items}
          setOpen={setOpen}
          setValue={setValue}
          setItems={setItems}
          style={{ minHeight: 30 }}
          containerStyle={styles.sortDropDown}
          placeholder="新しい順"
        />
      </View>
      {/* <DiaryBalanceList /> */}
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
    height: 40,
    marginTop: 10,
    zIndex: 1,
  },
  sortDropDown: {
    flex: 1,
    width: "40%",
    alignSelf: "flex-end",
    fontSize: 12,
    justifyContent: "center",
    paddingRight: 10,
  },
});
