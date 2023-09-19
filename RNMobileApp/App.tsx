import 'react-native-url-polyfill/auto';
import React, {useState, useEffect} from 'react';
import {supabase} from './lib/supabase';
import {Linking} from 'react-native';
import {Session} from '@supabase/supabase-js';
import * as WebBrowser from 'expo-web-browser';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {Account} from './screens/Account';
import {TermsAndConditions} from './screens/TermsAndConditions';
import {Auth} from './screens/Auth';
import {PrivacyPolicy} from './screens/PrivacyPolicy';

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
  );
}
