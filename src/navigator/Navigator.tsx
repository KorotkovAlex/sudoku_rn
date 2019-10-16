import { createStackNavigator } from "react-navigation-stack";

import Sudoku from "../screens/Sudoku";
import About from "../screens/About";

export const RootStack = createStackNavigator(
  {
    Home: {
      screen: Sudoku,
      navigationOptions: {
        header: null
      }
    },
    About: {
      screen: About,
      navigationOptions: {
        header: null
      }
    }
  },
  {
    initialRouteName: "Home"
  }
);
