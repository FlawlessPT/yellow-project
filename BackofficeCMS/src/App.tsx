import {
  Admin,
  CustomRoutes,
  Resource,
  ListGuesser,
  EditGuesser,
} from "react-admin";
import { LoginPage, SetPasswordPage, ForgotPasswordPage } from "ra-supabase";
import { BrowserRouter, Route } from "react-router-dom";
import { dataProvider } from "./lib/supabase.dataProvider";
import { authProvider } from "./lib/supabase.authProvider";

function App() {
  return (
    <BrowserRouter>
      <Admin
        dataProvider={dataProvider}
        authProvider={authProvider}
        loginPage={LoginPage}
      >
        <CustomRoutes noLayout>
          <Route path={SetPasswordPage.path} element={<SetPasswordPage />} />
          <Route
            path={ForgotPasswordPage.path}
            element={<ForgotPasswordPage />}
          />
        </CustomRoutes>
        {/* Resources/Tables To Be Configure
          /* Example to list and edit a todos table -- this table needs to existe on supabase
          <Resource name="todos" list={ListGuesser} edit={EditGuesser} />
        */}
      </Admin>
    </BrowserRouter>
  );
}

export default App;
