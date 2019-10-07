import React from "react";
import {
  ViewStyle,
  StyleProp,
  TextStyle,
  NativeSyntheticEvent,
  NativeTouchEvent,
  TouchableHighlight
} from "react-native";

interface IButton {
  bgroundColor?: string;
  style?: StyleProp<ViewStyle | TextStyle>;
  underlay: string;
  onPress: (ev: NativeSyntheticEvent<NativeTouchEvent>) => void;
  children: React.ReactNode;
}

const CustomButton = ({
  bgroundColor,
  style,
  onPress,
  children,
  underlay = "black"
}: IButton) => {
  return (
    <TouchableHighlight
      onPress={onPress}
      style={[{ backgroundColor: bgroundColor }, style]}
      underlayColor={underlay}
    >
      {children}
    </TouchableHighlight>
  );
};

export default CustomButton;
