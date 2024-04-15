// React and React Native
import React, { useEffect, useState } from 'react';
import {
  Alert,
  Keyboard,
  Platform,
  TouchableWithoutFeedback,
  KeyboardAvoidingView,
  View,
  StyleSheet,
} from 'react-native';

// Utils
import { supabase } from '@utils/supabase';

// Hooks
import useTheme from '@hooks/theme/useTheme';

// External Libs
import * as yup from 'yup';
import { useForm, SubmitHandler } from 'react-hook-form';
import EncryptedStorage from 'react-native-encrypted-storage';

// Types
import { AuthNavProps } from '../../navigation/AuthStack/types';

// Components
import { Label, FormInput, LabelButton, Button } from '@components';

const Login = ({ navigation }: AuthNavProps<'Login'>) => {
  const [saveLogin, setSaveLogin] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(true);
  const [keyboardStatus, setKeyboardStatus] = useState(false);
  const [isInvalidCredentialsModalVisible, setInvalidCredentialsModalVisible] = useState(false);

  const { theme } = useTheme();

  const styles = getStyles();

  const [isAccountNotConfirmedModalModalVisible, setAccountNotConfirmedModalModalVisible] = useState(false);

  const toggleInvalidCredentialsModal = () => {
    setInvalidCredentialsModalVisible(!isInvalidCredentialsModalVisible);
  };

  const toggleAccountNotConfirmedModal = () => {
    setAccountNotConfirmedModalModalVisible(!isAccountNotConfirmedModalModalVisible);
  };

  async function signInWithEmail(email: string, password: string) {
    const { error } = await supabase.auth.signInWithPassword({
      email: email,
      password: password,
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

  useEffect(() => {
    const showSubscription = Keyboard.addListener('keyboardWillShow', () => {
      setKeyboardStatus(true);
    });
    const hideSubscription = Keyboard.addListener('keyboardWillHide', () => {
      setKeyboardStatus(false);
    });

    return () => {
      showSubscription.remove();
      hideSubscription.remove();
    };
  }, []);

  const validationSchema = yup.object().shape({
    email: yup.string().email('login_page.invalid_email_format').required('login_page.required_email'),

    password: yup.string().min(8, 'login_page.invalid_password').required('login_page.required_password'),
  });

  const { control, handleSubmit, formState } = useForm({
    resolver: require('@hookform/resolvers/yup').yupResolver(validationSchema),
  });

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
      } catch (error) {}
    } else {
      try {
        await EncryptedStorage.removeItem('user_credentials');
      } catch (error) {}
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
    <View style={styles.container}>
      {!loading && (
        <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'} style={styles.container}>
          <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            <View style={styles.mainContainer}>
              <View style={styles.contentContainer}>
                <Label text="login_page.title" type="h3" bold />
                <View>
                  <FormInput
                    control={control}
                    controllerName="email"
                    label="login_page.email"
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
                  <FormInput
                    control={control}
                    controllerName="password"
                    label="login_page.password"
                    secureTextEntry
                    helper={
                      formState.errors.password?.message
                        ? {
                            type: 'error',
                            message: formState.errors.password?.message?.toString(),
                          }
                        : undefined
                    }
                  />
                  <LabelButton
                    text="login_page.forgot_password"
                    color={theme.colors.primary}
                    bold
                    type="body"
                    onPress={() => Alert.alert('To be implemented')}
                    style={styles.forgotPassword}
                  />
                  <Button text="Login" onPressButton={handleSubmit(onSubmit)} style={styles.signIn} />
                </View>
                <LabelButton
                  text="login_page.signup"
                  color={theme.colors.primary}
                  onPress={() => navigation.navigate('CreateAccount')}
                  style={styles.signUp}
                />
              </View>
            </View>
          </TouchableWithoutFeedback>
        </KeyboardAvoidingView>
      )}
    </View>
  );
};

export default Login;

const getStyles = () =>
  StyleSheet.create({
    container: {
      flex: 1,
    },
    mainContainer: {
      flex: 1,
      justifyContent: 'center',
    },
    contentContainer: {
      paddingHorizontal: 20,
      gap: 32,
    },
    forgotPassword: {
      alignSelf: 'flex-end',
      marginTop: 8,
    },
    signUp: {
      alignSelf: 'center',
    },
    signIn: {
      marginTop: 30,
    },
  });
