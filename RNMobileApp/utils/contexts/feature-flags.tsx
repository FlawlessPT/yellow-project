import {Session} from '@supabase/supabase-js';
import {supabase} from '@utils/supabase';
import React, {createContext, useContext, useEffect, useState} from 'react';

type FeatureFlagType = {
  key: string;
  active: boolean;
  users?: string[];
  roles?: string[];
};

type SignedInUserType = {
  id: string;
  roles?: string[];
};

const DEFAULT_REFRESH_FEATURE_FLAGS_IN_MS = 60000;
const FeatureFlagsContext = createContext<{
  featureFlags: FeatureFlagType[];
  signedInUser?: SignedInUserType;
}>({featureFlags: []});

export const FeatureFlagsContextProvider = ({
  children,
}: {
  children: React.ReactNode;
  refreshInMsc?: number;
}) => {
  const [featureFlags, setFeatureFlags] = useState<FeatureFlagType[]>([]);
  const [signedInUser, setSignedInUser] = useState<SignedInUserType>();

  useEffect(() => {
    const updateSignedInUser = async (session: Session | null) => {
      let user: SignedInUserType | null = null;
      if (session?.user.id) {
        user = {
          id: session.user.id,
        };
        const {data} = await supabase
          .from('profiles')
          .select('id, roles')
          .match({id: session.user.id})
          .single();

        if (data) {
          user.roles = data.roles;
        }
      }

      setSignedInUser(user || undefined);
    };

    supabase.auth.getSession().then(({data: {session: s}}) => {
      updateSignedInUser(s);
    });

    supabase.auth.onAuthStateChange((_event, s) => {
      updateSignedInUser(s);
    });
  }, []);

  useEffect(() => {
    const fetchFeatureFlags = async () => {
      const {data} = await supabase
        .from('feature_flags')
        .select('key, users_ids, active, roles');

      if (data) {
        setFeatureFlags(
          data.map(f => ({
            key: f.key,
            active: f.active,
            users: f.users_ids,
            roles: f.roles,
          })),
        );
      }
    };

    fetchFeatureFlags();

    setInterval(fetchFeatureFlags, DEFAULT_REFRESH_FEATURE_FLAGS_IN_MS);
  }, []);

  return (
    <FeatureFlagsContext.Provider value={{featureFlags, signedInUser}}>
      {children}
    </FeatureFlagsContext.Provider>
  );
};

export const useFeatureFlag = ({featureFlagKey}: {featureFlagKey: string}) => {
  const {featureFlags, signedInUser} = useContext(FeatureFlagsContext);
  const featureFlag = featureFlags.find(f => f.key === featureFlagKey);

  const isForAnyUser = !featureFlag?.users?.length;
  const isForAnyRole = !featureFlag?.roles?.length;
  const isFeatureFlagForAnyone = isForAnyUser && isForAnyRole;

  const isUserMatched =
    signedInUser &&
    (isForAnyUser || featureFlag.users?.includes(signedInUser.id));
  const isRolesMatched =
    signedInUser &&
    (isForAnyRole ||
      featureFlag.roles?.some(r => signedInUser.roles?.includes(r)));
  const isProfiledMatched = isUserMatched && isRolesMatched;

  return {
    isActive:
      featureFlag?.active && (isFeatureFlagForAnyone || isProfiledMatched),
  };
};
