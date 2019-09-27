import React from "react";
import { StyleSheet, View, Text } from "react-native";
import {
  NavigationScreenProp,
  NavigationState,
  NavigationParams
} from "react-navigation";
import Board from "../components/Board";

interface IProps {
  navigation: NavigationScreenProp<NavigationState, NavigationParams>;
}

class Sudoku extends React.Component<IProps> {
  constructor(props: IProps) {
    super(props);
  }

  render() {
    return (
      <View style={styles.view}>
        <Text>'Hello world'</Text>
        <Board />
      </View>
    );
  }
}

export default Sudoku;

const styles = StyleSheet.create({
  view: {
    height: "100%",
    width: "100%"
    // justifyContent: 'center'
  }
});
