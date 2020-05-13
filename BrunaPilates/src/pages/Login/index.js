import React, {useState, useEffect} from 'react';
import {
  Container,
  SubmitText,
  Input,
  Logo,
  Submit,
  Form,
  Background,
  Space,
} from './style';
import AsyncStorage from '@react-native-community/async-storage';
import {CommonActions} from '@react-navigation/native';
import {Alert} from 'react-native';
import api from '../../utils/api';

const Login = ({navigation}) => {
  const [user, setUser] = useState('admin');
  const [password, setPassworld] = useState('admin123');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    async function _getUser() {
      const user = await AsyncStorage.getItem('user');
      const passwd = await AsyncStorage.getItem('password');
      setUser(user || '');
      setPassworld(passwd || '');
    }
    // _getUser();
  }, []);

  const handleSubmit = async () => {
    if (user === '' || password === '') {
      return Alert.alert('Prencha os campos');
    }

    await api
      .post('/usuario/login', {username: user, password})
      .then(async (res) => {
        const usuario = res.data;
        await AsyncStorage.setItem('user', JSON.stringify(usuario.usuario));
        await AsyncStorage.setItem('token', usuario.token.token);
        console.log(res.data);
      })
      .catch((err) => console.log('Erro Login', err));
    await navigation.dispatch(
      CommonActions.reset({
        index: 1,
        routes: [{name: 'Auth'}],
      }),
    );
  };

  return (
    <Background>
      <Container>
        <Logo source={require('../../Assets/images/logoBlack.png')} />
        <Form>
          <Input
            placeholder="Usuário..."
            value={user}
            onChangeText={(text) => setUser(text)}
          />
          <Input
            placeholder="Senha..."
            value={password}
            secureTextEntry
            onChangeText={(text) => setPassworld(text)}
          />
          <Submit onPress={handleSubmit}>
            <SubmitText> Acessar </SubmitText>
          </Submit>
        </Form>
      </Container>
    </Background>
  );
};

export default Login;
