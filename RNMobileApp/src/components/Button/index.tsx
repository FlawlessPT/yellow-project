/* React and React Native */
import React from 'react';
import { StyleProp, ViewStyle } from 'react-native';

/* Components */
import { Label } from '@components';

/* Styles */
import { DefaultButton } from './styles';

/* Hooks */
import useTheme from '@hooks/theme/useTheme';

export interface ButtonProps {
  backgroundColor?: string;
  text?: string;
  hasBorder?: boolean;
  textColor?: string;
  borderColor?: string;
  isDisabled?: boolean;
  style?: StyleProp<ViewStyle>;
  onPressButton?: () => void;
}

const Button = ({
  backgroundColor,
  text,
  hasBorder,
  textColor,
  borderColor,
  isDisabled,
  style,
  onPressButton,
}: ButtonProps) => {
  const { theme } = useTheme();

  return (
    <DefaultButton
      style={style}
      backgroundColor={
        isDisabled
          ? theme.colors.disabled
          : hasBorder
          ? 'transparent'
          : backgroundColor || theme.colors.primary
      }
      hasBorder={hasBorder}
      borderColor={isDisabled ? 'transparent' : borderColor}
      disabled={isDisabled}
      onPress={onPressButton}>
      <Label
        type="h5"
        color={
          isDisabled ? theme.colors.white : textColor || theme.colors.white
        }
        text={text}
      />
    </DefaultButton>
  );
};

export default Button;
