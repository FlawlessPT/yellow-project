// Styled Components
import styled from 'styled-components/native';

export const SafeArea = styled.SafeAreaView`
  flex: 1;
  background-color: ${({ theme }) => theme.colors.black};
`;

export const MainContainer = styled.View`
  flex-direction: column;
  flex: 1;
`;

export const LogoContainer = styled.View`
  justify-content: center;
  align-items: center;
  flex: 1;
`;

export const ContentContainer = styled.View`
  flex-direction: column;
  padding-horizontal: 20px;
  gap: 32px;
  margin-bottom: 20px;
`;

export const ButtonsContainer = styled.View`
  gap: 24px;
`;

export const SocialsLoginButtonsContainer = styled.View`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  gap: 16px;
`;

export const Logo = styled.Image`
  flex: 1;
`;
