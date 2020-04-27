import React, {useCallback} from 'react';
import {Linking, Alert} from 'react-native';
import {Container, ButtonVideo, Title, IconContainer} from './style';
import Icon from 'react-native-vector-icons/FontAwesome5';

const ButtonLinking = ({url, label}) => {
  const handlePress = useCallback(async () => {
    const supported = await Linking.canOpenURL(url);

    if (supported) {
      await Linking.openURL(url);
    } else {
      Alert.alert(`Não foi possível abrir essa URL: ${url}`);
    }
  }, [url]);

  return (
    <Container>
      <ButtonVideo onPress={handlePress}>
        <IconContainer>
          <Icon name="play" color="#fff" />
        </IconContainer>
        <Title>{label}</Title>
      </ButtonVideo>
    </Container>
  );
};

export default ButtonLinking;
