// Styled Components
import styled from 'styled-components/native';

export const Container = styled.View`
  flex: 1;
  background-color: ${({ theme }) => theme.colors.neutral900};
  padding-horizontal: 20px;
  padding-vertical: 40px;
`;

export const ContentContainer = styled.View`
  padding-top: 8px;
`;

export const InputsContainer = styled.View`
  gap: 24px;
`;

export const FooterContainer = styled.View`
  gap: 32px;
`;
