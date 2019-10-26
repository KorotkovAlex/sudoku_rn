import React, { useState, useRef, useEffect } from "react";
import {
  StyleSheet,
  View,
  Text,
  ScrollView,
  TouchableHighlight,
  Image,
  AsyncStorage,
  AppState
} from "react-native";
import SplashScreen from "react-native-splash-screen";

import Board from "../components/Board";
import CustomHeader from "./../components/Header";
import LinearGradient from "react-native-linear-gradient";
import Timer from "../components/Timer";
import CustomButton from "../components/CustomButton";
import theme from "../shared/Constants";
import ListNumberButtons from "../components/ListNumberButton";
import { SudokuConsumer } from "./../scripts/sudokuContext";
import ConfigSingleton from "../scripts/ConfigSingleton";
import CustomModal from "../components/CustomModal";
import EventEmitter from "../scripts/customEvents";
import Banner from "../components/Banner";

interface IShowModal {
  title: string;
  body: JSX.Element;
  isButtonCancel: boolean;
  isButtonOk: boolean;
}

interface ISudoku {
  navigation: any;
}

const Sudoku = ({ navigation }: ISudoku) => {
  let isError = false;
  const { dictionary } = ConfigSingleton.shared();
  const boardRef = useRef(React.createRef());
  const timerRef = useRef(React.createRef());

  const [isStop, setStop] = useState(false);

  const [isVisibleModal, setIsVisibleModal] = useState(false);
  const [isButtonOkModal, setIsButtonOkModal] = useState(false);
  const [isButtonCancelModal, setIsButtonCancelModal] = useState(false);
  const [titleModal, setTitleModal] = useState("Title");
  const [bodyModal, setBodyModal] = useState(<></>);

  const [amountDeleteDigit, setAmountDeleteDigit] = useState(30);

  const _onPressBackdrop = () => {
    setIsVisibleModal(false);
  };

  useEffect(() => {
    EventEmitter.subscribe("save_board", async () => {
      await _saveBoard();
    });

    EventEmitter.subscribe("what_start", async () => {
      let getBoard: any = await AsyncStorage.getItem("board");
      let board = JSON.parse(getBoard);
      if (!board.amountDigit) {
        board.amountDigit = 30;
      }
      setAmountDeleteDigit(board.amountDigit);
      await _continue();
    });

    EventEmitter.subscribe("checked_board", (isCheck: boolean) => {
      console.log("isCheck", isCheck);
      if (isCheck) {
        isError = false;
        _congratulateUser();
      } else if (!isError) {
        isError = true;
        _showError();
      }
    });

    AppState.addEventListener("change", _handleAppStateChange);
  }, []);

  const _handleAppStateChange = async (nextAppState: any) => {
    if (nextAppState === "background") {
      await _saveBoard();
    }
  };

  const _saveBoard = async () => {
    let tr: any = timerRef;
    let br: any = boardRef;
    console.log(br.current.getAmount());

    await AsyncStorage.setItem(
      "board",
      JSON.stringify({
        userBoard: br.current.getBoard(),
        timer: tr.current.getTimer(),
        amountDigit: br.current.getAmount()
      })
    );
  };

  const reloadBoard = async () => {
    let br: any = boardRef;
    br.current.reloadBoard();
    let tr: any = timerRef;
    tr.current.resetTimer();
    _cancelModal();
    setStop(false);
    SplashScreen.hide();
    await _saveBoard();
  };

  const _continue = async () => {
    let br: any = boardRef;
    await br.current.continue();
    let tr: any = timerRef;
    await tr.current.setTimer();
    _cancelModal();
    setStop(false);
    SplashScreen.hide();
  };

  const _renderLeftItem = () => {
    return (
      <View style={{ zIndex: 10, paddingTop: 2 }}>
        <CustomButton
          onPress={() => {
            _showModal({
              title: dictionary.ALERT.WARNING_TITLE,
              body: <Text>{dictionary.ALERT.WARNING_MESSAGE_NEW_GAME}</Text>,
              isButtonCancel: true,
              isButtonOk: true
            });
            EventEmitter.subscribe("ok", () => reloadBoard());
            EventEmitter.subscribe("cancel", () => _cancelModal());
          }}
        >
          <Text style={styles.newGameTitle}>{dictionary.NEW_GAME}</Text>
        </CustomButton>
      </View>
    );
  };

  const _renderCenterItem = () => {
    let level: string = "";
    if (amountDeleteDigit === 30) {
      level = dictionary.LEVEL.TITLE_BUTTON_EASY_LEVEL;
    } else if (amountDeleteDigit === 45) {
      level = dictionary.LEVEL.TITLE_BUTTON_AVERAGE_LEVEL;
    } else if (amountDeleteDigit === 60) {
      level = dictionary.LEVEL.TITLE_BUTTON_DIFFICULT_LEVEL;
    }
    return (
      <>
        <View
          style={{
            zIndex: 10,
            flexDirection: "row",
            justifyContent: "center"
          }}
        >
          <Timer stop={isStop} ref={timerRef} />
          <CustomButton
            style={{ justifyContent: "center" }}
            onPress={_startStopTimer}
          >
            <Image
              style={{
                tintColor: theme.light.white,
                width: 25,
                height: 25,
                marginLeft: 5
              }}
              source={
                isStop
                  ? require("../../assets/icons/Start.png")
                  : require("../../assets/icons/Stop.png")
              }
            />
          </CustomButton>
        </View>
        <View style={{ zIndex: 10, marginTop: 10 }}>
          <CustomButton
            onPress={() => {
              _showModal({
                title: dictionary.ALERT.TITLE_LEVEL,
                body: _renderListLevel(),
                isButtonCancel: false,
                isButtonOk: true
              });
              EventEmitter.subscribe("ok", () => _cancelModal());
            }}
          >
            <Text style={styles.title}>
              {dictionary.LEVEL.TITLE_BUTTON + `: ${level}`}
            </Text>
          </CustomButton>
        </View>
      </>
    );
  };

  const _renderRightItem = () => {
    return (
      <View
        style={{
          zIndex: 10,
          paddingTop: 2
        }}
      >
        <CustomButton
          onPress={() => {
            navigation.navigate("About");
          }}
        >
          <Image
            style={{
              tintColor: theme.light.white,
              width: 25,
              height: 25
            }}
            source={require("../../assets/icons/Info.png")}
          />
        </CustomButton>
      </View>
    );
  };

  const _showModal = ({
    title,
    body,
    isButtonCancel,
    isButtonOk
  }: IShowModal) => {
    setTitleModal(title);
    setBodyModal(body);
    setIsButtonCancelModal(isButtonCancel);
    setIsButtonOkModal(isButtonOk);
    setIsVisibleModal(true);
  };

  const _cancelModal = () => {
    setTitleModal("Title");
    setBodyModal(<></>);
    setIsButtonCancelModal(false);
    setIsButtonOkModal(false);
    setIsVisibleModal(false);
    EventEmitter.unsubscribe("ok");
    EventEmitter.unsubscribe("cancel");
  };

  const _startStopTimer = () => {
    isStop ? setStop(false) : setStop(true);
  };

  const _setNumber = (cell: number) => {
    let br: any = boardRef;
    br.current.setNumber(cell);
  };

  const _congratulateUser = () => {
    _showModal({
      title: dictionary.ALERT.CONGRATULATE,
      body: <Text>{dictionary.ALERT.YOU_ARE_WIN}</Text>,
      isButtonCancel: false,
      isButtonOk: true
    });
    EventEmitter.subscribe("ok", () => reloadBoard());
  };

  const _showError = () => {
    _showModal({
      title: dictionary.ALERT.UNFORTUNATELY,
      body: <Text>{dictionary.ALERT.HAVE_NOT_SOLVED}</Text>,
      isButtonCancel: false,
      isButtonOk: true
    });
    EventEmitter.subscribe("ok", () => _cancelModal());
  };

  useEffect(() => {
    console.log("amountDeleteDigit", amountDeleteDigit);
    let br: any = boardRef;
    br.current.reloadBoard();
    let tr: any = timerRef;
    tr.current.resetTimer();
  }, [amountDeleteDigit]);

  const _renderListLevel = () => {
    const mass = [
      { title: dictionary.LEVEL.EASY_LEVEL, amount: 30 },
      { title: dictionary.LEVEL.AVERAGE_LEVEL, amount: 45 },
      { title: dictionary.LEVEL.DIFFICULT_LEVEL, amount: 60 }
    ];
    return (
      <>
        {mass.map((item, index) => {
          return (
            <TouchableHighlight
              key={index}
              underlayColor={theme.light.underlayPersik}
              style={{
                paddingVertical: 15,
                borderRadius: 5,
                marginBottom: 5
              }}
              onPress={() => {
                setAmountDeleteDigit(item.amount);
                setIsVisibleModal(false);
                setStop(false);
              }}
            >
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between"
                }}
              >
                <Text style={{ paddingLeft: 5 }}>{item.title}</Text>
                {item.amount === amountDeleteDigit && (
                  <Image
                    style={{
                      tintColor: theme.light.persik,
                      width: 20,
                      height: 20
                    }}
                    source={require("../../assets/icons/Check_in_circle.png")}
                  />
                )}
              </View>
            </TouchableHighlight>
          );
        })}
      </>
    );
  };

  return (
    <>
      <CustomModal
        title={titleModal}
        body={bodyModal}
        isVisible={isVisibleModal}
        isButtonOk={isButtonOkModal}
        isButtonCancel={isButtonCancelModal}
        onPressBackdrop={_onPressBackdrop}
      />
      <View style={{ flex: 1 }}>
        <LinearGradient
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 0 }}
          colors={theme.light.linear_gradient}
          style={{ flex: 1 }}
        ></LinearGradient>
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
        <CustomHeader
          leftItem={_renderLeftItem()}
          centerItem={_renderCenterItem()}
          rightItem={_renderRightItem()}
        />

        <ScrollView>
          <SudokuConsumer>
            {({ dimensions }) => (
              <View
                style={[
                  styles.view,
                  {
                    marginTop: 10
                  }
                ]}
              >
                <Board ref={boardRef} amountDeleteDigit={amountDeleteDigit} />
                <View
                  style={[
                    styles.viewButton,
                    { marginTop: 5, marginBottom: 20 }
                  ]}
                >
                  <ListNumberButtons onPress={_setNumber} />
                </View>
              </View>
            )}
          </SudokuConsumer>
        </ScrollView>
        <Banner />
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
    borderRadius: 10,
    borderWidth: 1,
    borderColor: theme.light.persik,
    padding: 10
  },
  newGameTitle: {
    textAlign: "center",
    fontSize: 16,
    color: theme.light.white
  },
  titleButton: {
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
