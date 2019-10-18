import React, {
  useEffect,
  useState,
  forwardRef,
  useImperativeHandle
} from "react";
import { FlatList, View, StyleSheet, AsyncStorage } from "react-native";
import SplashScreen from "react-native-splash-screen";

import { SudokuConsumer } from "../scripts/sudokuContext";
import Cell from "./Cell";

import { getFullBoard, ICellType } from "../scripts/sudokuGenerator";
import EventEmitter from "../scripts/customEvents";
import { checkSudoku } from "./../scripts/sudokuGenerator";

let counter = 0;

interface IBoard {
  amountDeleteDigit: number;
}

const Board = forwardRef(({ amountDeleteDigit }: IBoard, ref) => {
  const [currentCell, setCurrentCell] = useState({ row: -1, column: -1 });
  const [userBoard, setUserBoard] = useState(Array<ICellType[]>());

  const _settingBoard = () => {
    const board = getFullBoard({ amountDeleteDigit });

    setUserBoard(board.withoutDigitsSudoku);
  };

  const _getBoardFromAS = async () => {
    _settingBoard();

    let board = await AsyncStorage.getItem("board");

    if (board) {
      EventEmitter.dispatch("what_start");
      return;
    }

    console.log("test hide");
    SplashScreen.hide();
  };

  const _cleanCurrentCell = () => {
    setCurrentCell({
      row: -1,
      column: -1
    });
  };

  useEffect(() => {
    _getBoardFromAS();
  }, []);

  useImperativeHandle(ref, () => ({
    setNumber(digit: number) {
      const { row, column } = currentCell;
      if (row === -1 || userBoard[column][row].isPermanent) {
        return;
      }

      let newUserBoard = [...userBoard];

      if (digit !== 0 && newUserBoard[column][row].digit === 0) {
        counter = counter + 1;
      } else if (digit === 0) {
        counter = counter - 1;
      }

      newUserBoard[column][row].digit = digit;
      setUserBoard(newUserBoard);
      if (amountDeleteDigit === counter) {
        EventEmitter.dispatch(
          "checked_board",
          checkSudoku({ board: userBoard })
        );
      }
      EventEmitter.dispatch("save_board");
    },

    checkBoard() {
      return checkSudoku({ board: userBoard });
    },

    reloadBoard() {
      counter = 0;
      _cleanCurrentCell();
      _settingBoard();
    },

    async continue() {
      let board: any = await AsyncStorage.getItem("board");

      setUserBoard(JSON.parse(board).userBoard);
    },

    getBoard() {
      return userBoard;
    },

    getAmount() {
      return amountDeleteDigit;
    }
  }));

  const _onChooseSell = ({ row, column }: any) => {
    setCurrentCell({
      column,
      row
    });
  };

  const _isAddBoldBorder = ({ index }: { index: number }) =>
    (index + 1) % 3 === 0 && index + 1 !== 9;

  const _isCurrentCell = ({
    rowNumber,
    columnNumber
  }: {
    rowNumber: number;
    columnNumber: number;
  }) => currentCell.row === rowNumber && currentCell.column === columnNumber;

  const _isNeighbourCell = ({
    rowNumber,
    columnNumber
  }: {
    rowNumber: number;
    columnNumber: number;
  }) => currentCell.row === rowNumber || currentCell.column === columnNumber;

  const _renderRow = ({ items, useBorder, columnNumber }: any) => {
    return (
      <>
        {items.map((item: ICellType, index: number) => {
          const rowNumber = index;

          let border = {};

          if (_isAddBoldBorder({ index: rowNumber })) {
            border = {
              ...border,
              ..._styles.boldRightBorder
            };
          }

          if (useBorder) {
            border = {
              ...border,
              ...kindOfBorder[useBorder][rowNumber]
            };
          }

          if (columnNumber === 0) {
            border = {
              ...border,
              borderTopWidth: 0
            };
          }

          if (columnNumber === 8) {
            border = {
              ...border,
              borderBottomWidth: 0
            };
          }

          if (rowNumber === 8) {
            border = {
              ...border,
              borderRightWidth: 0
            };
          }

          if (rowNumber === 0) {
            border = {
              ...border,
              borderLeftWidth: 0
            };
          }

          if (_isNeighbourCell({ rowNumber, columnNumber })) {
            border = {
              ...border,
              backgroundColor: "#FADBC5"
            };
          }

          if (_isCurrentCell({ rowNumber, columnNumber })) {
            border = {
              ...border,
              backgroundColor: "white"
            };
          }

          return (
            <Cell
              style={border}
              key={rowNumber}
              item={item}
              onPress={() =>
                _onChooseSell({ column: columnNumber, row: rowNumber })
              }
              title={item.digit === 0 ? "" : item.digit.toString()}
            />
          );
        })}
      </>
    );
  };

  return (
    <SudokuConsumer>
      {({ dimensions }) => (
        <>
          <View
            style={{
              width: dimensions.width - 20,
              marginHorizontal: 10
            }}
          >
            <View style={_styles.sudokuContainer}>
              <FlatList
                data={userBoard}
                renderItem={({
                  item,
                  index
                }: {
                  item: number;
                  index: number;
                }) => {
                  let border;

                  if (_isAddBoldBorder({ index })) {
                    border = _styles.boldBottomBorder;
                  }
                  let useBorder;
                  if (index === 8) {
                    useBorder = "BOTTOM";
                  }
                  if (index === 0) {
                    useBorder = "TOP";
                  }

                  return (
                    <View style={{ flexDirection: "row", ...border }}>
                      {_renderRow({
                        items: item,
                        useBorder,
                        columnNumber: index
                      })}
                    </View>
                  );
                }}
                keyExtractor={(_item: any, index: any) => index.toString()}
              />
            </View>
          </View>
        </>
      )}
    </SudokuConsumer>
  );
});

export default Board;

const borderRadius = 8;

const kindOfBorder: any = {
  TOP: {
    "0": {
      borderTopLeftRadius: borderRadius
    },
    "8": {
      borderTopRightRadius: borderRadius
    }
  },
  BOTTOM: {
    "0": {
      borderBottomLeftRadius: borderRadius
    },
    "8": {
      borderBottomRightRadius: borderRadius
    }
  }
};

const _styles = StyleSheet.create({
  sudokuContainer: {
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1
    },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,

    elevation: 5,
    backgroundColor: "#ffffff",
    borderRadius: 14
  },

  boldBottomBorder: {
    borderBottomWidth: 2,
    borderColor: "#FE7D5E"
  },
  boldRightBorder: {
    borderRightWidth: 2,
    borderColor: "#FE7D5E"
  },

  borderTopLeft: {
    borderTopLeftRadius: 8
  },

  borderTopRight: {
    borderTopRightRadius: 8
  },

  borderBottomLeft: {
    borderBottomLeftRadius: 8
  },

  borderBottomRight: {
    borderBottomRightRadius: 8
  },

  cleanBorderRight: {
    borderRightWidth: 0
  },

  cleanBorderLeft: {
    borderLeftWidth: 0
  }
});
