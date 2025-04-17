import { createClient, SupabaseClient, SupabaseClientOptions } from '@supabase/supabase-js';

type SetupSupabaseClientOptions = {
  projectUrl: string;
  anonKey: string;
} & SupabaseClientOptions<unknown>;

/**
 * Sets up a Supabase client with the provided options.
 *
 * @param {SetupSupabaseClientOptions} options - The options for setting up the Supabase client.
 * @param {string} options.projectUrl - The URL of the Supabase project.
 * @param {string} options.anonKey - The anonymous key for the Supabase project.
 * @returns {SupabaseClient} - The configured Supabase client.
 */
export const setupSupabaseClient = (options: SetupSupabaseClientOptions): SupabaseClient => {
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
