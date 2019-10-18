import React from "react";
import { View, StyleSheet, StatusBar } from "react-native";
import LinearGradient from "react-native-linear-gradient";
import theme from "../shared/Constants";

interface IHeader {
  leftItem?: JSX.Element;
  rightItem?: JSX.Element;
  centerItem?: JSX.Element;
}

const CustomHeader = ({ leftItem, rightItem, centerItem }: IHeader) => (
  <LinearGradient
    start={{ x: 0, y: 0 }}
    end={{ x: 1, y: 0 }}
    colors={theme.light.linear_gradient}
    style={{ width: "100%" }}
  >
    <View style={_styles.container}>
      <View style={_styles.menuContainer}>
        <View style={{ flexDirection: "row" }}>
          <View
            style={{
              flex: 1,
              alignItems: "flex-start",
              marginLeft: 10
            }}
          >
            {leftItem}
          </View>
          <View
            style={{
              flex: 2,
              alignItems: "center"
            }}
          >
            {centerItem}
          </View>
          <View
            style={{
              flex: 1,
              alignItems: "flex-end",
              marginRight: 10
            }}
          >
            {rightItem}
          </View>
        </View>
      </View>
    </View>
  </LinearGradient>
);

const _styles = StyleSheet.create({
  container: {
    marginTop: StatusBar.currentHeight,
    alignItems: "center"
  },
  menuContainer: {
    marginTop: 10,
    flexDirection: "row",
    alignItems: "center"
  },
  titleContainer: {
    flex: 1,
    alignItems: "center"
  },
  title: {
    fontSize: 18,
    fontWeight: "600"
  }
});

export default CustomHeader;
