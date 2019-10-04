import React from "react";
import {
  ViewStyle,
  StyleProp,
  TextStyle,
  NativeSyntheticEvent,
  NativeTouchEvent,
  StyleSheet,
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
  bgroundColor = "blue",
  style,
  onPress,
  children,
  underlay = "black"
}: IButton) => {
  return (
    <TouchableHighlight
      onPress={onPress}
      style={[styles.btnClickContain, { backgroundColor: bgroundColor }, style]}
      underlayColor={underlay}
    >
      {children}
    </TouchableHighlight>
  );
};

export default CustomButton;

const styles = StyleSheet.create({
  btnClickContain: {
    // flex: 1,
    // flexDirection: "row",
    // justifyContent: "center",
    // alignItems: "stretch",
    // alignSelf: "stretch",
    // borderRadius: 5,
    padding: 5,
    marginTop: 5
    // marginBottom: 5,
    // height: 50,
    // width: 50
  },
  btnContainer: {
    // flex: 1,
    // flexDirection: "row",
    // justifyContent: "center",
    // alignItems: "stretch",
    // alignSelf: "stretch",
    // borderRadius: 10,
    // height: 50,
    // width: 50
  }
});
