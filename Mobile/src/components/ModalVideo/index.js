import React, {useState} from 'react';
import {
  Modal,
  ActivityIndicator,
  View,
  TouchableWithoutFeedback,
} from 'react-native';
import WebView from 'react-native-webview';
import Icon from 'react-native-vector-icons/FontAwesome5';
import YouTube from 'react-native-youtube';

const ModalVideo = (props) => {
  const {animationType, transparent, visible, onClose, videoId} = props;

  return (
    <TouchableWithoutFeedback onPress={onClose} style={{height: '100%'}}>
      <Modal
        animationType={animationType}
        transparent={transparent}
        visible={visible}
        onRequestClose={onClose}>
        <View
          style={{
            justifyContent: 'center',
            marginTop: 150,
            backgroundColor: '#000',
          }}>
          <View style={{alignItems: 'flex-end', marginHorizontal: 20}}>
            <Icon onPress={onClose} name="times" size={30} color="#fff" />
          </View>
          {/* <WebView
            containerStyle={{flex: 0, height: 210}}
            source={{uri: `https://www.youtube.com/embed/${videoId}`}}
          /> */}
          <YouTube
            apiKey="AIzaSyCr8Jt-VYpfx-a7QE5GVl_FVPp8_MpjK4U"
            videoId={videoId}
            play={true}
            fullscreen={false} // control whether the video should play in fullscreen or inline
            loop={true} // control whether the video should loop when ended
            controls={0}
            onReady={(e) => console.log('READY', e)}
            onChangeState={(e) => console.log('State', e)}
            onChangeQuality={(e) => console.log('QUALIDADE', e)}
            onError={(e) => console.log('ERRO', e.error)}
            style={{alignSelf: 'stretch', height: 300}}
          />
        </View>
      </Modal>
    </TouchableWithoutFeedback>
  );
};

export default ModalVideo;
