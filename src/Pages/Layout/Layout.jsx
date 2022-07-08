import React from "react";
import { Header } from "components/Header";
import { AsideBlockMenu } from "components/AsideBlockMenu";
import { LogInCard } from "components/LogInCard";
import { NavBar } from "components/NavBar";
import { Outlet } from "react-router-dom";
import s from "./Layout.module.css";
import { useSelector, useDispatch } from "react-redux";

export const Layout = () => {
  const { categories } = useSelector((state) => state.contentReducer);

  const menuAside = categories?.filter(
    (category) => category?.blockMenu?.title === "menuAside"
  );

  return (
    <div className={s.container}>
      <Header />
      <NavBar />
      <aside>
        <LogInCard />
        {menuAside?.map((menu) => (
          <AsideBlockMenu key={menu._id} item={menu} />
        ))}
      </aside>
      <Outlet />
    </div>
  );
};
