import React from "react";
import { StyleSheet, Text, View } from "react-native";

export const AppBar: React.FC = () => {
  return (
    <View style={styles.appbar}>
      <View style={styles.appbarInner}>
        <Text style={styles.appbarTitle}>家計簿</Text>
        <Text style={styles.appbarRight}></Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  appbar: {
    width: "100%",
    height: 64,
    backgroundColor: "#F0F4F8",
    justifyContent: "flex-end",
    borderBottomWidth: 0.5,
    borderBottomColor: "#C1C1C1",
  },
  appbarInner: {
    alignItems: "center",
  },
  appbarTitle: {
    marginBottom: 5,
    fontSize: 20,
    lineHeight: 32,
    fontWeight: "bold",
    color: "#525252",
  },
  appbarRight: {
    position: "absolute",
    right: 19,
    bottom: 10,
    color: "#525252",
  },
});
