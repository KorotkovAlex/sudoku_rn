import React, { useEffect, useState } from "react";
import { FlatList, View, Text } from "react-native";
import { getFullBoard } from "../scripts/sudokuGenerator";

const Board = () => {
  const [fullBoard, setFullBoard] = useState(null);
  useEffect(() => {
    setFullBoard(getFullBoard());
  });

  const _renderRow = items => {
    return (
      <>
        {items.map((item, index) => {
          return <Text key={index}>{item}</Text>;
        })}
      </>
    );
  };

  return (
    <FlatList
      data={fullBoard}
      renderItem={({ item }) => (
        <View style={{ flexDirection: "row" }}>{_renderRow(item)}</View>
      )}
      keyExtractor={(item, index) => index.toString()}
    />
  );
};

export default Board;
