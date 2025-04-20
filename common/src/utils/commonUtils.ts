import { SupabaseClient } from '@supabase/supabase-js';

type InitVars = {
  supabaseClient: SupabaseClient;
};

let ENV_VARS: InitVars = {
  supabaseClient: null,
};

export const InitializeCommon = (initVars: InitVars) => {
  ENV_VARS = {
    ...ENV_VARS,
    ...initVars,
  };
};

export const getEnvVars = () => {
  return ENV_VARS;
};
