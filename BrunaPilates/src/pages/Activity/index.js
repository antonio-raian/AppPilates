import React, {useState, useCallback} from 'react';
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
  ContainerTreino,
  Title,
  Descript,
  Instuctions,
  Label,
} from './style';
import ButtonLinking from '../../components/ButtonLinking';
import Icon from 'react-native-vector-icons/FontAwesome5';
import {CommonActions} from '@react-navigation/native';
import {View, Text} from 'react-native';

const Activity = ({route, navigation}) => {
  const {activity} = route.params;
  const [scroller, setScroller] = useState('');

  const _renderData = () => {
    return activity.treinos.map((treino) => {
      const exercicio = treino.exercicio;
      return (
        <View style={{paddingVertical: 5}}>
          <ContainerTreino>
            <Title>{exercicio.nome}</Title>
            <Label>Descrição:</Label>
            <Descript>{exercicio.descricao}</Descript>
            <Instuctions>
              Faça {treino.qtd_series} séries de {treino.repeticoes} repetições
            </Instuctions>
            <Instuctions>
              Descanse por {treino.intervalo} entre as séries
            </Instuctions>
            <Text
              style={{
                textAlign: 'center',
                fontWeight: 'bold',
                fontSize: 18,
                paddingTop: 10,
              }}>
              Veja o Vídeo abaixo para tirar dúvidas
            </Text>
            <ButtonLinking url={treino.exercicio.link} label="vídeo" />
          </ContainerTreino>
        </View>
      );
    });
  };

  return (
    <>
      <Background>
        <BoxLogo>
          <Logo source={require('../../Assets/logo.png')} />
        </BoxLogo>
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
      </Container>
    </>
  );
};

export default Activity;
