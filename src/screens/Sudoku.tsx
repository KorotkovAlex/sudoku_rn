import React, { useState } from "react";
import { StyleSheet, View, Text, Alert, Modal } from "react-native";
import Board from "../components/Board";
import CustomHeader from "./../components/Header";
import LinearGradient from "react-native-linear-gradient";
import Timer from "../components/Timer";
import CustomButton from "../components/CustomButton";
import Icon from "react-native-vector-icons/MaterialIcons";
import theme from "../shared/Constants";
import ListNumberButtons from "../components/ListNumberButton";

const Sudoku = () => {
  const [isStop, setStop] = useState(false);

  const _renderCenterItem = () => {
    return (
      <View>
        <Text style={styles.title}>{"Судоку"}</Text>
        <Timer
          stop={isStop}
          styleContent={{ marginTop: 20, alignItems: "center" }}
          styleText={styles.timer}
        />
      </View>
    );
  };

  const _startStopTimer = () => {
    isStop ? setStop(false) : setStop(true);
  };

  const clickNumberButton = () => {
    Alert.alert("Click number button!");
  };

  return (
    <View style={{ flex: 1 }}>
      <LinearGradient
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 0 }}
        colors={theme.light.linear_gradient}
        style={{ flex: 1 }}
      >
        <CustomHeader centerItem={_renderCenterItem()} />
      </LinearGradient>
      <View style={{ flex: 2 }} />
      <Modal animationType="fade" transparent={true} visible={true}>
        <View style={[styles.view, { paddingTop: 100 }]}>
          <Board />
          <View style={styles.viewButton}>
            <ListNumberButtons
              onPress={clickNumberButton}
              underlayNB={theme.light.white}
            />
          </View>
          <View style={{ flex: 1, alignItems: "center" }}>
            <CustomButton
              underlay={theme.light.underlayPersik}
              style={styles.customButton}
              onPress={_startStopTimer}
            >
              <Icon
                style={styles.iconAdd}
                name={isStop ? "play-arrow" : "pause"}
                size={25}
                color={theme.light.persik}
              />
            </CustomButton>
          </View>
        </View>
      </Modal>
    </View>
  );
};

export default Sudoku;

const styles = StyleSheet.create({
  view: {
    flex: 1
  },
  viewButton: {
    flex: 1
  },
  customButton: {
    height: 50,
    width: 50,
    justifyContent: "center",
    borderRadius: 25,
    backgroundColor: theme.light.white,
    borderWidth: 1,
    borderColor: theme.light.persik,
    marginTop: 20
  },
  iconAdd: {
    color: theme.light.persik,
    textAlign: "center"
  },
  title: {
    color: theme.light.white,
    fontSize: 18
  },
  timer: {
    color: theme.light.white,
    fontSize: 24
  }
});
