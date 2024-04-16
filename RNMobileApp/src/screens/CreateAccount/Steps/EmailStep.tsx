// React and React Native
import React from 'react';
import { View } from 'react-native';

// Styles
import { styles } from './styles';

// Components
import { Input } from '@components';

// External Libs
import * as yup from 'yup';
import { t } from 'i18next';
import { Control, Controller } from 'react-hook-form';

export const EmailStep = ({ control }: { control: Control }) => {
  const emailSchema = yup.object().shape({
    email: yup.string().email(t('login_page.invalid_email_format')).required(t('login_page.required_email')),
  });

  return (
    <View style={styles.inputs}>
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
          validate: (value) => emailSchema.validate({ email: value }).catch((err) => err.errors[0]),
        }}
      />
    </View>
  );
};

export default EmailStep;
