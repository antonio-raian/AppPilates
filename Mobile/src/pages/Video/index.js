import React from 'react';
import {View, TouchableWithoutFeedback, Image, Text} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';
import YouTube from 'react-native-youtube';

const Video = ({route, navigation}) => {
  const {videoId} = route.params;
  return (
    <TouchableWithoutFeedback
      onPress={() => {
        console.log('Clicou fora');
        navigation.goBack();
      }}>
      <View
        style={{
          flex: 1,
          backgroundColor: '#a9a9a950',
        }}>
        <View
          style={{
            flex: 1,
            marginTop: 120,
          }}>
          <Text
            style={{
              color: '#fff',
              textAlign: 'center',
              fontSize: 20,
              marginBottom: 10,
            }}>
            Clique aqui para fechar o vídeo.
          </Text>
          {/* <Icon
            solid
            name="times"
            color="#FF0000"
            size={30}
            style={{
              backgroundColor: '#FFFFFF',
              justifyContent: 'center',
              borderRadius: 50,
              padding: 5,
            }}
          /> */}
          <YouTube
            apiKey="AIzaSyCr8Jt-VYpfx-a7QE5GVl_FVPp8_MpjK4U"
            videoId={videoId}
            play={true}
            fullscreen={false} // control whether the video should play in fullscreen or inline
            loop={true} // control whether the video should loop when ended
            controls={2}
            mute={true}
            onReady={(e) => console.log('READY', e)}
            onChangeState={(e) => console.log('State', e)}
            onChangeQuality={(e) => console.log('QUALIDADE', e)}
            onError={(e) => console.log('ERRO', e.error)}
            style={{alignSelf: 'stretch', height: 220}}
          />
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
};

module.exports = Video;
