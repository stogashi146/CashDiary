import React from "react";
import { StyleSheet, Text, View } from "react-native";

interface DiaryEntryDetailProps {
  diary: DiaryData;
}

export const DiaryEntryDetail: React.FC<DiaryEntryDetailProps> = (props) => {
  const { diary } = props;

  // console.log(diary);

  return (
    <View style={styles.diaryContainer}>
      <View style={styles.diaryTitleContainer}>
        <Text style={styles.diaryTitleText}>{diary.title}</Text>
      </View>
      <View style={styles.diaryContentContainer}>
        <Text style={styles.diaryContentText}>{diary.content}</Text>
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
    fontSize: 18,
    padding: 4,
  },
  diaryContentContainer: {
    width: "90%",
    height: "80%",
  },
  diaryContentText: {
    padding: 12,
    fontSize: 16,
  },
});
