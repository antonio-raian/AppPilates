import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';

//Telas
import Auth from '../pages/Auth';
import Login from '../pages/Login';
import Home from '../pages/Home';
import Schedule from '../pages/Schedule';

const Stack = createStackNavigator();

function Routes() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{headerShown: false}}
        initialRouteName="Auth">
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="Auth" component={Auth} />
        <Stack.Screen name="Home" component={Home} />
        <Stack.Screen name="Schedule" component={Schedule} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default Routes;
