import { setupSupabaseClient } from '@flawlesspt/yellow-common';

import { supabaseAnonKey, supabaseProjectURL } from './supabase.configs';

export const supabaseClient = setupSupabaseClient({
  projectUrl: supabaseProjectURL,
  anonKey: supabaseAnonKey,
});
