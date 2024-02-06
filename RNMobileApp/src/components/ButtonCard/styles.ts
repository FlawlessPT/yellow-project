// Styled Components
import styled from 'styled-components/native';

export const Card = styled.TouchableOpacity`
  height: 64px;
  border-radius: 18px;
  background-color: ${({ theme }) => theme.colors.neutral800};
  flex-direction: row;
  justify-content: space-between;
  padding-left: 8px;
  padding-right: 20px;
  align-items: center;
`;

export const Container = styled.View`
  flex-direction: row;
  align-items: center;
`;

export const IconContainer = styled.View`
  background-color: ${({ theme }) => theme.colors.neutral700};
  width: 48px;
  height: 48px;
  border-radius: 8px;
  margin-right: 24px;
  align-items: center;
  justify-content: center;
`;
