import React from "react";
import { View, StyleSheet, StatusBar } from "react-native";

interface IHeader {
  leftItem?: React.ReactNode;
  rightItem?: React.ReactNode;
  centerItem: React.ReactNode;
}

const CustomHeader = ({ leftItem, rightItem, centerItem }: IHeader) => {
  const _renderLeftItem = () => {
    return (
      <View style={styles.leftItem}>
        {leftItem}
      </View>
    );
  };

  const _renderCenterItem = () => {
    return (
      <View style={styles.centerItem}>
        {centerItem}
      </View>
    );
  };

  const _renderRightItem = () => {
    return (
      <View style={styles.rightItem}>
        {rightItem}
      </View>
    );
  };

  return (
    <View style={styles.header}>
      <View style={styles.body}>
        {leftItem ? _renderLeftItem() : null}
        {centerItem ? _renderCenterItem() : null}
        {rightItem ? _renderRightItem() : null}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    height: 200,
  },
  body: {
    flexDirection: "row",
    marginTop: StatusBar.currentHeight,
  },
  leftItem: {
    color: "#FFF7EF",
    flex: 1,
    alignItems: "flex-start",
    marginLeft: 10
    // justifyContent: "flex-start",
  },
  rightItem: {
    color: "#FFF7EF",
    flex: 1,
    alignItems: "flex-end",
    marginRight: 10
    // justifyContent: "flex-end",
  },
  centerItem: {
    flex: 1,
    alignItems: "center",
    textAlign: "center",
    // justifyContent: "center",
  }
});

export default CustomHeader;