import { StyleSheet, Text, View } from "react-native";

export const DiaryEntryDetail = () => {
  return (
    <View style={styles.diaryContainer}>
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
