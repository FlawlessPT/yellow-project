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
  Logo,
} from './styles';

// Assets
import { LogoImage } from '@assets';

// Utils
import { supabase } from '@utils/supabase';
import { useFeatureFlag } from '@utils/contexts';

// External Libs
import * as WebBrowser from 'expo-web-browser';
import { useNavigation } from '@react-navigation/native';
import * as AppleAuthentication from 'expo-apple-authentication';

// Types
import { NoneAuthenticatedStackScreenPropsGeneric } from '../../types';

// Components
import { Button, Separator, SocialLoginButton } from '@components';

const LandingPage = () => {
  const navigation =
    useNavigation<
      NoneAuthenticatedStackScreenPropsGeneric<'Auth'>['navigation']
    >();

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

  const googleSignInFeatureFlag = useFeatureFlag({
    featureFlagKey: 'GOOGLE_SIGN_IN',
  }).isActive;

  const appleSignInFeatureFlag = useFeatureFlag({
    featureFlagKey: 'APPLE_SIGN_IN',
  }).isActive;

  const microsoftSignInFeatureFlag = useFeatureFlag({
    featureFlagKey: 'MICROSOFT_SIGN_IN',
  }).isActive;

  const withFeatureFlag =
    googleSignInFeatureFlag ||
    appleSignInFeatureFlag ||
    microsoftSignInFeatureFlag;

  return (
    <SafeArea>
      <MainContainer>
        <LogoContainer>
          <Logo resizeMode="contain" source={LogoImage} />
        </LogoContainer>
        <ContentContainer>
          <ButtonsContainer>
            <Button
              text={'landing_page.sign_in'}
              onPressButton={() => navigation.navigate('Login')}
            />
            <Button
              text={'landing_page.sign_up'}
              hasBorder
              onPressButton={() => navigation.navigate('SignUp')}
            />
          </ButtonsContainer>
          {withFeatureFlag && (
            <>
              <Separator text={'landing_page.separator'} />
              <SocialsLoginButtonsContainer>
                {appleSignInFeatureFlag && (
                  <SocialLoginButton
                    buttonType="apple"
                    onPressButton={() => appleSignIn()}
                  />
                )}
                {microsoftSignInFeatureFlag && (
                  <SocialLoginButton
                    buttonType="microsoft"
                    onPressButton={() => navigation.navigate('SignUp')}
                  />
                )}
                {googleSignInFeatureFlag && (
                  <SocialLoginButton
                    buttonType="google"
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

export default LandingPage;
