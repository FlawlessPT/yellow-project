import {Session} from '@supabase/supabase-js';
import {supabase} from '@utils/supabase';
import React, {createContext, useContext, useEffect, useState} from 'react';

type FeatureFlagType = {
  key: string;
  active: boolean;
  users?: string[];
};

const DEFAULT_REFRESH_FEATURE_FLAGS_IN_MS = 60000;
const FeatureFlagsContext = createContext<{
  featureFlags: FeatureFlagType[];
}>({featureFlags: []});

export const FeatureFlagsContextProvider = ({
  children,
}: {
  children: React.ReactNode;
  refreshInMsc?: number;
}) => {
  const [featureFlags, setFeatureFlags] = useState<FeatureFlagType[]>([]);

  useEffect(() => {
    const fetchFeatureFlags = async () => {
      const {data} = await supabase
        .from('feature_flags')
        .select('key, users_ids, environments, active');

      if (data) {
        setFeatureFlags(
          data.map(f => ({key: f.key, active: f.active, users: f.users_ids})),
        );
      }
    };

    fetchFeatureFlags();

    setInterval(fetchFeatureFlags, DEFAULT_REFRESH_FEATURE_FLAGS_IN_MS);
  }, []);

  return (
    <FeatureFlagsContext.Provider value={{featureFlags}}>
      {children}
    </FeatureFlagsContext.Provider>
  );
};

export const useFeatureFlag = ({featureFlagKey}: {featureFlagKey: string}) => {
  const [session, setSession] = useState<Session | null>(null);
  const featureFlagsData = useContext(FeatureFlagsContext);
  const featureFlag = featureFlagsData.featureFlags.find(
    f => f.key === featureFlagKey,
  );

  useEffect(() => {
    supabase.auth.getSession().then(({data: {session: s}}) => {
      setSession(s);
    });

    supabase.auth.onAuthStateChange((_event, s) => {
      setSession(s);
    });
  }, []);

  return {
    isActive: !featureFlag?.users?.length
      ? !!featureFlag?.active
      : !!session?.user.id &&
        featureFlag?.users.includes(session?.user.id) &&
        !!featureFlag?.active,
  };
};
