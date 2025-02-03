import { createClient } from '@supabase/supabase-js';

import { supabaseProjectURL, supabaseAnonKey } from './supabase.configs';

export const supabaseClient = createClient(supabaseProjectURL, supabaseAnonKey, {
  auth: {
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: true,
  },
});
