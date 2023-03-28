import { StyleSheet, Text, View } from "react-native";
import { AppBar } from "./src/components/AppBar";
import { DiaryBalanceList } from "./src/components/DiaryBalanceList";
import { MonthSelect } from "./src/components/MonthSelect";
import { IncomeExpenseTotal } from "./src/components/IncomeExpenseTotal";
import { BalanceTotal } from "./src/components/BalanceTotal";
import { useState } from "react";
import DropDownPicker from "react-native-dropdown-picker";

export default function App() {
  const [open, setOpen] = useState(true);
  const [value, setValue] = useState([]);
  const [items, setItems] = useState([
    { label: "Apple", value: "apple" },
    { label: "Banana", value: "banana" },
  ]);
  return (
    <View style={styles.container}>
      <AppBar />
      <MonthSelect />
      <IncomeExpenseTotal />
      <BalanceTotal />
      <View style={styles.sortContainer}>
        <Text>aaa</Text>
      </View>
      <View>
        <Text>aaa</Text>
        <DropDownPicker
          multiple={true}
          min={0}
          max={2}
          open={open}
          value={value}
          items={items}
          setOpen={setOpen}
          setValue={setValue}
          setItems={setItems}
        />
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
