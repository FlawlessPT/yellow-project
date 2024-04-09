// React and React Native
import React from 'react';
import { StyleSheet, TextInputProps, View } from 'react-native';

// Components
import { Label } from '@components';

// Types
import { HelperType } from './types';

// Assets
import { Error, Success } from '@assets';

// Theme
import useTheme from '@hooks/theme/useTheme';

// External Libs
import { Icon, TextInput } from 'react-native-paper';

export type InputProps = {
  label?: string;
  disabled?: boolean;
  textColor?: string;
  leftItem?: React.ReactNode;
  rightItem?: React.ReactNode;
  helper?: { type: HelperType; message: string };
} & TextInputProps;

export const Input = ({
  label,
  textColor,
  leftItem,
  rightItem,
  disabled,
  helper,
  ...props
}: InputProps) => {
  const { theme } = useTheme();

  const styles = getStyles(
    disabled ? theme.colors.disabled : theme.colors.white,
  );

  const outlinedColor =
    helper?.type === 'error'
      ? theme.colors.red
      : helper?.type === 'success'
      ? theme.colors.green
      : theme.colors.outline;

  return (
    <>
      {/* eslint-disable-next-line @typescript-eslint/ban-ts-comment */}
      {/* @ts-ignore */}
      <TextInput
        mode="outlined"
        disabled={disabled}
        label={
          <Label
            text={label}
            semibold
            color={textColor || theme.colors.outline}
          />
        }
        outlineColor={outlinedColor}
        activeOutlineColor={theme.colors.primary}
        left={leftItem}
        right={rightItem}
        allowFontScaling={false}
        selectionColor={theme.colors.primary}
        caretHidden={false}
        outlineStyle={styles.outline}
        {...props}
      />
      {helper && (
        <View style={styles.helperContainer}>
          <Icon source={helper.type === 'error' ? Error : Success} size={14} />
          <Label
            text={helper.message}
            semibold
            type="footnote"
            color={
              helper.type === 'error' ? theme.colors.red : theme.colors.green
            }
            style={styles.helperLabel}
          />
        </View>
      )}
    </>
  );
};

export default Input;

const getStyles = (inputBgColor: string) =>
  StyleSheet.create({
    helperContainer: {
      flexDirection: 'row',
      marginTop: 5,
    },
    helperLabel: {
      marginLeft: 4,
    },
    input: {
      width: '100%',
      backgroundColor: inputBgColor,
    },
    outline: {
      borderRadius: 10,
    },
  });
