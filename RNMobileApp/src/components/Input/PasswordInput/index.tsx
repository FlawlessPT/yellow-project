/* React and React Native */
import React, { useState } from 'react';
import { TextInputProps } from 'react-native';

/* Components */
import Input, { InputProps } from '..';

/* External Libs */
import { TextInput } from 'react-native-paper';

const PasswordInput = ({
  label,
  helper,
  style,
  onChangeText,
}: InputProps & TextInputProps) => {
  const [passwordVisible, setPasswordVisible] = useState<boolean>(false);

  return (
    <Input
      label="login.password.hint"
      value={label}
      helper={helper}
      style={style}
      onChangeText={onChangeText}
      secureTextEntry={!passwordVisible}
      rightItem={
        <TextInput.Icon
          icon={passwordVisible ? 'eye-off-outline' : 'eye-outline'}
          onPress={() => setPasswordVisible(!passwordVisible)}
        />
      }
    />
  );
};

export default PasswordInput;
