import { supabaseDataProvider } from "ra-supabase";
import { supabaseClient } from "./supabase";
import { supabaseAnonKey, supabaseProjectURL } from "./supabase.configs";

export const dataProvider = supabaseDataProvider({
  instanceUrl: supabaseProjectURL,
  apiKey: supabaseAnonKey,
  supabaseClient,
});
