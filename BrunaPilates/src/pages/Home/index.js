import React, {useState, useCallback} from 'react';
import {
  Container,
  MenuButton,
  Background,
  TitleHeader,
  Lista,
  Button,
  LabelButtonInit,
  Title,
  SubTitle,
  Scrolled,
  Center,
  Logo,
  ListButton,
  ContainerButtons,
  NameUser,
} from './style';
import {Dimensions, View} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';
import moment from 'moment';
import ptBR from 'moment/locale/pt-br';
import {Menu, Provider} from 'react-native-paper';
import {logout} from '../../utils/validators';
import {CommonActions} from '@react-navigation/native';
import {data} from '../../utils/data';

const items = data(30);

const Home = ({navigation}) => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [posx, setPosx] = useState('');
  const screenHeight = Dimensions.get('window').height;
  const screenWidth = Dimensions.get('window').width;
  const [scroller, setScroller] = useState('');

  const _renderData = () => {
    let today = 0;
    let x = 0;
    return items.map((d) => {
      x++;
      today =
        moment().diff(d.data_treino, 'h') > 0 &&
        moment().diff(d.data_treino, 'h') < 24;
      if (today) {
        scroller.scrollTo({x: 0, y: screenHeight * x + 220, animated: true});
      }
      return (
        <ContainerButtons>
          <ListButton
            past={moment().diff(d.data_treino, 'h') > 0 && !today}
            forward={moment().diff(d.data_treino, 'h') < 0}
            disabled={d.realizado || !today}
            today={today}>
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
        <Background>
          <View style={{width: '30%'}}>
            <Menu
              visible={menuOpen}
              onDismiss={() => setMenuOpen(false)}
              anchor={
                <MenuButton onPress={() => setMenuOpen(true)}>
                  <Icon name="user" size={25} color="#fff" />
                  <NameUser>Antonio Raian</NameUser>
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
          </View>
          <TitleHeader>Treino Diário</TitleHeader>
          <Logo source={require('../../Assets/logo.png')} />
        </Background>
        <Container>
          <Scrolled
            ref={(scroll) => {
              setScroller(scroll);
            }}>
            {scroller ? <Lista>{_renderData()}</Lista> : null}
          </Scrolled>
        </Container>
      </Provider>
    </>
  );
};

export default Home;
