import React, {
  useEffect,
  useState,
  forwardRef,
  useImperativeHandle
} from "react";
import { FlatList, View, StyleSheet, Text } from "react-native";
import { SudokuConsumer } from "../scripts/sudokuContext";
import Cell from "./Cell";

import { getFullBoard, CellType } from "../scripts/sudokuGenerator";

let counter = 0;

const Board = forwardRef(({}, ref) => {
  const amountDeleteDigit = 30;
  const [currentCell, setCurrentCell] = useState({ row: -1, column: -1 });
  const [fullBoard, setFullBoard] = useState(Array<CellType[]>());
  const [userBoard, setUserBoard] = useState(Array<CellType[]>());

  const _settingBoard = () => {
    const board = getFullBoard({ amountDeleteDigit });

    setFullBoard(board.fillSudoku);
    setUserBoard(board.withoutDigitsSudoku);
  };

  const _cleanCurrentCell = () => {
    setCurrentCell({
      row: -1,
      column: -1
    });
  };

  useEffect(() => {
    _settingBoard();
  }, []);

  const _checkOnFill = () => {
    let isFillBoard = true;
    fullBoard.some((row, indexOfRow) => {
      row.some((cell, indexOfCell) => {
        if (cell.digit !== userBoard[indexOfRow][indexOfCell].digit) {
          isFillBoard = false;
          return true;
        }
      });
    });

    return isFillBoard;
  };

  useImperativeHandle(ref, () => ({
    setNumber(digit: number) {
      const { row, column } = currentCell;
      if (row === -1 || userBoard[column][row].isPermanent) {
        return;
      }

      let newUserBoard = [...userBoard];

      if (newUserBoard[column][row].digit === 0) {
        counter = counter + 1;
      }

      newUserBoard[column][row].digit = digit;
      setUserBoard(newUserBoard);
    },

    checkBoard() {
      return _checkOnFill();
    },

    reloadBoard() {
      _cleanCurrentCell();
      _settingBoard();
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
        {items.map((item: CellType, index: number) => {
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
    borderBottomWidth: 0.7,
    borderColor: "#FE7D5E"
  },
  boldRightBorder: {
    borderRightWidth: 0.7,
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
