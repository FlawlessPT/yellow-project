// React and React Native
import React from 'react';

// Components
import Label from '@components/Label';
import CalendarPicker from '@components/CalendarPicker';

// Styles
import { TextContainer, InputsContainer } from '../styles';

// External Libs
import * as yup from 'yup';
import { Control, Controller } from 'react-hook-form';
import { t } from 'i18next';

// Theme
import useTheme from '@hooks/theme/useTheme';

export const DobStep = ({ control }: { control: Control }) => {
  const { theme } = useTheme();

  const schema = yup.object().shape({
    dob: yup
      .date()
      .max(new Date(), t('signup_page.dob.future.date.error'))
      .required(t('signup_page.dob.required')),
  });

  return (
    <>
      <TextContainer>
        <Label
          text={t('signup_page.dob.title')}
          size={24}
          color={theme.colors.disabled}
        />
      </TextContainer>
      <InputsContainer>
        <Controller
          name="dob"
          control={control}
          render={({ field, fieldState }) => (
            <>
              <CalendarPicker
                date={field.value}
                placeholderText={t('login_page.dob')}
                onChangeDate={(date: Date) => field.onChange(date)}
                error={fieldState.error?.message}
              />
            </>
          )}
          rules={{
            validate: value =>
              schema.validate({ dob: value }).catch(err => err.errors[0]),
          }}
        />
      </InputsContainer>
    </>
  );
};

export default DobStep;
