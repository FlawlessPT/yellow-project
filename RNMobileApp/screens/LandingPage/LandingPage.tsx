// React and React Native
import React from 'react';
import { Alert, Image, ImageStyle, StyleProp } from 'react-native';

// Components
import Button from '../../components/Button';
import SocialLoginButton from '../../components/SocialLoginButton';
import Separator from '../../components/Separator';

// Styles
import {
  SafeArea,
  ButtonsContainer,
  ContentContainer,
  LogoContainer,
  MainContainer,
  SocialsLoginButtonsContainer,
  TextContainer,
  logoStyle,
} from './styles';

// External Libs
import { useTranslation } from 'react-i18next';
import { Text } from 'react-native-elements';
import { useNavigation } from '@react-navigation/native';
import * as AppleAuthentication from 'expo-apple-authentication';
import * as WebBrowser from 'expo-web-browser';

// Theme
import useTheme from '@hooks/theme/useTheme';

// Types
import { NoneAuthenticatedStackScreenPropsGeneric } from '../../types';

// Helpers
import { useFeatureFlag } from '@utils/contexts';
import { supabase } from '@utils/supabase';

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
          <Image
            style={logoStyle as StyleProp<ImageStyle>}
            resizeMode="contain"
            source={{
              uri: 'https://www.ireland-portugal.com/apr-img/Mobiweb.png',
            }}
          />
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
