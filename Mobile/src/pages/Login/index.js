import React, {useState, useEffect, useCallback} from 'react';
import {
  Container,
  SubmitText,
  Input,
  Logo,
  Submit,
  Form,
  Background,
  Space,
  Link,
} from './style';
import AsyncStorage from '@react-native-community/async-storage';
import {CommonActions} from '@react-navigation/native';
import {Linking, Alert} from 'react-native';
import api from '../../utils/api';

const Login = ({navigation}) => {
  const [user, setUser] = useState('');
  const [password, setPassworld] = useState('');
  const [url, setURL] = useState(
    'http://www.brunaborgespilates.com.br/avaliacao.html',
  );

  useEffect(() => {
    async function _getUser() {
      const user = await AsyncStorage.getItem('user');
      const passwd = await AsyncStorage.getItem('password');
      setUser(user || '');
      setPassworld(passwd || '');
    }
    _getUser();
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
      .catch((err) => Alert.alert('Erro Login', err.response.data.message));
    await navigation.dispatch(
      CommonActions.reset({
        index: 1,
        routes: [{name: 'Auth'}],
      }),
    );
  };

  const handlePress = useCallback(async () => {
    const supported = await Linking.canOpenURL(url);

    if (supported) {
      await Linking.openURL(url);
    } else {
      Alert.alert(`Não foi possível abrir essa URL: ${url}`);
    }
  }, [url]);

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
          <SubmitText>ou</SubmitText>
          <Link onPress={handlePress}>Cadastre-se</Link>
        </Form>
      </Container>
    </Background>
  );
};

export default Login;
