// React and React Native
import React, {useState} from 'react';
import {Text, View} from 'react-native';

// Components
import Label from '@components/Label';
import Input from '@components/Input';
import PasswordInput from '@components/Input/PasswordInput';

// Styles
import {TextContainer, InputsContainer} from '../styles';

// External Libs
import * as yup from 'yup';
import {Control, Controller} from 'react-hook-form';
import {t} from 'i18next';

// Assets
import RedCross from '@assets/icons/red-cross.svg';

// Theme
import theme from '@theme';

const PasswordStep = ({control}: {control: Control}) => {
  const [isPasswordFocused, setIsPasswordFocused] = useState(false);
  const [passwordValue, setPasswordValue] = useState('');

  const passwordSchema = yup.object().shape({
    password: yup
      .string()
      .required('Password is required')
      .min(8, 'At least 8 characters')
      .matches(/\d/, 'At least 1 number')
      .matches(
        /^(?=.*[a-z])(?=.*[A-Z])/,
        'At least 1 lowercase and 1 uppercase',
      )

      .matches(/[!@#$%^&*?]/, 'At least 1 special character '),
  });

  const getPasswordRules = (password: string) => {
    try {
      passwordSchema.validateSync({password}, {abortEarly: false});
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
                | React.ReactElement<
                    any,
                    string | React.JSXElementConstructor<any>
                  >
                | Iterable<React.ReactNode>
                | React.ReactPortal
                | null
                | undefined;
            },
            index: React.Key | null | undefined,
          ) => (
            <View style={{width: '100%', flexDirection: 'row', gap: 12}}>
              <RedCross />
              <Text
                style={{
                  fontFamily: 'Inter-Regular',
                  fontSize: 14,
                  color: theme.colors.neutral.n500,
                  fontWeight: '400',
                }}
                key={index}>
                {error?.message}
              </Text>
            </View>
          ),
        );
        return errors;
      }
      return [];
    }
  };

  return (
    <>
      <TextContainer>
        <Label
          text={t('signup_page.password.title')}
          size={24}
          fontWeight="800"
          color={theme.colors.neutral.n700}
        />
        <Label text={t('signup_page.password.subtitle')} size={20} />
      </TextContainer>
      <InputsContainer>
        <Controller
          name="password"
          control={control}
          render={({field, formState}) => (
            <>
              <PasswordInput
                placeholderText={t('signup_page.password')}
                secureTextEntry={true}
                value={field.value}
                onChangeText={(text: string) => {
                  field.onChange(text);
                  setPasswordValue(text);
                }}
                error={formState.errors.password?.message?.toString()}
                onInputFocus={() => {
                  setIsPasswordFocused(true);
                  if (!field.value) field.onChange('');
                }}
                onInputBlur={() => {
                  if (!field.value) setIsPasswordFocused(false);
                }}
                passwordRules={
                  isPasswordFocused && getPasswordRules(field.value)
                }
              />
            </>
          )}
          rules={{
            validate: value =>
              passwordSchema
                .validate({password: value})
                .catch(err => err.errors[0]),
          }}
        />
        <Controller
          name="confirmPassword"
          control={control}
          render={({field, formState}) => (
            <Input
              placeholderText={t('signup_page.confirm_password')}
              secureTextEntry={true}
              value={field.value}
              onChangeText={(text: string) => field.onChange(text)}
              error={formState.errors.confirmPassword?.message?.toString()}
            />
          )}
          rules={{
            validate: value => {
              return value === passwordValue || t('passwords_do_not_match');
            },
          }}
        />
      </InputsContainer>
    </>
  );
};

export default PasswordStep;
