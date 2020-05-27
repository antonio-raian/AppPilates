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
      <StatusBar backgroundColor={'#FE8828'} />
      <Routes />
    </>
  );
};

export default App;
