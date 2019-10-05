import React from "react";
import { StyleSheet, Text, TouchableOpacity } from "react-native";
import { CellType } from "../scripts/sudokuGenerator";

interface ICellProps {
  title: string;
  style?: any;
  onPress: () => void;
  item: CellType;
}
const Cell = ({ title, style, onPress, item }: ICellProps) => {
  return (
    <TouchableOpacity onPress={onPress} style={[_styles.box, style]}>
      <Text
        style={{
          color: item.isPermanent ? "#FE7D5E" : "#47433f",
          fontWeight: "bold",
          fontSize: 16
        }}
      >
        {title}
      </Text>
    </TouchableOpacity>
  );
};

const _styles = StyleSheet.create({
  box: {
    flex: 1,
    alignItems: "center",
    borderRightWidth: 0.3,
    borderRightColor: "#FE7D5E",
    borderBottomWidth: 0.3,
    borderBottomColor: "#FE7D5E",
    padding: 10,
    fontSize: 16
  }
});

export default Cell;
