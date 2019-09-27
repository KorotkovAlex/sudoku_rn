import React from "react";
import { Text, View, StyleSheet } from "react-native";

interface IHeader {
  leftItem?: React.ReactNode;
  rightItem?: React.ReactNode;
  title: string;
}

const CustomHeader = ({ leftItem, rightItem, title }: IHeader) => {
  const _renderLeftItem = () => {
    return (
      <View style={styles.leftItem}>
        {leftItem}
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
        <Text style={styles.title}>{ title }</Text>
        {rightItem ? _renderRightItem() : null}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    height: 200,
    backgroundColor: "#FE7D5E"
  },
  body: {
    flexDirection: "row",
    marginTop: 15,
  },
  leftItem: {
    flex: 1,
    justifyContent: "flex-start",
    alignItems: "flex-start",
    marginLeft: 10
  },
  rightItem: {
    flex: 1,
    justifyContent: "flex-end",
    alignItems: "flex-end",
    marginRight: 10
  },
  title: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    color: "#FFF7EF",
    fontSize: 18,
    textAlign: "center",
  }
});

export default CustomHeader;