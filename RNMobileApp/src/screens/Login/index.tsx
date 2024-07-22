import React, { useEffect, useState } from 'react';
import { Alert, StyleSheet } from 'react-native';

import { AuthNavProps } from '@navigation/AuthStack/types';
import { AuthStackEnum } from '@navigation/types';
import { useForm, SubmitHandler, FieldValues } from 'react-hook-form';
import EncryptedStorage from 'react-native-encrypted-storage';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { Label, FormInput, FormPasswordInput, LabelButton, Button, LoginContainer } from '@components';

import useTheme from '@hooks/theme/useTheme';

import { supabase } from '@utils/supabase';

import { Theme } from '@theme';

const Login = ({ navigation }: AuthNavProps<'Login'>) => {
  const [saveLogin, setSaveLogin] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(true);
  const [isInvalidCredentialsModalVisible, setInvalidCredentialsModalVisible] = useState(false);

  const { bottom } = useSafeAreaInsets();

  const { theme } = useTheme();

  const styles = getStyles(theme, bottom);

  const [isAccountNotConfirmedModalModalVisible, setAccountNotConfirmedModalModalVisible] = useState(false);

  const handleNavigateToCreateAccount = () => {
    navigation.navigate(AuthStackEnum.CREATE_ACCOUNT);
  };

  const toggleInvalidCredentialsModal = () => {
    setInvalidCredentialsModalVisible(!isInvalidCredentialsModalVisible);
  };

  const toggleAccountNotConfirmedModal = () => {
    setAccountNotConfirmedModalModalVisible(!isAccountNotConfirmedModalModalVisible);
  };

  async function signInWithEmail(newEmail: string, newPassword: string) {
    const { error } = await supabase.auth.signInWithPassword({
      email: newEmail,
      password: newPassword,
    });

    if (error) {
      console.log('error login ' + error);
      switch (error.message) {
        case 'Email not confirmed':
          toggleAccountNotConfirmedModal();
          break;
        case 'Invalid login credentials':
          toggleInvalidCredentialsModal();
          break;
        default:
          toggleInvalidCredentialsModal();
          break;
      }
    }
  }

  const { control, formState, handleSubmit, trigger } = useForm<FieldValues>({
    mode: 'onChange',
  });

  useEffect(() => {
    trigger();
  }, [trigger]);

  const onSubmit: SubmitHandler<FormValues> = async (data) => {
    signInWithEmail(data.email, data.password);

    if (saveLogin) {
      try {
        await EncryptedStorage.setItem(
          'user_credentials',
          JSON.stringify({
            email: data.email,
            password: data.password,
          })
        );
      } catch {}
    } else {
      try {
        await EncryptedStorage.removeItem('user_credentials');
      } catch {}
    }
  };

  useEffect(() => {
    async function retrieveUserCredentials() {
      try {
        const storedCredentials = await EncryptedStorage.getItem('user_credentials');

        if (storedCredentials) {
          const parsedCredentials = JSON.parse(storedCredentials);
          setEmail(parsedCredentials.email);
          setPassword(parsedCredentials.password);
          setSaveLogin(true);
          setLoading(false);
        } else {
          setLoading(false);
        }
      } catch (error) {}
    }
    retrieveUserCredentials();
  }, []);

  type FormValues = {
    email: string;
    password: string;
  };

  return (
    <LoginContainer title="login_page.title">
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
        <Button
          text="login_page.button"
          onPressButton={handleSubmit(onSubmit)}
          style={styles.signIn}
          isDisabled={Object.keys(formState.errors).length !== 0}
        />
        <LabelButton style={styles.signUp} onPress={handleNavigateToCreateAccount}>
          <Label text="login_page.dont_have_account" color={theme.colors.neutral400} type="body" medium />
          <Label text="login_page.signup" color={theme.colors.primary} medium isUnderline type="body" />
        </LabelButton>
        <LabelButton
          text="login_page.forgot_password"
          color={theme.colors.primary}
          medium
          isUnderline
          type="body"
          onPress={() => Alert.alert('To be implemented')}
          style={styles.forgotPassword}
        />
      </>
    </LoginContainer>
  );
};

export default Login;

const getStyles = (theme: Theme, paddingBottom: number) =>
  StyleSheet.create({
    forgotPassword: {
      alignSelf: 'center',
      marginTop: 16,
      paddingBottom: paddingBottom === 0 ? 16 : paddingBottom,
    },
    signIn: {
      marginTop: 52,
    },
    passwordInput: {
      marginTop: 24,
    },
    signUp: {
      alignSelf: 'center',
      marginTop: 40,
    },
  });
