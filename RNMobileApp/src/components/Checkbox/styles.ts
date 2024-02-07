// Styled Components
import styled from 'styled-components/native';

// External Libs
import { Icon } from 'react-native-paper';

type CheckboxStyledProps = {
  bgColor?: string;
  borderColor?: string;
  borderWidth?: number;
  reverseOrder?: boolean;
  iconColor?: string;
};

export const Container = styled.View<CheckboxStyledProps>`
  flex-direction: ${({ reverseOrder }) =>
    reverseOrder ? 'row-reverse' : 'row'};
  align-items: center;
`;

export const CheckboxContainer = styled.Pressable<CheckboxStyledProps>`
  height: 19px;
  width: 19px;
  background-color: ${({ bgColor }) => bgColor};
  border: ${({ borderColor, borderWidth }) =>
    borderWidth && `${borderWidth}px solid ${borderColor}`};
  border-radius: 2px;
  margin-right: ${({ reverseOrder }) => (reverseOrder ? 0 : '8px')};
  margin-left: ${({ reverseOrder }) => (reverseOrder ? '8px' : 0)};
`;

export const ActiveCheckboxContainer = styled.Pressable<CheckboxStyledProps>`
  height: 19px;
  width: 19px;
  justify-content: center;
  align-items: center;
  background-color: ${({ theme }) => theme.colors.primary};
  border-radius: 2px;
  border: 0;
  margin-right: ${({ reverseOrder }) => (reverseOrder ? 0 : '8px')};
  margin-left: ${({ reverseOrder }) => (reverseOrder ? '8px' : 0)};
`;

export const CheckedIcon = styled(Icon)<CheckboxStyledProps>`
  tint-color: ${({ iconColor }) => iconColor};
`;

export const RightElementContainer = styled.Pressable<CheckboxStyledProps>`
  flex: 1;
`;
