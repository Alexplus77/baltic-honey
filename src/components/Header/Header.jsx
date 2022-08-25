import React from "react";
import logo from "../../Images/logo.jpg";
import style from "components/Header/header.module.css";

export const Header = () => {
  return (
    <div className={style.header}>
      <img className={style.image} src={logo} alt={"logo"} />
    </div>
  );
};
