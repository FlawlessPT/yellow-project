import { createClient, SupabaseClientOptions } from '@supabase/supabase-js';

type SetupSupabaseClientOptions = {
  projectUrl: string;
  anonKey: string;
} & SupabaseClientOptions<unknown>;

export const setupSupabaseClient = (options: SetupSupabaseClientOptions) => {
  const { projectUrl, anonKey } = options;

  return createClient(projectUrl, anonKey, {
    auth: {
      autoRefreshToken: true,
      persistSession: true,
      detectSessionInUrl: true,
      ...options,
    },
  });
};
