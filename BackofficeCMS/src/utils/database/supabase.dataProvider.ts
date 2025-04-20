import { supabaseDataProvider } from 'ra-supabase';

import { supabaseAnonKey, supabaseProjectURL } from './supabase.configs';
import { supabaseClient } from './supabase.instance';

export const dataProvider = supabaseDataProvider({
  instanceUrl: supabaseProjectURL,
  apiKey: supabaseAnonKey,
  supabaseClient,
});
