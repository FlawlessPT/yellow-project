/* React and React Native */
import React, { useState } from 'react';
import { TextInputProps } from 'react-native';

/* Components */
import Input, { InputProps } from '..';

// Theme
import useTheme from '@hooks/theme/useTheme';

/* External Libs */
import Icon from 'react-native-vector-icons/FontAwesome6';

const PasswordInput = ({ label, helper, style, onChangeText, ...props }: InputProps & TextInputProps) => {
  const { theme } = useTheme();

  const [passwordVisible, setPasswordVisible] = useState<boolean>(false);

  return (
    <Input
      label="login.password"
      value={label}
      helper={helper}
      style={style}
      onChangeText={onChangeText}
      secureTextEntry={!passwordVisible}
      right={
        <Icon
          onPress={() => setPasswordVisible(!passwordVisible)}
          name={passwordVisible ? 'unlock' : 'lock'}
          color={theme.colors.passwordIcon}
          size={16}
        />
      }
      {...props}
    />
  );
};

export default PasswordInput;
