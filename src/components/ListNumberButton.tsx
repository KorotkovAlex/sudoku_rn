import React from "react";
import {
  Text,
  StyleSheet,
  NativeSyntheticEvent,
  NativeTouchEvent,
  FlatList,
  View
} from "react-native";
import CustomButton from "./CustomButton";
import theme from "../shared/Constants";

interface INumberButton {
  underlayNB: string;
  onPress: (ev: NativeSyntheticEvent<NativeTouchEvent>) => void;
}

const ListNumberButtons = ({ underlayNB, onPress }: INumberButton) => {
  const numberData = [["1", "2", "3", "4", "5"], ["6", "7", "8", "9"]];

  return (
    <FlatList
      data={numberData}
      keyExtractor={(_item, index) => index.toString()}
      renderItem={({ item }: { item: string[] }) => {
        let cells = item.map((cell, i) => {
          return (
            <View
              key={i}
              style={{
                marginHorizontal: 8,
                marginVertical: 2
              }}
            >
              <CustomButton
                bgroundColor={"#fff"}
                style={styles.buttonStyle}
                onPress={onPress}
                underlay={underlayNB}
              >
                <Text style={styles.textCell}>{cell}</Text>
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
