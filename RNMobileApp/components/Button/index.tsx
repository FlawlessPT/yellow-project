// React and React Native
import React from 'react';

// Styles
import { Container, DefaultButton, Label, shadowStyle } from './styles';

// External Libs
import { LinearGradient } from 'react-native-linear-gradient';
import DropShadow from 'react-native-drop-shadow';

// Theme
import theme from './../../theme';

export type ButtonType = 'normal' | 'outlined';

export interface ButtonProps {
  text: string;
  isDisabled?: boolean;
  typeButton?: ButtonType;
  onPressButton: () => void;
}

export const Button = ({
  text,
  isDisabled = false,
  typeButton = 'normal',
  onPressButton,
}: ButtonProps) => {
  return (
    <DropShadow style={shadowStyle}>
      <DefaultButton
        type={typeButton}
        disabled={isDisabled}
        activeOpacity={isDisabled ? 1 : 0.8}
        onPress={onPressButton}>
        <LinearGradient
          colors={
            isDisabled
              ? [theme.colors.neutral.n200, theme.colors.neutral.n200]
              : typeButton === 'outlined'
              ? theme.colors.gradients.secondary
              : theme.colors.gradients.primary
          }
          useAngle={true}
          angle={typeButton === 'outlined' ? 180 : 135}
          style={{ flex: 1 }}>
          <Container>
            <Label type={typeButton} disabled={isDisabled}>
              {text}
            </Label>
          </Container>
        </LinearGradient>
      </DefaultButton>
    </DropShadow>
  );
};

export default Button;
