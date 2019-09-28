import React from "react";
import { createAppContainer } from "react-navigation";
import { RootStack } from "./src/navigator/Navigator";
import { StatusBar, View } from "react-native";

const AppContainer = createAppContainer(RootStack);

const App = () => {
  return (
    <View style={{flex: 1, justifyContent: "center"}}>
      <StatusBar
        backgroundColor="#FE7D5E"
        barStyle="light-content"/>
      <AppContainer />
    </View>
  );
};

export default App;
