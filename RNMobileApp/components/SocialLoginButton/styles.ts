import styled from 'styled-components/native';

export const Button = styled.TouchableOpacity`
  display: flex;
  height: 48px;
  width: 48px;
  justify-content: center;
  align-items: center;
  border-radius: 64px;
  border: 1px;
  border-color: ${props => props.theme.colors.neutral.n200};
  background-color: ${props => props.theme.colors.neutral.white};
`;
