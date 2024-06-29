import React from 'react';

import { Control, Controller, FieldPath, FieldValues, RegisterOptions } from 'react-hook-form';

import { InputProps } from '@components/Input';
import PasswordInput from '@components/Input/PasswordInput';

type FormPasswordInputProps = {
  rules?: Omit<RegisterOptions<FieldValues>, 'valueAsNumber' | 'valueAsDate' | 'setValueAs' | 'disabled'>;
  control: Control<FieldValues>;
  controllerName: FieldPath<FieldValues>;
} & InputProps;

export const FormPasswordInput = ({ rules, control, controllerName, ...props }: FormPasswordInputProps) => {
  return (
    <Controller
      control={control}
      rules={rules}
      name={controllerName}
      render={({ field: { value: fieldValue, onChange } }) => (
        <PasswordInput value={fieldValue} onChangeText={onChange} leftIconName="lock" {...props} />
      )}
    />
  );
};

export default FormPasswordInput;
