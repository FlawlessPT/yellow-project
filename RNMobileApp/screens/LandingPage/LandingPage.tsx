// React and React Native
import React from 'react';
import {Image, ImageStyle, StyleProp} from 'react-native';

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
import {useTranslation} from 'react-i18next';
import {Text} from 'react-native-elements';
import {useNavigation} from '@react-navigation/native';

// Theme
import theme from '../../theme';

// Types
import {NoneAuthenticatedStackScreenPropsGeneric} from '../../types';

// Helpers
import {useFeatureFlag} from '@utils/contexts';

export const LandingPage = function LandingPage() {
  const {t} = useTranslation();

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
                fontFamily: 'Inter-Regular',
                fontWeight: '700',
                color: theme.colors.neutral.n700,
              }}>
              {t('landing_page.title')}
            </Text>
            <Text
              style={{
                fontSize: 20,
                fontFamily: 'Inter-Regular',
                fontWeight: '400',
                lineHeight: 22,
                color: theme.colors.neutral.n600,
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
                    onPressButton={() => navigation.navigate('SignUp')}
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
                    onPressButton={() => navigation.navigate('SignUp')}
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
