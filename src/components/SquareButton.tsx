import React from "react";
import { AntDesign } from "@expo/vector-icons";
import { Button } from "@rneui/base";
import { StyleSheet, StyleSheetProperties, Text } from "react-native";

interface ButtonProps {
  onPress?: () => void;
  type?: "add";
  children: React.ReactNode;
  color?: string;
  style?: any;
}

export const SquareButton: React.FC<ButtonProps> = (props: ButtonProps) => {
  const { children, onPress, type, style } = props;
  return (
    <Button
      size="md"
      buttonStyle={[styles.modalBalanceAddButton, style]}
      onPress={onPress}
      color="success"
      radius={8}
    >
      <AntDesign name="plus" size={12} color="white" />
      <Text style={styles.modalBalanceAddText}>{children}</Text>
    </Button>
  );
};

const styles = StyleSheet.create({
  modalBalanceAddText: {
    color: "white",
    paddingLeft: 3,
  },
  modalBalanceAddButton: {
    padding: 12,
  },
});
