// Styled Components
import styled from 'styled-components/native';

// External Libs
import Lottie from 'lottie-react-native';

// Components
import Label from '@components/Label';
import { LabelProps } from '@components/Label/types';

type DefaultButtonProps = {
  backgroundColor?: string;
  hasBorder?: boolean;
  borderColor?: string;
  hasLeftIcon?: boolean;
};

export const DefaultButton = styled.TouchableOpacity<DefaultButtonProps>`
  background-color: ${({ backgroundColor }) => backgroundColor};
  border: ${({ hasBorder, borderColor, theme }) =>
    hasBorder ? `3px solid ${borderColor || theme.colors.primary}` : '0px'};
  border-radius: 42px;
  height: 48px;
  justify-content: center;
  align-items: center;
  width: 100%;
  box-shadow: 0px 1px rgba(0, 0, 0, 0.2);
  shadow-color: ${({ theme }) => theme.colors.black};
  shadow-opacity: 0.2;
  elevation: 4;
`;

export const Loading = styled(Lottie)`
  width: 20px;
  height: 20px;
  align-self: center;
`;

export const Container = styled.View`
  flex-direction: row;
  align-items: center;
`;

export const ButtonLabel = styled(Label).attrs(
  (): LabelProps => ({
    type: 'h5',
  }),
)<DefaultButtonProps>`
  margin-left: ${({ hasLeftIcon }) => (hasLeftIcon ? 8 : 0)}px;
`;
