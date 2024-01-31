// React and React Native
import React from 'react';

// Components
import Label from '@components/Label';
import Input from '@components/Input';

// Styles
import { TextContainer, InputsContainer } from '../styles';

// External Libs
import * as yup from 'yup';
import { Control, Controller } from 'react-hook-form';
import { t } from 'i18next';

// Theme
import useTheme from '@hooks/theme/useTheme';

export const NameStep = ({ control }: { control: Control }) => {
  const { theme } = useTheme();

  const firstNameSchema = yup.object().shape({
    firstName: yup.string().required('First name is required'),
  });

  const lastNameSchema = yup.object().shape({
    lastName: yup.string().required('Last name is required'),
  });
  return (
    <>
      <TextContainer>
        <Label
          text={t('signup_page.name.title')}
          size={24}
          color={theme.colors.disabled}
        />
        <Label text={t('signup_page.name.subtitle')} size={20} />
      </TextContainer>
      <InputsContainer>
        <Controller
          name="firstName"
          control={control}
          render={({ field, fieldState }) => (
            <>
              <Input
                placeholderText={t('signup_page.firstname')}
                value={field.value}
                onChangeText={(text: string) => field.onChange(text)}
                error={fieldState.error && fieldState.error.message}
              />
            </>
          )}
          rules={{
            validate: value =>
              firstNameSchema
                .validate({ firstName: value })
                .catch(err => err.errors[0]),
          }}
        />
        <Controller
          name="lastName"
          control={control}
          render={({ field, fieldState }) => (
            <>
              <Input
                placeholderText={t('signup_page.lastname')}
                value={field.value}
                onChangeText={(text: string) => field.onChange(text)}
                error={fieldState.error && fieldState.error.message}
              />
            </>
          )}
          rules={{
            validate: value =>
              lastNameSchema
                .validate({ lastName: value })
                .catch(err => err.errors[0]),
          }}
        />
      </InputsContainer>
    </>
  );
};

export default NameStep;
