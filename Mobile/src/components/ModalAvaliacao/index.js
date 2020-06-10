import React, {useState} from 'react';
import {Modal, Text, View, TextInput, Alert} from 'react-native';
import {Container, Paper, BtnCancel, BtnSave} from './style';
import Icon from 'react-native-vector-icons/FontAwesome5';
import Slider from '@react-native-community/slider';
import api from '../../utils/api';

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

const ModalAvaliacao = (props) => {
  const {
    activity,
    token,
    today,
    animationType,
    transparent,
    visible,
    onClose,
    back,
    dificult,
    changeDificult,
  } = props;

  const [comentario, setComentario] = useState('');

  return (
    <Modal
      animationType={animationType}
      transparent={transparent}
      visible={visible}
      onRequestClose={onClose}>
      <Container>
        <Paper>
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
            onValueChange={(value) => changeDificult(Math.round(value))}
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
            <BtnCancel onPress={onClose}>
              <Text style={{fontWeight: 'bold', fontSize: 18}}>Cancelar</Text>
            </BtnCancel>
            <BtnSave
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
                      'O treino de hoje já foi! 😉 \nObrigado por nos manter informados. Matenha o foco!\nAté o próximo treino!',
                    );
                    back();
                  })
                  .catch((err) => console.log('Erro na avalicao', err));
              }}>
              <Text style={{fontWeight: 'bold', fontSize: 18}}>Finalizar</Text>
            </BtnSave>
          </View>
        </Paper>
      </Container>
    </Modal>
  );
};

export default ModalAvaliacao;
