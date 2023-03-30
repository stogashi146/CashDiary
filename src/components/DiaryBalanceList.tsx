import React from "react";
import { StyleSheet, Text, View } from "react-native";

export const DiaryBalanceList: React.FC = () => {
  return (
    <View>
      <View style={styles.diaryBalanceListItem}>
        <View>
          <Text style={styles.diaryBalanceListItemTitle}>映画</Text>
          <Text style={styles.diaryBalanceListItemDate}>2020年12月24日</Text>
        </View>
        <View>
          <Text style={styles.diaryBalanceListItemAmount}>￥1000</Text>
        </View>
      </View>
      <View style={styles.diaryBalanceListItem}>
        <View>
          <Text style={styles.diaryBalanceListItemTitle}>映画</Text>
          <Text style={styles.diaryBalanceListItemDate}>2020年12月24日</Text>
        </View>
        <View>
          <Text style={styles.diaryBalanceListItemAmount}>￥1000</Text>
        </View>
      </View>
      <View style={styles.diaryBalanceListItem}>
        <View>
          <Text style={styles.diaryBalanceListItemTitle}>映画</Text>
          <Text style={styles.diaryBalanceListItemDate}>2020年12月24日</Text>
        </View>
        <View>
          <Text style={styles.diaryBalanceListItemAmount}>￥1000</Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  diaryBalanceListItem: {
    backgroundColor: "#FFFFFF",
    // 横並びにする
    flexDirection: "row",
    //要素間にスペースを開ける
    justifyContent: "space-between",
    alignItems: "flex-end",
    paddingVertical: 12,
    paddingHorizontal: 19,
    borderBottomWidth: 1,
    borderColor: "rgba(0,0,0,0.15)",
  },
  diaryBalanceListItemTitle: {
    fontSize: 18,
    lineHeight: 32,
  },
  diaryBalanceListItemDate: {
    fontSize: 12,
    lineHeight: 16,
    color: "#848484",
  },
  diaryBalanceListItemAmount: {
    fontSize: 16,
  },
});
