import styled from 'styled-components/native';

export const Container = styled.View`
  flex-direction: row;
  gap: 10;
  align-items: center;
`;

export const Line = styled.View`
  flex: 1;
  height: 1px;
  background-color: ${props => props.theme.colors.neutral.n300};
`;
