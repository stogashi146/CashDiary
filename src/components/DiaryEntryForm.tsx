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
import { formatDateWithWeekday } from "../utils/dateFormat";
import DateTimePickerModal from "react-native-modal-datetime-picker";

interface DiaryEntryFormProps {
  handleSetDate: (date: Date) => void;
}

export const DiaryEntryForm: React.FC<DiaryEntryFormProps> = (props) => {
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
  const [diaryTitle, setDiaryTitle] = useState("");
  const [diaryContent, setDiaryContent] = useState("");
  const { height } = Dimensions.get("window");

  const { handleSetDate } = props;

  const showDatePicker = () => {
    setDatePickerVisibility(true);
  };

  const hideDatePicker = () => {
    setDatePickerVisibility(false);
  };

  const handleConfirm = (date: Date) => {
    setSelectedDate(date);
    handleSetDate(date);
    hideDatePicker();
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
              setDiaryTitle(text);
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
              setDiaryContent(text);
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
