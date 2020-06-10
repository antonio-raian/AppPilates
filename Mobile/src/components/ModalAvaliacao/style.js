import styled from 'styled-components/native';
import {Dimensions} from 'react-native';
import {gray2, gray3} from '../../utils/colors';

export const Container = styled.View`
  flex: 1
  backgroundColor: rgba(255, 255, 255, 0.85)
  backfaceVisibility: hidden
  justifyContent: center
  alignItems: center
  padding: 10px
  `;

export const Paper = styled.View`
  width: 95%
  backgroundColor: #fff
  justifyContent: center
  alignItems: center
  borderColor: #DF3B4F
  borderWidth: 1px
  borderRadius: 20px
`;

export const BtnCancel = styled.TouchableOpacity`
  width: 40%
  height: 100%
  justifyContent: center
  alignItems: center
  marginHorizontal: 18px
  backgroundColor: #bbb
  borderRadius: 20px
`;

export const BtnSave = styled.TouchableOpacity`
  width: 40%
  height: 100%
  justifyContent: center
  alignItems: center
  marginHorizontal: 18px
  backgroundColor: #99FF99
  borderRadius: 20px
`;
