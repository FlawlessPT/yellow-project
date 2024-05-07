import * as Sentry from '@sentry/react';
import { supabaseAuthProvider } from 'ra-supabase';

import { supabaseClient } from './supabase';

import { DatabaseUserRoles } from '@types';

const baseAuthProvider = supabaseAuthProvider(supabaseClient, {
  getIdentity: async (user) => {
    const { data, error } = await supabaseClient
      .from('profiles')
      .select('id, full_name, roles')
      .match({ id: user.id })
      .single();

    if (!data || error) {
      throw new Error();
    }

    Sentry.setUser({
      id: user.id,
      email: user.email,
    });

    return {
      id: data.id,
      fullName: data.full_name,
    };
  },
});
export const authProvider = {
  ...baseAuthProvider,
  login: async (params: { email: string; password: string }) => {
    const loginPromise = await baseAuthProvider.login(params);

    // checking if logged in user as the ADMIN role
    const { error: sessionError, data: sessionData } = await supabaseClient.auth.getSession();

    if (sessionData && sessionData.session?.user) {
      const { data, error } = await supabaseClient
        .from('profiles')
        .select('id, roles')
        .match({ id: sessionData.session.user.id })
        .single();

      const userRoles = data?.roles as string[];

      if (!data || error || (data && !userRoles.includes('ADMIN') && !userRoles.includes('SUPER_ADMIN'))) {
        throw new Error('User is not an admin');
      }
    } else if (sessionError) {
      throw new Error('Error fetching session');
    }

    return loginPromise;
  },
  // get user role from supabase table profiles based on session user id
  getUserRoles: async (userId: string): Promise<DatabaseUserRoles> => {
    const { data, error } = await supabaseClient.from('profiles').select('roles').match({ id: userId }).single();

    if (!data || error) {
      throw new Error();
    }

    return data.roles;
  },
};
