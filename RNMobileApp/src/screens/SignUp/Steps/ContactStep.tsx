// React and React Native
import React from 'react';

// Components
import { Label, Input } from '@components';

// Styles
import { TextContainer, InputsContainer } from '../styles';

// External Libs
import * as yup from 'yup';
import { Control, Controller } from 'react-hook-form';
import { t } from 'i18next';

// Theme
import useTheme from '@hooks/theme/useTheme';

export const ContactStep = ({ control }: { control: Control }) => {
  const { theme } = useTheme();

  const schema = yup.object().shape({
    contact: yup.number().notRequired(),
  });

  return (
    <>
      <TextContainer>
        <Label
          text="signup_page.contact.title"
          type="h3"
          color={theme.colors.disabled}
        />
      </TextContainer>
      <InputsContainer>
        <Controller
          name="contact"
          control={control}
          render={({ field, fieldState }) => (
            <>
              <Input
                label={t('signup_page.contact')}
                value={field.value}
                onChangeText={(text: string) => field.onChange(text)}
                helper={
                  fieldState.error && {
                    message: fieldState.error.message || '',
                    type: 'error',
                  }
                }
              />
            </>
          )}
          rules={{
            validate: value =>
              schema.validate({ contact: value }).catch(err => err.errors[0]),
          }}
        />
      </InputsContainer>
    </>
  );
};

export default ContactStep;
