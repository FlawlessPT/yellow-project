// React and React Native
import React, { useEffect, useState } from 'react';
import {
  Alert,
  Keyboard,
  Platform,
  TouchableWithoutFeedback,
  KeyboardAvoidingView,
  View,
} from 'react-native';

// Styles
import {
  Container,
  ContentContainer,
  MainContainer,
  ForgotPassword,
  SignUp,
} from './styles';

// Components
import { Label, Input } from '@components';

// Utils
import { supabase } from '@utils/supabase';

// Hooks
import useTheme from '@hooks/theme/useTheme';

// External Libs
import * as yup from 'yup';
import { useNavigation } from '@react-navigation/native';
import EncryptedStorage from 'react-native-encrypted-storage';
import { useForm, Controller, SubmitHandler } from 'react-hook-form';

// Types
import { NoneAuthenticatedStackScreenPropsGeneric } from '../../types';

const Login = () => {
  const [saveLogin, setSaveLogin] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(true);
  const [keyboardStatus, setKeyboardStatus] = useState(false);
  const [isInvalidCredentialsModalVisible, setInvalidCredentialsModalVisible] =
    useState(false);

  const { theme } = useTheme();

  const [
    isAccountNotConfirmedModalModalVisible,
    setAccountNotConfirmedModalModalVisible,
  ] = useState(false);

  const navigation =
    useNavigation<
      NoneAuthenticatedStackScreenPropsGeneric<'Auth'>['navigation']
    >();

  const toggleInvalidCredentialsModal = () => {
    setInvalidCredentialsModalVisible(!isInvalidCredentialsModalVisible);
  };

  const toggleAccountNotConfirmedModal = () => {
    setAccountNotConfirmedModalModalVisible(
      !isAccountNotConfirmedModalModalVisible,
    );
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
    email: yup
      .string()
      .email('login_page.invalid_email_format')
      .required('login_page.required_email'),

    password: yup
      .string()
      .min(8, 'login_page.invalid_password')
      .required('login_page.required_password'),
  });

  const { control, handleSubmit, formState } = useForm({
    resolver: require('@hookform/resolvers/yup').yupResolver(validationSchema),
  });

  const onSubmit: SubmitHandler<FormValues> = async data => {
    signInWithEmail(data.email, data.password);

    if (saveLogin) {
      try {
        await EncryptedStorage.setItem(
          'user_credentials',
          JSON.stringify({
            email: data.email,
            password: data.password,
          }),
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
        const storedCredentials =
          await EncryptedStorage.getItem('user_credentials');

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

  interface FormValues {
    email: string;
    password: string;
  }

  return (
    <Container>
      {!loading && (
        <>
          {/* <ModalPopup
            title={'login_page.popup.invalid_credentials.title'}
            subtitle={'login_page.popup.invalid_credentials.subtitle'}
            buttonTitle={'login_page.popup.invalid_credentials.button'}
            isDismissButtonVisible={true}
            onPressDismissButton={toggleInvalidCredentialsModal}
            isModalVisible={isInvalidCredentialsModalVisible}
            onPressButton={toggleInvalidCredentialsModal}
          />
          <ModalPopup
            title={'login_page.popup.email_not_confirmed.title'}
            subtitle={'login_page.popup.email_not_confirmed.subtitle'}
            buttonTitle={'login_page.popup.email_not_confirmed.button'}
            isModalVisible={isAccountNotConfirmedModalModalVisible}
            onPressButton={toggleAccountNotConfirmedModal}
          /> */}
          <KeyboardAvoidingView
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
            style={{ flex: 1 }}>
            <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
              <MainContainer>
                <ContentContainer>
                  <Label text="login_page.title" type="h3" bold />
                  <View>
                    <Controller
                      name="email"
                      control={control}
                      defaultValue={email}
                      render={({ field }) => (
                        <Input
                          label={'login_page.email'}
                          keyboardType="email-address"
                          value={field.value}
                          onChangeText={(text: string) => field.onChange(text)}
                          helper={
                            formState.errors.password?.message
                              ? {
                                  type: 'error',
                                  message:
                                    formState.errors.password?.message?.toString(),
                                }
                              : undefined
                          }
                        />
                      )}
                    />
                    <Controller
                      name="password"
                      control={control}
                      defaultValue={password}
                      render={({ field }) => (
                        <Input
                          label="login_page.password"
                          secureTextEntry
                          value={field.value}
                          onChangeText={(text: string) => field.onChange(text)}
                          helper={
                            formState.errors.password?.message
                              ? {
                                  type: 'error',
                                  message:
                                    formState.errors.password?.message?.toString(),
                                }
                              : undefined
                          }
                        />
                      )}
                    />
                    <ForgotPassword
                      text="login_page.forgot_password"
                      color={theme.colors.primary}
                      bold
                      onPress={() => Alert.alert('To be implemented')}
                    />
                  </View>
                  <SignUp
                    text="login_page.signup"
                    color={theme.colors.primary}
                    onPress={() => Alert.alert('To be implemented')}
                  />
                </ContentContainer>
              </MainContainer>
            </TouchableWithoutFeedback>
          </KeyboardAvoidingView>
        </>
      )}
    </Container>
  );
};

export default Login;
