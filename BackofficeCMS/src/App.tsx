import { useEffect, useState } from "react";
import {
  Admin,
  CustomRoutes,
  Resource,
  ListGuesser,
  ShowGuesser,
  Create,
  Edit,
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

const overrideConfigs: {
  [tableName: string]:
    | {
        create?: { [columnName: string]: { type: string } | undefined };
        edit?: { [columnName: string]: { type: string } | undefined };
      }
    | undefined;
} = {
  custom_pages: {
    edit: {
      content: {
        type: "rich_text",
      },
    },
    create: {
      content: {
        type: "rich_text",
      },
    },
  },
};

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
            edit={() => {
              /* TODO: improve -- Just a test for now */
              return (
                <Edit>
                  <SimpleForm style={{ maxWidth: "640px" }}>
                    {t.schema.map(({ columnName, columnType, isRequired }) => {
                      const tableInfo = overrideConfigs[t.name]?.edit;
                      const resourceInfo = tableInfo && tableInfo[columnName];
                      const resourceType = resourceInfo?.type || columnType;

                      if (
                        ["id", "created_at", "updated_at"].includes(
                          columnName
                        ) ||
                        ["json", "jsonb"].includes(resourceType)
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
                        ].includes(resourceType)
                      ) {
                        return <DateTimeInput {...inputProps} />;
                      }

                      if (["data"].includes(resourceType)) {
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
                      if ("boolean" === resourceType) {
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
                        ].includes(resourceType)
                      ) {
                        return <NumberInput {...inputProps} />;
                      }

                      if (
                        ["character varying", "json", "text"].includes(
                          resourceType
                        )
                      ) {
                        return <TextInput {...inputProps} multiline />;
                      }

                      if (["rich_text"].includes(resourceType)) {
                        return <RichTextInput {...inputProps} />;
                      }

                      return null;
                    })}
                  </SimpleForm>
                </Edit>
              );
            }}
            show={ShowGuesser}
            create={() => {
              /* TODO: improve -- Just a test for now */
              return (
                <Create>
                  <SimpleForm style={{ maxWidth: "640px" }}>
                    {t.schema.map(({ columnName, columnType, isRequired }) => {
                      const tableInfo = overrideConfigs[t.name]?.create;
                      const resourceInfo = tableInfo && tableInfo[columnName];
                      const resourceType = resourceInfo?.type || columnType;

                      if (
                        ["id", "created_at", "updated_at"].includes(
                          columnName
                        ) ||
                        ["json", "jsonb"].includes(resourceType)
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
                        ].includes(resourceType)
                      ) {
                        return <DateTimeInput {...inputProps} />;
                      }

                      if (["data"].includes(resourceType)) {
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
                      if ("boolean" === resourceType) {
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
                        ].includes(resourceType)
                      ) {
                        return <NumberInput {...inputProps} />;
                      }

                      if (
                        ["character varying", "json", "text"].includes(
                          resourceType
                        )
                      ) {
                        return <TextInput {...inputProps} multiline />;
                      }

                      if (["rich_text"].includes(resourceType)) {
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
