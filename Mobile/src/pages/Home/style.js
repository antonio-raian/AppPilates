import styled from 'styled-components/native';
import LinearGradient from 'react-native-linear-gradient';
import Icon from 'react-native-vector-icons/FontAwesome5';
import {
  secondaryColor,
  primaryColor,
  gray,
  gray2,
  gray3,
} from '../../utils/colors';

/*
borderColor: #000
borderWidth: 3px
*/

export const Container = styled.View`
  background-color: ${gray2}
  flex: 1
  alignItems: center
`;

export const ContainerButtons = styled.View`
  width: 100%
  height: ${(props) => (props.today ? '95px' : '90px')}
  background-color:${(props) => (props.num % 2 === 0 ? gray2 : gray3)}
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
  width: 600px
  height: 100%
  borderColor: ${primaryColor}
  flexDirection: row
  justifyContent: center
  alignItems: center
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
  width: 35%
  borderRightColor: #fff
  borderRightWidth: 1px
`;
export const BoxLeft = styled.View`
  width: 60%
  height: 100%
  flexDirection: row
`;

export const BoxTitle = styled.View`
  width: 70%
  paddingHorizontal: 10px
  height: 100%
  flexDirection: row
  alignItems:center
`;
export const BoxLogo = styled.View`
  width: 30%
  height: 100%
  alignItems: flex-end
  justify-content: center
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

export const RightArrows = styled(Icon).attrs({
  name: 'angle-double-right',
  size: 20,
})`
  padding-left: 70px
  color: ${(props) => (props.today ? primaryColor : gray)};
`;

export const Divider = styled.View`
background-color:${(props) => (props.today ? primaryColor : gray)}
width: 600px
height: 3px
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
  width: 30px
  height: 50px
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
  font-size: 20px
  padding: 10px
  justifyContent: center
  alignItems: center
  color: ${(props) => (props.today ? primaryColor : gray)}
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
