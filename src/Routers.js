import { Layout } from "Pages/Layout";
import { Routes, Route } from "react-router";
import { MainPage } from "Pages/MainPage";
import { AdministratorPage } from "./Pages/AdministratorPage";

export const Routers = () => {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route index element={<MainPage />} />
        <Route path={"/administrator"} element={<AdministratorPage />} />
      </Route>
    </Routes>
  );
};