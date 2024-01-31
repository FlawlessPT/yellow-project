// React and React Native
import React, { useState } from 'react';
import { KeyboardTypeOptions, StyleProp, TextStyle } from 'react-native';

// Components
import Label from '@components/Label';

// Styles
import {
  MainContainer,
  PasswordInputDetailsContainer,
  PasswordRulesContainer,
  passwordProgressStyle,
  textInputStyle,
} from './styles';

// External Libs
import { TextInput, ProgressBar } from 'react-native-paper';
import { useTranslation } from 'react-i18next';

// Assets
import Eye from './../../assets/icons/eye.svg';
import EyeOff from './../../assets/icons/eye-off.svg';

// Theme
import useTheme from '@hooks/theme/useTheme';

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
  const { t } = useTranslation();
  const { theme } = useTheme();

  const getColorByErrorsList = () => {
    if (passwordRules && passwordRules.length) {
      let nErrors = passwordRules.length;
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
      let nErrors = passwordRules.length;
      switch (nErrors) {
        case 0:
          return t('common.password_strong');
        case 1:
        case 2:
          return t('common.password_medium');
        default:
          return t('common.password_weak');
      }
    } else return t('common.password_strong');
  };

  return (
    <>
      <MainContainer>
        {optionalLabelText && (
          <Label
            text={optionalLabelText}
            size={14}
            fontWeight="600"
            textAlign="right"
          />
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
              size={12}
              fontWeight="500"
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
