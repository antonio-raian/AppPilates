import styled from 'styled-components/native';
import LinearGradient from 'react-native-linear-gradient';

/*
borderColor: #000
borderWidth: 3px
*/

export const primaryColor = '#DF3B4F';
export const secondaryColor = '#E55238';

export const Container = styled.ImageBackground.attrs({
  source: require('../../Assets/BackHome.jpg'),
  imageStyle: {width: '100%', height: '100%'},
})`
  flex: 1
  alignItems: center
`;

export const ContainerButtons = styled.View`
  width: 370px
  height: 90px
  padding: 7px
  justify-content: center
  alignItems: center
`;

export const Center = styled.View`
  padding: 8px
  width: 100%
  alignItems: center
  justifyContent: center
`;

export const Scrolled = styled.ScrollView.attrs({
  alignItems: 'center',
  showsVerticalScrollIndicator: false,
})`
  width: 100%;
`;

export const MenuButton = styled.TouchableOpacity`
  flexDirection: row
  alignItems: center
  width: 65%
  height: 100%
  justifyContent: center
  borderColor: #000
  borderWidth: 3px
`;

export const ListButton = styled.TouchableOpacity`
  width: ${(props) => (props.today ? '100%' : '85%')}
  background-color: ${(props) =>
    props.past ? '#606060' : props.forward ? secondaryColor : primaryColor}
  justifyContent: center
  alignItems: center
  borderRadius: 50px
  padding: 10px;
`;

export const Background = styled(LinearGradient).attrs({
  colors: [primaryColor, secondaryColor],
})`
  flexDirection: row
  alignItems: center
  height: 7%
`;

export const TitleHeader = styled.Text`
  color: #fff
  borderColor: #000
  borderWidth: 3px
  width: 50%
  textAlign: center
  fontSize: 20px
  fontWeight: bold
`;

export const NameUser = styled.Text`
  color: #fff
  width: 100%
  borderColor: #000
  borderWidth: 3px
`;

export const Lista = styled.View`
  width: 100%
  paddingTop: 5px
`;

export const ContentItem = styled.View`
  width: 100%;
`;

export const Button = styled.TouchableOpacity`
  padding: 10px
  width: 70%
  height: 60px
  alignItems: center
  justifyContent: center
  borderRadius: 50px
  background-color: #99FF99
`;

export const LabelButtonInit = styled.Text`
  color: #666633
  fontSize: 20px
  fontWeight: bold
  fontFamily: calibre
`;

export const Logo = styled.Image.attrs({tintColor: '#fff'})`
  width: 20%
  height: 100%
`;

//Renderização do conteudo do acordion
export const Child = styled.View`
  paddingVertical: 15px
  width: 100%
  background-color: #fff
  justifyContent: center
  alignItems: center
  borderRadius: 20px
  elevation: 5
`;

export const Title = styled.Text`
  font-size: 25px
  padding: 10px
  justifyContent: center
  alignItems: center
  color: #fff
`;

export const SubTitle = styled.Text`
  paddingHorizontal: 10px
  fontSize: 15px
  fontWeight: bold
`;

export const Content = styled.Text`
  paddingHorizontal: 10px
  fontSize: 15px
`;
