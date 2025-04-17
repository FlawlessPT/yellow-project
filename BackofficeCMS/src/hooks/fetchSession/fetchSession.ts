import { useEffect, useState } from 'react';

import supabaseClient, { authProvider } from '@utils/database';

import { UserSession } from '@types';

interface UseFetchSessionResult {
  session: UserSession | undefined;
}

const useFetchSession = (): UseFetchSessionResult => {
  const [session, setSession] = useState<UserSession>();

  useEffect(() => {
    supabaseClient.auth.getSession().then(({ data: { session } }) => {
      if (session?.user) {
        authProvider.getUserRoles(session.user.id).then((profileRoles) => {
          setSession({ ...session, user: { ...session.user, profileRoles } });
        });
      }
    });
  }, [session?.user.id]);

  return { session };
};

export default useFetchSession;
