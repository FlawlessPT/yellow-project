// Styled Components
import { styled } from 'styled-components/native';

// Components
import { ButtonProps } from '@components/Button';
import { LabelProps } from '@components/Label/types';
import { Button, ButtonCard, Label } from '@components';

export const Container = styled.ScrollView`
  flex: 1;
  padding: 16px;
  background-color: ${({ theme }) => theme.colors.background};
`;

export const Header = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  margin-top: 16px;
  margin-bottom: 24px;
`;

export const Title = styled(Label).attrs(
  ({ theme }): LabelProps => ({
    type: 'h2',
    color: theme.colors.neutral200,
  }),
)``;

export const DetailsContainer = styled.View`
  flex-direction: row;
  gap: 8px;
  justify-content: center;
`;

export const SettingsCard = styled(ButtonCard)`
  margin-top: 18px;
`;

export const ProfileImage = styled.Image`
  align-self: center;
  margin-bottom: 16px;
  border-radius: 62px;
  width: 124px;
  height: 124px;
`;

export const NameLabel = styled(Label).attrs(
  ({ theme }): LabelProps => ({
    type: 'h4',
    color: theme.colors.neutral300,
    semibold: true,
    textAlign: 'center',
  }),
)`
  margin-bottom: 8px;
`;

export const EmailLabel = styled(Label).attrs(
  ({ theme }): LabelProps => ({
    type: 'footnote',
    color: theme.colors.neutral300,
    textAlign: 'center',
  }),
)`
  margin-bottom: 32px;
`;

export const LogoutButton = styled(Button).attrs(
  ({ theme }): ButtonProps => ({
    hasBorder: true,
    borderColor: theme.colors.disabled,
    textColor: theme.colors.disabled,
  }),
)`
  margin-top: 18px;
  margin-bottom: 28px;
`;
