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

interface DiaryListProps {
  diaryBalances: DiaryBalanceData[];
}

export const DiaryList: React.FC<DiaryListProps> = (props) => {
  const navigation = useNavigation();

  const { diaryBalances } = props;

  const onPress = () => {
    navigation.navigate("DiaryDetail");
  };

  return (
    <SafeAreaView
      style={styles.diaryListContainer}
      edges={["right", "left", "bottom"]}
    >
      <ScrollView>
        {diaryBalances.map((diaryBalance, index) => {
          return (
            <TouchableOpacity
              onPress={() => onPress()}
              style={styles.diaryListItem}
              activeOpacity={1}
              key={index}
            >
              <View>
                <Text style={styles.diaryListItemTitle}>
                  {diaryBalance.title}
                </Text>
                <Text style={styles.diaryListItemDate}>
                  {diaryBalance.date}
                </Text>
              </View>
              <View>
                <Text style={styles.diaryListItemAmount}>
                  {diaryBalance.total}
                </Text>
              </View>
            </TouchableOpacity>
          );
        })}
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  diaryListContainer: {
    flex: 1,
    paddingTop: 0,
    marginTop: 0,
    height: 325,
  },
  diaryListItem: {
    height: 70,
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
  diaryListItemTitle: {
    fontSize: 18,
    lineHeight: 32,
  },
  diaryListItemDate: {
    fontSize: 12,
    lineHeight: 16,
    color: "#848484",
  },
  diaryListItemAmount: {
    fontSize: 16,
  },
});
