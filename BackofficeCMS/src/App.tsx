import {useEffect, useState} from 'react';
import {Admin, CustomRoutes, Resource} from 'react-admin';
import {ForgotPasswordPage, LoginPage} from 'ra-supabase';
import {BrowserRouter, Route, Routes} from 'react-router-dom';
import {dataProvider} from '@utils/supabase.dataProvider';
import {authProvider} from '@utils/supabase.authProvider';
import {UpdatePasswordForm} from '@pages/UpdatePasswordForm';
import {ForgotPasswordForm} from '@pages/ForgotPasswordForm';
import {supabaseClient} from '@utils/supabase';
import {PostgrestSingleResponse} from '@supabase/supabase-js';
import {ColumnType, TableInfoType} from '@types';
import {CustomResourceFormGuesser} from '@components/CustomResourceFormGuesser';
import {
  getGeneralOverrides,
  isViewModeEnabledForResource,
  recordRepresentationForResource,
} from '@configs';
import {CustomResourceListGuesser} from '@components/CustomResourceListGuesser';
import {TablesContext} from '@utils/contexts/tables';

function BackOfficeAdmin() {
  const [isLoading, setLoading] = useState(false);
  const [tables, setTables] = useState<TableInfoType[]>([]);

  useEffect(() => {
    async function fetchTableNames() {
      setLoading(true);

      const {data: tablesInfo = []} = await supabaseClient.rpc(
        'get_all_table_name',
      );
      const backOfficeTablesScheme: typeof tables = (
        tablesInfo as Array<{table_name: string}>
      ).map((t: {table_name: string}) => ({
        name: t.table_name,
        schema: [],
      }));

      const allTablePromises = backOfficeTablesScheme.map(({name}) =>
        supabaseClient.rpc('get_types', {tname: name}),
      );

      const allTableInfoResults = await Promise.all(allTablePromises);
      allTableInfoResults.forEach(
        (
          response: PostgrestSingleResponse<
            {
              column_name: string;
              data_type: ColumnType;
              is_nullable: string;
              default_value: string | null;
            }[]
          >,
          i,
        ) => {
          backOfficeTablesScheme[i].schema =
            response.data?.map(c => ({
              columnName: c.column_name,
              columnType: c.data_type,
              isRequired: c.is_nullable === 'NO' && c.default_value === null,
            })) || [];
        },
      );

      setTables(backOfficeTablesScheme);
      setLoading(false);
    }

    fetchTableNames();
  }, []);

  const generalOverrides = getGeneralOverrides();
  const tablesToExclude = generalOverrides?.tablesToExclude || [];

  return isLoading ? (
    <p>Your BackOffice is being loaded</p>
  ) : (
    <TablesContext.Provider value={{tables}}>
      <Admin
        dataProvider={dataProvider}
        authProvider={authProvider}
        loginPage={LoginPage}>
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

        {tables.map(t => {
          const isEditable = isViewModeEnabledForResource({
            tableName: t.name,
            viewMode: 'edit',
          });
          const isCreatable = isViewModeEnabledForResource({
            tableName: t.name,
            viewMode: 'create',
          });

          return !tablesToExclude.includes(t.name) ? (
            <Resource
              key={t.name}
              name={t.name}
              recordRepresentation={recordRepresentationForResource({
                tableName: t.name,
              })}
              list={() => <CustomResourceListGuesser tableInfo={t} />}
              edit={
                isEditable
                  ? () => (
                      <CustomResourceFormGuesser
                        tableInfo={t}
                        viewMode="edit"
                      />
                    )
                  : undefined
              }
              create={
                isCreatable
                  ? () => (
                      <CustomResourceFormGuesser
                        tableInfo={t}
                        viewMode="create"
                      />
                    )
                  : undefined
              }
            />
          ) : null;
        })}
      </Admin>
    </TablesContext.Provider>
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
