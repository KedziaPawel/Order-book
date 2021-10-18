/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * Generated with the TypeScript template
 * https://github.com/react-native-community/react-native-template-typescript
 *
 * @format
 */

import React from 'react';
import {ActionSheetProvider} from '@expo/react-native-action-sheet';

import {SafeAreaView, StatusBar} from 'react-native';

import {Provider} from 'react-redux';

import {store} from '@app/state';

import Main from './Main';

import styles from './App.styles';

const App = () => (
  <ActionSheetProvider>
    <Provider store={store}>
      <StatusBar barStyle="light-content" />
      <SafeAreaView style={styles.container}>
        <Main />
      </SafeAreaView>
    </Provider>
  </ActionSheetProvider>
);

export default App;
