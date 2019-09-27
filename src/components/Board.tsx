import React, { useEffect, useState } from "react";
import { FlatList, View, Text } from "react-native";
import { getFullBoard } from "../scripts/sudokuGenerator";
import Cell from "./Cell";

const Board = () => {
  const [fullBoard, setFullBoard] = useState(Array<number[]>());
  const [currentCell, setCurrentCell] = useState({ row: null, column: null });

  useEffect(() => {
    setFullBoard(getFullBoard());
  });

  const _onChooseSell = ({ row, column }) => {
    setCurrentCell({
      column,
      row
    });
  };

  const _renderRow = ({
    items,
    isUseTopRadius,
    isUseBottomRadius,
    columnNumber
  }) => {
    return (
      <>
        {items.map((item: any, index: number) => {
          let border;

          if ((index + 1) % 3 === 0 && index + 1 != 9) {
            border = {
              borderRightWidth: 1,
              borderColor: "#FE7D5E",
              backgroundColor: "white"
            };
          }

          const borderRadius = 8;
          if (isUseTopRadius) {
            border = {
              ...border,
              borderTopWidth: 0,
              backgroundColor: "white"
            };
          }

          if (isUseBottomRadius) {
            border = {
              ...border,
              borderBottomWidth: 0,
              backgroundColor: "white"
            };
          }

          if (isUseTopRadius && index === 0) {
            border = {
              ...border,
              borderTopLeftRadius: borderRadius,
              backgroundColor: "white"
            };
          }

          if (isUseTopRadius && index === 8) {
            border = {
              ...border,
              borderTopRightRadius: borderRadius,
              backgroundColor: "white"
            };
          }

          if (isUseBottomRadius && index === 0) {
            border = {
              ...border,
              borderBottomLeftRadius: borderRadius,
              backgroundColor: "white"
            };
          }

          if (isUseBottomRadius && index === 8) {
            border = {
              ...border,
              borderBottomRightRadius: borderRadius,
              backgroundColor: "white"
            };
          }

          if (index === 8) {
            border = {
              ...border,
              borderRightWidth: 0,
              backgroundColor: "white"
            };
          }

          if (index === 0) {
            border = {
              ...border,
              borderLeftWidth: 0,
              backgroundColor: "white"
            };
          }

          if (
            currentCell.row === index ||
            currentCell.column === columnNumber
          ) {
            border = {
              ...border,
              backgroundColor: "blue"
            };
          }

          if (
            currentCell.row === index &&
            currentCell.column === columnNumber
          ) {
            border = {
              ...border,
              backgroundColor: "red"
            };
          }

          return (
            <Cell
              style={border}
              key={index}
              onPress={() => {
                _onChooseSell({ column: columnNumber, row: index });
              }}
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
      <View
        style={{
          shadowColor: "#000",
          shadowOffset: {
            width: 0,
            height: 1
          },
          shadowOpacity: 0.22,
          shadowRadius: 2.22,

          elevation: 5,
          backgroundColor: "white",
          borderRadius: 14
        }}
      >
        <FlatList
          data={fullBoard}
          renderItem={({ item, index }) => {
            let border;

            if ((index + 1) % 3 === 0 && index + 1 != 9) {
              border = {
                borderBottomWidth: 0.7,
                borderColor: "#FE7D5E"
              };
            }

            return (
              <View style={{ flexDirection: "row", ...border }}>
                {_renderRow({
                  items: item,
                  isUseBottomRadius: index === 8,
                  isUseTopRadius: index === 0,
                  columnNumber: index
                })}
              </View>
            );
          }}
          keyExtractor={(_item, index) => index.toString()}
        />
      </View>
    </View>
  );
};

export default Board;
