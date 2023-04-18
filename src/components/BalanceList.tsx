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

interface BalanceListProps {
  balances: CashBalanceData[];
}

export const BalanceList: React.FC<BalanceListProps> = (props) => {
  const navigation = useNavigation();
  const { balances } = props;

  return (
    <SafeAreaView
      style={styles.balanceListContainer}
      edges={["right", "left", "bottom"]}
    >
      <ScrollView>
        {balances.map((balance, index) => {
          return (
            <TouchableOpacity
              // onPress={() => onPress()}
              style={styles.balanceListItem}
              activeOpacity={1}
              key={index}
            >
              <View>
                <Text style={styles.balanceListItemTitle}>{balance.title}</Text>
              </View>
              <View>
                <Text style={styles.balanceListItemAmount}>
                  {balance.amount}
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
  balanceListContainer: {
    flex: 1,
    paddingTop: 0,
    marginTop: 0,
    height: 325,
  },
  balanceListItem: {
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
  balanceListItemTitle: {
    fontSize: 18,
    lineHeight: 32,
  },
  balanceListItemAmount: {
    fontSize: 16,
  },
});
