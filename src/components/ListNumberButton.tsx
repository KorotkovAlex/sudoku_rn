import React from "react";
import { Text, StyleSheet, FlatList, View } from "react-native";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";

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
              <CustomButton
                bgroundColor={"#fff"}
                style={styles.buttonStyle}
                onPress={() => onPress(cell)}
                underlay={underlayNB}
              >
                {cell === 0 ? (
                  <Icon name="eraser" size={20} color={theme.light.black} />
                ) : (
                  <Text style={styles.textCell}>{cell}</Text>
                )}
              </CustomButton>
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
    height: 45,
    width: 45,
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
