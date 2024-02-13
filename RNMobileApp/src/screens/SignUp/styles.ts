// Styled Components
import styled from 'styled-components/native';

export const SafeArea = styled.SafeAreaView`
  background-color: ${({ theme }) => theme.colors.white};
  flex: 1;
`;

export const MainContainer = styled.View`
  flex: 1;
  background-color: ${({ theme }) => theme.colors.white};
  padding-horizontal: 20px;
  padding-bottom: 20px;
`;

export const ContentContainer = styled.View`
  padding-top: 8px;
`;

export const TextContainer = styled.View``;

export const InputsContainer = styled.View`
  gap: 24px;
`;

export const TermsContainer = styled.View`
  width: 100%;
  gap: 8px;
  flex-direction: row;
`;

export const FooterContainer = styled.View`
  gap: 32px;
`;
