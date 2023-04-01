import { StyleSheet, Text, View } from "react-native";
import { EvilIcons } from "@expo/vector-icons";

export const DiaryEntryForm = () => {
  return (
    <View style={styles.diaryContainer}>
      <View style={styles.diaryDateContainer}>
        <EvilIcons name="calendar" size={38} color="black" />
        <Text style={styles.diaryDateText}>2023/1/2(月)</Text>
      </View>
      <View style={styles.diaryTitleContainer}>
        <Text style={styles.diaryTitleText}>映画を見に行った</Text>
      </View>
      <View style={styles.diaryContentContainer}>
        <Text style={styles.diaryContentText}>
          誰々と映画を見に行った。 Winnyを見た。
          面白かった誰々と映画を見に行った。 Winnyを見た。
          面白かった誰々と映画を見に行った。 Winnyを見た。 面白かった
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  diaryContainer: {
    alignItems: "center",
  },
  diaryDateContainer: {
    width: "90%",
    flexDirection: "row",
    alignItems: "center",
    borderColor: "rgba(0,0,0,1)",
    borderTopWidth: 0.5,
    paddingVertical: 10,
  },
  diaryDateText: {
    fontSize: 19,
    paddingLeft: 10,
  },
  diaryTitleContainer: {
    width: "90%",
    borderBottomWidth: 0.5,
    borderColor: "rgba(0,0,0,1)",
    borderTopWidth: 0.5,
    paddingVertical: 3,
  },
  diaryTitleText: {
    fontSize: 22,
    padding: 8,
  },
  diaryContentContainer: {
    width: "90%",
    height: "80%",
  },
  diaryContentText: {
    fontSize: 18,
    padding: 10,
  },
});
