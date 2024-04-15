// React and React Native
import React, { useState } from 'react';
import { Text, View } from 'react-native';

// Styles
import { styles } from './styles';

// Theme
import useTheme from '@hooks/theme/useTheme';

// External Libs
import * as yup from 'yup';
import { t } from 'i18next';
import { Control, Controller } from 'react-hook-form';

// Components
import PasswordInput from '@components/Input/PasswordInput';

const PasswordStep = ({ control }: { control: Control }) => {
  const { theme } = useTheme();

  const [isPasswordFocused, setIsPasswordFocused] = useState(false);
  const [passwordValue, setPasswordValue] = useState('');

  const passwordSchema = yup.object().shape({
    password: yup
      .string()
      .required('Password is required')
      .min(8, 'At least 8 characters')
      .matches(/\d/, 'At least 1 number')
      .matches(/^(?=.*[a-z])(?=.*[A-Z])/, 'At least 1 lowercase and 1 uppercase')

      .matches(/[!@#$%^&*?]/, 'At least 1 special character '),
  });

  const getPasswordRules = (password: string) => {
    try {
      passwordSchema.validateSync({ password }, { abortEarly: false });
      return [];
    } catch (validationError: any) {
      if (validationError.inner) {
        const errors = validationError.inner.map(
          (
            error: {
              message:
                | string
                | number
                | boolean
                | React.ReactElement<any, string | React.JSXElementConstructor<any>>
                | Iterable<React.ReactNode>
                | React.ReactPortal
                | null
                | undefined;
            },
            index: React.Key | null | undefined
          ) => (
            <View style={{ width: '100%', flexDirection: 'row', gap: 12 }}>
              {/* <RedCross /> */}
              <Text
                style={{
                  fontFamily: 'Poppins-Regular',
                  fontSize: 14,
                  color: theme.colors.disabled,
                }}
                key={index}
              >
                {error?.message}
              </Text>
            </View>
          )
        );
        return errors;
      }
      return [];
    }
  };

  return (
    <View style={styles.inputs}>
      <Controller
        name="password"
        control={control}
        render={({ field, formState }) => (
          <PasswordInput
            label={field.value}
            onChangeText={(text: string) => {
              field.onChange(text);
              setPasswordValue(text);
            }}
            helper={{
              type: 'error',
              message: formState.errors.password?.message?.toString() || '',
            }}
            passwordRules={isPasswordFocused && getPasswordRules(field.value)}
          />
        )}
        rules={{
          validate: (value) => passwordSchema.validate({ password: value }).catch((err) => err.errors[0]),
        }}
      />
      <Controller
        name="confirmPassword"
        control={control}
        render={({ field, formState }) => (
          <PasswordInput
            label={field.value}
            onChangeText={(text: string) => {
              field.onChange(text);
              setPasswordValue(text);
            }}
            helper={{
              type: 'error',
              message: formState.errors.confirmPassword?.message?.toString() || '',
            }}
            passwordRules={isPasswordFocused && getPasswordRules(field.value)}
          />
        )}
        rules={{
          validate: (value) => {
            return value === passwordValue || t('passwords_do_not_match');
          },
        }}
      />
    </View>
  );
};

export default PasswordStep;
