// React and React Native
import React from 'react';

// Components
import { Label, Input, Checkbox } from '@components';

// Styles
import { TextContainer, InputsContainer, TermsContainer } from '../styles';

// External Libs
import * as yup from 'yup';
import { Control, Controller } from 'react-hook-form';
import { t } from 'i18next';

// Theme
import useTheme from '@hooks/theme/useTheme';

export const EmailStep = ({ control }: { control: Control }) => {
  const { theme } = useTheme();

  const emailSchema = yup.object().shape({
    email: yup
      .string()
      .email(t('login_page.invalid_email_format'))
      .required(t('login_page.required_email')),
  });

  const termsSchema = yup.object().shape({
    terms: yup.boolean().isTrue(),
  });

  return (
    <>
      <TextContainer>
        <Label
          text="signup_page.email.title"
          type="h3"
          color={theme.colors.disabled}
        />
        <Label text="signup_page.email.subtitle" type="h4" />
      </TextContainer>
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
              emailSchema
                .validate({ email: value })
                .catch(err => err.errors[0]),
          }}
        />

        <TermsContainer>
          <Controller
            name="terms"
            control={control}
            defaultValue={false}
            render={({ field, fieldState }) => (
              <>
                <Checkbox
                  value={field.value}
                  onPress={() => {
                    field.onChange(!field.value);
                  }}
                  error={fieldState.error && fieldState.error.message}
                />
                <Label
                  text="signup_page.terms"
                  color={
                    fieldState.error ? theme.colors.red : theme.colors.disabled
                  }
                />
              </>
            )}
            rules={{
              validate: value =>
                termsSchema
                  .validate({ terms: value })
                  .catch(err => err.errors[0]),
            }}
          />
        </TermsContainer>
      </InputsContainer>
    </>
  );
};

export default EmailStep;
