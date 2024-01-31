// React and React Native
import React from 'react';
import { Alert } from 'react-native';

// Styles
import {
  SafeArea,
  ButtonsContainer,
  ContentContainer,
  LogoContainer,
  MainContainer,
  SocialsLoginButtonsContainer,
  TextContainer,
  Logo,
} from './styles';

// Assets
import { LogoImage } from '@assets';

// Theme
import useTheme from '@hooks/theme/useTheme';

// Utils
import { supabase } from '@utils/supabase';
import { useFeatureFlag } from '@utils/contexts';

// External Libs
import { Text } from 'react-native-elements';
import { useTranslation } from 'react-i18next';
import * as WebBrowser from 'expo-web-browser';
import { useNavigation } from '@react-navigation/native';
import * as AppleAuthentication from 'expo-apple-authentication';

// Components
import Button from '../../components/Button';
import Separator from '../../components/Separator';
import SocialLoginButton from '../../components/SocialLoginButton';

// Types
import { NoneAuthenticatedStackScreenPropsGeneric } from '../../types';

export const LandingPage = function LandingPage() {
  const { t } = useTranslation();
  const { theme } = useTheme();

  const navigation =
    useNavigation<
      NoneAuthenticatedStackScreenPropsGeneric<'Auth'>['navigation']
    >();

  const googleSignInFeatureFlag = useFeatureFlag({
    featureFlagKey: 'GOOGLE_SIGN_IN',
  });

  const appleSignInFeatureFlag = useFeatureFlag({
    featureFlagKey: 'APPLE_SIGN_IN',
  });

  const microsoftSignInFeatureFlag = useFeatureFlag({
    featureFlagKey: 'MICROSOFT_SIGN_IN',
  });

  async function googleSignIn() {
    const { error, data } = await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: {
        redirectTo: 'mw://signin/google',
      },
    });

    if (data.url) {
      WebBrowser.openBrowserAsync(data.url);
    }

    if (error) {
      Alert.alert(error.message);
    }
  }

  async function appleSignIn() {
    try {
      const credential = await AppleAuthentication.signInAsync({
        requestedScopes: [
          AppleAuthentication.AppleAuthenticationScope.FULL_NAME,
          AppleAuthentication.AppleAuthenticationScope.EMAIL,
        ],
      });
      if (credential.identityToken) {
        const {
          error,
          data: { user },
        } = await supabase.auth.signInWithIdToken({
          provider: 'apple',
          token: credential.identityToken,
        });
        console.log(JSON.stringify({ error, user }, null, 2));
        if (!error && user != null) {
          const { data: userProfile, error: profileError } = await supabase
            .from('profiles')
            .select('first_name, last_name')
            .eq('id', user.id)
            .single();

          if (profileError) {
            Alert.alert('Error fetching user profile:', profileError.message);
          } else {
            if (userProfile) {
              if (userProfile.first_name && userProfile.last_name) {
                Alert.alert(
                  'User has a filled profile:' +
                    userProfile.first_name +
                    ' ' +
                    userProfile.last_name,
                );
              } else {
                Alert.alert('User has an empty or incomplete profile.');
              }
            }
          }
        }
      } else {
        throw new Error('No identityToken.');
      }
    } catch (e: any) {
      if (e.code === 'ERR_REQUEST_CANCELED') {
        // handle that the user canceled the sign-in flow
        console.log(e);
      }
    }
  }

  return (
    <SafeArea>
      <MainContainer>
        <LogoContainer>
          <Logo resizeMode="contain" source={LogoImage} />
        </LogoContainer>
        <ContentContainer>
          <TextContainer>
            <Text
              style={{
                fontSize: 24,
                fontFamily: 'Poppins-Bold',
                color: theme.colors.disabled,
              }}>
              {t('landing_page.title')}
            </Text>
            <Text
              style={{
                fontSize: 20,
                fontFamily: 'Poppins-Regular',
                lineHeight: 22,
                color: theme.colors.disabled,
              }}>
              {t('landing_page.subtitle')}
            </Text>
          </TextContainer>
          <ButtonsContainer>
            <Button
              text={t('landing_page.sign_in')}
              onPressButton={() => navigation.navigate('Login')}
            />
            <Button
              text={t('landing_page.sign_up')}
              typeButton="outlined"
              onPressButton={() => navigation.navigate('SignUp')}
            />
          </ButtonsContainer>
          {(microsoftSignInFeatureFlag.isActive ||
            appleSignInFeatureFlag.isActive ||
            googleSignInFeatureFlag.isActive) && (
            <>
              <Separator text={t('landing_page.separator')} />
              <SocialsLoginButtonsContainer>
                {appleSignInFeatureFlag.isActive && (
                  <SocialLoginButton
                    typeButton="apple"
                    onPressButton={() => appleSignIn()}
                  />
                )}
                {microsoftSignInFeatureFlag.isActive && (
                  <SocialLoginButton
                    typeButton="microsoft"
                    onPressButton={() => navigation.navigate('SignUp')}
                  />
                )}
                {googleSignInFeatureFlag.isActive && (
                  <SocialLoginButton
                    typeButton="google"
                    onPressButton={googleSignIn}
                  />
                )}
              </SocialsLoginButtonsContainer>
            </>
          )}
        </ContentContainer>
      </MainContainer>
    </SafeArea>
  );
};
