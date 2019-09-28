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
import LinearGradient from "react-native-linear-gradient";
import Timer from "../components/Timer";

// interface IProps {
//   navigation?: NavigationScreenProp<NavigationState, NavigationParams>;
// }

const Sudoku = () => {

  const _renderLeftItem = () => {
    return (
      <Icon name="android" size={30} color="#FFF7EF" />
      // <Text style={{color: "#FFF7EF", fontSize: 18}}>Left</Text>
    );
  };

  const _renderCenterItem = () => {
    return (
      <View>
        <Text style={styles.title}>{"Судоку"}</Text>
        <Timer styleContent={{marginTop: 20, alignItems: "center"}} styleText={styles.timer}/>
      </View>
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
        <LinearGradient
          start={{x: 0, y: 0}}
          end={{x: 1, y: 0}}
          colors={["#fe7f6f", "#ff9776", "#ffab7c"]}>
          <CustomHeader
            leftItem={_renderLeftItem()}
            rightItem={_renderRightItem()}
            centerItem={_renderCenterItem()}/>
        </LinearGradient>
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
    // justifyContent: "center"
  },
  title: {
    color: "#fffbf7",
    fontSize: 18,
  },
  timer: {
    color: "#fffbf7",
    fontSize: 24,
  }
});