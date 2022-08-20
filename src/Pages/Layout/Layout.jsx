import React, { useEffect } from "react";
import { Header } from "components/Header";
import { AsideBlockMenu } from "components/AsideBlockMenu";
import { LogInCard } from "components/LogInCard";
import { UserCard } from "components/UserCard";
import { NavBar } from "components/NavBar";
import { Outlet } from "react-router-dom";
import s from "./Layout.module.css";
import { useSelector, useDispatch } from "react-redux";
import { Modal } from "antd";
import { exitErrorMod } from "redux/contentSlice";
import { userGetData } from "redux/middleware/userFetch";

export const Layout = () => {
  const { categories, error, isAuth, isAddCategory, isAddArticle } =
    useSelector((state) => state.contentReducer);

  const dispatch = useDispatch();

  useEffect(() => {
    localStorage.getItem("token") && dispatch(userGetData());
  }, [isAuth]);
  console.log(isAddArticle, isAddCategory);
  const menuAside = categories?.filter(
    (category) => category?.blockMenu?.title === "menuAside"
  );
  return (
    <div className={s.container}>
      <Modal
        visible={error?.status}
        title={<span style={{ color: "red" }}>Error</span>}
        onOk={() => dispatch(exitErrorMod())}
        onCancel={() => dispatch(exitErrorMod())}
      >
        Ошибка: {error?.message}
      </Modal>
      <Header />
      <NavBar />
      <aside>
        {isAuth ? <UserCard /> : <LogInCard />}
        {menuAside?.map((menu) => (
          <AsideBlockMenu key={menu._id} item={menu} />
        ))}
      </aside>
      <Outlet />
    </div>
  );
};
