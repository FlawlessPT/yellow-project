/* React and React Native */
import React, { useState } from 'react';
import { TextInputProps } from 'react-native';

/* Components */
import Input, { InputProps } from '..';

/* External Libs */
import Icon from 'react-native-vector-icons/FontAwesome6';

const PasswordInput = ({ label, helper, style, onChangeText }: InputProps & TextInputProps) => {
  const [passwordVisible, setPasswordVisible] = useState<boolean>(false);

  return (
    <Input
      label="login.password"
      value={label}
      helper={helper}
      style={style}
      onChangeText={onChangeText}
      secureTextEntry={!passwordVisible}
      rightItem={
        <Icon onPress={() => setPasswordVisible(!passwordVisible)} name={passwordVisible ? 'eye-slash' : 'eye'} />
      }
    />
  );
};

export default PasswordInput;
