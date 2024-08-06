import 'react-native-url-polyfill/auto';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { createClient } from '@supabase/supabase-js';

import { supabaseProjectURL, supabaseAnonKey } from './supabase.configs';

const SecureStoreAdapter = {
  getItem: (key: string) => {
    // return SecureStore.getItemAsync(key);
  },
  setItem: (key: string, value: string) => {
    // SecureStore.setItemAsync(key, value);
  },
  removeItem: (key: string) => {
    // SecureStore.deleteItemAsync(key);
  },
};

export const supabase = createClient(supabaseProjectURL, supabaseAnonKey, {
  auth: {
    storage: AsyncStorage,
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: true,
    debug: __DEV__,
  },
});
