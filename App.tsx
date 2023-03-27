import { StyleSheet, Text, View } from "react-native";
import { AppBar } from "./src/components/AppBar";
import { DiaryBalanceList } from "./src/components/DiaryBalanceList";

export default function App() {
  return (
    <View style={styles.container}>
      <AppBar />
      <View style={styles.totalBalanceDate}>
        <Text style={styles.totalBalanceDateArrow}>＜</Text>
        <Text style={styles.totalBalanceDateTitle}>2023年11月</Text>
        <Text style={styles.totalBalanceDateArrow}>＞</Text>
      </View>
      <View style={styles.incomeExpenseBox}>
        <View style={styles.incomeExpenseInnerBox}>
          <Text>収入</Text>
          <Text>+￥5,000</Text>
        </View>
        <View style={styles.incomeExpenseInnerBox}>
          <Text>支出</Text>
          <Text>-￥3,000</Text>
        </View>
      </View>
      <DiaryBalanceList />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFFFFF",
  },
  totalBalanceDate: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginHorizontal: 20,
    height: 50,
  },
  totalBalanceDateArrow: {
    fontSize: 20,
    lineHeight: 32,
    marginTop: 1,
  },
  totalBalanceDateTitle: {
    fontSize: 20,
    fontWeight: "400",
    lineHeight: 32,
    color: "#D6423A",
    paddingHorizontal: 50,
    backgroundColor: "#F2F2F6",
  },
  incomeExpenseBox: {
    flexDirection: "row",
    justifyContent: "space-around",
  },
  incomeExpenseInnerBox: {
    flexDirection: "row",
    borderWidth: 1,
    // padd
  },
  diaryBalanceListItem: {
    backgroundColor: "#FFFFFF",
    // 横並びにする
    flexDirection: "row",
    //要素間にスペースを開ける
    justifyContent: "space-between",
    alignItems: "flex-end",
    paddingVertical: 16,
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
