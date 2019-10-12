import React from "react";
import { createAppContainer } from "react-navigation";
import {
  StatusBar,
  View,
  NativeModules,
  Dimensions,
  PixelRatio
} from "react-native";
import SplashScreen from "react-native-splash-screen";

import { RootStack } from "./src/navigator/Navigator";
import { SudokuProvider } from "./src/scripts/sudokuContext";
import getDictionaryByLanguage from "./src/shared/locale";

const AppContainer = createAppContainer(RootStack);
const locale = NativeModules.I18nManager.localeIdentifier;
const dictionary = getDictionaryByLanguage(locale);

interface IAppState {
  width: number;
  height: number;
  baseWidth: number;
}
export default class App extends React.Component<{}, IAppState> {
  state = {
    width: Dimensions.get("window").width,
    height: Dimensions.get("window").height,
    baseWidth: Dimensions.get("window").width / 375
  };
  _changeDimensionsValue = (e: any) => {
    const { width, height } = e.window;
    this.setState({ width, height, baseWidth: width / 375 });
  };

  componentDidMount() {
    SplashScreen.hide();
    Dimensions.addEventListener("change", e => this._changeDimensionsValue(e));
  }

  render() {
    return (
      <SudokuProvider
        value={{
          dictionary,
          dimensions: {
            width: this.state.width,
            height: this.state.height,
            baseWidth: this.state.baseWidth
          }
        }}
      >
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
  }
}
