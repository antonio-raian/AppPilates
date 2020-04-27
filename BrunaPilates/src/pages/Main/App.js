/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React from 'react';
import Routes from '../../utils/routes';
import {StatusBar} from 'react-native';

const App: () => React$Node = () => {
  return (
    <>
      <StatusBar backgroundColor="#DF3B4F" />
      <Routes />
    </>
  );
};

export default App;
