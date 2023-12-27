import styled from 'styled-components/native';

export const SafeArea = styled.SafeAreaView`
  background-color: ${props => props.theme.colors.neutral.white};
  flex: 1;
`;

export const MainContainer = styled.View`
  background-color: ${props => props.theme.colors.neutral.white};
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

export const TextContainer = styled.View`
  gap: 12px;
  flex-direction: column;
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

export const logoStyle = {
  width: '80%',
  height: '80%',
};
