import React from "react";
import { createAppContainer } from "react-navigation";
import { RootStack } from "./src/navigator/Navigator";

const AppContainer = createAppContainer(RootStack);

const App = () => {
  return (
    <AppContainer />
  );
};

export default App;
