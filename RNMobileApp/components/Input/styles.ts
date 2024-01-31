import styled from 'styled-components/native';

export const MainContainer = styled.View`
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

export const ErrorContainer = styled.View`
  display: flex;
  flex-direction: row;
  align-items: center;
  height: 20px;
  padding-left: 8px;
`;

export const errorLabelStyle = {
  paddingLeft: 4,
  paddingTop: 0,
};

export const textInputStyle = {
  height: 44,
  fontFamily: 'Poppins-Regular',
  justifyContent: 'center',
};

export const PasswordInputDetailsContainer = styled.View`
  display: flex;
  flex-direction: column;
  gap: 4px;
  margin-horizontal: 8px;
`;

export const passwordProgressStyle = {
  height: 9,
  borderRadius: 5,
};

export const PasswordRulesContainer = styled.View`
  display: flex;
  flex-direction: column;
  gap: 4px;
  margin-horizontal: 4px;
`;
