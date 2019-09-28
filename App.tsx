import React from "react";
// import { createAppContainer } from "react-navigation";
// import { RootStack } from "./src/navigator/Navigator";
import { StatusBar, Button, View } from "react-native";
import Sudoku from "./src/screens/Sudoku";

// const AppContainer = createAppContainer(RootStack);

const App = () => {
  return (
    <View style={{flex: 1, justifyContent: "center"}}>
      {/* <StatusBar
        backgroundColor="#FE7D5E"
        barStyle="light-content"/> */}
      {/* <AppContainer /> */}
      <Sudoku />
      {/* <Button title={"Click"} color={"red"} onPress={() => {
        console.log("gfgfdf");
      }}/> */}
    </View>
  );
};

export default App;
