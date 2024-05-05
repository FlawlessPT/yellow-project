// React and React Native
import React, { useState } from 'react';
import { StyleSheet, TextInputProps, TextInput, View, StyleProp, ViewStyle, TextStyle } from 'react-native';

// Theme
import { Theme } from '@theme';

// Components
import { Label } from '../Label';

// Types
import { HelperType } from './types';

// Hooks
import useTheme from '@hooks/theme/useTheme';

// External Libs
import { useTranslation } from 'react-i18next';
import Icon from 'react-native-vector-icons/FontAwesome6';

export type InputProps = {
  style?: StyleProp<ViewStyle>;
  label?: string;
  titleColor?: string;
  helper?: { type: HelperType; message: string };
  leftIconName?: string;
  right?: JSX.Element;
  textStyle?: StyleProp<TextStyle>;
} & TextInputProps;

export const Input = ({
  style,
  label,
  titleColor,
  leftIconName,
  right,
  helper,
  textStyle,
  placeholder,
  ...props
}: InputProps) => {
  const { t } = useTranslation();
  const { theme } = useTheme();

  const [value, setValue] = useState<string>('');
  const [isSelected, setIsSelected] = useState<boolean>(false);

  const outlinedColor =
    helper?.type === 'error'
      ? theme.colors.red
      : helper?.type === 'success'
      ? theme.colors.green
      : isSelected
      ? theme.colors.primary
      : 'transparent';

  const styles = getStyles(theme, props.multiline ?? false, outlinedColor);

  const handleFocused = (newState: boolean) => {
    setIsSelected(newState);
  };

  return (
    <View style={style}>
      {label && <Label text={label} type="h3" semibold color={titleColor || theme.colors.white} style={styles.label} />}
      <View style={[styles.container, style]}>
        {leftIconName && <Icon name={leftIconName} color="white" style={styles.leftIcon} size={16} />}
        <TextInput
          value={value}
          onChangeText={setValue}
          cursorColor={theme.colors.primary}
          onFocus={() => handleFocused(true)}
          onBlur={() => handleFocused(false)}
          style={[styles.input, textStyle]}
          selectionColor={theme.colors.primary}
          placeholderTextColor={theme.colors.neutral400}
          placeholder={t(placeholder ?? '')}
          {...props}
        />
        {right && <View style={styles.rightIcon}>{right}</View>}
      </View>
      {helper?.message && (
        <View style={styles.helperContainer}>
          <Icon
            name={helper.type === 'error' ? 'triangle-exclamation' : 'check'}
            color={helper.type === 'error' ? theme.colors.red : theme.colors.green}
            size={14}
          />
          <Label
            text={helper.message}
            type="footnote"
            semibold
            color={helper.type === 'error' ? theme.colors.red : theme.colors.green}
            style={styles.helperLabel}
          />
        </View>
      )}
    </View>
  );
};

export default Input;

const getStyles = (theme: Theme, isMultiline: boolean, outlinedColor: string) =>
  StyleSheet.create({
    helperContainer: {
      flexDirection: 'row',
      marginTop: 5,
      alignItems: 'center',
    },
    helperLabel: {
      marginLeft: 6,
    },
    input: {
      height: 54,
      flex: 1,
      fontFamily: theme.fonts.regular,
      fontSize: 16,
      color: theme.colors.white,
    },
    rightIcon: {
      marginLeft: 8,
    },
    leftIcon: {
      marginRight: 8,
    },
    container: {
      borderWidth: 1,
      borderColor: outlinedColor,
      alignItems: isMultiline ? 'flex-start' : 'center',
      flexDirection: 'row',
      paddingHorizontal: 16,
      borderRadius: 12,
      backgroundColor: theme.colors.input_background,
    },
    label: {
      marginBottom: 8,
    },
  });
