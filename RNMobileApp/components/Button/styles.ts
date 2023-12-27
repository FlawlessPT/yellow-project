import styled from 'styled-components/native';
import {ButtonType} from '.';
import {Platform} from 'react-native';
import theme from '../../theme';

interface DefaultButtonProps {
  type?: ButtonType;
  disabled?: boolean;
}

export const DefaultButton = styled.TouchableOpacity<DefaultButtonProps>`
  display: flex;
  height: 50px;
  border-radius: 42px;
  position: relative;
  overflow: hidden;
  border: ${({type}) => (type === 'outlined' ? '3px' : '0px')};
  border-color: ${theme.colors.primary.p500};
`;

export const Container = styled.View`
  flex: 1;
  padding: 0px 16px;
  justify-content: center;
  align-items: center;
`;

export const Label = styled.Text<DefaultButtonProps>`
  color: ${({type, disabled}) =>
    disabled
      ? theme.colors.neutral.n100
      : type === 'outlined'
      ? theme.colors.primary.p300
      : theme.colors.neutral.n100};
  font-family: Inter-Regular;
  font-size: 16px;
  font-style: normal;
  font-weight: 400;
`;

export const shadowStyle = {
  shadowColor: 'rgba(0, 0, 0, 0.20)',
  shadowOffset: {
    width: 0,
    height: 0,
  },
  shadowOpacity: Platform.OS === 'ios' ? 1 : 0.5,
  shadowRadius: 5,
};
