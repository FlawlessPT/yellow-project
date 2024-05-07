import { ForgotPasswordPage, LoginPage } from 'ra-supabase';
import { Admin, CustomRoutes, Resource } from 'react-admin';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

import { isResourceVisibleForRoles, isViewModeEnabledForResource, recordRepresentationForResource } from '@configs';

import Dashboard from '@pages/Dashboard';
import { ForgotPasswordForm } from '@pages/ForgotPasswordForm';
import { UpdatePasswordForm } from '@pages/UpdatePasswordForm';

import { CustomResourceFormGuesser } from '@components/CustomResourceFormGuesser';
import { CustomResourceListGuesser } from '@components/CustomResourceListGuesser';

import { useCustomResources, useFetchSession } from '@hooks';

import { TablesContext } from '@utils/contexts/tables';
import { authProvider } from '@utils/supabase.authProvider';
import { dataProvider } from '@utils/supabase.dataProvider';
import themeConfigs from '@utils/theme';

function BackOfficeAdmin() {
  const { tables, tablesToExclude, isLoading } = useCustomResources();
  const { session } = useFetchSession();

  if (isLoading) return <p>Loading back office</p>;

  return (
    <TablesContext.Provider value={{ tables }}>
      <Admin
        basename="/admin"
        dataProvider={dataProvider}
        authProvider={authProvider}
        loginPage={LoginPage}
        dashboard={Dashboard}
        {...themeConfigs}
      >
        <CustomRoutes noLayout>
          <Route path="/account/update-password" element={<UpdatePasswordForm />} />
          <Route path={ForgotPasswordPage.path} element={<ForgotPasswordForm />} />
        </CustomRoutes>

        {session &&
          tables.map((t) => {
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
                recordRepresentation={(record) => {
                  const recordRepresentationColumn = recordRepresentationForResource({
                    tableName: t.name,
                  });

                  return recordRepresentationColumn && (record[recordRepresentationColumn] || record['id']);
                }}
                list={() => <CustomResourceListGuesser tableInfo={t} />}
                edit={isEditable ? () => <CustomResourceFormGuesser tableInfo={t} viewMode="edit" /> : undefined}
                create={isCreatable ? () => <CustomResourceFormGuesser tableInfo={t} viewMode="create" /> : undefined}
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
        <Route path="/admin/*" element={<BackOfficeAdmin />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
