import React from "react";
import { StyleSheet, View, Text } from "react-native";
import {
  NavigationScreenProp,
  NavigationState,
  NavigationParams
} from "react-navigation";
import Board from "../components/Board";
import CustomHeader from "./../components/Header";
import Icon from "react-native-vector-icons/dist/MaterialIcons";

interface IProps {
  navigation: NavigationScreenProp<NavigationState, NavigationParams>;
}

class Sudoku extends React.Component<IProps> {
  constructor(props: IProps) {
    super(props);
  }

  _renderLeftItem = () => {
    return (
      <Icon name="android" size={30} color="#FFF7EF" />
    );
  }

  _renderRightItem = () => {
    return (
      <Text style={{color: "#FFF7EF", fontSize: 18}}>Right</Text>
    );
  }

  render() {
    return (
      <>
        <CustomHeader leftItem={this._renderLeftItem()} rightItem={this._renderRightItem()} title={"Судоку"}/>
        <View style={styles.view}>
          <Text>'Hello world'</Text>
          <Board />
        </View>
      </>
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