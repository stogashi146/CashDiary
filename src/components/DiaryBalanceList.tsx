import React, { useState } from "react";
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { useNavigation, useRoute } from "@react-navigation/native";

interface DiaryBalanceListProps {
  balances: BalanceData[];
  // screenType: "list" | "detail";
}

export const DiaryBalanceList: React.FC<DiaryBalanceListProps> = (props) => {
  const navigation = useNavigation();
  const isListScreen = useRoute().name === "DiaryList";
  const listOpacity = isListScreen ? 0.2 : 1;

  const { balances } = props;

  const onPress = () => {
    if (isListScreen) {
      navigation.navigate("DiaryDetail");
    }
  };

  return (
    <ScrollView style={styles.diaryBalanceListContainer}>
      {isListScreen ? (
        <TouchableOpacity
          onPress={() => onPress()}
          style={styles.diaryBalanceListItem}
          activeOpacity={listOpacity}
        >
          <View>
            <Text style={styles.diaryBalanceListItemTitle}>映画</Text>
            <Text style={styles.diaryBalanceListItemDate}>2020年12月24日</Text>
          </View>
          <View>
            <Text style={styles.diaryBalanceListItemAmount}>￥1000</Text>
          </View>
        </TouchableOpacity>
      ) : (
        balances &&
        balances.map((balance, index) => {
          return (
            <View style={styles.diaryBalanceListItem} key={index}>
              <View>
                <Text style={styles.diaryBalanceListItemTitle}>
                  {balance.title}
                </Text>
              </View>
              <View>
                <Text
                  style={styles.diaryBalanceListItemAmount}
                >{`￥${balance.amount}`}</Text>
              </View>
            </View>
          );
        })
      )}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  diaryBalanceListContainer: {
    height: 325,
  },
  diaryBalanceListItem: {
    height: 65,
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
