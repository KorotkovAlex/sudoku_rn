import React, { useEffect, useState } from "react";
import { FlatList, View, StyleSheet } from "react-native";
import { getFullBoard } from "../scripts/sudokuGenerator";
import Cell from "./Cell";

const Board = () => {
  const [fullBoard, setFullBoard] = useState(Array<number[]>());
  const [withoutDigitsBoard, setWithoutDigitsBoard] = useState(
    Array<number[]>()
  );
  const [currentCell, setCurrentCell] = useState({ row: null, column: null });

  useEffect(() => {
    const board = getFullBoard();

    setFullBoard(board.fillSudoku);
    setWithoutDigitsBoard(board.withoutDigitsSudoku);
  }, []);

  const _onChooseSell = ({ row, column }: any) => {
    console.log("click");
    setCurrentCell({
      column,
      row
    });
  };

  const _isAddBoldBorder = ({ index }: { index: number }) =>
    (index + 1) % 3 === 0 && index + 1 !== 9;

  const _renderRow = ({ items, useBorder, columnNumber }: any) => {
    return (
      <>
        {items.map((item: any, index: number) => {
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

          if (
            currentCell.row === rowNumber ||
            currentCell.column === columnNumber
          ) {
            border = {
              ...border,
              backgroundColor: "#FADBC5"
            };
          }

          if (
            currentCell.row === rowNumber &&
            currentCell.column === columnNumber
          ) {
            border = {
              ...border,
              backgroundColor: "white"
            };
          }

          return (
            <Cell
              style={border}
              key={rowNumber}
              onPress={() =>
                _onChooseSell({ column: columnNumber, row: rowNumber })
              }
              title={item}
            />
          );
        })}
      </>
    );
  };

  return (
    <View
      style={{
        margin: 10
      }}
    >
      <View style={_styles.sudokuContainer}>
        <FlatList
          data={fullBoard}
          renderItem={({ item, index }: { item: number; index: number }) => {
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
  );
};

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
