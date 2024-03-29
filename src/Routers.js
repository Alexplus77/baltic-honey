import { Layout } from "Pages/Layout";
import { Routes, Route } from "react-router";
import { MainPage } from "Pages/MainPage";
import { AdministratorPage } from "./Pages/AdministratorPage";
import { UserManagementPage } from "./Pages/UserManagementPage";
import { RequiredAuth } from "./Hocs/requiredAuth";

export const Routers = () => {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route index element={<MainPage />} />
        <Route
          path={"/administrator"}
          element={
            <RequiredAuth>
              <AdministratorPage />
            </RequiredAuth>
          }
        />
        <Route
          path={"/userManagement"}
          element={
            <RequiredAuth>
              <UserManagementPage />
            </RequiredAuth>
          }
        />

        <Route path={"/:category/:name"} element={<MainPage />} />
      </Route>
    </Routes>
  );
};
