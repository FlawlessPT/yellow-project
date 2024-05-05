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
import {ColumnType, TableInfoType, UserSession} from '@types';
import {CustomResourceFormGuesser} from '@components/CustomResourceFormGuesser';
import {
  getGeneralOverrides,
  isResourceVisibleForRoles,
  isViewModeEnabledForResource,
  recordRepresentationForResource,
} from '@configs';
import {TablesContext} from '@utils/contexts/tables';
import {CustomResourceListGuesser} from '@components/CustomResourceListGuesser';

function BackOfficeAdmin() {
  const [isLoading, setLoading] = useState(false);
  const [tables, setTables] = useState<TableInfoType[]>([]);

  useEffect(() => {
    async function fetchTableNames() {
      setLoading(true);

      const {data: tablesInfo = []} =
        await supabaseClient.rpc('get_all_table_name');
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

  const [session, setSession] = useState<UserSession>();

  useEffect(() => {
    supabaseClient.auth.getSession().then(({data: {session}}) => {
      if (session?.user) {
        authProvider.getUserRoles(session.user.id).then(profileRoles => {
          setSession({...session, user: {...session.user, profileRoles}});
        });
      }
    });
  }, [session?.user.id]);

  const generalOverrides = getGeneralOverrides();
  const tablesToExclude = generalOverrides?.tablesToExclude || [];

  if (isLoading) return <p>Loading back office</p>;

  return (
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

        {session &&
          tables.map(t => {
            const isEditable = isViewModeEnabledForResource({
              tableName: t.name,
              viewMode: 'edit',
            });
            const isCreatable = isViewModeEnabledForResource({
              tableName: t.name,
              viewMode: 'create',
            });
            const isResourceVisible = isResourceVisibleForRoles({
              tableName: t.name,
              roles: session.user.profileRoles,
            });

            return !tablesToExclude.includes(t.name) && isResourceVisible ? (
              <Resource
                key={t.name}
                name={t.name}
                recordRepresentation={record => {
                  const recordRepresentationColumn =
                    recordRepresentationForResource({
                      tableName: t.name,
                    });

                  return (
                    recordRepresentationColumn &&
                    (record[recordRepresentationColumn] || record['id'])
                  );
                }}
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
