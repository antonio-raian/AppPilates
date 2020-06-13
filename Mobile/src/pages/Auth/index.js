//Página de validação de login
import React, {Component, useState, useEffect} from 'react';

import {Container, Loading, Background} from './style';
import {isLoged} from '../../utils/validators';
import {CommonActions} from '@react-navigation/native';

const Auth = ({navigation}) => {
  function _checkToken() {
    console.log('ENTROU NESSE COISO');
    isLoged().then((res) => {
      res
        ? navigation.dispatch(
            CommonActions.reset({
              index: 1,
              routes: [{name: 'Home'}],
            }),
          )
        : navigation.dispatch(
            CommonActions.reset({
              index: 1,
              routes: [{name: 'Login'}],
            }),
          );
    });
  }
  return (
    <>
      {navigation.isFocused() && _checkToken()}
      <Container>
        <Background source={require('../../Assets/images/fundo1.png')}>
          <Loading />
        </Background>
      </Container>
    </>
  );
};

export default Auth;
