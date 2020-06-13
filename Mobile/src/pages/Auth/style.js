import styled from 'styled-components/native';
import LinearGradient from 'react-native-linear-gradient';
import {white} from '../../utils/colors';

/*
borderColor: '#000',
borderWidth: 10,
*/

export const Container = styled(LinearGradient).attrs({
  colors: ['#FFF', '#d3d3d3'],
  start: {x: 0, y: 0},
  end: {x: 1, y: 3.5},
})`
  flex:1
  justifyContent: center;
  alignItems: center
`;
export const Background = styled.ImageBackground`
  flex: 1
  width: 110%
  justifyContent: center
  opacity: 100
  alignItems: center
`;

export const Loading = styled.ActivityIndicator.attrs({
  color: white,
  size: 100,
})``;
