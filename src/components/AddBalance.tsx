import React, { useEffect } from "react";
import { useState } from "react";
import {
  Dimensions,
  GestureResponderEvent,
  LayoutChangeEvent,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { CheckBox } from "@rneui/themed";
import { Button } from "@rneui/base";
import { AntDesign } from "@expo/vector-icons";

export const AddBalance: React.FC = () => {
  const [checkedIndex, setCheckedIndex] = useState(0);
  const [viewHeight, setViewHeight] = useState<number>(0);
  const [screenHeight, setScreenHeight] = useState<number>(0);
  const [addContainerPosition, setAddContainerPosition] = useState(0);
  const checkViewHeight = (event: LayoutChangeEvent) => {
    const { height } = event.nativeEvent.layout;
    setViewHeight(height);
  };

  useEffect(() => {
    setScreenHeight(Dimensions.get("window").height);
    setAddContainerPosition(screenHeight / 2 - viewHeight);
  }, []);

  return (
    <View
      style={[styles.addBalanceContainer]}
      onLayout={(event) => {
        checkViewHeight(event);
      }}
    >
      <View style={styles.addBalanceRow}>
        <Text style={styles.addBalanceLabel}>タイトル</Text>
        <Text style={styles.addBalanceText}>ああを購入</Text>
      </View>
      <View style={styles.addBalanceRow}>
        <Text style={styles.addBalanceLabel}>カテゴリ</Text>
        <Text style={styles.addBalanceText}>趣味</Text>
      </View>
      <View style={styles.addBalanceRow}>
        <Text>収入</Text>
        <CheckBox
          checked={checkedIndex === 0}
          onPress={() => setCheckedIndex(0)}
          checkedIcon="dot-circle-o"
          uncheckedIcon="circle-o"
          size={18}
          style={{ padding: 0 }}
        />
        <Text>支出</Text>
        <CheckBox
          checked={checkedIndex === 1}
          onPress={() => setCheckedIndex(1)}
          checkedIcon="dot-circle-o"
          uncheckedIcon="circle-o"
          size={18}
        />
      </View>

      <View style={styles.addBalanceRow}>
        <Text style={styles.addBalanceLabel}>金額</Text>
        <Text
          style={(styles.addBalanceText, { fontWeight: "600", fontSize: 20 })}
        >
          ￥1000
        </Text>
      </View>
      <View style={styles.addButtonContainer}>
        <Button
          title={" 追加する"}
          size="md"
          icon={<AntDesign name="plus" size={16} color="white" />}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  addBalanceContainer: {
    alignItems: "center",
    // position: "absolute",
    // bottom: -400,
    // top: 0,
    left: 0,
    right: 0,
  },
  addBalanceRow: {
    width: "90%",
    height: 50,
    borderWidth: 1,
    borderColor: "#E1E1E1",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  addBalanceLabel: {
    position: "absolute",
    left: 20,
    fontSize: 12,
  },
  addBalanceText: {
    textAlign: "center",
    fontSize: 16,
  },
  addButtonContainer: {
    width: "90%",
    height: 50,
    marginTop: 5,
  },
});
