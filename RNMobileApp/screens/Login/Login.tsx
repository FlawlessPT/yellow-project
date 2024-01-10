// React and React Native
import React, {useEffect, useState} from 'react';
import {
  Alert,
  Image,
  Keyboard,
  Platform,
  TouchableOpacity,
  TouchableWithoutFeedback,
  KeyboardAvoidingView,
  StyleProp,
  ImageStyle,
} from 'react-native';

// Modals
import ModalPopup from '../../components/Modal';

// Components
import Button from '../../components/Button';
import Input from '../../components/Input';
import SocialLoginButton from '../../components/SocialLoginButton';
import SwitchButton from '../../components/Switch';
import Separator from '../../components/Separator';

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
  logoStyle,
  InputsBottomContainer,
  ForgotPasswordContainer,
} from './styles';

// External Libs
import {useNavigation} from '@react-navigation/native';
import {useTranslation} from 'react-i18next';
import {useForm, Controller, SubmitHandler} from 'react-hook-form';
import {Text} from 'react-native-elements';
import * as yup from 'yup';
import EncryptedStorage from 'react-native-encrypted-storage';

// Theme
import theme from '../../theme';

// Types
import {NoneAuthenticatedStackScreenPropsGeneric} from '../../types';

// Helpers
import {supabase} from '@utils/supabase';

export const Login = function Login() {
  const {t} = useTranslation();
  const [saveLogin, setSaveLogin] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(true);
  const [keyboardStatus, setKeyboardStatus] = useState(false);
  const [isInvalidCredentialsModalVisible, setInvalidCredentialsModalVisible] =
    useState(false);

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
    const {error} = await supabase.auth.signInWithPassword({
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
      .email(t('login_page.invalid_email_format'))
      .required(t('login_page.required_email')),

    password: yup
      .string()
      .min(8, t('login_page.invalid_password'))
      .required(t('login_page.required_password')),
  });

  const {control, handleSubmit, formState} = useForm({
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
            title={t('login_page.popup.invalid_credentials.title')}
            subtitle={t('login_page.popup.invalid_credentials.subtitle')}
            buttonTitle={t('login_page.popup.invalid_credentials.button')}
            isDismissButtonVisible={true}
            onPressDismissButton={toggleInvalidCredentialsModal}
            isModalVisible={isInvalidCredentialsModalVisible}
            onPressButton={toggleInvalidCredentialsModal}
          />
          <ModalPopup
            title={t('login_page.popup.email_not_confirmed.title')}
            subtitle={t('login_page.popup.email_not_confirmed.subtitle')}
            buttonTitle={t('login_page.popup.email_not_confirmed.button')}
            isModalVisible={isAccountNotConfirmedModalModalVisible}
            onPressButton={toggleAccountNotConfirmedModal}
          />
          <KeyboardAvoidingView
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
            style={{flex: 1}}>
            <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
              <MainContainer>
                <LogoContainer>
                  <Image
                    style={logoStyle as StyleProp<ImageStyle>}
                    resizeMode="contain"
                    source={{
                      uri: 'https://www.ireland-portugal.com/apr-img/Mobiweb.png',
                    }}
                  />
                </LogoContainer>
                <ContentContainer style={{justifyContent: 'flex-end'}}>
                  <TextContainer>
                    <Text
                      style={{
                        fontSize: 24,
                        fontFamily: 'Inter-Regular',
                        fontWeight: '700',
                        color: theme.colors.neutral.n700,
                      }}>
                      {t('login_page.title')}
                    </Text>
                    <Text
                      style={{
                        fontSize: 20,
                        fontFamily: 'Inter-Regular',
                        fontWeight: '400',
                        lineHeight: 22,
                        color: theme.colors.neutral.n600,
                      }}>
                      {t('login_page.subtitle')}
                    </Text>
                  </TextContainer>
                  <InputsContainer>
                    <Controller
                      name="email"
                      control={control}
                      defaultValue={email}
                      render={({field}) => (
                        <Input
                          placeholderText={t('login_page.email')}
                          keyboardType="email-address"
                          value={field.value}
                          onChangeText={text => field.onChange(text)}
                          error={formState.errors.email?.message}
                        />
                      )}
                    />
                    <Controller
                      name="password"
                      control={control}
                      defaultValue={password}
                      render={({field}) => (
                        <Input
                          placeholderText={t('login_page.password')}
                          secureTextEntry={true}
                          value={field.value}
                          onChangeText={text => field.onChange(text)}
                          error={formState.errors.password?.message}
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
                        <Text
                          style={{
                            fontSize: 16,
                            fontFamily: 'Inter-Regular',
                            color: '#BABABA',
                          }}>
                          {t('login_page.remember_me')}
                        </Text>
                      </RememberMeContainer>
                      <ForgotPasswordContainer>
                        <TouchableOpacity
                          onPress={() => Alert.alert('To be implemented')}>
                          <Text
                            style={{
                              fontSize: 16,
                              fontFamily: 'Inter-Regular',
                              color: '#FFA500',
                              textAlign: 'right',
                            }}>
                            {t('login_page.forgot_password')}
                          </Text>
                        </TouchableOpacity>
                      </ForgotPasswordContainer>
                    </InputsBottomContainer>
                  </InputsContainer>

                  <Button
                    text={t('login_page.sign_in')}
                    onPressButton={handleSubmit(onSubmit)}
                  />

                  {!keyboardStatus && (
                    <>
                      <Separator text={t('login_page.separator')} />
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
                    <Text
                      style={{
                        textAlign: 'center',
                        fontSize: 16,
                        fontFamily: 'Inter-Regular',
                        lineHeight: 20,
                        color: '#BABABA',
                      }}>
                      {t('login_page.signup_message') + ' '}
                      <Text
                        style={{
                          textAlign: 'center',
                          fontSize: 16,
                          fontFamily: 'Inter-Regular',
                          lineHeight: 20,
                          color: '#FFA500',
                        }}>
                        {t('login_page.signup')}
                      </Text>
                    </Text>
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
