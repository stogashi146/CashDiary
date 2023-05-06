import React, { useEffect, useState } from "react";
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { useNavigation, useRoute } from "@react-navigation/native";
import { SafeAreaView } from "react-native-safe-area-context";
import { AntDesign } from "@expo/vector-icons";

interface BalanceListProps {
  balances: CashBalanceData[];
  handleDeleteBalance?: (deleteIndex: number) => void;
}

export const BalanceList: React.FC<BalanceListProps> = (props) => {
  const navigation = useNavigation();
  const route = useRoute();
  const { balances, handleDeleteBalance } = props;

  // const [sortedBalances, setSortedBalances] = useState<CashBalanceData[]>([]);
  const readOnly = route.name === "DiaryDetail";

  // useEffect(() => {
  //   setSortedBalances(balances);
  // }, [balances]);

  // useEffect(() => {
  //   const tmp_balances = balances.slice();
  //   if (sortType === "newest") {
  //     setSortedBalances(
  //       tmp_balances.sort((a, b) => {
  //         // createdAtがない場合0を返す
  //         if (!a.createdAt || !b.createdAt) {
  //           return 0;
  //         }

  //         if (a.createdAt > b.createdAt) {
  //           return -1;
  //         } else {
  //           return 1;
  //         }
  //       })
  //     );
  //   } else if (sortType === "oldest") {
  //     setSortedBalances(
  //       tmp_balances.sort((a, b) => {
  //         if (!a.createdAt || !b.createdAt) {
  //           return 0;
  //         }

  //         if (a.createdAt < b.createdAt) {
  //           return -1;
  //         } else {
  //           return 1;
  //         }
  //       })
  //     );
  //   } else if (sortType === "highest") {
  //     setSortedBalances(
  //       tmp_balances.sort((a, b) => {
  //         if (calcAmount(a) > calcAmount(b)) {
  //           return -1;
  //         } else {
  //           return 1;
  //         }
  //       })
  //     );
  //   } else if (sortType === "lowest") {
  //     setSortedBalances(
  //       tmp_balances.sort((a, b) => {
  //         if (calcAmount(a) < calcAmount(b)) {
  //           return -1;
  //         } else {
  //           return 1;
  //         }
  //       })
  //     );
  //   }
  //   console.log(sortedBalances);
  // }, [sortType]);

  // // expenseの場合はマイナスにする
  // const calcAmount = (balance: CashBalanceData) => {
  //   if (balance.incomeExpenseType === "expense") {
  //     return -balance.amount;
  //   } else {
  //     return balance.amount;
  //   }
  // };

  return (
    <SafeAreaView
      style={styles.balanceListContainer}
      edges={["right", "left", "bottom"]}
    >
      <ScrollView>
        {balances.map((balance, index) => {
          return (
            <TouchableOpacity
              style={styles.balanceListItem}
              activeOpacity={1}
              key={index}
            >
              <Text style={styles.balanceListItemTitle}>{balance.title}</Text>
              <View style={styles.rightContainer}>
                {readOnly ? null : (
                  <TouchableOpacity
                    onPress={() => {
                      handleDeleteBalance && handleDeleteBalance(index);
                    }}
                  >
                    <AntDesign
                      name="close"
                      size={22}
                      color="black"
                      style={styles.deleteIcon}
                    />
                  </TouchableOpacity>
                )}
                <View style={styles.amountContainer}>
                  <Text
                    style={[
                      balance.incomeExpenseType === "expense"
                        ? styles.expenseColor
                        : styles.incomeColor,
                      styles.balanceListItemAmount,
                    ]}
                  >
                    {balance.incomeExpenseType === "expense" ? "-" : "+"}
                    {balance.amount}
                  </Text>
                </View>
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
    alignItems: "center",
    borderBottomWidth: 1,
    borderColor: "rgba(0,0,0,0.15)",
  },
  balanceListItemTitle: {
    fontSize: 18,
    fontWeight: "500",
    lineHeight: 32,
    paddingLeft: 15,
  },
  rightContainer: {
    flexDirection: "column",
    alignItems: "flex-end",
    justifyContent: "space-between",
  },
  deleteIcon: {
    paddingBottom: 15,
    paddingRight: 5,
    color: "rgba(0,0,0,0.5)",
  },
  amountContainer: {
    alignSelf: "flex-end",
  },
  balanceListItemAmount: {
    fontSize: 16,
    fontWeight: "500",
    paddingRight: 15,
  },
  expenseColor: { color: "#FF0000" },
  incomeColor: { color: "#0094FF" },
});
