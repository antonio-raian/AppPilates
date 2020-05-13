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
import {primaryColor} from '../../utils/colors';

const App: () => React$Node = () => {
  return (
    <>
      <StatusBar backgroundColor={primaryColor} />
      <Routes />
    </>
  );
};

export default App;
