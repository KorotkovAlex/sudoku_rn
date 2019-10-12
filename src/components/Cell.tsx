import React from "react";
import { StyleSheet, Text, TouchableOpacity } from "react-native";
import { CellType } from "../scripts/sudokuGenerator";
import { SudokuConsumer } from "../scripts/sudokuContext";

interface ICellProps {
  title: string;
  style?: any;
  onPress: () => void;
  item: CellType;
}
const Cell = ({ title, style, onPress, item }: ICellProps) => {
  return (
    <SudokuConsumer>
      {({ dimensions }) => (
        <TouchableOpacity
          onPress={onPress}
          style={[
            _styles.box,
            style,
            {
              width: dimensions.width / 9 - 20 / 9,
              height: dimensions.width / 9 - 20 / 9,
              alignItems: "center",
              justifyContent: "center"
            }
          ]}
        >
          <Text
            style={{
              color: item.isPermanent ? "#FE7D5E" : "#47433f",
              fontWeight: "bold",
              fontSize: 16 * dimensions.baseWidth
            }}
          >
            {title}
          </Text>
        </TouchableOpacity>
      )}
    </SudokuConsumer>
  );
};

const _styles = StyleSheet.create({
  box: {
    alignItems: "center",
    borderRightWidth: 0.3,
    borderRightColor: "#FE7D5E",
    borderBottomWidth: 0.3,
    borderBottomColor: "#FE7D5E"
  }
});

export default Cell;
