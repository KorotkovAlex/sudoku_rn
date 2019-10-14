import React, { useState, useRef, useContext } from "react";
import { StyleSheet, View, Text, Alert, ScrollView } from "react-native";
import Board from "../components/Board";
import CustomHeader from "./../components/Header";
import LinearGradient from "react-native-linear-gradient";
import Timer from "../components/Timer";
import CustomButton from "../components/CustomButton";
import Icon from "react-native-vector-icons/MaterialIcons";
import theme from "../shared/Constants";
import ListNumberButtons from "../components/ListNumberButton";
import { SudokuConsumer } from "./../scripts/sudokuContext";
import ConfigSingleton from "../scripts/ConfigSingleton";

const Sudoku = () => {
  const { dictionary } = ConfigSingleton.shared();
  const boardRef = useRef(React.createRef());
  const timerRef = useRef(React.createRef());
  const [isStop, setStop] = useState(false);

  const _renderLeftItem = () => {
    return (
      <>
        <CustomButton
          underlay={theme.light.underlayPersik}
          onPress={() => {
            Alert.alert(
              dictionary.ALERT.WARNING_TITLE,
              dictionary.ALERT.WARNING_MESSAGE_NEW_GAME,
              [
                {
                  text: dictionary.ALERT.CANCEL,
                  onPress: () => console.log("Cancel")
                },
                {
                  text: dictionary.ALERT.OK,
                  onPress: () => {
                    boardRef.current.reloadBoard();
                    timerRef.current.resetTimer();
                  }
                }
              ],
              { cancelable: true }
            );
          }}
        >
          <Text style={styles.newGameTitle}>{dictionary.NEW_GAME}</Text>
        </CustomButton>
      </>
    );
  };

  const _renderCenterItem = () => {
    return (
      <>
        <Timer stop={isStop} ref={timerRef} />
        <CustomButton
          underlay={theme.light.underlayPersik}
          onPress={_startStopTimer}
        >
          <Icon
            style={styles.iconAdd}
            name={isStop ? "play-arrow" : "pause"}
            size={20}
            color={theme.light.white}
          />
        </CustomButton>
      </>
    );
  };

  const _renderRightItem = () => {
    return <View />;
  };

  const _startStopTimer = () => {
    isStop ? setStop(false) : setStop(true);
  };

  const _setNumber = (cell: number) => {
    boardRef.current.setNumber(cell);
  };

  const _congratulateUser = () => {
    Alert.alert(dictionary.ALERT.CONGRATULATE, dictionary.ALERT.YOU_ARE_WIN, [
      {
        text: dictionary.ALERT.OK,
        onPress: () => {
          boardRef.current.reloadBoard();
          timerRef.current.resetTimer();
        }
      }
    ]);
  };

  const _showError = () => {
    Alert.alert(
      dictionary.ALERT.UNFORTUNATELY,
      dictionary.ALERT.HAVE_NOT_SOLVED,
      [
        {
          text: dictionary.ALERT.OK,
          onPress: () => {}
        }
      ],
      { cancelable: true }
    );
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
          <CustomHeader
            leftItem={_renderLeftItem()}
            centerItem={_renderCenterItem()}
            rightItem={_renderRightItem()}
          />
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
        <ScrollView>
          <SudokuConsumer>
            {({ dimensions }) => (
              <View
                style={[
                  styles.view,
                  {
                    paddingTop: dimensions.height * 0.14
                  }
                ]}
              >
                <Board ref={boardRef} />
                <View style={[styles.viewButton, { marginTop: 5 }]}>
                  <ListNumberButtons
                    onPress={_setNumber}
                    underlayNB={theme.light.white}
                  />
                </View>
                <View
                  style={{
                    flex: 1,
                    alignItems: "flex-start",
                    justifyContent: "center",
                    flexDirection: "row"
                  }}
                >
                  <CustomButton
                    underlay={theme.light.underlayPersik}
                    style={styles.customButton}
                    onPress={() => {
                      const isEnd = boardRef.current.checkBoard();
                      if (isEnd) {
                        _congratulateUser();
                      } else {
                        _showError();
                      }
                    }}
                  >
                    <Text
                      style={[
                        styles.titleButton,
                        { fontSize: 16 * dimensions.baseWidth }
                      ]}
                    >
                      {dictionary.END_GAME}
                    </Text>
                  </CustomButton>
                </View>
              </View>
            )}
          </SudokuConsumer>
        </ScrollView>
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
  viewLeft: {
    marginTop: 10
  },
  viewCenter: {
    flexDirection: "row",
    marginTop: 10
  },
  playPauseButton: {
    justifyContent: "center",
    marginHorizontal: 5,
    borderRadius: 100
  },
  customButton: {
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 10
  },
  newGameTitle: {
    textAlign: "center",
    fontSize: 16,
    color: theme.light.white
  },
  titleButton: {
    marginTop: 5,
    textAlign: "center",
    color: theme.light.persik
  },
  iconAdd: {
    textAlign: "center"
  },
  title: {
    color: theme.light.white,
    fontSize: 16
  }
});
