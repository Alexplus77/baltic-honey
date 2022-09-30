import React from "react";
import { NavBar } from "components/NavBar";
import s from "./Footer.module.css";

export const Footer = () => {
  return (
    <footer className={s.container}>
      <div className={s.dateFooter}>
        &copy;{new Date().getFullYear()} Балтийский мёд
      </div>
      <nav className={s.navBar}>
        <NavBar />
      </nav>
    </footer>
  );
};
