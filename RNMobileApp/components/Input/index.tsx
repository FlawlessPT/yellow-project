// React and React Native
import React, {useState} from 'react';
import {
  KeyboardTypeOptions,
  NativeSyntheticEvent,
  StyleProp,
  TextInputFocusEventData,
  TextStyle,
} from 'react-native';

// Components
import Label from '@components/Label';

// Styles
import {
  ErrorContainer,
  MainContainer,
  errorLabelStyle,
  textInputStyle,
} from './styles';

// External Libs
import {TextInput, HelperText} from 'react-native-paper';

// Assets
import Alert from './../../assets/icons/alert-circle.svg';
import Eye from './../../assets/icons/eye.svg';
import EyeOff from './../../assets/icons/eye-off.svg';

// Theme
import theme from '../../theme';

export interface InputProps {
  placeholderText?: string;
  value?: string;
  secureTextEntry?: boolean;
  keyboardType?: KeyboardTypeOptions;
  autoCapitalize?: 'none' | 'sentences' | 'words' | 'characters';
  onChangeText: any;
  optionalLabelText?: string;
  error?: string;
  onInputFocus?: (e: NativeSyntheticEvent<TextInputFocusEventData>) => void;
  onInputBlur?: (e: NativeSyntheticEvent<TextInputFocusEventData>) => void;
}

export const Input = ({
  placeholderText,
  value,
  secureTextEntry = false,
  keyboardType = 'default',
  autoCapitalize = 'none',
  onChangeText,
  error,
  optionalLabelText,
  onInputFocus,
  onInputBlur,
}: InputProps) => {
  const [isPasswordHidden, setIsPasswordHidden] = useState(secureTextEntry);

  return (
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
        onFocus={onInputFocus}
        onBlur={onInputBlur}
        activeOutlineColor={
          error ? theme.colors.red : theme.colors.primary.p300
        }
        outlineColor={error ? theme.colors.red : theme.colors.neutral.n200}
        outlineStyle={{borderRadius: 10}}
        textColor={theme.colors.neutral.n500}
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
      {Boolean(error) && (
        <ErrorContainer>
          <Alert width={16} height={16} />
          <HelperText type="error" style={errorLabelStyle}>
            {error}
          </HelperText>
        </ErrorContainer>
      )}
    </MainContainer>
  );
};

export default Input;
