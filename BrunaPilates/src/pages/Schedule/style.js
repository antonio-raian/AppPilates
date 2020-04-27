import styled from 'styled-components/native';
import LinearGradient from 'react-native-linear-gradient';

/*
borderColor: '#000',
borderWidth: 10,
*/

export const primaryColor = '#DF3B4F';
export const secondaryColor = '#FFFFFF';

export const Container = styled.ImageBackground.attrs({
  source: require('../../Assets/BackAgenda.jpg'),
  imageStyle: {width: '100%', height: '100%'},
})`
  flex: 1
  alignItems: center
`;

export const MenuButton = styled.TouchableOpacity`
  height: 6.5%
  padding: 15px
  alignItems: center
  justifyContent: center
`;

export const Head = styled.View`
  background-color: ${primaryColor}
  flexDirection: row
  alignItems: center
  height: 60px
`;

export const TitleHeader = styled.Text`
  color: #fff
  width: 75%
  textAlign: center
  fontSize: 20px
`;

export const CalendarBox = styled.View`
  paddingVertical: 25px
  width: 95%
  height: 50%
`;
