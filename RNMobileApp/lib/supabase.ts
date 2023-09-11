import 'react-native-url-polyfill/auto';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {createClient} from '@supabase/supabase-js';
import {supabaseProjectURL, supabaseAnonKey} from './supabase.configs';
// TODO: NEEDS TO USER A BETTER LIBRARY FOR SECURITY PURPOSES INSTEAD OF AsyncStorage
const SecureStoreAdapter = {
  getItem: (key: string) => {
    return AsyncStorage.getItem(key);
  },
  setItem: (key: string, value: string) => {
    AsyncStorage.setItem(key, value);
  },
  removeItem: (key: string) => {
    AsyncStorage.removeItem(key);
  },
};

export const supabase = createClient(supabaseProjectURL, supabaseAnonKey, {
  auth: {
    storage: SecureStoreAdapter as any,
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: true,
  },
});
