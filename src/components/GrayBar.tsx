import React from "react";
import { ReactNode } from "react";
import { StyleSheet, View, ViewStyle } from "react-native";

interface grayBarProps {
  children?: ReactNode;
  style?: ViewStyle;
}

export const GrayBar: React.FC<grayBarProps> = (props) => {
  const { children, style } = props;
  const combinedStyles = StyleSheet.compose(styles.sortContainer, style);
  return <View style={combinedStyles}>{children}</View>;
};

const styles = StyleSheet.create({
  sortContainer: {
    backgroundColor: "#F2F2F6",
    borderBottomWidth: 0.5,
    borderBottomColor: "rgba(0, 0, 0, 0.5)",
    height: 35,
    marginTop: 10,
    zIndex: 1,
  },
});
