import { supabaseAuthProvider } from "ra-supabase";
import { supabaseClient } from "./supabase";

export const authProvider = supabaseAuthProvider(supabaseClient, {
  getIdentity: async (user) => {
    const { data, error } = await supabaseClient
      .from("profiles")
      .select("id, full_name")
      .match({ id: user.id })
      .single();

    if (!data || error) {
      throw new Error();
    }

    return {
      id: data.id,
      fullName: data.full_name,
    };
  },
});
