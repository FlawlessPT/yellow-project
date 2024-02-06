// React and React Native
import React from 'react';

// Components
import { Label } from '@components';

// Assets
import { Notifications } from '@assets';

// External Libs
import { Icon } from 'react-native-paper';

// Hooks
import useTheme from '@hooks/theme/useTheme';

// Styles
import { Card, Container, IconContainer } from './styles';

type ButtonCardProps = {
  text: string;
  icon: string;
  onPress: () => void;
};

const ButtonCard = ({ text, icon, onPress }: ButtonCardProps) => {
  const { theme } = useTheme();

  return (
    <Card onPress={onPress}>
      <Container>
        <IconContainer>
          <Icon source={Notifications} size={24} />
        </IconContainer>
        <Label text={text} color={theme.colors.white} />
      </Container>
      <Icon source={icon} size={6} />
    </Card>
  );
};

export default ButtonCard;
