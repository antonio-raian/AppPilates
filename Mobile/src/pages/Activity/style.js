import styled from 'styled-components/native';
import LinearGradient from 'react-native-linear-gradient';
import {Dimensions} from 'react-native';
import {primaryColor, secondaryColor} from '../../utils/colors';

/*
borderColor: #000
borderWidth: 3px
*/

export const Container = styled.ImageBackground.attrs({
  source: require('../../Assets/images/BackHome.jpg'),
  imageStyle: {width: '100%', height: '100%'},
})`
  flex: 1
  alignItems: center
`;

export const Background = styled(LinearGradient).attrs({
  colors: [primaryColor, secondaryColor],
})`
  alignItems: center
  height: 20%
  width: 100%
`;

export const BoxIcon = styled.View`
  flex-direction: row
  width: 90%
`;
export const BoxTitle = styled.View`
  width: 100%
 justifyContent: center
`;
export const BoxLogo = styled.View`
width: 30%
height: 100%
alignItems: flex-end
`;

export const TitleHeader = styled.Text`
  color: #fff
  width: 100%
  paddingHorizontal: 20px
  fontSize: 30px
  fontWeight: bold
`;

export const SubTitleHeader = styled.Text`
color: #fff
width: 100%
fontSize: 20px
paddingHorizontal: 20px
fontWeight: bold
`;

export const Logo = styled.Image.attrs({tintColor: '#fff'})`
  width: 38%
  height: 100%
`;

export const Scrolled = styled.ScrollView.attrs({
  alignItems: 'center',
  showsVerticalScrollIndicator: false,
})`
  width: 100%;
`;
export const Lista = styled.View`
  width: 100%
  paddingTop: 5px
  paddingBottom: 5px
`;
export const ContainerTreino = styled.View`
  width: ${(Dimensions.get('window').width * 90) / 100}px
  backgroundColor: #fff
  padding: 5px
  borderRadius: 10px
`;

export const Label = styled.Text`
  fontSize: 20px
  fontWeight: bold
`;
export const Title = styled.Text`
  textAlign: center
  fontSize: 30px
  fontWeight: bold
`;
export const Descript = styled.Text`
  width: 100%
  paddingHorizontal: 15px
  paddingBottom: 15px
  textAlign: justify
  fontSize: 15px
`;
export const Instuctions = styled.Text` 
  textAlign: center
  fontSize: 15px
  fontWeight: bold
`;

//Botão finalizar
export const BoxBtnEnd = styled.View`
  width: 100%
  height: 12%
  alignItems: center
`;

export const ButtonEnd = styled.TouchableOpacity`
  padding: 10px
  width: 95%
  height: 100%
  alignItems: center
  justifyContent: center
  borderRadius: 50px
  background-color: #99FF99
`;

export const LabelBtnEnd = styled.Text`
  textAlign: center
  fontSize: 25px
  fontWeight: bold
`;

//Botão Voltar
export const BoxBtnBack = styled.View`
  width: 100%
  height: 25%
  flexDirection: row
`;
export const ButtonBack = styled.TouchableOpacity`
  width: 70%
  justifyContent: center
  alignItems: center
  flexDirection: row
`;

export const LabelBtnBack = styled.Text`
  width: 85%
  color: #fff
  fontWeight: bold
  fontSize: 20px
`;
