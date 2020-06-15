import styled from 'styled-components/native';
import {Dimensions} from 'react-native';
import TextTicker from 'react-native-text-ticker';
import {gray2, gray3} from '../../utils/colors';

export const ContainerTreino = styled.View`
  flex-direction: row
  width: ${Dimensions.get('window').width + 10}px
  height: 95px
  background-color:${(props) => (props.num % 2 === 0 ? gray2 : gray3)}
  padding: 5px
`;

export const CardVideo = styled.View`
  width: 35%;
  height: 100%;
`;
export const CardInfo = styled.View`
  width: 70%;
`;

export const Label = styled.Text.attrs({numberOfLines: 1})`
  fontSize: 18px
  color:#fff
  fontStyle: italic
`;
export const Title = styled(TextTicker).attrs({
  duration: 7000,
  numberOfLines: 1,
})`
  width: 100%
  fontSize: 16px
  fontWeight: bold
  color:#fff
`;
export const Descript = styled.Text`
  width: 100%
  fontSize: 18px
  fontWeight: bold
  color:#fff
`;
