// React and React Native
import React, { useEffect } from 'react';
import { Alert, StyleSheet } from 'react-native';

// Theme
import { Theme } from '@theme';

// Helpers
import { supabase } from '@utils/supabase';

// Hooks
import useTheme from '@hooks/theme/useTheme';

// Types
import { AuthStackEnum } from '../../navigation/types';
import { AuthNavProps } from '../../navigation/AuthStack/types';

// External Libs
import { format } from 'date-fns/format';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { FieldValues, SubmitHandler, useForm } from 'react-hook-form';

// Components
import { Button, FormInput, FormPasswordInput, Label, LabelButton, LoginContainer } from '@components';

const CreateAccount = ({ navigation }: AuthNavProps<'CreateAccount'>) => {
  const { bottom } = useSafeAreaInsets();

  const { theme } = useTheme();

  const styles = getStyles(theme, bottom);

  async function signUpWithEmail(
    email: string,
    password: string,
    firstName: string,
    lastName: string,
    dob: string,
    contact: string
  ) {
    const { error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        emailRedirectTo: 'mw://signup',
        data: {
          email,
          first_name: firstName,
          last_name: lastName,
          dob,
          contact,
        },
      },
    });

    if (error) {
      Alert.alert(error.message);
    }
  }

  const onSubmit: SubmitHandler<{
    email: string;
    password: string;
    firstName: string;
    lastName: string;
    dob: string;
    contact: string;
  }> = (data) => {
    signUpWithEmail(
      data.email,
      data.password,
      data.firstName,
      data.lastName,
      format(new Date(data.dob), 'dd/MM/yyyy'),
      data.contact
    );
  };

  const handleNavigateToLogin = () => {
    navigation.navigate(AuthStackEnum.LOGIN);
  };

  const { control, formState, handleSubmit, trigger, getValues } = useForm<FieldValues>({
    mode: 'onChange',
  });

  useEffect(() => {
    trigger();
  }, [trigger]);

  return (
    <LoginContainer title="signup_page.title">
      <>
        <FormInput
          control={control}
          rules={{
            required: {
              value: true,
              message: 'login_page.required_email',
            },
            pattern: {
              value: new RegExp('[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+.[a-zA-Z]{2,4}$'),
              message: 'login_page.invalid_email_format',
            },
          }}
          controllerName="email"
          label="login_page.email"
          leftIconName="at"
          keyboardType="email-address"
          helper={
            formState.errors.email?.message
              ? {
                  type: 'error',
                  message: formState.errors.email?.message?.toString(),
                }
              : undefined
          }
        />
        <FormPasswordInput
          style={styles.passwordInput}
          rules={{
            required: {
              value: true,
              message: 'login_page.required_password',
            },
            minLength: {
              message: 'login_page.invalid_password',
              value: 8,
            },
            validate: {
              confirmPassword: (fieldValue) => fieldValue === getValues('password'),
            },
          }}
          control={control}
          controllerName="password"
          label="login_page.password"
          helper={
            formState.errors.password?.message
              ? {
                  type: 'error',
                  message: formState.errors.password?.message?.toString(),
                }
              : undefined
          }
        />
        <FormPasswordInput
          style={styles.passwordInput}
          rules={{
            required: {
              value: true,
              message: 'login_page.required_password',
            },
            minLength: {
              message: 'login_page.invalid_password',
              value: 8,
            },
            validate: {
              confirmPassword: (fieldValue) => fieldValue === getValues('password'),
            },
          }}
          control={control}
          controllerName="confirmPassword"
          label="signup_page.confirm_password"
          helper={
            formState.errors.password?.message
              ? {
                  type: 'error',
                  message: formState.errors.password?.message?.toString(),
                }
              : undefined
          }
        />
        <Button
          text="signup_page.button"
          onPressButton={handleSubmit(onSubmit)}
          style={styles.signUp}
          isDisabled={Object.keys(formState.errors).length !== 0}
        />
        <LabelButton style={styles.login} onPress={handleNavigateToLogin}>
          <Label text="signup_page.have_account" color={theme.colors.neutral400} type="body" medium />
          <Label text="signup_page.login" color={theme.colors.primary} medium isUnderline type="body" />
        </LabelButton>
      </>
    </LoginContainer>
  );
};

export default CreateAccount;

const getStyles = (theme: Theme, paddingBottom: number) =>
  StyleSheet.create({
    passwordInput: {
      marginTop: 24,
    },
    signUp: {
      marginTop: 52,
    },
    login: {
      alignSelf: 'center',
      marginTop: 40,
      paddingBottom: paddingBottom === 0 ? 16 : paddingBottom,
    },
  });
