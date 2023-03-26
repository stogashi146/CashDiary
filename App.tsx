import { StyleSheet, Text, View } from "react-native";

export default function App() {
  return (
    <View style={styles.container}>
      <View style={styles.appbar}>
        <View style={styles.appbarInner}>
          <Text style={styles.appbarTitle}>家計簿</Text>
          <Text style={styles.appbarRight}>+</Text>
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
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F0F4F8",
  },
  appbar: {
    width: "100%",
    height: 64,
    backgroundColor: "#F0F4F8",
    justifyContent: "flex-end",
    borderBottomWidth: 0.5,
    borderBottomColor: "#C1C1C1",
  },
  appbarInner: {
    alignItems: "center",
  },
  appbarTitle: {
    marginBottom: 5,
    fontSize: 20,
    lineHeight: 32,
    fontWeight: "bold",
    color: "#525252",
  },
  appbarRight: {
    position: "absolute",
    right: 19,
    bottom: 10,
    color: "#525252",
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
