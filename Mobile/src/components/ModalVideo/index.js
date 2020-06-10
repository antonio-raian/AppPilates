import React, {useState} from 'react';
import {
  Modal,
  ActivityIndicator,
  View,
  TouchableWithoutFeedback,
} from 'react-native';
import WebView from 'react-native-webview';
import Icon from 'react-native-vector-icons/FontAwesome5';

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

          <WebView
            containerStyle={{flex: 0, height: 210}}
            source={{uri: `https://www.youtube.com/embed/${videoId}`}}
          />
        </View>
      </Modal>
    </TouchableWithoutFeedback>
  );
};

export default ModalVideo;
