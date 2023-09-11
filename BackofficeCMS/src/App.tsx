import { useEffect, useState } from "react";
import {
  Admin,
  CustomRoutes,
  Resource,
  ListGuesser,
  EditGuesser,
  ShowGuesser,
  Create,
  SimpleForm,
  TextInput,
  DateInput,
  DateTimeInput,
  BooleanInput,
  NumberInput,
  required,
  InputProps,
} from "react-admin";
import { RichTextInput } from "ra-input-rich-text";
import { ForgotPasswordPage, LoginPage } from "ra-supabase";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { dataProvider } from "./lib/supabase.dataProvider";
import { authProvider } from "./lib/supabase.authProvider";
import { UpdatePasswordForm } from "./UpdatePasswordForm";
import { ForgotPasswordForm } from "./ForgotPasswordForm";
import { supabaseClient } from "./lib/supabase";
import { PostgrestSingleResponse } from "@supabase/supabase-js";

function BackOfficeAdmin() {
  const [isLoading, setLoading] = useState(false);
  const [tables, setTables] = useState<
    {
      name: string;
      schema: { columnName: string; columnType: string; isRequired: boolean }[];
    }[]
  >([]);

  useEffect(() => {
    async function fetchTableNames() {
      setLoading(true);

      const { data: tablesInfo } = await supabaseClient.rpc(
        "get_all_table_name"
      );
      const backOfficeTablesScheme: typeof tables = (
        tablesInfo as Array<{ table_name: string }>
      ).map((t: { table_name: string }) => ({
        name: t.table_name,
        schema: [],
      }));

      const allTablePromises = backOfficeTablesScheme.map(({ name }) =>
        supabaseClient.rpc("get_types", { tname: name })
      );

      const allTableInfoResults = await Promise.all(allTablePromises);
      allTableInfoResults.forEach(
        (
          response: PostgrestSingleResponse<
            { column_name: string; data_type: string; is_nullable: string }[]
          >,
          i
        ) => {
          backOfficeTablesScheme[i].schema =
            response.data?.map((c) => ({
              columnName: c.column_name,
              columnType: c.data_type,
              isRequired: c.is_nullable === "NO",
            })) || [];
        }
      );

      setTables(backOfficeTablesScheme);
      setLoading(false);
    }

    fetchTableNames();
  }, []);

  return isLoading ? (
    <p>Your BackOffice is being loading</p>
  ) : (
    <Admin
      dataProvider={dataProvider}
      authProvider={authProvider}
      loginPage={LoginPage}
    >
      <CustomRoutes noLayout>
        <Route
          path="/account/update-password"
          element={<UpdatePasswordForm />}
        />
        <Route
          path={ForgotPasswordPage.path}
          element={<ForgotPasswordForm />}
        />
      </CustomRoutes>

      {tables.map((t) =>
        t.name !== "profiles" ? (
          <Resource
            key={t.name}
            name={t.name}
            list={ListGuesser}
            edit={EditGuesser}
            show={ShowGuesser}
            create={() => {
              /* TODO: improve -- Just a text for now */
              return (
                <Create>
                  <SimpleForm style={{ maxWidth: "640px" }}>
                    {t.schema.map(({ columnName, columnType, isRequired }) => {
                      if (
                        ["id", "created_at", "updated_at"].includes(
                          columnName
                        ) ||
                        ["json", "jsonb"].includes(columnType)
                      )
                        return null;

                      const inputProps: InputProps & {
                        key: string;
                        fullWidth?: boolean;
                      } = {
                        key: columnName,
                        label: columnName,
                        source: columnName,
                        validate: isRequired ? [required()] : undefined,
                        fullWidth: true,
                      };

                      if (
                        [
                          "timestamp with time zone",
                          "timestamp without time zone",
                        ].includes(columnType)
                      ) {
                        return <DateTimeInput {...inputProps} />;
                      }

                      if (["data"].includes(columnType)) {
                        return <DateInput {...inputProps} />;
                      }
                      /* TODO: needs to review because it is returning date as well
                      if (["time without time zone"].includes(columnType)) {
                        return (
                          <TimeInput
                            {...inputProps}
                            validate={isRequired ? [required()] : undefined}
                          />
                        );
                      }
                      */
                      if ("boolean" === columnType) {
                        return <BooleanInput {...inputProps} />;
                      }

                      if (
                        [
                          "bigint",
                          "smallint",
                          "integer",
                          "real",
                          "double precision",
                          "numberic",
                        ].includes(columnType)
                      ) {
                        return <NumberInput {...inputProps} />;
                      }

                      if (["character varying", "json"].includes(columnType)) {
                        return <TextInput {...inputProps} multiline />;
                      }

                      if (["text"].includes(columnType)) {
                        return <RichTextInput {...inputProps} />;
                      }

                      return null;
                    })}
                  </SimpleForm>
                </Create>
              );
            }}
          />
        ) : null
      )}
    </Admin>
  );
}

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/*" element={<BackOfficeAdmin />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
