// React and React Native
import React from 'react';

// Components
import { Input } from '@components';

// Styles
import { InputsContainer } from '../styles';

// External Libs
import * as yup from 'yup';
import { t } from 'i18next';
import { Control, Controller } from 'react-hook-form';

export const EmailStep = ({ control }: { control: Control }) => {
  const emailSchema = yup.object().shape({
    email: yup
      .string()
      .email(t('login_page.invalid_email_format'))
      .required(t('login_page.required_email')),
  });

  return (
    <InputsContainer>
      <Controller
        name="email"
        control={control}
        render={({ field, fieldState }) => (
          <Input
            label="login_page.email"
            keyboardType="email-address"
            value={field.value}
            onChangeText={(text: string) => field.onChange(text)}
            helper={
              fieldState.error && {
                type: 'error',
                message: fieldState.error.message || '',
              }
            }
          />
        )}
        rules={{
          validate: value =>
            emailSchema.validate({ email: value }).catch(err => err.errors[0]),
        }}
      />
    </InputsContainer>
  );
};

export default EmailStep;
