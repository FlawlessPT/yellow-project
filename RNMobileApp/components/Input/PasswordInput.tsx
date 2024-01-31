// React and React Native
import React, { useState } from 'react';
import { KeyboardTypeOptions, StyleProp, TextStyle } from 'react-native';

// Styles
import {
  MainContainer,
  PasswordInputDetailsContainer,
  PasswordRulesContainer,
  passwordProgressStyle,
  textInputStyle,
} from './styles';

// Components
import Label from '@components/Label';

// Theme
import useTheme from '@hooks/theme/useTheme';

// Assets
import Eye from './../../assets/icons/eye.svg';
import EyeOff from './../../assets/icons/eye-off.svg';

// External Libs
import { TextInput, ProgressBar } from 'react-native-paper';

export interface InputProps {
  placeholderText?: string;
  value?: string;
  secureTextEntry?: boolean;
  keyboardType?: KeyboardTypeOptions;
  autoCapitalize?: 'none' | 'sentences' | 'words' | 'characters';
  onChangeText: any;
  optionalLabelText?: string;
  error?: string;
  onInputFocus?: any;
  onInputBlur?: any;
  passwordRules?: JSX.Element[];
}

export const PasswordInput = ({
  placeholderText,
  value,
  secureTextEntry = true,
  keyboardType = 'default',
  autoCapitalize = 'none',
  onChangeText,
  error,
  optionalLabelText,
  onInputFocus,
  onInputBlur,
  passwordRules,
}: InputProps) => {
  const [isPasswordHidden, setIsPasswordHidden] = useState(secureTextEntry);
  const [isFocused, setIsFocused] = useState(false);
  const { theme } = useTheme();

  const getColorByErrorsList = () => {
    if (passwordRules && passwordRules.length) {
      const nErrors = passwordRules.length;
      switch (nErrors) {
        case 0:
          return theme.colors.green;
        case 1:
        case 2:
          return theme.colors.primary;
        default:
          return theme.colors.red;
      }
    } else return theme.colors.green;
  };

  const getStringByErrorsList = () => {
    if (passwordRules && passwordRules.length) {
      const nErrors = passwordRules.length;
      switch (nErrors) {
        case 0:
          return 'common.password_strong';
        case 1:
        case 2:
          return 'common.password_medium';
        default:
          return 'common.password_weak';
      }
    } else return 'common.password_strong';
  };

  return (
    <>
      <MainContainer>
        {optionalLabelText && (
          <Label text={optionalLabelText} textAlign="right" />
        )}
        <TextInput
          value={value}
          onChangeText={onChangeText}
          label={placeholderText}
          mode="outlined"
          autoCapitalize={autoCapitalize}
          secureTextEntry={isPasswordHidden}
          keyboardType={keyboardType}
          onFocus={e => {
            setIsFocused(true);
            onInputFocus(e);
          }}
          onBlur={e => {
            setIsFocused(false);
            onInputBlur(e);
          }}
          activeOutlineColor={getColorByErrorsList()}
          outlineColor={error ? theme.colors.red : theme.colors.disabled}
          outlineStyle={{ borderRadius: 10 }}
          textColor={theme.colors.disabled}
          style={textInputStyle as StyleProp<TextStyle>}
          right={
            secureTextEntry && (
              <TextInput.Icon
                icon={isPasswordHidden ? Eye : EyeOff}
                style={{
                  paddingVertical: 15,
                }}
                onPress={() => setIsPasswordHidden(!isPasswordHidden)}
              />
            )
          }
        />

        {isFocused && (
          <PasswordInputDetailsContainer>
            <ProgressBar
              progress={
                passwordRules && passwordRules.length
                  ? 1 - passwordRules?.length / 5
                  : value
                  ? 1
                  : 0
              }
              style={passwordProgressStyle}
              color={getColorByErrorsList()}
            />
            <Label
              text={getStringByErrorsList()}
              type="footnote"
              color={theme.colors.primary}
            />
            {passwordRules && passwordRules.length > 0 && (
              <PasswordRulesContainer>{passwordRules}</PasswordRulesContainer>
            )}
          </PasswordInputDetailsContainer>
        )}
      </MainContainer>
    </>
  );
};

export default PasswordInput;
