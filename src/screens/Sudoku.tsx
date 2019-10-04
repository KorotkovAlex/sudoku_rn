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
          <View
            style={{
              flex: 1,
              alignItems: "center",
              justifyContent: "center",
              flexDirection: "row"
            }}
          >
            <CustomButton
              underlay={theme.light.underlayPersik}
              style={styles.customButton}
              onPress={() => console.log("click")}
            >
              <Text style={styles.titleButton}>Reload</Text>
            </CustomButton>
            <CustomButton
              underlay={theme.light.underlayPersik}
              style={styles.playPauseButton}
              onPress={_startStopTimer}
            >
              <Icon
                style={styles.iconAdd}
                name={isStop ? "play" : "pause"}
                size={30}
                color={theme.light.persik}
              />
            </CustomButton>
            <CustomButton
              underlay={theme.light.underlayPersik}
              style={styles.customButton}
              onPress={() => console.log("click")}
            >
              <Text style={styles.titleButton}>Eraser</Text>
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
  playPauseButton: {
    height: 60,
    width: 60,
    justifyContent: "center",
    borderRadius: 30,
    backgroundColor: theme.light.white,
    borderWidth: 1,
    borderColor: theme.light.persik,
    marginTop: 20,
    marginHorizontal: 15
  },
  customButton: {
    height: 50,
    width: 70,
    justifyContent: "center",
    backgroundColor: theme.light.white,
    borderWidth: 1,
    borderColor: theme.light.persik,
    marginTop: 20,
    borderRadius: 10
  },
  titleButton: {
    textAlign: "center",
    fontSize: 16,
    color: theme.light.persik
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
