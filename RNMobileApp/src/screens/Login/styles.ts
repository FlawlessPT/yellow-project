// Styled Components
import { LabelButton } from '@components';
import styled from 'styled-components/native';

export const Container = styled.View`
  flex: 1;
`;

export const MainContainer = styled.View`
  flex-direction: column;
  flex: 1;
  justify-content: center;
`;

export const ContentContainer = styled.View`
  flex-direction: column;
  padding-horizontal: 20px;
  gap: 32px;
  margin-bottom: 20px;
`;

export const ForgotPassword = styled(LabelButton)`
  align-self: flex-end;
  margin-top: 8px;
`;

export const SignUp = styled(LabelButton)`
  align-self: center;
`;
