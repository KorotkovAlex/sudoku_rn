import React from "react";
import { StyleSheet, View, Text } from "react-native";
// import {
//   NavigationScreenProp,
//   NavigationState,
//   NavigationParams
// } from "react-navigation";
import Board from "../components/Board";
import CustomHeader from "./../components/Header";
import Icon from "react-native-vector-icons/MaterialIcons";

// interface IProps {
//   navigation?: NavigationScreenProp<NavigationState, NavigationParams>;
// }

const Sudoku = () => {
  // constructor(props: any) {
  //   super(props);
  // }

  const _renderLeftItem = () => {
    return (
      <Icon name="android" size={30} color="#FFF7EF" />
      // <Text style={{color: "#FFF7EF", fontSize: 18}}>Left</Text>
    );
  };

  const _renderRightItem = () => {
    return (
      <Text style={{color: "#FFF7EF", fontSize: 18}}>Right</Text>
    );
  };

  // render() {
    return (
      <View style={{flex: 1}}>
        <CustomHeader leftItem={_renderLeftItem()} rightItem={_renderRightItem()} title={"Судоку"}/>
        <View style={styles.view}>
          <Board />
        </View>
      </View>
    );
  // }
};

export default Sudoku;

const styles = StyleSheet.create({
  view: {
    flex: 1
    // justifyContent: 'center'
  }
});