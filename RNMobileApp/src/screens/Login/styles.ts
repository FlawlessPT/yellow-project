// Styled Components
import styled from 'styled-components/native';

// Components
import { Button, LabelButton } from '@components';

export const Container = styled.View`
  flex: 1;
`;

export const MainContainer = styled.View`
  flex: 1;
  justify-content: center;
`;

export const ContentContainer = styled.View`
  padding-horizontal: 20px;
  gap: 32px;
`;

export const ForgotPassword = styled(LabelButton)`
  align-self: flex-end;
  margin-top: 8px;
`;

export const SignUp = styled(LabelButton)`
  align-self: center;
`;

export const SignIn = styled(Button)`
  margin-top: 30px;
`;
