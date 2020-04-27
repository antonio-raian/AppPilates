import React, {useState} from 'react';
import {
  Container,
  MenuButton,
  Head,
  TitleHeader,
  CalendarBox,
  primaryColor,
} from './style';
import Icon from 'react-native-vector-icons/FontAwesome5';
import {Provider, Menu} from 'react-native-paper';
import {logout} from '../../utils/validators';
import {CommonActions} from '@react-navigation/native';
import {CalendarList, Calendar, LocaleConfig} from 'react-native-calendars';

const theme = {
  textSectionTitleColor: primaryColor,
  selectedDayBackgroundColor: primaryColor,
  selectedDayTextColor: '#ffffff',
  todayTextColor: '#00adf5',
  dayTextColor: '#2d4150',
  textDisabledColor: '#d9e1e8',
  dotColor: '#00adf5',
  selectedDotColor: '#ffffff',
  arrowColor: '#2d4150',
  disabledArrowColor: '#d9e1e8',
  monthTextColor: '#2d4150',
  indicatorColor: 'blue',
  textMonthFontFamily: 'monospace',
  textMonthFontWeight: 'bold',
  textDayFontSize: 15,
  textMonthFontSize: 20,
  textDayHeaderFontSize: 15,
};

const Schedule = ({navigation}) => {
  const [menuOpen, setMenuOpen] = useState(false);
  LocaleConfig.locales.br = {
    monthNames: [
      'Janeiro',
      'Fevereiro',
      'Março',
      'Abril',
      'Maio',
      'Junho',
      'Julho',
      'Agosto',
      'Setembro',
      'Outubro',
      'Novembro',
      'Dezembro',
    ],
    monthNamesShort: [
      'Jan.',
      'Fev.',
      'Mar.',
      'Abr.',
      'Mai.',
      'Jun.',
      'Jul.',
      'Ago',
      'Set.',
      'Out.',
      'Nov.',
      'Dez.',
    ],
    dayNames: [
      'Domingo',
      'Segunda-feira',
      'Terça-feira',
      'Quarta-feira',
      'Quinta-feira',
      'Sexta-feira',
      'Sábado',
    ],
    dayNamesShort: ['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sab'],
  };
  LocaleConfig.defaultLocale = 'br';

  return (
    <>
      <Provider>
        <Head>
          <Menu
            visible={menuOpen}
            onDismiss={() => setMenuOpen(false)}
            anchor={
              <MenuButton onPress={() => setMenuOpen(true)}>
                <Icon name="bars" size={20} color="#fff" />
              </MenuButton>
            }>
            <Menu.Item
              title="Treino"
              onPress={() => {
                setMenuOpen(false);
                navigation.navigate('Home');
              }}
            />
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
          <TitleHeader>Calendário</TitleHeader>
        </Head>
        <Container>
          <CalendarBox>
            <Calendar
              style={{width: '100%', height: '100%'}}
              onMonthChange={(month) => {
                console.log('month', month);
              }}
              theme={theme}
              markedDates={{
                '2020-04-20': {
                  startingDay: true,
                  selected: true,
                  color: 'green',
                  endingDay: true,
                },
                '2020-04-21': {
                  startingDay: true,
                  selected: true,
                  color: 'red',
                  endingDay: true,
                },
                '2020-04-22': {
                  startingDay: true,
                  selected: true,
                  color: 'green',
                  endingDay: true,
                },
                '2020-04-23': {
                  startingDay: true,
                  selected: true,
                  color: 'green',
                  endingDay: true,
                },
                '2020-04-04': {
                  disabled: true,
                  startingDay: true,
                  color: 'green',
                  endingDay: true,
                },
              }}
              markingType={'period'}
            />
          </CalendarBox>
        </Container>
      </Provider>
    </>
  );
};

export default Schedule;
