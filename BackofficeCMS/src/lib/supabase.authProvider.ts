import { supabaseAuthProvider } from "ra-supabase";
import { supabaseClient } from "./supabase";

const baseAuthProvider = supabaseAuthProvider(supabaseClient, {
  getIdentity: async (user) => {
    const { data, error } = await supabaseClient
      .from("profiles")
      .select("id, full_name, roles")
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
export const authProvider = {
  ...baseAuthProvider,
  login: async (params: { email: string; password: string }) => {
    const loginPromise = await baseAuthProvider.login(params);

    // checking if logged in user as the ADMIN role
    const { error: sessionError, data: sessionData } =
      await supabaseClient.auth.getSession();

    if (sessionData && sessionData.session?.user) {
      const { data, error } = await supabaseClient
        .from("profiles")
        .select("id, roles")
        .match({ id: sessionData.session.user.id })
        .single();

      if (
        !data ||
        error ||
        (data && !(data.roles as string[]).includes("ADMIN"))
      ) {
        throw new Error();
      }
    } else if (sessionError) {
      throw new Error();
    }

    return loginPromise;
  },
};
