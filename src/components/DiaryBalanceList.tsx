import React, { useState } from "react";
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { useNavigation, useRoute } from "@react-navigation/native";

export const DiaryBalanceList: React.FC = () => {
  const navigation = useNavigation();
  const showList = useRoute().name === "DiaryList";
  const listOpacity = showList ? 0.2 : 1;

  const onPress = () => {
    if (showList) {
      navigation.navigate("DiaryDetail");
    }
  };

  return (
    <ScrollView>
      <TouchableOpacity
        onPress={() => onPress()}
        style={styles.diaryBalanceListItem}
        activeOpacity={listOpacity}
      >
        <View>
          <Text style={styles.diaryBalanceListItemTitle}>映画</Text>
          {showList && (
            <Text style={styles.diaryBalanceListItemDate}>2020年12月24日</Text>
          )}
        </View>
        <View>
          <Text style={styles.diaryBalanceListItemAmount}>￥1000</Text>
        </View>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => onPress}
        style={styles.diaryBalanceListItem}
      >
        <View>
          <Text style={styles.diaryBalanceListItemTitle}>映画</Text>
          {showList && (
            <Text style={styles.diaryBalanceListItemDate}>2020年12月24日</Text>
          )}
        </View>
        <View>
          <Text style={styles.diaryBalanceListItemAmount}>￥1000</Text>
        </View>
      </TouchableOpacity>
    </ScrollView>
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
