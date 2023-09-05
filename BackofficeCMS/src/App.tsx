import { Admin, CustomRoutes } from "react-admin";
import { ForgotPasswordPage, LoginPage } from "ra-supabase";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { dataProvider } from "./lib/supabase.dataProvider";
import { authProvider } from "./lib/supabase.authProvider";
import { UpdatePasswordForm } from "./UpdatePasswordForm";
import { ForgotPasswordForm } from "./ForgotPasswordForm";

function BackofficeAdmin() {
  return (
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
      {/* Resources/Tables To Be Configure
       /* Example to list and edit a todos table -- this table needs to exist on supabase
          import { Resource, ListGuesser, EditGuesser } from "react-admin";
          <Resource name="todos" list={ListGuesser} edit={EditGuesser} />
      */}
    </Admin>
  );
}

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/*" element={<BackofficeAdmin />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
