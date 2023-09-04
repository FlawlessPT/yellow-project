import { createClient } from "@supabase/supabase-js";
import { supabaseProjectURL, supabaseAnonKey } from "./supabase.configs";

export const supabaseClient = createClient(supabaseProjectURL, supabaseAnonKey);
