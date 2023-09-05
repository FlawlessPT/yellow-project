import {
  Admin,
  Resource,
  ListGuesser,
  EditGuesser,
  CustomRoutes,
} from "react-admin";
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
        {/* Styles should be the same layout as admin
        <Route
          path="/account/update-password"
          element={
            <div
              style={{
                display: "flex",
                justifyContent: "center",
              }}
            >
              <UpdatePasswordForm />
            </div>
          }
        />
        */}
      </Routes>
    </BrowserRouter>
  );
}

export default App;
