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
import { useState } from "react";
import { formatDateWithWeekday } from "../utils/dateFormat";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import getInset from "react-native-safe-area-view";

export const DiaryEntryForm = () => {
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
  const [diaryTitle, setDiaryTitle] = useState("");
  const [diaryContent, setDiaryContent] = useState(
    "aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa"
  );
  const { height } = Dimensions.get("window");

  const showDatePicker = () => {
    setDatePickerVisibility(true);
  };

  const hideDatePicker = () => {
    setDatePickerVisibility(false);
  };

  const handleConfirm = (date: Date) => {
    setSelectedDate(date);
    hideDatePicker();
  };

  return (
    <ScrollView contentContainerStyle={styles.diaryContainer}>
      <TouchableOpacity
        onPress={showDatePicker}
        style={styles.diaryDateContainer}
        activeOpacity={1}
      >
        <EvilIcons name="calendar" size={38} color="black" />
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
        />
      </View>
      <View style={styles.diaryContentContainer}>
        <TextInput
          style={[styles.diaryContentText]}
          multiline
          onChangeText={(text) => {
            setDiaryContent(text);
          }}
          value={diaryContent}
          scrollEnabled={false}
        />
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  diaryContainer: {
    alignItems: "center",
  },
  diaryDateContainer: {
    width: "90%",
    flexDirection: "row",
    // alignItems: "center",
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
    flexGrow: 1,
  },
  diaryContentText: {
    padding: 12,
    fontSize: 18,
  },
});
