import React from "react";
import s from "./Footer.module.css";

export const Footer = () => {
  return (
    <footer className={s.container}>
      &copy;{new Date().getFullYear()} Балтийский мёд
    </footer>
  );
};
