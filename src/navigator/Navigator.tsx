import { createStackNavigator } from "react-navigation-stack";

import Sudoku from "../screens/Sudoku";

export const RootStack = createStackNavigator({
    Home: {
        screen: Sudoku,
        navigationOptions: {
            header: null
        }
    },
},
{
    initialRouteName: "Home",
});