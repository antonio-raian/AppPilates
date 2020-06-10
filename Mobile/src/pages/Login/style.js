import styled from 'styled-components/native';
import LinearGradient from 'react-native-linear-gradient';
import {primaryColor, gray} from '../../utils/colors';

/*
borderColor: #000
borderWidth: 2px
*/

export const Container = styled.View`
  width: 100%
  height: 100%
  justifyContent: center
  alignItems: center
`;

export const Form = styled.KeyboardAvoidingView.attrs({behavior: 'padding'})`
  paddingTop: 20px
  justifyContent: center;
  alignItems: center
  width: 70%;
`;

export const Background = styled.ImageBackground.attrs({
  source: require('../../Assets/images/fundo2.jpeg'),
})`
  flex: 1
  width: 100%
  height: 100%
  alignItems: center
`;

export const Input = styled.TextInput.attrs({
  placeholderTextColor: '#6b6b6b',
  autoCapitalize: 'none',
})`
  marginTop: 10px
  borderRadius: 50px
  background-color: #FFF
  borderColor: ${primaryColor}
  color: #6B6B6B
  width: 100%
  fontSize: 20px
  paddingHorizontal: 25px
`;

export const Logo = styled.Image.attrs({tintColor: '#fff'})`
  width: 225px
  height: 105px
`;
//Gambiarra
export const Space = styled.View`
  height: 24%;
`;
////////////////
export const Submit = styled.TouchableOpacity`
  marginTop: 10px
  marginBottom: 4                                             0px
  borderRadius: 50px
  background-color: ${gray}
  width: 100%
  `;

export const SubmitText = styled.Text`
  padding: 10px
  text-align: center;
  font-size: 20px;
  color: #FFF
`;

export const Link = styled.Text`
  background-color: #fff
  width: 55%
  height: 40px
  borderRadius: 50px
  padding: 7px
  text-align: center;
  color:#000
  font-size: 18px
`;
