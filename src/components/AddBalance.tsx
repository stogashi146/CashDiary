import React, { useEffect } from "react";
import { useState } from "react";
import {
  KeyboardAvoidingView,
  Modal,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import { CheckBox } from "@rneui/themed";
import { Button } from "@rneui/base";
import { AntDesign } from "@expo/vector-icons";
import { SafeAreaView } from "react-native-safe-area-context";
import { SquareButton } from "./SquareButton";

interface AddBalanceProps {
  handleCreateBalance?: (balance: BalanceData) => void;
}

export const AddBalance: React.FC<AddBalanceProps> = (props) => {
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("");
  const [balanceAmount, setBalanceAmount] = useState(0);
  const [checkedBalanceIndex, setCheckedBalanceIndex] = useState(0);
  const [modalVisible, setModalVisible] = useState(false);

  const { handleCreateBalance } = props;

  const onPressAddBalance = () => {
    if (handleCreateBalance == null) return;

    handleCreateBalance({
      title: title,
      category: category,
      balanceDirection: checkedBalanceIndex === 0 ? "income" : "expense",
      amount: balanceAmount,
    });
    setModalVisible(false);
  };

  return (
    <View style={[styles.addBalanceContainer]}>
      <View
        style={{
          position: "relative",
          bottom: 0,
          marginTop: 20,
          width: "85%",
          alignSelf: "center",
        }}
      >
        <SquareButton onPress={() => setModalVisible(true)}>
          追加する
        </SquareButton>
      </View>
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(!modalVisible);
        }}
      >
        <KeyboardAvoidingView
          behavior={Platform.OS === "ios" ? "padding" : "height"}
          style={styles.modalContainer}
        >
          <SafeAreaView>
            <View style={styles.modalContent}>
              <ScrollView>
                <AntDesign
                  name="close"
                  size={26}
                  color="black"
                  style={styles.modalCloseIcon}
                  onPress={() => setModalVisible(false)}
                />
                <View style={styles.addBalanceRow}>
                  <Text style={styles.addBalanceLabel}>メモ</Text>
                  <TextInput
                    style={styles.addBalanceText}
                    value={title}
                    onChangeText={(text) => setTitle(text)}
                  />
                </View>
                <View style={styles.addBalanceRow}>
                  <Text style={styles.addBalanceLabel}>カテゴリ</Text>
                  <TextInput
                    style={styles.addBalanceText}
                    value={category}
                    onChangeText={(text) => setCategory(text)}
                  />
                </View>
                <View style={styles.checkboxBalanceRow}>
                  <Text>収入</Text>
                  <CheckBox
                    checked={checkedBalanceIndex === 0}
                    onPress={() => setCheckedBalanceIndex(0)}
                    checkedIcon="dot-circle-o"
                    uncheckedIcon="circle-o"
                    size={18}
                    style={styles.checkBox}
                  />
                  <Text>支出</Text>
                  <CheckBox
                    checked={checkedBalanceIndex === 1}
                    onPress={() => setCheckedBalanceIndex(1)}
                    checkedIcon="dot-circle-o"
                    uncheckedIcon="circle-o"
                    size={18}
                    style={styles.checkBox}
                  />
                </View>

                <View style={styles.addBalanceRow}>
                  <Text style={styles.addBalanceLabel}>金額</Text>
                  <TextInput
                    value={balanceAmount.toString()}
                    onChangeText={(text) => {
                      setBalanceAmount(Number(text));
                    }}
                    style={[styles.addBalanceText, styles.amountText]}
                    keyboardType="numeric"
                  />
                </View>
                <View style={styles.addButtonContainer}>
                  <SquareButton onPress={onPressAddBalance}>決定</SquareButton>
                </View>
              </ScrollView>
            </View>
          </SafeAreaView>
        </KeyboardAvoidingView>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  addBalanceContainer: {
    // alignItems: "center",
  },
  modalContainer: {
    flex: 1,
    justifyContent: "flex-end",
  },
  modalContent: {
    backgroundColor: "#fafafa",
    borderWidth: 0.5,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    paddingHorizontal: 20,
    paddingBottom: 20,
    paddingTop: 5,
    // height: Dimensions.get("window").height - 150,
  },
  modalBalanceAddButton: {
    padding: 12,
  },
  modalBalanceAddText: {
    color: "white",
    paddingLeft: 3,
  },
  modalCloseIcon: {
    alignSelf: "flex-end",
    marginVertical: 15,
    color: "rgba(0,0,0,0.5)",
  },
  hideModalButton: {
    backgroundColor: "red",
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 5,
  },
  hideModalButtonText: {
    color: "white",
    fontSize: 16,
  },

  addBalanceRow: {
    backgroundColor: "white",
    paddingVertical: 10,
    borderWidth: 0.5,
    borderColor: "#E1E1E1",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  checkboxBalanceRow: {
    backgroundColor: "white",
    borderWidth: 0.5,
    borderColor: "#E1E1E1",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  addBalanceLabel: {
    position: "absolute",
    left: 20,
    fontSize: 12,
  },
  addBalanceText: {
    width: "100%",
    textAlign: "center",
    fontSize: 16,
  },
  checkBox: {
    padding: 8,
  },
  amountText: {
    fontWeight: "600",
    fontSize: 20,
  },
  addButtonContainer: {
    marginTop: 20,
  },
});
