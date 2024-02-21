// React and React Native
import React from 'react';

// Styles
import { InputsContainer } from '../styles';

// Components
import { CalendarPicker } from '@components';

// External Libs
import * as yup from 'yup';
import { t } from 'i18next';
import { Control, Controller } from 'react-hook-form';

export const DobStep = ({ control }: { control: Control }) => {
  const schema = yup.object().shape({
    dob: yup
      .date()
      .max(new Date(), t('signup_page.dob.future.date.error'))
      .required(t('signup_page.dob.required')),
  });

  return (
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
  );
};

export default DobStep;
