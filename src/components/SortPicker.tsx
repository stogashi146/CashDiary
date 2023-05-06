import { StyleSheet, Text, View } from "react-native";
import DropDownPicker from "react-native-dropdown-picker";
import { useEffect, useState } from "react";
import { GrayBar } from "./GrayBar";
import { SORT_TYPE, SortType } from "../constants/SortTypeContants";

interface SortPickerProps {
  handleSetSortType: (type: SortType) => void;
}

export const SortPicker: React.FC<SortPickerProps> = (props) => {
  const { handleSetSortType } = props;

  const [open, setOpen] = useState(false);
  const [value, setValue] = useState<SortType>("newest");
  const [items, setItems] = useState([
    { label: "日付が新しい順", value: SORT_TYPE.newest },
    { label: "日付が古い順", value: SORT_TYPE.oldest },
    { label: "金額が高い順", value: SORT_TYPE.highest },
    { label: "金額が安い順", value: SORT_TYPE.lowest },
  ]);

  useEffect(() => {
    handleSetSortType(value);
  }, [value]);

  return (
    <GrayBar style={styles.sortContainer}>
      <DropDownPicker
        open={open}
        value={value}
        items={items}
        setOpen={setOpen}
        setValue={setValue}
        setItems={setItems}
        style={{ minHeight: 20 }}
        containerStyle={styles.sortDropDown}
        placeholder="新しい順"
      />
    </GrayBar>
  );
};

const styles = StyleSheet.create({
  sortContainer: {
    height: 35,
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
