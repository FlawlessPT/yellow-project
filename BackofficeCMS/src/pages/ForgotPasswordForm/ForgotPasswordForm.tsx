import { Form, required, useTranslate } from "ra-core";
import { CardActions, styled } from "@mui/material";
import { TextInput, SaveButton } from "ra-ui-materialui";
import { supabaseClient } from "@utils/supabase";

/**
 * A component that renders a form for updating the user password.
 */
export const ForgotPasswordForm = () => {
  const translate = useTranslate();
  const submit = async (values: FormData) => {
    if (!values.email) return;

    await supabaseClient.auth.resetPasswordForEmail(values.email, {
      redirectTo: `${window.location.origin}/account/update-password`,
    });
  };

  return (
    <Root onSubmit={submit}>
      <div className={SupabaseLoginFormClasses.container}>
        <div className={SupabaseLoginFormClasses.input}>
          <TextInput
            source="email"
            label={translate("ra.auth.email", {
              _: "Email",
            })}
            autoComplete="email"
            fullWidth
            validate={required()}
          />
        </div>
      </div>
      <CardActions>
        <SaveButton
          variant="contained"
          type="submit"
          className={SupabaseLoginFormClasses.button}
          label={translate("ra.action.reset_password", {
            _: "Reset password",
          })}
        />
      </CardActions>
    </Root>
  );
};

interface FormData {
  email?: string;
}

const PREFIX = "RaSupabaseForgotPasswordForm";

const SupabaseLoginFormClasses = {
  container: `${PREFIX}-container`,
  input: `${PREFIX}-input`,
  button: `${PREFIX}-button`,
};

const Root = styled(Form, {
  name: PREFIX,
  overridesResolver: (_, styles) => styles.root,
})(() => ({
  [`& .${SupabaseLoginFormClasses.container}`]: {
    padding: "0 1em 1em 1em",
  },
  [`& .${SupabaseLoginFormClasses.input}`]: {
    marginTop: "1em",
  },
  [`& .${SupabaseLoginFormClasses.button}`]: {
    width: "100%",
  },
}));
