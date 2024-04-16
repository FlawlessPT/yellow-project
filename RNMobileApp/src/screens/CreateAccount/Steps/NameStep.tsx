// React and React Native
import React from 'react';
import { View } from 'react-native';

// Styles
import { styles } from './styles';

// Components
import { Input } from '@components';

// External Libs
import * as yup from 'yup';
import { Control, Controller } from 'react-hook-form';

export const NameStep = ({ control }: { control: Control }) => {
  const firstNameSchema = yup.object().shape({
    firstName: yup.string().required('First name is required'),
  });

  const lastNameSchema = yup.object().shape({
    lastName: yup.string().required('Last name is required'),
  });

  return (
    <View>
      <Controller
        name="firstName"
        control={control}
        render={({ field, fieldState }) => (
          <Input
            label="signup_page.firstname"
            value={field.value}
            onChangeText={(text: string) => field.onChange(text)}
            helper={
              fieldState.error && {
                type: 'error',
                message: fieldState.error.message || '',
              }
            }
            style={styles.input}
          />
        )}
        rules={{
          validate: (value) => firstNameSchema.validate({ firstName: value }).catch((err) => err.errors[0]),
        }}
      />
      <Controller
        name="lastName"
        control={control}
        render={({ field, fieldState }) => (
          <Input
            label="signup_page.lastname"
            value={field.value}
            onChangeText={(text: string) => field.onChange(text)}
            helper={
              fieldState.error && {
                type: 'error',
                message: fieldState.error.message || '',
              }
            }
            style={styles.input}
          />
        )}
        rules={{
          validate: (value) => lastNameSchema.validate({ lastName: value }).catch((err) => err.errors[0]),
        }}
      />
    </View>
  );
};

export default NameStep;
