// React and React Native
import React from 'react';
import { View } from 'react-native';

// Components
import { Input } from '@components';

// External Libs
import * as yup from 'yup';
import { t } from 'i18next';
import { Control, Controller } from 'react-hook-form';

export const ContactStep = ({ control }: { control: Control }) => {
  const schema = yup.object().shape({
    contact: yup.number().notRequired(),
  });

  return (
    <View>
      <Controller
        name="contact"
        control={control}
        render={({ field, fieldState }) => (
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
        )}
        rules={{
          validate: (value) => schema.validate({ contact: value }).catch((err) => err.errors[0]),
        }}
      />
    </View>
  );
};

export default ContactStep;
