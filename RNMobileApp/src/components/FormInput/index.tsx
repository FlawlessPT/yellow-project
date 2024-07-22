import React from 'react';

import { Control, Controller, FieldPath, FieldValues, RegisterOptions } from 'react-hook-form';

import Input, { InputProps } from '@components/Input';

type FormInputProps = {
  rules?: Omit<RegisterOptions<FieldValues>, 'valueAsNumber' | 'valueAsDate' | 'setValueAs' | 'disabled'>;
  control: Control<FieldValues>;
  controllerName: FieldPath<FieldValues>;
} & InputProps;

export const FormInput = ({ rules, control, controllerName, ...props }: FormInputProps) => {
  return (
    <Controller
      control={control}
      rules={rules}
      name={controllerName}
      render={({ field: { value: fieldValue, onChange } }) => (
        <Input value={fieldValue} onChangeText={onChange} {...props} />
      )}
    />
  );
};

export default FormInput;
