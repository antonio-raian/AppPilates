import React from 'react';
import {View} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';
import YouTube from 'react-native-youtube';

const Video = ({route}) => {
  const {videoId} = route.params;
  return (
    <View
      style={{
        flex: 1,
        justifyContent: 'center',
        backgroundColor: '#000',
        backgroundColor: '#00000050',
      }}>
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
        style={{alignSelf: 'stretch', height: 210}}
      />
    </View>
  );
};

module.exports = Video;
