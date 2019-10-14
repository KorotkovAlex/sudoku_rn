import React from "react";
import { Text, StyleSheet, FlatList, View, Image } from "react-native";
import { SudokuConsumer } from "../scripts/sudokuContext";

import CustomButton from "./CustomButton";
import theme from "../shared/Constants";

interface INumberButton {
  underlayNB: string;
  onPress: (cell: number) => void;
}

const ListNumberButtons = ({ underlayNB, onPress }: INumberButton) => {
  const numberData = [[1, 2, 3, 4, 5], [6, 7, 8, 9, 0]];

  return (
    <FlatList
      data={numberData}
      keyExtractor={(_item, index) => index.toString()}
      renderItem={({ item }: { item: number[] }) => {
        let cells = item.map((cell, i) => {
          return (
            <View
              key={i}
              style={{
                marginHorizontal: 8,
                marginVertical: 5
              }}
            >
              <SudokuConsumer>
                {({ dimensions }) => (
                  <CustomButton
                    bgroundColor={"#fff"}
                    style={{
                      ...styles.buttonStyle,
                      width: dimensions.baseWidth * 40,
                      height: dimensions.baseWidth * 40
                    }}
                    onPress={() => onPress(cell)}
                    underlay={underlayNB}
                  >
                    {cell === 0 ? (
                      <Image
                        style={{
                          tintColor: theme.light.black,
                          width: 20,
                          height: 20
                        }}
                        source={require("../../assets/icons/Erase.png")}
                      />
                    ) : (
                      <Text style={styles.textCell}>{cell}</Text>
                    )}
                  </CustomButton>
                )}
              </SudokuConsumer>
            </View>
          );
        });
        return (
          <View style={{ flexDirection: "row", justifyContent: "center" }}>
            {cells}
          </View>
        );
      }}
    />
  );
};

export default ListNumberButtons;

const styles = StyleSheet.create({
  buttonStyle: {
    backgroundColor: "#FFF",
    justifyContent: "center",
    alignItems: "center",
    borderColor: theme.light.persik,
    borderWidth: 1,
    borderRadius: 10
  },
  textCell: {
    fontSize: 18,
    fontWeight: "600"
  }
});
