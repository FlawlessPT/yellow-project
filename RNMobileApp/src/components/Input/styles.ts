// Styled Components
import styled from 'styled-components/native';

// Components
import Label from '@components/Label';

// External Libs
import { TextInput } from 'react-native-paper';

type DefaultInputProps = {
  isDisabled: boolean;
};

export const HelperContainer = styled.View`
  flex-direction: row;
  margin-top: 8px;
`;

export const DefaultInput = styled(TextInput).attrs<DefaultInputProps>(() => ({
  outlineStyle: { borderRadius: 10 },
}))<DefaultInputProps>`
  width: 100%;
  background-color: ${({ theme, isDisabled }) =>
    isDisabled ? theme.colors.disabled : theme.colors.white};
`;

export const HelperLabel = styled(Label)`
  margin-left: 4px;
`;
