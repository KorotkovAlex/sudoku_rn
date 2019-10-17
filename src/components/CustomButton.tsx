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
  opacity?: number;
  onPress: (ev: NativeSyntheticEvent<NativeTouchEvent>) => void;
  children: React.ReactNode;
}

const CustomButton = ({
  bgroundColor,
  style,
  onPress,
  children,
  opacity = 0.5
}: IButton) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      activeOpacity={opacity}
      style={[{ backgroundColor: bgroundColor }, style]}
    >
      {children}
    </TouchableOpacity>
  );
};

export default CustomButton;
