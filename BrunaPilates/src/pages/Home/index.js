import React, {useState, useCallback, useEffect} from 'react';
import {
  Container,
  MenuButton,
  HeadBackground,
  TitleHeader,
  Lista,
  Title,
  Scrolled,
  Logo,
  ListButton,
  ContainerButtons,
  NameUser,
  Center,
  BoxTitle,
  BoxLogo,
  BoxRight,
  BoxLeft,
  Loading,
} from './style';
import {Dimensions, View, Alert} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';
import moment from 'moment';
import ptBR from 'moment/locale/pt-br';
import {Menu, Provider, ActivityIndicator} from 'react-native-paper';
import {logout} from '../../utils/validators';
import {CommonActions} from '@react-navigation/native';
import {data} from '../../utils/data';
import api from '../../utils/api';
import AsyncStorage from '@react-native-community/async-storage';

const Home = ({navigation}) => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState('');
  const [token, setToken] = useState('');
  const [items, setItems] = useState([]);
  const screenHeight = Dimensions.get('window').height;
  const [scroller, setScroller] = useState('');

  useEffect(() => {
    async function _getItems() {
      const obj = await AsyncStorage.getItem('user');
      const token = await AsyncStorage.getItem('token');
      const usuario = JSON.parse(obj);
      setUser(usuario);
      setToken(token);
      setLoading(true);
      await api
        .post(
          '/usuario/atividade/busca',
          {usuario_id: usuario.id},
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          },
        )
        .then((res) => {
          console.log('Atividades', res.data);
          setItems(res.data);
          setLoading(false);
        })
        .catch((err) => {
          console.log('Erro Listar atividades', err);
        });
    }
    _getItems();
  }, []);

  const _renderData = () => {
    // let today = 0;
    // let past = 0;
    // let forward = 0;
    let x = 0;
    return items.map((d) => {
      x++;
      let today =
        moment().diff(d.data_treino, 'h') > 0 &&
        moment().diff(d.data_treino, 'h') < 24;
      let past = moment().diff(d.data_treino, 'h') > 0 && !today;
      let forward = moment().diff(d.data_treino, 'h') < 0;
      if (today) {
        scroller.scrollTo({x: 0, y: screenHeight * x + 220, animated: true});
      }
      return (
        <ContainerButtons today={today}>
          <ListButton
            past={past}
            forward={forward}
            // disabled={!today}
            onPress={() => {
              console.log('<><><><><', d.realizado, today);
              !d.realizado && today
                ? navigation.navigate('Activity', {
                    activity: JSON.stringify(d),
                    token,
                    today: moment(),
                  })
                : Alert.alert(
                    'Treino indisponível',
                    today
                      ? 'Você já fez o treino de Hoje!'
                      : 'Os treinos só ficam disponíveis no dia expecífico!',
                  );
            }}>
            <Title>{`Treino dia ${moment(d.data_treino).format(
              'DD MMM YYYY',
            )}`}</Title>
          </ListButton>
        </ContainerButtons>
      );
    });
  };
  return (
    <>
      <Provider>
        <HeadBackground>
          <BoxRight>
            <Menu
              visible={menuOpen}
              onDismiss={() => setMenuOpen(false)}
              anchor={
                <MenuButton onPress={() => setMenuOpen(true)}>
                  <Icon name="user" size={30} color="#fff" />
                  <NameUser>Olá, {user.username}</NameUser>
                </MenuButton>
              }>
              <Menu.Item
                title="Sair"
                onPress={() => {
                  setMenuOpen(false);
                  logout().then((res) => {
                    navigation.dispatch(
                      CommonActions.reset({
                        index: 1,
                        routes: [{name: 'Auth'}],
                      }),
                    );
                  });
                }}
              />
            </Menu>
          </BoxRight>
          <BoxLeft>
            <BoxTitle>
              <Icon name="calendar" color={'#fff'} size={25} />
              <TitleHeader>{moment().format('DD/MM/YYYY')}</TitleHeader>
            </BoxTitle>
            <BoxLogo>
              <Logo source={require('../../Assets/images/logoBlack.png')} />
            </BoxLogo>
          </BoxLeft>
        </HeadBackground>
        <Container>
          {loading ? (
            <Center>
              <Loading />
            </Center>
          ) : (
            <Scrolled
              ref={(scroll) => {
                setScroller(scroll);
              }}>
              {scroller ? <Lista>{_renderData()}</Lista> : null}
            </Scrolled>
          )}
        </Container>
      </Provider>
    </>
  );
};

export default Home;
