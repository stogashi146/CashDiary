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
import { AntDesign } from "@expo/vector-icons";
import { SafeAreaView } from "react-native-safe-area-context";
import { SquareButton } from "./SquareButton";

interface AddBalanceProps {
  handleCreateBalance?: (balance: CashBalanceData) => void;
}

export const AddBalance: React.FC<AddBalanceProps> = (props) => {
  const [title, setTitle] = useState("");
  const [balanceAmount, setBalanceAmount] = useState(0);
  const [checkedBalanceIndex, setCheckedBalanceIndex] = useState(0);
  const [modalVisible, setModalVisible] = useState(false);

  // 収入、支出を定数で定義
  const INCOME_EXPENSE_TYPE = { EXPENSE: 0, INCOME: 1 };

  const { handleCreateBalance } = props;

  const onPressAddBalance = () => {
    if (handleCreateBalance == null) return;

    handleCreateBalance({
      title: title,
      incomeExpenseType:
        checkedBalanceIndex === INCOME_EXPENSE_TYPE.EXPENSE
          ? "expense"
          : "income",
      amount: balanceAmount,
    });
    setModalVisible(false);
    resetValues();
  };

  const resetValues = () => {
    setTitle("");
    setBalanceAmount(0);
    setCheckedBalanceIndex(0);
  };

  return (
    <View>
      <View
        style={{
          // position: "relative",
          // bottom: -100,
          paddingBottom: 20,
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
                <View style={styles.modalTitleContainer}>
                  <Text style={styles.modalTitleText}>新規追加</Text>
                  <View style={styles.modalCloseIconContainer}>
                    <AntDesign
                      name="close"
                      size={26}
                      color="black"
                      style={styles.modalCloseIcon}
                      onPress={() => {
                        setModalVisible(false);
                        resetValues();
                      }}
                    />
                  </View>
                </View>
                <View style={styles.addBalanceRow}>
                  <Text style={styles.addBalanceLabel}>メモ</Text>
                  <TextInput
                    style={styles.addBalanceText}
                    value={title}
                    onChangeText={(text) => setTitle(text)}
                  />
                </View>
                <View style={styles.checkboxBalanceRow}>
                  <Text>支出</Text>
                  <CheckBox
                    checked={checkedBalanceIndex === 0}
                    onPress={() => setCheckedBalanceIndex(0)}
                    checkedIcon="dot-circle-o"
                    uncheckedIcon="circle-o"
                    size={18}
                    style={styles.checkBox}
                  />
                  <Text>収入</Text>
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
                  {/* 文字列を許容しない */}
                  <TextInput
                    onChangeText={(text) => {
                      // 数字のみ許容
                      if (/^\d+$/.test(text)) {
                        setBalanceAmount(Number(text));
                      }
                    }}
                    value={balanceAmount.toString()}
                    style={[
                      styles.addBalanceText,
                      styles.amountText,
                      checkedBalanceIndex === INCOME_EXPENSE_TYPE.EXPENSE
                        ? styles.expenseColor
                        : styles.incomeColor,
                    ]}
                    keyboardType="numeric"
                    placeholder="0"
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
  modalTitleContainer: {
    flexDirection: "row",
    justifyContent: "flex-end",
    alignItems: "center",
  },
  modalTitleText: {
    // 上下左右中央に寄せtる
    textAlign: "center",
    fontSize: 20,
    fontWeight: "600",
    marginLeft: 5,
  },
  modalCloseIconContainer: {
    flex: 1,
    alignItems: "flex-end",
  },
  modalCloseIcon: {
    marginVertical: 15,
    color: "rgba(0,0,0,0.5)",
  },
  modalBalanceAddButton: {
    padding: 12,
  },
  modalBalanceAddText: {
    color: "white",
    paddingLeft: 3,
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
  expenseColor: { color: "#FF0000" },
  incomeColor: { color: "#0094FF" },
});
