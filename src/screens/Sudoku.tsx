import React from "react";
import { StyleSheet, View, Text, Alert } from "react-native";
import Board from "../components/Board";
import CustomHeader from "./../components/Header";
import LinearGradient from "react-native-linear-gradient";
import Timer from "../components/Timer";
import CustomButton from "../components/CustomButton";
import Icon from "react-native-vector-icons/MaterialIcons";
import theme from "../shared/Constants";

const Sudoku = () => {
  // const []

  const _renderCenterItem = () => {
    return (
      <View>
        <Text style={styles.title}>{"Судоку"}</Text>
        <Timer styleContent={{marginTop: 20, alignItems: "center"}} styleText={styles.timer}/>
      </View>
    );
  };

  const _clickCustomButton = () => {
    Alert.alert("Click!");
  };

  return (
    <View style={{flex: 1}}>
      <LinearGradient
        start={{x: 0, y: 0}}
        end={{x: 1, y: 0}}
        colors={theme.light.linear_gradient}
        style={{flex: 1}}>
        <CustomHeader
          centerItem={_renderCenterItem()}/>
      </LinearGradient>
      <View style={styles.view}>
        <Board />
        <View style={styles.viewButton}>
          <CustomButton
            underlay={theme.light.underlayPersik}
            style={styles.customButton}
            onPress={_clickCustomButton}>
              {/* <Icon
                style={styles.iconAdd}
                name="pause"
                size={25}
                color={theme.light.persik}/> */}
              <Icon
                style={styles.iconAdd}
                name="play-arrow"
                size={25}
                color={theme.light.persik}/>
          </CustomButton>
        </View>
      </View>
    </View>
  );
};

export default Sudoku;

const styles = StyleSheet.create({
  view: {
    flex: 2
  },
  viewButton: {
    // flex: 1,
    // backgroundColor: "black",
    alignItems: "center"
  },
  customButton: {
    height: 50,
    width: 50,
    justifyContent: "center",
    borderRadius: 25,
    backgroundColor: theme.light.white,
    borderWidth: 1,
    borderColor: theme.light.persik
  },
  iconAdd: {
    color: theme.light.persik,
    textAlign: "center"
  },
  title: {
    color: "#FFF7EF",
    fontSize: 18,
  },
  timer: {
    color: "#FFF7EF",
    fontSize: 24,
  }
});