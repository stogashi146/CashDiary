import React from "react";
import { useState } from "react";
import { StyleSheet, View } from "react-native";
import SegmentedControl from "@react-native-segmented-control/segmented-control";

interface DiaryBalanceSwitchTabProps {
  onClick: (index: number) => void;
}

export const DiaryBalanceSwitchTab: React.FC<DiaryBalanceSwitchTabProps> = ({
  onClick,
}) => {
  // タブ切り替え 0:日記 1:家計簿
  const [selectedIndex, setSelectedIndex] = useState(0);

  const handleClick = (selectedIndex: number) => {
    onClick(selectedIndex);
    setSelectedIndex(selectedIndex);
  };

  return (
    <View style={styles.tabContainer}>
      <SegmentedControl
        values={["日記", "家計簿"]}
        selectedIndex={selectedIndex}
        onChange={(event: any) => {
          handleClick(event.nativeEvent.selectedSegmentIndex);
        }}
        style={styles.tabControl}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  tabContainer: {
    alignItems: "center",
  },
  tabControl: {
    width: "80%",
    marginVertical: 10,
  },
});
