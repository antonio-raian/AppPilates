import React, {useState, useEffect} from 'react';
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
  Divider,
  RightArrows,
} from './style';
import {Dimensions, Alert, RefreshControl, StatusBar} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';
import moment from 'moment';
import ptBR from 'moment/locale/pt-br';
import {Menu, Provider} from 'react-native-paper';
import {logout} from '../../utils/validators';
import {CommonActions} from '@react-navigation/native';
import api from '../../utils/api';
import AsyncStorage from '@react-native-community/async-storage';
import {primaryColor} from '../../utils/colors';

const Home = ({navigation}) => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState('');
  const [token, setToken] = useState('');
  const [items, setItems] = useState([]);
  const screenHeight = Dimensions.get('window').height;
  const [scroller, setScroller] = useState('');

  const [refresh, setRefresh] = useState(true);

  useEffect(() => {
    async function _getItems() {
      const obj = await AsyncStorage.getItem('user');
      const token2 = await AsyncStorage.getItem('token');
      const usuario = JSON.parse(obj);
      setUser(usuario);
      setToken(token2);
      setLoading(true);
      await api
        .post(
          '/usuario/atividade/busca',
          {busca: {}, from: 'mobile'},
          {
            headers: {
              Authorization: `Bearer ${token2}`,
            },
          },
        )
        .then((res) => {
          console.log('Atividades', res.data);
          setItems(res.data);
          setRefresh(false);
          setLoading(false);
        })
        .catch((err) => {
          console.log('Erro Listar atividades', err);
        });
    }
    if (refresh) {
      _getItems();
    }
  }, [refresh]);

  const _renderData = () => {
    let x = 0;
    return items.map((d) => {
      x++;
      let today =
        moment().diff(d.data_treino, 'h') > 0 &&
        moment().diff(d.data_treino, 'h') < 24;
      let forward = moment().diff(d.data_treino, 'h') < 0;
      if (today) {
        scroller.scrollTo({x: 0, y: screenHeight * x + 220, animated: true});
      }
      return today || forward ? (
        <>
          <ContainerButtons num={x} today={today}>
            <ListButton
              forward={forward}
              onPress={() => {
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
              <Title today={today}>{`Treino ${moment(d.data_treino).format(
                'DD MMM YYYY',
              )}`}</Title>
              <RightArrows today={today} />
            </ListButton>
          </ContainerButtons>
          <Divider today={today} />
        </>
      ) : null;
    });
  };
  return (
    <>
      <StatusBar backgroundColor={primaryColor} />
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
              <Logo source={require('../../Assets/images/logoB.png')} />
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
              refreshControl={
                <RefreshControl
                  refreshing={refresh}
                  onRefresh={() => {
                    setRefresh(true);
                  }}
                />
              }
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
