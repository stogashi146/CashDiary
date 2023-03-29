import { StyleSheet, Text, View } from "react-native";
import DropDownPicker from "react-native-dropdown-picker";
import { useState } from "react";
import { GrayBar } from "./GrayBar";

export const SortPicker: React.FC = () => {
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState(null);
  const [items, setItems] = useState([
    { label: "日付が新しい順", value: "newest" },
    { label: "日付が古い順", value: "oldest" },
    { label: "金額が高い順", value: "highest" },
    { label: "金額が安い順", value: "lowest" },
  ]);
  return (
    <GrayBar style={styles.sortContainer}>
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
    </GrayBar>
  );
};

const styles = StyleSheet.create({
  sortContainer: {
    height: 40,
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
