import React from "react";
import { StyleSheet, Text, TouchableOpacity } from "react-native";

interface ICellProps {
  title: string;
  style?: any;
  onPress: () => void;
}
const Cell = ({ title, style, onPress }: ICellProps) => {
  return (
    <TouchableOpacity onPress={onPress} style={[_styles.box, style]}>
      <Text style={{color: "#47433f"}}>{title}</Text>
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
