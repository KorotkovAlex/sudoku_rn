import React from "react";
import {
  ViewStyle,
  StyleProp,
  TextStyle,
  NativeSyntheticEvent,
  NativeTouchEvent,
  TouchableOpacity
} from "react-native";

interface IButton {
  bgroundColor?: string;
  style?: StyleProp<ViewStyle | TextStyle>;
  onPress: (ev: NativeSyntheticEvent<NativeTouchEvent>) => void;
  children: React.ReactNode;
}

const CustomButton = ({ bgroundColor, style, onPress, children }: IButton) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      style={[{ backgroundColor: bgroundColor }, style]}
    >
      {children}
    </TouchableOpacity>
  );
};

export default CustomButton;
