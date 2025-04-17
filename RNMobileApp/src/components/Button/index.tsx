import React, { FunctionComponent, SVGAttributes } from 'react';
import { StyleProp, StyleSheet, TouchableOpacity, TouchableOpacityProps, View, ViewStyle } from 'react-native';

import { Icon } from 'react-native-paper';

import Label from '@components/Label';
import { LabelProps } from '@components/Label/types';

import useTheme from '@hooks/theme/useTheme';

import { Theme } from '@theme';

export type ButtonProps = {
  backgroundColor?: string;
  text?: string;
  hasBorder?: boolean;
  textColor?: string;
  borderColor?: string;
  isDisabled?: boolean;
  leftIcon?: FunctionComponent<SVGAttributes<SVGElement>>;
  rightIcon?: FunctionComponent<SVGAttributes<SVGElement>>;
  style?: StyleProp<ViewStyle>;
  onPressButton?: () => void;
} & LabelProps &
  TouchableOpacityProps;

const Button = ({
  backgroundColor,
  text,
  hasBorder = false,
  textColor,
  borderColor,
  isDisabled,
  leftIcon,
  rightIcon,
  style,
  onPressButton,
  ...props
}: ButtonProps) => {
  const { theme } = useTheme();

  const getButtonBackgroundColor = () => {
    if (isDisabled) {
      return theme.colors.disabled;
    } else if (hasBorder) {
      return 'transparent';
    } else {
      return backgroundColor ?? theme.colors.primary;
    }
  };

  const styles = getStyles(
    theme,
    getButtonBackgroundColor(),
    hasBorder,
    isDisabled ? 'transparent' : (borderColor ?? 'transparent'),
    !!leftIcon
  );

  return (
    <TouchableOpacity style={[styles.button, style]} disabled={isDisabled} onPress={onPressButton}>
      <View style={styles.container}>
        {leftIcon && <Icon source={leftIcon} size={20} />}
        <Label style={styles.label} color={textColor ?? theme.colors.neutral900} text={text} bold {...props} />
        {rightIcon && (
          <View style={styles.rightIcon}>
            <Icon source={rightIcon} size={20} />
          </View>
        )}
      </View>
    </TouchableOpacity>
  );
};

export default Button;

const getStyles = (
  theme: Theme,
  backgroundColor: string,
  hasBorder: boolean,
  borderColor: string,
  hasLeftIcon: boolean
) =>
  StyleSheet.create({
    button: {
      backgroundColor,
      borderWidth: hasBorder ? 3 : 0,
      borderColor,
      borderRadius: 42,
      height: 48,
      justifyContent: 'center',
      alignItems: 'center',
      // width: '100%',
      shadowOffset: { width: 0, height: 1 },
      shadowColor: theme.colors.black,
      shadowOpacity: 0.2,
      elevation: 4,
    },
    label: {
      marginLeft: hasLeftIcon ? 8 : 0,
    },
    container: {
      flexDirection: 'row',
      alignItems: 'center',
    },
    rightIcon: {
      marginLeft: 8,
    },
  });
