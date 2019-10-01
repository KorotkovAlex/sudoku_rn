import React, { useEffect } from "react";
import { createAppContainer } from "react-navigation";
import { RootStack } from "./src/navigator/Navigator";
import { StatusBar, View } from "react-native";
import SplashScreen from "react-native-splash-screen";

const AppContainer = createAppContainer(RootStack);

const App = () => {
  useEffect(() => {
    SplashScreen.hide();
  });

  return (
    <View style={{ flex: 1, justifyContent: "center" }}>
      <StatusBar
        translucent
        backgroundColor="rgba(0,0,0,0)"
        barStyle="light-content"
      />
      <AppContainer />
    </View>
  );
};

export default App;
