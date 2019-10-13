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

export default class Cell extends React.PureComponent<ICellProps> {
  render() {
    return (
      <SudokuConsumer>
        {({ dimensions }) => (
          <TouchableOpacity
            onPress={this.props.onPress}
            style={[
              _styles.box,
              this.props.style,
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
                color: this.props.item.isPermanent ? "#FE7D5E" : "#47433f",
                fontWeight: "bold",
                fontSize: 16 * dimensions.baseWidth
              }}
            >
              {this.props.title}
            </Text>
          </TouchableOpacity>
        )}
      </SudokuConsumer>
    );
  }
}

const _styles = StyleSheet.create({
  box: {
    alignItems: "center",
    borderRightWidth: 0.3,
    borderRightColor: "#FE7D5E",
    borderBottomWidth: 0.3,
    borderBottomColor: "#FE7D5E"
  }
});
