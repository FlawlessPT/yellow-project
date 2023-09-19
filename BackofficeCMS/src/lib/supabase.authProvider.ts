import { supabaseAuthProvider } from "ra-supabase";
import { supabaseClient } from "./supabase";

export const authProvider = supabaseAuthProvider(supabaseClient, {
  getIdentity: async (user) => {
    const { data, error } = await supabaseClient
      .from("profiles")
      .select("id, full_name, roles")
      .match({ id: user.id })
      .single();

    if (!data || error) {
      throw new Error();
    }

    // if user is not ADMIN, user is logged out
    if (data && !(data.roles as string[]).includes("ADMIN")) {
      supabaseClient.auth.signOut();
      window.location.reload();
    }

    return {
      id: data.id,
      fullName: data.full_name,
    };
  },
});
