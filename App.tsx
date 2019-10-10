import React, { useEffect } from "react";
import { createAppContainer } from "react-navigation";
import { RootStack } from "./src/navigator/Navigator";
import { StatusBar, View, NativeModules } from "react-native";
import SplashScreen from "react-native-splash-screen";

import { SudokuProvider } from "./src/scripts/sudokuContext";
import getDictionaryByLanguage from "./src/shared/locale";

const AppContainer = createAppContainer(RootStack);
const locale = NativeModules.I18nManager.localeIdentifier;
const dictionary = getDictionaryByLanguage(locale);

const App = () => {
  useEffect(() => {
    console.log("hide");
    SplashScreen.hide();
  }, []);

  return (
    <SudokuProvider value={{ dictionary }}>
      <View style={{ flex: 1, justifyContent: "center" }}>
        <StatusBar
          translucent
          backgroundColor="rgba(0,0,0,0)"
          barStyle="light-content"
        />
        <AppContainer />
      </View>
    </SudokuProvider>
  );
};

export default App;
