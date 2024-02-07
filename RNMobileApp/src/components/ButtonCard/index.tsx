// React and React Native
import React from 'react';
import { StyleProp, ViewStyle } from 'react-native';

// Components
import { Label } from '@components';

// Assets
import { RightArrow } from '@assets';

// External Libs
import { Icon } from 'react-native-paper';

// Hooks
import useTheme from '@hooks/theme/useTheme';

// Styles
import { Card, Container, IconContainer } from './styles';

type ButtonCardProps = {
  label: string;
  icon: any;
  style?: StyleProp<ViewStyle>;
  onPress: () => void;
};

const ButtonCard = ({ label, icon, style, onPress }: ButtonCardProps) => {
  const { theme } = useTheme();

  return (
    <Card onPress={onPress} style={style}>
      <Container>
        <IconContainer>
          <Icon source={icon} size={24} />
        </IconContainer>
        <Label text={label} color={theme.colors.white} />
      </Container>
      <Icon source={RightArrow} size={6} />
    </Card>
  );
};

export default ButtonCard;
