import React from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { NavigationScreenProp, NavigationState, NavigationParams } from 'react-navigation';

interface IProps {
    navigation: NavigationScreenProp<NavigationState, NavigationParams>;
}

class Sudoku extends React.Component<IProps> {
    constructor(props: IProps) {
        super(props);
    }

    render() {
        return (
            <View style={styles.view}>
                <Text>{'Hello world'}</Text>
            </View>
        );
    }
}

export default Sudoku;

const styles = StyleSheet.create({
    view: {
        flex: 1,
        justifyContent: 'center'
    }
});