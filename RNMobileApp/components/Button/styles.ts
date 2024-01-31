// Styled Components
import styled from 'styled-components/native';

// Types
import { ButtonType } from '.';

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
  border: ${({ type }) => (type === 'outlined' ? '3px' : '0px')};
  background-color: ${({ theme, type, disabled }) =>
    disabled
      ? theme.colors.disabled
      : type === 'normal'
      ? theme.colors.primary
      : 'transparent'};
`;

export const Container = styled.View`
  flex: 1;
  padding: 0px 16px;
  justify-content: center;
  align-items: center;
`;

export const Label = styled.Text<DefaultButtonProps>`
  font-family: Inter-Regular;
  font-size: 16px;
  font-style: normal;
  font-weight: 400;
`;
