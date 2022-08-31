import React, { useEffect, useState } from "react";
import { Header } from "components/Header";
import { AsideBlockMenu } from "components/AsideBlockMenu";
import { LogInCard } from "components/LogInCard";
import { Footer } from "components/Footer";
import { UserCard } from "components/UserCard";
import { NavBar } from "components/NavBar";
import { Outlet } from "react-router-dom";
import s from "./Layout.module.css";
import { useSelector, useDispatch } from "react-redux";
import { Modal } from "antd";
import { exitErrorMod } from "redux/contentSlice";
import { userGetData } from "redux/middleware/userFetch";
import { UpOutlined } from "@ant-design/icons";
import { Tooltip } from "antd";

export const Layout = () => {
  const { categories, error, isAuth } = useSelector(
    (state) => state.contentReducer
  );
  const distanceFromTop = 400;
  const increaseDistance = 500;
  const dispatch = useDispatch();
  const [visibleLink, setVisibleLink] = useState(false);
  const [scrolledTop, setScrolledTop] = useState(0);

  useEffect(() => {
    localStorage.getItem("token") && dispatch(userGetData());
  }, [isAuth, dispatch]);

  const menuAside = categories?.filter(
    (category) => category?.blockMenu?.title === "menuAside"
  );

  const toggleVisibleLInk = () => {
    const scrolled = document.documentElement.scrollTop;
    setScrolledTop(scrolled);
    if (scrolled > distanceFromTop) {
      setVisibleLink(true);
    } else if (scrolled <= distanceFromTop) {
      setVisibleLink(false);
    }
  };
  window.addEventListener("scroll", toggleVisibleLInk);
  const scrollToTop = (e) => {
    e.preventDefault();
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: "smooth",
    });
  };

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
      {visibleLink && (
        <Tooltip color={"#f5d11c"} title={"Вверх"}>
          <UpOutlined
            style={{ marginTop: scrolledTop + increaseDistance }}
            className={s.link}
            onClick={scrollToTop}
          />
        </Tooltip>
      )}
      <Footer />
    </div>
  );
};
