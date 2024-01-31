// React and React Native
import React, { useEffect, useState } from 'react';
import {
  Alert,
  Keyboard,
  Platform,
  TouchableOpacity,
  TouchableWithoutFeedback,
  KeyboardAvoidingView,
} from 'react-native';

// Styles
import {
  SafeArea,
  ContentContainer,
  LogoContainer,
  MainContainer,
  SocialsLoginButtonsContainer,
  TextContainer,
  InputsContainer,
  RememberMeContainer,
  InputsBottomContainer,
  ForgotPasswordContainer,
  Logo,
} from './styles';

// Assets
import { LogoImage } from '@assets';

// Utils
import { supabase } from '@utils/supabase';

// Theme
import useTheme from '@hooks/theme/useTheme';

// Components
import Label from '@components/Label';
import Input from '../../components/Input';
import Button from '../../components/Button';
import ModalPopup from '../../components/Modal';
import SwitchButton from '../../components/Switch';
import Separator from '../../components/Separator';
import SocialLoginButton from '../../components/SocialLoginButton';

// External Libs
import * as yup from 'yup';
import { useNavigation } from '@react-navigation/native';
import EncryptedStorage from 'react-native-encrypted-storage';
import { useForm, Controller, SubmitHandler } from 'react-hook-form';

// Types
import { NoneAuthenticatedStackScreenPropsGeneric } from '../../types';

export const Login = function Login() {
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
    <SafeArea>
      {!loading && (
        <>
          <ModalPopup
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
          />
          <KeyboardAvoidingView
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
            style={{ flex: 1 }}>
            <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
              <MainContainer>
                <LogoContainer>
                  <Logo resizeMode="contain" source={LogoImage} />
                </LogoContainer>
                <ContentContainer style={{ justifyContent: 'flex-end' }}>
                  <TextContainer>
                    <Label text="login_page.title" type="h3" />
                    <Label text="login_page.subtitle" type="h4" />
                  </TextContainer>
                  <InputsContainer>
                    <Controller
                      name="email"
                      control={control}
                      defaultValue={email}
                      render={({ field }) => (
                        <Input
                          placeholderText={'login_page.email'}
                          keyboardType="email-address"
                          value={field.value}
                          onChangeText={(text: string) => field.onChange(text)}
                          error={formState.errors.password?.message?.toString()}
                        />
                      )}
                    />
                    <Controller
                      name="password"
                      control={control}
                      defaultValue={password}
                      render={({ field }) => (
                        <Input
                          placeholderText={'login_page.password'}
                          secureTextEntry={true}
                          value={field.value}
                          onChangeText={(text: string) => field.onChange(text)}
                          error={formState.errors.password?.message?.toString()}
                        />
                      )}
                    />
                    <InputsBottomContainer>
                      <RememberMeContainer>
                        <SwitchButton
                          initialValue={saveLogin}
                          shouldChangeValue={false}
                          onPress={() => setSaveLogin(!saveLogin)}
                        />
                        <Label
                          text="login_page.remember_me"
                          type="h5"
                          color="#BABABA"
                        />
                      </RememberMeContainer>
                      <ForgotPasswordContainer>
                        <TouchableOpacity
                          onPress={() => Alert.alert('To be implemented')}>
                          <Label
                            text="login_page.forgot_password"
                            type="h5"
                            color="#FFA500"
                            textAlign="right"
                          />
                        </TouchableOpacity>
                      </ForgotPasswordContainer>
                    </InputsBottomContainer>
                  </InputsContainer>
                  <Button
                    text={'login_page.sign_in'}
                    onPressButton={handleSubmit(onSubmit)}
                  />
                  {!keyboardStatus && (
                    <>
                      <Separator text={'login_page.separator'} />
                      <SocialsLoginButtonsContainer>
                        <SocialLoginButton
                          typeButton="apple"
                          onPressButton={() =>
                            console.log('missing implementation')
                          }
                        />
                        <SocialLoginButton
                          typeButton="microsoft"
                          onPressButton={() =>
                            console.log('missing implementation')
                          }
                        />
                        <SocialLoginButton
                          typeButton="google"
                          onPressButton={() =>
                            console.log('missing implementation')
                          }
                        />
                      </SocialsLoginButtonsContainer>
                    </>
                  )}
                  <TouchableOpacity
                    onPress={() => Alert.alert('To be implemented')}>
                    <Label
                      text="login_page.signup_message"
                      color="#BABABA"
                      type="h5"
                      textAlign="center"
                    />
                    <Label
                      text="login_page.signup"
                      color="#FFA500"
                      type="h5"
                      textAlign="center"
                    />
                  </TouchableOpacity>
                </ContentContainer>
              </MainContainer>
            </TouchableWithoutFeedback>
          </KeyboardAvoidingView>
        </>
      )}
    </SafeArea>
  );
};
