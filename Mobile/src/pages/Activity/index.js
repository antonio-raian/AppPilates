import React, {useState} from 'react';
import {
  Container,
  Background,
  TitleHeader,
  SubTitleHeader,
  Logo,
  BoxLogo,
  BoxTitle,
  BoxIcon,
  Scrolled,
  Lista,
  BoxBtnEnd,
  ButtonEnd,
  LabelBtnEnd,
  BoxBtnBack,
  ButtonBack,
  LabelBtnBack,
} from './style';
import Icon from 'react-native-vector-icons/FontAwesome5';
import {StatusBar} from 'react-native';
import {CommonActions} from '@react-navigation/native';
import {primaryColor} from '../../utils/colors';
import CardActivity from '../../components/CardActivity';
import ModalAvaliacao from '../../components/ModalAvaliacao';
const Activity = ({route, navigation}) => {
  const {token, today} = route.params;
  const activity = JSON.parse(route.params?.activity);
  const [scroller, setScroller] = useState('');
  const [openModal, setModal] = useState(false);
  const [dificult, setDifcult] = useState(activity.dificuldade_esperada);

  const _back = async () => {
    await navigation.dispatch(
      CommonActions.reset({
        index: 1,
        routes: [{name: 'Auth'}],
      }),
    );
  };

  const _renderData = () => {
    return activity.treinos.map((treino) => {
      const exercicio = treino.exercicio;
      return (
        <CardActivity
          title={exercicio.nome}
          qtd_series={treino.descricao}
          repeticoes={treino.repeticoes}
          intervalo={treino.intervalo}
          url={exercicio.link}
        />
      );
    });
  };

  return (
    <>
      <StatusBar backgroundColor={primaryColor} />
      <ModalAvaliacao
        activity={activity}
        token={token}
        today={today}
        animationType="slide"
        transparent={true}
        visible={openModal}
        onClose={() => setModal(false)}
        back={() => _back()}
        dificult={dificult}
        changeDificult={(value) => setDifcult(value)}
      />
      <Background>
        <BoxBtnBack>
          <ButtonBack onPress={() => _back()}>
            <Icon
              name="angle-left"
              size={30}
              color="#fff"
              style={{padding: 20}}
            />
            <LabelBtnBack>Voltar</LabelBtnBack>
          </ButtonBack>
          <BoxLogo>
            <Logo source={require('../../Assets/images/logoB.png')} />
          </BoxLogo>
        </BoxBtnBack>
        <BoxIcon>
          <Icon
            name="clipboard-list"
            size={50}
            color="#fff"
            style={{padding: 20}}
          />
          <BoxTitle>
            <TitleHeader>Treino</TitleHeader>
            <SubTitleHeader>{activity.titulo}</SubTitleHeader>
          </BoxTitle>
        </BoxIcon>
      </Background>
      <Container>
        <Scrolled
          ref={(scroll) => {
            setScroller(scroll);
          }}>
          {scroller ? <Lista>{_renderData()}</Lista> : null}
        </Scrolled>
        <BoxBtnEnd>
          <ButtonEnd
            onPress={() => {
              setModal(true);
            }}>
            <LabelBtnEnd>Finalizar</LabelBtnEnd>
          </ButtonEnd>
        </BoxBtnEnd>
      </Container>
    </>
  );
};

export default Activity;
