import 'react-native-url-polyfill/auto';
import React, {useState, useEffect} from 'react';
import {supabase} from './lib/supabase';
import Auth from './components/Auth';
import Account from './components/Account';
import {View, Linking} from 'react-native';
import {Session} from '@supabase/supabase-js';
import * as WebBrowser from 'expo-web-browser';

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

  return (
    <View>
      {session && session.user ? (
        <Account key={session.user.id} session={session} />
      ) : (
        <Auth />
      )}
    </View>
  );
}
