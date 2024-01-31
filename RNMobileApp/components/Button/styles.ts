/* Styled Components */
import styled from 'styled-components/native';

/* External Libs */
import Lottie from 'lottie-react-native';

interface DefaultButtonProps {
  backgroundColor?: string;
  hasBorder?: boolean;
  borderColor?: string;
}

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
