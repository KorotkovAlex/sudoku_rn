import React, { useState, useRef, useContext } from "react";
import { StyleSheet, View, Text } from "react-native";
import Board from "../components/Board";
import CustomHeader from "./../components/Header";
import LinearGradient from "react-native-linear-gradient";
import Timer from "../components/Timer";
import CustomButton from "../components/CustomButton";
import Icon from "react-native-vector-icons/MaterialIcons";
import theme from "../shared/Constants";
import ListNumberButtons from "../components/ListNumberButton";
import SudokuContext from "./../scripts/sudokuContext";

const Sudoku = () => {
  const { dictionary } = useContext(SudokuContext);
  const boardRef = useRef(React.createRef());
  const [isStop, setStop] = useState(false);

  const _renderCenterItem = () => {
    console.log(dictionary);
    return (
      <View style={styles.viewCenter}>
        <Timer
          stop={isStop}
          styleContent={{ alignItems: "center" }}
          styleText={styles.timer}
        />
        <CustomButton
          underlay={theme.light.underlayPersik}
          style={styles.playPauseButton}
          onPress={_startStopTimer}
        >
          <Icon
            style={styles.iconAdd}
            name={isStop ? "play-arrow" : "pause"}
            size={18}
            color={theme.light.white}
          />
        </CustomButton>
      </View>
    );
  };

  const _startStopTimer = () => {
    isStop ? setStop(false) : setStop(true);
  };

  const _setNumber = (cell: number) => {
    boardRef.current.setNumber(cell);
  };

  return (
    <>
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
      </View>

      <View
        style={{
          position: "absolute",
          top: 0,
          bottom: 0,
          left: 0,
          right: 0
        }}
      >
        <View style={[styles.view, { paddingTop: 150 }]}>
          <Board ref={boardRef} />
          <View style={styles.viewButton}>
            <ListNumberButtons
              onPress={_setNumber}
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
              onPress={() => boardRef.current.reloadBoard()}
            >
              <Text style={styles.titleButton}>{dictionary.NEW_GAME}</Text>
            </CustomButton>
            <CustomButton
              underlay={theme.light.underlayPersik}
              style={styles.customButton}
              onPress={() => _setNumber(0)}
            >
              <Text style={styles.titleButton}>{dictionary.ERASER}</Text>
            </CustomButton>
          </View>
        </View>
      </View>
    </>
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
  viewCenter: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 10
  },
  playPauseButton: {
    justifyContent: "center",
    marginHorizontal: 5,
    borderRadius: 100
  },
  customButton: {
    paddingHorizontal: 5,
    paddingVertical: 10,
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
