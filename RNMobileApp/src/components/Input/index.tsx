// React and React Native
import React, { MutableRefObject } from 'react';
import { TextInput, TextInputProps } from 'react-native';

// Components
import { Label } from '@components';

// Types
import { HelperType } from './types';

// Assets
import { Error, Success } from '@assets';

// External Libs
import { Icon } from 'react-native-paper';

// Theme
import useTheme from '@hooks/theme/useTheme';

// Styles
import { DefaultInput, HelperContainer, HelperLabel } from './styles';

export type InputProps = {
  ref?: MutableRefObject<TextInput | undefined>;
  label?: string;
  disabled?: boolean;
  textColor?: string;
  leftItem?: React.ReactNode;
  rightItem?: React.ReactNode;
  helper?: { type: HelperType; message: string };
};

export const Input = ({
  ref,
  label,
  textColor,
  leftItem,
  rightItem,
  disabled,
  helper,
  ...props
}: InputProps & TextInputProps) => {
  const { theme } = useTheme();

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
      <DefaultInput
        ref={ref}
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
        isDisabled={disabled}
        left={leftItem}
        right={rightItem}
        allowFontScaling={false}
        selectionColor={theme.colors.primary}
        caretHidden={false}
        {...props}
      />
      {helper && (
        <HelperContainer>
          <Icon source={helper.type === 'error' ? Error : Success} size={14} />
          <HelperLabel
            text={helper.message}
            semibold
            type="footnote"
            color={
              helper.type === 'error' ? theme.colors.red : theme.colors.green
            }
          />
        </HelperContainer>
      )}
    </>
  );
};

export default Input;
