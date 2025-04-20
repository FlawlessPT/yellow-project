import React, { useState } from 'react';
import { Alert, TextInputProps } from 'react-native';

import Icon from 'react-native-vector-icons/FontAwesome6';

import Input, { InputProps } from '..';
import LabelButton from '@components/Button/LabelButton';

import useTheme from '@hooks/theme/useTheme';

const PasswordInput = ({ label, ...props }: InputProps & TextInputProps) => {
  const { theme } = useTheme();

  const [passwordVisible, setPasswordVisible] = useState<boolean>(false);

  return (
    <Input
      label={label}
      labelRightElement={
        <LabelButton
          text="login_page.forgot_password"
          color={theme.colors.primary}
          medium
          isUnderline
          type="body"
          onPress={() => Alert.alert('To be implemented')}
          // style={styles.forgotPassword}
        />
      }
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
