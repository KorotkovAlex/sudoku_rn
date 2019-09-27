import { createStackNavigator } from "react-navigation-stack";

import Sudoku from "../screens/sudoku";

export const RootStack = createStackNavigator({
    Home: {
        screen: Sudoku,
        navigationOptions: {
            headerTitle: "Sudoku",
            headerTitleStyle: {
                fontWeight: "500",
                fontSize: 24,
                color: "white"
            },
            headerStyle: {
                backgroundColor: "#2089dc",
            },
            headerTintColor: "white"
        }
    }
},
{
    initialRouteName: "Home",
});