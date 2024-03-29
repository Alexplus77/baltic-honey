import React from "react";
import s from "./NavBar.module.css";
import { NavLink } from "react-router-dom";
import { useSelector } from "react-redux";

export const NavBar = () => {
  const { userData } = useSelector((state) => state.contentReducer);
  const activeClass = ({ isActive }) => (isActive ? s.active : s.navbar);
  const { categories } = useSelector((state) => state.contentReducer);

  const menuNavbar = categories?.filter(
    (category) => category.blockMenu?.title === "navbar"
  );

  return (
    <nav className={s.navBarContainer}>
      {menuNavbar.map((link) => (
        <NavLink
          className={activeClass}
          key={link._id}
          to={
            link.title === "Main"
              ? "/Main/Main"
              : `/${link.title}/${link.title}`
          }
        >
          {link.title === "Main" ? "Главная" : link.title}
        </NavLink>
      ))}
      {(userData?.role === "superAdmin" || userData?.role === "admin") && (
        <NavLink className={activeClass} to={"/administrator"}>
          {" "}
          AdminPanel
        </NavLink>
      )}
    </nav>
  );
};
