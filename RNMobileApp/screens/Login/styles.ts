import styled from 'styled-components/native';

export const SafeArea = styled.SafeAreaView`
  flex: 1;
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

export const TextContainer = styled.View`
  gap: 12px;
  flex-direction: column;
`;

export const InputsContainer = styled.View`
  gap: 24px;
`;

export const InputsBottomContainer = styled.View`
  flex-direction: row;
  align-items: center;
`;

export const RememberMeContainer = styled.View`
  width: 50%;
  flex-direction: row;
  align-items: center;
  display: flex;
  gap: 8px;
`;

export const ForgotPasswordContainer = styled.View`
  width: 50%;
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
