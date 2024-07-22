import React, { useState } from 'react';
import { TextInputProps } from 'react-native';

import Icon from 'react-native-vector-icons/FontAwesome6';

import Input, { InputProps } from '..';

import useTheme from '@hooks/theme/useTheme';

const PasswordInput = ({ label, ...props }: InputProps & TextInputProps) => {
  const { theme } = useTheme();

  const [passwordVisible, setPasswordVisible] = useState<boolean>(false);

  return (
    <Input
      label={label}
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
