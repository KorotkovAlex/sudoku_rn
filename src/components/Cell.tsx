import React from "react";
import { View, StyleSheet, Text, TouchableOpacity } from "react-native";

interface CellProps {
  title: string;
  style?: any;
  onPress: () => void;
}
const Cell = ({ title, style, onPress }: CellProps) => {
  return (
    <TouchableOpacity onPress={onPress} style={[_styles.box, style]}>
      <Text>{title}</Text>
    </TouchableOpacity>
  );
};

const _styles = StyleSheet.create({
  box: {
    flex: 1,
    alignItems: "center",
    borderWidth: 0.2,
    borderColor: "#FE7D5E",
    padding: 10,
    fontSize: 16
  }
});

export default Cell;
