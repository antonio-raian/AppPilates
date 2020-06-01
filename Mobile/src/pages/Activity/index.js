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
  ContainerTreino,
  Title,
  Descript,
  Instuctions,
  Label,
  BoxBtnEnd,
  ButtonEnd,
  LabelBtnEnd,
  BoxBtnBack,
  ButtonBack,
  LabelBtnBack,
} from './style';
import ButtonVideo from '../../components/ButtonVideo';
import Icon from 'react-native-vector-icons/FontAwesome5';
import {
  View,
  Text,
  TouchableOpacity,
  Modal,
  TextInput,
  Alert,
  StatusBar,
} from 'react-native';
import api from '../../utils/api';
import {CommonActions} from '@react-navigation/native';
import Slider from '@react-native-community/slider';
import {primaryColor} from '../../utils/colors';

const hasDificult = (dif) => {
  if (dif === 0) {
    return 'Nem suei';
  }
  if (dif > 0 && dif < 3) {
    return 'Faria mais certeza';
  }
  if (dif >= 3 && dif < 6) {
    return 'Ainda tenho fôlego';
  }
  if (dif >= 6 && dif <= 9) {
    return 'Muito cansado';
  }
  if (dif > 9 && dif <= 10) {
    return 'Exausto!';
  }
};

const Activity = ({route, navigation}) => {
  const {token, today} = route.params;
  const activity = JSON.parse(route.params?.activity);
  const [scroller, setScroller] = useState('');
  const [openModal, setModal] = useState(false);
  const [dificult, setDifcult] = useState(activity.dificuldade_esperada);
  const [comentario, setComentario] = useState('');

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
        <View style={{paddingVertical: 5}}>
          <ContainerTreino>
            <Title>{exercicio.nome}</Title>
            <Label>Descrição:</Label>
            <Descript>{exercicio.descricao}</Descript>
            <Instuctions>
              Faça {treino.qtd_series} séries de {treino.repeticoes} repetições
            </Instuctions>
            <Instuctions>
              Descanse por {treino.intervalo} segundos entre as séries
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
            <ButtonVideo url={treino.exercicio.link} label="vídeo" />
          </ContainerTreino>
        </View>
      );
    });
  };

  return (
    <>
      <StatusBar backgroundColor={primaryColor} />
      <Modal
        animationType="slide"
        transparent={true}
        visible={openModal}
        onRequestClose={() => setModal(false)}>
        <View
          style={{
            flex: 1,
            backgroundColor: 'rgba(255, 255, 255, 0.85)',
            backfaceVisibility: 'hidden',
            justifyContent: 'center',
            alignItems: 'center',
            padding: 10,
          }}>
          <View
            style={{
              width: '95%',
              backgroundColor: '#fff',
              opacity: 1,
              justifyContent: 'center',
              alignItems: 'center',
              borderColor: '#DF3B4F',
              borderWidth: 1,
              borderRadius: 20,
            }}>
            <Text style={{fontWeight: 'bold', fontSize: 25, paddingBottom: 10}}>
              Avaliação do Treino
            </Text>
            <Icon name="dumbbell" size={40} />
            <Text style={{paddingVertical: 5}}>
              Nossa, você terminou, Muito bom... 👏🏼👏🏼🎉🎊
            </Text>
            <Text>Como tá se sentindo? Conta pra gente!</Text>
            <Text style={{paddingTop: 20}}>{hasDificult(dificult)}</Text>
            <Slider
              value={dificult}
              minimumValue={0}
              maximumValue={10}
              thumbTintColor={'#DF3B4F'}
              minimumTrackTintColor="#DF3B4F"
              maximumTrackTintColor="#000000"
              onValueChange={(value) => setDifcult(Math.round(value))}
              style={{width: '90%', height: 50}}
            />
            <View style={{width: '90%', paddingVertical: 15}}>
              <Text>Comentários</Text>
              <TextInput
                placeholder="Deixe-nos saber como foi o treino pra você..."
                multiline={true}
                onChangeText={(text) => setComentario(text)}
                style={{
                  borderWidth: 1,
                  borderColor: '#bbb',
                  borderRadius: 15,
                }}
              />
            </View>
            <View
              style={{
                flexDirection: 'row',
                width: '100%',
                height: '15%',
              }}>
              <TouchableOpacity
                onPress={() => setModal(false)}
                style={{
                  width: '40%',
                  height: '100%',
                  justifyContent: 'center',
                  alignItems: 'center',
                  marginHorizontal: 18,
                  backgroundColor: '#bbb',
                  borderRadius: 20,
                }}>
                <Text style={{fontWeight: 'bold', fontSize: 18}}>Cancelar</Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={async () => {
                  await api
                    .post(
                      '/usuario/avaliacao/nova',
                      {
                        id: activity.id,
                        realizado: true,
                        data_realizado: today,
                        dificuldade_sentida: dificult,
                        comentario,
                      },
                      {
                        headers: {
                          Authorization: `Bearer ${token}`,
                        },
                      },
                    )
                    .then((res) => {
                      Alert.alert(
                        'Avaliação enviada',
                        'O treino de hoje já foi! 😉 \nObrigado por nos manter informados, volte amanhã e continue treinando',
                      );
                      _back();
                    })
                    .catch((err) => console.log('Erro na avalicao', err));
                }}
                style={{
                  width: '40%',
                  height: '100%',
                  justifyContent: 'center',
                  alignItems: 'center',
                  marginHorizontal: 18,
                  backgroundColor: '#99FF99',
                  borderRadius: 20,
                }}>
                <Text style={{fontWeight: 'bold', fontSize: 18}}>
                  Finalizar
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>

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
            <LabelBtnEnd>Finalizar Treino</LabelBtnEnd>
          </ButtonEnd>
        </BoxBtnEnd>
      </Container>
    </>
  );
};

export default Activity;
