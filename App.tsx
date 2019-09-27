import React from "react";
import { createAppContainer } from "react-navigation";
import { RootStack } from "./src/navigator/Navigator";
import { StatusBar } from "react-native";

const AppContainer = createAppContainer(RootStack);

const App = () => {
  return (
    <>
      <StatusBar
        backgroundColor="#FE7D5E"
        barStyle="light-content"/>
      <AppContainer />
    </>
  );
};

export default App;
