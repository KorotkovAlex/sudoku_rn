import React from 'react';
import {
  View,
} from 'react-native';
import { createAppContainer } from 'react-navigation';

import { RootStack } from './src/navigator/navigator';

const AppContainer = createAppContainer(RootStack);

const App = () => {
  return (
    <View>
      <AppContainer />
    </View>
  );
};

export default App;
