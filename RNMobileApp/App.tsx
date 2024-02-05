import 'react-native-url-polyfill/auto';
import 'intl-pluralrules';
import React, { useState, useEffect, Suspense } from 'react';
import { supabase } from '@utils/supabase';
import { Linking, Text, View } from 'react-native';
import { Session } from '@supabase/supabase-js';
import * as WebBrowser from 'expo-web-browser';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Account } from '@screens/Account';
import { TermsAndConditions } from '@screens/TermsAndConditions';
import { Auth } from '@screens/Auth';
import { PrivacyPolicy } from '@screens/PrivacyPolicy';
import { Tutorial } from '@screens/Tutorial';
import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import Backend from 'i18next-http-backend';
import { supabaseAnonKey, supabaseProjectURL } from '@utils/supabase.configs';
import { getLocales } from 'react-native-localize';
import * as Sentry from '@sentry/react-native';
import Config from 'react-native-config';
import { FeatureFlagsContextProvider } from '@utils/contexts';
import { LogLevel, OneSignal } from 'react-native-onesignal';
import { LandingPage } from '@screens/LandingPage';
import { Login } from '@screens/Login';
import { SignUp } from '@screens/SignUp';
import { ThemeProvider } from 'styled-components/native';
import useTheme from '@hooks/theme';

// Remove this method to stop OneSignal Debugging
if (__DEV__) {
  OneSignal.Debug.setLogLevel(LogLevel.Verbose);
}

// OneSignal Initialization
if (Config.ONE_SIGNAL_APP_ID) {
  OneSignal.initialize(Config.ONE_SIGNAL_APP_ID);

  // requestPermission will show the native iOS or Android notification permission prompt.
  // We recommend removing the following code and instead using an In-App Message to prompt for notification permission
  OneSignal.Notifications.requestPermission(true);

  // Method for listening for notification clicks
  OneSignal.Notifications.addEventListener('click', event => {
    console.log('OneSignal: notification clicked:', event);
  });
}

// Init Sentry only in production
if (!__DEV__) {
  Sentry.init({
    dsn: Config.SENTRY_DSN,
    environment: Config.SENTRY_ENVIRONMENT,
  });
}

const DEFAULT_LANGUAGE = 'en';
const locales = getLocales() || [];

i18n
  .use(initReactI18next)
  .use(Backend)
  .init({
    debug: __DEV__,
    backend: {
      loadPath: `${supabaseProjectURL}/rest/v1/rpc/json_mobile_international_messages_for?language={{lng}}&namespace={{ns}}&apikey=${supabaseAnonKey}`,
    },
    lng: locales.length > 0 ? locales[0].languageCode : DEFAULT_LANGUAGE,
    fallbackLng: DEFAULT_LANGUAGE,
    interpolation: {
      escapeValue: false,
    },
    react: {
      useSuspense: false,
    },
  });

const Stack = createNativeStackNavigator();

function App() {
  const [session, setSession] = useState<Session | null>(null);

  const { theme } = useTheme();

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session: s } }) => {
      setSession(s);
    });

    supabase.auth.onAuthStateChange((_event, s) => {
      if (s?.user) {
        Sentry.setUser({
          id: s?.user.id,
          email: s?.user.email,
        });
      }

      setSession(s);
    });
  }, []);

  useEffect(() => {
    Linking.addEventListener('url', event => {
      const urlString = event.url.replace('#', '?');
      const url = new URL(urlString);

      const refreshToken = url.searchParams.get('refresh_token');
      const accessToken = url.searchParams.get('access_token');

      if (accessToken && refreshToken) {
        supabase.auth
          .setSession({
            refresh_token: refreshToken,
            access_token: accessToken,
          })
          .then(() => {
            if (
              url.hostname === 'signin' &&
              ['/github', '/google'].includes(url.pathname)
            ) {
              WebBrowser.dismissBrowser();
            }
          })
          .catch(err => console.log({ err }));
      }
    });
    return () => {
      Linking.removeAllListeners('url');
    };
  }, []);

  const isLoggedIn = Boolean(session && session.user);
  return (
    <ThemeProvider theme={theme}>
      <Suspense
        fallback={
          <View>
            <Text>Loading...</Text>
          </View>
        }>
        <FeatureFlagsContextProvider>
          <NavigationContainer>
            <Stack.Navigator
              initialRouteName={isLoggedIn ? 'Home' : 'LandingPage'}>
              {isLoggedIn && session ? (
                <Stack.Screen name="Home" options={{ headerShown: false }}>
                  {props => <Account {...props} session={session} />}
                </Stack.Screen>
              ) : (
                <>
                  <Stack.Screen
                    name="LandingPage"
                    component={LandingPage}
                    options={{ headerShown: false }}
                  />
                  <Stack.Screen
                    name="TermsAndConditions"
                    component={TermsAndConditions}
                    options={{ title: '' }}
                  />
                  <Stack.Screen
                    name="PrivacyPolicy"
                    component={PrivacyPolicy}
                    options={{ title: '' }}
                  />
                  <Stack.Screen
                    name="Tutorial"
                    component={Tutorial}
                    options={{ headerShown: false }}
                  />
                  <Stack.Screen
                    name="Login"
                    component={Login}
                    options={{ headerShown: false }}
                  />
                  <Stack.Screen
                    name="SignUp"
                    component={SignUp}
                    options={{ headerShown: false }}
                  />
                </>
              )}
            </Stack.Navigator>
          </NavigationContainer>
        </FeatureFlagsContextProvider>
      </Suspense>
    </ThemeProvider>
  );
}

const HOCApp = __DEV__ ? App : Sentry.wrap(App);

export default HOCApp;
