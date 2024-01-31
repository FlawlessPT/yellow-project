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

export const ContactStep = ({ control }: { control: Control }) => {
  const { theme } = useTheme();

  const schema = yup.object().shape({
    contact: yup.number().notRequired(),
  });

  return (
    <>
      <TextContainer>
        <Label
          text={t('signup_page.contact.title')}
          size={24}
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
                placeholderText={t('signup_page.contact')}
                value={field.value}
                onChangeText={(text: string) => field.onChange(text)}
                optionalLabelText={t('common.optional')}
                error={fieldState.error && fieldState.error.message}
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
