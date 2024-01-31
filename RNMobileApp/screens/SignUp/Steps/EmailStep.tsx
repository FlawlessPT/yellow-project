// React and React Native
import React from 'react';

// Components
import Label from '@components/Label';
import Input from '@components/Input';
import Checkbox from '@components/Checkbox';

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
          text={t('signup_page.email.title')}
          size={24}
          fontWeight="800"
          color={theme.colors.disabled}
        />
        <Label text={t('signup_page.email.subtitle')} size={20} />
      </TextContainer>
      <InputsContainer>
        <Controller
          name="email"
          control={control}
          render={({ field, fieldState }) => (
            <Input
              placeholderText={t('login_page.email')}
              keyboardType="email-address"
              value={field.value}
              onChangeText={(text: string) => field.onChange(text)}
              error={fieldState.error && fieldState.error.message}
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
                  text={t('signup_page.terms')}
                  size={16}
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
