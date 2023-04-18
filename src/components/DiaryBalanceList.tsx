import React, { useState } from "react";
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { useNavigation, useRoute } from "@react-navigation/native";
import { SafeAreaView } from "react-native-safe-area-context";

interface DiaryBalanceListProps {
  diaries: DiaryData[];
  // screenType: "list" | "detail";
}

export const DiaryBalanceList: React.FC<DiaryBalanceListProps> = (props) => {
  const navigation = useNavigation();
  const isListScreen = useRoute().name === "DiaryList";
  const touchOpacity = isListScreen ? 0.5 : 1;

  const { diaries } = props;

  const onPress = () => {
    if (isListScreen) {
      navigation.navigate("DiaryDetail");
    }
  };

  const renderDiary = () => {
    return (
      <ScrollView>
        {diaries.map((diary, index) => {
          return (
            <TouchableOpacity
              onPress={() => onPress()}
              style={styles.diaryBalanceListItem}
              activeOpacity={touchOpacity}
              key={index}
            >
              <View>
                <Text style={styles.diaryBalanceListItemTitle}>
                  {diary.title}
                </Text>
                <Text style={styles.diaryBalanceListItemDate}>
                  {diary.date}
                </Text>
              </View>
              <View>
                <Text style={styles.diaryBalanceListItemAmount}>￥1000</Text>
              </View>
            </TouchableOpacity>
          );
        })}
      </ScrollView>
    );
  };

  return (
    <SafeAreaView
      style={styles.diaryBalanceListContainer}
      edges={["right", "left", "bottom"]}
    >
      {renderDiary()}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  diaryBalanceListContainer: {
    flex: 1,
    paddingTop: 0,
    marginTop: 0,
    height: 325,
  },
  diaryBalanceListItem: {
    height: 70,
    backgroundColor: "gray",
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
  diaryBalanceCreateListItem: {
    height: 60,
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
