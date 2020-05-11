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
  height: ${(props) => (props.today ? '180px' : '90px')}
  padding: 7px
  justifyContent: center
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
  paddingLeft: 10px
  width: 100%
  height: 100%
  justifyContent: center
`;

export const ListButton = styled.TouchableOpacity`
  width: 100%
  height: 100%
  background-color: ${(props) =>
    props.past ? '#606060' : props.forward ? secondaryColor : primaryColor}
  justifyContent: center
  alignItems: center
  borderRadius: 50px
  padding: 10px
`;

export const HeadBackground = styled(LinearGradient).attrs({
  colors: [primaryColor, secondaryColor],
})`
  justifyContent: center
  height: 12%
  flexDirection: row
`;
export const BoxRight = styled.View`
  width: 40%
  borderRightColor: #fff
  borderRightWidth: 1px
`;
export const BoxLeft = styled.View`
width: 60%
height: 100%
flexDirection: row
`;

export const BoxTitle = styled.View`
  width: 75%
  paddingHorizontal: 10px
  height: 100%
  flexDirection: row
  alignItems:center
`;
export const BoxLogo = styled.View`
  width: 25%
  height: 100%
`;

export const TitleHeader = styled.Text`
  color: #fff
  width: 85%
  textAlign: center
  fontSize: 20px
  fontWeight: bold
`;

export const NameUser = styled.Text`
  color: #fff
  width: 90%
  textAlign: center
  paddingLeft: 5px
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
  width: 100%
  height: 55%
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

export const Loading = styled.ActivityIndicator.attrs({
  color: primaryColor,
  size: 100,
})``;
