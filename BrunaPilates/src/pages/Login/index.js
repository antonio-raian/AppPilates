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
import {KeyboardAvoidingView} from 'react-native';

const Login = ({navigation}) => {
  const [user, setUser] = useState('');
  const [passworld, setPassworld] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    async function _getUser() {
      const user = await AsyncStorage.getItem('user');
      const passwd = await AsyncStorage.getItem('passworld');
      setUser(user || '');
      setPassworld(passwd || '');
    }
    _getUser();
  }, []);

  const handleSubmit = async () => {
    await AsyncStorage.setItem('token', 'aoishoaihsoaihsoaihs');
    navigation.dispatch(
      CommonActions.reset({
        index: 1,
        routes: [{name: 'Auth'}],
      }),
    );
  };

  return (
    <Background>
      <Container>
        <Logo source={require('../../Assets/logo.png')} />
        <Form>
          <Input
            placeholder="Usuário..."
            onChangeText={(text) => setUser(text)}
          />
          <Input
            placeholder="Senha..."
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
