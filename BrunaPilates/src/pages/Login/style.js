import styled from 'styled-components/native';
import LinearGradient from 'react-native-linear-gradient';

/*
borderColor: #000
borderWidth: 2px
*/

const primaryColor = '#DA155D';
const secondaryColor = '#a9a9a9';

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
  width: 100%;
`;

export const Background = styled.ImageBackground.attrs({
  source: require('../../Assets/background.jpg'),
})`
  flex: 1
  width: 100%
  height: 100%
  alignItems: center
`;

export const Input = styled.TextInput.attrs({
  placeholderTextColor: '#6b6b6b',
})`
  marginTop: 10px
  borderRadius: 50px
  background-color: #FFF
  borderColor: ${primaryColor}
  color: #6B6B6B
  width: 90%
  fontSize: 20px
  paddingHorizontal: 25px
`;

export const Logo = styled.Image.attrs({tintColor: '#fff'})`
  width: 55%
  height: 22%
  padding: 50px
`;
//Gambiarra
export const Space = styled.View`
  height: 24%;
`;
////////////////
export const Submit = styled.TouchableOpacity`
  marginTop: 10px
  borderRadius: 50px
  background-color: ${secondaryColor}
  width: 90%
  `;

export const SubmitText = styled.Text`
  padding: 10px
  text-align: center;
  font-size: 20px;
  color: #FFF
`;
