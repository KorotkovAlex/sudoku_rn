import React from 'react';
import {
  StyleSheet,
  View,
} from 'react-native';

import { Hello } from './src/components/Hello';

const App = () => {
  return (
    <View>
      <Hello name={'Vlad'} enthusiasmLevel={1} />
    </View>
  );
};

const styles = StyleSheet.create({
});

export default App;
