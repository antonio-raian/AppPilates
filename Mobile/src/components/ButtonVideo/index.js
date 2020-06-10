import React from 'react';
import {Button} from './style';
import {ImageBackground} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';

const ButtonVideo = (props) => {
  const {openVideo, videoId} = props;
  return (
    <Button onPress={() => openVideo(true)}>
      <ImageBackground
        source={{
          uri: `https://i.ytimg.com/vi/${videoId}/hqdefault.jpg`,
        }}
        style={{
          width: '95%',
          height: '100%',
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <Icon name="play" size={30} color="#000" style={{opacity: 0.6}} />
      </ImageBackground>
    </Button>
  );
};

export default ButtonVideo;
