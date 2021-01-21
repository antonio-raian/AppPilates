import React, {createRef, useEffect, useState} from 'react';
import {View, TouchableWithoutFeedback, Image, Text} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';
import YouTube from 'react-native-youtube';

const Video = ({route, navigation}) => {
  const {videoId} = route.params;
  const [time, setTime] = useState(0);

  const _youTubeRef = createRef();

  return (
    <TouchableWithoutFeedback
      onPress={() => {
        console.log('Clicou fora');
        navigation.goBack();
        clearTimeout(time);
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

          <YouTube
            ref={_youTubeRef}
            apiKey="AIzaSyCr8Jt-VYpfx-a7QE5GVl_FVPp8_MpjK4U"
            videoId={videoId}
            play={true}
            fullscreen={false} // control whether the video should play in fullscreen or inline
            controls={2}
            onReady={(e) => {
              setTime(setTimeout(() => navigation.goBack(), 30000));
            }}
            onError={(e) => console.log('ERRO', e.error)}
            style={{alignSelf: 'stretch', height: 220}}
          />
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
};

module.exports = Video;
