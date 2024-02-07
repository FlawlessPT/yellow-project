// React and React Native
import React, { FunctionComponent, SVGAttributes } from 'react';
import { StyleProp, ViewStyle } from 'react-native';

// Components
import { Label } from '@components';

// External Libs
import { Icon } from 'react-native-paper';

// Hooks
import useTheme from '@hooks/theme/useTheme';

// Styles
import { ButtonLabel, Container, DefaultButton } from './styles';

export type ButtonProps = {
  backgroundColor?: string;
  text?: string;
  hasBorder?: boolean;
  textColor?: string;
  borderColor?: string;
  isDisabled?: boolean;
  leftIcon?: FunctionComponent<SVGAttributes<SVGElement>>;
  style?: StyleProp<ViewStyle>;
  onPressButton?: () => void;
};

const Button = ({
  backgroundColor,
  text,
  hasBorder,
  textColor,
  borderColor,
  isDisabled,
  leftIcon,
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
      <Container>
        {leftIcon && <Icon source={leftIcon} size={20} />}
        <ButtonLabel
          color={
            isDisabled ? theme.colors.white : textColor || theme.colors.white
          }
          text={text}
          hasLeftIcon={!!leftIcon}
        />
      </Container>
    </DefaultButton>
  );
};

export default Button;
