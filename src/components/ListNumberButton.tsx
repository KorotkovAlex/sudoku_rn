import React from "react";
import {
  Text,
  StyleSheet,
  StyleProp,
  TextStyle,
  ViewStyle,
  NativeSyntheticEvent,
  NativeTouchEvent,
  Alert,
  FlatList
} from "react-native";
import CustomButton from "./CustomButton";
import theme from "../shared/Constants";

interface INumberButton {
  customStyle: StyleProp<TextStyle | ViewStyle>;
  underlayNB: string;
  onPress: (ev: NativeSyntheticEvent<NativeTouchEvent>) => void;
}

const ListNumberButtons = ({ customStyle, onPress }: INumberButton) => {
  const numberData = ["1", "2", "3", "4", "5", "6", "7", "8", "9"];
  const clickButton = () => {
    Alert.alert("Click number button!");
  };

  return (
    <FlatList
      data={numberData}
      renderItem={({ item }: { item: string; index: number }) => {
        return (
          <CustomButton
            bgroundColor={theme.light.white}
            style={customStyle}
            onPress={clickButton}
            underlay={theme.light.underlayPersik}
          >
            <Text>{item}</Text>
          </CustomButton>
        );
      }}
    />
  );
};

export default ListNumberButtons;

const styles = StyleSheet.create({});
