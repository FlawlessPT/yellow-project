import 'react-native-url-polyfill/auto';
import 'intl-pluralrules';
import React, {useState, useEffect, Suspense} from 'react';
import {supabase} from '@utils/supabase';
import {Linking, Text, View} from 'react-native';
import {Session} from '@supabase/supabase-js';
import * as WebBrowser from 'expo-web-browser';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {Account} from '@screens/Account';
import {TermsAndConditions} from '@screens/TermsAndConditions';
import {Auth} from '@screens/Auth';
import {PrivacyPolicy} from '@screens/PrivacyPolicy';
import i18n from 'i18next';
import {initReactI18next} from 'react-i18next';
import Backend from 'i18next-http-backend';
import {supabaseProjectURL} from '@utils/supabase.configs';
import {getLocales} from 'react-native-localize';

const locales = getLocales() || [];

i18n
  .use(initReactI18next)
  .use(Backend)
  .init({
    debug: __DEV__,
    backend: {
      loadPath: `${supabaseProjectURL}/rest/v1/rpc/json_mobile_international_messages_for?language={{lng}}&namespace={{ns}}`,
    },

    // To be configured for each project
    lng: locales.length > 0 ? locales[0].languageCode : 'en',
    fallbackLng: 'en',

    interpolation: {
      escapeValue: false,
    },

    react: {
      useSuspense: false,
    },
  });

const Stack = createNativeStackNavigator();

export default function App() {
  const [session, setSession] = useState<Session | null>(null);

  useEffect(() => {
    supabase.auth.getSession().then(({data: {session: s}}) => {
      setSession(s);
    });

    supabase.auth.onAuthStateChange((_event, s) => {
      console.log('event', _event);
      console.log('session', s);
      setSession(s);
    });
  }, []);

  useEffect(() => {
    Linking.addEventListener('url', event => {
      let urlString = event.url.replace('#', '?');
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
          .catch(err => console.log({err}));
      }
    });
    return () => {
      Linking.removeAllListeners('url');
    };
  }, []);

  const isLoggedIn = Boolean(session && session.user);
  return (
    <Suspense
      fallback={
        <View>
          <Text>Loading...</Text>
        </View>
      }>
      <NavigationContainer>
        <Stack.Navigator initialRouteName={isLoggedIn ? 'Home' : 'Auth'}>
          {isLoggedIn ? (
            <Stack.Screen name="Home" options={{headerShown: false}}>
              {props => <Account {...props} session={session!} />}
            </Stack.Screen>
          ) : (
            <>
              <Stack.Screen
                name="TermsAndConditions"
                component={TermsAndConditions}
                options={{title: ''}}
              />
              <Stack.Screen
                name="PrivacyPolicy"
                component={PrivacyPolicy}
                options={{title: ''}}
              />
              <Stack.Screen
                name="Auth"
                component={Auth}
                options={{headerShown: false}}
              />
            </>
          )}
        </Stack.Navigator>
      </NavigationContainer>
    </Suspense>
  );
}
