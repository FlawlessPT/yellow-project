import { getEnvVars } from '@utils/commonUtils';
import { Database } from './database.types';
import { SupabaseClient } from '@supabase/supabase-js';

const commonSupabaseInstance: SupabaseClient<Database> = getEnvVars().supabaseClient;

export default commonSupabaseInstance;
