// React and React Native
import React from 'react';

// Styles
import { Container, DefaultButton, Label } from './styles';

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
    <DefaultButton
      type={typeButton}
      disabled={isDisabled}
      activeOpacity={isDisabled ? 1 : 0.8}
      onPress={onPressButton}>
      <Container>
        <Label type={typeButton} disabled={isDisabled}>
          {text}
        </Label>
      </Container>
    </DefaultButton>
  );
};

export default Button;
