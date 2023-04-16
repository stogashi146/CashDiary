import {
  Button,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  Dimensions,
  KeyboardAvoidingView,
  ScrollView,
  Platform,
} from "react-native";
import { EvilIcons } from "@expo/vector-icons";
import React, { useState } from "react";
import { formatDateWithWeekday } from "../utils/DateFormat";
import DateTimePickerModal from "react-native-modal-datetime-picker";

interface DiaryEntryFormProps {
  handleSetDate: (date: Date) => void;
  handleSetTitle: (title: string) => void;
  handleSetContent: (content: string) => void;
}

export const DiaryEntryForm: React.FC<DiaryEntryFormProps> = (props) => {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [diaryTitle, setDiaryTitle] = useState("");
  const [diaryContent, setDiaryContent] = useState("");
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
  const { height } = Dimensions.get("window");

  const { handleSetDate, handleSetTitle, handleSetContent } = props;

  const showDatePicker = () => {
    setDatePickerVisibility(true);
  };

  const hideDatePicker = () => {
    setDatePickerVisibility(false);
  };

  const handleConfirm = (date: Date) => {
    setSelectedDate(date);
    hideDatePicker();
    handleSetDate(date);
  };

  const handleTitleChange = (title: string) => {
    setDiaryTitle(title);
    handleSetTitle(title);
  };

  const handleContentChange = (content: string) => {
    setDiaryContent(content);
    handleSetContent(content);
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <ScrollView contentContainerStyle={styles.diaryContainer}>
        <TouchableOpacity
          onPress={showDatePicker}
          style={styles.diaryDateContainer}
          activeOpacity={1}
        >
          <EvilIcons name="calendar" size={36} color="black" />
          <Text style={styles.diaryDateText}>
            {formatDateWithWeekday(selectedDate)}
          </Text>
          <DateTimePickerModal
            date={selectedDate}
            isVisible={isDatePickerVisible}
            mode="date"
            display="inline"
            onConfirm={handleConfirm}
            onCancel={hideDatePicker}
            confirmTextIOS="決定"
            cancelTextIOS="キャンセル"
          />
        </TouchableOpacity>

        <View style={styles.diaryTitleContainer}>
          <TextInput
            style={styles.diaryTitleText}
            onChangeText={(text) => {
              handleTitleChange(text);
            }}
            value={diaryTitle}
            placeholder="タイトル"
          />
        </View>
        <View style={styles.diaryContentContainer}>
          <TextInput
            style={[styles.diaryContentText, { height: height / 2 }]}
            multiline
            onChangeText={(text) => {
              handleContentChange(text);
            }}
            value={diaryContent}
            scrollEnabled={false}
            placeholder="本文"
          />
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  diaryContainer: {
    alignItems: "center",
  },
  diaryDateContainer: {
    width: "90%",
    flexDirection: "row",
    borderColor: "rgba(0,0,0,1)",
    borderTopWidth: 0.5,
    paddingVertical: 6,
  },
  diaryDateText: {
    fontSize: 16,
    paddingLeft: 10,
    alignSelf: "center",
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
    flexGrow: 1,
  },
  diaryContentText: {
    padding: 12,
    fontSize: 16,
  },
});
